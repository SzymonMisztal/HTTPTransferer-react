import React, {useState} from "react";
import Files from "./Files";
import TopBar from "./TopBar";
import Preview from "./Preview";


function App() {

    const [currentDir, setCurrentDir] = useState<string>("/")

    const appStyle = {
        backgroundColor: '#2a2e32',
        // other styles...
    };

    return (
        <div style={appStyle}>
            <div>
                <TopBar currentDir={currentDir} setCurrentDir={setCurrentDir} />
            </div>
            <div style={{ display: "flex" }}>
                <Files currentDir={currentDir} setCurrentDir={setCurrentDir} />
            </div>
        </div>
    );
}

export default App;