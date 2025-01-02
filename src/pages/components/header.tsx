import React from 'react'
import { Layout, Menu, Affix } from 'antd'
import { Link } from 'react-router-dom'
import Searchbox from './search'

import Sidenav from './Sidenav'

import '../../styles/header.css'

function HomeLayout(props) {
  const { Header } = Layout
  console.log(props.leagueId)

  return (
    <>
      <Layout className="layout">
        <Header>
          <Menu theme="dark" mode="horizontal">
            <Menu.Item
              style={{
                textDecoration: 'none',
                backgroundColor: 'rgb(0, 21, 41)',
                cursor: 'default',
              }}
            >
              {' '}
              <Sidenav id={props.leagueId} />
            </Menu.Item>

            <Searchbox />

            <Menu.Item>
              <Link
                to=""
                onClick={() => {
                  window.location.href = '/leagues/39/results'
                }}
              ></Link>
              Premier League
            </Menu.Item>
            <Menu.Item>
              <Link
                to=""
                onClick={() => {
                  window.location.href = '/leagues/140/results'
                }}
              >
                La Liga
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to=""
                onClick={() => {
                  window.location.href = '/leagues/135/results'
                }}
              >
                Serie A
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to=""
                onClick={() => {
                  window.location.href = '/leagues/78/results'
                }}
              >
                Bundesliga
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to=""
                onClick={() => {
                  window.location.href = '/leagues/61/results'
                }}
              >
                Ligue 1
              </Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </>
  )
}
export default HomeLayout
