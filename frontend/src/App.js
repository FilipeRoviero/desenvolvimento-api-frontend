import React, { useState, useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.css';

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '' });

  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched items:', data);
        setItems(data);
      })
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description) {
      alert('Por favor, coloque nome e descrição.');
      return;
    }

    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem),
    })
      .then(response => response.json())
      .then(item => {
        console.log('Item added:', item);
        setItems(prevItems => [...prevItems, item]);
        setNewItem({ name: '', description: '' }); // Limpa os campos dos Inputs
      })
      .catch(error => console.error('Erro ao adicionar item:', error));
  };

  const handleUpdateItem = (id) => {
    const updatedItem = prompt("Coloque um novo nome e descrição (separado por vírgula):", `${newItem.name}, ${newItem.description}`);
    if (!updatedItem) return;

    const [name, description] = updatedItem.split(',').map(part => part.trim());
    if (!name || !description) {
      alert('Por favor, coloque nome e descrição');
      return;
    }

    fetch(`http://localhost:3000/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    })
      .then(response => response.json())
      .then(updatedItem => {
        setItems(items.map(item => item.id === id ? updatedItem : item));
      })
      .catch(error => console.error('Erro ao atualizar item:', error));
  };

  const handleDeleteItem = (id) => {
    if (window.confirm('Tem certeza que deseja remover este item?')) {
      fetch(`http://localhost:3001/items/${id}`, { method: 'DELETE' })
        .then(() => {
          setItems(items.filter(item => item.id !== id));
        })
        .catch(error => console.error('Erro ao remover item:', error));
    }
  };

  return (
    <div>
      <h1>Lista de Itens</h1>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button className='btn btn-primary' onClick={() => handleUpdateItem(item.id)}>Editar</button>
            <button className='btn btn-danger' onClick={() => handleDeleteItem(item.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <h3>Para adicionar um item insira:</h3>
      <input
        type="text"
        placeholder="Nome do item"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
      <br/>
      <input
        type="text"
        placeholder="Descrição do item"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />
      <br/>
      <button className='btn btn-success btn-lg' onClick={handleAddItem}>Adicionar Item</button>
    </div>
  );
}

export default App;
