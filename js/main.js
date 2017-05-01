$(function() {

  var player1Name="" , player2Name="", turn = "";
  var grid =  [[0,0,0],[0,0,0],[0,0,0]];
  var hasWinner = 0, moveCount=0;

  // Setting variables for player names, turn count, grid markup, winner check, number of moves.

  function boardMsg(x){
      return $("#board").text(x);
  }

  // Relays messages from the board state.

  function setTurn(){
    var r = Math.floor((Math.random() * 2) + 1);
    hasWinner=0;
    if(r==1){
        turn = player1Name;
        boardMsg(player1Name+"'s turn now!");
    }
    else{
        turn = player2Name;
        boardMsg(player2Name+"'s turn now!");
    }
}

// Sets and controls player turns.

function init(){
        turn = "";
        grid =  [[0,0,0],[0,0,0],[0,0,0]];
        boardMsg("");
        $(".col").map(function() {
            $(this).text("");
        }).get();
        hasWinner = 0;
        moveCount=0;
}

// Initializes the board.

$("#playButton").click(function (){

    if(hasWinner==1){
        init();
    }

    player1Name = $("#player-1-inp").val();
    player2Name = $("#player-2-inp").val();

    if(player1Name=="" || player2Name==""){
        alert("Gotta give me some names!");
        return;
    }

    setTurn();
});

$(".col").click(function (){

    if(player1Name=="" || player2Name==""){
        alert("Gimme your name!");
        return;
    }

    var row = $(this).parent().index();
    var col = $(this).index();

    if(grid[row][col]!==0){
        alert("... I'm afraid I can't do that, Dave." );
        return;
    }

    // Can't select a box with something already in it!

    if(hasWinner==1){
        alert("Please play again... Jabroni.");
        return;
    }

    // Can't keep playing after someone wins!

    if(turn==player1Name){
        moveCount++;
        // Increments the moveCount by 1 for each turn
        $(this).text("O");
        // Marks box with 'O' string
        grid[row][col] = 1;
        // Changes value of grid from 0 to 1
        var ifWon = winnerCheck(1,player1Name);
        if(!ifWon){
            if(moveCount>=9){
                boardMsg("Match Drawn!");
                // 9 moves without a winner results in a draw!, reset movecount for play again.
                moveCount=0;
                $("#playButton").text("Play again");
                // Change play button to play again.
                hasWinner=1;
                return;
            }else{
              // If no winner, proceed with the game.
                turn = player2Name;
                boardMsg(player2Name+"'s turn now!");
            }
            return;
            // UGH. REMEMBER TO PLACE THESE. REMEMBER TO RETURN. ALWAYS.
        }
        else{
            return;
        }
    }
    else if(turn==player2Name){
        moveCount++;
        $(this).text("X");
        // Repetition of the rules but for string 'X'
        grid[row][col] = 2;
        var ifWon = winnerCheck(2,player2Name);
        if(!ifWon){
            if(moveCount>=9){
                boardMsg("Match Drawn!");
                moveCount=0;
                $("#playButton").text("Play again");
                hasWinner=1;
                return;
            }else{
                turn = player1Name;
                boardMsg(player1Name+"'s turn now!");
            }
            return;
        }
        else{
            return;
        }
    }
});

function winnerCheck(n,playerName){
    if(

        (grid[0][0]==n && grid[0][1]==n && grid[0][2]==n) ||
        (grid[1][0]==n && grid[1][1]==n && grid[1][2]==n) ||
        (grid[2][0]==n && grid[2][1]==n && grid[2][2]==n) ||

        (grid[0][0]==n && grid[1][0]==n && grid[2][0]==n) ||
        (grid[0][1]==n && grid[1][1]==n && grid[2][1]==n) ||
        (grid[0][2]==n && grid[1][2]==n && grid[2][2]==n) ||

        (grid[0][0]==n && grid[1][1]==n && grid[2][2]==n)||
        (grid[0][2]==n && grid[1][1]==n && grid[2][0]==n)

        // Next time, use a simpler method to mark and change the board. This is stupid and I hate it.


        ){
        boardMsg(playerName+" won the game!");
        // Tell us who the winner is!
        hasWinner = 1;
        moveCount=0;
        $("#playButton").text("Play again");
        return true;
    }
    return false;
    // ... Because you need this if you have a return true, I guess.
}
})
