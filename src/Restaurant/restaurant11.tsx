/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */


import React, { useEffect, useState,useRef, ChangeEvent } from 'react';
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
import './restaurant.css';
import CustomerDineIn from './customerEntryDineIn';
import ListOfDineInSalesOrder from './listofDineInSalesOrder';
import CashPaymentEntry from './CashPaymentEntry';
import CustomerPayment from './CustomerEntryPayment';
import ReprintTransaction from './RepirintTransaction';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faShoppingCart, faMinus, faClose, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
// import CustomerDineIn from './customerEntryDineIn';
import QRCode from 'qrcode-generator';
import { Button, Grid, Typography } from '@mui/material';
import { createTheme, ThemeProvider,Theme,makeStyles, useTheme  } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import { isMobile,isTablet } from 'react-device-detect';

///**************PRODUCT GRID DESIGN*******************//


interface ProductList {
  long_desc: any;
  reg_price: any;
  bar_code: any;
}

interface ProductData {
  products :ProductList[];
  addtocart:any;
}



const ProductGrid: React.FC<ProductData> = ({ products , addtocart }) => {
  const [quantity, setQuantity] = useState<number | 1>(1); // Adjust the initial state value

    const [Price, setPrice] = useState<number>(1);






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

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const handleproductclick = (product:any) => {
      setSelectedProduct(product);
      setIsModalOpen(true);
      setPrice(product.reg_price);
       setQuantity(1);
       setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100); // 1000 millisecond

       
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

      const GridItem = styled.div`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 10px;
      margin: 10px;
     `;

     const [deviceType, setDeviceType] = useState<string>('');

  return (



    <><Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <GridItem>
          {products.map((product: { bar_code: React.Key | null | undefined; long_desc: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; reg_price: string; }) => (
          <div key={product.bar_code}
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
            }}
            onClick={() => handleproductclick(product)}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              <p style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px', flex: '1 1 100%', height: '40px' }}>{product.long_desc}</p>
              <img src={image} style={{ maxWidth: '80%', maxHeight: '150px', marginBottom: '10px', flex: '0 0 auto' }} />
              <p style={{ fontWeight: 'bold', textAlign: 'center', flex: '1 1 100%' }}>Price: {parseFloat(product.reg_price).toFixed(2)}</p>
            </div>
            {/* <p style={{fontWeight:'bold',textAlign:'center' , marginBottom: '10px'}}>{product.long_desc}</p>
            <img src={image} alt={product.bar_code} style={{ maxWidth: '80%', maxHeight: '150px', marginBottom: '10px' }} />
            <p style={{fontWeight:'bold',textAlign:'center' }}> Price: {parseFloat(product.reg_price).toFixed(2)}</p> */}
          </div>
        ))}
       
          </GridItem>
        </Grid>
      </Grid>

      {/* {isModalOpen && (
          <div className="modal" >
            <div className="modal-content" >
              
              <h1 className="threeDText">{selectedProduct?.long_desc}</h1>

              <img src={image} alt={selectedProduct?.bar_code} style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px' }} />
              <p className='Price'>Price: {parseFloat(selectedProduct?.reg_price).toFixed(2)}</p>
              <div className="input-group">
                <button className="btn" style={{ backgroundColor: 'white', color: 'red', border: 'solid' }} onClick={MinusQuantity}><FontAwesomeIcon icon={faMinus} /> </button>
                <input type="number" ref={inputRef} inputMode="numeric" placeholder="Quantity" value={quantity} onChange={handleQuantityChange}
                  style={{ width: '60%', margin: '10px', fontSize: '20px', fontWeight: 'bold', textAlign: 'center' }} />
                <button className="btn" style={{ backgroundColor: 'white', color: 'blue', border: 'solid' }} onClick={addQuantity}> <FontAwesomeIcon icon={faPlus} /></button>

              </div>
              <p className='TotalDue'>Total Due: {calculateTotal()}</p>
              <div style={{ display: 'flex', flexDirection: 'row', gap: '5px' }}>
                <button style={{ color: 'white', backgroundColor: 'red', width: '50%', textAlign: 'center', display: 'inline-block' }} onClick={onClose} className="btn-close"> <FontAwesomeIcon icon={faClose} />Close</button>
                <button className="btn-add-cart" style={{ color: 'white', backgroundColor: 'blue', width: '50%', textAlign: 'center', display: 'inline-block' }} onClick={addtocarts}>  <FontAwesomeIcon icon={faShoppingCart} /> Add to Cart</button>
              </div>
            </div>
          </div>
        )} */}
    </Box>

      </>
  );
};






