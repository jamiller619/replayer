import React from 'react'
import { useStore } from '../store'
import MatchOverview from './MatchOverview'

const { dialog } = window.app

const dialogOptions = {
  title: 'Select replay save folder',
  defaultPath: '',
  buttonLabel: 'Select folder',
  properties: ['openDirectory'],
}

const App = () => {
  const [
    { replayFolderPath, lastRun, replayFileStats, parsedReplays },
    setStore,
  ] = useStore()

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

  const handleParseReplays = () => {
    window.app.parseReplays()
  }

  const handleReset = () => {
    window.app.store.reset('parsedReplays')
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
      <br />
      <br />
      <div>Parsed Replays: {parsedReplays.length}</div>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
      <br />
      {parsedReplays.map((replay) => (
        <MatchOverview key={replay.id} {...replay} />
      ))}
    </div>
  )
}

export default App
