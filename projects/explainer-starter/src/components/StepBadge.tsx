type StepBadgeProps = {
  label: string;
  index: number;
  progress: number;
};

export const StepBadge: React.FC<StepBadgeProps> = ({ label, index, progress }) => {
  const isActive = progress > index * 0.32;

  return (
    <div className={isActive ? "step-badge step-badge-active" : "step-badge"}>
      <span className="step-number">{index + 1}</span>
      <span>{label}</span>
    </div>
  );
};
