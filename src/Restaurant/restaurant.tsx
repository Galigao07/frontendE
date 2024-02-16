/* eslint-disable prefer-const */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useEffect, useState,useRef, ChangeEvent, useLayoutEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import BASE_URL from '../config';
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
import Swal from "sweetalert2";
import Selectpayment from '../assets/Selectpayment.jpg';
import SaveOrder from '../assets/SaveOrder.png';
import SalesOrderImage from '../assets/SalesOrder.png';
import OtherCommandImage from '../assets/OtherCommand.png';
import ReprintImage from '../assets/ReprintImage.jpeg';
import ChangeOderTypeImage from '../assets/ChangeOrder.jpg';
import CloseImage from '../assets/close.png';
import RefreshImage from '../assets/RefreshImage.png';
import logo from '../assets/logo.png'
import './css/restaurant.css';
import CustomerDineIn from './customerEntryDineIn';
import ListOfDineInSalesOrder from './listofDineInSalesOrder';
import CashPaymentEntry from './CashPaymentEntry';
import CustomerPayment from './CustomerEntryPayment';
import ReprintTransaction from './RepirintTransaction';
import CashBreakDown from './CashBreakDown';
import ChargeTo from './Charge';
import CreditCardPayment from './CreditCard';
import CreditCardPaymentEntry from './CreditCardPayment';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faShoppingCart, faMinus, faClose, faTrashAlt, faArrowAltCircleDown, faArrowDown, faExpand, faExpandArrowsAlt, faChevronDown, faChevronCircleDown, faArrowUp, faAnglesUp, faAnglesDown, faSliders, faAngleUp, faAngleDown, faAngleDoubleDown, faAngleDoubleUp} from '@fortawesome/free-solid-svg-icons';
// import CustomerDineIn from './customerEntryDineIn';
import QRCode from 'qrcode-generator';
import { Button, Dialog, DialogContent, DialogTitle, Grid, Table, Typography } from '@mui/material';
import { createTheme, ThemeProvider,Theme,makeStyles, useTheme, responsiveFontSizes  } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { isDesktop, isMobile,isTablet } from 'react-device-detect';
import { css } from '@emotion/react';
import { ClipLoader } from 'react-spinners';
import { BrowserWindow,ipcRenderer } from 'electron';
import { webContents } from 'electron';
import { IpcRendererEvent } from 'electron/renderer';
import DebitCardPayment from './DebitCard';
import { faExpandAlt } from '@fortawesome/free-solid-svg-icons/faExpandAlt';
import Verification from './Verification';
import { blue } from '@mui/material/colors';
///**************PRODUCT GRID DESIGN*******************//

import { useDispatch, useSelector } from 'react-redux';
import { setBooleanValue } from '../Redux/actions';
import showErrorAlert from '../SwalMessage/ShowErrorAlert';

// import html2pdf from 'html2pdf.js';
import SeniorCitezenDiscount from './DiscountSeniorCitezen';
import ItemDiscounts from './DiscountItems'
import TradeDiscountList from './DiscountTrade'
import TransactionDiscount from './DiscountTransaction';
import jsPDF from 'jspdf';
import eventEmitter from 'events';
// import {setupWebSocket} from '../extended.js';

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
  IsModalOpenF: () => boolean;

}



  
const ProductGrid: React.FC<ProductData> = ({ products , addtocart ,selectedProductData,isSelected,IsModalOpenF}) => {
 
 
  const dispatch = useDispatch();
  const booleanValue = useSelector((state: any) => state.booleanValue);
 
  const [quantity, setQuantity] = useState<number | 1>(1); // Adjust the initial state value

    const [Price, setPrice] = useState<number>(1);
    const ProductRef = useRef<HTMLDivElement>(null)
    const [isFocusIndex,setisFocusIndex] = useState<boolean>(true)

  




    const handleQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = parseInt(event.target.value, 10);
      setQuantity(isNaN(value) ? 1 : value);
      calculateTotal();
    };
    const inputRef = useRef<HTMLInputElement>(null);


  
    // const calculateTotal = () => {
    //   return isNaN(quantity) ? '0.00' : (quantity * Price).toLocaleString().toFixed(2);
    // };

    const calculateTotal = () => {
      const total = isNaN(quantity) ? 0 : quantity * Price;
      return total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };



interface SelectedDatas{
  long_desc: any;
  reg_price: any;
  bar_code: any;
}
  

const [selectedProduct, setSelectedProduct] = useState<SelectedDatas | null>(null);

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    const [isSelectedIndex, setisSelectedIndex] = useState<any>(null);

    const ProductRefs = useRef<any>([]);
    const [isModalOpenFS, setIsModalOpenF] = useState<boolean>(false)
    const isModalOpenx = IsModalOpenF();
    const handleproductclick = (product:any,index:any) => {

      selectedProductData({product,index})
      setisFocusIndex(false)
      // setSelectedProduct(product);
      // setIsModalOpen(true);
      // setOpen(true);
      // setPrice(product.reg_price);
      //  setQuantity(1);
      //  setTimeout(() => {
      //   if (inputRef.current) {
      //     inputRef.current.focus();
      //   }
      // }, 100); // 1000 millisecond

       
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

 
        const focusindex = () => {
          if (isFocusIndex) {
            if (ProductRefs.current[isSelectedIndex]) {
              ProductRefs.current[isSelectedIndex].focus();
            }
          }

        }

        let isF1:boolean = false
 
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
        const intervalId = setInterval(() => {
            // Dispatch action to set boolean value in Redux store
            const isModalOpen = IsModalOpenF();
          dispatch(setBooleanValue(isModalOpen))
  
          if (isModalOpen) {
            localStorage.setItem('Modal','true')
          }else {
            localStorage.setItem('Modal','false')
          }
       
          
        }, 500); // Check every second
    
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [IsModalOpenF]); // Empty dependency array ensures the effect runs only once after the initial render
    
    
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
    if (index > 4){
      setisSelectedIndex(index - 5);
    }

  } else if (e.key === 'ArrowDown' && index < products.length - 1) {
    setisSelectedIndex(index + 5);
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

  return (

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '5px' ,margin:'10px'}}>
          {products.map((product:any,index) => (
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
                backgroundColor: isSelectedIndex == index ? 'blue':'white',
              }}
              onKeyDown={(e) => Handlekeydown(e,index)}
             onClick={() => handleproductclick(product,index)}> 
             <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <p style={{ color: isSelectedIndex ==index ? 'white':'black',fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', flex: '1 1 100%',height:'40px' }}>{product.long_desc}</p>
              <img src={image} style={{ maxWidth: '80%', maxHeight: '150px', marginBottom: '10px', flex: '0 0 auto' }} />
              <p style={{ color: isSelectedIndex ==index ? 'white':'black',fontWeight: 'bold', textAlign: 'center', flex: '1 1 100%' }}>Price: {parseFloat(product.reg_price).toFixed(2)}</p>
            </div>
                  {/* <p style={{fontWeight:'bold',textAlign:'center' , marginBottom: '10px'}}>{product.long_desc}</p>
                  <img src={image} alt={product.bar_code} style={{ maxWidth: '80%', maxHeight: '150px', marginBottom: '10px' }} />
                  <p style={{fontWeight:'bold',textAlign:'center' }}> Price: {parseFloat(product.reg_price).toFixed(2)}</p> */}
              </div>
          ))}
       {isModalOpen && (
    
        <div className="modal">
      <div className="modal-content" style={{height:'100%'}}>


         <Typography      
            sx={{
            fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.2rem', lg: '1.4rem', xl: '1.6rem' },
            color: '#0d12a1',
            textShadow: '1px 1px 2px rgba(13, 18, 161, 0.7)',
            borderRadius: '5px',
            fontWeight: 'bold', textAlign: 'center',}}>
          {selectedProduct?.long_desc}
          </Typography>



      {/* <h1 className="threeDText">{selectedProduct?.long_desc}</h1> */}
        <img src={image} alt={selectedProduct?.bar_code} style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px' }} />

        
        <Typography      
            sx={{
            fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.0rem', lg: '1.1rem', xl: '1.2rem' },
            color: '#0d12a1',
            borderRadius: '5px',
            fontWeight: 'bold', textAlign: 'center',}}>
          Price: {parseFloat(selectedProduct?.reg_price).toFixed(2)}
          </Typography>
        {/* <p className='Price'>Price: {parseFloat(selectedProduct?.reg_price).toFixed(2)}</p> */}
        <div className="input-group">
        <button className="btn" style={{backgroundColor:'white',color:'red' ,border:'solid'}} onClick={MinusQuantity} ><FontAwesomeIcon icon={faMinus}/> </button>
          <input type="number" ref={inputRef}  inputMode="numeric"  placeholder="Quantity" value={quantity} onChange={handleQuantityChange} 
           style={{width:'60%' ,margin:'10px', fontSize:'20px',fontWeight:'bold',textAlign:'center'}}/>
          <button className="btn" style={{backgroundColor:'white',color:'blue' ,border:'solid'}} onClick={addQuantity}> <FontAwesomeIcon icon={faPlus}  style={{ verticalAlign: 'middle' }}/></button>
        </div>
        <p className='TotalDue'>Total Due: {calculateTotal()}</p>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
        <button style={{color:'white',backgroundColor:'red',width:'50%',textAlign:'center', display: 'inline-block'}} onClick={onClose} className="btn-close"> <FontAwesomeIcon icon={faClose} />Close</button>
        <button className="btn-add-cart" style={{color:'white',backgroundColor:'blue',width:'50%',textAlign:'center', display: 'inline-block'}} onClick={addtocarts}>  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
      </div>
      </div>
    </div>
 

      )}
      </div>
  );
};






