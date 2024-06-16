import { useParams, useNavigate } from 'react-router-dom'

export default function SimpleQuiz() {

  const params = useParams()
  const navigate = useNavigate()

  console.log(window.testValue);

  return (
    <div>
      <p>SimpleQuiz</p>
      <p>{params.id}</p>
      <p>{window.testValue?.name}</p>
      <button onClick={() => navigate('/career-test')}>
        Back
      </button>
    </div>
  )
}