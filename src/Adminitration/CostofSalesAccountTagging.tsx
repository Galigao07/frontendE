
import React,{useEffect,useRef,useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ClassNames } from "@emotion/react";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import {BASE_URL} from "../config";
import { Table } from "@mui/material";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";
import './css/CostofSalesAccountTagging.css'
import { constants } from "node:original-fs";
import AcctTileSLName from "./AcctTileGlobal";

const CostofSalesAccountTagging: React.FC = () => {
    const [isOpenModal,setisOpenModal] = useState<boolean>(false)
    const [listOfdata,setlistOfdata] = useState<any>(null)
    const [isNew,setisNew] = useState<boolean>(false)
    const [isEdit,setisEdit] = useState<boolean>(false)
    const [showAcctTitleModal,setshowAcctTitleModal] = useState<boolean>(false)
    const [selectedData,setselectedData] = useState<any>('')
    const [focusInput,setfocusInput] = useState<any>('')
    const [latest_code,setlatest_code] = useState<any>('0')

    interface category {
        category_code: any;
        category_description: string;
        acct_title: string;
        acct_code:string;
        acct_title2: string;
        acct_code2:string;
    }

    const [CategoryData,setCategoryData] = useState<category>({
        category_code : '0',
        category_description : '',
        acct_title : '',
        acct_code:'',
        acct_title2 : '',
        acct_code2:'',


    })
    const categoryCodeRef = useRef<HTMLInputElement>(null);
    const categoryDescriptionRef = useRef<HTMLInputElement>(null);
    const acctTitleRef = useRef<HTMLInputElement>(null);
    const acctTitle2Ref = useRef<HTMLInputElement>(null);


    useEffect(() => {

        const fetchData = async () => {
            try{
                const response = await axios.get(`${BASE_URL}/api/cost-of-sales/`)
                if (response.status == 200){
                    setlistOfdata(response.data)

                    const data = response.data;
                    const lastItem = data[data.length - 1];
                    console.log(lastItem)
                    setlatest_code(parseInt(lastItem.category_code) + 1)
                }
    
            }catch{
                showErrorAlert('Error while Fetching data in Cost of Sales Account Tagging')
            }
        }
        fetchData()
    },[])

 const OnUpdate = (index:any) => {
        const selected = listOfdata[index]
        CategoryData.category_code = selected.category_code
        CategoryData.category_description = selected.category_desc
        CategoryData.acct_title = selected.acct_title
        CategoryData.acct_code = selected.acct_code
        CategoryData.acct_title2 = selected.acct_title2
        CategoryData.acct_code2 = selected.acct_code2
    }

const handleclose = () => {
        setshowAcctTitleModal(false)
    }

const getAcctTitle = () => {
    setfocusInput('acct_title')
setselectedData(CategoryData.acct_title)
setshowAcctTitleModal(true)
}

const getAcctTitle2 = () => {
    setfocusInput('acct_title2')
    setselectedData(CategoryData.acct_title2)
    setshowAcctTitleModal(true)
}

const DataSend = (value:any) => {
    console.log(value)
    if (value === ''){
        setCategoryData((prevData: any) => ({
            ...prevData,
            [focusInput]: ''
          }));
    }else{
        setCategoryData((prevData: any) => ({
            ...prevData,
            [focusInput]: value.selected.subsidiary_acct_title
          }));
    }


      setshowAcctTitleModal(false)
    }



    const HandleCostEntry = (e:any) => {
        const { name, value } = e.target;
        setCategoryData({...CategoryData, [name]:value})
    }

  


    return(
        <>
            <div >
                <div className="card-body" >
                    <div style={{display:'flex',flexDirection:'row',margin:'5px'}}>
                        <h1 style={{width:'90%'}} >Cost of Sales Account Tagging</h1>
                        <button  style={{width:'10%',border:'none',backgroundColor:'blue',color:'white',cursor:'pointer',borderRadius:'5px'}} 
                        onClick={()=> {setisOpenModal(true);setisNew(true);setCategoryData({
                            category_code : '0',
                            category_description : '',
                            acct_title : '',
                            acct_code:'',
                            acct_title2 : '',
                            acct_code2:'',
                        })}}
                        >New
                        </button>
                    </div>
                
                    <div className="card cost" style={{height:'600px',overflow:'auto'}}>
                        <div className="cost-of-sales">
                        <Table >
                        <thead>
                            <tr>
                                <th>Category Code</th>
                                <th>Category Descriprion</th>
                                <th>Account Title (Debit)</th>
                                <th>Account Title (Credit)</th>
                            </tr>
                        </thead>
                        <tbody>
                        {listOfdata &&  listOfdata.length > 0 ? (
                            listOfdata.map((item:any, index:any) => (
                                <tr key={index}
                                    onClick={()=> {setisOpenModal(true);setisEdit(true);OnUpdate(index)} }>
                                    <td>{String(item.category_code).padStart(6,'0')}</td>
                                    <td>{item.category_desc}</td>
                                    <td>{item.acct_title2}</td>
                                    <td>{item.acct_title}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={3}></td>
                            </tr>
                        )} 
                        </tbody>
                    </Table>
                        </div>

                    </div>
                </div>

            {isOpenModal &&
            <div className="modal">

                <div className="modal-content-cost" style={{width:'600px'}}>

                    <div className="card">
                            <h1>Category Details</h1>
                            <div className="costofsales">
                                <div className="form-group">
                                    <label>Category Code</label>
                                    <input ref={categoryCodeRef} value={ isNew ? latest_code :String(CategoryData.category_code).padStart(6,'0')}
                                    readOnly/>
                                </div>
                                <div className="form-group">
                                    <label>Category Description</label>
                                    <input ref={categoryDescriptionRef} value={CategoryData.category_description} 
                                      name="category_description" onChange={()=> HandleCostEntry}/>
                                </div>
                                <div className="form-group">
                                    <label>Account Title(Debit)</label>
                                    <input ref={acctTitleRef} value={CategoryData.acct_title}
                                    onFocus={()=> getAcctTitle()} readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Account Title(Credit)</label>
                                    <input ref={acctTitle2Ref} value={CategoryData.acct_title2}
                                    onFocus={()=> getAcctTitle2()} readOnly/>
                                </div>
                                
                            </div>
                            <div className="Button-Container">
                                {isNew && <button style={{backgroundColor:'Blue'}}>Save</button>}
                                {isEdit && <button style={{backgroundColor:'Blue'}}>Update</button>}
                            
                                <button>Delete</button>
                                <button onClick={()=> {setisOpenModal(false);setisEdit(false);setisNew(false)}}>Close</button>
                            </div>
                    </div>

                </div>

            </div>
 }

            </div>

            {showAcctTitleModal && <AcctTileSLName handleClose={handleclose} Transaction={'Account Title'} currentvalue={selectedData} DataSend={DataSend} />}
        </>
    )
}

export default CostofSalesAccountTagging;