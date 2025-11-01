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

import { setGlobalIsLoading } from "../globalSlice";
import { RootState } from "../store";
import { useSelector,useDispatch } from "react-redux";
import { InProgressLoading } from "../Loader/Loader";
import { useScreenSize } from '../ScreenHeightContext';

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
    const { width, height, orientation } = useScreenSize();
    const dispatch = useDispatch()
    const isLoading = useSelector((state:RootState)=>state.global.globalIsLoading)
    const [OpenEmployeeModal,setOpenEmployeeModal] = useState<boolean>(false)
    const [OpenaddUsermodal,setOpenaddUsermodal] = useState<boolean>(false)
    const [users, setUsers] = useState<any[]>([]);
    const [Employee, setEmployee] = useState<any[]>([]);
    const [TmpEmployee, setTmpEmployee] = useState<any[]>([]);
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

        fetchData();
        fetchEmployee();
    }, []); 

 const fetchData = async () => {

        try {

            dispatch(setGlobalIsLoading(true))
            const response = await axios.get(`${BASE_URL}/api/view-waiter/`); // Replace 'API_ENDPOINT' with your actual endpoint
            if (response.status == 200){
               dispatch(setGlobalIsLoading(false))
               setUsers(response.data.userList);
            }

        } catch (error) {
            dispatch(setGlobalIsLoading(false))
            console.error('Error fetching data:', error);
        }
    };

    const fetchEmployee =async () =>{
      const result = await axios.get(`${BASE_URL}/api/employee-list/`,{withCredentials:true }); 
        if (result) {
            // setOpenEmployeeModal(true);
            setEmployee(result.data.EmployeeList);
            setTmpEmployee(result.data.EmployeeList)
        }}

    
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

      if(user.waiter_id==='') return

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
                  dispatch(setGlobalIsLoading(true))
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
                dispatch(setGlobalIsLoading(false))
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



