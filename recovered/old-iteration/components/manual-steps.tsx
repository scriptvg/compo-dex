import { Stepper } from "./ui/stepper";

export function ManualSteps({
  steps,
}: {
  steps: {
    title: string;
    description?: React.ReactNode;
    content?: React.ReactNode;
  }[];
}) {
  return (
    <Stepper >
      <div className="w-full space-y-6">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative w-full items-start not-last:flex-1"
          >
            <div className="flex w-full gap-2.5">
              <div className="items-start h-auto last:pb-0 ">
                <div className="bg-secondary rounded-full size-6 shrink-0 flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
              <div className="text-left w-full">
                <div>{step.title}</div>
                <div className="py-4 w-full min-w-0">{step.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Stepper>
  );
}
