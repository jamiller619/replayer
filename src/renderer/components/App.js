import React from 'react'
import useStore from '../useStore'

const { dialog } = window.app

const dialogOptions = {
  title: 'Select replay save folder',
  defaultPath: '',
  buttonLabel: 'Select folder',
  properties: ['openDirectory'],
}

const App = () => {
  const [{ replayFolderPath }, setStore] = useStore()

  const handleFolderPathDialog = async () => {
    const dialogResponse = await dialog.showOpenDialog(dialogOptions)

    if (dialogResponse && dialogResponse.canceled === false) {
      const [dir] = dialogResponse.filePaths

      setStore({
        replayFolderPath: dir,
      })
    }
  }

  return (
    <div>
      {!replayFolderPath && (
        <button type="button" onClick={handleFolderPathDialog}>
          Add Replay folder
        </button>
      )}
    </div>
  )
}

export default App
