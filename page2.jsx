import React from "react";
import ReactDOM from 'react-dom/client';
import App2 from './App2.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App2 />
    </React.StrictMode>
);

/* const button = document.getElementById("updateInquiriesButton");
const bc = new BroadcastChannel("inquiry_updates");

button.addEventListener("click", async (e) => {

    e.preventDefault();

    const id = document.getElementById("id").value;
    const mail = document.getElementById("mail").value;
    const content = document.getElementById("content").value;

    const data = await fetch('/update', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id,
            mail,
            content
        })
    })
    bc.postMessage("refresh");

    const response = await data.text();
    console.log(response);
})
*/