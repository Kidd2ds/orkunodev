import { useState } from "react";
import { Input } from 'antd';

const { TextArea } = Input;

function Base64ToImage({ base64Input, setBase64Input }) {
    return (
        <div className="content">
            <TextArea rows={5} onChange={(e) => setBase64Input(e.currentTarget.value)} value={base64Input} placeholder="Enter base64 text" />

            <div className="img-container">
                {base64Input !== "" ? <img className="base64-img" src={base64Input} /> : <h2>
                    Decoded base64 image will be displayed here.
                </h2>}
            </div>
        </div>
    );
}

function ImageToBase64({ imageInput, setImageInput }) {
    const openFile = (file) => {
        const input = file.target;
        const reader = new FileReader();

        reader.onload = function () {
            const dataURL = reader.result;

            setImageInput(dataURL);
        };

        reader.readAsDataURL(input.files[0]);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(imageInput).then(() => {
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    }

    return (
        <div className="content">
            <div className="upload-image-container">
                <input className="btn-default" type='file' accept='image/jpg,image/png,image/jpeg' onChange={(e) => openFile(e)} />
            </div>
            <div className="img-container">
                {imageInput !== "" ? <img className="base64-img" src={imageInput} /> : <h2>
                    Encoded base64 image will be displayed here.
                </h2>}
                <div className="base64-result">
                    {imageInput !== "" ? imageInput : "Base64 result of the image will be here."}
                </div>
                <button className="btn-default" onClick={copyToClipboard}>
                    Copy to Clipboard
                </button>
            </div>
        </div>
    );
}

function App() {
    const [tab, setTab] = useState(0);
    const [base64Input, setBase64Input] = useState("");
    const [imageInput, setImageInput] = useState("");

    return (
        <div className="wrapper">
            <div className="container">
                <header className="content-header">
                    <button className={tab === 0 ? "active" : ""} onClick={() => setTab(0)}>Base64 to Image</button>
                    <button className={tab === 1 ? "active" : ""} onClick={() => setTab(1)}>Image to Base64</button>
                </header>
                {
                    tab === 0 ?
                        <Base64ToImage setBase64Input={setBase64Input} base64Input={base64Input} />
                        :
                        <ImageToBase64 setImageInput={setImageInput} imageInput={imageInput} />
                }
            </div>
        </div>
    );
}

export default App;
