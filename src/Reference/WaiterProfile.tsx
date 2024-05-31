/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import {  Button, Grid, Table, TextField, Typography } from '@mui/material'; // Import Material-UI components
import './css/WaiterProfile.css';

import axios from 'axios'; 
import {BASE_URL} from '../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faPrint} from '@fortawesome/free-solid-svg-icons';
import { isDesktop } from 'react-device-detect';

import Swal from 'sweetalert2';
import { AnyComponent } from 'styled-components/dist/types';

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })


interface User {
    waiter_id:string;
    waiter_name: string;
}


const WaiterProfile: React.FC = () => {
    const [OpenEmployeeModal,setOpenEmployeeModal] = useState<boolean>(false)
    const [OpenaddUsermodal,setOpenaddUsermodal] = useState<boolean>(false)
    const [users, setUsers] = useState<any[]>([]);
    const [Employee, setEmployee] = useState<any[]>([]);
    const [user, setUser] = useState<User>({
        waiter_id:'',
        waiter_name: '',
    });
    
   
    const [isEdit,setisEdit] = useState<boolean>(false)

    const fullnameRef = useRef<HTMLInputElement>(null);
    // const idCodeRef = useRef<HTMLInputElement>(null);
    const EmployeeRef = useRef<HTMLUListElement>(null);
    const [selectedItemIndex, setSelectedItemIndex] = useState<any>(0);
    useEffect(() => {
        // Fetch data when the component mounts
        fetchData();
    }, []); // Empty dependency array to run this effect only once

 const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/view-waiter/`); // Replace 'API_ENDPOINT' with your actual endpoint
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
            text: "Do you want Add Waiter?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true

                  }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/add-waiter/`, user);

                    if (response.status !== 200) {
                        throw new Error('Request failed with status ' + response.status);
                      }
                    if (response.status==200){
                        setUser({
                            waiter_id:'',
                            waiter_name: '',
                        });
                        fetchData();
                        setOpenaddUsermodal(false)
                        Swal.fire({
                            title: 'Successfull',
                            text: 'Waiter Successfully Added!',
                            icon: 'success', // You can use 'success', 'error', 'warning', 'info', 'question'
                            confirmButtonText: 'OK'
                          });
                          
                          // Close the SweetAlert after 2 seconds (2000 milliseconds)
                          setTimeout(() => {
                            Swal.close();
                          }, 2000);

                    }

                } catch (error: any) {

                    Swal.fire({
                        title: 'Error',
                        text: 'Error creating Waiter Duplication is Not Allowed: ' + error,
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
            text: "Do you want Update Waiter?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.post(`${BASE_URL}/api/update-waiter/`, user);
                    console.log('User created:', response.data);
                    setUser({
                        waiter_id:'',
                        waiter_name: '',
                    });
                    fetchData();
                    setOpenaddUsermodal(false)

                    Swal.fire({
                        title: 'Successfull',
                        text: 'Waiter Successfully Update!',
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
                        text: 'Error updating Witer:'+ error,
                        icon: 'error', // You can use 'success', 'error', 'warning', 'info', 'question'
                        confirmButtonText: 'OK'
                      });
                      
                      // Close the SweetAlert after 2 seconds (2000 milliseconds)
                      setTimeout(() => {
                        Swal.close();
                      }, 2000);
                    console.error('Error updating Witer:', error);
                }
            }})
        

    };


    const handleDelete = async () => {
    swalWithBootstrapButtons.fire({
        title: 'Confirmation',
        text: "Do you want Delete Waiter?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await axios.delete(`${BASE_URL}/api/delete-waiter/`, {
                    data: { user: user }
                  });
                console.log('User created:', response.data);
                setUser({
                    waiter_id:'',
                    waiter_name: '',
                });
                fetchData();
                setOpenaddUsermodal(false)

                Swal.fire({
                    title: 'Delete',
                    text: 'Waiter Successfully Deleted!',
                    icon: 'info', // You can use 'success', 'error', 'warning', 'info', 'question'
                    confirmButtonText: 'OK'
                  });
                  
                  // Close the SweetAlert after 2 seconds (2000 milliseconds)
                  setTimeout(() => {
                    Swal.close();
                  }, 2000);

    
            } catch (error) {

                Swal.fire({
                    title: 'error',
                    text: 'Error Deleting Waiter:'+ error,
                    icon: 'error', // You can use 'success', 'error', 'warning', 'info', 'question'
                    confirmButtonText: 'OK'
                  });
                  
                  // Close the SweetAlert after 2 seconds (2000 milliseconds)
                  setTimeout(() => {
                    Swal.close();
                  }, 2000);
                console.error('Error Deleting Waiter:', error);
            }
        }})

    };



