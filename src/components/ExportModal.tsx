import React, { useState } from 'react';
import { X, Download, FileText, Globe, Share2 } from 'lucide-react';

interface ExportModalProps {
  project: any;
  onClose: () => void;
}

const ExportModal: React.FC<ExportModalProps> = ({ project, onClose }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exporting, setExporting] = useState(false);

  const exportOptions = [
    { id: 'pdf', name: 'PDF Document', icon: FileText, description: 'Print-ready PDF format' },
    { id: 'docx', name: 'Word Document', icon: FileText, description: 'Microsoft Word format' },
    { id: 'html', name: 'Web Page', icon: Globe, description: 'HTML format for web' },
    { id: 'txt', name: 'Plain Text', icon: FileText, description: 'Simple text file' }
  ];

  const handleExport = async () => {
    setExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Create and download file based on format
    let content = '';
    let filename = '';
    let mimeType = '';
    
    switch (exportFormat) {
      case 'pdf':
        // In a real app, you'd use a PDF library like jsPDF
        content = `${project.title}\n\n${project.content}`;
        filename = `${project.title.replace(/\s+/g, '_')}.txt`; // Simplified for demo
        mimeType = 'text/plain';
        break;
      case 'docx':
        // In a real app, you'd use a library like docx
        content = `${project.title}\n\n${project.content}`;
        filename = `${project.title.replace(/\s+/g, '_')}.txt`; // Simplified for demo
        mimeType = 'text/plain';
        break;
      case 'html':
        content = `
<!DOCTYPE html>
<html>
<head>
  <title>${project.title}</title>
  <style>
    body { font-family: Georgia, serif; max-width: 800px; margin: 0 auto; padding: 2rem; line-height: 1.6; }
    h1 { color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 0.5rem; }
    p { margin-bottom: 1rem; }
  </style>
</head>
<body>
  <h1>${project.title}</h1>
  <div>${project.content.replace(/\n/g, '<br>')}</div>
</body>
</html>`;
        filename = `${project.title.replace(/\s+/g, '_')}.html`;
        mimeType = 'text/html';
        break;
      case 'txt':
        content = `${project.title}\n${'='.repeat(project.title.length)}\n\n${project.content}`;
        filename = `${project.title.replace(/\s+/g, '_')}.txt`;
        mimeType = 'text/plain';
        break;
    }
    
    // Create and download file
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    setExporting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Download className="h-6 w-6 text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Export Project</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Export Format</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exportOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => setExportFormat(option.id)}
                  className={`p-4 text-left border-2 rounded-lg transition-colors ${
                    exportFormat === option.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon size={20} className={exportFormat === option.id ? 'text-blue-600' : 'text-gray-600'} />
                    <span className="font-medium text-gray-900">{option.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{option.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-2">Preview Information</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p><span className="font-medium">Title:</span> {project.title}</p>
            <p><span className="font-medium">Word Count:</span> {project.wordCount} words</p>
            <p><span className="font-medium">Type:</span> {project.type}</p>
            <p><span className="font-medium">Last Modified:</span> {new Date(project.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Share2 size={16} className="text-gray-400" />
            <span className="text-sm text-gray-600">Export will include all current content</span>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={exporting}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg transition-colors"
            >
              <Download size={16} />
              <span>{exporting ? 'Exporting...' : 'Export'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;