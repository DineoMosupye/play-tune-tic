import React, { createContext, useContext, useReducer, ReactNode } from 'react';

type Player = 'X' | 'O';
type Cell = Player | null;
type Board = Cell[];

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | 'draw' | null;
  gameActive: boolean;
  scores: {
    X: number;
    O: number;
    draws: number;
  };
  winningLine: number[] | null;
  moveCount: number;
}

type GameAction =
  | { type: 'MAKE_MOVE'; payload: number }
  | { type: 'RESET_GAME' }
  | { type: 'RESET_SCORES' }
  | { type: 'SET_WINNER'; payload: { winner: Player | 'draw'; winningLine?: number[] } };

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  gameActive: true,
  scores: {
    X: 0,
    O: 0,
    draws: 0,
  },
  winningLine: null,
  moveCount: 0,
};

const checkWinner = (board: Board): { winner: Player | 'draw' | null; winningLine: number[] | null } => {
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (const line of winningLines) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as Player, winningLine: line };
    }
  }

  if (board.every(cell => cell !== null)) {
    return { winner: 'draw', winningLine: null };
  }

  return { winner: null, winningLine: null };
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'MAKE_MOVE': {
      const { payload: index } = action;
      
      if (!state.gameActive || state.board[index] !== null) {
        return state;
      }

      const newBoard = [...state.board];
      newBoard[index] = state.currentPlayer;
      const moveCount = state.moveCount + 1;

      const { winner, winningLine } = checkWinner(newBoard);
      
      if (winner) {
        const newScores = { ...state.scores };
        if (winner === 'draw') {
          newScores.draws += 1;
        } else {
          newScores[winner] += 1;
        }

        return {
          ...state,
          board: newBoard,
          winner,
          winningLine,
          gameActive: false,
          scores: newScores,
          moveCount,
        };
      }

      return {
        ...state,
        board: newBoard,
        currentPlayer: state.currentPlayer === 'X' ? 'O' : 'X',
        moveCount,
      };
    }

    case 'SET_WINNER': {
      const { winner, winningLine = null } = action.payload;
      const newScores = { ...state.scores };
      
      if (winner === 'draw') {
        newScores.draws += 1;
      } else if (winner) {
        newScores[winner] += 1;
      }

      return {
        ...state,
        winner,
        winningLine,
        gameActive: false,
        scores: newScores,
      };
    }

    case 'RESET_GAME':
      return {
        ...state,
        board: Array(9).fill(null),
        currentPlayer: 'X',
        winner: null,
        winningLine: null,
        gameActive: true,
        moveCount: 0,
      };

    case 'RESET_SCORES':
      return {
        ...state,
        scores: {
          X: 0,
          O: 0,
          draws: 0,
        },
      };

    default:
      return state;
  }
}

interface GameContextType {
  state: GameState;
  makeMove: (index: number) => void;
  resetGame: () => void;
  resetScores: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const makeMove = (index: number) => {
    dispatch({ type: 'MAKE_MOVE', payload: index });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const resetScores = () => {
    dispatch({ type: 'RESET_SCORES' });
  };

  return (
    <GameContext.Provider value={{ state, makeMove, resetGame, resetScores }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}