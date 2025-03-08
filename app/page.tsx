import Image from "next/image";

export default function Home() {
  return (
      <main className="flex flex-col gap-8 items-center justify-center text-center h-screen ">
        <h1 className="text-2xl">Creador de Cátalogos</h1>
        <p>
          Convierte tu lista de productos en un catálogo de productos
          fácilmente.
        </p>
        <a className="bg-blue-500 rounded-2xl p-2" href="/register">Registrarse</a>
      </main>
  );
}
