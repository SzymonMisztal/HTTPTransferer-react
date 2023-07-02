import React, { useState, useEffect } from "react";
import Preview from "./Preview";
import { makeStyles } from '@mui/styles';
import {Button} from "@mui/material";
import "./Styles/Body.css"
import FileUpload from "./FileUpload";
import "./Styles/Image.css"
import "./Styles/Video.css"


interface File {
    id: number;
    name: string;
    path: string;
    type: string;
    checked: boolean;
}

function Files({currentDir, setCurrentDir}) {

    const [files, setFiles] = useState<File[]>([]);
    const [currentFile, setCurrentFile] = useState<File>(null)

    useEffect(() => {
        fetch("http://localhost:8080/files")
            .then((response) => response.json())
            .then((data) => setFiles(data));
    }, []);

    const goInto = (file: File) => {
        if (file.type === "DIRECTORY") {
            fetch("http://localhost:8080/files" + file.path)
                .then((response) => response.json())
                .then((data) => setFiles(data))
            setCurrentDir(file.path)
        }
        else {
            setCurrentFile(file)
        }
    };

    const goBack = () => {

        let pathSlices = currentDir.split("/");
        let newPath;
        if (pathSlices.length < 1) {
            newPath = "/";
        } else {
            newPath = pathSlices.slice(0, -1).join("/");
        }

        fetch("http://localhost:8080/files" + newPath)
            .then((response) => response.json())
            .then((data) => setFiles(data))
            .then(() => setCurrentDir(newPath))
    }

    return (
        <>
            <div style={{ width: "50%", border: "2px" }}>
                <h3>Upload</h3>
                    <FileUpload currentDir={currentDir}/>
                <h3>Files</h3>
                <button onClick={() => goBack()}>Back</button>
                <ul>
                    {files.map((file) => (
                        <li key={file.id}>
                            <a
                                href="#"
                                onClick={() => goInto(file)}
                            >
                                {file.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{ width: "50%", border: "2px" }}>
                <Preview file={ currentFile }/>
            </div>
        </>
    );
}

export default Files;
