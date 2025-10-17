/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

/* eslint-disable no-undef */
import React, { useState,useEffect, useRef } from 'react';
import './css/listofDineInSalesOrder.css'; // Import CSS file for styling
import axios, { AxiosError } from 'axios';
import {BASE_URL} from '../config';

import cash from '../assets/cash.jpeg';
import credit from '../assets/credit.png';
import QRCode from 'qrcode-generator';
import transactD from '../assets/transactionDiscount.png';
import tradeD from '../assets/tradeDiscount.jpeg';
import pwdD from '../assets/pwdDiscount.png';
import epsCard from '../assets/card.jpeg';
import Senior from '../assets/senior.png';
import CloseIcon from '../assets/close.png'
import Multiple from '../assets/multiple.jpeg';
import logo from '../assets/logo.png'
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
import { getWaiterName } from '../global';
import ViewCancelledSOData from './ViewCancelledSO';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import showSuccessAlert from '../SwalMessage/ShowSuccessAlert';
import showInfoAlert from '../SwalMessage/ShowInfoAlert';
import { useDispatch, useSelector } from 'react-redux';
import { setGlobalIsLoading } from '../globalSlice';
import { RootState } from '../store';
import { InProgressLoading } from '../Loader/Loader';
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
    barcode:string
    so_no: string;
    quantity: number;
    description: string;
    price: number;
    line_no:any;
    lineno :any;
    // Add other properties as needed
  }
  
    const dispatch = useDispatch()
    const [cartItems, setCartItems] = useState<any>([]);
    const [showIframe, setShowIframe] = useState<boolean>(false);
    const [SalesOrderList,setSalesOrderList] = useState<SalesOrderItem[]>([]);
    const isLoading = useSelector((state:RootState)=> state.global.globalIsLoading)

    const [SalesOrderListing,setSalesOrderListing] =useState<SalesOrderListingItem[]>([]);

    const [ButtonModalOpen,setButtonModalOpen] = useState<boolean>(false)
    const [selectedRowIndex, setSelectedRowIndex] = useState<number | null>(null); // Ensure selectedRowIndex accepts null or number
    const [selectedRowIndexListing, setselectedRowIndexListing] = useState<number | null>(null); // Ensure selectedRowIndex accepts null or number
    const [qtyTotal,setqtyTotal] =  useState<string>(''); 
    const [TotalAmountD,setTotalAmountD] =  useState<string>('');
    const [OpenVireficationModal,setOpenVireficationModal] = useState<boolean>(false)
    const [OpenItemDiscountModal,setOpenItemDiscountModal] = useState<boolean>(false)
    const [OpenTradeDiscountModal,setOpenTradeDiscountModal] = useState<boolean>(false)
    const [ViewCancelledSOModal,setViewCancelledSOModal] = useState<boolean>(false)
    const [OpenTransactionDiscountModal,setOpenTransactionDiscountModal] = useState<boolean>(false)
    const [OpenSeniorCitezenDiscountModal,setOpenSeniorCitezenDiscountModal] = useState<boolean>(false)
    const [SelectedItemDiscount,setSelectedItemDiscount] = useState(null)
    const [TypeofDisCount,setTypeofDisCount] = useState<any>('')
    const [Dis,setDis] = useState<boolean>(false)
    const [DisEntry,setDisEntry] = useState<any>([])
    const [DiscountType,setDiscountType] = useState<any>('')
    const [SubTotal,setSubTotal] = useState<any>('')
    const [tmpSO,settmpSO] = useState<any>(null)
    const [isItem,setisItem] = useState<boolean>(false)

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
       dispatch(setGlobalIsLoading(true))
        const fetchData = async () => {
         
            try {
                if (tableno !=''){
                  const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
                    params: {
                        tableno: tableno // or use the dynamic value that you want
                    },withCredentials:true
                });
                setSalesOrderList(response.data);
                console.log(response.data)
                }else{
                  const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
                    params: {
                        queno: queno // or use the dynamic value that you want
                    },withCredentials:true
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
                        },withCredentials:true
                    });
                    // Handle response for sales-order-listing
                    setSalesOrderListing(response.data);
                    setCartItems(response.data)
                   dispatch(setGlobalIsLoading(false))
                } catch (error) {
                  dispatch(setGlobalIsLoading(false))
                    console.error('Error fetching sales-order-listing:', error);
                }
            };
    
            fetchSalesOrderListing();

        }
    }, [SalesOrderList]);
    

    const ShowAllInListing = async() => {
      settmpSO(null)
      try {
        if (tableno !=''){
          const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
            params: {
                tableno: tableno // or use the dynamic value that you want
            },withCredentials:true
        });
        setSalesOrderList(response.data);
        }else{
          const response = await axios.get(`${BASE_URL}/api/sales-order-list/`, {
            params: {
                queno: queno // or use the dynamic value that you want
            },withCredentials:true
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
            if (OpenVireficationModal) {
              setOpenVireficationModal(false)
            }
            else if (OpenSeniorCitezenDiscountModal){
              setOpenSeniorCitezenDiscountModal(false)
            }
            else if (OpenItemDiscountModal){
              setOpenItemDiscountModal(false)
            }         
            else if (OpenTradeDiscountModal){
              setOpenTradeDiscountModal(false)
            }
            else if (OpenTransactionDiscountModal){
              setOpenTransactionDiscountModal(false)
            }
            else if (OpenSeniorCitezenDiscountModal){
              setOpenSeniorCitezenDiscountModal(false)
            }
            else{
              ButtonModalOpen ? setButtonModalOpen(false) : handleclose();
            }
          
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
  settmpSO(so_no)
  try {
    // Assuming 'selectedItem' needs to be part of the URL query parameters
    const response = await axios.get(`${BASE_URL}/api/sales-order-listing/`, {
      // params: selectedItem,
      params: {
        tableno :tableNo,
        so_no : so_no
      },withCredentials:true
     // Use 'params' to include query parameters
    });

    setSalesOrderListing(response.data);
    setCartItems(response.data)

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
  if (isItem){
    const selectedItem:any = SalesOrderListing[index];
    setselectedRowIndexListing(index); 
    setSelectedItemDiscount(selectedItem)
    console.log('xx',SelectedItemDiscount)
    OpenItemDiscountEntry(index);
  }

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
            so_no:tmpSO,
          },withCredentials:true
      });
      if (response.status ===200) {
        handleclose();
        settmpSO(null)
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
    showInfoAlert('Select Item For Discount')
    setisItem(true)
    // OpenItemDiscountEntry();
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
const OpenItemDiscountEntry = (index:number) => {
  if (index != null){
    setOpenItemDiscountModal(true)
    setDiscountType('ITEM')
  }

  // else{
  //   setisFocusIndex(true)s
  //   setisFocus(isFocus)
  //   showErrorAlert('Please Select Item!')

  // }


}

const CloseItemDiscountsEntry = () =>{
  setDiscountType('')
  setOpenItemDiscountModal(false)
  setisFocusIndex(true)

}
const SaveItemDiscountEntry = (data:any) => {
  console.log(data)
  setDisEntry((prevDisEntry:any)=> [...prevDisEntry, data]);
  setDis(true)

  setOpenItemDiscountModal(false)
  setisFocusIndex(true)
}
const onDeleteItem = (index:any) => {

  const selecteddata = DisEntry[index]
  swalWithBootstrapButtons.fire({
    title: 'Confirmation',
    text:`Do you want to Remove Discount on ${selecteddata.Description}?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
    reverseButtons: true

    }).then(async (result) => {
    if (result.isConfirmed) {

  // Create a copy of DisEntry array and remove the item at the specified index
  const updatedDisEntry = [...DisEntry];
  updatedDisEntry.splice(index, 1); // Remove 1 element at the specified index
  setDisEntry(updatedDisEntry);
    }})

  

};

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
const [TransactionAmountD,setTransactionAmountD] = useState<any>(null)
const [TransactionAmountRate,setTransactionAmountRate] = useState<any>(null)

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
  setDisEntry(data)
  setDis(true)
  let amountD :any = 0
  let rate :any = 0

  data.map((item:any) => {
    amountD = parseFloat(amountD) + parseFloat(item.Discount)
    rate = parseFloat(item.desc_rate)
    // Access other properties as needed...
});
setDiscountType('TRANSACTION')

  


  setTransactionAmountD(parseFloat(amountD).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
  setTransactionAmountRate(parseFloat(rate).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
  
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
    handleSettleOrder()
   }
   if (index == 1){
    PrintBill()
   }
   if (index == 2){
    CancellSO()
   }
   if (index == 3){
    ViewCancelledSO()
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
    setisFocus(0)

  }

},[])


const focusindex = () => {
  if (isFocusIndex) {
    if (SettleSORef.current) {
      SettleSORef.current.focus();
      SettleSORef.current.style.backgroundColor = 'blue';


      setisFocus(0)
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


const PrintBill = () => {
  console.log('print BIll')
  printReceipt()

}

const ViewCancelledSO = () => {
  console.log('View Cancelled SO')
}




//******** PRINT SALES ORDER AREA******** */
const printReceipt = async () => {
  const generateReceiptIframe = async (receiptContent: string, logoSrc: { logo: string; }) => {

    let customer:any = ''
    let so_no:any = ''
    let guestcount:any = ''
    let document_no:any = ''
    let waiter_name:any = ''
    let waiter_id :any = ''
    let terminal_no :any = ''
    let CashierID :any = ''

    SalesOrderList.map((data:any)=> {
      customer = data.customer_name
      so_no = so_no  + ' ,' + data.SO_no
      guestcount = data.guest_count
      document_no = data.document_no
      waiter_id = data.waiter_id 
      terminal_no = data.terminal_no
      CashierID = data.cashier_id

    },[])


      waiter_name = await getWaiterName(waiter_id)

  

    const iframe = document.getElementById('myIframe') as HTMLIFrameElement | null;
    if (iframe !==null){

      setShowIframe(true)
      if (iframe) {
        iframe.style.display = 'block';
      // Set display property to 'block' to show the iframe
      }

      iframe.onload = () => {
        const currentDate = new Date();   


// Specify the time zone you want, such as 'Asia/Kolkata'
        const timeZone = 'Asia/Manila';

          // Format the date and time as needed
         const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone:timeZone });
        // Write the receipt content to the iframe document
        // const doc = iframe.contentDocument || iframe.contentWindow.document;
        const iframeWindow = iframe.contentWindow;

        if (iframeWindow !== null) {
          const doc = iframeWindow.document;


          doc.open();
          doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');
          doc.write('<div style="width: 300px; margin:none; font-size:10px">');
          doc.write('<div>'); // Start a container div for content
    
          // Embed the logo image using an <img> tag
          doc.write('<div style="text-align: center;">');
          doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
          doc.write('</div>');

          doc.write('<div style="text-align: center;">');
          doc.write('<p> BILLS </p>');
          doc.write('</div>')
          doc.write(`<DIV>Customer: ${customer} </DIV>`);
          doc.write(`<div>Table No: ${tableno}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp; Guest Count: ${guestcount}</div>`);
          doc.write('<div style="text-align: center;">');
          doc.write(`<p> DINE IN</p>`);
          doc.write('</div>')


          doc.write('<div style="text-align: center;">');
          doc.write('<div>---------------------------------------------</div>');
          doc.write(`<div> SO# ${so_no}</div>`);
          doc.write(`<div> ${formattedDateTime} </div>`);
          doc.write('</div>')

          // Write the receipt content
          doc.write('<pre>' + receiptContent + '</pre>');


          let receiptContent1 = '';

          
          //********************************************************* */

          if (typeof localStorage !== 'undefined' && localStorage !== null) {
            const Cashier = 'CASHIER:';
            const fullName = localStorage.getItem('FullName');
          
            if (fullName) {
              const spaces = ' '.repeat(Math.max(0, 47 - (Cashier.length + fullName.length)));
              const receiptContent1 = `<div>${Cashier} ${spaces}${fullName}</div>`;
              doc.write('<pre>' + receiptContent1 + '</pre>');
            } else {
              console.error('FullName not found in localStorage');
            }
          } else {
            console.error('localStorage is not available.');
          }


          //********************************************************* */
          const waiter = 'WAITER :';
          const spacesWaiter = ' '.repeat(Math.max(0, 47 -(waiter.length + waiter_name.length) ));
          receiptContent1 = `<div>${waiter} ${spacesWaiter}${waiter_name}</div>`;
          doc.write('<pre>' + receiptContent1 + '</pre>');




          //********************************************************* */

          const TRANS = 'TRANS# :';
          const documentno = Math.abs(document_no);
          const DocumentNo = String(documentno).padStart(8,'0')


          const spacesTRANS = ' '.repeat(Math.max(0, 45 -(TRANS.length + DocumentNo.length + String(terminal_no).length ) ));
          receiptContent1 =`<div >${spacesTRANS} ${TRANS} ${terminal_no}-${DocumentNo} </div>`
          // receiptContent1 = `<div style="text-align: center">${TRANS}${terminal_no}-${DocumentNo}</div>`;

 

          doc.write('<pre>' + receiptContent1 + '</pre>');
          //********************************************************* */

          const qr = QRCode(0, 'H'); // QR code type and error correction level
          qr.addData(so_no); // Replace with the data you want in the QR code
          qr.make();
    
          // Get the generated QR code as a data URI
          const qrDataURI = qr.createDataURL();
    
          // Insert the QR code image into the document
          doc.write('<div style="text-align: center;">');
          doc.write(`<img src="${qrDataURI}" alt="QR Code"  style="max-width: 120px; display: inline-block;" />`);
          doc.write('</div>'); // Close the container div
          doc.close();
          console.log('999') /// Dont delete
 
          
          // triggerPrint()
          setTimeout(async () => {
           
            iframeWindow.print();
            

           

            iframe.style.display = 'none';
           
          
  
        }, 1000); 
                } };
      iframe.src = 'about:blank';
      return iframe;
    }
  
  };

  // Example data (replace with actual receipt content and logo source)
  const receiptContent = generateReceipt();
// Replace with the actual path to your logo image

  const iframe = generateReceiptIframe(receiptContent, {logo});

  // ipcRenderer.send('print-receipt', ReceiptContentAll); 

};



