import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {BASE_URL} from "../config";
import './css/MultiplePayments.css'
import { Button } from "@mui/material";
import CreditCardPaymentEntry from './CreditCardPayment';
import DebitCardPaymentEntry from './DebitCardPayment';
import CreditCardPayment from './CreditCard';
import DebitCardPayment from './DebitCard';
import GiftCheckPaymentTransModal from "./GiftCheck";
import OnlinePaymentTransModal from "./Online";
import OtherPaymentTransModal from "./Other";
import { isDesktop } from "react-device-detect";
import OnScreenKeyboardNumeric from "./KeyboardNumericGlobal";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import getextendedAMTAPI from "../utils/getAmountTenderedAPI";
import Swal from "sweetalert2";
interface MultiplepaymentsData {
    handleclose:()=> void;
    totalDue:any;
    MultiplepaymentsList:any;

}

const MultiplePayments:React.FC<MultiplepaymentsData> = ({handleclose,totalDue,MultiplepaymentsList}) => {
    const [DebitCardPaymentEntryModal, setDebitCardPaymentEntryModal] = useState<boolean>(false);
    const [CreditCardPaymentEntryModal, setCreditCardPaymentEntryModal] = useState<boolean>(false);
  ;
    const [DebitCardPaymentModal, setDebitCardPaymentModal] = useState<boolean>(false);
    const [CreditCardPaymentModal, setCreditCardPaymentModal] = useState<boolean>(false);
    const [GiftCheckPaymentModal, setGiftCheckPaymentModal] = useState<boolean>(false);
    const [OtherPaymentModal, setOtherPaymentModal] = useState<boolean>(false);
    const [OnlinePaymentModal, setOnlinePaymentModal] = useState<boolean>(false);
    const [CashAmount, setCashAmount] = useState<any>(null)
    const [CurrentCheckAmount, setCurrentCheckAmount] =  useState<any>('0.00')
    const [DebitCardAmount, setDebitCardAmount] = useState<any>('0.00')
    const [CreditCardAmount, setCreditCardAmount] =  useState<any>('0.00')
    const [CreditSalesAmount, setCreditSalesAmount] = useState<any>('0.00')

     const [GiftCheckAmount, setGiftCheckAmount] = useState<any>('0.00')
    const [OnlineAmount, setOnlineAmount] =  useState<any>('0.00')
    const [OtherAmount, setOtherAmount] = useState<any>('0.00')
    const [RemainingAmountDue,setRemainingAmountDue] = useState<any>(0)

    const [amountDue, setamountDue] = useState<any>('0.00')
    const [amountTendered, setamountTendered] =  useState<any>('0.00')
    const [change, setchange] =  useState<any>('0.00')


    const CashAmountRef = useRef<HTMLInputElement>(null);
    const CurrentCheckAmountRef = useRef<HTMLButtonElement>(null);
    const DebitCardAmountRef = useRef<HTMLButtonElement>(null);
    const CreditCardAmountRef = useRef<HTMLButtonElement>(null);
    const CreditSalesAmountRef = useRef<HTMLButtonElement>(null)
    
    const GiftCheckAmountRef = useRef<HTMLButtonElement>(null);
    const OnlineAmountRef = useRef<HTMLButtonElement>(null);
    const OtherAmountRef = useRef<HTMLButtonElement>(null);
    const SaveButtonRef = useRef<HTMLButtonElement>(null);
    const CloseButtonRef = useRef<HTMLButtonElement>(null);


//// ************************** CREDIT CARD PAYMENT TYPE TRANSACTION ******************

const OpenCreditCardPayment = () => {
  if (localStorage.getItem('CreditCardPayment')){
    localStorage.removeItem('CreditCardPayment')
    setCreditCardAmount(0)
    return
  }

  
    const totalDueFloat: number = removeThousandSeparator(totalDue);
    const amountTenderedFloat: number = removeThousandSeparator(amountTendered);
    const remainingAmountDue: number = totalDueFloat - amountTenderedFloat;
    if (remainingAmountDue === 0){
      return;
    }
    setCreditCardPaymentModal(true)
    setRemainingAmountDue(remainingAmountDue.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
  }
  
  const CloseCreditCardPayment = () => {
    setCreditCardPaymentModal(false)

  }
  
  const CreditCardPaymentOk = (data:any) => {
    const CreditCardPaymentData = data.CreditCardPaymentList
    let totalC:any  = 0
    CreditCardPaymentData.map((items:any) => {
      totalC = parseFloat(items.AmountDue) +   parseFloat(totalC)
    });

    setCreditCardAmount(totalC)
  
    localStorage.setItem('CreditCardPayment',JSON.stringify(data))
    setCreditCardPaymentModal(false)
  
  }
  
  const CloseCreditCardPaymentEntryModal = () => {
    setCreditCardPaymentEntryModal(false)
  }
  
  
  
  const SaveCreditCardPayment = async (data: { amounttendered: number; change:number; }) => {
    setCreditCardPaymentEntryModal(false)

  };
  
  
  
  //// ************************** DEBIT CARD PAYMENT TYPE TRANSACTION ******************
  
  const removeThousandSeparator = (s: string): number => {
    return parseFloat(s.replace(/,/g, ''));
};
  const OpenDebitCardPayment = () => {
    if (localStorage.getItem('DebitCardPayment')){
      localStorage.removeItem('DebitCardPayment')
      setDebitCardAmount(0)
      return
    }
 
    const totalDueFloat: number = removeThousandSeparator(totalDue);
    const amountTenderedFloat: number = removeThousandSeparator(amountTendered);
    const remainingAmountDue: number = totalDueFloat - amountTenderedFloat;
    if (remainingAmountDue === 0){
      return;
    }
    setRemainingAmountDue(remainingAmountDue.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
    setDebitCardPaymentModal(true)
  }
  
  const DebitCardPaymentOK =(data:any) => {

    const DebitCardPaymentData = data.DebitCardPaymentList
    let totalD:any  = 0
    DebitCardPaymentData.map((items:any) => {
      totalD = parseFloat(items.AmountDue) +   parseFloat(totalD)
    });


    setDebitCardAmount(totalD)
    localStorage.setItem('DebitCardPayment',JSON.stringify(data))
    setDebitCardPaymentModal(false)
  
  }
  
  const CloseDebitCardPayment = () => {
    setDebitCardPaymentModal(false)

  }
  
  const SaveDebitCardPayment = async (data: { amounttendered: number; change:number; }) => {
    setDebitCardPaymentEntryModal(false)

  };
  const CloseDebitCardPaymentEntryModal = () => {
    setDebitCardPaymentEntryModal(false)
  }
  
  //////******************************** END HERE **********************************/////

 
  //// ************************** GIFT CHECK PAYMENT TYPE TRANSACTION ******************
  const OpenGiftCheckPayment = () => {
    if (localStorage.getItem('GiftCheckPayment')){
      localStorage.removeItem('GiftCheckPayment')
      setGiftCheckAmount(0)
      return
    }
 
    const totalDueFloat: number = removeThousandSeparator(totalDue);
    const amountTenderedFloat: number = removeThousandSeparator(amountTendered);
    const remainingAmountDue: number = totalDueFloat - amountTenderedFloat;
    if (remainingAmountDue === 0){
      return;
    }
    setRemainingAmountDue(remainingAmountDue.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
    setGiftCheckPaymentModal(true)
  }
  
  const GiftCheckPaymentOK =(data:any) => {

    const GiftCheckPaymentData = data.GiftCheckPaymentList
    let totalD:any  = 0
    GiftCheckPaymentData.map((items:any) => {
      totalD = parseFloat(items.amount) +   parseFloat(totalD)
    });


    setGiftCheckAmount(totalD)
    localStorage.setItem('GiftCheckPayment',JSON.stringify(data))
    setGiftCheckPaymentModal(false)
  
  }
  
  const CloseGiftCheckPayment = () => {
    setGiftCheckPaymentModal(false)

  }
  
  const SaveGiftCheckPayment = async (data: { amounttendered: number; change:number; }) => {
    setGiftCheckPaymentModal(false)
  };

  //////******************************** END HERE **********************************/////

    //// ************************** ONLINE PAYMENT TYPE TRANSACTION ******************
  const OpenOnlinePayment = () => {
    if (localStorage.getItem('OnlinePayment')){
      localStorage.removeItem('OnlinePayment')
      setOnlineAmount(0)
      return
    }
 
    const totalDueFloat: number = removeThousandSeparator(totalDue);
    const amountTenderedFloat: number = removeThousandSeparator(amountTendered);
    const remainingAmountDue: number = totalDueFloat - amountTenderedFloat;
    if (remainingAmountDue === 0){
      return;
    }
    setRemainingAmountDue(remainingAmountDue.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
    setOnlinePaymentModal(true)
  }
  
  const OnlinePaymentOK =(data:any) => {

    const OnlinePaymentData = [data.OnlinekPaymentList]
    let totalD:any  = 0
    OnlinePaymentData.map((items:any) => {
      totalD = parseFloat(items.total_amount) +   parseFloat(totalD)
    });


    setOnlineAmount(totalD)
    localStorage.setItem('OnlinePayment',JSON.stringify(data))
    setOnlinePaymentModal(false)
  
  }
  
  const CloseOnlinePayment = () => {
    setOnlinePaymentModal(false)

  }
  
  const SaveOnlinePayment = async (data: { amounttendered: number; change:number; }) => {
    setOnlinePaymentModal(false)
  };

  //////******************************** END HERE **********************************/////


  //// ************************** OTHER PAYMENT TYPE TRANSACTION ******************
  const OpenOtherPayment = () => {
    if (localStorage.getItem('OtherPayment')){
      localStorage.removeItem('OtherPayment')
      setOnlineAmount(0)
      return
    }
 
    const totalDueFloat: number = removeThousandSeparator(totalDue);
    const amountTenderedFloat: number = removeThousandSeparator(amountTendered);
    const remainingAmountDue: number = totalDueFloat - amountTenderedFloat;
    if (remainingAmountDue === 0){
      return;
    }
    setRemainingAmountDue(remainingAmountDue.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
    setOtherPaymentModal(true)
  }
  
  const OtherPaymentOK =(data:any) => {

    const OtherPaymentData = data.OtherPaymentList
    let totalD:any  = 0
    OtherPaymentData.map((items:any) => {
      totalD = parseFloat(items.total_amount) +   parseFloat(totalD)
    });


    setOtherAmount(totalD)
    localStorage.setItem('OtherPayment',JSON.stringify(data))
    setOtherPaymentModal(false)
  
  }
  
  const CloseOtherPayment = () => {
    setOtherPaymentModal(false)

  }
  
  const SaveOtherPayment = async (data: { amounttendered: number; change:number; }) => {
    setOtherPaymentModal(false)
  };

  //////******************************** END HERE **********************************/////



  const SaveMultiplepaments = () => {
    const totalDueFloat: number = removeThousandSeparator(totalDue);
    const amountTenderedFloat: number = removeThousandSeparator(amountTendered);
    if (amountTenderedFloat >= totalDueFloat){
      MultiplepaymentsList({CashAmount})
      localStorage.removeItem('MULTIPLE')
    }else {
      showErrorAlert('Please check Amount Tendered...!')
    }

  }

    const Handlekeydown = (e:any,Backref:any,CurrentRe:any,Nextref:any) => {

        if (e.key === 'ArrowDown') {
            if (Nextref.current) {
                Nextref.current.focus();
                Nextref.current.select();
            }
        } else if (e.key === 'ArrowUp') {
            if (Backref.current) {
                Backref.current.focus();
                Backref.current.select();
            }
        }
        
        };


     
    

    useEffect(() => {
        localStorage.setItem('MULTIPLE','true')
        setamountDue(totalDue)
        setchange((parseFloat(CashAmount) + parseFloat(CurrentCheckAmount) + 
        parseFloat(DebitCardAmount) + parseFloat(CreditCardAmount) + parseFloat(CreditSalesAmount) - parseFloat(totalDue) ))
  
        if(CashAmount === isNaN || CashAmount === ''){
          setCashAmount(null)

        }
        if (CashAmountRef.current){
            CashAmountRef.current.focus()
            CashAmountRef.current.select()
        }
    },[])

    useEffect(() => {
        const cash :number = parseFloat(CashAmount) || 0;
        const check :number= parseFloat(CurrentCheckAmount) || 0;
        const debitCard:number = parseFloat(DebitCardAmount) || 0;
        const creditCard:number = parseFloat(CreditCardAmount) || 0;
        const creditSales:number = parseFloat(CreditSalesAmount) || 0;
        const giftcheck:number = parseFloat(OnlineAmount) || 0;
        const online:number = parseFloat(OtherAmount) || 0;
        const other:number = parseFloat(GiftCheckAmount) || 0;
        const totalDued:number = removeThousandSeparator(totalDue) ;
    
        const totalReceived = cash + check + debitCard + creditCard + creditSales + giftcheck + online + other;
        const change =   totalDued - totalReceived
    
        setchange(change);
        setamountTendered(totalReceived.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}));


    }, [CashAmount, CurrentCheckAmount, DebitCardAmount, CreditCardAmount, CreditSalesAmount, totalDue,OnlineAmount,OtherAmount,GiftCheckAmount]);
    
            
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
  
          if (e.key === 'F5') {
            e.preventDefault(); // Prevent the default browser refresh action for F5
          }
          else if (e.ctrlKey && e.key === 'n') {
            e.preventDefault(); // Prevent the default browser action for Control + N
          }
          else if ( e.key === 'F2') {
            e.preventDefault(); // Prevent the default browser action for Control + N
            console.log('F2')
          }  
          else if ( e.key === 'F1') {
            e.preventDefault(); // Prevent the default browser action for Control + N
          }
          else if ( e.key === 'F3') {
            e.preventDefault(); // Prevent the default browser action for Control + N
          }
          else if (e.ctrlKey && e.key === 's') { // Control + S
            e.preventDefault();
             if (CreditCardPaymentModal || DebitCardPaymentModal || GiftCheckPaymentModal ||
                  OnlinePaymentModal || OtherPaymentModal) {
                    return
              }
              SaveMultiplepaments()
            
        }else if (e.key === 'Escape') { // Control + S
            e.preventDefault();
            if (CreditCardPaymentModal || DebitCardPaymentModal || GiftCheckPaymentModal ||
                  OnlinePaymentModal || OtherPaymentModal) {
                    return
              }
              handleclose()
            
        }
    }
        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [CreditCardPaymentModal,DebitCardPaymentModal,GiftCheckPaymentModal,OnlinePaymentModal,OtherPaymentModal,
        CreditCardAmount,DebitCardAmount,CashAmount,GiftCheckAmount,OnlineAmount,OtherAmount,amountTendered
      ]);   



      const [focusedInput, setFocusedInput] = useState<any>('');
      const [cursorPosition, setCursorPosition] = useState<any>(0);
      const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);
      const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);
      const [isShow, setisShow] = useState<boolean>(false);
  
      const showOnScreenKeybaord = (ref:any) => {
        if (isDesktop){
            setisShowKeyboard(true)
              setFocusedInput(ref) 
        }
      }
  
      const ShowKeyorNot = () => {
        setisShow(!isShow);
      }
      const setvalue = (value: any) => {
        if (focusedInput) {
          if (value > parseFloat(amountDue)){
              if (focusedInput  ==='Cash') {
                setCashAmount(value)
                  setisShowKeyboard(false)
                return
              } 
            let x:any = amountDue.replace(',', '')
            setCashAmount(x)
          }else{
            if (value){
              setCashAmount(value)
            }else{
              setCashAmount(null)
            }
          
          }
         
         }
  
        
        setisShowKeyboard(false)
      };
      const closekeyBoard = () => {
        setisShowKeyboard(false)
      }
  
      useEffect(()=>{

         const api = getextendedAMTAPI();
        const x : any = {
              Amount:amountTendered,
              Change:0
        }
        api.sendTendered(x); 
      

      },[amountTendered])
  
    return(
      <>
    
        <div className="modal">

            <div className="modal-content-multiple">

                <h1>Multiple Payments</h1>

                <div className="Container">
                    <div className="form-group">
                        <label>Cash</label>
                        <input ref={CashAmountRef} value={(CashAmount)}  placeholder="0.00"
                        onClick={()=> showOnScreenKeybaord('Cash')}
                        type='number'
                        onKeyDown={(e) => Handlekeydown(e,CashAmountRef,CashAmountRef,CurrentCheckAmountRef)}
                        onChange={(e)=>setCashAmount(e.target.value)}
                        // onChange={(e) => {
                        // const value = e.target.value;
                        //  const isNumber = /^[0-9]*$/;
                        //   if (isNumber.test(value)) {
                        //    setCashAmount(value); } 
                        //   }}
                           style={{width:'77%'}}
                        />
                    </div>
                    <div className="form-group">
                        <label>Current Check</label>
                        <button ref={CurrentCheckAmountRef}
                        onKeyDown={(e) => Handlekeydown(e,CashAmountRef,CurrentCheckAmountRef,DebitCardAmountRef)}
                        >Click here..</button>
                        <input  value={CurrentCheckAmount} 

                         placeholder="0.00" readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Debit Card</label>
                        <button ref={DebitCardAmountRef}
                        onKeyDown={(e) => Handlekeydown(e,CurrentCheckAmountRef,DebitCardAmountRef,CreditCardAmountRef)}
                        onClick={OpenDebitCardPayment}
                        >Click here..</button>
                        <input  value={DebitCardAmount}  placeholder="0.00" 

                        readOnly/>
                    </div>
                    <div className="form-group">
                    <label>Credit Card</label>
                    <button  ref={CreditCardAmountRef}
                        onKeyDown={(e) => Handlekeydown(e,DebitCardAmountRef,CreditCardAmountRef,CreditSalesAmountRef)}
                        onClick={OpenCreditCardPayment}
                        >Click here..</button>
                        <input value={CreditCardAmount}   placeholder="0.00" 
      
                        readOnly/>
                    </div>
                    <div className="form-group">
                        <label>Credit Sales</label>
                        <button ref={CreditSalesAmountRef} 
                        onKeyDown={(e) => Handlekeydown(e,CreditCardAmountRef,CreditSalesAmountRef,SaveButtonRef)}
                        >Click here..</button>
                        <input value={CreditSalesAmount}  placeholder="0.00" 

                        readOnly/>
                        
                    </div>

                    <div className="form-group">
                      <label>Gift Check</label>
                      <button  ref={GiftCheckAmountRef}
                          onKeyDown={(e) => Handlekeydown(e,CreditCardAmountRef,GiftCheckAmountRef,OnlineAmountRef)}
                          onClick={OpenGiftCheckPayment}
                          >Click here..</button>
                          <input value={GiftCheckAmount}   placeholder="0.00" 
                          readOnly/>
                    </div>

                    <div className="form-group">
                      <label>Online Payment</label>
                      <button  ref={OnlineAmountRef}
                          onKeyDown={(e) => Handlekeydown(e,GiftCheckAmountRef,OnlineAmountRef,OtherAmountRef)}
                          onClick={OpenOnlinePayment}
                          >Click here..</button>
                          <input value={OnlineAmount}   placeholder="0.00" 
                          readOnly/>
                    </div>

                    <div className="form-group">
                      <label>Other Payment</label>
                      <button  ref={OtherAmountRef}
                          onKeyDown={(e) => Handlekeydown(e,OnlineAmountRef,OtherAmountRef,SaveButtonRef)}
                          onClick={OpenOtherPayment}
                          >Click here..</button>
                          <input value={OtherAmount}   placeholder="0.00" 
                          readOnly/>
                    </div>

                </div>

                
                <div className="Container">
                    <div className="form-group">
                        <label>Amount Due</label>
                        <input value={amountDue} placeholder="0.00" disabled />
                    </div>
                    <div className="form-group">
                        <label>Amount Tendered</label>
                        <input value={amountTendered} placeholder="0.00" disabled/>
                    </div>
                    <div className="form-group">
                        <label>Balance</label>
                        <input value={parseFloat(change).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                        placeholder="0.00" disabled/>
                    </div>


                </div>

                <div className="Button-Container">
                    <Button ref={SaveButtonRef}  
                        onKeyDown={(e) => Handlekeydown(e,OtherAmountRef,SaveButtonRef,CloseButtonRef)}
                        style={{backgroundColor:'blue'}}
                        onClick={SaveMultiplepaments}
                        >Save</Button>
                    <Button ref={CloseButtonRef}
                     style={{backgroundColor:'Red'}}
                         onKeyDown={(e) => Handlekeydown(e,SaveButtonRef,CloseButtonRef,SaveButtonRef)}

                         onClick={handleclose}
                        >Close
                    </Button>

                    {/* <Button className="btn-show"  type='button' 
                      onClick={ShowKeyorNot}>Keyboard {isShow ? 'Disable':'Enable'}
                    </Button> */}

                </div>
            </div>
            {CreditCardPaymentModal && <CreditCardPayment handleClose={CloseCreditCardPayment} amountdue={RemainingAmountDue} CreditCardPayment ={CreditCardPaymentOk}/>}
            {CreditCardPaymentEntryModal && <CreditCardPaymentEntry handleClose={CloseCreditCardPaymentEntryModal} amountdue={totalDue} amounttendered={SaveCreditCardPayment} />}
            {DebitCardPaymentModal && <DebitCardPayment handleClose={CloseDebitCardPayment} amountdue={RemainingAmountDue} debitcardpayment ={DebitCardPaymentOK}/>}
            {DebitCardPaymentEntryModal && <DebitCardPaymentEntry handleClose={CloseDebitCardPaymentEntryModal} amountdue={totalDue} amounttendered={SaveDebitCardPayment} />}
            {GiftCheckPaymentModal && <GiftCheckPaymentTransModal handleClose={CloseGiftCheckPayment} amountdue={RemainingAmountDue} GiftCheckPayment ={GiftCheckPaymentOK}/>}               
            {OnlinePaymentModal && <OnlinePaymentTransModal handleClose={CloseOnlinePayment} amountdue={RemainingAmountDue} OnlinePayment ={OnlinePaymentOK}/>}               
            {OtherPaymentModal && <OtherPaymentTransModal handleClose={CloseOtherPayment} amountdue={RemainingAmountDue} OtherPayment ={OtherPaymentOK}/>}               
              
        </div>
        {isShowKeyboard && <OnScreenKeyboardNumeric  handleclose = {closekeyBoard}  currentv = {CashAmount ===null ? '':CashAmount} setvalue={setvalue}/>}
        </>
    )

}

export default MultiplePayments;