///**************TRANSACTION GRID DESIGN*******************//
interface TransactionData {
  cartitems :any;
  setcartitems:any;
  totaldue:any;
  EditOrderList:any;
  DiscountData:any;
}

const Transaction: React.FC<TransactionData> = ({ cartitems ,setcartitems,totaldue,EditOrderList,DiscountData  }) => {
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


    return (
      <div className="Transaction" style={{ overflowY: 'auto', maxHeight: '55%' ,
       border: '1px solid #ccc', borderRadius: '10px',
        boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '10px' }}>
        <Table 
            tabIndex={0} // Make the table focusable
        className="OrderList" sx={{
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                            overflow: 'auto'}} 
                            
                            >
          <thead>
            <tr>
              <th>Qty</th>
              <th>Description</th>
              <th>Price</th>
              <th>Total</th>
              <th style={{display:'none'}} >Barcode</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(cartitems) && cartitems.length > 0 ? (
           cartitems.map((item, index) => (
            <tr key={index} onClick={() => openModaltrans(index)}
            onKeyDown={(e) => handleKeydownTable(e)}
            ref={index === 0 ? focusedRowRef : null}
            tabIndex={index === 0 ? 0 : undefined}
            style={{ outline: selectedIndex === index ? '2px solid blue' : 'none',
            backgroundColor: selectedIndex === index ? 'blue':'white' ,color : selectedIndex === index? 'white':'black'
          
          }} // Add focus style

            > 
            <td style={{textAlign:'center'}}>{item.quantity}</td>
            <td title={item.description}>{item.description}</td>
            <td style={{textAlign:'end'}}>{parseFloat(item.price).toFixed(2)}</td>
            <td style={{textAlign:'end'}}>
              {(item.quantity * item.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td style={{display:'none'}} >{item.barcode}</td>
           
    </tr>
  ))
) : (
  <tr>
    <td colSpan={4}>No items in the transaction</td>
  </tr>
)}


        {DiscountData.length !== 0 && (
                        <>
                          <tr style={{ border: 'none', borderCollapse: 'collapse' }}>
                            <td colSpan={5}></td>
                          </tr>
                          <tr style={{ border: 'none',color:'red',fontWeight:'bold' }}>
                            <td colSpan={3} style={{ textAlign: 'center', border: 'none' }}> SC VAT Exemption on {totaldue}</td>
                            <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}>{DiscountData.SLessVat12}</td>
                          </tr>
                          <tr style={{ border: 'none',color:'red',fontWeight:'bold'   }}>
                            <td colSpan={3} style={{ textAlign: 'center', border: 'none'}}> SC Discount: 20% of  {DiscountData.SNetOfVat}</td>
                            <td colSpan={2} style={{ textAlign: 'center', border: 'none'}}>{DiscountData.SLess20SCDiscount}</td>
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const booleanValue = useSelector((state: any) => state.booleanValue);
  const dispatch = useDispatch()
  const [selectedCategoryall, setSelectedCategoryall] = useState<boolean>(false);

    const [productscCat, setProducts] = useState([]);

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
          }
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
          }
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
    const categoryRef = useRef<any>([]);




    




    // useEffect(() => {
    //   const handleKeyPress = (event:any) => {
    //     if (event.key === 'F1') {
    //       event.preventDefault(); // Prevent default behavior of F1 key
    //       if (categoryRef.current) {
    //         categoryRef.current[isSelectedIndexData].focus(); // Focus on the first category item
    //         // setisSelectedIndexData(isSelectedIndexData)
     
    //       }
    //     }
    //   };
  
    //   // Add event listener for keydown event
    //   document.addEventListener('keydown', handleKeyPress);
  
    //   // Cleanup function to remove event listener when component unmounts
    //   return () => {
    //     document.removeEventListener('keydown', handleKeyPress);
    //   };
    // }, []); // Empty dependency array to run only once on component mount
  

    useEffect(() => {
      const intervalId = setInterval(() => {
          // Dispatch action to set boolean value in Redux store
          const isModalOpen = IsModalOpen();
        dispatch(setBooleanValue(isModalOpen))

        if (isModalOpen) {
          localStorage.setItem('Modal','true')
        }else {
          localStorage.setItem('Modal','false')
        }
     
        
      }, 500); // Check every second
  
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
  }, [IsModalOpen]); // Empty dependency array ensures the effect runs only once after the initial render
  
  

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




<Box
 component="div"
 sx={{
    // display: 'grid',
    // gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    // gap: '5px',
    margin: '10px',
 }}
>
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
        borderRadius: '10px',
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
      SHOW ALL
    </Typography>
    </div>
 {category.map((categoryItem:any,index:any ) => (
    <div
      key={index}
      tabIndex={index}
      ref={(ref) => (categoryRef.current[index] = ref)}
      onClick={() => fetchData(categoryItem.category,index)}
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
        borderRadius: '10px',
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
      {categoryItem.category.toUpperCase()}
    </Typography>
    </div>
  ))}
</Box>
    );
  };






  ///**************MAIN DESIGN*******************//
