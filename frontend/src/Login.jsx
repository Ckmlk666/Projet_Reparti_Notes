import React, { useState } from 'react';

function Login({ onLoginSuccess }) {
  const [studentIdInput, setStudentIdInput] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    fetch(`http://localhost:8888/students/?student_id=${studentIdInput}`)
      .then(res => res.json())
      .then(data => {
        if (data.length > 0) {
          onLoginSuccess(data[0]);
        } else {
          setError('Matricule introuvable. Veuillez réessayer.');
        }
      })
      .catch(err => setError('Erreur de connexion au serveur.'));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.iconContainer}>
          <span style={{ fontSize: '50px' }}>🎓</span>
        </div>
        <h2 style={styles.title}>Portail Élève</h2>
        <p style={styles.subtitle}>Veuillez saisir votre matricule pour accéder à vos notes.</p>
        
        <form onSubmit={handleLogin} style={styles.form}>
          <input 
            type="text" 
            placeholder="Ex: STU001" 
            value={studentIdInput}
            onChange={(e) => setStudentIdInput(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Se connecter
          </button>
        </form>

        {error && <div style={styles.errorBox}>{error}</div>}
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',    // Détache la page de tout le reste
    top: 0,
    left: 0,
    width: '100vw',       // Force 100% de la largeur de l'écran
    height: '100vh',      // Force 100% de la hauteur de l'écran
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f0f2f5', // Gris clair
    margin: 0,
    padding: 0,
    zIndex: 9999,         // S'assure qu'il passe par-dessus tout le reste
  },
  card: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: '20px',
  },
  title: {
    margin: '0 0 10px 0',
    color: '#1a1a1a',
    fontSize: '24px',
  },
  subtitle: {
    color: '#65676b',
    fontSize: '14px',
    marginBottom: '30px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px 15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  errorBox: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#ffebe8',
    color: '#d93025',
    borderRadius: '6px',
    fontSize: '13px',
    border: '1px solid #f5c2c7',
  }
};

export default Login;