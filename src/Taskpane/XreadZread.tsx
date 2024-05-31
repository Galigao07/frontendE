import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Table, Typography } from "@mui/material";
import './css/XreadZread.css';
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import {BASE_URL} from "../config";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";


const XreadZred: React.FC = () => {

    const [terminalNumber, setTerminalNumber] = useState('0.00');
    const [machineSerialNo, setMachineSerialNo] = useState('0.00');
    const [zReadingNumber, setZReadingNumber] = useState('0.00');
    const [fromSalesInvoiceNo, setFromSalesInvoiceNo] = useState('0.00');
    const [toSalesInvoiceNo, setToSalesInvoiceNo] = useState('0.00');
    const [fromCreditInvoiceNo, setFromCreditInvoiceNo] = useState('0.00');
    const [toCreditInvoiceNo, setToCreditInvoiceNo] = useState('0.00');
    const [fromSalesReturnNo, setFromSalesReturnNo] = useState('0.00');
    const [toSalesReturnNo, setToSalesReturnNo] = useState('0.00');
    const [dailySales, setDailySales] = useState('0.00');
    const [oldGrandTotal, setOldGrandTotal] = useState('0.00');
    const [newGrandTotal, setNewGrandTotal] = useState('0.00');
    const [vatableSales, setVatableSales] = useState('0.00');
    const [vatExemptSales, setVatExemptSales] = useState('0.00');
    const [nonVatSales, setNonVatSales] = useState('0.00');
    const [zeroRatedSales, setZeroRatedSales] = useState('0.00');

    // Refs for input elements
    const terminalNumberRef = useRef(null);
    const machineSerialNoRef = useRef(null);
    const zReadingNumberRef = useRef(null);
    const fromSalesInvoiceNoRef = useRef(null);
    const toSalesInvoiceNoRef = useRef(null);
    const fromCreditInvoiceNoRef = useRef(null);
    const toCreditInvoiceNoRef = useRef(null);
    const fromSalesReturnNoRef = useRef(null);
    const toSalesReturnNoRef = useRef(null);
    const dailySalesRef = useRef(null);
    const oldGrandTotalRef = useRef(null);
    const newGrandTotalRef = useRef(null);
    const vatableSalesRef = useRef(null);
    const vatExemptSalesRef = useRef(null);
    const nonVatSalesRef = useRef(null);
    const zeroRatedSalesRef = useRef(null);
    const [DateFrom,setDateFrom] = useState<any>(null)
    const [DateTo,setDateTo] = useState<any>(null)
    const [Cashier,setCashier] = useState<any>([])
    const DateFromRef = useRef(null)
    const DateToRef = useRef(null)
    const [selectedindex,setselectedindex] = useState<any>(null)
    const [selectCashier,setselectCashier] = useState<string>('')
    const [ShowIframe,setShowIframe] = useState<boolean>(false)
    const [CashierModal,setCashierModal] = useState<boolean>(false)
    const [login_record,setlogin_record] = useState<any>(null)
    const [id_code,setid_code] = useState<any>(null)



const XreadClick = async () => {
    try{
        const response = await axios.get(`${BASE_URL}/api/`)

    }catch{
        showErrorAlert('Error While Xreading...')
    }
}

useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Month starts from 0
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setDateFrom(formattedDate);
    setDateTo(formattedDate);
}, []); // Run only once when component mounts







const GenerateData = async () => {
    
    try {

        const response = await axios.get(`${BASE_URL}/api/generate-sales-xread/`, {
            params: {
                DateFrom: DateFrom,
                DateTo: DateTo
            }
        });
        if (response.status = 200){
            if (response.data.message ==='No Data Found'){
                showErrorAlert(response.data.message)
            }else{

                showSuccessAlert(response.data)
                setVatableSales(response.data.vat)
                setVatExemptSales(response.data.vat_exempt)
                setMachineSerialNo(response.data.SerialNo)
                setTerminalNumber(response.data.terminalNo)
        

            }
            
        }

    }catch{
        showErrorAlert('Error While Fetching Cashier')
    }
}



const filterDate = async () => {
    
    try {

        const response = await axios.get(`${BASE_URL}/api/cashiers-login-xread/`, {
            params: {
                DateFrom: DateFrom,
                DateTo: DateTo
            }
        });
        if (response.status = 200){
            if (response.data.message ==='No Data Found'){
                showErrorAlert(response.data.message)
            }else{
                setCashier(response.data)
                setselectedindex(0)
                setCashierModal(true)
            }
            
        }

    }catch{
        showErrorAlert('Error While Fetching Cashier')
    }
}




