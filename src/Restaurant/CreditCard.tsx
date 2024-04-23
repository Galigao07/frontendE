/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
import './css/CreditCard.css'
import Swal from "sweetalert2";
import { Button, Grid, Table, Typography } from "@mui/material";
import axios, { toFormData } from "axios";
import BASE_URL from "../config";
import OnScreenKeyboard from "./KeyboardGlobal";
import OnScreenKeyboardNumeric from "./KeyboardNumericGlobal";
import OnScreenKeyboardNumericForCardNo from "./KeyboardForCardNo";
import { isDesktop } from "react-device-detect";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";


interface CreditCardPaymentTrans {
    handleClose:() => void;
    amountdue:any;
    CreditCardPayment:any;
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

const CreditCardPayment: React.FC<CreditCardPaymentTrans> = ({handleClose,amountdue,CreditCardPayment})=> {
    const cardNoRef = useRef<HTMLInputElement>(null);
    const acquireBankRef = useRef<HTMLInputElement>(null);
    const cardIssuerRef = useRef<HTMLInputElement>(null);
    const cardHolderRef = useRef<HTMLInputElement>(null);
    const approvalNoRef = useRef<HTMLInputElement>(null);
    const expiryMonthRef = useRef<HTMLInputElement>(null);
    const expiryYearRef = useRef<HTMLInputElement>(null);
    const AmountDueRef = useRef<HTMLInputElement>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(null);
    const [CreditCardPaymentList,setCreditCardPaymentList] = useState<any>([])
    const [BankModal,setBankModal] = useState<Boolean>(false)
    const [BankSearch,setBankSearch] = useState<string>('')
    const [CardModal,setCardModal] = useState<Boolean>(false)
    const [CardSearch,setCardSearch] = useState<string>('')
    const [CardList,setCardList] = useState<any>([])
    const [BankList,setBankList] = useState<any>([])
    const [BankList1,setBankList1] = useState<any>([])
    const [BankList2,setBankList2] = useState<any>([])
    // totalAmountDue
    const [totalAmountDue,settotalAmountDue] = useState<any>(0)

    const [indexMonths,setindexMonths] = useState<any>(null)
    const [indexYear,setindexYear] = useState<any>(null)
    const [indexMonths2,setindexMonths2] = useState<any>(null)
    const [indexYear2,setindexYear2] = useState<any>(null)

    const BankSearchRef = useRef<HTMLInputElement>(null)
    const BankListRef = useRef<HTMLTableElement>(null)
    const CardListRef = useRef<HTMLTableElement>(null)
    const CardSearchRef = useRef<HTMLInputElement>(null)
    const MonthsRef = useRef<HTMLTableElement>(null)
    const YearsRef = useRef<HTMLTableElement>(null)
    const [MonthsView,setMonthsView] = useState<boolean>(false)
    const [YearView,setYearView] = useState<boolean>(false)
    const [months, setMonths] = useState<any[]>([
      { monthNumber: "01", monthName: "January" },
      { monthNumber: "02", monthName: "February" },
      { monthNumber: "03", monthName: "March" },
      { monthNumber: "04", monthName: "April" },
      { monthNumber: "05", monthName: "May" },
      { monthNumber: "06", monthName: "June" },
      { monthNumber: "07", monthName: "July" },
      { monthNumber: "08", monthName: "August" },
      { monthNumber: "09", monthName: "September" },
      { monthNumber: "10", monthName: "October" },
      { monthNumber: "11", monthName: "November" },
      { monthNumber: "12", monthName: "December" }
  ]);
  //   const Months = {
  //     "01": "January",
  //     "02": "February",
  //     "03": "March",
  //     "04": "April",
  //     "05": "May",
  //     "06": "June",
  //     "07": "July",
  //     "08": "August",
  //     "09": "September",
  //     "10": "October",
  //     "11": "November",
  //     "12": "December"
  // };

    const [years, setYears] = useState<any[]>([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const futureYears = [];

        for (let i = 0; i <= 12; i++) {
            futureYears.push(currentYear + i);
        }

        setYears(futureYears);
    }, []);


    const [CreditCardPaymentData,setCreditCardPaymentData] = useState({
        CardNo:'',
        AcquireBank:'',
        CardIssuer:'',
        CardHolder:'',
        ApprovalNo:'',
        ExpiryMonth:'',
        ExpiryYear:'',
        AmountDue:0,
    })

    useEffect(() => {
      let amount: string = amountdue.toString().replace(',', '');

        setCreditCardPaymentData({...CreditCardPaymentData,AmountDue:parseFloat(amount)})
        settotalAmountDue(0)
        setviewSave(true)
        setTimeout(() => {
            if (cardNoRef.current){
                cardNoRef.current.focus();
                cardNoRef.current.select()
            }
        }, 100);

    },[]);
    

    useEffect(() => {
      // Perform any actions you need after CreditCardPaymentList changes
      setindexMonths(null)
      setindexMonths2(null)
      setindexYear(null)
      setindexYear2(null)
    }, [CreditCardPaymentList]);

    // const CheckIfListHaveData = async () => {
  //     if (CreditCardPaymentList.length === 0) {
  //         await setCreditCardPaymentList((prevList:any) => [...prevList, CreditCardPaymentData]);
  //     }
  //     return Promise.resolve();
  // };
  
  const SaveCreditPayment = async () => {

        swalWithBootstrapButtons.fire({
            title: 'Confirmation',
            text: "Do you want Save this transaction?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
    
            }).then(async (result) => {
            if (result.isConfirmed) {

              // 
              // CreditCardPayment([CreditCardPaymentData])

            // if (CreditCardPaymentList.length === 0) {
            //   setCreditCardPaymentList([...CreditCardPaymentList, CreditCardPaymentData]);
            //   CreditCardPayment({CreditCardPaymentList:CreditCardPaymentData})
            // }else{
            //   CreditCardPayment(CreditCardPaymentList:[{CreditCardPaymentList,CreditCardPaymentData}])
            // }
            if (CreditCardPaymentList.length === 0) {
              // If empty, add CreditCardPaymentData to the list and call CreditCardPayment with the new list
              const updatedList = [...CreditCardPaymentList, CreditCardPaymentData];
              setCreditCardPaymentList(updatedList); // Update state or variable
              CreditCardPayment({ CreditCardPaymentList: updatedList }); // Assuming you want to pass an object with a key 'CreditCardPaymentList'
            } else {
              // If not empty, just add CreditCardPaymentData to the existing list without creating a new key
              const updatedList = [...CreditCardPaymentList, CreditCardPaymentData];
              setCreditCardPaymentList(updatedList); // Update state or variable
              CreditCardPayment({ CreditCardPaymentList: updatedList }); // Maintain consistency in function calls
            }
             
            
         
                setCreditCardPaymentData({
                    CardNo:'',
                    AcquireBank:'',
                    CardIssuer:'',
                    CardHolder:'',
                    ApprovalNo:'',
                    ExpiryMonth:'',
                    ExpiryYear:'',
                    AmountDue:0,
                })
            }
            
        })
    
    }




    const handleKeyDown = (event :any, currentRef : any, nextRef:any) => {
        if (event.key === 'Enter') {
          event.preventDefault();

          if (currentRef.current.name ==='CardNo'){
            if (CreditCardPaymentData.CardNo.length !== 16){
              showErrorAlert('Please Provide Correct Card No..!')
              return;
            }
          }
          if (nextRef.current) {
            nextRef.current.focus();
            nextRef.current.select();
          }
        }

        if (event === 'Enter') {
          if (nextRef.current) {
            nextRef.current.focus();
            nextRef.current.select();
          }
        }
};


const HandleCreditCardEntry = (e:any) => {
    const { name, value } = e.target;

    if (name ==='AmountDue'){
      const isNumber = /^[0-9]*$/;
      if (isNumber.test(value)) {
        if (value === ''){
          setCreditCardPaymentData({ ...CreditCardPaymentData, [name]: 0 });
          
        }else{
          setCreditCardPaymentData({ ...CreditCardPaymentData, [name]: parseFloat(value) });
        }
          // If setQueNo input is a number, update the state

      }
    }else{
      setCreditCardPaymentData({ ...CreditCardPaymentData, [name]: value });
      
    }

if (name == 'AcquireBank') {
    setBankModal(true)
    handleSearchInputChange(value,'Bank')
    setBankSearch(value)
setTimeout(() => {
  if (BankSearchRef.current){
    BankSearchRef.current.focus()
    BankSearchRef.current.select()
  }
}, 200);
  

}else if (name == 'CardIssuer'){
    setCardModal(true)
    handleSearchInputChange(value,'Card')
    setCardSearch(value)

    setTimeout(() => {
      if (CardSearchRef.current){
        CardSearchRef.current.focus()
        CardSearchRef.current.select()
      }
    }, 200);

}

if (name == 'CardNo') {


  if (value.length >= 16) {
    e.preventDefault(); // Prevent default input behavior
  }
    const numericValue = value.replace(/\D/g, '');

    // Limit to 16 characters
    const limitedValue = numericValue.slice(0, 16);

    // Format the credit card number with dashes
    const formattedValue = limitedValue.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
      // const formattedValue = limitedValue.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '****-****-****-$4');


    // Update the state with the formatted value
    setCreditCardPaymentData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    })); 
    
   
    
}
if (name== 'ApprovalNo'){
    const numericValue = value.replace(/\D/g, '');
    setCreditCardPaymentData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
}

