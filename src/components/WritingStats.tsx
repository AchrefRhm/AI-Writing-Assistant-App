import React from 'react';
import { X, BarChart3, Clock, Target, TrendingUp } from 'lucide-react';

interface WritingStatsProps {
  content: string;
  onClose: () => void;
}

const WritingStats: React.FC<WritingStatsProps> = ({ content, onClose }) => {
  const getWordCount = () => {
    return content.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const getCharCount = () => {
    return content.length;
  };

  const getSentenceCount = () => {
    return content.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0).length;
  };

  const getParagraphCount = () => {
    return content.split(/\n\s*\n/).filter(para => para.trim().length > 0).length;
  };

  const getReadingTime = () => {
    const wordsPerMinute = 200;
    const minutes = Math.ceil(getWordCount() / wordsPerMinute);
    return minutes;
  };

  const getReadabilityScore = () => {
    // Simplified readability calculation
    const words = getWordCount();
    const sentences = getSentenceCount();
    if (sentences === 0) return 0;
    
    const avgWordsPerSentence = words / sentences;
    let score = 100;
    
    if (avgWordsPerSentence > 20) score -= 20;
    else if (avgWordsPerSentence > 15) score -= 10;
    
    return Math.max(score, 0);
  };

  const getMostUsedWords = () => {
    const words = content.toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3);
    
    const frequency = {};
    words.forEach(word => {
      frequency[word] = (frequency[word] || 0) + 1;
    });
    
    return Object.entries(frequency)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10)
      .map(([word, count]) => ({ word, count }));
  };

  const stats = [
    { label: 'Words', value: getWordCount(), icon: BarChart3, color: 'blue' },
    { label: 'Characters', value: getCharCount(), icon: BarChart3, color: 'green' },
    { label: 'Sentences', value: getSentenceCount(), icon: BarChart3, color: 'purple' },
    { label: 'Paragraphs', value: getParagraphCount(), icon: BarChart3, color: 'orange' },
    { label: 'Reading Time', value: `${getReadingTime()} min`, icon: Clock, color: 'red' },
    { label: 'Readability', value: `${getReadabilityScore()}%`, icon: Target, color: 'indigo' }
  ];

  const mostUsedWords = getMostUsedWords();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Writing Statistics</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                  <span className="text-sm font-medium text-gray-600">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Most Used Words */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Used Words</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              {mostUsedWords.length > 0 ? (
                <div className="space-y-2">
                  {mostUsedWords.map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-700 capitalize">{item.word}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(item.count / mostUsedWords[0].count) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-6">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">Start writing to see word frequency</p>
              )}
            </div>
          </div>

          {/* Writing Tips */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Writing Insights</h3>
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-4 space-y-3">
              {getWordCount() < 100 && (
                <div className="flex items-start space-x-2">
                  <TrendingUp size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Keep writing! Aim for at least 100 words to get better insights.</p>
                </div>
              )}
              
              {getSentenceCount() > 0 && getWordCount() / getSentenceCount() > 20 && (
                <div className="flex items-start space-x-2">
                  <Target size={16} className="text-orange-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Consider breaking up long sentences for better readability.</p>
                </div>
              )}
              
              {getReadabilityScore() > 80 && (
                <div className="flex items-start space-x-2">
                  <TrendingUp size={16} className="text-green-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Great job! Your writing is clear and easy to read.</p>
                </div>
              )}
              
              {getParagraphCount() === 1 && getWordCount() > 200 && (
                <div className="flex items-start space-x-2">
                  <Target size={16} className="text-blue-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-gray-700">Consider breaking your text into multiple paragraphs for better structure.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Reading Level */}
        <div className="mt-8 p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Reading Level Analysis</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{getReadabilityScore()}%</div>
              <div className="text-sm text-gray-600">Readability Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{Math.round((getWordCount() / getSentenceCount()) || 0)}</div>
              <div className="text-sm text-gray-600">Words per Sentence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">{getReadingTime()}</div>
              <div className="text-sm text-gray-600">Minutes to Read</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingStats;