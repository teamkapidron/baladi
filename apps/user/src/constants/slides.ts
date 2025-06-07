import { CarouselSlide } from '@/components/common/carousel';

export const carouselSlides = [
  {
    id: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Quality Products for Professionals',
    description: 'Experience our wide range of products at competitive prices',
    ctaText: 'Explore Products',
    ctaLink: '/products',
  },
  {
    id: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Fresh Asian Ingredients',
    description: 'Directly sourced from authentic producers',
    ctaText: 'Shop Now',
    ctaLink: '/products?category=fresh',
  },
  {
    id: '3',
    imageUrl:
      'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Wholesale Solutions',
    description: 'Reliable supplier for restaurants and food businesses',
    ctaText: 'Contact Us',
    ctaLink: '/contact',
  },
  {
    id: '4',
    imageUrl:
      'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    title: 'Special Offers',
    description: 'Check out our latest deals and promotions',
    ctaText: 'View Offers',
    ctaLink: '/offers',
  },
] satisfies CarouselSlide[];
