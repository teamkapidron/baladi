interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage(props: ProductDetailPageProps) {
  const { slug } = await props.params;

  return <div>ProductDetailPage {slug}</div>;
}
