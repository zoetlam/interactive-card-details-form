
function getValue(id, change, maxValue){
    //limit letter in input field
    let inputElement = document.getElementById(id);
    inputElement.addEventListener('input', function() {
        if (this.value.length > maxValue) {
        this.value = this.value.slice(0, maxValue);
        }
    });
    // limit letter on card
    let value = document.getElementById(id).value;
    if (value.length > maxValue) {
            value = value.slice(0, maxValue);
    }
    if (id == 'cardNum'){
        value = addSpacesToNumber(value);
    }
    document.querySelector(change).innerHTML = value;
}

function addSpacesToNumber(number) {
    let numberString = number.toString();
    // Split the string into groups of four digits
    let groups = numberString.match(/.{1,4}/g);
    return groups.join(' ');
}

const inputValue = document.querySelectorAll('input');
inputValue.forEach(element => {
    element.addEventListener('input', function(){
        let inputId = this.id;
        let limitNumber = 1000;
        if(inputId == 'cardNum'){
            limitNumber = 16;
            getValue(inputId, ".f-num", limitNumber);
        }
        if(inputId == 'fullName'){
            let a = document.querySelector("#fullName").value;
            document.querySelector("#name").innerHTML = a;
        }
        if((inputId == 'month')||(inputId == 'year')){
            limitNumber = 2;
            (inputId == 'month')? getValue(inputId, ".f-month", limitNumber) : getValue(inputId, ".f-year", limitNumber);;
        }
        if(inputId == 'cvc'){
            limitNumber = 3;
            getValue(inputId, ".b-cvc", limitNumber);
        }
    });
  });

