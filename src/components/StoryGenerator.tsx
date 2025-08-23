import React, { useState } from 'react';
import { X, Shuffle, Lightbulb, Copy, ArrowRight } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useNavigate } from 'react-router-dom';

interface StoryGeneratorProps {
  onClose: () => void;
}

const StoryGenerator: React.FC<StoryGeneratorProps> = ({ onClose }) => {
  const [genre, setGenre] = useState('');
  const [setting, setSetting] = useState('');
  const [character, setCharacter] = useState('');
  const [conflict, setConflict] = useState('');
  const [generatedIdea, setGeneratedIdea] = useState('');
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { createProject } = useProject();
  const navigate = useNavigate();

  const genres = ['Fantasy', 'Mystery', 'Romance', 'Sci-Fi', 'Horror', 'Adventure', 'Drama', 'Comedy'];
  const settings = ['Medieval Castle', 'Space Station', 'Modern City', 'Small Town', 'Post-Apocalyptic World', 'Victorian London', 'Tropical Island', 'Underground Cave'];
  const characters = ['Reluctant Hero', 'Mysterious Stranger', 'Wise Mentor', 'Ambitious Villain', 'Lost Child', 'Skilled Detective', 'Powerful Wizard', 'Brave Warrior'];
  const conflicts = ['Ancient Prophecy', 'Missing Person', 'Forbidden Love', 'Hidden Treasure', 'Time Travel', 'Identity Crisis', 'Betrayal', 'Survival'];

  const generateRandomOptions = () => {
    setGenre(genres[Math.floor(Math.random() * genres.length)]);
    setSetting(settings[Math.floor(Math.random() * settings.length)]);
    setCharacter(characters[Math.floor(Math.random() * characters.length)]);
    setConflict(conflicts[Math.floor(Math.random() * conflicts.length)]);
  };

  const generateIdea = async () => {
    if (!genre || !setting || !character || !conflict) {
      alert('Please fill in all options or use the random generator');
      return;
    }

    setLoading(true);
    setProgress(0);
    
    // Simulate API call with progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    await new Promise(resolve => setTimeout(resolve, 2000));
    setProgress(100);
    clearInterval(progressInterval);

    const ideas = [
      `In a ${setting.toLowerCase()}, a ${character.toLowerCase()} discovers ${conflict.toLowerCase()} that threatens everything they hold dear. As ancient secrets unfold, they must choose between personal desires and the greater good, learning that sometimes the greatest strength comes from unexpected places.`,
      
      `When ${conflict.toLowerCase()} disrupts life in ${setting.toLowerCase()}, a ${character.toLowerCase()} finds themselves at the center of events that will change their world forever. This ${genre.toLowerCase()} tale explores themes of courage, sacrifice, and the power of determination.`,
      
      `A ${character.toLowerCase()} living in ${setting.toLowerCase()} stumbles upon ${conflict.toLowerCase()} that reveals a hidden world of danger and intrigue. As they navigate through challenges, they discover inner strength and forge unlikely alliances in this compelling ${genre.toLowerCase()} story.`,
      
      `Set against the backdrop of ${setting.toLowerCase()}, this ${genre.toLowerCase()} story follows a ${character.toLowerCase()} whose life is turned upside down by ${conflict.toLowerCase()}. Through trials and tribulations, they must overcome their fears and embrace their destiny.`
    ];

    const selectedIdea = ideas[Math.floor(Math.random() * ideas.length)];
    setGeneratedIdea(selectedIdea);
    setLoading(false);
    setProgress(0);
  };

  const createProjectFromIdea = () => {
    const title = `${genre} Story: ${character} in ${setting}`;
    const content = `Story Concept:\n${generatedIdea}\n\n--- Start writing your story below ---\n\n`;
    
    const newProject = createProject(title, content, 'story');
    navigate(`/editor/${newProject.id}`);
    onClose();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedIdea);
    // Show copy confirmation
    const copyBtn = document.querySelector('.copy-btn');
    copyBtn?.classList.add('copied');
    setTimeout(() => copyBtn?.classList.remove('copied'), 1000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 w-full max-w-3xl mx-4 max-h-[90vh] overflow-y-auto scale-in shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg floating">
              <Lightbulb className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">AI Story Generator</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>

        {loading && (
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Generating your story idea...</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 progress-bar">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Genre</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select a genre</option>
              {genres.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Setting</label>
            <select
              value={setting}
              onChange={(e) => setSetting(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select a setting</option>
              {settings.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Main Character</label>
            <select
              value={character}
              onChange={(e) => setCharacter(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select a character type</option>
              {characters.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Central Conflict</label>
            <select
              value={conflict}
              onChange={(e) => setConflict(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            >
              <option value="">Select a conflict</option>
              {conflicts.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <button
            onClick={generateRandomOptions}
            className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all duration-300 hover:scale-105"
          >
            <Shuffle size={18} />
            <span>Randomize All</span>
          </button>
          
          <button
            onClick={generateIdea}
            disabled={loading}
            className="btn-primary flex items-center justify-center space-x-2 flex-1 disabled:opacity-50"
          >
            <Lightbulb size={18} />
            <span>{loading ? 'Generating...' : 'Generate Story Idea'}</span>
          </button>
        </div>

        {generatedIdea && (
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 scale-in border border-green-200">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Generated Story Idea</h3>
              <button
                onClick={copyToClipboard}
                className="copy-btn flex items-center space-x-1 px-3 py-1 bg-white hover:bg-gray-50 text-gray-600 text-sm rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Copy size={14} />
                <span>Copy</span>
              </button>
            </div>
            
            <p className="text-gray-700 leading-relaxed mb-4">
              {generatedIdea}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={createProjectFromIdea}
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <ArrowRight size={18} />
                <span>Start Writing This Story</span>
              </button>
              
              <button
                onClick={generateIdea}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg transition-all duration-300 hover:scale-105"
              >
                <Shuffle size={18} />
                <span>Generate Another Idea</span>
              </button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-blue-900 mb-2">Tips for Great Stories:</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Start with a compelling character facing a difficult situation</li>
            <li>• Create conflict that drives the story forward</li>
            <li>• Show, don't tell - use actions and dialogue to reveal character</li>
            <li>• Build tension gradually and resolve it satisfyingly</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StoryGenerator;