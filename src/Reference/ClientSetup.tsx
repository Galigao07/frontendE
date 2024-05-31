import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Grid, SelectChangeEvent, Typography } from "@mui/material";
import {BASE_URL} from "../config";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import Swal from "sweetalert2";
import './css/SupplierSetup.css'


interface SupplierData {
autonum:string;
companycode:string;
companyname:string;
companyname2:string;
companyaddress:string;
companyaddress2:string;
companyaddress3:string;
tin:string;
telno:string;
remarks:string;
remarks2:string;
remarks3:string;
}
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

const ClientSetup = () => {
    const [OpenEmployeeModal,setOpenEmployeeModal] = useState<boolean>(false)
    const [OpenaddUsermodal,setOpenaddUsermodal] = useState<boolean>(false)
    const [users, setUsers] = useState<any[]>([]);
    const [Employee, setEmployee] = useState<any[]>([]);
    const [SupplierD, setSupplierD] = useState<SupplierData>({
        autonum:'',
        companycode:'',
        companyname:'',
        companyname2: '',
        companyaddress: '',
        companyaddress2: '',
        companyaddress3: '',
        tin: '',
        telno: '',
        remarks: '',
        remarks2: '',
        remarks3: '',
    });
    const companycodeRef = useRef<HTMLInputElement>(null);
    const companynameRef = useRef<HTMLInputElement>(null);
    const companyname2Ref = useRef<HTMLInputElement>(null);
    const companyaddressRef = useRef<HTMLInputElement>(null);
    const companyaddress2Ref = useRef<HTMLInputElement>(null);
    const companyaddress3Ref = useRef<HTMLInputElement>(null);
    const tinRef = useRef<HTMLInputElement>(null);
    const telnoRef = useRef<HTMLInputElement>(null);
    const remarksRef = useRef<HTMLInputElement>(null);
    const remarks2Ref = useRef<HTMLInputElement>(null);
    const remarks3Ref = useRef<HTMLInputElement>(null);
   
    const [isEdit,setisEdit] = useState<boolean>(false)

    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(0);



useEffect(() => {
     



        fetchData();

        setTimeout(() => {
            if (companycodeRef.current){
                companycodeRef.current.focus();
                companycodeRef.current.select();
            }
        }, 500);
}, []); // Empty dependency array to run this effect only once

const fetchData = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/client-setup/`); // Replace 'API_ENDPOINT' with your actual endpoint
        if (response.status == 200){
            setUsers(response.data.data);
            const supplier = response.data.data
            setSupplierD({
                autonum:supplier[0].autonum,
                companycode:supplier[0].company_code,
                companyname:supplier[0].company_name,
                companyname2: supplier[0].company_name2,
                companyaddress: supplier[0].company_address,
                companyaddress2: supplier[0].company_address2,
                companyaddress3: supplier[0].company_address3,
                tin: supplier[0].tin,
                telno:supplier[0].tel_no,
                remarks: supplier[0].remarks,
                remarks2: supplier[0].remarks2,
                remarks3: supplier[0].remarks3,
            });
        }

    } catch (error) {

        console.error('Error fetching data:', error);
    }
};

const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
        fieldName: keyof SupplierData
    ) => {
        const { value } = event.target;
        setSupplierD(prevUser => ({
            ...prevUser,
            [fieldName]: value
        }));

};

const handleSubmit = async () => {

        swalWithBootstrapButtons.fire({
            title: 'Confirmation',
            text: "Do you want Add New Supplier Setup?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true

                  }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/client-setup/`, SupplierD);

                    if (response.status==200){
          
                        fetchData();
                        setOpenaddUsermodal(false)
                        showSuccessAlert(response.data.message);
                    }


        
                } catch (error:any) {


                    showErrorAlert(error.response.data.error)
                    // Swal.fire({
                    //     title: 'Error',
                    //     text: ' ' + error.response.data.error,
                    //     icon: 'error', // You can use 'success', 'error', 'warning', 'info', 'question'
                    //     confirmButtonText: 'OK'
                    //   });
                    //   setTimeout(() => {
                    //     Swal.close();
                    //   }, 2000);
                    console.error('Error creating user:  ', error);
                }
            }})

};

    
const handleUpdate = async () => {
        swalWithBootstrapButtons.fire({
            title: 'Confirmation',
            text: "Do you want Update Supplier?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/client-setup/`, SupplierD);
                    console.log('User created:', response.data);
                    setSupplierD({
                        autonum:'',
                        companycode:'',
                        companyname:'',
                        companyname2: '',
                        companyaddress: '',
                        companyaddress2: '',
                        companyaddress3: '',
                        tin: '',
                        telno: '',
                        remarks: '',
                        remarks2: '',
                        remarks3: '',
                    });
                    fetchData();
                    setOpenaddUsermodal(false)

                    showSuccessAlert(response.data.message)
        
                } catch (error:any) {
                    showErrorAlert(error.response.data.error)
                    console.error('Error creating user:', error);
                }
            }})
        

};


