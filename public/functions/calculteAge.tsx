import moment from 'moment'

export function calculteAge(dob:any){
 
   const fullDate=  new Date();
   let c_year =moment(fullDate).format('YYYY')
   let c_month=moment(fullDate).format("MM")
   let c_day=moment(fullDate).format("DD")


   const dateOfBirth = moment(dob).format('YYYY-MM-DD')

   let DobDay= moment(dateOfBirth).format('DD')
   let DobMonth=moment(dateOfBirth).format('MM')
   let  DobYear=moment(dateOfBirth).format('YYYY')



   if(c_day<DobDay){
    c_day= c_day+30
     c_month = c_month - 1

     if(c_month<DobMonth){
        c_year =c_year-1
        c_month =c_month+12
     }
   }

   if(c_month<DobMonth){
      c_year =c_year-1
      c_month =c_month+12
  }
  const  age = c_year - DobYear;


  return age
}