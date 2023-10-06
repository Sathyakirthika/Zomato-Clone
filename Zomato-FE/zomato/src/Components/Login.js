import React, { useState } from 'react';
import  { useHistory } from 'react-router-dom';
import '../Style/Login.css';
import Signup from './Signup';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';


// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//     backgroundColor: 'bisque',
//     border: 'solid 1px darkmagenta',
//   },
// };



const Login = () => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });

  const [showSignup, setShowSignup] = useState(false); 
  const { user_email, user_password } = formData;
  const history=useHistory();

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:4000/api/user/login', {
        user_email,
        user_password,
      });

      console.log(res.data);
      if (res.data.status === 200) {
        // Set login success state to true
        history.push('/Home');
        window.location.reload();
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };
  const handleAccount=()=>{
  setShowSignup(true); 
 };
 const responseGoogle=(response)=>{
  console.log(response);
}
const responseFacebook=(response)=>{
  console.log(response);
}


  return (
    
  <div className='form row-2'>
    <h1 id="zomato">Zomato clone</h1>
    <div className='login col-md-6'>
       {/* <img src="./Assets/bg.jpg" alt='not found' height="500px" width="100%" className='bg'/> */}
      <h1 className='loginpage'>Login</h1>
      <form onSubmit={onSubmit}>
        <input
         className='email'
          type="email"
          placeholder="Email"
          name="user_email"
          value={user_email}
          onChange={onChange}
        />
         <br/>
        <br/>
        <input
        className='pwd'
          type="password"
          placeholder="Password"
          name="user_password"
          value={user_password}
          onChange={onChange}
        />
           <br/>
           <br/>
        <button type="submit" className='button'>Log In</button>
      </form>    
  </div>
 
    <br/>
   <div className="res">
           <div>
           <br/>
              <GoogleLogin
                clientId="634792135601-ns9058vbdjvsrlii8gu023llchrhk6ja.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,
          </div> 
          <br/>
          <FacebookLogin
    appId="622986982994095"
    autoLoad={true}
    fields="name,email,picture"
    textButton='continue with Facebook'
    icon="fa-facebook"
    callback={responseFacebook} />,
          
          </div>
         
       
          <div>
      <button type='newaccount' className='newacc' onClick={handleAccount}>Create an Account </button>
      {showSignup && <Signup />}
    </div> 
    </div>   
        



  );

}
export default Login;