if (name== 'ExpiryMonth'){
    const numericValue = value.replace(/\D/g, '');
    // const limitedValue = numericValue.slice(0, 2);
    const limitedValue = Math.min(parseInt(numericValue, 10), 12);
    setCreditCardPaymentData((prevData) => ({
        ...prevData,
        [name]: limitedValue.toString().padStart(2,'0'),
      }));
}

if (name== 'ExpiryYear'){
    const numericValue = value.replace(/\D/g, '');

    const limitedValue = numericValue.slice(0, 4);
    setCreditCardPaymentData((prevData) => ({
        ...prevData,
        [name]: limitedValue,
      }));
}

}

const [errorData,seterrorData] = useState('')
const [errorView,seterrorView]= useState(false)
const validateDataAndAddToList = () => {
    if (CreditCardPaymentData.AmountDue === 0) {
        seterrorView(true)
        seterrorData('Please Provide Amount')
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }
    if (CreditCardPaymentData.AmountDue === 0) {
        seterrorView(true)
        seterrorData('Please Provide Amount More than Zero')
        // showErrorAlert('Please Provide Amount More than Zero');
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }
    if (CreditCardPaymentData.AcquireBank === '') {
        seterrorView(true)
        seterrorData('Please Provide Bank')
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }
    if (CreditCardPaymentData.CardNo === '') {
        seterrorView(true)
     seterrorData('Please Provide Card No.')
    //   showErrorAlert('Please Provide Card No.');
    setTimeout(() => {
        seterrorView(false)
        seterrorData('')
    }, 2000);
      return false;
    }
    if (CreditCardPaymentData.CardIssuer === '') {
        seterrorView(true)
        seterrorData('Please Provide Card Issuer')
    //   showErrorAlert('Please Provide Card Issuer');
    setTimeout(() => {
        seterrorView(false)
        seterrorData('')
    }, 2000);
      return false;
    }
    if (CreditCardPaymentData.ApprovalNo === '') {
        seterrorView(true)
        seterrorData('Please Provide Approval No.')
    //   showErrorAlert('Please Provide Approval No.');
    setTimeout(() => {
        seterrorView(false)
        seterrorData('')
    }, 2000);
      return false;
    }
    if (CreditCardPaymentData.ExpiryMonth === '') {
        seterrorView(true)
        seterrorData('Please Provide Month')
    //   showErrorAlert('Please Provide Month');
    setTimeout(() => {
        seterrorView(false)
        seterrorData('')
    }, 2000);
      return false;
    }
    if (CreditCardPaymentData.ExpiryYear === '') {
        seterrorView(true)
        
        seterrorData('Please Provide Year')

    setTimeout(() => {
        seterrorView(false)
        seterrorData('')
    }, 2000);
      return false;
    }
    return true;
  };
  





  const AddToList = (event: any) => {

    let amount: string = amountdue.toString().replace(',', '');
    if (event.key === 'Enter') {
        if (parseFloat(amount) === totalAmountDue){
            seterrorView(true)  
            seterrorData('Total Amount Tendered Already Meet..')
            setTimeout(() => {
                seterrorView(false)
                seterrorData('')
            }, 2000);
    
            return;
            }   
            
        // if (parseFloat(amount) < (totalAmountDue + CreditCardPaymentData.AmountDue)){
        //         seterrorView(true)  
        //         seterrorData('Total Amount Tendered more than Amount Due..')
        //         setTimeout(() => {
        //             seterrorView(false)
        //             seterrorData('')
        //         }, 2000);
        
        //         return;
        //         } 
                
                const currentYear = new Date().getFullYear();
                const currentMonth = new Date().getMonth() + 1; // Note: Month is zero-based
              
                // Convert ExpiryYear and ExpiryMonth to numbers
                const expiryYear = parseInt(CreditCardPaymentData.ExpiryYear, 10);
                const expiryMonth = parseInt(CreditCardPaymentData.ExpiryMonth, 10);
              
                // Check if ExpiryYear is less than the current year
                // or if ExpiryYear is the same but ExpiryMonth is less than the current month
                if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
                 seterrorView(true)  
                  seterrorData('Card has expired..')
                  setTimeout(() => {
                    seterrorView(false)
                    seterrorData('')
                }, 2000);
                  return;
                }
    if (validateDataAndAddToList()) {
        setCreditCardPaymentList([...CreditCardPaymentList, CreditCardPaymentData]);
        setCreditCardPaymentData({
          CardNo: '',
          AcquireBank: '',
          CardIssuer: '',
          CardHolder: '',
          ApprovalNo: '',
          ExpiryMonth: '',
          ExpiryYear: '',
          AmountDue: 0,
        });
      }
     } 


  };

  const handleClickAddToList = () => {

    if (CreditCardPaymentData.CardNo.length < 16){
      showErrorAlert('Please Provide Correct Card No..!')
      return;
    }
    let amount: string = amountdue.toString().replace(',', '');
    if (parseFloat(amount) === totalAmountDue){
        seterrorView(true)  
        seterrorData('Total Amount Tendered Already Meet..')
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);

        return;
        }   
      
     const total:any = CreditCardPaymentData.AmountDue 
    if (parseFloat(amount) < (totalAmountDue + parseFloat(total))){
            seterrorView(true)  
            seterrorData('Total Amount Tendered more than Amount Due..')
            setTimeout(() => {
                seterrorView(false)
                seterrorData('')
            }, 2000);
    
            return;
            } 
      
   
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth() + 1; // Note: Month is zero-based
          
            // Convert ExpiryYear and ExpiryMonth to numbers
            const expiryYear = parseInt(CreditCardPaymentData.ExpiryYear, 10);
            const expiryMonth = parseInt(CreditCardPaymentData.ExpiryMonth, 10);
          
            // Check if ExpiryYear is less than the current year
            // or if ExpiryYear is the same but ExpiryMonth is less than the current month
            if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonth < currentMonth)) {
             seterrorView(true)  
              seterrorData('Card has expired..')
              setTimeout(() => {
                seterrorView(false)
                seterrorData('')
            }, 2000);
              return;
            }
