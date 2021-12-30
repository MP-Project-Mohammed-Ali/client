import React, { useEffect, useState } from 'react';
import axios from 'axios';
import withReactContent from 'sweetalert2-react-content';
import ReactCodeInput from 'react-verification-code-input';
import PasswordChecklist from 'react-password-checklist';
import { useNavigate } from 'react-router'
import { useSelector } from "react-redux";
import "./style.css";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  Input,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
const MySwal = withReactContent(Swal);
const BASE_URL=process.env.REACT_APP_BASE_URL;
// const MySwal =withReactContent(Swal)


const Register=()=> {
const navigate=useNavigate();
const [name,setName]=useState('')
const [email,setEmail]=useState('')
const [password,setPassword]=useState('')
const [message, setMessage] = useState("");
const state = useSelector((state) => {
  return {
    token: state.signIn.token,
  };
});


const signUp =async()=>{
    try{
      setMessage("")
    const result = await axios.post(`${BASE_URL}/singup`,{
        name:name,
        email:email,
        password:password,
        // role:process.env.REACT_APP_USER_ROLE
    });
    try{
      Swal.fire({
        position: 'Register successfuly',
        icon: 'success',
        title: 'Login success',
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/active")
    } catch{
      setMessage(result.data.message)
      MySwal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email Already Registed',
        confirmButtonColor: 'black',
      });
    }
    
    console.log(result.data);
    console.log("hj");
}catch(err){

}
};


    return (
     
      <ChakraProvider theme={theme}>
        <Box
        borderRadius="3px"
        border="solid silver"
        textAlign="center"
        w="400px"
        mt="100px"
        textAlign="center"
        ml="450px"
        bg="#fffb"
        color="black"
      >
        <div>
        <VStack mt="4">
           <h1>Register</h1>
           {state.token ? (
        <h1>
          <div className="centerWrapper">
           
            <div className="homeSignupButtons">
              <button onClick={() => navigate("/")}>HOME</button>
            </div>
          </div>
        </h1>
      ) : (
        <main className="signupPanel">
          
          <div className="role">
            <PasswordChecklist 
              rules={[
                "minLength",
                "specialChar",
                "number",
                "capital",
                "lowercase",
              ]}
              minLength={6}
              value={password}
              onChange={(isValid) => {
                if (isValid) {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = false;
                } else {
                  const button = document.querySelector("#signupSubmitButton");
                  button.disabled = true;
                }
              }}
            />
            <Button id="loginButton" onClick={() => navigate("/login")}>
              or go to login
            </Button>
          </div>
          <div className="signupPanel__half signupHalf--second">
            <h2>Signup</h2>
            {message ? <div className="message">{message}</div> : ""}
           
           <Box
              className="signupInput"
              
         >   
              <Input
                type="text"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
             <Button id="signupSubmitButton"
                
                
                onClick={(e) => {
                  e.preventDefault();
                  signUp(e);
                }}>
                SingUp
              </Button>
             {/* <label>التسجيل ك</label>
               <input type="radio" id="under_13" defaultValue="under_13" name="user_age" /><label htmlFor="under_13" className="light">محامي</label><br />
               <input type="radio" id="over_13" defaultValue="over_13" name="user_age" /><label htmlFor="over_13" className="light">مستخدم</label> */}
            
              </Box>
            
          </div>
        </main>
      )}
      </VStack>
        </div>
        
        </Box>
        </ChakraProvider>
           )
          }
      
      // <div>
      // <meta charSet="utf-8" />
      // <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      // <title>Sign Up Form</title>
      // <link rel="stylesheet" href="https://codepen.io/gymratpacks/pen/VKzBEp#0" />
      // <link href="https://fonts.googleapis.com/css?family=Nunito:400,300" rel="stylesheet" type="text/css" />
      // <link rel="stylesheet" href="css/main.css" />
      // <div className="row">
      //   <div className="col-md-12">
      //     <form action="index.html" method="post">
      //       <h1> تسجيل جديد </h1>
      //       <fieldset>
      //         <legend><span className="number"></span>Si</legend>
      //         <label htmlFor="name">Name:</label>
      //         <input type="text" id="name" name="user_name" />
      //         <label htmlFor="email">Email:</label>
      //         <input type="email" id="mail" name="user_email" />
      //         <label htmlFor="password">Password:</label>
      //         <input type="password" id="password" name="user_password" />
      //         <label>التسجيل ك</label>
      //         <input type="radio" id="under_13" defaultValue="under_13" name="user_age" /><label htmlFor="under_13" className="light">محامي</label><br />
      //         <input type="radio" id="over_13" defaultValue="over_13" name="user_age" /><label htmlFor="over_13" className="light">مستخدم</label>
      //       </fieldset>
            {/* <fieldset>  
              <legend><span className="number">2</span> Your Profile</legend>
              <label htmlFor="bio">Bio:</label>
              <textarea id="bio" name="user_bio" defaultValue={""} />
              <label htmlFor="job">Job Role:</label>
              <select id="job" name="user_job">
                <optgroup label="Web">
                  <option value="frontend_developer">Front-End Developer</option>
                  <option value="php_developer">PHP Developer</option>
                  <option value="python_developer">Python Developer</option>
                  <option value="rails_developer">Rails Developer</option>
                  <option value="web_designer">Web Designer</option>
                  <option value="wordpress_developer">Wordpress Developer</option>
                </optgroup>
                <optgroup label="Mobile">
                  <option value="android_developer">Android Developer</option>
                  <option value="ios_developer">IOS Developer</option>
                  <option value="mobile_designer">Mobile Designer</option>
                </optgroup>
                <optgroup label="Business">
                  <option value="business_owner">Business Owner</option>
                  <option value="freelancer">Freelancer</option>
                </optgroup>
              </select>
              <label>Interests:</label>
              <input type="checkbox" id="development" defaultValue="interest_development" name="user_interest" /><label className="light" htmlFor="development">Development</label><br />
              <input type="checkbox" id="design" defaultValue="interest_design" name="user_interest" /><label className="light" htmlFor="design">Design</label><br />
              <input type="checkbox" id="business" defaultValue="interest_business" name="user_interest" /><label className="light" htmlFor="business">Business</label>
            </fieldset> */}
    //         <button type="submit">Sign Up</button>
    //       </form>
    //     </div>
    //   </div>
    // </div>
 

export default Register



