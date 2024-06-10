import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col,Row } from 'react-bootstrap'
import Profile from '../components/Profile'
import MyProject from '../components/MyProject'

function Dashboard({dashboard}) {
 const dash = dashboard
 const [username , setUsername] = useState("")
 useEffect(()=>{
    if(sessionStorage.getItem("existingUser")){
       setUsername( JSON.parse(sessionStorage.getItem("existingUser")).username) 
    }
 },[])
console.log(username);
  return (
    <div>
      <Header dash= {dash}/>

      <div className='mt-5'>
           <h3 className='ms-4'>Welcome <span className='text-warning'>{username}</span></h3>   
           <Row className="mt-4">
            <Col sm={12} md={8}>
              <MyProject/>
            </Col>
            <Col sm={12} md={4}>
              <Profile/>
            </Col>
           </Row>
      </div>
    </div>
  )
}

export default Dashboard