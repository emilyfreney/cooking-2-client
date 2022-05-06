import React, { useState } from 'react'
import Axios from 'axios'
//import Axios from 'axios';
function LoginForm({ Login, error, CreateUser }) {

    const [usernameReg, setUsernameReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [premiumReg, setPremium] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginStatus, setLoginStatus] = useState("");
    
    const submitHandler = e => {
        e.preventDefault();

       // Login(details);
    } 



    
    const createAccount = () => {
        // fetch(('http://localhost:8080/api/users', {
     
        //     // Adding method type
        //     method: "POST",
             
        //     // Adding body or contents to send
        //     body: {
        //         username: usernameReg,
        //         password: passwordReg,
        //         premium: premiumReg,
        //     },
             
        //     // Adding headers to the request
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // }))
        // .then((response)=> {
        //         console.log(usernameReg);
        //         console.log(response);

        // });
        
        Axios.post("http://localhost:8080/api/users", {
            username: usernameReg,
            password: passwordReg,
            premium: premiumReg,
        }).then((response)=> {
            console.log(response);
        }).catch(function (error) {
            console.log(JSON.stringify(error))
          });
        
    };

    const logInAccount = () => {
        // THIS THROWS ERROR FOR SOME REASON?
        // fetch('http://http://localhost:8080/api/login', {
     
        //     // Adding method type
        //     method: "POST",
             
        //     // Adding body or contents to send
        //     body: JSON.stringify({
        //         username: username,
        //         password: password,
        //     }),
             
        //     // Adding headers to the request
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     }
        // }).then((response)=>{
        //     console.log(response);
        // });
        
        Axios.post("http://localhost:8080/api/login", {
            username: username, 
            password: password,
        }).then((response) => {
            console.log(response.data);
            if (response.data.message) {
                setLoginStatus(response.data.message);
            } else {
                setLoginStatus(response.data[0].username);
            }
        });
    };

    return (
        <form onSubmit={submitHandler}>
            <div className="form-inner">
                <h2>Create an Account</h2>
                {(error != "") ? ( <div className="error">{error}</div> ) : ""}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" email="email" id="email" onChange={(e) => setUsernameReg(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" email="password" id="password" onChange={(e) => setPasswordReg(e.target.value)}/>
                </div>
                <input type="checkbox" value="premium" onChange={(e) => setPremium(true)}/>
                <input type="button" onClick={createAccount} value="CREATE ACCOUNT" />
               <h2> Login </h2> 
               {(error != "") ? ( <div className="error">{error}</div> ) : ""}
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" email="email" id="email" onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input type="password" email="password" id="password1" onChange={(e) => setPassword(e.target.value)}/>
                </div>
                <input type="submit" onClick={logInAccount} value="LOGIN" />

            </div>
            <h1>{loginStatus}</h1>
        </form>
    )
}

export default LoginForm;