import React from "react"
import {Outlet} from "react-router-dom"
import AppBar from "../components/AppBar"

const Layout = ({token}) => {
  return (
    <>
      <AppBar token={token}/>
      <Outlet />
    </>
  )
}

export default Layout