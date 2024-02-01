import { Progress } from "@/components/ui/progress";

export default function UploadFeedback({ progress }) {
  return (
    <div className="my-6">
      <Progress
        value={Math.round(progress * 100)}
        className="h-5 text-success "
      />
      <div className="mt-2 text-center px-2">
        <span>Uploading Details</span>
      </div>
    </div>
  );
}
