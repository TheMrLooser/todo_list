import React, { useState } from "react";
import styled from "styled-components";
import { format} from "timeago.js";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from "axios";
const ElementWrapper = styled.div`
border:1px solid #19330091;
width:100%;
border-radius:10px;
padding:5px;
margin:5px;
`
const Heading = styled.h3`
height:10px;
`
const Description = styled.div`


`
const Dates = styled.div`

`
const Edit = styled.div`
display:flex;
gap:10px;
${'' /* display:none; */}

`
const Button = styled.button`
border-radius:5px;
border : 1px solid gray;
width:80px;
height:30px;
cursor:pointer;
`
const UpdateContainer = styled.div`
border:1px solid #19330091;
width:98%;
border-radius:10px;
padding:5px;
${'' /* margin:5px; */}
display:flex;
gap:10px;
align-items :center;
${'' /* display:none;    */}
`
const UpdateHeading = styled.input`
border-radius:10px;
padding-left:5px;
height:30px
`
const UpdateDesc = styled.textarea`
border-radius:10px;
padding-left:5px;
`


const Card = ({todo})=>{
     const [showUpdate,setShowUpdate]  =useState(false)
     const [heading,setHeading] = useState("")
    const [desc,setDesc] = useState("")
    const deleteTodo = async ()=>{
        const id = todo._id
        await axios.delete(`/api/v1/del/todo/${id}`);
        window.location.reload()
        
    }

    const updateTodo  = async ()=>{
        const id = todo._id
        const addTodo = await axios.put(`/api/v1/update/todo/${id}`,{heading,desc})
        window.location.reload()
    }   
    return(<>
        <ElementWrapper>
            <Heading>{todo.heading}</Heading>
            <Description>{todo.desc}</Description>
            <Dates>{format(todo.createdAt)}</Dates>
            <Edit>
                 <EditOutlinedIcon onClick={()=>setShowUpdate(true)} style={{cursor:'pointer'}}/>
                <div onClick={deleteTodo}><DeleteIcon/></div>
            </Edit>
            {
                showUpdate &&
                <UpdateContainer id="update">
                        <UpdateHeading placeholder={todo.heading} onChange={e=>setHeading(e.target.value)}></UpdateHeading>
                        <UpdateDesc placeholder={todo.desc} onChange={e=>setDesc(e.target.value)}> </UpdateDesc>
                        <Button onClick={updateTodo}>Update</Button>
                        <HighlightOffIcon onClick={()=>setShowUpdate(false)}/>

            </UpdateContainer>
            }
            
            
        </ElementWrapper>
    </>)
}


export default Card