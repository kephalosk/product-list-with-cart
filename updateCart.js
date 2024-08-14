function updateCart(dessertButton, dessertButtonSelected) {
    const newAmount = dessertButtonSelected.querySelector('.dessertButtonSelectedLabel').textContent;
    const dessertContent = dessertButtonSelected.parentElement;
    const name = dessertContent.querySelector('h2').textContent;
    let totalSum = 0;
    let amountOfAllItems = 0;

    const cartBoxSelectedListItemContents = document.querySelectorAll('.cartBoxSelectedListItemContent');
    cartBoxSelectedListItemContents.forEach(item => {
        const cartBoxSelectedListItemContentName = item.querySelector('.cartBoxSelectedListItemContentName');

        if(cartBoxSelectedListItemContentName.textContent === name) {
            const price = parseFloat(item.querySelector('.price').textContent);
            const sum = newAmount * price;

            item.querySelector('.cartBoxSelectedListItemContentQuantityAmount').textContent = newAmount + 'x';
            item.querySelector('.cartBoxSelectedListItemContentQuantitySum').textContent = "$" + parseFloat(sum.toString()).toFixed(2).toString();

            totalSum = totalSum + sum;

            const listItem = item.parentElement;
            const section = listItem.parentElement;
            parseInt(newAmount) === 0 ? section.classList.add('hidden') : section.classList.remove('hidden');
        } else {
            const sumString = item.querySelector('.cartBoxSelectedListItemContentQuantitySum').textContent;
            const sumFloat = parseFloat(sumString.replace('$',''));
            totalSum = totalSum + sumFloat;
        }

        const cartBoxSelectedListItemContentQuantityAmount = item.querySelector('.cartBoxSelectedListItemContentQuantityAmount');
        amountOfAllItems = amountOfAllItems + parseInt(cartBoxSelectedListItemContentQuantityAmount.textContent,10);
    });

    const itemsAmountTotal = document.querySelector('.itemsAmountTotal');
    itemsAmountTotal.textContent = amountOfAllItems;

    const cartBoxEmpty = document.querySelector('.cartBoxEmpty');
    const cartBoxSelected = document.querySelector('.cartBoxSelected');
    if (totalSum === 0){
        cartBoxEmpty.classList.remove('hidden');
        cartBoxSelected.classList.add('hidden');
    } else if (cartBoxSelected.classList.contains('hidden')) {
        cartBoxEmpty.classList.add('hidden');
        cartBoxSelected.classList.remove('hidden');
    }

    const cartBoxSelectedTotalPrice = document.querySelector('.cartBoxSelectedTotalPrice');
    cartBoxSelectedTotalPrice.textContent = '$' + parseFloat(totalSum).toFixed(2);
}