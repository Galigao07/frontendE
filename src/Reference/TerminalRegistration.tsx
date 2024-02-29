import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Button, Grid, MenuItem, Select, SelectChangeEvent, Table, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BASE_URL from "../config";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import Swal from "sweetalert2";
import { faPlus, faPrint } from "@fortawesome/free-solid-svg-icons";
import { isDesktop } from "react-device-detect";
import './css/TerminalRegistration.css'

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })


interface TerminalData {
    autonum:string;
    ulcode:string;
    terminalno: string;
    machineno: string;
    serialno: string;
    ptu: string;
    siteno: string;
    modelno: string;
    description: string;
    dateissue: string;
    datevalid: string;
}
const TerminalRegistration: React.FC = () => {
    const [OpenEmployeeModal,setOpenEmployeeModal] = useState<boolean>(false)
    const [OpenaddUsermodal,setOpenaddUsermodal] = useState<boolean>(false)
    const [users, setUsers] = useState<any[]>([]);
    const [Employee, setEmployee] = useState<any[]>([]);
    const [TerminalD, setTerminalD] = useState<TerminalData>({
        autonum:'',
        ulcode:'',
        terminalno: '',
        machineno: '',
        serialno: '',
        ptu: '',
        siteno: '',
        modelno: '',
        description: '',
        dateissue: '',
        datevalid: '',
    });
    const autonumRef = useRef<HTMLInputElement | null>(null);
    const ulcodeRef = useRef<HTMLInputElement | null>(null);
    const terminalnoRef = useRef<HTMLInputElement | null>(null);
    const machinenoRef = useRef<HTMLInputElement | null>(null);
    const serialnoRef = useRef<HTMLInputElement | null>(null);
    const ptuRef = useRef<HTMLInputElement | null>(null);
    const sitenoRef = useRef<HTMLInputElement | null>(null);
    const modelnoRef = useRef<HTMLInputElement | null>(null);
    const descriptionRef = useRef<HTMLInputElement | null>(null);
    const dateissueRef = useRef<HTMLInputElement | null>(null);
    const datevalidRef = useRef<HTMLInputElement | null>(null);
   
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
                    const response = await axios.get(`${BASE_URL}/api/terminal-setup/`); // Replace 'API_ENDPOINT' with your actual endpoint
                    if (response.status == 200){
                        setUsers(response.data.data);
                    }

                } catch (error) {

                    console.error('Error fetching data:', error);
                }
};

