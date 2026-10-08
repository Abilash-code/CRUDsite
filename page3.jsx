import React from "react";
import ReactDOM from 'react-dom/client';
import App3 from './App3.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App3 />
    </React.StrictMode>
);

/*const button = document.getElementById("deleteInquiryButton");
const bc = new BroadcastChannel("inquiry_updates");

button.addEventListener("click", async (e) => {

    e.preventDefault();

    const id = document.getElementById("id").value;

    const data = await fetch(`/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    bc.postMessage("refresh");

    const response = await data.text();
    console.log(response);

})*/

