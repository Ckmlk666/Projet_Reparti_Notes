import React, { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';
import './App.css'; // (Même si ce fichier est vide maintenant)

function App() {
  const [currentStudent, setCurrentStudent] = useState(null);

  return (
    // Attention : pas de <div className="App"> ici !
    <>
      {!currentStudent ? (
        <Login onLoginSuccess={(data) => setCurrentStudent(data)} />
      ) : (
        <Dashboard student={currentStudent} onLogout={() => setCurrentStudent(null)} />
      )}
    </>
  );
}

export default App;