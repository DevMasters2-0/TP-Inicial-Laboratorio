import React from 'react'
import { Outlet } from 'react-router'
import { Header } from '../ui'
import Sidebar from './Sidebar'

const Dashboard = () => {
  return <>
    <Header/>
    <div className="divisor-container">
        <Sidebar />
        <div className="content">
            <Outlet/>
        </div>
    </div>
</  >
}

export default Dashboard
