import { faInstagram, faStackOverflow ,faTwitter,faLinkedin,faFacebook } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom'


function Footer() {
    return (
        <>

            <div className='mt-5 w-100 p-4' style={{ backgroundColor: 'green' }}>
                <div className="row mx-md-5 mx-3">
                
                    <div className="col-md-4">
                        <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-2' />Project Fair</h3>
                        <p style={{textAlign:'justify', color:'black'}}  className='mt-3'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit velit placeat quasi animi maxime natus vero aspernat blanditiis magni, molestias
                            similique? Nesciunt, aspernatur? Lorem ipsum dolor sit, amet consectetur adipisicing elit. Modi architecto </p>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-1">
                        <h3 className='text-light'>Links</h3>
                        <Link  className='mt-3' style={{textDecoration:'none', color:'black'}}  to={'/'}><p>Home</p></Link>
                        <Link style={{textDecoration:'none', color:'black'}}  to={'/project'}><p>Project</p></Link>
                        <Link style={{textDecoration:'none', color:'black'}} to={'/dashboard'}><p>DashBoard</p></Link>
                    </div>
                    <div className="col-md-1"></div>
                    <div className="col-md-2">
                    <h3 className='text-light'>Guides</h3>
                        <Link className='mt-3' style={{textDecoration:'none', color:'black'}}  to={'/https://react.dev/learn'}><p>React</p></Link>
                        <Link style={{textDecoration:'none', color:'black'}}  to={'/https://react-bootstrap.netlify.app/'}><p>React Bootstrap</p></Link>
                        <Link style={{textDecoration:'none', color:'black'}} to={'/https://bootswatch.com/'}><p>react bootswatch</p></Link>  
                    </div>
                    <div className="col-md-3">
                        <h3 className='text-light'>Contact Us</h3>
                        <div className='d-flex mt-3'>
                            <input type="text" placeholder='Enter Mail Id' className='form-control' />
                            <button className='btn btn-warning ms-3'>SubScribe</button>
                        </div>
                        <div className="d-flex mt-4 justify-content-between">
                        <FontAwesomeIcon className='fa-2x text-light' icon={faInstagram} />
                        <FontAwesomeIcon  className='fa-2x text-light' icon={faTwitter} />
                        <FontAwesomeIcon  className='fa-2x text-light' icon={faLinkedin} />
                        <FontAwesomeIcon  className='fa-2x text-light' icon={faFacebook} />
                        </div>
                    </div>
                   
                </div>


                <p className='text-center text-secondary my-5'>Copyright © 2024 Project Fair. Built with React.</p>
            </div>


        </>
    )
}

export default Footer