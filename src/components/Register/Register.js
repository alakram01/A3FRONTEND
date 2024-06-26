
import React from "react";
import Validation from "./RegisterValidation";






class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      errors: {}
    }
  }
  


  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }
  Problem = () => {
    // Implement canceling logic here
    alert('Error Registering. Choose a different email or restart');
  }

  onSubmitSignIn = (event) => {
    console.log(this.state);
    event.preventDefault();
    const errors = Validation(this.state); // Call Validation function with current state
    this.setState({ errors }); // Update errors state
    if (Object.values(errors).every(error => error === "")) { // Check if all errors are empty
      
      fetch('http://localhost:3000/register',{
        method: 'post',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password,
          name:this.state.name
        })  
      })
      .then(response => response.json())
      .then(user =>{
        if(user === 'Error logging in' || user ==='User not found in database'){
          this.Problem();
          
          this.props.onRouteChange('register');
        }
        else{
          console.log(user.length);
          console.log(user);
          this.props.loadUser(user)
          this.props.onRouteChange('ClientProfile');
          const {id,name,add1 } = this.props;
          console.log(id);
          console.log(name);
          console.log(add1);
        }
      })
      



    }
  }

  render() {
    const { errors } = this.state;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-washed-yellow">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 ba b--black input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
                {errors.name && <p className="error">{errors.name}</p>} {/* Display name error */}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 ba b--black input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                />
                {errors.email && <p className="error">{errors.email}</p>} {/* Display email error */}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 ba b--black input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                />
                {errors.password && <p className="error">{errors.password}</p>} {/* Display password error */}
              </div>
              
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;