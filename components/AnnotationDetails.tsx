
import React, { useEffect, useState } from 'react';
import { AIAnnotationDetail } from '../types';
import { fetchAnnotationDetails } from '../services/geminiService';
import { Loader2, BookOpen, Code, Lightbulb, ChevronRight, X } from 'lucide-react';

interface Props {
  annotationName: string | null;
  onClose: () => void;
}

export const AnnotationDetails: React.FC<Props> = ({ annotationName, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<AIAnnotationDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!annotationName) {
      setData(null);
      return;
    }

    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchAnnotationDetails(annotationName);
        setData(result);
      } catch (err) {
        console.error(err);
        setError("Falha ao buscar detalhes da IA. Por favor, tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [annotationName]);

  if (!annotationName) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-slate-900 border-l border-slate-700 shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300 animate-in slide-in-from-right">
      <div className="sticky top-0 bg-slate-900/90 backdrop-blur p-6 border-b border-slate-700 flex justify-between items-center z-10">
        <h2 className="text-2xl font-bold text-teal-400 font-mono">{annotationName}</h2>
        <button 
          onClick={onClose}
          className="p-2 hover:bg-slate-800 rounded-full transition-colors"
        >
          <X size={24} className="text-slate-400" />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <Loader2 className="animate-spin text-teal-500" size={48} />
            <p className="text-slate-400 font-medium">Consultando IA sobre Spring...</p>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg text-red-200">
            {error}
          </div>
        ) : data ? (
          <>
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-300 font-semibold">
                <BookOpen size={18} className="text-teal-400" />
                <h3>Descrição</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm">
                {data.summary}
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-300 font-semibold">
                <ChevronRight size={18} className="text-teal-400" />
                <h3>Caso de Uso Principal</h3>
              </div>
              <p className="text-slate-300 leading-relaxed text-sm italic">
                {data.useCase}
              </p>
            </section>

            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-300 font-semibold">
                <Code size={18} className="text-teal-400" />
                <h3>Implementação do Código</h3>
              </div>
              <div className="bg-slate-950 rounded-lg p-4 font-mono text-xs overflow-x-auto border border-slate-800">
                <pre className="text-green-400 whitespace-pre-wrap break-all leading-relaxed">{data.codeExample}</pre>
              </div>
            </section>

            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-slate-300 font-semibold">
                <Lightbulb size={18} className="text-teal-400" />
                <h3>Dicas de Especialista</h3>
              </div>
              <ul className="space-y-2">
                {data.tips.map((tip, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-sm text-slate-400 bg-slate-800/50 p-3 rounded-md">
                    <span className="text-teal-500 font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </section>
          </>
        ) : (
          <p className="text-slate-500 text-center italic">Selecione um item para ver os detalhes.</p>
        )}
      </div>
    </div>
  );
};
