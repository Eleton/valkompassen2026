import { Button } from "../components/button";

import type { Party } from "../types";

export const Result = ({
  selectedParty,
  onNext,
}: {
  selectedParty: Party | null;
  onNext: () => void;
}) => {
  return (
    <section className="grow flex flex-col justify-between bg-burgundy-light rounded-3xl p-6 pt-10 max-w-2xl">
      <div className="flex flex-col gap-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-burgundy">Aimans Valkompass</h2>
        <p className="text-2xl mb-8 text-center text-burgundy">
          Du borde rösta på <span className="font-bold">{selectedParty?.fullName}</span>
        </p>
        <p className="text-xl mb-8 text-center text-burgundy">{selectedParty?.description}</p>
      </div>
      <Button onClick={onNext}>Börja om</Button>
    </section>
  );
};
