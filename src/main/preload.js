// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { dialog } = require('@electron/remote')
const Store = require('electron-store')
const schema = require('./store.schema.json')

const app = {
  store: new Store({ schema }),
  dialog,
}

window.app = app
