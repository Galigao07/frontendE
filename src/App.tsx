/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from 'react'

import './App.css'
import './homepage.css'
import './HeaderdropDown.css'
import LoginForm from './LoginComponent/login'
import Swal from "sweetalert2"
import Profile from './Dashboard/profile'
import {Router, Routes, useNavigate, Link,Route, NavLink} from "react-router-dom";
// import CashReceipt from "../TaskPane/cashReceipt";
import Restaurant from './Restaurant/restaurant';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faListAlt, faPowerOff, faReceipt } from '@fortawesome/free-solid-svg-icons';
import UserProfile from './Reference/UserProfile'
import WaiterProfile from './Reference/WaiterProfile'
import TableList from './Reference/TableList'
import Homepage from './Home/home'
import VideoUpload from './Reference/video'
import TerminalRegistration from './Reference/TerminalRegistration'
import SupplierSetup from './Reference/SupplierSetup'
import ClientSetup from './Reference/ClientSetup'
import CustomerDetails from './Reference/CustomerDetails'
import SupplierDetails from './Reference/SupplierDetails'
import CashCount from './Taskpane/CashCount'
import XreadZred from './Taskpane/XreadZread'
import CostofSalesAccountTagging from './Adminitration/CostofSalesAccountTagging'
import MultiplePriceTypeSiteSetup from './Adminitration/MultiplePriceTypeSiteSetup'
import TaggingofSaslesCategoryList from './Adminitration/TaggingofSaslesCategoryList'
import TaggingPerTerminal from './Adminitration/TaggingPerTerminal'
import ReprintXReadandZRead from './Taskpane/ReprintXReadandZRead'
import SalesReports from './Taskpane/SalesReports'
import SystemSettings from './Adminitration/SystemSettings'
import ProductProfile from './Reference/ProductProfile'
import ProductPrintCategory from './Reference/ProductPrintCategory'


// import OnlineTestApp from './OnlineTestApp';
// import electron, { BrowserWindow } from 'electron';

// import { Provider } from 'react-redux';
// import store from './Redux/store';
import { createBrowserHistory } from 'history';
import DebitCardTagging from './Adminitration/Setup'
import Setup from './Adminitration/Setup'
import showErrorAlert from './SwalMessage/ShowErrorAlert'
import { BASE_URL } from './config'
import axios from 'axios'

