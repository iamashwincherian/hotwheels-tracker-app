"use client";

import { useEffect, useState, useTransition } from "react";
import { Loader2, CloudUpload } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import updateHotwheels from "@/server/update-hotwheels";
import getCurrentProducts from "@/server/get-current-products";
import { NewDropsDialog } from "./new-drops-dialog";

export default function HotwheelsTable() {
  const [isPending, startTransition] = useTransition();
  const [hotwheels, setHotwheels] = useState<string[]>([]);
  const [updatedOn, setUpdatedOn] = useState<Date | null>(null);
  const [openNewDropsDialog, setOpenNewDropsDialog] = useState(false);
  const [newDrops, setNewDrops] = useState<string[]>([]);

  useEffect(() => {
    getCurrentProducts().then((data) => {
      setHotwheels(data.products);
      setUpdatedOn(data.updatedOn);
    });
  }, []);

  const handleUpdate = () => {
    startTransition(() => {
      updateHotwheels().then(({ products, newDrops, updatedOn }) => {
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
    <div className="max-w-[600px] mx-auto">
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
          <Button variant="outline" disabled={isPending} onClick={handleUpdate}>
            {isPending ? <Loader2 className="animate-spin" /> : <CloudUpload />}
            Update List
          </Button>
        </div>
      </Alert>
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
    </div>
  );
}
