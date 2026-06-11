import fs from "node:fs";
import path from "node:path";

export async function getSourceCode(filePath: string): Promise<string> {
  try {
    const fullPath = path.join(process.cwd(), filePath);
    return fs.readFileSync(fullPath, "utf-8");
  } catch (error) {
    console.error(`Error reading file at ${filePath}:`, error);
    return `// Error loading code: ${filePath}`;
  }
}
