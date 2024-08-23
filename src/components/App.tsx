import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import PrivateRoute from './PrivateRoute';
import ProjectForm from './ProjectForm';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />

        <Route path="/projects/new" element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
        <Route path="/projects/edit/:projectId" element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
        <Route path="/projects/:projectId/tasks" element={<PrivateRoute><TaskList /></PrivateRoute>} />
        <Route path="/projects/:projectId/tasks/new" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
        <Route path="/projects/:projectId/tasks/edit/:taskId" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
      </Routes>
    </Router>
  );
};

export default App;
