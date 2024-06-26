// PdfModal.tsx
import React from 'react';
import { Modal, Box, Button } from '@mui/material';
import pdf from '../assets/Receipt.pdf'




interface PdfModalProps {
    open: boolean;
    handleClose: () => void;
    pdfPath: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ open, handleClose, pdfPath }) => {
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
                    maxHeight: '96vh'
                }}
            >
          
                       <iframe
                        title="PDF Viewer"
                        src={pdfPath}
                        width="100%"
                        height="600px"
                        style={{ border: 'none' }}
                    />
                    <div style={{padding:'5'}}>
                    <Button onClick={handleClose} style={{backgroundColor:'red',color:'white',width:'100%',fontSize:'20px'}}>Close</Button>
                    </div>
                    
            </Box>
        </Modal>
    );
};

export default PdfModal;
