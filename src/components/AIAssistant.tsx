import React, { useState } from 'react';
import { X, Send, Lightbulb, MessageSquare, Wand2 } from 'lucide-react';

interface AIAssistantProps {
  onClose: () => void;
  content: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose, content }) => {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      content: "Hi! I'm your AI writing assistant. I can help you improve your writing, brainstorm ideas, or overcome writer's block. What would you like to work on?"
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = [
    { icon: Lightbulb, text: 'Improve this paragraph', color: 'green' },
    { icon: Wand2, text: 'Make it more engaging', color: 'purple' },
    { icon: MessageSquare, text: 'Add dialogue', color: 'blue' },
    { icon: Lightbulb, text: 'Continue the story', color: 'orange' }
  ];

  const handleSendMessage = async (message?: string) => {
    const messageToSend = message || inputMessage.trim();
    if (!messageToSend) return;

    // Add user message
    const newMessages = [...messages, { type: 'user', content: messageToSend }];
    setMessages(newMessages);
    setInputMessage('');
    setLoading(true);
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "Here's a suggestion to improve your writing: Try adding more sensory details to help readers immerse themselves in the scene. Consider what characters can see, hear, smell, taste, or feel.",
        
        "I notice your dialogue could be more natural. Try reading it aloud - does it sound like something people would actually say? Add contractions and interruptions to make it feel more realistic.",
        
        "To make this more engaging, consider starting in the middle of action rather than with backstory. You can weave the background information in naturally as the story progresses.",
        
        "Your character development is strong, but you might want to give them a specific quirk or habit that makes them more memorable. Small details can make characters feel more real.",
        
        "The pacing here feels a bit slow. Try cutting unnecessary words and combining shorter sentences for better flow. Every word should serve a purpose."
      ];
      
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'ai', content: response }]);
      setLoading(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[80vh] flex flex-col scale-in shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-green-100 rounded-lg floating">
              <Lightbulb className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">AI Writing Assistant</h2>
            <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-300 hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} slide-in-${message.type === 'user' ? 'right' : 'left'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-lg shadow-md ${
                  message.type === 'user'
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                    : 'bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 text-gray-900 p-4 rounded-lg shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-green-600"></div>
                  <span>AI is thinking...</span>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={() => handleQuickAction(action.text)}
                  className={`flex items-center space-x-2 p-3 text-sm bg-${action.color}-50 hover:bg-${action.color}-100 text-${action.color}-700 rounded-lg transition-all duration-300 hover:scale-105`}
                >
                  <Icon size={16} />
                  <span>{action.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything about your writing..."
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 hover:border-green-400"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!inputMessage.trim() || loading}
              className="btn-primary px-4 py-3 disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;