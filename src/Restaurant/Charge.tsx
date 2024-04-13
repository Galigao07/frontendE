/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Table } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import './css/Charge.css'
import axios from "axios";
import BASE_URL from "../config";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";



import Swal from 'sweetalert2';
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import { GetSettings } from "../global";

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

interface ChargeToTrans {
    handleClose: () => void;
    amountdue:any;
    chargedata:any;

}



const ChargeTo: React.FC<ChargeToTrans> = ({handleClose,amountdue,chargedata}) => {
    const [ChargeToRoomModal,setChargeToRoomModal] = useState(false)
    const [ChargeToCustomerAccountModal,setChargeToCustomerAccountModal] = useState(false)
    const [ChargeToEventModal,setChargeToEventModal] = useState(false)
    const [OpenPaymentModal,setOpenPaymentModal] = useState(false)

    

    useEffect(() => {
      const fetchdata = async() => {
        const withHotel = await GetSettings('withHotel')

          if (withHotel === 'False'){
            OpenChargeCustomer()
            setTimeout(() => {
              if(CategoryRef.current){
                CategoryRef.current.focus()
              }
            }, 100);
          }

      }
      fetchdata()
      }, []);
      
    
const handleOk = () =>{
  chargedata({ChargeCustomerAccount})
}


// ******************* CHARGE TO ROOM TRANSACTION **********************//
const [ChargeToRoomData,setChargeToRoomData] = useState({
    Room:'',
    Folio:'',
    GuestName:'',
    StayDuration1:'',
    StayDuration2:'',
    StayDuration3:'',
    GuestStatus:'',
    AmountDue:'',
})

const RoomRef = useRef<HTMLInputElement>(null);
const FolioRef = useRef<HTMLInputElement>(null);
const GuestNameRef = useRef<HTMLInputElement>(null);
const StayDuration1Ref = useRef<HTMLInputElement>(null);
const StayDuration2Ref = useRef<HTMLInputElement>(null);
const StayDuration3Ref = useRef<HTMLInputElement>(null);
const GuestStatusRef = useRef<HTMLInputElement>(null);



const OpenChargeToRoomModal = () => {
    setChargeToRoomModal(true)
    setChargeToRoomData({...ChargeToRoomData, AmountDue:amountdue})
}
const SaveChargeToRoom = async () => {
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
                try {
                    const response = await axios.post(`${BASE_URL}/api/save-charge-to-room`)
               
                    if (response.status==200){
                       showSuccessAlert(response.data.message)

                       setChargeToRoomData({        
                       Room:'',
                       Folio:'',
                       GuestName:'',
                       StayDuration1:'',
                       StayDuration2:'',
                       StayDuration3:'',
                       GuestStatus:'',
                       AmountDue:'',
                         })


                       Swal.fire({
                        title: 'Successfull',
                        text: 'Waiter Successfully Added!',
                        icon: 'success', // You can use 'success', 'error', 'warning', 'info', 'question'
                        confirmButtonText: 'OK'
                      });
                      
                      // Close the SweetAlert after 2 seconds (2000 milliseconds)
                      setTimeout(() => {
                        Swal.close();
                      }, 2000);
                    }


                } catch(error:any){

                    showErrorAlert(error.response)
                }
            }
            
        })}

// *************************** End Here **************************//


// ******************* CHARGE TO CUSTOMER ACCOUNT TRANSACTION **********************//

const OpenChargeCustomer = () => {
    setChargeToCustomerAccountModal(true)
    setChargeCustomerAccount({...ChargeCustomerAccount, Amountdue:amountdue})
}

const [ChargeCustomerAccount,setChargeCustomerAccount] = useState({
    CategoryID:'',
    Category:'',
    CustomerID:'',
    CustomerName:'',
    Terms:'1',
    CreditLimit:'0',
    Amountdue:'',
})

