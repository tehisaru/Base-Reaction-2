import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface TutorialScreenProps {
  mode: "chain-reaction" | "base-reaction-2";
  onBack?: () => void; // Optional callback to handle back navigation
}

const typewriterFont = { fontFamily: 'Menlo, monospace' };

const TutorialScreen: React.FC<TutorialScreenProps> = ({ mode, onBack }) => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-black p-4 py-8" style={{ maxHeight: "100vh" }}>
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-white" style={typewriterFont}>
        {mode === "chain-reaction" ? "Chain Reaction Mode" : "Base Reaction Mode"} Tutorial
      </h1>
      <div className="max-w-3xl mx-auto text-white p-4 md:p-6" style={{ transition: "all 0.3s ease" }}>
        
        {mode === "chain-reaction" ? (
          <div className="space-y-4">
            <section>
              <h2 className="text-lg font-semibold mb-2" style={typewriterFont}>How to Play</h2>
              <ul className="list-disc pl-6 space-y-1" style={typewriterFont}>
                <li>Win by being the only player with dots remaining</li>
                <li>When cells reach criticl mass, they explode and spread to neighbors</li>
                 <li>Capture enemy dots by exploding next to them</li>
                
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-semibold mb-2" style={typewriterFont}>Critical Mass (When Cells Explode)</h2>
              <ul className="list-disc pl-6 space-y-1" style={typewriterFont}>
                <li><strong>Corner cells:</strong> 2 dots → explode</li>
                <li><strong>Edge cells:</strong> 3 dots → explode</li>
                <li><strong>Center cells:</strong> 4 dots → explode</li>
              </ul>
            </section>
            

          </div>
        ) : (
          <div className="space-y-4">
            <section>
              <h2 className="text-lg font-semibold mb-2" style={typewriterFont}>How to Play</h2>
              <ul className="list-disc pl-6 space-y-1" style={typewriterFont}>
            
                <li>Win by being the last player with an HQ</li>
                <li>Place dots in the highlighted area or next to your existing dots</li>
                <li>Capture enemy dots by exploding next to them</li>
                <li>Exploding next to enemy HQ damages it</li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-lg font-semibold mb-2" style={typewriterFont}>Power-ups</h2>
              <ul className="list-disc pl-6 space-y-1" style={typewriterFont}>
                <li>
                  <strong>Diamond:</strong> When a player places a dot on a diamond, a row (2 players) or 3×3 grid of dots of that player's color appear
                </li>
                <li>
                  <strong>Heart:</strong> When a player places a dot on a heart they damage enemy HQ or heals the player's HQ (if less than 5 lives)
                </li>
              </ul>
            </section>
          </div>
        )}
        
        <div className="mt-8 mb-16 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (onBack) {
                onBack(); // Use callback if provided (when accessed from MainMenu)
              } else {
                navigate("/"); // Fallback to home navigation
              }
            }}
            className="py-4 px-8 rounded-2xl text-white bg-black hover:bg-gray-800 transition-all duration-200 border-2 border-white w-full md:w-auto"
            style={typewriterFont}
          >
            Back
          </motion.button>
          
    
        </div>
      </div>
    </div>
  );
};

export default TutorialScreen;
