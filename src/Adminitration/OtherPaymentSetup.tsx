import React, { useEffect, useRef, useState } from 'react';
import {  Autocomplete, Box, Button, Checkbox, Dialog, FormControl,
     FormControlLabel, Grid, List, ListItem, ListItemButton, ListItemText, MenuItem,
      Select, SelectChangeEvent, Table, TextField, Typography } from '@mui/material'; // Import Material-UI components
import axios from 'axios'; 
import {BASE_URL} from '../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDisplay, faPlus, faPrint,faTrash} from '@fortawesome/free-solid-svg-icons';
import { Tooltip, IconButton } from "@mui/material";
import { isDesktop } from 'react-device-detect';
import showErrorAlert from '../SwalMessage/ShowErrorAlert';
import showSuccessAlert from '../SwalMessage/ShowSuccessAlert';
import Swal from 'sweetalert2';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { useDispatch, useSelector, UseSelector } from 'react-redux';
import { UseDispatch } from 'react-redux';
import { InProgressLoading } from '../Loader/Loader';
import { RootState } from '../store';
import { setGlobalIsLoading } from '../globalSlice';
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from '@mui/icons-material/Edit';

import { GetCurrentDateAndTime, GetCurrentDateOnly } from '../global';
import OnScreenKeyboard from '../Restaurant/KeyboardGlobal';
import OnScreenKeyboardNumeric from '../Restaurant/KeyboardNumericGlobal';

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  interface setup {
    pmt_code:number,
    pmt_desc:string,
    acct_code:string,
    acct_title:string,
    pmt_type:string,
    remarks:string
  }

  const OtherPaymentSetup = () =>{
    const dispatch = useDispatch()
    const isLoading = useSelector((state:RootState)=>state.global.globalIsLoading)

    const [OtherPaymnetSetupList,setOtherPaymnetSetupList] = useState<any>([])
    const [OtherPaymentSetup,setOtherPaymentSetup] = useState<setup>({
        pmt_code:0,
        pmt_desc:'',
        acct_code:'',
        acct_title:'',
        pmt_type:'',
        remarks:''
    })
    const [AcctTitleList,setAcctTitleList] = useState<any>([])
    const [TmpAcctTitleList,setTmpAcctTitleList] = useState<any>([])
    const [OpenAcctTitleModal,setOpenAcctTitleModal] = useState<boolean>(false)
    const [OpenEntryModal,setOpenEntryModal] = useState<boolean>(false)
    const [isEdit,setisEdit] = useState<boolean>(false)

    const AcctTitleListRef = useRef<HTMLUListElement>(null)
    const pmtCodeRef = useRef<HTMLInputElement>(null);
    const pmtDescRef = useRef<HTMLInputElement>(null);
    const acctCodeRef = useRef<HTMLInputElement>(null);
    const acctTitleRef = useRef<HTMLInputElement>(null);
    const pmtTypeRef = useRef<HTMLInputElement>(null);
    const remarksRef = useRef<HTMLInputElement>(null);
    const SearhRef = useRef<HTMLInputElement>(null);

        type OtherPaymentSetupKey = keyof typeof OtherPaymentSetup;
        const [focusedInput, setFocusedInput] = useState<OtherPaymentSetupKey| 'pmt_code'>('pmt_code');
        const [cursorPosition, setCursorPosition] = useState<any>(0);
        const [openAcctTitleModal,setopenAcctTitleModal] = useState<boolean>(false)
        const [openSubsidiatyModal,setopenSubsidiatyModal] = useState<boolean>(false)
        const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);
        const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);
        const [isShowKeyboardNumeric, setisShowKeyboardNumeric] = useState<boolean>(false);
        const [isShowKeyboardNumericForCardNo, setisShowKeyboardNumericForCardNo] = useState<boolean>(false);
        const [viewSave,setviewSave] = useState(false)
        const [errorData,seterrorData] = useState('')
        const [errorView,seterrorView]= useState(false)
        const [isShow, setisShow] = useState<boolean>(false);
        const [checked, setChecked] = useState(false);
        const [Searh,setSearch] = useState<string>('')
        const ExcessRef = useRef<HTMLInputElement>(null)
        const SaveRef = useRef<HTMLButtonElement>(null)
        const CloseRef = useRef<HTMLButtonElement>(null)

        
        const [selectedIndex, setSelectedIndex] = useState<number>(-1);
        const listItemRefs = useRef<Array<HTMLDivElement | any>>([]);


        const showOnScreenKeybaord = (ref:any) => {
          if (isDesktop){
            setisShowKeyboard(true)
            setFocusedInput(ref)
            }}
    
        const ShowKeyorNot = () => {
          setisShow(!isShow);
        }
        const setvalue = (value: any) => {
           setOtherPaymentSetup((prevData: any) => ({
                  ...prevData,
                  [focusedInput]: value
                }));
               
          setisShowKeyboard(false)
          setisShowKeyboardNumeric(false)
          setisShowKeyboardNumericForCardNo(false)
        };
    
    
    const closekeyBoard = () => {
        setisShowKeyboard(false)
        setisShowKeyboardNumeric(false)
    
    }

    useEffect(()=>{
        fetchData()
        fetchAcctTitle()
    },[])


    //Handle keydown 
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
              handleSubmit();
            } else if (e.key === 'Escape') {
              e.preventDefault(); 
              if(openAcctTitleModal){ setOpenAcctTitleModal(false); return}

              
                handleClose();
            }
          };
        
          window.addEventListener('keydown', handleKeyPress);
        
          return () => {
            window.removeEventListener('keydown', handleKeyPress);
          };
    }, [openAcctTitleModal]); 


    const fetchData =async () =>{
        try{
            const response = await axios.get(`${BASE_URL}/api/other-payment-setup-entry/`,{
                withCredentials:true
            })
            if(response.status===200){
                setOtherPaymnetSetupList(response.data)
            }
        }catch(error:any){
            console.log(error)
        }
    }

    const fetchAcctTitle = async () =>{
        try{
            const response = await axios.get(`${BASE_URL}/api/acct-title/`,{
                withCredentials:true
            })
            if(response.status===200){
                setAcctTitleList(response.data)
                setTmpAcctTitleList(response.data)
            }
        }catch(error:any){
            console.log(error)
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    useEffect(()=>{
        if (checked){
            setOtherPaymentSetup({...OtherPaymentSetup,'remarks':'Y'})
        }else{
            setOtherPaymentSetup({...OtherPaymentSetup,'remarks':'N'})
        }

    },[checked])



    const handleInputChange = (e:any) =>{
        const { name, value } = e.target;
        setOtherPaymentSetup((prevData: any) => ({
                  ...prevData,
                  [name]: value
                }));   
    }

    const handleNew = () =>{
        setOpenEntryModal(true)
        setOtherPaymentSetup({
            pmt_code:0,
            pmt_desc:'',
            acct_code:'',
            acct_title:'',
            pmt_type:'',
            remarks:''
        })
        if (OtherPaymnetSetupList.length > 0) {
            // Get the last code and increment
            const lastCode = parseInt(OtherPaymnetSetupList[OtherPaymnetSetupList.length - 1].pmt_code || 0, 10);
            const nextCode = (lastCode + 1).toString();

            setOtherPaymentSetup({ ...OtherPaymentSetup, pmt_code: parseInt(nextCode) });
        } else {
            setOtherPaymentSetup({ ...OtherPaymentSetup, pmt_code: 1 });
        }
    }

    const handleDelete =(idx:any)=>{
            const x = OtherPaymnetSetupList[idx]
            swalWithBootstrapButtons.fire({
            icon:'question',
            title:'Remove',
            text:'Do you want to remove this transaction?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
            }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(setGlobalIsLoading(true))
                try{
                    const response = await axios.delete(`${BASE_URL}/api/other-payment-setup-entry/`,
                         {params:{
                            pmt_code:x.pmt_code}
                        ,withCredentials:true})
                        if (response.status===200){
                            dispatch(setGlobalIsLoading(false))
                            setOpenEntryModal(false)
                             fetchData()
                            Swal.fire({
                                icon:'success',
                                title:'Success',
                                text:'Successfully Delete',
                                timer:2000
                            })
                        }

                }catch(error){
                    dispatch(setGlobalIsLoading(false))
                    console.warn(error)
                }
            }})
    }

    const handleSelect = (idx:any) =>{
        setOtherPaymentSetup({...OtherPaymentSetup,
                            acct_code:AcctTitleList[idx].code,
                            acct_title:AcctTitleList[idx].acct_title
        })
        setOpenAcctTitleModal(false)

        if (pmtTypeRef.current){
            pmtTypeRef.current.focus()
        }
    }
    const handleUpdate = (idx:any) =>{

        const row = OtherPaymnetSetupList[idx]
        if(row){
            setTimeout(() => {
                setOtherPaymentSetup({
                ...OtherPaymentSetup,
                pmt_code: row.pmt_code,
                pmt_desc: row.pmt_desc,
                acct_code: row.acct_code,
                acct_title: row.acct_title,
                pmt_type: row.pmt_type,
                remarks: row.remarks
            });
            if (row.remarks==='Y'){
                setChecked(true)
            }else{
                setChecked(false)
            }
            }, 100);
             
        }


        setOpenEntryModal(true)
        

    }

    const handleClose = () =>{
        if (OpenAcctTitleModal){
            setOpenAcctTitleModal(false)

            return
        }
    
     setOpenEntryModal(false)
    }



    const validate = (OtherPaymentSetup: any) => {
        if (!OtherPaymentSetup.pmt_desc || OtherPaymentSetup.pmt_desc.trim() === '') {
            Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Payment Description is required.',
            });
            return false;
        }

        if (!OtherPaymentSetup.acct_code || OtherPaymentSetup.acct_code.trim() === '') {
            Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Account Code is required.',
            });
            return false;
        }

        if (!OtherPaymentSetup.pmt_type || OtherPaymentSetup.pmt_type.trim() === '') {
            Swal.fire({
            icon: 'error',
            title: 'Failed',
            text: 'Payment Type is required.',
            });
            return false;
        }

        // ✅ Add more rules if needed
        return true;
    };

    const handleSubmit = () =>{
         if (!validate(OtherPaymentSetup)) return;

        swalWithBootstrapButtons.fire({
            icon:'question',
            title:'Save',
            text:'Do you want to add this transaction?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
            }).then(async (result) => {
            if (result.isConfirmed) {
                dispatch(setGlobalIsLoading(true))
                try{
                    const response = await axios.post(`${BASE_URL}/api/other-payment-setup-entry/`,
                         {data:OtherPaymentSetup}
                        ,{withCredentials:true})
                        if (response.status===201){
                            dispatch(setGlobalIsLoading(false))
                            setOpenEntryModal(false)
                             fetchData()
                             setOtherPaymentSetup({
                                pmt_code:0,
                                pmt_desc:'',
                                acct_code:'',
                                acct_title:'',
                                pmt_type:'',
                                remarks:''
                            })
                            Swal.fire({
                                icon:'success',
                                title:'Success',
                                text:`${response.data.message}`,
                                timer:2000                            })
                        }

                }catch(error){
                    dispatch(setGlobalIsLoading(false))
                    console.warn(error)
                }
            }})
    }

    const handleKeyDown = (
            e: React.KeyboardEvent<any>,
            currentRef?:React.RefObject<any>,
            nextRef?: React.RefObject<any>
        ) => {
            if (e.key === "Enter") {
            e.preventDefault();
            nextRef?.current?.focus();
            }
     };

    const handleSearch = (e:any) =>{
        setSelectedIndex(0)
        setSearch(e)
        if (!openAcctTitleModal) setopenAcctTitleModal(true)

        
        const filtered = TmpAcctTitleList.filter((items:any)=> String(items.acct_title).toLocaleLowerCase().includes(String(e).toLocaleLowerCase()))

        if (filtered){
            setAcctTitleList(filtered)
        }else{
            setAcctTitleList(TmpAcctTitleList)
        }
    }


  const handleSelectAcct = (title: string) => {
    handleInputChange({ target: { name: "acct_title", value: title } });
  };

  // Handle keyboard navigation
  const handleKeyDownList = (e: React.KeyboardEvent) => {
    if (AcctTitleList.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % AcctTitleList.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + AcctTitleList.length) % AcctTitleList.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0) {
        // handleSelect(AcctTitleList[selectedIndex].acct_title);
        setOtherPaymentSetup({...OtherPaymentSetup,
                            acct_code:AcctTitleList[selectedIndex].acct_code,
                            acct_title:AcctTitleList[selectedIndex].acct_title
        })
        setOpenAcctTitleModal(false)

        if (pmtTypeRef.current){
            pmtTypeRef.current.focus()
        }
      }
    }
  };

  // Focus the selected item
  useEffect(() => {
    if (selectedIndex >= 0 && listItemRefs.current[selectedIndex]) {
      listItemRefs.current[selectedIndex]?.focus();
    }
  }, [selectedIndex]);


  useEffect(() => {
  if (selectedIndex >= 0 && listItemRefs.current[selectedIndex]) {
    const el = listItemRefs.current[selectedIndex];
    el?.focus();

    // Scroll into view so the selected item is visible
    el?.scrollIntoView({
      behavior: "smooth", // smooth scroll
      block: "nearest",   // scroll minimal distance to show element
    });
  }
}, [selectedIndex, OpenEntryModal]);


