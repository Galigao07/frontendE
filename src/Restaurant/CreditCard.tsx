/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
import './css/CreditCard.css'
import Swal from "sweetalert2";
import { Button, Grid, Table, Typography } from "@mui/material";
import axios from "axios";
import BASE_URL from "../config";


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

    const BankSearchRef = useRef<HTMLInputElement>(null)
    const BankListRef = useRef<HTMLTableElement>(null)
    const CardListRef = useRef<HTMLTableElement>(null)

    const CardSearchRef = useRef<HTMLInputElement>(null)



    const [CreditCardPaymentData,setCreditCardPaymentData] = useState({
        CardNo:'',
        AcquireBank:'',
        CardIssuer:'',
        CardHolder:'',
        ApprovalNo:'',
        ExpiryMonth:'',
        ExpiryYear:'',
        AmountDue:'',
    })

    useEffect(() => {

        setCreditCardPaymentData({...CreditCardPaymentData,AmountDue:amountdue})

        setTimeout(() => {
            if (cardNoRef.current){
                cardNoRef.current.focus();
                cardNoRef.current.select()
            }
        }, 100);

    },[]);
    
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
                console.log('Success',CreditCardPaymentList)
   
                CreditCardPayment({CreditCardPaymentList})
                setCreditCardPaymentData({
                    CardNo:'',
                    AcquireBank:'',
                    CardIssuer:'',
                    CardHolder:'',
                    ApprovalNo:'',
                    ExpiryMonth:'',
                    ExpiryYear:'',
                    AmountDue:'',
                })
            }
            
        })
    
    }




    const handleKeyDown = (event :any, currentRef : any, nextRef:any) => {
        if (event.key === 'Enter') {
          event.preventDefault();
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
setCreditCardPaymentData({ ...CreditCardPaymentData, [name]: value });
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
    if (CreditCardPaymentData.AmountDue === '') {
        seterrorView(true)
        seterrorData('Please Provide Amount')
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }
    if (CreditCardPaymentData.AmountDue === '0') {
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
     
    if (event.key === 'Enter') {
        if (parseFloat(amountdue) === totalAmountDue){
            seterrorView(true)  
            seterrorData('Total Amount Tendered Already Meet..')
            setTimeout(() => {
                seterrorView(false)
                seterrorData('')
            }, 2000);
    
            return;
            }   
            
        if (parseFloat(amountdue) < (totalAmountDue + parseFloat(CreditCardPaymentData.AmountDue))){
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
          AmountDue: '',
        });
      }
     } 


  };

  const handleClickAddToList = () => {
    if (parseFloat(amountdue) === totalAmountDue){
        seterrorView(true)  
        seterrorData('Total Amount Tendered Already Meet..')
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);

        return;
        }   
        
    if (parseFloat(amountdue) < (totalAmountDue + parseFloat(CreditCardPaymentData.AmountDue))){
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
      AmountDue: '',
    });
  }
  }

  let totalAmountDue = 0;
  CreditCardPaymentList.forEach((payment: { AmountDue: any; }) => totalAmountDue += parseFloat(payment.AmountDue));


// const AddToList = (event:any) => {

//     if (event.key === 'Enter') {
//         if (CreditCardPaymentData.AmountDue == '') {
//             showErrorAlert('Please Provide Amount')

//             return;
//         }
//         if (CreditCardPaymentData.AmountDue == '0') {
//             showErrorAlert('Please Provide Amount More than Zero')
//             return;
//         }

//         if (CreditCardPaymentData.AcquireBank == '') {
//             showErrorAlert('Please Select Bank')
//             return;
//         }

//         if (CreditCardPaymentData.CardNo == '') {
//             showErrorAlert('Please Provide Card No.')
//             return;
//         }

//         if (CreditCardPaymentData.CardIssuer == '') {
//             showErrorAlert('Please Provide Card Issuer')
//             return;
//         }

//         if (CreditCardPaymentData.ApprovalNo == '') {
//             showErrorAlert('Please Provide Approval No.')
//             return;
//         }

   
//         if (CreditCardPaymentData.ExpiryMonth == '') {
//             showErrorAlert('Please Provide Month')
//             return;
//         }

//         if (CreditCardPaymentData.ExpiryYear == '') {
//             showErrorAlert('Please Provide Year')
//             return;
//         }

