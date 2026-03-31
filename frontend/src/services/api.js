// Centralize API endpoints and logical services
const API_BASE_URL = 'http://localhost:8000/api'; // Replace with actual backend

export const apiService = {
  /**
   * Send a text message to the RAG/LLM backend
   */
  sendMessage: async (message) => {
    // TODO: Replace with fetch call to actual backend
    console.log(`Sending text: ${message}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ reply: "This is a placeholder response. Connect the backend to see real AI advice!" });
      }, 800);
    });
  },

  /**
   * Send an image for disease detection
   */
  uploadImage: async (file) => {
    // TODO: Replace with FormData fetch call
    console.log(`Uploading ${file.name}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ diagnosis: "Placeholder Diagnosis: Healthy Crop. No immediate action required." });
      }, 1500);
    });
  },

  /**
   * Process and translate/transcribe Marathi voice input
   */
  processVoice: async (transcription) => {
    // TODO: Send transcription to language model logic
    console.log(`Processing voice transcript: ${transcription}`);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ reply: "व्हॉइस इनपुट प्राप्त झाले. (Voice input received.)" });
      }, 800);
    });
  }
};
