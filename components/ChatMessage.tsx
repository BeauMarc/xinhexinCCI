import React from 'react';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${isUser
          ? 'bg-emerald-700 text-white rounded-br-none'
          : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
        }`}>
        <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</div>
        <div className={`text-[10px] mt-1 ${isUser ? 'text-emerald-200' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;