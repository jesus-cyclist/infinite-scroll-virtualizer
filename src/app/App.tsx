import { MainPage, PostPage } from 'pages'
import { ForbiddenPage } from 'pages/forbidden-page/ui/Page'
import { Route, Routes, useLocation } from 'react-router-dom'
import styles from './styles/App.module.scss'

export function App() {
  const location = useLocation()
  const state = location.state

  return (
    <div className={styles.app}>
      <Routes location={state?.post || location}>
        <Route path={'/'} element={<MainPage />} />
        <Route path={`/post/:id`} element={<PostPage />} />
        <Route path={'*'} element={<ForbiddenPage />} />
      </Routes>
      {state?.post && (
        <Routes>
          <Route path={`/post/:id`} element={<PostPage />} />
        </Routes>
      )}
    </div>
  )
}
