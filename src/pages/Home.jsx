import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import titleImage from '../assets/designer.svg'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { gethomeProjectApi } from '../services/allAPI'


function Home() {
  const [isLogin , setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
        setIsLogin(true)
    }
    else{
      setIsLogin(false)
    }
    getHomeProject()
  },[])

  const getHomeProject = async()=>{
    const result = await gethomeProjectApi()
  /*   console.log(result); */
    setHomeProject(result.data)
  }


console.log(homeProject);
  return (
    <>
      <div className="container-fluid w-100" style={{ backgroundColor: 'green', height: '100vh' }}>
        <Row className='align-items-center p-5'>
          <Col sm={12} md={6}>
            <h1 className='text-light' style={{fontSize:'76px'}} >Project Fair</h1>
            <p className='mt-3'>One stop destination for all software development Projects</p>

           {!isLogin?
            <button className='btn btn-warning mt-3'><Link to={'/login'} style={{textDecoration:'none',color:'white'}}>Get Started <FontAwesomeIcon icon={faArrowRight} /></Link></button>
            :
            <button className='btn btn-warning mt-3'><Link to={'/dashboard'}  style={{textDecoration:'none',color:'white'}}>Manage Project <FontAwesomeIcon icon={faArrowRight} /></Link></button>}
          </Col>
          <Col sm={12} md={6} className='mt-5'>
            <img src={titleImage} alt="image" className='w-75' />
          </Col>
        </Row>


      </div>

      <div>
        <h1 className='mt-5 text-center'>Explore our Projects</h1>
        <marquee scrollAmount={25}>
           <div className='d-flex'>
              {homeProject?.map((item)=>(
                <ProjectCard project={item} />
              ))
                }
           </div>
        </marquee>

        <Link to={'/project'} style={{color:'red'}}><p className="text-center mt-4">See more Project</p></Link>
      </div>

    </>
  )
}

export default Home