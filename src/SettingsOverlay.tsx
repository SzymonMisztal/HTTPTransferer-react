import React, { useState } from 'react';
import axios from "axios";

const SettingsOverlay = () => {
    const [settings, setSettings] = useState({
        startDirectory: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSettings((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Send the settings data to the REST Spring backend using axios or any other HTTP library
        // Example using axios:
        axios.post('http://localhost:8080/settings', settings)
            .then((response) => {
                // Handle success
                console.log(response.data);
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
    };

    return (
        <div className="settings-overlay">
            <form>
                <label htmlFor="startDirectory">Start directory: </label>
                <input
                    type="text"
                    name="startDirectory"
                    id="startDirectory"
                    value={settings.startDirectory}
                    onChange={handleInputChange}
                />
                <button type="button" onClick={handleSave}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default SettingsOverlay;