const history = createBrowserHistory();
function App() {
  const navigate = useNavigate();
  // const [count, setCount] = useState(0)

  // return (
  //   <>
  //     <div>
  //       <a href="https://electron-vite.github.io" target="_blank">
  //         <img src={viteLogo} className="logo" alt="Vite logo" />
  //       </a>
  //       <a href="https://react.dev" target="_blank">
  //         <img src={reactLogo} className="logo react" alt="React logo" />
  //       </a>
  //     </div>
  //     <h1>Vite + React</h1>
  //     <div className="card">
  //       <button onClick={() => setCount((count) => count + 1)}>
  //         count is {count}
  //       </button>
  //       <p>
  //         Edit <code>src/App.tsx</code> and save to test HMR
  //       </p>
  //     </div>
  //     <p className="read-the-docs">
  //       Click on the Vite and React logos to learn more
  //     </p>
  //   </>
  // )
// }

const [show,setShow] =  useState<boolean>(false)
const [active,setActive] =  useState<string>("")
const [Rank,setRank] =  useState<boolean>(false)

const isLogin = localStorage.getItem('isLogin') === 'true';
// const PrintSO = localStorage.setItem('PrintSO','false');
const PrintSO = localStorage.getItem('PrintSO') === 'true';
const userRank = localStorage.getItem('UserRank');
const [openReports,setopenReports] = useState<boolean>(false)

// if (userRank === 'Cashier') {
//   // Perform actions specific to the 'Admin' user rank
//  setRank(true)
// } else {
//   // Perform actions for other user ranks
//   console.log('User is not an Admin');
// }


// -----------------------------FILE DROPDOWN-----------------------
//#region 
  const [ARsummaryVisible, setARsummaryVisible] = useState(false);
  const [cuztomizedVisible, setCuztomizedVisible] = useState(false);
  const [billingStatementVisible, setBillingStatementVisible] = useState(false);

  const handleCuztomizedClick = () => {
    setCuztomizedVisible(!cuztomizedVisible);
    setARsummaryVisible(false);
    setBillingStatementVisible(false);
  };

  const handleARSummaryClick = () => {
    setARsummaryVisible(!ARsummaryVisible);
  //   setCuztomizedVisible(false);
    setBillingStatementVisible(false);
  };

    const handleBillingStatementClick =  async () => {
    setBillingStatementVisible(!billingStatementVisible);
  //   setCuztomizedVisible(false);
    setARsummaryVisible(false);
  };
//#endregion
 


// -----------------------------REFERENCE DROPDOWN-----------------------
//#region 
  const [subsidiaryVisible, setSubsidiaryVisible] = useState(false);
  const handleSubsidiaryClick = () => {
    setSubsidiaryVisible(!subsidiaryVisible);
    setslcategoriesyVisible(false);
    setRefNumberSetupVisible(false);
    setBankVisible(false);
  };

  const [slcategoriesVisible, setslcategoriesyVisible] = useState(false);
  const handleSlcategoriesClick = () => {
      setslcategoriesyVisible(!slcategoriesVisible);
      setSubsidiaryVisible(false);
      setRefNumberSetupVisible(false);
      setBankVisible(false);
  };

  const [RefNumberSetupVisible, setRefNumberSetupVisible] = useState(false);
  const handleRefNumberSetupClick = () => {
      setRefNumberSetupVisible(!RefNumberSetupVisible);
      setSubsidiaryVisible(false);
      setslcategoriesyVisible(false);
      setBankVisible(false);
  };

  const [BankVisible, setBankVisible] = useState(false);
  const handleBankClick = () => {
      setBankVisible(!BankVisible);
      setSubsidiaryVisible(false);
      setslcategoriesyVisible(false);
      setRefNumberSetupVisible(false);
  };

//#endregion


// -----------------------------ADMINITRASTION DROPDOWN-----------------------

//#region 
const [SystemConfigVisible, setSystemConfigVisible] = useState(false);
const handleSystemConfigClick = () => {
  setSystemConfigVisible(!SystemConfigVisible);
  setUnpostRepostVisible(false);
  setDeleteClearVisible(false);
  setUploadinDatarVisible(false);
};

// -----------------------------ADMINITRASTION  System config DROPDOWN-----------------------


const [TransactionTypeVisible, setTransactionTypeVisible] = useState(false);
const handleTransactionTypeClick = () => {
  setTransactionTypeVisible(!TransactionTypeVisible);
};
const [withHeldTaxVisible, setwithHeldTaxVisible] = useState(false);
const handlewithHeldTaxClick = () => {
  setwithHeldTaxVisible(!withHeldTaxVisible);
};

const [CardMachineVisible, setCardMachineVisible] = useState(false);
const handlCardMachineClick = () => {
  setCardMachineVisible(!CardMachineVisible);
};

const [UnpostRepostVisible, setUnpostRepostVisible] = useState(false);
const handleUnpostRepostClick = () => {
  setUnpostRepostVisible(!UnpostRepostVisible);
  setSystemConfigVisible(false);
  setDeleteClearVisible(false);
  setUploadinDatarVisible(false);
};

const [DeleteCleartVisible, setDeleteClearVisible] = useState(false);
const handleDeleteClearClick = () => {
  setDeleteClearVisible(!DeleteCleartVisible);
  setUnpostRepostVisible(false);
  setSystemConfigVisible(false);
  setUploadinDatarVisible(false);
};

const [UploadinDataVisible, setUploadinDatarVisible] = useState(false);
const handleUploadinDataClick = () => {
  setUploadinDatarVisible(!UploadinDataVisible);
  setDeleteClearVisible(false);
  setUnpostRepostVisible(false);
  setSystemConfigVisible(false);

};


const [UtilityVisible, setUtilityVisible] = useState(false);
const handleUtilityClick = () => {
  setUtilityVisible(!UtilityVisible);


};
//#endregion



const [localIpAddress, setLocalIpAddress] = useState('');

// useEffect(() => {
//   const fetchIpAddress = async () => {
//     try {
//       const response = await fetch('https://api64.ipify.org?format=json');
//       const data = await response.json();
//       const publicIpAddress = data.ip;

//       // Extract local IP address from the public IP address (assuming it's in the same local network)
//       const localIpRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
//       const match = publicIpAddress.match(localIpRegex);

//       if (match) {
//         setLocalIpAddress(match[0]);
//         console.log('sss',match[0])
//       } else {
//         setLocalIpAddress('Unable to determine local IP address');
//       }
//     } catch (error) {
//       console.error('Error fetching IP address:', error);
//       setLocalIpAddress('Error fetching IP address');
//     }
//   };

//   fetchIpAddress();
// }, []);





const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

const logoutClick = async () => {

    swalWithBootstrapButtons.fire({
        title: 'Confirmation',
        text: "Do you want logout?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
       localStorage.isLogin = false
            // try {
            //     const instance = axios.create({
            //         xsrfHeaderName: 'X-CSRFToken',     
            //         xsrfCookieName: 'csrftoken',    
            //     });
            //         const headers = {
            //             'X-CSRFToken':  localStorage.csrfToken
            //         };

            //         instance.post('http://localhost:8000/api/logout', {}, {
            //         withCredentials: true,  // Send cookies along with the request
            //         headers: headers  // Include the CSRF token in the headers
            //     })
            
            //     .then(() => {
            //         localStorage.removeItem('username');
            //         localStorage.removeItem('token');
            //         localStorage.removeItem('setLogin');
            //         localStorage.removeItem('csrfToken');
              
                    window.location.reload();
            //     })

            // } catch (error) {
            //      console.error('Error during logout:', error);
            // }
        } 
      })

  };


  const handleClick = () => {
    navigate(`/TaskPane/`);
  };

  // const handleClick = (route: string): void => {
  //   history.push(`/TaskPane/${route}`);
  // };

  // const handleClick = () => {
  //   history.push(`/TaskPane/`);
  // };

  useEffect(() =>{
    console.log('asdasdddddddddddddddddddddddddddddddddddd')

  },[])


  
  useEffect(() => {
    const sidebutton = document.getElementById('sidebutton');
    const sidebutton1 = document.getElementById('sidebutton1');
    const sidebutton2 = document.getElementById('sidebutton2');
    const sidebutton3 = document.getElementById('sidebutton3');
  
    if (show) {
      // If show is true, set the width to '75%' for all relevant elements
      if (sidebutton) {
        sidebutton.style.width = '75%';
      }
      if (sidebutton1) {
        sidebutton1.style.width = '75%';
      }
      if (sidebutton2) {
        sidebutton2.style.width = '75%';
      }
      if (sidebutton3) {
        sidebutton3.style.width = '75%';
      }
    } else {
      // If show is false, set the width to '20%' for all relevant elements
      if (sidebutton) {
        sidebutton.style.width = '20%';
      }
      if (sidebutton1) {
        sidebutton1.style.width = '20%';
      }
      if (sidebutton2) {
        sidebutton2.style.width = '20%';
      }
      if (sidebutton3) {
        sidebutton3.style.width = '20%';
      }
    }
  }, [show]);
  


  return (



    <div> 
      {isLogin ? (
        userRank === 'Cashier' || userRank === 'Salesman' ? (
            <Restaurant/>
        ) : (

          <main className={show ? 'space-toggle' : ''}>
        
          <Content/> 

          <header className={`header ${show ? 'space-toggle' : ''}`}>
              <div className="header-toggle" >
                  <i className="fas fa-bars" onClick={() => setShow(!show)}></i>
                  </div>
             < >
               <div className="btn" style={{position:'absolute',marginLeft:'40px'}}>
                 <div className="dropdown">
                   <button className="dropbtn">File <i className="fas fa-caret-down"></i></button>
                   <div className="dropdown-content">
   
                       <div className="nested11-dropdown">
                         <NavLink to="#" id="cuztomizedid" onClick={handleCuztomizedClick} className="link-with-icon" >Customized Reports<i className="fas fa-caret-down"></i></NavLink>
                         
                                   <div className="nested11-dropdown-content" id="cuztomizedidContent" style={{ display: cuztomizedVisible ? 'block' : 'none' }}>
                                    
                                     <div className="nested12-dropdown" >
                                       <NavLink to="#" onClick={handleBillingStatementClick} id="billingstatementid"  className="link-with-icon" style={{width: '95%'}}>Billing Statement<i className="fas fa-caret-down"></i></NavLink>
                                       <div className="nested12-dropdown-content" id="billingstatementidcontent" style={{ display: billingStatementVisible ? 'block' : 'none' }}>
                                         <NavLink to="#">Posted Transactions</NavLink>
                                         <NavLink to="#">Un-Posted Transactions</NavLink>
                                       </div>
                                     </div>
                 
                                     <div className="nested13-dropdown" >
                                       <NavLink to="#" id="ARsummaryid"  onClick={handleARSummaryClick} className="link-with-icon" style={{width: '95%'}}>AR Summary<i className="fas fa-caret-down"></i></NavLink>
                                       <div className="nested13-dropdown-content" id="ARsummaryidContent" style={{ display: ARsummaryVisible ? 'block' : 'none' }}>
                                         <NavLink to="#">Posted Transactions</NavLink>
                                         <NavLink to="#">Un-Posted Transactions</NavLink>
                                    
                                       </div>
                                     </div>
               
                                     <NavLink to="#">Payment Details Reports</NavLink>
                                     <NavLink  to="#">Collection Reports</NavLink>
                                     <NavLink  to="#">Customer (Source Data)</NavLink>
                                     <NavLink to="#">Open Account Billing</NavLink>
                                     <NavLink  to="#">Check Acknowledgment Logbook</NavLink>
                                     <NavLink to="#">Payable - RR/DR/SI Reports</NavLink>
                                     <NavLink  to="#">Input Tax Reports</NavLink>
                                     <NavLink  to="#">Document Posting Status</NavLink>
                                     <NavLink  to="#">Cancel Document Status</NavLink>
                                     <NavLink to="#">Cuztomized Aging Analysis Report</NavLink>
                                     <NavLink to="#">Payables</NavLink>
                                     <NavLink  to="#">Receivables</NavLink>
                                    </div>
                      </div>
                        <NavLink to="/Supplier-Setup">Supplier Details Setup</NavLink>
                       <NavLink to="#">Change Unit Location</NavLink>
                       <NavLink to="#">Log as Different User</NavLink>
                       <NavLink to="#">Exit Program</NavLink>
                   </div>
               </div>
               <div className="dropdown">
                 <button className="dropbtn">Reference <i className="fas fa-caret-down"></i></button>
                 <div className="dropdown-content">
                     <NavLink     to="/Product-Profile">Product Profile</NavLink>
                     <NavLink     to="WaiterProfile">Waiter List</NavLink>
                     <NavLink     to="/Customer-Details" >Customer Details</NavLink>
                     <NavLink     to="/Supplier-Details" >Supplier Details</NavLink>
                     <NavLink     to="TableList">Table List</NavLink>
                     <NavLink     to="/Product-Print-Category">Product Print Category</NavLink>
                     <NavLink     to="/chartofaccounts" target="_blank">POS Site Code</NavLink>
                     <NavLink     to="/Video">Change Video</NavLink>
                 
                 </div>
               </div>
   
               <div className="dropdown">
                   <button className="dropbtn">Adminitration <i className="fas fa-caret-down"></i></button>
                   <div className="dropdown-content">
                       <NavLink    to="userProfile">User Account Control</NavLink> 
                       <NavLink  to="{% url 'UserDeatials' %}">POS Transaction</NavLink> 
   
                     <div className="nested7-dropdown" >
                       <NavLink   to="#" id="unpostid" onClick={handleUnpostRepostClick} className="link-with-icon">Unpost Transaction<i className="fas fa-caret-down"></i></NavLink>
                       <div className="nested7-dropdown-content" id="unpostidcontent" style={{ display : UnpostRepostVisible ? 'block' : 'none'}}>
                           <NavLink    to="#">By Date Transaction</NavLink>
                           <NavLink    to="#">By Reference No</NavLink>
                       </div>
                     </div>
   
   
                     <div className="nested4-dropdown" >
                       <NavLink to="#" id="systemconfigid" onClick={handleSystemConfigClick} className="link-with-icon" >System Configuration<i className="fas fa-caret-down"></i></NavLink>
                       <div className="nested4-dropdown-content" id="systemconfigidcontent" style={{display: SystemConfigVisible ? 'block' : 'none'}}>
                           <NavLink    to="#">POS Settings </NavLink>
   
                           <div className="nested5-dropdown" >
                             <NavLink to="#" id="transtypesetupid" onClick={handleTransactionTypeClick} className="link-with-icon" style={{width: '95%'}}>Tagging of Sales Transaction<i className="fas fa-caret-down"></i></NavLink>
                             <div className="nested5-dropdown-content" id="transtypesetupidcontent" style={{display : TransactionTypeVisible ? 'block' : 'none'}}>
                                 <NavLink   to="/Debit-Account-Sales-Transaction">Debit Accounts for Sales</NavLink>
                                 <NavLink   to="/Credit-Account-Sales-Transaction">Credit Accounts for Sales</NavLink>
                                 <NavLink   to="/Tagging-of-sales-Category-List">Per Category</NavLink>
                                 <NavLink   to="/Tagging-per-terminal">Per Terminal</NavLink>
                         
                             </div>
                           </div>
   
                           <NavLink   to="/cost-of-sales">Cost of Sales Account Tagging</NavLink>
                           <NavLink   to="/Setup-SL-Per-terminal">Tagging of SL Account for Sales</NavLink>
   
   
                         <div className="nested6-dropdown" >
                           <NavLink to="#" id="Withheldtaxid"  onClick={handlCardMachineClick}  className="link-with-icon">Card Machine and Acct Tittle Tagging<i className="fas fa-caret-down"></i></NavLink>
                           <div className="nested6-dropdown-content" id="Withheldtaxidcontent" style={{display : CardMachineVisible ? 'block' : 'none'}}>
                               <NavLink   to="/Credit-Card">Credit Card</NavLink>
                               <NavLink   to="/Debit-Card">Debit Card</NavLink>
     
                       
                           </div>
                         </div>
   
   
                         <div className="nested7-dropdown" >
                           <NavLink  to="#" id="Withheldtaxid"  onClick={handlewithHeldTaxClick}  className="link-with-icon">Terminal price type Setup<i className="fas fa-caret-down"></i></NavLink>
                           <div className="nested7-dropdown-content" id="Withheldtaxidcontent" style={{display : withHeldTaxVisible ? 'block' : 'none'}}>
                               <NavLink   to="/Default-price-type">Default Price Type</NavLink>
                               <NavLink   to="/Allowed-price-type">Allowed Price Type</NavLink>
     
                       
                           </div>
                         </div>
   
   
                           
                           <NavLink   to="#">Reset Number Generator </NavLink>
                           <NavLink   to="#">Database Syncronize</NavLink>
                           <NavLink   to="#">Tagging POS Site Code </NavLink>
                           <NavLink   to="#">Revenue Tagging</NavLink>
                       </div>
                     </div>
  
                       <NavLink to="/System-Settings">System Settings</NavLink>
                       <NavLink to="#">Clear Login Errors</NavLink>
   
                     <div className="nested10-dropdown" >
                       <NavLink to="#" id="utilityid" onClick={handleUtilityClick} className="link-with-icon">Company Setup<i className="fas fa-caret-down"></i></NavLink>
                       
                       <div className="nested10-dropdown-content" id="utilityidContent" style={{display: UtilityVisible ? 'block' : 'none'}}>
                           <NavLink to="/Client-Setup">Client Details Setup</NavLink>
                           <NavLink to="/Supplier-Setup">Supplier Details Setup</NavLink>
                           <NavLink to="#">Terminal Setup</NavLink>
                           <NavLink to="/Terminal-Registration">Terminal Registration</NavLink>
                       </div>
                      </div>

   
                   </div>
               </div>
               <div className="dropdown">
                   <button className="dropbtn">Utility <i className="fas fa-caret-down"></i></button>
                   <div className="dropdown-content">
                       <NavLink  to="#">User Account Control</NavLink>
                       <NavLink  to="#">System Configuration</NavLink>
                   </div>
               </div>
               </div>       
           </>
         
          </header> 
           
          <aside className={`sidebar ${show ? 'show' : null}`}>
              <nav className="nav">
                  <div>
                      <span className={`nav-header-name ${show ? 'show' : null}`}>TASK PANE</span>
                      <div className="nav-list" >
                      <NavLink id='sidebutton' className={active === "1" ? "nav-link active" : "nav-link"} to="/Cash-Count" title="Sales Invoice">
                         <FontAwesomeIcon icon={faDollarSign} className="nav-link-icon" key={1} id={"icon1"}  />
                         <span className={`nav-link-name ${show ? 'show' : ''}`}  >Cash Count</span>
                         </NavLink>
                          <NavLink id='sidebutton1'  className={active === "2" ? "nav-link active" : "nav-link"} to="/Xread-Zread"  title="POS" >
                          <FontAwesomeIcon icon={faReceipt} className="nav-link-icon"  key={2} id={"2"} ></FontAwesomeIcon>
                              <span className={`nav-link-name ${show ? 'show' : null}`} >X Reading And Z reading</span>    
                          </NavLink>  
                          <NavLink id='sidebutton2'   className={active === "3" ? "nav-link active" : "nav-link"} to=""  onClick={()=>setopenReports(true)} title="Reports">
                          <FontAwesomeIcon icon={faListAlt} className="nav-link-icon"  key={3} id={"3"} onClick={()=>setopenReports(true)}></FontAwesomeIcon>
                              <span className={`nav-link-name ${show ? 'show' : null}`}  onClick={()=>setopenReports(true)}>Reports</span>    
                          </NavLink>  
                        
                          <NavLink id='sidebutton3'  className={active === "9" ? "nav-link active" : "nav-link"} key={9} onClick={() => logoutClick()} title="Logout" to={''}>
                              <FontAwesomeIcon icon={faPowerOff} className="nav-link-icon" key={9} id={"9"} onClick={() => logoutClick()}></FontAwesomeIcon>
                              <span className={`nav-link-name ${show ? 'show' : null}`}  onClick={() => logoutClick()}>Logout</span>    
                          </NavLink>   
                      </div>
                      
                      <br/><br/>
                      <span className={`nav-header-name ${show ? 'show' : null}`}>USER LOGIN</span> <br /><br />
                      <div className={`nav-details ${show ? null : 'show'}`}>
                          <div className="nav-col-user-details">
                              <i className="fas fa-user nav-user-icon"></i>
                              <span className="nav-user-details">{localStorage.username}</span>
                          </div>
                          <div className="nav-col-user-details">
                              <i className="fas fa-map-marker-alt custom-icon"></i>
                              <span className="nav-user-details"> {localStorage.uldesc}</span>
                          </div>
                          <div className="nav-col-user-details">
                              <i className="fas fa-calendar-alt nav-user-icon"></i>
                              <span className="nav-user-details">{localStorage.currentDate}</span>
                          </div>
                      </div>
                      
                      <br/>
                  </div>       
              </nav>    
          </aside>
  
    
          {openReports && 
            <>
                          <div className='modal'>
                            <div className='modal-content'>
                              <h1>Select Types of Reports</h1>
                              <div className='Button-ContainerReports' style={{display:'flex',flexDirection:'column'}}>
                                <NavLink to='/Sales-Reports' onClick={()=>setopenReports(false)}>Sales Reports</NavLink>
                                <NavLink to='' onClick={()=>setopenReports(false)}>Sales Return</NavLink>
                                <NavLink to='' onClick={()=>setopenReports(false)}>Discount</NavLink>
                                <NavLink to='' onClick={()=>setopenReports(false)}>Remittance</NavLink>
                                <NavLink to='' onClick={()=>setopenReports(false)}>Void Transaction</NavLink>
                                <NavLink to='' onClick={()=>setopenReports(false)}>Cancelled Transaction</NavLink>
                                <NavLink to='' onClick={()=>setopenReports(false)}>Grand Total Monitoring</NavLink>
                                <NavLink to='' onClick={()=>setopenReports(false)}>Collection Details</NavLink>
                                <NavLink to='/Reprint-Xread-Zread' onClick={()=>setopenReports(false)}>X and Zread Re-Printing</NavLink>
                                <NavLink to='' onClick={()=>setopenReports(false)}>Price Overide</NavLink>
                                <NavLink className='Close' to='' onClick={()=>setopenReports(false)} >Close</NavLink>
                     
                              </div>

                            
                            </div>
                          </div>

            </>
          }
         </main>

        )
      ) : (
        <LoginForm />
      )}
    </div>
    // <Provider store={store}>
    // </Provider>


      );

}

