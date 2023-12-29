/* eslint-disable @typescript-eslint/no-explicit-any */
import  {useRef, useState, useEffect, ChangeEvent } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './index.css';
import logo from './logo.png';
import Swal from 'sweetalert2';
import BASE_URL from '../config';
import { isMobile, isTablet } from 'react-device-detect';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';

  const LoginForm: React.FC  = () => {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    // const ulCodeRef = useRef(null);
    const loginBtnRef = useRef(null);

    const [formData, setFormdata] = useState({
        username: '',
        password: ''
    });




    const [deviceType, setDeviceType] = useState<string>('');

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

  
    // const config = {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //     'X-CSRFToken': localStorage.csrfToken as string // Assuming localStorage.csrfToken is a string
    //   },
    //   // withCredentials: true
    // };
  
    // const body = JSON.stringify({ username, password });
  if (isMobile){
    localStorage.setItem('isLogin', 'true');
    localStorage.setItem('UserRank', 'SalesMan');
    localStorage.setItem('FullName', 'FullName');
    localStorage.setItem('UserID', '99999');
    localStorage.setItem('UserName', 'SalesMan');
    localStorage.setItem('TerminalNo', '1');
    localStorage.setItem('SiteCode', '121');
    window.location.reload();
  }
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
          const { UserRank, FullName, UserID, UserName, TerminalNo, SiteCode }: any = Info; // Adjust types as per the actual structure
          localStorage.setItem('isLogin', 'true');
          localStorage.setItem('UserRank', UserRank);
          localStorage.setItem('FullName', FullName);
          localStorage.setItem('UserID', UserID);
          localStorage.setItem('UserName', UserName);
          localStorage.setItem('TerminalNo', TerminalNo);
          localStorage.setItem('SiteCode', SiteCode);
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
  
const onSubmit = async () => {
  

  const config = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken':   localStorage.csrfToken
    },
    // withCredentials: true
};

const body = JSON.stringify({ username, password});

// const BASE_URL = 'http://localhost:8000'; 

try{
    const response = await axios.post(`${BASE_URL}/api/login/`,body, config);


    if (response.status === 200) {
      console.log(response.data); 
      const { Info } = response.data;
      if (Info) {
        const { UserRank, FullName, UserID, UserName,TerminalNo,SiteCode } = Info;
        localStorage.setItem('isLogin','true')
        localStorage.setItem('UserRank', UserRank);
        localStorage.setItem('FullName', FullName);
        localStorage.setItem('UserID', UserID);
        localStorage.setItem('UserName', UserName);
        localStorage.setItem('TerminalNo', TerminalNo);
        localStorage.setItem('SiteCode', SiteCode);



        // Process the extracted data as needed
      }


      window.location.reload();
      // channel.postMessage({ type: 'login' });
    }
  } catch {
    Swal.fire({
      title: 'Log in Error',
      text: 'Error Username or Password',
      icon: 'info',
      confirmButtonText: 'OK'
    });
  }
};




  
  return (
    <form>
      
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
            onChange={(e) => onChange(e)}
            value={username}
            placeholder="Username"
            autoComplete="off"
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
            required
          />
        </div>
        
        
        <div className='form-group'>
          <button className="btn-login" type='button' ref={loginBtnRef} onClick={handleLogin}>
            Login
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