const Restaurant: React.FC = () => {
  const [OrderType, setOrderType] = useState<string>('');
  const [TableNo, setTableNo] = useState<string>('');
  const [QueNo, setQueNo] = useState<string>('');
  const [CustomerName, setCustomer] = useState<string>('');
  const [SOCustomerName, setSOCustomer] = useState<any>([]);
  const [GuestCount, setGuestCount] = useState<number>(0);
  const [PaymentType, setPaymentType] = useState<string>('');
  const [DiscountData, setDiscountData] = useState<any>('');
  const [DiscountType, setDiscountType] = useState<any>('');
  const [TotalDue, setTotalDue] = useState<any>(0);

  const dispatch = useDispatch();
  const booleanValue = useSelector((state: any) => state.booleanValue);


  const inputRef = useRef<HTMLInputElement>(null);
  const TableNoRef = useRef<HTMLInputElement>(null);
  const QueNoRef = useRef<HTMLInputElement>(null);

  const [CashBreakDownModal, setCashBreakDownModal] = useState<boolean>(false);
  const [CloseTerminalModal, setCloseTerminalModal] = useState<boolean>(false);
  const [EditOrderModal, setEditOrderModal] = useState<boolean>(false);
  



  const [DebitCardPaymentModal, setDebitCardPaymentModal] = useState<boolean>(false);
  const [CreditCardPaymentEntryModal, setCreditCardPaymentEntryModal] = useState<boolean>(false);
  const [CreditCardPaymentModal, setCreditCardPaymentModal] = useState<boolean>(false);
  const [ChargeToModal, setChargeToModal] = useState<boolean>(false);
  const [AddOrderModal, setAddOrderModal] = useState<boolean>(false);
  const [OrderTypeModal, setOrderTypeModal] = useState<boolean>(true);
  const [tableNoModal, setTableNoModal] = useState<boolean>(false);
  const [PaymentOpenModal, setPaymentOpenModal] = useState<boolean>(false);
  const [DineIn, setDineIn] = useState<boolean>(false);
  const [CustomerDineInModal,setCustomerDineInModal] = useState<boolean>(false)
  const [CustomeryPaymentModal,setCustomeryPaymentModal] = useState<boolean>(false)
  const [SelectTypeOfTransaction,setSelectTypeOfTransaction] = useState<boolean>(false)
  const [OtherCommandOpenModal, setOtherCommandOpenModal] = useState<boolean>(false);
  const [ReceiptOpenModal, setReceiptOpenModal] = useState<boolean>(false);
  const [CashPaymentEntryModal,setCashPaymentEntryModal] = useState<boolean>(false);
  const [ReprintTransactionModal,setReprintTransactionModal] = useState<boolean>(false);

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
  const ClosePaymentRef = useRef<HTMLDivElement>(null)
  
    //**********ORDER TYPE REF********* */
    const TakeOutRef = useRef<HTMLButtonElement>(null)
    const DineInRef = useRef<HTMLButtonElement>(null)


    //**********TYPE OF TRANSACTION REF********* */
    const AddOrderRef = useRef<HTMLButtonElement>(null)
    const SettleOrderRef = useRef<HTMLButtonElement>(null)
    const TransferTableRef = useRef<HTMLButtonElement>(null)
    const CloseSelectTransTypeRef = useRef<HTMLButtonElement>(null)


  
  // Initialize the state with empty strings for ordertTYpe and tableNo
  const [TypeAndTable, setTypeAndTable] = useState<TypeAndTableState>({ ordertTYpe: '', tableNo: '' });
  const [CustomerOrderInfo, setCustomerOrderInfo] = useState<any>([]);
  // const onlineTestApp = new OnlineTestApp();
  const [AmountTendered,setAmountTendered] = useState<number>(0)
  const [ChangeAmount,setChangeAmount] = useState<number>(0)

  const [showIframe, setShowIframe] = useState<boolean>(false);
  const SideCode = localStorage.getItem('SiteCode');
  const userRank = localStorage.getItem('UserRank');

  

  interface TableItem {
    table_count: number;
    Paid: string;
    // Define other properties as needed
  }


  
  interface QueItem {
    q_no: string;
    Paid: string;
    // Define other properties as needed
  }
  
  
  // Initialize the state variable TableList with an empty array of TableItem type
  const [TableList, setTableList] = useState<TableItem[]>([]);
  const [QueList, setQueList] = useState<QueItem[]>([]);



  // *************** TRANSACRION FOR ADD ORDER **********************
  //#region 
  const [quantity, setQuantity] = useState<number | 1>(1); // Adjust the initial state value

  interface SelectedDatas{
    product:any
    long_desc: any;
    reg_price: any;
    bar_code: any;
  }

  const [selectedProduct, setSelectedProduct] = useState<SelectedDatas | null>(null);
  const [Price, setPrice] = useState<number>(0);

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

    let dataExist:boolean = false
    let index : number = 0
      for (let i = 0; i < cartItems.length; i++) {
        if (cartItems[i].barcode ===  selectedProduct.product.bar_code || cartItems[i].data ===  selectedProduct.product.bar_code) {
            // Item found, do something with it
            dataExist =true
            index = i
            console.log("Item found:", cartItems[i]);
            break; // You might want to break out of the loop if you only need to find the first occurrence
        }
    }

    if (dataExist){


      const updatedItems = [...cartItems];

      updatedItems[index].quantity = updatedItems[index].quantity + quantity ;
      updatedItems[index].totalAmount = ((updatedItems[index].quantity) * Price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      setCartItems(updatedItems);
      AddPosExtended(cartItems[index])

    }else {

      const productToAdd = {
        quantity: quantity,
        description: selectedProduct.product.long_desc,
        price: parseFloat(selectedProduct.product.reg_price).toFixed(2),
        totalAmount: calculateTotal(),
        barcode: selectedProduct.product.bar_code,
      };
      AddPosExtended(productToAdd)
      addToCart(productToAdd);
    }

      setAddOrderModal(false);

      setisSelected(localStorage.getItem('index'))
    }
    
    else {
      // Handle the case where selectedProduct is null (optional)
      // For example, you could show an error message or perform alternative logic
      console.error("selectedProduct is null");
    }
    
    };

  // const HandleAddtocart = (event:any) => {
  //   event.preventDefault();
  //   if (event.key =='Enter'){
  //     addtocarts();
  //   }

  //   if (event.key =='ArrowUp'){
  //     addQuantity();
  //   }
  //   if (event.key =='ArrowDown'){
  //     MinusQuantity();
  //   }

  // }


  // const HandleUpdatetocart = (event:any) => {
  //   event.preventDefault();
  //   if (event.key =='Enter'){
  //     onUpdateToCart();
  //   }

  //   if (event.key =='ArrowUp'){
  //     addQuantity();
  //   }
  //   if (event.key =='ArrowDown'){
  //     MinusQuantity();
  //   }

  // }


    interface selecteditemData {
      selectedItem:any;
      index:any;
    }
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(null);
    const [selectedItemIndexData, setSelectedItemIndexData] = useState<selecteditemData | null>(null);

    const closeModal = () => {

      setSelectedItemIndex(null);
      setEditOrderModal(false);
    };
    
    const onDelete = () => {
      if (selectedItemIndex !== null && selectedItemIndex >= 0 && selectedItemIndex < cartItems.length) {
        const updatedItems = [...cartItems];
        DeletePosExtended(cartItems[selectedItemIndex])
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
        const updatedItems = [...cartItems];
        updatedItems[selectedItemIndex].quantity = quantity;
        updatedItems[selectedItemIndex].totalAmount = calculateTotal();  // Update the quantity to the new value
        setCartItems(updatedItems);
        AddPosExtended(cartItems[selectedItemIndex])
        closeModal();
      } else {
        console.error('Invalid selectedItemIndex or out of range:', selectedItemIndex);
        // Handle the situation when the index is invalid or out of range
        // For example, show an error message or handle it in another appropriate way
      }
    };

    const EditOrderList = (data:any) => {
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

    const onClose = () => {
      setEditOrderModal(false);
  };
  //#endregion

  // ************************** END HERE ********************




  const AddPosExtended = async (data:any) => {

    try{

      const response = await axios.post(`${BASE_URL}/api/extended-data/`, {data:data});

      if (response.status==200){
        console.log('added successfully')
        // sendData();
      }

    }catch{
      console.error('error');
      
    }

  }

  const UpdatePosExtended = async (data:any) => {

    try{

      const response = await axios.post(`${BASE_URL}/api/extended-data/`, data);

      if (response.status==200){
        console.log('Updated successfully')
      }

    }catch{
      console.error('error');
      
    }

  }


  const DeletePosExtended = async (deleteData:any) => {

    try{

      const response = await axios.delete(`${BASE_URL}/api/extended-data/`, {
         data: { deleteData: deleteData }
        });

      if (response.status==200){
        console.log('Deleted successfully')
      }

    }catch{
      console.error('error');
      
    }

  }





  const DeletePosExtendedAll = async () => {

    try{

      const response = await axios.delete(`${BASE_URL}/api/extended-data-terminal/`);

      if (response.status==200){
        console.log('Deleted successfully')
      }

    }catch{
      console.error('error');
      
    }

  }




    // let receiptContentainer = 'Receipt\n\n';


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  const CloseLogout = () =>{
    setCloseTerminalModal(false)
    setOrderTypeModal(true)
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
        }).then((result) => {
          if (result.isConfirmed) {
        //  localStorage.isLogin = false
         localStorage.setItem('isLogin','false')
         localStorage.setItem('UserRank', '');
         localStorage.setItem('FullName', '');
         localStorage.setItem('UserID', '');
         localStorage.setItem('UserName', '');

              // try {
              //     const instance = axios.create({
              //         xsrfHeaderName: 'X-CSRFToken',     
              //         xsrfCookieName: 'csrftoken',    
              //     });
              //         const headers = {
              //             'X-CSRFToken':  localStorage.csrfToken
              //         };

              //         instance.post('http://localhost:8000/api/logout', {}, {
              //         withCredentials: true,  // Send cookies along with the request
              //         headers: headers  // Include the CSRF token in the headers
              //     })
              
              //     .then(() => {
              //         localStorage.removeItem('username');
              //         localStorage.removeItem('token');
              //         localStorage.removeItem('setLogin');
              //         localStorage.removeItem('csrfToken');
                
                      window.location.reload();
              //     })

              // } catch (error) {
              //      console.error('Error during logout:', error);
              // }
          } 
        })

    };


    const CloseTerminal = () => {
      setCloseTerminalModal(true)
      setOtherCommandOpenModal(false)
    }

    /// ************************* CASH BREAK DOWN *************************************** //

    const EndShiftHandleClick = () => {
    setCashBreakDownModal(true)
    setCloseTerminalModal(false)
    }


    const CloseCashBreakDownModal = () => {
      setCashBreakDownModal(false)
      setOrderTypeModal(true)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
    }

    /// ************************* END *************************************** //

