import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function DeleteListing({
  listingData,
  handleDelete,
  listingId,
}) {
  // Call HandleDelete
  function onDeleteClick() {
    handleDelete(listingId);
  }

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-full text-base">
            Delete Listing
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure you want to delete?</DialogTitle>
            <DialogDescription>
              This will permanently delete the listing{" "}
              <span className="font-semibold">{listingData.location}</span>.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="destructive"
                className="text-base"
                onClick={onDeleteClick}
              >
                Delete
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
