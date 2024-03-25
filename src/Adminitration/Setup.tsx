import React,{useEffect,useRef,useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import BASE_URL from "../config";
import { Table } from "@mui/material";
import './css/Setup.css'
import AcctTileSLName from "./AcctTileGlobal";
interface TransTypeData {
    Transaction :string,
    TransType :string,
}

const Setup: React.FC<TransTypeData> = ({Transaction,TransType}) => {
    // const [type,setType] = useState<any>('')
    const [listOfdata,setlistOfdata] = useState<any>([])
    const [DebitTable ,setDebitTable] = useState<boolean>(false)
    const [CreditTable ,setCreditTable] = useState<boolean>(false)
    const [DebitSalesTransactionTable ,setDebitSalesTransactionTable] = useState<boolean>(false)
    const [CreditSalesTransactionTable ,setCreditSalesTransactionTable] = useState<boolean>(false)
    let type = ''
    const [selectedindex,setselectedindex] = useState<any>(null)
    const [showAcctTitleModal,setshowAcctTitleModal] = useState<boolean>(false)
    const [SLorAcct,setSLorAcct]   = useState('');
    const [selectedData,setselectedData]   = useState('');

const HideTable = () => {
    setCreditTable(false)
    setDebitTable(false)
    setDebitSalesTransactionTable(false)
    setCreditSalesTransactionTable(false)
}

const ChangeAcctitle = (index:any) => {
setshowAcctTitleModal(true)
setSLorAcct('Account Title') 
const data = listOfdata[index]
setselectedData(data)
setselectedindex(index)
}

const ChangeSlAccount = (index:any) => {
    setshowAcctTitleModal(true)
    setSLorAcct('SL Account')
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
        const newData = [...listOfdata]; // Make a copy of the data array
        newData[selectedindex].accttitle = data.selected.subsidiary_acct_title; // Update the edited value
        setlistOfdata(newData); // Update the state with the new data
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


                {DebitSalesTransactionTable || CreditSalesTransactionTable && 
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




                </div>


            </div>

            {showAcctTitleModal && <AcctTileSLName handleClose = {handleclose} Transaction ={SLorAcct} currentvalue={selectedData} DataSend = {DataSend} />}
        </div>
    )

}

export default Setup;