import React, { FC, ReactNode } from 'react'
import styles from './Button.module.scss'

type TButtonProps = {
  onClick: () => void
  children: ReactNode
}

export const Button: FC<TButtonProps> = (props) => {
  const { onClick, children } = props

  return (
    <button className={styles.button} onClick={onClick}>
      {children}
    </button>
  )
}
