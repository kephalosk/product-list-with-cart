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

export function addConfirmButtonEventListener() {
    const cartBoxSelectedButton = document.querySelector('.cartBoxSelectedButton');

    cartBoxSelectedButton.addEventListener('click', () => {
        confirmOrder();
    })

    cartBoxSelectedButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' '){
            confirmOrder();
        }
    })
}

function confirmOrder() {
    updateConfirmationList();

    const windowConfirmation = document.querySelector('.windowConfirmation');
    const confirmation = document.querySelector('.confirmation');

    windowConfirmation.classList.remove('hidden');
    confirmation.classList.remove('hidden');

    window.scrollTo(0, 0);
}

function updateConfirmationList() {
    const confirmationListItems = document.querySelector('.confirmationListItems');
    const items = confirmationListItems.querySelectorAll('section');
    const cartBoxSelectedListItemContents = document.querySelectorAll('.cartBoxSelectedListItemContent');

    items.forEach(item =>{
        const confirmationListItemContentName = item.querySelector('.confirmationListItemContentName');

        cartBoxSelectedListItemContents.forEach(cartBoxItem => {
            const cartBoxSelectedListItemContentName = cartBoxItem.querySelector('.cartBoxSelectedListItemContentName');

            if(confirmationListItemContentName.textContent === cartBoxSelectedListItemContentName.textContent){
                transmitContent(item, cartBoxItem);
            }
        })
    });

    const confirmationListTotalPrice = document.querySelector('.confirmationListTotalPrice');
    const cartBoxSelectedTotalPrice = document.querySelector('.cartBoxSelectedTotalPrice');
    confirmationListTotalPrice.textContent = cartBoxSelectedTotalPrice.textContent;

}

function transmitContent(item, cartBoxItem) {
    const confirmationListItemContentQuantityAmount = item.querySelector('.confirmationListItemContentQuantityAmount');
    const cartBoxSelectedListItemContentQuantityAmount = cartBoxItem.querySelector('.cartBoxSelectedListItemContentQuantityAmount');
    confirmationListItemContentQuantityAmount.textContent = cartBoxSelectedListItemContentQuantityAmount.textContent;

    const confirmationListItemContentQuantitySum = item.querySelector('.confirmationListItemContentQuantitySum');
    const cartBoxSelectedListItemContentQuantitySum = cartBoxItem.querySelector('.cartBoxSelectedListItemContentQuantitySum');
    confirmationListItemContentQuantitySum.textContent = cartBoxSelectedListItemContentQuantitySum.textContent;

    setVisibility(confirmationListItemContentQuantityAmount, item);
}

function setVisibility(confirmationListItemContentQuantityAmount, item) {
    const amountRaw = confirmationListItemContentQuantityAmount.textContent;
    const amountClean = amountRaw.replace('x','');
    const amount = parseInt(amountClean);

    if (amount === 0) {
        item.classList.add('hidden');
    } else {
        item.classList.remove('hidden');
    }
}

export function addStartButtonEventListener() {
    const confirmationButton = document.querySelector('.confirmationButton');

    confirmationButton.addEventListener('click', () => {
        startOrder();
    })

    confirmationButton.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' '){
            startOrder();
        }
    })
}

function startOrder() {
    const windowConfirmation = document.querySelector('.windowConfirmation');
    const confirmation = document.querySelector('.confirmation');

    windowConfirmation.classList.add('hidden');
    confirmation.classList.add('hidden');

    resetValues();
}

function resetValues() {
    resetDessertButtons();
    resetCartBoxList();
}

function resetDessertButtons() {
    const dessertsGridItems = document.querySelectorAll('.dessertsGridItemComponent');

    dessertsGridItems.forEach(item => {
        const dessertButtonLabel = item.querySelector('.dessertButtonSelectedLabel');
        dessertButtonLabel.textContent = '0';

        const dessertButton = item.querySelector('.dessertButtonComponent');
        const dessertButtonSelected = item.querySelector('.dessertButtonSelectedComponent');
        dessertButton.classList.remove('hidden');
        dessertButtonSelected.classList.add('hidden');
    });
}

function resetCartBoxList() {
    const cartBoxSelectedListItem = document.querySelectorAll('.cartBoxSelectedListItem');

    cartBoxSelectedListItem.forEach(item => {
        resetItemAmount(item);
        resetItemSum(item);

        const parentSection = item.parentElement;
        if(!parentSection.classList.contains('hidden')) {
            parentSection.classList.add('hidden');
        }
    });

    resetTotalAmount();
    resetTotalSum();

    const cartBoxEmpty = document.querySelector('.cartBoxEmpty')
    const cartBoxSelected = document.querySelector('.cartBoxSelected');
    cartBoxEmpty.classList.remove('hidden');
    cartBoxSelected.classList.add('hidden');
}

function resetItemAmount(item) {
    const cartBoxSelectedListItemContentQuantityAmount = item.querySelector('.cartBoxSelectedListItemContentQuantityAmount');
    cartBoxSelectedListItemContentQuantityAmount.textContent = '0x';
}

function resetItemSum(item) {
    const cartBoxSelectedListItemContentQuantitySum = item.querySelector('.cartBoxSelectedListItemContentQuantitySum');
    cartBoxSelectedListItemContentQuantitySum.textContent = '$0.00';
}

function resetTotalAmount() {
    const itemsAmountTotal = document.querySelector('.itemsAmountTotal');
    itemsAmountTotal.textContent = '0';
}

function resetTotalSum() {
    const cartBoxSelectedTotalPrice = document.querySelector('.cartBoxSelectedTotalPrice');
    cartBoxSelectedTotalPrice.textContent = '$0.00';
}