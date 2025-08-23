import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Save, 
  Download, 
  Share2, 
  Settings, 
  Lightbulb, 
  CheckCircle,
  AlertCircle,
  BarChart3,
  FileText,
  Type,
  Eye
} from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import AIAssistant from '../components/AIAssistant';
import GrammarChecker from '../components/GrammarChecker';
import ExportModal from '../components/ExportModal';
import WritingStats from '../components/WritingStats';

const Editor: React.FC = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { projects, updateProject, createProject } = useProject();
  const [project, setProject] = useState(null);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [showAI, setShowAI] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [writingMode, setWritingMode] = useState('edit'); // edit, preview, focus
  const [wordCount, setWordCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSaveStatus, setAutoSaveStatus] = useState('saved');
  const editorRef = useRef(null);

  useEffect(() => {
    if (projectId && projectId !== 'new') {
      const foundProject = projects.find(p => p.id === projectId);
      if (foundProject) {
        setProject(foundProject);
        setTitle(foundProject.title);
        setContent(foundProject.content);
        setWordCount(foundProject.wordCount);
      } else {
        navigate('/');
      }
    } else {
      // Create new project
      const newProject = createProject('Untitled Project', '');
      setProject(newProject);
      setTitle(newProject.title);
      setContent(newProject.content);
      setWordCount(0);
      navigate(`/editor/${newProject.id}`, { replace: true });
    }
  }, [projectId, projects, navigate, createProject]);

  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
  }, [content]);

  const handleSave = () => {
    if (project) {
      updateProject(project.id, { title, content });
      setLastSaved(new Date());
      setAutoSaveStatus('saved');
      // Show save confirmation
      const saveBtn = document.querySelector('.save-btn');
      saveBtn?.classList.add('saved');
      setTimeout(() => saveBtn?.classList.remove('saved'), 1000);
    }
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    setIsTyping(true);
    setAutoSaveStatus('typing');
    
    // Auto-save after 2 seconds of no typing
    clearTimeout(window.autoSaveTimeout);
    window.autoSaveTimeout = setTimeout(() => {
      if (project) {
        updateProject(project.id, { title, content: e.target.value });
        setLastSaved(new Date());
        setAutoSaveStatus('saved');
        setIsTyping(false);
      }
    }, 2000);
  };

  const getWordCount = () => {
    return wordCount;
  };

  const getCharCount = () => {
    return content.length;
  };

  const getReadingTime = () => {
    return Math.ceil(wordCount / 200);
  };

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 mt-4">Loading editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 slide-in-left">
        <div className="flex items-center space-x-4 flex-1">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 flex-1 hover:bg-gray-50 rounded px-2 py-1 transition-all duration-300"
            placeholder="Project title..."
          />
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <div className={`w-2 h-2 rounded-full ${
              autoSaveStatus === 'saved' ? 'bg-green-500' :
              autoSaveStatus === 'typing' ? 'bg-yellow-500 animate-pulse' :
              'bg-red-500'
            }`}></div>
            <span>
              {autoSaveStatus === 'saved' && lastSaved ? `Saved ${lastSaved.toLocaleTimeString()}` :
               autoSaveStatus === 'typing' ? 'Typing...' : 'Not saved'}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {getWordCount()} words • {getCharCount()} chars • {getReadingTime()} min read
          </div>
          
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setWritingMode('edit')}
              className={`p-2 rounded-md transition-all duration-300 ${
                writingMode === 'edit' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <Type size={16} />
            </button>
            <button
              onClick={() => setWritingMode('preview')}
              className={`p-2 rounded-md transition-all duration-300 ${
                writingMode === 'preview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600'
              }`}
            >
              <Eye size={16} />
            </button>
          </div>

          <button
            onClick={() => setShowStats(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            title="Writing Statistics"
          >
            <BarChart3 size={18} />
          </button>

          <button
            onClick={() => setShowAI(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110 text-green-600 floating"
            title="AI Assistant"
          >
            <Lightbulb size={18} />
          </button>

          <button
            onClick={handleSave}
            className="save-btn btn-primary flex items-center space-x-2"
          >
            <Save size={16} />
            <span>Save</span>
          </button>

          <button
            onClick={() => setShowExport(true)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-110"
            title="Export"
          >
            <Download size={18} />
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 slide-in-right">
        {/* Main Editor */}
        <div className="lg:col-span-3">
          <div className="writing-container min-h-96">
            {writingMode === 'edit' ? (
              <div className="relative">
                <textarea
                  ref={editorRef}
                  value={content}
                  onChange={handleContentChange}
                  placeholder="Start writing your story..."
                  className="w-full min-h-96 border-none outline-none resize-none text-lg leading-relaxed transition-all duration-300 focus:bg-blue-50/20"
                  style={{ fontFamily: 'Georgia, serif' }}
                />
                <GrammarChecker content={content} />
              </div>
            ) : (
              <div className="prose prose-lg max-w-none">
                {content ? (
                  <div dangerouslySetInnerHTML={{ 
                    __html: content.replace(/\n/g, '<br />') 
                  }} />
                ) : (
                  <p className="text-gray-500 italic">Preview will appear here...</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          {/* Writing Progress */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
              Writing Progress
            </h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Session Goal</span>
                  <span className="font-medium">{wordCount}/500 words</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 progress-bar">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((wordCount / 500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {isTyping ? 'Keep writing! 🔥' : 'Take a break or keep going! ✨'}
              </div>
            </div>
          </div>

          {/* AI Suggestions */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md interactive-card">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-green-600 floating" />
              AI Suggestions
            </h3>
            <div className="space-y-2 text-sm">
              <div className="p-2 bg-green-50 rounded text-green-800 hover:bg-green-100 transition-colors cursor-pointer">
                Consider adding more sensory details
              </div>
              <div className="p-2 bg-blue-50 rounded text-blue-800 hover:bg-blue-100 transition-colors cursor-pointer">
                Great dialogue! Keep the conversation flowing
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm hover:scale-105 transition-transform duration-200">
                Get more suggestions
              </button>
            </div>
          </div>

          {/* Grammar & Style */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md interactive-card">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
              Grammar & Style
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Grammar</span>
                <span className="text-green-600 font-medium flex items-center">
                  Good <div className="w-2 h-2 bg-green-500 rounded-full ml-1"></div>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Readability</span>
                <span className="text-blue-600 font-medium flex items-center">
                  Clear <div className="w-2 h-2 bg-blue-500 rounded-full ml-1"></div>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Tone</span>
                <span className="text-purple-600 font-medium flex items-center">
                  Engaging <div className="w-2 h-2 bg-purple-500 rounded-full ml-1"></div>
                </span>
              </div>
            </div>
          </div>

          {/* Writing Goals */}
          <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-md interactive-card">
            <h3 className="font-semibold text-gray-900 mb-3">Daily Goal</h3>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Words written today</span>
                  <span className="font-medium">{wordCount}/500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 progress-bar">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((wordCount / 500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-xs text-gray-500">
                {wordCount >= 500 ? '🎉 Goal achieved! Keep going!' : `${500 - wordCount} words to go!`}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAI && <AIAssistant onClose={() => setShowAI(false)} content={content} />}
      {showExport && <ExportModal project={project} onClose={() => setShowExport(false)} />}
      {showStats && <WritingStats content={content} onClose={() => setShowStats(false)} />}
    </div>
  );
};

export default Editor;