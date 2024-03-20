function GetQuoteValidation(values) {
    let error = {};
   
    if (values.gallonsRequested === "") {
      error.gallonsRequested = "Gallons requested should not be empty";
    }  else {
      error.gallonsRequested = "";
    }
  
   
  
    
  
    if (values.deliveryDate === "") {
      error.deliveryDate= "Delivery date should not be empty";
    } else {
      error.deliveryDate = "";
    }
  
    
  
    return error;
  }
  
  export default GetQuoteValidation;