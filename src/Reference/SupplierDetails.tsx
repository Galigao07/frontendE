/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {useState, Fragment, useEffect, useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import './css/CustomerDetails.css'
import './css/index.css'
import './css/newIndex.css'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPrint,faEdit,faTrashAlt,faSave,faCameraAlt,faSearch, faL } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2';
import { Grid } from '@mui/material';
import {BASE_URL} from '../config';





 const SupplierDetails = () => {

    //#region 
    const [tabVisible, setTabVisible] = useState(true);
    const [imagePreview, setImagePreview] = useState<any>('');
    const [ID_Code, setIdCode] = useState<any>('');
    const [Tradename, setTradeName] = useState<any>('');
    const [Fname, setFname] = useState<any>('');
    const [Lname, setLname] = useState<any>('');
    const [MI, setMI] = useState<any>('');
    const [Phone, setPhone] = useState<any>('');
    const [Mobile, setMobile] = useState<any>('');
    const [Fax, setFax] = useState<any>('');
    const [Address, setAddress] = useState<any>('');
    const [City, setCity] = useState<any>('');
    const [Province, setProvince] = useState<any>('');
    const [ZipCode, setZipCode] = useState<any>('');
   
    const [TAX, setTax] = useState<any>('');
    const [Status, setStatus] = useState<any>('');
    const [Group, setGroup] = useState<any>('');
    const [Trade, setTrade] = useState<any>('');;
    const [SL, setSL] = useState<any>('');
    const [Remarks, setRemarks] = useState<any>('');
    const [CustomerList, setCustomerList] = useState<any>('');
    const [SearchDataVisible, setSearchDataVisible] = useState(false);
    const [selectedItemIndex, setSelectedItemIndex] = useState(0);
    const [searchInput, setSearchInput] = useState<any>('');

    const resultsContainerRef = useRef<HTMLDivElement>(null);
    const customerRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const tradenameidRef = useRef<HTMLInputElement>(null);
    const lnameidRef = useRef<HTMLInputElement>(null);
    const fnameidRef = useRef<HTMLInputElement>(null);
    const miidRef = useRef<HTMLInputElement>(null);
    const phoneidRef = useRef<HTMLInputElement>(null);
    const mobileidRef = useRef<HTMLInputElement>(null);
    const faxidRef = useRef<HTMLInputElement>(null);
    const addressidRef = useRef<HTMLInputElement>(null);
    const cityidRef = useRef<HTMLInputElement>(null);
    const provinceidRef = useRef<HTMLInputElement>(null);
    const zipcodeidRef = useRef<HTMLInputElement>(null);
    const vatidRef = useRef<HTMLSelectElement>(null);
    const taxidRef = useRef<HTMLInputElement>(null);
    const statusidRef = useRef<HTMLSelectElement>(null);
    const groupidRef = useRef<HTMLInputElement>(null);
    const areaidRef = useRef<HTMLInputElement>(null);
    const agentidRef = useRef<HTMLInputElement>(null);
    const collectoridRef = useRef<HTMLInputElement>(null);
    const kobidRef = useRef<HTMLInputElement>(null);
    const slidRef = useRef<HTMLInputElement>(null);
    const SaveRef = useRef<HTMLButtonElement>(null);
    const EditRef = useRef<HTMLButtonElement>(null);
    const NewRef = useRef<HTMLButtonElement>(null);
    
    const tradeRef = useRef<HTMLSelectElement>(null);
    const remarksidRef = useRef<HTMLTextAreaElement>(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isNewMode, setIisNewMode] = useState(false);
    const [SaveDisableButton, setSaveDisableButton] = useState(true);
    // const [vatOptions, setVatOptions] = useState([
    //     { value: 'V', label: 'VAT' },
    //     { value: 'N', label: 'Non VAT' },
    //     { value: 'E', label: 'VAT Exempt' },
    //     { value: 'Z', label: 'Zero Rated' }
    // ]);

    const [VAT, setVat] = useState('V');

    const HandleNewClick = async () => {
        setSaveDisableButton(false)
        setIdCode(parseInt(ID_Code)+1)
        setTradeName('');
        setLname('');
        setIisNewMode(true)
        console.log('')
        setFname('');
        setMI('');
        setPhone('');
        setMobile('');
        setFax('');
        setAddress('');
        setCity('');
        setProvince('');
        setZipCode(0);
        // setIsEditMode(true)
        setVat('');

        setTax('');
        setStatus('');
        setGroup('');
        setTrade('T');

        setSL('');
        setRemarks('');
        setImagePreview('');

        if (containerRef.current){
          const inputElements = containerRef.current.querySelectorAll('input, select, textarea');

      inputElements.forEach((element: any) => {
        element.removeAttribute('readonly');
        element.removeAttribute('disabled');
        element.style.backgroundColor = 'white';
      });
  }

  if (tradenameidRef.current){
      tradenameidRef.current.focus();
  }
    
    };

   const HandleSaveClick = async () => {
    try {
        if (isEditMode) {

            swalWithBootstrapButtons.fire({
                title: 'Confirmation',
                text: "Do you want to Update this Supplier?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true
              }).then(async (result) => {
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('ID_Code', ID_Code);
                    formData.append('Tradename', Tradename);
                    formData.append('Fname', Fname);
                    formData.append('Lname', Lname);
                    formData.append('MI', MI);
                    formData.append('Phone', Phone);
                    formData.append('Mobile', Mobile);
                    formData.append('Fax', Fax);
                    formData.append('Address', Address);
                    formData.append('City', City);
                    formData.append('Province', Province);
                    formData.append('ZipCode', ZipCode);
                    formData.append('Vat', VAT);
                    formData.append('Tax', TAX);
                    formData.append('Status', Status);
                    formData.append('Group', Group);
                    formData.append('sl', SL);
                    formData.append('Trade', Trade);
                    formData.append('Remarks', Remarks);
                    formData.append('image', imagePreview);
                    await axios.put(`${BASE_URL}/api/supplier-details`, formData ,{
                        headers: {
                            'Content-Type': 'multipart/form-data',
                          },
                      
                      })
                     setIsEditMode(false)
                    Swal.fire({
                      icon: 'success',
                      title: 'Save!',
                      text: 'Supplier Successfully Update.',
                      showConfirmButton: false,
                      timer: 3000  
                    });
                }})
        }

        else if(isNewMode){

            swalWithBootstrapButtons.fire({
                title: 'Confirmation',
                text: "Do you want to Save this Supplier entry?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true
              }).then(async(result) => {
                if (result.isConfirmed) {


                const formData = new FormData();
                formData.append('ID_Code', ID_Code);
                formData.append('Tradename', Tradename);
                formData.append('Fname', Fname);
                formData.append('Lname', Lname);
                formData.append('MI', MI);
                formData.append('Phone', Phone);
                formData.append('Mobile', Mobile);
                formData.append('Fax', Fax);
                formData.append('Address', Address);
                formData.append('City', City);
                formData.append('Province', Province);
                formData.append('ZipCode', ZipCode);
                formData.append('Vat', VAT);
                formData.append('Tax', TAX);
                formData.append('Trade', Trade);
                formData.append('Status', Status);
                formData.append('Group', Group);
                formData.append('sl', SL);
                // formData.append('KOB', KOB);
                formData.append('Remarks', Remarks);
                formData.append('image', imagePreview);
                await axios.put(`${BASE_URL}/api/supplier-details`, formData ,{
                    headers: {
                        'Content-Type': 'multipart/form-data',
                      },
                  
                  })
                setIisNewMode(false)
                Swal.fire({
                icon: 'success',
                title: 'Save!',
                text: 'Supplier Successfully Added.',
                showConfirmButton: false,
                timer: 3000  
                });    
        }})}
                setTimeout(() => {
                  window.location.reload();
                }, 3000);
                setSaveDisableButton(true)
   
            }catch (error) {
        console.error('Error saving data:', error);
      }
    };

    const HandleEditClick = () => {
        setSaveDisableButton(false)
        setIsEditMode(true)
    if (containerRef.current){
            const inputElements = containerRef.current.querySelectorAll('input, select, textarea');

        inputElements.forEach((element: any) => {
          element.removeAttribute('readonly');
          element.removeAttribute('disabled');
          element.style.backgroundColor = 'white';
        });
    }

    if (tradenameidRef.current){
        tradenameidRef.current.focus();
    }
      };
    
    
      const HandleDeleteClick = () => {

        swalWithBootstrapButtons.fire({
            title: 'Confirmation',
            text: "Do you want to Delete this Supplier?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                try {
                    if (ID_Code ===''){
                        setSearchDataVisible(false);     
                    }
                    else {
                        axios.delete(`${BASE_URL}/api/supplier-search`, {
                        params: {
                          id_code: ID_Code,
                        },
                      })
                    .then(response => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Delete!',
                            text: 'Supplier Successfully Deleted.',
                            showConfirmButton: false,
                            timer: 3000  
                          });
                              setTimeout(() => {
                                window.location.reload();
                              }, 3000);
                    })
                    }
                    
                } catch (error) {
                console.error(error);
                }
            }})
      };



    useEffect(() => {
        setSaveDisableButton(true)
        // Make the API request when the component mounts
    axios.get(`${BASE_URL}/api/supplier-details`)
          .then(response => {
            const data = response.data.latest_customer;
            setIdCode(data.id_code);
            setTradeName(data.trade_name);
            setLname(data.last_name);

            setFname(data.first_name);
            setMI(data.middle_name);
            setPhone(data.business_phone_no);
            setMobile(data.mobile_no);
            setFax(data.fax_no);
            setAddress(data.address);
            setCity(data.city_municipality);
            setProvince(data.province);
            setZipCode(data.zip_code);
            setTrade(data.trade)

            const selectElement = vatidRef.current;
            if (selectElement){
              selectElement.value = data.vat_registration_type;
              const changeEvent = new Event('change', { bubbles: true });
              selectElement.dispatchEvent(changeEvent);
            }



            // setVat(data.vat_registration_type)

            setTax(data.tax_id_no);
            setStatus(data.active_status);
            setGroup(data.group_name);
            // setArea(data.area_name);
            // setAgent(data.agent_name);
            // setCollector(data.collector_name);
            setSL(data.sl_sub_category_description);
            // setKOB(data.kob_name)
            setRemarks(data.remarks);

            const imageBase64 = `data:image/gif;base64,${data.supplier_image}`;
            setImagePreview(imageBase64);
            // console.log('fsdfsdfm',data.customer_image)


            
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []);

      ///-----image button------
//#region
const handleTradeNameChange = (event:any) => {
        setTradeName(event.target.value);
      };

  const handleImageChange = (e:any) => {
    const selectedImage = e.target.files[0];
  
    if (selectedImage) {
      const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB in bytes
  
      if (selectedImage.size > maxSizeInBytes) {
        // Display an error message or handle the oversized image
        Swal.fire({
            icon: 'error',
            title: 'Upload error!',
            text: 'Selected image exceeds the maximum size of 1 MB.',
            showConfirmButton: false,
            timer: 3000  
          });
      } else {
        const reader = new FileReader();
  
        reader.onload = function (e:any) {
          setImagePreview(e.target.result);
        }
  
        reader.readAsDataURL(selectedImage);
      }
    } else {
      setImagePreview('');
    }
  };

//#endregion


const handleSearchInputChange = async (e:any) => {
    setSearchInput(e)
    try {
        if (e ===''){
            setSearchDataVisible(false);     
        }
        else {
            axios.get(`${BASE_URL}/api/supplier-details`, {
            params: {
              trade_name: e,
            },
          })
        .then(response => {
 
          setCustomerList(response.data);
          setSearchDataVisible(true);    
        })
        }
        
        
    } catch (error) {
    console.error(error);
    }
};

const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })



const handleEscape = (event:any) => {
    if (event.key === 'Escape') {
     
        if (isEditMode){

  
                swalWithBootstrapButtons.fire({
                title: 'Confirmation',
                text: "Do you want to abort Editing Supplier entry?",
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Yes',
                cancelButtonText: 'No',
                reverseButtons: true
              }).then((result) => {
                if (result.isConfirmed) {
                   
                    setIsEditMode(false)
                    window.location.reload();
                }})
            

            
        }
            else if(isNewMode){
                swalWithBootstrapButtons.fire({
                    title: 'Confirmation',
                    text: "Do you want to abort Adding Entry?",
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    reverseButtons: true
                  }).then((result) => {
                    if (result.isConfirmed) {
                       
                        setIsEditMode(false)
                        window.location.reload();
                    }})
            }

   
    }
  };


const handleSearch= async (e:any) => {
    setSearchInput(e)
    try {
        if (e ===''){
            setSearchDataVisible(false);     
        }
        else {
            axios.get(`${BASE_URL}/api/supplier-search`, {
            params: {
              trade_name: e,
            },
          })
        .then(response => {
          const data = response.data.customersSearch;

          setIdCode(data[0].id_code);
        
          setTradeName(data[0].trade_name);
          setLname(data[0].last_name);
          console.log(data[0].id_code)
  
          setFname(data[0].first_name);
          setMI(data[0].middle_name);
          setPhone(data[0].business_phone_no);
          setMobile(data[0].mobile_no);
          setFax(data[0].fax_no);
          setAddress(data[0].address);
          setCity(data[0].city_municipality);
          setProvince(data[0].province);
          setZipCode(data[0].zip_code);
          setTrade(data[0].trade)
         
          const selectElement = vatidRef.current;
          if (selectElement){
            selectElement.value = data[0].vat_registration_type;
            const changeEvent = new Event('change', { bubbles: true });
            selectElement.dispatchEvent(changeEvent);
          }



        //   setVat(data.vat_registration_type);
          setTax(data[0].tax_id_no);
          setStatus(data[0].active_status);
          setGroup(data[0].group_name);
        //   setArea(data[0].area_name);
        //   setAgent(data[0].agent_name);
        //   setCollector(data[0].collector_name);
          setSL(data[0].sl_sub_category_description);
        //   setKOB(data[0].kob_name)
          setRemarks(data[0].remarks);

          const imageBase64 = `data:image/gif;base64,${data[0].supplier_image}`;
          setImagePreview(imageBase64);


        })
        }
        
        
    } catch (error) {
    console.error(error);
    }
};

///// keydown every in in Every Input////
const handleKeyDown = (event:any, currentRef:any, nextRef:any) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (nextRef.current) {
            nextRef.current.focus();
          }
        }
};
    ///// KEY UP AND KEY DOWN////
  const handleKeys = (event:any) => {
    const key = event.key;
    if (resultsContainerRef.current) {
      const customerItems = Array.from(resultsContainerRef.current.querySelectorAll('li'));
 


    if (key === 'ArrowDown') {
      event.preventDefault();
      const currentSelectedItem = customerItems.find((item) => item.classList.contains('selected'));
      if (currentSelectedItem){
        const currentIndex = customerItems.indexOf(currentSelectedItem);
        const nextIndex = currentIndex < customerItems.length - 1 ? currentIndex + 1 : 0;
        const nextItem = customerItems[nextIndex];
  
  
        if (nextItem) {
          currentSelectedItem.classList.remove('selected');
          nextItem.classList.add('selected');
          const payeeText = nextItem.textContent!.split(' - ')[1];
          setSearchInput(payeeText);
          nextItem.focus();
        }
      }

    } else if (key === 'ArrowUp') {
      event.preventDefault();
      const currentSelectedItem = customerItems.find((item) => item.classList.contains('selected'));
      if (currentSelectedItem) {
        const currentIndex = customerItems.indexOf(currentSelectedItem);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : customerItems.length - 1;
        const prevItem = customerItems[prevIndex];
  
        if (prevItem) {
          currentSelectedItem.classList.remove('selected');
          prevItem.classList.add('selected');
          const payeeText = prevItem.textContent!.split(' - ')[1];
          setSearchInput(payeeText);
          prevItem.focus();
        }
      }

    } else if (key === 'Enter') {
      const selectedItem = customerItems.find((item) => item.classList.contains('selected'));
      if (selectedItem) {
        const cusid = selectedItem.getAttribute('data-id');
        const cusName = selectedItem.textContent!.split(' - ')[1];

        setSearchInput(cusName);
        handleSearch(cusName);
        setSearchDataVisible(false)
        // resultsContainerRef.current.innerHTML = '';
        // Perform further actions as needed
      }
    }
  }
  };

