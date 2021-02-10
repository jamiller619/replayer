const ref = require('./ref')
const mapTypes = require('./mapTypes')
const Player = require('./Player')

const parseDate = (str) => {
  const parts = str.split(' ')

  if (parts && parts.length > 0) {
    const d = parts[0].replaceAll('-', ' ')

    if (parts.length > 1) {
      const t = parts[1].replaceAll('-', ':')

      return Date.parse(`${d} ${t}`)
    }

    return Date.parse(d)
  }

  return null
}

const getMatchDuration = (fps, frameCount) => {
  const num = frameCount / fps
  const minutes = Math.floor(num / 60)
  const seconds = Math.floor(num % 60)

  return minutes * 60 + seconds
}

class Match {
  id
  name
  type
  length
  mapName
  date
  players = []
  team0Score
  team1Score
  teamSize

  constructor(replayData) {
    const body = ref(replayData, 'header.body.properties.value')

    this.id = ref(body, 'Id.value.str')
    this.name = ref(body, 'ReplayName.value.str')
    this.type = ref(body, 'MatchType.value.name')
    this.team0Score = ref(body, 'Team0Score.value.int')
    this.team1Score = ref(body, 'Team1Score.value.int')
    this.date = parseDate(ref(body, 'Date.value.str'))
    this.teamSize = ref(body, 'TeamSize.value.int')

    const map = ref(body, 'MapName.value.name')

    this.mapName = map && mapTypes[map] ? mapTypes[map] : null

    const fps = ref(body, 'RecordFPS.value.float')
    const frameCount = ref(body, 'NumFrames.value.int')

    this.duration = fps && frameCount ? getMatchDuration(fps, frameCount) : null

    const playerData = ref(body, 'PlayerStats.value.array')

    this.players = playerData
      ? playerData.map((player) => new Player(player.value))
      : null
  }
}

module.exports = Match
