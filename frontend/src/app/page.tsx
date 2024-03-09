import css from "./page.module.scss";
import Image from "next/image";

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

import ListClient from "@/components/ListUsers";
import SearchClient from "@/components/SearchUser";
import FormNewClient from "@/components/FormNewUser";
import BetterRoute from "@/components/BetterRoute";

export default function Home() {
  return (
    <>
      <section className={css["actions"]}>
        <FormNewClient />
        <Separator />
        <BetterRoute />
      </section>
      
      <section className={css["client-list"]}>
        <SearchClient />
        <ListClient />
      </section>
    </>
  );
}
