import { useState, useEffect } from 'react'

const getStore = () => window.app.store
const getStoreData = () => getStore().store

const useStore = () => {
  const [, setState] = useState(getStoreData())

  useEffect(() => {
    return getStore().onDidAnyChange((newStore) => {
      setState({ ...newStore.store })
    })
  }, [])

  const setStore = (updatedState) => {
    const newState = {
      ...getStoreData(),
      ...updatedState,
    }

    getStore().set(newState)

    return newState
  }

  return [getStoreData(), setStore]
}

export { useStore, getStoreData as getStore }
