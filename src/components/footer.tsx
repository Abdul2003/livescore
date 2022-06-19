import * as React from 'react'
import { Layout } from 'antd'

function Footer() {
  const Footer = Layout

  return (
    <Footer style={{ textAlign: 'center' }}>
      Made By Abdul
      <a href="https://twitter.com/dgeneral875"></a>
      <a href="https://instagram.com/d.general12">
        <img src={'/logos/Instagram.svg'} />
      </a>
    </Footer>
  )
}
export default Footer
