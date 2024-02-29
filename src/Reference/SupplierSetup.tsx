import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Grid, SelectChangeEvent, Typography } from "@mui/material";
import BASE_URL from "../config";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import Swal from "sweetalert2";


interface SupplierData {
companycode:string;
companyname:string;
companyname2:string;
companyaddress:string;
companyaddress2:string;
tin:string;
accreditation:string;
dateissued:string;
datevalid:string;
}
const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

const SupplierSetup = () => {
    const [OpenEmployeeModal,setOpenEmployeeModal] = useState<boolean>(false)
    const [OpenaddUsermodal,setOpenaddUsermodal] = useState<boolean>(false)
    const [users, setUsers] = useState<any[]>([]);
    const [Employee, setEmployee] = useState<any[]>([]);
    const [SupplierD, setSupplierD] = useState<SupplierData>({
        companycode:'',
        companyname:'',
        companyname2: '',
        companyaddress: '',
        companyaddress2: '',
        tin: '',
        accreditation: '',
        dateissued: '',
        datevalid: '',
    });
    const companycodeRef = useRef<HTMLInputElement>(null);
    const companynameRef = useRef<HTMLInputElement>(null);
    const companyname2Ref = useRef<HTMLInputElement>(null);
    const companyaddressRef = useRef<HTMLInputElement>(null);
    const companyaddress2Ref = useRef<HTMLInputElement>(null);
    const tinRef = useRef<HTMLInputElement>(null);
    const accreditationRef = useRef<HTMLInputElement>(null);
    const dateissuedRef = useRef<HTMLInputElement>(null);
    const datevalidRef = useRef<HTMLInputElement>(null);
   
    const [isEdit,setisEdit] = useState<boolean>(false)

    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(0);


useEffect(() => {
        // Fetch data when the component mounts
        fetchData();


}, []); // Empty dependency array to run this effect only once

const fetchData = async () => {
                // try {
                //     const response = await axios.get(`${BASE_URL}/api/terminal-setup/`); // Replace 'API_ENDPOINT' with your actual endpoint
                //     if (response.status == 200){
                //         setUsers(response.data.data);
                //     }

                // } catch (error) {

                //     console.error('Error fetching data:', error);
                // }
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
            text: "Do you want Add New Terminal Setup?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true

                  }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/terminal-setup/`, SupplierD);

                    if (response.status==200){
   
                        setSupplierD({
                            companycode:'',
                            companyname:'',
                            companyname2: '',
                            companyaddress: '',
                            companyaddress2: '',
                            tin: '',
                            accreditation: '',
                            dateissued: '',
                            datevalid: '',
                        });
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
            text: "Do you want Update User?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/terminal-setup/`, SupplierD);
                    console.log('User created:', response.data);
                    setSupplierD({
                        companycode:'',
                        companyname:'',
                        companyname2: '',
                        companyaddress: '',
                        companyaddress2: '',
                        tin: '',
                        accreditation: '',
                        dateissued: '',
                        datevalid: '',
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
                        companycode:'',
                        companyname:'',
                        companyname2: '',
                        companyaddress: '',
                        companyaddress2: '',
                        tin: '',
                        accreditation: '',
                        dateissued: '',
                        datevalid: '',
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
            companycode:'',
            companyname:'',
            companyname2: '',
            companyaddress: '',
            companyaddress2: '',
            tin: '',
            accreditation: '',
            dateissued: '',
            datevalid: '',
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

const handleRetrieveUserData = (index: number) => {
                // if (users[index]) {
                //   const selectedUser = users[index]; // Retrieve the user data at the specified index
                //   setSupplierD({
                //     companycode:selectedUser.autonum,
                //     companyaddress:selectedUser.ul_code,
                //     terminalno: selectedUser.terminal_no,
                //     description: selectedUser.description,
                //     siteno: selectedUser.site_no,
                //     serialno: selectedUser.Serial_no,
                //     modelno:selectedUser.Model_no,
                //     machineno: selectedUser.Machine_no,
                //     ptu: selectedUser.PTU_no,
                //     dateissue: selectedUser.date_issue,
                //     datevalid: selectedUser.date_valid,
                // });
                // setOpenaddUsermodal(true)
                // setisEdit(true)
                // setTimeout(() => {
                //     if (companycodeRef.current){
                //         companycodeRef.current.focus();
                //         companycodeRef.current.select();
                //     }
                // }, 500);
                // } else {
                //   console.error('Index out of range or user not found');
                // }
};


const handleRankChange = (event: SelectChangeEvent<string>) => {
        // setSelectedRank(event.target.value);
        // setUser({
        //     id_code:user.id_code,
        //     fullName: user.fullName,
        //     username: user.username,
        //     password:user.password,
        //     rank:event.target.value
        // });
        // Additional logic if needed upon selecting a rank
};


const ClickEmployeeList = (index:any) => {

    // const selectedItem = Employee[index];
    // setUser({
    //     id_code :selectedItem.id_code,
    //     fullName :selectedItem.first_name +' '+ selectedItem.middle_name +' '+ selectedItem.last_name,
    //     username: '',
    //     password: '',
    //     rank: ''

    // })

    // setOpenEmployeeModal(false)
    // if (fullnameRef.current) {
    //     fullnameRef.current.focus();
    // }
    
    
}


// const handleKeys = (event :any,  inputIdentifier :any) => {
//     if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
//       event.preventDefault();
      
//       if (inputIdentifier === 'Employee') {
//         const listItems = EmployeeRef.current?.querySelectorAll('li');
//         const currentIndex = Array.from(listItems || []).findIndex((item) => item === selectedItemIndex);
//         let nextIndex: number | undefined;
      
//         if (event.key === 'ArrowUp') {
//           nextIndex = currentIndex !== undefined ? currentIndex - 1 : undefined;
//         } else if (event.key === 'ArrowDown') {
//           nextIndex = currentIndex !== undefined ? currentIndex + 1 : undefined;
//         }
      
//         if (nextIndex !== undefined && listItems && nextIndex >= 0 && nextIndex < listItems.length) {
//           const prevSelectedItem = document.querySelector('.ul-list .selected');
//           if (prevSelectedItem) {
//             prevSelectedItem.classList.remove('selected');
//           }
      
//           const nextListItem = listItems[nextIndex] as HTMLElement;
//           if (nextListItem) {
//             nextListItem.focus();
      
//             setSelectedItemIndex(nextListItem);
//             setSupplierD({
//                 companycode:'',
//                 companyname:'',
//                 companyname2: '',
//                 companyaddress: '',
//                 companyaddress2: '',
//                 tin: '',
//                 accreditation: '',
//                 dateissued: '',
//                 datevalid: '',
//             });
//             // Add the 'selected' class to the newly selected item
//             nextListItem.classList.add('selected');
//           }
//         }
//       }
      
//     }

    
//     if (event.key === 'Enter') {

//       if (inputIdentifier === 'Employee') {
//         const listItems = EmployeeRef.current?.querySelectorAll('li');
//         const currentIndex = Array.from(listItems || []).findIndex((item) => item === selectedItemIndex);
//         ClickEmployeeList(currentIndex);


//       }



//     }


// };


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
                            alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                            borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
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
                                }} >Supplier Configuration Setup
                            </Typography>
                               
                                <div  style={{margin:'10px'}}>
                                    <div className="TerminalReg" style={{display:'flex',flexDirection:'row'}}>
                                        <div className="terminal-entry">

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
                                                        <label></label>
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
                                                <label></label>
                                                <input  type='text' value={SupplierD.companyaddress2} ref={companyaddress2Ref}
                                                onKeyDown={(e) => HandleKeydown(e,companyaddressRef,companyaddress2Ref,tinRef)}
                                                onChange={(e) => handleInputChange(e, 'companyaddress2')}
                                                />            
                                            </div>


                                                                                        
                                            <div className="form-group">
                                                <label>TIN</label>
                                                <input  type='text' value={SupplierD.tin} ref={tinRef}
                                                onKeyDown={(e) => HandleKeydown(e,companyaddress2Ref,tinRef,accreditationRef)}
                                                onChange={(e) => handleInputChange(e, 'tin')}
                                                />            
                                            </div>

                                            
                                                                                        
                                            <div className="form-group">
                                                <label>Accreditation No.</label>
                                                <input  type='text' value={SupplierD.accreditation} ref={accreditationRef}
                                                onKeyDown={(e) => HandleKeydown(e,tinRef,accreditationRef,dateissuedRef)}
                                                onChange={(e) => handleInputChange(e, 'accreditation')}
                                                />            
                                            </div>
                                                 

                                            <div className="form-group">
                                                <label>Date Issued</label>
                                                <input  type='date' value={SupplierD.dateissued} ref={dateissuedRef}
                                                onKeyDown={(e) => HandleKeydown(e,accreditationRef,dateissuedRef,datevalidRef)}
                                                onChange={(e) => handleInputChange(e, 'dateissued')}
                                                />            
                                            </div>


                                            
                                            <div className="form-group">
                                                <label>Date Valid</label>
                                                <input  type='date' value={SupplierD.datevalid} ref={datevalidRef}
                                                onKeyDown={(e) => HandleKeydown(e,dateissuedRef,datevalidRef,datevalidRef)}
                                                onChange={(e) => handleInputChange(e, 'datevalid')}
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
            
                                
                            
                        </Grid>


        </>
    )
}

export default SupplierSetup;