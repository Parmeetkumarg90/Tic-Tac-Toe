let positions = ['', '', '', '', '', '', '', '', ''], UserO = true, index = -1;
const winnings = [
    [0, 1, 2],
    [3, 4, 5],        // assume event as tic tac toe
    [6, 7, 8],        // 0   1   2
    [0, 3, 6],        // 3   4   5
    [1, 4, 7],        // 6   7   8
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const winner = calculate();
const buttons = document.querySelector('.game-board').querySelectorAll('button');
const gameBoard = document.querySelector('.game-board');
const reset = document.querySelector('#reset');
const currUser = document.querySelector('.curr-user');
const result = document.querySelector('.result');
gameBoard.addEventListener('click', (event) => {
    if (event.target.tagName != 'BUTTON') {
        return;
    }
    event.stopPropagation();
    if (UserO) {
        currUser.innerText = 'User X Turn';
        currUser.classList.add('x');
        currUser.classList.remove('o');
        select(event);
        setTimeout(() => {
            computer();
        }, 1000);
    }
    else {
        currUser.innerText = 'User O Turn';
        currUser.classList.add('o');
        currUser.classList.remove('x');
        select(event);
    }
    const winner = calculate();
    if (winner !== 0) {
        alert("winner is " + winner);
        result.innerText = `Player ${winner} is Winner`;
        currUser.innerText = `User ${winner} wins`;
        return 0;
    }
    else if (winnings.includes('')) {
        alert("Math is draw");
        return 0;
    }

});
function computer() {
    let butNo = Math.floor(Math.random() * 9);
    while (positions[butNo] != '' && positions.includes('')) {
        butNo = Math.floor(Math.random() * 9);
    }
    if (!positions.includes('')) {
        return;
    }
    // console.log(butNo);
    buttons[butNo].click();
}
function select(event) {
    index = event.target.name;
    positions[index] = (UserO === true) ? 'O' : 'X';
    event.target.classList.add(UserO ? 'o' : 'x');
    event.target.innerText = UserO ? 'O' : 'X';
    UserO = UserO ? false : true;
    currUser.innerText = UserO ? 'User O Turn' : 'User X Turn';
    event.target.disabled = true;
}
function calculate() {
    for (let row = 0; row < winnings.length; row++) {
        // console.log(positions[winnings[row][0]] !== '' && positions[winnings[row][0]] === positions[winnings[row][1]] && positions[winnings[row][1]] === positions[winnings[row][2]]);
        // console.log(winnings[row][0]+" => "+positions[winnings[row][0]]+winnings[row][1]+" => "+positions[winnings[row][1]]+winnings[row][2]+" => "+positions[winnings[row][2]]);
        if (positions[winnings[row][0]] !== '' &&
            positions[winnings[row][0]] === positions[winnings[row][1]] &&
            positions[winnings[row][1]] === positions[winnings[row][2]]) {
            buttons.forEach((but) => {
                but.disabled = true;
            });
            return positions[winnings[row][0]];
        }
    }
    return 0;
}
reset.addEventListener('click', () => {
    // window.location.reload();
    positions.fill('');
    buttons.forEach((but) => {
        but.innerHTML = '&#8203;';
        but.classList.remove('o', 'x');
        but.disabled = false;
    });
    UserO = true;
    currUser.innerText = "User O Turn";
    currUser.classList.remove('x', 'o');
});