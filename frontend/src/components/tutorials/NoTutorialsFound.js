import { Link } from 'react-router-dom'

import styles from './NoTutorialsFound.module.css'

const NoTutorialsFound = (props) => {
  return (
    <div className={styles.notutorials}>
      <p>{props.message}</p>
      <Link className='btn' to='/new-tutorial'>
        Agregar un tutorial
      </Link>
    </div>
  )
}

export default NoTutorialsFound
