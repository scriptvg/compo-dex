import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, X } from "lucide-react";

const rows = [
  {
    label: "Pokémon domain knowledge",
    generic: false,
    kit: true,
  },
  {
    label: "Headless & composable",
    generic: true,
    kit: true,
  },
  {
    label: "Stat normalization & helpers",
    generic: false,
    kit: true,
  },
  {
    label: "Evolution & form handling",
    generic: false,
    kit: true,
  },
  {
    label: "Works with any data source",
    generic: true,
    kit: true,
  },
];

export function WhyThisKit() {
  return (
    <section className="py-6 border-b border-dashed">
      <div className="mx-auto  px-6">
        <Badge variant="secondary">Why this kit</Badge>

        <h2 className="mt-4 font-semibold text-4xl tracking-[-0.03em] md:text-[2.5rem]">
          Not just another UI library
        </h2>

        <p className="mt-2 text-lg text-muted-foreground">
          shadcn/ui gives you primitives. This kit gives you Pokémon semantics.
        </p>

        <Card className="mt-8 overflow-hidden border shadow-none p-0">
          <Table>
            <TableHeader className="">
              <TableRow className="divide-x bg-secondary">
                <TableHead className="p-4">Feature</TableHead>
                <TableHead className="text-center">Generic UI</TableHead>
                <TableHead className="text-center">This kit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow className="divide-x" key={row.label}>
                  <TableCell className="p-4">{row.label}</TableCell>
                  <TableCell className="">
                    <div className=" items-center text-center justify-center flex">
                      {row.generic ? (
                        <Check className="size-4" />
                      ) : (
                        <X className="size-4 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="">
                    <div className=" items-center text-center justify-center flex">
                      <Check className="size-4 text-center" />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </section>
  );
}
