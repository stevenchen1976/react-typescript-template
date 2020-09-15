import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button, Icon, Radio, Checkbox, message } from 'antd'

import { useStores } from '@/store'
import { apiGetTopics } from '@/apis/common'
import styles from './styles.module.less'

const Home: React.FC = () => {
  const { counter, request } = useStores()

  return (
    <>
      <h1>Home Page</h1>

      <ol>
        <li>
          <p>less css module</p>
          <p className={styles.title}>content here</p>
        </li>

        <li>
          <p>antd</p>
          <p>
            <Button type='primary'>click</Button>
            <Button shape='round'>click</Button>
            <Button size='small'>click</Button>
          </p>
          <p>
            <Icon type='question' />
            <Icon type='clock-circle' />
            <Icon type='radar-chart' />
            <Icon type='apple' />
          </p>
          <p>
            <Radio>A</Radio>
            <Checkbox>B</Checkbox>
          </p>
        </li>

        <li>
          <p>mobx</p>
          <p>count: {counter.count}</p>
          <p>
            <Button onClick={counter.add} type='primary'>
              add
            </Button>
            <Button onClick={counter.sub} type='primary'>
              sub sync
            </Button>
          </p>
        </li>

        <li>
          <p>axios request</p>
          <Button
            type='primary'
            ghost
            loading={request.isFetching}
            onClick={() => {
              apiGetTopics().then(res => {
                message.success('请求成功')
                console.log('data from axios', res)
              })
            }}
          >
            get cnodejs topics
          </Button>
        </li>

        <li>
          <p>react router</p>
          <p>
            <Link to='/test-page'>goto test-page</Link>
          </p>
        </li>
      </ol>
    </>
  )
}

export default observer(Home)