const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, 
        fieldName: keyof TerminalData
    ) => {
        const { value } = event.target;
        setTerminalD(prevUser => ({
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
                    const response = await axios.post(`${BASE_URL}/api/terminal-setup/`, TerminalD);

                    if (response.status==200){
   
                        setTerminalD({
                            autonum:'',
                            ulcode:'',
                            terminalno: '',
                            machineno: '',
                            serialno: '',
                            ptu: '',
                            siteno: '',
                            modelno: '',
                            description: '',
                            dateissue: '',
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
                    const response = await axios.post(`${BASE_URL}/api/terminal-setup/`, TerminalD);
                    console.log('User created:', response.data);
                    setTerminalD({
                        autonum:'',
                        ulcode:'',
                        terminalno: '',
                        machineno: '',
                        serialno: '',
                        ptu: '',
                        siteno: '',
                        modelno: '',
                        description: '',
                        dateissue: '',
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
                    data: { user: TerminalD }
                  });
          
                  if (response.status==200) {
                    setTerminalD({
                        autonum:'',
                        ulcode:'',
                        terminalno: '',
                        machineno: '',
                        serialno: '',
                        ptu: '',
                        siteno: '',
                        modelno: '',
                        description: '',
                        dateissue: '',
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
        setTerminalD({
            autonum:'',
            ulcode:'',
            terminalno: '',
            machineno: '',
            serialno: '',
            ptu: '',
            siteno: '',
            modelno: '',
            description: '',
            dateissue: '',
            datevalid: '',
        });
        setisEdit(false)
        setTimeout(() => {
            if (ulcodeRef.current){
                ulcodeRef.current.focus();
                ulcodeRef.current.select();
            }
        }, 500);
}


const CloseModal =() => {
        setOpenaddUsermodal(false)
        setisEdit(false)
}

const handleRetrieveUserData = (index: number) => {
                if (users[index]) {
                  const selectedUser = users[index]; // Retrieve the user data at the specified index
                  setTerminalD({
                    autonum:selectedUser.autonum,
                    ulcode:selectedUser.ul_code,
                    terminalno: selectedUser.terminal_no,
                    description: selectedUser.description,
                    siteno: selectedUser.site_no,
                    serialno: selectedUser.Serial_no,
                    modelno:selectedUser.Model_no,
                    machineno: selectedUser.Machine_no,
                    ptu: selectedUser.PTU_no,
                    dateissue: selectedUser.date_issue,
                    datevalid: selectedUser.date_valid,
                });
                setOpenaddUsermodal(true)
                setisEdit(true)
                setTimeout(() => {
                    if (ulcodeRef.current){
                        ulcodeRef.current.focus();
                        ulcodeRef.current.select();
                    }
                }, 500);
                } else {
                  console.error('Index out of range or user not found');
                }
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
            setTerminalD({
                autonum:'',
                ulcode:'',
                terminalno: '',
                machineno: '',
                serialno: '',
                ptu: '',
                siteno: '',
                modelno: '',
                description: '',
                dateissue: '',
                datevalid: '',
        
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


    return (
        <>
        <Grid container style={{justifyContent:'start',}}>
        
            <Grid item xs={12} sm={8} md={12} lg={12} style={{margin:'10px',padding: '5px',
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
                                }} > Terminal Registration
                            </Typography>
                    </div>

            <div style={{margin:'5px',textAlign:'end',width:'70%'}}>
                <FontAwesomeIcon icon={faPlus} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} onClick={AddUser}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPrint} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} onClick={AddUser}></FontAwesomeIcon>
            </div>
            </div>
            <div className="Transaction-terminal" style={{height:'250px', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '1px' }}>

            <Table className="terminal-table" sx={{
                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                        overflow: 'auto',
                        width:'100%',
                    }}>
                                        <thead>
                                <tr>
                                <th>UL Code</th>
                                <th>Terminal No</th>
                                <th>Description</th>
                                <th>Site No.</th>
                                <th>Serial No.</th>
                                <th>Machine No.</th>
                                <th>Model No.</th>
                                <th>PTU</th>
                                <th>Date Issue</th>
                                <th>Date Valid</th>
                                </tr>
                    

                            </thead>
                            <tbody>
                            {Array.isArray(users) && users.length > 0 ? (
            users.map((item, index) => (
                <tr key={index} onClick={() => handleRetrieveUserData(index)} > 
                <td style={{textAlign:'center'}}>{item.ul_code}</td>
                <td title={item.terminal_no} style={{textAlign:'center'}}>{item.terminal_no}</td>
                <td style={{textAlign:'start'}}>{item.description}</td>
                <td style={{textAlign:'start'}}>{parseInt(item.site_no)}</td>
                <td style={{textAlign:'center'}}>{item.Serial_no}</td>
                <td title={item.Machine_no}>{item.Machine_no}</td>
                <td style={{textAlign:'start'}}>{item.Model_no}</td>
                <td style={{textAlign:'start'}}>{item.PTU_no}</td>
                <td style={{textAlign:'start'}}>{item.date_issue}</td>
                <td style={{textAlign:'start'}}>{item.date_valid}</td>
            
        </tr>
    ))
    ) : (
    <tr>
        <td colSpan={10}>No items in the transaction</td>
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
                                }} >Terminal Registration Setup
                            </Typography>
                               
                                <div  style={{margin:'10px'}}>
                                    <div className="TerminalReg" style={{display:'flex',flexDirection:'row'}}>
                                        <div className="terminal-entry">

                                                    <div className="form-group">
                                                        <label>UL Code.</label>
                                                        <input type='text'  value={TerminalD.ulcode} ref={ulcodeRef}
                                                        onKeyDown={(e) => HandleKeydown(e,ulcodeRef,ulcodeRef,terminalnoRef)}
                                                        onChange={(e) => handleInputChange(e, 'ulcode')}
                                                        />            
                                                    </div>

                                                    <div className="form-group"> 
                                                        <label> Terninal No.</label>
                                                        <input type='text'  value={TerminalD.terminalno} ref={terminalnoRef}
                                                        onKeyDown={(e) => HandleKeydown(e,ulcodeRef,terminalnoRef,sitenoRef)}
                                                        onChange={(e) => handleInputChange(e, 'terminalno')}
                                                        />            
                                                    </div>
                                   
                                            <div className="form-group">
                                                <label>Site No.</label>
                                                <input type='text'  value={parseInt(TerminalD.siteno)} ref={sitenoRef}
                                                onKeyDown={(e) => HandleKeydown(e,terminalnoRef,sitenoRef,modelnoRef)}
                                                onChange={(e) => handleInputChange(e, 'siteno')}
                                                />            
                                            </div>
                                           
                                            <div className="form-group">
                                                <label>Model No.</label>
                                                <input type='text'  value={TerminalD.modelno} ref={modelnoRef}
                                                 onKeyDown={(e) => HandleKeydown(e,sitenoRef,modelnoRef,descriptionRef)}
                                                onChange={(e) => handleInputChange(e, 'modelno')}
                                                />            
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <input type='text'  value={TerminalD.description} ref={descriptionRef}
                                                onKeyDown={(e) => HandleKeydown(e,modelnoRef,descriptionRef,ptuRef)}
                                                onChange={(e) => handleInputChange(e, 'description')}
                                                />            
                                            </div>
                                                 
                                        </div>
                                    
                                        <div className="terminal-entry">
                                            <div className="form-group">
                                                <label>PTU No.</label>
                                                <input type='text'  value={TerminalD.ptu} ref={ptuRef}
                                                onKeyDown={(e) => HandleKeydown(e,descriptionRef,ptuRef,machinenoRef)}
                                                onChange={(e) => handleInputChange(e, 'ptu')}
                                                />            
                                            </div>
                                            <div className="form-group">
                                                <label>Machine No.</label>
                                                <input  type='text'  value={TerminalD.machineno} ref={machinenoRef}
                                                 onKeyDown={(e) => HandleKeydown(e,ptuRef,machinenoRef,serialnoRef)}
                                                onChange={(e) => handleInputChange(e, 'machineno')}
                                                />            
                                            </div>
                                            <div className="form-group">
                                                <label>Serial No.</label>
                                                <input type='text' value={TerminalD.serialno} ref={serialnoRef}
                                                onKeyDown={(e) => HandleKeydown(e,machinenoRef,serialnoRef,dateissueRef)}
                                                onChange={(e) => handleInputChange(e, 'serialno')}
                                                />            
                                            </div>
                                            <div className="form-group">
                                                <label>Date Issue</label>
                                                <input  type='date' value={TerminalD.dateissue} ref={dateissueRef}
                                                onKeyDown={(e) => HandleKeydown(e,serialnoRef,dateissueRef,datevalidRef)}
                                                onChange={(e) => handleInputChange(e, 'dateissue')}
                                                />            
                                            </div>
                                            <div className="form-group">
                                                <label>Date Valid</label>
                                                <input  type='date' value={TerminalD.datevalid} ref={datevalidRef}
                                                         onKeyDown={(e) => HandleKeydown(e,dateissueRef,datevalidRef,datevalidRef)}
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
                        </div>
                        </div>
            )}
               
        </Grid></>
    );
}
export default TerminalRegistration;