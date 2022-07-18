import React from 'react'
import { useState, useEffect } from 'react'
import HomeLayout from '../../components/header'
import { Table, Spin } from 'antd'
import '../../../styles/message.css'
import '../../../styles/statistics.css'

function Stats() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [home, setHome] = useState([])
  const [away, setAway] = useState([])
  const [hometeam, setHometeam] = React.useState({} as any)
  const [awayteam, setAwayteam] = React.useState({} as any)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '09982046f2msh13fac0518fdb0a0p1a6df5jsn40a24cbd560c',
      },
    }
    const params = new URLSearchParams(location.search)

    const id = params.get('fixture')
    console.log(id)
    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics?fixture=${id}`,
      options
    )
      .then((response) => response.json())

      .then(
        (data) => {
          setIsLoaded(true)

          setHome(data.response[0].statistics)
          setHometeam(data.response[0].team)
          setAway(data.response[1].statistics)
          setAwayteam(data.response[1].team)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])
  console.log(home)

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return (
      <div>
        <HomeLayout />
        <Spin className="spin" size="large" tip="Loading..." />
      </div>
    )
  }
  const columns = [
    {
      title: (
        <div>
          {' '}
          <img
            className="image"
            src={`https://media.api-sports.io/football/teams/${hometeam.id}.png`}
          />{' '}
          <p>{hometeam.name}</p>
        </div>
      ),
      dataIndex: 'HT',
    },
    { title: <p>VS</p>, dataIndex: 'S' },
    {
      title: (
        <div>
          {' '}
          <img
            className="image"
            src={`https://media.api-sports.io/football/teams/${awayteam.id}.png`}
          />{' '}
          <p>{awayteam.name}</p>
        </div>
      ),
      dataIndex: 'AT',
    },
  ]

  const data = []
  for (let i = 0; i < home.length && i < away.length; i++) {
    data.push({ HT: home[i].value, AT: away[i].value, S: home[i].type })
    if (home[i].value === null) {
      home[i].value = 0
    }
    if (away[i].value === null) {
      away[i].value = 0
    }
  }

  console.log(data)
  if (home.length === 0) {
    return (
      <>
        {' '}
        <HomeLayout />
        <h1 className="null">Stats Not Available For This Match</h1>
      </>
    )
  } else {
    return (
      <>
        <HomeLayout />

        <Table columns={columns} dataSource={data} pagination={false} />
      </>
    )
  }
}

export default Stats
