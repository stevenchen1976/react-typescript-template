import { createContext, useContext } from 'react'
import { configure } from 'mobx'

import counter from './modules/counter'
import request from './modules/request'

configure({ enforceActions: 'observed' })

export const storesContext = createContext({
  counter,
  request,
})

export const useStores = () => useContext(storesContext)
