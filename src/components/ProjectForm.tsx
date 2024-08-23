import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../api/axiosClient';

const ProjectForm: React.FC = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { projectId } = useParams();

  useEffect(() => {
    if (projectId) {
      axios.get(`/api/projects/${projectId}`)
        .then(response => {
          // console.log(response, 'response')

          setName(response.data.name);
        })
        .catch(error => console.error('Error fetching project details:', error));
    }
  }, [projectId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!name) {
      setError('Project name is required.');
      return;
    }
    const method = projectId ? 'put' : 'post';
    const url = projectId ? `/api/projects/${projectId}` : '/api/projects';

    try {
      await axios[method](url, { name });
      navigate('/');
    } catch (error) {
      console.error('Failed to submit project:', error);
      // alert(error)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{projectId ? 'Edit Project' : 'Create Project'}</h2>
      <label>
        Project Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">{projectId ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default ProjectForm;