const Content = () => {
  return(
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/userProfile" element={<UserProfile />} />
      <Route path="/WaiterProfile" element={<WaiterProfile />} />
      <Route path="/TableList" element={<TableList />} />
      <Route path="/Video" element={<VideoUpload />} />
      <Route path="/Terminal-Registration" element={<TerminalRegistration />} />
      <Route path="/Supplier-Setup" element={<SupplierSetup />} />
      <Route path="/Client-Setup" element={<ClientSetup />} />
      <Route path="/Supplier-Details" element={<SupplierDetails />} />
      <Route path="/Customer-Details" element={<CustomerDetails />} />
      <Route path="/Cash-Count" element={<CashCount />} />
      <Route path="/Xread-Zread" element={<XreadZred />} />
      <Route path="/cost-of-sales" element={<CostofSalesAccountTagging/>} />
      
      <Route path="/Credit-Account-Sales-Transaction" element={<Setup Transaction = "Setp-up of Credit account for Sales Transaction"  TransType='' />} />
      <Route path="/Debit-Account-Sales-Transaction" element={<Setup Transaction = "Setp-up of Debit account for Sales Transaction"  TransType='' />} />
      <Route path="/Debit-Card" element={<Setup  Transaction = "Event Setup - Debit" TransType='Bank'/>} />
      <Route path="/Credit-Card" element={<Setup Transaction = "Event Setup - Credit"  TransType='Bank' />} />
      <Route path="/Default-price-type" element={<Setup Transaction = "Default Price Type"  TransType='PriceType' />} />
      <Route path="/Setup-SL-Per-terminal" element={<Setup Transaction = "Setup SL Type Per Terminal"  TransType='' />} />
      <Route path="/Allowed-price-type" element={<MultiplePriceTypeSiteSetup/>} />
      <Route path="/Tagging-of-sales-Category-List" element={<TaggingofSaslesCategoryList/>} />
      <Route path="/Tagging-per-terminal" element={<TaggingPerTerminal/>} />
      <Route path="/Reprint-Xread-Zread" element={<ReprintXReadandZRead/>} />
      <Route path="/Sales-Reports" element={<SalesReports/>} />
      <Route path="/System-Settings" element={<SystemSettings/>} />
      <Route path="/Product-Profile" element={<ProductProfile/>} />
      <Route path="/Product-Print-Category" element={<ProductPrintCategory/>} />
      
    </Routes>
  );
};


export default App
