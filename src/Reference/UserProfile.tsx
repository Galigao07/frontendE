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
import showErrorAlert from '../SwalMessage/ShowErrorAlert';
import showSuccessAlert from '../SwalMessage/ShowSuccessAlert';
import Swal from 'sweetalert2';

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })


interface User {
    id_code:string;
    fullName: string;
    username: string;
    password: string;
    rank: string;
}


const UserProfile: React.FC = () => {
    const [OpenEmployeeModal,setOpenEmployeeModal] = useState<boolean>(false)
    const [OpenSelectEmployeeModal,setOpenSelectEmployeeModal] = useState<boolean>(false)
    const [OpenaddUsermodal,setOpenaddUsermodal] = useState<boolean>(false)
    const [users, setUsers] = useState<any[]>([]);
    const [Employee, setEmployee] = useState<any[]>([]);
    const [user, setUser] = useState<User>({
        id_code:'',
        fullName: '',
        username: '',
        password: '',
        rank: ''
    });
    
   
    const [isEdit,setisEdit] = useState<boolean>(false)

    const fullnameRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
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
            const response = await axios.get(`${BASE_URL}/api/view-users/`,{withCredentials:true}); // Replace 'API_ENDPOINT' with your actual endpoint
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
                    const response = await axios.post(`${BASE_URL}/api/add-users/`, user);

                    if (response.status==200){
   
                        setUser({
                            id_code:'',
                            fullName: '',
                            username: '',
                            password: '',
                            rank: ''
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
                    const response = await axios.post(`${BASE_URL}/api/update-users/`, user);
                    console.log('User created:', response.data);
                    setUser({
                        id_code:'',
                        fullName: '',
                        username: '',
                        password: '',
                        rank: ''
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
                    data: { user: user }
                  });
          
                  if (response.status==200) {
                    setUser({
                        id_code:'',
                        fullName: '',
                        username: '',
                        password: '',
                        rank: ''
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
        setUser({
            id_code:'',
            fullName: '',
            username: '',
            password: '',
            rank: ''
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
                    id_code:selectedUser.id_code,
                    fullName: selectedUser.fullname,
                    username: selectedUser.user_name,
                    password: selectedUser.password,
                    rank: selectedUser.user_rank,
                });
                setOpenaddUsermodal(true)
                setisEdit(true)
                } else {
                  console.error('Index out of range or user not found');
                }
    };


    const handleRankChange = (event: SelectChangeEvent<string>) => {
        // setSelectedRank(event.target.value);
        setUser({
            id_code:user.id_code,
            fullName: user.fullName,
            username: user.username,
            password:user.password,
            rank:event.target.value
        });
        // Additional logic if needed upon selecting a rank
      };


const ClickEmployeeList = (index:any) => {

    const selectedItem = Employee[index];
    setUser({
        id_code :selectedItem.id_code,
        fullName :selectedItem.first_name +' '+ selectedItem.middle_name +' '+ selectedItem.last_name,
        username: '',
        password: '',
        rank: ''

    })

    setOpenEmployeeModal(false)
    if (fullnameRef.current) {
        fullnameRef.current.focus();
    }
    
    
     }


const handleKeys = (event :any,  inputIdentifier :any) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      
      if (inputIdentifier === 'Employee') {
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
                id_code : '',
                fullName : nextListItem.innerText,
                username: '',
                password: '',
                rank: ''
        
            })
            // Add the 'selected' class to the newly selected item
            nextListItem.classList.add('selected');
          }
        }
      }
      
    }

    
    if (event.key === 'Enter') {

      if (inputIdentifier === 'Employee') {
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
        if (inputIdentifier === 'Employee') {
            const result = await axios.get(`${BASE_URL}/api/employee-list/`,{
              params: {
                employee:e
              },withCredentials:true
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
                                }} > User Profile
                            </Typography>
                    </div>

            <div style={{margin:'5px',textAlign:'end',width:'70%'}}>
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
                                    <th>FullName</th>
                                    <th>Username</th>
                                    <th>Rank</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(users) && users.length > 0 ? (
                                users.map((item, index) => (
                                    <tr key={index} onClick={() => handleRetrieveUserData(index)} > 
                                        <td style={{textAlign:'center'}}>{item.id_code}</td>
                                        <td title={item.fullname}>{item.fullname}</td>
                                        <td style={{textAlign:'start'}}>{item.user_name}</td>
                                        <td style={{textAlign:'start'}}>{item.user_rank}</td>
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
                                }} > User Profile
                            </Typography>
                               
                                <form onSubmit={handleSubmit} style={{margin:'10px'}}>
                                    <div>
                                    <TextField
                                        label="Full Name"
                                        variant='outlined'
                                        placeholder="Full Name"
                                        ref={fullnameRef}
                                        value={user.fullName}
                                        onInput={(e: React.ChangeEvent<HTMLInputElement>)=> handleSearchInputChange(e.target.value, 'Employee')}
                                        onChange={(e) => handleInputChange(e, 'fullName')}
                                        fullWidth
                                        onKeyDown={(event) => handleKeys(event, 'Employee')}
                                        autoComplete='off'
                                        style={{
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            marginBottom: '10px',
                                        }}
                                    />
            
                                    </div>
                               
                    
                                    <TextField
                                           label="Username"
                                           variant='outlined'
                                        placeholder="Username"
                                        ref={usernameRef}
                                        value={user.username}
                                        onChange={(e) => handleInputChange(e, 'username')}
                                        fullWidth
                                        style={{
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            marginBottom: '10px',
                                        }}
                                    />
                                    <TextField
                                          label="Password"
                                          variant='outlined'
                                        placeholder="Password"
                                        ref={passwordRef}
                                        type="password"
                                        value={user.password}
                                        onChange={(e) => handleInputChange(e, 'password')}
                                        fullWidth
                                        style={{
                                            border: '1px solid #ccc',
                                            borderRadius: '4px',
                                            fontSize: '16px',
                                            marginBottom: '10px',
                                        }}
                                    />

                                                    <Select
                                                     
                                                            labelId="rank-placeholder"
                                                            value={user.rank}
                                                            onChange={handleRankChange}
                                                            fullWidth
                                                            displayEmpty  // Allows the empty value to be displayed
                                                        >
                                                            <MenuItem value="" disabled>
                                                            Select Rank
                                                            </MenuItem>
                                                            <MenuItem value="Administrator">Administrator</MenuItem>
                                                            <MenuItem value="Cashier">Cashier</MenuItem>
                                                            <MenuItem value="Salesman">Salesman</MenuItem>
                                                            <MenuItem value="Supervisor">Supervisor</MenuItem>
                                                            <MenuItem value="User">User</MenuItem>
                                                        </Select>

                                    
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
        </Grid>
        
        {OpenEmployeeModal && (
            <><div className='modal'>
                    <div className='modal-content'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Employee ID</th>
                                    <th>Fullname</th>
                                </tr>
                            </thead>
                            <tbody>
                            {Employee && Employee.map((result, index) => (
                                <tr key={index}  className={selectedItemIndex === index ? 'selected' : ''}
                                onKeyDown={(event) => handleKeys(event, 'Employee')}
                                onClick={() => ClickEmployeeList(index)}
                                >
                                    <td>{result.id_code}</td>
                                    <td>{result.first_name} {result.middle_name} {result.last_name}</td>
                                </tr>

                            ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
                
                {/* <div className='Employee-Container' style={{ height: '25%', position: isDesktop ? 'absolute' : 'unset', zIndex: '1', overflow: 'auto' }}>
                        <ul id="list" className='ul-list Employee' onKeyDown={(event) => handleKeys(event, 'Employee')} ref={EmployeeRef}>
                            {Employee.map((result, index) => (
                                <li tabIndex={0} key={index} className={selectedItemIndex === index ? 'selected' : ''}
                                    onKeyDown={(event) => handleKeys(event, 'Employee')}
                                    onClick={() => ClickEmployeeList(index)}
                                >{result.id_code} - {result.first_name} {result.middle_name} {result.last_name}</li>
                            ))}
                        </ul>
                    </div> */}
                    
                    </>
              )}
        
        </>
    );
    
};

export default UserProfile;