/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import React, { useState } from "react";
import './css/Charge.css'
import axios from "axios";
import BASE_URL from "../config";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";



import Swal from 'sweetalert2';
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

interface ChargeToTrans {
    handleClose: () => void;

}



const ChargeTo: React.FC<ChargeToTrans> = ({handleClose}) => {
    const [ChargeToRoomModal,setChargeToRoomModal] = useState(false)
    const [ChargeToCustomerAccountModal,setChargeToCustomerAccountModal] = useState(false)
    const [ChargeToEventModal,setChargeToEventModal] = useState(false)


// ******************* CHARGE TO ROOM TRANSACTION **********************//
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
                    }
                } catch(error:any){

                    showErrorAlert(error.response)
                }
            }
            
        })}

    
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
              }} onClick={() => setChargeToRoomModal(true)}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,height:'70px',fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               CHARGE TO ROOM GUEST</p>
            </div>
              

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',    justifyContent: 'center',
              }} onClick={() => setChargeToCustomerAccountModal(true)}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               CHARGE TO CUSTOMER ACCOUNT</p>
   
            </div>

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',    justifyContent: 'center', // Center content horizontally
              }} onClick={() => setChargeToEventModal(true)}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               CHARGE TO EVENT</p>

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
                <input type="text" placeholder="ROOM" readOnly autoComplete="off" style={{ width: '48%' }} />
                <input type="text" placeholder="FOLIO" readOnly autoComplete="off" style={{ width: '48%' }} />
                </div>
            </div>

            <div style={{display:'flex',flexDirection:'column'}}>
                <label>Guest Name</label>
                <input type="text" placeholder="Guest" readOnly autoComplete="off"></input>
            </div>

            <div style={{display:'flex',flexDirection:'column'}}>
                <label>Stay Duration</label>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                <input type="text" placeholder="" readOnly autoComplete="off" style={{ width: '18%' }} ></input>
                <input type="text" placeholder="" readOnly autoComplete="off" style={{ width: '38%' }} ></input>
                <input type="text" placeholder="" readOnly autoComplete="off" style={{ width: '38%' }} ></input>
                </div>
            </div>

            <div style={{display:'flex',flexDirection:'column'}}>
                <label>Guest Status</label>
                <input type="text" placeholder="" readOnly autoComplete="off"></input>
            </div>

            <div style={{display:'flex',flexDirection:'column'}}>
                <label>Amount Due</label>
                <input type="text" placeholder="0.00" readOnly autoComplete="off" style={{textAlign:'end'}}></input>
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
<div className="modal-content">
<h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
        CHARGE TO CUSTOMER ACCOUNT</h2>
</div>
</div>
)}


{ChargeToEventModal && (

<div className="modal" >
<div className="modal-content">
<h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
        CHARGE TO EVENT</h2>
</div>
</div>
)}






     </div>
    )
}

export default ChargeTo;

