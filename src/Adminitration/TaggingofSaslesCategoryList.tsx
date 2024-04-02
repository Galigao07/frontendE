import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './css/TaggingofSaslesCategoryList.css'
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import BASE_URL from "../config";
import { Table } from "@mui/material";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import AcctTileSLName from "./AcctTileGlobal";


const TaggingofSaslesCategoryList:React.FC = () => {
    const [OpenNonVatTable,setOpenNonVatTable] = useState<boolean>(false)
    const [OpenVatTable,setOpenVatTable] = useState<boolean>(true)
    const [OpenZeroRatedVatTable,setOpenZeroRatedVatTable] = useState<boolean>(false)
    const [OpenVatExcemptTable,setOpenVatExcemptTable] = useState<boolean>(false)
    const [listOfdata,setlistOfdata] = useState<any>([])
    const [isSelectedTable,setisSelectedTable] = useState<any>(0)


useEffect(()=> {

    const fetchdata = async () =>{
        try{

            const response = await axios.get(`${BASE_URL}/api/tagging-sales-category/`)
            
            if (response.status == 200){
                setlistOfdata(response.data)
            }
            
        }catch{
            showErrorAlert('Error While Fetching Data')
        }
    }
    fetchdata()

},[])

const fetchdata = async () =>{
    try{

        const response = await axios.get(`${BASE_URL}/api/tagging-sales-category/`)
        
        if (response.status == 200){
            setlistOfdata(response.data)
        }
        
    }catch{
        showErrorAlert('Error While Fetching Data')
    }
}

    const HideTable = () => {
        setOpenNonVatTable(false)
        setOpenVatTable(false)
        setOpenZeroRatedVatTable(false)
        setOpenVatExcemptTable(false)
    }

    const ClickVat = () => {
        HideTable()
        setOpenVatTable(true)
        setisSelectedTable(0)
    }
    const ClickNonVat = () => {
        HideTable()
        setOpenNonVatTable(true)
        setisSelectedTable(1)
    }
    const ClickZeroRated = () => {
        HideTable()
        setOpenZeroRatedVatTable(true)
        setisSelectedTable(2)
    }
    const ClickVatExcempt = () => {
        HideTable()
        setOpenVatExcemptTable(true)
        setisSelectedTable(3)
    }

    const HandleClickConfigure = async() => {
        let vat_type:any = 'VAT'

        if (OpenVatTable){
            vat_type = 'VAT'
        }else if (OpenNonVatTable){
            vat_type = 'Non VAT'
        }else if (OpenZeroRatedVatTable){
            vat_type = 'Zero Rated'
        }else if (OpenVatExcemptTable){
            vat_type = 'VAT Excempt'
        }

        try{
    
            const response = await axios.post(`${BASE_URL}/api/tagging-sales-category/`,{data:listOfdata,vat_type:vat_type})
            
            if (response.status == 200){
                    showSuccessAlert(`Successfully Save`)
            }
    
        }catch{
            showErrorAlert(`Error while Saving`)
        }
    }

    const [selectedindex,setselectedindex] = useState<any>(null)
    const [showAcctTitleModal,setshowAcctTitleModal] = useState<boolean>(false)
    const [SLorAcct,setSLorAcct]   = useState('');
    const [selectedData,setselectedData]   = useState('');
    const [SlType ,setSlType] = useState<any>('')
    const [isFirst,setIsFirst]=useState(true);

    const handleclose = () => {
        setshowAcctTitleModal(false)
    }

const ChangeAcctitle = (index:any) => {
        setIsFirst(true)
        setshowAcctTitleModal(true)
        setSLorAcct('Account Title') 
        const data = listOfdata[index]
        setselectedData(data)
        setselectedindex(index)
}
        
const ChangeAcctitle2 = (index:any) => {
    let data = listOfdata[index]
    if (OpenVatTable){
      if (data.vat_title ===''){
        return
      }
    }else if (OpenNonVatTable){
        if (data.nonvat_title ===''){
            return
          }
    }else if (OpenZeroRatedVatTable){
        if (data.zerorated_title ===''){
            return
          }
    }else if (OpenVatExcemptTable){
        if (data.vatex_title ===''){
            return
          }
    }
        setIsFirst(false)
        setshowAcctTitleModal(true)
        setSLorAcct('Account Title') 
 
        setselectedData(data)
        setselectedindex(index)
           
}
    
const DataSend = (data:any) => {
        setshowAcctTitleModal(false)
        if (OpenVatTable){
            if (SLorAcct === 'Account Title'){
                if (isFirst){
                    if (data === ''){
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].vat_title = '';
                        newData[selectedindex].vat_code = '0'; 
                        setlistOfdata(newData); // Update the state with the new data
                    }else{
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].vat_title = data.selected.subsidiary_acct_title;
                        // newData[selectedindex].vat_code = data.selected.code;
                        newData[selectedindex].sl_type = data.selected.sl_type;
                        setlistOfdata(newData); // Update the state with the new data
                    }
             
                }else{
                    if (data === ''){
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].acct_title2 = '';
                        newData[selectedindex].acct_code2 = '0'; 
                        setlistOfdata(newData); // Update the state with the new data
                        setSlType('')
                    }else{
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].acct_title2 = data.selected.subsidiary_acct_title;
                        // newData[selectedindex].acct_code2 = data.selected.code;
                        setlistOfdata(newData); // Update the state with the new data
                    }
            
                }
               
            } 
        }else if (OpenNonVatTable){
            if (SLorAcct === 'Account Title'){
                if (isFirst){
                    if (data === ''){
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].nonvat_title = '';
                        newData[selectedindex].nonvat_code = '0'; 
                        setlistOfdata(newData); // Update the state with the new data
                    }else{
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].nonvat_title = data.selected.subsidiary_acct_title;
                        // newData[selectedindex].nonvat_code = data.selected.code;
                        newData[selectedindex].sl_type = data.selected.sl_type;
                        setlistOfdata(newData); // Update the state with the new data
                    }
             
                }else{
                    if (data === ''){
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].acct_title3 = '';
                        newData[selectedindex].acct_code3 = '0'; 
                        setlistOfdata(newData); // Update the state with the new data
                        setSlType('')
                    }else{
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].acct_title3 = data.selected.subsidiary_acct_title;
                        // newData[selectedindex].acct_code3 = data.selected.code;
                        setlistOfdata(newData); // Update the state with the new data
                    }
            
                }
               
            } 
        }else if (OpenZeroRatedVatTable){
            if (SLorAcct === 'Account Title'){
                if (isFirst){
                    if (data === ''){
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].zerorated_title = '';
                        newData[selectedindex].zerorated_code = '0'; 
                        setlistOfdata(newData); // Update the state with the new data
                    }else{
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].zerorated_title = data.selected.subsidiary_acct_title;
                        // newData[selectedindex].zerorated_code = data.selected.code;
                        newData[selectedindex].sl_type = data.selected.sl_type;
                        setlistOfdata(newData); // Update the state with the new data
                    }
             
                }else{
                    if (data === ''){
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].acct_title4 = '';
                        newData[selectedindex].acct_code4 = '0'; 
                        setlistOfdata(newData); // Update the state with the new data
                        setSlType('')
                    }else{
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].acct_title4 = data.selected.subsidiary_acct_title;
                        // newData[selectedindex].acct_code4 = data.selected.code;
                        setlistOfdata(newData); // Update the state with the new data
                    }
            
                }
               
            } 
        }else if (OpenVatExcemptTable){
            if (SLorAcct === 'Account Title'){
                if (isFirst){
                    if (data === ''){
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].vatex_title = '';
                        newData[selectedindex].vatex_code = '0'; 
                        setlistOfdata(newData); // Update the state with the new data
                    }else{
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].vatex_title = data.selected.subsidiary_acct_title;
                        // newData[selectedindex].vatex_code = data.selected.code;
                        newData[selectedindex].sl_type = data.selected.sl_type;
                        setlistOfdata(newData); // Update the state with the new data
                    }
             
                }else{
                    if (data === ''){
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].acct_title5 = '';
                        newData[selectedindex].acct_code5 = '0'; 
                        setlistOfdata(newData); // Update the state with the new data
                        setSlType('')
                    }else{
                        const newData = [...listOfdata]; // Make a copy of the data array
                        newData[selectedindex].acct_title5 = data.selected.subsidiary_acct_title;
                        // newData[selectedindex].acct_code5 = data.selected.code;
                        setlistOfdata(newData); // Update the state with the new data
                    }
            
                }
               
            } 
        }

    }
        

    return(
        <>
        <div className="category-list">
            <h1>Category List</h1>
            <div className="card">
                <div className="category-Button-Container">
                    <button tabIndex={0} onClick={()=>ClickVat()} style={{backgroundColor: isSelectedTable === 0 ? 'Red':'Blue'}}>VAT</button>
                    <button tabIndex={1}  onClick={()=>ClickNonVat()} style={{backgroundColor: isSelectedTable === 1 ? 'Red':'Blue'}}>Non VAT</button>
                    <button tabIndex={2}  onClick={()=>ClickZeroRated()} style={{backgroundColor: isSelectedTable === 2 ? 'Red':'Blue'}}>Zero Rated</button>
                    <button tabIndex={3}  onClick={()=>ClickVatExcempt()} style={{backgroundColor: isSelectedTable === 3 ? 'Red':'Blue'}}>VAT Excempt</button>
                </div>
                <div className="table-container">
                    {OpenVatTable && 
                    <Table>
                        <thead>
                            <tr>
                                <th style={{width:'10%'}}>Code</th>
                                <th style={{width:'15%'}}>Module</th>
                                <th style={{width:'25%'}}>Category Description</th>
                                <th style={{width:'25%'}}>Account Title</th>
                                <th style={{width:'25%'}}>Account Title (Discount)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfdata && listOfdata.map((item:any,index:number) => (
                                <tr key={index}>
                                <td>{item.mod_code}</td>
                                <td>{item.module}</td>
                                <td>{item.category_desc}</td>
                                <td onClick={()=>ChangeAcctitle(index)}>{item.vat_title}</td>
                                <td onClick={()=>ChangeAcctitle2(index)}>{item.acct_title2}</td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    }
                    {OpenNonVatTable && 
                    <Table>
                    <thead>
                        <tr>
                            <th style={{width:'10%'}}>Code</th>
                            <th style={{width:'15%'}}>Module</th>
                            <th style={{width:'25%'}}>Category Description</th>
                            <th style={{width:'25%'}}>Account Title</th>
                            <th style={{width:'25%'}}>Account Title (Discount)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfdata && listOfdata.map((item:any,index:number) => (
                            <tr key={index}>
                            <td>{item.mod_code}</td>
                            <td>{item.module}</td>
                            <td>{item.category_desc}</td>
                            <td onClick={()=>ChangeAcctitle(index)}>{item.nonvat_title}</td>
                            <td onClick={()=>ChangeAcctitle2(index)}>{item.acct_title3}</td>
                        </tr>
                        ))}
                    </tbody>
                    </Table>
                    }
                    {OpenZeroRatedVatTable && 
                    <Table>
                        <thead>
                            <tr>
                                <th style={{width:'10%'}}>Code</th>
                                <th style={{width:'15%'}}>Module</th>
                                <th style={{width:'25%'}}>Category Description</th>
                                <th style={{width:'25%'}}>Account Title</th>
                                <th style={{width:'25%'}}>Account Title (Discount)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfdata && listOfdata.map((item:any,index:number) => (
                                <tr key={index}>
                                <td>{item.mod_code}</td>
                                <td>{item.module}</td>
                                <td>{item.category_desc}</td>
                                <td onClick={()=>ChangeAcctitle(index)}>{item.zerorated_title}</td>
                                <td onClick={()=>ChangeAcctitle2(index)}>{item.acct_title4}</td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    }
                    {OpenVatExcemptTable && 
                        <Table>
                        <thead>
                            <tr>
                                <th style={{width:'10%'}}>Code</th>
                                <th style={{width:'15%'}}>Module</th>
                                <th style={{width:'25%'}}>Category Description</th>
                                <th style={{width:'25%'}}>Account Title</th>
                                <th style={{width:'25%'}}>Account Title (Discount)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listOfdata && listOfdata.map((item:any,index:number) => (
                                <tr key={index}>
                                <td>{item.mod_code}</td>
                                <td>{item.module}</td>
                                <td>{item.category_desc}</td>
                                <td onClick={()=>ChangeAcctitle(index)}>{item.vatex_title}</td>
                                <td onClick={()=>ChangeAcctitle2(index)}>{item.acct_title5}</td>
                            </tr>
                            ))}
                        </tbody>
                    </Table>
                    }
                </div>
            </div>
            <div className="Button-Container" style={{ justifyContent: 'flex-end'}}>
                <button  style={{ width: '200px',  backgroundColor: 'blue', }}
                onClick ={()=> {HandleClickConfigure()}}>
                    Configure
                </button>
            </div>
        </div>
        {showAcctTitleModal && <AcctTileSLName handleClose = {handleclose} Transaction ={SLorAcct} currentvalue={selectedData} DataSend = {DataSend} />}

        </>
    )
}

export default TaggingofSaslesCategoryList;