/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import React, { useState,useEffect, useRef, ChangeEvent } from 'react';
import './customerEntryDineIn.css';
import axios from 'axios';
import BASE_URL from '../config';

import  './keyboard.css';

import '@fortawesome/fontawesome-free/css/all.min.css';

interface CustomerPaymentData {
  handlemodaldata:any
}

const CustomerPayment:React.FC<CustomerPaymentData> = ({handlemodaldata }) => {


  interface CustomerData { 
    id_code : string;
    trade_name : string;
  }



    const [customer, setCustomer] = useState<string>('');
    const [customerAddress, setcustomerAddress] = useState<string>('');
    const [customerTIN, setcustomerTIN] = useState<string>('');
    const [customerBusinessStyle, setcustomerBusinessStyle] = useState<string>('');


    const CustomerRef = useRef<HTMLInputElement>(null);
    const customerAddressRef = useRef<HTMLInputElement>(null)
    const customerTINRef = useRef<HTMLInputElement>(null)
    const customerBusinessStyleRef = useRef<HTMLInputElement>(null)
    const SaveRef = useRef<HTMLButtonElement>(null)

  
    const CustomerListRef = useRef<HTMLUListElement>(null)
    const [CustomerListModal, setCustomerListModal] = useState<boolean>(false);
    // const [DisplayLetters, setDisplayLetters] = useState<boolean>(true);
    const [customerFocus, setCustomerFocus] = useState<boolean>(false);
    const [customerAddressFocus, setcustomerAddressFocus] = useState<boolean>(false);
    const [customerTINFocus, setcustomerTINFocus] = useState<boolean>(false);
    const [customerBusinessStyleFocus, setcustomerBusinessStyleFocus] =useState<boolean>(false);
    
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(0);
    const [selectedOption, setSelectedOption] = useState<string>('option2'); // Initialize the selected option
    const [customerType, setcustomerType] = useState<string>('Walk-in');
    const [CustomerList, setCustomerList] = useState<CustomerData[]>([]);
    const handleCustomerTypeRegular = () => {

        setSelectedOption('option1')
        setcustomerType('Regular')
       }
      
    const handleCustomerTypeWalkIN = () => {
        setSelectedOption('option2')
        setcustomerType('Walk-in')
       }



    useEffect(() => {
        const timeoutId = setTimeout(() => {
          if (CustomerRef.current) {
            CustomerRef.current.focus();
          }
        }, 100);
      
        // Cleanup function to clear the timeout
        return () => {
          clearTimeout(timeoutId);
        };
      }, []);



    
    
       const handleKeyDown = (event : any, currentRef: React.RefObject<HTMLInputElement>, nextRef: any) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (nextRef.current) {
            nextRef.current.focus();
          }
        }

        if (event === 'Enter') {
            if (nextRef.current) {
              nextRef.current.focus();
            }
          }
};


