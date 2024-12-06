"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2, CloudUpload } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import getCurrentProducts from "@/server/get-current-products";
import { NewDropsDialog } from "./new-drops-dialog";

const Loading = () => {
  return (
    <div className="flex gap-2 mx-0 my-4">
      <Loader2 className="animate-spin h-6 w-6" />
      Loading
    </div>
  );
};

export default function HotwheelsTable() {
  const [isUpdatePending, startUpdate] = useTransition();
  const [isFetchPending, startFetch] = useTransition();
  const [hotwheels, setHotwheels] = useState<string[]>([]);
  const [updatedOn, setUpdatedOn] = useState<Date | null>(null);
  const [openNewDropsDialog, setOpenNewDropsDialog] = useState(false);
  const [newDrops, setNewDrops] = useState<string[]>([]);

  useEffect(() => {
    startFetch(() => {
      return getCurrentProducts().then((data) => {
        setHotwheels(data.products);
        setUpdatedOn(data.updatedOn);
      });
    });
  }, []);

  const handleUpdate = () => {
    startUpdate(() => {
      return fetch("/api/fetch-hotwheels")
        .then((res) => res.json())
        .then(({ products, newDrops, updatedOn }) => {
          setHotwheels(products);
          setNewDrops(newDrops);
          if (updatedOn) setUpdatedOn(updatedOn);
          if (newDrops.length) setOpenNewDropsDialog(true);

          if (newDrops.length) {
            toast({
              title: "Updated!",
              description: `Added ${newDrops.length} hotwheels!`,
            });
          } else {
            toast({
              title: "Updated!",
              description: `There are no new hotwheels drops!`,
            });
          }
        });
    });
  };

  return (
    <div className="flex items-center flex-col max-w-[600px] mx-auto">
      <NewDropsDialog
        open={openNewDropsDialog}
        newDrops={newDrops}
        onClose={() => setOpenNewDropsDialog(false)}
      />
      <Alert className="flex justify-between items-center gap-8 mb-4">
        <div>
          <AlertTitle>Last updated:</AlertTitle>
          <AlertDescription className="text-muted-foreground">
            {updatedOn
              ? updatedOn?.toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })
              : "Never"}
          </AlertDescription>
        </div>
        <div>
          <Button
            variant="outline"
            disabled={isUpdatePending}
            onClick={handleUpdate}
          >
            {isUpdatePending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <CloudUpload />
            )}
            Update
          </Button>
        </div>
      </Alert>
      {isFetchPending ? (
        <Loading />
      ) : (
        <Table className="border">
          <TableCaption>
            Data from{" "}
            <a href="https://karzanddolls.com/" target="_blank">
              Karzanddolls.com
            </a>
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hotwheels.map((car) => (
              <TableRow key={car}>
                <TableCell>{car}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell className="flex justify-between">
                Total
                <p className="text-right">{hotwheels.length}</p>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </div>
  );
}
