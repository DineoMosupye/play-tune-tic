import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';

export function GameStatus() {
  const { state } = useGame();
  const { playSound } = useSound();

  useEffect(() => {
    if (state.winner === 'draw') {
      playSound('draw');
    } else if (state.winner) {
      playSound('win');
    }
  }, [state.winner, playSound]);

  if (state.winner) {
    return (
      <div className={cn(
        'bg-gradient-card border-2 rounded-xl p-6 shadow-card text-center',
        state.winner === 'draw' ? 'border-game-draw/50' : 'border-game-win/50'
      )}>
        {state.winner === 'draw' ? (
          <div>
            <div className="text-3xl font-bold text-game-draw mb-2">It's a Draw!</div>
            <div className="text-muted-foreground">Great game! Try again.</div>
          </div>
        ) : (
          <div>
            <div className="text-3xl font-bold text-game-win mb-2">
              Player {state.winner} Wins! 🎉
            </div>
            <div className="text-muted-foreground">Congratulations on the victory!</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gradient-card border border-border/50 rounded-xl p-6 shadow-card text-center">
      <div className="text-xl font-semibold text-foreground mb-2">
        Current Turn
      </div>
      <div className={cn(
        'text-4xl font-bold',
        state.currentPlayer === 'X' ? 'text-game-x' : 'text-game-o'
      )}
      style={{
        textShadow: state.currentPlayer === 'X' 
          ? '0 0 15px hsl(var(--game-x) / 0.5)'
          : '0 0 15px hsl(var(--game-o) / 0.5)'
      }}>
        Player {state.currentPlayer}
      </div>
      <div className="text-sm text-muted-foreground mt-2">
        Make your move!
      </div>
    </div>
  );
}