const CategoryRef = useRef<HTMLInputElement>(null);
const CustomerIDRef = useRef<HTMLInputElement>(null);
const CustomerNameRef = useRef<HTMLInputElement>(null);
const TermsRef = useRef<HTMLInputElement>(null);
const CreditLimitRef = useRef<HTMLInputElement>(null);
const [OpenCategoryModal,setOpenCategoryModal] = useState<boolean>(false)
const [categoryList,setcategoryList] = useState<any>([])
const [CustomerList,setCustomerList] = useState<any>([])
const [OpenCustomerModal,setOpenCustomerModal] = useState<boolean>(false)

const SaveChargeToCustomer =() => {
    swalWithBootstrapButtons.fire({
        title: 'Confirmation',
        text: "Do you want Save this transaction?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
        }).then((result) => {
        if (result.isConfirmed) {
            try {
              setChargeToCustomerAccountModal(false)
              setOpenPaymentModal(true)

            } catch(error:any){

                showErrorAlert(error.response)
            }
        }
        
})
}

const fetchCategory = async()=> {
  try{
const response = await axios.get(`${BASE_URL}/api/customer-category/`,{params: {
  category:ChargeCustomerAccount.CustomerID
}})
if (response.status == 200){
  setcategoryList(response.data.data)

  // showSuccessAlert('Success')
}
  }catch{
    showErrorAlert('Error While Fetching Category List')
  }
}

const fetchCustomerwithCategory = async()=> {
  try{
const response = await axios.get(`${BASE_URL}/api/customer-with-category/`,{params: {
  category:ChargeCustomerAccount.Category
}})
if (response.status == 200){

  setCustomerList(response.data)

  // showSuccessAlert('Success')
}
  }catch{
    showErrorAlert('Error While Fetching Customer List')
  }
}

const selectCategory = (index:any) => {
const selected = categoryList[index]

// setChargeCustomerAccount({...ChargeCustomerAccount,CategoryID:selected.code})
setChargeCustomerAccount({...ChargeCustomerAccount,
  CategoryID:selected.code,
  Category:selected.category})
setOpenCategoryModal(false)

if (CustomerIDRef.current){
  CustomerIDRef.current.focus();
  CustomerIDRef.current.select();
}

}

const selectCustomer = (index:any) => {
  const selected = CustomerList[index]
  
  setChargeCustomerAccount({
    ...ChargeCustomerAccount,
    CustomerID: selected.id_code,
    CustomerName: selected.trade_name
  });
  setOpenCustomerModal(false)
  
  if (TermsRef.current){
    TermsRef.current.focus();
    TermsRef.current.select();
  }
  
  }


// *************************** End Here **************************//


// ******************* CHARGE TO EVENT**********************//



const OpenChargeEvent = () => {
    setChargeToEventModal(true)
    setChargeToEvent({...ChargeToEvent, Amountdue:amountdue})
}

const [ChargeToEvent,setChargeToEvent] = useState({
    BEONO:'',
    CustomerEventID:'',
    CustomerEventName:'',
    EventName:'',
    CreditLimitEvent:'',
    Amountdue:'',
})

const BEONORef = useRef<HTMLInputElement>(null);
const CustomerEventIDRef = useRef<HTMLInputElement>(null);
const CustomerEventNameRef = useRef<HTMLInputElement>(null);
const EventNameRef = useRef<HTMLInputElement>(null);
const CreditLimitEventRef = useRef<HTMLInputElement>(null);

