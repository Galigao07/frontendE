/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
import './css/GiftCheck.css'
import Swal from "sweetalert2";
import { Button, Grid, responsiveFontSizes, Table, Typography } from "@mui/material";
import axios, { toFormData } from "axios";
import {BASE_URL} from "../config";
import OnScreenKeyboard from "./KeyboardGlobal";
import OnScreenKeyboardNumeric from "./KeyboardNumericGlobal";
import OnScreenKeyboardNumericForCardNo from "./KeyboardForCardNo";
import { isDesktop } from "react-device-detect";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import { GetSettings } from "../global";
import { JSX } from "react/jsx-runtime";
import { setGlobalIsLoading,setGlobalModal } from "../globalSlice";
import { UseSelector,useDispatch } from "react-redux";
import { RootState } from "../store";

interface GiftCheckPaymentTrans {
    handleClose:() => void;
    amountdue:any;
    GiftCheckPayment:any;
}

interface dino {
  map(arg0: (result: any, index: any) => JSX.Element): React.ReactNode;
  count:number,
  denomination_amount:number,
  amount:number
}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

const GiftCheckPaymentTransModal: React.FC<GiftCheckPaymentTrans> = ({handleClose,amountdue,GiftCheckPayment})=> {
    const dispatch = useDispatch()
    
    const GiftCheckAmtRef = useRef<HTMLInputElement>(null);
    const GiftCheckAmtTenderedRef = useRef<HTMLInputElement>(null);
    const GiftChecNoRef = useRef<HTMLInputElement>(null);
    const cardIssuerRef = useRef<HTMLInputElement>(null);
    const AmountDueRef = useRef<HTMLInputElement>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(null);
    const [GiftCheckPaymentList,setGiftCheckPaymentList] = useState<any>([])
    const [GiftCheckList,setGiftCheckList] = useState<any>([])
    const [Bal,setBal] = useState<any>(0)
    const [TotalTendered,setTotalTendered] = useState<any>(0)
    const [Dinomination, setDinomination] = useState<dino[]>([]);
    const [DinominationModal,setDinominationModal] = useState<boolean>(false)

    // totalAmountDue
    const [totalAmountDue,settotalAmountDue] = useState<any>(0)
    type GiftCheckPaymentDataKey = keyof typeof GiftCheckPaymentData;
    const [focusedInput, setFocusedInput] = useState<GiftCheckPaymentDataKey| 'gift_check_no'>('gift_check_no');
    const [cursorPosition, setCursorPosition] = useState<any>(0);
    const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);
    const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);
    const [isShowKeyboardNumeric, setisShowKeyboardNumeric] = useState<boolean>(false);
    const [isShowKeyboardNumericForCardNo, setisShowKeyboardNumericForCardNo] = useState<boolean>(false);

    const [viewSave,setviewSave] = useState(false)
    const [isEdit,setisEdit] = useState(false)
    const [isGiftCheck,setisGiftCheck] = useState<boolean>(false);
    const [isIncome,setisIncome] = useState<boolean>(false);
    const [isGiftCheckWthSN,setisGiftCheckWthSN] = useState<boolean>(false);
    const [isValidate,setisValidate] = useState<boolean>(false)
       
    const [isShow, setisShow] = useState<boolean>(false);
    const [GiftCheckPaymentData,setGiftCheckPaymentData] = useState({
        gift_check_no:'0',
        gift_check_count:'',
        amount:0,
        isIncome:false
    })


  
  const LoadDinomination = async() => {
    try {
      const response = await axios.get(`${BASE_URL}/api/dinomination/`,{withCredentials:true})
          if (response.status===200){
              setDinomination(response.data)
          }
    } catch (error:any) {
      Swal.fire({
        icon:'error',
        title:'Failed',
        text:`${error.message}`
      })
    }
  }

  const CloseDinominatioModal = () =>{
    setDinominationModal(false)
  }

  const handleClickAddDenimination= () =>{
    if (GiftCheckPaymentData.amount===0) return
    handleClickAddToList()
    setDinominationModal(false)
  }

  useEffect(()=>{

        setGiftCheckPaymentData({
      ...GiftCheckPaymentData, gift_check_no:'',
        gift_check_count:String(totaDenomination().count),
        amount:totaDenomination().total
    })

  },[Dinomination])

  const inputCount = (value: string, index: number) => {
    if (parseInt(value) < 0) return
  // Clone current array
  const updated = [...Dinomination];

  // Get the current item
  const current = updated[index];

  // Only proceed if value is not empty
  if (value !== '') {
    current.count = parseInt(value);
    current.amount = current.denomination_amount * current.count;

    // Assign back
    updated[index] = current;

    // ✅ Set new array
    setDinomination(updated);
  }
};




  useEffect(() => {
  dispatch(setGlobalModal(true))
  const fetchData = async () => {
    try {
      const data1 = await GetSettings('gift_check_with_serial_no');
      const data2 = await GetSettings('gift_check');

      // Store them in separate state variables
      if (data1==='Y'){
        setisGiftCheckWthSN(true);  
        let amount: string = amountdue.toString().replace(',', '');
          setGiftCheckPaymentData({...GiftCheckPaymentData,amount:0})
        
      }else{
        await LoadDinomination()
         setGiftCheckPaymentData({...GiftCheckPaymentData,amount:(0)})
      }

      if (data2==='True'){
          setisGiftCheck(true);   // for 'gift_check' (new state)
      }
           // for 'gift_check_with_serial_no'
      
        settotalAmountDue(0)
        setviewSave(true)

    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  fetchData();
}, []);

    


    

  const validateGiftCheckData = () => {
    if (!isGiftCheckWthSN) {
        if (GiftCheckPaymentList && GiftCheckPaymentList.length > 0){
            return true
        }else{
           Swal.fire({
              icon: "error",
              title: "Missing Information",
              text: "Please fill out all required fields before proceeding.",
            });
            return false
        }
       
    }
     
  
    return true; // ✅ Valid data
  };
  
  const SaveCreditPayment = async () => {

           if (validateGiftCheckData()) {

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
            if (GiftCheckPaymentList.length === 0) {
              // If empty, add CreditCardPaymentData to the list and call CreditCardPayment with the new list
              const updatedList = [...GiftCheckPaymentList, GiftCheckPaymentData];
              setGiftCheckPaymentList(updatedList); // Update state or variable
              GiftCheckPayment({ GiftCheckPaymentList: updatedList }); // Assuming you want to pass an object with a key 'CreditCardPaymentList'
            } else {
              // If not empty, just add CreditCardPaymentData to the existing list without creating a new key
              if (GiftCheckPaymentData.gift_check_count !='' && GiftCheckPaymentData.gift_check_no !='' ){
                const updatedList = [...GiftCheckPaymentList, GiftCheckPaymentData];
                setGiftCheckPaymentList(updatedList); // Update state or variable
                GiftCheckPayment({ GiftCheckPaymentList: updatedList }); // Maintain consistency in function calls
              }else{
                GiftCheckPayment({ GiftCheckPaymentList}); // Maintain consistency in function calls
              }
            
            }
             
                setGiftCheckPaymentData({
                    gift_check_no:'0',
                    gift_check_count:'',
                    amount:0,
                     isIncome:false
                })
            }
            
        })
      }
  }


 const handleKeyDown = (event :any, currentRef : any, nextRef:any) => {
        if (event.key === 'Enter') {
          event.preventDefault();

    
          if (nextRef.current) {
            nextRef.current.focus();
            nextRef.current.select();
          }
        }

        if (event === 'Enter') {
          if (nextRef.current) {
            nextRef.current.focus();
            nextRef.current.select();
          }
        }
  };

