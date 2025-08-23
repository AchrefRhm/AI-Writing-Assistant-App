import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface GrammarCheckerProps {
  content: string;
}

interface GrammarIssue {
  text: string;
  type: 'grammar' | 'style' | 'spelling';
  suggestion: string;
  start: number;
  end: number;
}

const GrammarChecker: React.FC<GrammarCheckerProps> = ({ content }) => {
  const [issues, setIssues] = useState<GrammarIssue[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Simulate grammar checking
    const checkGrammar = () => {
      const mockIssues: GrammarIssue[] = [];
      
      // Simple checks for demonstration
      const sentences = content.split(/[.!?]+/);
      sentences.forEach((sentence, index) => {
        if (sentence.trim().length === 0) return;
        
        // Check for passive voice
        if (sentence.includes(' was ') || sentence.includes(' were ')) {
          mockIssues.push({
            text: sentence.trim(),
            type: 'style',
            suggestion: 'Consider using active voice for stronger writing',
            start: content.indexOf(sentence),
            end: content.indexOf(sentence) + sentence.length
          });
        }
        
        // Check for repeated words
        const words = sentence.toLowerCase().split(/\s+/);
        const wordCount = {};
        words.forEach(word => {
          wordCount[word] = (wordCount[word] || 0) + 1;
          if (wordCount[word] > 1 && word.length > 3) {
            mockIssues.push({
              text: word,
              type: 'style',
              suggestion: `Avoid repeating "${word}" in the same sentence`,
              start: content.toLowerCase().indexOf(word),
              end: content.toLowerCase().indexOf(word) + word.length
            });
          }
        });
        
        // Check for common spelling errors
        const commonErrors = {
          'there': 'their/they\'re',
          'your': 'you\'re',
          'its': 'it\'s',
          'then': 'than',
          'affect': 'effect'
        };
        
        Object.keys(commonErrors).forEach(error => {
          if (sentence.toLowerCase().includes(error)) {
            mockIssues.push({
              text: error,
              type: 'spelling',
              suggestion: `Did you mean "${commonErrors[error]}"?`,
              start: content.toLowerCase().indexOf(error),
              end: content.toLowerCase().indexOf(error) + error.length
            });
          }
        });
      });
      
      setIssues(mockIssues.slice(0, 5)); // Limit to 5 issues
    };

    const timer = setTimeout(checkGrammar, 1000);
    return () => clearTimeout(timer);
  }, [content]);

  if (issues.length === 0) {
    return (
      <div className="absolute top-2 right-2">
        <div className="flex items-center space-x-1 px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
          <CheckCircle size={12} />
          <span>No issues found</span>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-2 right-2">
      <button
        onClick={() => setShowSuggestions(!showSuggestions)}
        className="flex items-center space-x-1 px-2 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-800 rounded text-xs transition-colors"
      >
        <AlertCircle size={12} />
        <span>{issues.length} suggestion{issues.length !== 1 ? 's' : ''}</span>
      </button>
      
      {showSuggestions && (
        <div className="absolute top-8 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-10">
          <h4 className="font-semibold text-gray-900 mb-3">Writing Suggestions</h4>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {issues.map((issue, index) => (
              <div key={index} className="p-3 border border-gray-100 rounded-lg">
                <div className="flex items-start justify-between mb-1">
                  <span className={`text-xs px-2 py-1 rounded capitalize ${
                    issue.type === 'grammar' ? 'bg-red-100 text-red-800' :
                    issue.type === 'style' ? 'bg-blue-100 text-blue-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {issue.type}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-medium">"{issue.text}"</span>
                </p>
                <p className="text-xs text-gray-600">{issue.suggestion}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GrammarChecker;