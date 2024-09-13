// GAMEBOARD OBJECT
const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];  

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        if (board[index] === "") {  
            board[index] = marker;
            return true;  
        }
        alert("This is already taken!");
        return false;  
    };

    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };

    return { getBoard, updateBoard, resetBoard };
})();

// PLAYER OBJECT
const Player = (name, marker) => {
    return { name, marker };  
};

// GAMEPLAY OBJECT
const Gameplay = (() => {
    let players = [];
    let playerTurn = 0;
    let gameActive = true;  

    const boxes = document.querySelectorAll('.box');
    const commentary = document.getElementById('commentary');
    const restartButton = document.getElementById('restart-button');

    const setupGame = (player1Name, player2Name) => {
        players = [Player(player1Name, "X"), Player(player2Name, "O")];
        playerTurn = 0;
        gameActive = true;
        Gameboard.resetBoard();
        updateBoardDisplay();
        commentary.textContent = `${players[playerTurn].name}'s turn!`;

        boxes.forEach((box, index) => {
            box.addEventListener('click', () => handleBoxClick(index));
        });

        restartButton.addEventListener('click', restartGame);
    };

    const currentPlayerTurn = () => players[playerTurn];

    const switchPlayers = () => {
        playerTurn = playerTurn === 0 ? 1 : 0;
    };

    const handleBoxClick = (index) => {
        if (!gameActive) return;  

        const currentPlayer = currentPlayerTurn();

        if (Gameboard.updateBoard(index, currentPlayer.marker)) {
            updateBoardDisplay();

            if (checkWinner(currentPlayer.marker)) {
                commentary.textContent = `${currentPlayer.name} wins!`;
                gameActive = false;  
            } else if (checkDraw()) {
                commentary.textContent = "It's a tie!";
                gameActive = false;  
            } else {
                switchPlayers();
                commentary.textContent = `${players[playerTurn].name}'s turn!`;
            }
        }
    };

    const updateBoardDisplay = () => {
        const board = Gameboard.getBoard();
        boxes.forEach((box, index) => {
            box.textContent = board[index];
        });
    };

    const checkDraw = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };

    const checkWinner = (marker) => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],  
            [0, 3, 6], [1, 4, 7], [2, 5, 8],  
            [0, 4, 8], [2, 4, 6]              
        ];

        return winningCombinations.some(combination =>
            combination.every(index => board[index] === marker)
        );
    };

    const restartGame = () => {
        Gameboard.resetBoard();
        updateBoardDisplay();
        gameActive = true;
        playerTurn = 0;
        commentary.textContent = `${players[playerTurn].name}'s turn!`;
    };

    // Start the game
    setupGame('Player 1', 'Player 2');  
})();
