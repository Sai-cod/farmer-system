import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, Sprout, Sun, Zap } from 'lucide-react';
import { apiService } from '../services/api';
import VoiceInput from './VoiceInput';
import ImageUpload from './ImageUpload';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;
    if (isLoading) return;
    
    const userMsg = input.trim();
    const imageToSend = selectedImage;
    
    // Optimistic UI updates
    const newMsg = { 
      text: userMsg, 
      sender: 'user', 
      imagePreview: imageToSend?.preview 
    };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      let responseText = "";
      
      if (imageToSend) {
         // API Integration context for image + optional text
         const result = await apiService.uploadImage(imageToSend.file);
         responseText = `**Image Analysis Result:**\n${result.diagnosis}`;
         if (userMsg) {
             responseText += `\n\n*Noted your context (${userMsg}). Let me know if you need more details!*`;
         }
      } else if (userMsg) {
         // Standard text context 
         const response = await apiService.sendMessage(userMsg);
         responseText = response.reply;
      }
      
      setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
    } catch (error) {
      setMessages(prev => [...prev, { text: 'Connection Error: Unable to reach the backend service.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <div className="chat-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <h1>Farmer AI Advisory</h1>
            <div className="empty-grid">
              <div className="empty-col">
                <div className="empty-col-title"><Sun size={24}/> Examples</div>
                <div className="empty-card" onClick={() => setInput("How do I treat leaf curl in tomatoes?")}>"How do I treat leaf curl in tomatoes?"&nbsp;→</div>
                <div className="empty-card" onClick={() => setInput("What is the best time to sow wheat?")}>"What is the best time to sow wheat?"&nbsp;→</div>
              </div>
              <div className="empty-col">
                <div className="empty-col-title"><Zap size={24}/> Capabilities</div>
                <div className="empty-card">Upload crop crop images to detect diseases visually</div>
                <div className="empty-card">Use Voice interactions in native Marathi language</div>
              </div>
              <div className="empty-col">
                 <div className="empty-col-title"><Sprout size={24}/> Limitations</div>
                 <div className="empty-card">May occasionally generate incorrect agricultural advice</div>
                 <div className="empty-card">Knowledge cutoff based on the implemented pipeline</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-scroll">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-row ${msg.sender}`}>
                <div className="message-content">
                  <div className={`avatar ${msg.sender === 'user' ? 'user-av' : ''}`}>
                    {msg.sender === 'user' ? <User size={20} /> : <Sprout size={20} />}
                  </div>
                  <div className="msg-text">
                    {msg.imagePreview && (
                       <img src={msg.imagePreview} alt="Uploaded crop element" className="msg-image" />
                    )}
                    {msg.text && <div style={{marginTop: msg.imagePreview ? '0.5rem' : '0'}}>{msg.text}</div>}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message-row bot">
                <div className="message-content">
                  <div className="avatar"><Sprout size={20} /></div>
                  <div className="msg-text" style={{ color: 'var(--text-muted)' }}><span className="pulse"></span></div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
      
      {/* Docked Input Form */}
      <div className="input-container-wrapper">
        <div className="input-box">
          {selectedImage && (
            <div className="image-preview-area">
              <div className="preview-thumb">
                <img src={selectedImage.preview} alt="Queue Preview" />
                <button className="remove-img-btn" onClick={() => setSelectedImage(null)}>✕</button>
              </div>
            </div>
          )}
          <div className="input-controls">
            <ImageUpload disabled={isLoading} onImageSelect={setSelectedImage} />
            <VoiceInput disabled={isLoading} onTranscript={(text) => setInput(prev => prev + (prev ? ' ' : '') + text)} />
            
            <textarea 
              className="chat-input"
              rows={1}
              placeholder="Send a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              disabled={isLoading}
            />
            
            <button 
              className="send-btn" 
              disabled={isLoading || (!input.trim() && !selectedImage)}
              onClick={handleSend}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