//             setCreditCardPaymentList([...CreditCardPaymentList, CreditCardPaymentData]);
//             setCreditCardPaymentData({
//                 CardNo:'',
//                 AcquireBank:'',
//                 CardIssuer:'',
//                 CardHolder:'',
//                 ApprovalNo:'',
//                 ExpiryMonth:'',
//                 ExpiryYear:'',
//                 AmountDue:'',
//             })
// }
// }

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
            AmountDue: '',
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
              AmountDue: '',
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

  useEffect(() =>{

    if (parseFloat(amountdue) === totalAmountDue)  {
        setviewSave(true)
    } else {
        setviewSave(false)
    }

    const bal :any = parseFloat(amountdue)- totalAmountDue
    setCreditCardPaymentData({...CreditCardPaymentData,AmountDue:bal})
  },[totalAmountDue])

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
    const selectedItem = BankList[index];
    setCreditCardPaymentData({...CreditCardPaymentData, AcquireBank: selectedItem.company_description})

  
    if (acquireBankRef.current) {
      acquireBankRef.current.focus();
    }
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

      }else if (category=='Card'){
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
  
    
      if (cardIssuerRef.current) {
        cardIssuerRef.current.focus();
      }
       }
    



    return (


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
                            onChange={HandleCreditCardEntry}/>
              
                        </div>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}} >Approval No.</Typography>
                            <input type="text" placeholder="000000"  autoComplete="off"   ref={approvalNoRef}
                            onKeyDown={(e) => handleKeyDown(e, approvalNoRef, expiryMonthRef)} 
                            value={CreditCardPaymentData.ApprovalNo} name="ApprovalNo"
                            onChange={HandleCreditCardEntry}/>
                        </div>

                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>Expiry Date</Typography>
                
                            <input type="text" placeholder="MM"  autoComplete="off"   ref={expiryMonthRef} style={{width:'45%',marginRight:'5%'}}
                            onKeyDown={(e) => handleKeyDown(e, expiryMonthRef, expiryYearRef)} 
                            value={CreditCardPaymentData.ExpiryMonth} name="ExpiryMonth"
                            onChange={HandleCreditCardEntry}/>
                
                            <input type="text" placeholder="YYYY"  autoComplete="off"   ref={expiryYearRef} style={{width:'45%'}}
                            onKeyDown={(e) => handleKeyDown(e, expiryYearRef, AmountDueRef)} 
                            value={CreditCardPaymentData.ExpiryYear} name="ExpiryYear"
                            onChange={HandleCreditCardEntry}/>
                            
                            
            
                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>Amout Due</Typography>
                            <input type="text" placeholder="0.00"  autoComplete="off" style={{textAlign:'end'}}
                            name="AmountDue" 
                            ref={AmountDueRef}
                            onChange={HandleCreditCardEntry}
                            value={parseFloat(CreditCardPaymentData.AmountDue).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                            onKeyDown={AddToList} />
                        </div>

        

                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <div style={{ width: '100%', margin:'5px'}}>
                                {viewSave ? (
                                        <Button  onClick={SaveCreditPayment} disabled = {isEdit}  style={{
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
                                overflow: 'auto',width:'40%'}}>AMOUNT TENDERED</Typography>
                                 <input type="text" placeholder="0.00" readOnly autoComplete="off" style={{textAlign:'end'}} value={totalAmountDue.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} />
                            
                            </div>
                           
                            </div>
                 
                        </Grid>
                    </Grid>




  {BankModal && (
                       <div className='modal'>
                         <div className='modal-content-waiter'>
                   
                           <div className='card'>
                             <h1>Select Customer</h1>
                           <div className='Waiterlist-Container'>
                           <input
                               ref={BankSearchRef}
                               value={BankSearch}
                               onChange={(e) => setBankSearch(e.target.value)}
                               onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Bank')}
                               onKeyDown={(e) => handleKeys2(e, 'Bank')}
                             />
                             <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Bank')} ref={BankListRef}>
                               <thead>
                                 <tr>
                                   <th>Bank Code</th>
                                   <th>Bank Name</th>
                                 </tr>
                               </thead>
                               <tbody>
                                 {BankList && BankList.map((result:any, index:any) => (
                                   <tr
                                     key={index}
                                     className={selectedItemIndex === index ? 'selected' : ''}
                                     onClick={() => ClickBankList(index)}
                                     tabIndex={0}
                   
                                     style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                   color:selectedItemIndex === index ? 'white':'black', }}
                                   >
                                     <td>{result.id_code.padStart(4,'0')}</td>
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
                             <h1>Select Customer</h1>
                           <div className='Waiterlist-Container'>
                           <input
                               ref={CardSearchRef}
                               value={CardSearch}
                               onChange={(e) => setCardSearch(e.target.value)}
                               onInput={(e: React.ChangeEvent<HTMLInputElement>) => handleSearchInputChange(e.target.value, 'Card')}
                               onKeyDown={(e) => handleKeys2(e, 'card')}
                             />
                             <Table id="table-list" className='table-list Waiter' onKeyDown={(event) => handleKeys2(event, 'Card')} ref={CardListRef}>
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
                                   color:selectedItemIndex === index ? 'white':'black', }}
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

        
            </div>
        </div>

  
    )
}

export default CreditCardPayment;