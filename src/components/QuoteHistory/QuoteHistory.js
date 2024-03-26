import React from "react";
import "./QuoteHistory.css";

class QuoteHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      quoteHistory: [],
    };
  }

  componentDidMount() {
    const { id } = this.props;
    fetch("http://localhost:3000/qoutehistory", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    }).then((response) =>
      response.json().then((users) => {
        this.setState({ quoteHistory: users });
        console.log(users, 'we are in app.js', this.state.quoteHistory.length);

      })
    );
  }

  render() {
    const { quoteHistory } = this.state;

    return (
      <div> 
        {quoteHistory.length === 0 ? (
         <h1> No History Found!!! </h1> ) : (
          <div> 
           
        <h1>Quote History</h1>

        <div className="containerQuote center">
          <nav>
            <table>
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Gallons Requested</th>
                  <th>Delivery Address</th>
                  <th>Delivery Date</th>
                  <th>Price/Gallon</th>
                  <th>Total Amount Due</th>
                </tr>
              </thead>

              <tbody>
                {quoteHistory.map((qoute) => (
                  <tr className="br3  bg-light-pink">
                    <td>{qoute.clientName}</td>
                    <td>{qoute.gallonsRequested}</td>
                    <td>{qoute.deliveryAddress}</td>
                    <td>{qoute.deliveryDate}</td>
                    <td> $ {qoute.pricePerGallon}</td>
                    <td>$ {qoute.amountDue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </nav>
        </div>
        </div>
      )}</div>
    );
  }
}

export default QuoteHistory;