const AddUser =() => {
        setOpenaddUsermodal(true)
        setUser({
            waiter_id:'',
            waiter_name: '',
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
                    waiter_id:selectedUser.waiter_id,
                    waiter_name: selectedUser.waiter_name,
                });
                setOpenaddUsermodal(true)
                setisEdit(true)
                } else {
                  console.error('Index out of range or user not found');
                }
    };




const ClickEmployeeList = (index:any) => {

    const selectedItem = Employee[index];
    setUser({
        waiter_id :selectedItem.id_code,
        waiter_name :selectedItem.first_name +' '+ selectedItem.middle_name +' '+ selectedItem.last_name,

    })

    setOpenEmployeeModal(false)
    if (fullnameRef.current) {
        fullnameRef.current.focus();
    }
    
    
     }


const handleKeys = (event :any,  inputIdentifier :any) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      
      if (inputIdentifier === 'Waiter') {
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
                waiter_id : '',
                waiter_name : nextListItem.innerText,
        
            })
            // Add the 'selected' class to the newly selected item
            nextListItem.classList.add('selected');
          }
        }
      }
      
    }

    
    if (event.key === 'Enter') {

      if (inputIdentifier === 'Waiter') {
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
        if (inputIdentifier === 'Waiter') {
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
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            borderRadius: '10px',
                            color: 'blue',
                            fontWeight:'bold'
                            }} > Waiter Profile
                        </Typography>
                </div>

                <div style={{margin:'5px',textAlign:'end',width:'70%'}}>
                <FontAwesomeIcon icon={faPlus} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} onClick={AddUser}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPrint} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} onClick={AddUser}></FontAwesomeIcon>
            </div>
            </div>
            <div className="Transaction" style={{ overflow: 'auto' ,height:'250px',width:'100%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '1px' }}>

                <Table className="Waiter list" sx={{
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto'
                            }}>
                        <thead>
                            <tr style={{textAlign:'center'}}>
                            <th>ID Code</th>
                            <th>FullName</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(users) && users.length > 0 ? (
                            users.map((item, index) => (
                            <tr key={index} onClick={() => handleRetrieveUserData(index)} > 
                            <td>{item.waiter_id}</td>
                            <td title={item.fullname}>{item.waiter_name}</td>
                        
                                        </tr>
                                    ))
                                    ) : (
                                    <tr>
                                        <td colSpan={4}>No items in the transaction</td>
                                    </tr>
                                    )}
                        </tbody>
                </Table>
            </div>
        </Grid>


            {OpenaddUsermodal && (
                 <div className="modal">
                 <div className="modal-content">
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:'0px',padding: '0px', display: 'flex',flexDirection: 'column',width:'300px',
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
                                }} > Waiter Profile
                            </Typography>
                               
                                <form onSubmit={handleSubmit} style={{margin:'10px',width:'90%'}}>
                                    <div>
                                    <TextField
                                    label="Full Name"
                                        placeholder="Full Name"
                                        ref={fullnameRef}
                                        value={user.waiter_name}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> handleSearchInputChange(e.target.value, 'Waiter')}
                                        onChange={(e) => handleInputChange(e, 'waiter_name')}
                                        fullWidth
                                        onKeyDown={(event) => handleKeys(event, 'Waiter')}
                                        variant='outlined'
                                        autoComplete='off'
                                        style={{
                               
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            marginBottom: '10px',
                                        }}
                                    />

                                            {OpenEmployeeModal && (
                                            <div className='Waiter-Container' style={{ height: '25%' ,zIndex:'1',overflow:'auto',top:'400px'}}>
                                                <ul id="list" className='ul-list Waiter' onKeyDown={(event) => handleKeys(event, 'Waiter')}  ref={EmployeeRef}>
                                                {Employee.map((result,index) => (
                                                    <li tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''}
                                                    onKeyDown={(event) => handleKeys(event, 'Waiter')} 
                                                    onClick={() => ClickEmployeeList(index)}
                                                    >{result.id_code} - {result.first_name} {result.middle_name} {result.last_name}</li>
                                                        ))}
                                                    </ul>
                                                    </div>
                                                    )}
            
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

                                </form>
            
                                
                            
                        </Grid>
                        </div>
                        </div>
            )}
               
        </Grid></>
    );
    
};

export default WaiterProfile;