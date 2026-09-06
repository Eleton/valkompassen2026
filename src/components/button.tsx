export const Button = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-burgundy text-3xl text-burgundy-light self-stretch rounded-full py-2 px-8"
    >
      {children}
    </button>
  );
};
