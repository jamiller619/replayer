// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { dialog } = require('@electron/remote')

window.showOpenDialog = function (opts) {
  return new Promise((resolve, reject) => {
    dialog.showOpenDialog(opts, dir => {
      resolve(dir)
    })
  })
}

window.addEventListener('DOMContentLoaded', () => {
  
})
