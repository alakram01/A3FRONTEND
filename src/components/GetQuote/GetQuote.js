import React from "react";
import GetQuoteValidation from "./GetQteValidations";
class GetQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallonsRequested: "",
      errors: {},
      deliveryDate: "",
      deliveryAddress: "", // Added state variable for delivery address
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  onSubmitSignIn = (event) => {
    event.preventDefault();
    const errors = GetQuoteValidation(this.state); // Call Validation function with current state
    this.setState({ errors }); // Update errors state
    if (Object.values(errors).every((error) => error === "")) {
      const { gallonsRequested, deliveryDate, deliveryAddress } = this.state;
      const { id, namefull, ad1 } = this.props;
      fetch("http://localhost:3000/GetQuote", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          clientName: namefull,
          gallonsRequested: gallonsRequested,
          deliveryDate: deliveryDate,
          deliveryAddress: ad1,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.props.onRouteChange("QuoteHistory");
        })
        .catch((error) => {
          console.error("Error fetching quote:", error);
        });
    }

    /*
    event.preventDefault();
    // Handle form submission logic here
    this.props.onRouteChange('home');
    */
  };

  render() {
    const { errors } = this.state;
    const { gallonsRequested, deliveryDate, deliveryAddress } = this.state;
    const { ad1 } = this.props;
    return (
      <div>
        <h1>GET A NEW QUOTE</h1>

        <div className="center">
          <form onSubmit={this.onSubmitForm}>
            <label htmlFor="gallonsRequested">Gallons Requested:</label>
            <input
              type="number"
              id="gallonsRequested"
              name="gallonsRequested"
              value={gallonsRequested}
              onChange={this.handleInputChange}
              required
            />
            {errors.gallonsRequested && (
              <p className="error">{errors.gallonsRequested}</p>
            )}{" "}
            {/* Display gallon error */}
            <div>
              <label>Delivery Address:</label>
              <input
                type="text"
                id="deliveryAddress"
                name="deliveryAddress"
                value={ad1}
                readOnly={true}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div>
              <label>Delivery Date:</label>
              <input
                type="date"
                id="deliveryDate"
                name="deliveryDate"
                value={deliveryDate}
                onChange={this.handleInputChange}
                required
              />
              {errors.deliveryDate && (
                <p className="error">{errors.deliveryDate}</p>
              )}{" "}
              {/* Display email error */}
            </div>
            <button onClick={this.onSubmitSignIn} type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default GetQuote;
