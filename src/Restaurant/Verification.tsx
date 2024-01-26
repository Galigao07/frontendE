/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import BASE_URL from '../config';
import axios from 'axios';

interface VerificationData {
    handleClose:() => void;
    VerificationEntry:any
}



const Verification: React.FC<VerificationData> = ({handleClose,VerificationEntry}) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleUsernameChange = (event:any) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event:any) => {
      setPassword(event.target.value);
    };

    const UserRef = useRef<HTMLInputElement>(null)
    
    const PasswordRef = useRef<HTMLInputElement>(null)

    const OkRef = useRef<HTMLButtonElement>(null)
    const ExitRef = useRef<HTMLButtonElement>(null)
  
    const handleVefication = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/verification/`, {
                params:{
                username : username,
                password : password
                }
              });
              if (response.status==200){
                const { Info }: { Info?: any } = response.data; // Adjust 'Info' type as per the actual structure
                if (Info) {
                  const { UserRank, FullName}: any = Info; // Adjust types as per the actual structure
                  VerificationEntry({
                    Veriusername:username,
                    VeriuserRank:UserRank,
                    VeriFullname:FullName
                })
                } }
        } catch{
                console.log('error')
        }
    };

    useEffect(() => {
      if (UserRef.current) {
        UserRef.current.focus();
      }
    }, []);


    const HandleKeydown = (e:any,CurrentRef:any,NextRef:any) => {
    

      if (e.key == 'Enter'){

        if (NextRef.current){
          NextRef.current.focus()
          NextRef.current.select()
        }
        

      }
      
    }

    
    const HandleButtonKeydown = (e:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) => {

      if(e.key == 'ArrowRight' || e.key == 'ArrowDwon'){
        if (NextRef.current){
          NextRef.current.focus();
        }
      }else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
        if (BackRef.current){
          BackRef.current.focus();
        }
      }

      if (e.key == 'Enter'){
        if (index == 0) {
          handleVefication();
        }else if (index == 1){
          handleClose()
        }
      }
      
    }

  
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="Verification-Container" style={{display:'flex',flexDirection:'column'}}>
            <div style={{margin:'10px'}}>
            <Typography      
                    sx={{
                    fontSize: { xs: '1rem', sm: '0.9rem', md: '0.9rem', lg: '1.1rem', xl: '1.8rem' },
                    color: '#ffffff',backgroundColor: '#007bff',
                    padding: '5px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    borderRadius: '5px',
                    fontWeight: 'bold', textAlign: 'center',
                    width:'100%',
                    fontStyle:'italic'
                    }}>
                    Verification
                </Typography>

            </div>
           
            <div style={{margin:'10px'}}>
      
                <div>
                      <label htmlFor="username">Username</label>
                      <input
                        id="username"
                        ref={UserRef}
                        type="text"
                        autoComplete="off"
                        style={{ width: '100%' }}
                        onChange={handleUsernameChange}
                        onKeyDown={(e)=> HandleKeydown(e,UserRef,PasswordRef)}
                      />

                      <div>
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          ref={PasswordRef}
                          type="password"
                          autoComplete="off"
                          style={{ width: '100%' }}
                          onChange={handlePasswordChange}
                          onKeyDown={(e)=> HandleKeydown(e,PasswordRef,OkRef)}
                        />
                      </div>
                    </div>
            </div>
            <div style={{width:'100%' ,display:'flex',flexDirection:'row',justifyContent:'space-around'}}>
              <Button tabIndex={0} ref={OkRef} 
                      onKeyDown={(e)=> HandleButtonKeydown(e,ExitRef,OkRef,ExitRef,0)}
              variant="contained"  onClick={handleVefication} 
              style={{width:'49%',backgroundColor:'blue'}}>
                OK
              </Button>


              <Button  tabIndex={1} ref ={ExitRef} 
              onKeyDown={(e)=> HandleButtonKeydown(e,OkRef,ExitRef,OkRef,1)}
              variant="contained"  onClick={handleClose} 
              style={{width:'49%',backgroundColor:'red'}}>
                Exit
              </Button>


            </div>
          </div>
        </div>
      </div>
    );
}

export default Verification;