import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import { observer } from 'mobx-react'

import routes from './routes'
import { useStores } from '@/store'
import { FullScreenLoading } from '@/components'

const App: React.FC = () => {
  const { request } = useStores()

  return (
    <>
      <Suspense fallback={<FullScreenLoading loading={true} />}>
        <Switch>
          {routes.map(({ path, component, ...rest }, index) => (
            <Route key={index} path={path} component={component} {...rest} />
          ))}
        </Switch>
      </Suspense>

      <FullScreenLoading loading={request.isFetching} />
    </>
  )
}

export default observer(App)
