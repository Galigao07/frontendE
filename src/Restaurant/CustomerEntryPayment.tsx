/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import React, { useState,useEffect, useRef, ChangeEvent } from 'react';
import './css/customerEntryDineIn.css';
import axios from 'axios';
import {BASE_URL} from '../config';

import  './css/keyboard.css';

import '@fortawesome/fontawesome-free/css/all.min.css';
import { Grid, Table, Typography } from '@mui/material';
import { isDesktop } from 'react-device-detect';
import OnScreenKeyboard from './KeyboardGlobal';
import OnScreenKeyboardNumeric from './KeyboardNumericGlobal';

interface CustomerPaymentData {
  handlemodaldata:any
  handleClose:() => void;
}

const CustomerPayment:React.FC<CustomerPaymentData> = ({handlemodaldata,handleClose }) => {


  interface CustomerData { 
    id_code : string;
    trade_name : string;
    tax_id_no : string;
    st_address : string;
    business_style:string;
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
    const CustomerSearchRef = useRef<HTMLInputElement>(null)
    const [CustomerSearch, setCustomerSearch] = useState<string>('');
  
    const CustomerListRef = useRef<HTMLTableElement>(null)
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



      useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
    
    
          if (e.key === 'F5') {
            e.preventDefault(); // Prevent the default browser refresh action for F5
          }
          else if (e.ctrlKey && e.key === 'n') {
            e.preventDefault(); // Prevent the default browser action for Control + N
          }
          else if (e.ctrlKey && e.key === 's') { // Control + S
            e.preventDefault();
            sendDataToMain();
          } else if (e.key === 'Escape') {
            e.preventDefault(); 
            handleClose();
          }
        };
      
        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
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
          <Typography sx={{
     fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' }
              }}>
          {letter}
          </Typography>
 
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
            },withCredentials:true
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
  setcustomerTIN(selectedItem.tax_id_no)
  setcustomerAddress(selectedItem.st_address)
  setcustomerBusinessStyle(selectedItem.business_style)

  if (customerAddressRef.current) {
    customerAddressRef.current.focus();
  }
   }

   const handleKeys2 = (event:any, category:any) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); // Prevent scrolling on arrow key press
      const newIndex = selectedItemIndex + (event.key === 'ArrowDown' ? 1 : -1);

        if (newIndex >= 0 && newIndex < CustomerList.length) {
          if (CustomerListRef.current) {
            // Get the reference to the row element
            const rowElement = CustomerListRef.current.querySelector(`tr:nth-child(${newIndex + 1})`) as HTMLTableRowElement;
            // Set focus on the row element
            if (rowElement) {
              
              // Remove focus from the currently selected row if any
              const currentSelectedRow = CustomerListRef.current.querySelector('.selected');
              if (currentSelectedRow) {
                currentSelectedRow.classList.remove('selected');
              }
              // Set focus on the new row
              rowElement.classList.add('selected');
              rowElement.focus();
              // Update the selected item index after focusing on the new row
              setSelectedItemIndex(newIndex);
            }
          }
        }
      
  
    }else if (event.key === 'Enter'){

        ClickCustomerList(selectedItemIndex)
    }
  };


  const [isShowKeyboardNumeric, setisShowKeyboardNumeric] = useState<boolean>(false);
  const [isShowKeyboardNumericForCardNo, setisShowKeyboardNumericForCardNo] = useState<boolean>(false);
  const [focusedInput, setFocusedInput] = useState<any>('');
  const [focusedInput2, setFocusedInput2] = useState<any>('');
  const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);

