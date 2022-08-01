import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import   {Router, Link, useNavigate}  from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  background-color:black;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width:30%;
  background-color: black;
  border: 1px solid gray;
  padding: 20px 50px;
  gap: 10px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;

const Input = styled.input`
  border: 1px solid gray;
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  width: 100%;
  color: white;
`;

const Button = styled.button`
  border-radius: 3px;
  border: 1px solid gray;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: black;
  color: white;
`;

 

 
 

 

const SignIn = () => {

  const [name,setName] = useState("");
  const [password,setPassword] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
 
 const Nevigate = useNavigate()

    const handaleSignUp = async ()=>{
      try {
        const signUp = await axios.post("/api/v1/user/auth/signup",{name,password,email,phone})
         
        Nevigate('/home')
      } catch (error) {
      }
    }
    

  const handleLogin = async (e)=>{
    try {
       await axios.post("/api/v1/user/auth/signin",{phone,password});
      Nevigate('/home')
    } catch (error) {
      
    }
     
  }

  
  return (
    <Container>
      <Wrapper>
        <Title>Sign in</Title>
        <Input placeholder="phone number" onChange={e=>setPhone(e.target.value)} />
        <Input type="password" placeholder="password"  onChange={e=>setPassword(e.target.value)} />
       <Button  onClick={handleLogin}>Sign in</Button>
       
        <Title>  or</Title>
        <Input placeholder="username" onChange={e=>setName(e.target.value)}/>
        <Input placeholder="email" onChange={e=>setEmail(e.target.value)}/>
        <Input placeholder="phone number" onChange={e=>setPhone(e.target.value)}/>
        <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)}/>
        <Button onClick={handaleSignUp}>Sign up</Button>
      </Wrapper>
      
    </Container>
  );
};

export default SignIn;