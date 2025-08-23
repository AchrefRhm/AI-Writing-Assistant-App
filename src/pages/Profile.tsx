import React, { useState } from 'react';
import { Edit, Settings, Award, Calendar, FileText, Heart, MessageCircle, Eye } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useProject } from '../contexts/ProjectContext';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const { projects } = useProject();
  const [activeTab, setActiveTab] = useState('projects');

  if (!user) return null;

  const userStats = {
    totalProjects: projects.length,
    totalWords: projects.reduce((sum, project) => sum + project.wordCount, 0),
    publishedPosts: 12,
    followers: 156,
    following: 89,
    likes: 2300
  };

  const achievements = [
    { icon: Award, name: 'First Story', description: 'Published your first story', earned: true },
    { icon: FileText, name: 'Prolific Writer', description: 'Created 10 projects', earned: projects.length >= 10 },
    { icon: Heart, name: 'Community Favorite', description: 'Received 100 likes', earned: true },
    { icon: Calendar, name: 'Consistent Writer', description: 'Wrote for 7 days straight', earned: false }
  ];

  const recentActivity = [
    { type: 'project', title: 'Updated "The Mysterious Library"', time: '2 hours ago' },
    { type: 'like', title: 'Liked "Character Development Tips"', time: '1 day ago' },
    { type: 'comment', title: 'Commented on "Writing Dialogue"', time: '2 days ago' },
    { type: 'project', title: 'Created new project', time: '3 days ago' }
  ];

  const tabs = [
    { id: 'projects', label: 'Projects', count: userStats.totalProjects },
    { id: 'activity', label: 'Activity', count: recentActivity.length },
    { id: 'achievements', label: 'Achievements', count: achievements.filter(a => a.earned).length }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl p-8 border border-gray-200">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <div className="relative">
            <img
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=3b82f6&color=ffffff&size=128`}
              alt={user.name}
              className="w-32 h-32 rounded-full border-4 border-gray-100"
            />
            <button className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors">
              <Edit size={16} />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Settings size={20} />
              </button>
            </div>
            <p className="text-gray-600 mb-4">Passionate writer exploring the depths of storytelling and character development.</p>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.totalProjects}</div>
                <div className="text-sm text-gray-500">Projects</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.totalWords.toLocaleString()}</div>
                <div className="text-sm text-gray-500">Words</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.publishedPosts}</div>
                <div className="text-sm text-gray-500">Published</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.followers}</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.following}</div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{userStats.likes}</div>
                <div className="text-sm text-gray-500">Likes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <FileText className="h-5 w-5 text-gray-400" />
                <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded">
                  {project.type}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1">{project.title}</h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                {project.content.substring(0, 100)}...
              </p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{project.wordCount} words</span>
                <span>{new Date(project.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-full ${
                  activity.type === 'project' ? 'bg-blue-100' :
                  activity.type === 'like' ? 'bg-red-100' :
                  'bg-green-100'
                }`}>
                  {activity.type === 'project' && <FileText size={16} className="text-blue-600" />}
                  {activity.type === 'like' && <Heart size={16} className="text-red-600" />}
                  {activity.type === 'comment' && <MessageCircle size={16} className="text-green-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-gray-900">{activity.title}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'achievements' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((achievement, index) => {
            const Icon = achievement.icon;
            return (
              <div key={index} className={`rounded-lg p-6 border-2 ${
                achievement.earned 
                  ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${
                    achievement.earned ? 'bg-yellow-100' : 'bg-gray-200'
                  }`}>
                    <Icon size={24} className={achievement.earned ? 'text-yellow-600' : 'text-gray-400'} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      achievement.earned ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {achievement.name}
                    </h3>
                    <p className={`text-sm ${
                      achievement.earned ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {achievement.description}
                    </p>
                    {achievement.earned && (
                      <span className="inline-block mt-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                        Earned
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;