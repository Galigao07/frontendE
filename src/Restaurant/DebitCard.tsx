/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import './css/DebitCard.css'
import Swal from "sweetalert2";
import { Button, Grid, Table, Typography } from "@mui/material";



interface DebitCardPaymentTrans {
    handleClose:() => void;
    amountdue:any;
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

const DebitCardPayment: React.FC<DebitCardPaymentTrans> = ({handleClose,amountdue})=> {
    const cardNoRef = useRef<HTMLInputElement>(null);
    const acquireBankRef = useRef<HTMLInputElement>(null);
    const cardIssuerRef = useRef<HTMLInputElement>(null);
    const cardHolderRef = useRef<HTMLInputElement>(null);
    const approvalNoRef = useRef<HTMLInputElement>(null);
    const AmountDueRef = useRef<HTMLInputElement>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(null);
    const [DebitCardPaymentList,setDebitCardPaymentList] = useState<any>([])

    const [DebitCardPaymentData,setDebitCardPaymentData] = useState({
        CardNo:'',
        AcquireBank:'',
        CardIssuer:'',
        CardHolder:'',
        ApprovalNo:'',
        AmountDue:'',
    })

    useEffect(() => {

        setTimeout(() => {
            if (cardNoRef.current){
                cardNoRef.current.focus();
                cardNoRef.current.select()
            }
        }, 100);
        setDebitCardPaymentData({...DebitCardPaymentData,AmountDue:amountdue})
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
                console.log('Success')
                setDebitCardPaymentData({
                    CardNo:'',
                    AcquireBank:'',
                    CardIssuer:'',
                    CardHolder:'',
                    ApprovalNo:'',
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
          }
        }

        if (event === 'Enter') {
          if (nextRef.current) {
            nextRef.current.focus();
          }
        }
};


const HandleCreditCardEntry = (e:any) => {
    const { name, value } = e.target;
    setDebitCardPaymentData({ ...DebitCardPaymentData, [name]: value });


if (name == 'CardNo') {
    const numericValue = value.replace(/\D/g, '');

    // Limit to 16 characters
    const limitedValue = numericValue.slice(0, 16);

    // Format the credit card number with dashes
    const formattedValue = limitedValue.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');

    // Update the state with the formatted value
    setDebitCardPaymentData((prevData) => ({
      ...prevData,
      [name]: formattedValue,
    }));
}
if (name== 'ApprovalNo'){
    const numericValue = value.replace(/\D/g, '');
    setDebitCardPaymentData((prevData) => ({
        ...prevData,
        [name]: numericValue,
      }));
}

// if (name== 'AmountDue'){
//     const numericValue = value.replace(/\D/g, '');
//     setDebitCardPaymentData((prevData) => ({
//         ...prevData,
//         [name]: numericValue,
//       }));
// }


}

const [errorData,seterrorData] = useState('')
const [errorView,seterrorView]= useState(false)
const validateDataAndAddToList = () => {
    if (DebitCardPaymentData.AmountDue === '') {
        seterrorView(true)
        seterrorData('Please Provide Amount')
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }
    if (DebitCardPaymentData.AmountDue === '0') {
        seterrorView(true)
        seterrorData('Please Provide Amount More than Zero')
        // showErrorAlert('Please Provide Amount More than Zero');
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }
    if (DebitCardPaymentData.AcquireBank === '') {
        seterrorView(true)
        seterrorData('Please Provide Bank')
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }
    if (DebitCardPaymentData.CardNo === '') {
        seterrorView(true)
     seterrorData('Please Provide Card No.')
    //   showErrorAlert('Please Provide Card No.');
    setTimeout(() => {
        seterrorView(false)
        seterrorData('')
    }, 2000);
      return false;
    }
    if (DebitCardPaymentData.CardIssuer === '') {
        seterrorView(true)
        seterrorData('Please Provide Card Issuer')
    //   showErrorAlert('Please Provide Card Issuer');
    setTimeout(() => {
        seterrorView(false)
        seterrorData('')
    }, 2000);
      return false;
    }
    if (DebitCardPaymentData.ApprovalNo === '') {
        seterrorView(true)
        seterrorData('Please Provide Approval No.')
    //   showErrorAlert('Please Provide Approval No.');
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
            
        if (parseFloat(amountdue) < (totalAmountDue + parseFloat(DebitCardPaymentData.AmountDue))){
                seterrorView(true)  
                seterrorData('Total Amount Tendered more than Amount Due..')
                setTimeout(() => {
                    seterrorView(false)
                    seterrorData('')
                }, 2000);
        
                return;
                } 
                
    if (validateDataAndAddToList()) {
        setDebitCardPaymentList([...DebitCardPaymentList, DebitCardPaymentData]);
        setDebitCardPaymentData({
          CardNo: '',
          AcquireBank: '',
          CardIssuer: '',
          CardHolder: '',
          ApprovalNo: '',
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
        
    if (parseFloat(amountdue) < (totalAmountDue + parseFloat(DebitCardPaymentData.AmountDue))){
            seterrorView(true)  
            seterrorData('Total Amount Tendered more than Amount Due..')
            setTimeout(() => {
                seterrorView(false)
                seterrorData('')
            }, 2000);
    
            return;
            } 
            

if (validateDataAndAddToList()) {
    setDebitCardPaymentList([...DebitCardPaymentList, DebitCardPaymentData]);
    setDebitCardPaymentData({
      CardNo: '',
      AcquireBank: '',
      CardIssuer: '',
      CardHolder: '',
      ApprovalNo: '',
      AmountDue: '',
    });
  }
  }

  let totalAmountDue = 0;
  DebitCardPaymentList.forEach((payment: { AmountDue: any; }) => totalAmountDue += parseFloat(payment.AmountDue));


const SelectData = (index:any) =>{
    setisEdit(true)
    
    setTimeout(() => {
        if (cardNoRef.current){
            cardNoRef.current.focus();
            cardNoRef.current.select()
        }
    }, 100);
    const selectedItem = DebitCardPaymentList[index];
    setDebitCardPaymentData((prevData) => ({
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
    if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < DebitCardPaymentList.length) {
      const updatedItems = [...DebitCardPaymentList];
      updatedItems.splice(selectedItemIndex, 1);
      setDebitCardPaymentList(updatedItems);
        setSelectedItemIndex(null)
        setDebitCardPaymentData({
            CardNo: '',
            AcquireBank: '',
            CardIssuer: '',
            CardHolder: '',
            ApprovalNo: '',
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

    if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < DebitCardPaymentList.length) {

        if (validateDataAndAddToList()){
            const updatedItems = [...DebitCardPaymentList];
            updatedItems[selectedItemIndex].AcquireBank = DebitCardPaymentData.AcquireBank;
            updatedItems[selectedItemIndex].AmountDue = DebitCardPaymentData.AmountDue;
            updatedItems[selectedItemIndex].ApprovalNo = DebitCardPaymentData.ApprovalNo;
            updatedItems[selectedItemIndex].CardHolder = DebitCardPaymentData.CardHolder;
            updatedItems[selectedItemIndex].CardIssuer = DebitCardPaymentData.CardIssuer;
            updatedItems[selectedItemIndex].CardNo = DebitCardPaymentData.CardNo;
      
           // Update the quantity to the new value
            setDebitCardPaymentList(updatedItems);
            setSelectedItemIndex(null)
            setDebitCardPaymentData({
              CardNo: '',
              AcquireBank: '',
              CardIssuer: '',
              CardHolder: '',
              ApprovalNo: '',
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
 const bal : any = parseFloat(amountdue) - totalAmountDue
        setDebitCardPaymentData({...DebitCardPaymentData,AmountDue: bal})
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
        }else {
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


    return (


        <div className="modal" >
            <div className="modal-content-debit">
                <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                            DEBIT CARD</h2>
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
               
                    
                    <Grid container className="DebitCard-Container" spacing={2}>
                        <Grid item xs={12} md={5} style={{ height: '100%',width:'40%'}}>
                       
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography 

                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>Card No.</Typography>
                            <input type="text" placeholder="0000-0000-0000-0000"  autoComplete="off" ref={cardNoRef}
                            onKeyDown={(e) => handleKeyDown(e, cardNoRef, acquireBankRef)} 
                            value={DebitCardPaymentData.CardNo}
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
                            value={DebitCardPaymentData.AcquireBank} 
                            name="AcquireBank" 
                            onChange={HandleCreditCardEntry}/>
                        </div>

                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>Card Issuer</Typography>
                            <input type="text" placeholder="Card Issuer"  autoComplete="off" ref={cardIssuerRef}
                            onKeyDown={(e) => handleKeyDown(e, cardIssuerRef, cardHolderRef)} 
                            value={DebitCardPaymentData.CardIssuer}
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
                            value={DebitCardPaymentData.CardHolder} name="CardHolder"
                            onChange={HandleCreditCardEntry}/>
              
                        </div>
                        <div style={{display:'flex',flexDirection:'row'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}} >Approval No.</Typography>
                            <input type="text" placeholder="000000"  autoComplete="off"   ref={approvalNoRef}
                            onKeyDown={(e) => handleKeyDown(e, approvalNoRef, AmountDueRef)} 
                            value={DebitCardPaymentData.ApprovalNo} name="ApprovalNo"
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

                            value={parseFloat(DebitCardPaymentData.AmountDue).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                            onKeyDown={AddToList} />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <div style={{ width: '100%', margin:'5px'}}>
                                {viewSave ? (
                                        <Button  onClick={SaveCreditPayment} disabled = {isEdit}  style={{
                                            backgroundColor: isEdit ? 'gray' : 'blue', // Different color when disabled
                                            cursor: isEdit ? 'not-allowed' : 'pointer', // Change cursor when disabled
                                          }} >SAVE</Button>
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
                            <div style={{height:'270px' ,overflow:'auto'}}>

                        
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
        
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(DebitCardPaymentList) && DebitCardPaymentList.length > 0 ? (
                                DebitCardPaymentList.map((item, index) => (
                                    <tr key={index} style={{textAlign:'center'}} onClick={() => SelectData(index)}>
                                    <td>{item.CardNo}</td>
                                    <td>{item.AcquireBank}</td>
                                    <td>{item.CardIssuer}</td>
                                    <td>{item.CardHolder}</td>
                                    <td>{item.AmountDue}</td>
                                    <td style={{display:'none'}}>{item.ApprovalNo}</td>
                    
                    
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


        
            </div>
        </div>

  
    )
}

export default DebitCardPayment;