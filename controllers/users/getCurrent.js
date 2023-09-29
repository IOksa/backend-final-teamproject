const getCurrent = async(req, res)=> {
    const {name, email, birthday, phone, skype} = req.user;

    
    res.json({
        name,
        email,
        birthday,
        phone,
        skype
        
    })
}

module.exports = getCurrent;