// const { User } = require("../../models");

const getCurrent = async (req, res) => {
    // console.log(req.user);
    const { email, subscription } = req.user;
    res.json({
        email,
        subscription  
    })
}

module.exports = getCurrent;