const handleOpenAcctTitleModal = () =>{
    setOpenAcctTitleModal(true)
    setTimeout(() => {
          if (SearhRef.current){
        SearhRef.current.focus()
        SearhRef.current.select()
    }
    }, 100);
}



    return(
        <>
          <Grid container style={{justifyContent:'start',}}>
                    <Grid item xs={12} style={{margin:'10px',padding: '5px',
                        alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                        borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                        }}>
                        <Box style={{display:'flex',flexDirection:'row',textAlign:'end'}}>
                            
                                <Typography
                                        variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                                        sx={{
                                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                        borderRadius: '10px',
                                        color: 'blue',
                                        fontWeight:'bold',
                                        textAlign:'center',
                                        width:'100%'
                                        }} > Other Pament Setup & Account Title Tagging
                                </Typography>

                                 <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                <FontAwesomeIcon icon={faPlus} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} 
                                onClick={handleNew}></FontAwesomeIcon>
                          
                            </div>
        
                           
                        </Box>
        
                        <Box className="Transaction" style={{ overflow: 'auto' ,height:'500px',width:'100%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '1px' }}>
                            <Table className="Userlist" sx={{
                                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                        overflow: 'auto'
                                }}>
                                    <thead>
                                        <tr>
                                            <th>Payment Code</th>
                                            <th>Payment Description</th>
                                            <th>Account Code</th>
                                            <th>Account Title</th>
                                            <th>Payment Type</th>
                                            <th>Remarks</th>
                                            <th style={{width:'100px'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(OtherPaymnetSetupList) && OtherPaymnetSetupList.length > 0 ? (
                                        OtherPaymnetSetupList.map((item, index) => (
                                            <tr key={index} onClick={() => handleSelect(index)} > 
                                                <td style={{textAlign:'center'}}>{String(parseInt(item.pmt_code)).padStart(4,'0')}</td>
                                               <td >{item.pmt_desc}</td>
                                               <td >{parseInt(item.acct_code)}</td>
                                               <td >{item.acct_title} </td>
                                               <td style={{ textAlign: 'center' }}>{item.pmt_type} </td>
                                               <td style={{ textAlign: 'center' }}>{item.remarks} </td>

                                                <td style={{textAlign:'center'}}>
                                                  
                                                    <Tooltip title="Delete">
                                                        <IconButton color="error" onClick={()=>handleDelete(index)}>
                                                        <DeleteIcon />
                                                        </IconButton>
                                                    </Tooltip>  
                                                    <Tooltip title="Update">
                                                    <IconButton color="primary" onClick={() => handleUpdate(index)}>
                                                        <EditIcon />
                                                    </IconButton>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                                ))
                                                ) : (
                                                <tr>
                                                    <td colSpan={7}>No items in the transaction</td>
                                                </tr>
                                                )}
                                    </tbody>
                            </Table>
                        </Box>
                    </Grid>

                     {OpenEntryModal && (
                        <div className="modal">
                            <div className="modal-content" style={{width:'600px'}}>
                                <Grid item  md={12} style={{margin:'0px',padding: '0px', display: 'flex',flexDirection: 'column',
                                    alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                                    borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                                                      }}>
                                    <Box style={{display:'flex',flexDirection:'column',
                                        width:'100%',
                                        padding:'10px'
                                    }}>
                                        <Typography
                                            variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                                            align="center"
                                            sx={{
                                            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                            borderRadius: '10px',
                                            padding: '10px',
                                            color: 'red !important',
                                            fontWeight:'bold'
                                            }} > ADD OTHER SETUP TAGGING ENTRY
                                        </Typography>
                                            <Box style={{display:'flex',flexDirection:'column',gap:'10px'}}>
                                                <Box style={{width:'100%'}}>
                                                    <Typography
                                                    sx={{
                                                    fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                    }} > Payment Code:
                                                    </Typography>             
                                                    <TextField
                                                       type='text'
                                                        inputRef={pmtCodeRef}
                                                        value={OtherPaymentSetup.pmt_code}
                                                        fullWidth
                                                        sx={{input: { textAlign: "start" }}}
                                                        autoComplete='off'
                                                        />     
                                                </Box>
                                                <Box style={{width:'100%'}}>
                                                    <Typography
                                                        sx={{
                                                        fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                        }} > Payment Description:
                                                    </Typography> 
                                                    <TextField
                                                        // onClick={()=>showOnScreenKeybaord('pmt_desc')}
                                                        type='text'
                                                        inputRef={pmtDescRef}
                                                        name='pmt_desc'
                                                        value={OtherPaymentSetup.pmt_desc}
                                                        onChange={handleInputChange}
                                                        fullWidth
                                                        autoComplete='off'
                                                        sx={{input: { textAlign: "start" }}}
                                                        onKeyDown={(e)=>handleKeyDown(e,pmtDescRef,acctTitleRef)}
                                                        />
                                                </Box>
                                                <Box style={{width:'100%'}}>
                                                    <Typography
                                                        sx={{
                                                        fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                        }} > Account Title:
                                                    </Typography> 
                                                    <TextField
                                                        // onClick={()=>showOnScreenKeybaord('acct_title')}
                                                        type='text'
                                                         name='acct_title'
                                                        autoComplete='off'
                                                        inputRef={acctTitleRef}
                                                        value={OtherPaymentSetup.acct_title}
                                                        onChange={handleInputChange}
                                                        onClick={handleOpenAcctTitleModal}
                                                        onKeyDown={(e)=>handleKeyDown(e,pmtDescRef,pmtTypeRef)}
                                                        fullWidth
                                                        sx={{input: { textAlign: "start" }}}
                                                        />

                                                    
                                                </Box>

                                                <Dialog PaperProps={{
                                                        style: {
                                                            height: '500px',
                                                            width:'500px' ,         // half the screen height
                                                            top: '0%',   
                                                            overflow: "hidden",          // center vertically
                                                        }
                                                        }} open={OpenAcctTitleModal} onClose={handleClose}>
                                                    <div
                                                        style={{
                                                        position: "sticky",
                                                        top: 0,
                                                        background: "white",
                                                        zIndex: 10,
                                                        display: "flex",
                                                        flexDirection:'column',
                                                        padding: "0.5rem 1rem",
                                                        borderBottom: "1px solid #ddd",
                                                        }}
                                                    >
                                                        <Box sx={{display:'flex',flexDirection:'row',gap:'10px'}}>
                                                            <Typography variant="h6" style={{ flex: 1,textAlign:'center' ,
                                                                backgroundColor:'blue',color:'white'
                                                                ,width:'100%'
                                                            }}>
                                                            Select Account Title
                                                            </Typography>
                                                          
                                                                <Tooltip title="Delete" onClick={handleClose}>
                                                                    <IconButton color="error" >
                                                                    <CloseIcon />
                                                                    </IconButton>
                                                                </Tooltip>  
                                                          
                                                        </Box>
                                                        
                                                        <TextField
                                                        sx={{marginTop:'10px'}}
                                                            label='Searh..'
                                                            inputRef={SearhRef}
                                                            value={Searh}
                                                            onChange={(e)=>handleSearch(e.target.value)}
                                                            autoComplete='off'
                                                            onKeyDown={(e)=>handleKeyDownList(e)}
                                                        />
                                                    </div>
                                                    <div  style={{
                                                            height: '500px',
                                                            width:'500px' ,         // half the screen height
                                                            top: '0%',   
                                                            overflow: "auto",          // center vertically
                                                        }}>

                                                    
                                                    <List>
                                                        {AcctTitleList.length > 0 && AcctTitleList.map((title:any,index:any) => (
                                                             <ListItem
                                                                key={title.acct_title}
                                                                disablePadding
                                                                ref={(el) => (listItemRefs.current[index] = el)}
                                                                 onClick={() =>{ handleSelect(index)}}
                                                            >
                                                                <ListItemButton
                                                                onKeyDown={(e)=>handleKeyDownList(e)}
                                                               
                                                                selected={selectedIndex === index} // built-in MUI selected style
                                                                 sx={{
                                                                    backgroundColor: selectedIndex === index ? "blue !important" : "transparent",
                                                                    "&.Mui-selected": {
                                                                        backgroundColor: "#4070FF !important",
                                                                    },
                                                                    "&:hover": {
                                                                        backgroundColor: selectedIndex === index ? "blue !important" : "#f5f5f5",

                                                                    },
                                                                    }}
                                                                    style={{color:'white'}}
                                                            >
                                                                <ListItemText
                                                                
                                                                 primaryTypographyProps={{
                                                                                    sx: {
                                                                                    color: selectedIndex === index ? "white" : "black",
                                                                                    },
                                                                                }} primary={title.acct_title} />
                                                            </ListItemButton>
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                   </div>
                                                </Dialog>

                                                 <Box style={{ width: "100%" }}>
                                                    <Typography
                                                        sx={{
                                                        fontSize: { xs: ".9rem", sm: ".9rem", md: ".9rem", lg: ".9rem", xl: "1rem" },
                                                        mb: 1,
                                                        }}
                                                    >
                                                        Payment Type:
                                                    </Typography>

                                                    <FormControl fullWidth onKeyDown={(e)=>handleKeyDown(e,acctTitleRef,SaveRef)}>
                                                        <Select
                                                        inputRef={pmtTypeRef}
                                                        value={OtherPaymentSetup.pmt_type}
                                                        onChange={handleInputChange}
                                                        displayEmpty
                                                        name='pmt_type'
                                                        sx={{ textAlign: "start" }}
                                                        >
                                                        <MenuItem value="">
                                                            <em></em>
                                                        </MenuItem>
                                                       <MenuItem value="TD">
                                                            <em>Transaction Discount</em>
                                                        </MenuItem>
                                                        <MenuItem value="OD">
                                                            <em>Other Debits</em>
                                                        </MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                    </Box>

                                                    <Box>
                                                <FormControlLabel
                                                    control={<Checkbox checked={checked} onChange={handleChange} />}
                                                    label="Required Remarks"
                                                />
                                                </Box>
                                            </Box>


                                            <div style={{display:'flex',flexDirection:'row'}}>
                                                    {isEdit ? (
                                                    <><Button type="button" variant="contained" color="primary" fullWidth 
                                                            style={{ margin: '5px', backgroundColor: '#007bff' }}
                                                            onClick={handleUpdate}
                                                            > Update
                                                        </Button>
                                                        <Button type="button" variant="contained" color="primary" 
                                                            fullWidth style={{ margin: '5px', backgroundColor: 'red' }}
                                                            onClick={handleDelete}
                                                            > Delete
                                                        </Button></>
                                                        ):(
                                                        <Button type="button" variant="contained" color="primary" fullWidth 
                                                        ref={SaveRef}
                                                            style={{margin:'5px' ,backgroundColor:'#007bff'}}
                                                            onClick={handleSubmit}
                                                            > Save
                                                        </Button>)}
                                                        <Button type="button" variant="contained" color="primary" 
                                                            ref={CloseRef}
                                                            fullWidth style={{margin:'5px',backgroundColor:'red'}} 
                                                            onClick={handleClose}> Close
                                                          
                                                        </Button>
                                            </div>
                                    </Box>
                                          
                                                              
                                                          
                                </Grid>
                             </div>
                        </div>
                    )}
            
        </Grid>
             {isShowKeyboard && < OnScreenKeyboard  handleclose = {closekeyBoard} currentv={OtherPaymentSetup[focusedInput]} setvalue={setvalue}/>}
            {/* {isShowKeyboardNumeric && < OnScreenKeyboardNumeric handleclose = {closekeyBoard}    currentv={OtherPaymentSetup[focusedInput]} setvalue={setvalue}/>} */}
        
        </>
    )
  }
export default OtherPaymentSetup