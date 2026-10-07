type StatusProps = {
  status: string;
};

export default function StatusBadge({ status }: StatusProps) {
  const styles = {
  "On Track":
    "bg-green-50 text-green-700",
  Waiting:
    "bg-amber-50 text-amber-700",
  Stuck:
    "bg-red-50 text-red-700",
  "Action Required":
    "bg-orange-50 text-orange-700",
};

  return (
    <span
      className={`rounded-full px-3 py-1 text-sm font-medium ${
        styles[status as keyof typeof styles]
      }`}
    >
      {status}
    </span>
  );
}