type ProgressBarProps = {
  currentStage: string;
  timeline: string[];
};

export default function ProgressBar({
  currentStage,
  timeline,
}: ProgressBarProps) {
  const currentIndex = timeline.indexOf(currentStage);

  const progress =
  currentIndex === -1 || timeline.length <= 1
    ? 0
    : Math.round(
        (currentIndex / (timeline.length - 1)) * 100
      );

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-slate-700">
          {currentStage}
        </span>

        <span className="text-slate-500">
          {progress}%
        </span>
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