const [isShow, setisShow] = useState<boolean>(true);
const showOnScreenKeybaord = (ref:any) => {
  if (isDesktop){
    if (isShow){
      if (ref ==='Customer'){
        setFocusedInput2(customer)
     } else if (ref ==='Address'){
      setFocusedInput2(customerAddress)
     }else if (ref ==='TIN'){
      setFocusedInput2(customerTIN)
    }else if (ref ==='BStyle'){
      setFocusedInput2(customerBusinessStyle)
    }
        
      setisShowKeyboard(true)
      setFocusedInput(ref)
    
  }
}}
const ShowKeyorNot = () => {
  setisShow(!isShow);
}
const setvalue = (value: any) => {
  if (focusedInput) {
   if (focusedInput ==='Customer'){
      setCustomer(value)
   } else if (focusedInput ==='Address'){
    setcustomerAddress(value)
   }else if (focusedInput ==='TIN'){
    setcustomerTIN(value)
  }else if (focusedInput ==='BStyle'){
    setcustomerBusinessStyle(value)
  }
  setisShowKeyboard(false)
  setisShowKeyboardNumeric(false)
};
}
const closekeyBoard = () => {
  setisShowKeyboard(false)
  setisShowKeyboardNumeric(false)
}

  return (
    <>
   
    <div className="modal">
      <div className="modal-contentCustomerDine" style={{width:'50%', display:'flex',flexDirection:'row'}}>


      <Grid container className="CreditCard-Container" spacing={2}>

        <Grid item xs={12} md={12} style={{ height: '100%',width:'100%'}}>
          <div  className = 'Customer-DineIn' style={{width:'100%' ,  border:' 2px solid #ccc', borderRadius: '8px', padding: '10px',margin:'5px'}}>
            <h2 style={{ color: 'blue', padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
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
              <div style={{ display: 'flex', flexDirection: 'row'}}>
                <label htmlFor="input1">Customer Name:</label>
                <input ref={CustomerRef} 
                  onKeyDown={(e) =>
                      customerType === 'Walk-in'
                      ? handleKeyDown(e, CustomerRef, customerAddressRef)
                      : handleKeys(e, 'Customer')}
                    // onInput={(e: ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Customer')}
                    type="text" id="input1" placeholder="Customer" 
                    onChange={(e) => {setCustomer(e.target.value);handleSearchInputChange(e.target.value, 'Customer')}}  autoComplete="off"
                    // onClick={() => handleClick(CustomerRef)}
                    onClick={()=> customerType === 'Walk-in' ? showOnScreenKeybaord('Customer'):null}
                    // onFocus={CustomerF} 
                    value={customer} required/>

                </div>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                <label htmlFor="input3">Address:</label>
                <input ref={customerAddressRef}  onKeyDown={(e) => handleKeyDown(e, customerAddressRef, customerTINRef)}  id="input3" type = "text"  placeholder="Address" 
                  onChange={(e) => setcustomerAddress(e.target.value)} autoComplete="off"
                  // onFocus={AddressF}
                  onClick={()=> showOnScreenKeybaord('Address')}
                  value={customerAddress}
                  // onClick={() => handleClick(customerAddressRef)}
                  required />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                <label htmlFor="input4">TIN:</label>
                <input  ref={customerTINRef} type="text" id="input4" placeholder="Tax Identification"  
                  onChange={(e) => setcustomerTIN(e.target.value)} autoComplete="off" value={customerTIN}
                  // onFocus={TINF}
                  onClick={()=> showOnScreenKeybaord('TIN')}
                  onKeyDown={(e) => handleKeyDown(e, customerTINRef, customerBusinessStyleRef)}
                  // onClick={() => handleClick(customerTINRef)}
                  required/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
              <label htmlFor="input4">Business Style:</label>
                <input  ref={customerBusinessStyleRef} type="text" id="input45" placeholder="Business Style"  
                  onChange={(e) => setcustomerBusinessStyle(e.target.value)} autoComplete="off" value={customerBusinessStyle}
                  // onFocus={BusinessStyleF}
                  onClick={()=> showOnScreenKeybaord('BStyle')}
                  onKeyDown={(e) => handleKeyDown(e, customerTINRef, customerBusinessStyleRef)}
                  // onClick={() => handleClick(customerBusinessStyleRef)}

                  required/>
              </div>


              {/* Command buttons */}
              <div style={{display:'flex'}} >
                <button  ref={SaveRef} onClick={sendDataToMain} className='button-ok' style={{width:'100%',margin:'5px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>SAVE</button>
                <button  onClick={handleClose} className='button-CLOSE' style={{width:'100%',margin:'5px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>CLOSE</button>
              </div>
          </div>
      </Grid>


    {/* <Grid item xs={12} md={9} style={{ height: '100%',width:'100%'}}>
      <div className='keyboardScreen'>
        {rows}
        <button className="num-pad-key" style={{width:'98%',margin:'8px 10px'}} onClick={() => handleButtonClick(' ')}>SPACE</button>
      </div>
    </Grid> */}
  </Grid>



  {CustomerListModal && (
                       
                
                       <div className='modal'>
                         <div className='modal-content-waiter'>
                   
                           <div className='card'>
                             <h1>Select Customer</h1>
                           <div className='Waiterlist-Container'>
                           <input
                               ref={CustomerSearchRef}
                               value={CustomerSearch}
                               onChange={(e) => setCustomerSearch(e.target.value)}
                               onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Customer')}
                               onKeyDown={(e) => handleKeys2(e, 'Customer')}
                             />
                             <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Customer')} ref={CustomerListRef}>
                               <thead>
                                 <tr>
                                   <th>Customer ID</th>
                                   <th>Customer Name</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {CustomerList && CustomerList.map((result, index) => (
                                   <tr
                                     key={index}
                                     className={selectedItemIndex === index ? 'selected' : ''}
                                     onClick={() => ClickCustomerList(index)}
                                     tabIndex={0}
                   
                                     style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                   color:selectedItemIndex === index ? 'white':'black', }}
                                   >
                                     <td>{result.id_code.padStart(4,'0')}</td>
                                     <td>{result.trade_name}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </Table>

                               </div>
                           </div>
                           <div className='Button-Container'>
                                <button onClick={() => setCustomerListModal(false)}>Close</button>
                            </div>
                         </div>
                   
                      </div>
)}


    </div>
    
    </div>
      {isShowKeyboard && < OnScreenKeyboard handleclose = {closekeyBoard} currentv={[focusedInput2]} setvalue={setvalue}/>}
      {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}  currentv={[focusedInput2]} setvalue={setvalue}/>}
 
    </>
  );
};

export default CustomerPayment;
