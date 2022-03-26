const billError = document.querySelector('.error-bill');
const billInput = document.querySelector('.bill-input');


const tipBtn = document.querySelectorAll('.tip-btn');
const tipInput = document.querySelector('.tip-input');
const tipError = document.querySelector('.tip-error');


const countInput = document.querySelector('.count-people-input');
const countErrorZero = document.querySelector('.error_enteger');
const countErrorInteger = document.querySelector('.error_zero');

const reset = document.querySelector('.reset');

let tip = 0;
let bill = 0;
let countPeople = 0;


for (let i = 0; i < tipBtn.length; i++) {
    tipBtn[i].addEventListener('click', () => {
        reset.disabled = false;

        if (!tipBtn[i].classList.contains('active') ) {
            removeActive()
        }

        tipBtn[i].classList.toggle('active');
        tip = Number(tipBtn[i].value)
        calculateTip(bill, tip, countPeople)
    })
}

function validationZero(value, type_error, type_input) {
    console.log(value[0]+value[1])

    if (value >= 0 || value == '') {
        type_error.classList.remove('error-show')
        type_input.classList.remove('input-error')
        return true;
    } else if (value < 0) {
        type_error.classList.add('error-show')
        type_input.classList.add('input-error')   
        return false;
    } 
}

function validationCount(value) {

    if (!Number.isInteger(Number(value))) {
        countErrorZero.classList.add('error-show')
        countInput.classList.add('input-error')   
        return false;

    } else if ((value > 0 && Number.isInteger(Number(value)) || value == '')) {
        countErrorZero.classList.remove('error-show')
        countErrorInteger.classList.remove('error-show')
        countInput.classList.remove('input-error')
        return true;

    } else if (value <= 0  ) {
        countErrorInteger.classList.add('error-show')
        countInput.classList.add('input-error') 
        calculateTip(0, 0, 1)
        return false;
    }
} 

billInput.oninput = () => {
    reset.disabled = false;
    bill = Number(billInput.value)
    if (validationZero(billInput.value, billError, billInput)) {
        calculateTip(bill, tip, countPeople)
    }
}


tipInput.oninput = () => {
    removeActive()
    reset.disabled = false;
    tip = Number(tipInput.value)
    if (validationZero(tipInput.value, tipError,  tipInput)) {
        calculateTip(bill, tip, countPeople)
    }
}

countInput.oninput = () => {
    reset.disabled = false;
    countPeople = Number(countInput.value);
    if (validationCount(countInput.value)) { 
    calculateTip(bill, tip, countPeople)
    }
}




function calculateTip(bill, tip, count) {
    if (count > 0) {
        let tipAmountPerson  = ((+bill/100)*tip)/count;
        let total  = (bill+tipAmountPerson*count)/count;
        document.querySelector('.tip-amount-tip').innerHTML = `$${Number(tipAmountPerson).toFixed(2)}`;
        document.querySelector('.total-amount-total').innerHTML = `$${Number(total).toFixed(2)}`;
    }
}

function removeActive() {
    for (let i = 0; i < tipBtn.length; i++) {
        tipBtn[i].classList.remove('active')
    }
}


reset.addEventListener('click', () => {
    removeActive()
    tipInput.value = '' 
    billInput.value = '' 
    countInput.value = ''
    reset.disabled = true;
    document.querySelector('.tip-amount-tip').innerHTML = `$0.00`;
    document.querySelector('.total-amount-total').innerHTML = `$0.00`;
})

