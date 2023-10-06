import React from 'react';
import '../Style/Filter.css';
import queryString from 'query-string';
import axios from 'axios';


class Filter extends React.Component{
    constructor(){
        super();
        this.state={
        
           mealtypeStore:[],
           events:[],
           restaurants:[],
          
           locations:[],
           cuisine_id: [],
           lcost: undefined,
           hcost: undefined,
           sort: 1,
           page:1,
           pageCount:undefined
           
        }
      
    }

    componentDidMount(){
        const qs=queryString.parse(this.props.location.search);
        const {mealtype,location_Id}=qs;
              console.log(mealtype);
        const filterObj={
          mealtype_id:Number(mealtype),
            locationId:Number(location_Id),
           
        };
        
        axios({
          
                method:'POST',
                url:`http://localhost:4000/api/restaurants/filter`,
                headers:{'content-Type':'application/json'},
                data : filterObj
            })
            .then(response=>{
            
                this.setState({ mealtypeStore:response.data.restaurants,mealtype,pageCount:response.data.pageCount})
                console.log(response)
            })
            .catch(err => console.log(err))
            axios({
              method:'GET',
              url:`http://localhost:4000/api/location/getLocation`,
              headers:{'content-Type':'application/json'},
             
          })
          .then(response=>{
  
              this.setState({ events:response.data.data})
          })
          .catch(err => console.log(err));
            }
    handleLocationChange=(eve)=>{
        const events =eve.target.value;
        
        const{mealtype, cuisine, lcost, hcost, sort, page}=this.state;

        const filterObj = {
          mealtype_id:Number(mealtype),
           cuisine:cuisine.length === 0?undefined:cuisine,
        events,
          lcost,
          hcost,
          sort,
          page
        }
        axios({
          
          method:'POST',
          url:`http://localhost:4000/api/restaurants/filter`,
          headers:{'content-Type':'application/json'},
          data : filterObj
      })
      .then(response=>{
       
          this.setState({ mealtypeStore:response.data.restaurants,pageCount:response.data.pageCount})
          console.log(response)
      })
      .catch(err => console.log(err))

    }
    // handleCuisineChange = (cuisineId) => {
    //   console.log('Clicked on cuisineId:', cuisineId);
    //   const{mealtype,lcost, hcost, sort,page}=this.state;
     
    //   // const cuisine = [...cuisine];
    //   let cuisine=this.state.cuisine.slice();

    //   const index = cuisine.indexOf(cuisineId)
    //   console.log(index);
    //   if (index === -1) {
    //     cuisine.push(cuisineId);
    //     console.log("name is",cuisine);
    //   }
    //   else {
    //     cuisine.splice(index, 1)
    //     // cuisine = cuisine.filter(id => id !== cuisineId);
    //   }

    //   const filterObj = {
    //     mealtype_id :Number(mealtype),
    //     cuisine:cuisine.length >0 ?  cuisine:undefined ,
       
    //     lcost,
    //     hcost,
    //     sort,
    //     page
      
    //   }; 
    //   console.log("data is",cuisine)  ;
      
    //         axios({
    //       method: 'POST',
    //       url: 'http://localhost:4000/api/restaurants/filter',
    //       headers: { 'Content-Type': 'application/json' },
    //       data: filterObj
    //     }).then(response => {
    //       console.log(response);
    //       this.setState({ mealtypeStore: response.data.restaurants,cuisine:cuisine,pageCount:response.data.pageCount})
    //       console.log(response);
         
    //     }).catch(err => console.log(err))
    //   }
    handleCuisineChange = async (value) => {
      let tempArray = this.state.cuisine_id.slice();
      if (tempArray.indexOf(value) === -1) {
          tempArray.push(value);
      } else {
          tempArray.splice(tempArray.indexOf(value), 1);
      }
      const{mealtype,lcost, hcost, sort,page}=this.state;
      const filterObj = {
            mealtype_id :Number(mealtype),
            cuisine_id:tempArray.length >0 ? tempArray:undefined ,
           
            lcost,
            hcost,
            sort,
            page
          
          }; 
          axios({
                  method: 'POST',
                  url: 'http://localhost:4000/api/restaurants/filter',
                  headers: { 'Content-Type': 'application/json' },
                  data: filterObj
                }).then(response => {
                  console.log(response);
                  this.setState({ mealtypeStore: response.data.restaurants,cuisine_id:tempArray,pageCount:response.data.pageCount})
                  console.log(response);
                 
                }).catch(err => console.log(err))
              }

    
       
