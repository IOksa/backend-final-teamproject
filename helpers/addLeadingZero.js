const  addLeadingZero = (value)=>{
    return String(value).padStart(2, '0');
}

module.exports = addLeadingZero;