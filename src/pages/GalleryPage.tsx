
import { useState } from "react";
import { Loader2 } from "lucide-react";

// More reliable St. Louis images with placeholder fallbacks
const GALLERY_IMAGES = [
  {
    url: "https://images.pexels.com/photos/2194407/pexels-photo-2194407.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Gateway Arch St. Louis"
  },
  {
    url: "https://images.pexels.com/photos/3052361/pexels-photo-3052361.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "St. Louis Skyline at Night"
  },       
  {      
    url: "https://images.pexels.com/photos/8043400/pexels-photo-8043400.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "St. Louis Cardinals Stadium"
  },
  {
    url: "https://images.pexels.com/photos/1055400/pexels-photo-1055400.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "St. Louis Botanical Garden"
  },
  {
    url: "https://images.pexels.com/photos/414122/pexels-photo-414122.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Forest Park St. Louis"
  },
  {
    url: "https://images.pexels.com/photos/1134166/pexels-photo-1134166.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "St. Louis Union Station"
  },
  {
    url: "https://images.pexels.com/photos/1674049/pexels-photo-1674049.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "St. Louis Art Museum"
  },
  {
    url: "https://images.pexels.com/photos/358457/pexels-photo-358457.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Mississippi River St. Louis"
  },
  {
    url: "https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "St. Louis Science Center"
  },
  {
    url: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "St. Louis Colorful Buildings"
  },
  {
    url: "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "St. Louis City Streets"
  },
  {
    url: "https://images.pexels.com/photos/55826/pexels-photo-55826.jpeg?auto=compress&cs=tinysrgb&w=800",
    alt: "Missouri Botanical Garden"
  }
];

const GalleryPage = () => {
  const [loadingImages, setLoadingImages] = useState<Record<number, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});
  
  const handleImageLoad = (index: number) => {
    setLoadingImages(prev => ({ ...prev, [index]: false }));
  };

  const handleImageLoadStart = (index: number) => {
    setLoadingImages(prev => ({ ...prev, [index]: true }));
  };
  
  const handleImageError = (index: number, image: { url: string, alt: string }) => {
    console.error(`Failed to load image: ${image.url}`);
    setFailedImages(prev => ({ ...prev, [index]: true }));
    setLoadingImages(prev => ({ ...prev, [index]: false }));
  };

  return (
    <div className="h-full overflow-auto p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Explore St. Louis</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div key={index} className="relative aspect-square overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow bg-muted/30">
              {loadingImages[index] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              )}
              
              <img 
                src={failedImages[index] ? `https://via.placeholder.com/800x800?text=${encodeURIComponent(image.alt)}` : image.url} 
                alt={image.alt} 
                className={`w-full h-full object-cover transition-opacity duration-300 ${loadingImages[index] ? 'opacity-0' : 'opacity-100'}`}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
                onLoadStart={() => handleImageLoadStart(index)}
                onError={() => handleImageError(index, image)}
              />
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
