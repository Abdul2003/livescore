import React, { useState, useEffect } from 'react'
import 'antd/dist/antd.css'
import { Link } from 'react-router-dom'
import { AutoComplete } from 'antd'

const { Option } = AutoComplete

const App = () => {
  const [result, setResult] = useState([])
  const [error, setError] = useState(null)
  const [isLoaded, setIsLoaded] = useState(false)
  useEffect(() => {
    const api = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
        'X-RapidAPI-Key': '0e65c57432msh1dc84828888d254p1b8336jsn15121f8abb67',
      },
    }

    fetch('https://api-football-v1.p.rapidapi.com/v3/leagues', api)
      .then((response) => response.json())

      .then(
        (data) => {
          setIsLoaded(true)

          setResult(data.response)
        },
        (error) => {
          setIsLoaded(true)
          setError(error)
        }
      )
  }, [])

  return (
    <AutoComplete
      style={{
        width: 200,
      }}
      placeholder="input here"
      filterOption={(inputValue, option) =>
        option!.val.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
      }
    >
      {result.map((item) => (
        <Option key={item.league.id} val={item.league.name}>
          <Link
            to=""
            onClick={() => {
              window.location.href = `/${item.league.id}`
            }}
          >
            <img
              style={{
                width: '20px',
                margin: '5px',
              }}
              src={`https://media.api-sports.io/football/leagues/${item.league.id}.png`}
            />

            <span style={{ color: 'black' }}>{item.league.name}</span>
          </Link>
        </Option>
      ))}
    </AutoComplete>
  )
}

export default App
