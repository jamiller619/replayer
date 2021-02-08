import React from 'react'
import { useStore } from '../store'

const { dialog } = window.app

const dialogOptions = {
  title: 'Select replay save folder',
  defaultPath: '',
  buttonLabel: 'Select folder',
  properties: ['openDirectory'],
}

const App = () => {
  const [{ replayFolderPath, lastRun, replayFileStats }, setStore] = useStore()

  const replayCount = replayFileStats.length

  const handleFolderPathDialog = async () => {
    const dialogResponse = await dialog.showOpenDialog(dialogOptions)

    if (dialogResponse && dialogResponse.canceled === false) {
      const [dir] = dialogResponse.filePaths

      setStore({
        replayFolderPath: dir,
      })
    }
  }

  const handleParseReplays = async () => {
    const replays = await window.app.parseAllReplays()

    console.log(replays)
  }

  return (
    <div>
      {
        <button type="button" onClick={handleFolderPathDialog}>
          {replayFolderPath ? 'Change' : 'Add'} Replay folder
        </button>
      }
      <br />
      <br />
      <div>Replays last run: {lastRun ? lastRun : 'Never'}</div>
      <div>
        Replays since last run: {replayCount > 0 ? replayCount : 'None'}
      </div>
      <br />
      {replayFolderPath && replayCount > 0 && (
        <button type="button" onClick={handleParseReplays}>
          Parse Replays
        </button>
      )}
    </div>
  )
}

export default App
