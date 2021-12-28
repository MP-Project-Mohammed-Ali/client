import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { useState ,useEffect} from 'react'
import PasswordChecklist from "react-password-checklist";
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";
import withReactContent from "sweetalert2-react-content"

const BASE_URL=process.env.REACT_APP_BASE_URL;
const MySwal =withReactContent(Swal)
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
    if(result.status===201){
      MySwal.fire({
        position:"center",
        title:"confirmation email"
      })
      navigate("/login")
    } else{
      setMessage(result.data.message)
    }
    
    console.log(result.data);
    console.log("hj");
}catch(err){

}
};


    return (
        <div>
           <h1>Register</h1>
           {state.token ? (
        <h1>
          <div className="centerWrapper">
            <div className="homeSignupTitle">
              <p>You already loggedin, you don't need to signup</p>
            </div>
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
            <button id="loginButton" onClick={() => navigate("/login")}>
              or go to login
            </button>
          </div>
          <div className="signupPanel__half signupHalf--second">
            <h2>Signup</h2>
            {message ? <div className="message">{message}</div> : ""}
            <form
              className="signupInput"
              onSubmit={(e) => {
                e.preventDefault();
                signUp(e);
              }}
            >
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                id="signupSubmitButton"
                type="submit"
                value="Submit"
                disabled
              />
              
            </form>
          </div>
        </main>
      )}
        </div>
    )
}

export default Register
