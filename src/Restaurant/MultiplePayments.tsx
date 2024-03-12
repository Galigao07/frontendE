import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import BASE_URL from "../config";
import './css/MultiplePayments.css'
import { Button } from "@mui/material";
import CreditCardPaymentEntry from './CreditCardPayment';
import DebitCardPaymentEntry from './DebitCardPayment';
import CreditCardPayment from './CreditCard';
import DebitCardPayment from './DebitCard';
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
    const [CashAmount, setCashAmount] = useState<any>('0.00')
    const [CurrentCheckAmount, setCurrentCheckAmount] =  useState<any>('0.00')
    const [DebitCardAmount, setDebitCardAmount] = useState<any>('0.00')
    const [CreditCardAmount, setCreditCardAmount] =  useState<any>('0.00')
    const [CreditSalesAmount, setCreditSalesAmount] = useState<any>('0.00')
    const [RemainingAmountDue,setRemainingAmountDue] = useState<any>(0)

    const [amountDue, setamountDue] = useState<any>('0.00')
    const [amountTendered, setamountTendered] =  useState<any>('0.00')
    const [change, setchange] =  useState<any>('0.00')


    const CashAmountRef = useRef<HTMLInputElement>(null);
    const CurrentCheckAmountRef = useRef<HTMLButtonElement>(null);
    const DebitCardAmountRef = useRef<HTMLButtonElement>(null);
    const CreditCardAmountRef = useRef<HTMLButtonElement>(null);
    const CreditSalesAmountRef = useRef<HTMLButtonElement>(null);
    const SaveButtonRef = useRef<HTMLButtonElement>(null);
    const CloseButtonRef = useRef<HTMLButtonElement>(null);


//// ************************** CREDIT CARD PAYMENT TYPE TRANSACTION ******************

const OpenCreditCardPayment = () => {
  localStorage.removeItem('CreditCardPayment')
    setCreditCardPaymentModal(true)
    const totalDueFloat: number = removeThousandSeparator(totalDue);
    const amountTenderedFloat: number = removeThousandSeparator(amountTendered);
    const remainingAmountDue: number = totalDueFloat - amountTenderedFloat;
    setRemainingAmountDue(remainingAmountDue)
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
    localStorage.removeItem('DebitCardPayment')
    setDebitCardAmount(0)
    const totalDueFloat: number = removeThousandSeparator(totalDue);
    const amountTenderedFloat: number = removeThousandSeparator(amountTendered);
    const remainingAmountDue: number = totalDueFloat - amountTenderedFloat;
    setRemainingAmountDue(remainingAmountDue)
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
  


  const SaveMultiplepaments = () => {
    MultiplepaymentsList({CashAmount})
    localStorage.removeItem('MULTIPLE')
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
        const totalDued:number = removeThousandSeparator(totalDue) ;
    
        const totalReceived = cash + check + debitCard + creditCard + creditSales;
        const change = totalReceived - totalDued
    
        setchange(change);
        setamountTendered(totalReceived.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}));

        
    }, [CashAmount, CurrentCheckAmount, DebitCardAmount, CreditCardAmount, CreditSalesAmount, totalDue]);
    
            
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
        };
    }
        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, []);   


    return(
        <div className="modal">

            <div className="modal-content-multiple">

                <h1>Multiple Payments</h1>

                <div className="Container">
                    <div className="form-group">
                        <label>Cash</label>
                        <input ref={CashAmountRef} value={CashAmount}  placeholder="0.00"
                        onKeyDown={(e) => Handlekeydown(e,CashAmountRef,CashAmountRef,CurrentCheckAmountRef)}
                        onChange={(e) => {
                        const value = e.target.value;
                         const isNumber = /^[0-9]*$/;
                          if (isNumber.test(value)) {
                           setCashAmount(value); } }}
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
                        <label>Change</label>
                        <input value={parseFloat(change).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                        placeholder="0.00" disabled/>
                    </div>


                </div>

                <div className="Button-Container">
                    <button ref={SaveButtonRef}  className="btn" 
                        onKeyDown={(e) => Handlekeydown(e,CreditSalesAmountRef,SaveButtonRef,CloseButtonRef)}
                        style={{backgroundColor:'blue'}}
                        onClick={SaveMultiplepaments}
                        >Save</button>
                    <button ref={CloseButtonRef}
                         onKeyDown={(e) => Handlekeydown(e,SaveButtonRef,CloseButtonRef,SaveButtonRef)}

                         onClick={handleclose}
                    >Close</button>

                </div>
            </div>
            {CreditCardPaymentModal && <CreditCardPayment handleClose={CloseCreditCardPayment} amountdue={RemainingAmountDue} CreditCardPayment ={CreditCardPaymentOk}/>}
            {CreditCardPaymentEntryModal && <CreditCardPaymentEntry handleClose={CloseCreditCardPaymentEntryModal} amountdue={totalDue} amounttendered={SaveCreditCardPayment} />}
            {DebitCardPaymentModal && <DebitCardPayment handleClose={CloseDebitCardPayment} amountdue={RemainingAmountDue} debitcardpayment ={DebitCardPaymentOK}/>}
            {DebitCardPaymentEntryModal && <DebitCardPaymentEntry handleClose={CloseDebitCardPaymentEntryModal} amountdue={totalDue} amounttendered={SaveDebitCardPayment} />}
        </div>
    )

}

export default MultiplePayments;