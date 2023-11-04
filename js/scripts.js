let check = document.querySelectorAll('.check')
const inputs = document.querySelectorAll('input');
let inputArr = Array.from(inputs);

let holder = document.querySelector('.info-name');
let card = document.querySelector('.info-numb');
let date = document.querySelector('.info-month-year');
let cvc = document.querySelector('.info-cvc');

function checkNumberWithoutSpace(element){
    element = element.toString();
    return /^\d+$/.test(element);
}

function getValue(id, maxValue){
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
    return value;
}
function changeInnerHtml(change, a){
    return document.querySelector(change).innerText = a;
}
function addSpacesToNumber(number) {
    let numberString = number.toString();
    // Split the string into groups of four digits
    let groups = numberString.match(/.{1,4}/g);
    return groups.join(' ');
}

function noBlank(a){
    return a.lastElementChild.innerText = "can't be blank"; 
}


inputs.forEach(element => {
    element.addEventListener('input', function(){
        const parentInput = this.parentElement;
        let inputId = this.id;
        let limitNumber = 0;

        //check Bank space and input Validation
        (inputs[0].value === '') ? noBlank(holder) : holder.lastElementChild.innerHTML = '';
        (inputs[1].value === '') ? noBlank(card) : errorType(this);
        (inputs[2].value === '' || inputs[3].value === '') ? noBlank(date) : errorType(this);
        (inputs[4].value === '') ? noBlank(cvc) : errorType(this);

        // show up on card
        if(inputId == 'cardNum'){
            limitNumber = 16;
            changeInnerHtml(".card-num", addSpacesToNumber(getValue(inputId, limitNumber)));
        }
        if(inputId == 'fullName'){
            limitNumber = 2;
            changeInnerHtml("#name", document.querySelector("#fullName").value);
        }
        if(inputId == 'month'){
            limitNumber = 2;
            changeInnerHtml(".f-month", getValue(inputId, limitNumber));
        }
        if(inputId == 'year'){
            limitNumber = 2;
            changeInnerHtml(".f-year", getValue(inputId, limitNumber))
        }
        if(inputId == 'cvc'){
            limitNumber = 3;
            changeInnerHtml(".b-cvc", getValue(inputId, limitNumber));
        }
    });
  });

function errorType(element){
    const parentInput = element.parentElement;
    let inputId = element.id;
    let limitNumber = 0;

    if(inputId == 'cardNum'){
        limitNumber = 16;
        element.value = getValue(inputId, limitNumber);
    }
    if((inputId == 'month')||(inputId == 'year')){
        limitNumber = 2;
        element.value = getValue(inputId, limitNumber);
    }
    if(inputId == 'cvc'){
        limitNumber = 3;
        element.value = getValue(inputId, limitNumber);
    }
    //change element value
    if(!(element == inputs[0])){
        if(!checkNumberWithoutSpace(element.value)){ 
            parentInput.lastElementChild.innerText = 'Wrong format, numbers only';
            element.classList.add('border-danger');
        } else{
            parentInput.lastElementChild.innerText = '';
            element.classList.remove('border-danger')
        };
    } 
}






