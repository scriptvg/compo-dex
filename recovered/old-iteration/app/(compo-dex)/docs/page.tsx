/* retornar a la pagina de introduction */

import { redirect } from "next/navigation";

export default function Page() {
  redirect("/docs/introduction");
}