if (validateDataAndAddToList()) {
    setCreditCardPaymentList([...CreditCardPaymentList, CreditCardPaymentData]);
    setCreditCardPaymentData({
      CardNo: '',
      AcquireBank: '',
      CardIssuer: '',
      CardHolder: '',
      ApprovalNo: '',
      ExpiryMonth: '',
      ExpiryYear: '',
      AmountDue: totalAmountDue,
    });
setTimeout(() => {
  if (cardNoRef.current){
    cardNoRef.current.focus()
  }
}, 100);

  }
  }

  useEffect(() => {

    let amountD: string = amountdue.replace(',', '')

    if (CreditCardPaymentData.AmountDue > parseFloat(amountD)){
      showErrorAlert('Amount Tendered Exceded Amount Due!!')
      settotalAmountDue(0);
      setCreditCardPaymentData({...CreditCardPaymentData,AmountDue:parseFloat(amountD)})
    }else{

      if (CreditCardPaymentList.length !== 0){

        let x :any = 0
        CreditCardPaymentList.map((data:any) =>{
          x = parseFloat(data.AmountDue) + parseFloat(x)
        })

        let y :any = 0
        const z:any = CreditCardPaymentData.AmountDue

        y = parseFloat(x) + parseFloat(z)

         if (parseFloat(y) > parseFloat(amountD)){
          showErrorAlert('Amount Tendered Exceded Amount Due!!')
          settotalAmountDue(0);
          setCreditCardPaymentData({...CreditCardPaymentData,AmountDue:parseFloat(amountD) - parseFloat(x)})
        }else{
          settotalAmountDue(parseFloat(amountD) - parseFloat(y))
        
        }
      }else{
        settotalAmountDue(parseFloat(amountD) - CreditCardPaymentData.AmountDue);
      }
    
    }

  }, [CreditCardPaymentData.AmountDue]); // Run effect when CreditCardPaymentList changes
 

  useEffect(() => {
    if (totalAmountDue === 0){
      setviewSave(true);
    }else{
      setviewSave(false);
    }
  },[totalAmountDue])


