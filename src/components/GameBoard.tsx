import React from 'react';
import { cn } from '@/lib/utils';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

interface GameCellProps {
  index: number;
  value: 'X' | 'O' | null;
  isWinning: boolean;
  onClick: () => void;
  disabled: boolean;
}

function GameCell({ index, value, isWinning, onClick, disabled }: GameCellProps) {
  const handleClick = () => {
    if (!disabled && !value) {
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || !!value}
      className={cn(
        'aspect-square bg-gradient-card border-2 border-border rounded-lg',
        'flex items-center justify-center text-6xl font-bold',
        'transition-all duration-300 ease-out transform',
        'hover:scale-105 hover:border-primary/50',
        'disabled:cursor-not-allowed',
        !value && !disabled && 'hover:bg-secondary/30',
        isWinning && 'border-game-win shadow-glow-win bg-game-win/10',
        value === 'X' && 'text-game-x',
        value === 'O' && 'text-game-o',
        value && 'animate-in zoom-in duration-300'
      )}
      style={{
        textShadow: value === 'X' ? '0 0 10px hsl(var(--game-x) / 0.5)' : 
                   value === 'O' ? '0 0 10px hsl(var(--game-o) / 0.5)' : 'none'
      }}
    >
      {value && (
        <span className={cn(
          'select-none transition-all duration-300',
          isWinning && 'scale-110'
        )}>
          {value}
        </span>
      )}
    </button>
  );
}

export function GameBoard() {
  const { state, makeMove } = useGame();
  const { playSound } = useSound();

  const handleCellClick = (index: number) => {
    if (state.gameActive && !state.board[index]) {
      makeMove(index);
      playSound('move');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md mx-auto p-6 bg-gradient-game rounded-2xl shadow-card border border-border/50">
      {state.board.map((cell, index) => (
        <GameCell
          key={index}
          index={index}
          value={cell}
          isWinning={state.winningLine?.includes(index) || false}
          onClick={() => handleCellClick(index)}
          disabled={!state.gameActive}
        />
      ))}
    </div>
  );
}