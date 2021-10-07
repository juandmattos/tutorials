import { Link } from 'react-router-dom'

import styles from './TutorialItem.module.css'

const TutorialItem = (props) => {
  return (
    <li className={styles.item}>
      <figure>
        <blockquote>
          <p>{props.title}</p>
        </blockquote>
        <figcaption>{props.description}</figcaption>
      </figure>
      <Link className='btn' to={`/tutorials/${props.id}`}>
        Detalles
      </Link>
    </li>
  )
}

export default TutorialItem
