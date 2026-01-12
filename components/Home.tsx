
import React, { useState } from 'react';
import { Search, Sparkles, Folder, ArrowLeft } from 'lucide-react';
import { AnnotationNode } from '../types';

interface Topic {
    id: string;
    name: string;
    category: string;
    data: AnnotationNode;
}

interface Props {
    topics: Topic[];
    onSelectTopic: (topic: Topic) => void;
    onSearch: (query: string) => Promise<void>;
}

export const Home: React.FC<Props> = ({ topics, onSelectTopic, onSearch }) => {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        setIsSearching(true);
        try {
            await onSearch(query);
            setQuery('');
        } catch (error) {
            console.error(error);
        } finally {
            setIsSearching(false);
        }
    };

    const folders = topics.reduce((acc, topic) => {
        if (!acc[topic.category]) acc[topic.category] = [];
        acc[topic.category].push(topic);
        return acc;
    }, {} as Record<string, Topic[]>);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-950 p-6 animate-in fade-in duration-700">
            <div className="w-full max-w-2xl mb-16 text-center space-y-8">
                <div className="inline-block p-4 bg-green-600/10 rounded-3xl mb-4 border border-green-500/20">
                    <Sparkles className="text-green-500 w-12 h-12" />
                </div>
                <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter">
                    <span className="text-green-500">MindMap</span> Explorer <span className="text-blue-400">AI</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg px-4">Gere mapas mentais dinâmicos para qualquer tecnologia com inteligência artificial</p>

                <form onSubmit={handleSubmit} className="relative group mt-8 px-2 md:px-0">
                    <div className="absolute inset-y-0 left-6 md:left-6 flex items-center pointer-events-none">
                        <Search className="text-slate-500 group-focus-within:text-green-500 transition-colors" size={20} />
                    </div>
                    <input
                        type="text"
                        className="w-full bg-slate-900 border-2 border-slate-800 rounded-full py-4 md:py-5 pl-12 md:pl-16 pr-28 md:pr-32 text-base md:text-xl outline-none focus:border-green-500/50 focus:ring-4 focus:ring-green-500/10 transition-all shadow-2xl"
                        placeholder="O que quer aprender?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isSearching}
                    />
                    <button
                        type="submit"
                        disabled={isSearching || !query.trim()}
                        className="absolute right-4 md:right-3 top-2 md:top-3 bottom-2 md:bottom-3 px-4 md:px-8 bg-green-600 hover:bg-green-500 disabled:opacity-50 text-white font-bold rounded-full transition-all flex items-center space-x-2 shadow-lg text-sm md:text-base"
                    >
                        {isSearching ? <span className="animate-pulse">...</span> : <span>Explorar</span>}
                    </button>
                </form>
            </div>

            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(folders).map(([category, categoryTopics]) => (
                    <div key={category} className="space-y-4">
                        <div className="flex items-center space-x-3 text-slate-400 font-bold uppercase tracking-widest text-xs px-2">
                            <Folder size={14} className="text-green-500" />
                            <span>{category}</span>
                        </div>
                        <div className="grid gap-3">
                            {(categoryTopics as Topic[]).map((topic) => (
                                <button
                                    key={topic.id}
                                    onClick={() => onSelectTopic(topic)}
                                    className="w-full flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 rounded-2xl hover:bg-slate-800/50 hover:border-green-500/30 transition-all group"
                                >
                                    <span className="text-slate-200 font-medium group-hover:text-white">{topic.name}</span>
                                    <div className="p-1 rounded-lg bg-slate-800 group-hover:bg-green-600/20 text-slate-500 group-hover:text-green-500 transition-colors">
                                        <ArrowLeft size={16} className="rotate-180" />
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
