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
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  interface Deno {
    code:string,
    denomination_amount:number
  }


  const GiftChecDenomination :React.FC = () =>{
    const dispatch = useDispatch()
    const isLoading = useSelector((state:RootState)=>state.global.globalIsLoading)
    const [OpenDenominationEntryModal,setOpenDenominationEntryModal] = useState<boolean>(false)
    const [DenominationList,setDenominationList] = useState<any>([])
    const [isEdit,setisEdit] = useState<boolean>(false)
    const [Denomination,setDenomination] = useState<Deno>({
        code:'0',
        denomination_amount:0
    })

    const CodeRef = useRef<HTMLInputElement>(null)
    const DenoAmountRef = useRef<HTMLInputElement>(null)

    const handleInputChange = (e:any,fieldName:any) => {
         const { value } = e.target;
        setDenomination(prevUser => ({
            ...prevUser,
            [fieldName]: value
        }));
    }

    useEffect(()=>{
        
        fetchData()
    },[])

    const handleSelect = (idx:any) =>{

    }

    const fetchData = async()=>{
            try{
            const response = await axios.get(`${BASE_URL}/api/gift-check-denomination/`,{
                withCredentials:true
            })
            if (response.status===200){
                setDenominationList(response.data)
            }
        }catch(error){
            console.warn(error)
        }}

const AddDeno = () => {
  setOpenDenominationEntryModal(true);

  if (DenominationList.length > 0) {
    // Get the last code and increment
    const lastCode = parseInt(DenominationList[DenominationList.length - 1].code || 0, 10);
    const nextCode = (lastCode + 1).toString();

    setDenomination({ ...Denomination, code: nextCode });
  } else {
    setDenomination({ ...Denomination, code: "1" });
  }
};

    const handleUpdate = () =>{

    }

     const handleDelete =(idx:any)=>{
            const x = DenominationList[idx]
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
                    const response = await axios.delete(`${BASE_URL}/api/gift-check-denomination/`,
                         {params:{
                            code:x.code}
                        ,withCredentials:true})
                        if (response.status===200){
                            dispatch(setGlobalIsLoading(false))
                            setOpenDenominationEntryModal(false)
                             fetchData()
                             setDenomination({
                                code:'0',
                                denomination_amount:0
                             })
                            Swal.fire({
                                icon:'success',
                                title:'Success',
                                text:'Successfully Delete',
                            })
                        }

                }catch(error){
                    dispatch(setGlobalIsLoading(false))
                    console.warn(error)
                }
            }})
    }

    const validate = ()=>{
        const exists = DenominationList.some((item: any) => {
            const a = parseFloat(item.denomination_amount || "0");
            const b = parseFloat(String(Denomination.denomination_amount || "0"));
            return Math.abs(a - b) < 0.0001; // handles floating point precision issues
            });
        if (exists) return true

        return false
    }

    const handleSubmit = () =>{
        if (validate()){
             Swal.fire({
                icon:'error',
                title:'Failed',
                text:'Denomination Amount is already on the list.',
            })
            return
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
                    const response = await axios.post(`${BASE_URL}/api/gift-check-denomination/`,
                         {data:Denomination}
                        ,{withCredentials:true})
                        if (response.status===200){
                            dispatch(setGlobalIsLoading(false))
                            setOpenDenominationEntryModal(false)
                             fetchData()
                             setDenomination({
                                code:'0',
                                denomination_amount:0
                             })
                            Swal.fire({
                                icon:'success',
                                title:'Success',
                                text:'Successfully Added',
                            })
                        }

                }catch(error){
                    dispatch(setGlobalIsLoading(false))
                    console.warn(error)
                }
            }})
    }

    const CloseModal = () =>{
         setOpenDenominationEntryModal(false)
    }
    return (
        <Grid container style={{justifyContent:'start',}}>
                    <Grid item xs={12} sm={8} md={6} lg={6} style={{margin:'10px',padding: '5px',
                        alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                        borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                        }}>
                        <div style={{display:'flex',flexDirection:'row',width:'100%',textAlign:'end'}}>
                            <div style={{width:'100%'}}>
                                <Typography
                                        variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                                        sx={{
                                        fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                        borderRadius: '10px',
                                        color: 'blue',
                                        fontWeight:'bold'
                                        }} > Denomiation List
                                </Typography>
                            </div>
        
                            <div style={{margin:'5px',textAlign:'end',width:'70%'}}>
                                <FontAwesomeIcon icon={faPlus} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} 
                                onClick={AddDeno}></FontAwesomeIcon>
                            </div>
                        </div>
        
                        <div className="Transaction" style={{ overflow: 'auto' ,height:'500px',width:'100%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '1px' }}>
                            <Table className="Userlist" sx={{
                                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                        overflow: 'auto'
                                }}>
                                    <thead>
                                        <tr>
                                            <th>Code</th>
                                            <th>Denomination</th>
                                            <th style={{width:'100px'}}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(DenominationList) && DenominationList.length > 0 ? (
                                        DenominationList.map((item, index) => (
                                            <tr key={index} onClick={() => handleSelect(index)} > 
                                                <td style={{textAlign:'center'}}>{String(item.code).padStart(4,'0')}</td>
                                                <td title={item.fullname} style={{textAlign:'end'}}>
                                                    {parseFloat(item.denomination_amount).toLocaleString(undefined,{
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

                     {OpenDenominationEntryModal && (
                        <div className="modal">
                            <div className="modal-content" style={{width:'500px'}}>
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
                                            }} > ADD ENTRY
                                        </Typography>
                                            <Typography
                                            sx={{
                                            fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                            }} > CODE:
                                            </Typography>             
                                            <TextField
                                                variant='outlined'
                                                placeholder="Code"
                                                ref={CodeRef}
                                                value={Denomination.code}
                                                onChange={(e) => handleInputChange(e, 'Code')}
                                                fullWidth
                                                autoComplete='off'
                                                style={{ border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                fontSize: '16px',
                                                marginBottom: '10px'}}/>     
                                            <Typography
                                                sx={{
                                                fontSize: { xs: '.9rem', sm: '.9rem', md: '.9rem', lg: '.9rem', xl: '1rem' },
                                                }} > DENOMINATION AMOUNT:
                                        </Typography> 
                                            <TextField
                                                placeholder="0.00"
                                                ref={DenoAmountRef}
                                                value={Denomination.denomination_amount}
                                                onChange={(e) => handleInputChange(e, 'denomination_amount')}
                                                fullWidth
                                                sx={{input: { textAlign: "right" }}}
                                                style={{
                                                        textAlign:'right',
                                                        border: '1px solid #ccc',
                                                        borderRadius: '4px',
                                                        fontSize: '16px',
                                                        marginBottom: '10px',
                                                }}
                                                />
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
    )
  }

  export default GiftChecDenomination;