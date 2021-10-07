import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import TutorialDetailCard from '../components/tutorials/TutorialDetailCard'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import useHttp from '../hooks/use-http'
import { getSingleTutorial } from '../lib/api'

const TutorialDetail = () => {
  const params = useParams()

  const { tutorialId } = params

  const { sendRequest, status, data: tutorial, error } = useHttp(
    getSingleTutorial,
    true
  )

  useEffect(() => {
    sendRequest(tutorialId)
  }, [sendRequest, tutorialId])

  if (status === 'pending') {
    return (
      <div className='centered'>
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return <p className='centered'>{error}</p>
  }

  if (!tutorial.title) {
    return <p>No se encontró el tutorial!</p>
  }

  const { title, description, videoUrl, publishedStatus, creator, id } = tutorial

  return (
    <TutorialDetailCard
      id={id}
      title={title} 
      description={description} 
      videoUrl={videoUrl}
      publishedStatus={publishedStatus}
      creator={creator}
    />
  )
}

export default TutorialDetail