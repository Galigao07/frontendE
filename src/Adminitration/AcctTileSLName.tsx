import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tab } from "react-tabs";
import { Table } from "@mui/material";
import './css/AcctTileSLName.css';

interface acctDataSL {
    handleClose: () => void;
    Transaction:string;
    selectedData:any;
    DataSend:any;
}

const AcctTileSLName:React.FC <acctDataSL> = ({handleClose,Transaction,selectedData,DataSend})=>{
    const [eventnameH,seteventnameH] = useState<any>('')
    const [acctTitleH,setacctTitleH] = useState<any>('')
    const [slnameH,setslnameH] = useState<any>('')

useEffect(() => {
console.log(selectedData)
},[])

    return(
        <div className="modal">
            <div className="modal-contentSL">
                <div className="card">

                    <div className="SL-container">

                        <h2>{Transaction}</h2>

                     
                        <div className="SLSub-container">
                            <div className="form-group">
                                <label>Event Name:</label>
                                <input type="text" placeholder="Event Name.."  onChange={e=> seteventnameH(e.target.value)} required readOnly/>
                            </div>

                            
                            <div className="form-group">
                                <label>Account Title:</label>
                                <input type="text" placeholder="Acct Title.."  onChange={e=> setacctTitleH(e.target.value)} required/>

                            </div>
                            
                            <div className="form-group">
                                <label>Subsidiary Account:</label>
                                <input type="text" placeholder="SL Name.."  onChange={e=> setslnameH(e.target.value)} required/>

                            </div>

                            <div className="Button-Container">
                                <button style={{backgroundColor:'blue'}}>OK</button>
                                <button style={{backgroundColor:'red'}} onClick={handleClose}>Close</button>

                            </div>
                          
                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}
export default AcctTileSLName;