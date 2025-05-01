
import { Button } from "@/components/ui/button";

const GalleryPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6">
      <div className="max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Gallery</h1>
        <p className="text-large mb-6">
          This feature is coming soon! Check back later to explore curated collections of local St. Louis information.
        </p>
        <Button onClick={() => window.history.back()}>Go Back</Button>
      </div>
    </div>
  );
};

export default GalleryPage;
