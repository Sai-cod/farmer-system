import React, { useRef } from 'react';
import { Image as ImageIcon } from 'lucide-react';

const ImageUpload = ({ onImageSelect, disabled }) => {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
         if(onImageSelect) onImageSelect({ file, preview: reader.result });
      };
      reader.readAsDataURL(file);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: 'none' }}
      />
      <button 
        className="icon-btn" 
        disabled={disabled}
        onClick={() => fileInputRef.current?.click()}
        title="Upload crop image"
      >
        <ImageIcon size={20} />
      </button>
    </>
  );
};

export default ImageUpload;
