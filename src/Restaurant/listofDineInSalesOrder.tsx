/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import React, { useState,useEffect } from 'react';
import './css/listofDineInSalesOrder.css'; // Import CSS file for styling
import axios, { AxiosError } from 'axios';
import BASE_URL from '../config';

import cash from '../assets/cash.jpeg';
import credit from '../assets/credit.png';

import transactD from '../assets/transactionDiscount.png';
import tradeD from '../assets/tradeDiscount.jpeg';
import pwdD from '../assets/pwdDiscount.png';
import epsCard from '../assets/card.jpeg';
import Senior from '../assets/senior.png';
import CloseIcon from '../assets/close.png'
import Multiple from '../assets/multiple.jpeg';

import Swal from "sweetalert2";
import ReprintImage from '../assets/ReprintImage.jpeg';
import CancellSOImage from '../assets/cancelSO.jpg';
import ViewCancellSOImage from '../assets/ViewCancelOrder.jpg';
import SettleImage from '../assets/SettleSO.png';

interface ListOfDineInSalesOrderProps {
  handleclose: () => void; // Define the type for handleclose function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settlebillData: any; // Define the type for settlebillData (Replace 'any' with appropriate type)
  tableno: string; // Define the type for tableno (Assuming tableno is of type string, adjust if needed)
}


const ListOfDineInSalesOrder: React.FC<ListOfDineInSalesOrderProps>  = ({handleclose,  settlebillData, tableno}) => {


  interface SalesOrderItem {
    date_trans: string;
    description: string;
    time_trans: string;
    table_no: string;
    SO_no: string;
    customer_name: string;
    waiter_id: string;
    guest_count: string;
    document_no : number;
    // Add other properties as needed
  }

  interface SalesOrderListingItem {
    so_no: string;
    quantity: number;
    description: string;
    price: number;
    // Add other properties as needed
  }
  
    const [SalesOrderList,setSalesOrderList] = useState<SalesOrderItem[]>([]);

    const [SalesOrderListing,setSalesOrderListing] =useState<SalesOrderListingItem[]>([]);

    const [ButtonModalOpen,setButtonModalOpen] = useState<boolean>(false)
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null); // Ensure selectedRowIndex accepts null or number

    const [qtyTotal,setqtyTotal] =  useState<string>(''); 
    const [TotalAmountD,setTotalAmountD] =  useState<string>('');




const OpenButtonModal = () => {
    setButtonModalOpen(true)
}

