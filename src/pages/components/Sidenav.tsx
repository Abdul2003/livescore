import React, { useState } from 'react'
import { Drawer, Button } from 'antd'
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
      <Button className="Button" type="primary" onClick={showDrawer}>
        Open
      </Button>
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
              window.location.href = '/:id'
            }}
          >
            Live Scores And Results
          </Link>
        </ol>
        <ol>
          <Link
            to=""
            onClick={() => {
              window.location.href = `/:fixture/${props.id}`
            }}
          >
            Fixtures
          </Link>
        </ol>

        <ol>
          <Link
            to=""
            onClick={() => {
              window.location.href = `/:standings/${props.id}`
            }}
          >
            Standings
          </Link>
        </ol>
        <ol>
          <Link
            to=""
            onClick={() => {
              window.location.href = `/:scorers/${props.id}`
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
