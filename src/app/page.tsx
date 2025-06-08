import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-primary font-headline">
          ChatGPT STL
        </h1>
        <p className="mt-4 text-xl text-foreground font-body">
          Exploring how to use AI locally
        </p>
      </div>
      <div className="mt-8">
        <ThemeToggle />
      </div>
    </main>
  );
}
