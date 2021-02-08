const { exec } = require('child_process')

function Status(hadError, message, isRunning) {
  this.isRunning = isRunning
  this.hadError = hadError
  this.message = message
  this.timestamp = Date.now()
}

const getRLStatus = () => {
  exec(
    'tasklist.exe /fi "imagename eq RocketLeague.exe"',
    (error, stdout, stderr) => {
      if (error || stderr) {
        const message = error ? error.message : stderr ? stderr : null

        return new Status(true, message)
      }

      return new Status(false, stdout, stdout.includes('RocketLeague.exe'))
    }
  )
}

getRLStatus()
