import { Fragment, useState } from 'react'
import { Prompt } from 'react-router-dom'

import Card from '../ui/Card'
import LoadingSpinner from '../ui/LoadingSpinner'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useForm } from '../../hooks/use-form'
import styles from './TutorialForm.module.css'
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
  VALIDATOR_URL
} from '../../util/validators'

const TutorialForm = (props) => {
  const [isEntering, setIsEntering] = useState(false)
  const [publishedStatus, setPublishedStatus] = useState('public')
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      videoUrl: {
        value: '',
        isValid: false
      }
    },
    false
  )

  const submitFormHandler = event => {
    event.preventDefault()
    finishEnteringHandler()
    const formData = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
      videoUrl: formState.inputs.videoUrl.value,
      publishedStatus
    }
    props.onAddTutorial(formData)
  }

  const finishEnteringHandler = () => {
    setIsEntering(false)
  }

  const formFocusedHandler = () => {
    setIsEntering(true)
  }

  const radioButtonHandler = (event) => setPublishedStatus(event.target.value)

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          'Are you sure you want to leave? All your entered data will be lost!'
        }
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={styles.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={styles.loading}>
              <LoadingSpinner />
            </div>
          )}
          <div className={styles.control}>
            <Input
              id='title'
              element='input'
              type='text'
              label='Title'
              validators={[VALIDATOR_REQUIRE()]}
              errorText='Please enter a valid title.'
              onInput={inputHandler}
            />
          </div>
          <div className={styles.control}>
            <Input
              id='description'
              element='textarea'
              label='Description'
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText='Please enter a valid description (at least 5 characters).'
              onInput={inputHandler}
            />
          </div>
          <div className={styles.control}>
            <Input
              id='videoUrl'
              element='input'
              type='text'
              label='videoUrl'
              validators={[VALIDATOR_REQUIRE(), VALIDATOR_URL()]}
              errorText='Please enter a valid videoUrl.'
              onInput={inputHandler}
            />
          </div>
          <div className={`${styles.control} ${styles.display}`}>
            <label htmlFor='publishedStatus'>Public</label>
            <input
              type='radio' 
              value="public" 
              name="publishedStatus" 
              checked={publishedStatus === 'public'}
              onChange={radioButtonHandler}
            />
            <label htmlFor='publishedStatus'>Hidden</label>
            <input
              type='radio' 
              value="hidden" 
              name="publishedStatus" 
              checked={publishedStatus === 'hidden'}
              onChange={radioButtonHandler}
            />
          </div>
          <div className={styles.actions}>
          <Button type='submit' disabled={!formState.isValid}>
            AGREGAR TUTORIAL
          </Button>
          </div>
        </form>
      </Card>
    </Fragment>
  )
}

export default TutorialForm
