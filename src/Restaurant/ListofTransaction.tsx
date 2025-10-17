import { Button, Grid, Table } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import './css/ListofTransaction.css'
import axios from "axios";
import {BASE_URL} from "../config";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";



import Swal from 'sweetalert2';
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import { GetCurrentDateOnly, GetSettings } from "../global";
import Verification from "./Verification";
interface Transaction {
handleclose:()=> void;
data:any;
}

const ListOfTransaction: React.FC<Transaction> = ({handleclose,data})=>{
    const [listOfTransactionData, setListOfTransactionData] = useState<any[]>([]);
    const [isSelectedData,setisSelectedData] = useState<any[]>([]);
    const [selectedindex,setselectedindex] = useState<any>(null)
    const [DateFrom,setDateFrom] = useState<any>(null)
    const [DateTo,setDateTo] = useState<any>(null)
    const [DocType,setDocType] = useState<any>('POS-SI')
    const [DocNo,setDocNo] = useState<any>('')


    const dateFromRef = useRef(null);
    const dateToRef = useRef(null);
    const docTypeRef = useRef(null);
    const docNoRef = useRef(null);
    useEffect(() => {
        const fetchData1 = async() => {
            const dateFormatted = await GetCurrentDateOnly()
            setDateTo(dateFormatted)
            setDateFrom(dateFormatted)
       
        }
        fetchData1()

    },[])


    useEffect(()=>{
        if (DateFrom){
            FetchData()
        }

    },[DateFrom])

    const FetchData = async() => {
        try{
        const response = await axios.get(`${BASE_URL}/api/sales-list-of-transaction/`,{
            params:{
                DateFrom:DateFrom,
                DateTo:DateTo,
                DocType:DocType,
                DocNo:DocNo
            },withCredentials:true
        })
        if (response.status === 200){
            // showSuccessAlert('Success While Fetching Data in Sales invoice')
            setListOfTransactionData(response.data)
        }
        }catch{
            showErrorAlert('Error While Fetching List of Transaction in Sales Invoice')
        }

    }


    const SelectData = (index:any)=>{
        const selected = listOfTransactionData[index]
        setselectedindex(index)
        setisSelectedData(selected)
    }

const CancelleTransaction = async(data:any) => {
    try{
        const response = await axios.post(`${BASE_URL}/api/sales-list-of-transaction/`,{
            data:isSelectedData,
            verify : data,
        },{withCredentials:true})
        if (response.status === 200){
            showSuccessAlert('Transaction Successfully cancelled')
            FetchData()
            // setListOfTransactionData(response.data)
        }
        }catch{
            showErrorAlert('Error While Cancelling Transaction in Sales Invoice')
        }
}


const SearchData = () => {
    FetchData()
}


const [OpenVireficationModal,setOpenVireficationModal] = useState<boolean>(false)
const [VeryficationType,setVeryficationType] = useState<string>('')
const OpenVireficationEntry = () => {
  setOpenVireficationModal(true)

}

const CloseVerification = () => {
  setOpenVireficationModal(false)

}

const OKVerification = (data:any) => {
  setOpenVireficationModal(false)
  console.log(data)
  
  CancelleTransaction(data)
}



    return (
        <>
        <div className="modal">
            <div className="modal-content-cancell">
                <h1>Cancell Transaction</h1>
                <div className="card">

                    <div className="Search-Container">

                        <div className="form-group">
                            <label>Date From</label>
                            <input type='date' ref={dateFromRef} value={DateFrom} onChange={(e) => setDateFrom(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Date To</label>
                            <input type='date' ref={dateToRef} value={DateTo} onChange={(e) => setDateTo(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Document Type</label>
                            <input type='text'  ref={docTypeRef} value={DocType} onChange={(e) => setDocType(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Document No.</label>
                            <input type='text'ref={docNoRef} value={DocNo} onChange={(e) => setDocNo(e.target.value)}/>
                        </div>
             
                           <button className="SearchD" onClick={()=>SearchData()} >Search</button>
                        

                    </div>
                    <div className="CancellTrans-Container">
                    <Table>
                        <thead>
                            <tr>
                                <th>Date Time</th>
                                <th>Terminal No</th>
                                <th>Reference No</th>
                                <th>Customer Name</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Discount</th>
                            </tr>
                        </thead>
                            <tbody>
                                
                            {listOfTransactionData.length > 0 ? (
                                    listOfTransactionData.map((transaction, index) => (
                                    <tr key={index} onClick={()=>SelectData(index)} className ={selectedindex === index?'selected':''} >
                                        {/* Render content for each transaction */}
                                        <td>{transaction.doc_date}</td>
                                        <td>{transaction.terminal_no}</td>
                                        <td>{parseFloat(transaction.doc_no).toFixed(0)}</td>
                                        <td>{transaction.customer_name}</td>
                                        <td>{parseFloat(transaction.sub_total).toFixed(2)}</td>
                                        <td>{transaction.status}</td>
                                        <td>{parseFloat(transaction.discount).toFixed(2)}</td>
                                        {/* Add more table cells as needed */}
                                    </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan = {7}> No transaction data available</td>
                                    </tr>
                                )}
                            </tbody>
                       
                        
                    </Table>
                    </div>



                </div>
                <div className="Button-Container">
                <button className="ok" onClick={()=>OpenVireficationEntry()}>Cancell Transaction</button>
                <button className="cancel" onClick={()=>handleclose()}>Close</button>

            </div>
            </div>

        </div>

        {OpenVireficationModal && <Verification handleClose={CloseVerification} VerificationEntry={OKVerification}/>}
        </>
    )
}

export default ListOfTransaction;