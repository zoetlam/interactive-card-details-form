let check = document.querySelectorAll('.check')
const inputs = document.querySelectorAll('input');
let inputArr = Array.from(inputs);
let arr = [];

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
        let limitNumber = 0;

        // show up on card
        if(this.id == 'cardNum'){
            limitNumber = 16;
            this.value = getValue(this.id, limitNumber);
            changeInnerHtml(".card-num", addSpacesToNumber(this.value));
        }
        if(this.id == 'fullName'){
            limitNumber = 2;
            changeInnerHtml("#name", this.value);
        }
        if(this.id == 'month'){
            limitNumber = 2;
            this.value = getValue(this.id, limitNumber);
            changeInnerHtml(".f-month", this.value);
        }
        if(this.id == 'year'){
            limitNumber = 2;
            this.value = getValue(this.id, limitNumber);
            changeInnerHtml(".f-year", this.value)
        }
        if(this.id == 'cvc'){
            limitNumber = 3;
            this.value = getValue(this.id, limitNumber);
            changeInnerHtml(".b-cvc", this.value);
        }


        //check Bank space and input Validation
        (inputs[0].value === '') ? noBlank(holder) : holder.lastElementChild.innerHTML = '';
        (inputs[1].value === '') ? noBlank(card) : errorType(this);
        (!(inputs[2].value === '') || !(inputs[3].value === '')) ? errorType(this) : noBlank(date);
        (inputs[4].value === '') ? noBlank(cvc) : errorType(this);
        
    });
  });

function errorType(element){
    const parentInput = element.parentElement;
    let inputId = element.id;
    let limitNumber = 0;
    //get limit input value base on each input
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
        } else if(element == inputs[1]){
            if ((element.value).length < 16){
                parentInput.lastElementChild.innerText = 'Please insert 16 digits';
                element.classList.add('border-danger');
            } else{
                parentInput.lastElementChild.innerText = '';
                element.classList.remove('border-danger')
            }
        } else if(element == inputs[2]||element == inputs[3] ){
            if ((element.value).length < 2){
                parentInput.lastElementChild.innerText = 'Please insert 2 digits';
                element.classList.add('border-danger');
            } else{
                parentInput.lastElementChild.innerText ='';
                element.classList.remove('border-danger')
            }
            if(element == inputs[2]){
                if((element.value > 12)||(element.value == 0)){
                    parentInput.lastElementChild.innerText = 'Sorry month must in 1 to 12 range';
                    element.classList.add('border-danger');
                }
            }
        } else if(element == inputs[4]){
            if ((element.value).length < 3){
                parentInput.lastElementChild.innerText = 'Please insert 3 digits';
                element.classList.add('border-danger');
            } else{
                parentInput.lastElementChild.innerText ='';
                element.classList.remove('border-danger')
            }
        }
    } 
}


function checkValid(){
    if ((inputs[0].value === '') &&
        (inputs[1].value === '') &&
        (inputs[2].value === '') &&
        (inputs[3].value === '') &&
        (inputs[4].value === '') ){
            noBlank(holder);
            noBlank(card); 
            noBlank(date);
            noBlank(cvc);
    }
    for(i = 0; i < check.length; i++){
        arr.push(check[i].innerText);
    }
    console.log(arr);
    console.log(arr.every(ele => ele === ''));
    arr = [];
}

function backAgain(){
    document.querySelector('#info').classList.remove('invisible');
    document.querySelector('#success').classList.add('invisible');
}


