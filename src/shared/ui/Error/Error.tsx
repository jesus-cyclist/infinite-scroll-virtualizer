import React from 'react'
import styles from './Error.module.scss'

export const Error = () => {
  return (
    <div className={styles.container}>
      <span className={styles.error}>
        Возникла ошибка, перезагрузите странциу
      </span>
    </div>
  )
}
