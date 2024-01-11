import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Modal } from '../../../shared/ui/Modal/Modal'
import { Overlay } from '../../../shared/ui/Overlay/Overlay'
import styles from './ModalOverlay.module.scss'
import { RouteName } from 'shared'

const modalRoot = document.getElementById('modal-root')

type TModalOverlay = {
  children: ReactNode
}

export const ModalOverLay: FC<TModalOverlay> = (props) => {
  const { children } = props
  const navigate = useNavigate()

  const closeModal = () => {
    navigate(RouteName.MAIN_PAGE)
  }

  return createPortal(
    <div className={styles.modalOverlay}>
      <Modal children={children} close={() => {}} />
      <Overlay onClick={closeModal} />
    </div>,
    modalRoot!
  )
}
