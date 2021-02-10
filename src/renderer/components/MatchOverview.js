import React from 'react'
import PropTypes from 'prop-types'

const sortByScore = (p1, p2) => p2.score - p1.score

const DataRow = ({ name, score, goals, shots, assists, saves }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{score}</td>
      <td>{goals}</td>
      <td>{shots}</td>
      <td>{assists}</td>
      <td>{saves}</td>
    </tr>
  )
}

const Team = ({ players }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Score</th>
          <th>Goals</th>
          <th>Shots</th>
          <th>Assists</th>
          <th>Saves</th>
        </tr>
      </thead>
      <tbody>
        {players.map((p) => (
          <DataRow key={p.name} {...p} />
        ))}
      </tbody>
    </table>
  )
}

const formatDuration = (duration) => {
  if (duration) {
    const minutes = Math.floor(duration / 60)
    const seconds = duration - minutes * 60

    return `${minutes}:${String(seconds).padStart(2, '0')}`
  }

  return ''
}

const MatchOverview = ({
  name,
  mapName,
  team0Score,
  team1Score,
  duration,
  type = '',
  players = [],
}) => {
  const blueTeam = players.filter((p) => p.team === 0).sort(sortByScore)
  const orangeTeam = players.filter((p) => p.team === 1).sort(sortByScore)

  const header = (...params) => {
    return params.reduce((h, c) => {
      if (c != null && c !== '') {
        return `${h}: ${c}`
      }

      return h
    })
  }

  return (
    <div>
      {header(name, type, mapName, formatDuration(duration))}
      <br />
      <div style={{ float: 'left' }}>
        Blue team: {team0Score}
        <br />
        <Team players={blueTeam} />
      </div>
      <div style={{ float: 'right' }}>
        Orange team: {team1Score}
        <Team players={orangeTeam} />
      </div>
    </div>
  )
}

DataRow.propTypes = {
  name: PropTypes.string,
  score: PropTypes.number,
  goals: PropTypes.number,
  shots: PropTypes.number,
  assists: PropTypes.number,
  saves: PropTypes.number,
}

Team.propTypes = {
  players: PropTypes.array,
}

MatchOverview.propTypes = {
  name: PropTypes.string,
  mapName: PropTypes.string,
  team0Score: PropTypes.number,
  team1Score: PropTypes.number,
  type: PropTypes.string,
  players: PropTypes.array,
  duration: PropTypes.number,
}

export default MatchOverview
