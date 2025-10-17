/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useEffect, useState,useRef, ChangeEvent, useLayoutEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {BASE_URL, SOCKET_URL } from '../config';
import image from '../assets/item.jpeg';
import table from '../assets/TABLE1.jpg';
import cash from '../assets/cash.jpeg';
import credit from '../assets/credit.png';
import itemD from '../assets/itemDiscount.jpeg';
import transactD from '../assets/transactionDiscount.png';
import tradeD from '../assets/tradeDiscount.jpeg';
import pwdD from '../assets/pwdDiscount.png';
import epsCard from '../assets/card.jpeg';
import Senior from '../assets/senior.png';
import Multiple from '../assets/multiple.jpeg';
import ChargeRoom from '../assets/RoomCharge.png'
import OtherP from '../assets/oPayment.png'
import giftC from '../assets/giftCheck.png'
import Swal from "sweetalert2";
import Selectpayment from '../assets/Selectpayment.jpg';
import SaveOrder from '../assets/SaveOrder.png';
import HomeImage from '../assets/Home.png';
import SalesOrderImage from '../assets/SalesOrder.png';
import OtherCommandImage from '../assets/OtherCommand.png';
import ReprintImage from '../assets/ReprintImage.jpeg';
import ChangeOderTypeImage from '../assets/ChangeOrder.jpg';
import CloseImage from '../assets/close.png';
import RefreshImage from '../assets/RefreshImage.png';
import ReturnImage from '../assets/retrun.png'
import LockTerImage from '../assets/Lock.png'
import CashCountImage from '../assets/CashCount.jpg'
import CashPullOutImage from '../assets/CashPullOut.jpg'
import SuspendImage from '../assets/Susppend.png'
import VoidTransImage from '../assets/Void.png'
import CancelTransImage from '../assets/CancelledTransaction.png'
import clientLogo from '../assets/GervaciosLogo.jpg'
import logo from '../assets/logo.png'
import './css/restaurant.css';
import CustomerDineIn from './customerEntryDineIn';
import ListOfDineInSalesOrder from './listofDineInSalesOrder';
import CashPaymentEntry from './CashPaymentEntry';
import CustomerPayment from './CustomerEntryPayment';
import ReprintTransaction from './RepirintTransaction';
import CashBreakDown from './CashBreakDown';
import ChargeTo from './Charge';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faShoppingCart, faMinus, faClose, faTrashAlt, faArrowAltCircleDown, faArrowDown, faExpand, faExpandArrowsAlt, faChevronDown, faChevronCircleDown, faArrowUp, faAnglesUp, faAnglesDown, faSliders, faAngleUp, faAngleDown, faAngleDoubleDown, faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons';
import QRCode from 'qrcode-generator';
import { Button, Dialog, DialogContent, DialogTitle, Grid, Table, Typography } from '@mui/material';
import { createTheme, ThemeProvider,Theme,makeStyles, useTheme, responsiveFontSizes  } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import { isDesktop, isMobile,isTablet } from 'react-device-detect';
import { ClipLoader } from 'react-spinners';

import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import Verification from './Verification';
///**************PRODUCT GRID DESIGN*******************//
import showErrorAlert from '../SwalMessage/ShowErrorAlert';
import SeniorCitezenDiscount from './DiscountSeniorCitezen';
import ItemDiscounts from './DiscountItems'
import TradeDiscountList from './DiscountTrade'
import TransactionDiscount from './DiscountTransaction';
import jsPDF, { Html2CanvasOptions } from 'jspdf';
import eventEmitter from 'events';
import MultiplePayments from './MultiplePayments';
import CreditCardPaymentEntry from './CreditCardPayment';
import DebitCardPaymentEntry from './DebitCardPayment';
import CreditCardPayment from './CreditCard';
import DebitCardPayment from './DebitCard';
import GIftCheckPaymentEntryModal from './GiftCheckPayment';
import GiftCheckPaymentTransModal from './GiftCheck';
import OnlinePaymentTransModal from './Online';
import OnlinePaymentEntryTransModal from './OnlinePaymentEntry';
import OtherPaymentTransModal from './Other';
import OtherPaymentEntryTransModal from './OtherPaymentEntry';
import showSuccessAlert from '../SwalMessage/ShowSuccessAlert';
import showInfoAlert from '../SwalMessage/ShowInfoAlert';
import ListOfTransaction from './ListofTransaction';
import OnScreenKeyboard from './KeyboardGlobal';
import OnScreenKeyboardNumeric from './KeyboardNumericGlobal';
import PdfModal from './PdfModal';
import { GetSettings } from '../global';
import { pdfjs } from 'react-pdf';
import { Link } from 'react-router-dom';

import pdfjsLib from 'pdfjs-dist';
import { ExtendedDataWebSocket,LoginWebSocket,LogoutWebSocket, SelectTableWebSocket } from '../websocket';
import { useLogoutSocket,useLoginSocket,useExtendedSocket } from './websocketConnection';
import { set } from 'date-fns';
;
import { setGlobalItems,setGlobalIsLogin,setGlobalIsLoading,setGlobalModal } from '../globalSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {RootState} from '../store'
import getextendedAPI from '../utils/ExtendedAPI'
import getextendedAMTAPI from '../utils/getAmountTenderedAPI';
import GiftCheckPaymentModal from './GiftCheck';
import GIftCheckPaymentEntry from './GiftCheckPayment';
import OnlinePaymentEntryModal from './OnlinePaymentEntry';
import { InProgressLoading } from '../Loader/Loader';


const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

axios.defaults.withCredentials = true;
interface ProductList {
  long_desc: any;
  reg_price: any;
  bar_code: any;
}

