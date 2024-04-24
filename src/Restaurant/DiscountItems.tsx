/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import './css/DiscountItems.css'



interface ItemDiscountsData {
    handleClose: () => void;
    SelectedItemDiscount:any;
    DiscountedData:any;
}

const ItemDiscounts: React.FC<ItemDiscountsData> = ({handleClose,SelectedItemDiscount,DiscountedData}) => {

    const [ByPercent,setByPercent] = useState<any>('')

    const ByPercentRef = useRef<HTMLInputElement>(null)
    const [ItemDiscountEntry,setItemDiscountEntry] = useState({
        ItemCode:'',
        LineNo:'',
        Barcode:'',
        Description:'',
        Qty:'',
        Price:'',
        TotalAmount:0,
        DiscountedPrice:0,
        ByAmount:0,
        D1:0,
        D2:0,
        D3:0,
        D4:0,
        D5:0,
    })

    const HandleClickSave = () => {
        DiscountedData({...ItemDiscountEntry})
}

    useEffect(() => {

        setItemDiscountEntry({
            ItemCode:'',
            LineNo:'',
            Barcode:'',
            Description:'',
            Qty:'',
            Price:'',
            TotalAmount:0,
            DiscountedPrice:0,
            ByAmount:0,
            D1:0,
            D2:0,
            D3:0,
            D4:0,
            D5:0,
        })

        let lineNo:any = 0

        if (SelectedItemDiscount.line_no === undefined){
            lineNo = SelectedItemDiscount.lineno
        }else{
            lineNo = SelectedItemDiscount.line_no
        }

    
        setItemDiscountEntry({...ItemDiscountEntry, 
            Barcode:SelectedItemDiscount.barcode,
            ItemCode:SelectedItemDiscount.itemcode,
            Description:SelectedItemDiscount.description,
            Qty:SelectedItemDiscount.quantity,
            Price:SelectedItemDiscount.price,
            TotalAmount:SelectedItemDiscount.price * SelectedItemDiscount.quantity ,
            DiscountedPrice:SelectedItemDiscount.price * SelectedItemDiscount.quantity ,
            LineNo:lineNo,

        })

        setTimeout(() => {
           if (ByPercentRef.current){
            ByPercentRef.current.focus();
            ByPercentRef.current.select();
           }
            
        }, 100);

        },[])

    const HandleByPercent = (e:any) => {
            const {value } = e.target;
            const onlyNumbersAndDecimals = /^\d*\.?\d*$/;
            if (onlyNumbersAndDecimals.test(value)) {
                setByPercent(value)
            } else {
                console.error('Please enter a valid number.');
            }
        }

    const HandleByAmount = (e:any) => {
            const {value } = e.target;
            const onlyNumbersAndDecimals = /^\d*\.?\d*$/;
            if (onlyNumbersAndDecimals.test(value)) {
                setItemDiscountEntry({...ItemDiscountEntry,ByAmount: value})
            } else {
                console.error('Please enter a valid number.');
            }
        }

    const ComputeByPercent = () => {
        const  discount :any = ((100 - ByPercent)  / 100)
        if (!Number.isNaN(discount)){
            setItemDiscountEntry({...ItemDiscountEntry,
                DiscountedPrice:discount * ItemDiscountEntry.TotalAmount,
                D1: ByPercent,
                ByAmount:  ItemDiscountEntry.TotalAmount - ( discount * ItemDiscountEntry.TotalAmount),

            })}
            return;
    }

    const ComputeByAmount = () => {
        const  discount :any = ((ItemDiscountEntry.ByAmount / ItemDiscountEntry.TotalAmount) * 100)
        if (!Number.isNaN(discount)){
            setItemDiscountEntry({...ItemDiscountEntry,
                DiscountedPrice:ItemDiscountEntry.TotalAmount - (ItemDiscountEntry.ByAmount),
                D1: discount,
            })}
            setByPercent(discount)
            return;
    }



        const Handlekeydown = (e:any) =>{

            if (e.key =='Enter'){
                // if (ItemDiscountEntry.D1==0){
                    const  discount :any = ((100 - ByPercent)  / 100)
                    if (!Number.isNaN(discount)){
                        setItemDiscountEntry({...ItemDiscountEntry,
                            DiscountedPrice:discount * ItemDiscountEntry.TotalAmount,
                            D1: ByPercent,
                            ByAmount:  ItemDiscountEntry.TotalAmount - ( discount * ItemDiscountEntry.TotalAmount),

                        })}
                        setByPercent(0)
                        return;
                // }

                // if (ItemDiscountEntry.D2==0){
                //     const  discount :any = ((100 - ItemDiscountEntry.D1)  / 100) * ((100 - ByPercent)  / 100)
                //     if (!Number.isNaN(discount)){
                //         setItemDiscountEntry({...ItemDiscountEntry,
                //             DiscountedPrice:discount * ItemDiscountEntry.TotalAmount,
                //             D2:ByPercent,
                //             ByAmount:  ItemDiscountEntry.TotalAmount - ( discount * ItemDiscountEntry.TotalAmount),
                //         })}
                //         setByPercent(0)
                //         return;
                // }


                // if (ItemDiscountEntry.D3==0){
                //     const  discount :any = ((100 - ItemDiscountEntry.D1)  / 100) * ((100 - ItemDiscountEntry.D2)  / 100) * ((100 - ByPercent)  / 100)
                //     if (!Number.isNaN(discount)){
                //         setItemDiscountEntry({...ItemDiscountEntry,
                //             DiscountedPrice:discount * ItemDiscountEntry.TotalAmount,
                //             D3: ByPercent,
                //             ByAmount:  ItemDiscountEntry.TotalAmount - ( discount * ItemDiscountEntry.TotalAmount),
                //         })}

                //         setByPercent(0)
                //         return;
                // }

                // if (ItemDiscountEntry.D4==0){
                //     const  discount :any = ((100 - ItemDiscountEntry.D1)  / 100) * ((100 - ItemDiscountEntry.D2)  / 100) * ((100 - ItemDiscountEntry.D3)  / 100) * ((100 - ByPercent)  / 100)
                //     if (!Number.isNaN(discount)){
                //         setItemDiscountEntry({...ItemDiscountEntry,
                //             DiscountedPrice:discount * ItemDiscountEntry.TotalAmount,
                //             D4: ByPercent,
                //             ByAmount:  ItemDiscountEntry.TotalAmount - ( discount * ItemDiscountEntry.TotalAmount),
                //         })}

                //         setByPercent(0)
                //         return;
                // }

                // if (ItemDiscountEntry.D5==0){
                //     const  discount :any = ((100 - ItemDiscountEntry.D1)  / 100) * ((100 - ItemDiscountEntry.D2)  / 100) * ((100 - ItemDiscountEntry.D3)  / 100) *  ((100 - ItemDiscountEntry.D4)  / 100) *  ((100 - ByPercent)  / 100)
                //     if (!Number.isNaN(discount)){
                //         setItemDiscountEntry({...ItemDiscountEntry,
                //             DiscountedPrice:discount * ItemDiscountEntry.TotalAmount,
                //             D5: ByPercent,
                //             ByAmount:  ItemDiscountEntry.TotalAmount - ( discount * ItemDiscountEntry.TotalAmount),
                //         })}

                //         setByPercent(0)
                //         return;
                // }
            
            }}


                useEffect(() => {
                    const handleKeyPress = (e: KeyboardEvent) => {
                
                
                      if (e.key === 'F5') {
                        e.preventDefault(); // Prevent the default browser refresh action for F5
                      }
                      else if (e.ctrlKey && e.key === 'n') {
                        e.preventDefault(); // Prevent the default browser action for Control + N
                      }
                      else if (e.ctrlKey && e.key === 's') { // Control + S
                        e.preventDefault();
                        HandleClickSave();
                      } else if (e.key === 'Escape') {
                        e.preventDefault(); 
                        handleClose();
                      }
                    };
                  
                    window.addEventListener('keydown', handleKeyPress);
                  
                    return () => {
                      window.removeEventListener('keydown', handleKeyPress);
                    };
                  }, []);  
                

    return (
        <div>
            <div className="modal" >
                <div className="modal-content-itemDiscounts">
                    <h2 style={{ textAlign: 'center', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', border: '2px solid #4a90e2',
                    margin:'5px', borderRadius: '10px', padding: '10px' ,color:'Blue'}}>
                                ITEM DISCOUNT</h2>

                            <Grid container className="itemDiscounts-Container" spacing={2}>
                                <Grid item xs={12} md={12} style={{ height: '100%',width:'100%'}}>
                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography 
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                            overflow: 'auto',width:'40%'}}>Barcode/Item Code</Typography>
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: '0px 0px 0px 0px' }}>
                                                <input name="text" style={{ width: '49%' }} readOnly
                                                defaultValue={ItemDiscountEntry.Barcode}
                                                />

                                                <input name="text" style={{ width: '49%' }}  readOnly 
                                                   defaultValue={ItemDiscountEntry.ItemCode}
                                                />
                                            </div>
                                    </div>

                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography 
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                            overflow: 'auto',width:'40%'}}>Description</Typography>
                                        <input name="text" 
                                        readOnly
                                        defaultValue={ItemDiscountEntry.Description}
                                        />
                                    </div>

                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography 
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                            overflow: 'auto',width:'40%'}}>Quantity/Price</Typography>
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', margin: '0px 0px 0px 0px' }}>
                                                <input name="text" style={{ width: '49%' }} readOnly
                                                defaultValue={ItemDiscountEntry.Qty}
                                                />
                                                <input name="text" style={{ width: '49%' }} readOnly
                                                value={parseFloat(ItemDiscountEntry.Price).toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                                />
                                            </div>


                              
                                    </div>

                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography 
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                            overflow: 'auto',width:'40%'}}>Total Price</Typography>
                                        <input name="text"  readOnly
                                        value={ItemDiscountEntry.TotalAmount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                        />
                                    </div>

                                    <div style={{display:'flex',flexDirection:'row'}}>
                                        <Typography 
                                        sx={{
                                            fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                            overflow: 'auto',width:'40%'}}>Discounted Price</Typography>
                                        <input name="text"  readOnly
                                        value={ItemDiscountEntry.DiscountedPrice.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                        />
                                    </div>


                                </Grid>

                                <Grid item xs={12} md={12} style={{ height: '100%',width:'100%',display:'flex',flexDirection:'row'}}>
                                    
                                    <Grid item xs={12} md={8} style={{display:'flex',flexDirection:'column'}}>
                                            
                                        <div style={{display:'flex',flexDirection:'row'}}>
                                                <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'40%'}}>By Percent:</Typography>
                                                <input name="ByPercent" autoComplete="off"  ref={ByPercentRef}
                                                value={ByPercent}
                                                onInput={HandleByPercent}
                                                onKeyDown={Handlekeydown}
                                                placeholder="0.00"
                                                />
                                                <button style={{margin:'10px',backgroundColor:'Blue'}}
                                                onClick={()=>ComputeByPercent()}
                                                >Compute</button>
                                        </div>
                                                
                                            <div style={{display:'flex',flexDirection:'row'}}>
                                                <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'40%'}}
                                                    >By Amount:</Typography>
                                                <input name="text" 
                                                onInput={HandleByAmount}
                                                value={ItemDiscountEntry.ByAmount.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                                />
                                                <button style={{margin:'10px',backgroundColor:'Blue'}}
                                                onClick={()=>ComputeByAmount()}
                                                >Compute</button>
                                            </div>

                                    </Grid>


                                    <Grid  className="DisCountLevel"  item xs={12} md={6}  style={{display:'none',flexDirection:'row',margin:'5px',}}>
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%',textAlign:'center'}}>1st</Typography>
                                                <input  name="text"
                                                         defaultValue={ItemDiscountEntry.D1.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                                />
                                        </div>
                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%' ,textAlign:'center'}}>2nd</Typography>
                                            <input  name="text"
                                                    defaultValue={ItemDiscountEntry.D2.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                            />
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%' ,textAlign:'center'}}>3rd</Typography>
                                            <input  name="text"
                                                    defaultValue={ItemDiscountEntry.D3.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                            />
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%',textAlign:'center'}}>4th</Typography>
                                                <input  name="text" 
                                                        defaultValue={ItemDiscountEntry.D4.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                                />
                                        </div>

                                        <div style={{display:'flex',flexDirection:'column'}}>
                                            <Typography 
                                                sx={{
                                                    fontSize: { xs: '1rem', sm: '0.7rem', md: '0.8rem', lg: '0.9rem', xl: '1rem' },
                                                    overflow: 'auto',width:'100%',textAlign:'center'}}>5th</Typography>
                                                  <input  name="text" 
                                                          defaultValue={ItemDiscountEntry.D5.toLocaleString(undefined,{minimumFractionDigits:2,maximumFractionDigits:2})}
                                                  />
                                        </div>
                                    </Grid>


                                </Grid>
                            </Grid>


                <div>
                    <Button onClick={HandleClickSave} style={{backgroundColor:'Blue'}}>OK</Button>
                    <Button onClick={handleClose} style={{backgroundColor:'red'}}>EXIT</Button>
                </div>
                </div>
            </div>
        </div>
    )
}
export default ItemDiscounts;
