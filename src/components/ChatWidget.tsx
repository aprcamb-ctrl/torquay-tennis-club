import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Phone, Bot } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import knowledgeBase from '../knowledge-base.json';
import { CLUB_KNOWLEDGE } from '../chat-constants';

// From .env: GEMINI_API_KEY or VITE_GEMINI_API_KEY (restart dev server after adding)
const API_KEY =
  (typeof process !== 'undefined' && (process as { env?: { GEMINI_API_KEY?: string } }).env?.GEMINI_API_KEY) ||
  (import.meta as any).env.VITE_GEMINI_API_KEY;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

function findClubAnswer(input: string): string | null {
  const lowerInput = input.toLowerCase();
  const cleanInput = lowerInput.replace(/[?.,!]/g, '');
  const inputWords = cleanInput.split(/\s+/);

  // 1. Check NEW JSON Knowledge Base (club_knowledge_base with tags) - HIGH PRIORITY
  const clubMatches = (knowledgeBase as any).club_knowledge_base?.map((item: any) => {
    let score = 0;
    // Tag matches (High weight)
    item.tags.forEach((tag: string) => {
      const cleanTag = tag.toLowerCase();
      if (inputWords.includes(cleanTag)) score += 10;
      else if (cleanInput.includes(cleanTag)) score += 5;
    });
    // Question word matches (Medium weight)
    const questionWords = item.question.toLowerCase().replace(/[?.,!]/g, '').split(/\s+/);
    questionWords.forEach((word: string) => {
      if (word.length > 3 && !['tennis', 'club', 'torquay', 'how', 'what', 'where'].includes(word) && inputWords.includes(word)) {
        score += 5;
      }
    });
    return { item, score };
  }).filter((m: any) => m.score > 0).sort((a: any, b: any) => b.score - a.score);

  if (clubMatches && clubMatches.length > 0) return clubMatches[0].item.answer;

  // 2. Check Legacy Knowledge Base (additional_answers)
  const kbMatch = knowledgeBase.additional_answers.find(item => {
    const questionWords = item.question.toLowerCase().replace(/[?.,!]/g, '').split(/\s+/);
    return questionWords.some(word => word.length > 3 && inputWords.includes(word));
  });
  if (kbMatch) return kbMatch.answer;

  // 3. Check Membership Constants
  if (lowerInput.includes('membership') || lowerInput.includes('price') || lowerInput.includes('join') || lowerInput.includes('cost')) {
    return `We offer several membership options: 
${CLUB_KNOWLEDGE.membership.map(m => `• ${m.name} (${m.price}): ${m.description}`).join('\n')}
Which one are you interested in?`;
  }

  // 4. Check Facilities Constants
  if (lowerInput.includes('court') || lowerInput.includes('facilit') || lowerInput.includes('padel') || lowerInput.includes('pickleball')) {
    return `Our world-class facilities include:
${CLUB_KNOWLEDGE.facilities.map(f => `• ${f.name}: ${f.detail}`).join('\n')}
Would you like to know more about a specific facility?`;
  }

  // 5. Check Programs/Coaching Constants
  if (lowerInput.includes('coach') || lowerInput.includes('program') || lowerInput.includes('lesson') || lowerInput.includes('train')) {
    return `We have programs for every level:
${CLUB_KNOWLEDGE.programs.map(p => `• ${p.name}: ${p.detail}`).join('\n')}
You can book private lessons with our LTA accredited coaches at the reception.`;
  }

  // 6. Check Events Constants
  if (lowerInput.includes('event') || lowerInput.includes('happen') || lowerInput.includes('night') || lowerInput.includes('festival')) {
    return `We have some exciting upcoming events:
${CLUB_KNOWLEDGE.events.map(e => `• ${e.name} (${e.date})`).join('\n')}
You can find more details in the Events section!`;
  }

  // 7. Check Time/Location Constants
  if (lowerInput.includes('hour') || lowerInput.includes('open') || lowerInput.includes('time')) {
    return `The club is open Monday to Friday from 9:00 AM to 10:00 PM, and Saturday/Sunday from 9:00 AM to 5:00 PM.`;
  }
  if (lowerInput.includes('address') || lowerInput.includes('location') || lowerInput.includes('where')) {
    return `We are located at ${CLUB_KNOWLEDGE.contact.address}.`;
  }
  if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
    return `You can reach us at ${CLUB_KNOWLEDGE.contact.phone} or ${CLUB_KNOWLEDGE.contact.email}.`;
  }

  return null;
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
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    const fallbackMessage = "I'm having trouble connecting. Please try again or call us at +44 1803 123456.";

    // SMART LOCAL FALLBACK (Always check this first or if API key is invalid)
    if (!API_KEY || API_KEY === 'YOUR_KEY_HERE') {
      const foundAnswer = findClubAnswer(currentInput);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: foundAnswer || "I'm not exactly sure about that, but the club office can help! You can call us on +44 1803 123456 or email hello@torquaytennis.co.uk. Would you like me to call the office for you?",
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
      return;
    }

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      
      const systemInstruction = `
        You are an AI assistant for Torquay Tennis Club.
        Your goal is to answer user questions based on the website and knowledge base info.
        Be professional, friendly, and helpful.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash", // Use 2.0 flash as it's more stable for basic chat
        contents: [
          { role: 'user', parts: [{ text: currentInput }] }
        ],
        config: {
          systemInstruction,
        },
      });

      const responseText = response.text || (typeof response.text === 'function' ? await (response as any).text() : null);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText || "I'm not exactly sure, but you can contact the club on +44 1803 123456.",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat Error:', error);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: findClubAnswer(currentInput) || fallbackMessage,
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
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
            <div className="bg-emerald-600 p-4 text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold">Club Assistant</h3>
                  <p className="text-xs text-emerald-100 italic">Online & helpful</p>
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-100'
                        : 'bg-white text-gray-800 border border-gray-100 shadow-sm rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                    {msg.sender === 'bot' && msg.text.includes('+44 1803 123456') && (
                      <div className="mt-2 pt-2 border-t border-gray-100">
                        <a 
                          href="tel:+441803123456"
                          className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
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
                  <div className="bg-white border border-gray-100 shadow-sm p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
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
                  placeholder="Ask about membership, events, or courts..."
                  className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100 disabled:opacity-50 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 transition-all border-4 border-white"
        aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
