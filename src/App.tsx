import { useState } from "react";
import "./App.css";
import { Roulette } from "./views/roulette";
import { Home } from "./views/home";
import { Result } from "./views/result";
import { partyData } from "./parties";
import type { Party } from "./types";

function App() {
  const [view, setView] = useState(0);
  const [parties, setParties] = useState(partyData);
  const [selectedParty, setSelectedParty] = useState<Party | null>(null);
  return (
    <main className="bg-burgundy p-5 h-dvh flex justify-center">
      {view === 0 && <Home onNext={() => setView(1)} />}
      {view === 1 && (
        <Roulette
          parties={parties}
          setParties={setParties}
          selectedParty={selectedParty}
          setSelectedParty={setSelectedParty}
          onNext={() => setView(2)}
        />
      )}
      {view === 2 && <Result selectedParty={selectedParty} onNext={() => {
        setSelectedParty(null)
        setParties(partyData)
        setView(0)
      }} />}
    </main>
  );
}

export default App;
