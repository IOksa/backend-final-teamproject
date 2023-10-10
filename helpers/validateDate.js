const validateDate = (date)=>{
    const parseDate=date.split("-");
    const year=parseDate[0];
    const month=parseDate[1];
    const day=parseDate[2];
        
    const rangeMonth1=['01','03','05','07','08','10','12'];
    const rangeMonth2=['04','06','09','11'];

    let isLeapYear=true;
    if (year%4!==0){
        isLeapYear=false;
    }
    else{
        if(year%400!==0 && year%100===0){
            isLeapYear=false;
        }
    
    }
       
    if(rangeMonth1.includes(month) && day>31){
        return false;
    }
    if(rangeMonth2.includes(month) && day>30){
        return false;
    }
    if(isLeapYear && month==='02' && day>29){
        return false;
    }
    if(!isLeapYear && month==='02' && day>28){
        return false;
    }
    return true;


}

module.exports=validateDate;