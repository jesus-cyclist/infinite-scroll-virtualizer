import { MainPage, PostPage } from 'pages'
import { ForbiddenPage } from 'pages/forbidden-page/ui/Page'
import { Route, Routes, useLocation } from 'react-router-dom'
import styles from './styles/App.module.scss'
import { RouteName } from 'shared'

export function App() {
  const location = useLocation()
  const state = location.state

  return (
    <div className={styles.app}>
      <Routes location={state?.post || location}>
        <Route path={RouteName.MAIN_PAGE} element={<MainPage />} />
        <Route path={RouteName.POST_PAGE} element={<PostPage />} />
        <Route path={RouteName.FORBIDDEN_PAGE} element={<ForbiddenPage />} />
      </Routes>
      {state?.post && (
        <Routes>
          <Route path={RouteName.POST_PAGE} element={<PostPage />} />
        </Routes>
      )}
    </div>
  )
}
