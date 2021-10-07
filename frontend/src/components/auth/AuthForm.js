import { Fragment, useState, useRef, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import LoadingSpinner from '../ui/LoadingSpinner'
import ErrorModal from '../ui/ErrorModal'
import { AuthContext } from '../../context/auth-context'
import { signin, login } from '../../lib/api'
import styles from './AuthForm.module.css'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const history = useHistory()
  const emailInputRef = useRef()
  const passwordInputRef = useRef()
  const auth = useContext(AuthContext)

  const submitHandler = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    if (isLogin) {
      try {
        const data = await login({ email: enteredEmail, password: enteredPassword })
        if (data) {
          auth.login(data.userId, data.token)
          history.push('/')
        }
      } catch (error) {
        setError('No se pudo realizar el login')
      }
    } else {
      try {
        const data = await signin({ email: enteredEmail, password: enteredPassword })
        if (data) {
          auth.login(data.userId, data.token)
          history.push('/')
        }
      } catch (error) {
        setError('No se pudo realizar el signin')
      }
    }
    setIsLoading(false)
  }

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  return (
    <Fragment>
      <ErrorModal error={error} onClear={() => setError(null)} />
      <section className={styles.auth}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        <form onSubmit={submitHandler}>
          <div className={styles.control}>
            <label htmlFor='email'>Tu Email</label>
            <input type='email' id='email' required ref={emailInputRef} />
          </div>
          <div className={styles.control}>
            <label htmlFor='password'>Tu Password</label>
            <input
              type='password'
              id='password'
              required
              ref={passwordInputRef}
            />
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            {!isLoading && (
              <button>{isLogin ? 'Entrar' : 'Crear Usuario'}</button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button
              type='button'
              className={styles.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Modo Signup' : 'Modo Login'}
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  )
}

export default AuthForm