///**************TRANSACTION GRID DESIGN*******************//
interface TransactionData {
  cartitems :any;
  setcartitems:any;
  totaldue:any;
}

const Transaction: React.FC<TransactionData> = ({ cartitems ,setcartitems,totaldue  }) => {
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
      setQuantity(selectedItem.quantity);
      setSelectedItemIndex(index); // Store the index directly, not the item itself
      setPrice(selectedItem.price);
      setDescription(selectedItem.description)
      setBarcode(selectedItem.barcode)
      // setLineNo(selectedItem.index)
      setIsOpenTransModal(true);
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100); // 1000 millisecond

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
  
    return (
      <div className="Transaction" style={{ overflowY: 'auto', maxHeight: '55%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '10px' }}>
        <table className="OrderList">
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
            <tr key={index} onClick={() => openModaltrans(index)}> 
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
          </tbody>
        </table>
      
        {IsOpenTransModal && (
            <div className="modal">
            <div className="modal-content">
            <h1 className="threeDText">{description}</h1>
            <img src={image} style={{ maxWidth: '200px', maxHeight: '150px', marginBottom: '10px' }} />
            <p className='Price'>Price: {parseFloat(Price).toFixed(2)}</p>
            <div className="input-group">
        
            <button className="btn" style={{backgroundColor:'white',color:'red' ,border:'solid'}} onClick={MinusQuantity} >
                <FontAwesomeIcon icon={faMinus}  />

                </button>
                {/* <input type="number" inputMode="numeric"  placeholder="Quantity" value={quantity}
                callbackFunction={(value) => handleQuantityChange({ target: { value } })}
                style={{width:'60%' ,margin:'10px', fontSize:'20px' , fontWeight:'bold',textAlign:'center'}}/> */}
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
        )}


      </div>
      
    );

  };
  




///**************CATEGORY GRID DESIGN*******************//

interface CategoryData {
  category :any;
  onReceiveProducts:any;
}
const CategoryGrid: React.FC<CategoryData> = ({ category , onReceiveProducts }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
    const [productscCat, setProducts] = useState([]);

    const fetchData = async (x: any) => {

    
      try {
        // const response = await axios.get(`${BASE_URL}/api/product/${x}`);
        const response = await axios.get(`${BASE_URL}/api/product-category/`,{
          params: {
            category:x,
          }
        });
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

 {category.map((categoryItem: { category: any; }) => (
    <Box
      key={categoryItem.category}
      onClick={() => fetchData(categoryItem.category)}
      sx={{
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
          selectedCategory === categoryItem.category ? '#ff9800' : '#007bff', // Change background color conditionally
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
    </Box>
  ))}
</Box>
    );
  };





  ///**************MAIN DESIGN*******************//
const Restaurant: React.FC = () => {
  const [OrderType, setOrderType] = useState<string>('');
  const [TableNo, setTableNo] = useState<string>('');
  const [CustomerName, setCustomer] = useState<string>('');
  const [SOCustomerName, setSOCustomer] = useState<any>([]);
  const [GuestCount, setGuestCount] = useState<number>(0);




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

  // const siteCode = useSiteCode();

  // Access user data values from the store

  
  const [SalesOrderListOpenModal, setSalesOrderListOpenModal] = useState<boolean>(false);
    const [products, setProducts] = useState<any>([]);
    const [category, setCategory] = useState<any>([]);
    const [cartItems, setCartItems] = useState<any>([]);
    const [cartItems1, setCartItems1] = useState<any>([]);
 
    interface TypeAndTableState {
      ordertTYpe: string;
      tableNo: string;
    }
    
    // Initialize the state with empty strings for ordertTYpe and tableNo
    const [TypeAndTable, setTypeAndTable] = useState<TypeAndTableState>({ ordertTYpe: '', tableNo: '' });
    const [CustomerOrderInfo, setCustomerOrderInfo] = useState<any>([]);
    // const onlineTestApp = new OnlineTestApp();
    const [AmountTendered,setAmountTendered] = useState<number>(0)
    const [ChangeAmount,setChangeAmount] = useState<number>(0)

    const [showIframe, setShowIframe] = useState<boolean>(false);
    const SideCode = localStorage.getItem('SiteCode');


    interface TableItem {
      table_count: number;
      Paid: string;
      // Define other properties as needed
    }
    
    // Initialize the state variable TableList with an empty array of TableItem type
    const [TableList, setTableList] = useState<TableItem[]>([]);


    // let receiptContentainer = 'Receipt\n\n';


    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
  

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

  

    const ChangeOrderType = () => {

      if (OrderType == 'DINE IN'){
        setOrderType('TAKE OUT')
        setTableNo('')
        setDineIn(false)

      
      }

      if (OrderType == 'TAKE OUT'){
        setOrderType('DINE IN')
        setTableNoModal(true)
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
}

    const handleDineIn = () => {
      setOrderTypeModal(false)
      setOrderType('DINE IN')
      setTableNoModal(true);
      setDineIn(true)
    };
  
    const handleTakeOut = () => {
      setOrderTypeModal(false)
      setOrderType('TAKE OUT')
      setDineIn(false)
    };

    const CloseTableNo = () => {
      setOrderTypeModal(true)
      setOrderType('')
      setTableNoModal(false);
    }

    const OtherCommand = () => {
      setOtherCommandOpenModal(true)
    }

   const PaymentClick = () => {
    if (parseFloat(formattedTotalDue )!== 0){
      setPaymentOpenModal(true)
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
   }

   useEffect(() => {
    console.log('CustomerName:', CustomerName);
    setCustomer(CustomerName)
  }, [CustomerName]);



   const CutomerInfoEntry = async (dataFromModal:any) => {
    // Handle the data received from the modal
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
    // const newTab = window.open('/Receipt', '_blank');
    try {
      const response = await axios.post(`${BASE_URL}/api/add-sales-order/`,{data:cartItems,data2:dictionary,TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo});
      if (response.status === 200) {
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

//// *************   END ***********************//

  ///************ CASH PAYMENT ENTRY*************** */
const CashPayment = () => {
  setPaymentOpenModal(false)
  setCashPaymentEntryModal(true)

}

const SaveCashPayment = async (data: { amounttendered: React.SetStateAction<number>; change: React.SetStateAction<number>; }) => {
  setCashPaymentEntryModal(false)
  setAmountTendered(data.amounttendered);
  setChangeAmount(data.change);
  setCustomeryPaymentModal(true)
};
////***************** END ****************/




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

      PrintCashPaymentReceipt(response.data.DataInfo)
    }
    
  } catch (error) {
    console.log('Error while Generating Reprint',error)
    
  }
}



///********************THIS SAVE THE DATA FOR CASH PAYMENT*****************************/
const CutomerInfoEntryPaymnet = async (data: any) =>{
setCustomeryPaymentModal(false)


  const CashierID = localStorage.getItem('UserID');
  const CashierName = localStorage.getItem('FullName');
  const TerminalNo = localStorage.getItem('TerminalNo');

  
    try {
      const response = await axios.post(`${BASE_URL}/api/save-sales-order-take-out/`,{data:cartItems,AmountTendered:AmountTendered,TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo});
      if (response.status === 200) {

        const response1 = await axios.post(`${BASE_URL}/api/save-cash-payment/`,{data:response.data.data,AmountTendered:AmountTendered,CustomerPaymentData:data,
          TableNo:TableNo,CashierID:CashierID,TerminalNo:TerminalNo,AmountDue:formattedTotalDue,CashierName:CashierName,OrderType:OrderType});
        if (response1.status === 200) {
    
          PrintCashPaymentReceipt(response1.data);
        } else {
          // Handle other response statuses if needed
          console.log('Request failed with status:', response.status);
        }

      } else {
        // Handle other response statuses if needed
        console.log('Request failed with status:', response.status);
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


const CloseModal = () => {
  if (PaymentOpenModal) {
    setPaymentOpenModal(false);
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
};

const settlebillData = async (data: { tableno: React.SetStateAction<string>; }) => {
  // Implement your logic here for settlebillData
  console.log('Settle bill data:', data);
  setSalesOrderListOpenModal(false)
  setTableNoModal(false)
  setDineIn(false)
  setTableNo(data.tableno)
  setPaymentOpenModal(true)

  try {
    const response = await axios.get(`${BASE_URL}/api/sales-order-listing/`, {
        params: {
          tableno: data.tableno,
        }
    });

  console.log(response.data)

  setCartItems1(response.data)
  setCartItems(response.data)
   
} catch (error) {
    console.error('Error fetching sales-order-listing:', error);
}};

////***************** END ****************/

  const AddOrdertable = () => 
  {

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
  if (index.Paid === 'N') {
    setSelectTypeOfTransaction(true)
  } else {
    // Handle other cases when index.Paid is not 'N'
    setTableNoModal(false);
    // Additional logic or function calls related to paid table
  }
};

const SelectTableOk = (searchItemindex: string) => {
if (parseFloat(searchItemindex) <= TableList.length) {
  const index = TableList.findIndex(item => item.table_count === parseFloat(searchItemindex) && item.Paid === 'N');
console.log(index)
  if (index !== -1) {
    setSelectTypeOfTransaction(true)
  } else {
    setTableNoModal(false);
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

};




 const fecthTableList = () => {
      const apiUrl = `${BASE_URL}/api/table/count/?site_code=${SideCode}`; // Replace with your actual site code
      fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setTableList(data.tables); // Assuming the response data has a 'tables' key
        })
        .catch(error => {
          console.error('There was a problem fetching the data:', error);
        });
 };

    const addToCart = (item: any) => {
        // Create a new array by spreading the existing cartItems and adding the new item to it
        const updatedCartItems = [...cartItems, item];
      
        // Set the state to the updated cartItems array
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
         }
        
          totalDue += parseFloat(amountWithoutCommas);
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


    useEffect(() => {
      const handleKeyPress = (e: { keyCode: number; preventDefault: () => void; ctrlKey: any; }) => {
        if (e.keyCode === 116) {
          e.preventDefault(); // Prevent the default browser refresh action for F5 (key code 116)

        }

        if (e.ctrlKey && e.keyCode === 78) {
          e.preventDefault(); // Prevent the default browser action for Control + N (key code 78)
      }
        // if (e.keyCode === 27) {
         
        // }
        
      };
  
      window.addEventListener('keydown', handleKeyPress);
  
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);

//// FETCH DINE IN DATA EVERY 10 SECONDS ////
  
    useEffect(() => {
      // Fetch data initially when the component mounts
      fecthTableList();
  
      // Set up a timer to fetch data every 20 seconds
      const interval = setInterval(() => {
        fecthTableList();
      }, 5000);
  
      // Clear the interval when the component unmounts
      return () => clearInterval(interval);
    }, []); // Empty dependency array ensures the effect runs only once on mount
  
  

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


    receiptContent += '<div>-----------------------------------------------------</div>'
    receiptContent += '<div>QTY  |              DESCRIPTION       </div>'
    receiptContent += '<div>-----------------------------------------------------</div>'
 
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
    
        const formattedQuantity = String(item.quantity).padEnd(4, ' ')
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


        receiptContent += '<div>=====================================================</div>'

        receiptContent +=  `${formattedQuantity} ${spaces}${amountDue}`;
     
//#endregion
       }

    
      return receiptContent;
    };







//******** PRINT SALES ORDER AREA******** */
    const printReceipt = async (SOInfo: any,SONumber: any) => {
      const generateReceiptIframe = (receiptContent: string, logoSrc: { logo: string; }) => {


  
     
     
        // const IframeContainer = iframeContainerRef.current

        // const iframe = document.createElement('iframe');
        // iframe.style.display = 'none';
        // document.body.appendChild(iframe);

        const iframe = document.getElementById('myIframe') as HTMLIFrameElement | null;


    
        if (iframe !==null){

          setShowIframe(true)
          if (iframe) {
            iframe.style.display = 'block';
          // Set display property to 'block' to show the iframe
          }

          iframe.onload = () => {
            const currentDate = new Date();   
              // Format the date and time as needed
             const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
            // Write the receipt content to the iframe document
            // const doc = iframe.contentDocument || iframe.contentWindow.document;
            const iframeWindow = iframe.contentWindow;

            if (iframeWindow !== null) {
              const doc = iframeWindow.document;


              doc.open();
              doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');
              doc.write('<div style="width: 350px; margin:none; font-size:12px">');
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
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp; Guest Count: ${SOInfo.GuestCount}</div>`);
              doc.write('<div style="text-align: center;">');
              doc.write(`<p> ${OrderType}</p>`);
              doc.write('</div>')
    
    
              doc.write('<div style="text-align: center;">');
              doc.write('<div> -----------------------------------------------------</div>');
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
  
              
            // Remove the iframe after printing
               setTimeout(async () => {
                iframeWindow.focus();

              iframeWindow.print();
              setTimeout(() => {
                iframeWindow.close();
              }, 1000);
     


              if (SOInfo.PaymentType ==='Sales Order'){
                window.location.reload(); 
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
              // Print the receipt
            
        
              // Remove the iframe after printing
              setTimeout(() => {
                document.body.removeChild(iframe);
              // Reload the page after printing
              }, 20000); // Adjust timeout as needed for printing to complete
                    } };
     
          // Set iframe src to initiate loading
          iframe.src = 'about:blank';
       
          return iframe;
        }
      
      };
    
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

// Format the date and time as needed
   const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: 'UTC' });
    // Write the receipt content to the iframe document
    // const doc = iframe.contentDocument || iframe.contentWindow.document;

    const iframeWindow = iframe.contentWindow;

    if (iframeWindow !== null) {
      const doc = iframeWindow.document;

      doc.open();
    // doc.write('<style>body { font-family: "Courier New", Courier, monospace; }</style>');
    doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');

    doc.write('<div style="width: 350px; margin:none; font-size:12px">');
    doc.write('<div>'); // Start a container div for content

    // Embed the logo image using an <img> tag
    doc.write('<div style="text-align: center;">');
    doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
    doc.write('</div>');



    doc.write('<div style="text-align: center;">');
    doc.write('<div> -----------------------------------------------------</div>');

  

    doc.write(`<div> ${dataInfo.data.CustomerCompanyName}</div>`);


    doc.write(`<div> ${dataInfo.data.CustomerCompanyAddress}</div>`);
    doc.write(`<div> ${dataInfo.data.TelNo}</div>`);
    doc.write(`<div> ${dataInfo.data.CustomerTIN}</div>`);
    doc.write(`<div> ${dataInfo.data.SerialNO}</div>`);
    doc.write(`<div> ${dataInfo.data.MachineNo}</div>`);



    doc.write('<p>This Serve as an Official Receipt </p>');
    doc.write(`<div> SI# ${parseFloat(dataInfo.data.OR)}</div>`);
    doc.write(`<div> ${formattedDateTime} </div>`);
    doc.write('</div>')
    // Write the receipt content
    doc.write('<pre>' + receiptContent + '</pre>');
    // doc.write('<div style="text-align: center;">');
    // doc.write('<div> -----------------------------------------------------</div>');
    // doc.write('</div>')





      let receiptContent1 = '';

      const AlignmentSpace = (description: string | any[], data: string | any[]) => {
        const totalLength = 47; // Total desired length for alignment
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
            receiptContent1 += '<div style="margin-top:-3px; padding: 0;">=====================================================</div>'
           
            doc.write('<pre>' + receiptContent1 + '</pre>');

            description = 'TOTAL DUE:';
            data = formattedTotalDue || ''; 
            spaces = AlignmentSpace(description, data);
            receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;
            receiptContent1 += '<div style="margin:-3px; padding: 0;">-----------------------------------------------------</div>'
            doc.write('<pre>' + receiptContent1 + '</pre>');



            description = 'VATable:';
            data = dataInfo.data.VATable || ''; 
            spaces = AlignmentSpace(description, data);
            receiptContent1 = `<div>${description}${spaces}${data}</div>`;

            description = 'VAT Exempt:';
            data = dataInfo.data.VatExcempt || ''; 
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
            doc.write('<pre>' + receiptContent1 + '=====================================================</pre>');
            //                    doc.write('<div> =====================================================</div>');

            description = 'TOTAL DUE:';
            data = formattedTotalDue || ''; 
            spaces = AlignmentSpace(description, data);
            receiptContent1 = `<div style="margin-top:-9px; padding: 0;font-weight: bold;">${description}${spaces}${data}</div>`;

            doc.write('<pre>' + receiptContent1 + '</pre>');

            doc.write('<div style="text-align: center;">');
            doc.write('<div>-----------------------------------------------------</div>');
            doc.write('</div>')



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

    
    doc.write('<div style="text-align: center;">');
    doc.write('<div> -----------------------------------------------------</div>');
    doc.write('</div>')

    
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


    
    doc.write('<div style="text-align: center;">');
    doc.write('<div>-----------------------------------------------------</div>');
    doc.write('</div>')




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
    doc.write('<div> --------------------------------------------------</div>');
    doc.write('<div> THANK YOU COME AGAIN: </div>');
    doc.write('<div> --------------------------------------------------</div>');
    
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
  setTimeout(() => {
    iframeWindow.print();
    window.location.reload(); 
  }, 1000); 
    // Print the receipt
  

    // Remove the iframe after printing
    setTimeout(() => {
      document.body.removeChild(iframe);
    // Reload the page after printing
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



const handleBackspace = () => {
  if (TableNo.length === 0) return;

  setTableNo((TableNo) => TableNo.slice(0, -1))
};
const clearInput = () => {
  setTableNo('');
};

const handleInput = (value: string | number) => {
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

  
};

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



  return (
  
    <>
    
    <Grid
      container
      className='Restaurant-trans'
      style={{ height: '100vh' }}
      spacing={1}
      justifyContent="space-between" // Adjust alignment as needed
    >

        <div style={overlayStyle} />

        <iframe id="myIframe" style={{
          position: 'absolute', display: 'none', backgroundColor: '#ffff', height: '90%', width: '25%',

          marginLeft: '35%', borderRadius: '10px', zIndex: '9999'
        }} src="https://example.com"></iframe>

    <Grid item xs={12} md={2} style={{ height: '100%'}}>
      <div className="Category">
          <Typography      
            sx={{
            fontSize: { xs: '1rem', sm: '0.7rem', md: '1rem', lg: '1.1rem', xl: '1.2rem' },
            color: '#ffffff',backgroundColor: '#007bff',
            padding: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
            borderRadius: '5px',margin: '10px',
            fontWeight: 'bold', textAlign: 'center',}}>
              Category Section
          </Typography>
          <div className='Category-container' style={{ overflowY: 'auto', maxHeight: '90vh', border: ' 1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '10px' }}>
            <CategoryGrid category={category} onReceiveProducts={handleProductsFromCategory} />
          </div>

      </div>
    </Grid>


    <Grid item xs={12} md={7} style={{ height: '100%'}}>
      <div className="Product">
          <Typography      
        sx={{
        fontSize: { xs: '1rem', sm: '0.7rem', md: '1rem', lg: '1.1rem', xl: '1.2rem' },
        color: '#ffffff',backgroundColor: '#007bff',
        padding: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
        borderRadius: '5px',margin: '10px',
        fontWeight: 'bold', textAlign: 'center',}}>
      Product Section
          </Typography>
          <div className='Product-container' style={{ overflowY: 'auto', height: '90vh', border: ' 1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '10px' }}>
            <ProductGrid products={products} addtocart={addToCart} />
          </div>
        </div>
    </Grid>



      <Grid item xs={12} md={3} style={{ height: '100%',width:'20%' }}>
      <div className='Transaction-container' style={{ height: '95%'}}>
          <Typography      
              sx={{
              fontSize: { xs: '1.2rem', sm: '0.7rem', md: '1rem', lg: '1.1rem', xl: '1.2rem' },
              color: '#ffffff',backgroundColor: '#007bff',
              padding: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',margin: '10px',
              fontWeight: 'bold', textAlign: 'center',}}>
                  {OrderType === 'TAKE OUT' ? 'TAKE OUT' : `${OrderType} Table No. ${TableNo}`}
          </Typography>
         
          <Transaction cartitems={cartItems} setcartitems={setCartItems} totaldue={calculateTotalDue()} />

          <Typography sx={{
           fontSize: { xs: '0.5rem', sm: '0.7rem', md: '.8rem', lg: '.9rem', xl: '1.2rem' },
           fontWeight: 'bold', border: '1px solid', margin: '10px', backgroundColor: 'lightblue', color: 'blue',
            padding: '8px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)', borderRadius: '5px'
          }}>Total Amount Due: Php {formattedTotalDue}</Typography>

          {/* <div className="actionButtons"> */}
          <div style={{ display: 'flex', flexDirection:'column', gap: '5px', margin: '5px',height:'32%',marginBottom:'0px',position:'relative'}}>
              <div style={{ display: 'flex', flexDirection:'row',height:'50%'}}>


                  {DineIn ? (

                      <button
                        style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                          display: 'flex',flexDirection: 'column',alignItems: 'center',
                          borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                          borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                        onClick={SaveOrderClick}
                      >
                        <Typography
                          variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                          fontSize: { xs: '0.4rem', sm: '0.5rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                          fontWeight: 'bold', color: 'blue',textAlign: 'center',
                          }}>   Save Order
                        </Typography>
                        <img src={SaveOrder} alt="Sales Order"
                          style={{
                            maxWidth: '80%', maxHeight: '60px',marginBottom: '10px', flex: '0 0 auto',
                          }}
                        />
                      </button>
                 
                

                  ) : (


                  
                      <Button
                        style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                          display: 'flex',flexDirection: 'column',alignItems: 'center',
                          borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                          borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                        onClick={PaymentClick}
                        fullWidth >
                        <Typography
                          variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                          fontSize: { xs: '0.4rem', sm: '0.5rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                       fontWeight: 'bold', color: 'blue',textAlign: 'center',
                          }}> Payment
                        </Typography>
                        <img src={Selectpayment} alt="Sales Order"
                          style={{
                            maxWidth: '80%', maxHeight: '60px',marginBottom: '10px', flex: '0 0 auto',borderRadius:'100%',
                          }}
                        />
                      </Button>
             

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
                            fontSize: { xs: '0.4rem', sm: '0.5rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                           fontWeight: 'bold', color: 'blue',textAlign: 'center',
                            }}> Sales Order
                          </Typography>
                          <img src={SalesOrderImage} alt="Sales Order"
                            style={{
                              maxWidth: '80%', maxHeight: '60px',marginBottom: '10px', flex: '0 0 auto',
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
                            fontSize: { xs: '0.4rem', sm: '0.5rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                             fontWeight: 'bold', color: 'blue',textAlign: 'center',
                            }}> Other Command
                          </Typography>
                          <img src={OtherCommandImage} alt="Sales Order"
                            style={{
                              maxWidth: '80%', maxHeight: '60px',marginBottom: '10px', flex: '0 0 auto',
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
                        fontSize: { xs: '0.4rem', sm: '0.5rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                        fontWeight: 'bold', color: 'blue',textAlign: 'center',
                        }}>   Change Type
                      </Typography>
                      <img src={ChangeOderTypeImage} alt="Sales Order"
                        style={{
                          maxWidth: '80%', maxHeight: '60px',marginBottom: '10px', flex: '0 0 auto',
                        }}
                      />
                    </Button>
             

           
                    <Button
                      style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                        display: 'flex',flexDirection: 'column',alignItems: 'center',
                        borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                        borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                      onClick={ReprintList}
                      fullWidth >
                      <Typography
                        variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                        fontSize: { xs: '0.4rem', sm: '0.5rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                      fontWeight: 'bold', color: 'blue',textAlign: 'center',
                        }}> Reprint
                      </Typography>
                      <img src={ReprintImage} alt="Sales Order"
                        style={{
                          maxWidth: '80%', maxHeight: '60px',marginBottom: '10px', flex: '0 0 auto',
                        }}
                      />
                    </Button>
              
                    <Button
                      style={{border: '1px solid #4a90e2', padding: '5px',height: '100%',
                        display: 'flex',flexDirection: 'column',alignItems: 'center',
                        borderRadius: '10px', cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',
                        borderStyle: 'solid',borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2', maxWidth: '100%',}}
                      onClick={RefreshModule}
                      fullWidth >
                      <Typography
                        variant="h6" sx={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)',
                        fontSize: { xs: '0.4rem', sm: '0.5rem', md: '.6rem', lg: '.7rem', xl: '.8rem' },
                          fontWeight: 'bold', color: 'blue',textAlign: 'center',
                        }}> Refresh
                      </Typography>
                      <img src={RefreshImage} alt="Sales Order"
                        style={{
                          maxWidth: '80%', maxHeight: '60px',marginBottom: '10px', flex: '0 0 auto',
                        }}
                      />
                    </Button>
                 
              </div>
          </div>
      </div>

      </Grid>   


        {/* {PrintReceiptModal && (
      <iframe id="myIframe" style={{position:'absolute',display:'none',backgroundColor:'#ffff',height:'90%',width:'25%',marginLeft:'50px',borderRadius:'10px'}} src="https://example.com"></iframe>
    )} */}


      {/* </div> */}
      
    </Grid>



    {CustomerDineInModal && <CustomerDineIn handleclose={CloseCustomerDineInModal} typeandtable={TypeAndTable} handlemodaldata={CutomerInfoEntry} />}
        {SalesOrderListOpenModal && <ListOfDineInSalesOrder handleclose={CloseSalesOrderListOpenModal} settlebillData={settlebillData} tableno={TableNo} />}
        {CashPaymentEntryModal && <CashPaymentEntry amountdue={formattedTotalDue} amounttendered={SaveCashPayment} />}
        {CustomeryPaymentModal && <CustomerPayment handlemodaldata={CutomerInfoEntryPaymnet} />}
        {ReprintTransactionModal && <ReprintTransaction handleClose={CloseReprintTransactionModal} PrintTransactionData={ReprintTransactionReceipt} />}


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
              <Button className="button-dine-in"onClick={handleDineIn} >
                <Typography      
                  sx={{
                  fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                  color: '#ffffff',backgroundColor: '#007bff',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  borderRadius: '5px',
                  fontWeight: 'bold', textAlign: 'center',}}>
                   Dine In
                </Typography>
                
              </Button>

              <Button className="button-take-out"onClick={handleTakeOut} >
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

        {tableNoModal && (
          <div className="modal">
            <div className="modal-contentTable">
              <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'Blue' }}>
                SELECT TABLE {TableNo}</h2>

              <div className='containertable' style={{ display: 'flex', flexDirection: 'row' }}>

                <div style={{ overflow: 'auto', height: '75%' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px', margin: '5px' }}>
                    {TableList.map(item => (
                      <div key={item.table_count} className={item.Paid} onClick={() => SelectTable(item)}
                        //  style={{ border: '1px solid #ccc', padding: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' , borderRadius:'10px',cursor:'pointer',caretColor:'transparent'}}
                        style={{
                          border: '1px solid #4a90e2', padding: '5px', height: '100px', display: 'flex', flexDirection: 'column',
                          alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                          borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                          backgroundColor: item.Paid === 'N' ? 'RED' : '',
                        }}>

                        <p key={item.table_count} style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '20px', fontWeight: 'bold', color: 'blue' }}>
                          {item.table_count}</p>
                        <img src={table} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />

                      </div>
                    ))}
                  </div>
                </div>


                <div className="num-pad">
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
                  <div className="num-pad-row">
                    <button className="num-pad-key" style={{ width: '33%' }} onClick={() => handleBackspace()}>Back</button>
                    <button className="num-pad-key" onClick={() => handleInput('0')}>0</button>

                  </div>
                  <div className="num-pad-row">
                    <button className="num-pad-key" onClick={CloseTableNo} style={{ width: '33%' }}>Close</button>
                    <button className="num-pad-key" style={{ width: '33%' }} onClick={() => SelectTableOk(TableNo)}>OK</button>
                    <button className="num-pad-key" style={{ width: '33%' }} onClick={clearInput}> Clear </button>
                  </div>
                </div>
              </div>



              {/* <button className="closeTable" onClick={CloseTableNo} style={{width:'100%',backgroundColorcolor:'red'}}>Cancel</button> */}
            </div>
          </div>
        )}

        {PaymentOpenModal && (
          <div className="modal">
            <div className="modal-content" style={{ width: '50%' }}>
              <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'Blue' }}>
                SELECT PAYMENT</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px', margin: '5px' }}>


                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}
                  onClick={CashPayment}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', height: '70px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Cash Payment</p>
                  <img src={cash} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>


                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Credit Sales</p>
                  <img src={credit} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>

                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    EPS</p>
                  <img src={epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>

                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Multiple Payment</p>
                  <img src={Multiple} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>


                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Charge To Room</p>
                  <img src={ChargeRoom} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>

              </div>



              <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'Blue' }}>
                SELECT DISCOUNT</h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px', margin: '5px' }}>

                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>
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

              </div>




            </div>
          </div>
        )}

        {OtherCommandOpenModal && (
          <div className="modal">
            <div className="modal-content" style={{ width: '50%' }}>
              <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'Blue' }}>
                SELECT TRANSACTION</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(100px, 1fr))', gap: '5px', margin: '5px' }}>


                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', height: '70px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Item Discount</p>
                  <img src={itemD} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>


                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Suspend Transaction</p>
                  <img src={credit} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>

                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Return</p>
                  <img src={epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>

                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Cash Count</p>
                  <img src={epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>


                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', height: '70px', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Cash Pull-Out</p>
                  <img src={epsCard} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>

                <div
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Lock Terminal</p>
                  <img src={Multiple} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
                </div>


                <div onClick={logoutClick}
                  style={{
                    border: '1px solid #4a90e2', padding: '5px', height: '115px', display: 'flex', flexDirection: 'column',
                    alignItems: 'center', borderRadius: '10px', cursor: 'pointer', boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset', borderStyle: 'solid',
                    borderWidth: '2px', borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                  }}>

                  <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)', fontSize: '15px', fontWeight: 'bold', color: 'blue', textAlign: 'center' }}>
                    Close Terminala</p>
                  <img src={ChargeRoom} style={{ maxWidth: '80%', maxHeight: '60px', marginBottom: '10px', flex: '0 0 auto' }} />
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

              </div>






            </div>
          </div>
        )}


        {SelectTypeOfTransaction && (
          <div className="modal">

            <div className="modal-content" style={{ width: '50%' }}>
              <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px', color: 'red' }}>
                Select Type of Transaction
              </h2>
              <button className="button-dine-in" onClick={AddOrdertable}>Add Order</button>
              <button className="button-take-out" onClick={SettleOrdertable}>Settle Order</button>
              <button className="button-dine-in" onClick={TransferOrdertable}>Transfer table</button>
              <button className="button-dine-in" onClick={CloseModal}>Close</button>
            </div>
          </div>
        )}


      </>

);
};







export default Restaurant;
