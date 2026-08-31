import { Button } from "../components/button";

export const Home = ({ onNext }: { onNext: () => void }) => {
  return (
    <section className="grow flex flex-col justify-between items-center bg-burgundy-light rounded-3xl p-6 pt-10 max-w-2xl">
      <div className="flex flex-col gap-4">
        <h1 className="text-5xl font-bold text-center mb-4 text-burgundy">Aimans Valkompass</h1>
        <p className="text-2xl mb-8 text-center text-burgundy">
          Dags att göra Aimans Valkompass™ för vägledning i riksdagsvalet 2026!
        </p>
        <p className="text-2xl mb-8 text-center text-burgundy">
          För dig som har svårt att bestämma dig vad du ska rösta på.
        </p>
      </div>
      <Button onClick={() => onNext()}>Start</Button>
    </section>
  );
};
