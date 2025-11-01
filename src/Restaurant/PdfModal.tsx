// PdfModal.tsx
import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';
import pdf from '../assets/Receipt.pdf'
import { ipcRenderer } from 'electron';
import { useEffect } from 'react';




// interface PdfModalProps {
//     open: boolean;
//     handleClose: () => void;
//     pdfPath: string;
// }

// const PdfModal: React.FC<PdfModalProps> = ({ open, handleClose, pdfPath }) => {


//     return (
//         <Modal open={open} onClose={handleClose}>
            // <Box
            //     sx={{
            //         position: 'absolute',
            //         top: '50%',
            //         left: '50%',
            //         transform: 'translate(-50%, -50%)',
            //         width: '30%',
            //         bgcolor: 'background.paper',
            //         boxShadow: 24,
            //         p: 2,
            //         overflow: 'auto',
            //         maxHeight: '96vh'
            //     }}
            // >
          
//                        <iframe
//                         title="PDF Viewer"
//                         src={pdfPath}
//                         width="100%"
//                         height="600px"
//                         style={{ border: 'none' }}
//                     />
                    // <div style={{padding:'5'}}>
                    // <Button onClick={handleClose} style={{backgroundColor:'red',color:'white',width:'100%',fontSize:'20px'}}>Close</Button>
                    // </div>
                    
//             </Box>
//         </Modal>
//     );
// };




import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import configAPI from '../utils/configAPI';
import { useDispatch, UseDispatch } from 'react-redux';
import { UseSelector } from 'react-redux';

import { setGlobalIsLoading } from '../globalSlice';
interface PdfModalProps {
    open: boolean;
    handleClose: () => void;
    pdfPath: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ open, handleClose, pdfPath }) => {
    const dispatch = useDispatch()
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
    const [isLoaded, setIsLoaded] = useState(false);
    // const defaultLayoutPluginInstance = defaultLayoutPlugin({
    //     sidebarTabs: () => [], // hide sidebar
    //     renderToolbar: () => <></>, // hide toolbar completely
    // });
      const [workerUrl, setWorkerUrl] = useState<string | any>(null);

        useEffect(() => {
            const loadWorkerUrl = async () => {
            try {
                // dispatch(setGlobalIsLoading(true));
                if ((window as any).electronPDFPrint) {
                // Running inside Electron
                const confir = await configAPI.get();
                const appPath = (window as any).electronAPI?.getAppPath?.() || '';
                const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
                
                if (isDev){
                    try{
                        console.log(`'path1',${confir.pdfWorker}`.replace(/\\/g, '/'))
                    setWorkerUrl(`${confir.pdfWorker}`.replace(/\\/g, '/'));
                    }catch(e){
                        console.error('Error in Dev mode detection:', e);
                    }
                   
                                // setWorkerUrl('/pdf.worker.min.js');
                    // console.log(`'path2',file://${appPath}/${confir.pdfWorker}`.replace(/\\/g, '/'))
                }else{
                        const resourcesPath = (window as any).electronAPI.getAppPath?.() || '';
                        // Construct full path to worker
                        const pdfWorkerPath = `${resourcesPath}/${confir.pdfWorker}`.replace(/\\/g, '/');

                        console.log(`'path1s',${pdfWorkerPath}`)
                        setWorkerUrl(`file://${pdfWorkerPath}`);
                }

                
                } else {
                // Web/Dev mode
                setWorkerUrl('/pdf.worker.min.js');
                }
                dispatch(setGlobalIsLoading(false));
            } catch (err) {
                dispatch(setGlobalIsLoading(false));
                console.error('Failed to load worker URL:', err);
            }
            };
            if (!isLoaded) { 
                loadWorkerUrl();
                setIsLoaded(true);
            }
            
        }, [isLoaded]);

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '30%',
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 2,
                    overflow: 'auto',
                    maxHeight: '96vh',
                }}
            >
                <div style={{ height:"600px"}}>

                
                <Worker workerUrl={workerUrl}>
                    <Viewer fileUrl={pdfPath}   theme="light" />
                </Worker>
            </div>
                <div style={{ padding: 5 }}>
                    <Button
                        onClick={handleClose}
                        style={{
                            backgroundColor: 'red',
                            color: 'white',
                            width: '100%',
                            fontSize: '20px',
                        }}
                    >
                        Close
                    </Button>
                </div>
            </Box>
        </Modal>
    );
};

export default PdfModal;







