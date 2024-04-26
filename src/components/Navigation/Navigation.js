import React from "react";
import './Navigation.css';



const Navigation =({onRouteChange, isSignedIn, route}) =>{


if(isSignedIn){
    return (
        
<nav className = "">
<ul className="logo">

<li className ="lo f3 link dim black pa3 pointer fw9"><a onClick={()=> onRouteChange('home')} > Coogs Fuel </a></li>

<ul className="logo push f3 link dim black underline pa3 pointer fw9 ">
<li className="push f3 link dim black underline pa3 pointer fw9"><a onClick={()=> onRouteChange('home')}  className="push"> Home </a></li>

<li className="push f3 link dim black underline pa3 pointer fw9"><a onClick={()=> onRouteChange('UpdateProfile')}  className="push"> Update Profile </a></li>
<li className="push f3 link dim black underline pa3 pointer fw9"><a onClick={()=> onRouteChange('QuoteHistory')} className="push"> Quote History </a></li>
    
<li className="push f3 link dim black underline pa3 pointer fw9"><a onClick={()=> onRouteChange('GetQuote')} className="push" > Get Fuel Quote </a></li>
<li className="push f3 link dim black underline pa3 pointer fw9"><a onClick={()=> onRouteChange('signout')}  className="push"> Sign Out </a></li>
</ul>
</ul>
</nav>


);
}
else if((!isSignedIn) && route==="ClientProfile"){
    return(
        <nav className = "">
    <ul className="logo">
    
    <li className ="lo f3 link dim black pa3 pointer fw9"><a>Coogs Fuel Portal </a></li>
    
    <ul className="logo push f3 link dim black underline pa3 pointer fw9 ">
    
    
    
        
    
    </ul>
    </ul>
    </nav>
    
    
    );
}
else{
return(
    <nav className = "">
<ul className="logo">

<li className ="lo f3 link dim black pa3 pointer fw9"><a>Coogs Fuel Portal </a></li>

<ul className="logo push f3 link dim black underline pa3 pointer fw9 ">



    
<li className="push f3 link dim black underline pa3 pointer fw9"><a onClick={()=> onRouteChange('signin')} className="push" > Login </a></li>
<li className="push f3 link dim black underline pa3 pointer fw9"><a onClick={()=> onRouteChange('register')}  className="push"> Register </a></li>
</ul>
</ul>
</nav>


);
}

}
export default Navigation;