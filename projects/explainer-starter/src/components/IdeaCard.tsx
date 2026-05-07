import type { CSSProperties } from "react";

type IdeaCardProps = {
  label: string;
  detail: string;
  style: CSSProperties;
};

export const IdeaCard: React.FC<IdeaCardProps> = ({ label, detail, style }) => {
  return (
    <div className="idea-card" style={style}>
      <span className="idea-card-label">{label}</span>
      <span className="idea-card-detail">{detail}</span>
    </div>
  );
};
