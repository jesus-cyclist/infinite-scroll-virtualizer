import React, { FC, ReactNode, useRef } from 'react'
import styles from './Modal.module.scss'
import { useClickOutSide } from '../../lib/hooks/useClickOutSide'

export type TModal = {
  children: ReactNode
  close: () => void
}

export const Modal: FC<TModal> = (props) => {
  const { children, close } = props

  const modalRef = useRef<HTMLDivElement | null>(null)
  useClickOutSide({ ref: modalRef, callback: close })
  return (
    <div className={styles.modal} ref={modalRef}>
      {children}
    </div>
  )
}
