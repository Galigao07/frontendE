/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import './css/CashCount.css'
import { Table, Typography } from "@mui/material";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";
import axios from "axios";
import BASE_URL from "../config";
import { truncate } from "original-fs";
import logo from '../assets/logo.png'
import QRCode from 'qrcode-generator';


const CashCount: React.FC = () =>{
    interface DenominationsState {
        OneThousand: number;
        FiveHundred: number;
        TwoHundred: number;
        OneHundred: number;
        Fifty: number;
        Twenty: number;
        Ten: number;
        Five: number;
        Peso: number;
        Cent25: number;
        Cent05: number;
    }
    const [denominations, setDenominations] = useState<DenominationsState>({
        // Initialize the state for denominations here if needed
        // For example:
        OneThousand:0,
        FiveHundred: 0,
        TwoHundred:0,
        OneHundred: 0,
        Fifty: 0,
        Twenty: 0,
        Ten: 0,
        Five: 0,
        Peso:0,
        Cent25:0,
        Cent05 :0,

        // Add more denominations as needed
      });
      interface Denominations {
        TotalOneThousand: any;
        TotalFivehundred: any;
        TotalTwohundred: any;
        TotalOnehundred: any;
        TotalFifty: any;
        TotalTwenty: any;
        TotalTen: any;
        TotalFive: any;
        TotalPeso: any;
        TotalCent25: any;
        TotalCent05: any;
        TotalCashbreakDown:any;
        // Add more denominations as needed
      }


      const [Totaldenominations, setTotalDenominations] = useState<Denominations>({
        // Initialize the state for denominations here if needed
        // For example:
        TotalOneThousand:0,
        TotalFivehundred: 0,
        TotalTwohundred:0,
        TotalOnehundred: 0,
        TotalFifty: 0,
        TotalTwenty: 0,
        TotalTen: 0,
        TotalFive: 0,
        TotalPeso:0,
        TotalCent25:0,
        TotalCent05 :0,
        TotalCashbreakDown:0,

        // Add more denominations as needed
      });
      const OneThousandRef = useRef<HTMLInputElement>(null);
      const FiveHundredRef =useRef<HTMLInputElement>(null);
      const TwoHundredRef = useRef<HTMLInputElement>(null);
      const OneHundredRef =useRef<HTMLInputElement>(null);;
      const FiftyRef = useRef<HTMLInputElement>(null);
      const TwentyRef = useRef<HTMLInputElement>(null);
      const TenRef = useRef<HTMLInputElement>(null);
      const FiveRef = useRef<HTMLInputElement>(null);
      const PesoRef = useRef<HTMLInputElement>(null);
      const Cent25Ref = useRef<HTMLInputElement>(null);
      const Cent05Ref = useRef<HTMLInputElement>(null);

      const [TotalCash ,setTotalCash] = useState<number>(0);
      const [CashCountModal,setCashCountModal] = useState<boolean>(false)
      const [login_record,setlogin_record] = useState<any>('')
      
      const updateTotalAll = () => {
        
        setTotalDenominations((prevState) => ({
          ...prevState,
          TotalCashbreakDown: prevState.TotalOneThousand + prevState.TotalFivehundred 
          + prevState.TotalTwohundred
          + prevState.TotalOnehundred 
          + prevState.TotalFifty
          + prevState.TotalTwenty
          + prevState.TotalTen
          + prevState.TotalFive 
          + prevState.TotalPeso 
          + prevState.TotalCent25 
          + prevState.TotalCent05 

        } ));  };

      const handleDenominationChange = (e:any) => {
        const { name, value } = e.target;
        setDenominations({ ...denominations, [name]: value });
        if (name == 'OneThousand'){
            const total = value * 1000
       
            // const totalAmount = Number(total).toLocaleString(undefined, {minimumFractionDigits: 2,maximumFractionDigits: 2,});
            setTotalDenominations({ ...Totaldenominations, ['TotalOneThousand']: total });
            // setTotalDenominations({ ...Totaldenominations, ['TotalOneThousand']: total});
                 updateTotalAll();
        }
        if (name == 'FiveHundred'){
            const total = value * 500
            setTotalDenominations({ ...Totaldenominations, ['TotalFivehundred']: total });

            updateTotalAll();
        }
        if (name == 'TwoHundred'){
            const total = value * 200
            setTotalDenominations({ ...Totaldenominations, ['TotalTwohundred']: total });
            updateTotalAll();
        }
        if (name == 'OneHundred'){
            const total = value * 100
            setTotalDenominations({ ...Totaldenominations, ['TotalOnehundred']: total });
            updateTotalAll();
        }
        if (name == 'Fifty'){
            const total = value * 50
            setTotalDenominations({ ...Totaldenominations, ['TotalFifty']: total });
            updateTotalAll();
        }
        if (name == 'Twenty'){
            const total = value * 20
            setTotalDenominations({ ...Totaldenominations, ['TotalTwenty']: total });
            updateTotalAll();
        }
        if (name == 'Ten'){
            const total = value * 10
            setTotalDenominations({ ...Totaldenominations, ['TotalTen']: total });
            updateTotalAll();
        }

        if (name == 'Five'){
            const total = value * 5
            setTotalDenominations({ ...Totaldenominations, ['TotalFive']: total });
            updateTotalAll();
        }

        if (name == 'Peso'){
            const total = value * 1
            setTotalDenominations({ ...Totaldenominations, ['TotalPeso']: total });
            updateTotalAll();
        }
        if (name == 'Cent25'){
            const total = value * .25
            setTotalDenominations({ ...Totaldenominations, ['TotalCent25']: total });
            updateTotalAll();
        }

        if (name == 'Cent05'){
            const total = value * .05
            setTotalDenominations({ ...Totaldenominations, ['TotalCent05']: total });
            updateTotalAll();
        }

      };

      const handleTotalDenominationChange = (e:any) => {
        const { name, value } = e.target;

        setTotalDenominations({ ...Totaldenominations, [name]: value });
      };

      const handleKeyDown = (event :any, nextRef:any) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          if (nextRef.current) {
            nextRef.current.focus();
            nextRef.current.select(); // Highl
          } }
};

