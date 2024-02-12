import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../config';
import { Grid } from '@mui/material';
import './css/Video.css'

const VideoUpload = () => {
    const [selectedFile, setSelectedFile] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoUrl2, setVideoUrl2] = useState('');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFileChange = (event: any) => {
        setSelectedFile('');
        setVideoUrl(''); 
        // setSelectedFile(event.target.files[0]);
        const file = event.target.files && event.target.files.length > 0 ? event.target.files[0] : null;

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Convert the uploaded file to Base64 string
                const base64Data = reader.result?.toString();
                if (base64Data){
                    setVideoUrl(base64Data); // Assuming you have state for storing the Base64 string
                }
  
            };
    
            reader.readAsDataURL(file);
            setSelectedFile(file);
        }
    };

    const handleUpload = async () => {
        setVideoUrl2(''); 
        const formData = new FormData();
        formData.append('video', selectedFile);

        try {
            const response = await axios.post(`${BASE_URL}/api/video-upload/`,formData)

            if (response.status == 200){
                console.log('Success',response.data.message)
                const response2 = await axios.get(`${BASE_URL}/api/video-upload/`)
                setVideoUrl2(response2.data)
            }
        }catch{
            console.log('error')
        }

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/video-upload/`);
                setVideoUrl2(response.data); // Assuming response.data is the video URL
            } catch (error) {
                console.error('Error fetching video URL:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{margin:'2% 2%'}}>

        


            <div className="upload-section">
            <h2>Upload Video</h2>
            <input type="file" accept="video/*" onChange={handleFileChange} />
            <button className="upload-button" onClick={handleUpload} disabled={!selectedFile}>Upload</button>
            </div>


            <Grid container className="CreditCard-Container" spacing={2} style={{marginTop:'20px',
        alignItems: 'center',borderRadius: '10px',cursor: 'pointer',boxShadow: '0 0 5px rgba(74, 144, 226, 0.3) inset',borderStyle: 'solid',
        borderWidth: '2px',borderColor: '#4a90e2 #86b7ff #86b7ff #4a90e2',
        }}>
        
            <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>

            {/* Display uploaded video */}
            {videoUrl && (
                <div>
                    <h3 style={{textAlign:'center'}}>Uploaded Video</h3>
                    <video controls autoPlay loop>
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            </Grid>
      <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>
    { videoUrl2 && (
                <div>
                    <h3 style={{textAlign:'center'}}>Current Video</h3>
                    <video controls autoPlay loop>
                        <source src={videoUrl2} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
          </Grid>
          </Grid>
 
        </div>
    );
};

export default VideoUpload;
