import React, { useState, useEffect } from "react";
import Preview from "./Preview";

interface File {
    id: number;
    name: string;
    path: string;
    type: string;
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
        }
        else {
            setCurrentFile(file)
        }
    };

    const goBack = () => {

        let pathSlices = currentDir.split("/");
        if (pathSlices.length < 1) { return }
        let newPath = pathSlices.slice(0, -1).join("/");

        fetch("http://localhost:8080/files" + newPath)
            .then((response) => response.json())
            .then((data) => setFiles(data))
            .then(() => setCurrentDir(newPath))
    }

    return (
        <>
            <div style={{ width: "50%", border: "2px" }}>
                <h1>Files</h1>
                <button onClick={() => goBack()}>Back</button>
                <ul>
                    {files.map((file) => (
                        <li key={file.id}>
                            <button onClick={() => goInto(file)}>{file.name}</button>
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
