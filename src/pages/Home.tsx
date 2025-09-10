import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useModal } from '@/hooks/useModal';
import { useSound } from '@/hooks/useSound';
import { useTheme } from '@/contexts/ThemeContext';
import { Play, HelpCircle, Palette } from 'lucide-react';

function InstructionsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-card border border-border/50 rounded-2xl shadow-card max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-foreground mb-4">How to Play</h2>
        <div className="space-y-4 text-sm text-foreground/90">
          <div>
            <h3 className="font-semibold text-foreground mb-2">Objective</h3>
            <p>Be the first player to get three of your marks (X or O) in a row, column, or diagonal.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-2">How to Play</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Player X always goes first</li>
              <li>Click on any empty cell to place your mark</li>
              <li>Players alternate turns</li>
              <li>First to get three in a row wins!</li>
              <li>If all cells are filled with no winner, it's a draw</li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-foreground mb-2">Features</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Score tracking across games</li>
              <li>Sound effects for moves</li>
              <li>Theme switching</li>
              <li>Winning animations</li>
            </ul>
          </div>
        </div>
        
        <Button onClick={onClose} variant="game" className="w-full mt-6">
          Got it!
        </Button>
      </div>
    </div>
  );
}

const Home = () => {
  const instructionsModal = useModal();
  const { playSound } = useSound();
  const { theme, toggleTheme } = useTheme();

  const handleButtonClick = (soundType: 'button') => {
    playSound(soundType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-7xl font-black bg-gradient-primary bg-clip-text text-transparent mb-4">
            TIC TAC TOE
          </h1>
          <p className="text-xl text-muted-foreground max-w-md mx-auto">
            Challenge your friend in this classic game with modern style and sound effects
          </p>
        </div>

        {/* Game Preview */}
        <div className="mb-8 flex justify-center">
          <div className="grid grid-cols-3 gap-2 w-32 h-32 bg-gradient-game rounded-xl p-3 border border-border/50 shadow-card">
            <div className="bg-secondary/30 rounded flex items-center justify-center text-game-x text-xl font-bold">X</div>
            <div className="bg-secondary/30 rounded"></div>
            <div className="bg-secondary/30 rounded flex items-center justify-center text-game-o text-xl font-bold">O</div>
            <div className="bg-secondary/30 rounded"></div>
            <div className="bg-secondary/30 rounded flex items-center justify-center text-game-x text-xl font-bold">X</div>
            <div className="bg-secondary/30 rounded"></div>
            <div className="bg-secondary/30 rounded flex items-center justify-center text-game-o text-xl font-bold">O</div>
            <div className="bg-secondary/30 rounded"></div>
            <div className="bg-secondary/30 rounded flex items-center justify-center text-game-x text-xl font-bold">X</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <Link to="/game" onClick={() => handleButtonClick('button')}>
            <Button variant="game" size="lg" className="w-full max-w-sm text-lg py-6">
              <Play className="w-5 h-5 mr-2" />
              Start New Game
            </Button>
          </Link>

          <div className="flex gap-4 justify-center">
            <Button 
              variant="gameSecondary" 
              size="lg" 
              onClick={() => {
                handleButtonClick('button');
                instructionsModal.open();
              }}
            >
              <HelpCircle className="w-5 h-5 mr-2" />
              How to Play
            </Button>

            <Button 
              variant="gameSecondary" 
              size="lg" 
              onClick={() => {
                handleButtonClick('button');
                toggleTheme();
              }}
            >
              <Palette className="w-5 h-5 mr-2" />
              Theme: {theme}
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>Built with React, TypeScript & Tailwind CSS</p>
          <p className="mt-1">Enjoy the game! 🎮</p>
        </div>
      </div>

      <InstructionsModal 
        isOpen={instructionsModal.isOpen} 
        onClose={instructionsModal.close} 
      />
    </div>
  );
};

export default Home;