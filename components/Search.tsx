
import React, { useState, useMemo } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { SPRING_DATA } from '../constants';
import { AnnotationNode } from '../types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (name: string) => void;
}

export const Search: React.FC<Props> = ({ isOpen, onClose, onSelect }) => {
    const [query, setQuery] = useState('');

    const allAnnotations = useMemo(() => {
        const results: string[] = [];
        const traverse = (node: AnnotationNode) => {
            if (node.type === 'annotation') {
                results.push(node.name);
            }
            if (node.children) {
                node.children.forEach(traverse);
            }
        };
        traverse(SPRING_DATA);
        return results.sort();
    }, []);

    const filteredResults = useMemo(() => {
        if (!query.trim()) return [];
        return allAnnotations.filter(name =>
            name.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, allAnnotations]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 md:pt-24 px-2 md:px-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="p-3 md:p-4 border-b border-slate-800 flex items-center space-x-3">
                    <SearchIcon className="text-slate-400" size={18} />
                    <input
                        autoFocus
                        type="text"
                        placeholder="Buscar no mapa..."
                        className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-slate-500 text-sm md:text-base"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button onClick={onClose} className="p-1 hover:bg-slate-800 rounded-lg text-slate-400">
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-2">
                    {filteredResults.length > 0 ? (
                        filteredResults.map(name => (
                            <button
                                key={name}
                                onClick={() => {
                                    onSelect(name);
                                    onClose();
                                    setQuery('');
                                }}
                                className="w-full text-left p-3 hover:bg-slate-800 rounded-xl transition-colors flex items-center space-x-3 group"
                            >
                                <div className="w-2 h-2 rounded-full bg-green-500 group-hover:scale-125 transition-transform" />
                                <span className="font-medium text-slate-200 text-sm md:text-base">{name}</span>
                            </button>
                        ))
                    ) : query.trim() ? (
                        <p className="text-center py-8 text-slate-500 text-sm">Nenhuma anotação encontrada para "{query}"</p>
                    ) : (
                        <div className="py-8 text-center px-4">
                            <p className="text-slate-400 text-sm font-medium">Digite para buscar no mapa mental</p>
                            <p className="text-slate-500 text-[11px] mt-1">Localize rapidamente qualquer nó ou anotação</p>
                        </div>
                    )}
                </div>

                <div className="p-3 bg-slate-950/50 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500 uppercase tracking-widest">
                    <span>{allAnnotations.length} itens no mapa</span>
                    <span className="hidden md:flex items-center space-x-1">
                        <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700">ESC</kbd>
                        <span>para fechar</span>
                    </span>
                </div>
            </div>
        </div>
    );
};
