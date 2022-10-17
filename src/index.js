const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000
const mysql = require('mysql');
const multer = require('multer');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test'
});

// check db connection
db.connect((err) => {
    if (err) {
        console.log('no connection')
    }
    else {
        console.log('database connected ....');
    }
});

app.use(cors());
app.use(bodyparser.json());


app.listen(port, () => {
    console.log(`server is running....${port}`);
})


const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now + "--" + file.originalname)
    },
});
const upload = multer({ storage: fileStorage });

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "upload.html"));
});


app.post("/single", upload.single("image"), (req, res) => {
    console.log("file path", req.file)

    // let sql = ` INSERT INTO document(pan)
    //             VALUES('${req.file.path}')
    //            `;


    // db.query(sql, (err, result) => {
    //     if (err) throw err;
    //     res.send('data inserted');
});



