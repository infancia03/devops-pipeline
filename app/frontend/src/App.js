import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL || '';

function App() {
  const [items, setItems] = useState([]);
  const [health, setHealth] = useState(null);
  const [newItem, setNewItem] = useState({ title: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchHealth();
    fetchItems();
  }, []);

  const fetchHealth = async () => {
    try {
      const res = await axios.get(`${API_BASE}/health`);
      setHealth(res.data);
    } catch {
      setHealth({ status: 'error' });
    }
  };

  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/items`);
      setItems(res.data);
    } catch (err) {
      setError('Failed to load items. Is the backend running?');
    }
  };

  const createItem = async () => {
    if (!newItem.title.trim()) return;
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/api/items`, newItem);
      setNewItem({ title: '', description: '' });
      await fetchItems();
    } catch {
      setError('Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/items/${id}`);
      await fetchItems();
    } catch {
      setError('Failed to delete item');
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="card" style={{ borderLeft: '4px solid #2563eb' }}>
        <h1 style={{ color: '#1B2A4A', marginBottom: '0.5rem' }}>
          DevOps Pipeline Demo
        </h1>
        <p style={{ color: '#475569' }}>
          Jenkins · Docker · Kubernetes · AWS EC2
        </p>
        {health && (
          <span className={`status-badge ${health.status === 'ok' ? 'status-ok' : 'status-error'}`}
                style={{ marginTop: '0.5rem' }}>
            API: {health.status}
          </span>
        )}
      </div>

      {/* Error */}
      {error && (
        <div className="card" style={{ borderLeft: '4px solid #dc2626', color: '#dc2626' }}>
          {error}
          <button onClick={() => setError('')} style={{ marginLeft: '1rem', background: 'none', color: '#dc2626' }}>✕</button>
        </div>
      )}

      {/* Create Item */}
      <div className="card">
        <h2 style={{ marginBottom: '1rem', color: '#1B2A4A' }}>Add Item</h2>
        <input
          type="text"
          placeholder="Title *"
          value={newItem.title}
          onChange={e => setNewItem({ ...newItem, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newItem.description}
          onChange={e => setNewItem({ ...newItem, description: e.target.value })}
        />
        <button
          className="btn-primary"
          onClick={createItem}
          disabled={loading || !newItem.title.trim()}
        >
          {loading ? 'Adding...' : 'Add Item'}
        </button>
      </div>

      {/* Items List */}
      <div className="card">
        <h2 style={{ marginBottom: '1rem', color: '#1B2A4A' }}>
          Items ({items.length})
        </h2>
        {items.length === 0 ? (
          <p style={{ color: '#94a3b8' }}>No items yet. Add one above.</p>
        ) : (
          items.map(item => (
            <div key={item.id} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '0.75rem', borderBottom: '1px solid #f1f5f9'
            }}>
              <div>
                <strong>{item.title}</strong>
                {item.description && <p style={{ color: '#64748b', fontSize: '0.875rem' }}>{item.description}</p>}
              </div>
              <button className="btn-danger" onClick={() => deleteItem(item.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;