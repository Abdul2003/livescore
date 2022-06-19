import React from 'react'
import { Layout, Menu } from 'antd'
import { Link } from 'react-router-dom'

import Sidenav from './Sidenav'

import '../../../styles/header.css'

function HomeLayout() {
  const { Header } = Layout

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
              <Sidenav />
            </Menu.Item>
            <Menu.Item>
              {' '}
              <Link to="/"></Link>England
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
              <Link to="/France/">France</Link>
            </Menu.Item>
          </Menu>
        </Header>
      </Layout>
    </>
  )
}
export default HomeLayout
