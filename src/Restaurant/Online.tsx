/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
import './css/Online.css'
import Swal from "sweetalert2";
import { Button, Grid, responsiveFontSizes, Table, Typography } from "@mui/material";
import axios, { toFormData } from "axios";
import {BASE_URL} from "../config";
import OnScreenKeyboard from "./KeyboardGlobal";
import OnScreenKeyboardNumeric from "./KeyboardNumericGlobal";
import OnScreenKeyboardNumericForCardNo from "./KeyboardForCardNo";
import { isDesktop } from "react-device-detect";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import { GetCurrentDateOnly, GetSettings } from "../global";
import { JSX } from "react/jsx-runtime";
import { width } from "@fortawesome/free-solid-svg-icons/faExpandAlt";

interface OnlinePaymentTrans {
    handleClose:() => void;
    amountdue:any;
    OnlinePayment:any;
}



const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

const OnlinePaymentTransModal: React.FC<OnlinePaymentTrans> = ({handleClose,amountdue,OnlinePayment})=> {

    const dateCreditedRef = useRef<HTMLInputElement>(null);
    const AcctTitleRef = useRef<HTMLInputElement>(null);
    const SubsidiaryRef = useRef<HTMLInputElement>(null);
    const ReferenceRef = useRef<HTMLInputElement>(null);
    const AmountRef = useRef<HTMLInputElement>(null);
    const RemarksRef = useRef<HTMLTextAreaElement>(null);
    const AcctTitleListRef = useRef<HTMLUListElement>(null)
    const SubsidiaryListRef = useRef<HTMLUListElement>(null)

    const AmountDueRef = useRef<HTMLInputElement>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(null);
    const [OnlinekPaymentList,setOnlinePaymentList] = useState<any>([])
    const [AcctTitleList,setAcctTitleList] = useState<any>([])
    const [SubsidiaryList,setSubsidiaryList] = useState<any>([])
    const [TmpAcctTitleList,setTmpAcctTitleList] = useState<any>([])
    const [TmpSubsidiaryList,setTmpSubsidiaryList] = useState<any>([])
    const [Bal,setBal] = useState<any>(0)
    const [TotalTendered,setTotalTendered] = useState<any>(0)
    const [OnlinePaymentData,setOnlinePaymentData] = useState({
            date_credited:'',
            acct_title:'',
            acct_code:0,
            reference_no:'',
            remarks:'',
            sl_code:'0',
            sl_name:'',
            sl_type:'',
            total_amount:0
        })
    // totalAmountDue
    const [totalAmountDue,settotalAmountDue] = useState<any>(0)
    type OnlinePaymentDataKey = keyof typeof OnlinePaymentData;
    const [focusedInput, setFocusedInput] = useState<OnlinePaymentDataKey| 'date_credited'>('date_credited');
    const [cursorPosition, setCursorPosition] = useState<any>(0);
    const [openAcctTitleModal,setopenAcctTitleModal] = useState(false)
    const [openSubsidiatyModal,setopenSubsidiatyModal] = useState(false)
    const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);
    const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);
    const [isShowKeyboardNumeric, setisShowKeyboardNumeric] = useState<boolean>(false);
    const [isShowKeyboardNumericForCardNo, setisShowKeyboardNumericForCardNo] = useState<boolean>(false);
    const [viewSave,setviewSave] = useState(false)
    const [isEdit,setisEdit] = useState(false)
    const [errorData,seterrorData] = useState('')
    const [errorView,seterrorView]= useState(false)
    const [isShow, setisShow] = useState<boolean>(false);
    const showOnScreenKeybaord = (ref:any) => {
      if (isDesktop){
     
          if (ref === 'CardNo') {
            setisShowKeyboardNumericForCardNo(true)
          }else if (ref ==='total_amount'){
            setisShowKeyboardNumeric(true)
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


        if (focusedInput === 'total_amount'){

          let amount: string = amountdue.toString().replace(',', '');
          if (parseFloat(value) > parseFloat(amount)){
              showErrorAlert('Payment Amount exceeds total Amount Due..!')
          }else{
            setOnlinePaymentData((prevData: any) => ({
              ...prevData,
              [focusedInput]: value
            }));
          }
      }else{
       setOnlinePaymentData((prevData: any) => ({
              ...prevData,
              [focusedInput]: value
            }));
            if (focusedInput==='acct_title'){
              setopenAcctTitleModal(true)
                  const filtered = TmpAcctTitleList.filter((item:any) => String(item.acct_title).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
                  if (filtered){
                    setAcctTitleList(filtered)
                    setopenAcctTitleModal(true)
                  }
            }else if(focusedInput==='sl_name'){
              setopenSubsidiatyModal(true)
               const filtered = TmpSubsidiaryList.filter((item:any) => String(item.name).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
                if (filtered){
                  setSubsidiaryList(filtered)
                  setopenSubsidiatyModal(true)
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

    }

    useEffect(()=>{
    const LoadDate = async ()=>{
      const date = await GetCurrentDateOnly()
      setOnlinePaymentData({...OnlinePaymentData,date_credited:date })
    }
    const LoadAcctTitle = async ()=>{
      const response = await axios.get(`${BASE_URL}/api/acct-title/`,{
        withCredentials:true
      })
      if (response.status===200){
        setTmpAcctTitleList(response.data)
        setAcctTitleList(response.data)
      }
    }
    LoadDate()
    LoadAcctTitle()
  },[])




    
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

    const handleinputChange = (e:any) =>{
        const { name, value } = e.target;

    if (name ==='total_amount'){
      const isNumber = /^[0-9]*$/;
      if (isNumber.test(value)) {
          // If setQueNo input is a number, update the state
      setOnlinePaymentData({ ...OnlinePaymentData, [name]: value });
      }
    }else{

      setOnlinePaymentData({ ...OnlinePaymentData, [name]: value });
      if (name==='acct_title'){
          const filtered = TmpAcctTitleList.filter((item:any) => String(item.acct_title).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        if (filtered){
          setAcctTitleList(filtered)
          setopenAcctTitleModal(true)
        }

      }else if (name ==='sl_name'){
        const filtered = TmpSubsidiaryList.filter((item:any) => String(item.name).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        if (filtered){
          setSubsidiaryList(filtered)
          setopenSubsidiatyModal(true)
        }
      }
    }
    }

    const handleClickAddToList = () =>{

    }

    const SaveOnlinePayment = () =>{
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
              if (
                !OnlinePaymentData.date_credited ||
                !OnlinePaymentData.acct_title ||
                !OnlinePaymentData.reference_no ||
                OnlinePaymentData.total_amount <= 0
              ) {
                Swal.fire({
                  icon:'error',
                  title:'Not validated',
                  text:'Please fill in all required fields and enter a valid amount.',
                  timer:2000
                })
              
                return;
              }

              setOnlinePaymentList({...OnlinekPaymentList,OnlinePaymentData})
                setOnlinePaymentData({
                        date_credited:'',
                          acct_title:'',
                          acct_code:0,
                          reference_no:'',
                          remarks:'',
                          sl_code:'0',
                          sl_name:'',
                          sl_type:'',
                          total_amount:0
                })

                OnlinePayment({OnlinekPaymentList: OnlinePaymentData })
                console.log('OnlinePaymentData',OnlinePaymentData)
            }
            
        })
    
      

    }
    const onDelete = () =>{

    }

    const onUpdate = () =>{

    }

    //select Classification
    const handleKeyClassification = (event:any, inputIdentifier:any) => {
      
      if (openAcctTitleModal || openSubsidiatyModal){
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          event.preventDefault();
          if (inputIdentifier === 'Account Title') {
            if (AcctTitleListRef.current){
            const customerItems = Array.from(AcctTitleListRef.current.querySelectorAll('li'));
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              const currentSelectedItem:any = customerItems.find((item) => item.classList.contains('selected'));
              const currentIndex = customerItems.indexOf(currentSelectedItem);
              const nextIndex = currentIndex < customerItems.length - 1 ? currentIndex + 1 : 0;
              const nextItem = customerItems[nextIndex];
      
      
              if (nextItem) {
                if (currentSelectedItem){
                  currentSelectedItem.classList.remove('selected');
                }
                setSelectedItemIndex(nextIndex)
                nextItem.classList.add('selected');
                // const payeeText = nextItem.textContent.split(' - ')[1];
                // setSearchInput(payeeText);
                nextItem.focus();
              }
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              const currentSelectedItem:any = customerItems.find((item) => item.classList.contains('selected'));
              const currentIndex = customerItems.indexOf(currentSelectedItem);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : customerItems.length - 1;
              const prevItem = customerItems[prevIndex];
      
              if (prevItem) {
                currentSelectedItem.classList.remove('selected');
                prevItem.classList.add('selected');
                setSelectedItemIndex(prevIndex)
                prevItem.focus();
              }
            } }
            
          } else if (inputIdentifier === 'Subsidiary') {
            if (SubsidiaryListRef.current){
            const customerItems = Array.from(SubsidiaryListRef.current.querySelectorAll('li'));
            if (event.key === 'ArrowDown') {
              event.preventDefault();
              const currentSelectedItem:any = customerItems.find((item) => item.classList.contains('selected'));
              const currentIndex = customerItems.indexOf(currentSelectedItem);
              const nextIndex = currentIndex < customerItems.length - 1 ? currentIndex + 1 : 0;
              const nextItem = customerItems[nextIndex];
      
      
              if (nextItem) {
                if (currentSelectedItem){
                  currentSelectedItem.classList.remove('selected');
                }
                setSelectedItemIndex(nextIndex)
                nextItem.classList.add('selected');
                // const payeeText = nextItem.textContent.split(' - ')[1];
                // setSearchInput(payeeText);
                nextItem.focus();
              }
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              const currentSelectedItem:any = customerItems.find((item) => item.classList.contains('selected'));
              const currentIndex = customerItems.indexOf(currentSelectedItem);
              const prevIndex = currentIndex > 0 ? currentIndex - 1 : customerItems.length - 1;
              const prevItem = customerItems[prevIndex];
      
              if (prevItem) {
                currentSelectedItem.classList.remove('selected');
                prevItem.classList.add('selected');
                setSelectedItemIndex(prevIndex)
                prevItem.focus();
              }
            } }
            
          } 
      }else if (event.key ==='Enter'){
        if (inputIdentifier==='Account Title'){
            const select = AcctTitleList[selectedItemIndex]
            setOnlinePaymentData({
              ...OnlinePaymentData,
              sl_type:select.sl_type,
              acct_code:select.code,
              acct_title:select.acct_title
            })
            setopenAcctTitleModal(false)
        }else if (inputIdentifier ==='Subsidiary'){
          const select = SubsidiaryList[selectedItemIndex]
            setOnlinePaymentData({
              ...OnlinePaymentData,
              sl_code:select.idcode ,
              sl_name:select.name,
            })
              setopenSubsidiatyModal(false)
        }
      }
    }}

    const selectAcctTitle = (index:any) =>{
    const selected =   AcctTitleList[index]
      if (selected){
        setOnlinePaymentData({
                ...OnlinePaymentData,
                sl_type:selected.sl_type,
                acct_code:selected.code,
                acct_title:selected.acct_title
              }) }
      setopenAcctTitleModal(false)
      getSubsidiary(selected.sl_type,selected.acct_title)
    }

    const selectSubsidiary = (index:any)=>{
        const select = SubsidiaryList[index]
            setOnlinePaymentData({
              ...OnlinePaymentData,
              sl_code:select.idcode ,
              sl_name:select.name,
            })
              setopenSubsidiatyModal(false)
    }


    const getSubsidiary = async (sl_type:any,name:any) =>{

      try{
        const response = await axios.get(`${BASE_URL}/api/subsidiary-account/`,{
          params:{
            sl_type:sl_type,
            sl_name:name
          },withCredentials:true
        })
        if (response.status===200){
          setSubsidiaryList(response.data)
          setTmpSubsidiaryList(response.data)

        }
      }catch(error:any){
        console.warn('error',error)
      }

    }


    
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
       
                SaveOnlinePayment();
           
          } else if (e.key === 'Escape') {
            e.preventDefault(); 
            if (openAcctTitleModal) {setopenAcctTitleModal(false); return}
            if(openSubsidiatyModal) {setopenSubsidiatyModal(false);return}
            if(isShowKeyboard) {setisShowKeyboard(false);return}
            if(isShowKeyboardNumeric) {setisShowKeyboardNumeric(false);return}
            

            handleClose();
          }
        };
      
        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [openAcctTitleModal,openSubsidiatyModal,isShowKeyboard,isShowKeyboardNumeric]);   

    return (
            <div>
                 <div className="modal" >
                    <div className="modal-content-debit" style={{width:'600px'}}>
                        <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                            margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                            ONLINE PAYMENT
                        </h2>
                        {errorView && (
                            <div className="alert_box">
                                <div className="icon">
                                    <i className="fas fa-exclamation"></i>
                                </div>
                                    <header style={{color:'red'}}>Error</header>
                                    <p>{errorData}</p>
                                    <div className="btns">
                                 </div>
                            </div>)}
                        
                                <Grid container className="Online-Container" spacing={2}>
                                    <Grid item xs={12} md={12} style={{ height: '100%'}}>                                   
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <label>Date Credited</label>
                                            <input type='date' value={OnlinePaymentData.date_credited} name="date_credited"
                                            ref={dateCreditedRef}
                                            onKeyDown={(e)=>handleKeyDown(e,dateCreditedRef,AcctTitleRef)}

                                            onChange={handleinputChange}/>
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                           <div  style={{width:'50%'}}>
                                                <label>Account Title</label>
                                           </div>
                                           <div  style={{width:'100%'}}>
                                              <input type='text' value={OnlinePaymentData.acct_title} name="acct_title"
                                              onClick={()=>showOnScreenKeybaord('acct_title')}
                                              onChange={handleinputChange}
                                               autoComplete="off"
                                              ref={AcctTitleRef}
                                              onKeyDown={(e)=>{handleKeyDown(e,dateCreditedRef,SubsidiaryRef),handleKeyClassification(e,'Account Title')}}
                                              />
                                              {openAcctTitleModal && 
                                              
                                                <ul className='ul-list transtype' ref={AcctTitleListRef} >
                                                    <div  style={{
                                                      position: 'sticky',
                                                      top: 0,
                                                      display: 'flex',
                                                      justifyContent: 'flex-end',
                                                      zIndex: 10,
                                                      padding: '4px',
                                                    }}>
                                                       <a
                                                       
                                                       onClick={()=>setopenAcctTitleModal(false)}
                                                        className="fa fa-times"
                                                        style={{
                                                          position: 'absolute',
                                                          right: 0,
                                                          top: '50%',
                                                          transform: 'translateY(-50%)',
                                                          textDecoration: 'none',
                                                          color: 'inherit',
                                                          fontSize:'25px',
                                                          zIndex:'99',
                                                          cursor:'pointer',
                                                          transition: 'color 0.2s, transform 0.2s', // smooth hover
                                                          
                                                        }}
                                                          onMouseEnter={(e) => {
                                                            e.currentTarget.style.color = 'red';
                                                            e.currentTarget.style.transform = 'scale(1.3)'; // enlarge on hover
                                                          }}
                                                          onMouseLeave={(e) => {
                                                            e.currentTarget.style.color = '#333';
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                          }}
                                                      ></a>
                                                    </div>
                                                    {AcctTitleList && AcctTitleList.map((item:any,index:any)=>(
                                                      <li key={index} className={selectedItemIndex === index ? 'selected':''}
                                                      onKeyDown={(e)=>handleKeyClassification(e,'Account Title')}
                                                      onClick={()=>selectAcctTitle(index)}>
                                                        {item.acct_title}
                                                      </li>
                                                    ))}
                                                </ul>
                                             
                                            }
                                           </div>
                                            
                                          
                                        </div>
                                          
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                             <div  style={{width:'50%'}}>
                                                <label>Subsidiary Account</label>
                                             </div>
                                            <div  style={{width:'100%'}}>
                                              <input type='text' value={OnlinePaymentData.sl_name} name="sl_name"
                                                onChange={handleinputChange}
                                                 onClick={()=>showOnScreenKeybaord('sl_name')}
                                                 autoComplete="off"
                                                ref={SubsidiaryRef}
                                                onKeyDown={(e)=>{handleKeyDown(e,AcctTitleRef,ReferenceRef),handleKeyClassification(e,'Subsidiary')}}
                                                />
                                               {openSubsidiatyModal && 
                                              
                                                <ul className='ul-list transtype' ref={SubsidiaryListRef} >
                                                   <div  style={{
                                                      position: 'sticky',
                                                      top: 0,
                                                      display: 'flex',
                                                      justifyContent: 'flex-end',
                                                      zIndex: 10,
                                                      padding: '4px',
                                                    }}>
                                                       <a
                                                       
                                                       onClick={()=>setopenSubsidiatyModal(false)}
                                                        className="fa fa-times"
                                                        style={{
                                                          position: 'absolute',
                                                          right: 0,
                                                          top: '50%',
                                                          transform: 'translateY(-50%)',
                                                          textDecoration: 'none',
                                                          color: 'inherit',
                                                          fontSize:'25px',
                                                          zIndex:'99',
                                                          cursor:'pointer',
                                                          transition: 'color 0.2s, transform 0.2s', // smooth hover
                                                          
                                                        }}
                                                          onMouseEnter={(e) => {
                                                            e.currentTarget.style.color = 'red';
                                                            e.currentTarget.style.transform = 'scale(1.3)'; // enlarge on hover
                                                          }}
                                                          onMouseLeave={(e) => {
                                                            e.currentTarget.style.color = '#333';
                                                            e.currentTarget.style.transform = 'scale(1)';
                                                          }}
                                                      ></a>
                                                    </div>
                                                    {SubsidiaryList && SubsidiaryList.map((item:any,index:any)=>(
                                                      <li key={index} className={selectedItemIndex === index ? 'selected':''}

                                                        onKeyDown={(e)=>{handleKeyClassification(e,'Subsidiary')}}
                                                      onClick={()=>selectSubsidiary(index)}>
                                                        {item.name}
                                                      </li>
                                                    ))}
                                                </ul>
                                             
                                            }


                                            </div>
                                            
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <label>Reference No</label>
                                            <input type='text' value={OnlinePaymentData.reference_no} name="reference_no"
                                             onClick={()=>showOnScreenKeybaord('reference_no')}
                                            onChange={handleinputChange} 
                                             ref={ReferenceRef}
                                              autoComplete="off"
                                            onKeyDown={(e)=>handleKeyDown(e,SubsidiaryRef,AmountDueRef)}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <label>Amount</label>
                                            <input type='number' value={OnlinePaymentData.total_amount||'0.00'} name="total_amount"
                                            onChange={handleinputChange}
                                            onClick={()=>showOnScreenKeybaord('total_amount')}
                                            placeholder="0.00"
                                            style={{textAlign:'end'}}
                                            autoComplete="off"
                                            ref={AmountDueRef}
                                            onKeyDown={(e)=>handleKeyDown(e,ReferenceRef,RemarksRef)}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <label>Remarks</label>
                                            <textarea  value={OnlinePaymentData.remarks} name="remarks"
                                            ref={RemarksRef} 
                                             onClick={()=>showOnScreenKeybaord('remarks')}
                                            style={{padding:'5px'}}
                                            onChange={handleinputChange}/>
                                        </div>


                                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                                            <div style={{display: 'flex', flexDirection: 'row', width: '100%', margin:'5px',gap:'10px'}}>

                                                 <Button  onClick={SaveOnlinePayment} disabled = {isEdit}  style={{
                                                    backgroundColor: isEdit ? 'gray' : 'blue', // Different color when disabled
                                                    cursor: isEdit ? 'not-allowed' : 'pointer',}} >SAVE</Button>
                                                <Button style={{backgroundColor:'red'}} onClick={handleClose}>EXIT</Button>

                                            </div>
                                            </div>
                                    </Grid>
                                </Grid>

                    </div>
                </div>

                {isShowKeyboard && < OnScreenKeyboard handleclose = {closekeyBoard} currentv={OnlinePaymentData[focusedInput]} setvalue={setvalue}/>}
                {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}    currentv={OnlinePaymentData[focusedInput]} setvalue={setvalue}/>}
                
            </div>
    )
}

export default OnlinePaymentTransModal;