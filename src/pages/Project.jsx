import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { allProjectApi } from '../services/allAPI'


function Project() {
  const [allProduct, setAllProject] = useState([])
  const [token, setToken] = useState("")
  const [searchKey , setSearchKey] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
      getAllProject()
    }

  }, [searchKey])

  const getAllProject = async () => {
    const result = await allProjectApi(searchKey)
    setAllProject(result.data)
  }

  console.log(allProduct);
  console.log(searchKey);
  return (
    <>
      <Header />


      <div className='mt-5'>
        <h2 className='text-center'>All projects</h2>
      </div>

      {token ? <div>
        
        <div className='row mt-5 d-flex justify-content-center w-100'>
              <div className="col-md-4"></div>
              <div className="col-md-4 d-flex p-4 justify-content-center">
                <input type="text" className='form-control' placeholder='Search by Technologies' onChange={(e)=>setSearchKey(e.target.value)} />
                <FontAwesomeIcon icon={faMagnifyingGlass} rotation={90} className='text-secondary' style={{ marginTop: '12px', marginLeft: '-30px' }} />
              </div>
              <div className="col-md-4"></div>

            </div>
        {allProduct?.length > 0 ?
          <div>
            

            <Row className='mt-5 mx-3'>
             {allProduct.map((item)=>(<Col sm={12} md={6} lg={4} className='p-4'>
                 <ProjectCard project={item}/> 
              </Col>)) }
            </Row>
          </div>
          :
          <div className='mt-5'>
            <h1 className='text-danger text-center fs-3'>No project to display...</h1>
          </div>
        }

      </div>


        :
        <div className='d-flex justify-content-center align-items-center flex-column mt-5'>
          <img src="https://cdn.pixabay.com/animation/2023/06/13/15/12/15-12-30-710_512.gif" alt="no image" style={{ width: '16%' }} />
          <h4 className='mt-4 text-danger'>Please <Link to={'/login'}>Login</Link> to See More Project</h4>
        </div>}
    </>
  )
}

export default Project