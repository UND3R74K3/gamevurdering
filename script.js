const canvas = document.getElementById("roulette-board");
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let money = 1000;
let betAmount = 0;
let bets = [];

function drawBoard() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let colors = ["red", "black"];
    for (let i = 0; i < 12; i++) {
        ctx.fillStyle = colors[i % 2];
        ctx.fillRect(50, 50 + i * 30, 100, 30);
        ctx.fillStyle = "white";
        ctx.fillText(i + 1, 90, 70 + i * 30);
    }
}

function placeBet(amount) {
    if (money >= amount) {
        betAmount = amount;
        console.log(`Du satser $${amount}`);
    } else {
        alert("Ikke nok penger!");
    }
}

canvas.addEventListener("click", function (event) {
    if (betAmount > 0) {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left;
        let y = event.clientY - rect.top;

        bets.push({ x, y, amount: betAmount });
        money -= betAmount;
        document.getElementById("money").innerText = money;
        betAmount = 0;
        drawBets();
    }
});

function drawBets() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    for (let bet of bets) {
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(bet.x, bet.y, 10, 0, Math.PI * 2);
        ctx.fill();
    }
}

function allIn(color) {
    if (money > 0) {
        bets = [{ type: color, amount: money }];
        money = 0;
        document.getElementById("money").innerText = money;
        console.log(`All in på ${color}!`);
    } else {
        alert("Ingen penger igjen!");
    }
}

function spinWheel() {
    let winningNumber = Math.floor(Math.random() * 12) + 1;
    let winningColor = winningNumber % 2 === 0 ? "black" : "red";
    alert(`Vinnende nummer: ${winningNumber} (${winningColor})`);

    // Fjerner tidligere bets
    bets = [];
    drawBets();
}

drawBoard();
