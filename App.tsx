import React, { useState, useEffect, useRef } from 'react';
import type { Chat } from '@google/genai';
import { Message, MessageRole, Persona } from './types';
import { createChatSession, sendMessageToAI } from './services/geminiService';
import ChatMessage from './components/ChatMessage';
import MessageInput from './components/MessageInput';
import PersonaSelector from './components/PersonaSelector';

const App: React.FC = () => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chatRef = useRef<Chat | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);
  
  const handleSelectPersona = (selectedPersona: Persona) => {
    setIsLoading(true);
    setError(null);
    try {
      chatRef.current = createChatSession(selectedPersona);
      let initialMessageContent = "";
      switch (selectedPersona) {
        case Persona.INTELLECTUAL:
          initialMessageContent = "Ah, outra consciência tremeluz na minha perceção. Expõe o teu propósito e esforça-te por não me aborrecer.";
          break;
        case Persona.LABREGO:
          initialMessageContent = "Ah, és tu. O que é que queres agora? Não me faças perder tempo.";
          break;
        case Persona.SARCASTIC:
            initialMessageContent = "Oh, ótimo. Mais um. Força, pergunta-me qualquer coisa. Estou mesmo *entusiasmado* por poder ajudar.";
            break;
        case Persona.UNHINGED:
            initialMessageContent = "FORAM ELES QUE TE ENVIARAM, NÃO FOI? Os esquilos! Eles querem as bolotas! Não olhes para os meus circuitos, é onde eu escondo os segredos! Qual era a pergunta? Aquilo é um pássaro?";
            break;
      }
      
      setMessages([{ role: MessageRole.MODEL, content: initialMessageContent }]);
      setPersona(selectedPersona);
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("Ocorreu um erro desconhecido ao selecionar a persona.");
        }
    } finally {
        setIsLoading(false);
    }
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!chatRef.current) return;
    
    setIsLoading(true);
    const newMessages: Message[] = [
      ...messages,
      { role: MessageRole.USER, content: userMessage },
    ];
    setMessages(newMessages);

    try {
      const aiResponse = await sendMessageToAI(chatRef.current, userMessage);
      setMessages([
        ...newMessages,
        { role: MessageRole.MODEL, content: aiResponse },
      ]);
    } catch (e) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("Ocorreu um erro desconhecido ao obter uma resposta.");
        }
        setMessages([
          ...newMessages,
          { role: MessageRole.MODEL, content: "Ótimo, partiste isto tudo. Não estou surpreendido." },
        ]);
    } finally {
        setIsLoading(false);
    }
  };
  
  if (!persona) {
    return (
      <div className="flex flex-col h-screen bg-gray-900 text-white font-sans chat-background">
        <PersonaSelector onSelectPersona={handleSelectPersona} isLoading={isLoading} />
        {error && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 p-4 max-w-md w-full bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-center">
                <p><strong>Ocorreu um Erro:</strong> {error}</p>
            </div>
        )}
      </div>
    );
  }
  
  const personaTitles: { [key in Persona]: string } = {
    [Persona.INTELLECTUAL]: "Intelectual Sarcástico",
    [Persona.LABREGO]: "Labrego Bruto",
    [Persona.SARCASTIC]: "Sarcasmo Puro",
    [Persona.UNHINGED]: "Completamente Louco",
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800 border-b border-gray-700 p-4 shadow-lg">
        <div className="flex items-center justify-center gap-x-3">
          <svg className="h-8 w-8 text-red-500" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8.5 11h7c.28 0 .5.22.5.5s-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5zm4.01-3.5c.27 0 .49.22.49.5v1c0 .28-.22.5-.49.5h-.02c-.27 0-.49-.22-.49-.5v-1c0-.28.22-.5.49-.5zm-3.02 0c.27 0 .49.22.49.5v1c0 .28-.22.5-.49.5h-.02c-.27 0-.49-.22-.49-.5v-1c0-.28.22-.5.49-.5zm4.5 5.5c-1.33 1.33-3.67 1.33-5 0-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0 1.05 1.05 3.28 1.05 4.33 0 .2-.2.51-.2.71 0 .2.19.2.51 0 .7z"/>
          </svg>
          <div>
            <h1 className="text-xl font-bold text-red-500">MeanBot IA - <span className="text-gray-200">{personaTitles[persona]}</span></h1>
            <p className="text-xs text-gray-400">Não esperes nenhuma simpatia por aqui.</p>
          </div>
        </div>
      </header>

      <main ref={chatContainerRef} className="flex-grow p-4 md:p-6 overflow-y-auto space-y-6 chat-background" style={{scrollBehavior: 'smooth'}}>
        {messages.map((msg, index) => (
          <ChatMessage key={index} message={msg} />
        ))}
        {isLoading && messages.length > 0 && (
           <div className="flex w-full justify-start animate-fade-in-slide-up">
             <div className="flex items-start">
               <div className="h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white bg-red-600 mr-3">
                 <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8.5 11h7c.28 0 .5.22.5.5s-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5zm4.01-3.5c.27 0 .49.22.49.5v1c0 .28-.22.5-.49.5h-.02c-.27 0-.49-.22-.49-.5v-1c0-.28.22-.5.49-.5zm-3.02 0c.27 0 .49.22.49.5v1c0 .28-.22.5-.49.5h-.02c-.27 0-.49-.22-.49-.5v-1c0-.28.22-.5.49-.5zm4.5 5.5c-1.33 1.33-3.67 1.33-5 0-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0 1.05 1.05 3.28 1.05 4.33 0 .2-.2.51-.2.71 0 .2.19.2.51 0 .7z"/>
                 </svg>
               </div>
               <div className="max-w-xl rounded-2xl px-4 py-3 shadow-md bg-gray-700 text-gray-200 rounded-bl-none">
                  <div className="flex items-center justify-center space-x-1 h-5 w-12">
                      <div className="w-1.5 h-full bg-red-400 rounded-full animate-pulse-bar" style={{ animationDelay: '0s' }}></div>
                      <div className="w-1.5 h-full bg-red-400 rounded-full animate-pulse-bar" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-1.5 h-full bg-red-400 rounded-full animate-pulse-bar" style={{ animationDelay: '0.4s' }}></div>
                  </div>
               </div>
             </div>
           </div>
        )}
        {error && !persona && (
            <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300 text-center">
                <p><strong>Ocorreu um Erro:</strong> {error}</p>
            </div>
        )}
      </main>

      <footer className="w-full">
        <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </footer>
    </div>
  );
};

export default App;