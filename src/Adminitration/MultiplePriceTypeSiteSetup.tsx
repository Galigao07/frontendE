import React,{useEffect,useRef,useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import {BASE_URL} from "../config";
import { Table } from "@mui/material";
import './css/MultiplePriceTypeSiteSetup.css'
import AcctTileSLName from "./AcctTileGlobal";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import { setGlobalIsLoading } from "../globalSlice";
import { RootState } from "../store";
import { useSelector,useDispatch } from "react-redux";
import { InProgressLoading } from "../Loader/Loader";

const MultiplePriceTypeSiteSetup = () => {
    const dispatch = useDispatch()
    const isLoading = useSelector((state:RootState)=>state.global.globalIsLoading)
    const [listOfdata,setlistOfdata] = useState<any>([])
    const [listOfdata2,setlistOfdata2] = useState<any>([])

    useEffect(() => {
        const fectdata = async() => {
            dispatch(setGlobalIsLoading(true))
            try {
                const response = await axios.get(`${BASE_URL}/api/allowed-price-type/`,{withCredentials:true})

                if (response.status==200){
                const data = response.data.data
                // const data2 = response

                setlistOfdata(data)
                 dispatch(setGlobalIsLoading(false))
                // setlistOfdata2(data2)
                }
    
            }catch{
                dispatch(setGlobalIsLoading(false))
                showErrorAlert('Error While Fetching Data')
            }
        }
        fectdata()

    },[])


const OnclickSiteCode = async (index:any) => {
    const selected = listOfdata[index]
    const site_code = selected.site_code;
    const site_desc = selected.site_desc;
    try {
        dispatch(setGlobalIsLoading(true))
        const response = await axios.get(`${BASE_URL}/api/allowed-price-type/`,{
            params:{
                site_code:site_code,
                site_desc:site_desc,
            },withCredentials:true
        })

        if (response.status==200){
            dispatch(setGlobalIsLoading(false))
        const data = response.data.data
        // const data2 = response

        setlistOfdata2(data)
        // setlistOfdata2(data2)
        }

    }catch{
        dispatch(setGlobalIsLoading(false))
        showErrorAlert('Error While Fetching Data')
    }
}


    return(
        <div className="card">
            <div className="card-body">
                <h1>Allowed Price Type Setup</h1>
                <div className="card">
                    {/* {isLoading &&  <InProgressLoading/>} */}
                    <div className="multiplePriceType">
                    <Table className="table 1">
                        <thead>
                            <tr>
                                <th style={{width:'30%'}}>Site Code</th>
                                <th>Site Name</th>
                            </tr>
                        </thead>
                        <tbody>
                     
                           {listOfdata && listOfdata.map((item:any, index:any) => (
                                <tr key={index} onClick={()=> OnclickSiteCode(index)}>
                                    <td >{String(item.site_code).padStart(6,'0')}</td>
                                    <td>{item.site_desc}</td>
                                </tr>
                            ))}
                   
                     
                        </tbody>
                    </Table>
          
                    <table className="table two">
                        <thead>
                            <tr>
                                <th>Price Type</th>
                                <th>Price Name</th>
                            </tr>
                        </thead>
                        <tbody className="tbody-multiple">
                        {listOfdata2 &&
                            listOfdata2.map((item:any, index:any) => (
                                <tr key={index}>
                                    <td >{String(item.pricetype).padStart(6,'0')}</td>
                                    <td >{item.pricetype_name}</td>
                                </tr>
                            )) }
                           
                        </tbody>
                    </table>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MultiplePriceTypeSiteSetup;