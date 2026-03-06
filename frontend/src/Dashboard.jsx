import React from 'react';

function Dashboard({ student, onLogout }) {
  // On s'assure que les notes existent
  const grades = student.grades || []; 
  console.log("Données de l'étudiant reçues :", student);

  // Correction : utilisation de parseFloat et de curr.score
  const average = grades.length > 0 
    ? (grades.reduce((acc, curr) => {
        const noteText = curr.score !== undefined ? curr.score : curr.value;
        return acc + parseFloat(noteText || 0);
      }, 0) / grades.length).toFixed(2)
    : 'N/A';

  return (
    <div style={styles.container}>
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>🎓 Espace Étudiant</div>
        <button onClick={onLogout} style={styles.logoutButton}>Déconnexion</button>
      </nav>

      <main style={styles.mainContent}>
        <div style={styles.welcomeCard}>
          <h1 style={styles.welcomeText}>
            Bienvenue, {student.first_name} {student.last_name}
          </h1>
          <p style={styles.matriculeText}>Matricule : {student.student_id}</p>
        </div>

        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <h3>Moyenne Générale</h3>
            <span style={styles.statValue}>{average} / 20</span>
          </div>
          <div style={styles.statCard}>
            <h3>Évaluations</h3>
            <span style={styles.statValue}>{grades.length}</span>
          </div>
        </div>

        <div style={styles.tableContainer}>
          <h2 style={styles.tableTitle}>Mes Notes</h2>
          {grades.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHead}>
                  <th style={styles.th}>Matière</th>
                  <th style={styles.th}>Type d'évaluation</th>
                  <th style={styles.th}>Note</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade, index) => (
                  <tr key={index} style={styles.tableRow}>
                    <td style={styles.td}>{grade.subject_display || grade.subject}</td>
                    <td style={styles.td}>
                      <span style={grade.type_eval === 'COMPO' ? styles.badgeExam : styles.badgeDevoir}>
                        {grade.type_eval}
                      </span>
                    </td>
                    {/* Correction : affichage de grade.score */}
                    {/* On affiche score s'il existe, sinon on affiche value */}
                    <td style={styles.td}>
                      <strong>{grade.score !== undefined ? grade.score : grade.value} / 20</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={styles.noData}>Aucune note n'est disponible pour le moment.</p>
          )}
        </div>
      </main>
    </div>
  );
}

// ... Tes styles restent EXACTEMENT les mêmes qu'avant, je ne les recolle pas pour gagner de la place, 
// garde bien ton bloc const styles = { ... } à la fin de ton fichier !

export default Dashboard;