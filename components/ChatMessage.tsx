import React from 'react';
import { Message, MessageRole } from '../types';

interface ChatMessageProps {
  message: Message;
}

const UserAvatar: React.FC = () => (
  <div className="h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center bg-gray-500 text-gray-200 ml-3">
    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  </div>
);

const ModelAvatar: React.FC = () => (
  <div className="h-10 w-10 rounded-full flex-shrink-0 flex items-center justify-center bg-red-600 text-white mr-3">
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM8.5 11h7c.28 0 .5.22.5.5s-.22.5-.5.5h-7c-.28 0-.5-.22-.5-.5s.22-.5.5-.5zm4.01-3.5c.27 0 .49.22.49.5v1c0 .28-.22.5-.49.5h-.02c-.27 0-.49-.22-.49-.5v-1c0-.28.22-.5.49-.5zm-3.02 0c.27 0 .49.22.49.5v1c0 .28-.22.5-.49.5h-.02c-.27 0-.49-.22-.49-.5v-1c0-.28.22-.5.49-.5zm4.5 5.5c-1.33 1.33-3.67 1.33-5 0-.2-.2-.2-.51 0-.71.2-.2.51-.2.71 0 1.05 1.05 3.28 1.05 4.33 0 .2-.2.51-.2.71 0 .2.19.2.51 0 .7z"/>
    </svg>
  </div>
);


const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === MessageRole.USER;

  const wrapperClasses = `flex w-full ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-slide-up`;
  const messageClasses = `max-w-xl rounded-2xl px-4 py-3 shadow-md ${
    isUser
      ? 'bg-gray-600 text-white rounded-br-none'
      : 'bg-gray-700 text-gray-200 rounded-bl-none'
  }`;

  return (
    <div className={wrapperClasses}>
      <div className={`flex items-start ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        {isUser ? <UserAvatar /> : <ModelAvatar />}
        <div className={messageClasses}>
          <p className="text-sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{message.content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;