import React, { useState, useEffect } from 'react'
import '../../styles/Standings.css'
import HomeLayout from '../components/header'
import { Table } from 'antd'
import { useParams } from 'react-router-dom'

function Standings() {
  const { standings } = useParams<{ standings: string }>()
  console.log(standings)
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [log, setlog] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '0e65c57432msh1dc84828888d254p1b8336jsn15121f8abb67',
      },
    }

    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/standings?season=2021&league=${standings}`,
      options
    )
      .then((response) => response.json())

      .then(
        (data) => {
          setIsLoaded(true)

          setlog(data.response[0].league.standings[0])
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return (
      <div>
        <HomeLayout leagueId={standings} />
        Loading...
      </div>
    )
  }
  console.log(log)

  const columns = [
    {
      title: 'POS',
      dataIndex: 'position',
      sorter: {
        compare: (a, b) => a.position - b.position,
        multiple: 10,
      },
    },
    {
      title: 'Team',
      dataIndex: 'teamName',
    },
    {
      title: 'MP',
      dataIndex: 'matches',
      sorter: {
        compare: (a, b) => a.matches - b.matches,
        multiple: 8,
      },
    },
    {
      title: 'W',
      dataIndex: 'won',
      sorter: {
        compare: (a, b) => a.won - b.won,
        multiple: 7,
      },
    },
    {
      title: 'D',
      dataIndex: 'drawn',
      sorter: {
        compare: (a, b) => a.drawn - b.drawn,
        multiple: 6,
      },
    },
    {
      title: 'L',
      dataIndex: 'lost',
      sorter: {
        compare: (a, b) => a.lost - b.lost,
        multiple: 5,
      },
    },
    {
      title: 'GF',
      dataIndex: 'goalsFor',
      sorter: {
        compare: (a, b) => a.goalsFor - b.goalsFor,
        multiple: 4,
      },
    },
    {
      title: 'GA',
      dataIndex: 'goalsAgainst',
      sorter: {
        compare: (a, b) => a.goalsAgainst - b.goalsAgainst,
        multiple: 3,
      },
    },
    {
      title: 'GD',
      dataIndex: 'goalDifference',
      sorter: {
        compare: (a, b) => a.goalDifference - b.goalDifference,
        multiple: 2,
      },
    },
    {
      title: 'PTS',
      dataIndex: 'points',
      sorter: {
        compare: (a, b) => a.points - b.points,
        multiple: 1,
      },
    },
  ]

  const data = log.map((fixtures, index) => ({
    key: `${fixtures.rank}`,
    position: `${fixtures.rank}`,
    matches: `${fixtures.all.played}`,
    won: `${fixtures.all.win}`,
    drawn: `${fixtures.all.draw}`,
    lost: `${fixtures.all.lose}`,
    goalsFor: `${fixtures.all.goals.for}`,
    goalsAgainst: `${fixtures.all.goals.against}`,
    goalDifference: `${fixtures.goalsDiff}`,

    teamName: (
      <div className="container">
        <img
          className="image"
          src={`https://media.api-sports.io/football/teams/${fixtures.team.id}.png`}
        />{' '}
        <p className="text">{fixtures.team.name}</p>
      </div>
    ),

    points: `${fixtures.points}`,
  }))

  function onChange(filters, sorter, extra) {
    console.log('params', filters, sorter, extra)
  }

  return (
    <>
      <HomeLayout leagueId={standings} />
      <Table
        columns={columns}
        pagination={false}
        dataSource={data}
        onChange={onChange}
      />
    </>
  )
}
export default Standings