const formattedTotalDue = (amount:number) => {
    // Perform formatting or computation here, for example:
    return `$${amount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}`; // Formatting to currency
  };


const handleSaveCashBreakDown = async () => {
    try {

       const data={
            dinomination:denominations,
            Totaldenominations:Totaldenominations,
        }
        const response = await axios.post(`${BASE_URL}/api/cash-count-cash-breakdown/`,{data:data,UserID:localStorage.getItem('UserID'),login_record:login_record});
        if (response.status==200){
      
          const response1 = await axios.get(`${BASE_URL}/api/company-details/`)
    
          if (response1.status==200){
            setCashCountModal(false)
            PrintCashBreakDown(data,response1.data.DataInfo)
    
          }
        }
      
      } catch {
        console.log('error')
      }

     
      
}


const CloseCashBreakDownModal = () => {
setCashCountModal(false)
}


useEffect(() => {
    setTimeout(() => {
        if (OneThousandRef.current) {
            OneThousandRef.current.focus();
            OneThousandRef.current.select();
          }
    }, 100);

  }, []);


  useEffect(() => {
    setTotalCash((Totaldenominations.TotalCashbreakDown).toLocaleString(undefined,{minimumFractionDigits:2}))
}, [Totaldenominations]);

const [DateFrom,setDateFrom] = useState<any>(null)
const [DateTo,setDateTo] = useState<any>(null)
const [Cashier,setCashier] = useState<any>([])
const DateFromRef = useRef(null)
const DateToRef = useRef(null)

const [selectedindex,setselectedindex] = useState<any>(null)
const [selectCashier,setselectCashier] = useState<string>('')
const [ShowIframe,setShowIframe] = useState<boolean>(false)

useEffect(()=> {
    fechtData()
},[])

const fechtData =async () => {

    try {

        const response = await axios.get(`${BASE_URL}/api/cashiers-login/`, {
            params: {
                DateFrom: '',
                DateTo: ''
            }
        });
        if (response.status = 200){
            if (response.data.message ==='No Data Found'){
                showErrorAlert(response.data.message)
            }else{
                setCashier(response.data)
            }
            
        }

    }catch{
        showErrorAlert('Error While Fetching Cashier')
    }

}

const filterDate = async () => {
    
    try {

        const response = await axios.get(`${BASE_URL}/api/cashiers-login/`, {
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
            }
            
        }

    }catch{
        showErrorAlert('Error While Fetching Cashier')
    }
}


