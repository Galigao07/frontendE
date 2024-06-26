/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect,useRef } from 'react';
import Cash from '../assets/cahphp.jpg';
import './css/CashPaymentEntry.css'
// import '../Restaurant/css/CashPaymentEntry.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBackspace, faBackward, faFastBackward, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import { Grid, Typography } from '@mui/material';
import {BASE_URL} from '../config';

interface CashData {
  handleClose: () => void;
  amountdue : any;
  amounttendered : any;
}


const CashPaymentEntry: React.FC<CashData> = ({handleClose,amountdue,amounttendered}) => {
  // State variables to store payment details
  const [amountReceived, setAmountReceived] = useState<any>('');

  const [changeDue, setChangeDue] = useState(0);

  // const [amountReceivedFocus, setamountReceivedFocus] = useState(0);
  // const [inputValue, setInputValue] = useState('');

  const amountReceivedRef = useRef<HTMLInputElement>(null);

  // const handleInput = (value:number) => {
  //   setAmountReceived((prevValue) => {
  //     // Remove leading zero if the input value is '0'
  //     if (value === 0 && parseFloat(prevValue) === 0) {
  //       return value;
  //     } else {


  //       // Check if the value is a decimal point
  //       if (value === '.') {
  //           const res = parseFloat(prevValue) + value;
  //           return res;
  //       }
  //       const stringValue = prevValue.toString();
  //         // Check if the previous value already contains a decimal point
  //         if (stringValue.includes('.')) {
  //           const res = prevValue + value;
  //           return res;
  //         }
    

  //       // Perform addition based on the input value

  //       if (prevValue === 0) {
  //         const res =  value;
  //         return res.toString();
  //       }
  //       const res = prevValue + value;
  //       return res.toString();
  //     }
  //   });
  // };


  const handleInput = (value:any): void => {
    if (value === '.') {
      const dotCount = amountReceived.split('.').length - 1;
      if (dotCount === 1) {
        return
      }
    }

    setAmountReceived((prevValue: any) => {
      // Remove leading zero if the input value is '0'
      if (typeof value === 'number' && value === 0 && parseFloat((prevValue.replace(',','')) as string) === 0) {
        return value.toString();
      } else {
        // Check if the value is a decimal point
        if (value === '.') {
          const res = prevValue as string + value;

          return res.toString();
        }
  
        const stringValue = (prevValue.replace(',','')).toString();
        
        // Check if the previous value already contains a decimal point
        if (stringValue.includes('.') && typeof value === 'number') {
          const res:any = parseFloat((prevValue.replace(',','')) as string) + value;
          const formattedValue = parseFloat(res).toLocaleString();
          return formattedValue.toString();
        }
  
        // Perform addition based on the input value
        if (typeof prevValue === 'number' && prevValue === 0 && typeof value === 'number') {
          const res:any = value
          const formattedValue = parseFloat(res).toLocaleString();
          return formattedValue.toString();
          // return value.toString();
        }
  
        if (typeof prevValue === 'number' && typeof value === 'number') {
          const res:any = prevValue + value;
          const formattedValue = parseFloat(res).toLocaleString();
          return formattedValue.toString();
        }
        else {
          if (prevValue === 0) {
            const res:any =value;
            const formattedValue = parseFloat(res).toLocaleString();
            return formattedValue.toString();
          }
          else{
            
            const sanitizedValue = prevValue.replace(/[^0-9.]/g, '');
            const res:any = sanitizedValue as string  + value;
          
            const Amount = parseFloat(res).toLocaleString()
            return Amount.toString();
          }

        }
        
        
        // Return previous value if none of the conditions are met
        return prevValue;
      }
    });
  };
  

  const clearInput = () => {
    setAmountReceived('');
  };

  // const AmountReceiveF = () => {
  //   setamountReceivedFocus(true);

  // }

  // const swalWithBootstrapButtons = Swal.mixin({
  //   customClass: {
  //     confirmButton: 'btn btn-success',
  //     cancelButton: 'btn btn-danger'
  //   },
  //   buttonsStyling: false
  // })

  const handleBackspace = () => {
    if (typeof amountReceived !== 'string' || amountReceived.length === 0) return;
  
    setAmountReceived((prevAmountReceived: string) => prevAmountReceived.slice(0, -1));
  };





  const handleOk = () => {

    if (Number.isNaN(amountReceived)) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid Amount Tendered..!',
        icon: 'info',
        confirmButtonText: 'OK'
      });   
      return;
    }
    

    const due = amountdue.replace(/,/g, '')
    const ReceiveAmount = amountReceived.replace(/,/g, '')

    if (parseFloat(due) > (ReceiveAmount !== '' ? parseFloat(ReceiveAmount) : 0)) {
      // Handle the condition where amount due is greater than amount received
      // For example, display an error message, prevent action, etc.
      Swal.fire({
        title: 'Error',
        text: 'Amount due is greater than Amount Tendered received. Please enter a valid amount.',
        icon: 'info',
        confirmButtonText: 'OK'
      });

      // You can add additional actions here such as displaying an error message, preventing the function from continuing, etc.
    } else {
      // Execute the 'amounttendered' function if the condition is met (amount due is less than or equal to amount received)
      amounttendered({
        amounttendered: ReceiveAmount,
        change: changeDue,
      });
    }
    // Handle OK button action here
    // amounttendered({
    //     amounttendered:amountReceived,
    //     change: changeDue,
    // })
  };

  // const handleClose = () => {
  //   // Handle Close button action here
  //   setAmountReceived(0); // Clear input when closing

  // };

  const handleAmountReceivedChange = (value:any) => {
    // Remove commas from the input value
    const dotCount = value.split('.').length - 1;
    if (dotCount === 2 ) {
      return
    }
    if (value === '') {
      if (typeof amountReceived !== 'string' || amountReceived.length === 0) return;
  
    setAmountReceived((prevAmountReceived: string) => prevAmountReceived.slice(0, -1));
      return
    }
    const tmp = value.replace(',', '');

    const sanitizedValue = tmp.replace(/[^0-9.]/g, '');
    if (sanitizedValue.charAt(sanitizedValue.length - 1) === '.') {
      setAmountReceived((prevValue: any) => {
        const res = prevValue as string + '.';
        return res.toString();
      });
    } else {
      // Format the sanitized value as a number with locale-specific formatting
      const formattedValue = parseFloat(sanitizedValue).toLocaleString();
      setAmountReceived(formattedValue);
    }

};

  // const handleAmountReceivedChange = (value: string) => {
  //   const tmp = value.replace(',','')
  //   // const sanitizedValue :any = parseFloat(tmp).toFixed(2)

  //   const sanitizedValue = tmp.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');

  //   // Handle the sanitized value
  //   setAmountReceived(sanitizedValue);
  //   // setAmountReceived(parseFloat(value));
  // };



  // const handleClick = (ref) => {
  //   if (ref.current) {
  //     const currentPosition = ref.current.selectionStart || 0;
  //     setCursorPosition(currentPosition);
  //   }
  // };

  useEffect(() => {
    if (amountReceivedRef.current){
      amountReceivedRef.current.focus();
      amountReceivedRef.current.select();
    }
  },[])

  const HandleKeydown = (e:any) => {
    if (e.key == 'Enter'){
      handleOk();
    }

  }


  useEffect(() => {
    const handleKeyPress = (e: { keyCode: number; preventDefault: () => void; }) => {
      if (e.keyCode === 116) {
        e.preventDefault(); // Prevent the default browser refresh action for F5 (key code 116)

      }
      if (e.keyCode === 27) {
        e.preventDefault(); 
        handleClose();
      }
      
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);


  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
  useEffect(() => {

    const amountWithoutCommas = amountdue.replace(/,/g, '')

    const change = amountReceived.replace(/,/g, '') - amountWithoutCommas;

    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      const message = {
        'AmountTendered': amountReceived.replace(/,/g, ''),
        'AmountDue':amountWithoutCommas,
        'Open':'True',
      };
      chatSocket.send(JSON.stringify(message));
    }
    

    setChangeDue(change >= 0 ? change : 0);
  }, [amountReceived, amountdue]);


// ********************* OPEN WEBSOCKET CONNECTION ***************************//

useEffect(() => {
  var url = new URL(BASE_URL);
  // Reconstruct the URL without the port
  var urlWithoutPort = url.hostname;
// var urlWithoutPort = url.protocol + "//" + url.hostname + url.pathname + url.search + url.hash;

  const socket = new WebSocket(`ws://${urlWithoutPort}:8001/ws/change/`);

  socket.onopen = () => {
    console.log('WebSocket connection established.');
    const message = {
      'message': 'Hello, world im back!'
    };
    socket.send(JSON.stringify(message));
  };

  socket.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    console.log('Received data:', data);

  };
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  setChatSocket(socket)
  return () => {
    // Clean up WebSocket connection on component unmount
    socket.close();
  };
}, []); 


  return (
    <div>
    <div className="modal" >
    <div className="modal-content-cashpayment" >
              <h2 style={{ color: '#ffffff', backgroundColor: '#007bff', padding: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
            borderRadius: '5px', margin: '10px',
            fontWeight: 'bold', textAlign: 'center'
          }}>Cash Payment</h2>



          {/* <div style={{display:'flex',flexDirection:'row'}}> */}
          <Grid container className="CreditCard-Container" spacing={2} >

            <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>
              
            <div style={{display:'flex',flexDirection:'row' ,width:'100%',height:'530px' }}>
                <div style={{display:'flex',flexDirection:'column' , border:' 2px solid #ccc', borderRadius: '8px',padding:'20px',width:'100%' }}>
                        <p style={{ fontSize: '30px', fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>TOTAL AMOUNT DUE:</p>
                            <p style={{ fontSize: '30px', fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue',  color: 'red', 
                            padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px' ,textAlign:'end' }}>  Php {amountdue}</p>
                        

                    
                        <p style={{ fontSize: '30px', fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>AMOUNT TENDERED</p>
                            <input style={{ fontSize: '40px', fontWeight: 'bold', border: '1px solid', margin: '10px',  color: 'Black', 
                            padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  ,textAlign:'end',width:'95%',  appearance: 'textfield',WebkitAppearance: 'none', }}
                            type="text" // Use type="tel" instead of type="number"
                            pattern="[0-9]*[.]?[0-9]*" 
                            onChange={(e) => handleAmountReceivedChange(e.target.value)}
                            autoComplete="off"
                            id="input1"
                            ref={amountReceivedRef}
                            value={amountReceived}

                            onKeyDown={(e)=> HandleKeydown(e)}
                            required/>
                            

                <p style={{ fontSize: '30px', fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue',  color: 'Black', 
                    padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>TOTAL CHANGE:</p>
                <p style={{ fontSize: '30px', fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue',  color: 'Blue', 
                    padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px' ,textAlign:'end' }}>{changeDue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                })}</p>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                <img src= {Cash} style={{height:'100px',width:'50%',marginTop:'20px'}}/>
                </div>
                    
              
                </div>
            </div>

            </Grid>


            <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>
              

            <div className="num-pad-payment" style={{width:'100%'}}>
              <div className="num-pad-row">
              <button className="num-pad-key" onClick={() => handleInput('100')}>
                 <Typography      
                    sx={{
                      fontSize: { xs: '1.8rem', sm: '1.8rem', md: '1.4rem', lg: '1.2rem', xl: '1.8rem' }}}>
                    100
                  </Typography>
              </button>
                <button className="num-pad-key" onClick={() => handleInput('1')}>1</button>
                <button className="num-pad-key" onClick={() => handleInput('2')}>2</button>
                <button className="num-pad-key" onClick={() => handleInput('3')}>3</button>
      
              </div>
              <div className="num-pad-row">
              <button className="num-pad-key" onClick={() => handleInput('200')}>
                  <Typography      
                    sx={{
                      fontSize: { xs: '1.8rem', sm: '1.8rem', md: '1.4rem', lg: '1.2rem', xl: '1.8rem' }}}>
                    200
                  </Typography>
              </button>
                <button className="num-pad-key" onClick={() => handleInput('4')}>4</button>
                <button className="num-pad-key" onClick={() => handleInput('5')}>5</button>
                <button className="num-pad-key" onClick={() => handleInput('6')}>6</button>
             
              </div>
              <div className="num-pad-row">
              <button className="num-pad-key" onClick={() => handleInput('500')}>
                  <Typography      
                    sx={{
                      fontSize: { xs: '1.8rem', sm: '1.8rem', md: '1.4rem', lg: '1.2rem', xl: '1.8rem' }}}>
                    500
                  </Typography>
              </button>
                <button className="num-pad-key" onClick={() => handleInput('7')}>7</button>
                <button className="num-pad-key" onClick={() => handleInput('8')}>8</button>
                <button className="num-pad-key" onClick={() => handleInput('9')}>9</button>
                
              </div>
              <div className="num-pad-row">
                <button className="num-pad-key" onClick={() => handleInput('1000')} style={{padding:'5%'}}>
                  <Typography      
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '1.8rem', md: '1.4rem', lg: '1.2rem', xl: '1.8rem' },
                    width:'25%'}}>
                    1000
                  </Typography>
                </button>
                <button className="num-pad-key"  onClick={() => handleInput('.')}>.</button>
                <button className="num-pad-key"  onClick={() => handleInput('0')}>0</button>
                <button className="num-pad-key"  onClick={() => handleBackspace()}>
                  <Typography      
                    sx={{
                      fontSize: { xs: '1.8rem', sm: '1.8rem', md: '1.4rem', lg: '1.2rem', xl: '1.8rem' }}}>
                    Back
                  </Typography>
                </button>
            
              </div>
              <div className="num-pad-row">
                <button className="num-pad-key" style={{ width: '33%'}} onClick={handleClose}>
                <Typography      
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '1.8rem', md: '1.4rem', lg: '1.2rem', xl: '1.8rem' }}}>
                    Close
                  </Typography>
                </button> 
                <button className="num-pad-key" style={{ width: '33%'}} onClick={handleOk}> OK </button>
                <button className="num-pad-key" style={{ width: '33%'}} onClick={clearInput}>
                <Typography      
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '1.8rem', md: '1.4rem', lg: '1.2rem', xl: '1.8rem' }}}>
                    Clear
                  </Typography>
                </button>
              </div>
            </div>

            </Grid>
          </Grid>



          {/* </div> */}
    </div>
    </div>
    </div>
  );
};

export default CashPaymentEntry;
