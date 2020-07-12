class UI {
    constructor() {
        this.balanceAmount = document.getElementById('balance-amount');
        this.incomeAmount = document.getElementById('income-amount');
        this.expenseAmount = document.getElementById('expense-amount');
        this.plusMinus = document.getElementById('plus-minus');
        this.descriptionInput = document.getElementById('description-input');
        this.amountInput = document.getElementById('amount-input');
        this.submitButton = document.getElementById('submit-button');
        this.submitForm = document.getElementById('submit-form');
        this.incomeList = document.getElementById('income-list');
        this.expenseList = document.getElementById('expense-list');
        this.editButton = document.getElementById('edit-button');
        this.deleteIncomeButton = document.getElementById('delete-income-button');
        this.incomeItemList = [];
        this.expenseItemList = [];
        this.itemId = 0;
    }

    //Submit form
    submitEventForm(){
        const amountValue = this.amountInput.value;
        const amountDesc = this.descriptionInput.value;

        if (amountValue <= 0){
            alert("Amount can't be blank, 0 or less than 0")

        } else if (this.plusMinus.options[this.plusMinus.selectedIndex].value === '+'){
            let amount = parseInt(amountValue);
            this.descriptionInput.value = '';
            this.amountInput.value = '';

            let incomePayment = {
                id: this.itemId,
                title: amountDesc,
                amount: amount,
            }

            this.itemId++;
            this.incomeItemList.push(incomePayment);
            this.addIncomePayment(incomePayment);
            this.updateIncomeDisplay();
            this.showTotal();

        } else if (this.plusMinus.options[this.plusMinus.selectedIndex].value === '-') {
            let amount = parseInt(amountValue);
            this.descriptionInput.value = '';
            this.amountInput.value = '';

            let expensePayment = {
                id: this.itemId,
                title: amountDesc,
                amount: amount,
            }

            this.itemId++;
            this.expenseItemList.push(expensePayment);
            this.addExpensePayment(expensePayment);
            this.updateExpenseDisplay();
            this.showTotal();
        }

    }

    showTotal(){
        const income = this.updateIncomeDisplay();
        const expense = this.updateExpenseDisplay();
        const total = parseInt(income) - parseInt(expense);

        this.balanceAmount.textContent = '$' + total;
    }

    //Add income payment
    addIncomePayment(income){
        const div = document.createElement('div');
        div.classList.add('income');
        div.innerHTML = `
        <div class = 'income-item col s12 l6 offset-l3'>
                    
            <h6 class = 'income-payment-title list-item'>${income.title}</h6>
            <h6 class = 'income-payment-amount list-item'>$${income.amount}</h6>
        
            <div class = 'list-icons list-item'>
                <a href = '#' class = 'edit-income-icon' data-id = '${income.id}'>
                    <i class = 'material-icons'>edit</i>
                </a>
                <a href = '#' class = 'delete-income-icon' id = 'delete-income-button' data-id = '${income.id}'>
                    <i class = 'material-icons'>delete</i>
                </a>
            </div>
        </div>
        `;

        this.incomeList.appendChild(div);
    }

    //Add expense payment

    addExpensePayment(expense){
        const div = document.createElement('div');
        div.classList.add('expense');
        div.innerHTML = `
        <div class = 'expense-item col s12 l6 offset-l3'>
                    
            <h6 class = 'expense-payment-title list-item'>${expense.title}</h6>
            <h6 class = 'expense-payment-amount list-item'>-$${expense.amount} </h6>
        
            <div class = 'list-icons list-item'>
                <a href = '#' class = 'edit-expense-icon' data-id = '${expense.id}'>
                    <i class = 'material-icons'>edit</i>
                </a>
                <a href = '#' class = 'delete-expense-icon' data-id = '${expense.id}'>
                    <i class = 'material-icons'>delete</i>
                </a>
            
            </div>
        </div>
        `

        this.expenseList.appendChild(div);
    }


    //Update income display
    updateIncomeDisplay(){
        let total = 0;
        if (this.incomeItemList.length>0){
            total = this.incomeItemList.reduce(function(acc, curr){
                acc += curr.amount;
                return acc;
            }, 0);
        }
        
        this.incomeAmount.textContent ='$' + total;
        return total;
          
    }

    //Update expense display
    updateExpenseDisplay(){
        let total = 0;
        if (this.expenseItemList.length>0){
            total = this.expenseItemList.reduce(function(acc, curr){
                acc += curr.amount;
                return acc;
            }, 0);
        }
        
        this.expenseAmount.textContent ='$' + total;
        return total;
    }

    //Delete income payment
    deleteIncomePayment(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;

        this.incomeList.removeChild(parent);
        let tempList = this.incomeItemList.filter((item) => {
            return item.id !== id
        });

        this.incomeItemList = tempList;
        this.showTotal();
    }

    //Delete expense payment
    deleteExpensePayment(element){
        let id = parseInt(element.dataset.id);
        let parent = element.parentElement.parentElement.parentElement;

        this.expenseList.removeChild(parent);
        let tempList = this.expenseItemList.filter((item) => {
            return item.id !== id
        });

        this.expenseItemList = tempList;
        this.showTotal();
    }

    //Edit income payment
    editIncomePayment(element) {
        let id = parseInt(element.dataset.id)
        let parent = element.parentElement.parentElement.parentElement;

        this.incomeList.removeChild(parent);

        let expense = this.incomeItemList.filter(function(item){
            return item.id === id;
        });

        //repalce inputs
        this.descriptionInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;
        this.plusMinus.selectedIndex = 0;

        let tempList = this.incomeItemList.filter((item) => {
            return item.id !== id;
        })

        this.incomeItemList = tempList;
        this.showTotal();

    }

    //Edit expense payment

    editExpensePayment(element) {
        let id = parseInt(element.dataset.id)
        let parent = element.parentElement.parentElement.parentElement;

        this.expenseList.removeChild(parent);

        let expense = this.expenseItemList.filter(function(item){
            return item.id === id;
        });

        //repalce inputs
        this.descriptionInput.value = expense[0].title;
        this.amountInput.value = expense[0].amount;
        this.plusMinus.selectedIndex = 1;

        let tempList = this.incomeItemList.filter((item) => {
            return item.id !== id;
        })

        this.expenseItemList = tempList;
        this.updateExpenseDisplay();
        this.showTotal();

    }
}




//Gets current day
let curday = () => {
    document.querySelector('.date').innerHTML = new Date().toDateString() + " :";
}




function eventListeners(){
    const submitForm = document.getElementById('submit-form')
    const incomeList = document.getElementById('income-list')
    const expenseList = document.getElementById('expense-list')
    const ui = new UI();

    submitForm.addEventListener('submit', (e) => {
        e.preventDefault();
        ui.submitEventForm();
    });

    incomeList.addEventListener('click', (e) => {
        if (e.target.parentElement.classList.contains('delete-income-icon')){
            ui.deleteIncomePayment(e.target.parentElement);
        } else if (e.target.parentElement.classList.contains('edit-income-icon')){
            ui.editIncomePayment(e.target.parentElement);
        }
    });

    expenseList.addEventListener('click', (e) => {
        if (e.target.parentElement.classList.contains('delete-expense-icon')){
            ui.deleteExpensePayment(e.target.parentElement);
        }  else if (e.target.parentElement.classList.contains('edit-expense-icon')){
            ui.editExpensePayment(e.target.parentElement);
        }
    });


}

//Event Listeners
document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
})

document.addEventListener('DOMContentLoaded', curday);