import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Editor from './pages/Editor';
import Community from './pages/Community';
import Profile from './pages/Profile';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ProjectProvider } from './contexts/ProjectContext';
import AuthModal from './components/AuthModal';
import './App.css';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  return (
    <div className="app">
      <Header 
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        onAuthClick={() => setShowAuthModal(true)}
      />
      
      <div className="app-body">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/editor/:projectId?" element={<Editor />} />
            <Route path="/community" element={<Community />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>

      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ProjectProvider>
          <AppContent />
        </ProjectProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;