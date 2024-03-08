/* eslint-disable @typescript-eslint/no-explicit-any */
import  {useRef, useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import './login.css';
import logo from './logo.png';
import Swal from 'sweetalert2';
import BASE_URL from '../config';
import { isMobile, isTablet, setUserAgent } from 'react-device-detect';
import { Typography } from '@mui/material';
  const LoginForm: React.FC  = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const loginBtnRef = useRef<HTMLButtonElement>(null);
    // const ulCodeRef = useRef(null);
    // const loginBtnRef = useRef(null);

    const [formData, setFormdata] = useState({
        username: '',
        password: ''
    });




    const [deviceType, setDeviceType] = useState<string>('');


    useEffect(() => {
      setTimeout(() => {
        if (usernameRef.current){
          usernameRef.current.focus();
          usernameRef.current.select();
        }
      }, 100);


    },[])



    useEffect(() => {
      const checkDeviceType = () => {
        if (isMobile) {
          setDeviceType('Mobile');
        } else if (isTablet) {
          setDeviceType('Tablet');
        } else {
          setDeviceType('Desktop');
        }
      };
  
      checkDeviceType();
  
      const handleResize = () => {
        checkDeviceType();
      };
  
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);



    useEffect(() => {
      const channel = new BroadcastChannel('my-channel');
  
      // Add an event listener to listen for logout messages
      channel.onmessage = (event) => {
        const message = event.data;
      if (message.type === 'login') {

        window.location.reload();
        }

      };
  
      // Clean up the event listener when the component unmounts
      return () => {
        channel.close();
      };
    // eslint-disable-next-line no-use-before-define
    }, []);
    

  const { username, password } = formData;

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormdata({ ...formData, [e.target.name]: e.target.value});


  const handleLogin = async () => {

    try {
      const response = await axios.get(`${BASE_URL}/api/login/`, {
        params:{
        username : username,
        password : password
        }
      });
  
      if (response.status === 200) {
        console.log(response.data);
        const { Info }: { Info?: any } = response.data; // Adjust 'Info' type as per the actual structure
        if (Info) {
          const { UserRank, FullName, UserID, UserName, TerminalNo, SiteCode,TransID }: any = Info; // Adjust types as per the actual structure
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('UserRank', UserRank);
          localStorage.setItem('FullName', FullName);
          localStorage.setItem('UserID', UserID);
          localStorage.setItem('UserName', UserName);
          localStorage.setItem('TerminalNo', TerminalNo);
          localStorage.setItem('SiteCode', SiteCode);
          localStorage.setItem('TransID', TransID);
          window.location.reload();
          // Process the extracted data as needed
        }
  
   
        // channel.postMessage({ type: 'login' });
      }
    } catch (error) {
      Swal.fire({
        title: 'Log in Error',
        text: 'Error Username or Password',
        icon: 'info',
        confirmButtonText: 'OK'
      });
    }
  };
  
const onSubmit = async (event:any) => {
  event.preventDefault();
  
  
  };

 

const closeApp = () => {
  if (window.electronAPI) {
    window.electronAPI.closeApp();
  } else {
    console.error('electronAPI is not available');
  }
};

const handleKeyDown = (event :any, BackRef : any, nextRef:any) => {
  if (event.key === 'Enter')  {
    event.preventDefault();


      if (nextRef.current) {
        nextRef.current.focus();
        nextRef.current.select();
      }
    

  }
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    if (BackRef.current) {
      BackRef.current.focus();
      BackRef.current.select();
    }
  }

  if (event === 'Enter') {
    if (nextRef.current) {
      nextRef.current.focus();
      nextRef.current.select();
    }
  }
};

const [cursorPosition, setCursorPosition] = useState<any>(0);
const [guestCountFocus, setGuestCountFocus] = useState<boolean>(false);

const showOnScreenKeybaord = () => {

}
const handleBackspace = () => {
  // Detect backspace press and handle it accordingly
  if (usernameRef && cursorPosition > 0) {
    const updatedValue =
     username.slice(0, cursorPosition - 1) + username.slice(cursorPosition);

    setCursorPosition(cursorPosition - 1);
  } else if (passwordRef && cursorPosition > 0) {
    const updatedValue =
    password.slice(0, cursorPosition - 1) + password.slice(cursorPosition);
    setCursorPosition(cursorPosition - 1);
  }
};
const handleClear = () => {
  // Detect the clear action and handle it accordingly
  // if (guestCountFocus) {
  //   setGuestCount(0);
  //   setCursorPosition(0);
  // } else if (customerFocus) {
  //   setCustomer('');
  //   setCursorPosition(0);
  // } else if (waiterFocus) {
  //   setWaiter('');
  //   setCursorPosition(0);
  // }
};

const alphabetRows = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'],
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'Enter'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Shift','Clear'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '.','/', '@','Control']
];

