const { ref } = require('./utils')

const getPlatform = (platforms) => {
  const searchStr = 'OnlinePlatform_'
  const platform = platforms.find((p) => p.includes(searchStr))

  return typeof platform === 'string' ? platform.replace(searchStr, '') : null
}

class Player {
  name
  platform
  onlineId
  goals
  assists
  saves
  score
  shots
  team
  isBot

  constructor({
    Name,
    Platform,
    Goals,
    Assists,
    Saves,
    Score,
    Shots,
    Team,
    bBot,
    OnlineID,
  }) {
    this.name = ref(Name, 'value.str', '')
    this.platform = getPlatform(ref(Platform, 'value.byte', []))
    this.goals = ref(Goals, 'value.int', 0)
    this.assists = ref(Assists, 'value.int', 0)
    this.saves = ref(Saves, 'value.int', 0)
    this.score = ref(Score, 'value.int', 0)
    this.shots = ref(Shots, 'value.int', 0)
    this.team = ref(Team, 'value.int')
    this.isBot = ref(bBot, 'value.bool') === 0 ? false : true
    this.onlineId = ref(OnlineID, 'value.q_word')
  }
}

module.exports = Player
