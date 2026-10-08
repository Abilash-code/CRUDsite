import { useState, useEffect } from "react";
const bc = new BroadcastChannel("inquiry_updates");

function Form({ onInquirySubmit }) {

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/inquiries', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: mail,
                content: content
            })
        })
            .then(() => {
                onInquirySubmit();
            })
    }

    const [mail, setMail] = useState('');
    const [content, setContent] = useState('');

    return (
        <div id="formOuterDiv">
            <form onSubmit={handleSubmit}>
                <div className="formBorder">
                    <label>mail : </label>
                    <input type="email" value={mail} onChange={(e) => setMail(e.target.value)} placeholder="example@gmail.com" required/>
                </div>
                <br /><br />
                <div className="formBorder">
                    <label>content : </label>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)} placeholder="your message goes here" minLength={1} maxLength={500}required/>
                </div>
                <br /><br />
                <button>Submit</button>
            </form>
        </div>
    )
}

function Inquiries({ data, setData }) {

    return (
        <div>
            <div id="tableDiv">
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>email</th>
                            <th>message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((datum) => (
                                <tr key={datum.id}>
                                    <td>{datum.id}</td>
                                    <td>{datum.mail}</td>
                                    <td>{datum.content}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <br /><br />
            <a href='/page2.html' target="_blank">
                <button id="update-button">update</button>
            </a>
            <br /><br />
            <a href='/page3.html' target="_blank">
                <button id="delete-button">delete</button>
            </a>
            <br /><br />
            <select id="downloadOptions">
                <option>json</option>
                <option>csv</option>
                <option>xlsx</option>
            </select>
            <button id="downloadButton" onClick={downloadData}>download</button>
            <div id="expander"></div>
        </div>
    )
}

function App() {

    const [data, setData] = useState([]);

    const fetchUsers = async () => {
        await fetch('/inquiries')
            .then(response => response.json())
            .then(data => setData(data));
    }

    bc.onmessage = (event) => {
        if (event.data === "refresh") {
            fetchUsers();
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div id="appOuterDiv">
            <Form onInquirySubmit={fetchUsers} />
            <br /><br />
            {
                data.length === 0 ? <p> No entries in the DB </p> : <Inquiries data={data} setData={setData} />
            }
        </div>
    )
}

async function downloadData() {

    const format = document.getElementById("downloadOptions").value;
    const button = document.getElementById("downloadButton");
    const textBox = document.getElementById("textArea");

    try {

        let response = await fetch(`/download?format=${format}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "something went wrong");
        }

        const blob = await response.blob()

        const downloadURL = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = downloadURL;
        a.download = `users_export.${format}`
        a.style.display = "None";
        document.body.appendChild(a);

        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(downloadURL);

    }

    catch {

        console.log("problemo");

    }

}


export default App;