import React, { createContext, useContext, useState, useEffect } from 'react';

interface Project {
  id: string;
  title: string;
  content: string;
  type: 'story' | 'article' | 'script' | 'other';
  createdAt: string;
  updatedAt: string;
  wordCount: number;
  isPublic: boolean;
  tags: string[];
}

interface ProjectContextType {
  projects: Project[];
  createProject: (title: string, content: string, type?: Project['type']) => Project;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    // Load projects from localStorage
    const savedProjects = localStorage.getItem('writeai_projects');
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Create some sample projects
      const sampleProjects: Project[] = [
        {
          id: '1',
          title: 'The Mysterious Library',
          content: 'In the heart of the old city stood a library that appeared only on foggy nights...',
          type: 'story',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 3600000).toISOString(),
          wordCount: 1250,
          isPublic: true,
          tags: ['mystery', 'fantasy']
        },
        {
          id: '2',
          title: 'AI in Modern Writing',
          content: 'The integration of artificial intelligence in writing processes has revolutionized...',
          type: 'article',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 7200000).toISOString(),
          wordCount: 850,
          isPublic: false,
          tags: ['technology', 'writing']
        }
      ];
      setProjects(sampleProjects);
      localStorage.setItem('writeai_projects', JSON.stringify(sampleProjects));
    }
  }, []);

  const saveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem('writeai_projects', JSON.stringify(newProjects));
  };

  const createProject = (title: string, content: string, type: Project['type'] = 'other'): Project => {
    const newProject: Project = {
      id: Date.now().toString(),
      title,
      content,
      type,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      wordCount: content.trim().split(/\s+/).filter(word => word.length > 0).length,
      isPublic: false,
      tags: []
    };

    const newProjects = [newProject, ...projects];
    saveProjects(newProjects);
    return newProject;
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    const newProjects = projects.map(project => {
      if (project.id === id) {
        const updated = { 
          ...project, 
          ...updates, 
          updatedAt: new Date().toISOString() 
        };
        
        // Update word count if content changed
        if (updates.content !== undefined) {
          updated.wordCount = updates.content.trim().split(/\s+/).filter(word => word.length > 0).length;
        }
        
        return updated;
      }
      return project;
    });
    saveProjects(newProjects);
  };

  const deleteProject = (id: string) => {
    const newProjects = projects.filter(project => project.id !== id);
    saveProjects(newProjects);
  };

  const getProject = (id: string): Project | undefined => {
    return projects.find(project => project.id === id);
  };

  const value = {
    projects,
    createProject,
    updateProject,
    deleteProject,
    getProject
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};