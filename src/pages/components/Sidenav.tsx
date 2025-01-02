import React, { useState } from 'react'
import { Drawer } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import '../../styles/Sidenav.css'
const Sidenav = (props) => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }

  const onClose = () => {
    setVisible(false)
  }

  return (
    <>
      <MenuOutlined onClick={showDrawer} />
      <Drawer
        title="Basic Drawer"
        placement="left"
        onClose={onClose}
        visible={visible}
      >
        <ol>
          <Link
            to=""
            onClick={() => {
              window.location.href = `/leagues/${props.id}/results`
            }}
          >
            Live Scores And Results
          </Link>
        </ol>
        <ol>
          <Link
            to=""
            onClick={() => {
              window.location.href = `/leagues/${props.id}/fixture`
            }}
          >
            Fixtures
          </Link>
        </ol>

        <ol>
          <Link
            to=""
            onClick={() => {
              window.location.href = `/leagues/${props.id}/standings`
            }}
          >
            Standings
          </Link>
        </ol>
        <ol>
          <Link
            to=""
            onClick={() => {
              window.location.href = `/leagues/${props.id}/scorers`
            }}
          >
            Top-Scorers
          </Link>
        </ol>
      </Drawer>
    </>
  )
}

export default Sidenav
