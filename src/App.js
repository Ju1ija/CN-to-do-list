import './App.css';
import { useState } from "react";
import Advice from './components/Advice';
import Quote from './components/Quote';
import Activity from './components/Activity';
import Weather from './components/Weather';

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addHandler = (val) => {
    const storedItems = [...items];
    storedItems.push(val);
    setItems(storedItems);
    setInput("");
  }

  const editHandler = (index) => {
    const storedItems = [...items];
    const itemToEdit = storedItems.splice(index, 1);
    setItems(storedItems);
    setInput(itemToEdit);
  }

  const removeHandler = (index) => {
    const storedItems = [...items];
    storedItems.splice(index, 1);
    setItems(storedItems);
  }

  const submitData = (e) => {
    if (e.which === 13) {
      addHandler(input);
    }
  }

  return (
    <div className="all-components">
      <div className="left-side">
        <Advice />
        <Quote />
      </div>
      <div className="app">
        <h1>my to-do list: </h1>
        <ul>
          {items.map((item, index) => {
            if (item !== "") {
              return (
                <div className="list-item">
                  <li key={index}>{item}</li>
                  <div id="buttons">
                    <button onClick={() => editHandler(index)}>edit</button>
                    <button onClick={() => removeHandler(index)}>delete</button>
                  </div>
                </div>
              )
            }
          })}
        </ul>
        <input type="text" onChange={(event) => setInput(event.target.value)} onKeyPress={submitData} autocomplete="off" value={input} />
        <button onClick={() => addHandler(input)} id="add-button">add an item</button>
      </div>
      <div className="right-side">
        <Activity />
        <Weather />
      </div>
    </div>
  )
}

export default App;