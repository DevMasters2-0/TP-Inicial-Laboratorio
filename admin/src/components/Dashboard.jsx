import React from 'react'
import { Outlet } from 'react-router'
import { Header } from '../ui'
import Sidebar from './Sidebar'

const Dashboard = ({ isAuthenticated, setIsAuthenticated }) => {

    return <>
        <Header isAuthenticated={isAuthenticated} />
        <div className="divisor-container">
            <Sidebar setIsAuthenticated={setIsAuthenticated} />
            <div className="content" setIsAuthenticated={setIsAuthenticated}>
                <Outlet />
            </div>
        </div>
    </  >
}

export default Dashboard