const handleDelete = async () => {
    swalWithBootstrapButtons.fire({
        title: 'Confirmation',
        text: "Do you want Delete User?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`${BASE_URL}/api/delete-users/`, {
                    data: { user: SupplierD }
                  });
          
                  if (response.status==200) {
                    setSupplierD({
                        autonum:'',
                        companycode:'',
                        companyname:'',
                        companyname2: '',
                        companyaddress: '',
                        companyaddress2: '',
                        companyaddress3: '',
                        tin: '',
                        telno: '',
                        remarks: '',
                        remarks2: '',
                        remarks3: '',
                    });
                    fetchData();
                    setOpenaddUsermodal(false)
                    showSuccessAlert(response.data.message)
                  }
 
            } catch (error:any) {
                showErrorAlert(error.response.data.error)
                console.error('Error creating user:', error);
            }
        }})

};



const AddUser =() => {
        setOpenaddUsermodal(true)
        setSupplierD({
            autonum:'',
        companycode:'',
        companyname:'',
        companyname2: '',
        companyaddress: '',
        companyaddress2: '',
        companyaddress3: '',
        tin: '',
        telno: '',
        remarks: '',
        remarks2: '',
        remarks3: '',
        });
        setisEdit(false)
        setTimeout(() => {
            if (companycodeRef.current){
                companycodeRef.current.focus();
                companycodeRef.current.select();
            }
        }, 500);
}


const CloseModal =() => {
        setOpenaddUsermodal(false)
        setisEdit(false)
}


  const handleSearchInputChange = async (e:any, inputIdentifier :any) => {
    try {
        if (e===''){
            setOpenEmployeeModal(false)
            return;
        }
        if (inputIdentifier === 'Employee') {
            const result = await axios.get(`${BASE_URL}/api/employee-list/`,{
              params: {
                employee:e
              }
            }); 
            
            if (result) {
                setOpenEmployeeModal(true);
                setEmployee(result.data.EmployeeList);
            
            }}

            
          }  catch (error) {
              console.error(error);
              }
}