const CashBreakDownDataList = async (data:any) => {
  setCashBreakDownModal(false)


  try {
    const response = await axios.get(`${BASE_URL}/api/company-details/`)

    if (response.status==200){
      PrintCashBreakDown(data,response.data.DataInfo)
      // localStorage.clear();
      // window.location.reload();
    }
  
  } catch {
    console.log('error')
  }





}
  

    const ChangeOrderType = () => {

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


        
    const RefreshModule = () => {
      window.location.reload();
    }


const OpenTableNoModal = () => {
setTableNoModal(true)
setTimeout(() => {
  TableNoRef.current?.focus();
  TableNoRef.current?.select();
}, 50);
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
      setOrderTypeModal(true)
      setOrderType('')
      setTableNoModal(false);

      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
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
    console.log('CustomerName:', CustomerName);
    setCustomer(CustomerName)
  }, [CustomerName]);



   const CutomerInfoEntry = async (dataFromModal:any) => {
    // Handle the data received from the modal
    setLoadingPrint(true)
    console.log('Data received from modal:', dataFromModal);
    setCustomerOrderInfo(dataFromModal);
    setCustomerDineInModal(false);
  
   // Update the GuestCount state
    const keys = Object.keys(dataFromModal);
    const values = Object.values(dataFromModal);

// Create a new dictionary using the keys and values
    const dictionary: Record<string, any> = {};

    keys.forEach((key: string, index: number) => {
      dictionary[key] = values[index];
    });
          



    const CashierID = localStorage.getItem('UserID');
    const TerminalNo = localStorage.getItem('TerminalNo');
   
    try {
      const response = await axios.post(`${BASE_URL}/api/add-sales-order/`,{data:cartItems,data2:dictionary,TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo});
      if (response.status === 200) {
        setLoadingPrint(false)
        if (dictionary.PaymentType === 'Sales Order')
        setSOCustomer(dictionary)
        printReceipt(dataFromModal,response.data.SOdata);
      } else {
        // Handle other response statuses if needed
        setSOCustomer(dictionary)
        printReceipt(dataFromModal,response.data.SOdata);
        setDineIn(false)
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

  };


//************ CASH PAYMENT ENTRY*************** */
const CashPayment = () => {
  setPaymentOpenModal(false)
  setCashPaymentEntryModal(true)
  setPaymentType('CASH')

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
      }})
    if (response.status==200) {
      console.log('Success',response.status)

      setCartItems(response.data.Data)
      localStorage.setItem('cartData', JSON.stringify(response.data.Data));
      localStorage.setItem('DataInfo', JSON.stringify(response.data.DataInfo));
      setRefreshCart(prevState => !prevState);
    }
    
  } catch (error) {
    console.log('Error while Generating Reprint',error)
    
  }
}



