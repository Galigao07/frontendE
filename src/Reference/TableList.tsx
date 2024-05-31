/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {  Button, Grid, MenuItem, Select, SelectChangeEvent, Table, TextField, Typography } from '@mui/material'; // Import Material-UI components
import './css/userProfile.css';
import axios from 'axios'; 
import {BASE_URL} from '../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faPrint} from '@fortawesome/free-solid-svg-icons';
import { isDesktop } from 'react-device-detect';

import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })


interface User {
    details_id:any;
    table_no: any;
    table_start: any;
    site_code: any;
}


const TableList: React.FC = () => {
    const [OpenEmployeeModal,setOpenEmployeeModal] = useState<boolean>(false)
    const [OpenaddUsermodal,setOpenaddUsermodal] = useState<boolean>(false)
    const [users, setUsers] = useState<any[]>([]);
    const [Employee, setEmployee] = useState<any[]>([]);
    const [user, setUser] = useState<User>({
        details_id:'',
        table_no: '',
        table_start: '',
        site_code: ''
    });
    
   
    const [isEdit,setisEdit] = useState<boolean>(false)

    const SiteCodeRef = useRef<HTMLInputElement>(null);
    const TableNoRef = useRef<HTMLInputElement>(null);
    const TableStartRef = useRef<HTMLInputElement>(null);
    const DetailsIDRef = useRef<HTMLInputElement>(null);
    
    // const rankRef = useRef<HTMLInputElement>(null);
    // const idCodeRef = useRef<HTMLInputElement>(null);
    const EmployeeRef = useRef<HTMLUListElement>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(0);
    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []); // Empty dependency array to run this effect only once

 const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/view-table/`); // Replace 'API_ENDPOINT' with your actual endpoint
            if (response.status == 200){
                setUsers(response.data.userList);
            }

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
        fieldName: keyof User
    ) => {
        const { value } = event.target;
        setUser(prevUser => ({
            ...prevUser,
            [fieldName]: value
        }));

    };

    const handleSubmit = async () => {

        swalWithBootstrapButtons.fire({
            title: 'Confirmation',
            text: "Do you want Add User?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true

                  }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/add-table/`, user);
                    console.log('User created:', response.data);
                    setUser({
                        details_id:'',
                        table_no: '',
                        table_start: '',
                        site_code: ''
                    });
                    fetchData();
                    setOpenaddUsermodal(false)
                    Swal.fire({
                        title: 'Successfull',
                        text: 'Table Successfully Added!',
                        icon: 'success', // You can use 'success', 'error', 'warning', 'info', 'question'
                        confirmButtonText: 'OK'
                      });
                      
                      // Close the SweetAlert after 2 seconds (2000 milliseconds)
                      setTimeout(() => {
                        Swal.close();
                      }, 2000);
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error creating Table: ' + error,
                        icon: 'error', // You can use 'success', 'error', 'warning', 'info', 'question'
                        confirmButtonText: 'OK'
                      });
                      setTimeout(() => {
                        Swal.close();
                      }, 2000);
                    console.error('Error creating user:', error);
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
                    const response = await axios.post(`${BASE_URL}/api/update-table/`, user);
                    console.log('User created:', response.data);
                    setUser({
                        details_id:'',
                        table_no: '',
                        table_start: '',
                        site_code: ''
                    });
                    fetchData();
                    setOpenaddUsermodal(false)
                    Swal.fire({
                        title: 'Successfull',
                        text: 'Table Successfully Updated!',
                        icon: 'success', // You can use 'success', 'error', 'warning', 'info', 'question'
                        confirmButtonText: 'OK'
                      });
                      
                      // Close the SweetAlert after 2 seconds (2000 milliseconds)
                      setTimeout(() => {
                        Swal.close();
                      }, 2000);
                } catch (error) {
                    Swal.fire({
                        title: 'Error',
                        text: 'Error Updating Table: ' + error,
                        icon: 'error', // You can use 'success', 'error', 'warning', 'info', 'question'
                        confirmButtonText: 'OK'
                      });
                      setTimeout(() => {
                        Swal.close();
                      }, 2000);
                    console.error('Error Updating Table: ', error);
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
                const response = await axios.delete(`${BASE_URL}/api/delete-table/`, {
                    data: { user: user }
                  });
                console.log('User created:', response.data);
                setUser({
                    details_id:'',
                    table_no: '',
                    table_start: '',
                    site_code: ''
                });
                fetchData();
                setOpenaddUsermodal(false)
                Swal.fire({
                    title: 'Successfull',
                    text: 'Table Successfully Deleted!',
                    icon: 'success', // You can use 'success', 'error', 'warning', 'info', 'question'
                    confirmButtonText: 'OK'
                  });
                  
                  // Close the SweetAlert after 2 seconds (2000 milliseconds)
                  setTimeout(() => {
                    Swal.close();
                  }, 2000);
            } catch (error) {

                Swal.fire({
                    title: 'Error',
                    text: 'Error creating Table:' + error,
                    icon: 'error', // You can use 'success', 'error', 'warning', 'info', 'question'
                    confirmButtonText: 'OK'
                  });
                  
                  // Close the SweetAlert after 2 seconds (2000 milliseconds)
                  setTimeout(() => {
                    Swal.close();
                  }, 2000);
                console.error('Error Deleting Table:', error);
            }
        }})

    };



