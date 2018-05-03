// let totalPrice = 0;
// let pricePhone = 10;
// let savings = 40;
// const addButton = document.querySelector('button');

// addButton.addEventListener('click', function () {
//     totalPrice += pricePhone
//     compareMoney(totalPrice, savings)
// });

// const compareMoney = (a, b) => {
//     if (a <= b) {
//         console.log('buy the phone')
//     } else {
//         console.log('no phone')
//     }
// }

// function addPhone() { }
function canIBuy(totalPrice, savings, itemPrice) {
    return ((totalPrice + itemPrice) < savings);
}

function sumItems(itemPrice, totalPrice, savings){
    if(canIBuy(totalPrice, savings, itemPrice)){
        return (totalPrice += itemPrice);
    }
    return totalPrice; 
}