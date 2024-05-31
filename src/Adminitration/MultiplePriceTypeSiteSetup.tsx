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

const MultiplePriceTypeSiteSetup = () => {
    const [listOfdata,setlistOfdata] = useState<any>([])
    const [listOfdata2,setlistOfdata2] = useState<any>([])

    useEffect(() => {
        const fectdata = async() => {
            try {
                const response = await axios.get(`${BASE_URL}/api/allowed-price-type/`)

                if (response.status==200){
                const data = response.data.data
                // const data2 = response

                setlistOfdata(data)
                // setlistOfdata2(data2)
                }
    
            }catch{
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
        const response = await axios.get(`${BASE_URL}/api/allowed-price-type/`,{
            params:{
                site_code:site_code,
                site_desc:site_desc,
            }
        })

        if (response.status==200){
        const data = response.data.data
        // const data2 = response

        setlistOfdata2(data)
        // setlistOfdata2(data2)
        }

    }catch{
        showErrorAlert('Error While Fetching Data')
    }
}


    return(
        <div className="card">
            <div className="card-body">
                <h1>Allowed Price Type Setup</h1>
                <div className="card">
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
                                    <td >{item.price_name}</td>
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