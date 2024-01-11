import React, { FC, useEffect, useRef, useState } from 'react'
import styles from './Post.module.scss'
import { TPost } from './model'
import { CSSTransition } from 'react-transition-group'
import { NavLink, useLocation } from 'react-router-dom'

export const Post: FC<TPost> = (props) => {
  const { userId, id, title, body } = props
  const [isMounted, setIsMounted] = useState(false)
  const postRef = useRef<HTMLDivElement>(null)
  const location = useLocation()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <>
      <CSSTransition
        in={isMounted}
        nodeRef={postRef}
        timeout={300}
        classNames={{
          enter: styles.postEnter,
          enterActive: styles.postEnterActive,
          enterDone: styles.postEnterDone,
        }}
      >
        <div className={styles.post} ref={postRef}>
          <span className={styles.post_id}>from user: {userId}</span>
          <h2 className={styles.post__title}>
            {id}. {title}
          </h2>
          <span className={styles.post__text}>{body}</span>
          <NavLink
            to={`/post/:${id}`}
            className={styles.post__ellipsis}
            state={{ post: location }}
          >
            ...
          </NavLink>
        </div>
      </CSSTransition>
    </>
  )
}
