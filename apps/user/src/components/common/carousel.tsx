'use client';

import Image from 'next/image';
import React, { useState, useCallback, useEffect, memo } from 'react';
import { ArrowLeft, ArrowRight } from '@repo/ui/lib/icons';

export interface CarouselSlide {
  id: string | number;
  imageUrl: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

interface CarouselProps {
  slides: CarouselSlide[];
  autoPlayInterval?: number;
  showControls?: boolean;
  showIndicators?: boolean;
  height?: { mobile: string; desktop: string };
}

function Carousel(props: CarouselProps) {
  const {
    slides,
    autoPlayInterval = 5000,
    showControls = true,
    showIndicators = true,
    height = { mobile: '400px', desktop: '500px' },
  } = props;

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (!autoPlayInterval || autoPlayInterval <= 0) return undefined;

    const interval = setInterval(nextSlide, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, nextSlide]);

  if (!slides?.length) return null;

  return (
    <div className="relative overflow-hidden rounded-lg">
      <div
        className="relative overflow-hidden bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
        style={{
          height: `var(--carousel-height, ${height.mobile})`,
          ['--carousel-height' as any]: height.mobile,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 h-full w-full transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? 'z-10 opacity-100' : 'z-0 opacity-0'
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div className="absolute inset-0 z-10 bg-black/40" />
            <Image
              src={slide.imageUrl}
              alt={slide.title}
              fill
              sizes="(max-width: 768px) 100vw, 100vw"
              className="object-cover"
              priority={index === 0}
              loading={index === 0 ? 'eager' : 'lazy'}
              quality={80}
            />

            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <div className="max-w-3xl px-6 text-center md:px-0">
                <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
                  {slide.title}
                </h2>
                <p className="mx-auto mb-6 max-w-xl text-lg text-white md:text-xl">
                  {slide.description}
                </p>
                <a
                  href={slide.ctaLink}
                  className="inline-block bg-white px-6 py-3 font-medium text-[var(--color-primary)] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-opacity-90 hover:shadow-xl active:translate-y-0"
                >
                  {slide.ctaText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showControls && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Previous slide"
            type="button"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-30 -translate-y-1/2 rounded-full bg-white/20 p-2 text-white transition-all hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
            aria-label="Next slide"
            type="button"
          >
            <ArrowRight size={20} />
          </button>
        </>
      )}

      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-30 flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                index === currentSlide ? 'scale-125 bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide ? 'true' : 'false'}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default memo(Carousel);
