import React, { useEffect, useRef, useState } from 'react';
import './css/KeyboardGlobal.css'

interface value{
    handleclose:()=> void;
    currentv:any;
    setvalue:any;
}

const OnScreenKeyboardNumericForCardNo :React.FC <value> = ({handleclose,currentv,setvalue}) => {
    const [inputData,setinputData] = useState<any>('')

    const [isLetter,setisLetter] = useState<boolean>(true)
    // const [inputData,setinputData] = useState<any>('')
    const inputRef = useRef<HTMLInputElement>(null)
    const [capsLock, setCapsLock] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const modalRef = useRef<HTMLDivElement>(null);
    const dragAreaRef = useRef(null);

 const handleMouseDown = (event:any) => {
        event.preventDefault();
        const modalRect = modalRef.current!.getBoundingClientRect();
        setIsDragging(true);
        setPosition({
            x: event.clientX - modalRect.left,
            y: event.clientY - modalRect.top
        });
    };

    const handleMouseMove = (event:any) => {
        event.preventDefault();
        if (isDragging && modalRef.current) {
            const newX = event.clientX - dragOffset.x;
            const newY = event.clientY - dragOffset.y;
            modalRef.current.style.left = newX + 'px';
            modalRef.current.style.top = newY + 'px';
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging]);


    useEffect(() => {
        setinputData(currentv)
        if (inputRef.current){
            inputRef.current.focus()
        }
    },[currentv])

    const changeInput = () => {
        if (isLetter === true){
            setisLetter(false)

            if (modalRef.current){
                modalRef.current.style.width = '32%'
            }

        }else{
            setisLetter(true)
            if (modalRef.current){
                modalRef.current.style.width = '68%'
            }

        }
    setTimeout(() => {
            if (inputRef.current){
                inputRef.current.focus()
                inputRef.current.select()
            }
        }, 100);
    }

    // useEffect(()=>{
    //     setTimeout(() => {
    //         if (inputRef.current){
    //             inputRef.current.focus()
    //             inputRef.current.select()
    //         }
    //     }, 100);
      
    // },[])

    // useEffect(() => {
    //     setvalue(inputData);
    // }, [inputData, setvalue]);


    const SendData = () => {

        let stringWithoutDashes = inputData.replace(/-/g, '');
        setvalue(stringWithoutDashes);
    }

    const handleButtonClick = (value:any) => {
        if (value === '⌫') {
            // Remove last character
            setinputData(inputData.slice(0, -1));
        } else if (value === 'Clear') {
            // Clear input data
            setinputData('');
        }  else if (value === 'Caps Lock') {
            // Clear input data
            setCapsLock(!capsLock);
        }
        else {
            // Append clicked character to input data
            if (capsLock){

                if (isLetter) {
                    setinputData(inputData + value.toLowerCase());
                }else{
                    setinputData(inputData + value);
                }
                
          
            }else{

                let x :any = 0

                x = inputData + String(value)
                    if (x.length <= 16 ){
                        setinputData(inputData + String(value));
                    }
           

            }
          
        }

        setTimeout(() => {
            if (inputRef.current){
                inputRef.current.focus()
            }
        }, 100);
    };

    useEffect(() => {
        if (inputData.length === 16) {
          const formattedValue = inputData.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
    
          setinputData(formattedValue);
        }
    }, [inputData]);

    const HandleKeyDown = (e:any) => {
        if (e.key === 'Enter'){
            SendData()
        }
    }
    
    return (
        <div className='modal-key'>
            <div  ref= {modalRef} className='modal-content-keyboard'
            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 0, width: '40%', height: '480px' }} >
                <div style={{display:'flex',flexDirection:'row'}}>
                    <input value={inputData} 
                    onKeyDown={(e)=> HandleKeyDown(e)}
                    onChange={(e)=> setinputData(e.target.value)}

                    
                    ref={inputRef} style={{textAlign:'center',fontSize:'20px',width:'80%'}}/>
                    <button onClick={()=> handleclose()} style={{height:'40px',width:'20%',margin:'5px'}}>Close</button>
                </div>

            <div className='container-key'>
            <div className='container-key2' style={{width:'100%'}}>
                <div className="row1" >
                            {[1, 2, 3, '⌫'].map((key, index) => (
                                <button key={index} onClick={() => handleButtonClick(key)} style={{width:'22%',fontSize:'30px',height:'100px'}}>
                                    {key}
                                </button>
                            ))}
                </div>

                <div className="row1">
                            {[4, 5, 6, 'Clear'].map((key, index) => (
                                <button key={index} onClick={() => handleButtonClick(key)} style={{width:'22%',fontSize:'30px',height:'100px'}}>
                                    { key}
                                </button>
                            ))}
                </div>

                <div className="row1">
                            {[7, 8, 9, '.'].map((key, index) => (
                                <button key={index} onClick={() => handleButtonClick(key)} style={{width:'22%',fontSize:'30px',height:'100px'}}>
                                    {key}
                                </button>
                            ))}
                </div>
                <div className="row1s">
                      
                                    <button style={{width:'45%'}}  onClick={()=>handleButtonClick('0')}>0</button>
                                    <button style={{width:'45%'}}  onClick={SendData}>OK</button>
                </div>              
            </div>
            </div>
            </div>
        </div>
      

    );
}

export default OnScreenKeyboardNumericForCardNo;
