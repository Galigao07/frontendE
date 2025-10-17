/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import React, { useEffect, useState,useRef } from 'react';
import axios from 'axios';
import {BASE_URL} from '../config';
import './css/RepirintTransaction.css'
// import '../Restaurant/css/RepirintTransaction.css'
import ReprintImage from '../assets/ReprintImage.jpeg';
import CloseImage from '../assets/close.png';
import Swal from 'sweetalert2';

interface ReprintTransactionData {
  handleClose: () => void;
  PrintTransactionData: any;
}

const ReprintTransaction:React.FC<ReprintTransactionData> = ({ handleClose , PrintTransactionData}) => {
interface SalesListData {
  doc_no:string;
  doc_type :string;
  terminal_no :string;
  doc_date:any;
  customer_name: string;
  sub_total:string;
  trans_type:string;
  discount:string;

}



const [SalesList,setSalesList] = useState<SalesListData[]>([])

const [DateFrom,setDateFrom]  = useState<string>('')
const [DateTo,setDateTo]  = useState<string>('')
const [Terminal,setTerminal]  = useState<any>(localStorage.getItem('TerminalNo'))
const [DocType,setDocType]  = useState<string>('')
const [DocNo,setDocNo]  = useState<string>('')

const DateFromRef = useRef<HTMLInputElement>(null)
const DateToRef = useRef<HTMLInputElement>(null)
const TernimalNoRef = useRef<HTMLInputElement>(null)
const DocTypeRef = useRef<HTMLInputElement>(null)
const DocNoRef = useRef<HTMLInputElement>(null)
const [selectedRowIndex, setSelectedRowIndex] = useState(null);

const formatDate = (date:any) => {
    // Format date to 'YYYY-MM-DD' (e.g., 2023-12-13)
    return date.toISOString().split('T')[0];
  };

/// GET DATE TODAY 
  useEffect(() => {
    const today = new Date(); // Get today's date
    const formattedDate = formatDate(today);

    setDateFrom(formattedDate);
    setDateTo(formattedDate);
  }, []); // Em
  


  useEffect(() => {
    const fetchSalesOrderListing = async () => {
        try {
            console.log('Attempting to fetch data...');
            if (DateFrom ==''){
                return;
            }
            const response = await axios.get(`${BASE_URL}/api/reprint-transaction/`, {
                params: { datefrom: DateFrom, dateto: DateTo, TerminalNo: Terminal },withCredentials:true
            });

            if (response.status === 200) {
                console.log('Data fetched successfully:', response.data);
                setSalesList(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching sales-order-listing:', error);
        }
    };

    fetchSalesOrderListing();
}, [DateFrom, DateTo, Terminal]); // Include all dependencies here




const PrintTransaction = (index:any) => {
    const data = SalesList[index]
    setSelectedRowIndex(index);
    PrintTransactionData({
        'DocNO': parseInt(data.doc_no),
        'DocType': data.doc_type,
        'TerminalNo':data.terminal_no
      });

  };


const handleInput = (value:any) => {
    setDocNo((prevValue:any) => {
      // Remove leading zero if the input value is '0'
      if (value === '0' && parseFloat(prevValue) === 0) {
        return value;
      } else {


        // Check if the value is a decimal point
        if (value === '.') {
            const res = parseFloat(prevValue) + value;
            return res;
        }
        const stringValue = prevValue.toString();
          // Check if the previous value already contains a decimal point
          if (stringValue.includes('.')) {
            const res = prevValue + value;
            return res;
          }
    

        // Perform addition based on the input value

        if (prevValue === 0) {
          const res =  value;
          return res.toString();
        }
        const res = prevValue + value;
        return res.toString();
      }
    });
  };




  const clearInput = () => {
    // setAmountReceived(0);
  };

  // const AmountReceiveF = () => {
  //   setamountReceivedFocus(true);

  // }

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

  const handleBackspace = () => {
    // if (amountReceived.length === 0) return;

    // setAmountReceived((amountReceived) => amountReceived.slice(0, -1))
  };
  
  const handleOk = () => {

    // if (parseFloat(amountdue) > amountReceived) {
    //   // Handle the condition where amount due is greater than amount received
    //   // For example, display an error message, prevent action, etc.
    //   Swal.fire({
    //     title: 'Error',
    //     text: 'Amount due is greater than Amount Tendered received. Please enter a valid amount.',
    //     icon: 'info',
    //     confirmButtonText: 'OK'
    //   });

    //   // You can add additional actions here such as displaying an error message, preventing the function from continuing, etc.
    // } else {
    //   // Execute the 'amounttendered' function if the condition is met (amount due is less than or equal to amount received)
    //   amounttendered({
    //     amounttendered: amountReceived,
    //     change: changeDue,
    //   });
    // }
    // Handle OK button action here
    // amounttendered({
    //     amounttendered:amountReceived,
    //     change: changeDue,
    // })
  };



const handleSelectChange = (event:any) => {
    setDocType(event.target.value); // Update the state when the selection changes
  };
    return (
        <div className="modal">
            
            <div className='modal-Reprint'>
                <div  style={{display:'flex',flexDirection:'row'}}>
                    <div style={{ border: '2px solid #4a90e2', borderRadius: '10px', padding: '10px',marginLeft:'20px'}}>
                            <h2 style={{ color: '#ffffff', backgroundColor: '#007bff',
                            padding: '4px', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                            borderRadius: '5px', textAlign: 'center', caretColor:'transparent' ,width:'900px'
                            }}>RE-PRINT</h2>

                                <div style={{marginTop:'10px',display:'flex',flexDirection:'row' }}>

                                        <div style={{display:'flex',flexDirection:'column',marginLeft:'5px',width:'100%'}}>
                                            <label> DateFrom: </label>
                                            <input id ='input1' type='date' ref={DateFromRef}  value={DateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column',marginLeft:'5px',width:'100%'}}>
                                            <label> DateTo: </label>
                                            <input id ='input1' type='date' ref={DateToRef} value={DateTo} onChange={(e) => setDateTo(e.target.value)} />
                                        </div>

                                </div>
                                <div style={{display:'flex',flexDirection:'row' }}>
                                        <div style={{display:'flex',flexDirection:'column',marginLeft:'5px'}}>
                                            <label> Terminal No: </label>
                                            <input id ='input1' type='text' ref={TernimalNoRef}  value={Terminal} onChange={(e) => setTerminal(e.target.value)} />
                                        </div>
                            

                                        <div style={{display:'flex',flexDirection:'column',marginLeft:'5px',width:'100%'}}>
                                        <label> Document Type: </label>
                                        <select style={{ height: '35px' }} value={DocType} onChange={(e) => setDocType(e.target.value)}>
                                                <option value="POS-SI">POS-SI</option>
                                                <option value="POS-CI">POS-CI</option>
                                            </select>
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column',marginLeft:'5px'}}>
                                            <label> Document No: </label>
                                            <input id ='input1' type='text' ref={DocNoRef}  onChange={(e) => setDocNo(e.target.value)} />
                                        </div>
                                </div>
                                    

                                <div className="top-table" >
                                    <table className="table" border={1}>
                                    <thead>
                                    <tr>
                                        <th>Date Time</th>
                                        <th>Terminal No</th>
                                        <th>Ref #.</th>
                                        <th>Customer Name</th>
                                        <th>Amount</th>
                                        <th>Payment Type</th>
                                        <th>Discount</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { SalesList.length > 0 ? (
                                    SalesList.map((item, index) => (
                                        <tr key={index} onClick={() => PrintTransaction(index)} style={{
                                            backgroundColor: selectedRowIndex === index ? ' #007bff' : 'transparent',
                                            color: selectedRowIndex === index ? '#ffff' : 'black',
                                          }}>
                                        <td style={{textAlign:'center'}}>{item.doc_date}</td>
                                        <td >{item.terminal_no}</td>
                                        <td style={{textAlign:'center'}}>{item.doc_type} {parseFloat(item.doc_no)}</td>
                                        <td style={{textAlign:'center'}}>{item.customer_name}</td>
                                        <td style={{textAlign:'center'}} >{parseFloat(item.sub_total).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td style={{textAlign:'center'}} >{item.trans_type}</td>
                                        <td style={{textAlign:'center'}} >{parseFloat(item.discount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        
                                            </tr>
                                        ))
                                        ) : (
                                        <tr>
                                            <td colSpan={7}>No items in the transaction</td>
                                        </tr>
                                    )}
                                    </tbody>
                                    </table>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(100px, 1fr))', gap: '5px' ,margin:'5px'}}>
                                <div     
                                    style={{border: '1px solid #4a90e2',padding: '5px',height: '80px', display: 'flex',flexDirection: 'column',
                                    alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                                    borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                                    }}
                                    onClick={PrintTransaction}>

                                    <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                                    Re-Print</p>
                                    <img src= {ReprintImage} style={{ maxWidth: '80%', maxHeight: '40px', marginBottom: '10px', flex: '0 0 auto' }} />
                                </div>

                                <div     
                                    style={{border: '1px solid #4a90e2',padding: '5px',height: '80px', display: 'flex',flexDirection: 'column',
                                    alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
                                    borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
                                    }}
                                    onClick={handleClose}>

                                    <p style={{ textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)', transform: 'translateZ(5px)' ,fontSize:'15px' ,fontWeight:'bold' ,color:'blue',textAlign:'center'}}>
                                    Close</p>
                                    <img src= {CloseImage} style={{ maxWidth: '80%', maxHeight: '40px', marginBottom: '10px', flex: '0 0 auto' }} />
                                </div>
                        </div>
                    </div>
                    
                    <div className="num-pad" style={{width:'50%'}}>
                <div className="num-pad-row">
                    <button className="num-pad-key" onClick={() => handleInput('1')}>1</button>
                    <button className="num-pad-key" onClick={() => handleInput('2')}>2</button>
                    <button className="num-pad-key" onClick={() => handleInput('3')}>3</button>
                </div>
                <div className="num-pad-row">
                    <button className="num-pad-key" onClick={() => handleInput('4')}>4</button>
                    <button className="num-pad-key" onClick={() => handleInput('5')}>5</button>
                    <button className="num-pad-key" onClick={() => handleInput('6')}>6</button>
                </div>
                <div className="num-pad-row">
                    <button className="num-pad-key" onClick={() => handleInput('7')}>7</button>
                    <button className="num-pad-key" onClick={() => handleInput('8')}>8</button>
                    <button className="num-pad-key" onClick={() => handleInput('9')}>9</button>
                </div>
                <div className="num-pad-row">
                    <button className="num-pad-key"style={{ width: '33%' }}  onClick={() => handleInput('.')}>.</button>
                    <button className="num-pad-key" style={{ width: '33%' }} onClick={() => handleInput('0')}>0</button>
                    <button className="num-pad-key"style={{ width: '33%'}} onClick={() => handleBackspace()}>Back</button>
                </div>
                <div className="num-pad-row">
                    <button className="num-pad-key" style={{ width: '33%'}} onClick={handleClose}> Close</button> 
                    <button className="num-pad-key" style={{ width: '33%'}} onClick={handleOk}> OK </button>
                    <button className="num-pad-key" style={{ width: '33%'}} onClick={clearInput}> Clear </button>
                </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default ReprintTransaction;