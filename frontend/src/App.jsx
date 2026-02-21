import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {
  const [students, setStudents] = useState([])

  useEffect(() => {
    // Appel vers l'API Django (port 8000)
    axios.get('http://localhost:8000/api/students/')
      .then(res => setStudents(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Liste des Élèves et Notes</h1>
      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.first_name} {student.last_name} - Matricule: {student.student_id}
            <ul>
              {student.grades.map(grade => (
                <li key={grade.id}>{grade.subject}: {grade.value}/20</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App