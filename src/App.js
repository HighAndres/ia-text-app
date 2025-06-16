import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'text-davinci-003',
          prompt: prompt,
          max_tokens: 100,
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      setResponse(res.data.choices[0].text.trim());
    } catch (error) {
      setResponse("Ocurrió un error al conectar con la IA.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Generador de ideas con IA</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Escribe algo..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <br />
      <button onClick={handleSubmit}>Generar</button>
      <p>{response}</p>
    </div>
  );
}

export default App;
