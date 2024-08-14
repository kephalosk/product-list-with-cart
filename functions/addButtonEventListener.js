import {updateCart} from "./updateCart.js";

export function addButtonEventListener() {
    const dessertButtons = document.querySelectorAll('.dessertButtonComponent');

    dessertButtons.forEach(dessertButton => {
        const parentElement = dessertButton.parentElement;
        const dessertButtonSelected = parentElement.querySelector('.dessertButtonSelectedComponent');

        dessertButton.addEventListener('click', () => {
            addItem(dessertButton, dessertButtonSelected);
        });

        dessertButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' '){
                addItem(dessertButton, dessertButtonSelected);
            }
        });

        addDessertButtonSelectedMinusEventListener(dessertButton, dessertButtonSelected);
        addDessertButtonSelectedPlusEventListener(dessertButton, dessertButtonSelected);
    })
}

function addItem(dessertButton, dessertButtonSelected) {
    const buttonLabel = dessertButtonSelected.querySelector('.dessertButtonSelectedLabel');
    buttonLabel.textContent = '1';
    dessertButton.classList.add('hidden');
    dessertButtonSelected.classList.remove('hidden');
    updateCart(dessertButton, dessertButtonSelected);
}

function addDessertButtonSelectedMinusEventListener(dessertButton, dessertButtonSelected) {
    const buttonMinus = dessertButtonSelected.querySelector('.dessertButtonSelectedIconMinus');

    buttonMinus.addEventListener('click', () => {
        decrement(dessertButton, dessertButtonSelected);
    });

    buttonMinus.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' '){
            decrement(dessertButton, dessertButtonSelected);
        }
    });
}

function decrement(dessertButton, dessertButtonSelected) {
    const buttonLabel = dessertButtonSelected.querySelector('.dessertButtonSelectedLabel');
    const labelValue = parseInt(buttonLabel.textContent, 10);

    if (labelValue <= 1){
        buttonLabel.textContent = '0';
        dessertButton.classList.remove('hidden');
        dessertButtonSelected.classList.add('hidden');
    } else {
        buttonLabel.textContent = labelValue - 1;
    }
    updateCart(dessertButton, dessertButtonSelected);
}

function addDessertButtonSelectedPlusEventListener(dessertButton, dessertButtonSelected) {
    const buttonPlus = dessertButtonSelected.querySelector('.dessertButtonSelectedIconPlus');

    buttonPlus.addEventListener('click', () => {
        increment(dessertButton, dessertButtonSelected);
    });

    buttonPlus.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' '){
            increment(dessertButton, dessertButtonSelected);
        }
    });
}

function increment(dessertButton, dessertButtonSelected) {
    const buttonLabel = dessertButtonSelected.querySelector('.dessertButtonSelectedLabel');
    const currentValue = parseInt(buttonLabel.textContent, 10);

    buttonLabel.textContent = currentValue + 1;
    updateCart(dessertButton, dessertButtonSelected);
}

export function addRemoveButtonEventListener() {
    const cartBoxSelectedListItems = document.querySelectorAll('.cartBoxSelectedListItem');
    cartBoxSelectedListItems.forEach(item => {
        const buttonAbort = item.querySelector('.cartBoxSelectedListItemRemove');

        buttonAbort.addEventListener('click', () => {
            removeItem(item);
        });

        buttonAbort.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                removeItem(item);
            }
        })
    });
}

function removeItem(item) {
    const cartName = item.querySelector('.cartBoxSelectedListItemContentName').textContent;
    const dessertContents = document.querySelectorAll('.dessertContent');

    dessertContents.forEach(dessertContent => {
        const dessertName = dessertContent.querySelector('h2').textContent;

        if(dessertName === cartName) {
            resetValue(dessertContent)
        }
    });
}

function resetValue(dessertContent) {
    const buttonLabel = dessertContent.querySelector('.dessertButtonSelectedLabel');
    const dessertButton = dessertContent.querySelector('.dessertButtonComponent');
    const dessertButtonSelected = dessertContent.querySelector('.dessertButtonSelectedComponent');

    buttonLabel.textContent = '0';
    dessertButton.classList.remove('hidden');
    dessertButtonSelected.classList.add('hidden');

    updateCart(dessertButton, dessertButtonSelected);
}