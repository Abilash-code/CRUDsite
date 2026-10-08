import express from 'express';
import sqlite3 from 'sqlite3';
import ExcelJS from 'exceljs';
import { stringify } from 'csv-stringify/sync';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8081;

const db = new sqlite3.Database('./database.db');

db.run(`CREATE TABLE IF NOT EXISTS inquiries(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mail TEXT NOT NULL,
        content TEXT NOT NULL)
        `);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

app.post('/inquiries', (req, res) => {

    const { mail, content } = req.body;

    db.run(`INSERT INTO inquiries (mail,content) VALUES (?,?)`, [mail, content],
        function (err) {
            if (err) {
                return (res.status(500).send(err.message));
            }
            res.sendStatus(200);
        }
    );
});

app.get('/inquiries', (req, res) => {
    const query = `SELECT id, mail, content FROM inquiries`;

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    })
})

app.put('/update', (req, res) => {

    const { id, mail, content } = req.body;
    const query = `UPDATE inquiries  SET mail = ? , content = ? WHERE id = ?`;
    db.run(query, [mail, content, id], (err) => {
        if (err) res.send(err);
        else res.send("successfull");
    })
})

app.delete('/delete/:id', (req, res) => {

    const id = req.params.id;
    const query = `DELETE FROM inquiries WHERE id = ?`;
    db.run(query, [id], (err) => {
        if (err) res.send(err);
        else res.send("successfull");
    })

})

app.get('/download', (req, res) => {
    let format = req.query.format;
    format = format.toLowerCase();
    db.all("SELECT * FROM inquiries", [], async (err, rows) => {
        try {
            if (err) {
                return res.status(500).json({ error: 'db opening problem' })
            }
            if (!rows || rows.length === 0) {
                return res.status(404).json({ error: 'no data found' });
            }
            if (format === "json") {
                res.setHeader('Content-Type', 'application/json');
                return res.send(JSON.stringify(rows, null, 2));
            }
            else if (format === "csv") {
                const data = stringify(rows, { header: true });
                res.setHeader('Content-Type', 'text/csv');
                return res.send(data);
            }
            else if (format === "xlsx") {
                const workbook = new ExcelJS.Workbook();
                const worksheet = workbook.addWorksheet('Users');

                worksheet.columns = Object.keys(rows[0]).map((key) => ({
                    header: key,
                    key: key
                }))

                worksheet.addRows(rows);

                const buffer = await workbook.xlsx.writeBuffer();

                res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
                return res.send(buffer)
            }
            else {
                return res.status(400).json({ 'error': 'miss input' });
            }
        } catch (processError) {
            console.error(processError);
            return res.status(500).json({ 'error': 'connection error' });
        }
    })
})


app.listen(port, () => {
    console.log("express started and running");
})