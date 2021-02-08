import { useState } from 'react'

const getStore = () => window.app.store
const getStoreData = () => getStore().store

const useStore = () => {
  const [state, setState] = useState(getStoreData())

  const setStore = (updatedState) => {
    setState((prevState) => {
      const newState = {
        ...prevState,
        ...updatedState,
      }

      getStore().set(newState)

      return newState
    })
  }

  return [state, setStore]
}

export { useStore, getStoreData as getStore }
