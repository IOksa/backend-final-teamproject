const validateDate = (date)=>{
    const parseDate=date.split("-");
    const year=parseDate[0];
    const month=parseDate[1];
    const day=parseDate[2];
    
    const rangeMonth1=[1,3,5,7,8,10,12];
    const rangeMonth2=[4,6,9,11];

    let isLeapYear=true;
    if (year%4!==0){
        isLeapYear=false;
    }
    else{
        if(year%400!==0 && year%100===0){
            isLeapYear=false;
        }
    
    }
       
    console.log("isLeapYear=", isLeapYear);
    if(rangeMonth1.includes(month) && day>31){
       return false;
    }
    if(rangeMonth2.includes(month) && day>30){
        return false;
    }
    if(isLeapYear && month===2 && day>29){
        console.log("isLeapYear && month===2 && day>29")
        return false;
    }
    if(!isLeapYear && month===2 && day>28){
        console.log("!isLeapYear && month===2 && day>28")
        return false;
    }
    return true;


}

module.exports=validateDate;