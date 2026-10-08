import React, { useState } from 'react';

const bc = new BroadcastChannel("inquiry_updates");

async function updateInquiries(e, id, mail, content) {

    e.preventDefault();

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
}

function App2() {

    const [id, setId] = useState();
    const [mail, setMail] = useState('');
    const [content, setContent] = useState('');

    return (
        <form onSubmit={(e) => updateInquiries(e,id,mail,content)}>
            <div className="formBorder">
            <label>id : </label>
            <input type='number' value={id} onChange={(e) => setId(e.target.value)} min={1} step={1} required />
            </div>
            <br /><br />
            <div className="formBorder">
            <label>mail : </label>
            <input type='email' value={mail} onChange={(e) => setMail(e.target.value)} required />
            </div>
            <br /><br />
            <div className="formBorder">
            <label>content : </label>
            <input type='text' value={content} onChange={(e) => setContent(e.target.value)} minLength={1} maxLength={500} required />
            </div>
            <br /><br />
            <button>submit</button>
        </form>
    )
}

export default App2;