const XreadUpdateStatus = async(data:any) => {
    const SelectedCashier = Cashier[data]
    const loginrecord = SelectedCashier.trans_id
    const idcode = SelectedCashier.id_code
    const cashiername = SelectedCashier.name_stamp


    try{

        const response = await axios.post(`${BASE_URL}/api/cashiers-login-xread/`,{login_record:loginrecord,id_code:idcode,Cashiername:cashiername})

        if (response.status==200){
            showSuccessAlert('Cashier Successfully Xread..')
            setCashierModal(false)
        }

    }catch{
        showErrorAlert('Error While Updating XRead')
    }
}

    return(
        <div className="xzRead-container">
            <Typography variant="h2" align="center" sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '10px',
                        color: 'blue',fontWeight:'bold' }} 
                    >X Reading and Z Reading</Typography>
                <div className="XZContainer">


                    <div className="sub-container">
                            <div className="filter" >
                                <div className="filter-group">
                                    <label>Date From:</label>
                                    <input type="date" value={DateFrom} onChange={(e) => setDateFrom(e.target.value)} ref={DateFromRef} />
                                </div>

                                <div className="filter-group">
                                    <label>Date To:</label>
                                    <input type="date" value={DateTo} onChange={(e) => setDateTo(e.target.value)}  ref={DateToRef} />
                                </div>
                                <div className="filter-group">
                                <button className="btn-filter" onClick={GenerateData}>Generate</button>
                                </div>
                        
                            </div>
                        <div className="body-container">
                            <div className="xcontainer">
                                <div className="form-group">
                                    <label>Terminal Number:</label>
                                    <input readOnly value={terminalNumber}/>
                                </div>
                                <div className="form-group">
                                    <label>Machine Serial No.:</label>
                                    <input readOnly value={machineSerialNo}/>
                                </div>
                                <div className="form-group">
                                    <label>Z Reading Number:</label>
                                    <input readOnly value={zReadingNumber}/>
                                </div>
                
                                
                                <div className="form-group">
                                    <label>From Sales Invoice No.:</label>
                                    <input readOnly value={fromSalesInvoiceNo}/>
                                </div>
                                <div className="form-group">
                                <label>To Sales Invoice No.:</label>
                                    <input readOnly value={toSalesInvoiceNo}/>
                                </div>


                            </div>


                            <div className="xcontainer">
                                    <div className="form-group">
                                        <label>From Credit Invoice No.:</label>
                                        <input readOnly value={fromCreditInvoiceNo}/>
                                    </div>
                                    <div className="form-group">
                                        <label>To Credit Invoice No.:</label>
                                        <input readOnly value={toCreditInvoiceNo}/>
                                    </div>


                                    <div className="form-group">
                                        <label>From Sales Return No.:</label>
                                        <input readOnly value={fromSalesReturnNo}/>
                                    </div>
                                    <div className="form-group">
                                        <label>To Sales Return No.:</label>
                                        <input readOnly value={toSalesReturnNo}/>
                                    </div>

                                
                                    <div className="form-group">
                                        <label>Daily Sales:</label>
                                        <input readOnly value={dailySales}/>
                                    </div>
                            </div>

                            <div className="xcontainer">

                                <div className="form-group">
                                    <label>Old Grand Total:</label>
                                    <input readOnly value={oldGrandTotal}/>
                                </div>
                                <div className="form-group">
                                    <label>New Grand Total:</label>
                                    <input readOnly value={newGrandTotal}/>
                                </div>
                                <div className="form-group">
                                    <label>VATable Sales:</label>
                                    <input readOnly value={parseFloat(vatableSales).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}/>
                                </div>
                                <div className="form-group">
                                    <label>VAT Exempt Sales:</label>
                                    <input readOnly value={vatExemptSales}/>
                                </div>
                                <div className="form-group">
                                    <label>Non-VAT Sales:</label>
                                    <input readOnly value={nonVatSales}/>
                                </div>
                                <div className="form-group">
                                    <label>Zero Rated Sales:</label>
                                    <input readOnly value={zeroRatedSales}/>
                                </div>
                            </div>
                        </div>

                        <div className="button-container">
                            <button onClick={filterDate}>Xreading</button>
                            <button>Zreading</button>
                            <button>Exit</button>

                        </div>
                    </div>
                </div>
            
            {CashierModal && 
                <div className="modal">
                    <div className="modal-content">
                        <div className="table-container">
                        <Typography variant="h2" align="center" sx={{fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', borderRadius: '10px', padding: '10px',
                        color: 'red !important',fontWeight:'bold' }} 
                        >Cashiers List</Typography>
                            <Table>
                                <thead>
                                
                                    <tr>
                                        <th>ID Code</th>
                                        <th>Cashier</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                {Cashier.length > 0 ? (
                                <tbody>
                                    {Cashier.map((item:any, index:any) => (
                                        <tr key={index} onClick={(e)=> XreadUpdateStatus(index)}>
                                            <td>{item.id_code}</td>
                                            <td>{item.name_stamp}</td>
                                            <td>{item.isxread}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <tbody>
                                    <tr>
                                        <td colSpan={3}>NO Cashier Found</td>
                                    </tr>
                                </tbody>
                            )}
                            </Table>

                           
                        <div className="button-container">
                            <button onClick={(e) => setCashierModal(false)} style={{width:'100%',textAlign:'center',padding:'0px'}}>Close</button>

                        </div>
                        </div>
                    </div>
                </div>
            }

        </div>
    )


}

export default XreadZred;