
import { useState } from "react";
import { Button } from "@/components/ui/button";

const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    alt: "Technology workspace"
  },
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    alt: "Gray laptop computer"
  },
  {
    url: "https://images.unsplash.com/photo-1518770660439-4636190af475",
    alt: "Circuit board macro"
  },
  {
    url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
    alt: "Programming monitor"
  },
  {
    url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
    alt: "Person using MacBook"
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    alt: "Woman using laptop"
  },
  {
    url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    alt: "White robot"
  },
  {
    url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
    alt: "Digital code"
  },
  {
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    alt: "Laptop on surface"
  },
  {
    url: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    alt: "Colorful code"
  },
];

const GalleryPage = () => {
  return (
    <div className="h-full overflow-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">St. Louis Gallery</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {GALLERY_IMAGES.map((image, index) => (
          <div key={index} className="relative aspect-square overflow-hidden rounded-lg group">
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
              <p className="text-white text-sm font-medium">{image.alt}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
