import { useContext } from 'react'
import { useHistory } from 'react-router-dom'

import TutorialForm from '../components/tutorials/TutorialForm'
import Card from '../components/ui/Card'
import { AuthContext } from '../context/auth-context'
import { newTutorial } from '../lib/api'

const NewTutorial = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)

  const addTutorialHandler = async (tutorialData) => {
    await newTutorial(tutorialData, auth.token)
    history.push('/tutorials')
  }

  if (!auth.isLoggedIn) return (<Card><p>Hay que loguarse para ver esta pagina!</p></Card>)

  return <TutorialForm onAddTutorial={addTutorialHandler} />
}

export default NewTutorial