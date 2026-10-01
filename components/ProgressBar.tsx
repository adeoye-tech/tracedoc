type ProgressBarProps = {
  stage: string;
};

export default function ProgressBar({
  stage,
}: ProgressBarProps) {
  const progressMap: Record<string, number> = {
    Submission: 25,
    Verification: 50,
    Processing: 75,
    Approved: 100,
  };

  const progress = progressMap[stage] || 0;

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-sm">
        <span>{stage}</span>
        <span>{progress}%</span>
      </div>

      <div className="h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}