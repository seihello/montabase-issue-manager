import React from "react";

type Props = {
  label: string;
  children: React.ReactNode;
};

export default function IssuePropertyItem({ label, children }: Props) {
  <h3>Priority</h3>;
  return (
    <div className="text-xs font-semibold text-gray-700">
      <h3>{label}</h3>
      {children}
    </div>
  );
}