interface ProductData {
  products :ProductList[];
  addtocart:any;
  selectedProductData:any;
  isSelected:any;
  OrderTypeModal: boolean;

}



  
const ProductGrid: React.FC<ProductData> = ({ products , addtocart ,selectedProductData,isSelected,OrderTypeModal}) => {
    const [quantity, setQuantity] = useState<number | 1>(1); // Adjust the initial state value
    const [Price, setPrice] = useState<number>(1);
    const ProductRef = useRef<HTMLDivElement>(null)
    const [isFocusIndex,setisFocusIndex] = useState<boolean>(true)
    const [ProductColPerRows, setProductColPerRows] = useState<number>(0);
    const [ShowArrowUpAndDown,setShowArrowUpAndDown] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<SelectedDatas | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [isSelectedIndex, setisSelectedIndex] = useState<any>(null);
    const [productsPerRow, setProductsPerRow] = useState<any>(0);
    const ProductRefs = useRef<any>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    let isF1:boolean = false
    const [totalRow,setTotalRow] = useState<any>(0)
  useEffect(()=>{
    const fetchData = async() =>{
      const data = await GetSettings('ProductColPerRows')
      setProductColPerRows(data)
      console.log('ProductColPerRows',data)
    }
    fetchData()
  },[])

  
  useEffect(()=>{
    const fetchData = async() =>{
      const data = await GetSettings('ShowArrowUpAndDown')
      if(data == 'True'){
        setShowArrowUpAndDown(true)
      }else{
        setShowArrowUpAndDown(false)
      }
   
      console.log('ShowArrowUpAndDown',data)
    }
    fetchData()
  },[])


    useEffect(() => {
        setisSelectedIndex(isSelectedIndex)
        setTimeout(() => {
          if (ProductRefs.current[isSelectedIndex]) {
            ProductRefs.current[isSelectedIndex].focus();
          }
        }, 50);
    }, [isSelectedIndex]);


      useEffect(() => {
          setisSelectedIndex(isSelected)
        setTimeout(() => {
          if (ProductRefs.current[isSelected]) {
            ProductRefs.current[isSelected].focus();
          }
        }, 50);
      }, [isSelected, products]);

       
      useEffect(() => {
        if (isF1){
          focusindex();
          const interval = setInterval(() => {
            focusindex();
          }, 500);
          // Clear the interval when the component unmounts
          return () => clearInterval(interval);
        } 

      }, [isSelectedIndex]);

          
      useEffect(() => {
        const handleKeyPress = (event:any) => {
          if (event.key === 'F2') {
            event.preventDefault(); // Prevent default behavior of F2 key
          const x = localStorage.getItem('Modal')
          if (x == 'true') {
            return;
          }
            setisSelectedIndex(0);
            setTimeout(() => {
              if (ProductRefs.current[0]) {
                ProductRefs.current[0].focus();
              }
            }, 50);
          }else if (event.key === 'F1') {

            isF1 = false
          }
        };
      
        // Add event listener for keydown event
        document.addEventListener('keydown', handleKeyPress);
      
        // Cleanup function to remove event listener when component unmounts
        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
      }, [isSelected, ProductRefs]);


      useEffect(() => {
  function handleResize() {
    const container = document.getElementById('product-id'); // Adjust 'your-container-id' to your actual container ID
    if (container !== null) {
      // Calculate the number of products per row based on container width and product width
      const containerWidth = container.clientWidth;
      const productWidth = 140; // Assuming each product has a width of 140px
      const newProductsPerRow = Math.floor(containerWidth / productWidth);
      setProductsPerRow(newProductsPerRow);
    }
  }

  // Initial calculation on component mount
  handleResize();

  // Add event listener for window resize
  window.addEventListener('resize', handleResize);

  // Cleanup function to remove event listener
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // Empty dependency array ensures that this effect runs only once on component mount



useEffect(() => {
  // Function to calculate total rows
  const calculateTotalRows = () => {
    const container = document.getElementById('product-id');
    if (container) {
      const containerHeight = container.clientHeight;
      const gridItemHeight = 150; // Adjust this value based on your grid item height
      const gap = 5; // Adjust this value based on your gap between grid items
      const totalRows = Math.ceil((containerHeight + gap) / (gridItemHeight + gap));
      setTotalRow(totalRows);
    }
  };

  calculateTotalRows();
  window.addEventListener('resize', calculateTotalRows);
  return () => window.removeEventListener('resize', calculateTotalRows);
}, [products, isDesktop]);


    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      setQuantity(isNaN(value) ? 1 : value);
      calculateTotal();
    };

    const calculateTotal = () => {
      const total = isNaN(quantity) ? 0 : quantity * Price;
      return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    interface SelectedDatas{
      long_desc: any;
      reg_price: any;
      bar_code: any;
    }
  
    const handleproductclick = (product:any,index:any) => {
      selectedProductData({product,index})
      setisFocusIndex(false)
    };

    const addQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
      };

      const MinusQuantity = () => {
        setQuantity(prevQuantity => {
          const newQuantity = prevQuantity - 1;
          return newQuantity <= 0 ? 1 : newQuantity;
        });
      };

    const focusindex = () => {
      if (isFocusIndex) {
        if (ProductRefs.current[isSelectedIndex]) {
            ProductRefs.current[isSelectedIndex].focus();
    } }}

        
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const onClose = () => {
        setIsModalOpen(false);
    };

    const addtocarts = () => {
      if (selectedProduct !== null) {
        // Access properties of selectedProduct safely after null check
        addtocart({
          quantity: quantity,
          description: selectedProduct.long_desc,
          price: parseFloat(selectedProduct.reg_price).toFixed(2),
          totalAmount: calculateTotal(),
          barcode: selectedProduct.bar_code,
        });
        setIsModalOpen(false);
      } else {
        // Handle the case where selectedProduct is null (optional)
        // For example, you could show an error message or perform alternative logic
        console.error("selectedProduct is null");
      }
      
      };

const Handlekeydown = (e:any,index:any) => {
e.preventDefault()
  if (e.key === 'ArrowUp' && index > 0) {
    if (index > ProductColPerRows -1 ){
      setisSelectedIndex(index - ProductColPerRows);
    }

  } else if (e.key === 'ArrowDown' && index < products.length - 1) {
    setisSelectedIndex(index + ProductColPerRows);
  }

  else if (e.key === 'ArrowLeft' && index > 0) {
    setisSelectedIndex(index - 1);
  } else if (e.key === 'ArrowRight' && index < products.length - 1) {
    setisSelectedIndex(index + 1);
  }

else if (e.key == 'Enter'){
  handleproductclick(products[index],index)

}

}


const ClickArrowUp = () => {
  const product_id = document.getElementById('product-id');

  if (product_id){
    product_id.scrollTop -=650
  }

   
}
const ClickArrowDown = () => {

  const product_id = document.getElementById('product-id');

  if (product_id){
    product_id.scrollTop +=650
  }
   
}




  return (
  <>
{OrderTypeModal ? (
  <div style={{height:'100%'}}>
  <img src={clientLogo} alt="" style={{ height: '100%', width: '100%', display: 'inline-block' }} />
</div>
):(

  <>
{ShowArrowUpAndDown && 
<>
  {isDesktop  && (
    <div className='Product-up-down-Container' onClick={ClickArrowUp}>
      <button className='button-up'>
        <FontAwesomeIcon icon={faArrowUp} className='fa-fw'></FontAwesomeIcon>
      </button>
    </div>
    
  )}
</>
}


    <div id="product-id" style={{overflowY: 'auto' , display: 'grid', gridTemplateColumns: isDesktop ? products.length < ProductColPerRows ? 'repeat(auto-fit, minmax(15%, 150px))' : `repeat(${ProductColPerRows}, minmax(15%, 1fr))` : `repeat(${ProductColPerRows}, minmax(140px, 1fr))`,
     gap: '5px', margin: '10px',  height: products.length > 18 ? '100%':'',}}>

              {products.map((product: any, index) => (
                <div key={index}
                  tabIndex={index}
                  ref={(ref) => (ProductRefs.current[index] = ref)}
                  //  style={{ border: '1px solid #ccc', padding: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' , borderRadius:'10px',cursor:'pointer',caretColor:'transparent'}}
                  style={{
                    border: '1px solid #4a90e2',
                    padding: '5px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                    borderStyle: 'solid',
                    borderWidth: '2px',
                    borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                    backgroundColor: isSelectedIndex == index ? 'blue' : 'white',
                    height: products.length > 18 ? '100%':'170px',

                    // width: products.length < 5 ? '80%' : '100%'
                  }}
                  onKeyDown={(e) => Handlekeydown(e, index)}
                  onClick={() => handleproductclick(product, index)}>
                  <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Typography sx={{
                      textShadow: isSelectedIndex == index ? ' 0 0 3px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,2)' : 'none', color: isSelectedIndex == index ? 'white' : 'black', fontWeight: 'bold',
                      textAlign: 'center', marginBottom: '2%', flex: '1 1 100%', height: '40px',
                      fontSize: {
                        xs: '0.6rem', sm: '0.8rem', md: '.6rem', lg: '.8rem', xl: '0.9rem',
                      }, fontFamily: 'Times New Roman'
                    }}>
                      {product.long_desc}
                    </Typography>
                    <img src={product.prod_img === null ? clientLogo : 'data:image/jpeg;base64,' + product.prod_img} alt="Product Image" style={{ width: '80%', height: '50%', marginBottom: '1%', flex: '0 0 auto' }} />
                    {/* <img src={clientLogo} style={{ width: '80%', height: '50%', marginBottom: '1%', flex: '0 0 auto' }} /> */}
                    <Typography sx={{
                      textShadow: isSelectedIndex == index ? ' 0 0 3px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,2)' : 'none',
                      color: isSelectedIndex == index ? 'white' : 'black', fontWeight: 'bold', textAlign: 'center', flex: '1 1 100%',
                      fontSize: { xs: '.6rem', sm: '0.8rem', md: '.6rem', lg: '.8rem', xl: '0.9rem' }, fontFamily: 'Times New Roman'
                    }}
                    >Price: {parseFloat(product.reg_price).toFixed(2)}
                    </Typography>
                  </div>
                  {/* <p style={{fontWeight:'bold',textAlign:'center' , marginBottom: '10px'}}>{product.long_desc}</p>
              <img src={image} alt={product.bar_code} style={{ maxWidth: '80%', maxHeight: '150px', marginBottom: '10px' }} />
              <p style={{fontWeight:'bold',textAlign:'center' }}> Price: {parseFloat(product.reg_price).toFixed(2)}</p> */}
                </div>
              ))}


              {isModalOpen && (

                <div className="modal">
                  <div className="modal-content" style={{ height: '100%' }}>


                    <Typography
                      sx={{
                        fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.2rem', lg: '1.4rem', xl: '1.6rem' },
                        color: '#0d12a1',
                        textShadow: '1px 1px 2px rgba(13, 18, 161, 0.7)',
                        borderRadius: '5px',
                        fontWeight: 'bold', textAlign: 'center',
                      }}>
                      {selectedProduct?.long_desc}
                    </Typography>



                    {/* <h1 className="threeDText">{selectedProduct?.long_desc}</h1> */}
                    <img src={image} alt={selectedProduct?.bar_code} style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px' }} />


                    <Typography
                      sx={{
                        fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.0rem', lg: '1.1rem', xl: '1.2rem' },
                        color: '#0d12a1',
                        borderRadius: '5px',
                        fontWeight: 'bold', textAlign: 'center',
                      }}>
                      Price: {parseFloat(selectedProduct?.reg_price).toFixed(2)}
                    </Typography>
                    {/* <p className='Price'>Price: {parseFloat(selectedProduct?.reg_price).toFixed(2)}</p> */}
                    <div className="input-group">
                      <button className="btn" style={{ backgroundColor: 'white', color: 'red', border: 'solid' }} onClick={MinusQuantity}><FontAwesomeIcon icon={faMinus} /> </button>
                      <input type="number" ref={inputRef} inputMode="numeric" placeholder="Quantity" value={quantity} onChange={handleQuantityChange}
                        style={{ width: '60%', margin: '10px', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} />
                      <button className="btn" style={{ backgroundColor: 'white', color: 'blue', border: 'solid' }} onClick={addQuantity}> <FontAwesomeIcon icon={faPlus} style={{ verticalAlign: 'middle' }} /></button>
                    </div>
                    <p className='TotalDue'>Total Due: {calculateTotal()}</p>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                      <button style={{ color: 'white', backgroundColor: 'red', width: '50%', textAlign: 'center', display: 'inline-block' }} onClick={onClose} className="btn-close"> <FontAwesomeIcon icon={faClose} />Close</button>
                      <button className="btn-add-cart" style={{ color: 'white', backgroundColor: 'blue', width: '50%', textAlign: 'center', display: 'inline-block' }} onClick={addtocarts}>  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
                    </div>
                  </div>
                </div>


              )}

     
    </div>
    {ShowArrowUpAndDown && 
<>
    {isDesktop && (
    <div className='Product-up-down-Container' style={{ position: 'absolute', bottom: '0',marginRight:'-20px',zIndex:'0',}}  
       onClick={ClickArrowDown}>
      <button className='button-down'>
        <FontAwesomeIcon icon={faArrowDown} className='fa-fw' />
      </button>
    </div> 
    )}
    </>}
  </>


)}

  </>
  );
};






///**************TRANSACTION GRID DESIGN*******************//
interface TransactionData {
  cartitems :any;
  setcartitems:any;
  totaldue:any;
  EditOrderList:any;
  DiscountData:any;
  DiscountType:any;
}

const Transaction: React.FC<TransactionData> = ({ cartitems ,setcartitems,totaldue,EditOrderList,DiscountData,DiscountType  }) => {
    const [IsOpenTransModal, setIsOpenTransModal] = useState<boolean>(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [Price, setPrice] = useState<any>(0);
    const [description , setDescription] = useState<string>('');
    const [Barcode, setBarcode] = useState<number>(0);
    const [LineNo, setLineNo] = useState<number>(0);


    const inputRef = useRef<HTMLInputElement>(null);

    //#region 
    // const openModaltrans = (index) => {
    //     // setSelectedItemIndex(index);

    //     // setIsOpenTransModal(true);

        
    //   };

    // const openModaltrans = (index) => {
    //     const selectedItem = cartItems[index]; // Access the item using the index
    //     setQuantity(1)
      
    //     // Perform actions with the selected item
    //     setSelectedItemIndex(selectedItem);
    //     setPrice(selectedItem.price)
    //     setIsOpenTransModal(true);
    //   };

    //   const closeModal = () => {
    //     setIsOpenTransModal(false);
    //     setSelectedItemIndex(null);
    //   };

    //   const onDelete = () => {
    //     if (
    //       selectedItemIndex !== null &&
    //       selectedItemIndex >= 0 &&
    //       selectedItemIndex < cartItems.length
    //     ) {
    //       const updatedItems = [...cartItems];
    //       updatedItems.splice(selectedItemIndex, 1);
    //       setCartItems(updatedItems);
    //       closeModal();
    //     } else {
    //       // Handle invalid selectedItemIndex here (e.g., show an error message)
    //       console.error('Invalid selectedItemIndex or out of range');
    //     }
    //   };
      //#endregion

    const openModaltrans = (index: any) => {
      const selectedItem = cartitems[index];
      EditOrderList({selectedItem,index})
      // setQuantity(selectedItem.quantity);
      // setSelectedItemIndex(index); // Store the index directly, not the item itself
      // setPrice(selectedItem.price);
      // setDescription(selectedItem.description)
      // setBarcode(selectedItem.barcode)
      // // setLineNo(selectedItem.index)
      // setIsOpenTransModal(true);
      // setTimeout(() => {
      //   if (inputRef.current) {
      //     inputRef.current.focus();
      //   }
      // }, 100); // 1000 millisecond

    };
    
    const closeModal = () => {
      setIsOpenTransModal(false);
      setSelectedItemIndex(null);
    };
    
    const onDelete = () => {
      if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < cartitems.length) {
        const updatedItems = [...cartitems];
        updatedItems.splice(selectedItemIndex, 1);
        setcartitems(updatedItems);
        closeModal();

      } else {
        console.error('Invalid selectedItemIndex or out of range:', selectedItemIndex);
        // Handle the situation when the index is invalid or out of range
        // For example, show an error message or handle it in another appropriate way
      }
    };

       
    const onUpdateToCart = () => {
      if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < cartitems.length) {
        const updatedItems = [...cartitems];
        updatedItems[selectedItemIndex].quantity = quantity;
        updatedItems[selectedItemIndex].totalAmount = calculateTotal();  // Update the quantity to the new value
        setcartitems(updatedItems);
        closeModal();
      } else {
        console.error('Invalid selectedItemIndex or out of range:', selectedItemIndex);
        // Handle the situation when the index is invalid or out of range
        // For example, show an error message or handle it in another appropriate way
      }
    };

      const handleQuantityChange = (newValue: any) => {
        setQuantity(newValue);
        calculateTotal();
      };


      const calculateTotal = () => {
        const total = isNaN(quantity) ? 0 : quantity * Price;
        return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      };
  
      const [selectedProduct, setSelectedProduct] = useState(null);

    
      const handleProductClick = (product:any) => {
        setSelectedProduct(product);
        setPrice(product.reg_price);
         setQuantity(1);
      };
  
      const addQuantity = () => {
          setQuantity(prevQuantity => prevQuantity + 1);
          calculateTotal()
        };
  
        const MinusQuantity = () => {
          setQuantity(prevQuantity => {
            const newQuantity = prevQuantity - 1;
            return newQuantity <= 0 ? 1 : newQuantity;
          });
        };
        

        const onClose = () => {
            setIsOpenTransModal(false);
        };


        const focusedRowRef = useRef<HTMLTableRowElement>(null);

        const [selectedIndex, setSelectedIndex] = useState(0);

        let isf3 : boolean = false

        useEffect(() => {
          const handleKeyPress = (e:any) => {
  
            switch (e.key) {
              case 'F3':
                e.preventDefault();
                isf3 = true
                setSelectedItemIndex(selectedIndex);
                focusedRowRef.current && focusedRowRef.current.focus();
                break;
              default:
                break;
            }
          };
      
          window.addEventListener('keydown', handleKeyPress);
      
          return () => {
            window.removeEventListener('keydown', handleKeyPress);
          };
        }, [selectedIndex, setSelectedItemIndex, cartitems]);
      

        const handleKeydownTable = (e:any) => {
          switch (e.key) {
            case 'ArrowDown':
              e.preventDefault();
              if (selectedIndex < cartitems.length - 1) {
                setSelectedIndex((prevIndex) => prevIndex + 1);
              } else {
                // If not in isf3 mode or at the end, wrap to the first item
                setSelectedIndex(0);
              }
              break;

            case 'ArrowUp':
                e.preventDefault();
                if (selectedIndex > 0) {
                  setSelectedIndex((prevIndex) => prevIndex - 1);
                } else {
                  // If at the beginning, wrap to the last item
                  setSelectedIndex(cartitems.length - 1);
                }
                break;
        
            case 'Enter':
              e.preventDefault();
              openModaltrans(selectedIndex)
              break;
        
            // Add additional cases for other arrow keys if needed
            default:
              break;
          }
        }

  const [TransactionAmountD,setTransactionAmountD] = useState<any>(null)
  const [TransactionAmountRate,setTransactionAmountRate] = useState<any>(null)

    useEffect(()=>{
      let amountD :any = 0
      let rate :any = 0
    if (DiscountType==='TRANSACTION'){
      DiscountData.map((item:any) => {
        amountD = parseFloat(amountD) + parseFloat(item.Discount)
        rate = parseFloat(item.desc_rate)
    });
      setTransactionAmountD(parseFloat(amountD).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
      setTransactionAmountRate(parseFloat(rate).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}))
    }
 
    },[DiscountData])


    return (
      <div className="Transaction" style={{ overflowY: 'auto', maxHeight: '55%' ,
       border: '1px solid #ccc', borderRadius: '10px',
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '2px' }}>
        <Table 
            tabIndex={0} // Make the table focusable
            className="OrderList" sx={{
              fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
              overflow: 'auto'}} >
          <thead>
            <tr>
              <th>Qty</th>
              <th>Description</th>
              <th>Price</th>
              <th>Amount</th>
              <th style={{display:'none'}} >Barcode</th>
              <th style={{display:'none'}}  >Line</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(cartitems) && cartitems.length > 0 ? (
           cartitems.map((item, index) => (
            <>
         
            <tr key={index} onClick={() => openModaltrans(index)}
            onKeyDown={(e) => handleKeydownTable(e)}
            ref={index === 0 ? focusedRowRef : null}
            tabIndex={index === 0 ? 0 : undefined}
            style={{ outline: selectedIndex === index ? '2px solid blue' : 'none',
            backgroundColor: selectedIndex === index ? 'blue':'white' ,color : selectedIndex === index? 'white':'black',
            fontSize:'1vw',
            height:'50px',
            whiteSpace: 'pre-wrap', /* or 'wrap' if you want to break on word boundaries */
            wordWrap: 'break-word',
          
          }} // Add focus style

            > 
            <td style={{textAlign:'center'}}>{item.quantity}</td>
            <td title={item.description}>{item.description}</td>
            <td style={{textAlign:'end'}}>{parseFloat(item.price).toFixed(2)}</td>
            <td style={{textAlign:'end'}}>
              {(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td style={{display:'none'}} >{item.barcode}</td>
            <td style={{display:'none'}}  >{item.lineno}</td>
           
    </tr>

        {DiscountType === 'ITEM' && (
          <>
            {DiscountData && DiscountData.map((item1: any, index: number) => {
              let line_no = 0
              if (item.line_no === undefined){
                line_no = item.lineno
              }else{
                line_no = item.line_no
              }
              if (item.barcode === item1.Barcode && line_no=== item1.LineNo) {
                return (
                  <tr key={item1.id} style={{ border: 'none', color: 'red', fontWeight: 'bold' }}>
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
  <tr>
    <td colSpan={4}>No items in the transaction</td>
  </tr>
)}


        {DiscountData.length !== 0 && (
                        <>
                        {DiscountType ==='SC' && (
                        <>
                          <tr style={{ border: 'none', borderCollapse: 'collapse' }}>
                            <td colSpan={5}></td>
                          </tr>
                          <tr style={{ border: 'none',color:'red',fontWeight:'bold' }}>
                            <td colSpan={3} style={{ textAlign: 'center', border: 'none' }}> SC VAT Exemption on {(parseFloat(totaldue) + parseFloat(DiscountData.SLess20SCDiscount.replace(',' , '')) + parseFloat(DiscountData.SLessVat12.replace(',' , ''))).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                            <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}>-{DiscountData.SLessVat12}</td>
                          </tr>
                          <tr style={{ border: 'none',color:'red',fontWeight:'bold'   }}>
                            <td colSpan={3} style={{ textAlign: 'center', border: 'none'}}> SC Discount: 20% of  {DiscountData.SNetOfVat}</td>
                            <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}> -{DiscountData.SLess20SCDiscount}</td>
                          </tr>
                          </>
                          )}
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
          </tbody>
        </Table>
      
        {/* {IsOpenTransModal && (
            <div className="modal">
            <div className="modal-content">
              
            <h1 className="threeDText">{description}</h1>
            <img src={image} style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px' }} />
            <p className='Price'>Price: {parseFloat(Price).toFixed(2)}</p>
            <div className="input-group">
        
            <button className="btn" style={{backgroundColor:'white',color:'red' ,border:'solid'}} onClick={MinusQuantity} >
                <FontAwesomeIcon icon={faMinus}  />

                </button>
  
                <input ref={inputRef}
                      type="number"
                      inputMode="numeric"
                      placeholder="Quantity"
                      value={quantity}
                      onChange={(event) => handleQuantityChange(event.target.value)}
                      style={{
                        width: '60%',
                        margin: '10px',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    />
                <button className="btn" style={{backgroundColor:'white',color:'blue' ,border:'solid'}} onClick={addQuantity}>
                <FontAwesomeIcon icon={faPlus} />

                </button>
                
            </div>
            <p className='TotalDue'>Total Due: {calculateTotal()}</p>

            <button className="btn-add-cart" style={{color:'white',backgroundColor:'blue',width:'100%',textAlign:'center', display: 'inline-block'}} onClick={onUpdateToCart}> 
                <FontAwesomeIcon icon={faShoppingCart} />Update to Cart </button>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
              <button style={{color:'white',backgroundColor:'red',width:'50%',textAlign:'center', display: 'inline-block'}} onClick={onClose} className="btn-close"> <FontAwesomeIcon icon={faClose} /> Close</button>
              <button style={{color:'white',backgroundColor:'red',width:'50%',textAlign:'center', display: 'inline-block'}} onClick={onDelete} className="btn-close"> <FontAwesomeIcon icon={faTrashAlt} /> Delete </button>
            </div>
            </div>
        </div>
        )} */}


      </div>
      
    );
  };
  




///**************CATEGORY GRID DESIGN*******************//

interface CategoryData {
  category :any;
  onReceiveProducts:any;
  IsModalOpen:() => boolean;
}
const CategoryGrid: React.FC<CategoryData> = ({ category , onReceiveProducts,IsModalOpen }) => {
  const isLogin = useSelector((state:RootState)=> state.global.globalIsLogin)
  const [selectedCategory, setSelectedCategory] = useState(null);
  // const booleanValue = useSelector((state: any) => state.booleanValue);
  // const dispatch = useDispatch()
  const [selectedCategoryall, setSelectedCategoryall] = useState<boolean>(false);

    const [productscCat, setProducts] = useState([]);

    const [ShowArrowUpAndDown,setShowArrowUpAndDown] = useState<boolean>(false);
    useEffect(()=>{
      const fetchData = async() =>{
        const data = await GetSettings('ShowArrowUpAndDown')
        if(data == 'True'){
          setShowArrowUpAndDown(true)
        }else{
          setShowArrowUpAndDown(false)
        }
     
        console.log('ShowArrowUpAndDown',data)
      }
      fetchData()
    },[])
  

    const fetchData = async (x: any,index:any) => {
      if (x == 'ALL'){
        setSelectedCategoryall(true)

      }else{
        setSelectedCategoryall(false)
      }
    
      try {
        // const response = await axios.get(`${BASE_URL}/api/product/${x}`);
        const response = await axios.get(`${BASE_URL}/api/product-category/`,{
          params: {
            category:x,
          },withCredentials:true
        });

        setisSelectedIndexData(index)
        setSelectedCategory(x); // Assuming setSelectedCategory is defined elsewhere
        setProducts(response.data); // Assuming setProducts is defined elsewhere
        onReceiveProducts(response.data);
        // if (onReceiveProducts) {
        //   onReceiveProducts(response.data);
        // }
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

    
    const OnKeyPressfetchData = async (x: any) => {

      if (x == 'ALL'){
        setSelectedCategoryall(true)

      }else{
        setSelectedCategoryall(false)
      }
    
      try {
        // const response = await axios.get(`${BASE_URL}/api/product/${x}`);
        const response = await axios.get(`${BASE_URL}/api/product-category/`,{
          params: {
            category:x,
          },withCredentials:true
        });

        setProducts(response.data); // Assuming setProducts is defined elsewhere
        onReceiveProducts(response.data);
        // if (onReceiveProducts) {
        //   onReceiveProducts(response.data);
        // }
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
  

    const [isSelectedIndexData,setisSelectedIndexData] = useState(0)
    // const categoryRef = useRef<any>([]);
    const categoryRef = useRef<any>([]);


    useEffect(() => {
      const handleKeyPress = (event:any) => {
        switch (event.key) {
          case 'F1':
            event.preventDefault();
             // Prevent default behavior of F1 key
            if (categoryRef.current) {

              let x:any = IsModalOpen()
              if (localStorage.getItem('Modal') === 'true') {
                return;
              }
              if (isSelectedIndexData <= 0){
                categoryRef.current[0].focus(); // Focus on the first category item
                setisSelectedIndexData(0)
  
              } else{
                categoryRef.current[isSelectedIndexData].focus(); // Focus on the first category item
      
              }
            }
            break;

            case 'F2':
              event.preventDefault(); // Prevent default behavior of F1 key
              setisSelectedIndexData(-2)
              setSelectedCategoryall(false)
              break;
          // Add cases for other keys if needed
          default:
            break;
        }
      };
    
      // Add event listener for keydown event
      document.addEventListener('keydown', handleKeyPress);
    
      // Cleanup function to remove event listener when component unmounts
      return () => {
        document.removeEventListener('keydown', handleKeyPress);
      };
    }, []); // Empty dependency array to run only once on component mount
    

useEffect(() => {
  if (categoryRef.current.length > 0) {
    categoryRef.current[isSelectedIndexData].focus(); // Focus on the first category item
    
  }
},[isSelectedIndexData])


    const handleKeydownCategory = (e:any,index:any) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
 
          if (selectedCategoryall){
            setSelectedCategoryall(false)
            setisSelectedIndexData(0);
          }else {
            if (isSelectedIndexData < category.length - 1) {
              setisSelectedIndexData((prevIndex) => prevIndex + 1);
  
       
            } else {
              // If not in isf3 mode or at the end, wrap to the first item
              setisSelectedIndexData(0);
            }
  
          }

          break;

        case 'ArrowUp':
            e.preventDefault();
            if (isSelectedIndexData > 0) {
              setisSelectedIndexData((prevIndex) => prevIndex - 1);
              setSelectedCategoryall(false)
            } else {
              // If at the beginning, wrap to the last item
              if (selectedCategoryall) {
                setisSelectedIndexData(category.length - 1);
                setSelectedCategoryall(false)
       
              } else {
                setSelectedCategoryall(true)
                setisSelectedIndexData(-1)
              }
     

            }
            // OnKeyPressfetchData(category[isSelectedIndexData].category)
            break;
    
        case 'Enter':
          e.preventDefault();
          if (selectedCategoryall){
            OnKeyPressfetchData('ALL')
          } else {
            OnKeyPressfetchData(category[isSelectedIndexData].category)
          }
  
          break;
    
        // Add additional cases for other arrow keys if needed
        default:
          break;



      }
      
      if (categoryRef.current[isSelectedIndexData]) {
        categoryRef.current[isSelectedIndexData].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    
    const theme = useTheme();
    const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
    const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));


    const ClickArrowUp = () => {
      const category_id = document.getElementById('category-id');
    
      if (category_id){
        category_id.scrollTop -=650
      }
    
       
    }
    const ClickArrowDown = () => {
    
      const category_id = document.getElementById('category-id');
    
      if (category_id){
        category_id.scrollTop +=650
      }
       
    }


    return (
        // <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(200px, 1fr))', gap: '5px' ,margin:'10px'}}>
        //     {category.map(category => (
        //         <div key={category.category} onClick={() => fetchData(category.category)} 
        //          style={{ border: '1px solid #ccc', padding: '5px',
        //         justifyContent: 'center', /* Added to vertically center content */
        //          display: 'flex', flexDirection: 'column', alignItems: 'center',height:'60px' , borderRadius:'10px',cursor:'pointer'
        //          ,color: '#ffffff', backgroundColor: '#007bff', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', 
        //          fontWeight: 'bold', textAlign: 'center' }}>
        //            <p style={{ margin: '10px', textAlign: 'center'}}>{category.category.toUpperCase()}</p>
        //         </div>
        //     ))}
        // </div>

      //   <div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, minmax(200px, 1fr))', gap: '5px', margin: '10px' }}>
      //   {category.map((categoryItem: { category: any; }) => (
      //     <div
      //       key={categoryItem.category}
      //       onClick={() => fetchData(categoryItem.category)}
      //       style={{
      //         border: '1px solid #ccc',
      //         padding: '5px',
      //         justifyContent: 'center',
      //         display: 'flex',
      //         flexDirection: 'column',
      //         alignItems: 'center',
      //         height: '60px',
      //         borderRadius: '10px',
      //         cursor: 'pointer',
      //         color: '#ffffff',
      //         backgroundColor:
      //         selectedCategory === categoryItem.category ? '#ff9800' : '#007bff', // Change background color conditionally
      //         textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
      //         fontWeight: 'bold',
      //         textAlign: 'center',
      //       }}
      //     >
      //       <p style={{ margin: '10px', textAlign: 'center' }}>{categoryItem.category.toUpperCase()}</p>
      //     </div>
      //   ))}
      // </div>




<div id='category-id' style={{overflowY:'auto',height:'90vh'}}>
{ShowArrowUpAndDown && 
<>
  {isDesktop && (
        <div className='Product-up-down-Container' onClick={ClickArrowUp}>
        <button className='button-up' >
          <FontAwesomeIcon icon={faArrowUp} className='fa-fw'></FontAwesomeIcon>
        </button>
      </div>
        )}
</>}


   
      <div
          ref={categoryRef}
          key={0}
          onClick={() => fetchData('ALL',-1)}
            style={{
              border: '1px solid #ccc',
              padding: '5px',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '60px',
              // borderRadius: '10px',
              cursor: 'pointer',
              color: '#ffffff',
              backgroundColor:
              selectedCategoryall ? 'darkBlue' : '#007bff', // Change background color conditionally
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: '1rem', // Make the font responsive
              width: matchesXs ? '100%' : matchesSm ? '100%' : '100%', // Adjust width based on breakpoints
            }} 
          >
        <Typography
            variant="body1"
            sx={{
              margin: '5px',
              textAlign: 'center',
              fontSize: {
                xs: '0.8rem', // Default font size for extra-small screens
                sm: '0.5rem', // Font size for small screens
                md: '0.6rem', // Font size for medium screens
                lg: '0.8rem', // Font size for large screens
                xl: '1rem', // Font size for extra-large screens
              },
              fontWeight: 'bold',
              '@media (min-width:600px)': { // Additional responsive font size using @media query
                fontSize: '1rem',
              },
              // Add more @media queries for other breakpoints if necessary
            }}
          >
            SHOW ALL
          </Typography>
      </div>

          {isLogin && category.map((categoryItem:any,index:any ) => (
              <div
                key={index}
                tabIndex={index}
                  ref={(ref) => {
                    if (!categoryRef.current) categoryRef.current = [];
                    categoryRef.current[index] = ref;
                  }}
                // ref={(ref) => (categoryRef.current[index] = ref)}
                onClick={() => fetchData(categoryItem.category_desc,index)}
                onKeyDown={(e)=> handleKeydownCategory(e,index)}
                
                style={{
                  outline: isSelectedIndexData === index ? '2px solid blue' : 'none',
                  border: '1px solid #ccc',
                  padding: '5px',
                  justifyContent: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  height: '60px',
                  // borderRadius: '10px',
                  cursor: 'pointer',
                  color: '#ffffff',
                  backgroundColor:
                  // selectedCategory === categoryItem.category ? '#ff9800' : '#007bff', // Change background color conditionally
                  isSelectedIndexData === index ? 'darkBlue' : '#007bff', // Change background color conditionally
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: '1rem', // Make the font responsive
                  width: matchesXs ? '100%' : matchesSm ? '100%' : '100%', // Adjust width based on breakpoints
                }}
              >
            <Typography
                variant="body1"
                sx={{
                  margin: '10px',
                  textAlign: 'center',
                  fontSize: {
                    xs: '0.8rem', // Default font size for extra-small screens
                    sm: '0.5rem', // Font size for small screens
                    md: '0.6rem', // Font size for medium screens
                    lg: '0.8rem', // Font size for large screens
                    xl: '1rem', // Font size for extra-large screens
                  },
                  fontWeight: 'bold',
                  '@media (min-width:600px)': { // Additional responsive font size using @media query
                    fontSize: '1rem',
                  },
                  // Add more @media queries for other breakpoints if necessary
                }}
              >
                {categoryItem.category_desc.toUpperCase()}
              </Typography>
              </div>
            ))}
  

  {ShowArrowUpAndDown && <>
    {isDesktop && (
          <div className='Product-up-down-Container' style={{ position: 'absolute', bottom: '0',marginRight:'-20px'}} 
          onClick={ClickArrowDown}>
            <button className='button-down' >
              <FontAwesomeIcon icon={faArrowDown} className='fa-fw'></FontAwesomeIcon>
            </button>
          </div>
        )}
</>}

</div>
    );
  };



  ///**************MAIN DESIGN*******************//
const Restaurant: React.FC = () => {

  const navigate = useNavigate()
  const isLoading = useSelector((state:RootState)=> state.global.globalIsLoading)
  const isLogin = useSelector((state:RootState)=> state.global.globalIsLogin)
  const isModalOpened = useSelector((state:RootState)=> state.global.globalModal)
  const { openSocket, sendMessage, closeSocket,isConnected } = useLoginSocket();
  const { openExSocket, sendExMessage, closeExSocket } = useExtendedSocket();
  const { openLogoutSocket, sendLogoutMessage, closeLogoutSocket } = useLogoutSocket();
  const [OrderType, setOrderType] = useState<string>('');
  const [TableNo, setTableNo] = useState<string>('');
  const [QueNo, setQueNo] = useState<string>('');
  const [CustomerName, setCustomer] = useState<string>('');
  const [SOCustomerName, setSOCustomer] = useState<any>([]);
  const [GuestCount, setGuestCount] = useState<number>(0);
  const [PaymentType, setPaymentType] = useState<string>('');
  const [DiscountData, setDiscountData] = useState<any>('');
  const [DiscountDataList, setDiscountDataLits] = useState<any>('');
  const [DiscountType, setDiscountType] = useState<any>('');
  const [TotalDue, setTotalDue] = useState<any>(0);
  const [chatSocket, setChatSocket] = useState<WebSocket | null>(null);
  const [TableOnprocess,setTableOnprocess] = useState<any>(null)
  
  // const dispatch = useDispatch();
  // const booleanValue = useSelector((state: any) => state.booleanValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const TableNoRef = useRef<HTMLInputElement>(null);
  const QueNoRef = useRef<HTMLInputElement>(null);
  const [CashBreakDownModal, setCashBreakDownModal] = useState<boolean>(false);
  const [CloseTerminalModal, setCloseTerminalModal] = useState<boolean>(false);
  const [EditOrderModal, setEditOrderModal] = useState<boolean>(false);
  const [ChangeModal, setChangeModal] = useState<boolean>(false);
  const [MultiplePamentEntryModal, setMultiplePamentEntryModal] = useState<boolean>(false)
  const [DebitCardPaymentEntryModal, setDebitCardPaymentEntryModal] = useState<boolean>(false);
  const [CreditCardPaymentEntryModal, setCreditCardPaymentEntryModal] = useState<boolean>(false);
  const [DebitCardPaymentModal, setDebitCardPaymentModal] = useState<boolean>(false);
  const [CreditCardPaymentModal, setCreditCardPaymentModal] = useState<boolean>(false);
  const [GiftCheckPaymentEntryModal, setGiftCheckPaymentEntryModal] = useState<boolean>(false);
  const [GiftCheckPaymentModal, setGiftCheckPaymentModal] = useState<boolean>(false);

   const [OtherPaymentEntryModal, setOtherPaymentEntryModal] = useState<boolean>(false);
  const [OtherPaymentModal, setOtherPaymentModal] = useState<boolean>(false);

   const [OnlinePaymentEntryModal, setOnlinePaymentEntryModal] = useState<boolean>(false);
  const [OnlinePaymentModal, setOnlinePaymentModal] = useState<boolean>(false);
  const [ChargeToModal, setChargeToModal] = useState<boolean>(false);
  const [AddOrderModal, setAddOrderModal] = useState<boolean>(false);
  const [OrderTypeModal, setOrderTypeModal] = useState<boolean>(true);
  const [tableNoModal, setTableNoModal] = useState<boolean>(false);
  const [PaymentOpenModal, setPaymentOpenModal] = useState<boolean>(false);
  const [PaymentDiscountOpenModal, setPaymentDiscountOpenModal] = useState<boolean>(false);
  const [DineIn, setDineIn] = useState<boolean>(false);
  const [IsPayment, setIsPayment] = useState<boolean>(false);
  const [CustomerDineInModal,setCustomerDineInModal] = useState<boolean>(false)
  const [CustomeryPaymentModal,setCustomeryPaymentModal] = useState<boolean>(false)
  const [SelectTypeOfTransaction,setSelectTypeOfTransaction] = useState<boolean>(false)
  const [OtherCommandOpenModal, setOtherCommandOpenModal] = useState<boolean>(false);
  const [ReceiptOpenModal, setReceiptOpenModal] = useState<boolean>(false);
  const [CashPaymentEntryModal,setCashPaymentEntryModal] = useState<boolean>(false);
  const [ReprintTransactionModal,setReprintTransactionModal] = useState<boolean>(false);
  const [OpenlistOfTransactionModal,setOpenlistOfTransactionModal] = useState<boolean>(false);
  const [OpenLockModal,setOpenLockModal]= useState<boolean>(false)
  const [PrintReceiptModal,setPrintReceiptModal] = useState<boolean>(false);
  const [OpenVireficationModal,setOpenVireficationModal] = useState<boolean>(false)
  const [refreshCart, setRefreshCart] = useState(false);
  const [SalesOrderListOpenModal, setSalesOrderListOpenModal] = useState<boolean>(false);
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<any>([]);
  const [cartItems, setCartItems] = useState<any>([]);
  const [cartItems1, setCartItems1] = useState<any[]>([]);
  // const siteCode = useSiteCode();
  const [loading, setLoading] = useState(true);
  const [showTable, setshowTable] = useState(true);
  const [loadingPrint, setLoadingPrint] = useState(false);
  // Access user data values from the store
  interface TypeAndTableState {
    ordertTYpe: string;
    tableNo: string;
  }
  const [isSelected,setisSelected] = useState<any>(null)
  const TableNoModalRef = useRef<HTMLDivElement>(null)
  //**********PAYMENT BUTTON REF********* */
  const CashPaymentRef = useRef<HTMLDivElement>(null)
  const CreditCardPaymentRef = useRef<HTMLDivElement>(null)
  const EPSPaymentRef = useRef<HTMLDivElement>(null)
  const MultiplePaymentRef = useRef<HTMLDivElement>(null)
  const ChargePaymentRef = useRef<HTMLDivElement>(null)
  const GiftCheckPaymentRef = useRef<HTMLDivElement>(null)
  const OnlinePaymentRef = useRef<HTMLDivElement>(null)
  const OtherPaymentRef = useRef<HTMLDivElement>(null)
  const ClosePaymentRef = useRef<HTMLDivElement>(null)

    //**********ORDER TYPE REF********* */
    const TakeOutRef = useRef<HTMLButtonElement>(null)
    const DineInRef = useRef<HTMLButtonElement>(null)

    //**********TYPE OF TRANSACTION REF********* */
    const AddOrderRef = useRef<HTMLButtonElement>(null)
    const SettleOrderRef = useRef<HTMLButtonElement>(null)
    const TransferTableRef = useRef<HTMLButtonElement>(null)
    const ClearTableRef = useRef<HTMLButtonElement>(null)
    const CloseSelectTransTypeRef = useRef<HTMLButtonElement>(null)
    const [isTransfertable,setisTransfertable] = useState<boolean>(false)
    const [DineInOrderAndPay,setDineInOrderAndPay] = useState<boolean>(false)
  // Initialize the state with empty strings for ordertTYpe and tableNo
  const [TypeAndTable, setTypeAndTable] = useState<TypeAndTableState>({ ordertTYpe: '', tableNo: '' });
  const [CustomerOrderInfo, setCustomerOrderInfo] = useState<any>([]);
  // const onlineTestApp = new OnlineTestApp();
  const [AmountTendered,setAmountTendered] = useState<any>(0)
  // const [AmountTenderedMultiple,setAmountTenderedMultiple] = useState<any>(0)
  const [ChangeAmount,setChangeAmount] = useState<any>(0)
  const [AmountDue,setAmountDue] = useState<any>(0)
  const [showIframe, setShowIframe] = useState<boolean>(false);
  const SideCode = localStorage.getItem('SiteCode');
  const userRank = localStorage.getItem('UserRank');
  const [pdfPath, setPdfPath] = useState<any>('');
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
    // Initialize the state variable TableList with an empty array of TableItem type
  const [TableList, setTableList] = useState<any>([]);
  const [QueList, setQueList] = useState<QueItem[]>([]);
  const [quantity, setQuantity] = useState<number | 1>(1); // Adjust the initial state value
  const [selectedProduct, setSelectedProduct] = useState<SelectedDatas | null>(null);
  const [Price, setPrice] = useState<number>(0);
  const [TableColPerRows,setTableColPerRows] = useState<any>(0)
  const [selectedItemIndex, setSelectedItemIndex] = useState<any>(null);
  const [selectedItemIndexData, setSelectedItemIndexData] = useState<selecteditemData | null>(null);
  const [SuspendEntryModal,setSuspendEntryModal] = useState<boolean>(false)
  const [SuspendModalList,setSuspendModalList] = useState<boolean>(false)
  const [SuspendCustomerData,setSuspendCustomerData] = useState<any>({
    Customer :'',
    CusAddress:'',
  })
  const suspendCustomerRef = useRef(null)
  const suspendCustomeraddressRef = useRef(null)
  const [LockUsername,setLockUsername] = useState<any>('')
  const [LockPassword,setLockPassword] = useState<any>('')
  const LockUsernameRef = useRef(null)
  const LockPasswordRef = useRef<HTMLInputElement>(null)
  const [cashBreakDownType, setcashBreakDownType] = useState<any>(null);
  const [isKey, setIsKey] = useState<boolean>(false);
  const [isModal,setisModal] = useState<boolean>(false)
  const [OpenItemDiscountModal,setOpenItemDiscountModal] = useState<boolean>(false)
  const [OpenTradeDiscountModal,setOpenTradeDiscountModal] = useState<boolean>(false)
  const [OpenTransactionDiscountModal,setOpenTransactionDiscountModal] = useState<boolean>(false)
  const [OpenSeniorCitezenDiscountModal,setOpenSeniorCitezenDiscountModal] = useState<boolean>(false)
  const [SelectedItemDiscount,setSelectedItemDiscount] = useState(null)
  // const [TypeofDisCount,setTypeofDisCount] = useState<any>('')
  // const [Dis,setDis] = useState<boolean>(false)
  // const [DisEntry,setDisEntry] = useState<any>('')
  const [categoryHide, setCategoryHide] = useState(true);
  const [isFocus,setisFocus] = useState<any>(0)
  const theme = useTheme();
// const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
// const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));
  const [deviceType, setDeviceType] = useState<string>('');
  const [VeryficationType,setVeryficationType] = useState<string>('')
  const [isItemDis,setisItemDis] = useState<boolean>(false)
  const [focusedInput, setFocusedInput] = useState<any>('');
  const [focusedValue, setfocusedValue] = useState<any>('');
  const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);
  const [isShowKeyboardNumeric, setisShowKeyboardNumeric] = useState<boolean>(false);
  const [isShowKeyboardNumericForCardNo, setisShowKeyboardNumericForCardNo] = useState<boolean>(false);
  const [isShow, setisShow] = useState<boolean>(false);


  const otherCommandButton = `otherCommandButton`;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
// const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio);


// EXTENDED MONITOR GLOBAL VARIABLE
 const dispatch = useDispatch()
 useEffect(() => {
    const api = getextendedAPI();
    api.sendGlobalItems(cartItems); // send full cart to main process
  }, [cartItems]);


  const ClosepaymentTransaction = async () =>{
    setTableOnprocess('')
      if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      const message = {
        'message': '',
        'TableNO':'',
      };
      chatSocket.send(JSON.stringify(message));
    }
  }

  const ClosePdfModal = ()=> {
    setIsPdfModalOpen(false)
    if (cashBreakDownType === 'END SHIFT'){
      localStorage.clear()
      dispatch(setGlobalIsLogin(false))
    }
  }


  const fetchPdfReceiptData = async (or:any) => {
  try {

    const response = await axios.get(`${BASE_URL}/api/receipt-pdf/`, {
    params: { or },
    responseType: 'arraybuffer',
  });
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  // show in iframe
  setPdfPath(url);

  // user can click "Print" button, which calls:
  if (window.electronPDFPrint) {
    // const pdfBuffer = await fetch(pdfPath).then(res => res.arrayBuffer());
    // const result = await window.electronAPI.printPDF(pdfBuffer);
    // const buffer = await fetch(url).then(res => res.arrayBuffer());
    //   await window.electronPDFPrint.printPDF(buffer);
  } else {
    const win = window.open(url);
    if (win) win.onload = () => win.print();
  }

        if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':TableNo,
              };
              chatSocket.send(JSON.stringify(message));
          
            }
//   const response = await axios.get(`${BASE_URL}/api/receipt-pdf/`, {
//     params: { or: or },
//     responseType: 'blob',
//   });

//   const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
//   const pdfUrl = window.URL.createObjectURL(pdfBlob);
 
//   const printWindow = window.open(pdfUrl);

//   if (printWindow) {
//     printWindow.onload = function () {
//       printWindow.focus();
//       printWindow.print();

//       // 🕓 Wait a short moment, then close automatically
//       setTimeout(() => {
//         printWindow.close();
//       }, 1000); // adjust delay if needed (in ms)
//     };
//   } else {
//     console.error("Popup blocked. Please allow popups for this site.");
//   }
} catch (error) {
  console.error("Error fetching PDF:", error);
}

      // try {
      //     const response = await axios.get(`${BASE_URL}/api/receipt-pdf/`, {params: {
      //         or: or, // Pass your query parameter (e.g. order number)
      //       },
      //         responseType: 'blob', // Important to get the response as a blob
      //     });
      //     const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      //     setPdfPath(url);

      //       if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
   
      //         const message = {
      //           'message': "",
      //           'TableNO':TableNo,
      //         };
      //         chatSocket.send(JSON.stringify(message));
          
      //       }
      // } catch (error) {
      //     console.error('Error fetching PDF:', error);
      //     setError('Error fetching PDF. Please try again.');
      // }
  };

  const fetchPdfSalesorderData = async () => {
    const CashierID = localStorage.getItem('UserID');
    try {
        const response = await axios.get(`${BASE_URL}/api/sales-order-pdf/`, {
          params:{
            CashierID:CashierID
          },
            responseType: 'blob', // Important to get the response as a blob
        },);
        const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
        setPdfPath(url);
          if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
   
              const message = {
                'message': "",
                'TableNO':TableNo,
              };
              chatSocket.send(JSON.stringify(message));
           
            }
    } catch (error) {
        console.error('Error fetching PDF:', error);
        setError('Error fetching PDF. Please try again.');
    }
};

  interface TableItem {
    table_count: number;
    Paid: string;
    Susppend:string
    // Define other properties as needed
  }

  interface QueItem {
    q_no: string;
    Paid: string;
    // Define other properties as needed
  }
  
  // *************** TRANSACRION FOR ADD ORDER **********************
  //#region 


  interface SelectedDatas{
    product:any
    long_desc: any;
    reg_price: any;
    bar_code: any;
  }

  useEffect(()=>{
    const fetchData = async() =>{
      const data = await GetSettings('TableColPerRows')
      setTableColPerRows(data)
    }
    fetchData()
  },[TableList,QueList])

 const selectedProductData = (data:any) => {
  setAddOrderModal(true)
      setSelectedProduct(data)
      setPrice(data.product.reg_price);
      setQuantity(1);
  if (data.index == localStorage.getItem('index')){
    setisSelected(-1)
  }else{
    localStorage.setItem('index',data.index ) 
  }
   

      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 100); // 1000 millisecond


 }

  const CloseAddOrderModal = () => {
    setAddOrderModal(false)
  }

  const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) ? 1 : value);
    calculateTotal();
  };

  const calculateTotal = () => {
    const total = isNaN(quantity) ? 0 : quantity * Price;
    return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };
  const addQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const MinusQuantity = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity - 1;
      return newQuantity <= 0 ? 1 : newQuantity;
    });
  };

  const addtocarts = () => {
    if (selectedProduct !== null) {

    if (quantity === 0){
      const productToAdd = {
        quantity: 1,
        description: selectedProduct.product.long_desc,
        price: parseFloat(selectedProduct.product.reg_price).toFixed(2),
        totalAmount: calculateTotal(),
        barcode: selectedProduct.product.bar_code,
        lineno :cartItems.length + 1,
      };
      AddPosExtended(productToAdd)
      addToCart(productToAdd);
    }else{
      const productToAdd = {
        quantity: quantity,
        description: selectedProduct.product.long_desc,
        price: parseFloat(selectedProduct.product.reg_price).toFixed(2),
        totalAmount: calculateTotal(),
        barcode: selectedProduct.product.bar_code,
        lineno :cartItems.length + 1,
      };
      AddPosExtended(productToAdd)
      addToCart(productToAdd);
    }
      setAddOrderModal(false);

      setisSelected(localStorage.getItem('index'))
    }
    
    else {

      console.error("selectedProduct is null");
    }
    
    };

  const addToCart = (item: any) => {
    // Create a new array by spreading the existing cartItems and adding the new item to it
    const updatedCartItems = [item, ...cartItems];
    setCartItems(updatedCartItems);
};

  const setQuantityEntry = (qty:any) => {


    if (quantity === 0){
      const x = parseInt(qty)
      setQuantity((prev) => prev + x);
    }else{
      setQuantity((prev) => prev + qty);
    }
    // Update quantity using functional update to ensure correct previous state usage

  };

    interface selecteditemData {
      selectedItem:any;
      index:any;
    }

    const closeModal = () => {

      setSelectedItemIndex(null);
      setEditOrderModal(false);
    };
    
    const onDelete = async () => {

      if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < cartItems.length) {
        const updatedItems = [...cartItems];
        await DeletePosExtended(cartItems[selectedItemIndex])
        updatedItems.splice(selectedItemIndex, 1);
        setCartItems(updatedItems);
     
        closeModal();
 

      } else {
        console.error('Invalid selectedItemIndex or out of range:', selectedItemIndex);
        // Handle the situation when the index is invalid or out of range
        // For example, show an error message or handle it in another appropriate way
      }
    };
      
    const onUpdateToCart = () => {
      if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < cartItems.length) {

        if (quantity === 0){
          const updatedItems = [...cartItems];
          updatedItems[selectedItemIndex].quantity = 1;
          updatedItems[selectedItemIndex].totalAmount = calculateTotal();  // Update the quantity to the new value
          setCartItems(updatedItems);
          UpdatePosExtended(cartItems[selectedItemIndex])
          closeModal();
        }else{
          const updatedItems = [...cartItems];
          updatedItems[selectedItemIndex].quantity = quantity;
          updatedItems[selectedItemIndex].totalAmount = calculateTotal();  // Update the quantity to the new value
          setCartItems(updatedItems);
          UpdatePosExtended(cartItems[selectedItemIndex])
          closeModal();
        }

      } else {
        console.error('Invalid selectedItemIndex or out of range:', selectedItemIndex);
        // Handle the situation when the index is invalid or out of range
        // For example, show an error message or handle it in another appropriate way
      }
    };

    const EditOrderList = (data:any) => {

      if (isItemDis){
        const selectedItem:any = cartItems[data.index];
        setSelectedItemDiscount(selectedItem)
        setOpenItemDiscountModal(true)
     
      }else{
        setSelectedItemIndex(data.index)
        setSelectedItemIndexData(data)
        setQuantity(data.selectedItem.quantity)
        setPrice(data.selectedItem.price)
        // calculateTotal()
        setEditOrderModal(true)
        setTimeout(() => {
          inputRef.current?.focus()
          inputRef.current?.select()
        }, 50);
     
      }

      
    }

    const onClose = () => {
      setEditOrderModal(false);
  };
  //#endregion

  // ************************** END HERE ********************

  const AddPosExtended = async (data:any) => {

    try{
      if (isDesktop){
      const response = await axios.post(`${BASE_URL}/api/extended-data/`, 
        {data:data,TableNo:TableNo,
        OrderType:OrderType},
        {withCredentials:true});
        const x ={
          data:data,TableNo:TableNo,
          OrderType:OrderType,action:'Save'
          
        }

        await openExSocket()
        sendExMessage(x)

      if (response.status==200){
        console.log('added successfully')
        // sendData();
      }
    }
    }catch{
      console.error('error');
      
    }

  }

  const UpdatePosExtended = async (data:any) => {

    try{
      if (isDesktop){

      const response = await axios.put(`${BASE_URL}/api/extended-data/`, 
        {data:data,TableNo:TableNo,OrderType:OrderType}
      ,{withCredentials:true});
   
      if (response.status==200){
               const x ={
                    data:data,TableNo:TableNo,
                    OrderType:OrderType,action:'Update'
                    
                  }

        await openExSocket()
        sendExMessage(x)
      }
    }
    }catch(error){
      console.error('error');
      
    }

  }

  // const UpdatePosExtended = async (data:any) => {

  //   try{

  //     const response = await axios.post(`${BASE_URL}/api/extended-data/`, data);

  //     if (response.status==200){
  //       console.log('Updated successfully')
  //     }

  //   }catch{
  //     console.error('error');
      
  //   }

  // }


  const DeletePosExtended = async (deleteData:any) => {

    try{
      if (isDesktop){
      const response = await axios.delete(`${BASE_URL}/api/extended-data/`, {
         data: { deleteData: deleteData },withCredentials:true
        });

      if (response.status==200){
        const x ={
          data:deleteData,TableNo:TableNo,
          OrderType:OrderType,action:'Delete'
          
        }

        await openExSocket()
        sendExMessage(x)
      }
    }
    }catch{
      console.error('error');
      
    }

  }

  const DeletePosExtendedAll = async () => {

    try{
      if (isDesktop){
      const response = await axios.delete(`${BASE_URL}/api/extended-data-terminal/`,{withCredentials:true});

      if (response.status==200){
         const x ={
            action:'Delete'
        }
        await openExSocket()
        sendExMessage(x)
      }
    }
    }catch{
      console.error('error');
      
    }

  }

  // ***************** OTHER COMMAND BUTTON ******************/

  const SusppendEntry = (e:any)=> {
    const { name, value } = e.target;
    setSuspendCustomerData((prevData:any) => ({
      ...prevData,
      [name]: value,
    }));

  }

  const SaveSusppendCustomer = () => {
    setSuspendEntryModal(false)
    SusppendTransaction(SuspendCustomerData)

    setSuspendCustomerData({
      Customer :'',
      CusAddress:'',
    })
  }

  const SusppendTransaction =  async(data:any) => {
    setLoadingPrint(true)
    console.log('Data received from modal:', data);
    // setCustomerOrderInfo(data);
    setCustomerDineInModal(false);

    const CashierID = localStorage.getItem('UserID');
    const TerminalNo = localStorage.getItem('TerminalNo');
    // console.log(dictionary)
   
    try {
      const response = await axios.post(`${BASE_URL}/api/susppend-sales-order/`,
        {data:cartItems,data2:data,TableNo:TableNo,
          CashierID:CashierID,TerminalNo:TerminalNo}
        ,{withCredentials:true});
      if (response.status === 200) {
        DeletePosExtendedAll()
        setCartItems([])
        setTableNo('')
        setOrderType('')
        setOrderTypeModal(true)
        setisSelected(null)
        setLoadingPrint(false)
        setSuspendEntryModal(false)
        setSuspendCustomerData({
          Customer :'',
          CusAddress:'',
        })
        setOtherCommandOpenModal(false)
        showSuccessAlert('Transaction Successfully Suspend')

      }
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with a non-2xx status:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up the request:', error.message);
      }
    }
  }