///********************THIS SAVE THE DATA FOR CASH PAYMENT*****************************/
const CutomerInfoEntryPaymnet = async (data: any) =>{
setCustomeryPaymentModal(false)
setLoadingPrint(true)

  const CashierID = localStorage.getItem('UserID');
  const CashierName = localStorage.getItem('FullName');
  const TerminalNo = localStorage.getItem('TerminalNo');

  
    try {
      const response = await axios.post(`${BASE_URL}/api/save-sales-order-payment/`,{data:cartItems,AmountTendered:AmountTendered,TableNo:TableNo,CashierID:CashierID,
                                                                                      TerminalNo:TerminalNo,DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo});
      if (response.status === 200) {

        if (PaymentType === 'CASH') {
          const response1 = await axios.post(`${BASE_URL}/api/save-cash-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,
                                                                                    TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,
                                                                                    AmountDue:formattedTotalDue,CashierName:CashierName,OrderType:OrderType,
                                                                                    DiscountData:DiscountData,DiscountType:DiscountType,QueNo:QueNo});
          if (response1.status === 200) {
      
            setLoadingPrint(false)
            PrintCashPaymentReceipt(response1.data);
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }
  
        } else {
          // Handle other response statuses if needed
          console.log('Request failed with status:', response.status);
        }

        if (PaymentType === 'CREDIT CARD') {
          const CreditCard:any = localStorage.getItem('CreditCardPayment')
          const response1 = await axios.post(`${BASE_URL}/api/save-credit-card-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,
            TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName,OrderType:OrderType,CreditCard:CreditCard});
          if (response1.status === 200) {
            localStorage.removeItem('CreditCardPayment')
            setLoadingPrint(false)
            PrintCashPaymentReceipt(response1.data);
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }
  
        } else {
          // Handle other response statuses if needed
          console.log('Request failed with status:', response.status);
        }

        
        if (PaymentType === 'DEBIT CARD') {
          const CreditCard:any = localStorage.getItem('CreditCardPayment')
          const response1 = await axios.post(`${BASE_URL}/api/save-credit-card-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,
            TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName,OrderType:OrderType,CreditCard:CreditCard});
          if (response1.status === 200) {
            localStorage.removeItem('CreditCardPayment')
            setLoadingPrint(false)
            PrintCashPaymentReceipt(response1.data);
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }
  
        } else {
          // Handle other response statuses if needed
          console.log('Request failed with status:', response.status);
        }

        
        if (PaymentType === 'CHARGE') {
          const CreditCard:any = localStorage.getItem('CreditCardPayment')
          const response1 = await axios.post(`${BASE_URL}/api/save-credit-card-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,
            TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName,OrderType:OrderType,CreditCard:CreditCard});
          if (response1.status === 200) {
            localStorage.removeItem('CreditCardPayment')
            setLoadingPrint(false)
            PrintCashPaymentReceipt(response1.data);
          } else {
            // Handle other response statuses if needed
            console.log('Request failed with status:', response.status);
          }
  
        } else {
          // Handle other response statuses if needed
          console.log('Request failed with status:', response.status);
        }


        
        if (PaymentType === 'MULTIPLE') {
          const CreditCard:any = localStorage.getItem('CreditCardPayment')
          const response1 = await axios.post(`${BASE_URL}/api/save-credit-card-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,
            TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName,OrderType:OrderType,CreditCard:CreditCard});
          if (response1.status === 200) {
            localStorage.removeItem('CreditCardPayment')
            setLoadingPrint(false)
            PrintCashPaymentReceipt(response1.data);
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
      setCustomeryPaymentModal(false)
      setOrderTypeModal(true)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      setDiscountData('')
      setCartItems('')
      setTableNo('')
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
        setPaymentOpenModal(false);
        setDiscountData('')
        setCartItems('')
        setTableNo('')
      setOrderTypeModal(true)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      }})
  

  }

  if (OtherCommandOpenModal) {
    setOtherCommandOpenModal(false);
  }

  if (SelectTypeOfTransaction) {
    setSelectTypeOfTransaction(false);

  }

}


///************ SELECT TYPE OF TRANSACTION*************** */
const CloseSalesOrderListOpenModal = () => {

  setSalesOrderListOpenModal(false)
  setTableNoModal(true)
  setTableNo('')
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
  setDiscountData(data.DiscountData)
  setDiscountType(data.DiscountType)

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
        }
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

setPaymentType('CHARGE')
}

const CloseChargeModal = () => {
  setChargeToModal(false)
  setTimeout(() => {
    if (CashPaymentRef.current){
      CashPaymentRef.current?.focus();
      CashPaymentRef.current.style.backgroundColor = 'blue';
      setisFocus(0)

    }

  }, 50);
}





//// ************************** CREDIT CARD PAYMENT TYPE TRANSACTION ******************

const OpenCreditCardPayment = () => {
  setCreditCardPaymentModal(true)
  setPaymentOpenModal(false)
  setPaymentType('CREDIT CARD')
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
  localStorage.setItem('CreditCardPayment',data)
  setCreditCardPaymentModal(false)
  setCreditCardPaymentEntryModal(true)
}

const CloseCreditCardPaymentEntryModal = () => {
  setCreditCardPaymentEntryModal(false)
  setPaymentOpenModal(true)
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
  setDebitCardPaymentModal(true)
  setPaymentOpenModal(false)
  setPaymentType('DEBIT CARD')
}

const CloseDebitCardPayment = () => {
  setDebitCardPaymentModal(false)
  setPaymentOpenModal(true)
  setTimeout(() => {
    if (CashPaymentRef.current){
      CashPaymentRef.current?.focus();
      CashPaymentRef.current.style.backgroundColor = 'blue';
      setisFocus(0)

    }

  }, 50);
}





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

  const TransferOrdertable = () => 
  
  {
    setSelectTypeOfTransaction(false)
  };

   
const SelectTable = (index:any) => {
  setTableNo(index.table_count);

  setQueNo('')
  if (index.Paid === 'N') {
    setSelectTypeOfTransaction(true)
    setTimeout(() => {
      AddOrderRef.current?.focus();
      
    }, 50);
  } else {
    // Handle other cases when index.Paid is not 'N'
    setisSelected(0)
    setTableNoModal(false);
    // Additional logic or function calls related to paid table
  }
};

const SelectQue = (index:any) => {
  // setisSelected(0)
  setQueNo(index.q_no);
  setTableNo('')
  if (index.Paid === 'N') {
    setSelectTypeOfTransaction(true)
    setTimeout(() => {
      AddOrderRef.current?.focus();
      
    }, 50);
  } else {
    setisSelected(0)
    // Handle other cases when index.Paid is not 'N'
    setTableNoModal(false);
    // Additional logic or function calls related to paid table
  }
};

const SelectTableOk = (searchItemindex: string) => {

  if (showTable) {
    if (parseFloat(searchItemindex) <= TableList.length) {
      const index = TableList.findIndex(item => item.table_count === parseFloat(searchItemindex) && item.Paid === 'N');
        console.log(index)
      if (index !== -1) {
        setSelectTypeOfTransaction(true)
        setTimeout(() => {
          AddOrderRef.current?.focus();
          
        }, 50);
      } else {
        setTableNoModal(false);
        setisSelected(0)
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
      }
    
    
    // else {
    //   Swal.fire({
    //     title: 'Error',
    //     text: `Selected Que is Not Existed Please Select Another Que No`,
    //     icon: 'info',
    //     confirmButtonText: 'OK'
    //   });
    
    //   setTableNo('')
    // }
  }


};




useEffect(() => {
  const chatSocket = new WebSocket('ws://localhost:8001/ws/count/');

  chatSocket.onopen = () => {
    console.log('WebSocket connection established.');
    const message = {
      'message': 'Hello, world im back!'
    };
    chatSocket.send(JSON.stringify(message));
  };

  chatSocket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log('Received data:', data);
    fecthTableList();
  };

  chatSocket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  return () => {
    // Clean up WebSocket connection on component unmount
    chatSocket.close();
  };
}, []); // Empty dependency array ensures this effect runs only once, on mount


// useEffect(() => {
//   // Fetch data initially when the component mounts
//   fecthTableList();

//   // Set up a timer to fetch data every 20 seconds
//   const interval = setInterval(() => {
//     fecthTableList();
//     fecthQueList();
//   }, 5000);

//   // Clear the interval when the component unmounts
//   return () => clearInterval(interval);
// }, []);

 const fecthTableList = () => {
  if (TableList.length != 0){
  setLoading(false)
  }
      const apiUrl = `${BASE_URL}/api/table/count/?site_code=${SideCode}`; // Replace with your actual site code
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setTableList(data.tables);
          setLoading(false) // Assuming the response data has a 'tables' key
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
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setQueList(data.que);
          setLoading(false) // Assuming the response data has a 'tables' key
        })
        .catch(error => {
          console.error('There was a problem fetching the data:', error);
        });
 };


    const addToCart = (item: any) => {
        // Create a new array by spreading the existing cartItems and adding the new item to it
        const updatedCartItems = [...cartItems, item];
    
        setCartItems(updatedCartItems);
      };

      const calculateTotalDue = () => {
        let totalDue = 0;
        for (const item of cartItems) {
          let amountWithoutCommas :any = 0;
          if (item.totalAmount !== undefined) {
             amountWithoutCommas = item.totalAmount.replace(/,/g, ''); // Remove commas from the amount
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

        if (DiscountData.length !== 0) {
          totalDue = totalDue - (parseFloat(DiscountData.SLess20SCDiscount) + parseFloat(DiscountData.SLessVat12))
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
              const response = await axios.get(`${BASE_URL}/api/product/`);
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
                const response = await axios.get(`${BASE_URL}/api/product/category/`);
                setCategory(response.data);
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


    const [isKey, setIsKey] = useState<boolean>(false);

    const [isModal,setisModal] = useState<boolean>(false)

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
                  if (CustomerDineInModal || SalesOrderListOpenModal || CashPaymentEntryModal || CustomeryPaymentModal || ReprintTransactionModal || CashBreakDownModal || ChargeToModal || CreditCardPaymentModal || CreditCardPaymentEntryModal || DebitCardPaymentModal || OpenVireficationModal) {
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
        setPaymentOpenModal(false)
        if (tableNoModal){
          if(SelectTypeOfTransaction){
            setSelectTypeOfTransaction(false)
          }else{
            setTableNoModal(false)
            setOrderTypeModal(true)
            setTimeout(() => {
              DineInRef.current?.focus()
            }, 500);
          }
      
        } else if (OtherCommandOpenModal){
          setOtherCommandOpenModal(false)
        }
    
        }
      };
    
      window.addEventListener('keydown', handleKeyPress);
    
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, [DineIn, TotalDue, SaveOrderClick, PaymentClickControlS]);
  
//// FETCH DINE IN DATA EVERY 10 SECONDS ////
  

  
    useEffect(() => {


      const storedCartDataString = localStorage.getItem('cartData');
      const storeDataInfo = localStorage.getItem('DataInfo');

    
      if (storedCartDataString !== null && storeDataInfo !== null) {
        const storedCartData = JSON.parse(storedCartDataString);

        const DataInfo = JSON.parse(storeDataInfo);
        setCartItems(storedCartData);
        RePrintCashPaymentReceipt(DataInfo)
      } else {
        console.error('No cart data found in localStorage');
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


const theme = useTheme();
const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));

const [deviceType, setDeviceType] = useState<string>('');

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
    
      setTableNo('')
  
      TableNoRef.current?.focus()
      TableNoRef.current?.select()
    }
  }


}, [TableNo]);


//*************************VERIFICATION ****************************/

const [VeryficationType,setVeryficationType] = useState<string>('')
const OpenVireficationEntry = (type:any) => {
  setOpenVireficationModal(true)

  if (type === 'Senior'){
    setPaymentOpenModal(false)
  }

  setVeryficationType(type)
}

const CloseVerification = () => {
  setOpenVireficationModal(false)
}

const OKVerification = (data:any) => {
  setOpenVireficationModal(false)
  
  if (VeryficationType=='Delete Order'){
    onDelete()
    setisSelected(0)
  } else if (VeryficationType ==='Reprint'){
    ReprintList()
  }
  else if (VeryficationType == 'Senior'){
    OpenSeniorCitezenEntry();
  }

  if (VeryficationType == 'Item'){
    OpenItemDiscountEntry();
  }

  if (VeryficationType == 'Trade'){
    OpenTradeDiscountEntry();
  }
  if (VeryficationType == 'Transaction'){
    OpenTransactionDiscountEntry();
  }




}


const [OpenItemDiscountModal,setOpenItemDiscountModal] = useState<boolean>(false)
const [OpenTradeDiscountModal,setOpenTradeDiscountModal] = useState<boolean>(false)
const [OpenTransactionDiscountModal,setOpenTransactionDiscountModal] = useState<boolean>(false)
const [OpenSeniorCitezenDiscountModal,setOpenSeniorCitezenDiscountModal] = useState<boolean>(false)
const [SelectedItemDiscount,setSelectedItemDiscount] = useState(null)
const [TypeofDisCount,setTypeofDisCount] = useState<any>('')
const [Dis,setDis] = useState<boolean>(false)
const [DisEntry,setDisEntry] = useState<any>('')


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
  setDiscountData(data)
  // setDisEntry(data)
  setDis(true)
  setOpenSeniorCitezenDiscountModal(false)

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
   

    const triggerPrint = async () => {
      try {
          // Make a POST request to the Django backend endpoint
          const response = await fetch(`${BASE_URL}/api/print/`, {
              method: 'POST',
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
              doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');
              doc.write('<div style="width: 300px; margin:none; font-size:10px">');
              doc.write('<div>'); // Start a container div for content
        
              // Embed the logo image using an <img> tag
              doc.write('<div style="text-align: center;">');
              doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
              doc.write('</div>');
    
              doc.write('<div style="text-align: center;">');
              doc.write('<p> Sales Order </p>');
              doc.write('</div>')
              doc.write(`<DIV>Customer: ${SOInfo.Customer} </DIV>`);
              doc.write(`<div>Table No: ${TableNo}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp; Guest Count: ${SOInfo.GuestCount}</div>`);
              doc.write('<div style="text-align: center;">');
              doc.write(`<p> ${OrderType}</p>`);
              doc.write('</div>')
    
    
              doc.write('<div style="text-align: center;">');
              doc.write('<div>---------------------------------------------</div>');
              doc.write(`<div> SO# ${SONumber.SO_NO}</div>`);
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
              const spacesWaiter = ' '.repeat(Math.max(0, 47 -(waiter.length + SOInfo.Waiter.length) ));
              receiptContent1 = `<div>${waiter} ${spacesWaiter}${SOInfo.Waiter}</div>`;
              doc.write('<pre>' + receiptContent1 + '</pre>');
    
    
    
    
              //********************************************************* */
    
              const TRANS = 'TRANS# :';
              const documentno = Math.abs(SONumber.documentno);
              const DocumentNo = String(documentno).padStart(8,'0')
    
    
              const spacesTRANS = ' '.repeat(Math.max(0, 47 -(TRANS.length + DocumentNo.length + SONumber.TerminalNo.length +1) ));
              receiptContent1 =`<div>${spacesTRANS} ${TRANS}${SONumber.TerminalNo}-${DocumentNo} </div>`
    
     
    
              doc.write('<pre>' + receiptContent1 + '</pre>');
              //********************************************************* */
    
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
     
              

 
              DeletePosExtendedAll()
              triggerPrint()
              setTimeout(async () => {
                
                  iframeWindow.print();
                

               
              if (SOInfo.PaymentType ==='Sales Order'){
                setOrderType('')
                setOrderTypeModal(true)
                setTimeout(() => {
                  DineInRef.current?.focus()
                }, 50);
                setShowIframe(false)
                iframe.style.display = 'none';
                setCartItems([])
                setTableNo('')

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
      const receiptContent = generateReceipt();
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
    


    description = 'WAITER:';
    data = dataInfo.WaiterName || ''; 
    spaces = AlignmentSpace(description, data);
    receiptContent1 += `<div>${description}${spaces}${data}</div>`;


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

    
    description = 'CASHIER:';
    data = localStorage.getItem('FullName') || ''; 
    spaces = AlignmentSpace(description, data);
    receiptContent1 = `<div>${description}${spaces}${data}</div>`;
    


    description = 'WAITER:';
    data = dataInfo.data.WaiterName || ''; 
    spaces = AlignmentSpace(description, data);
    receiptContent1 += `<div>${description}${spaces}${data}</div>`;


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
  triggerPrint()
  setTimeout(() => {
    iframeWindow.print();
    // window.location.reload(); 

    setOrderType('')
    setOrderTypeModal(true)
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
    doc.write('<p style="font-size:12px">CASH COUNT</p>');
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
  // Remove the iframe after printing
  setTimeout(() => {
    iframeWindow.print();
    // window.location.reload(); 

    setOrderType('')
    setOrderTypeModal(true)
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
      setOrderTypeModal(true)
      setTimeout(() => {
        DineInRef.current?.focus()
      }, 50);
      setCartItems('')
      setTableNo('')
      setDiscountData('')
    }})

}


const [categoryHide, setCategoryHide] = useState(true);

const [isFocus,setisFocus] = useState<any>(0)


const PaymentModalHandleKeydown = (event:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) => {
  event.preventDefault();
  if (event.key == 'ArrowRight' || event.key == 'ArrowDown') {
      NextRef.current.focus();
      NextRef.current.style.backgroundColor = 'blue';
      CurrentRef.current.style.backgroundColor = 'white';
      if (index == 5) {
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
    OpenDebitCardPayment()
   }
   if (index == 4){
    OpenChargeModal()
   }
   if (index == 5){
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
   if (index == 1){
    SettleOrdertable()
   }
   if (index == 2){
    TransferOrdertable()
   }
   if (index == 3){
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


  return (
    <>
    
    <Grid
      container
      className='Restaurant-trans'
      style={{ height: '100vh' }}
      spacing={1}
      justifyContent="space-between" // Adjust alignment as needed
    >

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
            fontSize: { xs: '1.2rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.2rem' },
            color: '#ffffff',backgroundColor: '#007bff',
            padding: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            borderRadius: '5px',margin: '10px',
            fontWeight: 'bold', textAlign: 'center',
            justifyContent: 'space-between', // Aligns items at the start and end of the flex container
            alignItems: 'center', // Aligns items at the center of the flex container
            }}>
         Category Section
            </Typography>

            <div className='Category-container' style={{ overflowY: 'auto', maxHeight: '90vh', border: ' 1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '10px' }}>
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

            <div style={{display: categoryHide ? 'block':'none'}}>
            <CategoryGrid category={category} onReceiveProducts={handleProductsFromCategory} IsModalOpen={IsModalOpen} />
            </div>

          </div>

      </div>

</Grid>


    <Grid item xs={12} md={7} style={{ height: '100%',width:'100%'}}>
      <div className="Product">
          <Typography      
        sx={{
          fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.2rem' },
        color: '#ffffff',backgroundColor: '#007bff',
        padding: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',margin: '10px',
        fontWeight: 'bold', textAlign: 'center',}}>
         Product Section
          </Typography>
         

  
          <div className='Product-container' style={{ overflowY: 'auto', height: '90vh', border: ' 1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '10px' }}>
            <ProductGrid products={products} addtocart={addToCart} selectedProductData={selectedProductData} isSelected ={isSelected} IsModalOpenF = {IsModalOpen} />
           
          </div>
        </div>
    </Grid>

    <iframe id="myIframe" style={{position:'absolute',display:'none',backgroundColor:'#ffff',height:'90%',marginTop:'10px',width:'25%',

      marginLeft:'35%',borderRadius:'10px',   zIndex: '9999'}} src="https://example.com"></iframe>


      <Grid item xs={12} md={3} style={{ height: '100%',width:'60%' }}>
      <div className='Transaction-container' style={{ height: '95%'}}>
          <Typography      
              sx={{
              fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1rem', lg: '1.1rem', xl: '1.2rem' },
              color: '#ffffff',backgroundColor: '#007bff',
              padding: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',margin: '10px',
              fontWeight: 'bold', textAlign: 'center',}}>
                {QueNo !== '' ? 
                `TAKE OUT QUE NO. ${parseInt(QueNo)}`
                :
                (OrderType === 'TAKE OUT' ? 'TAKE OUT' : `${OrderType} Table No. ${TableNo}`)
                }
          </Typography>
         
          <Transaction cartitems={cartItems} setcartitems={setCartItems} totaldue={calculateTotalDue()} EditOrderList={EditOrderList} DiscountData ={DiscountData}/>

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
                          onClick={OpenTableNoModal}
                          fullWidth >
                          <Typography
                            variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                            fontSize: { xs: '1rem', sm: '1rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                           fontWeight: 'bold', color: 'blue',textAlign: 'center',
                            }}> Sales Order
                          </Typography>
                          <img src={SalesOrderImage} alt="Sales Order"
                            style={{
                              maxWidth: '80%', maxHeight: '50%',marginBottom: '10px', flex: '0 0 auto',
                            }}
                          />
                        </Button>
 
                        <Button
                          style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                            display: 'flex',flexDirection: 'column',alignItems: 'center',
                            borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                            borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
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
                        borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
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
                      onClick={RefreshModule}
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
{CashBreakDownModal && <CashBreakDown CashBreakDownDataList ={CashBreakDownDataList} CloseCashBreakDownModal={CloseCashBreakDownModal}/>}
{ChargeToModal && <ChargeTo handleClose={CloseChargeModal} amountdue={formattedTotalDue}/>}
{CreditCardPaymentModal && <CreditCardPayment handleClose={CloseCreditCardPayment} amountdue={formattedTotalDue} CreditCardPayment ={CreditCardPaymentOk}/>}
{CreditCardPaymentEntryModal && <CreditCardPaymentEntry handleClose={CloseCreditCardPaymentEntryModal} amountdue={formattedTotalDue} amounttendered={SaveCreditCardPayment}/>}
{DebitCardPaymentModal && <DebitCardPayment handleClose={CloseDebitCardPayment} amountdue={formattedTotalDue}/>}
{OpenVireficationModal && <Verification handleClose={CloseVerification} VerificationEntry={OKVerification}/>}

{OpenSeniorCitezenDiscountModal && <SeniorCitezenDiscount handleClose={CloseSeniorCitezenDiscount} SeniorData={SaveSeniorCitezenDiscount} 
                                              amountcover={formattedTotalDue} SeniorOrderData={cartItems}/>}
{OpenItemDiscountModal && <ItemDiscounts handleClose={CloseItemDiscountsEntry}  SelectedItemDiscount={SelectedItemDiscount} DiscountedData={SaveItemDiscountEntry}/>}

{OpenTradeDiscountModal && <TradeDiscountList handleClose={CloseTradeDiscountsEntry} SalesOrderListings ={cartItems} TradeData={SaveTradessDiscountEntry}/>}
{OpenTransactionDiscountModal && <TransactionDiscount handleClose={CloseTransactionDiscountsEntry} SalesOrderListings ={cartItems} TransactionData={SaveTransactionDiscountEntry}/>}
{/* if (CustomerDineInModal || SalesOrderListOpenModal || CashPaymentEntryModal || CustomeryPaymentModal) */}


{OrderTypeModal && (
          <div className="modal">
            <div className="modal-content" style={deviceType === 'Desktop' ? { width: '450px' ,display:'flex',flexDirection:'column' } : { width: '320px',display:'flex',flexDirection:'column' }}>
              {/* <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'red' }}>
                Choose Order Type
              </h2> */}

        <Typography
            variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
            align="center"
            sx={{
              fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              border: '2px solid #4a90e2',
              borderRadius: '10px',
              padding: '10px',
              color: 'red !important',
              fontWeight:'bold'
            }}
          >
          Choose Order Type
        </Typography>

              <Button className="button-dine-in"onClick={handleDineIn} 
              ref={DineInRef}
              onKeyDown={(e)=> OrderTypeHandleKeydown(e,TakeOutRef,DineInRef,TakeOutRef,0)}
              >
                <Typography      
                  sx={{
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                  color: '#ffffff',backgroundColor: '#007bff',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  borderRadius: '5px',
                  fontWeight: 'bold', textAlign: 'center',}}>
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

{ tableNoModal && (
  <div className="modal" >
    <div className="modal-contentTable"  >

{/* <div onKeyDown={handleDivInput} tabIndex={0} ref={TableNoModalRef}> */}


    {isDesktop ? (        
              <>
                <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'Blue' }}>
                  {showTable ? `SELECT TABLE ${TableNo}` : 'SELECT QUE NO.'}
                </h2>
                <input
                type="number"
                ref={showTable ? TableNoRef : QueNoRef}
                inputMode="numeric"
                placeholder={showTable ? 'Table No' : 'QUE NO.'}
                style={{ width: '100%', margin: '5px', textAlign: 'center' }}
                value={showTable ? TableNo : QueNo}
                onChange={(e) => (showTable ? setTableNo(e.target.value) : setQueNo(e.target.value))}
                onKeyDown={(e) => TableNoHandleKeydown(e)}
              />

              </>

                ):(
                    <><h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'Blue' }}>
                   {showTable ? `SELECT TABLE ${TableNo}` : 'SELECT QUE NO.'}
                    </h2>

                    <div style={{margin:'5px',display:'flex',flexDirection:'row'}}>

                    <input type="number" ref={TableNoRef} inputMode="numeric" placeholder="Table No" style={{width:'100%' ,margin:'5px'}} defaultValue={TableNo}  onChange={(e) => setTableNo(e.target.value)}/>
                    <button className="btn" style={{width:'100%',height:'40px',margin:'5px'}} onClick={() => SelectTableOk(TableNo)}>OK</button>
                    </div></>
                   
                )}


      

  {/* <div className='containertable' style={{display:'flex',flexDirection:'row'}}> */}

  <Grid container className="CreditCard-Container" spacing={2}>
      <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>
        <div style={{overflow:'auto',height: '75%',width:'100%' }}>

  <div style={{ display: 'grid', gridTemplateColumns: isDesktop? 'repeat(3, minmax(100px, 1fr))': 'repeat(3, minmax(33%, 1fr))', gap: '5px' ,margin:'5px',overflow:'auto',height: '550px',
        border: '2px solid #4a90e2',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',padding:'10px',borderRadius:'10px' }}>
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
        (TableList.map(item => (
            <div key={item.table_count} className={item.Paid} onClick={() => SelectTable(item)}
              style={{border: '1px solid #4a90e2',padding: '5px',height: '100px', display: 'flex',flexDirection: 'column',
                alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                backgroundColor:item.Paid  === 'N' ? 'RED' : '', }}>

                <p key={item.table_count} style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'20px' ,fontWeight:'bold' ,color:'blue'}}>
                        {item.table_count}</p>
                <img src= {table} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />

            </div>
              )))

              ):(
                (QueList.map(item => (
                  <div key={item.q_no} className={item.Paid} onClick={() => SelectQue(item)}
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


      <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>
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
        <button className="num-pad-key" style={{ width: '33%',height:'100%'}} onClick={() => handleBackspace()}>
   
          <Typography      
        sx={{
          fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.5rem' }}}>
                  Back
          </Typography>
          </button>
          <button className="num-pad-key" style={{ width: '33%',height:'100%'}}  onClick={() => handleInput('0')}>0</button>
          <button className="num-pad-key" style={{ width: '33%',height:'100%',padding:'9% 0'}}  onClick={ChangeViewToQue}>
          <Typography      
        sx={{
          fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.5rem' }}}>
               {showTable ? 'Que No':'Table No'}
          </Typography>
    
            </button>
      
        </div>
        <div className="num-pad-row">
          <button className="num-pad-key" onClick={CloseTableNo} style={{width:'33%'}}>

            <Typography      
        sx={{
          fontSize: { xs: '1.2rem', sm: '0.9rem', md: '1rem', lg: '1.1rem', xl: '1.5rem' }}}>
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
          <div className="modal-content" style={{width:'100%'}}>
          <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                    SELECT PAYMENT</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px' ,margin:'5px'}}>


            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}
              tabIndex={0}
              onKeyDown={(e)=> PaymentModalHandleKeydown(e,CashPaymentRef,CashPaymentRef,CreditCardPaymentRef,0)}
              onClick={CashPayment} ref={CashPaymentRef}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,height:'70px',fontWeight:'bold' 
              ,color: isFocus == 0 ? 'White' :'Blue',textAlign:'center'}}>
               Cash Payment</p>
              <img src= {cash} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>
              

            <div    
            
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }} 
              tabIndex={1}
              onKeyDown={(e)=> PaymentModalHandleKeydown(e,CashPaymentRef,CreditCardPaymentRef,EPSPaymentRef,1)}
              ref={CreditCardPaymentRef}
              onClick={OpenCreditCardPayment}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold'
                 ,color: isFocus == 1 ? 'White' :'Blue',textAlign:'center'}}>
               Credit Sales</p>
              <img src= {credit} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}  
              tabIndex={2}
              onKeyDown={(e)=> PaymentModalHandleKeydown(e,CreditCardPaymentRef,EPSPaymentRef,MultiplePaymentRef,2)}
              ref={EPSPaymentRef}
              onClick={OpenDebitCardPayment}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,height:'70px' ,fontSize:'15px' ,fontWeight:'bold' 
                     ,color: isFocus == 2 ? 'White' :'Blue',textAlign:'center'}}>
               EPS</p>
              <img src= {epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}
              tabIndex={3}
              onKeyDown={(e)=> PaymentModalHandleKeydown(e,EPSPaymentRef,MultiplePaymentRef,ChargePaymentRef,3)}
              ref={MultiplePaymentRef}
              >

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' 
        ,color: isFocus == 3 ? 'White' :'Blue',textAlign:'center'}}>
               Multiple Payment</p>
              <img src= {Multiple} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>
              

            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }} 
              tabIndex={4}
              onKeyDown={(e)=> PaymentModalHandleKeydown(e,MultiplePaymentRef,ChargePaymentRef,ClosePaymentRef,4)}
              ref={ChargePaymentRef}
              onClick={OpenChargeModal}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' 
                    ,color: isFocus == 4 ? 'White' :'Blue',textAlign:'center'}}>
               Charge</p>
              <img src= {ChargeRoom} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>


            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}
              tabIndex={5}
              onKeyDown={(e)=> PaymentModalHandleKeydown(e,ChargePaymentRef,ClosePaymentRef,CashPaymentRef,5)}
              ref={ClosePaymentRef}
              onClick={CloseModal} >

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' 
                 ,color: isFocus == 5 ? 'White' :'Blue',textAlign:'center'}}>
               Close</p>
              <img src= {CloseImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

          </div>



      

      
              {OrderType === 'TAKE OUT' && (
          <><h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'Blue' }}>
                  SELECT DISCOUNT</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px', margin: '5px' }}>

                    <div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}
                      onClick={(e) => OpenVireficationEntry('Senior')}
                      >
                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Señior Citezin Discount</p>
                      <img src={Senior} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        PWD Discount</p>
                      <img src={pwdD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                    <div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Trade Discount</p>
                      <img src={tradeD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>


                    <div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Transaction Discount</p>
                      <img src={transactD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>



                    <div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}
                      onClick={CloseModal}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Close</p>
                      <img src={CloseImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div>

                  </div></> 
                )}

  
            
        </div>
        </div>
      )}

 {OtherCommandOpenModal && (
        <div className="modal" >
          <div className="modal-content" style={{width:'100%'}}>
          <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                    SELECT TRANSACTION</h2>
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? 'repeat(3, minmax(100px, 1fr))': 'repeat(3, minmax(33%, 1fr))' , gap: '5px' ,margin:'5px'}}>