const ShowCashBreakDOwn = async(data:any) => {
    const cashier_data = Cashier[data]
  console.log(cashier_data.login_record)
  setlogin_record(cashier_data.login_record)
  setselectCashier(cashier_data.fullname)

  try{
    const response = await axios.get(`${BASE_URL}/api/cash-count-cash-breakdown/`,{
    params: {
        login_record:cashier_data.login_record
    }});
    if (response.status=200){
        const data = response.data
        
        setCashCountModal(true)
        {data.map((items: any) => {
            switch (items.denomination) {
                case '1000':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, OneThousand: parseFloat(items.quantity) }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalOneThousand: parseFloat(items.total) }));
                    break;
                case '500':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, FiveHundred: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalFivehundred: parseFloat(items.total)}));
                    break;
                case '200':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, TwoHundred: parseFloat(items.quantity) }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalTwohundred: parseFloat(items.total) }));
                    break;
                case '100':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, OneHundred: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalOnehundred: parseFloat(items.total)}));
                    break;
                case '50':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, Fifty: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalFifty: parseFloat(items.total) }));
                    break;
                case '20':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, Twenty: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalTwenty: parseFloat(items.total)}));
                    break;
                case '10':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, Ten: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalTen:parseFloat(items.total) }));
                    break;
                case '5':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, Five: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalFive: parseFloat(items.total) }));
                    break;
                case '1':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, Peso: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalPeso: parseFloat(items.total) }));
                    break;
                case '0.25':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, Cents25: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalCent25:parseFloat(items.total)}));
                    break;
                case '0.05':
                    setDenominations((prevDenominations: any) => ({ ...prevDenominations, Cents05: parseFloat(items.quantity)  }));
                    setTotalDenominations(prevTotalDenominations => ({ ...prevTotalDenominations, TotalCent05:parseFloat(items.total) }));
                    break;
                default:
                    break;
            }
        })}
        updateTotalAll();
        
    }

  }catch(error:any){
    showErrorAlert(error.message);
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



//************ PRINT CASH BREAKDOWN*****************//

const PrintCashBreakDown = (dataDinomination:any,dataInfo:any) => {
    const generateReceiptIframe = (logoSrc: { logo: string; }) => {
      const iframe = document.getElementById('myIframe') as HTMLIFrameElement | null;
  
  if (iframe !== null) {
  
    setShowIframe(true)
    if (iframe) {
      iframe.style.display = 'block';
    }
  
    iframe.onload = () => {
      const currentDate = new Date();   
    //  const formattedDateTime = currentDate.toLocaleString('en-US', { timeZone: 'UTC+08:00' });
  
     const currentYear = currentDate.getFullYear();
     const currentMonth = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding padding to month
     const currentDay = currentDate.getDate().toString().padStart(2, '0'); // Adding padding to day
     
  
  
     let currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();
    let amPmIndicator = 'AM';
  
  // Convert to 12-hour format and determine AM/PM
  if (currentHours >= 12) {
    amPmIndicator = 'PM';
  }
  if (currentHours > 12) {
    currentHours -= 12;
  }
  
    const date = `${currentMonth}/${currentDay}/${currentYear}`
    const time = `${currentHours}:${currentMinutes}:${currentSeconds} ${amPmIndicator}`
  
      const iframeWindow = iframe.contentWindow;
  
      if (iframeWindow !== null) {
        const doc = iframeWindow.document;
        doc.open();
      doc.write('<style>body {  font-family: Consolas, monaco, monospace; }</style>');
  
      doc.write('<div style="width: 200px; margin:none; font-size:8px">');
      doc.write('<div>'); // Start a container div for content
  
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${logo}" alt="Logo Image" style="max-width: 50px; display: inline-block;" />`);
      doc.write('</div>');
  
  
  
      doc.write('<div style="text-align: center;">');
      doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
  
    
  
      doc.write(`<div> ${dataInfo.CustomerCompanyName}</div>`);
  
  
      doc.write(`<div> ${dataInfo.CustomerCompanyAddress}</div>`);
      doc.write(`<div> ${dataInfo.TelNo}</div>`);
      doc.write(`<div> ${dataInfo.CustomerTIN}</div>`);
      doc.write(`<div> ${dataInfo.SerialNO}</div>`);
      doc.write(`<div> ${dataInfo.MachineNo}</div>`);
  
  
  
      let receiptContent1 = '';
  
      const AlignmentSpace = (description: string | any[], data: string) => {
        const data1: string  = data.toString()


  
      
        const totalLength = 28; // Total desired length for alignment
        const contentLength = description.length + data1.length; // Calculate the length of the combined content
        const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
  
        return ' '.repeat(spacesNeeded); // Return the string with required spaces
      };
  
      const AlignmentSpace3 = (description: string | any[], data: string | any[]) => {
        const totalLength = 48; // Total desired length for alignment
        const contentLength = description.length + data.length; // Calculate the length of the combined content
        const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
  
        return ' '.repeat(spacesNeeded); // Return the string with required spaces
      };
  
      const AlignmentSpace2 = (description: string | any[], data: string | any[]) => {
        let totalLength = 32; 
  
        if (description.length == 12 ){
           totalLength = totalLength - 1
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }
        if (description.length == 11 ){
          totalLength = totalLength - 2
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }
  
        if (description.length == 10 ){
          totalLength = totalLength - 3 
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }
  
        if (description.length == 9 ){
        totalLength = totalLength - 4
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }
  
        if (description.length == 8 ){
          totalLength = totalLength - 5
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }
  
        if (description.length == 7 ){
          totalLength = totalLength - 6 
          const contentLength = description.length + data.length; // Calculate the length of the combined content
          const spacesNeeded = Math.max(0, totalLength - contentLength); // Calculate the required spaces
          return ' '.repeat(spacesNeeded); 
        }
  
      };
        
        //********************************************************* */
        let description = '';
        let dinomination = ''
        let totaldinomination = ''
        // Get the value or initialize an empty string if it's null
        let spaces = null
        let spaces2 = null
        let data1 =''
        doc.write('</div>')
  
  
        spaces = AlignmentSpace3(date, time);
        receiptContent1 = `<div>${date}${spaces}${time}</div>`;
        doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
      description = 'Terminal No.: ';
      data1 = dataInfo.TerminalNo
      spaces = AlignmentSpace3(description, data1);
      receiptContent1 = `<div>${spaces}${description}${data1}</div>`;
      doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
  
      doc.write('<div style="text-align: center;">');
      doc.write('<p style="font-size:12px">CASH COUNT</p>');
      doc.write('</div>')
  
      
   
  
  
              description = 'CASHIER:';
              data1 = localStorage.getItem('FullName') || ''; 
              spaces = AlignmentSpace3(description, data1);
              receiptContent1 = `<div>${description} ${data1}${spaces}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">Qty               Denomination           Total</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
              dinomination = dataDinomination.dinomination.OneThousand  || '0';
              totaldinomination =(dataDinomination.Totaldenominations?.TotalOneThousand || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '1,000.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1 ;"> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
              dinomination = dataDinomination.dinomination.FiveHundred  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalFivehundred || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '500.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
              dinomination = dataDinomination.dinomination.TwoHundred  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalTwohundred || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '200.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
  
              dinomination = dataDinomination.dinomination.OneHundred  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalOnehundred || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '100.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
  
  
              dinomination = dataDinomination.dinomination.Fifty  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalFifty || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '50.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
              
              dinomination = dataDinomination.dinomination.Twenty  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalTwenty || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '20.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
              dinomination = dataDinomination.dinomination.Ten  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalTen || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '10.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
              dinomination = dataDinomination.dinomination.Five  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalFive || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '5.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
  
              dinomination = dataDinomination.dinomination.Peso  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalPeso || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '1.00 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
              
              dinomination = dataDinomination.dinomination.Cent25  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalCent25 || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '0.25 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
              dinomination = dataDinomination.dinomination.Cent05  || '0';
              totaldinomination = (dataDinomination.Totaldenominations.TotalCent05 || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = '0.05 PHP'
              spaces = AlignmentSpace(description, dinomination);
              spaces2 = AlignmentSpace2(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; "> ${dinomination}${spaces}${description}${spaces2}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
  
  
              doc.write('<pre style="margin: 0; line-height: 1;">------------------------------------------------</pre>');
              totaldinomination = (dataDinomination.Totaldenominations.TotalCashbreakDown || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // Formatting to 2 decimal places
              description = 'Grand Total:'
              spaces = AlignmentSpace3(description, totaldinomination);
              receiptContent1 = `<div style="margin:0px;line-height: 1; ">${description}${spaces}${totaldinomination}</div>`;
              doc.write('<pre style="margin:0 ;line-height: 1;">' + receiptContent1 + '</pre>');
              doc.write('<pre style="margin: 0; line-height: 1;">================================================</pre>');
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<div style="text-align: center;">');
              doc.write('<p style="margin: 0; line-height: 1;">_____________________________</p>');
              doc.write('<p style="margin: 0; line-height: 1;">Terminal Cashier</p>');
              doc.write('</div>')
      
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<p/>')
              doc.write('<div style="text-align: center;">');
              doc.write('<p style="margin: 0; line-height: 1;">_____________________________</p>');
              doc.write('<p style="margin: 0; line-height: 1;">Treasury Personnel</p>');
              doc.write('</div>')
          
  
  
      const qr = QRCode(0, 'H'); // QR code type and error correction level
      qr.addData('Your data for QR code'); // Replace with the data you want in the QR code
      qr.make();
  
      // Get the generated QR code as a data URI
      const qrDataURI = qr.createDataURL();
  
      // Insert the QR code image into the document
      doc.write('<div style="text-align: center;">');
      doc.write(`<img src="${qrDataURI}" alt="QR Code"  style="max-width: 120px; display: inline-block;" />`);
      doc.write('</div>'); // Close the container div
      doc.close();
    setTimeout(() => {
      iframeWindow.print();
      // window.location.reload(); 
      iframe.style.display = 'none';

    }, 1000); 
  
    } };
      iframe.src = 'about:blank';
    return iframe;
    }};
  
    const iframe = generateReceiptIframe({logo});
  }
  
    return(
        <div>

            <div className="CashCount-Container">
            <Typography
                                variant="h2" // Adjust variant as needed (h1, h2, h3, etc.)
                                align="center"
                                sx={{
                                fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem', lg: '1.8rem', xl: '2rem' },
                                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                                borderRadius: '10px',
                                padding: '10px',
                                color: 'red !important',
                                fontWeight:'bold'
                                }} >Cash Count
                            </Typography>


                <div className="Container">

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
                            <button className="btn-filter" onClick={filterDate} style={{width :'80px'}}>Filter</button>
                        </div>
                 
                    </div>


                    <div className="table-container">
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
                                    <tr key={index} onClick={(e) => ShowCashBreakDOwn(index)}>
                                        <td>{item.idcode}</td>
                                        <td>{item.fullname}</td>
                                        <td>{item.status}</td>
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
                    </div>
                </div>

            </div>

            <iframe id="myIframe" style={{position:'absolute',display:'none',backgroundColor:'#ffff',height:'90%',marginTop:'10px',width:'25%',
             marginLeft:'35%',borderRadius:'10px',  zIndex: '1'}} src="https://example.com"></iframe>
        
        { CashCountModal && 
            <div className="modal" >
              <div className="modal-content-cashcount" >
                <p>Cashiers Name: {selectCashier}</p>
              <Typography      
              sx={{
                fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1rem', lg: '1.1rem', xl: '1.8rem' },
              color: 'blue',
              border:'1px solid',
              padding: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              borderRadius: '5px',margin: '10px',
              fontWeight: 'bold', textAlign: 'center',}}> Cash BreakDown
          </Typography>
          <div className="Cashbreakdown-container">

 
                      <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <label style={{ width: '100%', textAlign: 'center'}}> 1000 PHP: </label>
                
                        <input type="number" name="OneThousand" value={denominations.OneThousand} 
                        ref={OneThousandRef} onKeyDown={(e) => handleKeyDown(e,FiveHundredRef)}
                        autoComplete="off"
                        onChange={handleDenominationChange}  />
                        <input type="text"   readOnly={true}  name="OneThousand" value={Totaldenominations.TotalOneThousand.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}>500 PHP:</label>
                        <input type="number" name="FiveHundred" value={denominations.FiveHundred}         
                        autoComplete="off"
                        ref={FiveHundredRef} onKeyDown={(e) => handleKeyDown(e,TwoHundredRef)}
                        onChange={handleDenominationChange} />
                        <input type="text"  readOnly={true} name="FiveHundred" value={Totaldenominations.TotalFivehundred.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}> 200 PHP:</label>
                        <input type="number" name="TwoHundred" value={denominations.TwoHundred}       
                         autoComplete="off" 
                        ref={TwoHundredRef} onKeyDown={(e) => handleKeyDown(e,OneHundredRef)}
                        onChange={handleDenominationChange}/>
                        <input type="text"   readOnly={true}  name="TwoHundred" value={Totaldenominations.TotalTwohundred.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}> 100 PHP:</label>
                        <input type="number" name="OneHundred" value={denominations.OneHundred}
                                autoComplete="off"
                            ref={OneHundredRef} onKeyDown={(e) => handleKeyDown(e,FiftyRef)}
                        onChange={handleDenominationChange}/>
                        <input type="text"   readOnly={true}  name="OneHundred" value={Totaldenominations.TotalOnehundred.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}> 50 PHP:</label>
                        <input type="number" name="Fifty" value={denominations.Fifty}  
                                autoComplete="off"
                            ref={FiftyRef } onKeyDown={(e) => handleKeyDown(e,TwentyRef)}
                            onChange={handleDenominationChange} />
                        <input type="text"  readOnly={true} name="Fifty" value={Totaldenominations.TotalFifty.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />

                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}> 20 PHP:</label>
                        <input type="number" name="Twenty" value={denominations.Twenty} 
                                autoComplete="off"
                        ref={TwentyRef } onKeyDown={(e) => handleKeyDown(e,TenRef)}
                        onChange={handleDenominationChange}/>
                        <input type="text"    readOnly={true} name="Twenty" value={Totaldenominations.TotalTwenty.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}>10 PHP:</label>
                        <input type="number" name="Ten" value={denominations.Ten} 
                                autoComplete="off"
                        ref={TenRef } onKeyDown={(e) => handleKeyDown(e,FiveRef)}
                        onChange={handleDenominationChange}/> 
                        <input type="text"    readOnly={true}  name="Ten" value={Totaldenominations.TotalTen.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>     
                    <label style={{ width: '100%', textAlign: 'center'}}>5 PHP: </label>
                        <input type="number" name="Five" value={denominations.Five} 
                                autoComplete="off"
                        ref={FiveRef } onKeyDown={(e) => handleKeyDown(e,PesoRef)}
                        onChange={handleDenominationChange} />
                        <input type="text"   readOnly={true}  name="Five" value={Totaldenominations.TotalFive.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />

                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}> 1 PHP: </label>
                        <input type="number" name="Peso" value={denominations.Peso} 
                                autoComplete="off"
                        ref={PesoRef} onKeyDown={(e) => handleKeyDown(e,Cent25Ref)}
                        onChange={handleDenominationChange} />
                        <input type="text"    readOnly={true}  name="Peso" value={Totaldenominations.TotalPeso.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>

                    
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}>.25 PHP: </label>
                        <input type="number" name="Cent25" value={denominations.Cent25}
                                autoComplete="off" 
                        ref={Cent25Ref } onKeyDown={(e) => handleKeyDown(e,Cent05Ref)}
                        onChange={handleDenominationChange} />
                        <input type="text"   readOnly={true}  name="25 Cents"  value={Totaldenominations.TotalCent25.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}> .05 PHP: </label>
                        <input type="number"  name="Cent05" value={denominations.Cent05}
                                autoComplete="off"
                        ref={Cent05Ref }
                        onChange={handleDenominationChange} />
                        <input type="text"    readOnly={true}  name="5 Cents"  value={Totaldenominations.TotalCent05.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' ,backgroundColor: '#007bff',textAlign:'end'}}>
                        {/* <input type="text"  name="Total Cash"  value={Totaldenominations.TotalCashbreakDown.toLocaleString(undefined, { minimumFractionDigits: 2 })}/> */}

                        <Typography      
                        sx={{
                            fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1rem', lg: '1.1rem', xl: '1.8rem' },
                        color: '#ffffff',backgroundColor: '#007bff',
                        padding: '1px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',margin: '5px',
                        width:'100%',
                        fontWeight: 'bold', textAlign: 'end',}}> TOTAL CASH
                    </Typography>
                    <Typography      
                        sx={{
                            fontSize: { xs: '1.2rem', sm: '1.2rem', md: '1rem', lg: '1.1rem', xl: '1.8rem' },
                        color: '#ffffff',backgroundColor: '#007bff',
                        padding: '1px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        borderRadius: '5px',margin: '5px',
                        width:'100%',
                        fontWeight: 'bold', textAlign: 'end',}}> {Totaldenominations.TotalCashbreakDown.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </Typography>
                    </div>


                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <button style={{backgroundColor:'blue'}} onClick={handleSaveCashBreakDown}>Save</button>
                    <button style={{backgroundColor:'red'}} onClick={CloseCashBreakDownModal}>Cancel</button>
                    </div>
                </div>
            </div>
            </div>
        }
        </div>
    )
}
export default CashCount;

function str(data: string) {
    throw new Error("Function not implemented.");
}
