import React from 'react';
import '../Style/Header.css';
import GoogleLogin from 'react-google-login';
// import { GoogleLogin,GoogleOAuthProvider  } from '@react-oauth/google';
import FacebookLogin from 'react-facebook-login';



import  Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'bisque',
    border: 'solid 1px darkmagenta',
  },
};


class Header extends React.Component{
  constructor() {
    super();
    this.state={
      backgroundColor:'',
      display:'none',
      loginModalIsOpen:false,
      signupModalIsOpen:false,
      isLoggedIn:false,
      loggedInUser:undefined
    }
  }

  
  //  this.setState({ isLoggedIn:true,loggedInUser:response.name,loginModalIsOpen:false})
  //  (response.profileObj.name)
  // }
  componentDidMount(){
    const path=this.props.history.location.pathname;
    this.setAttributes(path);
  }
  setAttributes=(path)=> {
    let bg,display;
    if( path ==='/'){
      bg='black';
      display='none';
    }else{
      bg='red';
      display='inline-block';

    }
    this.setState({backgroundColor:bg,display:display});
  }
 
  responseGoogle=(response)=>{
    console.log(response);
  }
     

   handleLogin1=()=>{
    this.setState({loginModalIsOpen:true,"Cross-Origin-Opener-Policy":"unsafe-none"})
 
   }
   handleLogout = () => {
    this.setState({ loginModalIsOpen: false, loggedInUser: undefined })

  }
   handleCancel=()=>{
    this.setState({loginModalIsOpen:false});
   }
  //  handle=()=>{
     
  //      this.setState({ isLoggedIn:false,loggedInUser:undefined});
  // };loggedInUser,isLoggedIn
   responseFacebook = (response) => {
    console.log(response);
  }
  handleaccount=()=>{
    this.setState({signupModalIsOpen:true});
  }
  handlecancel=()=>{
    this.setState({signupModalIsOpen:false});
  }
    render(){
      const{ backgroundColor,display,signupModalIsOpen,loginModalIsOpen,isLoggedIn,loggedInUser}=this.state;
         return(

           <div   style={{backgroundColor:backgroundColor}}>
            
                <div className="top">
         <span className="logo1" style={{display: display}}>e</span>
         {  !isLoggedIn ?  
               <span className='create'>
               <button className='login1' onClick={this.handleLogin1}>Login</button>
               <button  className='account'onClick={this.handleaccount}>Create an account</button>
               </span> 
                : <span className='create'>
               <button className='login1'> {loggedInUser}</button>
               <button  className='account' onClick={this.handleLogout}>Logout</button>
               </span>} 
             </div>
             <Modal
                 isOpen={loginModalIsOpen}
                 style={customStyles}
                 ariaHideApp={false}
               
              >
                <div>                            
          <h2>Login</h2>
          <input type="text" placeholder='Email'/>
          <br/>
          <input type="text" placeholder='Password'/>
          <div>
            <button>Login</button>
            <button onClick={this.handleCancel}>Cancel</button>
          </div>
        </div>
    <div>
    {/* <GoogleOAuthProvider 
    clientId="463684141857-sugijp3bdaoqm9piug1nc1pfi1opem89.apps.googleusercontent.com"
    text="continue with google"
    >
      
      </GoogleOAuthProvider> */}
              {/* <GoogleOAuthProvider clientId='634792135601-ns9058vbdjvsrlii8gu023llchrhk6ja.apps.googleusercontent.com'
>
                      <GoogleLogin
          text='continue with Google'
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={(err) => {
    console.log(err);
  }}
  />
  </GoogleOAuthProvider> */}

   
            <GoogleLogin
                clientId="634792135601-ns9058vbdjvsrlii8gu023llchrhk6ja.apps.googleusercontent.com"
                buttonText="Continue with Google"
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy={'single_host_origin'}
            />,
          </div>
          <FacebookLogin
    appId="622986982994095"
    autoLoad={true}
    fields="name,email,picture"
    textButton='continue with Facebook'
    icon="fa-facebook"
    callback={this.responseFacebook} />,
    
          </Modal>
          <Modal
          isOpen={signupModalIsOpen}
          style={customStyles}
        >
          <div>
            <h2>Sign-Up</h2>
            <input type="text" placeholder="First name" />
            <br />
            <input type="text" placeholder="Last name" />
            <br />
            <input type="text" placeholder="Email" />
            <br />
            <input type="password" placeholder="password" />
            <br />
            <input type="password" placeholder="Re-Enter Password" />
            <div>
              <button>Sign-up</button>
              <button onClick={this.handlecancel}>cancel</button>
            </div>
          </div>
        
         
        </Modal>
          </div>


       
          ) 

    }
}
export default Header;
    