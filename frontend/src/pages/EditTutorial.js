import React, { useEffect, useState, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'

import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import ErrorModal from '../components/ui/ErrorModal'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../util/validators'
import { useForm } from '../hooks/use-form'
import { AuthContext } from '../context/auth-context'
import styles from '../components/tutorials/EditTutorial.module.css'
import { editTutorial, getSingleTutorial } from '../lib/api'

const UpdateTutorial = () => {
  const auth = useContext(AuthContext)
  const [error, setError] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [loadedTutorial, setLoadedTutorial] = useState()
  const tutorialId = useParams().tutorialId
  const history = useHistory()

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      }
    },
    false
  )

  useEffect(() => {
    const fetchTutorial = async () => {
      try {
        const responseData = await getSingleTutorial(tutorialId)
        setLoadedTutorial(responseData)
        setFormData(
          {
            title: {
              value: responseData.title,
              isValid: true
            },
            description: {
              value: responseData.description,
              isValid: true
            }
          },
          true
        )

      } catch (err) {
        setError('No se pudo encontrar el tutorial')
      }
    }
    fetchTutorial()
    setIsLoading(false)
  }, [tutorialId, setFormData])

  const tutorialUpdateSubmitHandler = async event => {
    event.preventDefault()
    setIsLoading(true)
    try {
      const tutorialData = {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value
      }
      await editTutorial(tutorialId, tutorialData, auth.token)
      setIsLoading(false)
      history.push('/')
    } catch (error) {
      setError('No se pudo editar el tutorial')
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className='center'>
        <LoadingSpinner />
      </div>
    )
  }

  if (!auth.isLoggedIn) return (<Card><p>Hay que loguarse para ver esta pagina!</p></Card>)

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
      {!isLoading && loadedTutorial && (
        <form className={styles.tutorialForm} onSubmit={tutorialUpdateSubmitHandler}>
          <Input
            id='title'
            element='input'
            type='text'
            label='Title'
            validators={[VALIDATOR_REQUIRE()]}
            errorText='Please enter a valid title.'
            onInput={inputHandler}
            initialValue={loadedTutorial.title}
            initialValid={true}
          />
          <Input
            id='description'
            element='textarea'
            label='Description'
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText='Please enter a valid description (min. 5 characters).'
            onInput={inputHandler}
            initialValue={loadedTutorial.description}
            initialValid={true}
          />
          <Button type='submit' disabled={!formState.isValid}>
            EDITAR TUTORIAL
          </Button>
        </form>
      )}
    </React.Fragment>
  )
}

export default UpdateTutorial
