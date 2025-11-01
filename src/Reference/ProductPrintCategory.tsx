import React from 'react';
import {useState, Fragment, useEffect, useRef} from 'react';
import './css/ProductPrintCategory.css';

import axios from 'axios'; 
import {BASE_URL} from '../config';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlus, faPrint} from '@fortawesome/free-solid-svg-icons';
import { isDesktop } from 'react-device-detect';

import Swal from 'sweetalert2';
import { AnyComponent } from 'styled-components/dist/types';
import Grid from '@mui/material/Grid';
import { Button, Table, Typography } from '@mui/material';
import showErrorAlert from '../SwalMessage/ShowErrorAlert';
import showSuccessAlert from '../SwalMessage/ShowSuccessAlert';
import { setGlobalIsLoading } from "../globalSlice";
import { RootState } from "../store";
import { useSelector,useDispatch } from "react-redux";
import { InProgressLoading } from "../Loader/Loader";
import { useScreenSize } from '../ScreenHeightContext';

const ProductPrintCategory: React.FC = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state:RootState)=>state.global.globalIsLoading)
    const { width, height, orientation } = useScreenSize();
    const [categories, setCategories] = useState<any>([]);
    const [printer, setprinter] = useState<any>([]);
    const [Datalist, setDatalist] = useState<any>([]);
    const [ProductcategoryList,setProductcategoryList] = useState<any>([]);
    const [OpenAddSetupPrinter,setOpenAddSetupPrinter] = useState<boolean>(false)
    const [OpenPrinterModal,setOpenPrinterModal] = useState<boolean>(false)
    const [OpenProductModal,setOpenProductModal] = useState<boolean>(false)
    const [isEdit,setisEdit] = useState<boolean>(false)

    const [code,setcode] =useState<any>('')
    const [PrinterLocation,setPrinterLocation] =useState<any>('')
    const [PrinterName,setPrinterName] =useState<any>('')
    const [CategoryDesc,setCategoryDesc] =useState<any>('')

    const codeRef = useRef<HTMLInputElement>(null)
    const PrinterLocationRef = useRef<HTMLInputElement>(null)
    const PrinterNameRef = useRef<HTMLInputElement>(null)
    const CategoryDescRef = useRef<HTMLInputElement>(null)



    useEffect(() => {
      
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/printer-categories/`);
            setDatalist(response.data);
        } catch (error) {
            showErrorAlert('Error While Fetching Data');
        }
    };



const AddPrinterSetup = () => {
    setisEdit(false)
    setOpenAddSetupPrinter(true)
    let lastValue = Datalist[Datalist.length - 1];
    setcode(lastValue.prod_code + 1)
    setPrinterLocation('')
    setPrinterName('')
    setCategoryDesc('')
    }

const handleRetrieveUserData = (index:any) => {
setisEdit(true)
setOpenAddSetupPrinter(true)
const selected = Datalist[index]



setcode(parseFloat(selected.prod_code))
setPrinterLocation(selected.prod_desc)
setPrinterName(selected.printer_name)
setCategoryDesc(selected.category_desc)

}


const handleUpdate = async() => {
    const data = {
        'prod_code':code,
        'prod_desc':PrinterLocation,
        'printer_name':PrinterName,
        'category_desc':CategoryDesc,
    }

const response = await axios.post(`${BASE_URL}/api/printer-categories/`,{
    data:data
})
if (response.status ==200){
    setOpenAddSetupPrinter(false)
   showSuccessAlert('Successfully Update')
   fetchData()
}

try{

}catch{
    showErrorAlert('Error while Updating Data')
}
}
const handleDelete = async() => {

const response = await axios.delete(`${BASE_URL}/api/printer-categories/`,{
    params: {
        prod_code:code
    }
})
if (response.status ==200){
    setOpenAddSetupPrinter(false)
   showSuccessAlert('Successfully Deleted')
   fetchData()
}

try{

}catch{
    showErrorAlert('Error while Deleting Data')
}
}
const handleSubmit = async() => {
    const data = {
        'prod_code':code,
        'prod_desc':PrinterLocation,
        'printer_name':PrinterName,
        'category_desc':CategoryDesc,
    }

const response = await axios.post(`${BASE_URL}/api/printer-categories/`,{
    data:data
})
if (response.status ==200){
    setOpenAddSetupPrinter(false)
   showSuccessAlert('Successfully Added')
   fetchData()
}

try{

}catch{
    showErrorAlert('Error while saving Data')
}


}

const CloseModal = () => {
    setOpenAddSetupPrinter(false)
    setisEdit(false)
}

const GetPrinter = async() => {
        try {
            const response = await axios.get(`${BASE_URL}/api/printer-list/`,{withCredentials:true});
            setprinter(response.data);
            setOpenPrinterModal(true)
        } catch(error) {
            showErrorAlert('Error While Fetching Data');
        }
    
}

const selectPrinter = (printername:any) => {
    setPrinterName(printername)
    setOpenPrinterModal(false)

}

const GetProductCategory = async() => {
    try {
        const response = await axios.get(`${BASE_URL}/api/product-category-setup/`);
        setProductcategoryList(response.data);
        setOpenProductModal(true)
        setCategoryDesc('')
    } catch(error) {
        showErrorAlert('Error While Fetching Data');
    }
}


const handleCheckboxChange = (index: number) => {
    const updatedItems = [...ProductcategoryList];
    if (updatedItems[index].isCheck){
        updatedItems[index].isCheck = false;
    } else {
        updatedItems[index].isCheck = true;
    }

    setProductcategoryList(updatedItems);
  };

  const SaveProductcategory = () => {


    const checkedDescriptions = ProductcategoryList
        .filter((item:any) => item.isCheck)
        .map((item:any) => item.category_desc)
        .join(', ');

        setCategoryDesc(checkedDescriptions);

    // setCategoryDesc('')
    // ProductcategoryList.map((item:any)=> {
    //     if(item.isCheck){
    //         if (CategoryDesc === ''){
    //             setCategoryDesc(item.category_desc)
    //         }else{
    //             setCategoryDesc(CategoryDesc + ',' + item.category_desc)
    //         }
           
    //     }
    // })
    setOpenProductModal(false)

  }
  
    return (
        <>
        <Grid container style={{justifyContent:'start',}}>
        
            <Grid  style={{margin:'10px',padding: '5px',
                alignItems: 'center',borderRadius: '10px',cursor: 'pointer',
                boxShadow: '0 0 1px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                height:height - 70,width:'100%'
                }}>



                        
                <div style={{display:'flex',flexDirection:'row',width:'100%'}}>
                <Typography
                            variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                            sx={{
                            fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                            textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
                            borderRadius: '10px',
                            color: 'blue',
                            fontWeight:'bold',
                            width:'100%'
                            }} > Product Print Category
                </Typography>

               <FontAwesomeIcon icon={faPlus} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} onClick={AddPrinterSetup}></FontAwesomeIcon>
                <FontAwesomeIcon icon={faPrint} style={{fontSize:'25px',marginRight:'20px',color:'blue'}} onClick={AddPrinterSetup}></FontAwesomeIcon>
     
                </div>
            <div className="Product-printer" style={{ overflow: 'auto' ,height:height-130,width:'100%', border: '1px solid #ccc', borderRadius: '10px', boxShadow: '2px 2px 6px rgba(0, 0, 0, 0.1)', margin: '1px' }}>

                <Table className="Prod-printer list" sx={{
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto'
                            }}>
                        <thead>
                            <tr style={{textAlign:'center'}}>
                            <th>Code</th>
                            <th>Printer Location</th>
                            <th>Printer Name</th>
                            <th>Category Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(Datalist) && Datalist.length > 0 ? (
                            Datalist.map((item, index) => (
                            <tr key={index} onClick={() => handleRetrieveUserData(index)} > 
                            <td>{item.prod_code}</td>
                            <td title={item.prod_desc}>{item.prod_desc}</td>
                            <td title={item.printer_name}>{item.printer_name}</td>
                            <td className='ellipsis' title={item.category_desc}>{item.category_desc}</td>
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


            {OpenAddSetupPrinter && (
                 <div className="modal">
                 <div className="modal-content" style={{width:'500px'}}>
                            <Grid item  style={{margin:'0px',padding: '0px', display: 'flex',flexDirection: 'column',
                            alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                            borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                            }}>
                            <Typography
                                variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                                align="center"
                                sx={{
                                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                                borderRadius: '10px',
                                padding: '10px',
                                color: 'blue',
                                textShadow: '1px 1px 1px rgba(0, 0, 0, 0.5)',
                                fontWeight:'bold'
                                }} > {isEdit ? 'Update Product Print Category':'Add New Product Print Category'}
                            </Typography>
                               
                                <form onSubmit={handleSubmit} style={{margin:'10px',width:'90%'}}>
                                    <div>
                                        <div className='form-group'>
                                        <label>Printer Location</label>
                                        <input type='text' ref = {PrinterLocationRef}  value={PrinterLocation}
                                        onChange={(e)=>setPrinterLocation(e.target.value)}
                                        />
                                        </div>
                                        <div className='form-group'>
                                        <label>Printer Name</label>
                                        <input type='text' ref = {PrinterNameRef}  value={PrinterName}
                                        onClick={GetPrinter}
                                        />
                                        </div>
                                        <div className='form-group'>
                                        <label>Category Description</label>
                                        <input type='text' ref = {CategoryDescRef}  value={CategoryDesc}
                                        onClick={GetProductCategory}
                                        />
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

                                </form>
            
                                
                            
                        </Grid>
                        </div>
                        </div>
            )}
               
               {OpenPrinterModal && (
                 <div className="modal">
                 <div className="modal-content-PrintCat" >
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
                                color: 'red !important',
                                fontWeight:'bold'
                                }} >Select Printer
                            </Typography>
                               
                        </Grid>
                       
                        <Table className="Prod-printer list" sx={{
                                fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                overflow: 'auto'
                            }}>
                        <thead>
                            <tr style={{textAlign:'center'}}>
                            <th>Printer Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.isArray(printer) && printer.length > 0 ? (
                            printer.map((item, index) => (
                            <tr key={index} onClick={()=>selectPrinter(item.printer_name)}> 
                            <td>{item.printer_name}</td>
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
                        </div>
            )}


                           
            {OpenProductModal && (
                 <div className="modal">
                 <div className="modal-content-PrintCat" >
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
                                color: 'red !important',
                                fontWeight:'bold'
                                }} >Product Category Setup
                            </Typography>
                               
                        </Grid>
                        <div className='Product-category-list'>
                            <Table className="Prod-category list" sx={{
                                    fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                    overflow: 'auto'
                                }}>
                            <thead>
                                <tr style={{textAlign:'center'}}>
                                <th></th>
                                <th>Code</th>
                                <th>Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(ProductcategoryList) && ProductcategoryList.length > 0 ? (
                                ProductcategoryList.map((item, index) => (
                                <tr key={index} onClick={()=> handleCheckboxChange(index)}> 
                                <td><input type='checkbox' checked={item.isCheck}/></td>
                                <td>{item.category_code}</td>
                                <td>{item.category_desc}</td>
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
                        <div className='Button-Container'>
                                <button onClick={()=>SaveProductcategory()}>OK</button>
                                <button onClick={()=>setOpenProductModal(false)}>Close</button>

                            </div>
                         </div>
                        </div>
            )}
        </Grid></>
    );
}

export default ProductPrintCategory;