      handleCostChange = (lcost, hcost) => {

       
    

        const{mealtype ,cuisine,sort,page}=this.state;

        const filterObj = {
          mealtype_id:Number(mealtype),
          cuisine:cuisine.length === 0?undefined:cuisine,  
          lcost,
          hcost,
          sort,
          page
          
        
        };  

       
    
        axios({
          method: 'POST',
          url: 'http://localhost:4000/api/restaurants/filter',
          headers: { 'Content-Type': 'application/json' },
          data: filterObj
        }).then(response => {
          this.setState({ mealtypeStore: response.data.restaurants,lcost,hcost,pageCount:response.data.pageCount })
         
        }).catch(err => console.log(err))
    
      }
      handleNavigate =(resId)=> {
      
        this.props.history.push(`/details?restaurant=${resId}`);
        window.location.reload();

      }
      handleSortChange =(sort) => {
        const{mealtype , cuisine, lcost, hcost,page}=this.state;

        const filterObj = {
          mealtype_id :Number(mealtype),
          cuisine:cuisine.length ===0?undefined:cuisine,
        
          lcost,
          hcost,
          sort,
          page
        
        };  
        axios({
          method: 'POST',
          url: 'http://localhost:4000/api/restaurants/filter',
          headers: { 'Content-Type': 'application/json' },
          data: filterObj
        }).then(response => {
          this.setState({ mealtypeStore: response.data.restaurants,sort,pageCount:response.data.pageCount })
        
        }).catch(err => console.log(err))
      } 

       
    
       
    render(){
        const{mealtypeStore,events,pageCount}=this.state;
        console.log(mealtypeStore);
         return(
 <div>
             
    <div className="container1">
        <div className="heading1">
            Breakfast places in Mumbai
        </div>
         <div className="row">
                <div className="col-3 col-sm-12 col-md-4 col-lg-3">
                <div className="filterPanel">
                    <div className="filterPanelHeading">
                        Filter/Sort
                    </div>
                    <div className="filterPanelSubHeading">
                        Select Location
                    </div>
                    <select  className="locationSelection" onChange={this.handleLocationChange}>
                        <option value="0" >Select Location</option>
                        {events.map((item, i) => {
                  console.log(item);
                  return <option key={i} value={item.location_id}>
                    {`${item.name}, ${item.city}`}
                  </option>

                })}
                    </select>
                    <div className="filterPanelSubHeading">
                        Cuisine
                    </div>
                    <input type="checkbox" className="cuisionOption" onChange={() => this.handleCuisineChange(1)} />
                        <label>North Indian</label>
                   
                    <br/>
                    <input type="checkbox" className="cuisionOption" onChange={() => this.handleCuisineChange(2)}/>
                        <label>South Indian</label>
                  
                    <br/>
                    <input type="checkbox" className="cuisionOption" onChange={() => this.handleCuisineChange(3)}/>
                        <label>Chinese</label>
                   
                    <br/>
                    <input type="checkbox" className="cuisionOption" onChange={() => this.handleCuisineChange(4)}/>
                        <label>Fast Food</label>
                 
                    <br/>
                    <input type="checkbox" className="cuisionOption" onChange={() => this.handleCuisineChange(5)}/>
                        <label>Street Food</label>
                   
                  
                    <div className="filterPanelSubHeading">
                        Cost for two
                    </div>
                    <input type="radio" className="cuisionOption" name="cost" onChange={() => this.handleCostChange(1,500)}/>
                    <label> Less than $500</label>
                  
                   <br/>
                    <input type="radio" className="cuisionOption" name="cost" onChange={() => this.handleCostChange(500,1000)}/>
                    <label> $500 to $1000</label>
                    
                   <br/>
                    <input type="radio" className="cuisionOption" name="cost" onChange={() => this.handleCostChange(1500,2000)}/>
                    <label> $1000 to 1500</label>
                    
                   <br/>
                    <input type="radio" className="cuisionOption" name="cost" onChange={() => this.handleCostChange(2000,5000)}/>
                    <label> $1500 to $2000</label>
               
                   <br/>
                    <input type="radio" className="cuisionOption" name="cost" onChange={() => this.handleCostChange(5000,10000)}/>
                    <label> 2000</label>
                    <br/>
                    <br/>
                    <br/>
                     <input type="radio" className="cuisionOption" name="price" onChange={() => this.handleSortChange(1)}/>
                     <label >Price low to high</label>
                    <br/>
                    
                     <input type="radio" className="cuisionOption" name="price" onChange={() => this.handleSortChange(-1)}/>
                     <label >Price high to low</label>
                    
                </div>
        </div>
        <div className="col-9 col-sm-12 col-md-8 col-lg-9">
            {mealtypeStore.length > 0 ? mealtypeStore?.map((ele,index) => {
              console.log(ele);
                return(
                    <div className="resultsPanel" key={index} onClick={()=>this.handleNavigate(ele._id)}>
                    <div className="row upperSection">
                        <div >         
                            <img src={`./${ele.image}`} alt="" className="resultsImage"/>
                        </div>
                        <div className="col-10">
                            <div className="resultsHeading">{ele.name}</div>
                            <div className="resultsSubHeading">{ele.locality}</div>
                            <div className="resultsAddress">{ele.city}</div>
                        </div>
                    </div>
                  
                    <div className="row lowerSection">
                        <div className="col-2">
                            <div className="resultsAddress">CUISINES:</div>
                            <div className="resultsAddress">COST FOR TWO:</div>
                        </div>
                        <div className="col-10">
                            <div className="resultsSubHeading">{ele.cuisine?.map((cuisineItem) => { return `${cuisineItem.name}`})}</div>
                            <div className="resultsSubHeading">${ele.min_price}</div>
                            <hr/>
                        </div>
                    </div>
                    </div>
                   
                )
            }):<div class="NoItem">No Records Found...</div>}
                
            </div>
           
           
            <br/>
            {mealtypeStore.length > 0 ?

            
            <div className="pagination">
                <div className="paginationButton">&laquo;</div>
                {pageCount.map(pageNo=>{
                  return <div>{pageNo}</div>
                })}
                
                <div className="paginationButton">&raquo;</div>
                
                
            </div>    : null    }   
        
    </div>
  </div>
</div>
    
)}
}


    
export default Filter;  