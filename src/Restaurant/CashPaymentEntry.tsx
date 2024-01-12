/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect,useRef } from 'react';
import Cash from '../assets/cahphp.jpg';
import './css/CashPaymentEntry.css'
// import '../Restaurant/css/CashPaymentEntry.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBackspace, faBackward, faFastBackward, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";

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

  const amountReceivedRef = useRef(null);

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


  const handleInput = (value: string | number): void => {
    setAmountReceived((prevValue: string | number) => {
      // Remove leading zero if the input value is '0'
      if (typeof value === 'number' && value === 0 && parseFloat(prevValue as string) === 0) {
        return value.toString();
      } else {
        // Check if the value is a decimal point
        if (value === '.') {
          const res = parseFloat(prevValue as string) + value;
          return res.toString();
        }
  
        const stringValue = prevValue.toString();
        
        // Check if the previous value already contains a decimal point
        if (stringValue.includes('.') && typeof value === 'number') {
          const res = parseFloat(prevValue as string) + value;
          return res.toString();
        }
  
        // Perform addition based on the input value
        if (typeof prevValue === 'number' && prevValue === 0 && typeof value === 'number') {
          return value.toString();
        }
  
        if (typeof prevValue === 'number' && typeof value === 'number') {
          const res = prevValue + value;
          return res.toString();
        }
        else {
          if (prevValue === 0) {
            const res =value;
            return res.toString();
          }
          else{
            const res = prevValue as string  + value;
          
            return res.toString();
          }

        }
        
        
        // Return previous value if none of the conditions are met
        return prevValue;
      }
    });
  };
  

  const clearInput = () => {
    setAmountReceived(0);
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

    if (parseFloat(due) > (amountReceived !== '' ? parseFloat(amountReceived) : 0)) {
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
        amounttendered: amountReceived,
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


  const handleAmountReceivedChange = (value: string) => {
    setAmountReceived(parseFloat(value));
  };


  // const handleClick = (ref) => {
  //   if (ref.current) {
  //     const currentPosition = ref.current.selectionStart || 0;
  //     setCursorPosition(currentPosition);
  //   }
  // };


  useEffect(() => {

    const amountWithoutCommas = amountdue.replace(/,/g, '')
    const change = amountReceived - amountWithoutCommas;
    setChangeDue(change >= 0 ? change : 0);
  }, [amountReceived, amountdue]);

  return (
    <div>
    <div className="modal" >
          <div className="modal-content-cashpayment" >
          <h2 style={{ color: '#ffffff', backgroundColor: '#007bff', padding: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
        borderRadius: '5px', margin: '10px',
        fontWeight: 'bold', textAlign: 'center'
      }}>Cash Payment</h2>

<div style={{display:'flex',flexDirection:'row'}}>
    <div style={{display:'flex',flexDirection:'row' ,width:'120%' }}>
        <div style={{display:'flex',flexDirection:'column' , border:' 2px solid #ccc', borderRadius: '8px',padding:'20px'}}>
                <p style={{ fontSize: '20px', fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>TOTAL AMOUNT DUE:</p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue',  color: 'red', 
                    padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px' ,textAlign:'end' }}>  Php {amountdue}</p>
                

            
                <p style={{ fontSize: '20px', fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>AMOUNT TENDERED</p>
                    <input style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid', margin: '10px',  color: 'Black', 
                    padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  ,textAlign:'end' }}
                    type="text"
                    onChange={(e) => handleAmountReceivedChange(e.target.value)}
                    autoComplete="off"
                    id="input1"
                    ref={amountReceivedRef}
                    value={amountReceived}
                    required/>
                    

        <p style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue',  color: 'Black', 
        padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>TOTAL CHANGE: {changeDue.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        })}</p>
                <img src= {Cash} style={{height:'200px',width:'100%',marginTop:'20px'}}/>
       
        </div>
      </div>



      <div className="num-pad" style={{width:'50% !important'}}>
      <div className="num-pad-row">
        <button className="num-pad-key" onClick={() => handleInput('1')}>1</button>
        <button className="num-pad-key" onClick={() => handleInput('2')}>2</button>
        <button className="num-pad-key" onClick={() => handleInput('3')}>3</button>
      </div>
      <div className="num-pad-row">
        <button className="num-pad-key" onClick={() => handleInput('4')}>4</button>
        <button className="num-pad-key" onClick={() => handleInput('5')}>5</button>
        <button className="num-pad-key" onClick={() => handleInput('6')}>6</button>
      </div>
      <div className="num-pad-row">
        <button className="num-pad-key" onClick={() => handleInput('7')}>7</button>
        <button className="num-pad-key" onClick={() => handleInput('8')}>8</button>
        <button className="num-pad-key" onClick={() => handleInput('9')}>9</button>
      </div>
      <div className="num-pad-row">
        <button className="num-pad-key"style={{ width: '33%' }}  onClick={() => handleInput('.')}>.</button>
        <button className="num-pad-key" style={{ width: '33%' }} onClick={() => handleInput('0')}>0</button>
        <button className="num-pad-key"style={{ width: '33%'}} onClick={() => handleBackspace()}>Back</button>
      </div>
      <div className="num-pad-row">
        <button className="num-pad-key" style={{ width: '33%'}} onClick={handleClose}> Close</button> 
        <button className="num-pad-key" style={{ width: '33%'}} onClick={handleOk}> OK </button>
        <button className="num-pad-key" style={{ width: '33%'}} onClick={clearInput}> Clear </button>
      </div>
    </div>
          </div>
          </div>
    </div>
    </div>
  );
};

export default CashPaymentEntry;
