import { useEffect, useState } from 'react';
import './app.scss';

function App() {

  const [input, setInput] = useState();
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('todo-items')) || []);

  useEffect(() => {
    localStorage.setItem('todo-items', JSON.stringify(items))
  }, [items]);

  return (
    <div id="app">
        <h1>My Todo 🗒️</h1>

        <div className="container">
          <form>
            <h2>Add Item</h2>
            <input type="text" 
                placeholder="Title" 
                className="form-control" 
                autoComplete="off" 
                value={input}
                onChange={(event) => {
                  setInput(event.target.value);
                }}
            />
            <button
                onClick={(event) => { 
                  event.preventDefault();            
                    if(!input) {
                      alert('Value cannot be empty');
                      return;
                    }                    
                    const newItems = [...items, input];      
                    setItems(newItems);
                    setInput('');
                }}
            >Add</button>
            <button 
                className='orange'
                onClick={() => setItems([])}
            >
              Reset
            </button>
          </form>

          <div className="items">
            <h2>My Items</h2>
            <ol>
              {
                items.map((item,index) => {
                    return (
                        <li key={`item-${index}`}>
                          <h3>{item}</h3>
                          <button 
                              type='button' 
                              className="delete"
                              onClick={() => {
                                  const newItems = items.filter((item, indexItem) => {
                                      return indexItem !== index;
                                  })
                                  setItems(newItems);
                              }}
                          >
                          </button>
                        </li>        
                    )            
                })
              }
            </ol>
          </div>
        </div>
    </div>
  );
}

export default App;
