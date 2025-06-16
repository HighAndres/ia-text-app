import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    // Verificar si la clave está disponible
    console.log("CLAVE OPENAI:", process.env.REACT_APP_OPENAI_KEY);

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
      console.error("Error completo:", error);
      setResponse("Ocurrió un error al conectar con la IA.");
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Generador de ideas con IA</h1>
      <textarea
        rows="5"
        cols="50"
        placeholder="Escribe algo..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        style={{ marginBottom: 10, padding: 10, fontSize: '1rem' }}
      />
      <br />
      <button onClick={handleSubmit} style={{ padding: '10px 20px', fontSize: '1rem' }}>
        Generar
      </button>
      <p style={{ marginTop: 20 }}>{response}</p>
    </div>
  );
}

export default App;