const HandleGiftCheckEntry = (e:any) => {
    const { name, value } = e.target;

    if (name ==='AmountDue'){
      const isNumber = /^[0-9]*$/;
      if (isNumber.test(value)) {
          // If setQueNo input is a number, update the state
      setGiftCheckPaymentData({ ...GiftCheckPaymentData, [name]: value });
      }
    }else{
      setGiftCheckPaymentData({ ...GiftCheckPaymentData, [name]: value });
    }


}

const [errorData,seterrorData] = useState('')
const [errorView,seterrorView]= useState(false)
const validateDataAndAddToList = () => {

    if (GiftCheckPaymentData.gift_check_no === '' && isGiftCheckWthSN) {
        seterrorView(true)
        seterrorData('Please Provide Gift check No.')
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }
    if (GiftCheckPaymentData.amount === 0) {
        seterrorView(true)
        seterrorData('Please Provide Amount More than Zero')
        // showErrorAlert('Please Provide Amount More than Zero');
        setTimeout(() => {
            seterrorView(false)
            seterrorData('')
        }, 2000);
      return false;
    }



    return true;
  };
  
const ClickvalidateIfNotExist = async () => {

  const existing = GiftCheckPaymentList.find(
    (item: any) => item.gift_check_no === GiftCheckPaymentData.gift_check_no
  );

  if (existing) {
    seterrorView(true);
    seterrorData("Gift Check No already in the list");
    setTimeout(() => {
      seterrorView(false);
      seterrorData("");
    }, 2000);

    return
  }

  // 2️⃣ Validate from backend
  try {
    const res = await axios.get(`${BASE_URL}/api/validate-gift-check/`, {
      params: { gift_check_no: GiftCheckPaymentData.gift_check_no },
      withCredentials: true,
    });

    const data = res.data;

    if (data.success) {
      setisValidate(true)
      setGiftCheckPaymentData({ ...GiftCheckPaymentData, 'amount':  data.amount })

    } else {
      setisValidate(false)
      // ❌ Invalid gift check
      seterrorView(true);
      seterrorData(data.message || "Invalid gift check");
      setTimeout(() => {
        seterrorView(false);
        seterrorData("");
      }, 2000);
    }
  } catch (error: any) {
    console.error(error);
    Swal.fire("Error", "Gift Check was not on the list", "error");
  }
};


