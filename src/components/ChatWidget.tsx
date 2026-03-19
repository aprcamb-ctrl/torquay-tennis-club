import { CLUB_KNOWLEDGE } from '../chat-constants';

// ... (existing helper function to find matches)
function findClubAnswer(input: string): string | null {
  const lowerInput = input.toLowerCase();

  // 1. Check Membership
  if (lowerInput.includes('membership') || lowerInput.includes('price') || lowerInput.includes('join') || lowerInput.includes('cost')) {
    return `We offer several membership options: 
${CLUB_KNOWLEDGE.membership.map(m => `• ${m.name} (${m.price}): ${m.description}`).join('\n')}
Which one are you interested in?`;
  }

  // 2. Check Facilities
  if (lowerInput.includes('court') || lowerInput.includes('facilit') || lowerInput.includes('padel') || lowerInput.includes('pickleball')) {
    return `Our world-class facilities include:
${CLUB_KNOWLEDGE.facilities.map(f => `• ${f.name}: ${f.detail}`).join('\n')}
Would you like to know more about a specific facility?`;
  }

  // 3. Check Programs/Coaching
  if (lowerInput.includes('coach') || lowerInput.includes('program') || lowerInput.includes('lesson') || lowerInput.includes('train')) {
    return `We have programs for every level:
${CLUB_KNOWLEDGE.programs.map(p => `• ${p.name}: ${p.detail}`).join('\n')}
You can book private lessons with our LTA accredited coaches at the reception.`;
  }

  // 4. Check Events
  if (lowerInput.includes('event') || lowerInput.includes('happen') || lowerInput.includes('night') || lowerInput.includes('festival')) {
    return `We have some exciting upcoming events:
${CLUB_KNOWLEDGE.events.map(e => `• ${e.name} (${e.date})`).join('\n')}
You can find more details in the Events section!`;
  }

  // 5. Check Time/Location
  if (lowerInput.includes('hour') || lowerInput.includes('open') || lowerInput.includes('time')) {
    return `The club is open daily from 7:00 AM to 10:00 PM.`;
  }
  if (lowerInput.includes('address') || lowerInput.includes('location') || lowerInput.includes('where')) {
    return `We are located at ${CLUB_KNOWLEDGE.contact.address}.`;
  }
  if (lowerInput.includes('contact') || lowerInput.includes('phone') || lowerInput.includes('email')) {
    return `You can reach us at ${CLUB_KNOWLEDGE.contact.phone} or ${CLUB_KNOWLEDGE.contact.email}.`;
  }

  return null;
}

// ... (rest of component)
    if (!API_KEY || API_KEY === 'YOUR_KEY_HERE') {
      const foundAnswer = findClubAnswer(input);

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
        Your goal is to answer user questions based on the following priority:
        1. Use the website information provided below.
        2. If not found, use the additional answers from the knowledge base provided below.
        3. If still not found, you MUST say: "You can contact the club on +44 1803 123456" and then ask the user if they want you to call the club on the listed number automatically.

        Website Information:
        - Torquay Tennis Club is a local hub for tennis excellence.
        - Features: 8 Premium Courts, 700+ Active Members, 3 Padel Courts, 2 Outdoor Pickleball Courts.
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
