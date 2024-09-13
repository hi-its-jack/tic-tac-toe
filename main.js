//GAMEBOARD OBJECT
const Gameboard = (() => {
    let board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];

    const getBoard = () => board;

    const updateBoard = (index, marker) => {
        if (board[index] === " ") {
            board[index] = marker;
            return true;  
        }
        alert("This is already taken!");
        return false;  
    };

    const resetBoard = () => {
        board = [" ", " ", " ", " ", " ", " ", " ", " ", " "];
    };

    const logBoard = () => {
        console.log(`
        ${board[0]} | ${board[1]} | ${board[2]}
        ---------
        ${board[3]} | ${board[4]} | ${board[5]}
        ---------
        ${board[6]} | ${board[7]} | ${board[8]}
        `);
    };

    return { getBoard, updateBoard, resetBoard, logBoard };
})();

//PLAYER OBJECT
const Player = (name, marker) => {
    return { name, marker };  
};

//GAMEPLAY OBJECT
const Gameplay = (() => {
    let players = [];
    let playerTurn = 0;

    const setupGame = (player, opponent) => {
        players = [Player(player, "X"), Player(opponent, "O")];
        playerTurn = 0;
        Gameboard.resetBoard();
        Gameboard.logBoard();
        playGame();
    };

    const currentPlayerTurn = () => players[playerTurn];

    const switchPlayers = () => {
        playerTurn = playerTurn === 0 ? 1 : 0;
    };

    const playGame = () => {
        const currentPlayer = currentPlayerTurn();
        
        const currentPlayerChoice = prompt(`Hello ${currentPlayer.name}, which cell would you like to choose? Please enter a number between 1-9:`);
        const index = currentPlayerChoice - 1;  

        if (currentPlayerChoice < 1 || currentPlayerChoice > 9 || isNaN(currentPlayerChoice)) {
            console.log("Please enter a valid number!");
            return playGame();
        }

        if (Gameboard.updateBoard(index, currentPlayer.marker)) {
            Gameboard.logBoard();

            if (checkWinner(currentPlayer.marker)) {
                console.log(`${currentPlayer.name} wins!`);
            } else if (checkDraw()) {
                console.log("It's a tie!");
            } else {
                switchPlayers();
                playGame();
            }
        } else {
            playGame();  
        }
    };

    const checkDraw = () => {
        return Gameboard.getBoard().every(cell => cell !== " ");  
    };

    const checkWinner = (marker) => {
        const board = Gameboard.getBoard();
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination =>
            combination.every(cell => board[cell] === marker)
        );
    };

    return { setupGame };
})();

Gameplay.setupGame('Player 1', 'Player 2');
