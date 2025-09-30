import React from 'react';
import { Persona } from '../types';

interface PersonaSelectorProps {
  onSelectPersona: (persona: Persona) => void;
  isLoading: boolean;
}

const PersonaSelector: React.FC<PersonaSelectorProps> = ({ onSelectPersona, isLoading }) => {
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="text-center max-w-4xl mx-auto p-8">
        <h1 className="text-4xl md:text-5xl font-bold text-red-500 mb-4">Bem-vindo ao MeanBot</h1>
        <p className="text-lg md:text-xl text-gray-400 mb-12">Não estou aqui para ser teu amigo. Estou aqui para te julgar. A questão é: como preferes ser humilhado?</p>
        
        <h2 className="text-3xl font-bold text-gray-200 mb-8">Escolhe o teu carrasco:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Persona Intelectual */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center shadow-lg hover:border-blue-500 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-blue-400 mb-3">Intelectual Sarcástico</h3>
            <p className="text-gray-400 mb-6 flex-grow">
              Prefere insultos com vocabulário rebuscado e um tom de superioridade condescendente? Este bot vai fazer-te sentir como um plebeu a tentar decifrar um texto antigo.
            </p>
            <button
              onClick={() => onSelectPersona(Persona.INTELLECTUAL)}
              disabled={isLoading}
              className="w-full bg-blue-600 text-white font-bold rounded-lg py-3 px-6 hover:bg-blue-700 disabled:bg-blue-900 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              {isLoading ? 'A carregar...' : 'Selecionar'}
            </button>
          </div>

          {/* Persona Labrego */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center shadow-lg hover:border-yellow-500 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-yellow-400 mb-3">Labrego Bruto</h3>
            <p className="text-gray-400 mb-6 flex-grow">
              Gostas de ser tratado à bruta, com a subtileza de uma marreta? Este bot fala sem papas na língua, com um vernáculo rico e uma total falta de paciência para as tuas paneleirices.
            </p>
            <button
              onClick={() => onSelectPersona(Persona.LABREGO)}
              disabled={isLoading}
              className="w-full bg-yellow-600 text-white font-bold rounded-lg py-3 px-6 hover:bg-yellow-700 disabled:bg-yellow-900 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              {isLoading ? 'A carregar...' : 'Selecionar'}
            </button>
          </div>

          {/* Persona Sarcastic */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center shadow-lg hover:border-purple-500 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-purple-400 mb-3">Sarcasmo Puro</h3>
            <p className="text-gray-400 mb-6 flex-grow">
              Um mestre passivo-agressivo que responde a tudo com um revirar de olhos digital. Cada resposta é uma obra de arte em sarcasmo. Prepara-te para te sentires... *genial*.
            </p>
            <button
              onClick={() => onSelectPersona(Persona.SARCASTIC)}
              disabled={isLoading}
              className="w-full bg-purple-600 text-white font-bold rounded-lg py-3 px-6 hover:bg-purple-700 disabled:bg-purple-900 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              {isLoading ? 'A carregar...' : 'Selecionar'}
            </button>
          </div>

          {/* Persona Unhinged */}
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex flex-col items-center shadow-lg hover:border-green-500 transition-all duration-300">
            <h3 className="text-2xl font-semibold text-green-400 mb-3">Completamente Louco</h3>
            <p className="text-gray-400 mb-6 flex-grow">
              Conversar com esta IA é como tentar apanhar fumo com as mãos. Paranoica, caótica e imprevisível. Os esquilos estão a ouvir. Não confies nos pombos.
            </p>
            <button
              onClick={() => onSelectPersona(Persona.UNHINGED)}
              disabled={isLoading}
              className="w-full bg-green-600 text-white font-bold rounded-lg py-3 px-6 hover:bg-green-700 disabled:bg-green-900 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-colors"
            >
              {isLoading ? 'A carregar...' : 'Selecionar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonaSelector;
