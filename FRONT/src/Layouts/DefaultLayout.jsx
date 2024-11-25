import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Pages/sidebar'
import '../style/Deafult.css'
import Navbar from '../Pages/Navbar'

export default function DefaultLayout() {
  return (
    <div >
      
        
        <Sidebar></Sidebar>
        <div style={{marginLeft:'200px', marginTop:'-50.5%', }}>
        <Navbar></Navbar>
        </div>
        
        <div style={{marginLeft:'210px'}}>
         <Outlet/>
        </div>
      
      
    </div>
  )
}
