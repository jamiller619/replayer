import React, { useState } from 'react'

const dialogOptions = {
  title: 'Select replay save folder',
  defaultPath: '',
  buttonLabel: 'Select folder',
  properties: ['openDirectory']
}

const App = () => {
  const [{ replayFolderPath }, setState] = useState({})

  const handleFolderPathDialog = async () => {
    const dir = await window.showOpenDialog(dialogOptions)

    setState({
      replayFolderPath: dir
    })
  }

  return (
    <form>
      {!replayFolderPath && <button type="button" onClick={handleFolderPathDialog}>Add Replay folder</button>}
    </form>
  )
}

export default App
