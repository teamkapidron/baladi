import { Suspense } from 'react';

import Header from '@/components/common/header/header';
import Carousel from '@/components/common/carousel';
import Footer from '@/components/common/footer/footer';

import { carouselSlides } from '@/constants/slides';

export default function Home() {
  return (
    <div>
      <Header />
      <Carousel
        slides={carouselSlides}
        showControls={true}
        showIndicators={true}
      />
      <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <h1 className="my-6 mb-6 text-center text-3xl font-bold md:text-4xl">
          Våre Produkter
        </h1>
        <div className="mb-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-5">
            <Suspense></Suspense>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
