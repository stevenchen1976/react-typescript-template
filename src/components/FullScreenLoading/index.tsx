import React, { useCallback, useMemo } from 'react'
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

  const className = useMemo(() => (loading ? styles.container_loading : styles.container), [loading])

  return (
    <div className={className} style={{ zIndex }} onClick={eventHandler}>
      <Spin spinning={loading} />
    </div>
  )
}

export default FullScreenLoading
