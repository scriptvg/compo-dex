import { CLInstaller } from "@/components/cli-installer";
import { ExampleFile } from "@/components/example-file";
import { ManualSteps } from "@/components/manual-steps";
import { getSourceCode } from "@/lib/source-code";

export async function PokemonImageManualInstall() {
  const importStepCode = await getSourceCode(
    "components/compo-dex/pokemon-image.tsx",
  );

  return (
    <ManualSteps
      steps={[
        {
          title: "Install the dependencies",
          description: (
            <CLInstaller
              codes={{
                npm: "npm install radix-ui",
                pnpm: "pnpm add radix-ui",
              }}
            />
          ),
        },
        {
          title: "Import the component",
          description: (
            <ExampleFile
              path="components/compo-dex/pokemon-image.tsx"
              language="tsx"
              title="pokemon-image"
              code={importStepCode}
            />
          ),
        },
        {
          title: "Update the import paths to match your project structure",
        },
      ]}
    />
  );
}
