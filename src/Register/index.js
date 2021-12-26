import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useState } from 'react'
// const BASE_URL=process.env.REACT_APP_BASE_URL;

const Register=()=> {
// const navigate=useNavigate();
// const [name,setName]=useState('')
// const [email,setEmail]=useState('')
// const [password,setPassword]=useState('')
const [error,setError]=useState('');

const signUp =async(e)=>{
    try{
    const result = await axios.post(`http://localhost:4000/resgister`,{
        name:e.target.name.value,
        email:e.target.email.value,
        password:e.target.password.value,
        password2:e.target.password2.value,

        // role:process.env.REACT_APP_USER_ROLE
    });
    console.log(result.data);
    console.log("hj");
}catch(err){

}
};


    return (
        <div>
           <h1>Register</h1>
           <form onSubmit={signUp} >
                <label>name</label>
                <input type="text"
                />
                <label>email</label>
                <input type="email"
                />
                <label>password</label>
                <input type="password"/>
                <label> confirm password</label>
                <input type="password2"/>
                <button type='submit'>Signup</button>
           </form>
        </div>
    )
}

export default Register
