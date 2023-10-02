const getCurrent = async(req, res)=> {
    const {name, email, birthday, phone, skype,avatarURL} = req.user;

    
    res.json({
        name,
        email,
        birthday,
        phone,
        skype,
        avatarURL
        
    })
}

module.exports = getCurrent;