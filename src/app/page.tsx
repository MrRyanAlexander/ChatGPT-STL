import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <main className="relative min-h-screen p-6 md:p-8">
      <div className="absolute top-4 right-4 md:top-6 md:right-6 z-10">
        <ThemeToggle />
      </div>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-foreground font-headline">
            ChatGPT STL
          </h1>
          <p className="mt-4 text-xl text-foreground font-body">
            Exploring how to use AI locally
          </p>
        </div>
      </div>
    </main>
  );
}
