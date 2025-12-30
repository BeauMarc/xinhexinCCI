import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Message, Role } from '../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === Role.USER;
  const timestampLabel = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${isUser
          ? 'bg-emerald-700 text-white rounded-br-none'
          : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
        }`}>
        <div className="prose prose-sm max-w-none text-sm leading-relaxed prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:marker:text-emerald-500 prose-a:text-emerald-600 prose-pre:bg-gray-900 prose-pre:text-gray-100">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
        </div>
        <div className={`text-[10px] mt-1 ${isUser ? 'text-emerald-200' : 'text-gray-400'}`}>
          {timestampLabel}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
