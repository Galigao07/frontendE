/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Table, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import './css/DiscountSeniorCitezen.css'
import Swal from "sweetalert2";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import { isDesktop } from "react-device-detect";
import OnScreenKeyboard from "./KeyboardGlobal";
import OnScreenKeyboardNumeric from "./KeyboardNumericGlobal";
import Verification from "./Verification";


interface SeniorCitezenDiscountData{
    handleClose:() => void;
    SeniorData:any;
    amountcover:any;
    SeniorOrderData:any;

}

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })


const SeniorCitezenDiscount: React.FC<SeniorCitezenDiscountData> = ({handleClose,SeniorData,amountcover,SeniorOrderData}) => {

    const SeniorIDRef = useRef<HTMLInputElement>(null);
    const SeniorFulnnameRef = useRef<HTMLInputElement>(null);
    const SeniorTINRef = useRef<HTMLInputElement>(null);
    const SGuestCountRef = useRef<HTMLInputElement>(null);
    const SCoveredAmountRef = useRef<HTMLInputElement>(null);
    const SaveButtonRef = useRef<HTMLButtonElement>(null)
    const ViewListRef = useRef<HTMLButtonElement>(null)
    const CloseRef = useRef<HTMLButtonElement>(null)

    const [isdisabled,setisdisabled] = useState<boolean>(false)
    const [isdisabledOveride,setisdisabledOveride] = useState<boolean>(true)
    const [isShowKeyboardNumeric, setisShowKeyboardNumeric] = useState<boolean>(false);






    const [SeniorDiscountData,setSeniorDiscountData] = useState({
        SeniorID:'',
        SeniorFulnname:'',
        SeniorTIN:'',
        SeniorCount:'',
        SGuestCount:'',
        SAmountCovered:'',
        SVatSales:'',
        SLessVat12:'',
        SNetOfVat:'',
        SLess20SCDiscount:'',
        SDiscountedPrice:'',
    })
    // const [SeniorNameList, setSeniorNameList] = useState([]);
    interface datainfo {
        SID:string;
        SName:string;
        STIN:string;
    }
    const [SeniorNameList ,setSeniorNameList] = useState<any>([])   
    const [OpenlistModal,setOpenListModal] = useState<boolean>(false) 



useEffect(() => {

    const NetSale  =  parseFloat(amountcover) / (0.12 + 1)
    const NetSale12  =  parseFloat(amountcover) -  NetSale
    let gCount:any = 0
    if (SeniorOrderData[0].guest_count === null || SeniorOrderData[0].guest_count=== undefined){
        gCount = 1
    }else{
        gCount = SeniorOrderData[0].guest_count
    }
    let name :any = ''

    if (SeniorOrderData[0].customer_name === null || SeniorOrderData[0].customer_name === undefined){
        name = ''
    }else{
        name = SeniorOrderData[0].customer_name
    }

     setSeniorDiscountData({ ...SeniorDiscountData,
     SAmountCovered: amountcover ,
     SVatSales:amountcover,
     SeniorFulnname:name,
     SeniorCount: '0',
     SGuestCount: String(gCount),
     SLessVat12 : NetSale12.toLocaleString(undefined,{minimumFractionDigits:3,maximumFractionDigits:3}),
     SNetOfVat: NetSale.toLocaleString(undefined,{minimumFractionDigits:3,maximumFractionDigits:3}),
     SDiscountedPrice:NetSale.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}),
    
    });

    // setSeniorNameList({...SeniorNameList,SID:SeniorDiscountData[0]. })

   

    setTimeout(() => {
        if (SeniorIDRef.current){
            SeniorIDRef.current.focus();
            SeniorIDRef.current.select();
        }
    }, 100);

 console.log(SeniorDiscountData)

},[])





const ComputeDisCount = (e:any) => {
    if (e){
        const tmp : any =   parseInt(e)  / parseInt(SeniorDiscountData.SGuestCount)
    
        const SAmountCoveredTotal  =  parseFloat(amountcover.replace(',','')) * tmp 
        const NetSale  =  SAmountCoveredTotal / (0.12 + 1 )
        const NetSale12 =  SAmountCoveredTotal - NetSale
        const DisCount  = (SAmountCoveredTotal - NetSale12 ) * 0.2
        const DiscountedPrice :any = NetSale - DisCount
        setSeniorDiscountData({ ...SeniorDiscountData,
            SAmountCovered: SAmountCoveredTotal.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}),
            SVatSales: SAmountCoveredTotal.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2}),
            SeniorCount: e,
            SLessVat12 : NetSale12.toLocaleString(undefined,{minimumFractionDigits:4,maximumFractionDigits:4}),
            SNetOfVat: NetSale.toLocaleString(undefined,{minimumFractionDigits:4,maximumFractionDigits:4}),
            SDiscountedPrice:DiscountedPrice.toLocaleString(undefined,{minimumFractionDigits:4,maximumFractionDigits:4}),
            SLess20SCDiscount:DisCount.toLocaleString(undefined,{minimumFractionDigits:4,maximumFractionDigits:4}),
       
    })}
}

