import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank  from './components/Rank/Rank';
import Signin  from './components/Signin/Signin';
import Register  from './components/Register/Register';
import './App.css';
import ClientProfile  from './components/ClientProfile/ClientProfile';
import GetQuote  from './components/GetQuote/GetQuote';
import QuoteHistory  from './components/QuoteHistory/QuoteHistory';
import UpdateProfile from './components/UpdateProfile/UpdateProfile';


class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      
      
      user: {
        id: 1,
        name: 'nn',
        email: '',
        entries: 0,
        joined: '',
        fullname:'',
        address1:'748 cal city fornia',
        address2:'',
        city:'',
        province:'',
        zipcode:''

      },
      quoteHistory: {
        clientName: 'Jon Doe',
        gallonsRequested: 999,
        deliveryAddress: '789 St.',
        deliveryDate: '20-10-4024',
        pricePergallon:999,
        amountDue: 999

      }
    }
  }

  /*
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      fullname: data.fullname,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      province: data.province,
      zipcode: data.zipcode
    }})
  }
  
  */
  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
      fullname: data.fullname,
      address1: data.address1,
      address2: data.address2,
      city: data.city,
      province: data.province,
      zipcode: data.zipcode
    }}, () => {
      // This code will run immediately after the state has been updated
      console.log('User state has been updated:', this.state.user);
    });
  }
  loadQuote = (data) =>{
    this.setState({quoteHistory: {
      clientName: data.clientName,
        gallonsRequested: data.gallonsRequested,
        deliveryAddress: data.deliveryAddress,
        deliveryDate: data.deliveryDate,
        pricePergallon:data.pricePergallon,
        amountDue: data.amountDue
    }}, () => {
      // This code will run immediately after the state has been updated
      console.log('User state has been updated:', this.state.quoteHistory);
    });
  }
  



  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }
 
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    }
     else if (route === 'home') {
      this.setState({isSignedIn: true})
    }else if (route === 'ClientProfile') {
      this.setState({isSignedIn: true})
    }

    this.setState({route: route});
  }

  render(){
   const  {isSignedIn, route, box} =this.state;
  return (
    <div className='App'>
     


     <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
     <div>
      
      {console.log("Add1 prop in App.js:",
      this.state.user.id,
      this.state.user.name,
      this.state.user.email,
      this.state.user.entries,
      this.state.user.fullname,
       this.state.user.address1,
       this.state.user.address2,
       this.state.user.city,
       this.state.user.zipcode,
       this.state.user.joined,
       this.state.user.province
       )}
    </div>
     {this.state.route === 'home'
     ? <div>
      
    <Logo />
      <Rank name={this.state.user.name}
               entries={this.state.user.entries}/>
      <ImageLinkForm name={this.state.user.name} onInputChange={this.onInputChange}  />
     
     
      </div>

    :(
      this.state.route ==='signin'
      ? <Signin  loadUser={this.loadUser}onRouteChange={this.onRouteChange}/> 
      :this.state.route ==='signout'
       ?<Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       :this.state.route ==='ClientProfile'
       ?<ClientProfile id={this.state.user.id} name={this.state.user.name} add1={this.state.user.address1} loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
       :this.state.route ==='GetQuote'
       ?<GetQuote  id={this.state.user.id} namefull={this.state.user.fullname}  ad1={this.state.user.address1} onRouteChange={this.onRouteChange}/>
       :this.state.route ==='QuoteHistory'
       ?<QuoteHistory
       clientName={this.state.quoteHistory.clientName}
       gallonsRequested={this.state.quoteHistory.gallonsRequested}
       deliveryAddress={this.state.quoteHistory.deliveryAddress}
       deliveryDate={this.state.quoteHistory. deliveryDate}
       pricePergallon={this.state.quoteHistory.pricePergallon}
       amountDue={this.state.quoteHistory.amountDue}

       onRouteChange={this.onRouteChange}/>
       :this.state.route ==='UpdateProfile'
       ?<UpdateProfile
        namefull={this.state.user.fullname}
        ad1={this.state.user.address1}
        ad2={this.state.user.address2}
        zip={this.state.user.zipcode}
        location={this.state.user.province}
        metro={this.state.user.city}
        id={this.state.user.id}
        

        loadUser={this.loadUser}
        onRouteChange={this.onRouteChange}
        
        />


      : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
    )
    



  }
    </div>
  );
  }
}

export default App;
