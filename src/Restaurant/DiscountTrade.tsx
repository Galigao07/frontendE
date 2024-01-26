/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Table, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import './css/DiscountTrade.css'

interface TradeDiscountData{
    handleClose:() => void;
    SalesOrderListings:any;
    TradeData:any;

}



const TradeDiscount: React.FC<TradeDiscountData> = ({handleClose,SalesOrderListings,TradeData}) => {
    const [TradeDiscountEntryList,setTradeDiscountEntryList] = useState<any>([])
    const [PercentDiscount,setPercentDiscount] = useState<any>('')
    const [TotalAmountDiscount,setTotalAmountDiscount] = useState<any>('')
    const [TotalAmountDue,setTotalAmountDue] = useState<any>(0)
    const [totalNetofDiscount,settotalNetofDiscount] = useState<any>('0.00')
    const [TradeDiscountEntry,setTradeDiscountEntry] = useState({
        D1:0,
        D2:0,
        D3:0,
        D4:0,
        D5:0,
    })
const d1Ref = useRef<HTMLInputElement>(null);
const d2Ref = useRef<HTMLInputElement>(null);
const d3Ref = useRef<HTMLInputElement>(null);
const d4Ref = useRef<HTMLInputElement>(null);
const d5Ref = useRef<HTMLInputElement>(null);



const onUpdateToCart = () => {

    setTradeDiscountEntryList((prevData: any) => {
      const updatedItems = [...prevData]; // Create a copy of the array
  
        let totalPrice  = 0
        let netOfDisCount = 0
      console.log('sss',updatedItems)
      updatedItems.forEach(item => {

        if (item.isDisCount){

            totalPrice = (item.quantity * item.price) + totalPrice;

            if (!isNaN(TradeDiscountEntry.D1) && Number(TradeDiscountEntry.D1) !== 0) {
                const  Discount :any = ((TradeDiscountEntry.D1)  / 100)

                const TotalDiscount :any = (item.quantity * item.price) * Discount; 
                const NetofDiscount :any = (item.quantity * item.price) - TotalDiscount; 
                item.Discount =  TotalDiscount
                item.NetofDiscount = NetofDiscount; 
    

            }


            
            if (!isNaN(TradeDiscountEntry.D2) && Number(TradeDiscountEntry.D2) !== 0) {
                const  Discount :any = ((TradeDiscountEntry.D2)  / 100) 

                const TotalDiscount :any = (item.NetofDiscount) * Discount +  item.Discount; 
                const NetofDiscount :any = (item.quantity * item.price) - (TotalDiscount); 
                item.Discount =  TotalDiscount  
                item.NetofDiscount = NetofDiscount; 
                item.PercentDisCount = Discount + item.PercentDisCount

            }

            if (!isNaN(TradeDiscountEntry.D3) && Number(TradeDiscountEntry.D3) !== 0) {
                const  Discount :any = ((TradeDiscountEntry.D3)  / 100)

                const TotalDiscount :any = (item.NetofDiscount) * Discount +  item.Discount; 
                const NetofDiscount :any = (item.quantity * item.price) - (TotalDiscount); 
                item.Discount =  TotalDiscount 
                item.NetofDiscount = NetofDiscount; 
                item.PercentDisCount = Discount + item.PercentDisCount
       
            }

            if (!isNaN(TradeDiscountEntry.D4) && Number(TradeDiscountEntry.D4) !== 0) {
                const  Discount :any = ((TradeDiscountEntry.D4)  / 100)

                const TotalDiscount :any = (item.NetofDiscount) * Discount +  item.Discount; 
                const NetofDiscount :any = (item.quantity * item.price) - (TotalDiscount); 
                item.Discount =  TotalDiscount 
                item.NetofDiscount = NetofDiscount; 
                item.PercentDisCount = Discount + item.PercentDisCount

   
            }

            if (!isNaN(TradeDiscountEntry.D5) && Number(TradeDiscountEntry.D5) !== 0) {
                const  Discount :any = ((TradeDiscountEntry.D5)  / 100)

                const TotalDiscount :any = (item.NetofDiscount) * Discount +  item.Discount; 
                const NetofDiscount :any = (item.quantity * item.price) - (TotalDiscount); 
                item.Discount =  TotalDiscount 
                item.NetofDiscount = NetofDiscount; 
                item.PercentDisCount = Discount + item.PercentDisCount
      
            }

          
            setTotalAmountDiscount(item.Discount + item.Discount)

           netOfDisCount = item.NetofDiscount + netOfDisCount

            setPercentDiscount(((item.Discount + item.Discount) / totalPrice) * 100 )
        }else{
            item.Discount ='0.00';
            item.NetofDiscount = '0.00'; 
        }

      });
      settotalNetofDiscount(netOfDisCount)

      return updatedItems; // Update the state with the modified array
    });
  };

    useEffect(() => {
        setTradeDiscountEntryList(SalesOrderListings);

        
        setTradeDiscountEntryList((prevData: any) => {
            const updatedItems = [...prevData]; // Create a copy of the array
            let TotalD :any = 0
            updatedItems.forEach(item => {
                item.isDisCount = true
                item.Discount = '0.00'
                item.NetofDiscount = '0.00'
                TotalD =(item.quantity * item.price) + TotalD
            });
  
            setTotalAmountDue(TotalD)
            return updatedItems; // Update the state with the modified array
          });

          setPercentDiscount('0.00')
          setTotalAmountDiscount('0.00')

          setTimeout(() => {
            
            if (d1Ref.current){
                d1Ref.current.focus();
                d1Ref.current.select();
            }
            
          }, 100);
      }, [SalesOrderListings]); // Make sure to include SalesOrderListing in the dependency array
    


    const HandleClickSave = () => {
        TradeData({...TradeDiscountEntryList})

    }

    const HandleTradeDiscountEntry = (e:any) => {
        const { name, value } = e.target;
        setTradeDiscountEntry({ ...TradeDiscountEntry, [name]: value });
    

    }

    useEffect(()=> {


    },[TradeDiscountEntry])

    

    const handleKeyDown = (event :any, currentRef : any, nextRef:any) => {
        if (event.key === 'Enter') {

         const inputElement = nextRef.current;
          event.preventDefault();
          if (nextRef.current) {
            inputElement.disabled = false
            nextRef.current.focus();
            nextRef.current.select();
            onUpdateToCart();
          }
        }

        if (event === 'Enter') {
            const inputElement = nextRef.current;
          if (nextRef.current) {
            inputElement.disabled = false
            nextRef.current.focus();
            nextRef.current.select();
            onUpdateToCart();

          }
        }

};

const handleCheckboxChange = (index: number) => {
    const updatedItems = [...TradeDiscountEntryList];
    if (  updatedItems[index].isDisCount){
        updatedItems[index].isDisCount = false;
    } else {
        updatedItems[index].isDisCount = true;
    }

    setTradeDiscountEntryList(updatedItems);
  };
  

    return (

        <div className="modal" >
            <div className="modal-content-TradeDiscount" >
                <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                fontStyle:'italic',
                margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                            TRADE DISCOUNT</h2>

                        <div className="TradeDiscount-Container">
                        <Grid item xs={12} style={{ height: '100%',width:'100%' }}>
                                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                                <input type="text" readOnly  style={{textAlign:'end'}}
                                value={parseFloat(TotalAmountDiscount).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} />
                                <input type="text" readOnly  style={{textAlign:'end'}}
                                value={`${parseFloat(PercentDiscount).toLocaleString(undefined, {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}%`}
                                
                                />
                                </div>

                            </Grid>

                            <Grid item xs={12} style={{ height: '100%',width:'100%' }}>
                                <Table sx={{
                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                            overflow: 'auto'}}>
                                    <thead>
                                        <tr>
                                        <th> Barcode </th>
                                        <th> Description </th>
                                        <th> Gross </th>
                                        <th> Discount </th>
                                        <th> Net of Discount </th>
                                        </tr>

                                    </thead>
                                    <tbody>
                                    {Array.isArray(TradeDiscountEntryList) && TradeDiscountEntryList.length > 0 ? (
                                        TradeDiscountEntryList.map((item:any, index :number) => (
                                    <tr key={index}> 
                                    <td style={{textAlign:'center',display:'flex',flexDirection:'row'}} >
                                    <input type="checkbox" checked={item.isDisCount}
                                    style={{height:'20px',width:'30%',border:'none',boxShadow:'none'}} onChange={() => handleCheckboxChange(index)} />
                                        {item.barcode}</td>
                                    <td style={{textAlign:'center'}}title={item.description}>{item.description}</td>
                                    <td style={{ textAlign: 'end' }}>
                                        {(item.quantity * item.price).toLocaleString(undefined, {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })} </td>
                                   <td style={{ textAlign: 'end' }}>
                                            {isNaN(parseFloat(item.Discount))
                                                ? '0.00'
                                                : parseFloat(item.Discount).toLocaleString(undefined, {
                                                    minimumFractionDigits: 3,
                                                    maximumFractionDigits: 3,
                                                })}
                                            </td>
                                            <td style={{ textAlign: 'end' }}>
                                            {isNaN(parseFloat(item.NetofDiscount))
                                                ? '0.00'
                                                : parseFloat(item.NetofDiscount).toLocaleString(undefined, {
                                                    minimumFractionDigits: 3,
                                                    maximumFractionDigits: 3,
                                                })}
                                            </td>
       

                            </tr>
                        ))
                        ) : (
                        <tr>
                            <td colSpan={5}>No items in the transaction</td>
                        </tr>
                    )}
                                        
                                    </tbody>
                                </Table>
                            </Grid>
                        </div>

                        <Grid item xs={12} style={{ height: '100%',width:'100%',display:'flex',flexDirection:'row' ,backgroundColor:'blue',color:'white'}}>

                            <Grid item xs={6} style={{ height: '100%',width:'100%' }}>
                                 <Typography 
                                        sx={{
                                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                        verflow: 'auto',width:'100%',textAlign:'center'}}>
                                          TOTAL AMOUNT FOR DISCOUNT
                                </Typography>
           
                            </Grid>
                            <Grid item xs={2} style={{ height: '100%',width:'100%' }}>
                                <Typography 
                                        sx={{
                                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                        verflow: 'auto',width:'100%',textAlign:'center'}}>
                                            {parseFloat(TotalAmountDue).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                </Typography>
                              
                            </Grid>

                            <Grid item xs={2} style={{ height: '100%',width:'100%' }}>
                                <Typography 
                                        sx={{
                                        fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                        verflow: 'auto',width:'100%',textAlign:'start'}}>
                                          {parseFloat(TotalAmountDiscount).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})} 
                                </Typography>
                            </Grid>
                            <Grid item xs={2} style={{ height: '100%',width:'100%' }}>
                                <Typography 
                                            sx={{
                                            fontSize: { xs: '0.6rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                            verflow: 'auto',width:'100%',textAlign:'center'}}>
                                                {parseFloat(totalNetofDiscount).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                    </Typography>
                            </Grid>
    
                        </Grid>

                        <Grid  className="DisCountLevel"  item xs={12} md={6}  style={{display:'flex',flexDirection:'row',margin:'5px'}}>
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%',textAlign:'center'}}>1st</Typography>
                                                <input  name="D1" autoComplete="off" placeholder="0.00"
                                                value={TradeDiscountEntry.D1} 
                                                ref={d1Ref}
                                        
                                                onChange={HandleTradeDiscountEntry}
                                                onKeyDown={(e) => handleKeyDown(e, d1Ref, d2Ref)} 
                                                     
                                                />
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%' ,textAlign:'center'}}>2nd</Typography>
                                             <input  name="D2" autoComplete="off" placeholder="0.00"
                                             value={TradeDiscountEntry.D2} ref={d2Ref}
                                             onChange={HandleTradeDiscountEntry}
                                             disabled
                                             onKeyDown={(e) => handleKeyDown(e, d2Ref, d3Ref)} 
                                            />
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%' ,textAlign:'center'}}>3rd</Typography>
                                              <input  name="D3" autoComplete="off" placeholder="0.00"
                                           value={TradeDiscountEntry.D3} ref={d3Ref}
                                           onChange={HandleTradeDiscountEntry}
                                           disabled
                                           onKeyDown={(e) => handleKeyDown(e, d3Ref, d4Ref)} 
                                            />
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%',textAlign:'center'}}>4th</Typography>
                                                   <input  name="D4" autoComplete="off" placeholder="0.00"
                                                      value={TradeDiscountEntry.D4} ref={d4Ref}
                                                      onChange={HandleTradeDiscountEntry}
                                                      disabled
                                                      onKeyDown={(e) => handleKeyDown(e, d4Ref, d5Ref)} 
                                                />
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%',textAlign:'center'}}>5th</Typography>
                                                       <input  name="D5" autoComplete="off" placeholder="0.00"
                                                        value={TradeDiscountEntry.D5} ref={d5Ref}
                                                        onChange={HandleTradeDiscountEntry}
                                                        disabled
                                                        onKeyDown={(e) => handleKeyDown(e, d5Ref, d5Ref)} 
                                                  />
                                        </div>
                                    </Grid>


                <div className="TradeDiscount-button">
                    <Button onClick={HandleClickSave} style={{backgroundColor:'Blue'}}>OK</Button>
                    <Button onClick={handleClose} style={{backgroundColor:'red'}}>EXIT</Button>
                </div>
            </div>
        </div>
    )

}

export default TradeDiscount;