const HandleKeydown = (event:any, Backref:any, Currentref:any, nextRef:any) => {
    if (event.key === 'Enter') {
        if (nextRef.current) {
            nextRef.current.focus();
        }
    } else if (event.key === 'ArrowUp') {
        if (Backref.current) {
            Backref.current.focus();
        }
    }
}



    return(
        <>
        <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:'0px',padding: '0px', display: 'flex',flexDirection: 'column',width:'100%',
                            alignItems: 'center'
                            }}>
                            <Typography
                                variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                                align="center"
                                sx={{
                                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                borderRadius: '10px',
                                padding: '10px',
                                color: 'blue',
                                fontWeight:'bold'
                                }} >Client Configuration Setup
                            </Typography>
                               
                                <div className="card" style={{width :'50%',padding:'10px'}}>
                                    <div className="Supplier-container">
                                        <div className="Supplier-entry">

                                            <div className="SupplierSetup">
                                                    <div className="form-group">
                                                        <label>Company Code</label>
                                                        <input type='text'  value={SupplierD.companycode} ref={companycodeRef}
                                                        onKeyDown={(e) => HandleKeydown(e,companycodeRef,companycodeRef,companynameRef)}
                                                        onChange={(e) => handleInputChange(e, 'companycode')}
                                                        />            
                                                    </div>

                                                    <div className="form-group"> 
                                                        <label>Company Name</label>
                                                        <input type='text'  value={SupplierD.companyname} ref={companynameRef}
                                                        onKeyDown={(e) => HandleKeydown(e,companycodeRef,companynameRef,companyname2Ref)}
                                                        onChange={(e) => handleInputChange(e, 'companyname')}
                                                        />            
                                                    </div>

                                                    <div className="form-group"> 
                                                        <label>Company Name2</label>
                                                        <input type='text'  value={SupplierD.companyname2} ref={companyname2Ref}
                                                        onKeyDown={(e) => HandleKeydown(e,companynameRef,companyname2Ref,companyaddressRef)}
                                                        onChange={(e) => handleInputChange(e, 'companyname2')}
                                                        />            
                                                    </div>
                                   

                                            <div className="form-group">
                                                <label>Company Address</label>
                                                <input  type='text' value={SupplierD.companyaddress} ref={companyaddressRef}
                                                onKeyDown={(e) => HandleKeydown(e,companyname2Ref,companyaddressRef,companyaddress2Ref)}
                                                onChange={(e) => handleInputChange(e, 'companyaddress')}
                                                />            
                                            </div>
                                            <div className="form-group">
                                                <label>Company Address2</label>
                                                <input  type='text' value={SupplierD.companyaddress2} ref={companyaddress2Ref}
                                                onKeyDown={(e) => HandleKeydown(e,companyaddressRef,companyaddress2Ref,companyaddress3Ref)}
                                                onChange={(e) => handleInputChange(e, 'companyaddress2')}
                                                />            
                                            </div>
                                            <div className="form-group">
                                                <label>Company Address3</label>
                                                <input  type='text' value={SupplierD.companyaddress3} ref={companyaddress3Ref}
                                                onKeyDown={(e) => HandleKeydown(e,companyaddress2Ref,companyaddress3Ref,tinRef)}
                                                onChange={(e) => handleInputChange(e, 'companyaddress3')}
                                                />            
                                            </div>
                                            </div>
                                            <div className="SupplierSetup">
                                                                            
                                                <div className="form-group">
                                                    <label>TIN</label>
                                                    <input  type='text' value={SupplierD.tin} ref={tinRef}
                                                    onKeyDown={(e) => HandleKeydown(e,companyaddress2Ref,tinRef,telnoRef)}
                                                    onChange={(e) => handleInputChange(e, 'tin')}
                                                    />            
                                                </div>

                                                
                                                                                            
                                                <div className="form-group">
                                                    <label>Telephone No.</label>
                                                    <input  type='text' value={SupplierD.telno} ref={telnoRef}
                                                    onKeyDown={(e) => HandleKeydown(e,tinRef,telnoRef,remarksRef)}
                                                    onChange={(e) => handleInputChange(e, 'telno')}
                                                    />            
                                                </div>
                                                    

                                                <div className="form-group">
                                                    <label>Remarks</label>
                                                    <input  type='text' value={SupplierD.remarks} ref={remarksRef}
                                                    onKeyDown={(e) => HandleKeydown(e,telnoRef,remarksRef,remarks2Ref)}
                                                    onChange={(e) => handleInputChange(e, 'remarks')}
                                                    />            
                                                </div>


                                                <div className="form-group">
                                                    <label>Remarks2</label>
                                                    <input  type='text' value={SupplierD.remarks2} ref={remarks2Ref}
                                                    onKeyDown={(e) => HandleKeydown(e,remarksRef,remarks2Ref,remarks3Ref)}
                                                    onChange={(e) => handleInputChange(e, 'remarks2')}
                                                    />            
                                                </div>

                                                <div className="form-group">
                                                    <label>Remarks3</label>
                                                    <input  type='text' value={SupplierD.remarks3} ref={remarks3Ref}
                                                    onKeyDown={(e) => HandleKeydown(e,remarks2Ref,remarks3Ref,remarks3Ref)}
                                                    onChange={(e) => handleInputChange(e, 'remarks3')}
                                                    />            
                                                </div>
                                            </div>
                                        </div>          
                               
                                   

                                    
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                      {isEdit ? (
                                    <><Button type="button" variant="contained" color="primary" fullWidth style={{ margin: '5px', backgroundColor: '#007bff' }}
                                                onClick={handleUpdate}
                                            > Update</Button><Button type="button" variant="contained" color="primary" fullWidth style={{ margin: '5px', backgroundColor: 'red' }}
                                                onClick={handleDelete}
                                            > Delete</Button></>
                                      ):(
                                        <Button type="button" variant="contained" color="primary" fullWidth style={{margin:'5px' ,backgroundColor:'#007bff'}}
                                        onClick={handleSubmit}
                                        > Save</Button>
                                      )}
                         

            

                                    <Button type="button" variant="contained" color="primary" fullWidth style={{margin:'5px',backgroundColor:'red'}} onClick={CloseModal}> Close</Button>
                                    </div>
                                    </div>
                                </div>
            
                                
                            
        </Grid>
        </>
    )
}

export default ClientSetup;