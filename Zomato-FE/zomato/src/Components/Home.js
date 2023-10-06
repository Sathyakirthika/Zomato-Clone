import React from 'react';
import axios from 'axios';
import '../Style/Style.css';

import Wallpaper from './Wallpaper';

import Quicksearch from './Quicksearch';



class Home extends React.Component{
    constructor(){
        super();
        this.state={
            events:[],
            mealtype:[]
        }
    }
    componentDidMount(){
        sessionStorage.clear();
        axios({
            method:'GET',
            url:`http://localhost:4000/api/location/getLocation`,
            headers:{'content-Type':'application/json'}
        })
        .then(response=>{

            this.setState({ events:response.data.data})
        })
        .catch(err => console.log(err));
        axios({
            method:'GET',
            url:`http://localhost:4000/api/mealtype/getAllMealTypes`,
            headers:{'content-Type':'application/json'}
        })
        .then(response=>{

            this.setState({ mealtype:response.data.data})
        })
        .catch(err => console.log(err))
    }
    render(){
        const { events,mealtype}= this.state;
         return(
          
    <div>
               <Wallpaper locationsData= { events}/>
               <Quicksearch quicksearchData={mealtype}/>
         </div>
       
    )}
}
export default Home;