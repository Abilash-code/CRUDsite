/*async function fetchInquiries(){
    const response =  await fetch('/inquiries');
    const inquiries = await response.json();
    renderTable(inquiries);

    console.log("hello");
}

function renderTable(inquiries){
    const noInquiries = document.getElementById("no-inquiries");
    const inquiriesTable = document.getElementById("inquiries-table");
    const tableBody = document.getElementById("table-body");

    tableBody.innerHTML = "";

    if(inquiries.length === 0){
        noInquiries.style.display = "block";
        inquiriesTable.style.display = "none";
        return;
    }

    noInquiries.style.display = "none";
    inquiriesTable.style.display = "block";

    inquiries.forEach((inquiry) => {
        const row = `<tr>
            <td>${inquiry.id}</td>
            <td>${inquiry.mail}</td>
            <td>${inquiry.content}</td>
        </tr>`;

        tableBody.insertAdjacentHTML('beforeend',row);
    });

    document.body.insertAdjacentHTML('beforeend',`<a href='/page2.html' target="_blank">
        <button id="update-button">update</button>
    </a>
    <a href='/page3.html' target="_blank">
        <button id="delete-button">delete</button>
    </a>
    <br>
    <select id="downloadOptions">
        <option>json</option>
        <option>csv</option>
        <option>xlsx</option>
    </select>
    <button id="downloadButton" onclick="downloadData()">download</button>`);
}

window.onload = fetchInquiries;

const form = document.getElementById("inquiry-form");

async function downloadData(){

    const format = document.getElementById("downloadOptions").value;
    const button = document.getElementById("downloadButton");
    const textBox = document.getElementById("textArea");

    try{

        let response = await fetch(`/download?format=${format}`);

        if(!response.ok){
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

    catch{

        console.log("problemo");

    }

}

/*form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const mail = form.mail.value;
    const content = form.content.value;

    const data = await fetch('/', {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify({
            mail,
            content
        })
    });

    const response = await data.json();
    console.log(response);
})*/