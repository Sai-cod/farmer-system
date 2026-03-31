import React, { useState } from 'react';
import ChatBox from './components/ChatBox';
import { Menu, Plus, MessageSquare } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <button className="new-chat-btn" onClick={() => window.location.reload()}>
          <Plus size={16} />
          New chat
        </button>
        
        <div className="history-list">
          <div className="history-item">
            <MessageSquare size={16} />
            Tomato blight discussion
          </div>
          <div className="history-item">
            <MessageSquare size={16} />
            Marathi voice queries
          </div>
           <div className="history-item">
            <MessageSquare size={16} />
            Wheat sowing calendar
          </div>
        </div>
      </div>
      
      {/* Main Chat Area Context Wrapper */}
      <div className="main-wrapper">
        <div className="header-mobile">
          <button className="icon-btn" style={{padding: '0'}} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} color="#ececf1" />
          </button>
          <div style={{ fontWeight: 500 }}>Farmer AI Advisory</div>
        </div>
        
        <ChatBox />
      </div>
    </>
  );
}

export default App;