const sendDataToMain = () => {
  
        handlemodaldata({
            Customer: customer,
            Address: customerAddress,
            TIN: customerTIN,
            BusinessStyle: customerBusinessStyle,
            customerType:customerType,
          });

  };



  const CustomerF = () => {
    setCustomerFocus(true);

    setcustomerAddressFocus(false);
    setcustomerTINFocus(false);
    setcustomerBusinessStyleFocus(false);
  }

  const AddressF = () => {
    setCustomerFocus(false);

    setcustomerAddressFocus(true);
    setcustomerTINFocus(false);
    setcustomerBusinessStyleFocus(false);
  }

  const TINF = () => {
    setCustomerFocus(false);

    setcustomerAddressFocus(false);
    setcustomerTINFocus(true);
    setcustomerBusinessStyleFocus(false);
  }

  const BusinessStyleF = () => {
    setCustomerFocus(false);
    setcustomerAddressFocus(false);
    setcustomerTINFocus(false);
    setcustomerBusinessStyleFocus(true);
  }

  const [cursorPosition, setCursorPosition] = useState(0);

  const updateDataAtCursorPosition = (prevValue: string, newValue: string | any[]) => {
    // Ensure prevValue is a string before using slice
    const stringValue = String(prevValue);
  
    const part1 = stringValue.slice(0, cursorPosition);
    const part2 = stringValue.slice(cursorPosition);
    let newCursorPosition = 0
    let updatedValue =''
  
    if (stringValue.length === 1) {
        updatedValue = part1 + newValue;
         newCursorPosition = part1.length  + newValue.length;
         setCursorPosition(newCursorPosition)
    }

    else {
     
        updatedValue = part1 + newValue + part2
        newCursorPosition =  part1.length + newValue.length;
        setCursorPosition(newCursorPosition)
    }

  
    return { updatedValue, newCursorPosition };
  };
  
  const handleButtonClick = (value: string) => {
    if (customerAddressFocus) {
      const { updatedValue } = updateDataAtCursorPosition(customerAddress, value);
      setcustomerAddress(updatedValue);
    } else if (customerFocus) {
      const { updatedValue } = updateDataAtCursorPosition(customer, value);
      setCustomer(updatedValue);
    } else if (customerTINFocus) {
      const { updatedValue } = updateDataAtCursorPosition(customerTIN, value);
      setcustomerTIN(updatedValue);
    } else if (customerBusinessStyleFocus) {
      const { updatedValue } = updateDataAtCursorPosition(customerBusinessStyle, value);
      setcustomerBusinessStyle(updatedValue);
    }
  };
  

  const handleClick = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      const currentPosition = ref.current.selectionStart || 0;
      setCursorPosition(currentPosition);
    }
  };


  const handleClear = () => {
    // Detect the clear action and handle it accordingly
    if (customerAddressFocus) {
      setcustomerAddress('');
      setCursorPosition(0);
    } else if (customerFocus) {
      setCustomer('');
      setCursorPosition(0);
    } else if (customerTINFocus) {
        setcustomerTIN('');
      setCursorPosition(0);
    }else if (customerBusinessStyleFocus) {
        setcustomerBusinessStyle('');
      setCursorPosition(0);
  }
};

  const handleBackspace = () => {
if (customerFocus && cursorPosition > 0) {
      const updatedValue =
        customer.slice(0, cursorPosition - 1) + customer.slice(cursorPosition);
      setCustomer(updatedValue);
      setCursorPosition(cursorPosition - 1);
    } else if (customerAddressFocus && cursorPosition > 0) {
      const updatedValue =
        customerAddress.slice(0, cursorPosition - 1) + customerAddress.slice(cursorPosition);
      setcustomerAddress(updatedValue);
      setCursorPosition(cursorPosition - 1);
    } else if (customerTINFocus && cursorPosition > 0) {
      const updatedValue =
        customerTIN.slice(0, cursorPosition - 1) + customerTIN.slice(cursorPosition);
      setcustomerTIN(updatedValue);
      setCursorPosition(cursorPosition - 1);
    } else if (customerBusinessStyleFocus && cursorPosition > 0) {
      const updatedValue =
        customerBusinessStyle.slice(0, cursorPosition - 1) + customerBusinessStyle.slice(cursorPosition);
      setcustomerBusinessStyle(updatedValue);
      setCursorPosition(cursorPosition - 1);
    }
  };


  const alphabetRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Enter'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Shift','Clear'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '.','/', '@','Control']
  ];

  const rows = alphabetRows.map((row, rowIndex) => (
    <div className="keyboard-row" key={rowIndex}>
      {row.map((letter, index) => (
        <button
          className="keyboard-key"
          key={index}
          onClick={() => handleSpecialButtonClick(letter)}
          aria-label={letter}
        >
          {letter}
        </button>
      ))}
    </div>
  ));


  const handleSpecialButtonClick = (value: string) => {
    switch (value) {
      case 'Enter':
        if (customerAddressFocus) {
          handleKeyDown('Enter', customerAddressRef, customerTINRef);
        } else if (customerFocus) {
          handleKeyDown('Enter', CustomerRef, customerAddressRef);
        } else if (customerTINFocus) {
          handleKeyDown('Enter', customerTINRef, customerBusinessStyleRef);
        } else if (customerBusinessStyleFocus) {
          handleKeyDown('Enter', customerBusinessStyleRef, SaveRef);
        }
        break;
      case 'Backspace':
        handleBackspace();
        break;
      case 'Shift':
        // Handle Shift key functionality
        break;
      case 'Control':
        // Handle Control key functionality
        break;
      case 'Clear':
            handleClear();
            break;
      default:
        // Handle other keys (letters or numbers)
        handleButtonClick(value);
        break;
    }
  };


  const handleKeys = (event:any, inputIdentifier:any) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      
      if (inputIdentifier === 'Customer' && CustomerListRef.current) {
        const listItems = Array.from(CustomerListRef.current.querySelectorAll('li')) as HTMLLIElement[];
        const currentIndex = listItems.findIndex((item) => item === selectedItemIndex);
        let nextIndex: number | null = null;
      
        if (event.key === 'ArrowUp') {
          nextIndex = currentIndex !== -1 ? currentIndex - 1 : null;
        } else if (event.key === 'ArrowDown') {
          nextIndex = currentIndex !== -1 ? currentIndex + 1 : null;
        }
      
        if (nextIndex !== null && nextIndex >= 0 && nextIndex < listItems.length) {
          const prevSelectedItem = document.querySelector('.ul-list .selected') as HTMLLIElement | null;
          if (prevSelectedItem) {
            prevSelectedItem.classList.remove('selected');
          }
      
          const nextListItem = listItems[nextIndex];
          nextListItem.focus();
          setSelectedItemIndex(nextListItem);
          setCustomer(nextListItem.innerText); // Update customer state with the text content
      
          // Add the 'selected' class to the newly selected item
          nextListItem.classList.add('selected');
        }
      }
      
    }

    
    if (event.key === 'Enter') {

      if (inputIdentifier === 'Customer' && CustomerListRef.current) {
        const listItems = Array.from(CustomerListRef.current.querySelectorAll('li')) as HTMLLIElement[];
        const currentIndex = Array.from(listItems).findIndex((item) => item === selectedItemIndex);
        ClickCustomerList(currentIndex);
      } }
};
  