{userRank == 'Cashier' && (
            <><div
                    style={{
                      border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                      borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                    }}>

                    <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', height: '70px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                      Item Discount</p>
                    <img src={itemD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                  </div><div
                    style={{
                      border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                      alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                      borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                    }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Suspend Transaction</p>
                      <img src={credit} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div><div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Return</p>
                      <img src={epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div><div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Cash Count</p>
                      <img src={epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div><div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Cash Pull-Out</p>
                      <img src={epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div><div
                      style={{
                        border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                        alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                        borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                      }}>

                      <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                        Lock Terminal</p>
                      <img src={Multiple} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                    </div></>
              ) }
            <div onClick={CloseTerminal}
            // <div onClick={logoutClick} 
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}>

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue', textAlign:'center'}}>
               Close Terminala</p>
              <img src= {ChargeRoom} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>


            
            <div     
              style={{border: '1px solid #4a90e2',padding: '5px',height: '115px', display: 'flex',flexDirection: 'column',
              alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
              borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
              }}
              onClick={CloseModal} >

              <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
               Close</p>
              <img src= {CloseImage} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
            </div>

          </div>




          

     </div>
        </div>
      )}


{SelectTypeOfTransaction && (
        <div className="modal" >
             
          <div className="modal-content" style={{width:'100%' ,display:'flex',flexDirection:'column' }}>
          <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'red'}}>
              Select Type of Transaction
            </h2>
            <button className="button-dine-in" 
            onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,AddOrderRef,AddOrderRef,SettleOrderRef,0)}
            ref={AddOrderRef}
            onClick={AddOrdertable}>Add Order</button>


            { userRank == 'Cashier' &&(
            <button className="button-take-out" 
            onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,AddOrderRef,SettleOrderRef,TransferTableRef,1)}
            ref={SettleOrderRef}
            onClick={SettleOrdertable}>Settle Order</button>

          )}


            <button className="button-dine-in" 
                onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,SettleOrderRef,TransferTableRef,CloseSelectTransTypeRef,2)}
              ref={TransferTableRef}
            onClick={TransferOrdertable}>Transfer table</button>

            <button className="button-dine-in-close" 
              onKeyDown={(e)=> SelectTransTypeHandleKeydown(e,TransferTableRef,CloseSelectTransTypeRef,AddOrderRef,3)}
              ref={CloseSelectTransTypeRef}
             style={{backgroundColor:'red'}} onClick={CloseModal}>Close</button>
          </div>
        </div>
      )}

