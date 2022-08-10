import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { format} from "timeago.js";
import Card from './Card';


const Container  = styled.div`
width:100%;
height:100vh;
display:flex;
flex-direction:column;
align-items:center;
background-color:#0b022c;
color:white;
font-family:proximanova-regular-webfont,Arial,sans-serif;

`
const Wrapper = styled.div `
display:flex;
flex-direction:column;
align-items:center;
gap:10px;
margin-top:50px;
padding:10px;
border:1px solid gray;
background-color:#1c8a2d;
border-radius:10px;
width:50%;

`
const Input = styled.input `
border-radius:10px;
width:50%;
height:30px;

`
const Textarea = styled.textarea `
border-radius:10px;
width:50%;
`
const Hr = styled.hr`
width:50%;
margin-top:20px;
margin-bottom:20px
`

const TodoContainer = styled.div`
display:flex;
flex-direction:column;
align-items:center;
gap:10px;
margin-top:10px;
padding:10px;
border:1px solid gray;
background-color:#1c8a2d;
border-radius:10px;
width:50%;
overflow-y:auto;
overflow-x:hidden;
margin-bottom:10px;
`
 
 
const Button = styled.button`
border-radius:5px;
border : 1px solid gray;
width:80px;
height:30px;
cursor:pointer;
`

const  Home = ()=>{
    const [todos,settodo] = useState([]);
    const [heading,setHeading] = useState("")
    const [desc,setDesc] = useState("")
    useEffect(()=>{
        const fetchData =  async ()=>{
            const data = await axios.get(`/api/v1/yourtodo`) 
            settodo(data.data)
        } 
        fetchData()
    },[])

    const sendData = async ()=>{
        const addTodo = await axios.post(`/api/v1/todo/new`,{heading,desc})
        const data = await axios.get(`/api/v1/yourtodo`)
        settodo(data.data)
    }
   
    return(<>
          <Container>
                <Wrapper>
                     <Input placeholder="Heading" onChange={e=>setHeading(e.target.value)}></Input>
                     <Textarea placeholder="description" rows={3} onChange={e=>setDesc(e.target.value)}></Textarea>
                     <Button onClick={sendData}>ADD </Button>
                </Wrapper>
                <Hr/>
                <TodoContainer>
                    {todos.map(todo =>todo? <Card todo={todo}/> :"No Todo ")}
                </TodoContainer>
          </Container>
    </>)
}


export default Home;