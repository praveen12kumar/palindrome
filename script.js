const dob = document.querySelector('#dob');
const checkPallindrome = document.querySelector('#checkPallindrome')
const output = document.querySelector('#output')

function reverseStr(str){
    var listOfChars = str.split('');
    var reverseListOfChars = listOfChars.reverse();
    var reversedStr = reverseListOfChars.join('');
    return reversedStr;
    //return str.split('').reverse().join('');
}
function isPallindrome(str){
    var reverse = reverseStr(str);
    return str=== reverse;
}
function convertDateToStr(date){
    var dateStr = { day:'',month:'',year:''};
    if(date.day<10){
        dateStr.day='0'+date.day;
    }
    else{
        dateStr.day=date.day.toString();
    }

    if(date.month<10){
        dateStr.month='0'+date.month;
    }
    else{
        dateStr.month=date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}
function getAllDateFormats(date){
    var dateStr = convertDateToStr(date);
    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month +dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyy = dateStr.month + dateStr.day + dateStr.year;
    var yymmdd = dateStr.year + dateStr.month + dateStr.day;

    return[ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkPallindromeForAllDateFormats(date){
    var listOfPallindromes = getAllDateFormats(date);

    var flag = false;

    for(var i=0; i< listOfPallindromes.length;i++ ){
        if(isPallindrome(listOfPallindromes[i])){
            flag = true;
            break; 
        }
    }
    return flag;
}

/*function isLeapYear(year){
  if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}*/
function isLeapYear(year){
    if(year % 4 === 0){
        if(year % 100 === 0){
            if(year % 400 === 0){
                return true;
              }
              else{return false}
          }
          else{ return true }
    }
    return false;
  }
  

function getNextDate(date){
  var day = date.day +1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];

  if(month=== 2){    
    //console.log("aaaaa")  
    if(isLeapYear(year)){
        //console.log("bbbbbbbbb") 
      if(day>29){
        day=1;month++;        
      //console.log("uuuuuuuuuuuuuuuuuuuuuuuu")  
      }
    }
      else{
        //console.log("iiii") 
        if(day>28){
          day=1;month++; 
          //console.log("ccccccccc")          
          //console.log({day:day,month:month,year:year})
        }
      }
    }
  
  else if(day>daysInMonth[month-1]){
      day=1;
      month++;
      console.log("22222222")      
    }
  
 if(month>12){
   month=1;year++;
 }  
  console.log({day:day,month:month,year:year})
  return{day:day,month:month,year:year};  

}

function getNextPallindromeDate(date){
  var ctr=0;
  var nextDate = getNextDate(date);

  while(1){
    ctr++;
    var isPallindrome = checkPallindromeForAllDateFormats(nextDate);
    if (isPallindrome){
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr,nextDate];  
}

function clickHandler(){
    var bdayStr = dob.value;
    if(bdayStr !==''){
        var listOfDate = bdayStr.split('-');
        var date = {
            day:Number(listOfDate[2]),
            month:Number(listOfDate[1]),
            year:Number(listOfDate[0])
        };
        var isPallindrome = checkPallindromeForAllDateFormats(date);
        if(isPallindrome){
            output.innerText = "yaay!! Your Birthday is a Pallindrome!!😍🥰"
        }
        else{
            var [ctr,nextDate] = getNextPallindromeDate(date);
            output.innerText = "The Next Pallindrome date is "+nextDate.day+"-"+nextDate.month+"-"+nextDate.year+" , You missed by "+ctr+" days!!"
        }
    }

}
checkPallindrome.addEventListener('click', clickHandler);