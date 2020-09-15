import React, { useCallback } from 'react'
import { Spin } from 'antd'
import styles from './styles.module.less'

interface Props {
  loading?: boolean
  zIndex?: number
}

const FullScreenLoading: React.FC<Props> = ({ loading = false, zIndex = 10 }) => {
  const eventHandler = useCallback((e: React.MouseEvent) => {
    if (e) {
      e.stopPropagation()
    }
  }, [])

  return (
    <div className={loading ? styles.container_loading : styles.container} style={{ zIndex }} onClick={eventHandler}>
      <Spin spinning={loading} />
    </div>
  )
}

export default FullScreenLoading
