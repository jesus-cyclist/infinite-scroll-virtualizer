import React from 'react'
import styles from './Page.module.scss'

export const ForbiddenPage = () => {
  return (
    <div className={styles.container}>
      <h2>Такой страницы не существует</h2>
    </div>
  )
}
