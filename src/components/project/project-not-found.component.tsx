import { MoveLeft } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

export default function ProjectNotFound() {
  return (
    <>
      <Alert>
        <AlertTitle className="text-xl">Progetto non trovato</AlertTitle>
        <AlertDescription className="text-l text-muted-foreground">
          Il link che hai non porta a nessun progetto, torna alla home
        </AlertDescription>
      </Alert>
      <Button size={"lg"} asChild className="mt-5 w-full">
        <a href="/">
          <MoveLeft className="mr-2" /> Torna alla home
        </a>
      </Button>
    </>
  );
}
