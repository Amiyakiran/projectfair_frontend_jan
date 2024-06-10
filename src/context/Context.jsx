import React, { createContext, useState } from 'react'

export const AddProjectResponseStatusContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthorizedContext = createContext()



function Context({children}) {
    //create the state to share between the components
    const [AddReponse , setAddResponse] = useState({})
    const [editResponse ,setEditResponse] = useState({})
    const [isAuthorized , setIsAuthorized] = useState(true)

  return (
    //TO PROVIDE THE CONTEXT TO ALL COMPONENT
    <AddProjectResponseStatusContext.Provider value={{AddReponse , setAddResponse}}>
       <editProjectResponseContext.Provider value={{editResponse ,setEditResponse}}> 
      <isAuthorizedContext.Provider value={{isAuthorized , setIsAuthorized}}> 
        {children}
        </isAuthorizedContext.Provider>
       </editProjectResponseContext.Provider>
    </AddProjectResponseStatusContext.Provider>
  )
}

export default Context