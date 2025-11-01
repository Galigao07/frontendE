
import React ,{useEffect,useRef,useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './css/SystemSettings.css'
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import {BASE_URL} from "../config";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import { setGlobalIsLoading } from "../globalSlice";
import { RootState } from "../store";
import { useSelector,useDispatch } from "react-redux";
import { InProgressLoading } from "../Loader/Loader";

const SystemSettings = () => {
    const [withHotel,setWithHotel] = useState<boolean>(false);
    const [ShowArrowUpAndDown,setShowArrowUpAndDown] = useState<boolean>(false);
    const [multiple_printer,setmultiple_printer] = useState<boolean>(false);
    const [ProductColPerRows,setProductColPerRows] = useState<any>(0)
    const [TableColPerRows,setTableColPerRows] = useState<any>(0)

    const ProductColPerRowsRef = useRef<HTMLInputElement>(null)
    const TableColPerRowsref = useRef<HTMLInputElement>(null)

    const setData = async(data:any)=>{
    console.log(data)
    data.map((items:any)=>{
        if (items.withHotel ==='False'){
            setWithHotel(false)
        }else{
            setWithHotel(true)
        }

        if (items.ShowArrowUpAndDown ==='False'){
            setShowArrowUpAndDown(false)
        }else{
            setShowArrowUpAndDown(true)
        }
        if (items.multiple_printer ==='False'){
            setmultiple_printer(false)
        }else{
            setmultiple_printer(true)
        }
        setProductColPerRows(items.ProductColPerRows)
        setTableColPerRows(items.TableColPerRows)
       
    })

    }

    useEffect(()=>{
        const fetchData = async () => {
            try{
                const response = await axios.get(`${BASE_URL}/api/system-settings/`)
                if (response.status == 200){

                    setData(response.data)
                 
                }
            }catch{
                showErrorAlert('Error while Saving')
            }
        }   
        fetchData()
    },[])

const configure = async() => {

    const data:any = {
        'withHotel':withHotel,
        'ProductColPerRows':ProductColPerRows,
        'TableColPerRows':TableColPerRows,
        'ShowArrowUpAndDown':ShowArrowUpAndDown,
        'multiple_printer':multiple_printer,

    }
    try{
        const response = await axios.post(`${BASE_URL}/api/system-settings/`,{data:data})
        if (response.status == 200){
            showSuccessAlert('Successfully Configure')
        }
    }catch{
        showErrorAlert('Error while Saving')
    }
}

    return(
        <>
        <div className="Settings-Container">
            <h1>System Settings</h1>
            <div className="card">
                <div className="settings">
                    <div className="form-group checkbox">
                        <label>Multiple Printer</label>
                        <input type="checkbox" checked={multiple_printer} onChange={(e)=>setmultiple_printer(e.target.checked)}/>
                    </div>
                    <div className="form-group checkbox">
                        <label>With Hotel</label>
                        <input type="checkbox" checked={withHotel} onChange={(e)=>setWithHotel(e.target.checked)}/>
                    </div>
                    <div className="form-group checkbox">
                        <label>Show ArrowUp and Down</label>
                        <input type="checkbox" checked={ShowArrowUpAndDown} onChange={(e)=>setShowArrowUpAndDown(e.target.checked)}/>
                    </div>
                    <div className="form-group number">
                        <label>Product Col Per Rows</label>
                        <input ref={ProductColPerRowsRef} value={ProductColPerRows} 
                        onChange={(e)=>setProductColPerRows(e.target.value)} type="number"/>
                    </div>
                    <div className="form-group number">
                        <label>Table Col Per Rows</label>
                        <input ref={TableColPerRowsref} value={TableColPerRows} 
                        onChange={(e)=>setTableColPerRows(e.target.value)}  type="number"/>
                    </div>

                </div>
            </div>
        <div className="Button-Container" style={{justifyContent:'end'}}>
            <button style={{width:'100px',backgroundColor:'blue',}}
            onClick={configure}
            
            >Configure</button>

        </div>
        </div>
        </>
    )
}
export default SystemSettings;