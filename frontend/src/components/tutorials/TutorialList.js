import React, { Fragment, useState, useContext } from 'react'

import TutorialItem from './TutorialItem'
import NoTutorialsFound from './NoTutorialsFound'
import Button from '../ui/Button'
import Modal from '../ui/Modal'
import { AuthContext } from '../../context/auth-context'
import { massDelete } from '../../lib/api'
import styles from './TutorialList.module.css'
import { useHistory } from 'react-router-dom'

const TutorialList = (props) => {
  const [tutorials, setTutorials] = useState(props.tutorials)
  const [noTutorialFound, setNoTutorialFound] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [error, setError] = useState()
  const auth = useContext(AuthContext)
  const history = useHistory()

  const handleFilter = (event) => {
    setNoTutorialFound(false)
    const searchValue = event.target.value.toLowerCase()
    const filteredTutorials = props.tutorials.filter(tutorial => {
      const title = tutorial.title.toLowerCase()
      const description = tutorial.description.toLowerCase()

      return (title.includes(searchValue) || description.includes(searchValue))
    })
    if (filteredTutorials?.length === 0) setNoTutorialFound(true)
    setTutorials(filteredTutorials)
  }

  const showDeleteWarningHandler = () => setShowConfirmModal(true)

  const cancelDeleteHandler = () => setShowConfirmModal(false)

  const handleMassDelete = async () => {
    setShowConfirmModal(false)
    try {
      await massDelete(auth.token)
      setError(null)
      history.push('/')
    } catch (error) {
      setError('No se pudo borrar todos los tutoriales')
    }
  }

  return (
    <Fragment>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header='Estas Seguro?'
        footerClass='place-item__modal-actions'
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCELAR
            </Button>
            <Button danger onClick={handleMassDelete}>
              BORRAR TODOS
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Estas seguro de querer borrar todos tus tutoriales?
        </p>
      </Modal>
      <div>
        <div>
          <input placeholder='Buscar por título o descripción' onKeyUp={handleFilter}/>
        </div>
        {auth.isLoggedIn && (
          <div>
            <hr />
            <Button danger onClick={showDeleteWarningHandler}>Borrar todos tus tutoriales</Button>
            {error}
          </div>
        )}
        <h1>Tutoriales</h1>
        {noTutorialFound && <NoTutorialsFound message='No se encontró ese tutorial!' />}
        <ul className={styles.list}>
          {tutorials.map((tutorial) => (
            <TutorialItem
              key={tutorial._id}
              id={tutorial._id}
              title={tutorial.title}
              description={tutorial.description}
            />
          ))}
        </ul>
      </div>
    </Fragment>
  )
}

export default TutorialList
