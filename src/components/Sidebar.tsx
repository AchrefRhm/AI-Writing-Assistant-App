import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  PenTool, 
  Users, 
  User, 
  FileText, 
  Lightbulb,
  BookOpen,
  TrendingUp
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();
  const { projects } = useProject();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: PenTool, label: 'Editor', path: '/editor' },
    { icon: Users, label: 'Community', path: '/community' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  const recentProjects = projects.slice(0, 5);

  return (
    <aside className={`fixed left-0 top-16 h-full w-72 glass-dark border-r border-white/10 transition-all duration-500 z-30 ${
      isOpen ? 'translate-x-0' : '-translate-x-full'
    }`}>
      <div className="p-6">
        {/* Navigation */}
        <nav className="space-y-2 mb-8">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 hover:scale-105 ${
                  isActive 
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border-r-2 border-blue-400' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Quick Actions
          </h3>
          <div className="space-y-2">
            <Link
              to="/editor/new"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-white/70 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-105"
            >
              <Lightbulb size={16} />
              <span>Generate Story Idea</span>
            </Link>
            <button className="flex items-center space-x-3 px-4 py-2 text-sm text-white/70 hover:text-green-400 hover:bg-green-500/20 rounded-lg transition-all duration-300 hover:scale-105 w-full text-left">
              <BookOpen size={16} />
              <span>Writing Prompt</span>
            </button>
            <button className="flex items-center space-x-3 px-4 py-2 text-sm text-white/70 hover:text-purple-400 hover:bg-purple-500/20 rounded-lg transition-all duration-300 hover:scale-105 w-full text-left">
              <TrendingUp size={16} />
              <span>Improve Writing</span>
            </button>
          </div>
        </div>

        {/* Recent Projects */}
        <div>
          <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
            Recent Projects
          </h3>
          <div className="space-y-1">
            {recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <Link
                  key={project.id}
                  to={`/editor/${project.id}`}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-white/70 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <FileText size={14} />
                  <span className="truncate">{project.title}</span>
                </Link>
              ))
            ) : (
              <p className="text-xs text-white/40 px-3 py-2">No recent projects</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;