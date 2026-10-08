import React, { useState, useEffect } from "react";

const bc = new BroadcastChannel("inquiry_updates");

async function deleteInquiries(e, id) {

    e.preventDefault();

    const data = await fetch(`/delete/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
    })
    bc.postMessage("refresh");

    const response = await data.text();
    console.log(response);
}

function App3() {

    const [id, setId] = useState();

    return (
        <>
            <form onSubmit={(e) => deleteInquiries(e, id)}>
                <div className="formBorder">
                    <label>id : </label>
                    <input type='number' value={id} onChange={(e) => setId(e.target.value)} min={1} step={1} required />
                </div>
                <br /><br />
                <button>submit</button>
            </form>
        </>
    )
}

export default App3;