const ReComputeDisCount = (e:any) => {
    if (e){
        const tmp : any =   parseInt(e)  / parseInt(SeniorDiscountData.SGuestCount)
    
        const SAmountCoveredTotal  =  parseFloat(SeniorDiscountData.SAmountCovered.replace(',','')) * tmp 
        const NetSale  =  SAmountCoveredTotal / (0.12 + 1 )
        const NetSale12 =  SAmountCoveredTotal - NetSale
        const DisCount  = (SAmountCoveredTotal - NetSale12 ) * 0.2
        const DiscountedPrice :any = NetSale - DisCount
        setSeniorDiscountData({ ...SeniorDiscountData,
            SLessVat12 : NetSale12.toLocaleString(undefined,{minimumFractionDigits:4,maximumFractionDigits:4}),
            SNetOfVat: NetSale.toLocaleString(undefined,{minimumFractionDigits:4,maximumFractionDigits:4}),
            SDiscountedPrice:DiscountedPrice.toLocaleString(undefined,{minimumFractionDigits:4,maximumFractionDigits:4}),
            SLess20SCDiscount:DisCount.toLocaleString(undefined,{minimumFractionDigits:4,maximumFractionDigits:4}),
       
    })}
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



    const handleChange = (field:any, value:any) => {
        setSeniorDiscountData({ ...SeniorDiscountData, [field]: value });

        // if (field === 'SGuestCount'){
        //     ComputeDisCount(value)
        // }

    };



    const ViewList = () => {
      setOpenListModal(true)
    }
 
    const CloseModalList = () => {
        setOpenListModal(false)
    }

    const showYesNoAlert1 = (message: string): boolean => {
        return window.confirm(message);
    };


    const showYesNoAlert = (message: string) => {
        return (
            <div className="modal">
                <div className="modal-content">
                    <p>{message}</p>
                    <button>Yes</button>
                    <button>No</button>
                </div>
            </div>
        );
    };

    useEffect(() => {
        ComputeDisCount(SeniorDiscountData.SeniorCount)
        if (parseInt(SeniorDiscountData.SeniorCount) > 0){
            if (parseInt(SeniorDiscountData.SeniorCount) === parseInt(SeniorDiscountData.SGuestCount)){
     
                    setisdisabled(true)
                
                         
            }else{
                setisdisabled(false)
            }
        }
   
    },[SeniorDiscountData.SeniorCount])

    useEffect(() => {
        ReComputeDisCount(SeniorDiscountData.SeniorCount)
    },[SeniorDiscountData.SAmountCovered])

    const AddNewSenior = async (event: any) => {
        if (event.key === 'Enter') {

            const totals :any = parseInt(SeniorDiscountData.SeniorCount) + 1
            if (totals <= SeniorDiscountData.SGuestCount) {
                setSeniorNameList((SeniorNameList:any) => [
                    ...SeniorNameList,
                    {
                        SID: SeniorDiscountData.SeniorID,
                        SName: SeniorDiscountData.SeniorFulnname,
                        STIN: SeniorDiscountData.SeniorTIN,
                    }
                ]);
    
                setmessage("Do you want to AddNew Senior?")
                setInfoModal(true)
            }else{
                showErrorAlert('Total Senior Count Exceeds Guest Count')
            }

         }
    };
    const [InfoModal,setInfoModal] = useState<boolean>(false)
    
    const [message,setmessage] = useState<any>('')

    const SaveNewSenior = (result:string) => {
        if (result === 'YES') {
            const totals :any = parseInt(SeniorDiscountData.SeniorCount) + 1
            setSeniorDiscountData({ ...SeniorDiscountData,
                SeniorCount: totals
               
               });

               setSeniorDiscountData({...SeniorDiscountData,
                SeniorID:'',
                SeniorCount:totals,
                SeniorFulnname:'',
                SeniorTIN:''});

            SeniorIDRef.current?.focus()
    
            } else {
                const totals :any = parseInt(SeniorDiscountData.SeniorCount) + 1
                setSeniorDiscountData({ ...SeniorDiscountData,
                    SeniorCount: totals
                    // SGuestCount:SeniorDiscountData.SGuestCount +1,
          
                   
                   });

                   ComputeDisCount(parseInt(totals))

                   setTimeout(() => {
                    SaveButtonRef.current?.focus()
                   }, 100);
            }

            setInfoModal(false)
      
    }

    const AddNewSeniorOnclick =  () => {
        const totals :any = parseInt(SeniorDiscountData.SeniorCount) + 1
        if (totals <= SeniorDiscountData.SGuestCount) {
            setSeniorNameList((SeniorNameList:any) => [
                ...SeniorNameList,
                {
                    SID: SeniorDiscountData.SeniorID,
                    SName: SeniorDiscountData.SeniorFulnname,
                    STIN: SeniorDiscountData.SeniorTIN,
                }
            ]);
      

            setmessage("Do you want to AddNew Senior?")
            setInfoModal(true)
        }  else{
            showErrorAlert('Total Senior Count Exceeds Guest Count')
        }
    };

 const OverrideAmountCovered = () => {
    setisdisabledOveride(false)
    showOnScreenKeybaord('SAmountCovered')
    
    }
    
    const HandleSave = () => {
        SeniorData({SeniorDiscountData,SeniorNameList})
    }

    // useEffect(() => {
        
    //     if (parseInt(SeniorDiscountData.SeniorCount) === parseInt(SeniorDiscountData.SGuestCount)) {

    //     }

    // },[SeniorDiscountData.SeniorCount])


    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            // e.preventDefault();
    
            
          if (e.key === 'F5') {
            e.preventDefault(); // Prevent the default browser refresh action for F5
          }
          else if (e.ctrlKey && e.key === 'n') {
            e.preventDefault(); // Prevent the default browser action for Control + N
          }
          else if (e.ctrlKey && e.key === 's') { // Control + S
            e.preventDefault();

          } else if (e.key === 'Escape') {
            e.preventDefault(); 
            handleClose();
          }
        };

        window.addEventListener('keydown', handleKeyPress);
      
        return () => {
          window.removeEventListener('keydown', handleKeyPress);
        };
      }, []); 

 
      const [isFocus,setisFocus] = useState<any>(0)
      const HandleKeydownButton = (event:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) =>{

        event.preventDefault();
        if (event.key == 'ArrowRight' || event.key == 'ArrowDown') {
            NextRef.current.focus();
 
        
            if (index == 1) {
              setisFocus(0)
            }else {
              setisFocus(index + 1)
            }
         
      
        }
      
        if (event.key == 'ArrowLeft' || event.key == 'ArrowUp'){
          BackRef.current.focus();

      
          setisFocus(index - 1)
      
      }
      
      if (event.key == 'Enter'){
            event.preventDefault()
         if (index == 0){
            ViewList();
         }
         if (index == 1){
          HandleSave()
         }
         if (index == 2){
          handleClose()
         }
  
      }
      
      }

      const modalSeniorRef = useRef<HTMLDivElement>(null)
      //************* PREVENT KEYPRESS***************** */


      type SeniorDiscountDatakey = keyof typeof SeniorDiscountData;

      const [focusedInput, setFocusedInput] = useState<SeniorDiscountDatakey| 'SeniorID'>('SeniorID');
      const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);
      
      const [isShow, setisShow] = useState<boolean>(false);
      const showOnScreenKeybaord = (ref:any) => {
        if (isDesktop){
        if (ref === 'SAmountCovered'){
            setisShowKeyboardNumeric(true)
            setFocusedInput(ref)
        }else{
            setisShowKeyboard(true)
            setFocusedInput(ref)
        }
        
          
        }
      }
      const ShowKeyorNot = () => {
        setisShow(!isShow);
      }
      const setvalue = (value: any) => {
        if (focusedInput) {
        
            setSeniorDiscountData((prevData: any) => ({
                ...prevData,
                [focusedInput]: value
              }));
        }
        setisShowKeyboard(false)
        // ReComputeDisCount(SeniorDiscountData.SeniorCount)
        setisShowKeyboardNumeric(false)
      };

      const closekeyBoard = () => {
        setisShowKeyboard(false)
        setisShowKeyboardNumeric(false)
      }
    const [OpenVireficationModal,setOpenVireficationModal] = useState<boolean>(false)
    const [TypeofDisCount,setTypeofDisCount] = useState<any>('')
