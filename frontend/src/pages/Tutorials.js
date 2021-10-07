import { useEffect } from 'react'

import NoTutorialsFound from '../components/tutorials/NoTutorialsFound'
import TutorialList from '../components/tutorials/TutorialList'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getAllTutorials } from '../lib/api'


const Tutorials = () => {
  const { sendRequest, status, data: tutorials, error } = useHttp(
    getAllTutorials,
    true
  )

  useEffect(() => {
    sendRequest()
  }, [sendRequest])

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className='centered focused'>{error}</p>
  }

  if (status === 'completed' && (!tutorials || tutorials.length === 0)) {
    return <NoTutorialsFound message='No hay tutoriales aquí!' />
  }

  return <TutorialList tutorials={tutorials} />
}

export default Tutorials