//#endregion


return <section className="content" onKeyDown={handleEscape}>
<Fragment>
    <div className="card-container"  onKeyDown={handleEscape} >
        <div className="card">

            <div className="card-body" ref={containerRef} onKeyDown={handleEscape} >
                <Tabs>
                    <TabList>   
                    {tabVisible && (
                        <Tab id='1'>Supplier Details</Tab>
                    )}
                        <Tab id='2'>Supplier List</Tab>
                
                    </TabList>

                    {tabVisible && (
                    <TabPanel className="tab-trans-history" id='1'>
                          
                      <Grid container  justifyContent="space-between" >
    
                            <Grid item xs={12} md={6} className='Search-container' style={{width:'100%'}}>
                                <input
                                    type='text'
                                    id='search'
                                    ref={inputRef}
                                    className='text-input'
                                    value={searchInput}
                                    onChange={(e) => handleSearchInputChange(e.target.value)}
                                    placeholder='Search....'
                                    onKeyDown={handleKeys}
                                    style={{ width: '100%', marginRight: '10px' }}
                                    autoComplete='off'/>
                                        {/* <div className='CustomerResults' id='CustomerResults' ref={resultsContainerRef} style={{ display: SearchDataVisible ? 'block' : 'none' }}> */}
                                        
                                        {(SearchDataVisible && 
                                        <ul className='customer-ul-list' ref={customerRef}>
                                            {CustomerList.length > 0 ? (
                                                CustomerList.map((result:any, index:any) => (
                                                <li
                                                    tabIndex={0}
                                                    key={index}
                                                    className={selectedItemIndex === index ? 'selected' : ''}
                                                    onKeyDown={(event) => handleKeys(event)}
                                                    onClick={() => {
                                                    setSelectedItemIndex(index);
                                                    setSearchInput(`${result.trade_name}`);
                                                    setSearchDataVisible(false);
                                                    handleSearch(`${result.trade_name}`);
                                                    }}
                                                >
                                                    {result.id_code} - {result.trade_name}
                                                </li>
                                                ))
                                            ) : (
                                                <td valign='top' colSpan={11} className='dataTables_empty'>
                                                No data available in the table
                                                </td>
                                            )}
                                            </ul>
                                            )}                               
                                                                                
                            </Grid>

                            <Grid item xs={12} xl={4} className='Button-container'>

                                    <button className='btn-tools customer' ref={NewRef}  onClick={HandleNewClick} ><i className="fas fa-plus"></i> New</button> &nbsp;
                                    <button className='btn-tools customer' ref={SaveRef} disabled={SaveDisableButton} onClick={HandleSaveClick}> <i className="fas fa-save" ></i> {isEditMode ? 'Update':'Save'}</button> &nbsp;
                                    <button className='btn-tools customer' ref={EditRef} onClick={HandleEditClick}> <i className="fas fa-edit"></i> Edit</button> &nbsp;
                                    <button className='btn-tools customer'  onClick={HandleDeleteClick}> <i className="fas fa-trash"></i> Delete</button> &nbsp;
                                    <button className='btn-tools customer' disabled={true} ><i className="fas fa-ban"></i> Cancel</button> &nbsp;
                            </Grid>

   
                      </Grid>
                      <div className='container-fluid' >
                        <div className='card'>

  
                                   {/* *************************ROW DATA ENTRY********************* */}
                          <div className='card-body' onKeyDown={handleEscape}>
                            <div className='Primary-Container' style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                       
                              <Grid item xs={12} md={6}  className='PrimarySub' >
                                  <div className='form-group1 trade-name'>
                                      <label>Trade Name</label>
                                      <input ref={tradenameidRef} onKeyDown={(e) => handleKeyDown(e, tradenameidRef, lnameidRef)} type='text' className='text-input'  defaultValue={Tradename}   onChange={handleTradeNameChange} readOnly/>
                                  </div>

                                  <div className='contact-primary'>
                                      <div className='contact'>
                                      
                                      <h3 style={{textAlign:'start'}}>Primary Contact</h3>
                                      <div className='form-group customer'>
                                          <label>Last Name:</label>
                                          <input type='text'   ref={lnameidRef}  onKeyDown={(e) => handleKeyDown(e, lnameidRef, fnameidRef)} className='text-input' defaultValue={Lname}  onChange={(event) => setLname(event.target.value)} readOnly/>
                                      </div>
                                      <div className='form-group customer'>
                                          <label>First Name:</label>
                                          <input type='text' ref={fnameidRef} onKeyDown={(e) => handleKeyDown(e, fnameidRef, miidRef)} className='text-input' defaultValue={Fname} onChange={(event) => setFname(event.target.value)} readOnly/>
                                      </div>
                                      <div className='form-group customer'>
                                          <label>Middle Name:</label>
                                          <input type='text' ref={miidRef} onKeyDown={(e) => handleKeyDown(e, miidRef, phoneidRef)} className='text-input' defaultValue={MI} onChange={(event) => setMI(event.target.value)} readOnly/>
                                      </div>
                                  
                                      </div>

                                      <div className='contact'>
                                      <h3 style={{textAlign:'start'}}>Phone Contact</h3>
                                      <div className='form-group customer'>
                                          <label>Business Phone:</label>
                                          <input type='text' ref={phoneidRef} onKeyDown={(e) => handleKeyDown(e, phoneidRef, mobileidRef)} className='text-input' defaultValue={Phone} onChange={(event) => setPhone(event.target.value)} readOnly/>
                                      </div>
                                      <div className='form-group customer'>
                                          <label>Mobile phone:</label>
                                          <input type='text' ref={mobileidRef} onKeyDown={(e) => handleKeyDown(e, mobileidRef, faxidRef)} className='text-input' defaultValue={Mobile} onChange={(event) => setMobile(event.target.value)} readOnly/>
                                      </div>
                                      <div className='form-group customer'>
                                          <label>Fax Number:</label>
                                          <input type='text' ref={faxidRef} onKeyDown={(e) => handleKeyDown(e, faxidRef, addressidRef)} className='text-input' defaultValue={Fax} onChange={(event) => setFax(event.target.value)} readOnly />
                                      </div>

                                      </div>
                                  
                                  </div>
                                  <div className='contact-primary'>
                                      <div className='contact'>
                                          {/* <h3 style={{textAlign:'start'}}>Address Contact</h3> */}
                                          <div className='form-group '>
                                              <label>Address:</label>
                                              <input type='text' ref={addressidRef} onKeyDown={(e) => handleKeyDown(e, addressidRef, cityidRef)} className='text-input' defaultValue={Address} onChange={(event) => setAddress(event.target.value)} readOnly/>
                                          </div>
                                          <div className='form-group '>
                                              <label>City/Municipality:</label>
                                              <input type='text' ref={cityidRef} onKeyDown={(e) => handleKeyDown(e, cityidRef, provinceidRef)} className='text-input' defaultValue={City} onChange={(event) => setCity(event.target.value)} readOnly/>
                                          </div>
                                      </div>

                                      <div className='contact'>
                                          <div className='form-group '>
                                              <label>Province:</label>
                                              <input type='text' ref={provinceidRef} onKeyDown={(e) => handleKeyDown(e, provinceidRef, zipcodeidRef)} className='text-input' defaultValue={Province} onChange={(event) => setProvince(event.target.value)} readOnly/>
                                          </div>
                                          <div className='form-group '>
                                              <label>ZIP/Postal Code:</label>
                                              <input type='text' ref={zipcodeidRef} onKeyDown={(e) => handleKeyDown(e, zipcodeidRef, taxidRef)} className='text-input' defaultValue={ZipCode} onChange={(event) => setZipCode(event.target.value)} readOnly/>
                                          </div>
                                      </div>
                                  </div>
                                  
                              </Grid>

                              <Grid item xs={12} md={6}  className='PrimarySub' >
                                <h3 style={{textAlign:'start'}}>Other Information</h3>
                                <div className='contact-primary'>
                                    <div className='form-group' >
                                      <label >Select Trade</label>
                                      <select ref={tradeRef} onKeyDown={(e) => handleKeyDown(e, tradeRef, vatidRef)} defaultValue={Trade}  onChange={(event) => setTrade(event.target.value)} className='select' autoComplete='off' disabled>
                                      <option value={'T'}>Trade</option>
                                      <option value={'N'}>Non Trade</option>
                                      </select>

                                    </div>
                                    <div className='form-group'>
                                      <label >Select Vat</label>
                                      <select ref={vatidRef} onKeyDown={(e) => handleKeyDown(e, vatidRef, taxidRef)} defaultValue={VAT}  onChange={(event) => setVat(event.target.value)} className='select' autoComplete='off' disabled>
                                        <option value={'V'}>VAT</option>
                                        <option value={'N'}>Non VAT</option>
                                      </select>
                                    </div>

                                    <div className='form-group'>
                                      <label>TAX ID No.</label>
                                      <input type='text' ref={taxidRef} onKeyDown={(e) => handleKeyDown(e, taxidRef, statusidRef)}  className='text-input' defaultValue={TAX} onChange={(event) => setTax(event.target.value)} readOnly/>
                                    </div>
                                  </div>

                                 <div className='contact-primary'>
                                    <div className='form-group'>
                                      <label>Status</label>
                                      <select ref={statusidRef} onKeyDown={(e) => handleKeyDown(e, statusidRef, groupidRef)} className='select'  defaultValue={Status} onChange={(event) => setStatus (event.target.value)} autoComplete='off' disabled>
                                        <option value={'Y'}>Active</option>
                                        <option value={'N'}>InActive</option>
                                      </select>
                                    </div>
                                    <div className='form-group'>
                                      <label>Group:</label>
                                      <input type='text' ref={groupidRef} onKeyDown={(e) => handleKeyDown(e, groupidRef, slidRef)} className='text-input' defaultValue={Group} onChange={(event) => setGroup(event.target.value)} readOnly/>
                                    </div>
                                    <div className='form-group'>
                                      <label>SL Category</label>
                                      <input type='text' ref={slidRef} onKeyDown={(e) => handleKeyDown(e, slidRef, remarksidRef)} className='text-input' defaultValue={SL} onChange={(event) => setSL(event.target.value)} readOnly/>
                                    </div>
                                  </div>

                                  <div className='form-group'>
                                    <label>Remarks</label>
                                    <textarea ref={remarksidRef}  className='text-input'defaultValue={Remarks} onChange={(event) => setRemarks(event.target.value)} style={{resize:'none',height:'80px'}} readOnly></textarea>
                                  </div>

                                  <div className='form-group image'>
                                                        {/* <h3>Customer Image</h3> */}
                                                        <div className='avatar-upload' style={{marginTop:'25px'}}>
                                                            <div className='avatar-edit'>
                                                            <input
                                                                type='file'
                                                                id='imageUpload'
                                                                name='imageUpload'
                                                                accept='.png, .jpg, .jpeg'
                                                                onChange={handleImageChange}
                                                            />
                                                            <label htmlFor='imageUpload' className='upload-label'>
                                                                {/* <FontAwesomeIcon className='icon' icon={faCameraAlt} style={{
                                                                    color:'white'
                                                                }}></FontAwesomeIcon> */}
                                                                </label>
                                                            <label htmlFor='imageUpload'></label>
                                                            </div>
                                                            <div className='avatar-preview'>
                                                            <div
                                                                className='imagePreview'
                                                                style={{
                                                                backgroundImage: `url(${imagePreview})`,
                                                                backgroundSize: 'cover',
                                                                backgroundPosition: 'center',
                                                                height:'100%',
                                                                width:'100%',
                                                                }}
                                                            ></div>
                                                            </div>
                                                        </div>
                                   </div>
                                         
                              </Grid>
                            </div>
                          </div>
                                   {/* *************************END OF DATA ENTRY********************* */}
                        </div>
                      </div>
                               
                    </TabPanel>
                    )}

                    <TabPanel className="tab-details" id='2' >
                            <div className="card">
                                <div className="card-header">
                                    <div className='location-container'>
                                
                                        <table className='table table-data'>
                                        <thead>
                                            <tr>
                                                <th>Ref. No.</th>
                                                <th>Date</th>
                                                <th>Gross Amount</th>
                                                <th>Terms</th>
                                                <th>Payment Scheme</th>
                                                <th>Due Date</th>
                                            </tr>
                                        </thead> 
                                        <tbody>

                                            <tr>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                                <td>1</td>
                                            </tr>
                                    
                                        </tbody>

                                    </table>
                                </div>
                                    
                                </div> 
                            </div>
                    </TabPanel>
                </Tabs>            
        </div>
                          
    </div>
 </div>
</Fragment>
 </section>
    
}

export default SupplierDetails