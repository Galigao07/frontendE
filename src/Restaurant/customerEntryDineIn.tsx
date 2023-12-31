/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import React, { useState,useEffect, useRef } from 'react';
import './customerEntryDineIn.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import BASE_URL from '../config';
import './keyboard.css'

import '@fortawesome/fontawesome-free/css/all.min.css';
import { isDesktop, isMobile,isTablet } from 'react-device-detect';



interface CustomerDineInData {
  handleclose: () => void;
  typeandtable: any;
  handlemodaldata: any;
}




const CustomerDineIn: React.FC<CustomerDineInData> = ({ handleclose, typeandtable, handlemodaldata }) => {
  // Your co


  interface Customer {
    id_code : string;
    trade_name: string; // Assuming trade_name is a property in your Customer type
    // Other properties...
  }

  interface Waiter {
    waiter_id : string;
    waiter_name: string; // Assuming trade_name is a property in your Customer type
    // Other properties...
  }
  
  

    const [customer, setCustomer] = useState<string>('');
    const [guestCount, setGuestCount] = useState<any>('');
    const [waiter, setWaiter] = useState<string>('');
    const [waiterID, setWaiterID] = useState<string>('');
    const [customerType, setcustomerType] = useState<string>('Walk-in')
    const [WaiterListModal, setWaiterListModal] = useState<boolean>(false);
    const [CustomerListModal, setCustomerListModal] = useState<boolean>(false);

    const [WaiterList, setWaiterList] = useState<Waiter[]>([]);
    
    const [CustomerList, setCustomerList] = useState<Customer[]>([]);
    
    const CustomerRef = useRef<HTMLInputElement>(null)
    const GuestCountRef = useRef<HTMLInputElement>(null)
    const WaiterRef = useRef<HTMLInputElement>(null)
    const WaiterListRef = useRef<HTMLUListElement>(null)

    const CustomerListRef = useRef<HTMLUListElement>(null)
    const [isTextHighlighted, setIsTextHighlighted] = useState<boolean>(false);
  const [customerFocus, setCustomerFocus] = useState<boolean>(false);
  const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);
  const [waiterFocus, setWaiterFocus] =useState<boolean>(false);

  const [selectionStart , setselectionStart] = useState<any>(0);
  const [selectionEnd , setselectionEnd] = useState<any>(0);
    const [selectedOption, setSelectedOption] = useState<string>('option2'); // Initialize the selected option
    const [cursorPosition, setCursorPosition] = useState<any>(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(0);


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
    const fetchData = async () => {


    const tableNo = typeandtable.tableNo; // Accessing TableNo
  
      if (tableNo !== null) {
        try {
          const orderViewResponse = await axios.get(`${BASE_URL}/api/order/view/`, {
            params: {
              tableNo :tableNo
            }
        });

        if (orderViewResponse.data && Array.isArray(orderViewResponse.data) && orderViewResponse.data.length > 0) {
          const customer = orderViewResponse.data[0]; // Accessing the first object in the array
          // Accessing individual properties of the first object
          if (customer && typeof customer === 'object') {
            setGuestCount(customer.guest_count);
            setCustomer(customer.customer_name);
        
            const timeoutId = setTimeout(() => {
              if (WaiterRef.current) {
                WaiterRef.current.focus();
              }
            }, 100);
        
            return () => {
              clearTimeout(timeoutId);
            };
          }
        } 
    


      
        // Cleanup function to clear the timeout

        } catch (error: any) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server responded with a non-2xx status:', error.response.data);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something else happened while setting up the request
                console.error('Error setting up the request:', error.message);
            }
        }
      }

    };
    fetchData();
      }, []);


    
       const handleKeyDown = (event :any, currentRef : any, nextRef:any) => {
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
  if (customer === '' || guestCount === '' || waiter === '' || waiterID === '') {
        Swal.fire({
          title: 'Fields Required',
          text: 'Please fill up the fields',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      
        // Delay focus after the Swal dialog is displayed
        setTimeout(() => {
          if (CustomerRef.current) {
            CustomerRef.current.focus();
          }
        }, 500); // Increased duration to 500 milliseconds (0.5 seconds) for the dialog to display first
      }else {
        handlemodaldata({
            Customer: customer,
            GuestCount: guestCount,
            Waiter: waiter,
            PaymentType:'Sales Order',
            waiterID:waiterID
          });
          
      }
    
   

  };


  
  const sendDataToMainOrderAndPay = () => {

    if (customer === '' && guestCount === '' && waiter === ''|| waiterID === '') {
        Swal.fire({
          title: 'Fields Required',
          text: 'Please fill up the fields or Select Waiter',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      
        // Delay focus after the Swal dialog is displayed
        setTimeout(() => {
          if (CustomerRef.current) {
            CustomerRef.current.focus();
          }
        }, 500); // Increased duration to 500 milliseconds (0.5 seconds) for the dialog to display first
      }else {
    handlemodaldata({
        Customer: customer,
        GuestCount: guestCount,
        Waiter: waiter,
        PaymentType:'Order and Pay',
        waiterID:waiterID,

      });
    }

  };

  const CustomerF = () => {
    setCustomerFocus(true)
    setGuestCountFocus(false)
    setWaiterFocus(false)
  }

  const WaiterF = () => {
    setWaiterFocus(true)

    setGuestCountFocus(false)
    setCustomerFocus(false)
  }

  const GuestCountF = () => {
    setGuestCountFocus(true)
    setWaiterFocus(false)
    setCustomerFocus(false)
  }


  const handleButtonClick = (value :string) => {
    if (guestCountFocus) {
      const { updatedValue } = updateDataAtCursorPosition(guestCount, value);
      setGuestCount(updatedValue);
    } else if (customerFocus) {
      // const updatedValue = updateDataAtCursorPosition(customer, value);
      // setCustomer(updatedValue);
      const { updatedValue } = updateDataAtCursorPosition(customer, value);
      setCustomer(updatedValue);
      fetchCustomer(updatedValue);

    } else if (waiterFocus) {
      const { updatedValue } = updateDataAtCursorPosition(waiter, value);
      setWaiter(updatedValue);

      fetchWaiter(updatedValue);
    }
  };

  const updateDataAtCursorPosition = (prevValue:string, newValue:any) => {
    // Ensure prevValue is a string before using slice
    const stringValue = String(prevValue);

    const part1 = stringValue.slice(0, cursorPosition);
    const part2 = stringValue.slice(cursorPosition);
    let newCursorPosition = 0
    let updatedValue =''
    if (guestCountFocus) {
      // Check if the newValue is numeric
      if (!isNaN(newValue)) {
          updatedValue =''
      } else {
          // If not numeric, retain the previous value
          updatedValue = prevValue;
          newCursorPosition = prevValue.length;
          return { updatedValue, newCursorPosition };
      }
  } else {
      // For other cases when not in guestCount focus
      updatedValue = ''; // Assigning newValue directly without further checks
  }

    if (stringValue.length === 1) {
        updatedValue = part1 + newValue;
         newCursorPosition = part1.length  + newValue.length;
         setCursorPosition(newCursorPosition)
    }

    else {
      if (isTextHighlighted) {
        // If text is highlighted, determine which part is highlighted (part1 or part2)
        const highlightedStart = part1.length;
        const highlightedEnd = highlightedStart + newValue.length;
      
        if (highlightedStart <= selectionStart && selectionStart <= highlightedEnd) {
          // Replace the highlighted text in part1 with newValue

          updatedValue =part1 +  newValue ;
          newCursorPosition = newValue.length;
        } else {
          // Replace the highlighted text in part2 with newValue
          updatedValue = newValue + part2.substring(selectionEnd);
          newCursorPosition = part1.length + newValue.length;
        }
      }
     
      else {
        updatedValue = part1 + newValue + part2
      }
        newCursorPosition =  part1.length + newValue.length ;
        setCursorPosition(newCursorPosition)
    }

    setselectionStart(0);
    setselectionEnd(0);
    setIsTextHighlighted(false)
    return { updatedValue, newCursorPosition };
  };
  


  const checkSelection = (ref:any) => {
    if (ref.current) {
      const currentSelectionStart = ref.current.selectionStart;
      const currentSelectionEnd = ref.current.selectionEnd;
  
      setselectionStart(currentSelectionStart);
      setselectionEnd(currentSelectionEnd);
  
      const isRightToLeft = currentSelectionStart > currentSelectionEnd;
      const isLeftToRight = currentSelectionEnd > currentSelectionStart;
  
      if (isRightToLeft) {
        console.log('Selection direction: right to left');
      } else if (isLeftToRight) {
        console.log('Selection direction: left to right');
      } else {
        console.log('No selection or unknown direction');
      }
  
      setIsTextHighlighted(currentSelectionStart !== currentSelectionEnd);
    }
  };

  const handleClick = (ref:any) => {
    if (ref.current) {
      const currentPosition = ref.current.selectionStart || '';
      setCursorPosition(currentPosition);
    }
  };

  const handleClear = () => {
    // Detect the clear action and handle it accordingly
    if (guestCountFocus) {
      setGuestCount(0);
      setCursorPosition(0);
    } else if (customerFocus) {
      setCustomer('');
      setCursorPosition(0);
    } else if (waiterFocus) {
      setWaiter('');
      setCursorPosition(0);
    }
  };

 const handleCustomerTypeRegular = () => {

  setSelectedOption('option1')
  setcustomerType('Regular')
 }

const handleCustomerTypeWalkIN = () => {
  setSelectedOption('option2')
  setcustomerType('Walk-in')
 }

  const handleBackspace = () => {
    // Detect backspace press and handle it accordingly
    if (guestCountFocus && cursorPosition > 0) {
      const updatedValue =
        guestCount.slice(0, cursorPosition - 1) + guestCount.slice(cursorPosition);
      setGuestCount(updatedValue);
      setCursorPosition(cursorPosition - 1);
    } else if (customerFocus && cursorPosition > 0) {
      const updatedValue =
        customer.slice(0, cursorPosition - 1) + customer.slice(cursorPosition);
      setCustomer(updatedValue);
      setCursorPosition(cursorPosition - 1);
    } else if (waiterFocus && cursorPosition > 0) {
      const updatedValue =
        waiter.slice(0, cursorPosition - 1) + waiter.slice(cursorPosition);
      setWaiter(updatedValue);
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


  const handleSpecialButtonClick = (value:any) => {
    switch (value) {
      case 'Enter':
        if (guestCountFocus) {
          handleKeyDown('Enter', GuestCountRef, WaiterRef);
        } else if (customerFocus) {
          handleKeyDown('Enter', CustomerRef, GuestCountRef);
        } else if (waiterFocus) {
          handleKeyDown('Enter', WaiterRef, CustomerRef);
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
  
 // ********************************* FOR  KEY EVENTS***************************************
    // ****************************************************************************************
    
    const handleKeys = (event :any,  inputIdentifier :any) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();
        
        if (inputIdentifier === 'Customer') {
          const listItems = CustomerListRef.current?.querySelectorAll('li');
          const currentIndex = Array.from(listItems || []).findIndex((item) => item === selectedItemIndex);
          let nextIndex: number | undefined;
        
          if (event.key === 'ArrowUp') {
            nextIndex = currentIndex !== undefined ? currentIndex - 1 : undefined;
          } else if (event.key === 'ArrowDown') {
            nextIndex = currentIndex !== undefined ? currentIndex + 1 : undefined;
          }
        
          if (nextIndex !== undefined && listItems && nextIndex >= 0 && nextIndex < listItems.length) {
            const prevSelectedItem = document.querySelector('.ul-list .selected');
            if (prevSelectedItem) {
              prevSelectedItem.classList.remove('selected');
            }
        
            const nextListItem = listItems[nextIndex] as HTMLElement;
            if (nextListItem) {
              nextListItem.focus();
        
              setSelectedItemIndex(nextListItem);
              setCustomer(nextListItem.innerText); // Update customer state with the text content
        
              // Add the 'selected' class to the newly selected item
              nextListItem.classList.add('selected');
            }
          }
        }
        

        if (inputIdentifier === 'Waiter') {
          const listItems = WaiterListRef.current?.querySelectorAll('li');
          const currentIndex = Array.from(listItems || []).findIndex((item) => item === selectedItemIndex);
          let nextIndex: number | undefined;
        
          if (event.key === 'ArrowUp') {
            nextIndex = currentIndex !== undefined ? currentIndex - 1 : undefined;
          } else if (event.key === 'ArrowDown') {
            nextIndex = currentIndex !== undefined ? currentIndex + 1 : undefined;
          }
        
          if (nextIndex !== undefined && listItems && nextIndex >= 0 && nextIndex < listItems.length) {
            const prevSelectedItem = document.querySelector('.ul-list .selected');
            if (prevSelectedItem) {
              prevSelectedItem.classList.remove('selected');
            }
        
            const nextListItem = listItems[nextIndex] as HTMLElement;
            if (nextListItem) {
              nextListItem.focus();
        
              setSelectedItemIndex(nextListItem);
              const waiterName = nextListItem.innerText; // Get waiter's name from the text content
        
              setWaiter(waiterName); // Update waiter state with the name
        
              // Add the 'selected' class to the newly selected item
              nextListItem.classList.add('selected');
            }
          }
        }
        
      }

      
      if (event.key === 'Enter') {

        if (inputIdentifier === 'Customer') {
          const listItems = CustomerListRef.current?.querySelectorAll('li');
          const currentIndex = Array.from(listItems || []).findIndex((item) => item === selectedItemIndex);
          ClickCustomerList(currentIndex);


        }

        if (inputIdentifier === 'Waiter') {
          const listItems = WaiterListRef.current?.querySelectorAll('li');
          const currentIndex = Array.from(listItems || []).findIndex((item) => item === selectedItemIndex);
          ClickWaiterList(currentIndex);
       
        }

      }


    };
    
    const handleSearchInputChange = async (e:any, inputIdentifier :any) => {
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
                          if (inputIdentifier === 'Waiter') {

                  
                            const result = await axios.get(`${BASE_URL}/api/waiter-list/`,{
                              params: {
                                waiter:e
                              }
                            }); 
                            
                            if (result) {
                                setWaiterList(result.data.waiter);
                                setWaiterListModal(true);
                            }}
                          
                        }  catch (error) {
                            console.error(error);
                            }
     }


     const fetchCustomer = async (customer : any) => {
      if (customerType === 'Walk-in') {
        return;
      }
    
      try {
        const result = await axios.get(`${BASE_URL}/api/customer-list/`, {
          params: {
            customer: customer // Assuming 'e' is defined elsewhere
          }
        });
    
        if (result && result.data && result.data.customers) {
          setCustomerList(result.data.customers);
          setCustomerListModal(true);
        }
      } catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    }
    
    
    
    const fetchWaiter = async (waiter :any) => {
      
      try {
    
        const result = await axios.get(`${BASE_URL}/api/waiter-list/`,{
          params: {
            waiter:waiter
          }
        }); 
        
        if (result) {
            setWaiterList(result.data.waiter);
            setWaiterListModal(true);
        }} catch (error) {
        // Handle errors here
        console.error('Error fetching data:', error);
      }
    }

    const ClickCustomerList = (index: number): void => {
      setCustomerListModal(false);
      const selectedItem = CustomerList[index];
      setCustomer(selectedItem.trade_name);
    
      if (GuestCountRef.current) {
        const guestCountRef = GuestCountRef.current as HTMLInputElement | null;
        if (guestCountRef) {
          guestCountRef.focus();
        }
      }
    };
    

 const ClickWaiterList = (index :any) => {
setWaiterListModal(false)
const selectedItem = WaiterList[index];
setWaiter(selectedItem.waiter_name)
setWaiterID(selectedItem.waiter_id)
if (WaiterRef.current) {
  WaiterRef.current.focus();
}


 }


 const [deviceType, setDeviceType] = useState<string>('');

 useEffect(() => {
   const checkDeviceType = () => {
     if (isMobile) {
       setDeviceType('Mobile');
     } else if (isTablet) {
       setDeviceType('Tablet');
     } else {
       setDeviceType('Desktop');
     }
   };
 
   checkDeviceType();
 
   const handleResize = () => {
     checkDeviceType();
   };
 
   window.addEventListener('resize', handleResize);
 
   return () => {
     window.removeEventListener('resize', handleResize);
   };
 }, []);
 

  return (
    <div className="modal">
      <div className="modal-contentCustomerDine" style={{width:'100%', display:'flex',flexDirection:'row'}}>

    <div style={{width:'100%',height:'100%' ,  border:' 2px solid #ccc', borderRadius: '8px', padding: '10px',margin:'5px'}}>
      <h2 style={{ color: '#007bff', padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
      borderRadius: '5px', margin: '10px', fontWeight: 'bold', textAlign: 'center', border:'solid' }}
      >Sales Order  {typeandtable.OrderType} </h2>
      <div className="customer-type">
        <span className="customer-type-label">Customer Type:</span>
        <div className="button-group">
          <button className={selectedOption === 'option1' ? 'radio-button checked blinking' : 'radio-button'}id="option1"onClick={() => handleCustomerTypeRegular()}>Regular</button>
          <button className={selectedOption === 'option2' ? 'radio-button checked blinking' : 'radio-button'}id="option2"onClick={() => handleCustomerTypeWalkIN()}>Walk-In </button>
        </div>
      </div>

        {/* Input fields */}
        <div style={{ display: 'flex', flexDirection: 'column'}}>
        <div style={{display:'flex',flexDirection:'column'}}>
              <label htmlFor="input1">Customer Name:</label>
              <input ref={CustomerRef} 
              onKeyDown={(e) =>
                customerType === 'Walk-in'
                  ? handleKeyDown(e, CustomerRef, GuestCountRef)
                  : handleKeys(e, 'Customer')
              }
                disabled={typeandtable.OrderType === 'ADD ORDER'}
                onChange={(e) => setCustomer(e.target.value)}  autoComplete="off"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Customer')}
                onClick={() => handleClick(CustomerRef)}
                onFocus={CustomerF} 

                onMouseUp={() => checkSelection(CustomerRef)}
                // onKeyUp={() => checkSelection(CustomerRef)}
                value={customer} required/>

                  {CustomerListModal && (
                    <div className='Customerlist-Container' onKeyDown={(event) => handleKeys(event, 'customer')} >
                    <ul id="list" className='ul-list customer'   onKeyDown={(event) => handleKeys(event, 'customer')}  ref={CustomerListRef}>
                      {CustomerList.map((result,index) => (
                        <li tabIndex={0} key={index}
                        onKeyDown={(event) => handleKeys(event, 'Customer')}
                          onClick={() => ClickCustomerList(index)}
                        >{result.id_code.padStart(4, '0')} - {result.trade_name}</li>
                            ))}
                          </ul>
                          </div>
                        )}
          </div>
          
          <div style={{display:'flex',flexDirection:'column'}}>
          <label htmlFor="input2">Table Number</label>
          <input   type="text" id="input2" placeholder="Table No" readOnly  value={typeandtable.tableNo}/>
        </div>

        <div style={{display:'flex',flexDirection:'column'}}>
            <label htmlFor="input3">Guest Count:</label>
            <input ref={GuestCountRef}  onKeyDown={(e) => handleKeyDown(e, GuestCountRef, WaiterRef)}  id="input3" type = "number"  placeholder="Guest Count" 
              disabled={typeandtable.OrderType === 'ADD ORDER'}
              onChange={(e) => setGuestCount(e.target.value)} autoComplete="off"
              onFocus={GuestCountF}
          
              value={guestCount}
              onClick={() => handleClick(GuestCountRef)}
              // onClick={handleClick}
              required />
        </div>
        
        <div style={{display:'flex',flexDirection:'column'}}>
        <label htmlFor="input4">Waiter:</label>
                  <input  ref={WaiterRef} type="text" id="input4" placeholder="Select Waiter"  
                    onChange={(e) => setWaiter(e.target.value)} autoComplete="off" 
                    value={waiter}
                    onFocus={WaiterF}
                    onKeyDown={(e) =>handleKeys(e, 'Waiter')}
                    onInput={(e: React.ChangeEvent<HTMLInputElement>)=> handleSearchInputChange(e.target.value, 'Waiter')}
                    onClick={() => handleClick(WaiterRef)}
                    required/>
                    {WaiterListModal && (
                        <div className='Waiterlist-Container'>
                        <ul id="list" className='ul-list Waiter' onKeyDown={(event) => handleKeys(event, 'Waiter')}  ref={WaiterListRef}>
                          {WaiterList.map((result,index) => (
                            <li tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''}
                            onKeyDown={(event) => handleKeys(event, 'Waiter')} 
                            onClick={() => ClickWaiterList(index)}
                            >{result.waiter_id} - {result.waiter_name}</li>
                                ))}
                              </ul>
                              </div>
              )}
        </div>


        </div>


        {/* Command buttons */}
        <div style={{display:'flex',flexDirection:'row'}} >
          {isDesktop && (   
          <button onClick={sendDataToMainOrderAndPay}    disabled={typeandtable.OrderType === 'ADD ORDER'} className='button-ok' style={{width:'100%',margin:'5px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>Order and Pay</button>
    )}
             
          <button onClick={sendDataToMain} className='button-ok' style={{width:'100%',margin:'5px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}>Save Sales Order</button>
        
        </div>
        <button type="submit" className ='button-cancel' onClick={handleclose}>Exit</button>
    </div>

 
{isDesktop && (
   <div className='keyboardScreen'>
   {rows}
   <button className="num-pad-key" style={{width:'95%',margin:'8px 10px'}} onClick={() => handleButtonClick(' ')}>SPACE</button>
 </div>
)}


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

export default CustomerDineIn;