const rows = alphabetRows.map((row, rowIndex) => (
  <div className="keyboard-row" key={rowIndex}>
    {row.map((letter, index) => (
      <button
        className="keyboard-key"
        key={index}
        onClick={() => handleSpecialButtonClick(letter)}
        aria-label={letter}
      >
         <Typography sx={{
          fontSize: { xs: '0.5rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' }
            }}>
        {letter}
        </Typography>
      </button>
    ))}
  </div>
));


const handleSpecialButtonClick = (value:any) => {
  switch (value) {
    case 'Enter':
      // if (guestCountFocus) {
      //   handleKeyDown('Enter', GuestCountRef, WaiterRef);
      // } else if (customerFocus) {
      //   handleKeyDown('Enter', CustomerRef, GuestCountRef);
      // } else if (waiterFocus) {
      //   handleKeyDown('Enter', WaiterRef, CustomerRef);
      // }
      break;
    case 'Backspace':
      handleBackspace();
      break;
    case 'Shift':
      // Handle Shift key functionality
      break;
    case 'Control':
      // Handle Control key functionality
      break;
    case 'Clear':
          handleClear();
          break;
    default:
      // Handle other keys (letters or numbers)
      // handleButtonClick(value);
      break;
  }
};

  return (
    <form onSubmit={onSubmit}>
      
  <div className="container" style={deviceType === 'Mobile' ? { width: '100%', height: '100vh' } : {}}>
  <div className="login-form" style={deviceType === 'Desktop' ? { width: '450px' } : { width: '320px',height: '100vh' }}>
    <div className="login-row" style={{display:'flex',flexDirection:'column'}}>
      {/* <div className="login-header">
        <div className="header-img">
          <img className="header-logo" src={logo} alt="Logo" />
        </div>
      </div> */}

<div>
      <p>Device type: {deviceType}</p>
      {/* Your component's content */}
    </div>
      <div className="login-header">
      <div className="header-img">
        <img src={logo} alt="Logo"
          style={{  maxWidth: '90%', height: 'auto',
            display: 'block', marginLeft: 'auto', marginRight: 'auto',
          }}/>
      </div>
    </div>
      
      <div className="login-body">
        <div className="header-name">
          <h3>Restaurant POS</h3>
        </div>
        
        <div className='form-group'>
          <input
            className='login-input'
            type='text'
            name='username'
            ref={usernameRef}
            onFocus={showOnScreenKeybaord}
            onChange={(e) => onChange(e)}
            value={username}
            placeholder="Username"
            autoComplete="off"
            onKeyDown={(e) => handleKeyDown(e, usernameRef, passwordRef)}  
            required
          />
        </div>
        
        <div className='form-group'>
          <input
            className='login-input'
            type='password'
            name='password'
            ref={passwordRef}
            onChange={(e) => onChange(e)}
            value={password}
            placeholder="Password"
            autoComplete="off"
            onKeyDown={(e) => handleKeyDown(e, usernameRef, loginBtnRef)}  
            required
          />
        </div>
        
        
        <div className='Login-Button-Container'>
          <button className="btn-login" type='submit' ref={loginBtnRef} onClick={handleLogin}  >
            Login
          </button>
          <button className="btn-exit"  type='button'  onClick={closeApp}>
            Exit
          </button>
          
        </div>
      </div>
      <div className="login-footer">
        {/* Footer content */}
      </div>
    </div>
  </div>
</div>

    </form>
        
  );
};


export default LoginForm;
