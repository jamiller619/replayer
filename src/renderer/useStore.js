const { store } = window.app

const setStore = state => {
  store.set(state)
}

const useStore = () => [Object.freeze(window.app.store.store), setStore]

export default useStore
