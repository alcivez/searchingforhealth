'use client';

import { useState, useEffect } from 'react';

const PROMO_IMAGES = [
  '/promo-1.webp',
  '/promo-2.webp',
  '/promo-3.webp',
  '/promo-4.webp',
];

export default function PromoImages() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  useEffect(() => {
    // Randomly select 3 images from the 4 available
    const shuffled = [...PROMO_IMAGES].sort(() => 0.5 - Math.random());
    setSelectedImages(shuffled.slice(0, 3));
  }, []);

  if (selectedImages.length === 0) {
    return null;
  }

  return (
    <section className="mb-6 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
            <img
              src={image}
              alt={`Promotional banner ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>
    </section>
  );
}