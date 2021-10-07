import React, { Suspense } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import NavigationBar from './components/ui/NavigationBar'

import Tutorials from './pages/Tutorials'
import LoadingSpinner from './components/ui/LoadingSpinner'
import { AuthContext } from './context/auth-context'
import { useAuth } from './hooks/use-auth'

const NewTutorial = React.lazy(() => import('./pages/NewTutorial'))
const EditTutorial = React.lazy(() => import('./pages/EditTutorial'))
const TutorialDetail = React.lazy(() => import('./pages/TutorialDetail'))
const NotFound = React.lazy(() => import('./pages/NotFound'))
const Auth = React.lazy(() => import('./pages/Auth'))

const App = () => {
  const { token, login, logout, userId } = useAuth()

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout
      }}
    >
      <NavigationBar>
        <Suspense fallback={<div className='centered'><LoadingSpinner /></div>}>
          <Switch>
            <Route path='/' exact>
              <Redirect to='/tutorials' />
            </Route>
            <Route path='/tutorials' exact>
              <Tutorials />
            </Route>
            <Route path='/tutorials/:tutorialId' exact>
              <TutorialDetail />
            </Route>
            <Route path='/tutorials/edit/:tutorialId'>
              <EditTutorial />
            </Route>
            <Route path='/new-tutorial'>
              <NewTutorial />
            </Route>
            <Route path='/login'>
              <Auth />
            </Route>
            <Route path='*'>
              <NotFound />
            </Route>
          </Switch>
        </Suspense>
      </NavigationBar>
    </AuthContext.Provider>
  )
}

export default App
