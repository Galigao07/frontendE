import React,{useEffect,useRef,useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import BASE_URL from "../config";
import { Table } from "@mui/material";
import './css/Setup.css'
import AcctTileSLName from "./AcctTileGlobal";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
interface TransTypeData {
    Transaction :string,
    TransType :string,
}

const Setup: React.FC<TransTypeData> = ({Transaction,TransType}) => {
    // const [type,setType] = useState<any>('')
    const [listOfdata,setlistOfdata] = useState<any>([])
    const [DebitTable ,setDebitTable] = useState<boolean>(false)
    const [CreditTable ,setCreditTable] = useState<boolean>(false)
    const [AllowedPricetypeTable ,setAllowedPricetypeTable] = useState<boolean>(false)
    const [DebitSalesTransactionTable ,setDebitSalesTransactionTable] = useState<boolean>(false)
    const [CreditSalesTransactionTable ,setCreditSalesTransactionTable] = useState<boolean>(false)
    const [SetupSLPerTerminal ,setSetupSLPerTerminal] = useState<boolean>(false)
    let type = ''
    const [selectedindex,setselectedindex] = useState<any>(null)
    const [showAcctTitleModal,setshowAcctTitleModal] = useState<boolean>(false)
    const [SLorAcct,setSLorAcct]   = useState('');
    const [selectedData,setselectedData]   = useState('');
    const [SlType ,setSlType] = useState<any>('')

    const ConfigRef = useRef<HTMLButtonElement>(null)


const HideTable = () => {
    setCreditTable(false)
    setDebitTable(false)
    setDebitSalesTransactionTable(false)
    setCreditSalesTransactionTable(false)
    setAllowedPricetypeTable(false)
    setSetupSLPerTerminal(false)
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
    if (data.accttitle.trim() === '') {
        return
    }else{
        setshowAcctTitleModal(true)
    }
 
   
}

useEffect(()=> {

        const FecthData = async() => {
            try {
                HideTable()
                let tpmType = ''
                if (Transaction == 'Event Setup - Debit'){
                    type  = 'Debit'
                    setDebitTable(true)
                }else if (Transaction == 'Event Setup - Credit'){
                    type  = 'Credit'
                    setCreditTable(true)
                }else if (Transaction =='Setp-up of Debit account for Sales Transaction'){
                    type  = 'Setp-up of Debit account for Sales Transaction'
                    setDebitSalesTransactionTable(true)
                }else if (Transaction =='Setp-up of Credit account for Sales Transaction'){
                    setCreditSalesTransactionTable(true)
                    type  = 'Setp-up of Credit account for Sales Transaction'
                }else if (Transaction =='Default Price Type'){
                    type  = 'Default Price Type'
                    setAllowedPricetypeTable(true)
                }else if (Transaction =='Setup SL Type Per Terminal'){
                    type  = 'Setup SL Type Per Terminal'
                    setSetupSLPerTerminal(true)
                }
                const response = await axios.get(`${BASE_URL}/api/setup/`,{
                    params: {
                        TransType:TransType,
                        Transaction:type
                    } })

                if (response.status==200){
                    const data = response.data
                   setlistOfdata(data)
                    console.log('REcieve',data)
                }
    
            }catch{
                showErrorAlert(`Error while Fetching Data in Transtype ${TransType}`)
            }
    
        }
        FecthData();

},[Transaction])


const handleclose = () => {
    setshowAcctTitleModal(false)
}

const DataSend = (data:any) => {
    setshowAcctTitleModal(false)
    if (SLorAcct === 'Account Title'){
        if (data === ''){
            const newData = [...listOfdata]; // Make a copy of the data array
            newData[selectedindex].accttitle = '';
            newData[selectedindex].sl_type =''; // Update the edited value
            newData[selectedindex].slacct = '';
            newData[selectedindex].slid = '0'; // Update the edited value
            setlistOfdata(newData); // Update the state with the new data
            setSlType('')
        }else{
            const newData = [...listOfdata]; // Make a copy of the data array
            newData[selectedindex].accttitle = data.selected.subsidiary_acct_title;
            newData[selectedindex].sl_type = data.selected.sl_type; // Update the edited value
            setlistOfdata(newData); // Update the state with the new data
            setSlType(data.selected.sl_type)
        }

    } else if (SLorAcct === 'SL Account'){
        if (data === ''){
            const newData = [...listOfdata]; // Make a copy of the data array
            newData[selectedindex].slacct = '';
            newData[selectedindex].slid = '0'; // Update the edited value
            setlistOfdata(newData); // Update the state with the new data
            setSlType('')
        }
        else{
            const newData = [...listOfdata]; // Make a copy of the data array
            if (SlType === 'O'){
                newData[selectedindex].slacct = data.selected.sl_name;

                newData[selectedindex].slid = data.selected.id_code; // Update the edited value
                setlistOfdata(newData); // Update the state with the new data
                setSlType(data.selected.sl_type)
            }else if (SlType ==='E'){

                newData[selectedindex].slacct = data.selected.last_name + ', ' + data.selected.first_name + ', ' + data.selected.middle_name

                newData[selectedindex].slid = data.selected.id_code; 
                setlistOfdata(newData); 
                setSlType(data.selected.sl_type)
            }else if (SlType ==='C'){

                newData[selectedindex].slacct = data.selected.trade_name

                newData[selectedindex].slid = data.selected.id_code; 
                setlistOfdata(newData); 
                setSlType(data.selected.sl_type)
            }else if (SlType ==='R'){

                newData[selectedindex].slacct = data.selected.description

                newData[selectedindex].slid = data.selected.desc_code; 
                setlistOfdata(newData); 
                setSlType(data.selected.sl_type)
            }


        }

    }
    
}

const HandleClickConfigure = async() => {
    try{

        const response = await axios.post(`${BASE_URL}/api/setup-configure/`,{data:listOfdata})
        
        if (response.status == 200){
                showSuccessAlert(`Successfully Save ${Transaction}`)
        }

    }catch{
        showErrorAlert(`Error while Saving ${Transaction}`)
    }
}


    const handleEdit = (index:any, value:any) => {
        const newData = [...listOfdata]; // Make a copy of the data array
        newData[index].accttitle = value; // Update the edited value
        setlistOfdata(newData); // Update the state with the new data
    };
    return (
        <div className="card">
            <div className="card-body">
                <h1>{Transaction}</h1>
                <div className="card">


                {DebitTable &&
                    <Table>
                        <thead>
                            <tr>
                                <th>ID Code</th>
                                <th>Bank Name</th>
                                <th>SL Account</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listOfdata.length > 0 ? (
                            listOfdata.map((item:any, index:any) => (
                                <tr key={index}>
                                    <td>{String(item.bankcode).padStart(6,'0')}</td>
                                    <td>{item.bankname}</td>
                                    <td>{item.accttitle}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}></td>
                            </tr>
                        )} 
                        </tbody>
                    </Table>
                }

                
                {CreditTable &&
                    <Table>
                        <thead>
                            <tr>
                                <th>ID Code</th>
                                <th>Bank Name</th>
                                <th>SL Account</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listOfdata.length > 0 ? (
                            listOfdata.map((item:any, index:any) => (
                                <tr key={index}>
                                    <td>{String(item.bankcode).padStart(6,'0')}</td>
                                    <td>{item.bankname}</td>
                                    <td>{item.accttitle}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}></td>
                            </tr>
                        )}
                           
                        </tbody>
                    </Table>
                }


                {CreditSalesTransactionTable && 
                    <Table>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Account Title</th>
                                <th>Subsidiary Account</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listOfdata.length > 0 ? (
                            listOfdata.map((item:any, index:any) => (
                                <tr key={index}>
                                    <td>{item.event}</td>
                                    <td onClick={(e) => ChangeAcctitle(index)}>{item.accttitle}</td>
                                    <td onClick={(e) => ChangeSlAccount(index)}> {item.slacct}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}></td>
                            </tr>
                        )}
                           
                        </tbody>
                    </Table>
                }

                {DebitSalesTransactionTable && 
                    <Table>
                        <thead>
                            <tr>
                                <th>Event</th>
                                <th>Account Title</th>
                                <th>Subsidiary Account</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listOfdata.length > 0 ? (
                            listOfdata.map((item:any, index:any) => (
                                <tr key={index}>
                                    <td>{item.event}</td>
                                    <td onClick={(e) => ChangeAcctitle(index)}>{item.accttitle}</td>
                                    <td onClick={(e) => ChangeSlAccount(index)}> {item.slacct}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}></td>
                            </tr>
                        )}
                           
                        </tbody>
                    </Table>   
                }

                {AllowedPricetypeTable && 
                    <Table>
                        <thead>
                            <tr>
                                <th>Side Code</th>
                                <th>Site Name</th>
                                <th>Default Price Type</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listOfdata.length > 0 ? (
                            listOfdata.map((item:any, index:any) => (
                                <tr key={index}>
                                    <td>{item.site_code}</td>
                                    <td>{item.site_name}</td>
                                    <td onClick={(e) => ChangeSlAccount(index)}> {item.default_pricetype}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}></td>
                            </tr>
                        )}
                           
                        </tbody>
                    </Table>   
                }

                {SetupSLPerTerminal && 
                    <Table>
                        <thead>
                            <tr>
                                <th>Event Name</th>
                                <th>Acount Title</th>
                                <th>Subsidiary Account Title</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listOfdata.length > 0 ? (
                            listOfdata.map((item:any, index:any) => (
                                <tr key={index}>
                                    <td>{item.event}</td>
                                    <td onClick={(e) => ChangeAcctitle(index)}>{item.accttitle}</td>
                                    <td onClick={(e) => ChangeSlAccount(index)}> {item.slacct}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}></td>
                            </tr>
                        )}
                           
                        </tbody>
                    </Table>   
                }



                
                </div>
                <div className="Button-Container" style={{ justifyContent: 'flex-end'}}>
                <button ref={ConfigRef} style={{ width: '200px',  backgroundColor: 'blue', }}
                onClick ={()=> {HandleClickConfigure()}}>
                    Configure
                </button>
                </div>
                

            </div>

            {showAcctTitleModal && <AcctTileSLName handleClose = {handleclose} Transaction ={SLorAcct} currentvalue={selectedData} DataSend = {DataSend} />}
        </div>
    )

}

export default Setup;