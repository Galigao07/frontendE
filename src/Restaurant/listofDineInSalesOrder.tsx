/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import React, { useState,useEffect, useRef } from 'react';
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
import Verification from './Verification';
import SeniorCitezenDiscount from './DiscountSeniorCitezen';
import ItemDiscounts from './DiscountItems'
import TradeDiscountList from './DiscountTrade'
import TransactionDiscount from './DiscountTransaction';
import showErrorAlert from '../SwalMessage/ShowErrorAlert';
import { Grid, Table, Typography } from '@mui/material';
// import TradeDiscount from './DiscountTrade';

interface ListOfDineInSalesOrderProps {
  handleclose: () => void; // Define the type for handleclose function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  settlebillData: any; // Define the type for settlebillData (Replace 'any' with appropriate type)
  tableno: string; // Define the type for tableno (Assuming tableno is of type string, adjust if needed)
  queno:string;
}


const ListOfDineInSalesOrder: React.FC<ListOfDineInSalesOrderProps>  = ({handleclose,  settlebillData, tableno, queno}) => {


  interface SalesOrderItem {
    date_trans: string;
    description: string;
    time_trans: string;
    table_no: string;
    q_no:string;
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
    const [selectedRowIndexListing, setselectedRowIndexListing] = useState<number | null>(null); // Ensure selectedRowIndex accepts null or number
    const [qtyTotal,setqtyTotal] =  useState<string>(''); 
    const [TotalAmountD,setTotalAmountD] =  useState<string>('');
    const [OpenVireficationModal,setOpenVireficationModal] = useState<boolean>(false)
    const [OpenItemDiscountModal,setOpenItemDiscountModal] = useState<boolean>(false)
    const [OpenTradeDiscountModal,setOpenTradeDiscountModal] = useState<boolean>(false)
    const [OpenTransactionDiscountModal,setOpenTransactionDiscountModal] = useState<boolean>(false)
    const [OpenSeniorCitezenDiscountModal,setOpenSeniorCitezenDiscountModal] = useState<boolean>(false)
    const [SelectedItemDiscount,setSelectedItemDiscount] = useState(null)
    const [TypeofDisCount,setTypeofDisCount] = useState<any>('')
    const [Dis,setDis] = useState<boolean>(false)
    const [DisEntry,setDisEntry] = useState<any>('')
    const [DiscountType,setDiscountType] = useState<any>('')
    const [SubTotal,setSubTotal] = useState<any>('')

    const CancelSORef = useRef<HTMLDivElement>(null)
    const ViewCancelSORef = useRef<HTMLDivElement>(null)
    const SettleSORef = useRef<HTMLDivElement>(null)
    const PrintSORef = useRef<HTMLDivElement>(null)
    const SeniorDSORef = useRef<HTMLDivElement>(null)
    const PWDDSORef = useRef<HTMLDivElement>(null)
    const TradeDSORef = useRef<HTMLDivElement>(null)
    const TransactionDSORef = useRef<HTMLDivElement>(null)
    const ItemDSORef = useRef<HTMLDivElement>(null)
    const CloseSORef = useRef<HTMLDivElement>(null)
    


    const [isFocus,setisFocus] = useState<any>(0)

    const [isFocusIndex,setisFocusIndex] = useState<boolean>(false)





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
                if (tableno !=''){
                  const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
                    params: {
                        tableno: tableno // or use the dynamic value that you want
                    }
                });
                setSalesOrderList(response.data);
                }else{
                  const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
                    params: {
                        queno: queno // or use the dynamic value that you want
                    }
                });
                setSalesOrderList(response.data);
                }
  
  

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
                          queno:queno,
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
    

    const ShowAllInListing = async() => {
      try {
        if (tableno !=''){
          const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
            params: {
                tableno: tableno // or use the dynamic value that you want
            }
        });
        setSalesOrderList(response.data);
        }else{
          const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
            params: {
                queno: queno // or use the dynamic value that you want
            }
        });
        setSalesOrderList(response.data);
        }



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
    }
    
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
            e.preventDefault(); 
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

  const tableNo = selectedItem.table_no
  const so_no = selectedItem.SO_no

  try {
    // Assuming 'selectedItem' needs to be part of the URL query parameters
    const response = await axios.get(`${BASE_URL}/api/sales-order-listing/`, {
      // params: selectedItem,
      params: {
        tableno :tableNo,
        so_no : so_no
      }
     // Use 'params' to include query parameters
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

const ClickShowOrderListing = async (index: number) => {
  const selectedItem:any = SalesOrderListing[index];
  setselectedRowIndexListing(index); 
  
  setSelectedItemDiscount(selectedItem)

  console.log('xx',SelectedItemDiscount)
}


const handleSettleOrder = () => {
  settlebillData({
    'settlebill': true,
    'tableno': tableno,
    'DiscountData':DisEntry,
    'DiscountType':DiscountType,
    
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

//*************************VERIFICATION ****************************/
const OpenVireficationEntry = (type:any) => {
  setTypeofDisCount(type)
  setOpenVireficationModal(true)
}

const CloseVerification = () => {
  setisFocusIndex(true)
  setOpenVireficationModal(false)

  setDiscountType('')
}

const OKVerification = (data:any) => {
  setOpenVireficationModal(false)

  if (TypeofDisCount == 'Senior'){
    OpenSeniorCitezenEntry();
  }

  if (TypeofDisCount == 'Item'){
    OpenItemDiscountEntry();
  }

  if (TypeofDisCount == 'Trade'){
    OpenTradeDiscountEntry();
  }
  if (TypeofDisCount == 'Transaction'){
    OpenTransactionDiscountEntry();
  }

}



//*************************SEÑIOR CITEZEN DISCOUNT ****************************/
const OpenSeniorCitezenEntry = () => {
  setOpenSeniorCitezenDiscountModal(true)
  setDiscountType('SC')
}

const CloseSeniorCitezenDiscount = () => {
  setOpenSeniorCitezenDiscountModal(false)
  setDiscountType('')
  setisFocusIndex(true)

}

const SaveSeniorCitezenDiscount = (data:any) => {

  console.log(data)
  setDisEntry(data)
  setDis(true)
  setOpenSeniorCitezenDiscountModal(false)
  setisFocusIndex(true)
}



//*************************ITEM DISCOUNT TRANSACTION****************************/
const OpenItemDiscountEntry = () => {
  if (selectedRowIndexListing != null){
    setOpenItemDiscountModal(true)
    setDiscountType('ITEM')
  }

  else{
    setisFocusIndex(true)
    setisFocus(isFocus)
    showErrorAlert('Please Select Item!')

  }


}

const CloseItemDiscountsEntry = () =>{
  setDiscountType('')
  setOpenItemDiscountModal(false)
  setisFocusIndex(true)

}
const SaveItemDiscountEntry = (data:any) => {
  console.log(data)
  setOpenItemDiscountModal(false)
  setisFocusIndex(true)
}


//*************************TRADE DISCOUNT TRANSACTION****************************/

const OpenTradeDiscountEntry = () => {
  setOpenTradeDiscountModal(true)
  setDiscountType('TRADE')
}

const CloseTradeDiscountsEntry = () =>{
  setOpenTradeDiscountModal(false)
  setDiscountType('')
  setisFocusIndex(true)

}
const SaveTradessDiscountEntry = (data:any) => {
  console.log('trade discount',data)
  setOpenTradeDiscountModal(false)
  setisFocusIndex(true)
}



//*************************TRANSACTION DISCOUNT TRANSACTION****************************/

const OpenTransactionDiscountEntry = () => {
  setOpenTransactionDiscountModal(true)
  setDiscountType('TRANSACTION')
}

const CloseTransactionDiscountsEntry = () =>{
  setOpenTransactionDiscountModal(false)
  setDiscountType('')
  setisFocusIndex(true)

}
const SaveTransactionDiscountEntry = (data:any) => {
  console.log('Transaction discount',data)
  setOpenTransactionDiscountModal(false)
  setisFocusIndex(true)
}


useEffect(() => {
  if (!isNaN(parseFloat(DisEntry.SLessVat12))) {
    setSubTotal(parseFloat(TotalAmountD.replace(',','')) - (parseFloat(DisEntry.SLessVat12) + parseFloat(DisEntry.SLess20SCDiscount)));
  } else {
    setSubTotal('0.00')
  }
  
}, [DisEntry.SLessVat12, TotalAmountD, DisEntry.SLess20SCDiscount,isFocusIndex]);



const PaymentModalHandleKeydown = (event:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) => {
  event.preventDefault();
  if (event.key == 'ArrowRight' || event.key == 'ArrowDown') {
      NextRef.current.focus();
      NextRef.current.style.backgroundColor = 'blue';
      CurrentRef.current.style.backgroundColor = 'white';
       if (index ==9){
        setisFocus(0)


       }

       else{
        setisFocus(index + 1)

       }
      
  
    
   

  }

  if (event.key == 'ArrowLeft' || event.key == 'ArrowUp'){
    BackRef.current.focus();
    BackRef.current.style.backgroundColor = 'blue';
    CurrentRef.current.style.backgroundColor = 'white';
    if (index == 0){
      setisFocus(9)
 

    }else{
      setisFocus(index - 1)

    }


}

if (event.key == 'Enter'){
   if (index == 0){
      CancellSO();
   }
   if (index == 1){
    CancellSO()
   }
   if (index == 2){
    CancellSO()
   }
   if (index == 3){
    handleSettleOrder()
   }
   if (index == 4){
    OpenVireficationEntry('Senior')
   }
   if (index == 5){
  
    OpenVireficationEntry('PWD')
   }
   if (index == 6){
  
    OpenVireficationEntry('Trade')
   }
   if (index == 7){
  
    OpenVireficationEntry('Transaction')
   }
   if (index == 8){
  
    OpenVireficationEntry('Item')
   }
  if (index == 9){
 
    handleclose();
  }
}

}

const computeDiscount = () => {
  if (!isNaN(parseFloat(DisEntry.SLessVat12))) {
    setSubTotal(parseFloat(TotalAmountD) - (parseFloat(DisEntry.SLessVat12) + parseFloat(DisEntry.SLess20SCDiscount)));
  } else {
    setSubTotal('0.00')
  }
}


useEffect(() => {

  if (SettleSORef.current){
    SettleSORef.current.focus();
    SettleSORef.current.style.backgroundColor = 'blue';
    setisFocus(3)

  }

},[])


const focusindex = () => {
  if (isFocusIndex) {
    if (SettleSORef.current) {
      SettleSORef.current.focus();
      SettleSORef.current.style.backgroundColor = 'blue';


      setisFocus(3)
      setisFocusIndex(false)
      const refs = [
        CancelSORef,
        ViewCancelSORef,
        PrintSORef,
        SeniorDSORef,
        PWDDSORef,
        TradeDSORef,
        TransactionDSORef,
        ItemDSORef
    ];
    refs.forEach(ref => {
        if (ref.current) {
            ref.current.style.backgroundColor = 'white';
        }
    });
    }
  }

}


useEffect(() => {
      focusindex();
      const interval = setInterval(() => {
        focusindex();

      }, 500);
      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
}, [isFocusIndex]);






  return (
    <div>
        <div className="modal">
            
            <div className='modal-contentSO'>
            <Grid container className="CreditCard-Container" spacing={2}>
                <Grid item xs={12} md={7} style={{ height: '100%',width:'100%'}}>
                  <div style={{ border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px',height:'100%'}}>
                  <div style={{display:'flex',flexDirection:'row'}}>
                  <h2 style={{ color: '#ffffff', backgroundColor: '#007bff',
                    padding: '4px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',width:'80%',
                      borderRadius: '5px', fontWeight: 'bold', textAlign: 'center', caretColor:'transparent'
                      }}>Sales Order List </h2>

                      <button style={{width:'20%',height:'40px',marginTop:'8px'}} onClick={()=>ShowAllInListing()}>Show All</button>
                  </div>
        

                  <div className="top-table-so" >
                      <Table sx={{
                              fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                              overflow: 'auto'}}
                      className="table" border={1} >
                      <thead>
                      <tr>
                          <th>Date</th>
                          <th>Time</th>
                          <th>
                          {tableno !== '' ?  'Table No.' : 'Que No.'}
                      
                            </th>
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
                          <td style={{textAlign:'center'}}>  
                          {tableno !== '' ? item.table_no : parseInt(item.q_no)}

                        
                          </td>
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
                      </Table>
                  </div>

                  <div className="bottom-table-so">
                      {/* <h2>Bottom Table</h2> */}
                      <Table 
                      sx={{
                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                        overflow: 'auto'}}
                      className="table" border={1} >
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
                          <tr key={index} onDoubleClick={() => OpenButtonModal} onClick={() => ClickShowOrderListing(index)} style={{
                            backgroundColor: selectedRowIndexListing === index ? ' #007bff' : 'transparent',
                          }}> 
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


                        { Dis && (
                          <>
                            <tr style={{ border: 'none', borderCollapse: 'collapse' }}>
                              <td colSpan={5}></td>
                            </tr>
                            <tr style={{ border: 'none',color:'red',fontWeight:'bold' }}>
                              <td colSpan={3} style={{ textAlign: 'center', border: 'none' }}> SC VAT Exemption on {TotalAmountD}</td>
                              <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}>{DisEntry.SLessVat12}</td>
                            </tr>
                            <tr style={{ border: 'none',color:'red',fontWeight:'bold'   }}>
                              <td colSpan={3} style={{ textAlign: 'center', border: 'none'}}> SC Discount: 20% of  {DisEntry.SNetOfVat}</td>
                              <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}>{DisEntry.SLess20SCDiscount}</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                      </Table>


                  </div>

                    <div className='listingContainer' style={{display:'flex', border: '1px solid',  borderRadius: '5px' }}>
                      <div style={{display:'flex',flexDirection:'column',width:'50%'}}>
                        <Typography sx={{  fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem', lg: '0.7rem', xl: '0.8rem' },
                        fontWeight: 'bold', margin: '10px', width:'100%' ,color: 'blue', 
                        padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>Total QTY: {parseInt(qtyTotal)} </Typography>
                      </div>
                        <div style={{display:'flex',flexDirection:'column',width:'100%'}}>

                          <div style={{display:'flex',flexDirection:'row',width:'90%'}}>
                            <Typography sx={{  fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem', lg: '0.7rem', xl: '0.8rem' },
                              fontWeight: 'bold', margin: '1px', width:'90%',  color: 'blue', textAlign:'start',
                              padding: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>Sub Total: Php  
                            </Typography>

                            <Typography sx={{  fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem', lg: '0.7rem', xl: '0.8rem' },
                              fontWeight: 'bold', margin: '1px', width:'90%',  color: 'blue', textAlign:'end',
                              padding: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}> {SubTotal} </Typography>
                          </div>

                          <div style={{display:'flex',flexDirection:'row',width:'90%'}}>
                            <Typography sx={{  fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem', lg: '0.7rem', xl: '0.8rem' },
                              fontWeight: 'bold', margin: '1px', width:'90%',  color: 'blue', textAlign:'start',
                              padding: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>Service Charges: Php 
                            </Typography>

                            <Typography sx={{  fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem', lg: '0.7rem', xl: '0.8rem' },
                              fontWeight: 'bold', margin: '1px', width:'90%',  color: 'blue', textAlign:'end',
                              padding: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>0.00 </Typography>
                          </div>

                          <div style={{display:'flex',flexDirection:'row',width:'90%'}}>
                            <Typography sx={{  fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem', lg: '0.7rem', xl: '0.8rem' },
                              fontWeight: 'bold', margin: '1px', width:'100%',  color: 'blue', textAlign:'start',
                              padding: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>Total Amount Due: Php 
                            </Typography>

                            <Typography sx={{  fontSize: { xs: '0.5rem', sm: '0.5rem', md: '0.6rem', lg: '0.7rem', xl: '0.8rem' },
                              fontWeight: 'bold', margin: '1px', width:'90%',  color: 'blue', textAlign:'end',
                              padding: '2px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',  borderRadius: '5px'  }}>{TotalAmountD}
                              </Typography>
                          </div>
                          </div>
                      
                    </div>
              </div>
            </Grid>


            <Grid item xs={12} md={5} style={{ height: '100%',width:'100%'}}>

              <div style={{width:'100%' , border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px'}}>
                <div className="Payment">
                 <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                 SELECT TRANSACTION</h2>
                 <div className="PaymentType-content" style={{width:'100%'}}>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px' ,margin:'5px'}}>


                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  
                      }}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,CloseSORef,CancelSORef,ViewCancelSORef,0)}
                      tabIndex={0}
                      onClick={CancellSO}
                      ref={CancelSORef}
                      >
                      <p style={{ color: isFocus == 0? 'white':'blue', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,height:'70px',fontWeight:'bold' ,textAlign:'center'}}>
                      Cancel SO</p>
                      <img src= {CancellSOImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>
                      

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                   
                      }}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,CancelSORef,ViewCancelSORef,PrintSORef,1)}
                      tabIndex={1}
                      ref={ViewCancelSORef}
                      >

                      <p style={{ color: isFocus == 1 ? 'white':'blue', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,textAlign:'center'}}>
                      View Cancelled SO</p>
                      <img src= {ViewCancellSOImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              
                      }}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,ViewCancelSORef,PrintSORef,SettleSORef,2)}
                      ref={PrintSORef}
                      tabIndex={2}
                      >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,  
                        color: isFocus == 2 ? 'white':'blue',textAlign:'center'}}>
                      Print Bill</p>
                      <img src= {ReprintImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
     
                      }}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,PrintSORef,SettleSORef,SeniorDSORef,3)}
                      tabIndex={3}
                      ref={SettleSORef}
                      onClick={handleSettleOrder}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' , 
                         color: isFocus == 3 ? 'white':'blue',textAlign:'center'}}>
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
                
                      }} onClick={() => OpenVireficationEntry('Senior')}
                      ref={SeniorDSORef}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,SettleSORef,SeniorDSORef,PWDDSORef,4)}
                      tabIndex={4}
                      >
                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,   
                       color: isFocus == 4 ? 'white':'blue',textAlign:'center'}}>
                      Señior Citezin Discount</p>
                      <img src= {Senior} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                
                    }} 
                    onClick={() => OpenVireficationEntry('PWD')}
                    tabIndex={5}
                    ref={PWDDSORef}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,SeniorDSORef,PWDDSORef,TradeDSORef,5)}
                    >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' 
                      ,fontWeight:'bold' ,    color: isFocus == 5 ? 'white':'blue',textAlign:'center'}}>
                      PWD Discount</p>
                      <img src= {pwdD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>
                    
                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
        
                    }} onClick={() => OpenVireficationEntry('Trade')}
                    tabIndex={6}
                    ref={TradeDSORef}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,PWDDSORef,TradeDSORef,TransactionDSORef,6)}
                    >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px'
                       ,fontWeight:'bold' ,    color: isFocus == 6 ? 'white':'blue',textAlign:'center'}}>
                      Trade Discount</p>
                      <img src= {tradeD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>


                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                     
                    }} onClick={() => OpenVireficationEntry('Transaction')}
                    tabIndex={7}
                    ref={TransactionDSORef}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,TradeDSORef,TransactionDSORef,ItemDSORef,7)}
                    >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold'
                       ,color: isFocus == 7 ? 'white':'blue',textAlign:'center'}}>
                      Transaction Discount</p>
                      <img src= {transactD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    
                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      
                    }} onClick={() => OpenVireficationEntry('Item')}
                    tabIndex={8}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,TransactionDSORef,ItemDSORef,CloseSORef,8)}
                    ref={ItemDSORef}
                    >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,  
                        color: isFocus == 8 ? 'white':'blue',textAlign:'center'}}>
                      Item Discount</p>
                      <img src= {transactD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  
                      }}
                      onClick={handleclose}
                      tabIndex={9}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,ItemDSORef,CloseSORef,CancelSORef,9)}
                      ref={CloseSORef}
                      >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)'  ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,   
                       color: isFocus == 9 ? 'white':'blue',textAlign:'center'}}>
                      Close</p>
                      <img src= {CloseIcon} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    </div>
              </div>

              
                </div>
              </div>

            </Grid>
        </Grid>



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
              }} onClick={() => setOpenItemDiscountModal(true)}>

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


                  {OpenVireficationModal && <Verification handleClose={CloseVerification} VerificationEntry={OKVerification}/>}
                  {OpenSeniorCitezenDiscountModal && <SeniorCitezenDiscount handleClose={CloseSeniorCitezenDiscount} SeniorData={SaveSeniorCitezenDiscount} 
                                              amountcover={TotalAmountD} SeniorOrderData={SalesOrderList}/>}
                  {OpenItemDiscountModal && <ItemDiscounts handleClose={CloseItemDiscountsEntry}  SelectedItemDiscount={SelectedItemDiscount} DiscountedData={SaveItemDiscountEntry}/>}

                  {OpenTradeDiscountModal && <TradeDiscountList handleClose={CloseTradeDiscountsEntry} SalesOrderListings ={SalesOrderListing} TradeData={SaveTradessDiscountEntry}/>}
                  {OpenTransactionDiscountModal && <TransactionDiscount handleClose={CloseTransactionDiscountsEntry} SalesOrderListings ={SalesOrderListing} TransactionData={SaveTransactionDiscountEntry}/>}
    </div>
  );
};

export default ListOfDineInSalesOrder;
