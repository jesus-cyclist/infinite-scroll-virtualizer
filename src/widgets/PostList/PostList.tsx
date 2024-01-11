import { useAppDispatch } from 'app/hooks'
import { Post, TPost, postsAction, useGetPostsQuery } from 'enteties'
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { Loader } from 'shared'
import styles from './PostList.module.scss'

type TItem = {
  index: number
  style: {}
}

export const PostList = memo(() => {
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const [postList, setPostList] = useState<Array<TPost>>([])
  const [page, setPage] = useState(1)
  const [limit] = useState(40)
  const [totalItemsCount, setTotalItemsCount] = useState(0)
  const { data } = useGetPostsQuery({ page, limit })
  const [hasNextPage, setHasNextPage] = useState(false)
  const [listParams, setListParams] = useState({
    height: 0,
    itemSize: 100,
    width: 0,
  })
  const listRef = useRef<HTMLDivElement | null>(null)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (data) {
      setTotalItemsCount(data.totalCount)
      setPostList((prev) => [...prev, ...data.response])
      setIsNextPageLoading(false)
      dispatch(postsAction.addPosts(data.response))
    }
  }, [data, dispatch])

  const loadNextPage = () => {
    setIsNextPageLoading(true)
    setPage((prev) => prev + 1)
  }

  useEffect(() => {
    setHasNextPage((prev) => postList.length < totalItemsCount)
  }, [postList, totalItemsCount])

  const itemCount = hasNextPage ? postList.length + 1 : postList.length

  const updateListParams = useCallback(() => {
    if (listRef.current) {
      const height = listRef.current.offsetHeight
      const width = listRef.current.offsetWidth
      setListParams((prev) => ({ ...prev, height, width }))
    }
  }, [listRef])

  useLayoutEffect(updateListParams, [updateListParams])

  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage

  const isItemLoaded = (index: number) => Boolean(postList[index])

  const Item: FC<TItem> = memo(({ index, style }) => {
    let content
    if (!isItemLoaded(index)) {
      content = <Loader />
    } else {
      const element = postList[index]

      content = (
        <div className={styles.post}>
          <Post
            userId={element.userId}
            id={element.id}
            title={element.title}
            body={element.body}
          />
        </div>
      )
    }

    return <div style={style}>{content}</div>
  })

  return (
    <div ref={listRef} className={styles.postList}>
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({ onItemsRendered, ref }) => (
          <FixedSizeList
            height={listParams.height}
            itemCount={itemCount}
            itemSize={listParams.itemSize}
            onItemsRendered={onItemsRendered}
            ref={ref}
            width={listParams.width}
          >
            {Item}
          </FixedSizeList>
        )}
      </InfiniteLoader>
    </div>
  )
})
