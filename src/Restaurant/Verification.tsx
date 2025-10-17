/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import {BASE_URL} from '../config';
import axios from 'axios';
import { isDesktop } from 'react-device-detect';
import OnScreenKeyboardNumeric from './KeyboardNumericGlobal';
import OnScreenKeyboard from './KeyboardGlobal';
import showErrorAlert from '../SwalMessage/ShowErrorAlert';
import { setGlobalIsLoading } from '../globalSlice';
import { useDispatch } from 'react-redux';

interface VerificationData {
    handleClose:() => void;
    VerificationEntry:any
}



const Verification: React.FC<VerificationData> = ({handleClose,VerificationEntry}) => {
    const dispatch = useDispatch();
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
      dispatch(setGlobalIsLoading(true));
        try {
            const response = await axios.get(`${BASE_URL}/api/verification/`, {
                params:{
                username : username,
                password : password
                },withCredentials:true
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
                localStorage.setItem('Discounted_by',FullName)
                   dispatch(setGlobalIsLoading(false));
                } }else{
                        dispatch(setGlobalIsLoading(false));
                  showErrorAlert('Wrong username or Password!!')
                    
                }
        } catch{
              dispatch(setGlobalIsLoading(false));
          showErrorAlert('Wrong username or Password!!')
              
        }
    };

    useEffect(() => {
      if (UserRef.current) {
        UserRef.current.focus();
      }
    }, []);


    const HandleKeydown = (e:any,CurrentRef:any,NextRef:any) => {
    

      if (e.key == 'Enter'){
        e.preventDefault();
        if (NextRef.current){
          NextRef.current.focus()
        }
        

      }
      
    }

    
    const HandleButtonKeydown = (e:any,BackRef:any,CurrentRef:any,NextRef:any,index:any) => {
      e.preventDefault();
      if(e.key == 'ArrowRight' || e.key == 'ArrowDwon'){
        if (NextRef.current){
          NextRef.current.focus();
        }
      }else if (e.key == 'ArrowLeft' || e.key == 'ArrowUp') {
        if (BackRef.current){
          BackRef.current.focus();
        }
      }

      if (e.key == 'Enter' && CurrentRef.current){
        
        if (index == 0) {
          handleVefication();
        }else if (index == 1){
          handleClose()
        }
      }
      
    }


    useEffect(() => {
      const handleKeyPress = (e: KeyboardEvent) => {
  
  
        if (e.key === 'F5') {
          e.preventDefault(); // Prevent the default browser refresh action for F5
        }
        else if (e.ctrlKey && e.key === 'n') {
          e.preventDefault(); // Prevent the default browser action for Control + N
        }
        else if (e.ctrlKey && e.key === 's') { // Control + S
          e.preventDefault();
          handleVefication();
        } else if (e.key === 'Escape') {
          e.preventDefault(); 
          handleClose();
        }
      };
    
      window.addEventListener('keydown', handleKeyPress);
    
      return () => {
        window.removeEventListener('keydown', handleKeyPress);
      };
    }, []);  

  

    const [focusedInput, setFocusedInput] = useState<any>('');
    const [focusedInput2, setFocusedInput2] = useState<any>('');
    const [cursorPosition, setCursorPosition] = useState<any>(0);
    const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);
    const [isShowKeyboard, setisShowKeyboard] = useState<boolean>(false);
    const [isShow, setisShow] = useState<boolean>(false);

    const showOnScreenKeybaord = (ref:any) => {
      if (isDesktop){
     
          if (ref === 'username'){
            setFocusedInput2(username)
          }else{
            setFocusedInput2(password)
          }
          setisShowKeyboard(true)
          setFocusedInput(ref)
        
      }

    }

    const ShowKeyorNot = () => {
      setisShow(!isShow);
    }
    const setvalue = (value: any) => {
      if (focusedInput) {
       if (focusedInput ==='username'){
          setUsername(value)
       } else{
        setPassword(value)
       }

      }
      setisShowKeyboard(false)
    };
    const closekeyBoard = () => {
      setisShowKeyboard(false)
    }

    return (
      <div>

    
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
                        value={username}
                        onChange={handleUsernameChange}
                        onKeyDown={(e)=> HandleKeydown(e,UserRef,PasswordRef)}
                        // onFocus={()=> showOnScreenKeybaord('username')}
                        onClick={()=> showOnScreenKeybaord('username')}  
                      />

                      <div>
                        <label htmlFor="password">Password</label>
                        <input
                          id="password"
                          ref={PasswordRef}
                          type="password"
                          autoComplete="off"
                          style={{ width: '100%' }}
                          value={password}
                          // onFocus={()=> showOnScreenKeybaord('password')}
                          onClick={()=> showOnScreenKeybaord('password')}
                          onChange={handlePasswordChange}
                          onKeyDown={(e)=> HandleKeydown(e,PasswordRef,OkRef)}
                        />
                      </div>
                    </div>
            </div>
            <div style={{width:'100%' ,display:'flex',flexDirection:'column',justifyContent:'space-around'}}>
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


              <div className='key-button'>
                {/* <Button className="btn-show"  type='button'  style={{height:'20px',fontSize:'10px',width:'100%',
                backgroundColor:'blue'}}
                  onClick={ShowKeyorNot}>Keyboard {isShow ? 'Disable':'Enable'}
                </Button> */}
              </div>
   

            </div>
          </div>
        </div>
        </div>
        {isShowKeyboard && <OnScreenKeyboard  handleclose = {closekeyBoard} currentv={focusedInput2} setvalue={setvalue}/>}
      </div>
    );
}

export default Verification;