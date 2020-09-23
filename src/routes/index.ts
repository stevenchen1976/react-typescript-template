import { lazy } from 'react'
import { RouteProps } from 'react-router-dom'

interface IRoute extends RouteProps {
  title?: string
  [key: string]: any
}

const routes: IRoute[] = [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('@/pages/Home')),
  },
  {
    path: '/test-page',
    component: lazy(() => import('@/pages/TestPage')),
  },
]

export default routes
