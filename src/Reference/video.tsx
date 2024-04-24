import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import BASE_URL from '../config';
import { Grid } from '@mui/material';
import './css/Video.css'

const VideoUpload = () => {
    const [selectedFile, setSelectedFile] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [videoUrl2, setVideoUrl2] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
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
    
            reader.onprogress = (event: ProgressEvent<FileReader>) => {
                if (event.lengthComputable) {
                    const percentLoaded = (event.loaded / event.total) * 100;
                    setUploadProgress(percentLoaded);
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
            // const response = await axios.post(`${BASE_URL}/api/video-upload/`,formData)

            const response = await axios.post(`${BASE_URL}/api/video-upload/`, formData, {
                onUploadProgress: progressEvent => {
                    if (progressEvent.total) {
                        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                        setUploadProgress(percentCompleted);
                    } else {
                        // Handling the case where total size is unknown
                        setUploadProgress(0);
                    }
                }
            });
    

            if (response.status == 200){
                // console.log('Success',response.data.message)
                // const response2 = await axios.get(`${BASE_URL}/api/video-upload/`)
                setVideoUrl2(videoUrl)
                // setVideoUrl2(response2.data.data)
            }
        }catch{
            console.log('error')
        }

    };

    // const [downloadProgress, setDownloadProgress] = useState<number>(0);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const response: AxiosResponse = await axios.get(`${BASE_URL}/api/video-upload/`, {
    //                 responseType: 'blob',  // Set response type to blob for downloading binary data
    //                 onDownloadProgress: progressEvent => {
    //                     if (progressEvent.total) {
    //                         const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
    //                         setDownloadProgress(percentCompleted);
    //                     }
    //                 }
    //             });
    //             setDownloadProgress(100); // Set progress to 100% when download is complete
    //             const reader = new FileReader();
    //                 reader.onloadend = () => {
    //                     const base64Data = reader.result?.toString;
    //                     if (base64Data) {
    //                         setVideoUrl2(base64Data);
    //                     } 
    //                 };
    //                 reader.readAsDataURL(response.data);

    //             // Assuming response.data is a Blob object
    //             // const videoBlob = response.data;
    //             // const videoUrl = URL.createObjectURL(videoBlob);
    //             // setVideoUrl2(videoUrl);
    //         } catch (error) {
    //             console.error('Error fetching video URL:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
        let binary = '';
        const bytes = new Uint8Array(buffer);
        const len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/video-upload/`);
                setVideoUrl2(response.data.data); // Assuming response.data is the video URL
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
                    <video controls autoPlay loop style={{width:'100%',height:'100%'}} >
                        <source src={videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>

                
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
                <div>Uploading: {uploadProgress}%</div>
            )}
            </Grid>
      <Grid item xs={12} md={6} style={{ height: '100%',width:'100%'}}>
            {/* {downloadProgress > 0 && downloadProgress < 100 && (
                <div>Downloading: {downloadProgress}%</div>
            )} */}

            { videoUrl2 && (
                <div>
                    <h3 style={{textAlign:'center'}}>Current Video</h3>
                    <video controls autoPlay loop muted preload='auto' style={{width:'100%',height:'100%'}}>
                        <source src={videoUrl2} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {uploadProgress > 0 && uploadProgress < 100 && (
                <div>Uploading: {uploadProgress}%</div>
            )}
          </Grid>
          </Grid>
 
        </div>
    );
};

export default VideoUpload;
function arrayBufferToBase64(data: any) {
    throw new Error('Function not implemented.');
}

