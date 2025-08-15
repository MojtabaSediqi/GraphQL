import React from 'react';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';
import { Layout } from 'antd';
import AppRoutes from './routes';

const { Content } = Layout;

const App: React.FC = () => (
  <Router>
    <AppRoutes />
  </Router>
);

export default App;