{AddOrderModal && (
  
    <div className="modal">
  <div className="modal-content" style={{height:'auto'}}>

     <Typography      
        sx={{
        fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.2rem', lg: '1.4rem', xl: '1.6rem' },
        color: '#0d12a1',
        textShadow: '1px 1px 2px rgba(13, 18, 161, 0.7)',
        borderRadius: '5px',
        fontWeight: 'bold', textAlign: 'center',}}>
      {selectedProduct?.product.long_desc}
      </Typography>



  {/* <h1 className="threeDText">{selectedProduct?.long_desc}</h1> */}
    <img src={image} alt={selectedProduct?.product.bar_code} style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px' }} />

    
    <Typography      
        sx={{
        fontSize: { xs: '1.2rem', sm: '1.0rem', md: '1.0rem', lg: '1.1rem', xl: '1.2rem' },
        color: '#0d12a1',
        borderRadius: '5px',
        fontWeight: 'bold', textAlign: 'center',}}>
      Price: {parseFloat(selectedProduct?.product.reg_price).toFixed(2)}
      </Typography>

    <div className="input-group">
    <button className="btn" style={{backgroundColor:'white',color:'red' ,border:'solid'}} onClick={MinusQuantity} ><FontAwesomeIcon icon={faMinus}/> </button>
      <input type="number" ref={inputRef}  inputMode="numeric"  placeholder="Quantity" value={quantity} onChange={handleQuantityChange} 
       style={{width:'60%' ,margin:'10px', fontSize:'20px',fontWeight:'bold',textAlign:'center'}}
       onKeyDown={(event) => HandleAddtocart(event)}
       />
      <button className="btn" style={{backgroundColor:'white',color:'blue' ,border:'solid'}} onClick={addQuantity}> <FontAwesomeIcon icon={faPlus}  style={{ verticalAlign: 'middle' }}/></button>
    </div>

    <p className='TotalDue'>Total Due: {calculateTotal()}</p>

    

    <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
    <button style={{color:'white',backgroundColor:'red',width:'50%',textAlign:'center', display: 'inline-block'}} onClick={CloseAddOrderModal} className="btn-close"> <FontAwesomeIcon icon={faClose} />Close</button>
    <button className="btn-add-cart" style={{color:'white',backgroundColor:'blue',width:'50%',textAlign:'center', display: 'inline-block'}} onClick={addtocarts}>  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
  
  
  </div>
  </div>
</div>


  )}