const SaveChargeToEvent = async () => {
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
            try {
                const response = await axios.post(`${BASE_URL}/api/save-charge-to-event`)

                if (response.status==200){
                   showSuccessAlert(response.data.message)

                   setChargeCustomerAccount({        
                    CategoryID:'',
                    Category:'',
                    CustomerID:'',
                    CustomerName:'',
                    Terms:'',
                    CreditLimit:'',
                    Amountdue:'',
                     })


                   Swal.fire({
                    title: 'Successfull',
                    text: 'Waiter Successfully Added!',
                    icon: 'success', // You can use 'success', 'error', 'warning', 'info', 'question'
                    confirmButtonText: 'OK'
                  });
                  
                  // Close the SweetAlert after 2 seconds (2000 milliseconds)
                  setTimeout(() => {
                    Swal.close();
                  }, 2000);
                }


            } catch(error:any){

                showErrorAlert(error.response)
            }
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
            SaveChargeToEvent();
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

      const HandleEntryCustomerAccount = (e:any) => {
        const { name, value } = e.target;
        // Update the state with the formatted value
        setChargeCustomerAccount((prevData:any) => ({
          ...prevData,
          [name]: value,
        })); 
}
   
    
  

    return (
    <div>
        
    <Grid
        container
        className='Charge-trans'
        style={{ height: '100vh' }}
        spacing={1}
        justifyContent="space-between" // Adjust alignment as needed
        >
        <div className="modal" >
          <div className="modal-content">
          <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                    SELECT CHARGE TYPE</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px' ,margin:'5px'}}>


            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',    justifyContent: 'center', // Center content horizontally
              }} onClick={OpenChargeToRoomModal}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,height:'70px',fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               CHARGE TO ROOM GUEST</p>
            </div>
              

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',    justifyContent: 'center',
              }} onClick={OpenChargeCustomer}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               CHARGE TO CUSTOMER ACCOUNT</p>
   
            </div>

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',    justifyContent: 'center', // Center content horizontally
              }} onClick={OpenChargeEvent}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               CHARGE TO EVENT</p>

            </div>



            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',    justifyContent: 'center', // Center content horizontally
              }} onClick={handleClose}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
              CLOSE</p>

            </div>
          </div>

     </div>
     </div>

    </Grid>

{ChargeToRoomModal && (

        <div className="modal" >
            <div className="modal-content" >
            <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
            CHARGE TO ROOM</h2>
            <div className="charge-container"> 
            <div style={{display:'flex',flexDirection:'column'}}>
                <label style={{textAlign:'start'}}>Room/Folio</label>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>

                <input type="text" placeholder="ROOM"  autoComplete="off" style={{ width: '48%' }} ref={RoomRef}
                    onKeyDown={(e) => handleKeyDown(e, RoomRef, FolioRef)} 
                    value={ChargeToRoomData.Room}/>
                <input type="text" placeholder="FOLIO"  autoComplete="off" style={{ width: '48%' }} ref={FolioRef}
                    onKeyDown={(e) => handleKeyDown(e, FolioRef, GuestNameRef)} 
                    value={ChargeToRoomData.Folio}/>
                </div>
            </div>

            <div style={{display:'flex',flexDirection:'column'}}>
                <label>Guest Name</label>
                <input type="text" placeholder="Guest"  autoComplete="off" ref={GuestNameRef}
                onKeyDown={(e) => handleKeyDown(e, GuestNameRef, StayDuration1Ref)} 
                  value={ChargeToRoomData.GuestName}/>
            </div>

            <div style={{display:'flex',flexDirection:'column'}}>
                <label>Stay Duration</label>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <input type="text" placeholder=""  autoComplete="off" style={{ width: '18%' }}  ref={StayDuration1Ref}
                onKeyDown={(e) => handleKeyDown(e, StayDuration1Ref, StayDuration2Ref)}  
                value={ChargeToRoomData.StayDuration1}/>
                <input type="text" placeholder=""  autoComplete="off" style={{ width: '38%' }} ref={StayDuration2Ref}
                onKeyDown={(e) => handleKeyDown(e, StayDuration2Ref, StayDuration3Ref)} 
                value={ChargeToRoomData.StayDuration2}/>
                <input type="text" placeholder=""  autoComplete="off" style={{ width: '38%' }} ref={StayDuration3Ref}
                onKeyDown={(e) => handleKeyDown(e, StayDuration3Ref, GuestStatusRef)} 
                value={ChargeToRoomData.StayDuration3}/>
                </div>
            </div>

            <div style={{display:'flex',flexDirection:'column'}}>
                <label>Guest Status</label>
                <input type="text" placeholder=""  autoComplete="off" ref={GuestStatusRef}
                value={ChargeToRoomData.GuestStatus}/>
            </div>

            <div style={{display:'flex',flexDirection:'column'}}>
                <label>Amount Due</label>
                <input type="text" placeholder="0.00" readOnly autoComplete="off" style={{textAlign:'end'}}
                value={ChargeToRoomData.AmountDue}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
            <button style={{backgroundColor:'blue'}} onClick={SaveChargeToRoom}>SAVE</button>
            <button style={{backgroundColor:'red'}} onClick={handleClose}>EXIT</button>
            </div>
            </div>
          
  
        </div>
        </div>


    )}

