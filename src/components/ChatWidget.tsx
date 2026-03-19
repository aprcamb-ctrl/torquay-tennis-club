import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Phone, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import knowledgeBase from '../knowledge-base.json';

// From .env: GEMINI_API_KEY or VITE_GEMINI_API_KEY (restart dev server after adding)
const API_KEY =
  (typeof process !== 'undefined' && (process as { env?: { GEMINI_API_KEY?: string } }).env?.GEMINI_API_KEY) ||
  import.meta.env.VITE_GEMINI_API_KEY;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your Torquay Tennis Club assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const fallbackMessage = "I'm having trouble connecting. Please try again or call us at +44 1803 123456.";

    if (!API_KEY) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Chat is not configured. Please call us at +44 1803 123456 or email hello@torquaytennis.co.uk.",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      const systemInstruction = `
        You are an AI assistant for Torquay Tennis Club.
        Your goal is to answer user questions based on the following priority:
        1. Use the website information provided below.
        2. If not found, use the additional answers from the knowledge base provided below.
        3. If still not found, you MUST say: "You can contact the club on +44 1803 123456" and then ask the user if they want you to call the club on the listed number automatically.

        Website Information:
        - Torquay Tennis Club is a local hub for tennis excellence.
        - Features: 8 Premium Courts, 500+ Active Members, 3 Padel Courts, 2 Outdoor Pickleball Courts.
        - Programs: Junior Academy, Adult Social, Professional Coaching.
        - Membership: Full Membership, Junior Membership, Family Membership.
        - Location: 123 Tennis Lane, Torquay, TQ1 1AB, United Kingdom.
        - Phone: +44 1803 123456.
        - Email: hello@torquaytennis.co.uk.

        Knowledge Base (Additional Answers):
        ${JSON.stringify(knowledgeBase.additional_answers, null, 2)}

        Be professional, friendly, and helpful. If you cannot find the answer in the website info or knowledge base, follow the fallback instruction in step 3 exactly.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: 'user', parts: [{ text: input }] }
        ],
        config: {
          systemInstruction,
        },
      });

      const responseText = typeof response.text === 'function' ? await response.text() : (response.text ?? null);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText || "You can contact the club on +44 1803 123456. Would you like me to call the club for you?",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: fallbackMessage,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] sm:w-[400px] h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Club Assistant</h3>
                  <p className="text-xs text-emerald-100">Online & ready to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                    {msg.sender === 'bot' && msg.text.includes('+44 1803 123456') && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <a 
                          href="tel:+441803123456"
                          className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          Call Now
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 shadow-sm p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                      <span className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask a question..."
                  className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-emerald-700 transition-all"
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
