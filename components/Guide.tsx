
import React from 'react';
import { HelpCircle, MousePointer2, ZoomIn, Search, Brain, X } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const Guide: React.FC<Props> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-teal-500/10 rounded-lg text-teal-500">
                            <HelpCircle size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-white">Guia do Explorador Spring</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-xl text-slate-400 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <section className="flex items-start space-x-4">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500 shrink-0">
                                <MousePointer2 size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">Navegação</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Clique e arraste no mapa para se mover. Clique em qualquer nó para ver detalhes.</p>
                            </div>
                        </section>

                        <section className="flex items-start space-x-4">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500 shrink-0">
                                <ZoomIn size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">Zoom</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Use o scroll do mouse ou o gesto de pinça no trackpad para aproximar ou afastar.</p>
                            </div>
                        </section>
                    </div>

                    <div className="space-y-6">
                        <section className="flex items-start space-x-4">
                            <div className="p-2 bg-green-500/10 rounded-lg text-green-500 shrink-0">
                                <Search size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">Busca Rápida</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Use a ferramenta de busca no topo para encontrar rapidamente qualquer anotação específica.</p>
                            </div>
                        </section>

                        <section className="flex items-start space-x-4">
                            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500 shrink-0">
                                <Brain size={18} />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-200 mb-1">Insights de IA</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">Nossas descrições e exemplos são gerados em tempo real por IA para garantir precisão e modernidade.</p>
                            </div>
                        </section>
                    </div>
                </div>

                <div className="p-6 bg-slate-950/50 border-t border-slate-800 flex justify-center">
                    <button
                        onClick={onClose}
                        className="px-8 py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-900/20 active:scale-95"
                    >
                        Entendi, vamos lá!
                    </button>
                </div>
            </div>
        </div>
    );
};
