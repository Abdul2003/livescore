import React, { useState, useEffect } from 'react'
import { List, Avatar } from 'antd'
import '../../styles/scorers.css'
import HomeLayout from './components/header'

function Scorers() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [fixtures, setFixtures] = React.useState({} as any)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '0e65c57432msh1dc84828888d254p1b8336jsn15121f8abb67',
      },
    }

    fetch(
      'https://api-football-v1.p.rapidapi.com/v3/players/topscorers?league=39&season=2021',
      options
    )
      .then((response) => response.json())

      .then(
        (data) => {
          setIsLoaded(true)

          setFixtures(data.response)
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
        <HomeLayout />
        Loading...
      </div>
    )
  }

  console.log(fixtures)

  const data = []
  for (let i = 0; i < fixtures.length; i++) {
    data.push({
      title: `${fixtures[i].player.firstname} ${fixtures[i].player.lastname}`,
      description: (
        <span>
          {fixtures[i].statistics[0].team.name}
          <span className="goals">
            {fixtures[i].statistics[0].goals.total} Goals
          </span>
        </span>
      ),
      photo: fixtures[i].player.photo,
    })
  }
  console.log(data)

  return (
    <>
      <HomeLayout />
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
export default Scorers
