import React, { useEffect, useRef, useState } from 'react';
import './css/KeyboardGlobal.css'

interface value{
    handleclose:()=> void;
    currentv:any;
    setvalue:any;
}

const OnScreenKeyboard :React.FC <value> = ({handleclose,currentv,setvalue}) => {
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

        setTimeout(() => {
            if (inputRef.current){
                inputRef.current.focus()
            }
        }, 100);

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




    const SendData = () => {
        setvalue(inputData);
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
                setinputData(inputData + String(value));
            }
          
        }
    };


    const HandleKeyDown = (e:any) => {
        if (e.key === 'Enter'){
            SendData()
        }
    }
    return (
        <div className='modal-key'>
            <div  ref= {modalRef} className='modal-content-keyboard'
                            // onMouseDown={handleMouseDown}
                            // onMouseMove={handleMouseMove}
                            // onMouseUp={handleMouseUp}
                            style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', bottom: 0, width: '92%', height: '400px' }} >
             <div style={{display:'flex',flexDirection:'row'}}>
                <input  value={inputData} ref={inputRef} 
                onKeyDown={(e)=> HandleKeyDown(e)}
                onChange={(e)=> setinputData(e.target.value)}
                style={{textAlign:'center',fontSize:'20px',width:'75%',border:'1px solid'}}/>
                <button onClick={()=> handleclose()} style={{height:'40px',width:'23%'}}>Close</button>
                </div>
            
            <div className='container-key'>
        {/* {isLetter ? ( */}
            <div className='container-key1'>
            <div className="rowf">
                    {['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '⌫'].map((key, index) => (
                        <button key={index} onMouseDown={() => handleButtonClick(key)} >
                          {capsLock ? key.toLowerCase() : key}
                        </button>
                    ))}
            </div>

            <div className="rows">
                    {['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Clear'].map((key, index) => (
                        <button key={index} onMouseDown={() => handleButtonClick(key)} style={{ width: key === 'Clear' ? '20%' : '8%' }}>
                            {capsLock ? key.toLowerCase() : key}
                            </button>
                    ))}
            </div>

            <div className="rowt">
                    {['Caps Lock', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '/', '.'].map((key, index) => (
                        <button key={index} onMouseDown={() => handleButtonClick(key)} style={{ width: key === 'Caps Lock' ? '20%' : '8%' }}>
                              {capsLock ? key.toLowerCase() : key}
                            </button>
                    ))}
            </div>
            <div className="row">
                <button style={{ width: "8%" }} onClick={() =>handleButtonClick('&')}>$</button>
                <button style={{ width: "8%" }} onClick={() =>handleButtonClick('#')}>#</button>
                <button style={{ width: "8%" }} onClick={() =>handleButtonClick('@')}>@</button>
                <button style={{ width: "40%" }} onClick={() =>handleButtonClick(' ')}> </button>
                <button style={{width:'20%'}} onClick={SendData}>OK</button>
            </div>                  
        </div>
        {/* ):( */}
            <div className='container-key2'>
                <div className="row1">
                            {[1, 2, 3, '⌫'].map((key, index) => (
                                <button key={index} onClick={() => handleButtonClick(key)}>
                                    {key}
                                </button>
                            ))}
                </div>

                <div className="row1">
                            {[4, 5, 6, 'Clear'].map((key, index) => (
                                <button key={index} onClick={() => handleButtonClick(key)} style={{ fontSize : key === 'Clear'? '1.5vw':'20px'}}>
                                    {key}
                                </button>
                            ))}
                </div>

                <div className="row1">
                            {[7, 8, 9, '.'].map((key, index) => (
                                <button key={index} onClick={() => handleButtonClick(key)}>
                                    {key}
                                </button>
                            ))}
                </div>
                <div className="row1s">
                                    <button  onClick={()=> handleclose()} style={{fontSize:'1.5vw'}}>Close</button>
                                    <button  onClick={()=>handleButtonClick('0')}>0</button>
                                    <button  style={{width:'46%'}} onClick={SendData}>OK</button>
                </div>              
            </div>
        {/* )} */}
            
            </div>
                
            </div>
        </div>
      

    );
}

export default OnScreenKeyboard;
