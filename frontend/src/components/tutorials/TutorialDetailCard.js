import React, { Fragment, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'
import { deleteTutorial } from '../../lib/api'

import Card from '../ui/Card'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import styles from './TutorialDetailCard.module.css'

const TutorialDetailCard = (props) => {
  const auth = useContext(AuthContext)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [error, setError] = useState()
  const history = useHistory()
  const { title, description, videoUrl, publishedStatus, creator, id } = props

  const translateStatus = (status) => {
    if (status === 'public') {
      return 'Publico'
    } else {
      return 'Oculto'
    }
  }

  const showDeleteWarningHandler = () => setShowConfirmModal(true)

  const cancelDeleteHandler = () => setShowConfirmModal(false)

  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false)
    try {
      await deleteTutorial(id, auth.token)
      history.push('/')
    } catch (error) {
      setError('No se pudo borrar el Tutorial')
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
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Estas seguro de borrar este tutorial?
        </p>
      </Modal>
      <Card>
        <div className={styles.control}>
          <label>Tutorial</label>
          <p>{title}</p>
        </div>
        <div className={styles.control}>
          <label>Descripción</label>
          <p>{description}</p>
        </div>
        <div className={styles.control}>
          <label>Estado</label>
          <p>{translateStatus(publishedStatus)}</p>
        </div>
        <div className={styles.control}>
          <label>Video</label>
          <p><a href={videoUrl} target='_blank' rel='noreferrer'>Llevame al video</a></p>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        {(auth.isLoggedIn && creator === auth.userId) && (
          <div className={styles.actions}>
            <button onClick={() => history.push(`/tutorials/edit/${id}`)} className='btn'>Editar</button>
            <button onClick={showDeleteWarningHandler} className={styles.deleteBtn}>Borrar</button>
          </div>
        )}
      </Card>
    </Fragment>
  )
}

export default TutorialDetailCard