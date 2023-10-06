import React from 'react';

import {Route,BrowserRouter }from  'react-router-dom';

import Home from './Home';
import Filter from './Filter';
import Details from './Details';
// import Header from './Header';
import Login from './Login';
import Signup from './Signup';
function Router(){
   
    return(
        <BrowserRouter>
        {/* <Route path='*' component={Header}/> */}
        <Route exact path='/' component={Login}/>
        <Route path='/Signup' component={Signup}/>
         <Route  path='/Home' component={Home}/>
        <Route path='/Details' component={Details}/>      
        <Route path='/Filter' component={Filter}/>
       

        </BrowserRouter>
    )
}
export default Router;