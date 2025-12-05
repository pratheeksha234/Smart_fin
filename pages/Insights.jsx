import React, { useState } from 'react';

const Insights = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: 'Hello! I’m your SmartFin AI Assistant 🤖. Ask me anything about your finances, investing, or budgeting!',
    },
  ]);
  const [userInput, setUserInput] = useState('');

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { type: 'user', text: userInput }];
    setMessages(newMessages);
    setUserInput('');

    try {
      const response = await fetch('http://localhost:5000/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: userInput }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages([...newMessages, { type: 'bot', text: data.reply }]);
      } else {
        setMessages([
          ...newMessages,
          { type: 'bot', text: `❌ Error: ${data.error || 'No response from AI.'}` },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([
        ...newMessages,
        {
          type: 'bot',
          text: '⚠ Oops! Could not connect to the AI engine. Is your Flask server running?',
        },
      ]);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🧠 AI Insights</h2>

      <div className="card p-4 mb-4">
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`mb-2 ${msg.type === 'user' ? 'text-end' : 'text-start'}`}
            >
              <span
                className={`d-inline-block p-2 rounded ${
                  msg.type === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-light text-dark'
                }`}
              >
                {msg.text}
              </span>
            </div>
          ))}
        </div>

        <div className="input-group mt-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ask your personal finance AI..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="btn btn-dark" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>

      <div className="alert alert-info">
        💡 You are using GPT4All locally. No internet needed for smart, secure financial advice.
      </div>
    </div>
  );
};

export default Insights;