const ShowCancellTransaction = () => {
  setOrderTypeModal(false)
  setOpenlistOfTransactionModal(true)
  setOtherCommandOpenModal(false)
}

  const CloseCancellTransactionModal = () => {
    setOpenlistOfTransactionModal(false)
    setOtherCommandOpenModal(false)
    setOrderTypeModal(true)
  }

  const SaveCancellTransaction = (data:any) => {
    console.log('data',data)
    setOpenlistOfTransactionModal(false)
    setOrderTypeModal(true)
    setOrderTypeModal(true)

  }

const Lockterminal = () => {
  setOpenLockModal(true)
  setLockUsername(localStorage.getItem('UserName'))

  setTimeout(() => {
    if (LockPasswordRef.current){
      LockPasswordRef.current.focus()
    }
  }, 100);

}

const unLockterminal = async() => {
  try {
    const Username = localStorage.getItem('UserName')

    if (Username === LockUsername && localStorage.getItem('UserRank') === 'Cashier'){
      const response = await axios.get(`${BASE_URL}/api/unlock-terminal/`, {
        params:{
        username : LockUsername,
        password : LockPassword,
        },withCredentials:true
      });
  
      if (response.status === 200) {
        setOpenLockModal(false)
        setOtherCommandOpenModal(false)
        setLockPassword('')
        setLockUsername('')
  
      }
    }else{
      showErrorAlert('Username Is not Registered in This Terminal')
    }

  
  }catch{
      showErrorAlert('Error while Unlocking Terminal')
    }

}

  const CashPullout = () => {
    setcashBreakDownType('CASH PULL OUT')
    setCashBreakDownModal(true)
    setOtherCommandOpenModal(false)
    setOrderTypeModal(false)
  }

  const CloseLogout = () =>{
    setCloseTerminalModal(false)
    setOrderTypeModal(true)
    setisSelected(null)
    setTimeout(() => {
      DineInRef.current?.focus()
    }, 50);
  }

const logoutClick = async () => {
    
      swalWithBootstrapButtons.fire({
          title: 'Confirmation',
          text: "Do you want logout?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          reverseButtons: true
        }).then(async(result) => {
          if (result.isConfirmed) {
              if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
          
              const message = {
                'message': "",
                'TableNO':true,
              };
              chatSocket.send(JSON.stringify(message));}
              try {
                dispatch(setGlobalIsLoading(true))
                const response = await axios.post(`${BASE_URL}/api/logout/`, {
                  
                    UserID:localStorage.getItem("UserID"),
                    TransID : localStorage.getItem("TransID")
                    },{withCredentials:true});
                  if (response.status==200){
                    setCategory([])
                    sendLogoutMessage({ action: "Logout"});
                    closeLogoutSocket();
                    localStorage.clear();
                    dispatch(setGlobalIsLoading(false))
                    dispatch(setGlobalIsLogin(false))
                    
                    // window.location.reload();
                  }
              } catch (error:any) {
                dispatch(setGlobalIsLoading(false))
                Swal.fire({
                  icon:'error',
                  title :'Logout Failed',
                  text:`Error ${error.message}`
                })
                   console.error('Error during logout:', error);
              }
          } 
        })

    };

    const CloseTerminal = () => {
      if (cartItems.length === 0){
        setCloseTerminalModal(true)
        setOtherCommandOpenModal(false)
      }else{
        showErrorAlert('Please Complete the transaction First')
      }

    }

    /// ************************* CASH BREAK DOWN *************************************** //
  
    const EndShiftHandleClick = () => {
        setcashBreakDownType('END SHIFT')
        setCashBreakDownModal(true)
        setCloseTerminalModal(false)
        setOrderTypeModal(false)
        setOtherCommandOpenModal(false)
    }

    const endShitf =  async () => {

      try {
        const response2 = await axios.post(`${BASE_URL}/api/end-shift/`, {
            UserID:localStorage.getItem("UserID"),
            TransID : localStorage.getItem("TransID")}
            ,{withCredentials:true});
          if (response2.status==200){
            setIsPdfModalOpen(true)
            fetchPdFCashCount()
          }
      }catch(error:any){
        showErrorAlert(error.message.data)
      }

    }
    const CloseCashBreakDownModal = () => {
      setCashBreakDownModal(false)
      setOrderTypeModal(true)
      setisSelected(null)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
    }

  const fetchPdFCashCount = async () => {
  try {

    const response = await axios.get(`${BASE_URL}/api/cash-count-pdf/`, {
    responseType: 'arraybuffer',
  });
  const blob = new Blob([response.data], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);

  setPdfPath(url);
  // if (window.electronPDFPrint) {
  //   const buffer = await fetch(url).then(res => res.arrayBuffer());
  //     await window.electronPDFPrint.printPDF(buffer);
  // } else {
  //   const win = window.open(url);
  //   if (win) win.onload = () => win.print();
  // }

} catch (error) {
  console.error("Error fetching PDF:", error);
}

  };

    /// ************************* END *************************************** //

  const CashBreakDownDataList = async (data:any) => {
    try {
      const CashierID = localStorage.getItem('UserID')
      const FullName = localStorage.getItem('FullName')
      const response = await axios.post(`${BASE_URL}/api/cash-breakdown/`,{data:data,TransID:localStorage.getItem('TransID'),Type:cashBreakDownType,
                                                                          CashierID:CashierID,FullName:FullName},{withCredentials:true});
      if (response.status==200){
        setCashBreakDownModal(false)
      if (cashBreakDownType ==='END SHIFT'){
            endShitf();
          }
        // const response1 = await axios.get(`${BASE_URL}/api/company-details/`,{withCredentials:true})

        // if (response1.status==200){
        //   setCashBreakDownModal(false)
        //   // PrintCashBreakDown(data,response1.data.DataInfo)

        //   if (cashBreakDownType ==='END SHIFT'){
        //     endShitf();
        //   }
        // }
      }

    
    
    } catch {
      console.log('error-cash breakdown')
    }

  }
    
  const ChangeOrderType = () => {
      setTableOnprocess('')
      if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
   
      const message = {
        'message': "",
        'TableNO':true,
      };
      chatSocket.send(JSON.stringify(message));
    }
      if (OrderType == 'DINE IN'){
        setOrderType('TAKE OUT')
        setTableNo('')
        setDineIn(false)

      
      }

      if (OrderType == 'TAKE OUT'){
        setOrderType('DINE IN')
        setTableNoModal(true)
        setTimeout(() => {
          TableNoRef.current?.focus();
          TableNoRef.current?.select();
        }, 50);
        setDineIn(true)
      }
    }
    
  const ReprintList = () => {

      setReprintTransactionModal(true)
  
    }


        
  const RefreshModule = async () => {
      DeletePosExtendedAll()
      setTableOnprocess(null)
      setTableNo('')
      setCartItems([])
      setOrderTypeModal(true)
      setOpenVireficationModal(false)
      // window.location.reload();

    }


  const OpenTableNoModal = () => {
      setTableNoModal(true)
      setTimeout(() => {
        TableNoRef.current?.focus();
        TableNoRef.current?.select();
      }, 50);
  }

  const BacktoHome = () => {

    if (cartItems.length === 0){
      setOrderTypeModal(true)
      setisSelected(null)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      setDiscountData('')
      setCartItems('')
      setTableNo('')
      DeletePosExtendedAll()
      setTableOnprocess('')
      if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
        const message = {
          'message': 0,
          'TableNO':false,
        };
        chatSocket.send(JSON.stringify(message));
      }
    }

  }

  const handleDineIn = () => {
      setOrderTypeModal(false)
      setOrderType('DINE IN')
      setTableNoModal(true);
      setTimeout(() => {
        TableNoRef.current?.focus();
        TableNoRef.current?.select();
      }, 50);
      setDineIn(true)
    };
  
  const handleTakeOut = () => {
      setTableNo('')
      setQueNo('')
      setOrderTypeModal(false)
      setOrderType('TAKE OUT')
      setDineIn(false)
      setisSelected(0)
    };

  const CloseTableNo = () => {

      if (cartItems.length > 0){

        setOrderType('TAKE OUT')
        setTableNoModal(false);
      }else{
        setOrderTypeModal(true)
        setisSelected(null)
        setOrderType('')
        setTableNoModal(false);
  
        setTimeout(() => {
          DineInRef.current?.focus()
        }, 50);
      }

    }

  const OtherCommand = () => {
      setOtherCommandOpenModal(true)
    }


  const PaymentClickControlS = () => {
    
      
      setPaymentOpenModal(true)
      setTimeout(() => {
        if (CashPaymentRef.current){
          CashPaymentRef.current?.focus();
          CashPaymentRef.current.style.backgroundColor = 'blue';
          setisFocus(0)
        }
      }, 50);
  }

   const PaymentClick = () => {
    if (parseFloat(formattedTotalDue )!== 0){
      setPaymentOpenModal(true)


      setTimeout(() => {
        if (CashPaymentRef.current){
          CashPaymentRef.current?.focus();
          CashPaymentRef.current.style.backgroundColor = 'blue';
          setisFocus(0)
        }
      }, 50);
    }

   }

   /// **************** SAVE ORDER **************** //
   const SaveOrderClick = () => {


    setTypeAndTable({ ordertTYpe: OrderType, tableNo: TableNo});
    if (parseFloat(formattedTotalDue )!== 0){
      setCustomerDineInModal(true)
    }
   }

   const CloseCustomerDineInModal = () => {
    setCustomerDineInModal(false)
    setisSelected(0)
   }

   useEffect(() => {
    // console.log('CustomerName:', CustomerName);
    setCustomer(CustomerName)
  }, [CustomerName]);



   const CutomerInfoEntry = async (dataFromModal:any) => {
    // Handle the data received from the modal
    setLoadingPrint(true)
    console.log('Data received from modal:', dataFromModal);
    setCustomerOrderInfo(dataFromModal);
    setCustomerDineInModal(false);
  
    const CashierID = localStorage.getItem('UserID');
    const TerminalNo = localStorage.getItem('TerminalNo');
    // console.log(dictionary)
   
    try {
      const response = await axios.post(`${BASE_URL}/api/add-sales-order/`,
        {data:cartItems,data2:dataFromModal,TableNo:TableNo,CashierID:CashierID,
          TerminalNo:TerminalNo,OrderType:OrderType},{withCredentials:true});
      if (response.status === 200) {
      
        setLoadingPrint(false)
          if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
          const message = {
            'message': "",
            'TableNO':true,
          };
          chatSocket.send(JSON.stringify(message));
        }
        
        if (dataFromModal.PaymentType === 'Sales Order'){
        setSOCustomer(dataFromModal)
        fetchPdfSalesorderData()
        setIsPdfModalOpen(true)
        DeletePosExtendedAll()
        // printReceipt(dataFromModal,response.data.SOdata);
        setCustomerOrderInfo([])
        setTableNo('')
        setOrderType('')
        setCartItems([])
        setOrderTypeModal(true)
   
      } else {
        // Handle other response statuses if needed
        setSOCustomer(dataFromModal)
        printReceipt(dataFromModal,response.data.SOdata);
        setDineIn(false)
        setPaymentDiscountOpenModal(true)
        setCustomerOrderInfo([])
      }
    } 
  }catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Server responded with a non-2xx status:', error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
      } else {
        // Something else happened while setting up the request
        console.error('Error setting up the request:', error.message);
      }
    }

  };


  //************ CASH PAYMENT ENTRY*************** */
  const CashPayment = () => {
    setPaymentOpenModal(false)
    setCashPaymentEntryModal(true)
    setPaymentType('CASH')
    setisItemDis(false)

  }

  const SaveCashPayment = async (data: { amounttendered: React.SetStateAction<number>; change: React.SetStateAction<number>; }) => {
    setCashPaymentEntryModal(false)
    setAmountTendered(data.amounttendered);
    setChangeAmount(data.change);
    setCustomeryPaymentModal(true)

  };





  /////************** CloseReprintTransactionModal ****************** */
  const CloseReprintTransactionModal = () => {
  setReprintTransactionModal(false)
  }


  const ReprintTransactionReceipt = async (data: { DocNO: any; DocType: any; }) => {

    console.log('asdasd',data)
    setReprintTransactionModal(false)

    try {

      const response = await axios.get(`${BASE_URL}/api/reprint-transacion-receipt/`,{
        params : {
          DocNo :data.DocNO,
          DocType:data.DocType,
        },withCredentials:true})
      if (response.status==200) {

        setCartItems(response.data.Data)
        localStorage.setItem('cartData', JSON.stringify(response.data.Data));
        localStorage.setItem('DataInfo', JSON.stringify(response.data.DataInfo));
        setRefreshCart(prevState => !prevState);
      }
      
    } catch (error) {
      console.log('Error while Generating Reprint',error)
      
    }
  }



  ///PAYMENT ALL********************
  ///********************THIS SAVE THE DATA FOR CASH PAYMENT*****************************/
  const CutomerInfoEntryPaymnet = async (data: any) =>{
  setCustomeryPaymentModal(false)
  setLoadingPrint(true)
  let customer:any = ''
  if (OrderType === 'TAKE OUT'){
    customer= ''
  }else{
  customer = CustomerOrderInfo
  }

    let AmountTenderedMultiple :any = 0
    const CashierID = localStorage.getItem('UserID');
    const CashierName = localStorage.getItem('FullName');
    const TerminalNo = localStorage.getItem('TerminalNo');
    let Discounted_by:any = ''
    
    if (localStorage.getItem('Discounted_by')){
      Discounted_by = localStorage.getItem('Discounted_by')
    }

    let doc_type:string = 'POS SI'
    if (PaymentType === 'CASH') {
      doc_type = 'POS SI'
    }else  if (PaymentType === 'CREDIT CARD') {
      doc_type = 'POS SI'
    }else  if (PaymentType === 'DEBIT CARD') {
      doc_type = 'POS SI'
    }else  if (PaymentType === 'CHARGE') {
      doc_type = 'POS CI'
      let Charge:any = ''
      const ChargeArrayString = localStorage.getItem('Charge');
      if (ChargeArrayString) {
        try {
          // Parse the JSON string to convert it back to an array
          Charge = JSON.parse(ChargeArrayString);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else {
        console.error("No data found in localStorage for 'Charge'");
      }
    }else  if (PaymentType === 'MULTIPLE') {
      doc_type = 'POS SI'
  
        let CreditCard:any = ''
        const creditCardArrayString = localStorage.getItem('CreditCardPayment');
        if (creditCardArrayString) {
          try {
            // Parse the JSON string to convert it back to an array
            CreditCard = JSON.parse(creditCardArrayString);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error("No data found in localStorage for 'CreditCardPayment'");
        }
    
        let DebitCard:any = ''
        const DebitCardArrayString = localStorage.getItem('DebitCardPayment');
        if (DebitCardArrayString) {
          try {
            // Parse the JSON string to convert it back to an array
            DebitCard = JSON.parse(DebitCardArrayString);
          } catch (error) {
            console.error("Error parsing JSON:", error);
          }
        } else {
          console.error("No data found in localStorage for 'DebitCardPayment'");
        }


           let GiftCheck:any = ''
            const GiftCheckArrayString = localStorage.getItem('GiftCheckPayment');
            if (GiftCheckArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
               GiftCheck = JSON.parse(GiftCheckArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'GiftCheckPayment'");
            }


             let Online:any = ''
            const OnlineArrayString = localStorage.getItem('OnlinePayment');
            if (OnlineArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                 Online = JSON.parse(OnlineArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'Online Payment'");
            }


             let Other:any = ''
            const OtherArrayString = localStorage.getItem('OtherPayment');
            if (OtherArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
               Other = JSON.parse(OtherArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'Online Payment'");
            }

    
        let CashAmount:any = 0
        
        CashAmount = localStorage.getItem('CashAmount') || 0;
        if (CashAmount === 'null'){
          CashAmount = 0
        }
    
        let totalDebitcard:any = 0
        if (DebitCard){
          DebitCard.DebitCardPaymentList.map((items:any) => {
            totalDebitcard = parseFloat(items.AmountDue) + parseFloat(totalDebitcard)
          })
        }

    
        let totalCreditcard:any = 0
        if (CreditCard) {
          CreditCard.CreditCardPaymentList.map((items:any) => {
            totalCreditcard = parseFloat(items.AmountDue) + parseFloat(totalCreditcard)
          })
    
        }

         let totalGiftCheck:any = 0
        if (GiftCheck) {
          GiftCheck.GiftCheckPaymentList.map((items:any) => {
            totalGiftCheck = parseFloat(items.amount) + parseFloat(totalGiftCheck)
          })
    
        }

        let totalOnline:any = 0
        if (Online){
          const onlineList = [Online.OnlinekPaymentList]
          onlineList.map((items:any) => {
            totalOnline = parseFloat(items.total_amount) + parseFloat(totalOnline)
          })
    
        }

         let totalOther:any = 0
        if (Other){
          Other.OtherPaymentList.map((items:any) => {
            totalOther = parseFloat(items.total_amount) + parseFloat(totalOther)
          })
    
        }

        const total:any = parseFloat(CashAmount) + 
        parseFloat(totalCreditcard) + 
        parseFloat(totalDebitcard)  + 
        parseFloat(totalGiftCheck) +
        parseFloat(totalOnline) + 
        parseFloat(totalOther)
        
        AmountTenderedMultiple=total
    }

      try {
        console.log('AmountTenderedMultiple',AmountTenderedMultiple)
        const response = await axios.post(`${BASE_URL}/api/save-sales-order-payment/`,{data:cartItems,AmountTendered: PaymentType === 'MULTIPLE' ? AmountTenderedMultiple :AmountTendered,
                                                                                      TableNo:TableNo,CashierID:CashierID,
                                                                                      TerminalNo:TerminalNo,DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo,doctype:doc_type,
                                                                                      customer:customer},{withCredentials:true});
        if (response.status === 200) {
/// CASH PAYMENT
          if (PaymentType === 'CASH') {
            const response1 = await axios.post(`${BASE_URL}/api/save-cash-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,
                                                                                      TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,customer:customer,
                                                                                      AmountDue:formattedTotalDue,CashierName:CashierName,OrderType:OrderType,
                                                                                      DiscountData:DiscountData,DiscountType:DiscountType,DiscountDataList:DiscountDataList,QueNo:QueNo,doctype:doc_type,
                                                                                      Discounted_by:Discounted_by},{withCredentials:true});
            if (response1.status === 200) {
              setLoadingPrint(false)
              //  PrintCashPaymentReceipt(response1.data);
              localStorage.removeItem('Discounted_by')
              setDiscountDataLits('')
              setDiscountData('')
              setCartItems([])
              fetchPdfReceiptData(response1.data.data.OR)
              DeletePosExtendedAll()
              setIsPdfModalOpen(true)
              setTableNo('')
              setDiscountData('')
              setDiscountType('')
              setOrderTypeModal(true)
              setisSelected(null)
            } else {
              // Handle other response statuses if needed
              console.log('Request failed with status:', response.status);
            }
    
          } 
/// CREDIT CARD PAYMENT
          if (PaymentType === 'CREDIT CARD') {
            let CreditCard:any = ''
            const creditCardArrayString = localStorage.getItem('CreditCardPayment');
            if (creditCardArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                CreditCard = JSON.parse(creditCardArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'CreditCardPayment'");
            }



            // const CreditCardJson = JSON.parse(CreditCard);
            // console.log(CreditCardJson);
            const response1 = await axios.post(`${BASE_URL}/api/save-credit-card-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,customer:customer,
                                                                                          TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName
                                                                                          ,DiscountDataList:DiscountDataList,OrderType:OrderType,CreditCard:CreditCard,doctype:doc_type, 
                                                                                          DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo,
                                                                                          Discounted_by:Discounted_by},{withCredentials:true});
            if (response1.status === 200) {
              localStorage.removeItem('CreditCardPayment')
              setLoadingPrint(false)

              // PrintCreditCardPaymentReceipt(response1.data);
              setDiscountDataLits('')
              setDiscountData('')
              setCartItems([])
              fetchPdfReceiptData(response1.data.data.OR)
              DeletePosExtendedAll()
              setIsPdfModalOpen(true)
              setTableNo('')
              setDiscountData('')
              setDiscountType('')
              setOrderTypeModal(true)
              setisSelected(null)
              setTableColPerRows('')
              if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':'',
              };
              chatSocket.send(JSON.stringify(message));
            }
            } else {
              // Handle other response statuses if needed
              console.log('Request failed with status:', response.status);
            }
    
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }
/// DEBIT CARD PAYMENT
          
          if (PaymentType === 'DEBIT CARD') {
        
            let DebitCard:any = ''
            const DebitCardArrayString = localStorage.getItem('DebitCardPayment');
            if (DebitCardArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                DebitCard = JSON.parse(DebitCardArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'DebitCardPayment'");
            }




            const response1 = await axios.post(`${BASE_URL}/api/save-debit-card-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,customer:customer,
                                                                                          TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName
                                                                                          ,DiscountDataList:DiscountDataList,OrderType:OrderType,DebitCard:DebitCard,doctype:doc_type,
                                                                                          DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo,
                                                                                          Discounted_by:Discounted_by},{withCredentials:true});
            if (response1.status === 200) {
              localStorage.removeItem('DebitCardPayment')
              setLoadingPrint(false)
    
              // PrintCreditCardPaymentReceipt(response1.data);
              setDiscountDataLits('')
              setDiscountData('')
              setCartItems([])
              fetchPdfReceiptData(response1.data.data.OR)
              DeletePosExtendedAll()
              setIsPdfModalOpen(true)
              setTableNo('')
              setDiscountData('')
              setDiscountType('')
              setOrderTypeModal(true)
              setisSelected(null)
              setTableColPerRows('')
              if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':'',
              };
              chatSocket.send(JSON.stringify(message));
            }
            } else {
              // Handle other response statuses if needed
              console.log('Request failed with status:', response.status);
            }
    
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }
/// CHARGE
          
          if (PaymentType === 'CHARGE') {


            let Charge:any = ''
            const ChargeArrayString = localStorage.getItem('Charge');
            console.log('ChargeArrayString',ChargeArrayString)
            if (ChargeArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                Charge = JSON.parse(ChargeArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'Charge'");
            }

            const response1 = await axios.post(`${BASE_URL}/api/save-charge-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,customer:customer,
                                                                                          TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName
                                                                                          ,DiscountDataList:DiscountDataList,OrderType:OrderType,Charge:Charge,doctype:doc_type,
                                                                                          DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo,
                                                                                          Discounted_by:Discounted_by},{withCredentials:true});
            if (response1.status === 200) {


              setLoadingPrint(false)
              // PrintChargePaymentReceipt(response1.data);
              setDiscountDataLits('')
              setDiscountData('')
              setCartItems([])
              fetchPdfReceiptData(response1.data.data.OR)
              DeletePosExtendedAll()
              setIsPdfModalOpen(true)
              setTableNo('')
              setDiscountData('')
              setDiscountType('')
              setOrderTypeModal(true)
              setisSelected(null)
              localStorage.removeItem('Charge')
              setTableColPerRows('')
              if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':'',
              };
              chatSocket.send(JSON.stringify(message));
            }
            } else {
              // Handle other response statuses if needed
              console.log('Request failed with status:', response.status);
            }
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }

/// MULTIPLE
          
          if (PaymentType === 'MULTIPLE') {

            let CreditCard:any = ''
            const creditCardArrayString = localStorage.getItem('CreditCardPayment');
            if (creditCardArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                CreditCard = JSON.parse(creditCardArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'CreditCardPayment'");
            }

            let DebitCard:any = ''
            const DebitCardArrayString = localStorage.getItem('DebitCardPayment');
            if (DebitCardArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                DebitCard = JSON.parse(DebitCardArrayString);
                console.log(DebitCard);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'DebitCardPayment'");
            }

            let CashAmount:any = 0

            CashAmount = localStorage.getItem('CashAmount') || 0;
            if (CashAmount === 'null'){
                    CashAmount = 0
                  }


             let GiftCheck:any = ''
            const GiftCheckArrayString = localStorage.getItem('GiftCheckPayment');
            if (GiftCheckArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
               GiftCheck = JSON.parse(GiftCheckArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'GiftCheckPayment'");
            }


             let Online:any = ''
            const OnlineArrayString = localStorage.getItem('OnlinePayment');
            if (OnlineArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                 Online = JSON.parse(OnlineArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'Online Payment'");
            }


             let Other:any = ''
            const OtherArrayString = localStorage.getItem('OtherPayment');
            if (OtherArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
               Other = JSON.parse(OtherArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'Online Payment'");
            }




            const response1 = await axios.post(`${BASE_URL}/api/save-multiple-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,customer:customer,
                                                                                      TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName,OrderType:OrderType,
                                                                                      DiscountDataList:DiscountDataList,CreditCard:CreditCard,DebitCard:DebitCard,CashAmount:CashAmount,doctype:doc_type,
                                                                                      GiftCheck:GiftCheck,Online:Online,Other:Other,
                                                                                      DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo,
                                                                                      Discounted_by:Discounted_by},{withCredentials:true});
            if (response1.status === 200) {

              // PrintCreditCardPaymentReceipt(response1.data);
              localStorage.removeItem('CreditCardPayment')
              localStorage.removeItem('DebitCardPayment')
              localStorage.removeItem('GiftCheckPayment')
              localStorage.removeItem('OtherPayment')
              localStorage.removeItem('OnlinePayment')
              localStorage.removeItem('CashAmount')
              setDiscountDataLits('')
              setDiscountData('')
              setLoadingPrint(false)
              setCartItems([])
              fetchPdfReceiptData(response1.data.data.OR)
              DeletePosExtendedAll()
              setIsPdfModalOpen(true)
              setTableNo('')
              setDiscountData('')
              setDiscountType('')
              setOrderTypeModal(true)
              setisSelected(null)
              setTableColPerRows('')
              if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':'',
              };
              chatSocket.send(JSON.stringify(message));
            }
            } else {
              // Handle other response statuses if needed
              console.log('Request failed with status:', response.status);
            }
    
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }

          if (PaymentType === 'GIFT CHECK') {
            let GiftCheck:any = ''
            const GiftCheckArrayString = localStorage.getItem('GiftCheckPayment');
            if (GiftCheckArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                 GiftCheck  =JSON.parse(GiftCheckArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'GiftCheckPayment'");
            }

            const response1 = await axios.post(`${BASE_URL}/api/save-gift-check-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,customer:customer,
                                                                                          TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName
                                                                                          ,DiscountDataList:DiscountDataList,OrderType:OrderType,GiftCheck:GiftCheck,doctype:doc_type, 
                                                                                          DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo,
                                                                                          Discounted_by:Discounted_by},{withCredentials:true});
            if (response1.status === 200) {
              localStorage.removeItem('GiftCheckPayment')
              setLoadingPrint(false)

              // PrintCreditCardPaymentReceipt(response1.data);
              setDiscountDataLits('')
              setDiscountData('')
              setCartItems([])
              fetchPdfReceiptData(response1.data.data.OR)
              DeletePosExtendedAll()
              setIsPdfModalOpen(true)
              setTableNo('')
              setDiscountData('')
              setDiscountType('')
              setOrderTypeModal(true)
              setisSelected(null)
              setTableColPerRows('')
              if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':'',
              };
              chatSocket.send(JSON.stringify(message));
            }
            } else {
              // Handle other response statuses if needed
              console.log('Request failed with status:', response.status);
            }
    
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }


            if (PaymentType === 'ONLINE') {
            let Online:any = ''
            const OnlineArrayString = localStorage.getItem('OnlinePayment');
            if (OnlineArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                 Online = JSON.parse(OnlineArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'OnlinePayment'");
            }

            const response1 = await axios.post(`${BASE_URL}/api/save-online-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,customer:customer,
                                                                                          TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName
                                                                                          ,DiscountDataList:DiscountDataList,OrderType:OrderType,Online:Online,doctype:doc_type, 
                                                                                          DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo,
                                                                                          Discounted_by:Discounted_by},{withCredentials:true});
            if (response1.status === 200) {
              localStorage.removeItem('OnlinePayment')
              setLoadingPrint(false)

              // PrintCreditCardPaymentReceipt(response1.data);
              setDiscountDataLits('')
              setDiscountData('')
              setCartItems([])
              fetchPdfReceiptData(response1.data.data.OR)
              DeletePosExtendedAll()
              setIsPdfModalOpen(true)
              setTableNo('')
              setDiscountData('')
              setDiscountType('')
              setOrderTypeModal(true)
              setisSelected(null)
              setTableColPerRows('')
              if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':'',
              };
              chatSocket.send(JSON.stringify(message));
            }
            } else {
              // Handle other response statuses if needed
              console.log('Request failed with status:', response.status);
            }
    
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }

          if (PaymentType === 'OTHER') {
            let Other:any = ''
            const OtherArrayString = localStorage.getItem('OtherPayment');
            if (OtherArrayString) {
              try {
                // Parse the JSON string to convert it back to an array
                 Other = JSON.parse(OtherArrayString);
              } catch (error) {
                console.error("Error parsing JSON:", error);
              }
            } else {
              console.error("No data found in localStorage for 'OtherPayment'");
            }

            const response1 = await axios.post(`${BASE_URL}/api/save-other-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,customer:customer,
                                                                                          TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName
                                                                                          ,DiscountDataList:DiscountDataList,OrderType:OrderType,Other:Other,doctype:doc_type, 
                                                                                          DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo,
                                                                                          Discounted_by:Discounted_by},{withCredentials:true});
            if (response1.status === 200) {
              localStorage.removeItem('OtherPayment')
              setLoadingPrint(false)

              // PrintCreditCardPaymentReceipt(response1.data);
              setDiscountDataLits('')
              setDiscountData('')
              setCartItems([])
              fetchPdfReceiptData(response1.data.data.OR)
              DeletePosExtendedAll()
              setIsPdfModalOpen(true)
              setTableNo('')
              setDiscountData('')
              setDiscountType('')
              setOrderTypeModal(true)
              setisSelected(null)
              setTableColPerRows('')
              if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':'',
              };
              chatSocket.send(JSON.stringify(message));
            }
            } else {
              // Handle other response statuses if needed
              console.log('Request failed with status:', response.status);
            }
    
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }

          }


        
    } catch (error :any) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Server responded with a non-2xx status:', error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something else happened while setting up the request
            console.error('Error setting up the request:', error.message);
        } }

    

  //   try {
  //     const response = await axios.post(`${BASE_URL}/api/save-cash-payment/`,{data:cartItems,AmountTendered:AmountTendered,CustomerPaymentData:data,
  //       TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName});
  //     if (response.status === 200) {

  //       PrintCashPaymentReceipt(response.data);
  //     } else {
  //       // Handle other response statuses if needed
  //       console.log('Request failed with status:', response.status);
  //     }
  // } catch (error) {
  //     if (error.response) {
  //         // The request was made and the server responded with a status code
  //         console.error('Server responded with a non-2xx status:', error.response.data);
  //     } else if (error.request) {
  //         // The request was made but no response was received
  //         console.error('No response received:', error.request);
  //     } else {
  //         // Something else happened while setting up the request
  //         console.error('Error setting up the request:', error.message);
  //     }
  // }



  }


  const CloseCustomerPaymentModal = async () => {

    swalWithBootstrapButtons.fire({
      title: 'Confirmation',
      text: "Do you want Abort this Transaction?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        if (OrderType ==='TAKE OUT'){
          setCustomeryPaymentModal(false)
        }else{
          setCustomeryPaymentModal(false)
          setDiscountData('')
          setCartItems('')
          setTableNo('')
          setOrderTypeModal(true)
          setisSelected(null)
          DeletePosExtendedAll()
          setTimeout(() => {
            DineInRef.current?.focus()
          }, 50);
        }
        // setCustomeryPaymentModal(false)
        // setOrderTypeModal(true)
        // setTimeout(() => {
        //   DineInRef.current?.focus()
        // }, 50);
        // setDiscountData('')
        // setCartItems('')
        // setTableNo('')
        // DeletePosExtendedAll()
      }})





  }

  const CloseModal = async () => {
    if (PaymentOpenModal) {

      swalWithBootstrapButtons.fire({
        title: 'Confirmation',
        text: "Do you want Abort Payment Transaction?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          if (OrderType ==='TAKE OUT'){
            setPaymentOpenModal(false);
          }else{
            setPaymentOpenModal(false);
            setDiscountData('')
            setCartItems('')
            setTableNo('')
            setOrderTypeModal(true)
            setisSelected(null)
            DeletePosExtendedAll()
             setTableOnprocess('')
           if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
              const message = {
                'message': "",
                'TableNO':true,
              };
              chatSocket.send(JSON.stringify(message));
            }
            setTimeout(() => {
              DineInRef.current?.focus()
            }, 50);
          }

        }})
    

    }

    if (OtherCommandOpenModal) {
      setOtherCommandOpenModal(false);
    }

    if (SelectTypeOfTransaction) {
      setSelectTypeOfTransaction(false);

      //// to refress selected table ///
      if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
        const message = {
          'message': 0,
          'TableNO':false,
        };
        chatSocket.send(JSON.stringify(message));
      }

    }

  }



  ///************ SELECT TYPE OF TRANSACTION*************** */
  const CloseSalesOrderListOpenModal = () => {

    setSalesOrderListOpenModal(false)
    setTableNoModal(true)
    setTableNo('')
    DeletePosExtendedAll()
    setTableOnprocess(null)
    setTimeout(() => {
      TableNoRef.current?.focus();
      TableNoRef.current?.select();
    }, 50);
  };

  const settlebillData = async (data:any) => {
    // Implement your logic here for settlebillData
    console.log('Settle bill data:', data.DiscountData);
    setSalesOrderListOpenModal(false)
    setTableNoModal(false)
    setDineIn(false)
    setTableNo(data.tableno)
    setPaymentOpenModal(true)
    const DiscountType:string = data.DiscountType




    if (DiscountType === 'SC'){
      
    setDiscountData(data.DiscountData.SeniorDiscountData)
    setDiscountType(data.DiscountType)
    setDiscountDataLits(data.DiscountData.SeniorNameList)
    }else if (DiscountType === 'ITEM'){
      setDiscountData(data.DiscountData)
      setDiscountType(data.DiscountType)
    }else if (DiscountType === 'TRANSACTION'){
      setDiscountData(data.DiscountData)
      setDiscountType(data.DiscountType)
    }

    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);


    try {
      const response = await axios.get(`${BASE_URL}/api/sales-order-listing/`, {
          params: {
            tableno: data.tableno,
            queno:QueNo,
          },withCredentials:true
      });

    console.log(response.data)
    setCartItems1(response.data)
    setCartItems(response.data)
    
  } catch (error) {
      console.error('Error fetching sales-order-listing:', error);
  }};

  ////***************** END ****************/


  ///************ CHARGE TO ROOM, CUSTOMER AND EVENT TRANSACTION*************** */


  const OpenChargeModal = () => {

  setPaymentOpenModal(false)
  setChargeToModal(true)
  localStorage.removeItem('MULTIPLE') 
  setPaymentType('CHARGE')
  }

  const CloseChargeModal = () => {
    setChargeToModal(false)
    setPaymentOpenModal(true)
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }

  const Chargedata = async (data:any) => {
  console.log('charge data',data)
  localStorage.setItem('Charge',JSON.stringify(data))
  setChargeToModal(false)
  setCustomeryPaymentModal(true)

  };
  // setPaymentOpenModal(true)





  //// ************************** CREDIT CARD PAYMENT TYPE TRANSACTION ******************

  const OpenCreditCardPayment = () => {
    setCreditCardPaymentModal(true)
    setPaymentOpenModal(false)
    setPaymentType('CREDIT CARD')
    localStorage.removeItem('MULTIPLE') 
  }

  const CloseCreditCardPayment = () => {
    setCreditCardPaymentModal(false)
    setPaymentOpenModal(true)
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }

  const CreditCardPaymentOk = (data:any) => {

    localStorage.setItem('CreditCardPayment',JSON.stringify(data))
    setCreditCardPaymentModal(false)
    setCreditCardPaymentEntryModal(true)

  }

  const CloseCreditCardPaymentEntryModal = async() => {
    setCreditCardPaymentEntryModal(false)
    setPaymentOpenModal(true)
   await ClosepaymentTransaction()
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }



  const SaveCreditCardPayment = async (data: { amounttendered: number; change:number; }) => {
    setCreditCardPaymentEntryModal(false)
    setAmountTendered(data.amounttendered);
    setChangeAmount(0);
    setCustomeryPaymentModal(true)
  };



  //// ************************** DEBIT CARD PAYMENT TYPE TRANSACTION ******************

  const OpenDebitCardPayment = () => {
    dispatch(setGlobalModal(true))
    setDebitCardPaymentModal(true)
    setPaymentOpenModal(false)
    setPaymentType('DEBIT CARD')
    localStorage.removeItem('MULTIPLE') 
  }

  const DebitCardPaymentOK =(data:any) => {
     dispatch(setGlobalModal(false))
    localStorage.setItem('DebitCardPayment',JSON.stringify(data))
    setDebitCardPaymentModal(false)
    setDebitCardPaymentEntryModal(true)

  }

  const CloseDebitCardPayment = async () => {
     dispatch(setGlobalModal(false))
    setDebitCardPaymentModal(false)
    setPaymentOpenModal(true)
      await ClosepaymentTransaction()
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }

  const SaveDebitCardPayment = async (data: { amounttendered: number; change:number; }) => {
    setDebitCardPaymentEntryModal(false)
    setAmountTendered(data.amounttendered);
    setChangeAmount(0);
    setCustomeryPaymentModal(true)
  };


  const CloseDebitCardPaymentEntryModal = () => {
    setDebitCardPaymentEntryModal(false)
    setPaymentOpenModal(true)
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }

