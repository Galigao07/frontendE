
import React, {useRef,useState,useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../config";
import { GetCurrentDateOnly } from "../global";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import './css/SalesReports.css'

const SalesReports:React.FC = () => {
    const [isfilterModal,setisfilterModal] = useState<Boolean>(false)
    const [isfilterType,setisfilterType] = useState<string>('') 
    const [isActive,setisActive] = useState<any>(0)
    const [ReportListData,setReportListData] = useState<any>([])
    const [listOfData,setlistOfData] = useState<any>({

    })

    useEffect(() => {
        if (isfilterType === 'Sales and Output Tax') {
            setisActive(0)
        }else if (isfilterType === 'By Tax Type'){
            setisActive(1)
        }else if (isfilterType === 'Per Payment Type'){
            setisActive(2)
        }else if (isfilterType === 'Product Details Per Transasction'){
            setisActive(3)
        }else if (isfilterType === 'Summary Per Product'){
            setisActive(4)
        }else if (isfilterType === 'Summary Per Product Category'){
            setisActive(5)
        }
    },[isfilterType])

    const filterClick = async () => {

        try{
            const response = await axios.get(`${BASE_URL}/api/Sales-Reports/`,{params:
                {data:listOfData, reporttype:isfilterType}
            })
            if (response.status ===200){
                setReportListData(response.data)
            }
        }catch{
            showErrorAlert(`Error While fetching ${isfilterType} report`)
        }

    }


    return (
        <>
        <div className="Sales-Reports-Container">
            <h1>Sales Reports</h1>
            <div className="card" >
                <div className="Reports-Container">
                    <button onClick={()=>{setisfilterType('Sales and Output Tax');setisfilterModal(true)}}
                        style={{backgroundColor: isActive === 0 ? 'red':'blue'}}
                        >Sales and Output Tax</button>
                    <button onClick={()=>{setisfilterType('By Tax Type');setisfilterModal(true)}}
                        style={{backgroundColor: isActive === 1 ? 'red':'blue'}}
                        >By Tax Type</button>
                    <button onClick={()=>{setisfilterType('Per Payment Type');setisfilterModal(true)}}
                        style={{backgroundColor: isActive === 2 ? 'red':'blue'}}
                        >Per Payment Type</button>
                    <button onClick={()=>{setisfilterType('Product Details Per Transasction');setisfilterModal(true)}}
                        style={{backgroundColor: isActive === 3 ? 'red':'blue'}}
                        >Product Details Per Transasction</button>
                    <button onClick={()=>{setisfilterType('Summary Per Product');setisfilterModal(true)}}
                        style={{backgroundColor: isActive === 4 ? 'red':'blue'}}
                        >Summary Per Product</button>
                    <button onClick={()=>{setisfilterType('Summary Per Product Category');setisfilterModal(true)}}
                     style={{backgroundColor: isActive === 5 ? 'red':'blue'}}
                    >Summary Per Product Category</button>
                </div>
                <div className="card body" >

                </div>
            </div>
        </div>
        {isfilterModal && 
        <div className="modal">
            <div className="modal-contentSalesReports">
                <h1>{isfilterType}</h1>
                <div className="Sales-Reports-Filter">
                    <div className="form-group">
                        <label>Date From</label>
                        <input type="date" />
                    </div>
                    <div className="form-group">
                        <label>Date To</label>
                        <input type="date" />
                    </div>
                    <div className="form-group">
                        <label>Customer</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>Payment Type</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>Document Type</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>Terminal No</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>Cashier Name:</label>
                        <input type="text" />
                    </div>

                    <div className="Button-Container">
                        <button style={{backgroundColor:'blue'}}
                        onClick={()=>{setisfilterModal(false);filterClick()}}
                        >Filter</button>

                    </div>
                </div>

            </div>

        </div>
        
        }
        </>
    )
}

export default SalesReports;