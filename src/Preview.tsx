import React, { useState, useEffect } from "react";

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
            }
        }

    }, [props.file]);

    if (preview) {
        if (preview.type === "FILE") {
            return (
                <>
                    <p>{ preview.text }</p>
                </>
            );
        } else if (
            preview.type === "PNG" ||
            preview.type === "JPEG" ||
            preview.type === "JPG"
        ) {
            return (
                <>
                    <img src={`http://localhost:8080/preview/image${preview.img}`} />
                </>
            );
        }
    }
    return (
        <>No preview</>
    )

}

export default Preview;
