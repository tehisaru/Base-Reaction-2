import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PLAYER, PLAYER_COLORS, PLAYER_BG_COLORS } from "../../lib/constants";
import { PlayerSettingsManager, PLAYER_CONTROL } from "../Menu/MainMenu";

interface GameControlsProps {
  currentPlayer: PLAYER;
  onUndo: () => void;
  onRestart: () => void;
  canUndo: boolean;
  isBaseMode: boolean;
}

const GameControls: React.FC<GameControlsProps> = ({
  currentPlayer,
  onUndo,
  onRestart,
  canUndo,
  isBaseMode
}) => {
  const navigate = useNavigate();

  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // R key restarts the game
      if (e.key === "r" || e.key === "R") {
        onRestart();
      }

      // Z key (with Ctrl/Cmd) for undo
      if ((e.ctrlKey || e.metaKey) && (e.key === "z" || e.key === "Z") && canUndo) {
        onUndo();
      }

      // Escape key to go back to menu
      if (e.key === "Escape") {
        navigate("/");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [canUndo, onRestart, onUndo, navigate]);

  return (
    <div 
      className="flex flex-col items-center justify-center w-full max-w-3xl px-2 md:px-4 py-2 md:py-4 mb-2 md:mb-6"
      style={{ 
        backgroundColor: 'transparent',
        transition: "background-color 0.5s ease"
      }}
    >
      <div className="flex flex-row items-center justify-center gap-2 md:gap-6 w-full max-w-md">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className={`flex-1 min-h-[44px] px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-white text-sm md:text-base font-medium transition-all duration-300 touch-manipulation ${
            canUndo 
              ? "active:scale-95 active:opacity-70" 
              : "opacity-50 cursor-not-allowed"
          }`}
          style={{ 
            fontFamily: 'Menlo, monospace',
            backgroundColor: 'rgb(20, 20, 20)',
            border: 'none',
            transition: "opacity 0.3s ease, transform 0.1s ease",
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          Undo
        </button>

        <button
          onClick={onRestart}
          className="flex-1 min-h-[44px] px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-white text-sm md:text-base font-medium active:scale-95 active:opacity-70 transition-all duration-300 touch-manipulation"
          style={{ 
            fontFamily: 'Menlo, monospace',
            backgroundColor: 'rgb(20, 20, 20)',
            border: 'none',
            transition: "opacity 0.3s ease, transform 0.1s ease",
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          Restart
        </button>

        <button
          onClick={() => navigate("/")}
          className="flex-1 min-h-[44px] px-3 md:px-6 py-2 md:py-3 rounded-lg md:rounded-xl text-white text-sm md:text-base font-medium active:scale-95 active:opacity-70 transition-all duration-300 touch-manipulation"
          style={{ 
            fontFamily: 'Menlo, monospace',
            backgroundColor: 'rgb(20, 20, 20)',
            border: 'none',
            transition: "opacity 0.3s ease, transform 0.1s ease",
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          Menu
        </button>
      </div>
    </div>
  );
};

export default GameControls;