// frontend/src/components/TranslationForm.tsx
import React, { useState } from 'react';

export default function TranslationForm() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('zh-CN');
  const [translatedText, setTranslatedText] = useState('');

  const handleTranslate = async () => {
    const res = await fetch('http://127.0.0.1:8000/translate/', {
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
    <div style={{ padding: '1rem', border: '1px solid #ddd', margin: '1rem' }}>
      <h3>Translate Menu</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate..."
        rows={4}
        style={{ width: '100%' }}
      /><br />
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        <option value="zh-CN">Chinese Simplified</option>
        <option value="zh-TW">Chinese Traditional</option>
        <option value="en">English</option>
      </select><br /><br />
      <button onClick={handleTranslate}>Translate</button>
      {translatedText && (
        <div style={{ marginTop: '1rem', padding: '0.5rem', border: '1px solid #ccc' }}>
          <h4>Translated Text:</h4>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}