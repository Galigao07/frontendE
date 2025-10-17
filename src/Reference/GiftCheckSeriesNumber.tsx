import React, { useEffect, useRef, useState } from 'react';
import {  Button, Grid, MenuItem, Select, SelectChangeEvent, Table, TextField, Typography } from '@mui/material'; // Import Material-UI components
import './css/userProfile.css';
import axios from 'axios'; 
import {BASE_URL} from '../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faPrint,faTrash} from '@fortawesome/free-solid-svg-icons';
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
import { GetCurrentDateAndTime, GetCurrentDateOnly } from '../global';
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  interface series {
     trans_no:number,
    series_from:string,
    series_to:string,
    validity_date_from:string,
    validity_date_to:string,
    amount:number
  }
const GiftCehckSeriesNumber = () =>{
    const dispatch = useDispatch()
    const [TransNo,setTransNo] = useState<any>(0)
    const isLoading = useSelector((state:RootState)=>state.global.globalIsLoading)
    const [GiftCheckSeriesList,setGiftCheckSeriesList] = useState<any>()
     const [GiftCheckSeries,setGiftCheckSeries] = useState<series>({
        trans_no:0,
        series_from:'',
        series_to:'',
        validity_date_from:'',
        validity_date_to:'',
        amount:0
     })

       const [OpenEntryModal,setOpenEntryModal] = useState<Boolean>(false)
        const [isEdit,setisEdit] = useState<Boolean>(false)
        const seriesFromRef = useRef<HTMLInputElement>(null);
        const seriesToRef = useRef<HTMLInputElement>(null);
        const validityDateFromRef = useRef<HTMLInputElement>(null);
        const validityDateToRef =useRef<HTMLInputElement>(null);
        const amountRef = useRef<HTMLInputElement>(null);


        interface ValidationErrors {
            series?: string;
            dates?: string;
            amount?: string;
            }

const [errors, setErrors] = useState<ValidationErrors>({});

    useEffect(()=>{
       
        loadTime()
        fetchData()
    },[])
    const loadTime = async () =>{

        const dt = await GetCurrentDateOnly()
            setGiftCheckSeries({
                ...GiftCheckSeries,
                validity_date_from:dt,
                validity_date_to:dt
            }) }
     const fetchData = async()=>{
            try{
            const response = await axios.get(`${BASE_URL}/api/gift-check-series/`,{
                withCredentials:true
            })
            if (response.status===200){
                setGiftCheckSeriesList(response.data)
            }
        }catch(error){
            console.warn(error)
        }}

const addSeries = () => {
  loadTime();

  let nextCode = 1;

  if (GiftCheckSeriesList.length > 0) {
    const lastCode = parseInt(GiftCheckSeriesList[GiftCheckSeriesList.length - 1].trans_no || '0', 10);
    nextCode = lastCode + 1;
  }
        setTransNo(nextCode)

  setOpenEntryModal(true);
};

useEffect(() => {
    setGiftCheckSeries((prev) => ({
  ...prev,
  trans_no: TransNo
}));
}, [TransNo]);



    const handleInputChange =(e:any,fieldName:any) =>{
          const { value } = e.target;
        setGiftCheckSeries(prevUser => ({
            ...prevUser,
            [fieldName]: value
        }));
    }

    const handleDelete =(idx:any)=>{
            const x = GiftCheckSeriesList[idx]
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
                    const response = await axios.delete(`${BASE_URL}/api/gift-check-series/`,
                         {params:{
                            trans_no:x.trans_no}
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


    const handleUpdate = () =>{

    }

    const CloseModal = () =>{
    setOpenEntryModal(false)
    }


   const  handleSubmit =() =>{
        const validationErrors = validateGiftCheck(GiftCheckSeries);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return; // prevent submission
        }

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
                    const response = await axios.post(`${BASE_URL}/api/gift-check-series/`,
                         {data:GiftCheckSeries}
                        ,{withCredentials:true})
                        if (response.status===200){
                            dispatch(setGlobalIsLoading(false))
                            setOpenEntryModal(false)
                             fetchData()
                             setGiftCheckSeries({
                                trans_no:0,
                                series_from:'',
                                series_to:'',
                                validity_date_from:'',
                                validity_date_to:'',
                                amount:0
                             })
                            Swal.fire({
                                icon:'success',
                                title:'Success',
                                text:'Successfully Added',
                                timer:2000
                            })
                        }

                }catch(error:any){
                    dispatch(setGlobalIsLoading(false))
                    console.warn(error)
                   Swal.fire({
                    icon:'error',
                    title:'Request Failed',
                    text:`${error.response.data.errors.series}`
                   })
                }
            }})
   }

    const handleSelect = (idx:any) =>{

    }


