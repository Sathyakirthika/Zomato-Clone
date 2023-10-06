/* eslint-disable array-callback-return */
import React from 'react';
import queryString from 'query-string';
import axios from "axios";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import '../Style/Details.css';
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
      width:'500px'
    },
  };

class Details extends React.Component{
    constructor(){
        super();
        this.state={
           restaurant:{},
           galleryModelIsOpen:false,
           resId:undefined,
           mealitems:[],
           formModelIsOpen:false,
           menuItemsModelIsOpen:false,
           subTotal : 0,
            userName : undefined,
            userMail : undefined,
            userContact : undefined,
            userAddress : undefined
        }
    }
    componentDidMount(){
        const qs= queryString.parse(this.props.location.search);
        const {restaurant}=qs;
        console.log("data is", qs)
    
       
    axios({
        method:'GET',

        url:`http://localhost:4000/api/restaurants/getRestaurants/${restaurant}`,

        headers:{'Content-Type':'application/json'}
      })
      .then(response =>{
        //  console.log(response.data.data.restaurant[0].name);
        this.setState({restaurant:response.data.restaurant,resId:restaurant});
       console.log(response);
      
      })
      .catch(err=>console.log(err));
 
    }

    // handleLogin1=()=>{
    //     this.setState({galleryModelIsOpen:true})
    //    }
    //    handleCancel=()=>{
    //     this.setState({galleryModelIsOpen:false})
    //    }
       handleOrder=(resId,state, value)=>{
        if (state === "menuItemsModelIsOpen" && value === true){ 
        axios({
          method:'GET',
  
          url:`http://localhost:4000/api/restaurants/getRestaurants/${resId}`,
  
          headers:{'Content-Type':'application/json'}
        })
        .then(response =>{
          //  console.log(response.data.data.restaurant[0]);
          this.setState({mealitems:response.data.mealitems});
         console.log(response);
        
        })
        .catch(err=>console.log(err));
      }
      this.setState({ [state]: value });
    }
    handleModel = (state, value) => {
      const {resId} = this.state;
      if (state === "menuItemsModelIsOpen" && value === true){
          axios({
              method: 'GET',
              url:`http://localhost:4000/api/restaurants/getRestaurants/${resId}`,
  
              headers:{'Content-Type':'application/json'}
            })
            .then(response =>{
               console.log(response.data.restaurant);
              this.setState({restaurant:response.data.restaurant});
            //  console.log(response);
            
            })
            .catch(err=>console.log(err));
          }
          this.setState({ [state]: value });
        }
        addItems = (index, operationType) => {
          let total = 0;
          const items = [...this.state.mealitems];
          console.log(items)
          const item = items[index];
  
          if (operationType === 'add'){
              item.qty += 1;
          }
          else {
              item.qty -= 1;
          }
          items[index] = item;
         
          items.map((item)=>{
              total += item.qty * item.price.price;
          })
          this.setState({mealitems: items,subTotal: total});
      }
      
    handleChange = (event , state) => {
      this.setState ({[state] : event.target.value})
  }

  handleFormDataChange = (event,state) => {
      this.setState({[state] : event.target.value});
  }

  isDate = (val) => {
      return Object.prototype.toString.call(val) === '[object Date]'
  }

  isObj = (val) => {
      return typeof val === 'object'
  }

  stringifyValue = (val) => {
      if (this.isObj(val)&&!this.isDate(val)) {
          return JSON.stringify(val)
      }else {
          return val
      }
  }

  buildForm = ({action, params}) => {
      const form = document.createElement('form')
      form.setAttribute('method', 'post')
      form.setAttribute('action', action)

      Object.keys(params).forEach(key => {
          const input = document.createElement('input')
          input.setAttribute('type', 'hidden')
          input.setAttribute('name', key)
          input.setAttribute('value', this.stringifyValue(params[key]))
          form.appendChild(input)
      })
      return form
  }

