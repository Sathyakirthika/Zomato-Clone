import React from "react";
import axios from "axios";
import { withRouter } from 'react-router-dom';


class Wallpaper extends React.Component{
    constructor(){
        super();
        this.state={
          restaurant:[],
         
            inputText: '',
            suggestions:[]
        }
    }

    handleLocation=(event)=>{
        console.log(event.target.value);
        const locationId=event.target.value;
        sessionStorage.setItem('location_Id',locationId)
  axios({
    method:'GET',
    url:`http://localhost:4000/api/restaurants/restaurantlocation/${locationId}`,
    headers:{'Content-Type':'application/json'}
  })
  .then(response =>{
    console.log(response.data.data.restaurant[0].name);
    this.setState({restaurant:response.data.data.restaurant})
  })
  .catch(err=>console.log(err));


    }
    handleSearch=(even)=>{
        let inputText=even.target.value;
        const {restaurant} =this.state;
        console.log(restaurant);

        let suggestions= restaurant?.filter(item=>item.name.toLowerCase().includes(inputText.toLowerCase()));
        this.setState({suggestions,inputText});
    }
       showSuggestion=()=>{
        const{ suggestions,inputText}=this.state;
      
        

        if(suggestions?.length == 0 && inputText == undefined){
            return null;
        }
        if(suggestions?.length > 0 && inputText == ''){
            return null;
        }

        if(suggestions?.length == 0 && inputText ){
            return <ul>
                <li className="noSearch">No search results found</li>
            </ul>;
        } 
        return(
            <ul className="noSearch">
                {
                  suggestions?.map((item,index) => (<li key={index} onClick={()=>this.selectinggetRestaurant(item)}>{`${item.name}-  ${item.locality},${item.city}`}</li>))
                }
            </ul>
        );
       }
       selectinggetRestaurant = (resObj) => {
        this.props.history.push(`/details?restaurant=${resObj._id}`)
        window.location.reload()
      }
    render(){
        const {  locationsData }= this.props;
    return(
        <div>
<img src="./Assets/backgroundimage.jpg" alt="not found" width="100%" height="450px"className="homeImage" />

<div className="topSection">
          <div className="logo">Zomato</div>
          <div className="headerText">
            Find the Restuarants and cafe
            
          </div>

    <div className="searchOptions">
            <span>
              <select className="locationBox" onChange={e => this.handleLocation(e)} title="">
                <option>Select City</option>
                {locationsData.map((item, i) => {
                  console.log(item);
                  return <option key={i} value={item.location_id}>
                    {`${item.name}, ${item.city}`}
                  </option>

                })}
              </select>
            </span>
            <span className="searchBox"></span>
            <i className="bi bi-search searchIcon"></i>
            <input
              type="text"
              className="searchInput"
              placeholder="Search for Restuarants"
              onChange={this.handleSearch}
            />
            {this.showSuggestion()}

</div>
</div>
</div>
      
    )
    }
}
export default withRouter(Wallpaper);