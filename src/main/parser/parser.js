const { exec } = require('child_process')
const path = require('path')
const Match = require('./Match')

const rattletrap = path.join(__dirname, '../bin/rattletrap-9.4.1-ubuntu-18.04')

const parse = (replayFilePath) => {
  return new Promise((resolve, reject) => {
    exec(
      // rattletrap,
      // ['-f', `-i "${path.join(dir, file)}"`],
      `${rattletrap} -f -i "${replayFilePath}"`,
      { maxBuffer: 1024 * 1000 },
      (error, stdout, stderr) => {
        if (error || stderr) {
          const message = error ? error.message : stderr ? stderr : null

          reject(message)
        }

        const replayData = JSON.parse(stdout.toString())

        resolve(new Match(replayData))
      }
    )
  })
}

module.exports = {
  parse,
}
