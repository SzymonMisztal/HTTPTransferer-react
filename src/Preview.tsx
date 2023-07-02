import React, { useState, useEffect } from "react";
import {CloudUpload} from "@mui/icons-material";
import {Button} from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import { URL } from 'url';
import VideoWatcher from "./VideoWatcher";

interface File {
    id: number;
    name: string;
    path: string;
    type: string;
}

interface Preview {
    type: string,
    text: string,
    img: string
}

interface Props {
    file: File | undefined;
}

function Preview(props: Props) {

    const download = () => {
        fetch("http://localhost:8080/download" + props.file.path)
            .then(response => response.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = extractFileNameFromUrl("http://localhost:8080/download" + props.file.path);
                a.click();
                window.URL.revokeObjectURL(url);
            })
            .catch(error => {
                console.error('Error downloading file:', error);
            });
    };

    const extractFileNameFromUrl = (url: string): string => {
        const parts = url.split('/');
        return parts[parts.length - 1];
    };

    const [preview, setPreview] = useState<Preview>()

    useEffect(() => {
        if (props.file) {
            if (props.file.type === "FILE") {
                fetch("http://localhost:8080/preview/text" + props.file.path)
                    .then((response) => response.text())
                    .then((data) => {
                        const newPreview: Preview = {
                            type: props.file.type,
                            text: data,
                            img: null
                        }
                        setPreview(newPreview)
                    });
            } else if (
                props.file.type === "PNG" ||
                props.file.type === "JPEG" ||
                props.file.type === "JPG"
            ) {
                // fetch("http://localhost:8080/preview/image" + props.file.path)
                //     .then((response) => response.blob())
                //     .then((data) => {
                //         const imgUrl = URL.createObjectURL(data);
                //         const newPreview: Preview = {
                //             type: props.file.type,
                //             text: null,
                //             img: imgUrl
                //         }
                //         setPreview(newPreview)
                //     });
                const newPreview: Preview = {
                    type: props.file.type,
                    text: null,
                    img: props.file.path
                }
                setPreview(newPreview)
            } else if (
                props.file.type === "MOV" ||
                props.file.type === "MP4"
            ) {
                const newPreview: Preview = {
                    type: props.file.type,
                    text: props.file.path,
                    img: null
                }
                setPreview(newPreview)
            }
        }

    }, [props.file]);

    if (preview) {
        if (preview.type === "FILE") {
            return (
                <>
                    <pre>{ preview.text }</pre>
                </>
            );
        } else if (
            preview.type === "PNG" ||
            preview.type === "JPEG" ||
            preview.type === "JPG"
        ) {
            return (
                <>
                    <Button startIcon={<DownloadIcon />} onClick={ download }>
                        Download
                    </Button>
                    <br/>
                    <img className="image-container" src={`http://localhost:8080/preview/image${preview.img}`} />
                </>
            );
        } else if (
            preview.type === "MOV" ||
            preview.type === "MP4"
        ) {
            return (<VideoWatcher videoUrl={"http://localhost:8080/video" + preview.text}/>)
        }
    }
    return (
        <>No preview</>
    )

}

export default Preview;
