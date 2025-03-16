import React, { useState } from 'react';

export default function TranslationForm() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('zh-CN');
  const [translatedText, setTranslatedText] = useState('');

  // Use the environment variable for the backend URL.
  const API_URL = import.meta.env.VITE_REACT_APP_API_URL || "http://127.0.0.1:8000";

  const handleTranslate = async () => {
    const res = await fetch(`${API_URL}/translate/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, target_language: targetLanguage }),
    });
    if (res.ok) {
      const data = await res.json();
      setTranslatedText(data.translated_text);
    } else {
      alert('Translation failed');
    }
  };

  return (
    <div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select
        value={targetLanguage}
        onChange={(e) => setTargetLanguage(e.target.value)}
      >
        <option value="zh-CN">Chinese Simplified</option>
        <option value="zh-TW">Chinese Traditional</option>
        <option value="en">English</option>
      </select>
      <button onClick={handleTranslate}>Translate</button>
      {translatedText && (
        <div>
          <h4>Translated Text:</h4>
          <pre>{translatedText}</pre>
        </div>
      )}
    </div>
  );
}