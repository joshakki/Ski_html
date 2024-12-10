// app/page.jsx

"use client";

import { useState } from 'react';
import '../styles/globals.css'; // Import global styles
import { toUpperCase } from '../utils/textUtils'; // Import the utility function

export default function Home() {
    const [inputText, setInputText] = useState('');
    const [convertedText, setConvertedText] = useState(''); // State for converted text
    const [copySuccess, setCopySuccess] = useState(''); // State for copy success message

    const handleInputChange = (e) => {
        setInputText(e.target.value);
    };

    const convertToUpperCase = () => {
        const upperText = toUpperCase(inputText);
        setConvertedText(upperText); // Update the converted text state
        setCopySuccess(''); // Reset copy success message when converting text
    };

    const copyToClipboard = () => {
        if (convertedText) { // Ensure there is text to copy
            navigator.clipboard.writeText(convertedText) // Copy the converted text to clipboard
                .then(() => {
                    setCopySuccess('Copied!'); // Set success message
                    setTimeout(() => setCopySuccess(''), 2000); // Clear message after 2 seconds
                })
                .catch(err => {
                    console.error('Failed to copy: ', err);
                });
        }
    };

    return (
        <div className="container">
            <h1>Text Uppercase Converter</h1>
            <input
                type="text"
                value={inputText}
                onChange={handleInputChange}
                className="inputField"
                placeholder="Enter text here..."
            />
            <button onClick={convertToUpperCase} className="button">
                Convert to Uppercase
            </button>

            {convertedText && ( // Only show this section if there is converted text
                <div className="resultContainer">
                    <h2>Converted Text:</h2>
                    <p className="convertedText">{convertedText}</p>
                    <button onClick={copyToClipboard} className="copyButton">
                        Copy to Clipboard
                    </button>
                    {copySuccess && ( // Show success message next to the button
                        <span className="copySuccessMessage">{copySuccess}</span>
                    )}
                </div>
            )}
        </div>
    );
}