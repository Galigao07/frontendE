/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import React, { useState,useEffect, useRef } from 'react';
import './css/customerEntryDineIn.css';
// import './css/customerEntryDineIn.css';
import Swal from 'sweetalert2';
import axios from 'axios';
import {BASE_URL} from '../config';
import './css/keyboard.css'
import OnScreenKeyboard from './KeyboardGlobal';

import '@fortawesome/fontawesome-free/css/all.min.css';
import { isDesktop,isMobile,isTablet} from 'react-device-detect';
import {  Button, Grid, Table, Typography } from '@mui/material';
import OnScreenKeyboardNumeric from './KeyboardNumericGlobal';
import OnScreenKeyboardNumericForCardNo from './KeyboardForCardNo';
import showInfoAlert from '../SwalMessage/ShowInfoAlert';
import showErrorAlert from '../SwalMessage/ShowErrorAlert';
import { set } from 'date-fns';



interface CustomerDineInData {
  handleclose: () => void;
  typeandtable: any;
  handlemodaldata: any;
  isDineIn:any;
}




const CustomerDineIn: React.FC<CustomerDineInData> = ({ handleclose, typeandtable, handlemodaldata ,isDineIn}) => {
  // Your co

  const userRank = localStorage.getItem('UserRank');
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
  
  
    const [QueNoList, setQueNoList] = useState<any>(typeandtable.QueNoList || []);

    const [customer, setCustomer] = useState<string>('');
    const [guestCount, setGuestCount] = useState<string>('');
    const [waiter, setWaiter] = useState<string>('');
    const [waiterID, setWaiterID] = useState<string>('');
    const [customerType, setcustomerType] = useState<string>('Walk-in')
    const [WaiterListModal, setWaiterListModal] = useState<boolean>(false);
    const [CustomerListModal, setCustomerListModal] = useState<boolean>(false);

    const [QueNo, setQueNo] = useState<any>('0');

    const [WaiterList, setWaiterList] = useState<Waiter[]>([]);
    const [CustomerList, setCustomerList] = useState<Customer[]>([]);
    const [TmpWaiterList, setTmpWaiterList] = useState<Waiter[]>([]);
    const [TmpCustomerList, setTmpCustomerList] = useState<Customer[]>([]);

    const QueNoRef = useRef<HTMLInputElement>(null)
    const CustomerRef = useRef<HTMLInputElement>(null)
    const GuestCountRef = useRef<HTMLInputElement>(null)
    const WaiterRef = useRef<HTMLInputElement>(null)
    const WaiterListRef = useRef<HTMLTableElement>(null)
    const SaveBtnRef = useRef<HTMLButtonElement>(null)
    const PaymentSaveBtnRef = useRef<HTMLButtonElement>(null)
    const CloseBtnRef = useRef<HTMLButtonElement>(null)

    const CustomerListRef = useRef<HTMLTableElement>(null)
    const [isTextHighlighted, setIsTextHighlighted] = useState<boolean>(false);
    const [customerFocus, setCustomerFocus] = useState<boolean>(false);
    const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);
    const [waiterFocus, setWaiterFocus] =useState<boolean>(false);
    const [isShowKeyboardNumeric, setisShowKeyboardNumeric] = useState<boolean>(false);
    const [isShowKeyboardNumericForCardNo, setisShowKeyboardNumericForCardNo] = useState<boolean>(false);
    const [selectionStart , setselectionStart] = useState<any>(0);
    const [selectionEnd , setselectionEnd] = useState<any>(0);
    const [selectedOption, setSelectedOption] = useState<string>('option2'); // Initialize the selected option
    const [cursorPosition, setCursorPosition] = useState<any>(0);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(0);
    const [WaiterSearch, setWaiterSearch] = useState<any>('');
    const WaiterSearchRef = useRef<HTMLInputElement>(null)
    const CustomerSearchRef = useRef<HTMLInputElement>(null)
    const [CustomerSearch, setCustomerSearch] = useState<any>('');

    useEffect(() => {
        const timeoutId = setTimeout(() => {
          if (CustomerRef.current) {
            CustomerRef.current.focus();
          }
        }, 100);

        return () => {
          clearTimeout(timeoutId);
        };
      }, []);



      useEffect(() => {
              const fetchData = async () => {
                const tableNo = typeandtable.tableNo; // Accessing TableNo
            
                if (tableNo) {
                  try {
                    const orderViewResponse = await axios.get(`${BASE_URL}/api/order/view/`, {
                      params: {
                        tableNo :tableNo
                      },withCredentials:true
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
          LoadCustomer();
          LoadWaiter();
          fecthQueList();
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
            if (WaiterListRef.current || CustomerListRef) { 
              setCustomerListModal(false);
              setWaiterListModal(false);
            }
            else{
            handleclose();
          }   
        }  
        };
      
        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
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
  if ((!isDineIn && QueNo === '0') || QueNo === ''  ) {
    showInfoAlert('Please select Que No..!');
    return;

  }
  if (customer === '' || guestCount === '' || waiter === '' || waiterID === '') {
    if (guestCount === ''){
      Swal.fire({
        title: 'Fields Required',
        text: 'Please add guest count..!',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }else{
      Swal.fire({
        title: 'Fields Required',
        text: 'Please fill up the fields or Select Waiter..!',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }
      
        // Delay focus after the Swal dialog is displayed
        setTimeout(() => {
          if (CustomerRef.current) {
            CustomerRef.current.focus();
          }
        }, 500); // Increased duration to 500 milliseconds (0.5 seconds) for the dialog to display first
      }else {
      if  (isDesktop) {
        handlemodaldata({
          Customer: customer,
          GuestCount: guestCount,
          Waiter: waiter,
          PaymentType:'Sales Order',
          waiterID:waiterID,
          QueNO:QueNo
        });
      } else {
        handlemodaldata({
          Customer: customer,
          GuestCount: guestCount,
          Waiter: waiter,
          PaymentType:'Order And Pay',
          waiterID:waiterID,
          QueNO:QueNo,
        });
      }

          
      }
    
   

  };


  
  const sendDataToMainOrderAndPay = () => {

    if (customer === '' || waiter === ''|| waiterID === '' ||  guestCount === '' ) {

      if (guestCount === ''){
        Swal.fire({
          title: 'Fields Required',
          text: 'Please add guest count..!',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }else{
        Swal.fire({
          title: 'Fields Required',
          text: 'Please fill up the fields or Select Waiter..!',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      }

      
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
        QueNO:QueNo,

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
      setCustomerSearch('')
      if (CustomerSearchRef.current){
        CustomerSearchRef.current.focus()
      }

    } else if (waiterFocus) {
      const { updatedValue } = updateDataAtCursorPosition(waiter, value);
      setWaiter(updatedValue);
      setWaiterSearch('')

      fetchWaiter(updatedValue);
      setTimeout(() => {
        if (WaiterSearchRef.current){
          WaiterSearchRef.current.focus()
        }
      }, 200);

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



 const handleCustomerTypeRegular = () => {

  setSelectedOption('option1')
  setcustomerType('Regular')

  CustomerRef.current?.focus()
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
  const handleClear = () => {
    // Detect the clear action and handle it accordingly
    if (guestCountFocus) {
      setGuestCount('');
      setCursorPosition(0);
    } else if (customerFocus) {
      setCustomer('');
      setCursorPosition(0);
    } else if (waiterFocus) {
      setWaiter('');
      setCursorPosition(0);
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
          if (SaveBtnRef.current) {
            event.preventDefault();
            SaveBtnRef.current.focus()
          }
         
       
        }

      }
    };
    

  const LoadCustomer = async() =>{
    try{
         const result = await axios.get(`${BASE_URL}/api/customer-list/`,{withCredentials:true}); 
                if (result) {
                  setCustomerList(result.data.customers);
                  setTmpCustomerList(result.data.customers);
     
                 }
    }catch{
          Swal.fire({
            icon:'error',
            title:'Failed',
            text:'Failed request',
            timer:2000
          })
    }
  }

  const LoadWaiter = async() =>{
    try{
      const result = await axios.get(`${BASE_URL}/api/waiter-list/`,{withCredentials:true }); 
        if (result) {
            setWaiterList(result.data.waiter);
            setTmpWaiterList(result.data.waiter);
              if(WaiterListRef.current){
                WaiterListRef.current.focus()}
                }
    }catch(error){
      Swal.fire({
        icon:'error',
        title:'Failed',
        text:'Failed request',
        timer:2000
      })
    }
  }

   const handleSearchInputChange = async (e:any, inputIdentifier :any) => {
      if (inputIdentifier === 'Customer') {

        if (customerType==='Walk-in'){
                 return;
        }

        const check_list:any = TmpCustomerList.filter(item => item.trade_name.toLocaleLowerCase().includes(e.toLocaleLowerCase()))

        if (check_list.length >0){
          setCustomerList(check_list)
        }else{
          setCustomerList(TmpCustomerList)
        }
        setCustomerListModal(true)
   }else if (inputIdentifier==='Waiter'){
    
        const check_list:any = TmpWaiterList.filter(item => item.waiter_name.toLocaleLowerCase().includes(e.toLocaleLowerCase()))

        if (check_list.length > 0){
          setWaiterList(check_list)
        }else{
          setWaiterList(TmpWaiterList)
        }
        setWaiterListModal(true)
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
          },withCredentials:true
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
          },withCredentials:true
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
    setTimeout(() => {
      if (SaveBtnRef.current) {
        SaveBtnRef.current.focus();
        SaveBtnRef.current.style.backgroundColor = 'darkblue'
      }
    }, 100);
 }

 
 const handleKeys2 = (event:any, category:any) => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault(); // Prevent scrolling on arrow key press
    const newIndex = selectedItemIndex + (event.key === 'ArrowDown' ? 1 : -1);

    if (category === 'Waiter'){
      if (newIndex >= 0 && newIndex < WaiterList.length) {
        if (WaiterListRef.current) {
          // Get the reference to the row element
          const rowElement = WaiterListRef.current.querySelector(`tr:nth-child(${newIndex + 1})`) as HTMLTableRowElement;
          // Set focus on the row element
          if (rowElement) {
            
            // Remove focus from the currently selected row if any
            const currentSelectedRow = WaiterListRef.current.querySelector('.selected');
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
    }else{
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
    }

  }else if (event.key === 'Enter'){
    if (category==='Waiter') {
      ClickWaiterList(selectedItemIndex)
    }else{
      ClickCustomerList(selectedItemIndex)
    }

  }
};


const [isFocus,setisFocus] = useState<any>(0)
const SelectButtonHandleKeydown =  async(event:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) => {
  event.preventDefault();
  if (event.key == 'ArrowRight' || event.key == 'ArrowDown') {
      NextRef.current.focus();
      NextRef.current.style.backgroundColor = 'darkblue';
      CurrentRef.current.style.backgroundColor = 'blue';
      if (index == 1) {
        setisFocus(0)
      }else {
        setisFocus(index + 1)
      }
   

  }

  if (event.key == 'ArrowLeft' || event.key == 'ArrowUp'){
    BackRef.current.focus();
    BackRef.current.style.backgroundColor = 'darkblue';
    CurrentRef.current.style.backgroundColor = 'blue';
    setisFocus(index - 1)

}

if (event.key == 'Enter'){
   if (index == 0){
    sendDataToMainOrderAndPay();
   }
   if (index == 1){
    sendDataToMain()
   }
   if (index == 2){
    handleclose()
   }

}

}


const OpenWaiterModal = (category:any) => {

if (category==='Waiter'){
  setWaiterListModal(true);
  handleSearchInputChange('e','Waiter')
  setTimeout(() => {
    if (WaiterSearchRef.current){
      WaiterSearchRef.current.focus()
      WaiterSearchRef.current.select()
    }
  }, 500);
}else{

  if (customerType === 'Walk-in'){
    return
  }
  setCustomerListModal(true);
  handleSearchInputChange('e','Customer')
  setTimeout(() => {
    if (CustomerSearchRef.current){
      CustomerSearchRef.current.focus()
      CustomerSearchRef.current.select()
    }
  }, 500);
}




}


const [focusedInput, setFocusedInput] = useState<any>('');
const [focusedInput2, setFocusedInput2] = useState<any>('');
const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);

const [isShow, setisShow] = useState<boolean>(true);
const showOnScreenKeybaord = (ref:any) => {
  if (isDesktop){
    if (isShow){
      if (ref === 'Customer') {

        setFocusedInput2(customer)
        
      setisShowKeyboard(true)
      }else if (ref === 'QueNo') {

        setFocusedInput2(QueNo)
        setisShowKeyboardNumeric(true)
      }else if (ref === 'GuestCount') {
        setisShowKeyboardNumeric(true)
        setFocusedInput2(guestCount)
      }
   
      setFocusedInput(ref)
    }
  }
}
const ShowKeyorNot = () => {
  setisShow(!isShow);
}
const setvalue = (value: any) => {
  if (focusedInput) {
   if (focusedInput ==='Customer'){

      if (CustomerRef.current){
          setCustomer(value)

          if (GuestCountRef.current){
            GuestCountRef.current.focus()
            
          }
      }else{
        setCustomerSearch(value);
        handleSearchInputChange(value, 'Customer')
      }

   } else if (focusedInput ==='Waiter'){
       setWaiterSearch(value);
       handleSearchInputChange(value, 'Waiter')
   }else if (focusedInput ==='QueNo'){
    setQueNo(value);
  }else if (focusedInput ==='GuestCount'){
      setGuestCount(value);
   
      if (WaiterRef.current){
        
        WaiterRef.current.focus()
      }
   
 

  }
  setisShowKeyboard(false)
  setisShowKeyboardNumeric(false)
};
}
const closekeyBoard = () => {
  setisShowKeyboard(false)
  setisShowKeyboardNumeric(false)
}
 const fecthQueList = () => {
    if (QueNoList.length != 0){

    }
        const apiUrl = `${BASE_URL}/api/que-list/`; // Replace with your actual site code
        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include', // ✅ include cookies in the request
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}` // not needed if using HttpOnly cookie
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setQueNoList(data.que);
   
            // console.log('TaBLE LIST',data.que)
          })
          .catch(error => {
            console.error('There was a problem fetching the data:', error);
          });
  };

const CheckQueNoifExist = () => {
  if (!isDineIn){
    if (QueNo !== '' && QueNo !== '0'){
        const isExist = QueNoList.some((item:any) => item.q_no === parseInt(QueNo));
        if (isExist){
          setQueNo('')
          showErrorAlert('Que No already exist..!')
          setTimeout(() => {
            if (QueNoRef.current){
              QueNoRef.current.focus()
            }
          }, 500);
        }
    }}}

    useEffect(() => {
         if (QueNo !== '' && QueNo !== '0'){
      CheckQueNoifExist();}
    }, [QueNo]);
  return (
    <div>
        <div className="modal">
          <div className="modal-contentCustomerDine" style={{width: isDesktop  ? '50%':  '100%', display:'flex',flexDirection:'row'}}>

          <Grid container className="CreditCard-Container" spacing={2}>

            <Grid item xs={12} md={12} >
              <div   style={{width:'100%',height:'100%' ,  border:' 2px solid #ccc', borderRadius: '8px', padding: '10px',margin:'5px'}}>
                <h2 style={{ color: 'blue', padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
                borderRadius: '5px', margin: '10px', fontWeight: 'bold', textAlign: 'center', border:'solid',fontSize: isDesktop ? '50px' :'25px' }}
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
                  <div className= "Customer-DineIn" style={{display:'flex',flexDirection:'row'}}>
                        <label htmlFor="input1">Customer Name:</label>
                        <input ref={CustomerRef} 
                        onKeyDown={(e) =>
                          customerType === 'Walk-in'
                          ? handleKeyDown(e, CustomerRef, (isDineIn ? GuestCountRef : QueNoRef))
                            : handleKeys(e, 'Customer')
                        }
                          disabled={typeandtable.OrderType === 'ADD ORDER'}
                          onChange={(e) => setCustomer(e.target.value)}  autoComplete="off"
                          onInput={ ()=> OpenWaiterModal('Customer')}
                          onClick={() => showOnScreenKeybaord('Customer')}
                          // onFocus={CustomerF} 
                          onFocus={(event) => {
                            customerType !== 'Walk-in' ? OpenWaiterModal('Customer'):'';
                          }}
                          // onMouseUp={() => checkSelection(CustomerRef)}
                          value={customer} required/>

                    </div>
                    
                    <div className= "Customer-DineIn" style={{display:'flex',flexDirection:'row'}}>
                      {isDineIn && typeandtable.tableNo !==''? (
                        <><label>
                            Table Number
                          </label>
                            <input type="text" placeholder="0" 
                            readOnly value={typeandtable.tableNo} />
                          </>
                          ):(
                            <><label> Que No </label>
                            <input type="text" placeholder="0" pattern="[0-9]*" 
                                  value={QueNo}
                                  ref={QueNoRef}
                                    onFocus={()=> showOnScreenKeybaord('QueNo')}
                                    onChange={(e) => {
                                    const value = e.target.value;
                                    const isNumber = /^[0-9]*$/;
                                    if (isNumber.test(value)) {
                                      setQueNo(value);
                                      }
                                    }}
                            /></>
                          )}

                  </div>

                  <div className= "Customer-DineIn" style={{display:'flex',flexDirection:'row'}}>
                      <label htmlFor="input3">Guest Count:</label>
                      <input ref={GuestCountRef}  onKeyDown={(e) => handleKeyDown(e, GuestCountRef, WaiterRef)}  id="input3" 
                      type = "text"  pattern="[0-9]*"  placeholder="Guest Count" 
                        disabled={typeandtable.OrderType === 'ADD ORDER'}
                        onChange={(e) => {
                          const value = e.target.value;
                          // Regular expression to check if the input is a number
                          const isNumber = /^[0-9]*$/;
                          if (isNumber.test(value)) {
                              // If the input is a number, update the state
                              setGuestCount(value);
                          }
                      }}
                      autoComplete="off"
                        // onFocus={GuestCountF}
                        onFocus={()=> showOnScreenKeybaord('GuestCount')}
                        value={guestCount}
                        // onClick={() => handleClick(GuestCountRef)}
                        // onClick={handleClick}
                        required />
                  </div>
                  
                  <div className= "Customer-DineIn" style={{display:'flex',flexDirection:'row'}}>
                  <label htmlFor="input4">Waiter:</label>
                            <input  ref={WaiterRef} type="text" id="input4" placeholder="Select Waiter"  
                              onChange={(e) => setWaiter(e.target.value)} autoComplete="off" 
                              value={waiter}
                              onFocus={(event) => {
                                WaiterF();
                             
                              }}
                              onKeyDown={(e) =>handleKeys(e, 'Waiter')}
                              onInput={() => OpenWaiterModal('Waiter')}
                              // onInput={(e: React.ChangeEvent<HTMLInputElement>)=> handleSearchInputChange(e.target.value, 'Waiter')}
                              onClick={() => {handleClick(WaiterRef),OpenWaiterModal('Waiter')}}
                              required/>
                            
                  </div>


                  </div>


                  {/* Command buttons */}
                  <div style={{display:'flex',flexDirection:'row'}} >
                    {userRank == 'Cashier' && (   
                    <button tabIndex={0} onClick={sendDataToMainOrderAndPay} 
                    ref={PaymentSaveBtnRef}  disabled={typeandtable.OrderType === 'ADD ORDER'} 
                    className='button-ok' 
                    onKeyDown={(e) => SelectButtonHandleKeydown(e,PaymentSaveBtnRef,PaymentSaveBtnRef,SaveBtnRef,0) } 
                    style={{width:'100%',margin:'5px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}
                    >Order & Pay</button>
              )}
                    {isDineIn && typeandtable.tableNo !=='' &&
                    <button tabIndex={1} onClick={sendDataToMain} ref={SaveBtnRef} 
                      onKeyDown={(e) => SelectButtonHandleKeydown(e,PaymentSaveBtnRef,SaveBtnRef,CloseBtnRef,1) } 
                    className='button-ok' style={{width:'100%',margin:'5px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', fontWeight: 'bold' }}
                    >Save Order</button>}
                  
                  </div>
                 <div style={{display:'flex',flexDirection:'row'}} >
                    <button tabIndex={2} type="button" className ='button-cancel' ref={CloseBtnRef}
                    style={{width: "100%",margin:'5px'}}
                      onKeyDown={(e) => SelectButtonHandleKeydown(e,PaymentSaveBtnRef,CloseBtnRef,PaymentSaveBtnRef,2) } 
                      onClick={handleclose}>Exit</button></div>

                   

              </div>
            </Grid>

          {/* <Grid item xs={12} md={9} style={{ height: '100%',width:'100%'}}>

            {isDesktop && (
              <div className='keyboardScreen'>
              {rows}
              <button className="num-pad-key" style={{width:'95%',margin:'8px 10px'}} onClick={() => handleButtonClick(' ')}>SPACE</button>
            </div>
            )}

            </Grid> */}

        </Grid>

        </div>
        {WaiterListModal && (  
        <div className='modal'>
          <div className='modal-content-waiter'>

            <div className='waiter-container'>
              <div className='waiter-header'>
                <h1>Select Waiter</h1>
                <input
                ref={WaiterSearchRef}
                value={WaiterSearch}
                onChange={(e) => setWaiterSearch(e.target.value)}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Waiter')}
                onKeyDown={(e) => handleKeys2(e, 'Waiter')}
                onClick={()=> showOnScreenKeybaord('Waiter')}
              />
              </div>
             

            <div className='Waiterlist-Container'>
          
              <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Waiter')} ref={WaiterListRef}>
                <thead>
                  <tr>
                    <th>Waiter ID</th>
                    <th>Waiter Name</th>
                  </tr>
                </thead>
                <tbody>
                  {WaiterList && WaiterList.map((result:any, index) => (
                    <tr
                      key={index}
                      className={selectedItemIndex === index ? 'selected' : ''}
                      onClick={() => ClickWaiterList(index)}
                      tabIndex={0}

                      style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                      color:selectedItemIndex === index ? 'white':'black',height:'50px'}}
                    >
                      <td style={{textAlign:'center'}}>{String(result.waiter_id).padStart(4,'0')}</td>
                      <td>{result.waiter_name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
                </div>
                <div className='Button-Container'>
                  <button onClick={() => setWaiterListModal(false)}>Close</button>
                </div>
            </div>

          
          </div>

      </div>
            )}



    {CustomerListModal && (
                          
                    
                          <div className='modal'>
                            <div className='modal-content-waiter'>
                      
                              <div className='waiter-container'>
                                <div className='waiter-header'>
                                  <h1>Select Customer</h1>
                                  <input
                                  ref={CustomerSearchRef}
                                  value={CustomerSearch}
                                  onChange={(e) => setCustomerSearch(e.target.value)}
                                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Customer')}
                                  onKeyDown={(e) => handleKeys2(e, 'Customer')}
                                  onClick={()=> showOnScreenKeybaord('Customer')}
                                />
                                </div>
                                
                              <div className='Waiterlist-Container'>
                              
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
                                        color:selectedItemIndex === index ? 'white':'black',height:'50px' }}
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
        {isShowKeyboard && < OnScreenKeyboard handleclose = {closekeyBoard} currentv={[focusedInput2]} setvalue={setvalue}/>}
        {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}  currentv={focusedInput2} setvalue={setvalue}/>}
    
    </div>

  );
};


                              {/* <ul id="list" className='ul-list Waiter' onKeyDown={(event) => handleKeys(event, 'Waiter')}  ref={WaiterListRef}>
                                {WaiterList.map((result,index) => (
                                  <li tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''}
                                  onKeyDown={(event) => handleKeys(event, 'Waiter')} 
                                  onClick={() => ClickWaiterList(index)}
                                  >{result.waiter_id} - {result.waiter_name}</li>
                                      ))}
                                    </ul> */}


                                    // {CustomerListModal && (
                                    //   <div className='Customerlist-Container' onKeyDown={(event) => handleKeys(event, 'customer')} >
                                    //   <ul id="list" className='ul-list customer'   onKeyDown={(event) => handleKeys(event, 'customer')}  ref={CustomerListRef}>
                                    //     {CustomerList.map((result,index) => (
                                    //       <li tabIndex={0} key={index}
                                    //       onKeyDown={(event) => handleKeys(event, 'Customer')}
                                    //         onClick={() => ClickCustomerList(index)}
                                    //       >{result.id_code.padStart(4, '0')} - {result.trade_name}</li>
                                    //           ))}
                                    //         </ul>
                                    //         </div>
                                    // )}

export default CustomerDineIn;