//******** PRINT DESCRIPTION AND ITEMS QTY******** */
const generateReceipt = () => {


  if (!cartItems || cartItems.length === 0) {
    console.error('Cart items data is empty or invalid');
    return ''; // Return an empty string if data is empty or invalid
  }
  // Create a receipt string based on cartItems
  let receiptContent = '\n';
  // Embed an image using the <img> tag
  // receiptContent += `<img src="${logo}" alt="Logo Image" style={{ maxWidth: '10px' }} />`;
let total = 0
let totalqty = 0


receiptContent += '<div>------------------------------------------------</div>'
receiptContent += '<div>QTY  |              DESCRIPTION       |   AMOUNT</div>'
receiptContent += '<div>------------------------------------------------</div>'

function wrapDescription(description: string, maxLength: number) {
  if (description.length <= maxLength) {
    return description;
  } else {
    const wrappedDescription = description.substring(0, maxLength);
    const remainingDescription = description.substring(maxLength);
    // return wrappedDescription + '\n' + wrapDescription(remainingDescription, maxLength);
    return wrappedDescription ;
  }
}
const maxLength = 25 
 
cartItems.forEach((item:any) => {
  let  maxLength1 = 0
    let maxLengthChar = 35;
    if (item && item.price !== undefined) {
      const priceString = String(item.price); // Convert item.price to a string
       maxLength1 = 25 + priceString.length;
    }

    const itemDescription = item.description; // Replace with your actual item description
    const wrappedDescription = wrapDescription(itemDescription, maxLength);

    const formattedQuantity = String(parseInt(item.quantity)).padEnd(4, ' ')
    if (item.description.length < 25){
     const lengthShort = 25 - item.description.length
      maxLengthChar =  maxLengthChar + lengthShort
    }

    const totalAmount = item.price * item.quantity;

    // Format the total amount with a thousand separator and two decimal places
    const formattedTotal = totalAmount.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })



//************** Alignment of Description And Amount***************** */
//#region 

    if (formattedTotal.length === 4 ) {
      maxLengthChar += 1
      const spaces = ' '.repeat(maxLengthChar - maxLength1);
    
      receiptContent += `${formattedQuantity}  ${wrappedDescription}@${item.price}${spaces} ${formattedTotal}\n`;
    }
    if (formattedTotal.length === 5 ) {
      const spaces = ' '.repeat(maxLengthChar - maxLength1);
    
      receiptContent += `${formattedQuantity}  ${wrappedDescription}@${item.price}${spaces} ${formattedTotal}\n`;
    }

    if (formattedTotal.length === 6 ) {
       maxLengthChar -= 1;
    
      const spaces = ' '.repeat(maxLengthChar - maxLength1);
      receiptContent += `${formattedQuantity}  ${wrappedDescription}@${item.price}${spaces} ${formattedTotal}\n`;
    }

    if (formattedTotal.length === 7 ) {
      maxLengthChar -= 2;

      const spaces = ' '.repeat(maxLengthChar - maxLength1);
      receiptContent += `${formattedQuantity}  ${wrappedDescription}@${item.price}${spaces} ${formattedTotal}\n`;
    }
    
    if (formattedTotal.length === 8 ) {
      maxLengthChar -= 3;
   
      const spaces = ' '.repeat(maxLengthChar - maxLength1);
      receiptContent += `${formattedQuantity}  ${wrappedDescription}@${item.price}${spaces} ${formattedTotal}\n`;
    }

    if (formattedTotal.length === 9 ) {
      maxLengthChar -= 4;
   
      const spaces = ' '.repeat(maxLengthChar - maxLength1);
      receiptContent += `${formattedQuantity}  ${wrappedDescription}@${item.price}${spaces} ${formattedTotal}\n`;
    }

    if (formattedTotal.length === 10 ) {
      maxLengthChar -= 5;
   
      const spaces = ' '.repeat(maxLengthChar - maxLength1);
      receiptContent += `${formattedQuantity}  ${wrappedDescription}@${item.price}${spaces} ${formattedTotal}\n`;
    }
    

    // receiptContent += `${item.quantity}  ${wrappedDescription}${spaces} ${item.totalAmount}\n`;
    const amountWithoutSeparator = parseFloat(formattedTotal.replace(/,/g, ''));
    total += amountWithoutSeparator;
    totalqty += parseFloat(item.quantity); 
    //#endregion
});

  const amountDue = `Total Amount Due: ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const totalQTY = `Items ${totalqty}`

//**********Alignment of Items and Amount Due */

//#region 
  if (totalQTY.length < 25){
    const lengthShort = 25 - totalQTY.length

    const maxLengthChar = 24 + lengthShort
     let spaces = ''


     if (amountDue.length === 23){
      spaces = ' '.repeat(maxLengthChar - maxLength);
    }

    if (amountDue.length === 24){
      spaces = ' '.repeat(maxLengthChar - (maxLength + 1));
    }
    if (amountDue.length === 25){
      spaces = ' '.repeat(maxLengthChar - (maxLength + 2));
    }
     if (amountDue.length === 26){
       spaces = ' '.repeat(maxLengthChar - (maxLength + 3));
     }
     if (amountDue.length === 27){
      spaces = ' '.repeat(maxLengthChar - (maxLength + 4));
    }
    if (amountDue.length === 28){
      spaces = ' '.repeat(maxLengthChar - (maxLength + 5));
    }


    const formattedQuantity = String(totalQTY).padEnd(4, ' ')


    receiptContent += '<div>================================================</div>'

    receiptContent +=  `${formattedQuantity} ${spaces}${amountDue}`;
 
//#endregion
   }    
  return receiptContent;
};


const CloseViewCancelledSO = () => {
setViewCancelledSOModal(false)
}


  return (
    <div>
      
            <iframe
              id="myIframe"
              style={{
                position: 'absolute',
                display: 'none',
                backgroundColor: '#ffff',
                height: '90%',
                marginTop: '10px',
                width: '300px',
                borderRadius: '10px',
                zIndex: '9999',
                left: '0',
                right: '0' // Ensure iframe is centered horizontally
              }}
              src="https://example.com"
            ></iframe>
        {/* <iframe id="myIframe" style={{position:'absolute',display:'none',backgroundColor:'#ffff',height:'90%',marginTop:'10px',width:'30%',
          marginLeft:'35%',borderRadius:'10px',   zIndex: '9999'}} src="https://example.com">
        </iframe> */}
      
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
                         <>
                  
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
                        {DiscountType === 'ITEM' && (
                            <>
                              {DisEntry && DisEntry.map((item1: any, index: number) => {
                                    let line_no = 0
                                    if (item.line_no === undefined){
                                      line_no = item.lineno
                                    }else{
                                      line_no = item.line_no
                                    }

                                  if (item.barcode === item1.Barcode && line_no === item1.LineNo) {
                                  return (
                                    <tr key={item1.id} style={{ border: 'none', color: 'red', fontWeight: 'bold' }}>
                                      <td colSpan={1} style={{ textAlign: 'center', border: 'none' }}>
                                        <FontAwesomeIcon
                                          icon={faTrash}
                                          onClick={() => onDeleteItem(index)} // Handle delete action
                                          style={{ cursor: 'pointer', color: 'red' }}
                                        />
                                      </td>
                                      <td colSpan={3} style={{ textAlign: 'center', border: 'none' }}>
                                        {item1.D1}% DISC: {item1.Description}
                                      </td>
                                      <td colSpan={1} style={{ textAlign: 'center', border: 'none' }}>
                                        -{parseFloat(item1.ByAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                      </td>
                                    </tr>
                                  );
                                } else {
                                  // Return null (or any placeholder) if the barcode does not exist in SalesOrderListing
                                  return null;
                                }
                              })}
                            </>

                          )}
                        </>
                          ))
                          ) : (
                                // {isLoading && <InProgressLoading/>}
                          <tr>
                              <td colSpan={4}>No items in the transaction</td>
                          </tr>
                      )}

                        { Dis && (
                          <>
                           { DiscountType === 'SC' && (
                            <>
                              <tr style={{ border: 'none', borderCollapse: 'collapse' }}>
                                <td colSpan={5}></td>
                              </tr>
                              <tr style={{ border: 'none',color:'red',fontWeight:'bold' }}>
                                <td colSpan={3} style={{ textAlign: 'center', border: 'none' }}> SC VAT Exemption on {TotalAmountD}</td>
                                <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}>-{DisEntry.SeniorDiscountData.SLessVat12}</td>
                              </tr>
                              <tr style={{ border: 'none',color:'red',fontWeight:'bold'   }}>
                                <td colSpan={3} style={{ textAlign: 'center', border: 'none'}}> SC Discount: 20% of  {DisEntry.SeniorDiscountData.SNetOfVat}</td>
                                <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}>-{DisEntry.SeniorDiscountData.SLess20SCDiscount}</td>
                              </tr>
                            </>

                          )}
                            { DiscountType === 'TRANSACTION' && (
                            <>
                              <tr style={{ border: 'none', borderCollapse: 'collapse' }}>
                                <td colSpan={5}></td>
                              </tr>
                              <tr style={{ border: 'none',color:'red',fontWeight:'bold' }}>
                                <td colSpan={3} style={{ textAlign: 'center', border: 'none' }}> Transaction Discount {TransactionAmountRate}%</td>
                                <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}>-{TransactionAmountD}</td>
                              </tr>
                              </>

                          )}
                          
                          {/* {DiscountType === 'ITEM' && (
                            <>
                              <tr style={{ border: 'none', borderCollapse: 'collapse' }}>
                                <td colSpan={5}></td>
                              </tr>
                              {DisEntry && DisEntry.map((item: any,index:number) => (
                              <tr key={item.id} style={{ border: 'none', color: 'red', fontWeight: 'bold' }}>
                                  <td colSpan={1} style={{ textAlign: 'center', border: 'none' }}>
                                    <FontAwesomeIcon
                                      icon={faTrash}
                                      onClick={() => onDeleteItem(index)} // Handle delete action
                                      style={{ cursor: 'pointer', color: 'red' }}
                                    />
                                  </td>
                                <td colSpan={3} style={{ textAlign: 'center', border: 'none' }}>{item.D1}% DISC: {item.Description}</td>
                                <td colSpan={1} style={{ textAlign: 'center', border: 'none' }}>-{parseFloat(item.ByAmount).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>

                              </tr>
                            ))}
                            
                            </>

                          )} */}


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
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,ViewCancelSORef,SettleSORef,PrintSORef,0)}
                      tabIndex={0}
                      ref={SettleSORef}
                      onClick={handleSettleOrder}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' , 
                         color: isFocus == 0 ? 'white':'blue',textAlign:'center'}}>
                      Settle Bill</p>
                      <img src= {SettleImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>
                    
                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              
                      }}
                      onClick={()=>PrintBill()}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,SettleSORef,PrintSORef,CancelSORef,1)}
                      ref={PrintSORef}
                      tabIndex={1}
                      >

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,  
                        color: isFocus == 1 ? 'white':'blue',textAlign:'center'}}>
                      Print Bill</p>
                      <img src= {ReprintImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>


              

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  
                      }}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,PrintSORef,CancelSORef,ViewCancelSORef,2)}
                      tabIndex={2}
                      onClick={CancellSO}
                      ref={CancelSORef}
                      >
                      <p style={{ color: isFocus == 2? 'white':'blue', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,height:'70px',fontWeight:'bold' ,textAlign:'center'}}>
                      Cancel SO</p>
                      <img src= {CancellSOImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>
                      

                    <div     
                      style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
                      alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                      borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                   
                      }}
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,CancelSORef,ViewCancelSORef,SeniorDSORef,3)}
                      tabIndex={3}
                      ref={ViewCancelSORef}
                      onClick={()=> setViewCancelledSOModal(true)}
                      >

                      <p style={{ color: isFocus == 3 ? 'white':'blue', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' ,textAlign:'center'}}>
                      View Cancelled SO</p>
                      <img src= {ViewCancellSOImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
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
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,ViewCancelSORef,SeniorDSORef,PWDDSORef,4)}
                      tabIndex={4}
                      >
                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,   
                       color: isFocus == 4 ? 'white':'blue',textAlign:'center'}}>
                      Senior Citizen Discount</p>
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
                      onKeyDown={(e)=> PaymentModalHandleKeydown(e,ItemDSORef,CloseSORef,SettleSORef,9)}
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
               Senior Citezin Discount</p>
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
 
                  {isLoading && <InProgressLoading/>}
                  {OpenVireficationModal && <Verification handleClose={CloseVerification} VerificationEntry={OKVerification}/>}
                  {OpenSeniorCitezenDiscountModal && <SeniorCitezenDiscount handleClose={CloseSeniorCitezenDiscount} SeniorData={SaveSeniorCitezenDiscount} 
                                              amountcover={TotalAmountD} SeniorOrderData={SalesOrderList}/>}
                  {OpenItemDiscountModal && <ItemDiscounts handleClose={CloseItemDiscountsEntry}  SelectedItemDiscount={SelectedItemDiscount} DiscountedData={SaveItemDiscountEntry}/>}
                  {ViewCancelledSOModal && <ViewCancelledSOData handleclose={CloseViewCancelledSO} />}
                  {OpenTradeDiscountModal && <TradeDiscountList handleClose={CloseTradeDiscountsEntry} SalesOrderListings ={SalesOrderListing} TradeData={SaveTradessDiscountEntry}/>}
                  {OpenTransactionDiscountModal && <TransactionDiscount handleClose={CloseTransactionDiscountsEntry} SalesOrderListings ={SalesOrderListing} TransactionData={SaveTransactionDiscountEntry}/>}
    </div>
  );
};

export default ListOfDineInSalesOrder;
