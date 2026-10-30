import { ButtonLink } from "@/components/ui/ButtonLink";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <p className="text-sm font-semibold tracking-wider text-accent-text uppercase">Error 404</p>
      <h1 className="text-4xl font-bold tracking-tight">Página no encontrada</h1>
      <p className="text-muted">La página que buscas no existe o fue movida.</p>
      <ButtonLink href="/">Volver al inicio</ButtonLink>
    </main>
  );
}