{EditOrderModal && (
            <div className="modal">
            <div className="modal-content">
              
            <h1 className="threeDText">{selectedItemIndexData?.selectedItem.description}</h1>
            <img src={image} style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px' }} />
            <p className='Price'>Price: {parseFloat(selectedItemIndexData?.selectedItem.price).toFixed(2)}</p>
            <div className="input-group">
        
            <button className="btn" style={{backgroundColor:'white',color:'red' ,border:'solid'}} onClick={MinusQuantity} >
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
        )}


{CloseTerminalModal && (
        <div className="modal" >
             
          <div className="modal-content" style={{width:'50%' ,display:'flex',flexDirection:'column' }}>
          {/* <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px' ,color:'red'}}>
              Select Type of Transaction
            </h2> */}
          { userRank =='Cashier' &&(
            <button className="btn" style={{backgroundColor:'red'}} onClick={EndShiftHandleClick}>End Shift</button>
          )}
            <button className="btn" style={{backgroundColor:'blue'}} onClick={logoutClick}>Logout</button>
            <button className="btn"  style={{backgroundColor:'red'}} onClick={CloseLogout}>Cancel</button>
          </div>
        </div>
      )}
  
</Grid>
</>
);
};







export default Restaurant;


function html2pdf() {
  throw new Error('Function not implemented.');
}

