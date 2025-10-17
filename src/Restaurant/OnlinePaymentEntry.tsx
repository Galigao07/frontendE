/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import getextendedAMTAPI from "../utils/getAmountTenderedAPI";

interface  OnlinePaymentData{
    handleClose:() => void;
    amountdue:any;
    amounttendered:any;
}

const OnlinePaymentEntryTransModal: React.FC<OnlinePaymentData> = ({handleClose,amountdue,amounttendered}) => {

    const [amountReceived, setAmountReceived] = useState<any>('');

    const [changeDue, setChangeDue] = useState(0);

    const amountReceivedRef = useRef(null);
  
  

    const handleOk = () => {
  
      if (Number.isNaN(amountdue)) {
        Swal.fire({
          title: 'Error',
          text: 'Invalid Amount Tendered..!',
          icon: 'info',
          confirmButtonText: 'OK'
        });   
        return;
      }
      
  
      const due = amountdue.replace(/,/g, '')
  
      if (parseFloat(due) > (due !== '' ? parseFloat(due) : 0)) {
        Swal.fire({
          title: 'Error',
          text: 'Amount due is greater than Amount Tendered received. Please enter a valid amount.',
          icon: 'info',
          confirmButtonText: 'OK'
        });
      } else {
        amounttendered({
          amounttendered: amountdue,
          change: changeDue,
        });

         const api = getextendedAMTAPI();
                const x : any = {
                      Amount:amountdue,
                      Change:changeDue
                }
                api.sendTendered(x); 
      }

    };
  

  
    const handleAmountReceivedChange = (value: string) => {
      setAmountReceived(parseFloat(value));
    };
  
  

  
    useEffect(() => {
  
      const amountWithoutCommas = amountdue.replace(/,/g, '')
      const change = amountReceived - amountWithoutCommas;
      setChangeDue(change >= 0 ? change : 0);
    }, [amountReceived, amountdue]);


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
          handleOk();
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
  
    return (
      <div>
      <div className="modal" >
            <div className="modal-content-CreditCard" >
            <h2 style={{ color: '#ffffff', backgroundColor: '#007bff', padding: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
          borderRadius: '5px', margin: '10px',
          fontWeight: 'bold', textAlign: 'center'
        }}>ONLINE PAYMENT</h2>
  
  <div style={{display:'flex',flexDirection:'row'}}>
      <div style={{display:'flex',flexDirection:'row' ,width:'120%' }}>
          <div style={{display:'flex',flexDirection:'column' , border:' 2px solid #ccc', borderRadius: '8px',padding:'20px'}}>
                  <p style={{ fontSize: '20px', fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>TOTAL AMOUNT DUE:</p>
                      <p style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue',  color: 'red', 
                      padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px' ,textAlign:'end' }}>  Php {amountdue}</p>
                  
  
              
                  <p style={{ fontSize: '20px', fontWeight: 'bold',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'}}>AMOUNT TENDERED</p>
                      <input style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid', margin: '10px',  color: 'Black', 
                      padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  ,textAlign:'end' ,width:'93%'}}
                      type="text"
                      onChange={(e) => handleAmountReceivedChange(e.target.value)}
                      autoComplete="off"
                      id="input1"
                      readOnly
                      ref={amountReceivedRef}
                      value={amountdue}
                      required/>
                      
                  {/* <img src= {} style={{height:'200px',width:'100%',marginTop:'20px'}}/> */}
         
          </div>
        </div>
            </div>
            
            <div>
            <Button  style={{ width: '48%',margin:'5px 5px 0 0 ',backgroundColor:'blue'}} onClick={handleOk}> Confrim </Button>
            <Button  style={{ width: '48%',margin:'5px 5px 0 0',backgroundColor:'red'}} onClick={handleClose}> Abort</Button> 

            </div>
            
            </div>
      </div>
      </div>
    );
  };
  

export default OnlinePaymentEntryTransModal;