import React from 'react';
import { cn } from '@/lib/utils';
import { useGame } from '@/contexts/GameContext';

export function ScoreBoard() {
  const { state } = useGame();

  return (
    <div className="bg-gradient-card border border-border/50 rounded-xl p-6 shadow-card">
      <h2 className="text-xl font-bold text-center mb-4 text-foreground">Score Board</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-secondary/20 rounded-lg border border-game-x/20">
          <div 
            className="text-2xl font-bold text-game-x mb-1"
            style={{ textShadow: '0 0 8px hsl(var(--game-x) / 0.3)' }}
          >
            X
          </div>
          <div className="text-2xl font-bold text-foreground">{state.scores.X}</div>
          <div className="text-xs text-muted-foreground">Player X</div>
        </div>
        
        <div className="text-center p-3 bg-secondary/20 rounded-lg border border-game-draw/20">
          <div className="text-2xl font-bold text-game-draw mb-1">—</div>
          <div className="text-2xl font-bold text-foreground">{state.scores.draws}</div>
          <div className="text-xs text-muted-foreground">Draws</div>
        </div>
        
        <div className="text-center p-3 bg-secondary/20 rounded-lg border border-game-o/20">
          <div 
            className="text-2xl font-bold text-game-o mb-1"
            style={{ textShadow: '0 0 8px hsl(var(--game-o) / 0.3)' }}
          >
            O
          </div>
          <div className="text-2xl font-bold text-foreground">{state.scores.O}</div>
          <div className="text-xs text-muted-foreground">Player O</div>
        </div>
      </div>
    </div>
  );
}