import React from "react";

interface GuardrailCardProps {
  title: string;
  description: string;
  onClick?: () => void; // Optional: for future interactivity
}

export const GuardrailCard: React.FC<GuardrailCardProps> = ({
  title,
  description,
  onClick,
}) => (
  <div
    className="border rounded-lg p-4 shadow-sm hover:shadow-md transition cursor-pointer bg-black text-white"
    onClick={onClick}
    style={{ minWidth: 220, minHeight: 120 }}
  >
    <h3 className="font-semibold text-lg mb-2 text-white">{title}</h3>
    <p className="text-gray-200 text-sm">{description}</p>
  </div>
); 