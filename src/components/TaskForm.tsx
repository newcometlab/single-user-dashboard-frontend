import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axiosClient';

const TaskForm: React.FC = () => {
  const [description, setDescription] = useState('');
  const { projectId, taskId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (taskId) {
      axios.get(`/api/projects/${projectId}/tasks/${taskId}`)
        .then(response => {
          setDescription(response.data.description);
        })
        .catch(error => console.error('Error fetching task details:', error));
    }
  }, [projectId, taskId]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const method = taskId ? 'put' : 'post';
    const url = taskId ? `/api/projects/${projectId}/tasks/${taskId}` : `/api/projects/${projectId}/tasks`;

    try {
      await axios[method](url, { description });
      navigate(`/projects/${projectId}`);
    } catch (error) {
      console.error('Failed to submit task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{taskId ? 'Edit Task' : 'Add Task'}</h2>
      <label>
        Task Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit">{taskId ? 'Update' : 'Create'}</button>
    </form>
  );
};

export default TaskForm;
