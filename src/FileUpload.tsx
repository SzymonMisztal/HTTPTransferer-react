import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = ({currentDir}) => {
    const [dragging, setDragging] = useState(false);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDragLeave = () => {
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const file = e.dataTransfer.files[0];

        if (file) {
            uploadFile(file);
        }
    };

    const uploadFile = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        axios
            .post('http://localhost:8080/upload' + currentDir, formData)
            .then((response) => {
                console.log('File uploaded successfully');
                // Handle the response or any further actions
            })
            .catch((error) => {
                console.error('Error uploading file: ', error);
                // Handle the error
            });
    };

    return (
        <div
            className={`drop-zone ${dragging ? 'dragging' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
        <span>Drag and drop a file here</span>
    </div>
    );
};

export default FileUpload;