//////******************************** END HERE **********************************/////



//////******************************** MULTIPLE PAYMENT **********************************/////

  const OpenMultiplePayment = () => {
    dispatch(setGlobalModal(true))
    setMultiplePamentEntryModal(true)
    setPaymentOpenModal(false)
    setPaymentType('MULTIPLE')
  }

  const CloseMultiplePayment = async() => {
 dispatch(setGlobalModal(false))
    setMultiplePamentEntryModal(false)
    setPaymentOpenModal(true)
    await ClosepaymentTransaction()
    localStorage.removeItem('CreditCardPayment')
    localStorage.removeItem('DebitCardPayment')
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }

  const SaveMultiplePayments = (data:any) => {
     dispatch(setGlobalModal(false))
    localStorage.setItem('CashAmount',data.CashAmount)
    setMultiplePamentEntryModal(false)
    setCustomeryPaymentModal(true)
  }



//////******************************** END HERE **********************************/////




  //// ************************** GIFT CHECK PAYMENT TYPE TRANSACTION ******************

  const OpenGiftCheckPayment = () => {
    setGiftCheckPaymentModal(true)
    setPaymentOpenModal(false)
    setPaymentType('GIFT CHECK')
    localStorage.removeItem('MULTIPLE') 
     dispatch(setGlobalModal(true))
  }

  const CloseGiftCheckPayment = () => {
     dispatch(setGlobalModal(false))
    setGiftCheckPaymentModal(false)
    setPaymentOpenModal(true)
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }

  const GiftCheckPaymentOk = (data:any) => {
    console.log(data)
    localStorage.setItem('GiftCheckPayment',JSON.stringify(data))
    setGiftCheckPaymentModal(false)
    setGiftCheckPaymentEntryModal(true)
    dispatch(setGlobalModal(false))

  }

  const CloseGiftCheckPaymentEntryModal = async() => {
    setGiftCheckPaymentEntryModal(false)
    setPaymentOpenModal(true)
   await ClosepaymentTransaction()
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }



  const SaveGiftCheckPayment = async (data: { amounttendered: number; change:number; }) => {
    setGiftCheckPaymentEntryModal(false)
    setAmountTendered(data.amounttendered);
    setChangeAmount(0);
    setCustomeryPaymentModal(true)
  };
//////******************************** END HERE **********************************/////



  //// ************************** ONLINE PAYMENT TYPE TRANSACTION ******************

  const OpenOnlinePayment = () => {
    setOnlinePaymentModal(true)
    setPaymentOpenModal(false)
    setPaymentType('ONLINE')
    localStorage.removeItem('MULTIPLE') 
     dispatch(setGlobalModal(true))
  }

  const CloseOnlinePayment = () => {
     dispatch(setGlobalModal(false))
    setOnlinePaymentModal(false)
    setPaymentOpenModal(true)
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }

  const OnlinePaymentOk = (data:any) => {
    dispatch(setGlobalModal(false))
    localStorage.setItem('OnlinePayment',JSON.stringify(data))
    setOnlinePaymentModal(false)
    setOnlinePaymentEntryModal(true)

  }

  const CloseOnlinePaymentEntryModal = async() => {
    setOnlinePaymentEntryModal(false)
    setPaymentOpenModal(true)
   await ClosepaymentTransaction()
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }



  const SaveOnlinePayment = async (data: { amounttendered: number; change:number; }) => {
    setOnlinePaymentEntryModal(false)
    setAmountTendered(data.amounttendered);
    setChangeAmount(0);
    setCustomeryPaymentModal(true)
  };
//////******************************** END HERE **********************************/////




  //// ************************** OTHER PAYMENT TYPE TRANSACTION ******************

  const OpenOtherPayment = () => {
     dispatch(setGlobalModal(true))
    setOtherPaymentModal(true)
    setPaymentOpenModal(false)
    setPaymentType('OTHER')
    localStorage.removeItem('MULTIPLE') 
  }

  const CloseOtherPayment = () => {
     dispatch(setGlobalModal(false))
    setOtherPaymentModal(false)
    setPaymentOpenModal(true)
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }

  const OtherPaymentOk = (data:any) => {
 dispatch(setGlobalModal(false))
    localStorage.setItem('OtherPayment',JSON.stringify(data))
    setOtherPaymentModal(false)
    setOtherPaymentEntryModal(true)

  }

  const CloseOtherPaymentEntryModal = async() => {
    setOtherPaymentEntryModal(false)
    setPaymentOpenModal(true)
   await ClosepaymentTransaction()
    setTimeout(() => {
      if (CashPaymentRef.current){
        CashPaymentRef.current?.focus();
        CashPaymentRef.current.style.backgroundColor = 'blue';
        setisFocus(0)

      }

    }, 50);
  }


  const SaveOtherPayment = async (data: { amounttendered: number; change:number; }) => {
    setOtherPaymentEntryModal(false)
    setAmountTendered(data.amounttendered);
    setChangeAmount(0);
    setCustomeryPaymentModal(true)
  };
//////******************************** END HERE **********************************/////




