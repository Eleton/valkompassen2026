import { useState } from "react";
import type { Party } from "../types";
import { Button } from "../components/button";

const RADIUS = 40;
const ORIGO = { x: 50, y: 50 };

const pieSlice = (startAngle: number, value: number) => {
  console.log(value);
  const endAngle = startAngle + value * 3.6;
  const largeArcFlag = value > 50 ? 1 : 0;

  const { x, y } = ORIGO;
  const startX = x + RADIUS * Math.cos((startAngle * Math.PI) / 180);
  const startY = y + RADIUS * Math.sin((startAngle * Math.PI) / 180);
  const endX = x + RADIUS * Math.cos((endAngle * Math.PI) / 180);
  const endY = y + RADIUS * Math.sin((endAngle * Math.PI) / 180);

  return `M 50,50 L ${startX},${startY} A ${RADIUS},${RADIUS} 0 ${largeArcFlag},1 ${endX},${endY} Z`;
};

const getPartyAtAngle = (parties: Party[], angle: number, tick: number) => {
  let currentAngle = 0;
  for (const party of parties) {
    console.log(currentAngle);
    const partyAngle = party.value * tick;
    if (angle >= currentAngle && angle < currentAngle + partyAngle) {
      return party.name;
    }
    currentAngle += partyAngle;
  }
  return null;
};

export const Roulette = ({
  parties,
  setParties,
  selectedParty,
  setSelectedParty,
  onNext,
}: {
  parties: Party[];
  setParties: (parties: Party[]) => void;
  selectedParty: Party | null;
  setSelectedParty: (party: Party | null) => void;
  onNext: () => void;
}) => {
  const [count, setCount] = useState(0);
  const [clicked, setClicked] = useState(false);
  const totalValue = parties.reduce((acc, party) => acc + party.value, 0);
  const tick = 360 / totalValue;
  console.log("totalValue", tick);

  const onClick = () => {
    const rounds = Math.floor(Math.random() * 5) + 8;
    const value = Math.floor(Math.random() * 360);
    const c = count + rounds * 360 + value;
    setCount(c);
    setClicked(true);
  };

  const onTransitionEnd = () => {
    const finalAngle = count % 360;
    const party = getPartyAtAngle(parties, finalAngle, tick);
    setSelectedParty(parties.find((p) => p.name === party) || null);
  };

  return (
    <>
      <section className="grow flex flex-col justify-between bg-burgundy-light rounded-3xl p-6 pt-10 max-w-2xl">
        <div className="flex flex-col justify-between grow">
          <div>
            <h2 className="text-4xl font-bold text-center mb-4 text-burgundy">Aimans Valkompass</h2>
            <div className="self-stretch">
              <svg id="chart" className="mx-auto w-full max-w-xl aspect-square" viewBox="0 0 100 100">
                <g
                  className="transition-transform duration-4000 transform-fill origin-center ease-in-out"
                  transform={`rotate(-${count})`}
                  onTransitionEnd={onTransitionEnd}
                >
                  {parties.map((party, index) => {
                    const startAngle =
                      parties.slice(0, index).reduce((acc, p) => acc + p.value, 0) * tick - 90;
                    return (
                      <path
                        key={party.name}
                        d={pieSlice(startAngle, (party.value * 99.99) / totalValue)}
                        fill={party.color}
                      />
                    );
                  })}
                </g>
                <g transform="translate(50, 6)">
                  <path
                    d={`M 0, 0 L 4, 0 L 4, 4 L 2, 8 L 0, 4 Z`}
                    className="-translate-x-1/2 transform-fill fill-burgundy stroke-burgundy-light"
                    strokeWidth="0.5"
                  />
                </g>
              </svg>
            </div>
            <div className="self-stretch flex justify-center mb-4 relative">
              <div
                className="absolute pointer-events-none self-stretch mt-4 text-center transition-opacity"
                style={{
                  opacity: selectedParty ? 1 : 0,
                  transitionDuration: selectedParty ? "500ms" : "0ms",
                  transitionDelay: selectedParty ? "500ms" : "0ms",
                }}
              >
                <p className="text-2xl font-bold text-burgundy">
                  Ditt parti är: {selectedParty?.name}
                </p>
              </div>
              <div className="transition-opacity duration-1000" style={{ opacity: clicked ? 0 : 1 }}>
                <Button onClick={onClick}>Bestäm</Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div
              className="self-stretch flex flex-col transition-opacity"
              style={{
                opacity: selectedParty ? 1 : 0,
                transitionDuration: selectedParty ? "1000ms" : "0ms",
                transitionDelay: selectedParty ? "1500ms" : "0ms",
              }}
            >
              <Button onClick={onNext}>Den tar vi!</Button>
            </div>
            {parties.length > 1 && (
              <div
                className="self-stretch flex flex-col transition-opacity"
                style={{
                  opacity: selectedParty ? 1 : 0,
                  transitionDuration: selectedParty ? "1000ms" : "0ms",
                  transitionDelay: selectedParty ? "2500ms" : "0ms",
                }}
              >
                <Button
                  onClick={() => {
                    setParties(parties.filter((p) => p.name !== selectedParty?.name));
                    setSelectedParty(null);
                    setClicked(false);
                  }}
                >
                  Den skippar vi...
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
