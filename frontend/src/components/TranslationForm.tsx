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

  
}