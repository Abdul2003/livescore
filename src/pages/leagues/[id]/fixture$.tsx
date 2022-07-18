import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { List, Card, Spin } from 'antd'
import '../../../styles/message.css'
import '../../../styles/fixture.css'
import HomeLayout from '../../components/header'
import { Link } from 'react-router-dom'

function Fixtures() {
  const { id } = useParams<{ id: string }>()
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
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=2022&next=10`,
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
  console.log(fixtures)

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

  if (fixtures.length === 0) {
    return (
      <>
        <HomeLayout leagueId={id} />{' '}
        <h1 className="null">There Are No Fixtures Available At The Moment</h1>
      </>
    )
  } else {
    return (
      <>
        <HomeLayout leagueId={id} />
        <List
          itemLayout="vertical"
          dataSource={fixtures}
          renderItem={(item) => (
            <Card className="card">
              <Link
                to={`./statistics?fixture=${item.fixture.id}`}
                className="cardContent"
              >
                {}
                <div>
                  <p className="round">{item.league.round}</p>
                  <p className="fixture-status">{item.fixture.status.long}</p>
                  <span className="date">
                    {new Date(item.fixture.date).toLocaleString()}
                  </span>

                  <span className="time">{item.fixture.status.elapsed}'</span>
                </div>
                <div className="teams">
                  <div className="home-team">
                    <img className="logo" src={item.teams.home.logo} />
                    {}
                    <span className="team-name">{item.teams.home.name}</span>
                    <p className="scores">{item.goals.home}</p>

                    <div className="away-team"></div>
                    <img className="logo" src={item.teams.away.logo} />
                    <span className="team-name">{item.teams.away.name}</span>
                    <div className="away-score">
                      <p className="scores">{item.goals.away}</p>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          )}
        />
        ,
      </>
    )
  }
}

export default Fixtures
