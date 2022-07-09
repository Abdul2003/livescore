import React from 'react'
import { Layout, Menu } from 'antd'
import { Link, Route, BrowserRouter } from 'react-router-dom'
import Searchbox from './search'

import Sidenav from './Sidenav'

import '../../styles/header.css'

function HomeLayout(props) {
  const { Header } = Layout
  console.log(props.leagueId)
  console.log(React.version)
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
            <Menu.Item>
              <Link to="/39"></Link>England
            </Menu.Item>
            <Menu.Item>
              <Link to="/Spain/">Spain</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Italy/">Italy</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="/Germany/">Germany</Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to=""
                onClick={() => {
                  window.location.href = '/61'
                }}
              >
                France
              </Link>
            </Menu.Item>

            <Searchbox />
          </Menu>
        </Header>
      </Layout>
    </>
  )
}
export default HomeLayout
