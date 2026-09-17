import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  MessageCircle, 
  ShieldCheck, 
  Building2, 
  ChevronRight,
  Maximize2,
  Minimize2,
  RefreshCw
} from 'lucide-react';
import { api } from '../lib/api';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

interface GeminiChatAssistantProps {
  currentContext?: string;
  whatsappNumber?: string;
}

export const GeminiChatAssistant: React.FC<GeminiChatAssistantProps> = ({
  currentContext,
  whatsappNumber = '+2347033385434'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Hello! I am the AI Strategist for Estate Shelters' Market Analysis Department (MAD) in Abuja. How can I assist with your property search, valuation, or inspection booking today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    "Tell me about ABU Estate in Kyami",
    "Show luxury terraces in Apo Dutse",
    "Explain Abuja C of O & AGIS titles",
    "Completed vs Carcass prices",
    "How to book a site inspection"
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageText = textToSend || input;
    if (!messageText.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      content: messageText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, content: m.content }));
      history.push({ role: 'user', content: messageText });

      const reply = await api.sendChatMessage(history, currentContext);
      
      const assistantMsg: ChatMessage = {
        role: 'assistant',
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (e) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Thank you for reaching out. We can assist you directly with Abuja properties and inspections. You can also message our senior advisors directly on WhatsApp at +2347033385434.",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppRedirect = () => {
    const lastUserQuery = messages.filter(m => m.role === 'user').slice(-1)[0]?.content || 'Abuja property inquiry';
    const text = `Hello Estate Shelters MAD Team, I was chatting with your AI assistant about: "${lastUserQuery}". I would like to speak with a property consultant.`;
    window.open(`https://wa.me/2348136656679?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-gradient-to-r from-blue-700 to-indigo-700 text-white shadow-2xl shadow-blue-900/40 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 group"
          id="open-gemini-chat-btn"
        >
          <div className="relative">
            <Sparkles className="w-6 h-6 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
          </div>
          <span className="hidden sm:inline font-bold text-xs tracking-wide">
            MAD Real Estate AI
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`fixed z-50 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col transition-all duration-300 ${
            isExpanded
              ? 'inset-4 sm:inset-10'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-blue-900 via-blue-800 to-slate-900 text-white rounded-t-3xl flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-blue-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <h3 className="text-sm font-bold">Estate Shelters MAD AI</h3>
                  <span className="text-[10px] bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-1.5 py-0.2 rounded">
                    Online
                  </span>
                </div>
                <p className="text-[10px] text-blue-200">
                  Market Analysis & Due Diligence Advisory
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10"
                title={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10"
                title="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Carousel */}
          <div className="p-2.5 bg-slate-50 dark:bg-slate-950/60 border-b border-slate-100 dark:border-slate-800 overflow-x-auto flex space-x-1.5 text-[11px] no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 shrink-0 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg, index) => {
              const isAssistant = msg.role === 'assistant';
              return (
                <div
                  key={index}
                  className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 space-y-1 ${
                      isAssistant
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700'
                        : 'bg-blue-600 text-white rounded-br-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] opacity-70 mb-1">
                      <span className="font-semibold flex items-center space-x-1">
                        {isAssistant ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        <span>{isAssistant ? 'MAD Strategist' : 'You'}</span>
                      </span>
                      <span>{msg.time}</span>
                    </div>

                    <div className="whitespace-pre-line leading-relaxed">
                      {msg.content}
                    </div>
                  </div>
                </div>
              );
            })}

            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 dark:bg-slate-800 p-3.5 rounded-2xl rounded-bl-xs border border-slate-200 dark:border-slate-700 flex items-center space-x-2 text-xs text-slate-500">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-blue-500" />
                  <span>Analyzing Abuja database & cadastral models...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input & WhatsApp CTA */}
          <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 rounded-b-3xl space-y-2">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleWhatsAppRedirect}
                className="px-2.5 py-2 rounded-xl bg-emerald-600/10 hover:bg-emerald-600 text-emerald-600 hover:text-white border border-emerald-500/20 text-[11px] font-semibold flex items-center space-x-1 shrink-0 transition-colors"
                title="Continue on WhatsApp with human agent"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">WhatsApp</span>
              </button>

              <form 
                onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} 
                className="flex-1 flex items-center space-x-1.5"
              >
                <input
                  type="text"
                  placeholder="Ask about Abuja properties, titles, yields..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="p-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
