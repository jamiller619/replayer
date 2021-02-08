// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const fs = require('fs')
const path = require('path')
const { dialog } = require('@electron/remote')
const Store = require('electron-store')
const schema = require('./store.schema.json')
const Parser = require('./parser/parser')

window.app = {
  dialog,
  store: new Store({ schema }),
}

const parseAndStoreReplay = async (replayFilePath) => {
  const { store } = window.app
  const parsedReplay = await Parser.parse(replayFilePath)

  store.set('parsedReplays', [...store.get('parsedReplays'), parsedReplay])

  return parsedReplay
}

window.app.parseAllReplays = () => {
  const { store } = window.app
  const replays = store.get('replayFileStats')
  const dir = store.get('replayFolderPath')

  return new Promise((resolve) => {
    Promise.all(
      replays.map((replay) => parseAndStoreReplay(path.join(dir, replay.name)))
    ).then(resolve)
  })
}

const addFileToStore = (filename, dir) => {
  const { store } = window.app
  const file = {
    name: filename,
    ...fs.statSync(path.join(dir, filename)),
  }

  store.set('replayFileStats', [...store.get('replayFileStats'), file])

  return file
}

const isReplayFile = (file) => file.endsWith('.replay')

const getReplayFileStats = () => {
  const { store } = window.app
  const dir = store.get('replayFolderPath')

  store.reset('replayFileStats')

  return new Promise((resolve, reject) => {
    if (!dir) reject()

    fs.readdir(dir, (err, files) => {
      if (err) reject(err)

      const stats = files
        .filter(isReplayFile)
        .map((file) => addFileToStore(file, dir))

      resolve(stats)
    })
  })
}

getReplayFileStats()
