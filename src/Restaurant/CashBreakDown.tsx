/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from "react";
import './css/CashBreakDown.css'
import { Typography } from "@mui/material";
import showErrorAlert from "../SwalMessage/ShowErrorAlert";


interface CashBreakDownData{
    CashBreakDownDataList:any;
    CloseCashBreakDownModal:() => void;

}

const CashBreakDown: React.FC<CashBreakDownData> = ({CashBreakDownDataList,CloseCashBreakDownModal}) =>{
    const [denominations, setDenominations] = useState<any>({
        // Initialize the state for denominations here if needed
        // For example:
        OneThousand:0,
        Fivehundred: 0,
        Twohundred:0,
        Onehundred: 0,
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
        if (name == 'Fivehundred'){
            const total = value * 500
            setTotalDenominations({ ...Totaldenominations, ['TotalFivehundred']: total });

            updateTotalAll();
        }
        if (name == 'Twohundred'){
            const total = value * 200
            setTotalDenominations({ ...Totaldenominations, ['TotalTwohundred']: total });
            updateTotalAll();
        }
        if (name == 'Onehundred'){
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


const handleSaveCashBreakDown = () => {


    const isCashBreakdownZero = (Totaldenominations:any) => {
        return Totaldenominations.TotalCashbreakDown === 0;
      };
      
      // Usage example
      const cashBreakdownIsZero = isCashBreakdownZero(Totaldenominations);
      
      if (cashBreakdownIsZero) {
        showErrorAlert('Cash Breakdown is Zero')

      } else {
        CashBreakDownDataList({
            dinomination:denominations,
            Totaldenominations:Totaldenominations,
        })
      }
   
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



    return(
        <div>
            <div className="modal" >
              <div className="modal-content-cashpayment" >

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

 
                    <div style={{}}>
                        <label style={{ width: '100%', textAlign: 'center'}}> 1000 PHP: </label>
                
                        <input type="number" name="OneThousand" value={denominations.OneThousand} 
                        ref={OneThousandRef} onKeyDown={(e) => handleKeyDown(e,FiveHundredRef)}
                        autoComplete="off"
                        onChange={handleDenominationChange}  />
                        <input type="text"   readOnly={true}  name="OneThousand" value={Totaldenominations.TotalOneThousand.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}>500 PHP:</label>
                        <input type="number" name="Fivehundred" value={denominations.Fivehundred}         
                        autoComplete="off"
                        ref={FiveHundredRef} onKeyDown={(e) => handleKeyDown(e,TwoHundredRef)}
                        onChange={handleDenominationChange} />
                        <input type="text"  readOnly={true} name="Fivehundred" value={Totaldenominations.TotalFivehundred.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}> 200 PHP:</label>
                        <input type="number" name="Twohundred" value={denominations.Twohundred}       
                         autoComplete="off" 
                        ref={TwoHundredRef} onKeyDown={(e) => handleKeyDown(e,OneHundredRef)}
                        onChange={handleDenominationChange}/>
                        <input type="text"   readOnly={true}  name="OneHundred" value={Totaldenominations.TotalTwohundred.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <label style={{ width: '100%', textAlign: 'center'}}> 100 PHP:</label>
                        <input type="number" name="Onehundred" value={denominations.Onehundred}
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
                        <input type="text"    readOnly={true} name="OneThousand" value={Totaldenominations.TotalFifty.toLocaleString(undefined, { minimumFractionDigits: 2 })} onChange={handleTotalDenominationChange}  />

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
        </div>
    )
}
export default CashBreakDown;