{ChargeToCustomerAccountModal && (

    <div className="modal" >
    <div className="modal-content" style={{width:'100%'}}>
    <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
            CHARGE SALES</h2>

            <div className="credit-Container">
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Category</label>
                    <input type="text" placeholder="Category"  autoComplete="off" ref={CategoryRef}
                    onKeyDown={(e) => handleKeyDown(e, CategoryRef, CustomerIDRef)} 
                    value={ChargeCustomerAccount.Category}
                    onChange={HandleEntryCustomerAccount}
                    onClick={()=>{ setOpenCategoryModal(true);fetchCategory()}}
                    />
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Customer ID</label>
                    <input type="text" placeholder="Customer ID"  autoComplete="off" ref={CustomerIDRef}
                    onKeyDown={(e) => handleKeyDown(e, CustomerIDRef, CustomerNameRef)} 
                    value={ChargeCustomerAccount.CustomerID}
                    onChange={HandleEntryCustomerAccount}
                    onClick={()=>{setOpenCustomerModal(true);fetchCustomerwithCategory()}}
                    />
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Customer Name</label>
                    <input type="text" placeholder="Customer Name"  autoComplete="off" ref={CustomerNameRef}
                    onKeyDown={(e) => handleKeyDown(e, CustomerNameRef, TermsRef)} 
                    value={ChargeCustomerAccount.CustomerName}
                    onChange={HandleEntryCustomerAccount}
                    />
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Terms</label>
                    <input type="text" placeholder="Terms"  autoComplete="off"  readOnly ref={TermsRef}
                    onKeyDown={(e) => handleKeyDown(e, TermsRef, CreditLimitRef)} 
                    value={ChargeCustomerAccount.Terms}
                    onChange={HandleEntryCustomerAccount}
                    />
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Credit Limit</label>
                    <input type="text" placeholder="0.00"  autoComplete="off" ref={CreditLimitRef}
                    onKeyDown={(e) => handleKeyDown(e, CreditLimitRef, CreditLimitRef)} 
                    value={ChargeCustomerAccount.CreditLimit}
                    onChange={HandleEntryCustomerAccount}
                    />
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Amout Due</label>
                    <input type="text" placeholder="0.00"  autoComplete="off"  style={{textAlign:'end'}}
                    defaultValue={ChargeCustomerAccount.Amountdue}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <button style={{backgroundColor:'blue'}} onClick={SaveChargeToCustomer}>SAVE</button>
                <button style={{backgroundColor:'red'}} onClick={handleClose}>EXIT</button>
            </div>
            </div>

    </div>
    </div>
)}