const SelectData = (index:any) =>{
    setisEdit(true)
    
    setTimeout(() => {
        if (cardNoRef.current){
            cardNoRef.current.focus();
            cardNoRef.current.select()
        }
    }, 100);
    const selectedItem = CreditCardPaymentList[index];
    setCreditCardPaymentData((prevData) => ({
        ...prevData,
        AcquireBank: selectedItem.AcquireBank,
        AmountDue: selectedItem.AmountDue,
        ApprovalNo: selectedItem.ApprovalNo,
        CardHolder: selectedItem.CardHolder,
        CardIssuer: selectedItem.CardIssuer,
        CardNo: selectedItem.CardNo,
        ExpiryMonth: selectedItem.ExpiryMonth,
        ExpiryYear: selectedItem.ExpiryYear,
      }));
    setSelectedItemIndex(index)
}   



const onDelete = () => {
    if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < CreditCardPaymentList.length) {
      const updatedItems = [...CreditCardPaymentList];
      updatedItems.splice(selectedItemIndex, 1);
      setCreditCardPaymentList(updatedItems);
        setSelectedItemIndex(null)
        setCreditCardPaymentData({
            CardNo: '',
            AcquireBank: '',
            CardIssuer: '',
            CardHolder: '',
            ApprovalNo: '',
            ExpiryMonth: '',
            ExpiryYear: '',
            AmountDue: 0,
          });
          setisEdit(false)
    } else {
      console.error('Invalid selectedItemIndex or out of range:', selectedItemIndex);
      // Handle the situation when the index is invalid or out of range
      // For example, show an error message or handle it in another appropriate way
    }
  };

     
  const onUpdate = () => {

    if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < CreditCardPaymentList.length) {

        if (validateDataAndAddToList()){
            const updatedItems = [...CreditCardPaymentList];
            updatedItems[selectedItemIndex].AcquireBank = CreditCardPaymentData.AcquireBank;
            updatedItems[selectedItemIndex].AmountDue = CreditCardPaymentData.AmountDue;
            updatedItems[selectedItemIndex].ApprovalNo = CreditCardPaymentData.ApprovalNo;
            updatedItems[selectedItemIndex].CardHolder = CreditCardPaymentData.CardHolder;
            updatedItems[selectedItemIndex].CardIssuer = CreditCardPaymentData.CardIssuer;
            updatedItems[selectedItemIndex].CardNo = CreditCardPaymentData.CardNo;
      
            updatedItems[selectedItemIndex].ExpiryMonth = CreditCardPaymentData.ExpiryMonth;
            updatedItems[selectedItemIndex].ExpiryYear = CreditCardPaymentData.ExpiryYear;
           // Update the quantity to the new value
            setCreditCardPaymentList(updatedItems);
            setSelectedItemIndex(null)
            setCreditCardPaymentData({
              CardNo: '',
              AcquireBank: '',
              CardIssuer: '',
              CardHolder: '',
              ApprovalNo: '',
              ExpiryMonth: '',
              ExpiryYear: '',
              AmountDue: 0,
            });
            setisEdit(false)
        }

    } else {
      console.error('Invalid selectedItemIndex or out of range:', selectedItemIndex);
      // Handle the situation when the index is invalid or out of range
      // For example, show an error message or handle it in another appropriate way
    }
  };

  const [viewSave,setviewSave] = useState(false)
  const [isEdit,setisEdit] = useState(false)

  // useEffect(() =>{
  //   let amount: string = amountdue.toString().replace(',', '');
  //   if (parseFloat(amount) === totalAmountDue)  {
  //       setviewSave(true)
  //   } else {
  //       setviewSave(false)
  //   }

  //   const bal :any = parseFloat(amount)- totalAmountDue
  //   setCreditCardPaymentData({...CreditCardPaymentData,AmountDue:bal})
  // },[totalAmountDue])

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
        if (viewSave){
            SaveCreditPayment();
        }else{
            handleClickAddToList();
        }
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


///*********************** DIVIDE BANK LIST*********************************/