const validateGiftCheck = (form: series): ValidationErrors => {
  const errors: ValidationErrors = {};

  // 1️⃣ Validate series
  const seriesFromInt = parseInt(form.series_from, 10);
  const seriesToInt = parseInt(form.series_to, 10);

  if (isNaN(seriesFromInt) || isNaN(seriesToInt)) {
    errors.series = "Series From and Series To must be valid numbers.";
  } else if (seriesFromInt > seriesToInt) {
    errors.series = "Series From cannot be greater than Series To.";
  }

  // 2️⃣ Validate dates
  const dateFrom = new Date(form.validity_date_from);
  const dateTo = new Date(form.validity_date_to);

  if (isNaN(dateFrom.getTime()) || isNaN(dateTo.getTime())) {
    errors.dates = "Validity dates must be valid dates.";
  } else if (dateFrom > dateTo) {
    errors.dates = "Validity start date cannot be after end date.";
  }

  // 3️⃣ Validate amount
  if (form.amount <= 0) {
    errors.amount = "Amount must be greater than 0.";
  }

  return errors;
};

useEffect(() => {
  if (errors.dates || errors.series || errors.amount)  {
    const timer = setTimeout(() => {
      setErrors((prev) => ({
        ...prev,
        dates: undefined,
        series: undefined,
        amount:undefined
      }));
    }, 2000); // 2 seconds

    return () => clearTimeout(timer); // cleanup if component unmounts
  }
}, [errors]);

    return(
        <>
         <Grid container style={{justifyContent:'start',}}>
                    <Grid item xs={12} style={{margin:'10px',padding: '5px',
                        alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                        borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                        }}>
                        <div style={{display:'flex',flexDirection:'row',textAlign:'end'}}>
                            
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
                                        }} > Gift Check Serial Number List
                                </Typography>

                                 <div style={{display:'flex',flexDirection:'row',justifyContent:'flex-end'}}>
                                <FontAwesomeIcon icon={faPlus} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} 
                                onClick={addSeries}></FontAwesomeIcon>
                          
                            </div>
        
                           
                        </div>
        
                        <div className="Transaction" style={{ overflow: 'auto' ,height:'500px',width:'100%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '1px' }}>
                            <Table className="Userlist" sx={{
                                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                        overflow: 'auto'
                                }}>
                                    <thead>
                                        <tr>
                                            <th>Trans No</th>
                                            <th>Series From</th>
                                            <th>Series To</th>
                                            <th>Validity Date From (MM/dd/yyyy)</th>
                                            <th>Validity Date To (MM/dd/yyyy)</th>
                                            <th>Amount</th>
                                            <th style={{width:'100px'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(GiftCheckSeriesList) && GiftCheckSeriesList.length > 0 ? (
                                        GiftCheckSeriesList.map((item, index) => (
                                            <tr key={index} onClick={() => handleSelect(index)} > 
                                                <td style={{textAlign:'center'}}>{String(parseInt(item.trans_no)).padStart(4,'0')}</td>
                                               <td style={{textAlign:'center'}}>{parseInt(item.series_from)}</td>
                                               <td style={{textAlign:'center'}}>{parseInt(item.series_to)}</td>
                                               <td style={{ textAlign: 'center' }}>
                                                {new Date(item.validity_date_from).toLocaleDateString('en-US')}
                                                </td>
                                                <td style={{ textAlign: 'center' }}>
                                                {new Date(item.validity_date_to).toLocaleDateString('en-US')}
                                                </td>
                                                    <td title={item.amount} style={{textAlign:'end'}}>
                                                    {parseFloat(item.amount).toLocaleString(undefined,{
                                                        minimumFractionDigits:2,
                                                        maximumFractionDigits:2
                                                    })}</td>
                                                <td style={{textAlign:'center'}}>
                                                  
                                                    <Tooltip title="Delete">
                                                    <IconButton color="error" onClick={()=>handleDelete(index)}>
                                                    <DeleteIcon />
                                                    </IconButton>
                                                    </Tooltip>  
                                                </td>
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
                    </Grid>

                     {OpenEntryModal && (
                        <div className="modal">
                            <div className="modal-content" style={{width:'600px'}}>
                                <Grid item  md={12} style={{margin:'0px',padding: '0px', display: 'flex',flexDirection: 'column',
                                    alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                                    borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                                                      }}>
                                    <div style={{display:'flex',flexDirection:'column',
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
                                            }} > ADD SERIES NUMBER ENTRY
                                        </Typography>
                                            <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                                                <div style={{width:'100%'}}>
                                                    <Typography
                                                    sx={{
                                                    fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                    }} > Series From:
                                                    </Typography>             
                                                    <TextField
                                                       type='number'
                                                        ref={seriesFromRef}
                                                        value={GiftCheckSeries.series_from}
                                                        onChange={(e) => handleInputChange(e, 'series_from')}
                                                        fullWidth
                                                        
                                                         sx={{input: { textAlign: "center" }}}
                                                        autoComplete='off'
                                                        error={!!errors.series}
                                                        helperText={errors.series}
                                                        />     
                                                </div>
                                                <div style={{width:'100%'}}>
                                                    <Typography
                                                        sx={{
                                                        fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                        }} > Series To:
                                                    </Typography> 
                                                    <TextField
                                                        type='number'
                                                        ref={seriesToRef}
                                                        value={GiftCheckSeries.series_to}
                                                        onChange={(e) => handleInputChange(e, 'series_to')}
                                                        fullWidth
                                                        sx={{input: { textAlign: "center" }}}
                                                     
                                                         error={!!errors.series}
                                                        helperText={errors.series}
                                                        />
                                                </div>
                                            </div>
                                            <div style={{display:'flex',flexDirection:'row',gap:'10px'}}>
                                                <div style={{width:'100%'}}>
                                                    <Typography
                                                    sx={{
                                                    fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                    }} > Date Validity From:
                                                    </Typography>             
                                                    <TextField
                                                        type="date"
                                                        ref={validityDateFromRef}
                                                        value={GiftCheckSeries.validity_date_from}
                                                        onChange={(e) => handleInputChange(e, 'validity_date_from')}
                                                        fullWidth
                                                         error={!!errors.dates}
                                                        helperText={errors.dates}
                                                         sx={{input: { textAlign: "right" }}}
                                                        autoComplete='off'
                                                />     
                                                </div>
                                                <div style={{width:'100%'}}>
                                                    <Typography
                                                        sx={{
                                                        fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                        }} > Validity Date To:
                                                    </Typography> 
                                                    <TextField
                                                    type="date"
                                                        ref={validityDateToRef}
                                                        value={GiftCheckSeries.validity_date_to}
                                                        onChange={(e) => handleInputChange(e, 'validity_date_to')}
                                                        fullWidth
                                                        error={!!errors.dates}
                                                        helperText={errors.dates}
                                                        sx={{input: { textAlign: "right" }}}
                                                        />
                                                </div>
                                            </div>


                                                <div >
                                                    <Typography
                                                        sx={{
                                                        fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                        }} > Amount
                                                    </Typography> 
                                                    <TextField
                                                    type="number"
                                                        ref={amountRef}
                                                        value={GiftCheckSeries.amount}
                                                        onChange={(e) => handleInputChange(e, 'amount')}
                                                        fullWidth
                                                        sx={{input: { textAlign: "right" }}}
                                                         error={!!errors.amount}
                                                        helperText={errors.amount}
                                                        />
                                                </div>

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
                                                            style={{margin:'5px' ,backgroundColor:'#007bff'}}
                                                            onClick={handleSubmit}
                                                            > Save
                                                        </Button>)}
                                                        <Button type="button" variant="contained" color="primary" 
                                                            fullWidth style={{margin:'5px',backgroundColor:'red'}} 
                                                            onClick={CloseModal}> Close
                                                        </Button>
                                            </div>
                                    </div>
                                          
                                                              
                                                          
                                </Grid>
                             </div>
                        </div>
                    )}

        </Grid>
        </>
    )
}

export default GiftCehckSeriesNumber;