const handleSearchInputChange = async (e: any, inputIdentifier: string) => {
  try {
      if (inputIdentifier === 'Customer') {

          if (customerType==='Walk-in'){
            return;
          }
          const result = await axios.get(`${BASE_URL}/api/customer-list/`,{
            params: {
              customer:e
            }
          }); 
          
          if (result) {
              setCustomerList(result.data.customers);
              setCustomerListModal(true);
          }}
          
        }  catch (error) {
            console.error(error);
            }
}



  const ClickCustomerList = (index: number) => {
    setCustomerListModal(false)
    const selectedItem = CustomerList[index];
  setCustomer(selectedItem.trade_name)
  if (customerAddressRef.current) {
    customerAddressRef.current.focus();
  }
   }
  return (
    <div className="modal">
      <div className="modal-contentCustomerDine" style={{width:'100%', display:'flex',flexDirection:'row'}}>

    <div style={{width:'30%' ,  border:' 2px solid #ccc', borderRadius: '8px', padding: '10px',margin:'5px'}}>
      <h2 style={{ color: '#007bff', padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
      borderRadius: '5px', margin: '10px', fontWeight: 'bold', textAlign: 'center', border:'solid' }}
      >Customer Info</h2>
      <div className="customer-type">
        <span className="customer-type-label">Customer Type:</span>
        <div className="button-group">
          <button className={selectedOption === 'option1' ? 'radio-button checked blinking' : 'radio-button'}id="option1"onClick={() => handleCustomerTypeRegular()}>Regular</button>
          <button className={selectedOption === 'option2' ? 'radio-button checked blinking' : 'radio-button'}id="option2"onClick={() => handleCustomerTypeWalkIN()}>Walk-In </button>
        </div>
      </div>

        {/* Input fields */}
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <label htmlFor="input1">Customer Name:</label>
          <input ref={CustomerRef} 
           onKeyDown={(e) =>
                      customerType === 'Walk-in'
                        ? handleKeyDown(e, CustomerRef, customerAddressRef)
                        : handleKeys(e, 'Customer')}
                  onInput={(e: ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Customer')}
          type="text" id="input1" placeholder="Customer" 
            onChange={(e) => setCustomer(e.target.value)}  autoComplete="off"
            onClick={() => handleClick(CustomerRef)}
            onFocus={CustomerF} 
            value={customer} required/>

            {CustomerListModal && (
                <div className='CustomerlistPayment-Container' onKeyDown={(event) => handleKeys(event, 'customer')} >
                 <ul id="list" className='ul-list customer'   onKeyDown={(event) => handleKeys(event, 'customer')}  ref ={CustomerListRef}>
                   {CustomerList.map((result,index) => (
                     <li tabIndex={0} key={index}
                     onKeyDown={(event) => handleKeys(event, 'Customer')}
                      onClick={() => ClickCustomerList(index)}
                     >{result.id_code.padStart(4, '0')} - {result.trade_name}</li>
                        ))}
                       </ul>
                       </div>
       )} 



          <label htmlFor="input3">Address:</label>
          <input ref={customerAddressRef}  onKeyDown={(e) => handleKeyDown(e, customerAddressRef, customerTINRef)}  id="input3" type = "text"  placeholder="Address" 
            onChange={(e) => setcustomerAddress(e.target.value)} autoComplete="off"
            onFocus={AddressF}
            value={customerAddress}
            onClick={() => handleClick(customerAddressRef)}
            // onClick={handleClick}
            required />

          <label htmlFor="input4">TIN:</label>
          <input  ref={customerTINRef} type="text" id="input4" placeholder="Tax Identification"  
            onChange={(e) => setcustomerTIN(e.target.value)} autoComplete="off" value={customerTIN}
            onFocus={TINF}
            onKeyDown={(e) => handleKeyDown(e, customerTINRef, customerBusinessStyleRef)}
            onClick={() => handleClick(customerTINRef)}
            required/>


        <label htmlFor="input4">Business Style:</label>
          <input  ref={customerBusinessStyleRef} type="text" id="input45" placeholder="Business Style"  
            onChange={(e) => setcustomerBusinessStyle(e.target.value)} autoComplete="off" value={customerBusinessStyle}
            onFocus={BusinessStyleF}
            onKeyDown={(e) => handleKeyDown(e, customerTINRef, customerBusinessStyleRef)}
            onClick={() => handleClick(customerBusinessStyleRef)}

            required/>
        </div>


        {/* Command buttons */}
        <div style={{display:'flex'}} >
          <button  ref={SaveRef} onClick={sendDataToMain} className='button-ok' style={{width:'100%',margin:'5px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>SAVE</button>
        </div>
    </div>


   <div className='keyboardScreen'>
   {rows}
   <button className="num-pad-key" style={{width:'98%',margin:'8px 10px'}} onClick={() => handleButtonClick(' ')}>SPACE</button>
 </div>

    {/* <div>
      <div className="num-pad" style={{width:'50% !important'}}>
      <div className="num-pad-row">
        <button className="num-pad-key" onClick={() => handleButtonClick('1')}>1</button>
        <button className="num-pad-key" onClick={() => handleButtonClick('2')}>2</button>
        <button className="num-pad-key" onClick={() => handleButtonClick('3')}>3</button>
      </div>
      <div className="num-pad-row">
        <button className="num-pad-key" onClick={() => handleButtonClick('4')}>4</button>
        <button className="num-pad-key" onClick={() => handleButtonClick('5')}>5</button>
        <button className="num-pad-key" onClick={() => handleButtonClick('6')}>6</button>
      </div>
      <div className="num-pad-row">
        <button className="num-pad-key" onClick={() => handleButtonClick('7')}>7</button>
        <button className="num-pad-key" onClick={() => handleButtonClick('8')}>8</button>
        <button className="num-pad-key" onClick={() => handleButtonClick('9')}>9</button>
      </div>
      <div className="num-pad-row">
        <button className="num-pad-key" onClick={handleClear}><FontAwesomeIcon icon={faTimesCircle}/>Clear</button>
        <button className="num-pad-key" onClick={() => handleButtonClick('0')}>0</button>
        <button className="num-pad-key" onClick={handleBackspace}><FontAwesomeIcon icon={faBackspace}/>Back</button>
      </div>
      <div className="num-pad-row">
      <button className="num-pad-key"  onClick={handleButtonClick}>ABC</button>
        <button className="num-pad-key"  onClick={handleButtonClick}>Close</button>
        <button className="num-pad-key" onClick={handleButtonClick}>OK</button>
      </div>
    </div>
    </div> */}

    </div>
    </div>


  );
};

export default CustomerPayment;
