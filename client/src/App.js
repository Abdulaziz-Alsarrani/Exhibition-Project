import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/nav/Navbar';
import Login from './components/login/LoginForm';
import Register from './components/register/Register';
import Profile from './components/profile/Profile';
import Home from './components/home/Home';
import { AuthProvider } from './components/context/AuthContext';
function App() {
  return (
    <AuthProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </AuthProvider>

  );
}

export default App;
