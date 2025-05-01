
import { useState } from "react";

// St. Louis specific images
const GALLERY_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1501658907296-1b0aeda12b38",
    alt: "Gateway Arch St. Louis"
  },
  {
    url: "https://images.unsplash.com/photo-1539300172007-671e2bcc85e7",
    alt: "St. Louis Skyline at Night"
  },
  {
    url: "https://images.unsplash.com/photo-1535051179334-8d1493b5056d",
    alt: "St. Louis Cardinals Stadium"
  },
  {
    url: "https://images.unsplash.com/photo-1599243759044-bb0dea176a9f",
    alt: "St. Louis Botanical Garden"
  },
  {
    url: "https://images.unsplash.com/photo-1531253183135-fa03e4c3f61c",
    alt: "Forest Park St. Louis"
  },
  {
    url: "https://images.unsplash.com/photo-1595987169259-0bddcc6d025a",
    alt: "St. Louis Union Station"
  },
  {
    url: "https://images.unsplash.com/photo-1597090656147-0ef9da860d47",
    alt: "St. Louis Art Museum"
  },
  {
    url: "https://images.unsplash.com/photo-1599395373130-c38c0d16ef5c",
    alt: "Mississippi River St. Louis"
  },
  {
    url: "https://images.unsplash.com/photo-1587653089489-9a247c53731f",
    alt: "St. Louis Science Center"
  },
  {
    url: "https://images.unsplash.com/photo-1602444444369-fd291e007799",
    alt: "St. Louis Colorful Buildings"
  },
  {
    url: "https://images.unsplash.com/photo-1540333088855-f6ae878a2a0f",
    alt: "St. Louis City Streets"
  },
  {
    url: "https://images.unsplash.com/photo-1599243780629-503c5a616821",
    alt: "Missouri Botanical Garden"
  },
];

const GalleryPage = () => {
  return (
    <div className="h-full overflow-auto p-2">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {GALLERY_IMAGES.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={image.url} 
              alt={image.alt} 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryPage;
