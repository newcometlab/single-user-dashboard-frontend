import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from '../api/axiosClient';

const TaskList: React.FC = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`/api/projects/${projectId}/tasks`);
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleDelete = async (taskId: number) => {
        try {
            await axios.delete(`/api/projects/${projectId}/tasks/${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <div>
            <h2>Tasks</h2>
            <button onClick={() => navigate(`/projects/${projectId}/tasks/new`)}>Add New Task</button>
            <ul>
                {tasks.map((task: any) => (
                    <li key={task.id}>
                        {task.description}
                        <button onClick={() => navigate(`/projects/${projectId}/tasks/edit/${task.id}`)}>Edit</button>
                        <button onClick={() => handleDelete(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
