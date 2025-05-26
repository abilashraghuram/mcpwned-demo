import React from "react";

type AlertType = "error" | "warning" | "info";

export function AlertsPanel() {
  const alerts: { type: AlertType; message: string }[] = [
    { type: "error", message: "Server 3 is down." },
    { type: "warning", message: "High memory usage detected." },
    { type: "info", message: "Backup completed successfully." },
  ];
  const colorMap: Record<AlertType, string> = {
    error: "bg-red-100 text-red-700",
    warning: "bg-yellow-100 text-yellow-700",
    info: "bg-blue-100 text-blue-700",
  };
  return (
    <div className="mb-4">
      <h3 className="font-semibold mb-2">Alerts & Notifications</h3>
      <ul className="space-y-2">
        {alerts.map((alert, idx) => (
          <li key={idx} className={`rounded px-3 py-2 text-sm ${colorMap[alert.type]}`}>{alert.message}</li>
        ))}
      </ul>
    </div>
  );
} 