{ChargeToEventModal && (

<div className="modal" >
<div className="modal-content" style={{width:'100%'}}>
<h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
        CHARGE TO EVENT</h2>

        
        <div className="Event-Container">
                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>BEO NO.</label>
                    <input type="text" placeholder=""  autoComplete="off" ref={BEONORef}
                    onKeyDown={(e) => handleKeyDown(e, BEONORef, CustomerEventNameRef)} 
                    value={ChargeToEvent.BEONO}/>
                </div>

                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Customer</label>
                    <input type="text" placeholder="Customer"  autoComplete="off" ref={CustomerEventNameRef}
                    onKeyDown={(e) => handleKeyDown(e, CustomerEventNameRef, EventNameRef)} 
                    value={ChargeToEvent.CustomerEventName}/>
                </div>

                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Event Name</label>
                    <input type="text" placeholder="Event Name"  autoComplete="off" ref={EventNameRef}
                    onKeyDown={(e) => handleKeyDown(e, EventNameRef, CreditLimitEventRef)} 
                    value={ChargeToEvent.EventName}/>
                </div>

                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Credit Limit</label>
                    <input type="text" placeholder="0.00"  autoComplete="off"  readOnly ref={CreditLimitEventRef}
                    onKeyDown={(e) => handleKeyDown(e, CreditLimitEventRef, CreditLimitEventRef)} 
                    value={ChargeToEvent.CreditLimitEvent}/>
                </div>


                <div style={{display:'flex',flexDirection:'column'}}>
                    <label>Amout Due</label>
                    <input type="text" placeholder="0.00"  autoComplete="off"  style={{textAlign:'end'}}
                    value={ChargeToEvent.Amountdue}/>
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <button style={{backgroundColor:'blue'}} onClick={SaveChargeToEvent}>SAVE</button>
                <button style={{backgroundColor:'red'}} onClick={handleClose}>EXIT</button>
            </div>
            </div>

</div>
</div>
)}



{OpenCategoryModal && (
  <div className="modal">
    <div className="modal-content-category">
      <h1>Select Category</h1>
      <div className="card">
        <Table className="table-category">
          <thead>
            <tr>
              <th>Code</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>

        {categoryList && categoryList.map((item: any, index: number) => (
            <tr key={index} style={{fontSize:'30px'}}  onClick={()=>selectCategory(index)}>
                <td>{item.code}</td>
                <td>{item.category}</td>
            </tr>
        ))}


          </tbody>
        </Table>
       
        </div>
        <div className="Button-Container">
        <button onClick={()=> setOpenCategoryModal(false)}>Close</button>
        </div>
    </div>

  
  </div>

)}

{OpenCustomerModal && (
  <div className="modal">
    <div className="modal-content-category">
      <h1>Select Customer</h1>
      <div className="card">
        <Table className="table-category">
          <thead>
            <tr>
              <th>Code</th>
              <th>Trade Name</th>
            </tr>
          </thead>
          <tbody>

        {CustomerList && CustomerList.map((item: any, index: number) => (
            <tr key={index} style={{fontSize:'30px'}}  onClick={()=>selectCustomer(index)}>
                <td>{item.id_code}</td>
                <td>{item.trade_name}</td>
            </tr>
        ))}


          </tbody>
        </Table>
      
        </div>
        <div className="Button-Container">
        <button onClick={()=> setOpenCustomerModal(false)}>Close</button>
        </div>
    </div>

  
  </div>

)}


{OpenPaymentModal &&
<div className="modal" >
            <div className="modal-content" >
            <h2 style={{ color: '#ffffff', backgroundColor: '#007bff', padding: '10px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
          borderRadius: '5px', margin: '10px',
          fontWeight: 'bold', textAlign: 'center'
        }}>CHARGE SALES</h2>
  
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
                      autoComplete="off"
                      id="input1"
                      readOnly
                      value={amountdue}
                      required/>
                      
                  {/* <img src= {} style={{height:'200px',width:'100%',marginTop:'20px'}}/> */}
         
          </div>
        </div>
            </div>
            
            <div>
            <Button  style={{ width: '48%',margin:'5px 5px 0 0 ',backgroundColor:'blue'}} onClick={handleOk}> Confirm </Button>
            <Button  style={{ width: '48%',margin:'5px 5px 0 0',backgroundColor:'red'}} onClick={handleClose}> Abort</Button> 

            </div>
            
            </div>
  </div>
}



</div>
)}

export default ChargeTo;

