import React from 'react';
import './QuoteHistory.css'

class QuoteHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteHistory:[
        {
            clientName: 'Jon Doe',
        gallonsRequested: 799,
        deliveryAddress: '789 St.',
        deliveryDate: '01-10-9024',
        pricePergallon:999,
        amountDue: 147

        },
        {
            clientName: 'Handi Doe',
        gallonsRequested: 789,
        deliveryAddress: '636 St.',
        deliveryDate: '30-10-1224',
        pricePergallon:269,
        amountDue: 258
        },
        {
            clientName: 'Doe Shoe',
        gallonsRequested: 699,
        deliveryAddress: '123 St.',
        deliveryDate: '10-10-2011',
        pricePergallon:985,
        amountDue: 369
        }

    ]
    }
  }

  

  

  render() {
    

    return (
      
      <div>
      <h1>Quote History</h1>  
      
       <div className='containerQuote center'>
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
            { this.state.quoteHistory.map(qoute =>
              <tr className="br3  bg-light-pink">
                <td>{qoute.clientName} </td>
                <td>{qoute.gallonsRequested}</td>
                <td>{qoute.deliveryAddress}</td>
                <td>{qoute.deliveryDate}</td>
                <td> $ {qoute.pricePergallon}</td>
                <td>$ {qoute.amountDue}</td>
              </tr>
      
            )
        }

            </tbody>
      
          </table>
          </nav>
       </div>
    
        
      
  
      </div>
    );
  }
}

export default QuoteHistory;