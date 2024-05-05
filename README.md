# Problem Statement :-
In the Minesweeper game, you are given an m x n game board, represented by a matrix of characters. Each cell in the matrix can be one of the following:

'M': Represents an unrevealed mine.
'E': Represents an unrevealed empty square.
'B': Represents a revealed blank square that has no adjacent mines (i.e., above, below, left, right, and all 4 diagonals).
Digit ('1' to '8'): Represents how many mines are adjacent to this revealed square.
'X': Represents a revealed mine.
You are also given an integer array click = [clickr, clickc], which represents the position of the next click among all the unrevealed squares ('M' or 'E').

Your task is to reveal the board after clicking on the specified position (click). The rules for revealing are as follows:

1. If a mine 'M' is revealed, the game is over, and you should change it to 'X'.
2. If an empty square 'E' with no adjacent mines is revealed, change it to a revealed blank 'B', and recursively reveal all of its adjacent unrevealed squares.
3. If an empty square 'E' with at least one adjacent mine is revealed, change it to a digit ('1' to '8') representing the number of adjacent mines.
4. Return the board when no more squares will be revealed.

# Approach To Solve

To solve this problem using the breadth-first search (BFS) approach, we can start with the given click position and explore its adjacent cells. We'll use a queue to perform BFS. Here's a step-by-step explanation of the BFS approach:

1. Initialize a queue and add the click position to it.
2. While the queue is not empty, do the following:
1. Pop the cell from the front of the queue.
2. If the cell is a mine ('M'), change it to 'X' and stop the BFS (game over).
Otherwise, if the cell is an empty square ('E') with no adjacent mines, change it to 'B' and explore its adjacent cells by adding them to the queue.
3. If the cell is an empty square ('E') with adjacent mines, count the number of adjacent mines and update the cell value accordingly. Do not explore its adjacent cells.
3. Return the updated board.