const CloseButtonModal = () => {
    setButtonModalOpen(false)
}
    //***************PRODUCT***************** */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
                    params: {
                        tableno: tableno // or use the dynamic value that you want
                    }
                });
               setSalesOrderList(response.data);

              } catch (error: unknown) {
                if (axios.isAxiosError(error)) {
                  const axiosError = error as AxiosError;
            
                  if (axiosError.response) {
                    // The request was made and the server responded with a status code
                    console.error('Server responded with a non-2xx status:', axiosError.response.data);
                  } else if (axiosError.request) {
                    // The request was made but no response was received
                    console.error('No response received:', axiosError.request);
                  } else {
                    // Something else happened while setting up the request
                    console.error('Error setting up the request:', axiosError.message);
                  }
                } else {
                  // Handle non-Axios errors here
                  console.error('Non-Axios error:', error);
                }
              }
            };
        fetchData();
    }, []);


    useEffect(() => {
        if (SalesOrderList.length > 0) {

           const documentNumbers = SalesOrderList.map(item => item.document_no);

           
            const fetchSalesOrderListing = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/api/sales-order-listing/`, {
                        params: {
                            // Use data from the first item in SalesOrderList
                            // Modify this according to your object structure if needed
                          tableno:tableno,
                           document_no :documentNumbers
                            // Add other necessary parameters as needed
                        }
                    });
                    // Handle response for sales-order-listing
                    setSalesOrderListing(response.data);
                   
                } catch (error) {
                    console.error('Error fetching sales-order-listing:', error);
                }
            };
    
            fetchSalesOrderListing();

        }
    }, [SalesOrderList]);
    

    
    useEffect(() => {
      let totalQuantity = 0;
      let totalAmountDue = 0;
  
      if (Array.isArray(SalesOrderListing) && SalesOrderListing.length > 0) {
        SalesOrderListing.forEach(item => {
          totalQuantity += item.quantity * 1;
          totalAmountDue += item.quantity * item.price;
        });
      }
  
      setqtyTotal(totalQuantity.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }));
  
      setTotalAmountD(totalAmountDue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }));
    }, [SalesOrderListing]); // Re-calculate totals when SalesOrderListing changes
  

    useEffect(() => {
        const handleKeyPress = (e: { keyCode: number; preventDefault: () => void; }) => {
          if (e.keyCode === 116) {
            e.preventDefault(); // Prevent the default browser refresh action for F5 (key code 116)

          }
          if (e.keyCode === 27) {
            ButtonModalOpen ? setButtonModalOpen(false) : handleclose();
          }
          
        };
    
        window.addEventListener('keydown', handleKeyPress);
    
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [handleclose,CloseButtonModal]);


const ShowOrderListing = async (index: number) => {
  const selectedItem = SalesOrderList[index];
  setSelectedRowIndex(index);

  try {
    // Assuming 'selectedItem' needs to be part of the URL query parameters
    const response = await axios.get(`${BASE_URL}/api/sales-order-listing/`, {
      params: selectedItem // Use 'params' to include query parameters
    });

    setSalesOrderListing(response.data);

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with a non-2xx status:', axiosError.response.data);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('No response received:', axiosError.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up the request:', axiosError.message);
      }
    } else {
      // Handle non-Axios errors here
      console.error('Non-Axios error:', error);
    }
  }
};
const handleSettleOrder = () => {
  settlebillData({
    'settlebill': true,
    'tableno': tableno
  });
};

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})


const CancellSO = () => {
  try {

    swalWithBootstrapButtons.fire({
      title: 'Confirmation',
      text: "Do you want to Cancel Sales Order?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then( async (result) => {
      if (result.isConfirmed) {
        const response = await axios.post(`${BASE_URL}/api/cancel-sales-order/`, {
          params: {
            tableno:tableno,
          }
      });
      if (response.status ===200) {
        handleclose();
      }

      }})




   
} catch (error) {
    console.error('Error fetching sales-order-listing:', error);
}



}

  return (
    <div>
        <div className="modal">
            
            <div className='modal-contentSO'>
            <div style={{ border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px',marginLeft:'20px'}}>

            <h2 style={{ color: '#ffffff', backgroundColor: '#007bff',
             padding: '4px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              borderRadius: '5px', fontWeight: 'bold', textAlign: 'center', caretColor:'transparent'
               }}>Sales Order List</h2>

                <div className="top-table-so" >
                    <table className="table" border={1} >
                    <thead>
                    <tr>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Table No.</th>
                        <th>SO</th>
                        <th>Customer</th>
                        <th>Waiter</th>
                        <th>Guest</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(SalesOrderList) && SalesOrderList.length > 0 ? (
                    SalesOrderList.map((item, index:number) => (
                        <tr key={index} onDoubleClick={() => OpenButtonModal} onClick={() => ShowOrderListing(index)} style={{
                            backgroundColor: selectedRowIndex === index ? ' #007bff' : 'transparent',
                          }}> 
                        <td style={{textAlign:'center'}}>{item.date_trans}</td>
                        <td title={item.description}>{item.time_trans}</td>
                        <td style={{textAlign:'center'}}>{item.table_no}</td>
                        <td style={{textAlign:'center'}}>{item.SO_no}</td>
                        <td style={{textAlign:'center'}} >{item.customer_name}</td>
                        <td style={{textAlign:'center'}} >{item.waiter_id}</td>
                        <td style={{textAlign:'center'}} >{item.guest_count}</td>
           
                            </tr>
                        ))
                        ) : (
                          <tr>
                          <td colSpan={4}>No items in the transaction</td>
                        </tr>
                    )}
                    </tbody>
                    </table>
                </div>

                <div className="bottom-table-so">
                    {/* <h2>Bottom Table</h2> */}
                    <table className="table" border={1} >
                    <thead>
                    <tr>   
                        <th>SO No.</th>
                        <th>QTY</th>
                        <th>Description</th>
                        <th>Unit Cost</th>
                        <th>Total Amount</th>
                   
                    </tr>
                    </thead>
                    <tbody>
                    {Array.isArray(SalesOrderListing) && SalesOrderListing.length > 0 ? (
                    SalesOrderListing.map((item, index :number) => (
                        <tr key={index} onDoubleClick={() => OpenButtonModal} onClick={() => ShowOrderListing(index)}> 
                        <td style={{textAlign:'center'}} >{item.so_no}</td>
                        <td style={{textAlign:'center'}} >{item.quantity *1}</td>
                        <td style={{textAlign:'start'}} title={item.description}>{item.description}</td>
                        <td style={{textAlign:'end'}}>{item.price}</td>
                        <td style={{ textAlign: 'end' }}>
                            {(item.quantity * item.price).toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                      </td>
       

                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={4}>No items in the transaction</td>
                        </tr>
                    )}
                    </tbody>
                    </table>


                </div>
                <div className='listingContainer' style={{display:'flex'}}>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue', width:'30%' ,color: 'blue', 
                     padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>Total QTY: {parseInt(qtyTotal)} </p>
                    <p style={{ fontSize: '20px', fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue' , width:'70%',  color: 'blue', 
                     padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>Total Amount Due: Php {TotalAmountD} </p>
                </div>
                    {/* <button onClick={handleclose} style={{width:'100%',backgroundColor:'red'}}>Close</button> */}

                    </div>
              <div style={{width:'40%' , border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px',marginLeft:'20px'}}>
                <div className="Payment">
                 <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                 SELECT PAYMENT</h2>
                 <div className="PaymentType-content" style={{width:'100%'}}>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px' ,margin:'5px'}}>


                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}
                      onClick={CancellSO}
                      >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,height:'70px',fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      Cancel SO</p>
                      <img src= {CancellSOImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>
                      

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      View Cancelled SO</p>
                      <img src= {ViewCancellSOImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      Print Bill</p>
                      <img src= {ReprintImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}
                      onClick={handleSettleOrder}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      Settle Bill</p>
                      <img src= {SettleImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>
                      

                  </div>

                  <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                            SELECT DISCOUNT</h2>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px' ,margin:'5px'}}>
              
                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>
                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      Señior Citezin Discount</p>
                      <img src= {Senior} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      PWD Discount</p>
                      <img src= {pwdD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>
                    
                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      Trade Discount</p>
                      <img src= {tradeD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>


                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      Transaction Discount</p>
                      <img src= {transactD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    
                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      Item Discount</p>
                      <img src= {transactD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}
                      onClick={handleclose}
                      >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)'  ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                      Close</p>
                      <img src= {CloseIcon} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    </div>
              </div>

              
                </div>
              </div>

            </div>

        </div>

        {ButtonModalOpen && (
        <div className="modal" >
          <div className="modal-content" style={{width:'50%'}}>
          <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                    SELECT PAYMENT</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px' ,margin:'5px'}}>


            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,height:'70px',fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Cancel SO</p>
              <img src= {cash} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>
              

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               View Cancelled SO</p>
              <img src= {credit} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Print Bill</p>
              <img src= {epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Settle Bill</p>
              <img src= {Multiple} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>
              

            {/* <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue', textAlign:'center'}}>
               Charge To Room</p>
              <img src= {ChargeRoom} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div> */}

          </div>



          <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                    SELECT DISCOUNT</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px' ,margin:'5px'}}>
       
            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>
              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Señior Citezin Discount</p>
              <img src= {Senior} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               PWD Discount</p>
              <img src= {pwdD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>
            
            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Trade Discount</p>
              <img src= {tradeD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>


            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Transaction Discount</p>
              <img src= {transactD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

            
            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Item Discount</p>
              <img src= {transactD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)'  ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Close</p>
              <img src= {CloseIcon} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

            </div>



            
        </div>
        </div>
      )}
    </div>
  );
};

export default ListOfDineInSalesOrder;