//////******************************** select Transaction Type When Selecting Table **********************************/////


  const AddOrdertable = () => 
  {
    setisSelected(0)
    setOrderType('ADD ORDER')
    setSelectTypeOfTransaction(false)
    setTableNoModal(false)
    setOrderTypeModal(false)
  };

  const SettleOrdertable = () => 
  {

    setSelectTypeOfTransaction(false);
    setTableNoModal(false);
    setSalesOrderListOpenModal(true);
    setOrderType('DINE IN')
  };

  const TransferOrdertable = () => {
    setisTransfertable(true)
      setSelectTypeOfTransaction(false)

      showInfoAlert('Select new table to transfer to')
    };


  const Cleartable =  () => {
    swalWithBootstrapButtons.fire({
      title: 'Confirmation',
      text: `Do you want to clear table no ${TableOnprocess}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then(async(result) => {
      if (result.isConfirmed) {

        try{

          const response = await axios.post(`${BASE_URL}/api/cleared-table/`,
            {TableNo:TableOnprocess},{withCredentials:true})
          if (response.status == 200){
            showSuccessAlert(`Table no ${TableOnprocess} successfully cleared`)
            setTableOnprocess(null)
            setTableNo('')
            setDineInOrderAndPay(false)
          }

        }catch{
          showErrorAlert(`Error while Clearing table no ${TableOnprocess}`)
        }
  
        setSelectTypeOfTransaction(false)

      }})

    };
  


  const TransfertableSave = async(from:any,to:any) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/transfer-table/`,{
        TableFrom:from,
        TableTo:to
      },{withCredentials:true})
      if (response.status==200){
        showSuccessAlert('Table Successfully Transfer')
      }

    }catch{
      showErrorAlert(' Error while transfering Table')
    }

  }
   

  const GetSusppendData = async (data:any) => {
  try {
  const response = await axios.get(`${BASE_URL}/api/susppend-sales-order/`,{
    params:{
      TableNo:data,
    },withCredentials:true
  })
  if (response.status ==200){
    setCartItems(response.data.listing)
    setTableOnprocess(data)
    setTableNo(data)
  }
  }catch{
    showErrorAlert(`Error While Fetching Susppend Transaction in Table ${data}`)
  }
  }

  const SelectTable = (index:any) => {

    if (index.Susppend === 'YES'){
    GetSusppendData(index.table_count)
    setTableNoModal(false)
  }else{
      if (isTransfertable) {
        if (index.Paid === 'N'){
          swalWithBootstrapButtons.fire({
            title: 'Confirmation',
            text: `Do you want merge table No. ${TableOnprocess} to table No. ${index.table_count}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {

              TransfertableSave(TableOnprocess,index.table_count)
              setisTransfertable(false)
              setTableOnprocess(null)
            }})

  
        }else{
          TransfertableSave(TableOnprocess,index.table_count)
          setisTransfertable(false)
          setTableOnprocess(null)
          return;

        }
      
      }
    
        if (index.table_count === TableOnprocess){
        return;
    
      }
      setTableNo(index.table_count);
    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
    
        const message = {
          'message': index.table_count,
          'TableNO':true,
        };
        chatSocket.send(JSON.stringify(message));
      }
      setQueNo('')
    if (index.Paid === 'N' && isTransfertable === false ||  index.dinein_order_and_pay === 'Y') {
        if (index.dinein_order_and_pay === 'Y'){
          setDineInOrderAndPay(true)
        }else{
          setDineInOrderAndPay(false)
        }
    
        setSelectTypeOfTransaction(true)
        setTimeout(() => {
          AddOrderRef.current?.focus();
          
        }, 50);
      } else if (isTransfertable === false) {
        // Handle other cases when index.Paid is not 'N'
        setisSelected(0)
        setTableNoModal(false);
        // Additional logic or function calls related to paid table
      }
    }
    

  };



//////******************************** select Transaction Type When Selecting Table **********************************/////

  const SelectQue = (index:any) => {

    if (cartItems.length === 0 ) {
      setQueNo(index.q_no);
      setTableNo('')
      if (index.Paid === 'N') {
        setSelectTypeOfTransaction(true)
        setTimeout(() => {
          AddOrderRef.current?.focus();
          
        }, 50);
      } else {
        setisSelected(null)
        // Handle other cases when index.Paid is not 'N'
        setTableNoModal(false);
        // Additional logic or function calls related to paid table
      }
    }else{
      showErrorAlert('Please complete the transaction first...!')
    }
  
  };

  const SelectTableOk = (searchItemindex: any) => {

    const selected = TableList[parseInt(searchItemindex) - 1]

    if (showTable) {
    if (parseInt(searchItemindex) === TableOnprocess){
      return;
    }
    if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      const message = {
        'message': parseInt(searchItemindex),
        'TableNO':true,
      };
      chatSocket.send(JSON.stringify(message));
    }
      if (parseFloat(searchItemindex) <= TableList.length) {
        const index = TableList.findIndex((item:any)=> item.table_count === parseFloat(searchItemindex) && item.Paid === 'N');
          console.log(index)
        if (index !== -1) {
          setSelectTypeOfTransaction(true)
          setTimeout(() => {
            AddOrderRef.current?.focus();
            
          }, 50);
        } else {
          if (selected.dinein_order_and_pay === 'Y'){
            setSelectTypeOfTransaction(true)
            setDineInOrderAndPay(true)
            setTimeout(() => {
              ClearTableRef.current?.focus();
            }, 50);
          }else{
            setDineInOrderAndPay(false)
            setTableNoModal(false);
            setisSelected(0)
          }
      
        }
      }
      
      else {
        Swal.fire({
          title: 'Error',
          text: `Selected table is Not Existed Please Select Table from 1 to ${TableList.length}`,
          icon: 'info',
          confirmButtonText: 'OK'
        });
      
        setTableNo('')
      }
    } else {
  
        const index = QueList.findIndex(item => String(parseInt(item.q_no)) === QueNo);
          console.log(index)
        if (index !== -1) {
          setSelectTypeOfTransaction(true)
          setTimeout(() => {
            AddOrderRef.current?.focus();
            
          }, 50);
        } else {
          Swal.fire({
            title: 'Error',
            text: `Selected Que is Not Existed Please Select Another Que No`,
            icon: 'info',
            confirmButtonText: 'OK'
          });
        
          setQueNo('')
        }}};


  useEffect(()=> {
    if (localStorage.getItem('UserRank') ==='Cashier'){
      LoadDataInExtended();
    }

  },[])

// ********************* OPEN WEBSOCKET CONNECTION ***************************//





useEffect(() => {
  if (window.electronAPI?.onBeforeQuit) {
    window.electronAPI.onBeforeQuit(async () => {
      await closeSocket(); // gracefully close WebSocket
      console.log('WS closed before app quit');
    });
  }
}, []);



  useEffect(() => {
    const initLoginSocket = async() =>{
    try{
        await openSocket(); // open WebSocket only now
        sendMessage({ action: "Login"});
        fecthTableList();
        const x = await SelectTableWebSocket()
        setChatSocket(x)
        // fecthQueList()
        }catch(error){
          console.log('Error')
        }
    }
      initLoginSocket()

  //   var url = new URL(BASE_URL);
  //   // Reconstruct the URL without the port
  //   var urlWithoutPort = url.hostname;
  //   console.log('URL',url)
  // // var urlWithoutPort = url.protocol + "//" + url.hostname + url.pathname + url.search + url.hash;

  //   const socket = new WebSocket(`ws://${urlWithoutPort}:8001/ws/count/`);

  //   socket.onopen = () => {
  //     // console.log('WebSocket connection established.');
  //     const message = {
  //       'message': 'Hello, world im back!'
  //     };
  //     socket.send(JSON.stringify(message));
  //   };

  //   socket.onmessage = async (event) => {
  //     const data = JSON.parse(event.data);
  //     // console.log('Received data:', data);
  //     const TableRecieve = data.message.message

  //     if (TableRecieve){
  //       setTableOnprocess(TableRecieve)
  //       // console.log('table on Going Process',TableRecieve)
  //     }
  //     else{
  //         setTableOnprocess(0)
        
  //     }
  //       fecthTableList();
  //     //  fecthQueList();

  //   };

  //   socket.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };

  //   setChatSocket(socket)
  //   return () => {
  //     // Clean up WebSocket connection on component unmount
  //     socket.close();
  //   };
  }, []); 


  useEffect(() => {
    if (!chatSocket) return; // Don't run if socket isn't initialized

    const handleMessage = async (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const TableRecieve = data.message;
        console.log('Receive Selected Table' ,data)
        if (TableRecieve) {
          setTableOnprocess(TableRecieve);
        } else {
          setTableOnprocess(0);
        }

        fecthTableList();
        fecthQueList();
      } catch (err) {
        console.error('Failed to parse WebSocket message:', err);
      }
    };

    const handleError = (error: Event) => {
      console.error('WebSocket error:', error);
    };

    chatSocket.addEventListener('message', handleMessage);
    chatSocket.addEventListener('error', handleError);

    return () => {
      chatSocket.removeEventListener('message', handleMessage);
      chatSocket.removeEventListener('error', handleError);
      chatSocket.close();
    };
  }, [chatSocket]);




    //***************Get data in extended before b-out***************** */
  const LoadDataInExtended = () => {
    const apiUrl = `${BASE_URL}/api/extended-data/`;

    fetch(apiUrl, {
      method: "GET",
      credentials: "include", // keep cookies
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) return;

        let tmpQueNo: any = 0;
        let tmpTable: any = 0;
        let tmpOrderType: string = "";

        const updatedItems = data.map(item => {
          if (item.que_no === 0) {
            tmpTable = item.table_no;
          } else {
            tmpQueNo = item.que_no;
          }
          tmpOrderType = item.order_type;

          return {
            ...item,
            quantity: Number(item.qty),
            totalAmount: Number(item.amount),
            lineno: Number(item.line_no),
          };
        });

        // Apply states directly (no need for setTimeout unless intentional)
        if (tmpTable === 0) {
          setQueNo(tmpQueNo);
        } else {
          setTableNo(tmpTable);
          setTableOnprocess(tmpTable);
          setCartItems(updatedItems);
        }

        setTableOnprocess(tmpTable);
        setOrderType(tmpOrderType);
        setOrderTypeModal(false);
        setDineIn(tmpOrderType === "DINE IN");
      })
      .catch(error => {
        console.error("There was a problem fetching the data:", error);
      });
  };



  const fecthTableList = () => {
    if (TableList.length != 0){
    setLoading(false)
    }
        const apiUrl = `${BASE_URL}/api/table/count/?site_code=${SideCode}`; // Replace with your actual site code
        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include', // ✅ include cookies in the request
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}` // not needed if using HttpOnly cookie
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setTableList(data.tables);
            setLoading(false) // Assuming the response data has a 'tables' key
            // console.log('TaBLE LIST',data.tables)
          })
          .catch(error => {
            console.error('There was a problem fetching the data:', error);
          });
  };


  const fecthQueList = () => {
    if (TableList.length != 0){
    setLoading(false)
    }
        const apiUrl = `${BASE_URL}/api/que-list/?site_code=${SideCode}`; // Replace with your actual site code
        fetch(apiUrl, {
            method: 'GET',
            credentials: 'include', // ✅ include cookies in the request
            headers: {
              'Content-Type': 'application/json',
              // 'Authorization': `Bearer ${token}` // not needed if using HttpOnly cookie
            }
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setQueList(data.que);
            setLoading(false) // Assuming the response data has a 'tables' key
            // console.log('TaBLE LIST',data.que)
          })
          .catch(error => {
            console.error('There was a problem fetching the data:', error);
          });
  };




  const calculateTotalDue = () => {
          let totalDue = 0;
          for (const item of cartItems) {
            let amountWithoutCommas :any = 0;
            if (item.totalAmount !== undefined) {
              amountWithoutCommas = item.totalAmount; // Remove commas from the amount
            }
            if (item.totalAmount === undefined) {
              const totalAmount = item.quantity * item.price
              amountWithoutCommas = totalAmount; // Remove commas from the amount
          } else {
            const totalAmount = item.quantity * item.price
            amountWithoutCommas = totalAmount; // Remove commas from the amount
          }
          
            totalDue += parseFloat(amountWithoutCommas);
          }

          if (DiscountData.length !==0) {
            if (DiscountType === 'SC'){
              totalDue = totalDue - (parseFloat(DiscountData.SLess20SCDiscount.replace(',' , '')) + parseFloat(DiscountData.SLessVat12.replace(',' , '')))

            }else if(DiscountType === 'ITEM'){
              console.log('DiscountData',DiscountData)
              let totalDisCount:any = 0
              if (DiscountData){
                DiscountData.map((item:any) => {
                  totalDisCount += item.ByAmount
                })
                totalDue = totalDue - totalDisCount
              }
            
            }else if(DiscountType === 'TRANSACTION'){
              if (DiscountData){
                let totalDisCount:any = 0
                DiscountData.map((item:any) => {
                  totalDisCount += item.Discount
                })
                totalDue = totalDue - totalDisCount
              }
            }
          }
          return totalDue.toFixed(2);
  };
        
  const formattedTotalDue = Number(calculateTotalDue()).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
  }); 

  const handleProductsFromCategory = (productsFromCategory: React.SetStateAction<any[]>) => {
          setProducts([]); 
          setProducts(productsFromCategory);
  };

   
  //***************PRODUCT***************** */
  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/product/`,{ withCredentials:true
                });
                setProducts(response.data);
            } catch (error:any) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    console.error('Server responded with a non-2xx status:', error.response.data);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error('No response received:', error.request);
                } else {
                    // Something else happened while setting up the request
                    console.error('Error setting up the request:', error.message);
                }
            }
        };
        
        fetchData();
  }, []);
    

    //***************CATEGORY***************** */
  useEffect(() => {
          const fetchData = async () => {
              try {
                  const response = await axios.get(`${BASE_URL}/api/product/category/`,{
                    withCredentials:true
                  });
                  setCategory(response.data);
              } catch (error: any) {
                  if (error.response) {
                    showErrorAlert(error.response.data)
                      // The request was made and the server responded with a status code
                      console.error('Server responded with a non-2xx status:', error.response.data);
                  } else if (error.request) {
                      // The request was made but no response was received
                      console.error('No response received:', error.request);
                  } else {
                      // Something else happened while setting up the request
                      console.error('Error setting up the request:', error.message);
                  }
              }
          };
          
          fetchData();
  }, []);



  //************* PREVENT KEYPRESS***************** */

    // useEffect(() => {
    //   const handleKeyPress = (e: { keyCode: number; preventDefault: () => void; ctrlKey: any; }) => {
    //     if (e.keyCode === 116) {
    //       e.preventDefault(); // Prevent the default browser refresh action for F5 (key code 116)

    //     }

    //     if (e.ctrlKey && e.keyCode === 78) {
    //       e.preventDefault(); // Prevent the default browser action for Control + N (key code 78)
    //   }
    //   if (e.ctrlKey && e.keyCode === 83){ //control s
    //     e.preventDefault(); 

    //     if (DineIn){
    //       SaveOrderClick()
    //     }else{
    //       PaymentClick()
    //     }
    //   }
        
    //   };
  
    //   window.addEventListener('keydown', handleKeyPress);
  
    //   return () => {
    //     window.removeEventListener('keydown', handleKeyPress);
    //   };
    // }, []);


    useEffect(() => {
      setTotalDue(calculateTotalDue);
    }, [isKey, calculateTotalDue]); // Include calculateTotalDue in the dependency array if it's used inside calculateTotalDue
    

  const IsModalOpen = () => {
        return (
            CustomerDineInModal ||
            SalesOrderListOpenModal ||
            CashPaymentEntryModal ||
            CustomeryPaymentModal ||
            ReprintTransactionModal ||
            CashBreakDownModal ||
            ChargeToModal ||
            CreditCardPaymentModal ||
            CreditCardPaymentEntryModal ||
            DebitCardPaymentModal ||
            OpenVireficationModal ||
            PaymentOpenModal ||
            OtherCommandOpenModal ||
            OrderTypeModal
        );
  }

  useEffect(() => {
      const intervalId = setInterval(() => {
          // Dispatch action to set boolean value in Redux store
          const isModalOpen = IsModalOpen();
          
      
          if (isModalOpen) {
            localStorage.setItem('Modal','true')
          }else {
            localStorage.setItem('Modal','false')
          }
      
        
      }, 50); // Check every second

      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
  }, [IsModalOpen]); // Empty dependency array ensures the effect runs only once after the initial render



  useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
  

          if (e.key === 'F5') {
            e.preventDefault(); // Prevent the default browser refresh action for F5
          }

          else if (e.ctrlKey && e.key === 'n') {
            e.preventDefault(); // Prevent the default browser action for Control + N
          }
          else if (e.ctrlKey && e.key === 's' || e.key === 'S' ) { // Control + S
            e.preventDefault();
                    if (CustomerDineInModal ||
                      SalesOrderListOpenModal ||
                      CashPaymentEntryModal || 
                      CustomeryPaymentModal || 
                      ReprintTransactionModal || 
                      CashBreakDownModal || 
                      ChargeToModal || 
                      CreditCardPaymentModal || 
                      CreditCardPaymentEntryModal || 
                      DebitCardPaymentModal || 
                      OnlinePaymentModal || 
                      OtherPaymentModal || 
                      GiftCheckPaymentModal || 
                      OpenVireficationModal|| isModalOpened) {
                  return;
                    }
            if (DineIn || userRank == 'Salesman') {
              SaveOrderClick();
            } else {
              setIsKey(true);
      
              if (parseFloat(TotalDue) !== 0) {
                PaymentClickControlS();
              }
      
              setIsKey(false);
            }
          } else if (e.key === 'Escape') {
            e.preventDefault();

            // const iframeID = document.getElementById('myIframe')
            // if  (!iframeID) {}
            let modal = localStorage.getItem('Modal')

            if (modal ==='false'){
          
        
          setPaymentOpenModal(false)
          if (tableNoModal){
            if(SelectTypeOfTransaction){
              setSelectTypeOfTransaction(false)
              setTableOnprocess('')
            }else{
              setTableNoModal(false)
              setOrderTypeModal(true)
              setisSelected(null)
              setTimeout(() => {
                DineInRef.current?.focus()
              }, 500);
            }
        
          } else if (OtherCommandOpenModal){
            setOtherCommandOpenModal(false)
          }
      
          }   }
        };
      
        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
  }, [DineIn, TotalDue, SaveOrderClick, PaymentClickControlS]);
    


  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {

  if (e.key === 'Escape') {
        e.preventDefault();

        // const iframeID = document.getElementById('myIframe')
        // if  (!iframeID) {}
        let modal = localStorage.getItem('Modal')

        if (modal ==='false'){
      
    
      setPaymentOpenModal(false)
      if (tableNoModal){
        if(SelectTypeOfTransaction){
          setSelectTypeOfTransaction(false)
          setTableOnprocess('')
        }else{
          setTableNoModal(false)
          setOrderTypeModal(true)
          setisSelected(null)
          setTimeout(() => {
            DineInRef.current?.focus()
          }, 500);
        }
    
      } else if (OtherCommandOpenModal){
        setOtherCommandOpenModal(false)
      }}}
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);
  //// FETCH DINE IN DATA EVERY 10 SECONDS ////
    

    
  useEffect(() => {
        const storedCartDataString = localStorage.getItem('cartData');
        const storeDataInfo = localStorage.getItem('DataInfo');

      
        if (storedCartDataString !== null && storeDataInfo !== null) {
          const storedCartData = JSON.parse(storedCartDataString);

          const DataInfo = JSON.parse(storeDataInfo);
          setCartItems(storedCartData);
          RePrintCashPaymentReceipt(DataInfo)
        } 
  }, [refreshCart]); // Trigger effect when refreshCart changes



  useEffect(() => {
  if(OrderTypeModal){
    setTimeout(() => {
      DineInRef.current?.focus()
    }, 500);
  }
  },[OrderTypeModal])
    



  const handleBackspace = () => {

    if (showTable) {
      if (TableNo.length === 0) return;
      setTableNo((TableNo) => TableNo.slice(0, -1))
    }else {
      if (QueNo.length === 0) return;
      setQueNo((QueNo) => QueNo.slice(0, -1))
    }

  };
  const clearInput = () => {
    setTableNo('');
    setQueNo('')
  };



  const handleInput = (value: string | number) => {
    if (showTable){
      setTableNo((prevValue:any) => {

        if (value === '0' && parseFloat(prevValue) === 0) {
          return value;
        } else {
    
    
          // Check if the value is a decimal point
          if (value === '.') {
              const res = parseFloat(prevValue) + value;
              return res;
          }
          const stringValue = prevValue.toString();
            // Check if the previous value already contains a decimal point
            if (stringValue.includes('.')) {
              const res = prevValue + value;
              return res;
            }
      
    
          // Perform addition based on the input value
    
          if (prevValue === 0) {
            const res =  value;
            return res.toString();
          }
          const res = prevValue + value;
          return res.toString();
        }
      });
    
      if (parseFloat(TableNo + value) > TableList.length) {
        Swal.fire({
          title: 'Error',
          text: `Selected table is Not Existed Please Select Table from 1 to ${TableList.length}`,
          icon: 'info',
          confirmButtonText: 'OK'
        });
      
        setTableNo('')
      }
    
    }else{
      setQueNo((prevValue:any) => {

        if (value === '0' && parseFloat(prevValue) === 0) {
          return value;
        } else {
    
    
          // Check if the value is a decimal point
          if (value === '.') {
              const res = parseFloat(prevValue) + value;
              return res;
          }
          const stringValue = prevValue.toString();
            // Check if the previous value already contains a decimal point
            if (stringValue.includes('.')) {
              const res = prevValue + value;
              return res;
            }
      
    
          // Perform addition based on the input value
    
          if (prevValue === 0) {
            const res =  value;
            return res.toString();
          }
          const res = prevValue + value;
          return res.toString();
        }
      });
    }

    
  };


  const ChangeViewToQue = () => {
    if (showTable) {
      setshowTable(false)
      setTimeout(() => {
        QueNoRef.current?.focus();
        QueNoRef.current?.select();
      }, 50);
    }
    else {
      setshowTable(true)
      setTimeout(() => {
        TableNoRef.current?.focus();
        TableNoRef.current?.select();
      }, 50);
    }
  }

  const overlayStyle: React.CSSProperties  = {
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    display : showIframe ? 'block' : 'none',
    backgroundColor:showIframe ? 'rgba(0, 0, 0, 0.5)' : 'white', // Semi-transparent overlay
    zIndex: showIframe ? '9999' : '-1', // Set a higher zIndex to cover iframe when shown
    pointerEvents: showIframe ? 'auto' : 'none', // Enable or disable click events
  };




  useEffect(() => {
    const checkDeviceType = () => {
      if (isMobile) {
        setDeviceType('Mobile');
      } else if (isTablet) {
        setDeviceType('Tablet');
      } else {
        setDeviceType('Desktop');
      }
    };

    checkDeviceType();

    const handleResize = () => {
      checkDeviceType();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  useEffect(() => {
    localStorage.removeItem('cartData');
    setOrderType('')
    setOrderTypeModal(true)
    setisSelected(null)
    setTimeout(() => {
      DineInRef.current?.focus()
    }, 50);
    setShowIframe(false)
    setCartItems([])
    setTableNo('')
  }, []);



  useEffect(() => {
    if (showTable){
      if (parseFloat(TableNo)> TableList.length || parseFloat(TableNo) == 0) {
        Swal.fire({
          title: 'Error',
          text: `Selected table is Not Existed Please Select Table from 1 to ${TableList.length}`,
          icon: 'info',
          confirmButtonText: 'OK'
        });
      if (TableNoRef.current){
    setTableNo('')
    
        TableNoRef.current?.focus()
        TableNoRef.current?.select()
      }
      
      }
    }


  }, [TableNo]);


  //*************************VERIFICATION ****************************/



  const OpenVireficationEntry = (type:any) => {
    setOpenVireficationModal(true)

    if (type === 'Senior' || type === 'Item' || type === 'Trade' || type === 'Transaction'){
      setPaymentOpenModal(false)
    }else if ((type === 'Delete Order')){
      setEditOrderModal(false)
    }else if (type === 'Cancell Transaction'){
      setOtherCommandOpenModal(false)
      setOrderTypeModal(false)
    }else if (type === 'Reprint'){
      setOtherCommandOpenModal(false)
      setOrderTypeModal(false)
    }


    setVeryficationType(type)
  }

  const CloseVerification = () => {
    setOpenVireficationModal(false)
    if (VeryficationType == 'Cancell Transaction'){
      setOrderTypeModal(true)
    }else if (VeryficationType === 'Reprint'){
      setOrderTypeModal(true)
    }else if (VeryficationType === 'Refresh'){

    }else{
      setPaymentOpenModal(true)
    }

  }

  const OKVerification = async (data:any) => {
    dispatch(setGlobalIsLoading(true))
   
      if (chatSocket && chatSocket.readyState === WebSocket.OPEN) {
      const message = {
        'message': VeryficationType,
        'TableNO':'',
      };
      chatSocket.send(JSON.stringify(message));
    }

    if (VeryficationType=='Delete Order'){
       await onDelete()
      setisSelected(null)
    } else if (VeryficationType ==='Reprint'){
      ReprintList()
    }
    else if (VeryficationType == 'Senior'){
      OpenSeniorCitezenEntry();
    }

    if (VeryficationType == 'Item'){
    setisItemDis(true)
    showInfoAlert('Select Item For Discount')
    }

    if (VeryficationType == 'Trade'){
      OpenTradeDiscountEntry();
    }
    if (VeryficationType == 'Transaction'){
      OpenTransactionDiscountEntry();
    }

    if (VeryficationType == 'Refresh'){
        await RefreshModule();
    }
    if (VeryficationType == 'Cancell Transaction'){
      ShowCancellTransaction()
    }

setOpenVireficationModal(false)
dispatch(setGlobalIsLoading(false))
 
  }




  //*************************SEÑIOR CITEZEN DISCOUNT ****************************/
  const OpenSeniorCitezenEntry = () => {
    setOpenSeniorCitezenDiscountModal(true)
    setDiscountType('SC')
  }

  const CloseSeniorCitezenDiscount = () => {
    setOpenSeniorCitezenDiscountModal(false)
    setDiscountType('')


  }

  const SaveSeniorCitezenDiscount = (data:any) => {

    console.log(data)
    setDiscountData(data.SeniorDiscountData)
    setDiscountType('SC')
    setDiscountDataLits(data.SeniorNameList)
    // setDiscountData(data)
    // setDisEntry(data)
    // setDis(true)
    calculateTotalDue()
    setOpenSeniorCitezenDiscountModal(false)
    setPaymentOpenModal(true)

  }



  //*************************ITEM DISCOUNT TRANSACTION****************************/
  const OpenItemDiscountEntry = () => {
    if (isSelected != null){
      setOpenItemDiscountModal(true)
      setDiscountType('ITEM')
    }

    else{

      setisFocus(isFocus)
      showErrorAlert('Please Select Item!')

    }


  }

  const CloseItemDiscountsEntry = () =>{
    setDiscountType('')
    setOpenItemDiscountModal(false)


  }
  const SaveItemDiscountEntry = (data:any) => {
    console.log(data)
    setOpenItemDiscountModal(false)
    setDiscountData((prevDisEntry:any)=> [...prevDisEntry, data]);
    setDiscountType('ITEM')
  }


  //*************************TRADE DISCOUNT TRANSACTION****************************/

  const OpenTradeDiscountEntry = () => {
    setOpenTradeDiscountModal(true)
    setDiscountType('TRADE')
  }

  const CloseTradeDiscountsEntry = () =>{
    setOpenTradeDiscountModal(false)
    setDiscountType('')


  }
  const SaveTradessDiscountEntry = (data:any) => {
    console.log('trade discount',data)
    setOpenTradeDiscountModal(false)

    console.log(data)
    setDiscountData(data)
    setDiscountType('Trade')
    setDiscountDataLits(data)
    calculateTotalDue()
    setPaymentOpenModal(true)

  }



  //*************************TRANSACTION DISCOUNT TRANSACTION****************************/

  const OpenTransactionDiscountEntry = () => {
    setOpenTransactionDiscountModal(true)
    setDiscountType('TRANSACTION')
  }

  const CloseTransactionDiscountsEntry = () =>{
    setOpenTransactionDiscountModal(false)
    setDiscountType('')


  }
  const SaveTransactionDiscountEntry = (data:any) => {
    console.log('Transaction discount',data)
    setOpenTransactionDiscountModal(false)
    console.log(data)
    setDiscountData(data)
    setDiscountType('TRANSACTION')
    calculateTotalDue()
    setPaymentOpenModal(true)

  }




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
        let line_no = 0

        if (item.line_no === undefined){
          line_no = item.lineno
        }else{
          line_no = item.line_no
        }

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
        
        if (DiscountType === 'ITEM'){
          if (DiscountData){
            let maxLengthChar = 35;
            DiscountData.map((item1:any) => {
              if (item.barcode === item1.Barcode && line_no=== parseInt(item1.LineNo)){
                const disc = parseFloat(item1.D1).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})
                const itemDescription = `Less: ${disc}% discount`; // Replace with your actual item description
                const wrappedDescription = wrapDescription(itemDescription, maxLength);

                let spaces2 = ' '.repeat(5);
  
                if (itemDescription.length < 25){
                 const lengthShort = 30 - itemDescription.length
                  maxLengthChar =  maxLengthChar + lengthShort
                }
  
                const formattedTotal = item1.ByAmount.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })

                if (formattedTotal !== undefined) {
                  const priceString = String(formattedTotal); // Convert item.price to a string
                   maxLength1 = 25 + priceString.length;
                }

                if (formattedTotal.length === 3 ) {

                  const spaces = ' '.repeat(maxLengthChar - (maxLength1));
                
                  receiptContent += `${spaces2} ${wrappedDescription}${spaces} -${formattedTotal}\n`;
                }
  
                if (formattedTotal.length === 4 ) {

                  const spaces = ' '.repeat(maxLengthChar - maxLength1);
                
                  receiptContent += `${spaces2} ${wrappedDescription}${spaces} -${formattedTotal}\n`;
                }
                if (formattedTotal.length === 5 ) {
                  const spaces = ' '.repeat(maxLengthChar - (maxLength1));
                
                  receiptContent += `${spaces2} ${wrappedDescription}${spaces} -${formattedTotal}\n`;
                }
        
                if (formattedTotal.length === 6 ) {
                
                  const spaces = ' '.repeat(maxLengthChar - (maxLength1));
                  receiptContent += `${spaces2} ${wrappedDescription}${spaces} -${formattedTotal}\n`;
                }
        
                if (formattedTotal.length === 7 ) {
          
                  const spaces = ' '.repeat(maxLengthChar - (maxLength1));
                  receiptContent += `${spaces2} ${wrappedDescription}${spaces} -${formattedTotal}\n`;
                }
                
                if (formattedTotal.length === 8 ) {
               
                  const spaces = ' '.repeat(maxLengthChar - (maxLength1));
                  receiptContent += `${spaces2} ${wrappedDescription}${spaces} -${formattedTotal}\n`;
                }
        
                if (formattedTotal.length === 9 ) {
               
                  const spaces = ' '.repeat(maxLengthChar - (maxLength1));
                  receiptContent += `${spaces2} ${wrappedDescription}${spaces} -${formattedTotal}\n`;
                }
        
                if (formattedTotal.length === 10 ) {
                  const spaces = ' '.repeat(maxLengthChar - (maxLength1));
                  receiptContent += `${spaces2} ${wrappedDescription}${spaces} -${formattedTotal}\n`;
                }
              }



            })
        }}

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
   

  const generateReceiptWithOutAmount = () => {


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

    receiptContent += '<div style="font-size:20px; font-weight:bold;">';
    receiptContent += '<div>------------------------------------------------</div>'
    receiptContent += '<div> QTY |       DESCRIPTION       </div>'
    receiptContent += '<div>------------------------------------------------</div>'
  

    // function wrapDescription(description: string, maxLength: number) {
    //   if (description.length <= 23) {
    //     return description;
    //   } else {
    //     const wrappedDescription = description.substring(0, 23);
    //     const remainingDescription = description.substring(maxLength);
    //     const des:any =  wrappedDescription + '\n' + wrapDescription(remainingDescription, maxLength);
    //     return des ;
    //   }
    // }

    function wrapDescription(description: string, maxLength: number): string {
      if (description.length <= 25) {
          return description;
      } else {
          const wrappedDescription = description.substring(0, 25);
          const remainingDescription = description.substring(25,maxLength);
          const des: string = wrappedDescription + '\n' + '      ' + wrapDescription(remainingDescription, maxLength);
          return des;
      }
  }
    const maxLength = 35
     
    cartItems.forEach((item:any) => {
      let  maxLength1 = 0
        let maxLengthChar = 35;


        const itemDescription = item.description; // Replace with your actual item description
        const wrappedDescription = wrapDescription(itemDescription, maxLength);
    
        const formattedQuantity = String(parseInt(item.quantity)).padStart(3, ' ')
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
        
          receiptContent += `${formattedQuantity}  ${wrappedDescription}${spaces} \n`;
        }
        if (formattedTotal.length === 5 ) {
          const spaces = ' '.repeat(maxLengthChar - maxLength1);
        
          receiptContent += `${formattedQuantity}  ${wrappedDescription}${spaces} \n`;
        }

        if (formattedTotal.length === 6 ) {
           maxLengthChar -= 1;
        
          const spaces = ' '.repeat(maxLengthChar - maxLength1);
          receiptContent += `${formattedQuantity}  ${wrappedDescription}${spaces} \n`;
        }

        if (formattedTotal.length === 7 ) {
          maxLengthChar -= 2;
  
          const spaces = ' '.repeat(maxLengthChar - maxLength1);
          receiptContent += `${formattedQuantity}  ${wrappedDescription}${spaces} \n`;
        }
        
        if (formattedTotal.length === 8 ) {
          maxLengthChar -= 3;
       
          const spaces = ' '.repeat(maxLengthChar - maxLength1);
          receiptContent += `${formattedQuantity}  ${wrappedDescription}${spaces} \n`;
        }

        if (formattedTotal.length === 9 ) {
          maxLengthChar -= 4;
       
          const spaces = ' '.repeat(maxLengthChar - maxLength1);
          receiptContent += `${formattedQuantity}  ${wrappedDescription}${spaces} \n`;
        }

        if (formattedTotal.length === 10 ) {
          maxLengthChar -= 5;
       
          const spaces = ' '.repeat(maxLengthChar - maxLength1);
          receiptContent += `${formattedQuantity}  ${wrappedDescription}${spaces} \n`;
        }
        

        // receiptContent += `${item.quantity}  ${wrappedDescription}${spaces} ${item.totalAmount}\n`;
        const amountWithoutSeparator = parseFloat(formattedTotal.replace(/,/g, ''));
        total += amountWithoutSeparator;
        totalqty += parseFloat(item.quantity); 
        //#endregion
   });
   receiptContent += '</div>'

      const amountDue = `Total Amount Due: ${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      const totalQTY = `Items ${totalqty}`

//**********Alignment of Items and Amount Due */

//#region 
      if (totalQTY.length < 25){
        const lengthShort = 25 - totalQTY.length

        const maxLengthChar = 24 + lengthShort
         let spaces = ''


         if (amountDue.length === 23){
          // spaces = ' '.repeat(maxLengthChar - maxLength);
        }

        if (amountDue.length === 24){
          // spaces = ' '.repeat(maxLengthChar - (maxLength + 1));
        }
        if (amountDue.length === 25){
          // spaces = ' '.repeat(maxLengthChar - (maxLength + 2));
        }
         if (amountDue.length === 26){
          //  spaces = ' '.repeat(maxLengthChar - (maxLength + 3));
         }
         if (amountDue.length === 27){
          // spaces = ' '.repeat(maxLengthChar - /(maxLength + 4));
        }
        if (amountDue.length === 28){
          // spaces = ' '.repeat(maxLengthChar - (maxLength + 5));
        }
        if (amountDue.length === 29){
          // spaces = ' '.repeat(maxLengthChar - (maxLength + 6));
        }
        if (amountDue.length === 30){
          // spaces = ' '.repeat(maxLengthChar - (maxLength + 7));
        }




        const formattedQuantity = String(totalQTY).padEnd(4, ' ')


        receiptContent += '<div>================================================</div>'

        receiptContent +=  `${formattedQuantity} ${spaces}`;
     
//#endregion
       }    
      return receiptContent;
    };

    const triggerPrint = async () => {
      try {
          // Make a POST request to the Django backend endpoint
          const response = await fetch(`${BASE_URL}/api/print/`, {
              method: 'POST',
              credentials: "include", // 👈 send cookies (important for session/JWT with HttpOnly cookies)
              headers: {
                  'Content-Type': 'application/json'
              },
           
              body: JSON.stringify({}) // You can pass any data if needed
          });
  
          // Check if the request was successful
          if (response.ok) {
              console.log('Print operation triggered successfully');
          } else {
              console.error('Failed to trigger print operation');
          }
      } catch (error) {
          console.error('Error triggering print operation:', error);
      }
  };
  

//******** PRINT SALES ORDER AREA******** */
  const printReceipt = async (SOInfo: any,SONumber: any) => {
      const generateReceiptIframe = (receiptContent: string, logoSrc: { logo: string; }) => {
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
                doc.write(`
                <style>
                  @page {
                    size: 80mm auto; /* Adjust size to 58mm or 80mm as per your POS printer */
                    margin: 7mm; /* Adjust margin as needed */
                    margin-toop: 0mm;
                    margin-right: 5mm;
                  }
                  body {
                    font-family: "Courier New", monospace;
                    font-weight: bold;
                    margin: 0;
                    padding: 0;
                  }
                  .receipt-content {
                    width: 100%;
                    font-size: 15px;
                  }
                </style>
              `);
              

              // doc.write('<style>body { font-family: "Courier New", monospace;font-weight:bold; } </style>');
              doc.write('<div class="receipt-content" style="width: 400px; font-size: 15px;">');
              doc.write('<div style="font-size: 20px">'); // Start a container div for content
        
              // Embed the logo image using an <img> tag
              // doc.write('<div style="text-align: center;">');
              // doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
              // doc.write('</div>');
    
              doc.write('<div style="text-align: center;">');
              doc.write('<p> Sales Order </p>');
              doc.write('</div>')
              doc.write(`<div>Customer: ${SOInfo.Customer} </div>`);
              doc.write(`<div>Table No: ${TableNo}</div>`);
              doc.write(`<div>Guest Count: ${SOInfo.GuestCount}</div>`);
              doc.write('<div style="text-align: center;">');
              doc.write(`<p> ${OrderType}</p>`);
              doc.write('</div>')
    
    
      
              doc.write('<pre font-size: 10px;>------------------------------------------------</pre>');
              doc.write('<div style="text-align: center;">');
              doc.write(`<div> SO# ${SONumber.SO_NO}</div>`);
              doc.write(`<div> ${formattedDateTime} </div>`);
              doc.write('</div>')
    
              // Write the receipt content
              doc.write('<pre>' + receiptContent + '</pre>');
              doc.write('</div>')
    

              let receiptContent1 = '';
    
              
              //********************************************************* */

              if (typeof localStorage !== 'undefined' && localStorage !== null) {
                const Cashier = 'CASHIER:';
                const fullName = localStorage.getItem('FullName');
              
                if (fullName) {
                  const spaces = ' '.repeat(Math.max(0, 38 - (Cashier.length + fullName.length)));
                  const receiptContent1 = `<div>${Cashier} ${spaces}${fullName}</div>`;
                  doc.write('<pre>' + receiptContent1 + '</pre>');
                } else {
                  console.error('FullName not found in localStorage');
                }
              } else {
                console.error('localStorage is not available.');
              }
    
    
              //********************************************************* */
              // const waiter = 'WAITER :';
              // const spacesWaiter = ' '.repeat(Math.max(0, 47 -(waiter.length + SOInfo.Waiter.length) ));
              // receiptContent1 = `<div>${waiter} ${spacesWaiter}${SOInfo.Waiter}</div>`;
              // doc.write('<pre>' + receiptContent1 + '</pre>');
    
    
    
    
              //********************************************************* */
    
              const TRANS = 'TRANS# :';
              const documentno = Math.abs(SONumber.documentno);
              const DocumentNo = String(documentno).padStart(8,'0')
    
    
              const spacesTRANS = ' '.repeat(Math.max(0, 38 -(TRANS.length + DocumentNo.length + SONumber.TerminalNo.length +1) ));
              receiptContent1 =`<div>${spacesTRANS} ${TRANS}${SONumber.TerminalNo}-${DocumentNo} </div>`
    
     
    
              doc.write('<pre>' + receiptContent1 + '</pre>');
              //********************************************************* */
    
              // const qr = QRCode(0, 'H'); // QR code type and error correction level
              // qr.addData('Your data for QR code'); // Replace with the data you want in the QR code
              // qr.make();
        
              // // Get the generated QR code as a data URI
              // const qrDataURI = qr.createDataURL();
        
              // // Insert the QR code image into the document
              // doc.write('<div style="text-align: center;">');
              // doc.write(`<img src="${qrDataURI}" alt="QR Code"  style="max-width: 120px; display: inline-block;" />`);
              // doc.write('</div>'); // Close the container div
              // doc.close();
              // console.log('999') /// Dont delete
     
              
   
         
      
              // triggerPrint()
              setTimeout(async () => {
               
                  iframeWindow.print();
                

               
              if (SOInfo.PaymentType ==='Sales Order'){
                DeletePosExtendedAll()
                setOrderType('')
                setOrderTypeModal(true)
                setisSelected(null)
                setTimeout(() => {
                  DineInRef.current?.focus()
                }, 50);
                setShowIframe(false)
                iframe.style.display = 'none';
                setCartItems([])
                setTableNo('')
                setCustomerOrderInfo([])
                // window.location.reload(); 
              }
              else{
                if (iframe) {
                  iframe.style.display = 'none';
                // Set display property to 'block' to show the iframe
                }
                setShowIframe(false)
                setDineIn(false)
            
              }
      
            }, 1000); 
                    } };
          iframe.src = 'about:blank';
          return iframe;
        }
      
      };
    
      // Example data (replace with actual receipt content and logo source)
      const receiptContent = generateReceiptWithOutAmount();
    // Replace with the actual path to your logo image

      const iframe = generateReceiptIframe(receiptContent, {logo});

      // ipcRenderer.send('print-receipt', ReceiptContentAll); 
  
    };
    

  //************ RE-PRINT RECEIPT CASH PAYMENT*****************//
  const RePrintCashPaymentReceipt = async (dataInfo:any) => {
    const generateReceiptIframe = (receiptContent: string, logoSrc: { logo: string; }) => {

    const iframe = document.getElementById('myIframe') as HTMLIFrameElement | null;

  if (iframe !== null) {

    setShowIframe(true)
    if (iframe) {
      iframe.style.display = 'block';
    }

    iframe.onload = () => {
    const currentDate = new Date(); 
    const timeZone = 'Asia/Manila';  
    const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: timeZone});

    const iframeWindow = iframe.contentWindow;

      if (iframeWindow !== null) {
        const doc = iframeWindow.document;

        doc.open();
      // doc.write('<style>body { font-family: "Courier New", Courier, monospace; }</style>');
      doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');

      doc.write('<div style="width: 200px; margin:none; font-size:8px">');
      doc.write('<div>'); // Start a container div for content

      // Embed the logo image using an <img> tag
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
      doc.write('</div>');



      doc.write('<div style="text-align: center;">');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');

    

      doc.write(`<div> ${dataInfo.CustomerCompanyName}</div>`);


      doc.write(`<div> ${dataInfo.CustomerCompanyAddress}</div>`);
      doc.write(`<div> ${dataInfo.TelNo}</div>`);
      doc.write(`<div> ${dataInfo.CustomerTIN}</div>`);
      doc.write(`<div> ${dataInfo.SerialNO}</div>`);
      doc.write(`<div> ${dataInfo.MachineNo}</div>`);



      doc.write('<p style="font-size:12px">Re-Print Copy</p>');
      doc.write(`<div> SI# ${parseFloat(dataInfo.OR)}</div>`);
      doc.write(`<div> ${formattedDateTime} </div>`);
      doc.write('</div>')
      // Write the receipt content
      doc.write('<pre>' + receiptContent + '</pre>');
      // doc.write('<div style="text-align: center;">');
      // doc.write('<div> -----------------------------------------------------</div>');
      // doc.write('</div>')





        let receiptContent1 = '';

        const AlignmentSpace = (description: string | any[], data: string | any[]) => {
          const totalLength = 48; // Total desired length for alignment
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
        
          return ' '.repeat(spacesNeeded); // Return the string with required spaces
        };
          
          //********************************************************* */
          let description = '';
          let data = ''
          // Get the value or initialize an empty string if it's null
          let spaces = null
              data = dataInfo.ServiceCharge || '';
              description = 'SERVICE CHARGES:'
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-7px; padding: 0;">${description}${spaces}${data}</div>`;
              receiptContent1 += '<div style="margin-top:-3px; padding: 0;">================================================</div>'
            
              doc.write('<pre>' + receiptContent1 + '</pre>');

              description = 'TOTAL DUE:';
              data = formattedTotalDue || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;
              receiptContent1 += '<div style="margin:-3px; padding: 0;">-------------------------------------------------</div>'
              doc.write('<pre>' + receiptContent1 + '</pre>');



              description = 'VATable:';
              data = dataInfo.VATable || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div>${description}${spaces}${data}</div>`;

              description = 'VAT Exempt:';
              data = dataInfo.VatExcempt || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;


              description = 'Non VAT:';
              data = dataInfo.NonVat|| ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;

              
              description = 'VAT Zero Rated: ';
              data = dataInfo.VatZeroRated|| ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;


              description = 'VAT:';
              data = dataInfo.VAT || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;
              doc.write('<pre>' + receiptContent1 + '================================================</pre>');
              //                    doc.write('<div> =====================================================</div>');

              description = 'TOTAL DUE:';
              data = formattedTotalDue || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;

              doc.write('<pre>' + receiptContent1 + '------------------------------------------------</pre>');
              // doc.write('<div>-----------------------------------------------</div>');




                description = 'CASH:';
                const amountTenderedFormatted = Number(AmountTendered).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                data = String(amountTenderedFormatted) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 = `<div style="font-weight: bold;">${description}${spaces}${amountTenderedFormatted}</div>`;



                description = 'CHANGE:';
                const changeAmountFormatted = Number(ChangeAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

                data = String(changeAmountFormatted) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${changeAmountFormatted}</div>`;

                doc.write('<pre>' + receiptContent1 + '------------------------------------------------</pre>');

      // doc.write('<div>-----------------------------------------------</div>');


      
      description = 'CASHIER:';
      data = localStorage.getItem('FullName') || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div>${description}${spaces}${data}</div>`;
      


      // description = 'WAITER:';
      // data = dataInfo.WaiterName || ''; 
      // spaces = AlignmentSpace(description, data);
      // receiptContent1 += `<div>${description}${spaces}${data}</div>`;


      description = 'TERMINAL# ';
      data = dataInfo.TerminalNo
      data += '-'
      data +=  String(parseFloat(dataInfo.OR)).padStart(8,'0') || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${spaces}${description}${data}</div>`;

      doc.write('<pre>' + receiptContent1 + '------------------------------------------------</pre>');


      
      // doc.write('<div>-----------------------------------------------</div>');





      description = 'CUSTOMER NAME:';
      data = dataInfo.CustomerName || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div>${description}${spaces}${data}</div>`;

      description = 'COMPANY ADDRESS:';
      data = dataInfo.CusAddress || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;

      description = 'TIN:';
      data = dataInfo.CusTIN || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;


      description = 'BUSINESS STYLE:';
      data = dataInfo.CusBusiness || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;

      doc.write('<pre>' + receiptContent1 + '</pre>');


      doc.write('<div style="text-align: center;">');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      doc.write('<pre style="margin: 0; line-height: 1; font-size: 12px;"> THANK YOU COME AGAIN: </pre>');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      

      doc.write('<div> LEAD SOLUTIONS INC. </div>');

      doc.write('<div> DOOR 1 DWTC BLDG RIZAL EXTENSION </div>');
      doc.write('<div> DAVAO CITY </div>');
      doc.write('<div> 274-027-986-000</div>');
      doc.write('<div> ACCRED # 1132740279862015060320</div>');
      doc.write('<div> DATE ISSUED: 06-04-2015 </div>');
      doc.write('<div> VALID UNTIL: 07-31-2025 </div>');
      doc.write('<div> PTU NO. FP112022-110-0358595-000001 </div>');
      doc.write('<div> DATE ISSUED: 10-03-2022 </div>');

      doc.write('</div>')



    
      const qr = QRCode(0, 'H'); // QR code type and error correction level
      qr.addData('Your data for QR code'); // Replace with the data you want in the QR code
      qr.make();

      // Get the generated QR code as a data URI
      const qrDataURI = qr.createDataURL();

      // Insert the QR code image into the document
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${qrDataURI}" alt="QR Code"  style="max-width: 120px; display: inline-block;" />`);
      doc.write('</div>'); // Close the container div
      doc.close();

      console.log('999') /// Dont delete
      
    /* The above code is using setTimeout to execute a series of actions after a delay of 1000
    milliseconds. */
    setTimeout(() => {
      iframeWindow.print();

      localStorage.removeItem('cartData');
      setOrderType('')
      setOrderTypeModal(true)
      setisSelected(null)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      setShowIframe(false)
      iframe.style.display = 'none';
      setCartItems([])
      setTableNo('')
    }, 1000); 
      setTimeout(() => {
        document.body.removeChild(iframe);

      }, 20000); // Adjust timeout as needed for printing to complete
    } };
      iframe.src = 'about:blank';
    return iframe;
    }};

    // Example data (replace with actual receipt content and logo source)
    const receiptContent = generateReceipt();
  // Replace with the actual path to your logo image

    const iframe = generateReceiptIframe(receiptContent, {logo});
  };


  //************ PRINT RECEIPT CASH PAYMENT*****************//
  const PrintCashPaymentReceipt = async (dataInfo:any) => {
    const generateReceiptIframe = (receiptContent: string, logoSrc: { logo: string; }) => {


      // Create a hidden iframe to prepare for printing
      // const iframe = document.createElement('iframe');
      // iframe.style.display = 'none';
      // document.body.appendChild(iframe);


      const iframe = document.getElementById('myIframe') as HTMLIFrameElement | null;
      // IframeContainer.appendChild(iframe)


  if (iframe !== null) {

    setShowIframe(true)
    if (iframe) {
      iframe.style.display = 'block';
    // Set display property to 'block' to show the iframe
    }

    iframe.onload = () => {
      const currentDate = new Date();   
      const timeZone = 'Asia/Manila';  
    const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: timeZone });
      const iframeWindow = iframe.contentWindow;

      if (iframeWindow !== null) {
        const doc = iframeWindow.document;

        doc.open();
      // doc.write('<style>body { font-family: "Courier New", Courier, monospace; }</style>');
      doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');

      doc.write('<div style="width: 200px; margin:none; font-size:8px">');
      doc.write('<div>'); // Start a container div for content

      // Embed the logo image using an <img> tag
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
      doc.write('</div>');



      doc.write('<div style="text-align: center;">');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');

    

      doc.write(`<div> ${dataInfo.data.CustomerCompanyName}</div>`);


      doc.write(`<div> ${dataInfo.data.CustomerCompanyAddress}</div>`);
      doc.write(`<div> ${dataInfo.data.TelNo}</div>`);
      doc.write(`<div> ${dataInfo.data.CustomerTIN}</div>`);
      doc.write(`<div> ${dataInfo.data.SerialNO}</div>`);
      doc.write(`<div> ${dataInfo.data.MachineNo}</div>`);



      doc.write('<p style="font-size:12px">This Serve as an Official Receipt </p>');
      doc.write(`<div> SI# ${parseFloat(dataInfo.data.OR)}</div>`);
      doc.write(`<div> ${formattedDateTime} </div>`);
      doc.write('</div>')
      doc.write('<pre>' + receiptContent + '</pre>');


        let receiptContent1 = '';

        const AlignmentSpace = (description: string | any[], data: string | any[]) => {
          const totalLength = 48; // Total desired length for alignment
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
        
          return ' '.repeat(spacesNeeded); // Return the string with required spaces
        };
          
          //********************************************************* */
          let description = '';
          let data = ''
          // Get the value or initialize an empty string if it's null
          let spaces = null
              data = dataInfo.data.ServiceCharge || '';
              description = 'SERVICE CHARGES:'
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-7px; padding: 0;">${description}${spaces}${data}</div>`;
              // receiptContent1 += '<div style="margin-top:-3px; padding: 0;"></div>'
            
              // doc.write('<pre>' + receiptContent1 + '</pre>');

              if (DiscountType === 'SC'){
                description = `Less: 20% VAT on ${DiscountData.SAmountCovered}`;
                data = DiscountData.SLessVat12 || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                const netOfVat: any = parseFloat(DiscountData.SVatSales) - parseFloat(DiscountData.SLessVat12);
                
                description = `Net of VAT:`;
                data = String(parseFloat(netOfVat)) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                description = `Less: 20%`;
                data = DiscountData.SLess20SCDiscount || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                doc.write('<pre style="margin: 0; line-height: 1;">' + receiptContent1 + '</pre>');
              }

        
              if (DiscountType === 'TRANSACTION'){
                let totalDisCount:any = 0
                let totalDue :any = 0
                let desc_rate :any = 0

                DiscountData.map((item:any) => {
                  const total = parseFloat(item.price) * parseFloat(item.quantity) -  item.Discount
                  totalDue += total
                  totalDisCount += item.Discount
                  desc_rate = item.desc_rate
                })
              


                description = `Less: Discount ${desc_rate}%`;
                data = String(parseFloat(totalDisCount).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;
                

                description = `Amount Due:`;
                data = String(parseFloat(totalDue).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                doc.write('<pre style="margin: 0; line-height: 1;">' + receiptContent1 + '</pre>');
              }





              doc.write('<pre style="margin: 0; line-height: 1;">================================================</pre>');
              description = 'TOTAL DUE:';
              data = formattedTotalDue || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;
              receiptContent1 += '<div style="margin:-3px; padding: 0;">-------------------------------------------------</div>'
              doc.write('<pre>' + receiptContent1 + '</pre>');



              description = 'VATable:';
              data = dataInfo.data.VATable || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div>${description}${spaces}${data}</div>`;


              let tmp :any = "0.00"
              let vat_exempt:any = "0.00"
              if (DiscountType === 'SC'){
                tmp = parseFloat(DiscountData.SLess20SCDiscount) + parseFloat(DiscountData.SLessVat12);
                vat_exempt  = parseFloat(DiscountData.SAmountCovered) - parseFloat(tmp)
              }
              description = 'VAT Exempt:';
              data = String(parseFloat(vat_exempt).toFixed(2)) || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;


              description = 'Non VAT:';
              data = dataInfo.data.NonVat|| ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;

              
              description = 'VAT Zero Rated: ';
              data = dataInfo.data.VatZeroRated|| ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;


              description = 'VAT:';
              data = dataInfo.data.VAT || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;
              doc.write('<pre>' + receiptContent1 + '================================================</pre>');
              //                    doc.write('<div> =====================================================</div>');

              description = 'TOTAL DUE:';
              data = formattedTotalDue || ''; 
              setAmountDue(formattedTotalDue)
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;

              doc.write('<pre>' + receiptContent1 + '</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');


      description = 'CASH:';
      const amountTenderedFormatted = Number(AmountTendered).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      data = String(amountTenderedFormatted) || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div style="font-weight: bold;">${description}${spaces}${amountTenderedFormatted}</div>`;



      description = 'CHANGE:';
      const changeAmountFormatted = Number(ChangeAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      data = String(changeAmountFormatted) || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${changeAmountFormatted}</div>`;

      doc.write('<pre>' + receiptContent1 + '</pre>');

      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');


      let seniorD:any = dataInfo.data.SeniorDiscountDataList

      if (seniorD){
        seniorD.map((item:any) => {
          description = 'Senior Citizen ID:';
          data = item.SID || ''; 
          spaces = AlignmentSpace(description, data);
          receiptContent1 = `<div>${description}${spaces}${data}</div>`;


          description = 'Senior Fullname:';
          data = item.SName || ''; 
          spaces = AlignmentSpace(description, data);
          receiptContent1 += `<div>${description}${spaces}${data}</div>`;

          description = 'Senior TIN:';
          data = item.STIN || ''; 
          spaces = AlignmentSpace(description, data);
          receiptContent1 += `<div>${description}${spaces}${data}</div>`;

          doc.write('<pre>' + receiptContent1 + '</pre>');
          doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
        } )
      }

      
      description = 'CASHIER:';
      data = localStorage.getItem('FullName') || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div>${description}${spaces}${data}</div>`;
      


      // description = 'WAITER:';
      // data = dataInfo.data.WaiterName || ''; 
      // spaces = AlignmentSpace(description, data);
      // receiptContent1 += `<div>${description}${spaces}${data}</div>`;


      description = 'TERMINAL# ';
      data = dataInfo.data.TerminalNo
      data += '-'
      data +=  String(parseFloat(dataInfo.data.OR)).padStart(8,'0') || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${spaces}${description}${data}</div>`;

      doc.write('<pre>' + receiptContent1 + '</pre>');


      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');




      description = 'CUSTOMER NAME:';
      data = dataInfo.data.CustomerName || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div>${description}${spaces}${data}</div>`;

      description = 'COMPANY ADDRESS:';
      data = dataInfo.data.CusAddress || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;

      description = 'TIN:';
      data = dataInfo.data.CusTIN || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;


      description = 'BUSINESS STYLE:';
      data = dataInfo.data.CusBusiness || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;

      doc.write('<pre>' + receiptContent1 + '</pre>');

      doc.write('<div style="text-align: center;">');

      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      doc.write('<pre style="margin: 0; line-height: 1; font-size: 12px;"> THANK YOU COME AGAIN: </pre>');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      
      doc.write('<div> LEAD SOLUTIONS INC. </div>');

      doc.write('<div> DOOR 1 DWTC BLDG RIZAL EXTENSION </div>');
      doc.write('<div> DAVAO CITY </div>');
      doc.write('<div> 274-027-986-000</div>');
      doc.write('<div> ACCRED # 1132740279862015060320</div>');
      doc.write('<div> DATE ISSUED: 06-04-2015 </div>');
      doc.write('<div> VALID UNTIL: 07-31-2025 </div>');
      doc.write('<div> PTU NO. FP112022-110-0358595-000001 </div>');
      doc.write('<div> DATE ISSUED: 10-03-2022 </div>');

      doc.write('</div>')



    
      const qr = QRCode(0, 'H'); // QR code type and error correction level
      qr.addData('Your data for QR code'); // Replace with the data you want in the QR code
      qr.make();

      // Get the generated QR code as a data URI
      const qrDataURI = qr.createDataURL();

      // Insert the QR code image into the document
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${qrDataURI}" alt="QR Code"  style="max-width: 120px; display: inline-block;" />`);
      doc.write('</div>'); // Close the container div
      doc.close();
    // Remove the iframe after printing

    DeletePosExtendedAll()
    // triggerPrint()
    setCartItems([])
    setTimeout(() => {
      iframeWindow.print();
      // window.location.reload(); 

      setOrderType('')
      setOrderTypeModal(true)
      setisSelected(null)
      // setChangeModal(true)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      setShowIframe(false)
      iframe.style.display = 'none';
      setCartItems([])
      setTableNo('')
      setDiscountData('')
      setDiscountType('')
      setOrderTypeModal(true)
      setisSelected(null)
    }, 1000); 
      // Print the receipt
    

      // Remove the iframe after printing
      // setTimeout(() => {
      //   document.body.removeChild(iframe);
      // // Reload the page after printing
      // }, 20000); // Adjust timeout as needed for printing to complete
    } };
      iframe.src = 'about:blank';
    return iframe;
    }};

    // Example data (replace with actual receipt content and logo source)
    const receiptContent = generateReceipt();
  // Replace with the actual path to your logo image

    const iframe = generateReceiptIframe(receiptContent, {logo});
  };


  //************ PRINT RECEIPT Credit card and Debit CARD and Multiple PAYMENT*****************//
  const PrintCreditCardPaymentReceipt = async (dataInfo:any) => {
    const generateReceiptIframe = (receiptContent: string, logoSrc: { logo: string; }) => {

    const iframe = document.getElementById('myIframe') as HTMLIFrameElement | null;


  if (iframe !== null) {

    setShowIframe(true)
    if (iframe) {
      iframe.style.display = 'block';
    }

    iframe.onload = () => {
      const currentDate = new Date();   
      const timeZone = 'Asia/Manila';  
    const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: timeZone });
      const iframeWindow = iframe.contentWindow;

      if (iframeWindow !== null) {
        const doc = iframeWindow.document;

        doc.open();
      // doc.write('<style>body { font-family: "Courier New", Courier, monospace; }</style>');
      doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');

      doc.write('<div style="width: 200px; margin:none; font-size:8px">');
      doc.write('<div>'); // Start a container div for content

      // Embed the logo image using an <img> tag
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
      doc.write('</div>');



      doc.write('<div style="text-align: center;">');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');

    

      doc.write(`<div> ${dataInfo.data.CustomerCompanyName}</div>`);


      doc.write(`<div> ${dataInfo.data.CustomerCompanyAddress}</div>`);
      doc.write(`<div> ${dataInfo.data.TelNo}</div>`);
      doc.write(`<div> ${dataInfo.data.CustomerTIN}</div>`);
      doc.write(`<div> ${dataInfo.data.SerialNO}</div>`);
      doc.write(`<div> ${dataInfo.data.MachineNo}</div>`);



      doc.write('<p style="font-size:12px">This Serve as an Official Receipt </p>');
      doc.write(`<div> SI# ${parseFloat(dataInfo.data.OR)}</div>`);
      doc.write(`<div> ${formattedDateTime} </div>`);
      doc.write('</div>')
      doc.write('<pre>' + receiptContent + '</pre>');


        let receiptContent1 = '';

        const AlignmentSpace = (description: string | any[], data: string | any[]) => {
          const totalLength = 48; // Total desired length for alignment
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
        
          return ' '.repeat(spacesNeeded); // Return the string with required spaces
        };
          
          //********************************************************* */
          let description = '';
          let data = ''
          // Get the value or initialize an empty string if it's null
          let spaces = null
              data = dataInfo.data.ServiceCharge || '';
              description = 'SERVICE CHARGES:'
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-7px; padding: 0;">${description}${spaces}${data}</div>`;
              // receiptContent1 += '<div style="margin-top:-3px; padding: 0;"></div>'
            
              // doc.write('<pre>' + receiptContent1 + '</pre>');

              if (DiscountType === 'SC'){
                description = `Less: 20% VAT on ${DiscountData.SVatSales}`;
                data = DiscountData.SLessVat12 || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;


                description = `Net of VAT:`;
                data = DiscountData.SNetOfVat || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                description = `Less: 20%`;
                data = DiscountData.SLess20SCDiscount || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                doc.write('<pre style="margin: 0; line-height: 1;">' + receiptContent1 + '</pre>');
              }
                    
              if (DiscountType === 'TRANSACTION'){
                let totalDisCount:any = 0
                let totalDue :any = 0
                let desc_rate :any = 0

                DiscountData.map((item:any) => {
                  const total = parseFloat(item.price) * parseFloat(item.quantity) -  item.Discount
                  totalDue += total
                  totalDisCount += item.Discount
                  desc_rate = item.desc_rate
                })
              


                description = `Less: Discount ${desc_rate}%`;
                data = String(parseFloat(totalDisCount).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;
                

                description = `Amount Due:`;
                data = String(parseFloat(totalDue).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                doc.write('<pre style="margin: 0; line-height: 1;">' + receiptContent1 + '</pre>');
              }


              doc.write('<pre style="margin: 0; line-height: 1;">================================================</pre>');
              description = 'TOTAL DUE:';
              data = formattedTotalDue || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;
              receiptContent1 += '<div style="margin:-3px; padding: 0;">-------------------------------------------------</div>'
              doc.write('<pre>' + receiptContent1 + '</pre>');


              

              description = 'VATable:';
              data = dataInfo.data.VATable || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div>${description}${spaces}${data}</div>`;


              let tmp :any = "0.00"
              let vat_exempt:any = "0.00"
              if (DiscountType === 'SC'){
                tmp = parseFloat(DiscountData.SLess20SCDiscount) + parseFloat(DiscountData.SLessVat12);
                vat_exempt  = parseFloat(DiscountData.SAmountCovered) - parseFloat(tmp)
              }

              description = 'VAT Exempt:';
              data = String(parseFloat(vat_exempt).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})) || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;


              description = 'Non VAT:';
              data = dataInfo.data.NonVat|| ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;

              
              description = 'VAT Zero Rated: ';
              data = dataInfo.data.VatZeroRated|| ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;


              description = 'VAT:';
              data = dataInfo.data.VAT || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;
              doc.write('<pre>' + receiptContent1 + '================================================</pre>');
              //                    doc.write('<div> =====================================================</div>');

              description = 'TOTAL DUE:';
              data = formattedTotalDue || ''; 
              setAmountDue(formattedTotalDue)
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;

              doc.write('<pre>' + receiptContent1 + '</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');


              let CashAmount:any = dataInfo.data.CashAmount || undefined
              if (CashAmount){
                description = 'CASH:';
                const amountTenderedFormatted = Number(CashAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            
                data = String(amountTenderedFormatted) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 = `<div style="font-weight: bold;">${description}${spaces}${amountTenderedFormatted}</div>`;
                doc.write('<pre>' + receiptContent1 + '</pre>');
              }
          
            
              const creditcard:any = dataInfo.data.CreditcardData || undefined
              const debitcard:any = dataInfo.data.DebitcardData || undefined
    
  //******************************** Credit Card*********************************************** */
              if (creditcard){
                creditcard.map((items:any) => {

                  const amountDue = Number(items.AmountDue ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                  description ='Credit Card'
                  data =String(amountDue)  ;
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 = `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
    
    
                  const cardNo = items.CardNo || ''; // Ensure items.CardNo is defined, or default to empty string
                  const lastFourDigits = cardNo.slice(-4); // Get the last four digits of the card number
                  const maskedCardNo = '****-****-****-' + lastFourDigits; // Mask all but the last four digits
                  description = 'Credit Card No.';
                  data = maskedCardNo;
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
              
                  description ='Card Issuer'
                  data = items.CardIssuer || '';
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
              
    
                  
                  description ='Bank'
                  data = items.AcquireBank|| '';
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
    
                  const expiryDate = new Date(items.ExpiryYear, items.ExpiryMonth - 1);
                  const formattedExpiry = expiryDate.toLocaleString('default', { month: 'long', year: 'numeric' });
                
                  
                  description ='Expiry Date'
                  data = formattedExpiry || '';
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
    
                  description ='Card Holder'
                  data = items.CardHolder|| '';
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
                
                  doc.write('<pre>' + receiptContent1 + '</pre>');
              
                });
              }

  //******************************** Debit Card*********************************************** */
              if (debitcard){
                debitcard.map((items:any) => {

                  const amountDue = Number(items.AmountDue ).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
                  description ='Debit Card'
                  data =String(amountDue)  ;
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 = `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
    
    
                  const cardNo = items.CardNo || ''; // Ensure items.CardNo is defined, or default to empty string
                  const lastFourDigits = cardNo.slice(-4); // Get the last four digits of the card number
                  const maskedCardNo = '****-****-****-' + lastFourDigits; // Mask all but the last four digits
                  description = 'Debit Card No.';
                  data = maskedCardNo;
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
              
                  description ='Bank'
                  data = items.AcquireBank|| '';
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
    
                  const expiryDate = new Date(items.ExpiryYear, items.ExpiryMonth - 1);
                  const formattedExpiry = expiryDate.toLocaleString('default', { month: 'long', year: 'numeric' });
              
    
                  description ='Card Holder'
                  data = items.CardHolder|| '';
                  spaces = AlignmentSpace(description, data);
                  receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${data}</div>`;
                
                  doc.write('<pre>' + receiptContent1 + '</pre>');
              
                });
              }

  //******************************** Senior Citizen *********************************************** */
      let seniorD:any = dataInfo.data.SeniorDiscountDataList

      if (seniorD){
        doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
        seniorD.map((item:any) => {
          description = 'Senior Citizen ID:';
          data = item.SID || ''; 
          spaces = AlignmentSpace(description, data);
          receiptContent1 = `<div>${description}${spaces}${data}</div>`;


          description = 'Senior Fullname:';
          data = item.SName || ''; 
          spaces = AlignmentSpace(description, data);
          receiptContent1 += `<div>${description}${spaces}${data}</div>`;

          description = 'Senior TIN:';
          data = item.STIN || ''; 
          spaces = AlignmentSpace(description, data);
          receiptContent1 += `<div>${description}${spaces}${data}</div>`;

          doc.write('<pre>' + receiptContent1 + '</pre>');
      
        } )
      }






      // description = 'CHANGE:';
      // const changeAmountFormatted = Number(ChangeAmount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

      // data = String(changeAmountFormatted) || ''; 
      // spaces = AlignmentSpace(description, data);
      // receiptContent1 += `<div style="font-weight: bold;">${description}${spaces}${changeAmountFormatted}</div>`;

      // doc.write('<pre>' + receiptContent1 + '</pre>');

      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');

      
      description = 'CASHIER:';
      data = localStorage.getItem('FullName') || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div>${description}${spaces}${data}</div>`;
      


      // description = 'WAITER:';
      // data = dataInfo.data.WaiterName || ''; 
      // spaces = AlignmentSpace(description, data);
      // receiptContent1 += `<div>${description}${spaces}${data}</div>`;


      description = 'TERMINAL# ';
      data = dataInfo.data.TerminalNo
      data += '-'
      data +=  String(parseFloat(dataInfo.data.OR)).padStart(8,'0') || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${spaces}${description}${data}</div>`;

      doc.write('<pre>' + receiptContent1 + '</pre>');


      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');




      description = 'CUSTOMER NAME:';
      data = dataInfo.data.CustomerName || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div>${description}${spaces}${data}</div>`;

      description = 'COMPANY ADDRESS:';
      data = dataInfo.data.CusAddress || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;

      description = 'TIN:';
      data = dataInfo.data.CusTIN || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;


      description = 'BUSINESS STYLE:';
      data = dataInfo.data.CusBusiness || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;

      doc.write('<pre>' + receiptContent1 + '</pre>');

      doc.write('<div style="text-align: center;">');

      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      doc.write('<pre style="margin: 0; line-height: 1; font-size: 12px;"> THANK YOU COME AGAIN: </pre>');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      
      doc.write('<div> LEAD SOLUTIONS INC. </div>');

      doc.write('<div> DOOR 1 DWTC BLDG RIZAL EXTENSION </div>');
      doc.write('<div> DAVAO CITY </div>');
      doc.write('<div> 274-027-986-000</div>');
      doc.write('<div> ACCRED # 1132740279862015060320</div>');
      doc.write('<div> DATE ISSUED: 06-04-2015 </div>');
      doc.write('<div> VALID UNTIL: 07-31-2025 </div>');
      doc.write('<div> PTU NO. FP112022-110-0358595-000001 </div>');
      doc.write('<div> DATE ISSUED: 10-03-2022 </div>');

      doc.write('</div>')



    
      const qr = QRCode(0, 'H'); // QR code type and error correction level
      qr.addData('Your data for QR code'); // Replace with the data you want in the QR code
      qr.make();

      // Get the generated QR code as a data URI
      const qrDataURI = qr.createDataURL();

      // Insert the QR code image into the document
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${qrDataURI}" alt="QR Code"  style="max-width: 120px; display: inline-block;" />`);
      doc.write('</div>'); // Close the container div
      doc.close();
    // Remove the iframe after printing

    DeletePosExtendedAll()
    // triggerPrint()
    setTimeout(() => {
      iframeWindow.print();
      // window.location.reload(); 

      setOrderType('')
      setOrderTypeModal(true)
      setisSelected(null)
      // setChangeModal(true)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      setShowIframe(false)
      iframe.style.display = 'none';
      setCartItems([])
      setTableNo('')
      setDiscountData('')
      setDiscountType('')
    }, 1000); 
      // Print the receipt
    

      // Remove the iframe after printing
      // setTimeout(() => {
      //   document.body.removeChild(iframe);
      // // Reload the page after printing
      // }, 20000); // Adjust timeout as needed for printing to complete
    } };
      iframe.src = 'about:blank';
    return iframe;
    }};

    // Example data (replace with actual receipt content and logo source)
    const receiptContent = generateReceipt();
  // Replace with the actual path to your logo image

    const iframe = generateReceiptIframe(receiptContent, {logo});
  };


  //************ PRINT RECEIPT CHARGE PAYMENT*****************//
  const PrintChargePaymentReceipt = async (dataInfo:any) => {
    const generateReceiptIframe = (receiptContent: string, logoSrc: { logo: string; }) => {

    const iframe = document.getElementById('myIframe') as HTMLIFrameElement | null;


  if (iframe !== null) {

    setShowIframe(true)
    if (iframe) {
      iframe.style.display = 'block';
    }

    iframe.onload = () => {
      const currentDate = new Date();   
      const timeZone = 'Asia/Manila';  
    const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: timeZone });
      const iframeWindow = iframe.contentWindow;

      if (iframeWindow !== null) {
        const doc = iframeWindow.document;

        doc.open();
      // doc.write('<style>body { font-family: "Courier New", Courier, monospace; }</style>');
      doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');

      doc.write('<div style="width: 200px; margin:none; font-size:8px">');
      doc.write('<div>'); // Start a container div for content

      // Embed the logo image using an <img> tag
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
      doc.write('</div>');



      doc.write('<div style="text-align: center;">');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');

    

      doc.write(`<div> ${dataInfo.data.CustomerCompanyName}</div>`);


      doc.write(`<div> ${dataInfo.data.CustomerCompanyAddress}</div>`);
      doc.write(`<div> ${dataInfo.data.TelNo}</div>`);
      doc.write(`<div> ${dataInfo.data.CustomerTIN}</div>`);
      doc.write(`<div> ${dataInfo.data.SerialNO}</div>`);
      doc.write(`<div> ${dataInfo.data.MachineNo}</div>`);


      let Charge :any = dataInfo.data.Charge

      doc.write('<p style="font-size:12px">THIS SERVES AS AN CHARGE INVOICE</p>');
      doc.write('<div style="text-align: start;">');
        if (Charge){
          doc.write(`<div>Customer: ${Charge.CustomerName} </div>`);
        }
      doc.write(`<div>Table No: ${TableNo}</div>`);
      doc.write('<pre style="margin: 0; line-height: 1;">================================================</pre>');
      doc.write('</div>')

      doc.write(`<div> CI# ${parseFloat(dataInfo.data.OR)}</div>`);
      doc.write(`<div> ${formattedDateTime} </div>`);
      doc.write('</div>')
      doc.write('<pre>' + receiptContent + '</pre>');


        let receiptContent1 = '';

        const AlignmentSpace = (description: string | any[], data: string | any[]) => {
          const totalLength = 48; // Total desired length for alignment
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
        
          return ' '.repeat(spacesNeeded); // Return the string with required spaces
        };
          
          //********************************************************* */
          let description = '';
          let data = ''
          // Get the value or initialize an empty string if it's null
          let spaces = null
              data = dataInfo.data.ServiceCharge || '';
              description = 'SERVICE CHARGES:'
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-7px; padding: 0;">${description}${spaces}${data}</div>`;
              // receiptContent1 += '<div style="margin-top:-3px; padding: 0;"></div>'
            
              // doc.write('<pre>' + receiptContent1 + '</pre>');

              if (DiscountType === 'SC'){
                description = `Less: 20% VAT on ${DiscountData.SVatSales}`;
                data = DiscountData.SLessVat12 || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;


                description = `Net of VAT:`;
                data = DiscountData.SNetOfVat || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                description = `Less: 20%`;
                data = DiscountData.SLess20SCDiscount || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 += `<div>${description}${spaces}${data}</div>`;

                doc.write('<pre style="margin: 0; line-height: 1;">' + receiptContent1 + '</pre>');
              }


              doc.write('<pre style="margin: 0; line-height: 1;">================================================</pre>');
              description = 'TOTAL DUE:';
              data = formattedTotalDue || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;
              receiptContent1 += '<div style="margin:-3px; padding: 0;">-------------------------------------------------</div>'
              doc.write('<pre>' + receiptContent1 + '</pre>');



              description = 'VATable:';
              data = dataInfo.data.VATable || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div>${description}${spaces}${data}</div>`;

              description = 'VAT Exempt:';
              data = dataInfo.data.VatExempt || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;


              description = 'Non VAT:';
              data = dataInfo.data.NonVat|| ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;

              
              description = 'VAT Zero Rated: ';
              data = dataInfo.data.VatZeroRated|| ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;


              description = 'VAT:';
              data = dataInfo.data.VAT || ''; 
              spaces = AlignmentSpace(description, data);
              receiptContent1 += `<div>${description}${spaces}${data}</div>`;
              doc.write('<pre>' + receiptContent1 + '================================================</pre>');
              //                    doc.write('<div> =====================================================</div>');

              description = 'TOTAL DUE:';
              data = formattedTotalDue || ''; 
              setAmountDue(formattedTotalDue)
              spaces = AlignmentSpace(description, data);
              receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;

              doc.write('<pre>' + receiptContent1 + '</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');



              if (Charge){
                description = 'CHARGE TO ACCOUNT:';
                const amountTenderedFormatted = Charge.Amountdue;
            
                data = String(amountTenderedFormatted) || ''; 
                spaces = AlignmentSpace(description, data);
                receiptContent1 = `<div style="font-weight: bold;">${description}${spaces}${amountTenderedFormatted}</div>`;
                doc.write('<pre>' + receiptContent1 + '</pre>');
              }
          
          
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');

      
      description = 'CASHIER:';
      data = localStorage.getItem('FullName') || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div>${description}${spaces}${data}</div>`;
      
      description = 'TERMINAL# ';
      data = dataInfo.data.TerminalNo
      data += '-'
      data +=  String(parseFloat(dataInfo.data.OR)).padStart(8,'0') || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${spaces}${description}${data}</div>`;

      doc.write('<pre>' + receiptContent1 + '</pre>');


      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      doc.write('<div style="text-align: center;" >')      
      doc.write('<input type="text" style="border: none; border-bottom: 1px solid black; margin: 0; line-height: 1;">');
      doc.write('<label>Approved By</label>');

      doc.write('<input type="text" style="border: none; border-bottom: 1px solid black; margin: 0; line-height: 1;">');
      doc.write('<div style="display: flex; flex-direction:column" >')    
      doc.write('<label>Customers Acknowledgement</label>');
      doc.write('<label>(Signature over printed name)</label>');
      doc.write('</div>') 
      doc.write('</div>')  

      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      description = 'CUSTOMER NAME:';
      data = dataInfo.data.CustomerName || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 = `<div>${description}${spaces}${data}</div>`;

      description = 'COMPANY ADDRESS:';
      data = dataInfo.data.CusAddress || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;

      description = 'TIN:';
      data = dataInfo.data.CusTIN || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;


      description = 'BUSINESS STYLE:';
      data = dataInfo.data.CusBusiness || ''; 
      spaces = AlignmentSpace(description, data);
      receiptContent1 += `<div>${description}${spaces}${data}</div>`;

      doc.write('<pre>' + receiptContent1 + '</pre>');

      doc.write('<div style="text-align: center;">');

      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      doc.write('<pre style="margin: 0; line-height: 1; font-size: 12px;"> THANK YOU COME AGAIN: </pre>');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
      
      doc.write('<div> LEAD SOLUTIONS INC. </div>');

      doc.write('<div> DOOR 1 DWTC BLDG RIZAL EXTENSION </div>');
      doc.write('<div> DAVAO CITY </div>');
      doc.write('<div> 274-027-986-000</div>');
      doc.write('<div> ACCRED # 1132740279862015060320</div>');
      doc.write('<div> DATE ISSUED: 06-04-2015 </div>');
      doc.write('<div> VALID UNTIL: 07-31-2025 </div>');
      doc.write('<div> PTU NO. FP112022-110-0358595-000001 </div>');
      doc.write('<div> DATE ISSUED: 10-03-2022 </div>');

      doc.write('</div>')



    
      const qr = QRCode(0, 'H'); // QR code type and error correction level
      qr.addData('Your data for QR code'); // Replace with the data you want in the QR code
      qr.make();

      // Get the generated QR code as a data URI
      const qrDataURI = qr.createDataURL();

      // Insert the QR code image into the document
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${qrDataURI}" alt="QR Code"  style="max-width: 120px; display: inline-block;" />`);
      doc.write('</div>'); // Close the container div
      doc.close();
    // Remove the iframe after printing

    DeletePosExtendedAll()
    // triggerPrint()
    setTimeout(() => {
      iframeWindow.print();
      // window.location.reload(); 

      setOrderType('')
      setOrderTypeModal(true)
      setisSelected(null)
      // setChangeModal(true)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      setShowIframe(false)
      iframe.style.display = 'none';
      setCartItems([])
      setTableNo('')
      setDiscountData('')
      setDiscountType('')
    }, 1000); 

    } };
      iframe.src = 'about:blank';
    return iframe;
    }};

    // Example data (replace with actual receipt content and logo source)
    const receiptContent = generateReceipt();
  // Replace with the actual path to your logo image

    const iframe = generateReceiptIframe(receiptContent, {logo});
  };


  //************ PRINT CASH BREAKDOWN*****************//

  const PrintCashBreakDown = (dataDinomination:any,dataInfo:any) => {
    const generateReceiptIframe = (logoSrc: { logo: string; }) => {
      const iframe = document.getElementById('myIframe') as HTMLIFrameElement | null;

  if (iframe !== null) {

    setShowIframe(true)
    if (iframe) {
      iframe.style.display = 'block';
    }

    iframe.onload = () => {
      const currentDate = new Date();   
    //  const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: 'UTC+08:00' });

    const currentYear = currentDate.getFullYear();
    const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding padding to month
    const currentDay = currentDate.getDate().toString().padStart(2, '0'); // Adding padding to day
    


    let currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
    let amPmIndicator = 'AM';

  // Convert to 12-hour format and determine AM/PM
  if (currentHours >= 12) {
    amPmIndicator = 'PM';
  }
  if (currentHours > 12) {
    currentHours -= 12;
  }

    const date = `${currentMonth}/${currentDay}/${currentYear}`
    const time = `${currentHours}:${currentMinutes}:${currentSeconds} ${amPmIndicator}`

      const iframeWindow = iframe.contentWindow;

      if (iframeWindow !== null) {
        const doc = iframeWindow.document;
        doc.open();
      doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');

      doc.write('<div style="width: 200px; margin:none; font-size:8px">');
      doc.write('<div>'); // Start a container div for content

      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
      doc.write('</div>');



      doc.write('<div style="text-align: center;">');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');

    

      doc.write(`<div> ${dataInfo.CustomerCompanyName}</div>`);


      doc.write(`<div> ${dataInfo.CustomerCompanyAddress}</div>`);
      doc.write(`<div> ${dataInfo.TelNo}</div>`);
      doc.write(`<div> ${dataInfo.CustomerTIN}</div>`);
      doc.write(`<div> ${dataInfo.SerialNO}</div>`);
      doc.write(`<div> ${dataInfo.MachineNo}</div>`);



      let receiptContent1 = '';

      const AlignmentSpace = (description: string | any[], data: string | any[]) => {
        const totalLength = 28; // Total desired length for alignment
        const contentLength = description.length + data.length; // Calculate the length of the combined content
        const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces

        return ' '.repeat(spacesNeeded); // Return the string with required spaces
      };

      const AlignmentSpace3 = (description: string | any[], data: string | any[]) => {
        const totalLength = 48; // Total desired length for alignment
        const contentLength = description.length + data.length; // Calculate the length of the combined content
        const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces

        return ' '.repeat(spacesNeeded); // Return the string with required spaces
      };

      const AlignmentSpace2 = (description: string | any[], data: string | any[]) => {
        let totalLength = 32; 

        if (description.length == 12 ){
          totalLength = totalLength - 1
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }
        if (description.length == 11 ){
          totalLength = totalLength - 2
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }

        if (description.length == 10 ){
          totalLength = totalLength - 3 
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }

        if (description.length == 9 ){
        totalLength = totalLength - 4
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }

        if (description.length == 8 ){
          totalLength = totalLength - 5
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }

        if (description.length == 7 ){
          totalLength = totalLength - 6 
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }

      };
        
        //********************************************************* */
        let description = '';
        let dinomination = ''
        let totaldinomination = ''
        // Get the value or initialize an empty string if it's null
        let spaces = null
        let spaces2 = null
        let data1 =''
        doc.write('</div>')


        spaces = AlignmentSpace3(date, time);
        receiptContent1 = `<div>${date}${spaces}${time}</div>`;
        doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

      description = 'Terminal No.: ';
      data1 = dataInfo.TerminalNo
      spaces = AlignmentSpace3(description, data1);
      receiptContent1 = `<div>${spaces}${description}${data1}</div>`;
      doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');


      doc.write('<div style="text-align: center;">');

      
      if (cashBreakDownType ==='END SHIFT'){
        doc.write('<p style="font-size:12px">CASH COUNT</p>');
      }else{
        doc.write('<p style="font-size:12px">CASH PULL-OUT</p>');
      }

  


      doc.write('</div>')

      
  


              description = 'CASHIER:';
              data1 = localStorage.getItem('FullName') || ''; 
              spaces = AlignmentSpace3(description, data1);
              receiptContent1 = `<div>${description} ${data1}${spaces}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">Qty               Denomination           Total</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
              dinomination = dataDinomination.dinomination.OneThousand  || '0';
              totaldinomination =(dataDinomination.Totaldenominations?.TotalOneThousand || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '1,000.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1 ;"> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

              dinomination = dataDinomination.dinomination.Fivehundred  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalFivehundred || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '500.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

              dinomination = dataDinomination.dinomination.Twohundred  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalTwohundred || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '200.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');


              dinomination = dataDinomination.dinomination.Onehundred  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalOnehundred || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '100.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');



              dinomination = dataDinomination.dinomination.Fifty  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalFifty || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '50.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

              
              dinomination = dataDinomination.dinomination.Twenty  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalTwenty || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '20.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

              dinomination = dataDinomination.dinomination.Ten  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalTen || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '10.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

              dinomination = dataDinomination.dinomination.Five  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalFive || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '5.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');


              dinomination = dataDinomination.dinomination.Peso  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalPeso || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '1.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

              
              dinomination = dataDinomination.dinomination.Cent25  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalCent25 || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '0.25 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');

              dinomination = dataDinomination.dinomination.Cent05  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalCent05 || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '0.05 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');


              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
              totaldinomination = (dataDinomination.Totaldenominations.TotalCashbreakDown || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = 'Grand Total:'
              spaces = AlignmentSpace3(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; ">${description}${spaces}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">================================================</pre>');
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<div style="text-align: center;">');
              doc.write('<p style="margin: 0; line-height: 1;">_____________________________</p>');
              doc.write('<p style="margin: 0; line-height: 1;">Terminal Cashier</p>');
              doc.write('</div>')
      
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<div style="text-align: center;">');
              doc.write('<p style="margin: 0; line-height: 1;">_____________________________</p>');
              doc.write('<p style="margin: 0; line-height: 1;">Treasury Personnel</p>');
              doc.write('</div>')
          


      const qr = QRCode(0, 'H'); // QR code type and error correction level
      qr.addData('Your data for QR code'); // Replace with the data you want in the QR code
      qr.make();

      // Get the generated QR code as a data URI
      const qrDataURI = qr.createDataURL();

      // Insert the QR code image into the document
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${qrDataURI}" alt="QR Code"  style="max-width: 120px; display: inline-block;" />`);
      doc.write('</div>'); // Close the container div
      doc.close();
      // triggerPrint()
    setTimeout(() => {
      iframeWindow.print();
      // window.location.reload(); 
    
      setOrderType('')
      setOrderTypeModal(true)
      setisSelected(null)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      setShowIframe(false)
      iframe.style.display = 'none';
      setCartItems([])
      setTableNo('')
    }, 1000); 

    } };
      iframe.src = 'about:blank';
    return iframe;
    }};

    const iframe = generateReceiptIframe({logo});
  }

  const closeCashPayment = async () => {
    swalWithBootstrapButtons.fire({
      title: 'Confirmation',
      text: "Do you want Abort Payment Transaction?",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {

    
        setCashPaymentEntryModal(false)
        // setOrderTypeModal(true)
        setPaymentOpenModal(true)
       
        setTimeout(() => {
          if (CashPaymentRef.current){
            CashPaymentRef.current?.focus();
            CashPaymentRef.current.style.backgroundColor = 'blue';
            setisFocus(0)
          }
      
        }, 50);
          DeletePosExtendedAll()

      }})

  }


  const PaymentModalHandleKeydown = (event:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) => {
    event.preventDefault();
    if (event.key == 'ArrowRight' || event.key == 'ArrowDown') {
        NextRef.current.focus();
        NextRef.current.style.backgroundColor = 'blue';
        CurrentRef.current.style.backgroundColor = 'white';
        if (index == 8) {
          setisFocus(0)
        }else {
          setisFocus(index + 1)
        }
    

    }

    if (event.key == 'ArrowLeft' || event.key == 'ArrowUp'){
      BackRef.current.focus();
      BackRef.current.style.backgroundColor = 'blue';
      CurrentRef.current.style.backgroundColor = 'white';
      setisFocus(index - 1)

  }

  if (event.key == 'Enter'){
    if (index == 0){
        CashPayment();
    }
    if (index == 1){
      OpenCreditCardPayment()
    }
    if (index == 2){
    OpenDebitCardPayment()
    }
    if (index == 3){
      OpenMultiplePayment()
    }
    if (index == 4){
      OpenChargeModal()
    }
    if (index == 5){
      OpenGiftCheckPayment()
    }
    if (index == 6){
      OpenOnlinePayment()
    }
    if (index == 7){
      OpenOtherPayment()
    }
    if (index == 8){
      CloseModal()
    }
  }

  }
  const OrderTypeHandleKeydown = (event:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) => {
    event.preventDefault();
    if (event.key == 'ArrowRight' || event.key == 'ArrowDown') {
        NextRef.current.focus();
        NextRef.current.style.backgroundColor = 'blue';
    
        if (index == 1) {
          setisFocus(0)
        }else {
          setisFocus(index + 1)
        }
    

    }

    if (event.key == 'ArrowLeft' || event.key == 'ArrowUp'){
      BackRef.current.focus();
      BackRef.current.style.backgroundColor = 'blue';

      setisFocus(index - 1)

  }

  if (event.key == 'Enter'){
    if (index == 0){
        handleDineIn();
    }
    if (index == 1){
      handleTakeOut()
    }
  }

  }


  const TableNoHandleKeydown = (event:any) => {
    if (event.key == 'Enter'){
      SelectTableOk(TableNo)
    }
  }

  const SelectTransTypeHandleKeydown = (event:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) => {
    event.preventDefault();
    if (event.key == 'ArrowRight' || event.key == 'ArrowDown') {
        NextRef.current.focus();
        NextRef.current.style.backgroundColor = 'blue';
    
        if (index == 1) {
          setisFocus(0)
        }else {
          setisFocus(index + 1)
        }
    

    }

    if (event.key == 'ArrowLeft' || event.key == 'ArrowUp'){
      BackRef.current.focus();
      BackRef.current.style.backgroundColor = 'blue';

      setisFocus(index - 1)

  }

  if (event.key == 'Enter'){
    if (index == 0){
        AddOrdertable();
    }
    else if (index == 1){
      SettleOrdertable()
    }
    else if (index == 2){
      TransferOrdertable()
    }
    else if (index == 3){
      Cleartable()
    }
    else if (index == 4){
      CloseModal()
    }
  }

  }

  const HandleAddtocart = (event:any) => {

    if (event.key =='Enter'){
      event.preventDefault();
      addtocarts();
    }

    if (event.key =='ArrowUp'){
      event.preventDefault();
      addQuantity();
    }
    if (event.key =='ArrowDown'){
      event.preventDefault();
      MinusQuantity();
    }
    if (event.key == 'Escape'){
      CloseAddOrderModal();
    }

    

  }


  const HandleUpdatetocart = (event:any) => {

    if (event.key =='Enter'){
      event.preventDefault();
      onUpdateToCart();
    }

    if (event.key =='ArrowUp'){
      event.preventDefault();
      addQuantity();
    }
    if (event.key =='ArrowDown'){
      event.preventDefault();
      MinusQuantity();
    }
    if (event.key == 'Escape') {
      onClose();
    }
    if (event.key == 'Delete') {
      setEditOrderModal(false)
      OpenVireficationEntry('Delete Order')
    }

  }

  const CategoryHideClick = () => {
    setCategoryHide(!categoryHide); // Toggle the category visibility
  };


  const ChangeModalClose = () => {
    setChangeModal(false)
    setTimeout(() => {
      if (DineInRef.current) {
        DineInRef.current.focus();
      }
    }, 100);

  }


  const showOnScreenKeybaord = (ref:any) => {
  if (isDesktop){

    if (ref==='SuspendCustomer'){
      setfocusedValue(SuspendCustomerData.Customer)
    } else if (ref==='SuspendAddress'){
      setfocusedValue(SuspendCustomerData.CusAddress)
    }else if (ref==='LockPassword'){
      setfocusedValue(LockPassword)
    }


      setisShowKeyboard(true)
      setFocusedInput(ref)
  }
  }
  const ShowKeyorNot = () => {
    setisShow(!isShow);
  }

  const setvalue = (value: any) => {
    if (focusedInput) {
    if (focusedInput==='SuspendCustomer'){
      setSuspendCustomerData((prev:any) => ({...prev,Customer:value}))
    } else if (focusedInput==='SuspendAddress'){
      setSuspendCustomerData((prev:any) => ({...prev,CusAddress:value}))
    }else if (focusedInput==='LockPassword'){
      setLockPassword(value)
    }
    setisShowKeyboard(false)
    setisShowKeyboardNumeric(false)
    setisShowKeyboardNumericForCardNo(false)
  }
  }
  const closekeyBoard = () => {
    setisShowKeyboard(false)
    setisShowKeyboardNumeric(false)
    setisShowKeyboardNumericForCardNo(false)
  }


  const updateScreenSize = () => {
    setScreenWidth(window.innerWidth);
    setScreenHeight(window.innerHeight);
    console.log(window.innerWidth)
    // setDevicePixelRatio(window.devicePixelRatio);
  };

  useEffect(() => {
    window.addEventListener('resize', updateScreenSize);

    return () => {
      window.removeEventListener('resize', updateScreenSize);
    };
  }, []);


  useEffect(() =>{
  if (OrderType === 'TAKE OUT'){
    setPaymentDiscountOpenModal(true)
  }
  },[OrderType,CustomerOrderInfo])




  return (
    <>
      
      <Grid container
            className='Restaurant-trans'
            style={{ height: '100vh',border:'1px solid'}}
            spacing={0.1}
            justifyContent="space-between" >
     
      {loadingPrint && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  zIndex: 9999,
                  pointerEvents:'auto',
                }}
              >
                <ClipLoader color="#4a90e2" loading={loadingPrint} size={50} />
              </div>
      )}

      <div style={overlayStyle} />

      <Grid item xs={12} md={2} style={{ height: categoryHide ? '100%': '15%',width:'35%'}}>
            <div className="Category">
                <Typography      
                  sx={{
                  fontSize: { xs: '1.2rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.6rem' },
                  color: '#ffffff',backgroundColor: '#007bff',
                  padding: '10px',textShadow: ' 0 0 3px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,2)',
                  borderRadius: '5px',margin: '2px',
                  fontWeight: 'bold', textAlign: 'center',
                  justifyContent: 'space-between', // Aligns items at the start and end of the flex container
                  alignItems: 'center', // Aligns items at the center of the flex container
                  }}>
                  Category Section
                  </Typography>

                  <div className='Category-container' style={{overflowY:'auto',overflow:'hidden',maxHeight:'90vh', border: ' 1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '2px' }}>
                        {isMobile && (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',height:'20px'}}>
                                
                                
                                {categoryHide ? (
                                  <div style={{ marginBottom: '20px' }}>
                                    <FontAwesomeIcon icon={faAngleDoubleDown} style={{ position: 'absolute', margin: '5px', cursor: 'pointer', fontSize: '20px' }} onClick={CategoryHideClick} />
                                  </div>
                                ) : (
                                  <FontAwesomeIcon icon={faAngleDoubleUp} style={{ position: 'absolute', cursor: 'pointer', fontSize: '20px' }} onClick={CategoryHideClick} />
                                )}
                              
                          </div>
                      )}   

                      <div style={{display: categoryHide ? 'block':'none',height:'100%'}}>
                      <CategoryGrid category={category} onReceiveProducts={handleProductsFromCategory} IsModalOpen={IsModalOpen} />
                      </div>

                </div>

            </div>
      </Grid>


      <Grid item xs={12} md={7} style={{ height: '100%',width:'100%'}}>
            <div className="Product">
                <Typography      
              sx={{
              fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.6rem' },
              color: '#ffffff',backgroundColor: '#007bff',
              padding: '10px',textShadow: ' 0 0 3px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,2)',
              borderRadius: '5px',margin: '2px',
              fontWeight: 'bold', textAlign: 'center',
              justifyContent: 'space-between',}}>
              Product Section
                </Typography>
              

        
                <div className='Product-container' style={{ overflowY: 'auto',overflow:'hidden',height: '90vh', border: ' 1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '2px' }}>
                  <ProductGrid products={products} addtocart={addToCart} selectedProductData={selectedProductData} isSelected ={isSelected} OrderTypeModal = {OrderTypeModal} />
                
                </div>
              </div>
      </Grid>

      <iframe id="myIframe" style={{position:'absolute',display:'none',backgroundColor:'#ffff',height:'90%',marginTop:'10px',width:'25%',

      marginLeft:'35%',borderRadius:'10px', zIndex: '9999'}} src=''></iframe>

      <Grid item xs={12} md={3} style={{ height: '100%',width:'60%'}}>
            <div className='Transaction-container' style={{ height: '95%'}}>
                <Typography      
                    sx={{
                    fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1rem', lg: '1.1rem', xl: '1.6rem' },
                    color: '#ffffff',backgroundColor: '#007bff',
                    padding: '10px',textShadow: ' 0 0 3px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,2)',
                    borderRadius: '5px',margin: '2px',
                    fontWeight: 'bold', textAlign: 'center',}}>
                      {QueNo !== '' ? 
                      `TAKE OUT QUE NO. ${parseInt(QueNo)}`
                      :
                      (OrderType === 'TAKE OUT' ? 'TAKE OUT' : `${OrderType} Table No. ${TableNo}`)
                      }
                </Typography>
              
                <Transaction cartitems={cartItems} setcartitems={setCartItems} totaldue={calculateTotalDue()} EditOrderList={EditOrderList} DiscountData ={DiscountData} DiscountType ={DiscountType}/>

                <Typography sx={{
                fontSize: { xs: '0.8rem', sm: '0.8rem', md: '.8rem', lg: '.9rem', xl: '1.2rem' },
                fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue', color: 'blue',
                  padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: '5px'
                }}>Total Amount Due: Php {formattedTotalDue}</Typography>

                {/* <div className="actionButtons"> */}
                <div style={{ display: 'flex', flexDirection:'column', gap: '5px', margin: '5px',height:'32%'}}>
                    <div style={{ display: 'flex', flexDirection:'row',height:'50%' }}>


                        {DineIn || userRank == 'Salesman' ? (

                            <Button
                              style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                                display: 'flex',flexDirection: 'column',alignItems: 'center',
                                borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                                borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                              onClick={SaveOrderClick}
                              fullWidth >
                              <Typography
                                variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                                fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                                fontWeight: 'bold', color: 'blue',textAlign: 'center',
                                }}>   Save Order
                              </Typography>
                              <img src={SaveOrder} alt="Sales Order"
                                style={{
                                  maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto',
                                }}
                              />
                            </Button>
                      

                

                        ) : (

                          (isDesktop ? 
                            <Button
                              style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                                display: 'flex',flexDirection: 'column',alignItems: 'center',
                                borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                                borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                              onClick={PaymentClick}
                              fullWidth >
                              <Typography
                                variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                                fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                              fontWeight: 'bold', color: 'blue',textAlign: 'center',
                                }}> Payment
                              </Typography>
                              <img src={Selectpayment} alt="Sales Order" style={{
                                  maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto', }} />
                            </Button>
                            :
                            <Button
                            style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                              display: 'flex',flexDirection: 'column',alignItems: 'center',
                              borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                              borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                            onClick={SaveOrderClick}
                            fullWidth >
                            <Typography
                              variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                              fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                            fontWeight: 'bold', color: 'blue',textAlign: 'center',
                              }}> Save Take Out
                            </Typography>
                            <img src={Selectpayment} alt="Sales Order" style={{
                                maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto', }} />
                          </Button>
                            )
                  
                          )}
              
                              <Button
                                style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                                  display: 'flex',flexDirection: 'column',alignItems: 'center',
                                  borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                                  borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                                onClick={BacktoHome}
                                fullWidth >
                                <Typography
                                  variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                                  fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                                fontWeight: 'bold', color: 'blue',textAlign: 'center',
                                  }}> Home
                                </Typography>
                                <img src={HomeImage} alt="Sales Order"
                                  style={{
                                    maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto',
                                  }}
                                />
                              </Button>
      
                              <Button
                                style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                                  display: 'flex',flexDirection: 'column',alignItems: 'center',
                                  borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                                  borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',zIndex: OrderTypeModal ? OpenLockModal ? '0': '1':'0'}}
                                onClick={OtherCommand}
                                fullWidth >
                                <Typography
                                  variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                                  fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                                  fontWeight: 'bold', color: 'blue',textAlign: 'center',
                                  }}> Other Command
                                </Typography>
                                <img src={OtherCommandImage} alt="Sales Order"
                                  style={{
                                    maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto',
                                  }}
                                />
                              </Button>
                          
                    </div> 
                      
                    <div style={{ display: 'flex', flexDirection:'row',height:'50%'}}>

                          <Button
                            style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                              display: 'flex',flexDirection: 'column',alignItems: 'center',
                              borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                              borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                            onClick={ChangeOrderType}
                            fullWidth >
                            <Typography
                              variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                              fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                              fontWeight: 'bold', color: 'blue',textAlign: 'center',
                              }}>   Change Type
                            </Typography>
                            <img src={ChangeOderTypeImage} alt="Sales Order"
                              style={{
                                maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto',
                              }}
                            />
                          </Button>
                  

                { userRank == 'Cashier' && (
                          <Button
                            style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                              display: 'flex',flexDirection: 'column',alignItems: 'center',
                              borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                              borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',
                              zIndex: OrderTypeModal ? OpenLockModal ? '0': '1':'0'}}
                            onClick={(e) => OpenVireficationEntry('Reprint')}
                            fullWidth >
                            <Typography
                              variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                              fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                            fontWeight: 'bold', color: 'blue',textAlign: 'center',
                              }}> Reprint
                            </Typography>
                            <img src={ReprintImage} alt="Sales Order"
                              style={{
                                maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto',
                              }}
                            />
                          </Button>
                    )}
                          <Button
                            style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                              display: 'flex',flexDirection: 'column',alignItems: 'center',
                              borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                              borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                              onClick={(e) => OpenVireficationEntry('Refresh')}
                            fullWidth >
                            <Typography
                              variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                              fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                                fontWeight: 'bold', color: 'blue',textAlign: 'center',
                              }}> Refresh
                            </Typography>
                            <img src={RefreshImage} alt="Sales Order"
                              style={{
                                maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto',
                              }}
                            />
                          </Button>
                      
                    </div>
                </div>
            </div>

      </Grid>  
            
            
      {/* </div> */}
      {CustomerDineInModal && <CustomerDineIn handleclose={CloseCustomerDineInModal} typeandtable={TypeAndTable}  handlemodaldata={CutomerInfoEntry} isDineIn={DineIn} />}
      {SalesOrderListOpenModal && <ListOfDineInSalesOrder handleclose={CloseSalesOrderListOpenModal}  settlebillData = {settlebillData} tableno={TableNo} queno={QueNo}/>}
      {/* {ReceiptOpenModal && <Receipt handleclose={CloseSalesOrderListOpenModal} cartitems={cartItems} />} */}
      {CashPaymentEntryModal && <CashPaymentEntry handleClose={closeCashPayment} amountdue={formattedTotalDue} amounttendered={SaveCashPayment}/>}
      {CustomeryPaymentModal && <CustomerPayment handlemodaldata={CutomerInfoEntryPaymnet} handleClose={CloseCustomerPaymentModal}/>}
      {ReprintTransactionModal && <ReprintTransaction handleClose={CloseReprintTransactionModal} PrintTransactionData={ReprintTransactionReceipt}/>}
      {CashBreakDownModal && <CashBreakDown CashBreakDownDataList ={CashBreakDownDataList} CloseCashBreakDownModal={CloseCashBreakDownModal} type={cashBreakDownType}/>}
      {ChargeToModal && <ChargeTo handleClose={CloseChargeModal} amountdue={formattedTotalDue} chargedata={Chargedata} />}
      {CreditCardPaymentModal && <CreditCardPayment handleClose={CloseCreditCardPayment} amountdue={formattedTotalDue} CreditCardPayment ={CreditCardPaymentOk}/>}
      {CreditCardPaymentEntryModal && <CreditCardPaymentEntry handleClose={CloseCreditCardPaymentEntryModal} amountdue={formattedTotalDue} amounttendered={SaveCreditCardPayment} />}
      {DebitCardPaymentModal && <DebitCardPayment handleClose={CloseDebitCardPayment} amountdue={formattedTotalDue} debitcardpayment ={DebitCardPaymentOK}/>}
      {DebitCardPaymentEntryModal && <DebitCardPaymentEntry handleClose={CloseDebitCardPaymentEntryModal} amountdue={formattedTotalDue} amounttendered={SaveDebitCardPayment} />}
      {MultiplePamentEntryModal && <MultiplePayments handleclose = {CloseMultiplePayment} totalDue = {formattedTotalDue} MultiplepaymentsList = {SaveMultiplePayments}/>}
     
      {GiftCheckPaymentModal && <GiftCheckPaymentTransModal handleClose={CloseGiftCheckPayment} amountdue={formattedTotalDue} GiftCheckPayment ={GiftCheckPaymentOk}/>}                    
      {GiftCheckPaymentEntryModal && <GIftCheckPaymentEntryModal handleClose={CloseGiftCheckPaymentEntryModal} amountdue={formattedTotalDue} amounttendered={SaveGiftCheckPayment} />}
      
      {OnlinePaymentModal && <OnlinePaymentTransModal handleClose={CloseOnlinePayment} amountdue={formattedTotalDue} OnlinePayment ={OnlinePaymentOk}/>}                    
      {OnlinePaymentEntryModal && <OnlinePaymentEntryTransModal handleClose={CloseOnlinePaymentEntryModal} amountdue={formattedTotalDue} amounttendered={SaveOnlinePayment} />}
      {OtherPaymentModal && <OtherPaymentTransModal handleClose={CloseOtherPayment} amountdue={formattedTotalDue} OtherPayment ={OtherPaymentOk}/>}                    
      {OtherPaymentEntryModal && <OtherPaymentEntryTransModal handleClose={CloseOtherPaymentEntryModal} amountdue={formattedTotalDue} amounttendered={SaveOtherPayment} />}
    

       {isLoading ? <InProgressLoading/> : 
        <>
      {OpenVireficationModal && <Verification handleClose={CloseVerification} VerificationEntry={OKVerification}/>}
        </>}
      {OpenSeniorCitezenDiscountModal && <SeniorCitezenDiscount handleClose={CloseSeniorCitezenDiscount} SeniorData={SaveSeniorCitezenDiscount} 
                                                    amountcover={formattedTotalDue} SeniorOrderData={cartItems}/>}
      {OpenItemDiscountModal && <ItemDiscounts handleClose={CloseItemDiscountsEntry}  SelectedItemDiscount={SelectedItemDiscount} DiscountedData={SaveItemDiscountEntry}/>}

      {OpenTradeDiscountModal && <TradeDiscountList handleClose={CloseTradeDiscountsEntry} SalesOrderListings ={cartItems} TradeData={SaveTradessDiscountEntry}/>}
      {OpenTransactionDiscountModal && <TransactionDiscount handleClose={CloseTransactionDiscountsEntry} SalesOrderListings ={cartItems} TransactionData={SaveTransactionDiscountEntry}/>}
      {OpenlistOfTransactionModal && <ListOfTransaction handleclose = {CloseCancellTransactionModal} data={SaveCancellTransaction}/>}

      {/* if (CustomerDineInModal || SalesOrderListOpenModal || CashPaymentEntryModal || CustomeryPaymentModal) */}



      {OrderTypeModal && (
                <div className="modal-order">
                  <div className="modal-content" style={deviceType === 'Desktop' ? { width: '450px' ,display:'flex',flexDirection:'column' } : { width: '320px',display:'flex',flexDirection:'column' }}>

              <Typography
                  align="center"
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',border: '2px solid #4a90e2',borderRadius: '10px',
                    padding: '10px',color: 'blue !important',fontWeight:'bold'
                  }}
                >
                Choose Order Type
              </Typography>

                    <Button className="button-dine-in" onClick={handleDineIn} 
                      ref={DineInRef}
                      onKeyDown={(e)=> OrderTypeHandleKeydown(e,TakeOutRef,DineInRef,TakeOutRef,0)}>
                        <Typography      
                          sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                          color: '#ffffff',backgroundColor: '#007bff',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                          borderRadius: '5px',fontWeight: 'bold', textAlign: 'center',}}>
                          Dine In
                        </Typography>
                    </Button>

                    <Button className="button-take-out"onClick={handleTakeOut} 
                          onKeyDown={(e)=> OrderTypeHandleKeydown(e,DineInRef,TakeOutRef,DineInRef,1)}
                    ref={TakeOutRef}
                    >
                    <Typography      
                      sx={{
                      fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                      color: '#ffffff',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                      borderRadius: '5px',
                      fontWeight: 'bold', textAlign: 'center',}}>
                    Take Out
                    </Typography>
                  </Button>
                  

                  </div>
                </div>
              )}


 {isLoading ? <InProgressLoading/> : 
 <>
      { tableNoModal && (
        <div className="modal" >
          <div className="modal-contentTable"  >

      {/* <div onKeyDown={handleDivInput} tabIndex={0} ref={TableNoModalRef}> */}


          {isDesktop ? (        
                    <>
                      <h1>{showTable ? `SELECT TABLE ${TableNo}` : 'SELECT QUE NO.'} </h1>
                      <input
                      type="text"
                      ref={showTable ? TableNoRef : QueNoRef}
                      inputMode="numeric"
                      placeholder={showTable ? 'Table No' : 'QUE NO.'}
                      style={{ width: '100%', margin: '5px', textAlign: 'center' }}
                      value={showTable ? TableNo : QueNo}
                      onChange={(e) => {
                        const value = e.target.value;
                        const isNumber = /^[0-9]*$/;
                          if (isNumber.test(value)) {
                            (showTable ? setTableNo(e.target.value) : setQueNo(e.target.value)) } 
                          }}

                      onKeyDown={(e) => TableNoHandleKeydown(e)}
                    />

                    </>

                      ):(
                          <><h1>{showTable ? `SELECT TABLE ${TableNo}` : 'SELECT QUE NO.'}</h1>
                          <div style={{margin:'5px',display:'flex',flexDirection:'row'}}>
                            <input type="text" ref={TableNoRef} inputMode="numeric" placeholder="Table No" style={{width:'100%' ,margin:'5px'}} defaultValue={TableNo}  onChange={(e) => setTableNo(e.target.value)}/>
                            <button className="btn" style={{width:'100%',height:'40px',margin:'5px'}} onClick={() => SelectTableOk(TableNo)}>OK</button>
                          </div></>
                        
                      )}


            

        {/* <div className='containertable' style={{display:'flex',flexDirection:'row'}}> */}

        <Grid container spacing={2}>
            <Grid item xs={12} md={7} style={{ height: '100%',width:'100%'}}>
              <div style={{overflow:'auto',height: '80%',width:'100%'}}>

                <div style={{ display: 'grid', gridTemplateColumns: isDesktop? `repeat(${TableColPerRows}, minmax(15%, 1fr))`: `repeat(${TableColPerRows}, minmax(33%, 1fr))`, 
                      gap: '2px' ,margin:'5px',overflow:'auto',height: '590px',
                      border: '2px solid #4a90e2',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',padding:'5px',borderRadius:'10px'}}>
                {loading && (
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '37%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    zIndex: 999,
                  }}
                >
                  <ClipLoader color="#4a90e2" loading={loading} size={50} />
                </div>
                )}
                {showTable ? (
                
                      (TableList &&  TableList.map((item:any) => (
                          <div key={item.table_count} className={item.Paid} onClick={() => SelectTable(item)}
                            style={{border: '1px solid #4a90e2',padding: '4px',height: '100%', display: 'flex',flexDirection: 'column',justifyContent:'space-evenly',
                              alignItems: 'center',borderRadius: '10px',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                              cursor:TableOnprocess === item.table_count ? 'not-allowed': 'pointer',
                              backgroundColor: item.Susppend === 'YES' || item.dinein_order_and_pay ==='Y' ? 'red' :TableOnprocess === item.table_count ? 'yellow' : item.Paid  === 'N' ? 'blue' : '', }}>
                              <Typography key={item.table_count} style={{ textShadow: '0 0 1px rgba(0,0,0,1), 0 1px 3px rgba(0,0,0,2)', transform: 'translateZ(5px)' , 
                                fontSize: item.Susppend === 'YES' ? '10px' : TableOnprocess === item.table_count ? '10px':'20px'
                              ,fontWeight:'bold' ,color: item.Susppend === 'YES' || item.dinein_order_and_pay ==='Y' ? 'white': TableOnprocess === item.table_count ? 'blue':item.Paid  === 'N' ? 'white':'blue' }}>
                              {item.dinein_order_and_pay ==='Y'? `Billed ${item.table_count}`: item.Susppend === 'YES' ? `Suspend ${item.table_count}`  :TableOnprocess === item.table_count ? `On going ${item.table_count}` : item.table_count} </Typography>
                              <img src= {table} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />

                          </div>
                            )))

                            ):(
                            
                              (QueList && QueList.map(item => (
                                <div  key={item.q_no} className={item.Paid} onClick={() => SelectQue(item)}
                                  style={{border: '1px solid #4a90e2',padding: '5px',height: '100px', display: 'flex',flexDirection: 'column',
                                    alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                                    borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                                    backgroundColor:item.Paid  === 'N' ? 'blue' : '', }}>
                    
                                    <p key={item.q_no} style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'20px' ,fontWeight:'bold' ,color:'white'}}>
                                            {String(parseInt(item.q_no))}</p>
                                    <img src= {table} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    
                                </div>
                                  )))

                            )}
                </div>
              </div>
            </Grid>


            <Grid item xs={12} md={5} style={{ height: '100%',width:'100%'}}>
            {isDesktop && (
              
              <div className="num-pad" style={{margin:'5px'}}>
              <div className="num-pad-row">
                <button className="num-pad-key" onClick={() => handleInput('1')}>1</button>
                <button className="num-pad-key" onClick={() => handleInput('2')}>2</button>
                <button className="num-pad-key" onClick={() => handleInput('3')}>3</button>
              </div>
              <div className="num-pad-row">
                <button className="num-pad-key" onClick={() => handleInput('4')}>4</button>
                <button className="num-pad-key" onClick={() => handleInput('5')}>5</button>
                <button className="num-pad-key" onClick={() => handleInput('6')}>6</button>
              </div>
              <div className="num-pad-row">
                <button className="num-pad-key" onClick={() => handleInput('7')}>7</button>
                <button className="num-pad-key" onClick={() => handleInput('8')}>8</button>
                <button className="num-pad-key" onClick={() => handleInput('9')}>9</button>
              </div>
              <div className="num-pad-row" >
              <button className="num-pad-key" style={{ width: '33%'}} onClick={() => handleBackspace()}>
        
                <Typography      
              sx={{
                fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.3rem' }}}>
                        Back
                </Typography>
                </button>
                <button className="num-pad-key" style={{ width: '33%'}}  onClick={() => handleInput('0')}>0</button>
                <button className="num-pad-key" style={{ width: '33%'}}  onClick={ChangeViewToQue}>
                <Typography      
              sx={{
                fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.3rem' }}}>
                    {showTable ? 'Que No':'Table No'}
                </Typography>
          
                  </button>
            
              </div>
              <div className="num-pad-row">
                <button className="num-pad-key" onClick={CloseTableNo} style={{width:'33%'}}>

                  <Typography      
              sx={{
                fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.3rem' }}}>
                        Close
                </Typography>
                  </button>
                <button className="num-pad-key" style={{width:'33%'}} onClick={() => SelectTableOk(TableNo)}>OK</button>
                <button className="num-pad-key" style={{ width: '33%'}} onClick={clearInput}> 
                
                <Typography      
              sx={{
                fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.5rem' }}}>
                  Clear 
                </Typography>
              </button>
              </div>
            </div>
            )}
            
            
            </Grid>
          </Grid>
          </div>
          </div>
        
        // </div>
      )}

      {PaymentOpenModal && (
              <div className="modal" >
                <div className="modal-content" style={{width:'1000px'}}>
                <h1> SELECT PAYMENT</h1>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(120px, 1fr))', gap: '5px' ,margin:'5px'}}>


                  <div className='PaymentModalButton'
                    tabIndex={0}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,CashPaymentRef,CashPaymentRef,CreditCardPaymentRef,0)}
                    onClick={CashPayment} ref={CashPaymentRef}>

                    <p> Cash Payment</p>
                    <img src= {cash} />
                  </div>
                    

                  <div className='PaymentModalButton'   
                    tabIndex={1}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,CashPaymentRef,CreditCardPaymentRef,EPSPaymentRef,1)}
                    ref={CreditCardPaymentRef}
                    onClick={OpenCreditCardPayment}>

                    <p>Credit Card</p>
                    <img src= {credit}/>
                  </div>

                  <div className='PaymentModalButton'
                    tabIndex={2}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,CreditCardPaymentRef,EPSPaymentRef,MultiplePaymentRef,2)}
                    ref={EPSPaymentRef}
                    onClick={OpenDebitCardPayment}>

                    <p>EPS</p>
                    <img src= {epsCard} />
                  </div>

                  <div className='PaymentModalButton'    
                    onClick={OpenMultiplePayment}
                    tabIndex={3}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,EPSPaymentRef,MultiplePaymentRef,ChargePaymentRef,3)}
                    ref={MultiplePaymentRef}
                    >

                    <p>Multiple Payment</p>
                    <img src= {Multiple}/>
                  </div>
                    

                  <div  className='PaymentModalButton'
                    tabIndex={4}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,MultiplePaymentRef,ChargePaymentRef,ClosePaymentRef,4)}
                    ref={ChargePaymentRef}
                    onClick={OpenChargeModal}>

                    <p> Charge</p>
                    <img src= {ChargeRoom} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                  </div>

                <div  className='PaymentModalButton'
                    tabIndex={5}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,ChargePaymentRef,GiftCheckPaymentRef,OnlinePaymentRef,4)}
                    ref={GiftCheckPaymentRef}
                    onClick={OpenGiftCheckPayment}>

                    <p> Gift Check</p>
                    <img src= {giftC} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                  </div>

                   <div  className='PaymentModalButton'
                    tabIndex={6}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,GiftCheckPaymentRef,OnlinePaymentRef,OtherPaymentRef,4)}
                    ref={OnlinePaymentRef}
                    onClick={OpenOnlinePayment}>

                    <p> Online Payment</p>
                    <img src= {OtherP} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                  </div>
          
                <div  className='PaymentModalButton'
                    tabIndex={7}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,OnlinePaymentRef,OtherPaymentRef,ClosePaymentRef,4)}
                    ref={OtherPaymentRef}
                    onClick={OpenOtherPayment}>

                    <p> Other Payment</p>
                    <img src= {OtherP} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                  </div>

                  <div className='PaymentModalButton'
                    tabIndex={8}
                    onKeyDown={(e)=> PaymentModalHandleKeydown(e,OtherPaymentRef,ClosePaymentRef,CashPaymentRef,5)}
                    ref={ClosePaymentRef}
                    onClick={CloseModal} >

                    <p> Close</p>
                    <img src= {CloseImage} />
                  </div>

                </div>

                    {/* {(OrderType === 'TAKE OUT' || CustomerOrderInfo.PaymentType === 'Order and Pay') &&  */}
                  {PaymentDiscountOpenModal && (
                    <><h1> SELECT DISCOUNT</h1>
                        <div className='PaymentModalContainer'>

                          <div className='PaymentModalButton'
                            onClick={(e) => OpenVireficationEntry('Senior')} >
                            <p>Senior Citezin Discount</p>
                            <img src={Senior}/>
                          </div>

                          <div className='PaymentModalButton'>
                            <p> PWD Discount</p>
                            <img src={pwdD} />
                          </div>

                          <div className='PaymentModalButton'
                              onClick={(e) => OpenVireficationEntry('Trade')}>
                            <p>Trade Discount</p>
                            <img src={tradeD} />
                          </div>


                          <div className='PaymentModalButton'
                          onClick={(e) => OpenVireficationEntry('Transaction')}>
                            <p>Transaction Discount</p>
                            <img src={transactD}/>
                          </div>

                          <div className='PaymentModalButton'
                          onClick={(e) => OpenVireficationEntry('Item')}>
                            <p>Item Discount</p>
                            <img src={itemD}/>
                          </div>




                          <div className='PaymentModalButton'
                            onClick={CloseModal}>
                            <p>Close</p>
                            <img src={CloseImage}  />
                          </div>

                        </div></> 
                      )}

        
                  
              </div>
              </div>
      )}

      {OtherCommandOpenModal && (
              <div className="modal" >
                <div className="modal-content">
                <h1>  SELECT TRANSACTION</h1>
                <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, minmax(100px, 1fr))': 'repeat(3, minmax(33%, 1fr))' , gap: '5px' ,margin:'5px'}}>

            {userRank == 'Cashier' && (
                  <>
                        {/* <div className='otherCommandButton'>
                          <p> Item Discount</p>
                          <img src={itemD}/>
                        </div> */}
                      
                          {OrderTypeModal === false &&
                          <div className='otherCommandButton' style={{pointerEvents: cartItems.length === 0 ? 'none':'auto'}}
                            onClick={()=>setSuspendEntryModal(true)}>
                              <p> Suspend Transaction</p>
                              <img src={SuspendImage}/>
                          </div>
                          }

                          <div className={otherCommandButton}>                      
                            <p> Return</p>
                            <img src={ReturnImage}/>
                          </div>

                          <div className={otherCommandButton}
                          onClick={()=>ShowCancellTransaction()}
                          >                      
                            <p>Cancel Transaction</p>
                            <img src={CancelTransImage}/>
                          </div>


                          <div className={otherCommandButton}
                          onClick={()=>EndShiftHandleClick()}
                          >
                            <p> Cash Count</p>
                            <img src={CashCountImage}/>
                          </div>
                          
                          <div className={otherCommandButton}
                            onClick={()=>CashPullout()}>
                            <p> Cash Pull-Out</p>
                            <img src={CashPullOutImage} />
                          </div>
                          
                          <div className={otherCommandButton}
                          onClick={()=>Lockterminal()}>
                            <p>Lock Terminal</p>
                            <img src={LockTerImage}/>
                          </div></>
                    ) }
                  <div className={otherCommandButton}
                    onClick={CloseTerminal}>
                    <p>Close Terminal</p>
                    <img src= {ChargeRoom}/>
                  </div>

                  <div className='otherCommandButton'  
                    onClick={CloseModal} >
                    <p> Close</p>
                    <img src= {CloseImage}/>
                  </div>
                </div>

          </div>
              </div>
      )}


      {SelectTypeOfTransaction && (
              <div className="modal" >
                  
                <div className="modal-content" style={{width:'100%' ,display:'flex',flexDirection:'column' }}>
                <h1>Select Type of Transaction</h1>

                {DineInOrderAndPay ? (           
                      <>

                      <Button className="button-take-out" 
                      onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,TransferTableRef,ClearTableRef,CloseSelectTransTypeRef,3)}
                      ref={ClearTableRef}
                      onClick={Cleartable}>
                        <Typography      
                          sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '1.8rem' },
                          color: '#ffffff',backgroundColor: 'red',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                          borderRadius: '5px',fontWeight: 'bold', textAlign: 'center',}}>
                        CLEAR TABLE
                        </Typography>
                      </Button>

                    <Button className="button-dine-in-close" 
                    onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,ClearTableRef,CloseSelectTransTypeRef,AddOrderRef,4)}
                    ref={CloseSelectTransTypeRef}
                    style={{backgroundColor:'red'}} onClick={CloseModal}>
                      <Typography      
                        sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                        color: '#ffffff',backgroundColor: 'red',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',fontWeight: 'bold', textAlign: 'center',}}>
                      Close
                      </Typography>
                    </Button>
                    </>
                ):(
                  <>
                  
                  <Button className="button-dine-in" 
                    onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,AddOrderRef,AddOrderRef,SettleOrderRef,0)}
                    ref={AddOrderRef}
                    onClick={AddOrdertable}>
                      <Typography      
                        sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                        color: '#ffffff',backgroundColor: '#007bff',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',fontWeight: 'bold', textAlign: 'center',}}>
                        Add Order
                      </Typography>
                  </Button>
                  { userRank == 'Cashier' &&(
                  <Button className="button-take-out" 
                    onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,AddOrderRef,SettleOrderRef,TransferTableRef,1)}
                    ref={SettleOrderRef}
                    onClick={SettleOrdertable}>
                      <Typography      
                        sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '1.8rem' },
                        color: '#ffffff',backgroundColor: 'red',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',fontWeight: 'bold', textAlign: 'center',}}>
                      View | Settle Order
                      </Typography>
                      
                  </Button>

                )}

                  <Button className="button-dine-in" 
                    onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,SettleOrderRef,TransferTableRef,CloseSelectTransTypeRef,2)}
                    ref={TransferTableRef}
                    onClick={TransferOrdertable}>
                      <Typography      
                        sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                        color: '#ffffff',backgroundColor: '#007bff',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',fontWeight: 'bold', textAlign: 'center',}}>
                      Transfer table
                      </Typography>
                      
                  </Button>
                  <Button className="button-dine-in-close" 
                    onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,ClearTableRef,CloseSelectTransTypeRef,AddOrderRef,4)}
                    ref={CloseSelectTransTypeRef}
                    style={{backgroundColor:'red'}} onClick={CloseModal}>
                      <Typography      
                        sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                        color: '#ffffff',backgroundColor: 'red',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',fontWeight: 'bold', textAlign: 'center',}}>
                      Close
                      </Typography>
                    
                  </Button>


                  
                  </>

                )}




                </div>
              </div>
      )}

      {AddOrderModal && (
        
        <div className="modal">
          <div className="modal-content-Addcart">
          <Grid container spacing={2} >

            <Grid item xs={12} md={6}>
        
                <div className='add-order-container'>


              <Typography      
                  sx={{
                  fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.2rem', lg: '1.4rem', xl: '1.6rem' },
                  color: '#0d12a1',
                  textShadow: '1px 1px 2px rgba(13, 18, 161, 0.7)',
                  borderRadius: '5px',
                  fontWeight: 'bold', textAlign: 'center',}}>
                {selectedProduct?.product.long_desc}
              </Typography>
              <div className='img-container'>
              <img src={selectedProduct?.product.prod_img === null ? clientLogo : 'data:image/jpeg;base64,' + selectedProduct?.product.prod_img} alt={selectedProduct?.product.bar_code} className='img-element' />
              </div>
                      <Typography      
                  sx={{
                  fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.0rem', lg: '1.1rem', xl: '1.2rem' },
                  color: '#0d12a1',
                  borderRadius: '5px',
                  fontWeight: 'bold', textAlign: 'center',}}>
                Price: {parseFloat(selectedProduct?.product.reg_price).toFixed(2)}
                </Typography>
              <div className="input-group" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              <button className="btn-minus" style={{backgroundColor:'white',color:'red' ,border:'solid',marginTop:'0'}} onClick={MinusQuantity} ><FontAwesomeIcon icon={faMinus}/> </button>
                  <input type="number" ref={inputRef}  inputMode="numeric"  placeholder="Quantity" value={quantity} onChange={handleQuantityChange} 
                  style={{width:'70%' ,fontWeight:'bold',textAlign:'center',height:'40px',margin:'0',padding:'0'}}
                  onKeyDown={(event) => HandleAddtocart(event)}
                  />
                  <button className="btn-add" style={{backgroundColor:'white',color:'blue' ,border:'solid',marginTop:'0'}} onClick={addQuantity}> <FontAwesomeIcon icon={faPlus}  style={{ verticalAlign: 'middle' }}/></button>
              </div>

              <p className='TotalDue'>Total: {calculateTotal()}</p>

                <div className='add-order-button' style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                  <button 
                      style={{color:'white',backgroundColor:'red',width:'50%',textAlign:'center', display: 'inline-block'}} 
                        onClick={CloseAddOrderModal} className="btn-close"> <FontAwesomeIcon icon={faClose} 
                        />Close
                  </button>
                
                  <button 
                    style={{color:'white',backgroundColor:'blue',width:'50%',textAlign:'center', borderRadius:'5px',
                    display: 'inline-block'}} onClick={addtocarts}>  <FontAwesomeIcon icon={faShoppingCart} 
                    /> Add to Cart
                  </button>
                
                </div>
              </div>
              </Grid>

              <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>
                  <div className="num-pad-payment" style={{width:'100%'}}>
                    <div className="num-pad-row">
                      <button className="num-pad-key" onClick={() => setQuantityEntry('1')}>1</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('2')}>2</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('3')}>3</button>
                    </div>
                    <div className="num-pad-row">
                      <button className="num-pad-key" onClick={() => setQuantityEntry('4')}>4</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('5')}>5</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('6')}>6</button>
                    </div>

                    <div className="num-pad-row">
                      <button className="num-pad-key" onClick={() => setQuantityEntry('7')}>7</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('8')}>8</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('9')}>9</button>
                    </div>
                    <div className="num-pad-row">
                      <button className="num-pad-key" onClick={() => setQuantityEntry('0')}>0</button>
                      <button className="num-pad-key" onClick={() => setQuantity(0)}
                      style={{fontSize:'30px'}}
                        >Clear
                      </button>
                    </div>

                  </div>

                  </Grid>
            </Grid>
          </div>
      </div>


      )}

      {EditOrderModal && (
                  <div className="modal">
                    <div className="modal-content-Addcart">
                    <Grid container spacing={2} >

                      <Grid item xs={12} md={6}>
                      <div className='add-order-container'>
                      <Typography      
                        sx={{
                        fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.2rem', lg: '1.4rem', xl: '1.6rem' },
                        color: '#0d12a1',
                        textShadow: '1px 1px 2px rgba(13, 18, 161, 0.7)',
                        borderRadius: '5px',
                        fontWeight: 'bold', textAlign: 'center',}}>
                        {selectedProduct?.product.long_desc}
                      </Typography>
                  <div className='img-container2'>
                  <img src={selectedProduct?.product.prod_img === null ? clientLogo : 'data:image/jpeg;base64,' + selectedProduct?.product.prod_img} alt={selectedProduct?.product.bar_code} className='img-element' />
                    {/* <img src={selectedProduct?.product.prod_img} alt={selectedProduct?.product.bar_code} className='img-element2' /> */}
                </div>
                  <Typography      
                    sx={{
                    fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.0rem', lg: '1.1rem', xl: '1.2rem' },
                    color: '#0d12a1', borderRadius: '5px',fontWeight: 'bold', textAlign: 'center',}}>
                    Price: {parseFloat(selectedItemIndexData?.selectedItem.price).toFixed(2)}
                  </Typography>

                  {/* <p className='Price' >Price: {parseFloat(selectedItemIndexData?.selectedItem.price).toFixed(2)}</p> */}
                  <div className="input-group" style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              
                  <button className="btn-minus" style={{backgroundColor:'white',color:'red' ,border:'solid',marginTop:'0'}} onClick={MinusQuantity} >
                      <FontAwesomeIcon icon={faMinus}  />

                      </button>
        
                      <input ref={inputRef}
                            type="number"
                            inputMode="numeric"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={handleQuantityChange}
                            onKeyDown={(event) => HandleUpdatetocart(event)}
                            style={{
                              width: '70%',
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}
                          />
                      <button className="btn-add" style={{backgroundColor:'white',color:'blue' ,border:'solid',marginTop:'0'}} onClick={addQuantity}>
                      <FontAwesomeIcon icon={faPlus} />

                      </button>
                      
                  </div>
                  <p className='TotalDue'>Total: {calculateTotal()}</p>

                  <button className="btn-add-cart" style={{color:'white',backgroundColor:'blue',width:'100%',textAlign:'center', display: 'inline-block',marginTop:'10px'}} onClick={onUpdateToCart}> 
                      <FontAwesomeIcon icon={faShoppingCart} />Update to Cart </button>
                  <div className='add-order-button' style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                    <button style={{color:'white',backgroundColor:'red',width:'50%',textAlign:'center', display: 'inline-block'}} onClick={onClose} className="btn-close"> <FontAwesomeIcon icon={faClose} /> Close</button>
                    <button style={{color:'white',backgroundColor:'red',width:'50%',textAlign:'center', display: 'inline-block'}} onClick={()=> OpenVireficationEntry('Delete Order')} className="btn-close"> <FontAwesomeIcon icon={faTrashAlt} /> Delete </button>
                  </div>
                </div>
                  </Grid>

                  <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>
                  <div className="num-pad-payment" style={{width:'100%'}}>
                    <div className="num-pad-row">
                      <button className="num-pad-key" onClick={() => setQuantityEntry('1')}>1</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('2')}>2</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('3')}>3</button>
                    </div>
                    <div className="num-pad-row">
                      <button className="num-pad-key" onClick={() => setQuantityEntry('4')}>4</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('5')}>5</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('6')}>6</button>
                    </div>

                    <div className="num-pad-row">
                      <button className="num-pad-key" onClick={() => setQuantityEntry('7')}>7</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('8')}>8</button>
                      <button className="num-pad-key" onClick={() => setQuantityEntry('9')}>9</button>
                    </div>
                    <div className="num-pad-row">
                      <button className="num-pad-key" onClick={() => setQuantityEntry('0')}>0</button>
                      <button className="num-pad-key" onClick={() => setQuantity(0)}
                    style={{fontSize:'30px'}}
                        >Clear
                      </button>
                    </div>

                  </div>

                  </Grid>
                  </Grid>
                  </div>
              </div>
      )}


      {CloseTerminalModal && (
              <div className="modal" >
                  
                <div className="modal-content" style={{width:'50%' ,display:'flex',flexDirection:'column' }}>
               
                { userRank =='Cashier' &&(
                  <Button className="btn"  style={{backgroundColor:'red'}}
                      onClick={EndShiftHandleClick}>
                    <Typography      
                        sx={{
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                        color: '#ffffff',backgroundColor: 'red',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',
                        fontWeight: 'bold', textAlign: 'center',}}>
                        End Shift
                      </Typography>
                    </Button>
                )}

                  <Button className="btn" style={{backgroundColor:'#007bff'}}
                  onClick={logoutClick}>
                        <Typography      
                        sx={{
                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                        color: '#ffffff',backgroundColor: '#007bff',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',
                        fontWeight: 'bold', textAlign: 'center',}}>
                        Logout
                      </Typography>
                    </Button>
                  <Button className="btn" style={{backgroundColor:'red'}}
                    onClick={CloseLogout}>
                          <Typography      
                          sx={{
                          fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                          color: '#ffffff',backgroundColor: 'red',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                          borderRadius: '5px',
                          fontWeight: 'bold', textAlign: 'center',}}>
                          Cancel
                        </Typography>
                    </Button>
                </div>
              </div>
      )}

      {ChangeModal && (
              <div className="modal" > 
                <div className="modal-content">
                  <div className='Change-Container'>
                    <div className='change-subcontainer'>
                      <label style={{fontSize:'30px',color:'white'}}>Amount Tendered:</label>
                      <p style={{fontSize:'30px',fontWeight:'bold',textAlign:'end'}}>
                      {parseFloat(AmountTendered).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                    </div>
                    <div className='change-subcontainer'>
                      <label style={{fontSize:'30px',color:'white'}}>Amount Due:</label>
                      <p style={{fontSize:'30px',fontWeight:'bold',textAlign:'end'}}>
                      {parseFloat(AmountDue).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                    </div>
          
                    <div className='change-subcontainer'>
                      <label style={{fontSize:'30px',color:'white'}}>Change:</label>
                      <p style={{fontSize:'30px',fontWeight:'bold',textAlign:'end'}}>
                      {ChangeAmount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}</p>
                    </div>

                  <button className="btn" style={{width:'100%'}} onClick={ChangeModalClose}>OK</button>
                  </div>
                
                </div>
              </div>
      )}
        
      {SuspendEntryModal && (
        <div className='modal'>
            <div className='modal-content'>
              <h1>Customer Entry</h1>
              <div className='card'>
                <div className='susppendEntry'>
                  <div className='form-group'>
                    <label>Customer Name</label>
                    <input ref={suspendCustomerRef} value={SuspendCustomerData.Customer}
                    name="Customer" autoComplete='off'
                    onChange={SusppendEntry}
                    onClick={()=>showOnScreenKeybaord('SuspendCustomer')}
                    />
                  </div>

                  <div className='form-group'>
                  <label>Customer Address</label>
                  <input ref={suspendCustomeraddressRef} value={SuspendCustomerData.CusAddress}
                  name="CusAddress"
                  autoComplete='off'
                  onChange={SusppendEntry}
                  onClick={()=>showOnScreenKeybaord('SuspendAddress')}
                  />
              

                  </div>

                  <div className='Button-Container'>
                    <button className='ok' onClick={()=> SaveSusppendCustomer()}>Suspend</button>
                    <button className='cancel' onClick={()=>{ setSuspendEntryModal(false);setSuspendCustomerData({
                      Customer :'',
                      CusAddress:'',
                    })}}>Cancel</button>
                  </div>
                </div>

              </div>
          </div>

          
        </div>
      )}

      {OpenLockModal && (
        <div className='modal'>
          <div className='modal-content' >
            <h1>Unlock Terminal</h1>
              <div className='Lock-Container'>
                <div className='form-group'>
                  <label>Username</label>
                  <input type='text' ref={LockUsernameRef} value={LockUsername} onChange={(e)=>setLockUsername(e.target.value)} readOnly disabled/>
                </div>
                <div className='form-group'>
                  <label>Password</label>
                  <input type='password'  ref={LockPasswordRef} value={LockPassword} onChange={(e)=>setLockPassword(e.target.value)}
                  onClick={()=>showOnScreenKeybaord('LockPassword')}
                  />
                </div>
                <div className='Button-Container'>
                  <button onClick={()=>unLockterminal()}>Unlock</button>
                </div>
              </div>
          </div>


        </div>
      )}
      {pdfPath && (
          <PdfModal open={isPdfModalOpen} handleClose={ClosePdfModal} pdfPath={pdfPath} />
        )}</>}

  

      {isShowKeyboard && < OnScreenKeyboard handleclose = {closekeyBoard} currentv={focusedValue} setvalue={setvalue}/>}
      {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}    currentv={focusedValue} setvalue={setvalue}/>}
              

      </Grid>
    </>
  );
  };


export default Restaurant;

