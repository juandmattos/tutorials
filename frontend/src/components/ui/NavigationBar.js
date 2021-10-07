import { Fragment, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

import styles from './NavigationBar.module.css'

const Navigation = () => {
  const auth = useContext(AuthContext)

  return(
    <header className={styles.header}>
      <div className={styles.logo}>Tutos.com</div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink to='/tutorials' activeClassName={styles.active}>
              Tutoriales
            </NavLink>
          </li>
          {auth.isLoggedIn && (
          <li>
            <NavLink to='/new-tutorial' activeClassName={styles.active}>
              Agregar Tutorial
            </NavLink>
          </li>
          )}
          {!auth.isLoggedIn && (
          <li>
            <NavLink to='/login' activeClassName={styles.active}>
              Login
            </NavLink>
          </li>)}
          {auth.isLoggedIn && (
          <li>
            <NavLink to='/tutorials' onClick={auth.logout}>
              Logout
            </NavLink>
          </li>)}
        </ul>
      </nav>
    </header>
  )
}

const NavigationBar = (props) => {
  return (
    <Fragment>
      <Navigation />
      <main className={styles.main}>{props.children}</main>
    </Fragment>
  )
}

export default NavigationBar