const AddUser =() => {
        setOpenaddUsermodal(true)
        setUser({
            details_id:'',
            table_no: '',
            table_start: '',
            site_code: ''
        });
        setisEdit(false)

    }
    const CloseModal =() => {
        setOpenaddUsermodal(false)
        setisEdit(false)
            }

const handleRetrieveUserData = (index: number) => {
                if (users[index]) {
                  const selectedUser = users[index]; // Retrieve the user data at the specified index
                  setUser({
                    details_id:selectedUser.details_id,
                    table_no: parseInt(selectedUser.table_no),
                    table_start: selectedUser.table_start,
                    site_code: selectedUser.site_code
                });
                setOpenaddUsermodal(true)
                setisEdit(true)
                } else {
                  console.error('Index out of range or user not found');
                }
    };


    // const handleRankChange = (event: SelectChangeEvent<string>) => {
    //     // setSelectedRank(event.target.value);
    //     setUser({
    //         details_id:user.details_id,
    //         table_no: user.table_no,
    //         table_start: user.table_start,
    //         site_code:user.site_code,
    //     });
    //     // Additional logic if needed upon selecting a rank
    //   };


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


const handleKeys = (event :any,  inputIdentifier :any) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      
      if (inputIdentifier === 'Table') {
        const listItems = EmployeeRef.current?.querySelectorAll('li');
        const currentIndex = Array.from(listItems || []).findIndex((item) => item === selectedItemIndex);
        let nextIndex: number | undefined;
      
        if (event.key === 'ArrowUp') {
          nextIndex = currentIndex !== undefined ? currentIndex - 1 : undefined;
        } else if (event.key === 'ArrowDown') {
          nextIndex = currentIndex !== undefined ? currentIndex + 1 : undefined;
        }
      
        if (nextIndex !== undefined && listItems && nextIndex >= 0 && nextIndex < listItems.length) {
          const prevSelectedItem = document.querySelector('.ul-list .selected');
          if (prevSelectedItem) {
            prevSelectedItem.classList.remove('selected');
          }
      
          const nextListItem = listItems[nextIndex] as HTMLElement;
          if (nextListItem) {
            nextListItem.focus();
      
            setSelectedItemIndex(nextListItem);
            setUser({
                details_id:'',
                table_no: '',
                table_start: '',
                site_code: ''
   
        
            })
            // Add the 'selected' class to the newly selected item
            nextListItem.classList.add('selected');
          }
        }
      }
      
    }

    
    if (event.key === 'Enter') {

      if (inputIdentifier === 'Table') {
        const listItems = EmployeeRef.current?.querySelectorAll('li');
        const currentIndex = Array.from(listItems || []).findIndex((item) => item === selectedItemIndex);
        ClickEmployeeList(currentIndex);


      }



    }


  };


  const handleSearchInputChange = async (e:any, inputIdentifier :any) => {
    try {
        if (e===''){
            setOpenEmployeeModal(false)
            return;
        }
        if (inputIdentifier === 'Table') {
            const result = await axios.get(`${BASE_URL}/api/table-list/`,{
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

    return (
        <>
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
                                textShadow: '1.5px 1.5px 1.5px rgba(0, 0, 0, 0.5)',
                                borderRadius: '10px',
                                color: 'blue',
                                fontWeight:'bold'
                                }} > Restaurant Table Details
                            </Typography>
                    </div>

            <div style={{margin:'5px',textAlign:'end',width:'30%'}}>
                <FontAwesomeIcon icon={faPlus} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} onClick={AddUser}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPrint} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} onClick={AddUser}></FontAwesomeIcon>
            </div>
            </div>
            <div className="Transaction" style={{ overflow: 'auto' ,height:'250px',width:'100%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '1px' }}>
              <Table className="Userlist" sx={{
                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                        overflow: 'auto'
                    }}>
                              <thead>
                                  <tr>
                                  <th>ID Code</th>
                                  <th>Number of Tables</th>
                                  <th>Table Start@</th>
                                  <th>Site Code</th>
                                  </tr>
                      

                              </thead>
                              <tbody>
                  {Array.isArray(users) && users.length > 0 ? (
                  users.map((item, index) => (
                  <tr key={index} onClick={() => handleRetrieveUserData(index)} > 
                  <td style={{textAlign:'center'}}>{item.details_id}</td>
                  <td title={item.fullname}>{parseInt(item.table_no)}</td>
                  <td style={{textAlign:'start'}}>{String(item.table_start)}</td>
                  <td style={{textAlign:'start'}}>{item.site_code}</td>
              
                  </tr> ))
                      ) : (
                  <tr>
                    <td colSpan={4}>No items in the transaction</td>
                  </tr> )}
                  </tbody>
              </Table>
            </div>
            </Grid>


            {OpenaddUsermodal && (
                 <div className="modal">
                 <div className="modal-content">
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:'0px',padding: '0px', display: 'flex',flexDirection: 'column',width:'100%',
                            alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                            borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                            }}>
                            <Typography
                                variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                                align="center"
                                sx={{
                                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                                textShadow: '2px 2px 2px rgba(0, 0, 0, 0.958)',
                                borderRadius: '10px',
                                padding: '10px',
                                color: 'red !important',
                                fontWeight:'bold'
                                }} > User Profile
                            </Typography>
                               
                                <form onSubmit={handleSubmit} style={{margin:'10px'}}>
                                    <div>

                                    <TextField
                                            type="number"
                                        label="Details ID"
                                        placeholder="Details ID"
                                        ref={DetailsIDRef}
                                        variant="outlined" // Apply the variant prop to TextField, not InputLabel
                                        value={user.details_id}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> handleSearchInputChange(e.target.value, 'Table')}
                                        onChange={(e) => handleInputChange(e, 'details_id')}
                                        fullWidth
                                        onKeyDown={(event) => handleKeys(event, 'Table')}
                                        autoComplete='off'
                                        style={{
                              
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            marginBottom: '10px',
                                        }}
                                    />
                                    <TextField
                                        type="number"
                                        label= "Site Code"
                                        placeholder="Site Code"
                                        ref={SiteCodeRef}
                                        value={user.site_code}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> handleSearchInputChange(e.target.value, 'Table')}
                                        onChange={(e) => handleInputChange(e, 'site_code')}
                                        fullWidth
                                        variant="outlined" // Set the variant to 'outlined'
                                        onKeyDown={(event) => handleKeys(event, 'Table')}
                                        autoComplete='off'
                                        style={{
                                  
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            marginBottom: '10px',
                                        }}
                                    />
            
                                    </div>
                               
                    
                                    <TextField
                                        type="number"
                                        label= "Table Start"
                                        placeholder="Table Start"
                                        ref={TableStartRef}
                                        value={user.table_start}
                                        onChange={(e) => handleInputChange(e, 'table_start')}
                                        fullWidth
                                        variant="outlined" // Set the variant to 'outlined'
                                        style={{
                                          
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            marginBottom: '10px',
                                        }}
                                    />
                                    <TextField
                                        type="number"
                                        label="Number of Tables"
                                        placeholder="Number of Tables"
                                        ref={TableNoRef}

                                        value={user.table_no}
                                        onChange={(e) => handleInputChange(e, 'table_no')}
                                        variant="outlined" // Set the variant to 'outlined'
                                        fullWidth
                                        style={{
                              
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            marginBottom: '10px',
                                        }}
                                    />

                                    
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

                                </form>
            
                                
                            
                        </Grid>
                        </div>
                        </div>
            )}
               
        </Grid></>
    );
    
};

export default TableList;