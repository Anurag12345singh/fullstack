import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 
function App() {
  const [text, setText] = useState('');
  const [targetLang, setTargetLang] = useState('');
  const [translation, setTranslation] = useState('');
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    try {
      const response = await axios.post('http://localhost:5000/translate', {
        text,
        targetlang: targetLang,
      });
      setTranslation(response.data.data.translations[0].translatedText);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Failed to translate text');
      setTranslation('');
    }
  };

  return (
    <div className="App">
      <h1>Translator App</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate"
      />
      <select
        value={targetLang}
        onChange={(e) => setTargetLang(e.target.value)}
      >
        <option value="">Select target language</option>
        <option value="fr">French</option>
     
      </select>
      <button onClick={handleTranslate}>Translate</button>
      {translation && <p className="translation" >Translation: {translation}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
