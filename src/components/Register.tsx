import React, { useState } from 'react';
import axios from '../api/axiosClient';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            console.log(email, password, 'email, password')

            const response = await axios.post('/api/users/register', { email, password });
            console.log(response, 'response')

            // navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Register</h2>
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Register</button>
            </form>
            <p>
                Do you have an account? <a href="/login">Login here</a>
            </p>
        </div>
    );
};

export default Register;
