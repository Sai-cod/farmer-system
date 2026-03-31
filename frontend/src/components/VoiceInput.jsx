import React, { useState, useRef } from 'react';
import { Mic } from 'lucide-react';

const VoiceInput = ({ onTranscript, disabled }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const startRecording = () => {
    if (disabled) return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Your browser does not support the Web Speech API.');
      return;
    }

    try {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = 'mr-IN'; // Marathi language localization
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => setIsRecording(true);
      
      recognitionRef.current.onresult = (event) => {
        const resultText = event.results[0][0].transcript;
        if(onTranscript) onTranscript(resultText);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech API Error:', event.error);
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => setIsRecording(false);
      
      recognitionRef.current.start();
    } catch (err) {
      console.error('Failed to initialize microphone', err);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
    }
  };

  return (
    <button 
      className={`icon-btn ${isRecording ? 'active' : ''}`}
      onMouseDown={startRecording} 
      onMouseUp={stopRecording}
      onMouseLeave={stopRecording}
      onTouchStart={startRecording}
      onTouchEnd={stopRecording}
      title={isRecording ? "Listening..." : "Hold to Speak (Marathi)"}
    >
      <Mic size={20} />
    </button>
  );
};

export default VoiceInput;
