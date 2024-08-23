import React, { useEffect, useState } from 'react';
import axios from '../api/axiosClient';
import { Link, useNavigate } from 'react-router-dom';

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/projects');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const handleDelete = async (projectId: number) => {
    try {
      await axios.delete(`/api/projects/${projectId}`);
      fetchProjects();
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  return (
    <div>
      <h2>Projects</h2>
      <button onClick={() => navigate('/projects/new')}>Add New Project</button>
      <ul>
        {projects.map((project: any) => (
          <li key={project.id}>
            {project.name}
            <button onClick={() => navigate(`/projects/edit/${project.id}`)}>Edit</button>
            <button onClick={() => handleDelete(project.id)}>Delete</button>
            <Link to={`/projects/${project.id}/tasks`}>View Tasks</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
