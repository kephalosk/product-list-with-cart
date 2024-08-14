import {validateDessert} from "../models/Dessert.js";
import {desserts} from "../models/desserts.js";

export async function loadComponents() {
    await loadDesserts();
    await loadDessertButton();
    await loadDessertButtonSelected();
    await loadCartItems();
    await loadConfirmationItems();
}

async function loadDesserts() {
    await fetch('components/dessertsGridItemComponent.html?' + new Date().getTime())
        .then(response => response.text())
        .then(data => {
            const dessertsGridItems = document.querySelectorAll('.dessertsGridItemComponent');

            let index = 0;
            validateDessert(desserts);

            dessertsGridItems.forEach(item => {
                const newDessert = document.createRange().createContextualFragment(data);

                const image = newDessert.querySelector('img');
                image.src = desserts.at(index).image;
                image.alt = desserts.at(index).alt;

                const category = newDessert.querySelector('.category');
                category.textContent = desserts.at(index).category;

                const name = newDessert.querySelector('h2');
                name.textContent = desserts.at(index).name;

                const price = newDessert.querySelector('.price');
                price.textContent = desserts.at(index).price;

                item.innerHTML = newDessert.firstElementChild.outerHTML;

                index = index + 1;
            });
        });
}

async function loadDessertButton() {
    await fetch('components/dessertButtonComponent.html?' + new Date().getTime())
        .then(response => response.text())
        .then(data => {
            const dessertButtons = document.querySelectorAll('.dessertButtonComponent');
            dessertButtons.forEach(button => {
                button.innerHTML = data;
            });
        });
}

async function loadDessertButtonSelected() {
    await fetch('components/dessertButtonSelectedComponent.html?' + new Date().getTime())
        .then(response => response.text())
        .then(data => {
            const dessertButtonsSelected = document.querySelectorAll('.dessertButtonSelectedComponent');
            dessertButtonsSelected.forEach(button => {
                button.innerHTML = data;
                button.classList.add('hidden');
            });
        });
}

async function loadCartItems() {
    await fetch('components/cartBoxSelectedListItemComponent.html?' + new Date().getTime())
        .then(response => response.text())
        .then(data => {
            const dessertsGridItems = document.querySelectorAll('.dessertsGridItemComponent');
            const cartBoxSelectedListItems = document.querySelector('.cartBoxSelectedListItems');
            let listItemsHtml = '';
            let totalSum = 0;

            dessertsGridItems.forEach(item => {
                const newItem = document.createRange().createContextualFragment(data);
                const name = item.querySelector('h2').textContent;
                const amount = parseInt(item.querySelector('.dessertButtonSelectedLabel').textContent,10);
                const price = parseFloat(item.querySelector('.price').textContent);
                const sum = amount * price;

                newItem.querySelector('.cartBoxSelectedListItemContentName').textContent = name;
                newItem.querySelector('.cartBoxSelectedListItemContentQuantityAmount').textContent = amount + 'x';
                newItem.querySelector('.price').textContent = parseFloat(price.toString()).toFixed(2).toString();
                newItem.querySelector('.cartBoxSelectedListItemContentQuantitySum').textContent = "$" + parseFloat(sum.toString()).toFixed(2).toString();

                totalSum = totalSum + sum;
                listItemsHtml = listItemsHtml + newItem.firstElementChild.outerHTML;

                if(amount === 0){
                    newItem.querySelector('section').classList.add('hidden');
                }
            });
            cartBoxSelectedListItems.innerHTML = listItemsHtml;

            const cartBoxSelectedTotalPrice = document.querySelector('.cartBoxSelectedTotalPrice');
            cartBoxSelectedTotalPrice.textContent = '$' + parseFloat(totalSum).toFixed(2);

            const cartBoxEmpty = document.querySelector('.cartBoxEmpty')
            const cartBoxSelected = document.querySelector('.cartBoxSelected');
            if(totalSum === 0) {
                cartBoxEmpty.classList.remove('hidden');
                cartBoxSelected.classList.add('hidden');
            } else {
                cartBoxEmpty.classList.add('hidden');
                cartBoxSelected.classList.remove('hidden');
            }
        });
}

async function loadConfirmationItems() {
    await fetch('components/confirmationListItemComponent.html?' + new Date().getTime())
        .then(response => response.text())
        .then(data => {
            const dessertsGridItems = document.querySelectorAll('.dessertsGridItemComponent');

            const confirmationListItems = document.querySelector('.confirmationListItems');

            let listItemsHtml = '';

            let totalSum = 0;

            dessertsGridItems.forEach(item => {
                const newItem = document.createRange().createContextualFragment(data);

                const image = item.querySelector('img');
                const imageSrc = image.src;
                const imageAlt = image.alt;
                const name = item.querySelector('h2').textContent;
                const amount = parseInt(item.querySelector('.dessertButtonSelectedLabel').textContent,10);
                const price = parseFloat(item.querySelector('.price').textContent);
                const sum = amount * price;

                const newItemImage = newItem.querySelector('img');
                newItemImage.src = imageSrc;
                newItemImage.alt = imageAlt;
                newItem.querySelector('.confirmationListItemContentName').textContent = name;
                newItem.querySelector('.confirmationListItemContentQuantityAmount').textContent = amount + 'x';
                newItem.querySelector('.price').textContent = parseFloat(price.toString()).toFixed(2).toString();
                newItem.querySelector('.confirmationListItemContentQuantitySum').textContent = "$" + parseFloat(sum.toString()).toFixed(2).toString();

                totalSum = totalSum + sum;
                listItemsHtml = listItemsHtml + newItem.firstElementChild.outerHTML;

                if(amount === 0){
                    newItem.querySelector('section').classList.add('hidden');
                }
            });
            confirmationListItems.innerHTML = listItemsHtml;

            const confirmationListTotalPrice = document.querySelector('.confirmationListTotalPrice');
            confirmationListTotalPrice.textContent = '$' + parseFloat(totalSum).toFixed(2);
        });
}