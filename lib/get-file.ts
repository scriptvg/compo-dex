
import { readFile } from "fs/promises"
import path from "path"

export async function getFileContent(filePath: string, fileName: string) {
  const fullPath = path.join(process.cwd(), filePath);
  try {
    return {
      content: await readFile(fullPath, "utf-8"),
      fileName: fileName,
    }
  } catch (error) {
    console.error(error);
    return {
      content: null,
      fileName: null,
    }
  }
}