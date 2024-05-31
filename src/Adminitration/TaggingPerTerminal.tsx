import React,{useState,useEffect,useRef} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import {BASE_URL} from "../config";
import { Table } from "@mui/material";
import { Tab } from "react-tabs";
import AcctTileSLName from "./AcctTileGlobal";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";

const TaggingPerTerminal: React.FC = () => {
    const [listOfdata,setlistOfdata] = useState<any>([])
    const [selectedindex,setselectedindex] = useState<any>(null)
    const [showAcctTitleModal,setshowAcctTitleModal] = useState<boolean>(false)
    const [SLorAcct,setSLorAcct]   = useState('');
    const [selectedData,setselectedData]   = useState('');
    const [SlType ,setSlType] = useState<any>('')
    useEffect(()=> {
        const FecthData  = async () =>{
            try{
                const response = await axios.get(`${BASE_URL}/api/tagging-per-terminal/`)
                if (response.status == 200){
                    setlistOfdata(response.data)
                }
            }catch{
                showErrorAlert('Error While Fetching the Data')
            }
        }
        FecthData()
    },[])



const handleclose = () => {
        setshowAcctTitleModal(false)
    }

const ChangeAcctitle = (index:any) => {
        setshowAcctTitleModal(true)
        setSLorAcct('Account Title') 
        const data = listOfdata[index]
        setselectedData(data)
        setselectedindex(index)
}
        
const ChangeSlAccount = (index:any) => {
            setSLorAcct('SL Account')
            setselectedindex(index)
            const data = listOfdata[index]
            if (data.sl_type !== ''){
                setSlType(data.sl_type)
            }
         
            setselectedData(data)
            if (data.account_title.trim() === '') {
                return
            }else{
                setshowAcctTitleModal(true)
            }
         
           
}
    
const DataSend = (data:any) => {
        setshowAcctTitleModal(false)
        if (SLorAcct === 'Account Title'){
            if (data === ''){
                const newData = [...listOfdata]; // Make a copy of the data array
                newData[selectedindex].account_title = '';
                newData[selectedindex].subsidiary_account = '';
                newData[selectedindex].subsidiary_code = '0'; // Update the edited value
                newData[selectedindex].acct_code = '0'; 
                setlistOfdata(newData); // Update the state with the new data
                setSlType('')
            }else{
                const newData = [...listOfdata]; // Make a copy of the data array
                newData[selectedindex].account_title = data.selected.subsidiary_acct_title;
                newData[selectedindex].sl_type = data.selected.sl_type;
                setlistOfdata(newData); // Update the state with the new data
                setSlType(data.selected.sl_type)
            }
    
        } else if (SLorAcct === 'SL Account'){
            if (data === ''){
                const newData = [...listOfdata]; // Make a copy of the data array
                newData[selectedindex].subsidiary_account = '';
                newData[selectedindex].subsidiary_code = '0'; // Update the edited value
                setlistOfdata(newData); // Update the state with the new data
                setSlType('')
            }
            else{
                const newData = [...listOfdata]; // Make a copy of the data array
                if (SlType === 'O'){
                    newData[selectedindex].subsidiary_account = data.selected.sl_name;
    
                    newData[selectedindex].subsidiary_code = data.selected.id_code; // Update the edited value
                    setlistOfdata(newData); // Update the state with the new data
                    setSlType(data.selected.sl_type)
                }else if (SlType ==='E'){
    
                    newData[selectedindex].subsidiary_account = data.selected.last_name + ', ' + data.selected.first_name + ', ' + data.selected.middle_name
    
                    newData[selectedindex].subsidiary_code = data.selected.id_code; 
                    setlistOfdata(newData); 
                    setSlType(data.selected.sl_type)
                }else if (SlType ==='C'){
    
                    newData[selectedindex].subsidiary_account = data.selected.trade_name
    
                    newData[selectedindex].subsidiary_code = data.selected.id_code; 
                    setlistOfdata(newData); 
                    setSlType(data.selected.sl_type)
                }else if (SlType ==='R'){
    
                    newData[selectedindex].subsidiary_account = data.selected.description
    
                    newData[selectedindex].subsidiary_code = data.selected.desc_code; 
                    setlistOfdata(newData); 
                    setSlType(data.selected.sl_type)
                }
    
    
            }
    
        }
        
}

const HandleClickConfigure = async() => {
        try{
    
            const response = await axios.post(`${BASE_URL}/api/tagging-per-terminal/`,{data:listOfdata})
            
            if (response.status == 200){
                    showSuccessAlert(`Successfully Save`)
            }
    
        }catch{
            showErrorAlert(`Error while Saving`)
        }
    }
    return (
        <>
        <div className="Per-terminal">
            <h1>Tagging Per Terminal</h1>
            <div className="card" style={{width:'99%',margin:'5px'}}>
            <Table>
                <thead>
                    <tr>
                        <th style={{width:'8%'}}>UL Code</th>
                        <th style={{width:'8%'}}>Site Code</th>
                        <th style={{width:'8%'}}>Terminal No.</th>
                        <th style={{width:'20%'}}>Event Name</th>
                        <th style={{width:'20%'}}>Account Title</th>
                        <th style={{width:'20%'}}>Subsidiary Account</th>

                    </tr>
                </thead>
                <tbody>
                { listOfdata && listOfdata.map((item:any,index:number) =>(
                    <tr key={index}>
                        <td style={{textAlign:'center'}}>{item.ul_code}</td>
                        <td style={{textAlign:'center'}}>{item.site_code}</td>
                        <td style={{textAlign:'center'}}>{item.terminal_no}</td>
                        <td>{item.event_name}</td>
                        <td onClick={()=>ChangeAcctitle(index)}>{item.account_title}</td>
                        <td onClick={()=>ChangeSlAccount(index)}>{item.subsidiary_account}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
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

export default TaggingPerTerminal;