const AddUser = async() => {
        setOpenaddUsermodal(true)
 
       
        setUser({
            waiter_id:'',
            waiter_name: '',
        });
        setisEdit(false)

      setTimeout(() => {
    if (fullnameRef.current) {
        fullnameRef.current.focus();
    }
        }, 100);

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
          const prevSelectedItem = document.querySelector('.selected');
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

  
useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {

  if (e.key === 'Escape') {
        e.preventDefault();
        if (OpenEmployeeModal){
          setOpenEmployeeModal(false)
          fullnameRef.current?.focus()
        }else if(OpenaddUsermodal) {
           setOpenaddUsermodal(false)

        }
        
    }else if (e.key ==='F5'){
      e.preventDefault()
    }else   if (e.ctrlKey && e.key.toLowerCase() === 's') {
      e.preventDefault()
      if(OpenaddUsermodal && !OpenEmployeeModal) {
             handleSubmit()
        }
    
    }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [OpenEmployeeModal,OpenaddUsermodal]);



  const handleSearchInputChange = async (e:any, inputIdentifier :any) => {
    try {
        if (e==='') return
      const filtered = TmpEmployee.filter((item:any)=>String(item.last_name).toLocaleLowerCase().includes(e.toLocaleLowerCase()) ||
        String(item.first_name).toLocaleLowerCase().includes(e.toLocaleLowerCase()) )
      
        if (filtered){
          setSelectedItemIndex(0)
          setOpenEmployeeModal(true)
          setEmployee(filtered)
        }
            
    }catch (error) {
       console.error(error);
    }
  }


    return (
        <>
        <Grid container style={{justifyContent:'start',}}>
        
            <Grid item lg={12} style={{margin:'10px',padding: '5px',
                alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                height:height-80
                }}>

                <div style={{display:'flex',flexDirection:'row',width:'100%',textAlign:'end'}}>

                        
                <div style={{display:'flex',flexDirection:'row',width:'100%' }}>
                <Typography
                            variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                            sx={{
                            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            borderRadius: '10px',
                            color: 'blue',
                            fontWeight:'bold',
                            textAlign:'center',
                            width:'100%',
                            }} > Waiter Profile
                </Typography>


             
                <FontAwesomeIcon icon={faPlus} style={{display:'flex',fontSize:'25px',
                  color:'blue',justifyContent:'flex-end'}} 
                  onClick={AddUser}></FontAwesomeIcon>
                </div>

           
            </div>
            <div style={{ height:height -140,overflow: 'auto', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '1px' }}>

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
                 <div className="modal-content" style={{width:'500px'}}>
                            <Grid item xs={12} sm={12} md={12} lg={12} style={{margin:'0px',padding: '0px', display: 'flex',flexDirection: 'column',
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
                                color: 'blue',
                                fontWeight:'bold'
                                }} > Waiter Profile
                            </Typography>
                               
                                <div style={{margin:'10px',width:'90%'}}>
                                    <div>
                                      <label>Employee Name:</label>
                                    <TextField
                                        placeholder="Full Name"
                                        inputRef={fullnameRef}
                                        value={user.waiter_name}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> handleSearchInputChange(e.target.value, 'Waiter')}
                                        onChange={(e) => handleInputChange(e, 'waiter_name')}
                                        fullWidth
                                        onKeyDown={(event) => handleKeys(event, 'Waiter')}
                                        variant='outlined'
                                        autoComplete='off'

                                    />
                                    </div>
                                      {OpenEmployeeModal && (
                                              <div
                                                  style={{
                                                    position: 'fixed',
                                                    top: '53%',
                                                    left: '50%',
                                                    transform: 'translateX(-50%)',
                                                    width: '400px',
                                                    maxHeight: '300px',
                                                    zIndex: 1000,
                                                    backgroundColor: '#fff',
                                                    borderRadius: '8px',
                                                    boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                                                    overflow: 'hidden',
                                                  }}
                                                >
                                                  <div
                                                    style={{
                                                      padding: '10px',
                                                      borderBottom: '1px solid #ccc',
                                                      display: 'flex',
                                                      justifyContent: 'space-between',
                                                      alignItems: 'center',
                                                    }}
                                                  >
                                                    <h3 style={{color:'blue'}}>Employee List</h3>
                                                    <a className='fas fa-times'
                                                    onClick={()=>{setOpenEmployeeModal(false)}}
                                                    style={{color:'blue',cursor:'pointer'}}/>
                                                  </div>
                                                  <ul
                                                    ref={EmployeeRef}
                                                    style={{
                                                      listStyle: 'none',
                                                      margin: 0,
                                                      padding: 0,
                                                      maxHeight: '250px',
                                                      overflowY: 'auto',
                                                    }}
                                                    tabIndex={0}
                                                    onKeyDown={(event) => handleKeys(event, 'Waiter')}
                                                  >
                                                    {Employee.map((emp:any, index) => (
                                                      <li
                                                        key={index}
                                                        tabIndex={0}
                                                        style={{
                                                          padding: '8px 12px',
                                                          cursor: 'pointer',
                                                          // backgroundColor: selectedItemIndex === index + 1 ? '#007bff' : 'transparent',
                                                          // color: selectedItemIndex === index ? '#fff' : '#000',
                                                        }}
                                                        className={selectedItemIndex === index + 1 ? 'selected':''}
                                                        onClick={() => ClickEmployeeList(index)}
                                                        onKeyDown={(event) => handleKeys(event, 'Waiter')}
                                                      >
                                                        {emp.id_code} - {emp.first_name} {emp.middle_name ? emp.middle_name + ' ' : ''}
                                                        {emp.last_name}
                                                      </li>
                                                    ))}
                                                  </ul>
                                                </div>
                                              )} 
                                  
                               

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
                        </div>
                        </div>
            )}

          

               
        </Grid></>
    );
    
};

export default WaiterProfile;