import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Award,
  Clock,
  Users,
  Lightbulb
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import StoryGenerator from '../components/StoryGenerator';

const Dashboard: React.FC = () => {
  const { projects, createProject } = useProject();
  const [showStoryGenerator, setShowStoryGenerator] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [typingText, setTypingText] = useState('');
  const [wordCount, setWordCount] = useState(0);

  const fullText = "Welcome to WriteAI";

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypingText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const totalWords = projects.reduce((sum, project) => sum + project.wordCount, 0);
    let current = 0;
    const increment = totalWords / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= totalWords) {
        setWordCount(totalWords);
        clearInterval(timer);
      } else {
        setWordCount(Math.floor(current));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [projects]);

  const stats = [
    { icon: FileText, label: 'Projects', value: projects.length, color: 'blue', trend: '+12%' },
    { icon: Clock, label: 'Hours Written', value: '127', color: 'green', trend: '+8%' },
    { icon: TrendingUp, label: 'Words Written', value: wordCount.toLocaleString(), color: 'purple', trend: '+23%' },
    { icon: Award, label: 'Completed', value: '8', color: 'orange', trend: '+2' },
  ];

  const handleNewProject = () => {
    const newProject = createProject('Untitled Project', '');
    return newProject.id;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome Section */}
      <div className="text-center py-8 slide-in-left">
        <div className="flex items-center justify-center mb-4">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            {typingText}
            <span className="animate-pulse">|</span>
          </h1>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-4 slide-in-right">
          Your intelligent writing companion for crafting amazing stories, articles, and scripts.
        </p>
        <div className="text-sm text-gray-500 mb-2">
          {currentTime.toLocaleString()}
        </div>
        <div className="inline-flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span>AI Assistant Online</span>
        </div>
      </div>

      {/* Real-time Activity Feed */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100 scale-in">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Recent Activity</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">Auto-saved "The Mysterious Library" 2 minutes ago</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">Grammar check completed on 3 documents</span>
          </div>
          <div className="flex items-center space-x-3 text-sm">
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            <span className="text-gray-600">AI generated 5 new story ideas</span>
          </div>
        </div>
      </div>

      {/* Writing Goals */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Writing Goal</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Daily Word Target</span>
              <span className="font-medium">750 / 1000 words</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 progress-bar">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-1000 ease-out"
                style={{ width: '75%' }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Writing Streak</span>
              <span className="font-medium">12 days 🔥</span>
            </div>
            <div className="text-xs text-gray-500">Keep it up! You're on fire!</div>
          </div>
        </div>
      </div>

      {/* Weather Widget */}
      <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border border-cyan-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Perfect Writing Weather</h3>
            <p className="text-gray-600">Sunny, 72°F - Ideal for creativity!</p>
          </div>
          <div className="text-4xl">☀️</div>
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100 text-center">
        <blockquote className="text-lg italic text-gray-700 mb-2">
          "The first draft of anything is shit."
        </h1>
        <cite className="text-sm text-gray-500">- Ernest Hemingway</cite>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="interactive-card bg-white rounded-xl p-6 border border-gray-200 shadow-lg"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {typeof stat.value === 'number' && stat.label === 'Words Written' ? wordCount.toLocaleString() : stat.value}
                  </p>
                  <p className="text-xs text-green-600 font-medium mt-1">{stat.trend}</p>
                </div>
                <div className={`p-3 bg-${stat.color}-50 rounded-lg floating`}>
                  <Icon className={`h-6 w-6 text-${stat.color}-600`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg scale-in">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to={`/editor/${handleNewProject()}`}
            className="interactive-card group p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-300 text-center"
          >
            <Plus className="h-12 w-12 text-gray-400 group-hover:text-blue-600 mx-auto mb-4 bounce-in" />
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600">
              New Project
            </h3>
            <p className="text-gray-600 mt-2">Start writing something amazing</p>
          </Link>

          <button
            onClick={() => setShowStoryGenerator(true)}
            className="interactive-card group p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-green-400 hover:bg-green-50 transition-all duration-300 text-center"
          >
            <Lightbulb className="h-12 w-12 text-gray-400 group-hover:text-green-600 mx-auto mb-4 bounce-in" />
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">
              Generate Idea
            </h3>
            <p className="text-gray-600 mt-2">AI-powered story inspiration</p>
          </button>

          <Link
            to="/community"
            className="interactive-card group p-6 border-2 border-dashed border-gray-300 rounded-xl hover:border-purple-400 hover:bg-purple-50 transition-all duration-300 text-center"
          >
            <Users className="h-12 w-12 text-gray-400 group-hover:text-purple-600 mx-auto mb-4 bounce-in" />
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600">
              Join Community
            </h3>
            <p className="text-gray-600 mt-2">Share and get feedback</p>
          </Link>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-lg slide-in-right">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
          <Link
            to="/editor"
            className="text-blue-600 hover:text-blue-700 font-medium hover:scale-105 transition-transform duration-200"
          >
            View all
          </Link>
        </div>

        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project, index) => (
              <Link
                key={project.id}
                to={`/editor/${project.id}`}
                className="interactive-card group p-6 border border-gray-200 rounded-lg shadow-md"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText className="h-5 w-5 text-gray-400 group-hover:text-blue-600" />
                  <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">{project.type}</span>
                </div>
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {project.content.substring(0, 100)}...
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(project.updatedAt).toLocaleDateString()}
                  <span className="ml-auto font-medium">{project.wordCount} words</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4 floating" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
            <p className="text-gray-600 mb-6">Get started by creating your first project</p>
            <Link
              to="/editor/new"
              className="btn-primary inline-flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Create Project
            </Link>
          </div>
        )}
      </div>

      {/* Story Generator Modal */}
      {showStoryGenerator && (
        <StoryGenerator onClose={() => setShowStoryGenerator(false)} />
      )}
    </div>
  );
};

export default Dashboard;