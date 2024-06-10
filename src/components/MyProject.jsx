import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import EditProject from './EditProject'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteAProjectApi, getUserProjectApi } from '../services/allAPI'
import { Link } from 'react-router-dom'
import { AddProjectResponseStatusContext, editProjectResponseContext } from '../context/Context'



function MyProject() {
    const {AddReponse} = useContext(AddProjectResponseStatusContext)
    const {editResponse} = useContext(editProjectResponseContext)
    const [userProject, setUserProject] = useState([])
   

    const getAllUserProject = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")

            const reqHeader = {
                " Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
            const result = await getUserProjectApi(reqHeader)
          /*   console.log(result.data); */
            setUserProject(result.data);
        }
    }

    const deleteProject = async(id)=>{

        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")

            const reqHeader = {
                " Content-Type": "application/json",
                "Authorization": `Bearer ${token}`

            }
            const result = await deleteAProjectApi(id ,reqHeader)
            console.log(result);
            if(result.status ==200){
                getAllUserProject()
            }
            else{
                alert('Something went wrong')
            }
         
        }

    }

    useEffect(() => {
        getAllUserProject()
    }, [AddReponse, editResponse])

    return (
        <div className='m-5 shadow p-4 rounded'>
            <div className="d-flex">
                <h3 className='text-success mt-4'>My Project</h3>
                <div className='ms-auto mt-4'>
                    <AddProject />
                </div>
            </div>

            {userProject?.length > 0 ?
                userProject?.map((item) => (<div className='mt-4 p-3 bg-light rounded d-flex'>
                    <h5>{item.title}</h5>
                    <div className="ms-auto d-flex">
                        <EditProject project = {item} />
                       <Link to={item.github} target='_blank'> <FontAwesomeIcon icon={faGithub} className='text-success mx-3' /></Link>
                        <FontAwesomeIcon icon={faTrash} className='text-danger mx-3' onClick={()=>deleteProject(item._id)} />
                    </div>
                </div>))

                :
                <p className='text-danger mt-3'>No project Yet Added</p>
            }


        </div>
    )
}

export default MyProject