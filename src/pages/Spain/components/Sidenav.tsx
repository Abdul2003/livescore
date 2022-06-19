import React, { useState } from 'react'
import { Drawer, Button } from 'antd'
import { Link } from 'react-router-dom'
import '../../../styles/Sidenav.css'
const Sidenav = () => {
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
          <Link to="/Spain/">Live Scores</Link>
        </ol>
        <ol>
          <Link to="/Spain/fixture">Fixtures</Link>
        </ol>
        <ol>
          <a>Results</a>
        </ol>
        <ol>
          <Link to="/Spain/standings">Standings</Link>
        </ol>
      </Drawer>
    </>
  )
}

export default Sidenav
