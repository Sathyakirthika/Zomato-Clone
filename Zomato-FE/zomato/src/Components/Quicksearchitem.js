import React from 'react';
import { withRouter } from 'react-router-dom';

class Quicksearchitem extends React.Component{
  handleNavigate=(meal_type)=>{
    const locationId=sessionStorage.getItem('location_Id');
    console.log(locationId);
    if(locationId){
      this.props.history.push(`/filter?mealtype=${meal_type} &location_Id=${locationId}`);
    }else{

      this.props.history.push(`/filter?mealtype=${meal_type}`);
    }
   
    window.location.reload();

  }
    render(){

    
      const { name, content,image,meal_type} = this.props.quicksearchitemData;
      return (
          
            <div className="boxes"  onClick={()=>this.handleNavigate(meal_type)}>
              <div className="boxContent">
                <img
                  src={`./${image}`}  alt="idly"
                  className="qsImage"
                />
                
                <h4 className="itemHeading">{name}</h4>
                <p className="itemDescription">
                  {content}
                </p>
              </div>
            </div>
          
      );
    }
  }
        
export default withRouter(Quicksearchitem);
          