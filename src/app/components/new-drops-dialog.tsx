import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface NewDropsDialogProps {
  open: boolean;
  onClose: (open: boolean) => void;
  newDrops: string[];
}

export function NewDropsDialog({
  open,
  newDrops,
  onClose,
}: NewDropsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={() => onClose(false)}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New Drops</DialogTitle>
          <DialogDescription>
            There are {newDrops.length} new hotwheels
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-96 overflow-auto">
          <table>
            <tbody>
              {newDrops.map((car) => (
                <tr key={car}>
                  <td className="border p-1">{car}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <DialogFooter className="justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
