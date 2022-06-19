import React, { useState, useEffect } from 'react'
import { List, Card } from 'antd'
import '../../styles/results.css'
import HomeLayout from './components/header'

function Livescore() {
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [fixtures, setFixtures] = useState([])

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '09982046f2msh13fac0518fdb0a0p1a6df5jsn40a24cbd560c',
      },
    }

    fetch(
      'https://api-football-v1.p.rapidapi.com/v3/fixtures?live=all&league=61&season=2021',
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
        {' '}
        <HomeLayout />
        Loading...
      </div>
    )
  }
  if (fixtures.length === 0) {
    return (
      <>
        {' '}
        <HomeLayout />
        <h1 className="Null">There are no live matches at the moment</h1>
      </>
    )
  } else {
    return (
      <>
        <HomeLayout />
        <List
          itemLayout="vertical"
          dataSource={fixtures}
          renderItem={(item) => (
            <Card className="card">
              <div className="cardContent">
                <p className="status">
                  {item.fixture.status.long}

                  <span className="time">{item.fixture.status.elapsed}</span>
                </p>
                <div className="home-team">
                  <img className="logo" src={item.teams.home.logo} />

                  <span className="team-name">{item.teams.home.name}</span>
                  <p className="scores">{item.goals.home}</p>

                  <div className="away-team">
                    <img className="logo" src={item.teams.away.logo} />
                    <span className="team-name">{item.teams.away.name}</span>
                    <div className="away-score">
                      <p className="scores">{item.goals.away}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
        />
        ,
      </>
    )
  }
}
export default Livescore
