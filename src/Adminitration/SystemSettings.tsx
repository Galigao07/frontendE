
import React ,{useEffect,useRef,useState} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import './css/SystemSettings.css'
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import BASE_URL from "../config";
import showSuccessAlert from "../SwalMessage/ShowSuccessAlert";


const SystemSettings = () => {
    const [withHotel,setWithHotel] = useState<boolean>(false);


    const setData = async(data:any)=>{
    console.log(data)
    data.map((items:any)=>{
        if (items.withHotel ==='False'){
            setWithHotel(false)
        }else{
            setWithHotel(true)
        }
       
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
        'withHotel':withHotel

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
                    <div className="form-group">
                        <label>With Hotel</label>
                        <input type="checkbox" checked={withHotel} onChange={(e)=>setWithHotel(e.target.checked)}/>
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