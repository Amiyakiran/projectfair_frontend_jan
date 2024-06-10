import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthorizedContext } from '../context/Context';

function Header({dash}) {
  const navigate = useNavigate()
  const {setIsAuthorized} = useContext(isAuthorizedContext)

  const handleLogout = ()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setIsAuthorized(false)
    navigate('/')
  }

  return (
    <Navbar style={{backgroundColor:'green'}}>
    <Container>
      <Link to={'/'} style={{ textDecoration:'none'}}>
          <Navbar.Brand className='text-light'>
          <FontAwesomeIcon icon={faStackOverflow} className='fa-3x' />
           <span className='fs-3'> Project Fair</span>
          </Navbar.Brand>
      </Link>
      {dash && <button onClick={handleLogout} className='btn btn-warning'> <FontAwesomeIcon icon={faPowerOff} className='me-2' />Logout</button>}
    </Container>
  </Navbar>
  )
}

export default Header