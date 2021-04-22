/* Define references to item, price, add, clear, item output list, 
expense output and saldo output.*/

let shoppingItem = document.querySelector('#item');
let price = document.querySelector('#price');

const addBtn = document.querySelector('#add_btn');
const clearBtn = document.querySelector('#clear_btn');
const itemsList = document.querySelector("#items_list");
const expense = document.querySelector('#expense_output');
const saldo = document.querySelector('#saldo');
const alertCtrl = document.querySelector('ion-alert-controller');

/*Initialize total expenses to 0 and mySaldo to 100.*/
let totalExpenses = 0;
let mySaldo = 100;

// Add click-event listeners to the two buttons.
clearBtn.addEventListener('click', clearItems);
addBtn.addEventListener('click', addItem);

// Function to add items.
function addItem(){

    // Call the two functions to check input, and check saldo doesn't go negative.
    let checkOk = inputCheck();
    let checkSaldo = saldoCheck();
    if (checkOk && checkSaldo){
        /*Deduct price from saldo and set corresponding ion-item textContent. Create ion-item
        element for output-list, create the string and append into list. Increase total expenses
        and increase value of output-expenses.*/
        mySaldo -= price.value;
        saldo.textContent = mySaldo;
        const newItem = document.createElement('ion-item');
        newItem.textContent = shoppingItem.value + ': ' + '$' + price.value;
        itemsList.appendChild(newItem);
        totalExpenses += +price.value;
        expense.textContent = 'Total expenses: $' + totalExpenses;
        // Finally clear input fields.
        clearItems();
    }
    
}

/* Function to clear items from text fields. */
function clearItems(){
    shoppingItem.value = "";
    price.value = "";
    }

/* Check whether item field has at least 1 character, and price is greater than 0.
Returns booleans.*/
function inputCheck(){
    if(shoppingItem.value.trim().length > 0 & price.value > 0){
        return true;
    }
    return false;
}

/*Check if mySaldo - price >= 0 and price > 0 (prevent saldo going negative).
Returns booleans.*/
function saldoCheck(){
    if (mySaldo - price.value >= 0 && price.value > 0) {
        return true;
    }
    presentAlert();
    return false;

/*Asynchronous function presenting alert if saldo goes negative.*/
async function presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = 'Alert';
    alert.subHeader = 'Saldo alert';
    alert.message = "You're saldo can't go negative!";
    alert.buttons = ['OK'];
      
    document.body.appendChild(alert);
    await alert.present();
      
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
    clearItems();
      }
}