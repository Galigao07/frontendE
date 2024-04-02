import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Tab } from "react-tabs";
import { Table } from "@mui/material";
import './css/AcctTileSLName.css';
import { GetAccountTitle, GetSLAccount } from "../global";

interface acctDataSL {
    handleClose:()=>void;
    Transaction:string;
    currentvalue:any;
    DataSend:any;
}

const AcctTileSLName:React.FC <acctDataSL> = ({handleClose,Transaction,currentvalue,DataSend})=>{
    const [eventnameH,seteventnameH] = useState<any>('')
    const [SlType ,setSlType] = useState<any>('')
    const [acctTitleH,setacctTitleH] = useState<any>('')
    const [openAcctitleModal,setopenAcctitleModal] = useState<boolean>(false)
    const [AcctTitleList,setAcctTitleList] = useState<any>([])
    const [AccTitleSearch,setAccTitleSearch] = useState<any>('')
    const [selectedItemIndex,setselectedItemIndex] = useState<any>(null)

    const [SLAccountList,setSLAccountList] = useState<any>([])
    const [openSLAccountModal,setopenSLAccountModal] = useState<boolean>(false)
    const [SLAccountSearch,setSLAccountSearch] = useState<any>('')
    const [slnameH,setslnameH] = useState<any>('')

    const SLAccountSearchRef = useRef<HTMLInputElement>(null)
    const AccTitleSearchRef = useRef<HTMLInputElement>(null)

    const AcctTitleListRef = useRef<HTMLTableElement>(null)
    const SLAccountListRef = useRef<HTMLTableElement>(null)


useEffect(() => {
        const fetchData = async () => {
            if (Transaction === 'Account Title') {
                setopenAcctitleModal(true);
                const x = await GetAccountTitle('');
                    setAcctTitleList(x);
            } else if (Transaction === 'SL Account') {
                setopenSLAccountModal(true);
                setSlType(currentvalue.sl_type)
                const x = await GetSLAccount(currentvalue.sl_type,'');
                setSLAccountList(x);
                console.log(x);
            }
       
        };
    
        fetchData(); // Call the asynchronous function immediately   
}, []);


useEffect(() => {
    const fetchData = async () => {
        if (Transaction === 'Account Title') {
            setopenAcctitleModal(true);
            const x = await GetAccountTitle(AccTitleSearch);
                setAcctTitleList(x);
        } else if (Transaction === 'SL Account') {
            setopenSLAccountModal(true);
            setSlType(currentvalue.sl_type)
            const x = await GetSLAccount(currentvalue.sl_type,SLAccountSearch);
            setSLAccountList(x);
            console.log(x);
        }
   
    };

    fetchData(); // Call the asynchronous function immediately   
}, [AccTitleSearch,SLAccountSearch]);



const ClickAccountTitle = (index:any) => {
    console.log('account')
    setselectedItemIndex(index)
    const selected = AcctTitleList[index];

    DataSend({selected})
}

const ClickSlAccount = (index:any) => {
    setselectedItemIndex(index)
    const selected = SLAccountList[index];
    DataSend({selected})
}

const ClickClear = () => {
    DataSend('')
}



const handleKeys2 = (event:any) => {
    if (Transaction=='SL Account'){
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); // Prevent scrolling on arrow key press
      const newIndex = selectedItemIndex + (event.key === 'ArrowDown' ? 1 : -1);

        if (newIndex >= 0 && newIndex < SLAccountList.length) {
          if (SLAccountListRef.current) {
            // Get the reference to the row element
            const rowElement = SLAccountListRef.current.querySelector(`tr:nth-child(${newIndex + 1})`) as HTMLTableRowElement;
            // Set focus on the row element
            if (rowElement) {
              
              // Remove focus from the currently selected row if any
              const currentSelectedRow = SLAccountListRef.current.querySelector('.selected');
              if (currentSelectedRow) {
                currentSelectedRow.classList.remove('selected');
              }
              // Set focus on the new row
              rowElement.classList.add('selected');
              rowElement.focus();
              // Update the selected item index after focusing on the new row
              setselectedItemIndex(newIndex);
            }
          }
        }
      
  
    }else if (event.key === 'Enter'){
        ClickSlAccount(selectedItemIndex)
    }
    }else if (Transaction=='Account Title'){
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault(); // Prevent scrolling on arrow key press
        const newIndex = selectedItemIndex + (event.key === 'ArrowDown' ? 1 : -1);
  
          if (newIndex >= 0 && newIndex < AcctTitleList.length) {
            if (AcctTitleListRef.current) {
              // Get the reference to the row element
              const rowElement = AcctTitleListRef.current.querySelector(`tr:nth-child(${newIndex + 1})`) as HTMLTableRowElement;
              // Set focus on the row element
              if (rowElement) {
                
                // Remove focus from the currently selected row if any
                const currentSelectedRow = AcctTitleListRef.current.querySelector('.selected');
                if (currentSelectedRow) {
                  currentSelectedRow.classList.remove('selected');
                }
                // Set focus on the new row
                rowElement.classList.add('selected');
                rowElement.focus();
                // Update the selected item index after focusing on the new row
                setselectedItemIndex(newIndex);
              }
            }
          }
        
    
      }else if (event.key === 'Enter'){
        ClickAccountTitle(selectedItemIndex)
      }
    }
  };

    return(
        <div className="modal">
            <div className="modal-contentSL">
                <div className="card">
                    <div className="SL-container">
                        {/* <h2>{Transaction}</h2> */}
                    {openAcctitleModal &&  (
                            <div className='modal'>
                            <div className='modal-content-waiter'>
                            <div className='card'>
                                <h1>Select Account Title</h1>
                                <input
                                ref={AccTitleSearchRef}
                                value={AccTitleSearch}
                                onChange={(e) => setAccTitleSearch(e.target.value)}
                                onKeyDown={(e) => handleKeys2(e)}
                                />
                            <div className='AcctTitle-Container' style={{overflow:'auto',height:'330px'}}>
                                <Table id="table-list" className='table-list AcctTitle' onKeyDown={(event) => handleKeys2(event)} ref={AcctTitleListRef}>
                                <thead>
                                    <tr>
                                    <th>Account Code</th>
                                    <th>Account Title</th>
                                    </tr>
                                </thead>
                                    <tbody>
                                        {AcctTitleList && AcctTitleList.map((result:any,index:any)=>(
                                            <tr
                                            key={index}
                                            onClick={()=>ClickAccountTitle(index)}
                                            // tabIndex={0}
                                            style={{
                                                backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                                color:selectedItemIndex === index ? 'white':'black',
                                                height:'50px',
                                            }}
                                            >
                                            <td>{result.primary_code}</td>
                                            <td>{result.subsidiary_acct_title.trim()}</td>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </Table>

                                </div>
                            </div>
                            <div className='Button-Container'>
                                <button onClick={() => handleClose()}>Close</button>
                                <button onClick={() => ClickClear()}>Clear</button>
                            </div>
                            </div>

                            </div>

                    )}

                    {openSLAccountModal &&  (

                    <div className='modal'>
                    <div className='modal-content-waiter'>

                    <div className='card'>
                        <h1>Select Subsidiary Account</h1>
                        <input
                        ref={SLAccountSearchRef}
                        value={SLAccountSearch}
                        onChange={(e) => setSLAccountSearch(e.target.value)}
                        onKeyDown={(e) => handleKeys2(e)}
                        />
                    <div className='Waiterlist-Container'>

                        <Table id="table-list" className='table-list AcctTitle' onKeyDown={(event) => handleKeys2(event)} ref={SLAccountListRef}>
                            <thead>
                                <tr>
                                <th>SL Code</th>
                                <th>Subsidiary Account</th>
                                </tr>
                            </thead>
                            <tbody>
                            {SLAccountList && SLAccountList.map((result:any, index:any) => (
                                <tr
                                key={index}
                                className={selectedItemIndex === index ? 'selected' : ''}
                                onClick={() => ClickSlAccount(index)}
                                tabIndex={0}
                                style={{
                                    backgroundColor:selectedItemIndex === index ? 'blue':'white',
                                    color:selectedItemIndex === index ? 'white':'black',
                                    height:'50px'
                                }}
                                >
                                {SlType === 'O' &&
                                    <>
                                    <td>{String(result.id_code).padStart(4, '0')}</td>
                                    <td>{result.sl_name}</td>
                                    </>
                                }
                                {SlType === 'C' && 
                                    <>
                                    <td>{String(result.id_code).padStart(4, '0')}</td>
                                    <td>{result.trade_name}</td>
                                    </>
                                }
                                {SlType === 'E' && 
                                    <>
                                    <td>{String(result.id_code).padStart(4, '0')}</td>
                                    <td>{result.last_name}, {result.first_name} {result.middle_name}</td>
                                    </>
                                }
                                {SlType === 'R' && 
                                    <>
                                    <td>{String(result.desc_code).padStart(4, '0')}</td>
                                    <td>{result.description}</td>
                                    </>
                                }
                                </tr>
                            ))}
                            </tbody>

                        </Table>

                        </div>
                    </div>
                    <div className='Button-Container'>
                        <button onClick={() => handleClose()}>Close</button>
                        <button onClick={() => ClickClear()}>Clear</button>
                    </div>
                    </div>

                    </div>

                    )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AcctTileSLName;