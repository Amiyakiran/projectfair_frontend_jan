import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginApi, registerAPI } from '../services/allAPI'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isAuthorizedContext } from '../context/Context'





function Auth({ register }) {
  const {setIsAuthorized} = useContext(isAuthorizedContext)
  //state to hold the userDetails
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: ""
  })
  const navigate = useNavigate()
  const registerForm = register ? true : false
  //function to all register api

  const getregister = async (e) => {
    e.preventDefault()
    const { username, email, password } = user
    if (!username || !email || !password) {
      toast.info('please fill the form completely')
    }
    else {
      const result = await registerAPI(user)
      console.log(result);
      if (result.status == 200) {
      toast.success('registration successfull')
        setUser({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      }
      else {
        toast.error(result.response.data);
        setUser({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  //function to login
  const userLogin = async(e)=>{
   e.preventDefault()
   const {email, password} = user
    if(!email || !password){
       toast.info('Please will the form completely')
    }
    else{
       const result = await loginApi(user)
       console.log(result);
       if(result.status == 200){
        toast.success('Login successful')
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setUser({
          email: "",
          password: ""
        })
       setTimeout(()=>{
        navigate('/')
       },3000)
       setIsAuthorized(true)
       }
       else{
        toast.error('Something went wrong')
        console.log(result);
       }
    }
  }

  console.log(user);


  return (
    <div className='w-100 d-flex justify-content-center align-items-center flex-column' style={{ height: '100vh' }}>

      <div className='w-75 container'>
        <Link to={'/'} style={{ textDecoration: 'none', color: 'blue' }}><h5><FontAwesomeIcon icon={faArrowLeft} />Back to home</h5></Link>
        <div style={{ backgroundColor: 'green' }} className='rounded  mt-3'>
          <Row>
            <Col sm={12} md={6} className='p-5'>
              <img src="https://icon-library.com/images/admin-login-icon/admin-login-icon-20.jpg" alt="no image" className='w-100' />
            </Col>
            <Col sm={12} md={6} className='d-flex justify-content-center align-items-center flex-column'>
              <h2 className='text-light'><FontAwesomeIcon icon={faStackOverflow} /> Project fair</h2>

              {registerForm ? <h5 className='text-light'>Sign Up to Your Account</h5> :
                <h5 className='text-light'>Sign In to Your Account</h5>}

              <Form className='mt-5 w-75'>

                {registerForm && <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" placeholder="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
                </Form.Group>}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" value={user.email} placeholder="Email" onChange={(e) => setUser({ ...user, email: e.target.value })} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" value={user.password} placeholder="Password" onChange={(e) => setUser({ ...user, password: e.target.value })} />
                </Form.Group>

                {registerForm ? <div>
                  <Button onClick={getregister} variant="warning" type="submit" className='w-100'>Register</Button>
                  <p className='text-light'>Already a User? click Here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                </div>
                  :
                  <div>
                    <Button onClick={userLogin} variant="warning" type="submit" className='w-100'>login</Button>
                    <p className='text-light'>New User? click Here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                  </div>
                }

              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <ToastContainer theme='colored' autoClose={2000} position='top-center' />
    </div>
  )
}

export default Auth