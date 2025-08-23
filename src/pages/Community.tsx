import React, { useState } from 'react';
import { Search, Filter, Heart, MessageCircle, Share2, Eye, Star, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Community: React.FC = () => {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();

  const posts = [
    {
      id: 1,
      title: 'The Art of Character Development in Short Stories',
      excerpt: 'Creating memorable characters in limited word count requires specific techniques...',
      author: 'Sarah Chen',
      avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=3b82f6&color=ffffff',
      category: 'Article',
      tags: ['character development', 'short stories', 'writing tips'],
      likes: 127,
      comments: 23,
      views: 1200,
      readTime: 5,
      publishedAt: '2 days ago',
      featured: true
    },
    {
      id: 2,
      title: 'Midnight in the Library',
      excerpt: 'The old library held secrets that only revealed themselves after closing time...',
      author: 'Marcus Thompson',
      avatar: 'https://ui-avatars.com/api/?name=Marcus+Thompson&background=10b981&color=ffffff',
      category: 'Story',
      tags: ['mystery', 'fantasy', 'short fiction'],
      likes: 89,
      comments: 15,
      views: 856,
      readTime: 8,
      publishedAt: '1 day ago',
      featured: false
    },
    {
      id: 3,
      title: 'Screenplay Format Guide for Beginners',
      excerpt: 'Master the basics of screenplay formatting with this comprehensive guide...',
      author: 'Elena Rodriguez',
      avatar: 'https://ui-avatars.com/api/?name=Elena+Rodriguez&background=f59e0b&color=ffffff',
      category: 'Guide',
      tags: ['screenplay', 'formatting', 'screenwriting'],
      likes: 203,
      comments: 45,
      views: 2100,
      readTime: 12,
      publishedAt: '3 days ago',
      featured: true
    }
  ];

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const tabs = [
    { id: 'trending', label: 'Trending', count: '24' },
    { id: 'recent', label: 'Recent', count: '156' },
    { id: 'following', label: 'Following', count: '12' },
    { id: 'my-posts', label: 'My Posts', count: '5' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Writing Community</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Share your stories, get feedback, and connect with fellow writers from around the world.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search posts, tags, or authors..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          
          {user && (
            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              Share Your Work
            </button>
          )}
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

      {/* Featured Posts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {filteredPosts.map(post => (
            <div key={post.id} className={`bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow ${
              post.featured ? 'ring-2 ring-blue-100' : ''
            }`}>
              {post.featured && (
                <div className="flex items-center space-x-2 mb-4">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-xs font-medium text-yellow-700 bg-yellow-50 px-2 py-1 rounded">
                    Featured
                  </span>
                </div>
              )}
              
              <div className="flex items-start space-x-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="w-12 h-12 rounded-full"
                />
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h3>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                    <span>By {post.author}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={14} />
                      <span>{post.readTime} min read</span>
                    </div>
                    <span>•</span>
                    <span>{post.publishedAt}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-red-600 transition-colors">
                        <Heart size={16} />
                        <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
                        <MessageCircle size={16} />
                        <span>{post.comments}</span>
                      </button>
                      <div className="flex items-center space-x-1">
                        <Eye size={16} />
                        <span>{post.views}</span>
                      </div>
                    </div>
                    
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                      <Share2 size={16} />
                      <span>Share</span>
                    </button>
                  </div>
                  
                  <div className="mt-3 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Writers */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Writers This Week</h3>
            <div className="space-y-3">
              {[
                { name: 'Sarah Chen', posts: 12, likes: 1200 },
                { name: 'Marcus Thompson', posts: 8, likes: 956 },
                { name: 'Elena Rodriguez', posts: 15, likes: 2100 }
              ].map((writer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{writer.name}</p>
                      <p className="text-xs text-gray-500">{writer.posts} posts</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">{writer.likes}</p>
                    <p className="text-xs text-gray-500">likes</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Tags */}
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Trending Tags</h3>
            <div className="flex flex-wrap gap-2">
              {['character development', 'mystery', 'screenwriting', 'poetry', 'dialogue', 'worldbuilding', 'romance', 'fantasy'].map(tag => (
                <button
                  key={tag}
                  className="text-xs bg-gray-100 hover:bg-blue-50 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-full transition-colors"
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Writing Challenge */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Weekly Challenge</h3>
            <p className="text-sm text-gray-700 mb-3">
              Write a story that begins with "The last person on Earth heard a knock at the door."
            </p>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
              <span>23 submissions</span>
              <span>4 days left</span>
            </div>
            <button className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm transition-colors">
              Join Challenge
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;