useEffect(()=>{

  const mid = Math.ceil(BankList.length / 2)

  setBankList1(BankList.slice(0,mid))
  console.log('setBankList1',BankList.slice(0,mid))
  console.log('setBankList2',BankList.slice(mid))
  setBankList2(BankList.slice(mid))

},[BankList])

  const handleSearchInputChange = async (e: any, inputIdentifier: string) => {
    try {
        if (inputIdentifier === 'Bank') {
  

            const result = await axios.get(`${BASE_URL}/api/bank-company/`,{
              params: {
                customer:e
              }
            }); 
            
            if (result) {
                setBankList(result.data);
                setBankModal(true);
            }}else if (inputIdentifier =='Card'){
              const result = await axios.get(`${BASE_URL}/api/bank-card/`,{
                params: {
                  customer:e
                }
              }); 
              
              if (result) {
                  setCardList(result.data);
                  setCardModal(true);
              }
            }
            
          }  catch (error) {
              console.error(error);
              }
  }
  
  
    const ClickBankList = (index: number) => {
    setBankModal(false)
    const selectedItem = BankList1[index];
    setCreditCardPaymentData({...CreditCardPaymentData, AcquireBank: selectedItem.company_description})

      setTimeout(() => {
        if (cardIssuerRef.current) {
          cardIssuerRef.current.focus();
        }
      }, 100);

     }

     const ClickBankList2 = (index: number) => {
      setBankModal(false)
      const selectedItem = BankList2[index];
      setCreditCardPaymentData({...CreditCardPaymentData, AcquireBank: selectedItem.company_description})
  
        setTimeout(() => {
          if (cardIssuerRef.current) {
            cardIssuerRef.current.focus();
          }
        }, 100);
  
       }
  
     const handleKeys2 = (event:any, category:any) => {
      if (category=='Bank'){

   
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent scrolling on arrow key press
        const newIndex = selectedItemIndex + (event.key === 'ArrowDown' ? 1 : -1);
  
          if (newIndex >= 0 && newIndex < BankList.length) {
            if (BankListRef.current) {
              // Get the reference to the row element
              const rowElement = BankListRef.current.querySelector(`tr:nth-child(${newIndex + 1})`) as HTMLTableRowElement;
              // Set focus on the row element
              if (rowElement) {
                
                // Remove focus from the currently selected row if any
                const currentSelectedRow = BankListRef.current.querySelector('.selected');
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
          ClickBankList(selectedItemIndex)
      }

      }else if (category=='card'){
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault(); // Prevent scrolling on arrow key press
          const newIndex = selectedItemIndex + (event.key === 'ArrowDown' ? 1 : -1);
    
            if (newIndex >= 0 && newIndex < CardList.length) {
              if (CardListRef.current) {
                // Get the reference to the row element
                const rowElement = CardListRef.current.querySelector(`tr:nth-child(${newIndex + 1})`) as HTMLTableRowElement;
                // Set focus on the row element
                if (rowElement) {
                  
                  // Remove focus from the currently selected row if any
                  const currentSelectedRow = CardListRef.current.querySelector('.selected');
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
            ClickCardList(selectedItemIndex)
        }
      }

    };


    const ClickCardList = (index: number) => {
      setCardModal(false)
      const selectedItem = CardList[index];
      setCreditCardPaymentData({...CreditCardPaymentData, CardIssuer: selectedItem.card_description})
  
    setTimeout(() => {
      if (cardHolderRef.current) {
        cardHolderRef.current.focus();
      }
    }, 100);
       }
    
       type CreditCardPaymentDataKey = keyof typeof CreditCardPaymentData;

       const [focusedInput, setFocusedInput] = useState<CreditCardPaymentDataKey| 'CardNo'>('CardNo');
       const [cursorPosition, setCursorPosition] = useState<any>(0);
       const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);
       const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);
       const [isShowKeyboardNumeric, setisShowKeyboardNumeric] = useState<boolean>(false);
       const [isShowKeyboardNumericForCardNo, setisShowKeyboardNumericForCardNo] = useState<boolean>(false);
       const [isShow, setisShow] = useState<boolean>(false);
       const showOnScreenKeybaord = (ref:any) => {
        if (isDesktop){
       
            if (ref === 'ExpiryMonth' || ref === 'ExpiryYear' || ref === 'AmountDue') {
              setisShowKeyboardNumeric(true)
            }else if (ref === 'CardNo'){
              setisShowKeyboardNumericForCardNo(true)
            }
            
            else{
              setisShowKeyboard(true)
            }
     
            setFocusedInput(ref)
          
        }
       }
       const ShowKeyorNot = () => {
         setisShow(!isShow);
       }

       const setvalue = (value: any) => {
         if (focusedInput) {
          // if (focusedInput ==='Bank'){
          //     setBankSearch(value);
          // } else if (focusedInput ==='card'){
          //     setCardSearch(value);
          // } else 
          if (focusedInput ==='CardNo'){
            setCreditCardPaymentData((prevData: any) => ({
              ...prevData,
              [focusedInput]: value.slice(0,16)
            }));
        }else{
            if (focusedInput === 'AmountDue'){
              let amount: string = amountdue.toString().replace(',', '');
                if (parseFloat(value) > parseFloat(amount)){
                    showErrorAlert('Payment Amount exceeds total Amount Due..!')
                }else{
          
                  setCreditCardPaymentData((prevData: any) => ({
                    ...prevData,
                    [focusedInput]: value
                  }));
                }
            }else{
              setCreditCardPaymentData((prevData: any) => ({
                ...prevData,
                [focusedInput]: value
              }));
            }

          }

         }
         setisShowKeyboard(false)
         setisShowKeyboardNumeric(false)
         setisShowKeyboardNumericForCardNo(false)
       };
       const closekeyBoard = () => {
         setisShowKeyboard(false)
         setisShowKeyboardNumeric(false)
         setisShowKeyboardNumericForCardNo(false)
       }


       useEffect(() => {
        if (localStorage.getItem('MULTIPLE') === 'true'){
          setviewSave(true);
        //   if (CreditCardPaymentData.ApprovalNo !=='') {
        //     setviewSave(false);
        // } else {
        //   if (CreditCardPaymentList.length !== 0){
        //     setviewSave(true);
        //   }else{
        //     setviewSave(false);
        //   }
        // }
        }else{
          let amount: string = amountdue.toString().replace(',', '');
          if (totalAmountDue === parseFloat(amount) && CreditCardPaymentList.length !== 0){
            setviewSave(true);
          }else{
            if (totalAmountDue === 0){
              setviewSave(true);
            }else{
              setviewSave(false);
            }
         
          }
         
        }

    }, [CreditCardPaymentData]);
    

    useEffect(() => {
      if (CreditCardPaymentData.CardNo.length === 16) {
        const formattedValue = CreditCardPaymentData.CardNo.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
  
        setCreditCardPaymentData((prevData: any) => ({
          ...prevData,
          ['CardNo']: formattedValue
        }));
  
  
      }
  }, [CreditCardPaymentData.CardNo]);

    return (
      <div>

      

        <div className="modal" >
            <div className="modal-content-credit">
                <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                            CREDIT CARD</h2>
                    {errorView && (
                            <div className="alert_box">
                                <div className="icon">
                                    <i className="fas fa-exclamation"></i>
                                    </div>
                                    <header style={{color:'red'}}>Error</header>
                                    <p>{errorData}</p>
                                    <div className="btns">
                                </div>
                            </div>
                         
                    )}
               
                    
                    <Grid container className="CreditCard-Container" spacing={2}>
                        <Grid item xs={12} md={5} style={{ height: '100%',width:'40%'}}>
                       
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography 

                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>Card No.</Typography>
                            <input type="text" placeholder="0000-0000-0000-0000"  autoComplete="off" ref={cardNoRef}
                            onKeyDown={(e) => handleKeyDown(e, cardNoRef, acquireBankRef)} 
                            value={CreditCardPaymentData.CardNo}
                            name="CardNo"
                            // onFocus={()=>showOnScreenKeybaord('CardNo')}
                            onClick={()=>showOnScreenKeybaord('CardNo')}
                            onChange={HandleCreditCardEntry}
                            />
                        </div>
        

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography 
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '0.9rem' },
                                overflow: 'auto',width:'40%'}}>Acquiring Bank</Typography>
                            <input type="text" placeholder="Bank"  autoComplete="off" ref={acquireBankRef}
                            onKeyDown={(e) => handleKeyDown(e, acquireBankRef, cardIssuerRef)}  
                            value={CreditCardPaymentData.AcquireBank} 
                            name="AcquireBank" 
                            onFocus={HandleCreditCardEntry}
                            onChange={HandleCreditCardEntry}/>
                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>Card Issuer</Typography>
                            <input type="text" placeholder="Card Issuer"  autoComplete="off" ref={cardIssuerRef}
                            onKeyDown={(e) => handleKeyDown(e, cardIssuerRef, cardHolderRef)} 
                            value={CreditCardPaymentData.CardIssuer}
                            name="CardIssuer" 
                            onFocus={HandleCreditCardEntry}
                            onChange={HandleCreditCardEntry}/>
                        </div>
            
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography 
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>Card Holder</Typography>
                            <input type="text" placeholder="Card Holder"  autoComplete="off"   ref={cardHolderRef}
                            onKeyDown={(e) => handleKeyDown(e, cardHolderRef, approvalNoRef)} 
                            value={CreditCardPaymentData.CardHolder} name="CardHolder"
                            // onFocus={()=>showOnScreenKeybaord('CardHolder')}
                            onClick={()=>showOnScreenKeybaord('CardHolder')}
                            onChange={HandleCreditCardEntry}/>
                           
              
                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}} >Approval No.</Typography>
                            <input type="text" placeholder="000000"  autoComplete="off"   ref={approvalNoRef}
                            onKeyDown={(e) => handleKeyDown(e, approvalNoRef, expiryMonthRef)} 
                            value={CreditCardPaymentData.ApprovalNo} name="ApprovalNo"
                            onClick={()=>showOnScreenKeybaord('ApprovalNo')}
                            // onFocus={()=>showOnScreenKeybaord('ApprovalNo')}
                            onChange={HandleCreditCardEntry}
                            />
                        </div>

                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>Expiry Date</Typography>
                
                            <input type="text" placeholder="MM"  autoComplete="off"   ref={expiryMonthRef} style={{width:'45%',marginRight:'5%'}}
                            onKeyDown={(e) => handleKeyDown(e, expiryMonthRef, expiryYearRef)} 
                            value={CreditCardPaymentData.ExpiryMonth} name="ExpiryMonth"
                            // onFocus={()=>showOnScreenKeybaord('ExpiryMonth')}
                            onFocus={()=>{setMonthsView(true);
                              if (MonthsRef.current){
                                  MonthsRef.current.focus()
                              }}}
                              readOnly
                            onChange={HandleCreditCardEntry}/>

                            <input type="text" placeholder="YYYY"  autoComplete="off"   ref={expiryYearRef} style={{width:'45%'}}
                            onKeyDown={(e) => handleKeyDown(e, expiryYearRef, AmountDueRef)} 
                            value={CreditCardPaymentData.ExpiryYear} name="ExpiryYear"
                            // onClick={()=>showOnScreenKeybaord('ExpiryYear')}
                            // onFocus={()=>setYearView(true)}
                            onFocus={()=>{setMonthsView(true)}}
                            readOnly
                            // onChange={HandleCreditCardEntry}
                            />
                            

                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>
                               AMOUNT TENDERED
                            </Typography>
                            <input type="text" placeholder="0.00"  autoComplete="off" style={{textAlign:'end'}}
                            name="AmountDue" 
                            onClick={()=>showOnScreenKeybaord('AmountDue')}
                            ref={AmountDueRef}
                            onInput={HandleCreditCardEntry}
                            value={CreditCardPaymentData.AmountDue}
                            // value={parseFloat(CreditCardPaymentData.AmountDue).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                            onKeyDown={AddToList} />
                        </div>

        

                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <div style={{ width: '100%', margin:'5px'}}>
                                {viewSave ? (
                                        <Button onClick={()=>SaveCreditPayment()}                                 disabled = {isEdit}  style={{
                                            backgroundColor: isEdit ? 'gray' : 'blue', // Different color when disabled
                                            cursor: isEdit ? 'not-allowed' : 'pointer', // Change cursor when disabled
                                          }}>SAVE</Button>
                                    ):(
                                        <Button  onClick={handleClickAddToList} disabled = {isEdit}  style={{
                                            backgroundColor: isEdit ? 'gray' : 'blue', // Different color when disabled
                                            cursor: isEdit ? 'not-allowed' : 'pointer', // Change cursor when disabled
                                            // Add more styles as needed
                                          }}> ADD</Button>
                                )}


                                <Button style={{backgroundColor:'blue'}} onClick={onUpdate}>EDIT</Button>
                            </div>
                            <div style={{ width: '100%', margin:'5px'}}>
                                <Button style={{backgroundColor:'RED'}} onClick={onDelete}>DELETE</Button>
                                <Button style={{backgroundColor:'red'}} onClick={handleClose}>EXIT</Button>
                                                                
                                {/* <button className="btn-show"  type='button' 
                                      onClick={ShowKeyorNot}>Keyboard {isShow ? 'Disable':'Enable'}
                                </button> */}
                            </div>
                        </div>
                        </Grid>

                        <Grid item xs={12} md={7} style={{ height: '100%'}}>
                            <div style={{height:'320px' ,overflow:'auto'}}>

                        
                            <Table sx={{
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                            overflow: 'auto'}}>
                                <thead>
                                    <tr>
                                    <th>Card No.</th>
                                    <th>Bank</th>
                                    <th>Card Type</th>
                                    <th>Card Holder</th>
                                    <th>Amount</th>
                                    <th style={{display:'none'}}>Approval No</th>
                                    <th style={{display:'none'}}>Expire Month</th>
                                    <th style={{display:'none'}}>Expire Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(CreditCardPaymentList) && CreditCardPaymentList.length > 0 ? (
                                CreditCardPaymentList.map((item, index) => (
                                    <tr key={index} style={{textAlign:'center'}} onClick={() => SelectData(index)}>
                                    <td>{item.CardNo}</td>
                                    <td>{item.AcquireBank}</td>
                                    <td>{item.CardIssuer}</td>
                                    <td>{item.CardHolder}</td>
                                    <td>{item.AmountDue}</td>
                                    <td style={{display:'none'}}>{item.ApprovalNo}</td>
                                    <td style={{display:'none'}}>{item.ExpiryMonth}</td>
                                    <td style={{display:'none'}}>{item.ExpiryYear}</td>
                    
                                </tr>
                                

                        ))
                        ) : (
                        <tr>
                            <td colSpan={5}>No items in the transaction</td>
                        </tr>
                        )}
                                    


                                </tbody>
                            </Table>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                            <div>
                                   <Typography  sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>AMOUNT DUE</Typography>
                                 <input type="text" placeholder="0.00" readOnly autoComplete="off" value={amountdue} style={{textAlign:'end'}} />
                            </div>
                         

                            <div>
                                <Typography  sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>BALANCE</Typography>
                                 <input type="text" placeholder="0.00" readOnly autoComplete="off" style={{textAlign:'end'}} value={totalAmountDue.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} />
                            
                            </div>
                           
                           
                            </div>
                 
                        </Grid>
                    </Grid>




  {BankModal && (
                       <div className='modal'>
                         <div className='modal-content-waiter'>
                             <h1>Select Bank</h1>
                           <div className='Waiterlist-Container'>
                           <input
                               ref={BankSearchRef}
                               value={BankSearch}
                               onChange={(e) => setBankSearch(e.target.value)}
                               onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Bank')}
                               onClick={()=>showOnScreenKeybaord('Bank')}
                               onKeyDown={(e) => handleKeys2(e, 'Bank')}
                               
                             />
                             <div className='Bank-Container'  style={{display:'flex',flexDirection:'row'}}>
                        
                             <Table id="table-list" className='table-Bank' onKeyDown={(event) => handleKeys2(event, 'Bank')} ref={BankListRef}>
                               <thead>
                                 <tr>
                                  {/* <th>Bank Code</th> */}
                                   <th>Bank Name</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {BankList1 && BankList1.map((result:any, index:any) => (
                                   <tr
                                     key={index}
                                     className={selectedItemIndex === index ? 'selected' : ''}
                                     onClick={() => ClickBankList(index)}
                                     tabIndex={0}
                   
                                     style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                   color:selectedItemIndex === index ? 'white':'black',height:'50px'}}
                                   >
                                     {/* <td>{result.id_code.padStart(4,'0')}</td> */}
                                     <td>{result.company_description}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </Table>


                             <Table id="table-list" className='table-Bank' onKeyDown={(event) => handleKeys2(event, 'Bank')} ref={BankListRef}>
                               <thead>
                                 <tr>
                                  {/* <th>Bank Code</th> */}
                                   <th>Bank Name</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {BankList2 && BankList2.map((result:any, index:any) => (
                                   <tr
                                     key={index}
                                     className={selectedItemIndex === index ? 'selected' : ''}
                                     onClick={() => ClickBankList2(index)}
                                     tabIndex={0}
                   
                                     style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                      color:selectedItemIndex === index ? 'white':'black',height:'50px'}}
                                   >
                                     {/* <td>{result.id_code.padStart(4,'0')}</td> */}
                                     <td>{result.company_description}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </Table>
                             </div>
                               </div>
                   
                           <div className='Button-Container'>
                                <button onClick={() => setBankModal(false)}>Close</button>
                            </div>
                         </div>
                   
                      </div>
)}


{CardModal && (
                       <div className='modal'>
                         <div className='modal-content-waiter'>
                   
                           <div className='card'>
                             <h1>Select Card</h1>
                           <div className='Waiterlist-Container'>
                           <input
                               ref={CardSearchRef}
                               value={CardSearch}
                               onChange={(e) => setCardSearch(e.target.value)}
                               onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'card')}
                               onKeyDown={(e) => handleKeys2(e, 'card')}
                               onClick={()=>showOnScreenKeybaord('card')}
                             />
                             <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'card')} ref={CardListRef}>
                               <thead>
                                 <tr>
                                   <th>Card Issuer Code</th>
                                   <th>Card Name</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {CardList && CardList.map((result:any, index:any) => (
                                   <tr
                                     key={index}
                                     className={selectedItemIndex === index ? 'selected' : ''}
                                     onClick={() => ClickCardList(index)}
                                     tabIndex={0}
                   
                                     style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                   color:selectedItemIndex === index ? 'white':'black',height:'50px' }}
                                   >
                                     <td>{result.id_code.padStart(4,'0')}</td>
                                     <td>{result.card_description}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </Table>

                               </div>
                           </div>
                           <div className='Button-Container'>
                                <button onClick={() => setCardModal(false)}>Close</button>
                            </div>
                         </div>
                   
                      </div>
)}


