import { useState } from 'react'

import './App.css'
import './homepage.css'
import './HeaderdropDown.css'
import LoginForm from './LoginComponent/login'
import Swal from "sweetalert2"
import Profile from './Dashboard/profile'
import { Routes, useNavigate, Link,Route} from "react-router-dom";
// import CashReceipt from "../TaskPane/cashReceipt";
import Restaurant from './Restaurant/restaurant';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faListAlt, faPowerOff, faReceipt } from '@fortawesome/free-solid-svg-icons'
// import OnlineTestApp from './OnlineTestApp';
// import electron, { BrowserWindow } from 'electron';



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
  return (
    <div>
      {isLogin ? (
        userRank === 'Cashier' ? (
            <Restaurant/>
        ) : (
          <main className={show ? 'space-toggle' : ''}>
          <Content /> 
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
                         <Link to="#" id="cuztomizedid" onClick={handleCuztomizedClick} className="link-with-icon" >Customized Reports<i className="fas fa-caret-down"></i></Link>
                         
                                   <div className="nested11-dropdown-content" id="cuztomizedidContent" style={{ display: cuztomizedVisible ? 'block' : 'none' }}>
                                    
                                     <div className="nested12-dropdown" >
                                       <Link to="#" onClick={handleBillingStatementClick} id="billingstatementid"  className="link-with-icon" style={{width: '95%'}}>Billing Statement<i className="fas fa-caret-down"></i></Link>
                                     
                                       <div className="nested12-dropdown-content" id="billingstatementidcontent" style={{ display: billingStatementVisible ? 'block' : 'none' }}>
                                         <Link to="#">Posted Transactions</Link>
                                         <Link to="#">Un-Posted Transactions</Link>
                                       </div>
                                     </div>
                 
                                     <div className="nested13-dropdown" >
                                       <Link to="#" id="ARsummaryid"  onClick={handleARSummaryClick} className="link-with-icon" style={{width: '95%'}}>AR Summary<i className="fas fa-caret-down"></i></Link>
                                       <div className="nested13-dropdown-content" id="ARsummaryidContent" style={{ display: ARsummaryVisible ? 'block' : 'none' }}>
                                         <Link to="#">Posted Transactions</Link>
                                         <Link to="#">Un-Posted Transactions</Link>
                                    
                                       </div>
                                     </div>
               
                                     <Link to="#">Payment Details Reports</Link>
                                     <Link  to="#">Collection Reports</Link>
                                     <Link  to="#">Customer (Source Data)</Link>
                                     <Link to="#">Open Account Billing</Link>
                                     <Link  to="#">Check Acknowledgment Logbook</Link>
                                     <Link to="#">Payable - RR/DR/SI Reports</Link>
                                     <Link  to="#">Input Tax Reports</Link>
                                     <Link  to="#">Document Posting Status</Link>
                                     <Link  to="#">Cancel Document Status</Link>
                                     <Link to="#">Cuztomized Aging Analysis Report</Link>
                                     <Link to="#">Payables</Link>
                                     <Link  to="#">Receivables</Link>
                                    </div>
                      </div>
                       <Link to="#">Change Unit Location</Link>
                       <Link to="#">Log as Different User</Link>
                       <Link to="#">Exit Program</Link>
                   </div>
               </div>
               <div className="dropdown">
                 <button className="dropbtn">Reference <i className="fas fa-caret-down"></i></button>
                 <div className="dropdown-content">
                     <Link  to="/Profile" target="_blank">Product Profile</Link>
                     <Link  to="/chartofaccounts" target="_blank">Waiter List</Link>
                     <Link  to="/chartofaccounts" target="_blank">Customer Details</Link>
                     <Link  to="/chartofaccounts" target="_blank">Supplier Details</Link>
                     <Link  to="/chartofaccounts" target="_blank">Table List</Link>
                     <Link  to="/chartofaccounts" target="_blank">Product Print Category</Link>
                     <Link  to="/chartofaccounts" target="_blank">POS Site Code</Link>
                 
                 </div>
               </div>
   
               <div className="dropdown">
                   <button className="dropbtn">Adminitration <i className="fas fa-caret-down"></i></button>
                   <div className="dropdown-content">
                       <Link to="{% url 'UserDeatials' %}">User Account Control</Link> 
                       <Link to="{% url 'UserDeatials' %}">POS Transaction</Link> 
   
                     <div className="nested7-dropdown" >
                       <Link to="#" id="unpostid" onClick={handleUnpostRepostClick} className="link-with-icon">Unpost Transaction<i className="fas fa-caret-down"></i></Link>
                       <div className="nested7-dropdown-content" id="unpostidcontent" style={{ display : UnpostRepostVisible ? 'block' : 'none'}}>
                           <Link to="#">By Date Transaction</Link>
                           <Link to="#">By Reference No</Link>
                       </div>
                     </div>
   
   
                     <div className="nested4-dropdown" >
                       <Link to="#" id="systemconfigid" onClick={handleSystemConfigClick} className="link-with-icon" >System Configuration<i className="fas fa-caret-down"></i></Link>
                       <div className="nested4-dropdown-content" id="systemconfigidcontent" style={{display: SystemConfigVisible ? 'block' : 'none'}}>
                           <Link to="#">POS Settings </Link>
   
                           <div className="nested5-dropdown" >
                             <Link to="#" id="transtypesetupid" onClick={handleTransactionTypeClick} className="link-with-icon" style={{width: '95%'}}>Tagging of Sales Transaction<i className="fas fa-caret-down"></i></Link>
                             <div className="nested5-dropdown-content" id="transtypesetupidcontent" style={{display : TransactionTypeVisible ? 'block' : 'none'}}>
                                 <Link to="#">Debit Accounts for Sales</Link>
                                 <Link to="#">Credit Accounts for Sales</Link>
                                 <Link to="#">Per Category</Link>
                                 <Link to="#">Credit Account for Sales Return</Link>
                                 <Link to="#">Cost Sales</Link>
                                 <Link to="#">Per Terminal</Link>
                         
                             </div>
                           </div>
   
                           <Link to="#">Cost of Sales Account Tagging</Link>
                           <Link to="#">Tagging of SL Account for Sales</Link>
   
   
                         <div className="nested6-dropdown" >
                           <Link to="#" id="Withheldtaxid"  onClick={handlewithHeldTaxClick}  className="link-with-icon">Card Machine Acct. Tittle Tagging<i className="fas fa-caret-down"></i></Link>
                           <div className="nested6-dropdown-content" id="Withheldtaxidcontent" style={{display : withHeldTaxVisible ? 'block' : 'none'}}>
                               <Link to="#">Credit Card</Link>
                               <Link to="#">Debit Card</Link>
     
                       
                           </div>
                         </div>
   
   
                         <div className="nested7-dropdown" >
                           <Link to="#" id="Withheldtaxid"  onClick={handlewithHeldTaxClick}  className="link-with-icon">Terminal price type Setup<i className="fas fa-caret-down"></i></Link>
                           <div className="nested7-dropdown-content" id="Withheldtaxidcontent" style={{display : withHeldTaxVisible ? 'block' : 'none'}}>
                               <Link to="#">Default Price Type</Link>
                               <Link to="#">Allowed Price Type</Link>
     
                       
                           </div>
                         </div>
   
   
                           
                           <Link to="#">Reset Number Generator </Link>
                           <Link to="#">Database Syncronize</Link>
                           <Link to="#">Tagging POS Site Code </Link>
                           <Link to="#">Revenue Tagging</Link>
                       </div>
                     </div>
  
                       <Link to="#">System Settings</Link>
                       <Link to="#">Clear Login Errors</Link>
   
                     <div className="nested10-dropdown" >
                       <Link to="#" id="utilityid" onClick={handleUtilityClick} className="link-with-icon">Company Setup<i className="fas fa-caret-down"></i></Link>
                       
                       <div className="nested10-dropdown-content" id="utilityidContent" style={{display: UtilityVisible ? 'block' : 'none'}}>
                           <Link to="#">Client Details Setup</Link>
                           <Link to="#">Company Details Setup</Link>
                           <Link to="#">Terminal Setup</Link>
                           <Link to="#">Terminal Registration</Link>
                       </div>
                      </div>
   
   
                      <div className="nested10-dropdown" >
                       <Link to="#" id="utilityid" onClick={handleUtilityClick} className="link-with-icon">Delete/Clears Records & Tables<i className="fas fa-caret-down"></i></Link>
                       
                       <div className="nested10-dropdown-content" id="utilityidContent" style={{display: UtilityVisible ? 'block' : 'none'}}>
                           <Link to="#">Delete Transaction</Link>
                           <Link to="#">Clear Tables</Link>
                 
                       </div>
                      </div>
   
                   </div>
               </div>
               <div className="dropdown">
                   <button className="dropbtn">Utility <i className="fas fa-caret-down"></i></button>
                   <div className="dropdown-content">
                       <Link to="#">User Account Control</Link>
                       <Link to="#">System Configuration</Link>
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
                      <Link className={active === "1" ? "nav-link active" : "nav-link"} to="/TaskPane/SalesInvoice" title="Sales Invoice">
                         <FontAwesomeIcon icon={faDollarSign} className="nav-link-icon" key={1} id={"icon1"} onClick={handleClick} />
                         <span className={`nav-link-name ${show ? 'show' : ''}`}     onClick={handleClick}>Cash Count</span>
                         </Link>
                          <Link  className={active === "2" ? "nav-link active" : "nav-link"} to="/TaskPane/POS"  title="POS" >
                          <FontAwesomeIcon icon={faReceipt} className="nav-link-icon"  key={2} id={"2"} onClick={handleClick}></FontAwesomeIcon>
                              <span className={`nav-link-name ${show ? 'show' : null}`} onClick={handleClick}>X Reading And Z reading</span>    
                          </Link>  
                          <Link  className={active === "3" ? "nav-link active" : "nav-link"} to="/TaskPane/Inventory"   title="Inventory">
                          <FontAwesomeIcon icon={faListAlt} className="nav-link-icon"  key={3} id={"3"} onClick={handleClick}></FontAwesomeIcon>
                              <span className={`nav-link-name ${show ? 'show' : null}`}  onClick={handleClick}>Reports</span>    
                          </Link>  
                          <Link className={active === "9" ? "nav-link active" : "nav-link"} key={9} id={"9"} onClick={() => logoutClick()} title="Logout" to={''}>
                              <FontAwesomeIcon icon={faPowerOff} className="nav-link-icon" key={9} id={"9"} onClick={() => logoutClick()}></FontAwesomeIcon>
                              <span className={`nav-link-name ${show ? 'show' : null}`}  onClick={() => logoutClick()}>Logout</span>    
                          </Link>   
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
    
         </main>
        )
      ) : (
        <LoginForm />
      )}
    </div>

  );
}

function Content() {
return <div>
    <Routes>
    <Route path="/Profile" element={<Profile />}></Route>
    </Routes> 
</div>
}


export default App
