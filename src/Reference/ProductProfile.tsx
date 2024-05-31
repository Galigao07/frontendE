import React from 'react';
import {useState, Fragment, useEffect, useRef} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
// import logo from './css/logo.png'
import axios from 'axios';
import Swal from 'sweetalert2';
import {BASE_URL} from '../config';
import { Table } from '@mui/material';
import showErrorAlert from '../SwalMessage/ShowErrorAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './css/ProductProfile.css'
import ClientLogo from '../assets/GervaciosLogo.jpg'
import { resolvePath } from 'react-router-dom';
import showSuccessAlert from '../SwalMessage/ShowSuccessAlert';

const ProductProfile: React.FC = () =>{
    const [imagePreview, setImagePreview] = useState<any>('');
    const [ProductList,setProductList] = useState<any>([])
    const [Search,setSearch] = useState<any>([])
    const [ShowSearchModal,setShowSearchModal] = useState<boolean>(false)
    const [ProductData,setProductData] = useState<any>({
        barcode:'',
        description:'',
    })

    const SearchRef = useRef<HTMLInputElement>(null)
    const BarcodeRef = useRef<HTMLInputElement>(null)
    const DescriptionRef = useRef<HTMLInputElement>(null)
    const ImageRef = useRef<HTMLImageElement>(null)



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

    const SearchProduct = async(e:any) => {

        // try{

        //     const response = await axios.get(`${BASE_URL}/api/product-profile/`,{
        //             Description:e
        //     })

        //     if (response.status===200){
        //         const data = response.data
        //         setProductList(data)
        //     }

        // }catch{
        //     showErrorAlert('Error While Fetching Data in Product Profile')
        // }

    }


    const ShowSearchModalContainer = () => {
        setShowSearchModal(true)

        setTimeout(() => {
            if (SearchRef.current){
                SearchRef.current.focus()
            }
        }, 100); 
    }

    const handleChange = (e:any)=>{

    } 


    useEffect(()=>{

        const fetchData = async() =>{
            try{
                const response = await axios.get(`${BASE_URL}/api/product-profile/`,{
                    params:{
                        Search:Search
                    }
                })
    
                if (response.status === 200){
                    setProductList(response.data)
                }
            }catch{
                showErrorAlert('Error while Fetching Data in Product Profile')
            }
        }
    
        fetchData()
    },[Search])



    const openSearchModal = async() =>{
       
        try{
            const response = await axios.get(`${BASE_URL}/api/product-profile/`,{
                params:{
                    Search:Search
                }
            })

            if (response.status === 200){
                setProductList(response.data)
                setShowSearchModal(true)
            }
        }catch{
            showErrorAlert('Error while Fetching Data in Product Profile')
        }

        setTimeout(() => {

            if (SearchRef.current){
                SearchRef.current.focus()
            }
            
        }, 100);
    }

    
    const CloseSearchModal = () =>{
        setShowSearchModal(false)
    }

    const  selectProduct = (index:any) => {
        const selectdata = ProductList[index]

        setProductData({
            barcode:selectdata.bar_code,
            description:selectdata.long_desc
        })
        if (selectdata.prod_img===null){
            setImagePreview(ClientLogo)
        }else{
            setImagePreview('data:image/jpeg;base64,' + selectdata.prod_img)
        }


        setShowSearchModal(false)

    }

    const SaveImage = async() => {
        try{

            const response = await axios.post(`${BASE_URL}/api/product-profile/`,{
                data:ProductData,
                image_prod : imagePreview,
            })
            if (response.status===200){
                showSuccessAlert('Successfully Update Image')
            }
        }catch{
            showErrorAlert('Error while Updating Image')
        }
    }


    return(
        <>
        <div className='Main-Container'>
            <h1>Product Profile</h1>
            <div className='card'>
                <div className='Search-Container'>
                        <FontAwesomeIcon className='Search-icon' icon={faSearch} onClick={ShowSearchModalContainer}></FontAwesomeIcon>
                </div>
                <div className='Product-Container'>
                    <div className='form-group'>
                        <label>Barcode</label>
                        <input  ref={BarcodeRef} type='text' placeholder='Barcode' value={ProductData.barcode} onClick={openSearchModal}/>
                    </div>
                    <div className='form-group'>
                        <label>Description</label>
                        <input ref={DescriptionRef} type='text' placeholder='Description' value={ProductData.description} onClick={openSearchModal}/>
                    </div>

                    <div className='form-group image'>
                        <div className='avatar-upload' style={{marginTop:'25px'}}>
                            <div className='avatar-edit'>
                                <input type='file' id='imageUpload'name='imageUpload'accept='.png, .jpg, .jpeg' onChange={handleImageChange}/>
                                <label htmlFor='imageUpload' className='upload-label'></label>
                                <label htmlFor='imageUpload'></label>
                            </div>
                            <div className='avatar-preview'>
                                <div className='imagePreview' style={{backgroundSize: 'cover',backgroundPosition: 'center',
                                      backgroundImage: `url(${imagePreview})`
                                    ,height:'100%', width:'100%',  }}>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
            <div className='Button-Container'>
                <button onClick={()=>SaveImage()}>Save</button>

            </div>
        </div>
   

   {ShowSearchModal && 
   
   <div className='modal'>
    <div className='modal-content-SearchProductProfile'>
        <h1>Select Product</h1>
        <div className='card'>
            <div className='Search-Container'>
                <input type='text' ref={SearchRef} placeholder='Search....' onChange={(e)=> setSearch(e.target.value)}/>
            </div>
            <div className='Table-Container'>
                    <Table className='Product-list' style={{height:'fit-content'}}>
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Barcode</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProductList && ProductList.map((item:any,index:any) => (
                                <tr key={index} onClick={()=>selectProduct(index)}>
                                    <td>
                                    <img src={item.prod_img === null ? ClientLogo : 'data:image/jpeg;base64,' + item.prod_img} alt="Product Image" />

                                        </td>
                                    <td>{item.bar_code}</td>
                                    <td>{item.long_desc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

            </div>



        </div>

        <div className='Button-Container'>
            <button onClick={CloseSearchModal}>Close</button>
        </div>

    </div>

   </div>
}
    </>

    )
}

export default ProductProfile;