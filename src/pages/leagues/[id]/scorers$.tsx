import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { List, Avatar, Spin } from 'antd'
import '../../../styles/scorers.css'
import '../../../styles/message.css'
import HomeLayout from '../../components/header'

function Scorers() {
  const { id } = useParams<{ id: string }>()
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [players, setPlayers] = React.useState({} as any)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '0e65c57432msh1dc84828888d254p1b8336jsn15121f8abb67',
      },
    }

    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=${id}&season=2022`,
      options
    )
      .then((response) => response.json())

      .then(
        (data) => {
          setIsLoaded(true)

          setPlayers(data.response)
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
        <HomeLayout leagueId={id} />
        <Spin className="spin" size="large" tip="Loading..." />
      </div>
    )
  }

  console.log(players)

  const data = []
  for (let i = 0; i < players.length; i++) {
    data.push({
      title: `${players[i].player.firstname} ${players[i].player.lastname}`,
      description: (
        <span>
          {players[i].statistics[0].team.name}
          <span className="goals">
            {players[i].statistics[0].goals.total} Goals
          </span>
        </span>
      ),
      photo: players[i].player.photo,
    })
  }
  console.log(data)
  if (players.length === 0) {
    return (
      <>
        <HomeLayout leagueId={id} />{' '}
        <h1 className="null">Top-Scorers Not Available Yet</h1>
      </>
    )
  } else {
    return (
      <>
        <HomeLayout leagueId={id} />
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.photo} />}
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </>
    )
  }
}
export default Scorers
