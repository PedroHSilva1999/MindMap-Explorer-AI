
import React, { useState } from 'react';
import { MindMap } from './components/MindMap';
import { AnnotationDetails } from './components/AnnotationDetails';
import { Search } from './components/Search';
import { Guide } from './components/Guide';
import { Search as SearchIcon, Info, HelpCircle } from 'lucide-react';

const App: React.FC = () => {
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-950 text-slate-200 overflow-hidden font-sans">
      <header className="h-16 px-8 border-b border-slate-800 flex items-center justify-between bg-slate-900/50 backdrop-blur-md z-20">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-600 rounded-lg shadow-lg shadow-green-900/20">
            <svg width="24" height="24" viewBox="0 0 128 128" fill="white">
              <path d="M110.164 12c-4.664-4.52-11.232-7.536-18.784-9.352-15.112-3.528-36.944-1.8-50.64 4.504-10.424 4.8-19.168 12.832-24.816 23.368-2.672 4.968-3.928 10.32-3.928 16.056 0 14.28 8.04 26.544 19.336 31.912 3.928 1.864 7.568 2.376 11.232 2.376.672 0 1.344-.024 2.024-.048-2.312 3.016-4.536 6.136-6.6 9.424-6.432 10.232-11.336 21.6-12.824 33.72-.112.92.208 1.848.88 2.504.664.664 1.584.976 2.512.88 15.088-1.56 29.568-7.904 41.592-18.232 10.432-8.952 18.792-20.768 23.952-33.84 5.24 1.256 10.136 2.112 14.864 2.112 1.304 0 2.6-.072 3.888-.208 11.456-1.128 20.848-7.392 27.232-17.008 3.512-5.304 5.304-11.48 5.304-18.296 0-11.232-4.96-21.432-13.824-29.968zm-41.92 65.552c-7.232 18.336-19.128 34.088-34.424 45.472-3.04-11.896 1.808-23.016 10.328-36.568 5.08-8.08 11.088-15.656 18.28-22.368 4.6 9.544 6.944 20.376 5.816 33.464zm43.512-40.456c-4.48 6.76-11.144 11.136-19.168 12.352-1.288.192-2.584.288-3.888.288-2.616 0-5.12-.392-7.552-.944.576-4.368.648-9.04.144-13.928-.512-5.048-1.464-10.216-2.864-15.352 8.76 1.952 16.48 5.616 22.048 10.872 7.04 6.648 11.232 16.32 11.28 26.712z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">Spring <span className="text-green-500">Master</span></h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-semibold">Atlas Interativo de Annotations</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <SearchIcon size={16} />
            <span>Buscar</span>
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
        <MindMap onNodeClick={(name) => {
          setSelectedAnnotation(name);
          setShowWelcome(false);
        }} />

        {showWelcome && (
          <div className="absolute top-10 left-10 max-w-sm bg-slate-900/80 backdrop-blur-xl p-6 rounded-2xl border border-slate-700 shadow-2xl z-10 animate-in fade-in slide-in-from-top-4 duration-700">
            <div className="flex items-center space-x-3 mb-4">
              <HelpCircle className="text-teal-400" />
              <h3 className="font-bold text-lg">Explorador Interativo</h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Explore o núcleo do Spring Framework. Navegue pela hierarquia visual das anotações e clique em qualquer nó para obter insights técnicos profundos gerados por IA.
            </p>
            <div className="flex space-x-2">
              <span className="px-2 py-1 rounded bg-green-500/10 text-green-500 text-[10px] font-bold border border-green-500/20 uppercase">Boot</span>
              <span className="px-2 py-1 rounded bg-blue-500/10 text-blue-500 text-[10px] font-bold border border-blue-500/20 uppercase">Web</span>
              <span className="px-2 py-1 rounded bg-teal-500/10 text-teal-500 text-[10px] font-bold border border-teal-500/20 uppercase">Core</span>
            </div>
          </div>
        )}

        <AnnotationDetails
          annotationName={selectedAnnotation}
          onClose={() => setSelectedAnnotation(null)}
        />

        <Search
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          onSelect={(name) => {
            setSelectedAnnotation(name);
            setShowWelcome(false);
          }}
        />

        <Guide
          isOpen={isGuideOpen}
          onClose={() => setIsGuideOpen(false)}
        />
      </main>

      <footer className="h-8 bg-slate-900 border-t border-slate-800 flex items-center justify-between px-6 text-[10px] text-slate-500">
        <div className="flex items-center space-x-4">
          <span>v2.4.0 Interactive Engine</span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span>Cérebro IA Online</span>
          </span>
        </div>
        <div className="font-mono text-[9px] md:text-[10px]">
          CONSTRUÍDO PARA VELOCIDADE E APRENDIZAGEM
        </div>
      </footer>
    </div>
  );
};

export default App;
