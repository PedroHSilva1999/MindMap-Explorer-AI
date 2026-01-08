
import React, { useState } from 'react';
import { MindMap } from './components/MindMap';
import { AnnotationDetails } from './components/AnnotationDetails';
import { Search } from './components/Search';
import { Guide } from './components/Guide';
import { Home } from './components/Home';
import { Search as SearchIcon, Info, ArrowLeft, Sparkles } from 'lucide-react';
import { SPRING_DATA } from './constants';
import { AnnotationNode } from './types';
import { generateMindMap } from './services/geminiService';

interface Topic {
  id: string;
  name: string;
  category: string;
  data: AnnotationNode;
}

const App: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 'spring-1',
      name: 'Spring Framework',
      category: 'Tópicos Java',
      data: SPRING_DATA
    }
  ]);

  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleSearch = async (query: string) => {
    try {
      const mindMapData = await generateMindMap(query);
      const newTopic: Topic = {
        id: Date.now().toString(),
        name: query,
        category: 'Pesquisas Recentes',
        data: mindMapData
      };
      setTopics(prev => [newTopic, ...prev]);
      setActiveTopic(newTopic);
    } catch (error) {
      console.error("Erro ao pesquisar:", error);
      alert("Não foi possível gerar o mapa mental para este termo.");
    }
  };

  if (!activeTopic) {
    return (
      <Home
        topics={topics}
        onSelectTopic={setActiveTopic}
        onSearch={handleSearch}
      />
    );
  }

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans animate-in fade-in duration-500">
      <header className="h-16 px-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md z-20">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setActiveTopic(null)}
            className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 hover:text-white transition-all flex items-center space-x-2"
          >
            <ArrowLeft size={20} />
            <span className="text-sm font-medium hidden md:block">Voltar ao Início</span>
          </button>
          <div className="h-6 w-[1px] bg-slate-800" />
          <div>
            <h1 className="text-lg font-bold text-white flex items-center space-x-2">
              <span className="text-green-500">{activeTopic.name}</span>
            </h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">{activeTopic.category}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setActiveTopic(null)}
            className="flex items-center space-x-2 text-sm bg-green-600/10 text-green-500 hover:bg-green-600/20 px-4 py-2 rounded-full border border-green-500/20 transition-all"
          >
            <Sparkles size={16} />
            <span className="font-bold uppercase tracking-wider text-[10px]">Nova Pesquisa</span>
          </button>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <SearchIcon size={16} />
            <span>Buscar no Mapa</span>
          </button>
          <button
            onClick={() => setIsGuideOpen(true)}
            className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <Info size={16} />
            <span>Guia</span>
          </button>
          <div className="h-6 w-[1px] bg-slate-800" />
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-teal-500 to-green-500" />
            <span className="text-sm font-medium">Desenvolvedor</span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative">
        <MindMap
          data={activeTopic.data}
          onNodeClick={(name) => {
            setSelectedAnnotation(name);
          }}
        />

        <AnnotationDetails
          annotationName={selectedAnnotation}
          onClose={() => setSelectedAnnotation(null)}
        />

        <Search
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelect={(name) => {
            setSelectedAnnotation(name);
          }}
        />

        <Guide
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
        />
      </main>

      <footer className="h-8 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-6 text-[10px] text-slate-500">
        <div className="flex items-center space-x-4">
          <span>MindMap Explorer AI v1.0.0</span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Cérebro IA Online</span>
          </span>
        </div>
        <div className="font-mono text-[9px] md:text-[10px]">
          ORGANIZADO POR TÓPICOS E PASTAS
        </div>
      </footer>
    </div>
  );
};

export default App;
