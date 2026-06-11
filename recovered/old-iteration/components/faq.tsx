import { PlusIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const faq = [
  {
    question: "What is this UI kit for?",
    answer:
      "This is a domain-focused UI kit for building Pokédex applications. It provides composable, headless components designed specifically for Pokémon data such as stats, types, evolutions, and abilities.",
  },
  {
    question: "Is this built on top of shadcn/ui?",
    answer:
      "Yes. All components are built on top of shadcn/ui and Radix primitives, following the same conventions and patterns. You can fully customize styles and behavior.",
  },
  {
    question: "Is it tied to PokéAPI?",
    answer:
      "No. The components are data-agnostic. You can use PokéAPI, your own backend, static data, or any other data source.",
  },
  {
    question: "Is this a component library or a full app?",
    answer:
      "It’s a UI component kit, not a full application. You get building blocks, not opinions about routing, state management, or data fetching.",
  },
  {
    question: "Can I use this for production projects?",
    answer:
      "Yes. The components are designed to be production-ready, scalable, and easy to extend for real-world Pokédex apps and tools.",
  },
];

export function Faq() {
  return (
    <section className="py-6 border-b border-dashed">
      <div className="mx-auto w-full  px-6">
        <h2 className="font-semibold text-4xl tracking-[-0.03em]">
          Frequently asked questions
        </h2>
        <p className="mt-2 text-xl text-muted-foreground">
          Common questions about the UI kit and how it works.
        </p>

        <Accordion
          type="single"
          collapsible
          defaultValue="question-0"
          className="mt-8 space-y-4"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="border bg-secondary px-4 h-fit py-1"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 items-center justify-between pt-4 pb-3 text-start text-lg font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                  )}
                >
                  {question}
                  <PlusIcon className="h-5 w-5 text-muted-foreground transition-transform" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-base text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
