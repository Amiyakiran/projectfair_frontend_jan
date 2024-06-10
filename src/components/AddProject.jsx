import React, {  useContext, useState } from 'react'
import { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allAPI';
import { AddProjectResponseStatusContext } from '../context/Context';



function AddProject() {
 const {setAddResponse} = useContext(AddProjectResponseStatusContext)

  //state to hold video details
  const [videoDetails, setVideoDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: ""
  })
  const [show, setShow] = useState(false);
  //state to hold the url of the file uploaded.
  const [preview, setPreview] = useState("")
   const [key , setKey] = useState(false)
   const [token , setToken] = useState("")

  //function to close the modal
  const handleClose = () => setShow(false);
  //function to open the model
  const handleShow = () => setShow(true);
  //function clear all data entered in the modal(cancel button)
  const handleClose1 = () => {
    setVideoDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: ""
    })
    setPreview("")
    setKey(!key)
  }
  //function add projectDetails
  const handleAdd = async(e) => {
    //avoid data lost
    e.preventDefault()

    const { title, language, github, website, overview, projectImage } = videoDetails
    if (!title || !language || !github || !website || !overview || !projectImage) {
      toast.info('please will the form completely')
    } 
    else {
       //handle uploaded content
       //1) create an object for formData class
       const reqBody = new FormData()
       //to add data
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)
      if(token){

        let reqHeader ={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
         const result = await addProjectApi(reqBody,reqHeader)
       /*   console.log(result); */
         if(result.status==200){
         handleClose1()
         handleClose()
         setAddResponse(result.data)
        
         }
         else{
          toast.error('something Went Wrong')
          handleClose1()
          handleClose()
         }
  
  
      }
    }

   

  }



  console.log(videoDetails);
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
    else{
      setToken("")
    }

  },[])
  console.log(token);

  useEffect(() => {
    //file converted url
    if (videoDetails.projectImage) {
      setPreview(URL.createObjectURL(videoDetails.projectImage))
    }

  }, [videoDetails.projectImage])

  console.log(preview);

  return (
    <>
      <Button variant="success" onClick={handleShow}>Add Project</Button>


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="image">
                <input id='image' key={key} type="file" style={{ display: 'none' }} onChange={(e) => setVideoDetails({ ...videoDetails, projectImage: e.target.files[0] })} />
                <img src={preview ? preview : "https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image" className='w-100' />
              </label>

            </Col>
            <Col sm={12} md={6}>
              <form>
                <div className="mb-3 mt-3">
                  <input type="text" placeholder='title' value={videoDetails.title} className='form-control w-100' onChange={(e) => setVideoDetails({ ...videoDetails, title: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Language' value={videoDetails.language} className='form-control w-100' onChange={(e) => setVideoDetails({ ...videoDetails, language: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='GitHub' value={videoDetails.github} className='form-control w-100'
                    onChange={(e) => setVideoDetails({ ...videoDetails, github: e.target.value })} />
                </div>
                <div className="mb-3">
                  <input type="text" placeholder='Website' value={videoDetails.website} className='form-control w-100' onChange={(e) => setVideoDetails({ ...videoDetails, website: e.target.value })} />
                </div>
                <div className="mb-3">
                  <textarea rows={4} placeholder='Overview' value={videoDetails.overview} className='form-control w-100' onChange={(e) => setVideoDetails({ ...videoDetails, overview: e.target.value })}></textarea>
                </div>
              </form>
             
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
   {/* <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim vitae alias blanditiis doloremque totam similique odit quasi delectus dolores voluptas ipsam sed, aut eum nesciunt impedit molestiae. Earum, corrupti fugit.</p> */}
    </>
  )
}

export default AddProject