{MonthsView && (
                       <div className='modal'>
                         <div className='modal-content-waiter' style={{width:'60%',}}>
                          <div style={{display:'flex',flexDirection:'row',margin:'10px'}}>
                            <div className='card'>
                              <h1>Select Months</h1>
                            <div className='Select-Container' style={{display:'flex',flexDirection:'row',margin:'10px'}}>
                              <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Month')} ref={MonthsRef}>
                                <thead>
                                  <tr>
                                    <th>Code</th>
                                    <th>Months</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {months.slice(0, 6).map((item: any, index: any) => (
                                    <tr
                                      key={index}
                                      onClick={() => {
                                        setCreditCardPaymentData({ ...CreditCardPaymentData, ExpiryMonth: item.monthNumber });
                                        {indexYear !== null || indexYear2 !== null ? setMonthsView(false):setMonthsView(true)};
                                        setindexMonths(index);
                                        setindexMonths2(null);
                                      }}
                                      tabIndex={0}
                                      style={{
                                        backgroundColor: indexMonths === index ? 'blue' : 'white',
                                        color: indexMonths === index ? 'white' : 'black',
                                        height: '50px',
                                      }}
                                    >
                                      <td>{item.monthNumber.padStart(2, '0')}</td>
                                      <td>{item.monthName}</td>
                                    </tr>
                                  ))}

                                {/* {months.map((item:any,index:any) => (
                                    <tr
                                      key={index}
                                      className={selectedItemIndex === index ? 'selected' : ''}
                                      onClick={() => {setCreditCardPaymentData({... CreditCardPaymentData, ExpiryMonth: item.monthNumber});setMonthsView(false)}}
                                      tabIndex={0}
                    
                                      style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                    color:selectedItemIndex === index ? 'white':'black',height:'50px' }}
                                    >
                                      <td>{item.monthNumber.padStart(2,'0')}</td>
                                      <td>{item.monthName}</td>
                                    </tr>
                                  ))} */}
                                </tbody>
                              </Table>


                              <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Month')} ref={MonthsRef}>
                                <thead>
                                  <tr>
                                    <th>Code</th>
                                    <th>Months</th>
                                  </tr>
                                </thead>
                                <tbody>
                                {months.slice(6, 12).map((item: any, index: any) => (
                                    <tr
                                      key={index}
                                      className={selectedItemIndex === index ? 'selected' : ''}
                                      onClick={() => {
                                        setCreditCardPaymentData({ ...CreditCardPaymentData, ExpiryMonth: item.monthNumber });
                                        {indexYear !== null  || indexYear2 !== null? setMonthsView(false):setMonthsView(true)};
                                        setindexMonths2(index);
                                        setindexMonths(null);
                                      }}
                                      tabIndex={0}
                                      style={{
                                        backgroundColor: indexMonths2 === index ? 'blue' : 'white',
                                        color: indexMonths2 === index ? 'white' : 'black',
                                        height: '50px',
                                      }}
                                    >
                                      <td>{item.monthNumber.padStart(2, '0')}</td>
                                      <td>{item.monthName}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </Table>
                                </div>
                            </div>
                            
                            <div className='card'>
                             <h1>Select Year</h1>
                           <div className='Select-Container' style={{display:'flex',flexDirection:'row',margin:'10px'}}>

                             <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Year')} ref={YearsRef}>
                               <thead>
                                 <tr>
                                   <th>Year</th>
                                 </tr>
                               </thead>
                               <tbody>
                               {years.slice(0,6).map((year:any,index:any) => (
                                   <tr
                                     key={index}
                                     onClick={() => {setCreditCardPaymentData({... CreditCardPaymentData, ExpiryYear: year});
                                      setindexYear(index);
                                      setindexYear2(null);
                                     {indexMonths !== null || indexMonths2 !== null ? setMonthsView(false):setMonthsView(true)};
                                    } }
                                     tabIndex={0}
                   
                                     style={{backgroundColor:indexYear === index ? 'blue':'white',
                                      color:indexYear === index ? 'white':'black',height:'50px' ,fontSize:'2vw',}}
                                   >
                                     <td style={{textAlign:'center'}}>{year}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </Table>

                                
                             <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Year')} ref={YearsRef}>
                               <thead>
                                 <tr>
                                   <th>Year</th>
                                 </tr>
                               </thead>
                               <tbody>
                               {years.slice(6, 12).map((year:any,index:any) => (
                                   <tr
                                     key={index}

                                     onClick={() => {setCreditCardPaymentData({... CreditCardPaymentData, ExpiryYear: year});
                                     setindexYear2(index)
                                     setindexYear(null);
                                     {indexMonths !== null || indexMonths2 !== null ? setMonthsView(false):setMonthsView(true)};
                                    }}
                                     tabIndex={0}
                   
                                     style={{backgroundColor:indexYear2 === index ? 'blue':'white',
                                      color:indexYear2 === index ? 'white':'black',height:'50px' ,fontSize:'2vw',}}
                                   >
                                     <td style={{textAlign:'center'}}>{year}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </Table>
                               </div>
                           </div>

                          </div>

                           <div className='Button-Container'>
                                <button onClick={() => setMonthsView(false)}>Close</button>
                            </div>
                         </div>
                   
                      </div>
)}


{YearView && (
                       <div className='modal'>
                         <div className='modal-content-waiter' style={{width:'20%'}}>
                   
                           <div className='card'>
                             <h1>Select Year</h1>
                           <div className='Waiterlist-Container'>

                             <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Year')} ref={YearsRef}>
                               <thead>
                                 <tr>
                                   <th>Year</th>
                                 </tr>
                               </thead>
                               <tbody>
                               {years.map((year:any,index:any) => (
                                   <tr
                                     key={index}
                                     className={selectedItemIndex === index ? 'selected' : ''}
                                     onClick={() => {setCreditCardPaymentData({... CreditCardPaymentData, ExpiryYear: year});setYearView(false)}}
                                     tabIndex={0}
                   
                                     style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                      color:selectedItemIndex === index ? 'white':'black',height:'50px' ,fontSize:'2vw',}}
                                   >
                                     <td style={{textAlign:'center'}}>{year}</td>
                                   </tr>
                                 ))}
                               </tbody>
                             </Table>

                               </div>
                           </div>
                           <div className='Button-Container'>
                                <button onClick={() => setYearView(false)}>Close</button>
                            </div>
                         </div>
                   
                      </div>
)}


           
            </div>

       
        </div>
        {isShowKeyboard && < OnScreenKeyboard handleclose = {closekeyBoard} currentv={CreditCardPaymentData[focusedInput]} setvalue={setvalue}/>}
        {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}    currentv={CreditCardPaymentData[focusedInput]} setvalue={setvalue}/>}
        {isShowKeyboardNumericForCardNo && < OnScreenKeyboardNumericForCardNo handleclose = {closekeyBoard} currentv = {CreditCardPaymentData.CardNo} setvalue={setvalue}/>}

  </div>
    )
}

export default CreditCardPayment;