  post = (details) => {
      const form = this.buildForm(details)
      document.body.appendChild(form)
      form.submit()
      form.remove()
  }
  getData = async (data) => {
    try {
      const response = await fetch('http://localhost:4000/api/payment', {
        method: "POST", headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (err) {
      return console.log(err);
    }
}

handlePayment = () => {
    const {subtotal, userMail} = this.state;

    if (!userMail) {
        alert('Please fill this fields and then proceed')
    }
    else {
    const paymentObj = {
        amount : subtotal,
        email : userMail

    };

    this.getData(paymentObj).then (response => {
        var information = {
            action : "https://business.paytm.com/docs/miniapps/integration-steps",
            params : response
        }
        this.post(information)
    })
}
}

    render(){
        const {restaurant,galleryModelIsOpen,menuItemsModelIsOpen, formModelIsOpen, subTotal} = this.state 
         return(
          
    <div style={{padding : '10px'}}>

                <div>
                <img src={`./${restaurant.image}`}  alt = "sorry for inconvenience" className="detailimg" />
                <button className="button" onClick={() => this.handleModel('galleryModelIsOpen', true)}>Click to see image Gallery</button>
                </div>

                <div className="heading">{restaurant.name}</div>
                <button className="btn-order" onClick={()=>this.handleOrder(restaurant._id, 'menuItemsModelIsOpen', true)}>Place online order</button>

                <div className="tabs">
                    <div className="tab">
                        <input type="radio" id="tab-1" name="tab-group-1" ></input>
                        <label for="tab-1">overview</label>

                        <div className="content">
                            <div className="about">{restaurant.rating_text}</div>
                            <div className="head">Cuisine</div>
                            <div className="value">{restaurant && restaurant.cuisine && restaurant.cuisine.map((item) => 
                            {
                                return `${item.name}, `
                            })}
                            </div>
                            <div className="head">{restaurant.aggregate_rating}</div>
                            <div className="value">{`/${restaurant.locality},${restaurant.city}`}</div>
                        </div>
                    </div>

                    <div className='tab'>
                        <input type="radio" id="tab-2" name="tab-group-1"/>
                        <label for="tab-2">Contact</label>

                        <div className="content">
                            <div className="head">phone Number</div>
                            <div className="value">{restaurant.contact_number}</div>
                            <div className="head">{restaurant.name}</div>
                            <div className="value"> <p>{restaurant.locality}<br></br> {restaurant.city} 110 075</p></div>
                        </div>
                    </div>
                </div>
          
                  <Modal
                  isOpen={galleryModelIsOpen}
                  style={customStyles}
                  ><div>
                        <div class = "glyphicon glyphicon-remove" style={{float:'right', marginBottom:'10px'}} onClick={()=>this.handleModel('galleryModelIsOpen', false)}></div>
                        <Carousel showThumbs = {false} showIndicators = {false}>
                            {restaurant && restaurant.thumb && restaurant.thumb.map((item) => {
                            return <div>
                                <img src = {`../${item}`} alt="not found"height = "500px" style={{width :'70%',height :'50%'}} ></img>
                                </div>
                                })}
                        </Carousel>
                      </div>
                    </Modal>
                  
                <Modal
                    isOpen = {menuItemsModelIsOpen} 
                    style={customStyles}

                >
                    <div>
                    <div class = "glyphicon glyphicon-remove" style={{float:'right', marginBottom:'10px'}} onClick={()=>this.handleModel('menuItemsModelIsOpen', false)}></div>
                        <div>
                            <h3 className="restaurant-name">{restaurant.name}</h3>
                            <h3 className="item-total">{subTotal}</h3>
                            <button className="btn btn-danger order-button" 
                            onClick={() => { this.handleModel('menuItemsModelIsOpen', true);
                            this.handleModel('formModelIsOpen', true);
                        }}
                        >Pay Now</button>
                        {this.state.mealitems.map((item, index) => {
console.log("item is", item);

return (
  <div key={index} style={{ width: '44rem', borderBottom: '2px solid #db8d8' }}>
      <div className="card" style={{ width: '43rem', margin: 'auto' }}>
          <div className="row" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
              <div className="col-xs-9 col-sm-9 col-md-9" style={{ paddingLeft: '10px', paddingBottom: '10px' }}>
                  <span className="card-body">
                      <h5 className="item-name">{item.meal_name.name}</h5>
                      <h5 className="item-price">&#8377;{item.price.price}</h5>
                      <p className="item-descp">{item.description.des}</p>
                  </span>
              </div>
              <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                  <img className="card-img-center title-img" src={`../${item.meal_image.name}`} alt="not found" style={{
                      height: '75px',
                      width: '75px',
                      borderRadius: '20px',
                      marginTop: '12px',
                      marginLeft: '3px',
                  }} />
                  {item.qty === 0 ? (
                      <div>
                          <button className="add-button" onClick={() => this.addItems(index, 'add')}> Add</button>
                      </div>
                  ) : (
                      <div className="add-number">
                          <button onClick={() => this.addItems(index, 'subtract')}>-</button>
                          <span style={{ backgroundColor: 'white' }}>{item.qty}</span>
                          <button onClick={() => this.addItems(index, 'add')}>+</button>
                      </div>
                  )}
              </div>
          </div>
      </div>
  </div>
);
})}
                  </div>
                  
                <Modal
                    isOpen = {formModelIsOpen} 
                    style={customStyles}
                >

                    <div class = "glyphicon glyphicon-remove" style={{float:'right', marginBottom:'10px'}} onClick={()=>this.handleModel('formModelIsOpen', )}></div>
                    <h2>{restaurant.name}</h2>

                    <div>
                        <label>Name : </label>
                        <input class = 'form-control' style={{width : '400'}} type = "text" placeholder="Enter your Name" onChange={(event) => this.handleFormDataChange(event, 'userName')}></input>
                    </div>

                    <div>
                        <label>Email : </label>
                        <input class = 'form-control' style={{width : '400'}} type = "text" placeholder="Enter your Email" onChange={(event) => this.handleFormDataChange(event, 'userMail')}></input>
                    </div>
                    <div>
                        <label>Address : </label>
                        <input class = 'form-control' style={{width : '400'}} type = "text" placeholder="Enter your Address" onChange={(event) => this.handleFormDataChange(event, 'userAddress')}></input>
                    </div>
                    <div>
                        <label>Number : </label>
                        <input class = 'form-control' style={{width : '400'}} type = "tel" placeholder="Enter your Number" onChange={(event) => this.handleFormDataChange(event, 'userContact')}></input>
                    </div>

                    <button class = "btn btn-success" style={{float : 'right', marginTop : '20px'}} onClick={this.handlePayment}>Proceed</button>
                </Modal>
              </div>
          </Modal>
          </div>


        ) 
    }
}


export default Details;