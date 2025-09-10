import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { GameBoard } from '@/components/GameBoard';
import { ScoreBoard } from '@/components/ScoreBoard';
import { GameStatus } from '@/components/GameStatus';
import { useGame } from '@/contexts/GameContext';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/contexts/ThemeContext';
import { Home, RotateCcw, Trash2, Palette } from 'lucide-react';

const Game = () => {
  const { resetGame, resetScores } = useGame();
  const { playSound } = useSound();
  const { theme, toggleTheme } = useTheme();

  const handleReset = () => {
    resetGame();
    playSound('reset');
  };

  const handleResetScores = () => {
    resetScores();
    playSound('reset');
  };

  const handleThemeChange = () => {
    toggleTheme();
    playSound('button');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl md:text-4xl font-black bg-gradient-primary bg-clip-text text-transparent">
            TIC TAC TOE
          </h1>
          
          <div className="flex gap-2">
            <Button 
              variant="gameSecondary" 
              size="sm"
              onClick={handleThemeChange}
            >
              <Palette className="w-4 h-4 mr-2" />
              {theme}
            </Button>
            
            <Link to="/">
              <Button variant="gameSecondary" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>

        {/* Game Layout */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left Column - Score Board */}
          <div className="order-2 lg:order-1">
            <ScoreBoard />
            
            {/* Game Controls */}
            <div className="mt-6 space-y-3">
              <Button 
                variant="gameSecondary" 
                onClick={handleReset}
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                New Game
              </Button>
              
              <Button 
                variant="danger" 
                onClick={handleResetScores}
                className="w-full"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Reset Scores
              </Button>
            </div>
          </div>

          {/* Center Column - Game Board */}
          <div className="order-1 lg:order-2">
            <GameBoard />
          </div>

          {/* Right Column - Game Status */}
          <div className="order-3 lg:order-3">
            <GameStatus />
          </div>
        </div>

        {/* Mobile-friendly additional controls */}
        <div className="mt-8 lg:hidden text-center">
          <div className="text-sm text-muted-foreground">
            <p>Tap any empty cell to make your move</p>
            <p className="mt-1">First to get three in a row wins! 🏆</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;