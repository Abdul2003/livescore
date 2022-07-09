import React, { useState, useEffect } from 'react'
import { List, Card, Switch } from 'antd'
import { Link, useParams } from 'react-router-dom'
import '../../styles/results.css'
import HomeLayout from '../components/header'
import Footer from '../components/footer'

function Livescore() {
  const { id } = useParams<{ id: string }>()

  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [results, setResults] = useState([])
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '09982046f2msh13fac0518fdb0a0p1a6df5jsn40a24cbd560c',
      },
    }

    fetch(
      `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=${id}&season=2022&last=12`,
      options
    )
      .then((response) => response.json())

      .then(
        (data) => {
          setIsLoaded(true)

          setResults(data.response)
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
        <HomeLayout leagueId={id} /> Loading...
      </div>
    )
  }
  const onChange = (checked: boolean) => {
    setToggle(checked === true)
  }

  if (results.length === 0) {
    return (
      <>
        <HomeLayout leagueId={id} />{' '}
        <h1 className="Null">There are no live matches at the moment</h1>
      </>
    )
  } else {
    const displayedFixtures =
      toggle === false
        ? results
        : results.filter(
            (item) =>
              item.fixture.status.long != 'Match Finished' ||
              'Match Postponed' ||
              'Not Started'
          )

    return (
      <HomeLayout leagueId={id}>
        <Switch
          onChange={onChange}
          checked={toggle}
          unCheckedChildren={'Live Matches'}
          checkedChildren={'All Matches'}
        />
        <List itemLayout="vertical" dataSource={results} />
        {displayedFixtures.length === 0 ? (
          <h1>No Live Matches</h1>
        ) : (
          displayedFixtures.map((item) => (
            <Card className="card">
              <Link
                to={`/:id/statistics?fixture=${item.fixture.id}`}
                className="cardContent"
              >
                <span className="round">{item.league.round}</span>
                <p className="status">
                  {item.fixture.status.long === 'Not Started' ? (
                    <p className="status-none">{item.fixture.status.long}</p>
                  ) : (
                    item.fixture.status.long
                  )}
                </p>
                <p className="time">
                  {item.fixture.status.elapsed === 90 || 'null' ? (
                    <p className="time-none">
                      {' '}
                      {(item.fixture.status.elapsed = '')}
                    </p>
                  ) : (
                    `${item.fixture.status.elapsed}'`
                  )}
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
              </Link>
            </Card>
          ))
        )}

        <Footer />
      </HomeLayout>
    )
  }
}
export default Livescore