//*************************VERIFICATION ****************************/
const OpenVireficationEntry = (type:any) => {
    setTypeofDisCount(type)
    setOpenVireficationModal(true)
  }
  
  const CloseVerification = () => {
    setOpenVireficationModal(false)
    setTypeofDisCount('')
  
  }
  
  const OKVerification = (data:any) => {
    setOpenVireficationModal(false)
  
    OverrideAmountCovered()
  }
  
      

    return (
        <>
             <div className="modal" id = 'Seniormodal' ref={modalSeniorRef}>
            <div className="modal-content-senior" >
            <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                SENIOR CITIZEN DISCOUNT</h2>
                <div className="senior-Container">
                <div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width: '50%',}}>Senior ID
                        </Typography>
                        <input type="text" placeholder="Senior ID" autoComplete="off" ref={SeniorIDRef} id ='seniorId'
                            value={SeniorDiscountData.SeniorID} name="SeniorID"
                            onKeyDown={(e) => handleKeyDown(e, SeniorIDRef, SeniorFulnnameRef)} 
                            onClick={()=>showOnScreenKeybaord('SeniorID')}
                            onChange={(e) => handleChange('SeniorID', e.target.value)}/>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto',width: '50%',}}> Senior Full Name
                        </Typography>
                        <input type="text" placeholder="Senior Full Name"  autoComplete="off"  ref={SeniorFulnnameRef}
                            value={SeniorDiscountData.SeniorFulnname} name="SeniorFulnname"
                            onKeyDown={(e) => handleKeyDown(e, SeniorFulnnameRef, SeniorTINRef)} 
                            onClick={()=>showOnScreenKeybaord('SeniorFulnname')}
                            onChange={(e) => handleChange('SeniorFulnname', e.target.value)}/>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto', width: '50%',}}> Senior TIN</Typography>
                        <input
                            type="text" placeholder="Senior TIN" autoComplete="off" ref={SeniorTINRef}
                            value={SeniorDiscountData.SeniorTIN} name="SeniorTIN"
                            onKeyDown={(e) => AddNewSenior(e)}
                            onClick={()=> showOnScreenKeybaord('SeniorTIN')}
                            // onKeyDown={(e) => handleKeyDown(e, SeniorTINRef, SGuestCountRef)} 
                            onChange={(e) => handleChange('SeniorTIN', e.target.value)} style={{width:'65%'}} />
                        <button
                            onClick={() => AddNewSeniorOnclick()}
                            disabled={isdisabled}
                            style={{
                                backgroundColor: isdisabled ?  'grey':'blue',
                                position: 'relative',
                                bottom: '5px',
                                cursor:isdisabled ? 'not-allowed':'pointer',
                            
                            }}
                        >
                            Add Senior
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px',justifyContent:'space-evenly' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto', width: '50%',}}>Senior Count and Guest Count</Typography>
                        <input
                            type="text" placeholder="Guest Count" autoComplete="off" readOnly
                            value={SeniorDiscountData.SeniorCount} name="SeniorCount"
                            onChange={(e) => handleChange('SeniorCount', e.target.value)} style={{width:'45%',marginRight:'5%'}} />

                            <input
                            type="text" placeholder="Total Senior Count" autoComplete="off" ref={SGuestCountRef}
                            value={SeniorDiscountData.SGuestCount} name="SGuestCount"
                            onChange={(e) => handleChange('SGuestCount', e.target.value)} style={{width:'48%'}}  
                            readOnly
                            // onKeyDown={(e)=> ComputeDisCount(e.target.value)}
                            />      
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto', width: '50%',}}> Amount Covered</Typography>
                        <input
                            type="text" ref={SCoveredAmountRef} placeholder="0.00" autoComplete="off" readOnly={isdisabledOveride} style={{textAlign:'end',width:'65%'}}
                            value={SeniorDiscountData.SAmountCovered} name="SAmountCovered"
                            onChange={(e) => handleChange('SAmountCovered', e.target.value)} />

                        <button
                            onClick={() => OpenVireficationEntry('Override')}
            
                            style={{
                                backgroundColor: 'blue',
                                position: 'relative',
                                bottom: '5px',
                            }}>
                            Override
                        </button>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto', width: '50%',}}> VAT Sales</Typography>
                        <input
                            type="text" placeholder="0.00" autoComplete="off" readOnly style={{textAlign:'end'}}
                            value={SeniorDiscountData.SVatSales} name="SVatSales"
                            onChange={(e) => handleChange('SVatSales', e.target.value)} />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto', width: '50%',}}>Less: 12% VAT</Typography>
                        <input
                            type="text" placeholder="0.00" autoComplete="off" readOnly style={{textAlign:'end'}}
                            value={SeniorDiscountData.SLessVat12} name="SLessVat12"
                            onChange={(e) => handleChange('SLessVat12', e.target.value)} />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto', width: '50%',}}> Net of VAT</Typography>
                        <input
                            type="text" placeholder="0.00" autoComplete="off" readOnly style={{textAlign:'end'}}
                            value={SeniorDiscountData.SNetOfVat} name="SNetOfVat"
                            onChange={(e) => handleChange('SNetOfVat', e.target.value)} />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto', width: '50%',}}> Less: 20% SC Discount</Typography>
                        <input
                            type="text" placeholder="0.00" autoComplete="off" readOnly style={{textAlign:'end'}}
                            value={SeniorDiscountData.SLess20SCDiscount} name="SLess20SCDiscount"
                            onChange={(e) => handleChange('SLess20SCDiscount', e.target.value)} />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '5px' }}>
                        <Typography
                            sx={{
                                fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto', width: '50%',}}>Discounted Price</Typography>
                        <input
                            type="text" placeholder="0.00" autoComplete="off" readOnly style={{textAlign:'end'}}
                            value={SeniorDiscountData.SDiscountedPrice} name="SDiscountedPrice"
                            onChange={(e) => handleChange('SDiscountedPrice', e.target.value)} />
                    </div>


                    <div className="Button-container" style={{ width: '100%', margin:'5px'}}>
                        <Button style={{backgroundColor:'blue'}}  ref= {ViewListRef}  
                        onKeyDown={(e)=> HandleKeydownButton(e,CloseRef,ViewListRef,SaveButtonRef,0)}
                        tabIndex={0} onClick={ViewList}>View List</Button>
                        
                        <Button style={{backgroundColor:'blue'}} ref= {SaveButtonRef}  
                                         onKeyDown={(e)=> HandleKeydownButton(e,ViewListRef,SaveButtonRef,CloseRef,1)}
                        tabIndex={1}  onClick={HandleSave}>SAVE</Button>
                       
                        <Button style={{backgroundColor:'red'}}   ref= {CloseRef}  
                                     onKeyDown={(e)=> HandleKeydownButton(e,SaveButtonRef,CloseRef,ViewListRef,2)}
                        tabIndex={2} onClick={handleClose}>EXIT</Button>
{/* 
                        <Button  style={{fontSize:'10px',backgroundColor:'blue'}}
                                    onClick={ShowKeyorNot}>Keyboard {isShow ? 'Disable':'Enable'}
                        </Button> */}
                    </div>
                </div>
                </div>
        </div>
        </div>

        {OpenlistModal && 
          <div className="modal">
          <div className="modal-content-senior">
            <div>

            <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                SENIOR CITEZEN LIST</h2>
            <Table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>TIN</th>
                </tr>
                </thead>
                <tbody>
                        {Array.isArray(SeniorNameList) && SeniorNameList.length > 0 ? (
                        SeniorNameList.map((item, index) => (
                        <tr key={index} style={{textAlign:'center'}} >
                        <td>{item.SID}</td>
                        <td>{item.SName}</td>
                        <td>{item.STIN}</td>
                        </tr>
                            ))
                            ) : (
                        <tr>
                            <td colSpan={3}>No items in the transaction</td>
                        </tr>)}
                        </tbody>
            </Table>
            </div>
            <button onClick={CloseModalList} style={{backgroundColor:'red',width:'90%' ,margin:'10PX'}}>CLOSE</button>
         </div>
         </div>
        }
         {InfoModal && <div className="modal">
                <div className="modal-content">
                    <p style={{fontSize:'20px',fontWeight:'bold'}}>{message}</p>
                    <div className="Button-Container" style={{marginTop:'20px'}}>
                        <button  style={{backgroundColor:'blue'}} className="btn-ok" onClick={()=>SaveNewSenior('YES')}>Yes</button>
                        <button  className="btn-No" onClick={()=>SaveNewSenior('NO')}>No</button>
                    </div>
                   
                </div>
            </div>}
            {OpenVireficationModal && <Verification handleClose={CloseVerification} VerificationEntry={OKVerification}/>}
            {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}   currentv={''} setvalue={setvalue}/>}
            {isShowKeyboard && < OnScreenKeyboard handleclose = {closekeyBoard}  currentv = {SeniorDiscountData[focusedInput]} setvalue={setvalue}/>}
        </>
   
    )

}
export default SeniorCitezenDiscount;