const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.connect(DB_HOST)
    .then(() => app.listen(PORT, () => {
        console.log("Database connection successful!");
    }))
    .catch(_error => {
        console.log("error.message");
        process.exit(1);
    })


// const sgMail = require("@sendgrid/mail");

// require("dotenv").config();

// const { SENDGRID_API_KEY } = process.env;

// sgMail.setApeKey(SENDGRID_API_KEY);

// const email = {
//     to: "dexewe2164@jthoven.com",
//     from: "maksymzhoglyk@gmail.com",
//     subject: "Новая статья с сайта",
//     html: "<p>С сайта пришла новая статья</p>"
// }

// sgMail.send(email)
//     .then(() => console.log("Email send success"))
//     .catch((error) => console.log(error.message));
    