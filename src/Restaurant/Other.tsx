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
import configAPI from "../utils/configAPI";

interface OtherPaymentTrans {
    handleClose:() => void;
    amountdue:any;
    OtherPayment:any;
}



const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

const OtherPaymentTransModal: React.FC<OtherPaymentTrans> = ({handleClose,amountdue,OtherPayment})=> {

    const ULCodeRef = useRef<HTMLInputElement>(null);
    const ParticularRef = useRef<HTMLInputElement>(null);
    const SubsidiaryRef = useRef<HTMLInputElement>(null);
    const ReferenceRef = useRef<HTMLInputElement>(null);
    const AmountRef = useRef<HTMLInputElement>(null);
    const RemarksRef = useRef<HTMLTextAreaElement>(null);
    const ParticularListRef = useRef<HTMLUListElement>(null)
    const SubsidiaryListRef = useRef<HTMLUListElement>(null)

    const AmountDueRef = useRef<HTMLInputElement>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(null);
    const [OtherPaymentList,setOtherPaymentList] = useState<any>([])
    const [ParticularList,setParticularList] = useState<any>([])
    const [SubsidiaryList,setSubsidiaryList] = useState<any>([])
    const [TmpParticularList,setTmpParticularList] = useState<any>([])
    const [TmpSubsidiaryList,setTmpSubsidiaryList] = useState<any>([])
    const [Bal,setBal] = useState<any>(amountdue)
    const [TotalTendered,setTotalTendered] = useState<any>(0)
    const [OtherPaymentData,setOtherPaymentData] = useState({
            ul_code:'0',
            particular:'',
            remarks:'',
            sl_code:'0',
            sl_name:'',
            sl_type:'',
            total_amount:0
        })
    // totalAmountDue
    const [totalAmountDue,settotalAmountDue] = useState<any>(0)
    const [totalAmountT,settotalAmountT] = useState<any>(0)
    type OtheraymentDataKey = keyof typeof OtherPaymentData;
    const [focusedInput, setFocusedInput] = useState<OtheraymentDataKey| 'ul_code'>('ul_code');
    const [cursorPosition, setCursorPosition] = useState<any>(0);
    const [openParticularModal,setopenParticularModal] = useState(false)
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
    const [isRequired,setisRequired] = useState<boolean>(false)
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
            setOtherPaymentData((prevData: any) => ({
              ...prevData,
              [focusedInput]: value
            }));
          }
      }else{
       setOtherPaymentData((prevData: any) => ({
              ...prevData,
              [focusedInput]: value
            }));
            if (focusedInput==='particular'){
              setParticularList(true)
                  const filtered = TmpParticularList.filter((item:any) => String(item.pmt_desc).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
                  if (filtered){
                    setParticularList(filtered)
                    setopenParticularModal(true)
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

      
      const loadConfig = async () =>{
         const config = await configAPI.get();
         setOtherPaymentData({...OtherPaymentData,'ul_code':config.ulCode})
      }
     loadConfig()



    },[OtherPaymentList])
 
    // LOAD PARTICULAR//
    useEffect(()=>{
    const LoadAParticular = async ()=>{
      const response = await axios.get(`${BASE_URL}/api/other-payment-setup/`,{
        withCredentials:true
      })
      if (response.status===200){
        setTmpParticularList(response.data)
        setParticularList(response.data)
      }
    }

    LoadAParticular()
  },[])

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
            else if (e.ctrlKey && e.key === 's') { // Control + S
              e.preventDefault();
              SaveOtherPayment()
              
          }else if (e.key === 'Escape') { // Control + S
              e.preventDefault();
              
          }
      }
          window.addEventListener('keydown', handleKeyPress);
        
          return () => {
            window.removeEventListener('keydown', handleKeyPress);
          };
        }, []);   

  const Validate = () =>{
    if (
    !OtherPaymentData.particular ||
    !OtherPaymentData.sl_name ||
    OtherPaymentData.total_amount <= 0
  ) {
     seterrorView(true)  
    seterrorData('Please fill in all required fields and enter a valid amount.')
    setTimeout(() => {
    seterrorView(false)
    seterrorData('')
    }, 2000);
     return false;
  }
  return true
  }

    const AddToList = () =>{
        if (isRequired && OtherPaymentData.remarks === undefined || OtherPaymentData.remarks === '' ){
            seterrorView(true)  
            seterrorData('Remarks is Required.')
            setTimeout(() => {
            seterrorView(false)
            seterrorData('')},2000)

            return
    
    }
        if (Validate()){
            setOtherPaymentList([...OtherPaymentList,OtherPaymentData])
            setOtherPaymentData({
            ul_code:'0',
            particular:'',
            remarks:'',
            sl_code:'0',
            sl_name:'',
            sl_type:'',
            total_amount:0
            })
          

            if (ULCodeRef.current){
                ULCodeRef.current.focus()
            }
        }
    }

    // ************* COMPUTE BALANCE ***********************
    useEffect(()=>{
          const total = OtherPaymentList.reduce((sum: number, item: any) => {
            return sum + Number(item.total_amount || 0);
        }, 0);
        const x = Number(parseFloat(String(amountdue).replace(',',''))) - total
        settotalAmountDue(x)
        settotalAmountT(total)
    },[OtherPaymentList])

    
    
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
      setOtherPaymentData({ ...OtherPaymentData, [name]: value });
      }
    }else{

      setOtherPaymentData({ ...OtherPaymentData, [name]: value });
      if (name==='Particular'){
          const filtered = TmpParticularList.filter((item:any) => String(item.pmt_desc).toLocaleLowerCase().includes(value.toLocaleLowerCase()))
        if (filtered){
          setParticularList(filtered)
          setopenParticularModal(true)
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
        AddToList()
    }

    const SaveOtherPayment = () =>{
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
             

                setOtherPaymentData({
                          ul_code:'',
                          particular:'',
                          remarks:'',
                          sl_code:'0',
                          sl_name:'',
                          sl_type:'',
                          total_amount:0
                })

                OtherPayment({OtherPaymentList })

            }
            
        })
    
      

    }
    const onDelete = () =>{

    }

    const onUpdate = () =>{

    }

    //select Classification
    const handleKeyClassification = (event:any, inputIdentifier:any) => {
      
      if (openParticularModal || openSubsidiatyModal){
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
          event.preventDefault();
          if (inputIdentifier === 'Account Title') {
            if (ParticularRef.current){
            const customerItems = Array.from(ParticularRef.current.querySelectorAll('li'));
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
            const select = ParticularList[selectedItemIndex]
            setOtherPaymentData({
              ...OtherPaymentData,
              particular:select.pmt_desc,
              sl_type:select.sl_type,
            })
             getSubsidiary(select.sl_type,select.acct_title)
            setopenParticularModal(false)
             setisRequired(false)
            if (select.remarks==='Y'){
                setisRequired(true)
            }
        }else if (inputIdentifier ==='Subsidiary'){
          const select = SubsidiaryList[selectedItemIndex]
            setOtherPaymentData({
              ...OtherPaymentData,
              sl_code:select.idcode ,
              sl_name:select.name,
            })
              setopenSubsidiatyModal(false)
        }
      }}}

    const selectAcctTitle = (index:any) =>{
    const selected =   ParticularList[index]
      if (selected){
           setOtherPaymentData({
              ...OtherPaymentData,
              particular:selected.pmt_desc,
              sl_type:selected.sl_type,
            })
            getSubsidiary(selected.sl_type,selected.acct_title)
            setopenParticularModal(false)
            setisRequired(false)
            if (selected.remarks==='Y'){
                setisRequired(true)
            }
    }}

    const selectSubsidiary = (index:any)=>{
        const select = SubsidiaryList[index]
            setOtherPaymentData({
              ...OtherPaymentData,
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

    const SelectData = (index:any) =>{

    }

      useEffect(() => {
        if (OtherPaymentData.total_amount === 0){
          setviewSave(true);
        }else{
          setviewSave(false);
        }
      },[OtherPaymentData])
    

    
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
       
                SaveOtherPayment();
           
          } else if (e.key === 'Escape') {
            e.preventDefault(); 
            if (openParticularModal) {setopenParticularModal(false); return}
            if(openSubsidiatyModal) {setopenSubsidiatyModal(false);return}
            handleClose();
          }
        };
      
        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, [openParticularModal,openSubsidiatyModal]);   



    return (
            <div>
                 <div className="modal" >
                    <div className="modal-content-debit" style={{width:'90%'}}>
                        <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                            margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                            OTHER PAYMENT
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
                                    <Grid item xs={12} md={6} style={{ height: '100%'}}>                                   
                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                            <label>UL Code</label>
                                            <input type='text' value={OtherPaymentData.ul_code} name="ul_code"
                                            ref={ULCodeRef}
                                            onKeyDown={(e)=>handleKeyDown(e,ULCodeRef,ParticularRef)}

                                            onChange={handleinputChange}/>
                                        </div>

                                        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                           <div  style={{width:'50%'}}>
                                                <label>Particular</label>
                                           </div>
                                           <div  style={{width:'100%'}}>
                                              <input type='text' value={OtherPaymentData.particular} name="particular"
                                              onClick={()=>showOnScreenKeybaord('particular')}
                                              onChange={(e)=>handleinputChange(e)}
                                               autoComplete="off"
                                              ref={ParticularRef}
                                              onKeyDown={(e)=>{handleKeyDown(e,ULCodeRef,SubsidiaryRef),handleKeyClassification(e,'Particular')}}
                                              />
                                              {openParticularModal && 
                                              
                                                <ul className='ul-list transtype' ref={ParticularListRef} >
                                                    <div  style={{
                                                      position: 'sticky',
                                                      top: 0,
                                                      display: 'flex',
                                                      justifyContent: 'flex-end',
                                                      zIndex: 10,
                                                      padding: '4px',
                                                    }}>
                                                       <a
                                                       
                                                       onClick={()=>setopenParticularModal(false)}
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
                                                    {ParticularList && ParticularList.map((item:any,index:any)=>(
                                                      <li key={index} className={selectedItemIndex === index ? 'selected':''}
                                                      onKeyDown={(e)=>handleKeyClassification(e,'Particular')}
                                                      onClick={()=>selectAcctTitle(index)}>
                                                        {item.pmt_desc}
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
                                              <input type='text' value={OtherPaymentData.sl_name} name="sl_name"
                                                onChange={handleinputChange}
                                                 onClick={()=>showOnScreenKeybaord('sl_name')}
                                                 autoComplete="off"
                                                ref={SubsidiaryRef}
                                                onKeyDown={(e)=>{handleKeyDown(e,ParticularRef,AmountDueRef),handleKeyClassification(e,'Subsidiary')}}
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
                                            <label>Amount</label>
                                            <input type='number' value={OtherPaymentData.total_amount||'0.00'} name="total_amount"
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
                                            <textarea  value={OtherPaymentData.remarks} name="remarks"
                                            ref={RemarksRef} 
                                             onClick={()=>showOnScreenKeybaord('remarks')}
                                            style={{padding:'5px'}}
                                            onChange={handleinputChange}/>
                                        </div>


                                        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                                            <div style={{ display: 'flex', flexDirection: 'row',width: '100%', margin:'5px',gap:'10px'}}>
                                                {viewSave ? (
                                                    <Button  onClick={SaveOtherPayment} disabled = {isEdit}  style={{
                                                        backgroundColor: isEdit ? 'gray' : 'blue', // Different color when disabled
                                                        cursor: isEdit ? 'not-allowed' : 'pointer', // Change cursor when disabled
                                                        }} >SAVE</Button>
                                                         ):(
                                                    <Button  onClick={handleClickAddToList} disabled = {isEdit}  style={{
                                                        backgroundColor: isEdit ? 'gray' : 'blue', // Different color when disabled
                                                        cursor: isEdit ? 'not-allowed' : 'pointer', // Change cursor when disabled
                                                        }}> ADD</Button> )}
                                        
                                        
                                                    <Button style={{backgroundColor:'blue'}} onClick={onUpdate}>EDIT</Button>
                                            </div>
                                                <div style={{ display: 'flex', flexDirection: 'row',width: '100%', margin:'5px',gap:'10px'}}>
                                                    <Button style={{backgroundColor:'RED'}} onClick={onDelete}>DELETE</Button>
                                                    <Button style={{backgroundColor:'red'}} onClick={handleClose}>EXIT</Button>
                                                </div>
                                        </div>

                                       

                                    </Grid>
                                     <Grid item xs={12} md={6} style={{ height: '100%'}}>
                                            <div style={{height:'268px' ,overflow:'auto'}}>
                                                <Table sx={{
                                                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto'}}>
                                                    <thead>
                                                        <tr>
                                                            <th>UL</th>
                                                            <th>Particular</th>
                                                            <th>Subsidiary Account</th>
                                                            <th>Amount</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {OtherPaymentList.length > 0 ? (
                                                            OtherPaymentList.map((item:any, index:any) => (
                                                            <tr key={index} style={{textAlign:'center'}} onClick={() => SelectData(index)}>
                                                                <td>{item.ul_code}</td>
                                                                <td>{item.particular}</td>
                                                                <td>{item.sl_name}</td>
                                                                <td style={{textAlign:'end'}}>{Number(item.total_amount || 0).toLocaleString(undefined,{
                                                                    minimumFractionDigits:2,
                                                                    maximumFractionDigits:2
                                                                })}</td>
                                                            </tr> ))
                                                                ) : (
                                                            <tr>
                                                                <td colSpan={5}>No items in the transaction</td>
                                                            </tr>)}
                                                    </tbody>
                                                </Table>
                                            </div>
                                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                                                <div>
                                                    <Typography sx={{fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                                    overflow: 'auto',width:'40%'}}>AMOUNT DUE</Typography>
                                                        <input type="text" placeholder="0.00" readOnly autoComplete="off" value={amountdue} style={{textAlign:'end'}} />
                                                </div>
                                                <div>
                                                  <div>
                                                     <Typography  sx={{fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                                    overflow: 'auto',width:'40%'}}>AMOUNT TENDERED:</Typography>
                                                        <input type="text" placeholder="0.00" readOnly autoComplete="off" style={{textAlign:'end'}} value={(parseFloat(totalAmountT) || 0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} />
                                             
                                                  </div>
                                                        <Typography  sx={{fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                                    overflow: 'auto',width:'40%'}}>BALANCE</Typography>
                                                        <input type="text" placeholder="0.00" readOnly autoComplete="off" style={{textAlign:'end'}} value={(parseFloat(totalAmountDue) || 0).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} />
                                                      
                                                  <div>

                                                  </div>
                                                     
                                                </div>
                                            </div>
                                    </Grid>
                                </Grid>

                    </div>
                </div>

                {isShowKeyboard && < OnScreenKeyboard handleclose = {closekeyBoard} currentv={OtherPaymentData[focusedInput]} setvalue={setvalue}/>}
                {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}    currentv={OtherPaymentData[focusedInput]} setvalue={setvalue}/>}
                
            </div>
    )
}

export default OtherPaymentTransModal