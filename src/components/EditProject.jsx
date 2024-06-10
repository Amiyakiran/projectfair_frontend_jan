import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/baseUrl';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProjectApi } from '../services/allAPI';
import { editProjectResponseContext } from '../context/Context';



function EditProject({project}) {
  const {setEditResponse} = useContext(editProjectResponseContext)
  console.log(project);

  const [update , setUpdate] = useState({
    title:project.title,
    language:project.language,
    github:project.github,
    website:project.website,
    overview:project.overview,
    projectImage:""
  })
  const [preview , setPreview] = useState("")

  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)
    handleClose1()
  };
  const handleShow = () => setShow(true);

  const handleClose1 = ()=>{
    setUpdate({
      title:project.title,
      language:project.language,
      github:project.github,
      website:project.website,
      overview:project.overview,
      projectImage:""
    })
    setPreview("")
  }

  const handleUpdate = async(e)=>{
     e.preventDefault()
     const {title , language, github, website, overview, projectImage} = update
     if(!title || !language || !github || !website || !overview){
       toast.info('please fill the form completely')
     }
     else{
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)

        const token = sessionStorage.getItem("token")

        if(preview){

          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateProjectApi(project._id , reqBody,reqHeader)
          if(result.status == 200){
            setShow(false)
            setEditResponse(result.data)

          }
          else{
            console.log(result);
            toast.error('something went wrong')
          }

        }
        else{
             const reqHeader = {
              " Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
             }
             const result = await updateProjectApi(project._id , reqBody,reqHeader)
             if(result.status == 200){
              setShow(false)
              setEditResponse(result.data)
  
            }
            else{
              console.log(result);
              toast.error('something went wrong')
            }
        }
     }

  }

  useEffect(()=>{
    if(update.projectImage){
      setPreview(URL.createObjectURL(update.projectImage))
    }

  },[update.projectImage])

  return (
    <>
        <FontAwesomeIcon icon={faPenToSquare} onClick={handleShow} className='text-info mx-3' />


        <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col sm={12} md={6}>
                    <label htmlFor="image">
                        <input id='image' type="file" style={{display:'none'}} onChange={(e)=>setUpdate({...update, projectImage:e.target.files[0]})} />
                        <img src={preview?preview:`${serverUrl}/uploads/${project.projectImage}`} alt="no image" className='w-100' />
                    </label>

                </Col>
                <Col sm={12} md={6}>
                   <form>
                    <div className="mb-3 mt-3">
                        <input type="text" value={update.title} onChange={(e)=>setUpdate({...update, title:e.target.value})} placeholder='title' className='form-control w-100' />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={update.language} onChange={(e)=>setUpdate({...update, language:e.target.value})} placeholder='Language' className='form-control w-100' />
                    </div>
                    <div className="mb-3">
                        <input type="text" value={update.github} onChange={(e)=>setUpdate({...update, github:e.target.value})} placeholder='GitHub' className='form-control w-100' />
                    </div>
                    <div className="mb-3">
                        <input type="text" onChange={(e)=>setUpdate({...update, website:e.target.value})} value={update.website} placeholder='Website' className='form-control w-100' />
                    </div>
                    <div className="mb-3">
                       <textarea rows={4} value={update.overview} onChange={(e)=>setUpdate({...update, overview:e.target.value})} placeholder='Overview' className='form-control w-100'></textarea>
                    </div>
                   </form>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default EditProject