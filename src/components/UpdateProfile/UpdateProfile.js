import React, { useState } from 'react';
import './UpPro.css';
import UpProfileValidation from './UpProValidations';
//import Toggle from './Toggle';
// const ImageLinkForm =({onInputChange, onButtonSubmit}) =>{
//const ClientProfile = ({ name, entries }) => {
  //code me
     
    class UpdateProfile extends React.Component {
        constructor(props) {
          super(props);
          this.state = {
            isToggleOn: false,
            fullname:'',
            address1:'',
            address2:'',
            city:'',
            zipcode:'',
            errors: {},
            states:[
                { id: 1, name: 'Alabama', abbreviation: 'AL' },
                { id: 2, name: 'Alaska', abbreviation: 'AK' },
                { id: 3, name: 'Arizona', abbreviation: 'AZ' },
                { id: 4, name: 'Arkansas', abbreviation: 'AR' },
                { id: 5, name: 'California', abbreviation: 'CA' },
                { id: 6, name: 'Colorado', abbreviation: 'CO' },
                { id: 7, name: 'Connecticut', abbreviation: 'CT' },
                { id: 8, name: 'Delaware', abbreviation: 'DE' },
                { id: 9, name: 'Florida', abbreviation: 'FL' },
                { id: 10, name: 'Georgia', abbreviation: 'GA' },
                { id: 11, name: 'Hawaii', abbreviation: 'HI' },
                { id: 12, name: 'Idaho', abbreviation: 'ID' },
                { id: 13, name: 'Illinois', abbreviation: 'IL' },
                { id: 14, name: 'Indiana', abbreviation: 'IN' },
                { id: 15, name: 'Iowa', abbreviation: 'IA' },
                { id: 16, name: 'Kansas', abbreviation: 'KS' },
                { id: 17, name: 'Kentucky', abbreviation: 'KY' },
                { id: 18, name: 'Louisiana', abbreviation: 'LA' },
                { id: 19, name: 'Maine', abbreviation: 'ME' },
                { id: 20, name: 'Maryland', abbreviation: 'MD' },
                { id: 21, name: 'Massachusetts', abbreviation: 'MA' },
                { id: 22, name: 'Michigan', abbreviation: 'MI' },
                { id: 23, name: 'Minnesota', abbreviation: 'MN' },
                { id: 24, name: 'Mississippi', abbreviation: 'MS' },
                { id: 25, name: 'Missouri', abbreviation: 'MO' },
                { id: 26, name: 'Montana', abbreviation: 'MT' },
                { id: 27, name: 'Nebraska', abbreviation: 'NE' },
                { id: 28, name: 'Nevada', abbreviation: 'NV' },
                { id: 29, name: 'New Hampshire', abbreviation: 'NH' },
                { id: 30, name: 'New Jersey', abbreviation: 'NJ' },
                { id: 31, name: 'New Mexico', abbreviation: 'NM' },
                { id: 32, name: 'New York', abbreviation: 'NY' },
                { id: 33, name: 'North Carolina', abbreviation: 'NC' },
                { id: 34, name: 'North Dakota', abbreviation: 'ND' },
                { id: 35, name: 'Ohio', abbreviation: 'OH' },
                { id: 36, name: 'Oklahoma', abbreviation: 'OK' },
                { id: 37, name: 'Oregon', abbreviation: 'OR' },
                { id: 38, name: 'Pennsylvania', abbreviation: 'PA' },
                { id: 39, name: 'Rhode Island', abbreviation: 'RI' },
                { id: 40, name: 'South Carolina', abbreviation: 'SC' },
                { id: 41, name: 'South Dakota', abbreviation: 'SD' },
                { id: 42, name: 'Tennessee', abbreviation: 'TN' },
                { id: 43, name: 'Texas', abbreviation: 'TX' },
                { id: 44, name: 'Utah', abbreviation: 'UT' },
                { id: 45, name: 'Vermont', abbreviation: 'VT' },
                { id: 46, name: 'Virginia', abbreviation: 'VA' },
                { id: 47, name: 'Washington', abbreviation: 'WA' },
                { id: 48, name: 'West Virginia', abbreviation: 'WV' },
                { id: 49, name: 'Wisconsin', abbreviation: 'WI' },
                { id: 50, name: 'Wyoming', abbreviation: 'WY' }
            ],
            selectedState:'',

            
          };
          this.handleClick = this.handleClick.bind(this);
          this.cancel = this.cancel.bind(this); 
        }
        handleClick = () => {
            this.setState(prevState => ({
              isToggleOn: !prevState.isToggleOn
            }), () => {
              // Perform any actions that rely on the updated state here
              // For example, you can log the updated state to the console
              console.log(this.state.isToggleOn);
            });
          }
        

   saveClient = () => {
    // Implement saving logic here
    alert('Information is updated!. You will be redirected to Home page');
  }

  cancel = () => {
    // Reset the form fields to their initial values
    this.setState({
        fullname: '',
        address1: '',
        address2: '',
        city: '',
        selectedState: '',
        zipcode: '',
        errors: {}
    }, () => {
        console.log('Form fields cleared');
    });
}
  Problem = () => {
    // Implement canceling logic here
    alert('User is not Registered.');
  }
  onSubmitSignIn = (event) => {
   // this.props.onRouteChange('home');
    const { id } = this.props;
    //console.log(add1);
   // console.log(id);
   
    event.preventDefault();
    const errors = UpProfileValidation(this.state); // Call Validation function with current state
    this.setState({ errors }); // Update errors state
    if (Object.values(errors).every(error => error === "")) { // Check if all errors are empty
      //console.log(this.state);
      fetch('http://localhost:3000/updateprofile',{
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            id:id,
          fullname: this.state.fullname,
          address1: this.state.address1,
          address2: this.state.address2,
          city: this.state.city,
          selectedState: this.state.selectedState,
          zipcode:this.state.zipcode,
        })  
      })
      .then(response => response.json())
      .then(data =>{
        if(data.id){
            console.log(data.length);
            console.log(data);
            this.props.loadUser(data)
            this.saveClient();
            this.props.onRouteChange('home');
          
        }
        else{
            this.Problem();
        }
      })
    }

  
} 
handleSaveAndRouteChange = (event) => {
   // this.saveClient();
   
    event.preventDefault();
    const errors = UpProfileValidation(this.state); // Call Validation function with current state
    this.setState({ errors }); // Update errors state
    if (Object.values(errors).every(error => error === "")) { // Check if all errors are empty
      this.props.onRouteChange('home');
    }
  }
  
  onAddress1Change = (event) => {
    this.setState({address1: event.target.value})
  }
  
  onAddress2Change = (event) => {
    this.setState({address2: event.target.value})
  }
  onFullNameChange = (event) => {
    this.setState({fullname: event.target.value})
  }
  onCityChange = (event) => {
    this.setState({city: event.target.value})
  }
  onZipCodeChange = (event) => {
    this.setState({zipcode: event.target.value})
  }
  onProvinceChange = (event) => {
    this.setState({selectedState: event.target.value})
  }


  render() {
    const { errors } = this.state;
    const { onRouteChange } = this.props;
    const {namefull,ad1,ad2,zip,location,metro} = this.props;
    return(
    <div>
      <header className="bg-dark text-white text-center py-4 ">
        <h1>Update Client Information</h1>
      </header>

      <div className="container mt-4 center " >
      
        <form id="clientForm " className=" bg-light-yellow">
        
          <label htmlFor="fullName">Full Name:</label>
          <input onChange={this.onFullNameChange} type="text" id="fullName" name="fullName" maxLength="50" placeholder ={namefull}  readOnly={this.state.isToggleOn? false : true} required />
          {errors.fullname && <p className="error">{errors.fullname}</p>}{" "}
                {/* Display email error */}    
          <label htmlFor="address1">Address 1:</label>
          <input onChange={this.onAddress1Change} type="text" id="address1" name="address1" maxLength="100" placeholder ={ad1}  readOnly={this.state.isToggleOn? false : true} required />
          {errors.address1 && <p className="error">{errors.address1}</p>}{" "}
                {/* Display email error */} 
          <label htmlFor="address2">Address 2:</label>
          <input onChange={this.onAddress2Change} type="text" id="address2" name="address2" maxLength="100" placeholder ={ad2}  readOnly={this.state.isToggleOn? false : true} />
          {errors.address2 && <p className="error">{errors.address2}</p>}{" "}
                {/* Display email error */} 
          <label htmlFor="city">City:</label>
          <input onChange={this.onCityChange} type="text" id="city" name="city" maxLength="100"placeholder ={metro}  readOnly={this.state.isToggleOn? false : true} required />
          {errors.city && <p className="error">{errors.city}</p>}{" "}
                {/* Display email error */} 
          <label htmlFor="state">Current State: {location}</label>
          <select id="state" name="state"  value= {this.state.isToggleOn? null:this.props.location}   disabled={!(this.state.isToggleOn)} onChange={(e) => this.setState({ selectedState: e.target.value }) } required >
          
              <option  value=""  disabled    >Select State</option>
              {this.state.states.map((state) => (
                <option readOnly={ true}  key={state.id} value={state.abbreviation}>
                  {state.abbreviation}
                </option>
                
              ))}
              
            
          </select>
          {errors.state && <p className="error">{errors.state}</p>}{" "}
                {/* Display email error */} 


          <label htmlFor="zipCode">Zip Code:</label>
          <input onChange={this.onZipCodeChange} type="text" id="zipCode" name="zipCode" pattern="[0-9]{5,9}" title="Enter at least 5 digits" placeholder ={zip}  readOnly={this.state.isToggleOn? false : true} required />
          {errors.zipcode && <p className="error">{errors.zipcode}</p>}{" "}
                {/* Display email error */} 
          <input
          disabled={this.state.isToggleOn ? false : true}
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Submit Changes"
              />
             
          
          <button type ="button" onClick={this.handleClick}  >
        {this.state.isToggleOn ? 'Read Mode'  : 'Edit Mode'}
      </button>   
        </form>
        
      </div>
      
    </div>
  );
}

}

export default UpdateProfile;