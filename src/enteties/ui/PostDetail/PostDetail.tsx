import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Loader, RouteName } from 'shared'
import { useGetPostQuery } from '../Post/api/postApi'
import { TPost } from '../Post/model'
import styles from './PostDetail.module.scss'

export const PostDetail = () => {
  const params = useParams()
  const [post, setPost] = useState<TPost | null>(null)
  const navigate = useNavigate()
  const { data } = useGetPostQuery(params.id!.slice(1))

  useEffect(() => {
    if (data) {
      setPost(data)
    }
  }, [data])

  if (!post) {
    return <Loader />
  }

  return (
    <div className={styles.post}>
      <div className={styles.post__closeButton}>
        <Button
          children={'x'}
          onClick={() => {
            navigate(RouteName.MAIN_PAGE)
          }}
        />
      </div>
      <span className={styles.post_id}>from user: {post.userId}</span>
      <h2 className={styles.post__title}>
        {post.id}. {post.title}
      </h2>
      <span className={styles.post__text}>{post.body}</span>
    </div>
  )
}
