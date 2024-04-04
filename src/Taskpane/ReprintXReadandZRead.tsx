
import React, {useRef,useState,useEffect} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BASE_URL from "../config";
import { GetCurrentDateOnly } from "../global";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import './css/ReprintXReadandZRead.css'



const ReprintXReadandZRead: React.FC = () =>{
    const [Data,setData] = useState<any>({
        dateFrom:'',
        dateTo:'',
        TerminalNo:'0',
        siteNo:'0',
        zreadNo:'0',
    })

    useEffect(() => {
        const fetchData = async() => {
            const dateFormatted = await GetCurrentDateOnly()
            setData({
                dateFrom:dateFormatted,
                dateTo:dateFormatted,
                TerminalNo:'0',
                siteNo:'0',
                zreadNo:'0',
            })
    
        }

        fetchData()

    },[])

    const XreadPrinting = () => {
        if (Data.TerminalNo === '0'){
            showErrorAlert('Please Provide Terminal No.')
            
        }

        else if (Data.siteNo === '0'){
            showErrorAlert('Please Provide Site No')
        }
        else if (Data.zreadNo === '0'){
            showErrorAlert('Please Provide Zread No')
        }

    }

    const ZreadPrinting = () => {
        if (Data.TerminalNo === '0'){
            showErrorAlert('Please Provide Terminal No.')
            
        }

        else if (Data.siteNo === '0'){
            showErrorAlert('Please Provide Site No')
        }
        else if (Data.zreadNo === '0'){
            showErrorAlert('Please Provide Zread No')
        }

    }

    return(
        <>
        <div className="Reprint-Container">
            <div className='Reprint'>
                <h1>Reprint XRead and ZRead</h1>
                <div className="card">
                    <div className="Conainer">
                        <div className="form-group">
                            <label>Date From</label>
                            <input type="date" value={Data.dateFrom}/>
                        </div>
                        <div className="form-group">
                            <label>Date To</label>
                            <input type="date"  value={Data.dateTo}/>
                        </div>
                        <div className="form-group">
                            <label>Terminal NO.</label>
                            <input type="text" value={Data.TerminalNo}/>
                        </div> 
                        <div className="form-group">
                            <label>Site NO.</label>
                            <input type="text" value={Data.siteNo}/>
                        </div> 
                        <div className="form-group">
                            <label>Zread NO.</label>
                            <input type="text" value={Data.zreadNo}/>
                        </div>

                        <div className="Button-Container">
                            <button onClick={()=>XreadPrinting()}>Xread</button>
                            <button onClick={()=>ZreadPrinting()}>Zread</button>
                        </div> 

                    </div>

                </div>

            </div>

        </div>
        </>
    )


}

export default ReprintXReadandZRead;