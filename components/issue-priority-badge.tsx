import { IssuePriority } from "@/lib/types/issue-priority.enum";
import {
  IconAlertOctagonFilled,
  IconLineDashed,
  IconRectangleFilled,
  IconTriangleFilled,
  IconTriangleInvertedFilled,
} from "@tabler/icons-react";

type Props = {
  priority: IssuePriority | null;
  scale?: number;
};

export default function IssuePriorityBadge({ priority, scale }: Props) {
  return (
    <div
      className="flex size-4 items-center justify-center border-0 border-red-500"
      style={{ scale: scale }}
    >
      {(() => {
        switch (priority) {
          case IssuePriority.Urgent:
            return (
              <IconAlertOctagonFilled size={20} className="text-red-500" />
            );
          case IssuePriority.High:
            return <IconTriangleFilled size={20} className="text-orange-500" />;
          case IssuePriority.Medium:
            return (
              <IconRectangleFilled size={20} className="text-yellow-500" />
            );
          case IssuePriority.Low:
            return (
              <IconTriangleInvertedFilled
                size={20}
                className="text-green-500"
              />
            );
          default:
            return <IconLineDashed size={20} className="text-gray-700" />;
        }
      })()}
    </div>
  );
}
