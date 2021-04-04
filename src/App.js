import { useState } from 'react';
import './App.css';

function App() {
  const [thought, setThought] = useState({ date: new Date().toISOString().split('T')[0], text: ''});
  const [memories, setMemories] = useState();

  const getMemories = async () => {
    const resp = await fetch('/api/memories');
    const data = await resp.json();
    setMemories(data);
  }

  const memCard = (m, i) => <div key={i}>{m.data.text}</div>
  
  const renderMemories = memories ? memories.map(memCard) 
    : <button onClick={getMemories}>Show memories</button>

  const saveThought = async () => {
    const resp = await fetch('/api/post-memory', { 
      method: 'POST',
      body: JSON.stringify(thought),
    });
    const { error, message } = await resp.json();
    error ? console.error(error) : console.log(message);
  };

  const handleThoughtChange = e => setThought({ ...thought, [e.target.name]: e.target.value });

  return (
    <div id="memories">{renderMemories}</div>
    // <div className="App">
    //   <h1>Memories</h1>
    //   <input type="date" name="date" value={thought.date} onChange={handleThoughtChange} />
    //   <input type="text" name="text" placeholder="Your thought" value={thought.text} onChange={handleThoughtChange} />
    //   <button onClick={saveThought}>Commit to memory</button>
    // </div>
  );
}

export default App;