const validateIfNotExist = async () => {
  if (!isGiftCheckWthSN) {
      return {
          valid: true,
        };
  } 
  const existing = GiftCheckPaymentList.find(
    (item: any) => item.gift_check_no === GiftCheckPaymentData.gift_check_no
  );

  if (existing) {
    seterrorView(true);
    seterrorData("Gift Check No already in the list");
    setTimeout(() => {
      seterrorView(false);
      seterrorData("");
    }, 2000);
    return false;
  }

  // 2️⃣ Validate from backend
  try {
    const res = await axios.get(`${BASE_URL}/api/validate-gift-check/`, {
      params: { gift_check_no: GiftCheckPaymentData.gift_check_no },
      withCredentials: true,
    });

    const data = res.data;

    if (data.success) {
      // ✅ Gift check is valid
      return {
        valid: true,
        amount: data.amount,
        message: data.message,
      };
    } else {
      // ❌ Invalid gift check
      seterrorView(true);
      seterrorData(data.message || "Invalid gift check");
      setTimeout(() => {
        seterrorView(false);
        seterrorData("");
      }, 2000);
      return false;
    }
  } catch (error: any) {
    console.error(error);
    Swal.fire("Error", "Gift Check was not on the list", "error");
    return false;
  }
};



  const AddToList = (event: any) => {

    let amount: string = amountdue.toString().replace(',', '');
    if (event.key === 'Enter') {
        if (parseFloat(amount) === totalAmountDue){
            seterrorView(true)  
            seterrorData('Total Amount Tendered Already Meet..')
            setTimeout(() => {
                seterrorView(false)
                seterrorData('')
            }, 2000);
    
            return;
            }   
            
        
    if (validateDataAndAddToList()) {
        setGiftCheckPaymentList([...GiftCheckPaymentList, GiftCheckPaymentData]);
        setGiftCheckPaymentData({
          gift_check_no: '',
          gift_check_count: '',
          amount: 0,
          isIncome:false
        });
      }
     } 


  };

  const handleClickAddToList = async() => {
    if (!isValidate && isGiftCheckWthSN){
    Swal.fire({
      icon:'error',
      title:'Not Validated',
      text:'Check number is not exist.',
      timer:2000
    })
    return
    }
     const result = await validateIfNotExist();
    if (validateDataAndAddToList() && result && result.valid) {
        setGiftCheckPaymentList([...GiftCheckPaymentList, GiftCheckPaymentData]);
        setGiftCheckPaymentData({
          gift_check_no: '',
          gift_check_count: '',
          amount: 0,
           isIncome:false
        });
      }

      if (GiftChecNoRef.current){
        GiftChecNoRef.current.focus()
      }
  }
  
  const handleKeydownAdd = (e:any)=>{
    if (e.key === 'Enter'){
        handleClickAddToList()
    }
  }

       const showOnScreenKeybaord = (ref:any) => {

        if (!isGiftCheckWthSN){
            setDinominationModal(true)
          return
        }else{
          return
        }
        if (isDesktop){
       
            if (ref === 'amount') {
              setisShowKeyboardNumeric(true)
            }else if (ref === 'amount'){
              setisShowKeyboardNumericForCardNo(true)
            }
            
            else{
              setisShowKeyboard(true)
            }
     
            setFocusedInput(ref)
          
        }
       }
       const ShowKeyorNot = () => {
         setisShow(!isShow);
       }

       const setvalue = (value: any) => {
         if (focusedInput) {

          if (focusedInput ==='gift_check_no'){
            setGiftCheckPaymentData((prevData: any) => ({
              ...prevData,
              [focusedInput]: value.slice(0,16)
            }));
        }else{
            if (focusedInput === 'amount'){
              let amount: string = amountdue.toString().replace(',', '');
                if (parseFloat(value) > parseFloat(amount)){
                    showErrorAlert('Payment Amount exceeds total Amount Due..!')
                }else{
          
                  setGiftCheckPaymentData((prevData: any) => ({
                    ...prevData,
                    [focusedInput]: value
                  }));
                }
            }else{
              setGiftCheckPaymentData((prevData: any) => ({
                ...prevData,
                [focusedInput]: value
              }));
            }

          }

         }
         setisShowKeyboard(false)
         setisShowKeyboardNumeric(false)
         setisShowKeyboardNumericForCardNo(false)
       };
       const closekeyBoard = () => {
         setisShowKeyboard(false)
         setisShowKeyboardNumeric(false)
         setisShowKeyboardNumericForCardNo(false)
       }


       useEffect(() => {
        if (localStorage.getItem('MULTIPLE') === 'true'){
          setviewSave(true);
        }else{
          let amount: string = amountdue.toString().replace(',', '');
          if (totalAmountDue === parseFloat(amount) && GiftCheckPaymentList.length !== 0){
            setviewSave(true);
          }else{
            if (totalAmountDue === 0){
              setviewSave(true);
            }else{
              setviewSave(false);
            }
         
          }
         
        }

    }, [GiftCheckPaymentData]);


    const SelectData = (index:any) =>{
      setSelectedItemIndex(index)
    }
    
    const onUpdate = () =>{

    }

    const onDelete = () => {
        const updatedItems = [...GiftCheckPaymentList];
      updatedItems.splice(selectedItemIndex, 1);
      setGiftCheckPaymentList(updatedItems);
        setSelectedItemIndex(null)

    }

    const  totalTendered = () => {
      if (!GiftCheckPaymentList || GiftCheckPaymentList.length === 0) {
        setBal(amountdue); // full balance remains
        return "0.00";
      }

      const total = GiftCheckPaymentList.reduce((sum: number, item: any) => {
        return sum + Number(parseFloat(item.amount) || 0);
      }, 0);

      const balance = parseFloat(String(amountdue).replace(',','')) - total;

      // Update state
      setBal(balance);
      setTotalTendered(total)

      // Return formatted total
      return total.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }

    const totaDenomination = () =>{
      let count = 0
      let total = 0
      if (!Dinomination || Dinomination.length === 0) {
          // full balance remains
        return {count,total};
      }
        total = Dinomination.reduce((sum: number, item: any) => {
        return sum + Number(item.amount || 0);
      }, 0);

        count = Dinomination.reduce((sum: number, item: any) => {
        return sum + Number(item.count || 0);
      }, 0);
        return {count,total};
    }

    useEffect(() => {
      totalTendered();
    }, [GiftCheckPaymentList]);


    const handelClickIncome = ()=> {

    setGiftCheckPaymentList((prev:any) =>
      prev.map((item:any) => ({
        ...item,
        isIncome: isIncome, // force all to true
      }))
    );

    }


    useEffect(()=>{
    handelClickIncome()
    },[isIncome])


        //KEYDOWN 
        useEffect(() => {
              const handleKeyPress = (e: KeyboardEvent) => {
        
                if (e.key === 'F5') {
                  e.preventDefault(); // Prevent the default browser refresh action for F5
                }
                else if (e.ctrlKey && e.key === 'n') {
                  e.preventDefault(); // Prevent the default browser action for Control + N
                }
                else if ( e.key === 'F2') {
                  e.preventDefault(); // Prevent the default browser action for Control + N
                  console.log('F2')
                }  
                else if ( e.key === 'F1') {
                  e.preventDefault(); // Prevent the default browser action for Control + N
                }
                else if ( e.key === 'F3') {
                  e.preventDefault(); // Prevent the default browser action for Control + N
                }
                else if  (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
                      e.preventDefault();

                      if (DinominationModal) {
                        handleClickAddDenimination();
                        return;
                      }
                    
                  SaveCreditPayment()
                  
              }else if (e.key === 'Escape') { // Control + S
                  e.preventDefault();
                  
                if (isShowKeyboard) {setisShowKeyboard(false);return}
                if (DinominationModal) {setDinominationModal(false);return}
  
                if (isShowKeyboardNumeric) {setisShowKeyboardNumeric(false);return}
                handleClose()
                  
              }
          }
              window.addEventListener('keydown', handleKeyPress);
            
              return () => {
                window.removeEventListener('keydown', handleKeyPress);
              };
            }, [isShowKeyboard,isShowKeyboardNumeric,DinominationModal,GiftCheckPaymentData]);  
    return (
      <div>

      

        <div className="modal" >
            <div className="modal-content-GiftCheck">
                <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                            GIFT CHECK PAYMENT</h2>

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
               
                    <Grid container className="GiftCheck-Container" spacing={1}>
                        <Grid item xs={12} md={12} style={{ height: '100%',width:'100%'}}>
                       {isGiftCheckWthSN &&
                        <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}} >Gift Check No.</Typography>

                            <div style={{width:'100%',display:'flex',flexDirection:'row',gap:'10px'}}>

                           
                              <input type="text" placeholder=""  autoComplete="off"   ref={GiftChecNoRef}
                              onKeyDown={(e) => handleKeyDown(e, GiftCheckAmtRef, GiftCheckAmtRef)} 
                              value={GiftCheckPaymentData.gift_check_no} name="gift_check_no"
                              onClick={()=>showOnScreenKeybaord('gift_check_no')}
                                onChange={HandleGiftCheckEntry}
                              />

                              <button onClick={ClickvalidateIfNotExist}
                                  style={{width:'120px',position:'relative',
                                    bottom:'12px',backgroundColor:'blue',padding:'5px'}}
                                  > Validate </button>
                           </div>
                           
                        </div>}


                        <div style={{display:'flex',flexDirection: !isGiftCheckWthSN ? 'column':'row',width:'100%'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}} >Gift Check Amount.</Typography>

                              <div style={{width:'100%',display:'flex',flexDirection:'row',gap:'10px'}}>
                                  <input type={isGiftCheckWthSN ? 'number':'text'}  readOnly={true} placeholder=""  autoComplete="off"   ref={GiftCheckAmtRef}
                                  onKeyDown={(e) => handleKeydownAdd(e)} 
                                  value={GiftCheckPaymentData.amount} name="amount"
                                  style={{textAlign:'end'}}
                                  onClick={()=>showOnScreenKeybaord('amount')}
                                  onChange={HandleGiftCheckEntry}
                                />
                                <button onClick={handleClickAddToList}
                                style={{width:'120px',position:'relative',bottom:'12px',backgroundColor:'blue',padding:'5px'}}
                                > {isGiftCheckWthSN ? 'ADD':'Click here'}</button>
                              </div>
                          
                          
                        </div>
                     

                        {isGiftCheckWthSN && 
                        <Grid item xs={12} md={12}>
                          <Typography sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'100%'}} >List of Gift Checks.</Typography>
                            <div style={{height:'200px' ,overflow:'auto'}}>
                            <Table sx={{
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                            overflow: 'auto',width:'100%'}}>
                                <thead style={{width:'100%'}}>
                                    <tr>
                                    <th>No.</th>
                                    <th style={{width:'50%'}}>Gift Check No.</th>
                                    <th style={{width:'40%'}}>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(GiftCheckPaymentList) && GiftCheckPaymentList.length > 0 ? (
                                GiftCheckPaymentList.map((item, index) => (
                                    <tr key={index} className={selectedItemIndex === index ? 'selected':''} style={{textAlign:'center'}} onClick={() => SelectData(index)}>
                                    <td>{index + 1}</td>
                                    <td>{item.gift_check_no}</td>
                                    <td style={{textAlign:'right'}}>{(parseFloat(item.amount)).toLocaleString(undefined,{
                                      minimumFractionDigits:2,
                                      maximumFractionDigits:2
                                    })}</td>
                                </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={3}>No items in the transaction</td>
                        </tr>
                        )}
                        </tbody>
                      </Table>
                            </div>
                           
                 
                        </Grid>}
                          <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                            <div>
                                <Typography  sx={{
                                  fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                  overflow: 'auto',width:'40%'}}>
                                    AMOUNT DUE
                                </Typography>
                                 <input type="text" placeholder="0.00" readOnly autoComplete="off" value={amountdue} style={{textAlign:'end'}} />
                            </div>
                         
                            <div>
                                <Typography  sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>BALANCE</Typography>
                                 <input type="text" placeholder="0.00" readOnly autoComplete="off" 
                                 style={{textAlign:'end'}} value={(Bal ? Bal :'0.00').toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} />
                            
                            </div>
                           
                           
                            </div>

                        <div style={{display:'flex',flexDirection:'column'}}>
                            <Typography                             sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width:'40%'}}>
                               AMOUNT TENDERED
                            </Typography>
                            <input type="text" placeholder="0.00"  autoComplete="off" style={{textAlign:'end'}}
                            name="AmountDue" 
                            ref={AmountDueRef}
                            value={isGiftCheckWthSN ? TotalTendered : parseFloat(TotalTendered).toLocaleString(undefined,{
                              minimumFractionDigits:2,
                              maximumFractionDigits:2
                            })}
                            // value={parseFloat(CreditCardPaymentData.AmountDue).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                            onKeyDown={AddToList} />
                        </div>
                          
                        <div style={{display: 'flex', flexDirection: 'row',gap:'10px'}}>
                          <input type='checkbox' onChange={()=>setisIncome(!isIncome)} checked={isIncome}/> 
                          <label>Excess as Other Income</label>
                        </div>     
                        

                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                            <div style={{ width: '100%', margin:'5px'}}>
                                {viewSave ? (
                                        <Button onClick={()=>SaveCreditPayment()}                                 disabled = {isEdit}  style={{
                                            backgroundColor: isEdit ? 'gray' : 'blue', // Different color when disabled
                                            cursor: isEdit ? 'not-allowed' : 'pointer', // Change cursor when disabled
                                          }}>SAVE</Button>
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

                      
                    </Grid>


                               {DinominationModal && (
                                  <div className='modal'>
                                    <div className='modal-content-waiter'>
                              
                                      <div className='card'>
                                          <div style={{height:'350px' ,overflow:'auto'}}>
                                          <Table sx={{
                                          fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                          overflow: 'auto',width:'100%'}}>
                                              <thead>
                                                <tr>
                                                  <th>Count</th>
                                                  <th>Dinomination</th>
                                                  <th>Total Amount</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {Dinomination && Dinomination.map((result:any, index:any) => (
                                                  <tr
                                                    key={index}
                                                    className={selectedItemIndex === index ? 'selected' : ''}
                                                    tabIndex={0}  
                                                    style={{backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                                    color:selectedItemIndex === index ? 'white':'black' ,height:'30px'}}>
                                                    <td>
                                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly', gap: '1px' }}>
                                                      <Button 
                                                        type="button" 
                                                        onClick={() => inputCount(String(Number(result.count || 0) - 1), index)} 
                                                        style={{
                                                          position:'relative',      
                                                          bottom:'10px',
                                                          width: '20px',
                                                          height: '40px',
                                                          borderRadius: '4px',
                                                          border: '1px solid #ccc',
                                                          background: 'red',
                                                          cursor: 'pointer',
                                                          fontSize:'25px',
                                                        }}
                                                      >
                                                        -
                                                      </Button>
                                                      <input
                                                        type="number"
                                                        placeholder="0"
                                                        value={result.count}
                                                        onChange={(e) => inputCount(e.target.value, index)}
                                                        style={{ 
                                                          textAlign: 'center', 
                                                          width: '70px',
                                                          height: '40px',
                                                          borderRadius: '4px',
                                                          border: '1px solid #ccc'
                                                        }}
                                                      />
                                                      <Button 
                                                        type="button" 
                                                        onClick={() => inputCount(String(Number(result.count || 0) + 1), index)} 
                                                        style={{
                                                          position:'relative',      
                                                          bottom:'10px',
                                                          width: '20px',
                                                          height: '40px',
                                                          borderRadius: '4px',
                                                          border: '1px solid #ccc',
                                                          background: 'blue',
                                                          cursor: 'pointer',
                                                          fontSize:'25px',
                                                          fontWeight:'100'
                                                        }}
                                                      >
                                                        +
                                                      </Button>
                                                    </div>
                                                  </td>

                                                  
                                                    {/* <td><input type="number" placeholder="0" value={result.count}
                                                        onChange={(e)=>inputCount(e.target.value,index)} 
                                                        style={{textAlign:'center'}}
                                                        /></td> */}
                                                    <td style={{textAlign:'right'}}>{result.denomination_amount.padStart(4,'0')}</td>
                                                    <td style={{textAlign:'right'}}>{result.amount ? (parseFloat(result.amount).toLocaleString(undefined,{
                                                      minimumFractionDigits:2,
                                                      maximumFractionDigits:2,
                                                    })) || '0.00':'0.00'}</td>
                                                  </tr>
                                                ))}
                                              </tbody>
                                            </Table>
                                          </div>
                                        
                                      </div>
                                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                            <label>Count:</label>
                                            <label>{totaDenomination().count}</label>
                                            <label>Total Amount:</label>
                                            <label>{totaDenomination().total.toLocaleString(undefined,{
                                              minimumFractionDigits:2,maximumFractionDigits:2
                                            })}</label>
                                          </div>
                                      <div className='Button-Container'>
                                            <Button style={{backgroundColor:'blue'}} onClick={handleClickAddDenimination}>Ok</Button>
                                           <Button style={{backgroundColor:'red'}} onClick={CloseDinominatioModal}>Close</Button>
                                       </div>
                                    </div>
                              
                                 </div>
           )}
        </div>

       
        </div>
        {isShowKeyboard && < OnScreenKeyboard handleclose = {closekeyBoard} currentv={GiftCheckPaymentData[focusedInput]} setvalue={setvalue}/>}
        {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}    currentv={GiftCheckPaymentData[focusedInput]} setvalue={setvalue}/>}
        {isShowKeyboardNumericForCardNo && < OnScreenKeyboardNumericForCardNo handleclose = {closekeyBoard} currentv = {GiftCheckPaymentData.amount} setvalue={setvalue}/>}

  </div>
    )
}

export default GiftCheckPaymentTransModal;