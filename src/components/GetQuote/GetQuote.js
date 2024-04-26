import React from "react";
import GetQuoteValidation from "./GetQteValidations";

class GetQuote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gallonsRequested: "",
      errors: {},
      deliveryDate: "",
      deliveryAddress: "",
      totalAmount: 0.0,
      sugestedPriceperGallon: 0.0,
      savemode: false, // Added state variable for delivery address
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
  onCancel = (event) => {
    event.preventDefault();
    this.setState({ savemode: false });
  };

  onGetQuote = (event) => {
    event.preventDefault();

    const errors = GetQuoteValidation(this.state); // Call Validation function with current state
    this.setState({ errors }); // Update errors state
    if (Object.values(errors).every((error) => error === "")) {
      this.setState({ savemode: true });
      const { gallonsRequested, deliveryDate, deliveryAddress } = this.state;
      const { id, namefull, ad1 } = this.props;
      fetch("http://localhost:3000/PseudoQuote", {
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
          console.log(data);

          this.setState({ sugestedPriceperGallon: data.suggestedPrice });
          console.log("Price per gallon" + data.suggestedPrice);

          this.setState({ totalAmount: data.totalAmountDue });
          console.log("Total Amount" + data.totalAmountDue);
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
    const {
      gallonsRequested,
      deliveryDate,
      deliveryAddress,
      sugestedPriceperGallon,
      totalAmount,
    } = this.state;
    const { ad1 } = this.props;
    var today = new Date();
    today.setHours(today.getHours() - 5); // Adjust for CST (5 hours behind UTC)
    const formattedToday = today.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
    return (
      <div>
        <h1>GET A NEW QUOTE</h1>
        {this.state.savemode ? (
          <div className="center">
            <form onSubmit={this.onSubmitForm}>
              <label htmlFor="gallonsRequested">Gallons Requested:</label>
              <input
                type="number"
                id="gallonsRequested"
                name="gallonsRequested"
                value={gallonsRequested}
                onChange={this.handleInputChange}
                readOnly={this.state.savemode}
                min={1}
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
                  onChange={this.handleInputChange}
                  readOnly={this.state.savemode}
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
                  readOnly={this.state.savemode}
                />
                {errors.deliveryDate && (
                  <p className="error">{errors.deliveryDate}</p>
                )}{" "}
                {/* Display email error */}
                <label>Sugested Price Per Gallon: </label>
                <input
                  type="sugestedPriceperGallon"
                  id="sugestedPriceperGallon"
                  name="sugestedPriceperGallon"
                  value={sugestedPriceperGallon}
                  onChange={this.handleInputChange}
                  readOnly={this.state.savemode}
                />
                <label>Total Price: </label>
                <input
                  type="totalAmount"
                  id="totalAmount"
                  name="totalAmount"
                  value={totalAmount}
                  onChange={this.handleInputChange}
                  readOnly={this.state.savemode}
                />
              </div>
              <button
                onClick={this.onCancel}
                type="submit"
                style={{
                  marginRight: "10px",
                  backgroundColor: "red",
                  color: "white",
                }}
              >
                Cancel
              </button>
              <button onClick={this.onSubmitSignIn} type="submit">
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="center">
            <form onSubmit={this.onSubmitForm}>
              <label htmlFor="gallonsRequested">Gallons Requested:</label>
              <input
                type="number"
                id="gallonsRequested"
                name="gallonsRequested"
                value={gallonsRequested}
                onChange={this.handleInputChange}
                min={1}
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
                  min={formattedToday}
                  //min='2024-03-29'
                  required
                />
                {errors.deliveryDate && (
                  <p className="error">{errors.deliveryDate}</p>
                )}{" "}
                {/* Display email error */}
              </div>
              <button onClick={this.onGetQuote} type="submit">
                GetQuote
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default GetQuote;
