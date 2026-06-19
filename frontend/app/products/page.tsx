import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/saleor';

export const revalidate = 120;

export default async function ProductsPage() {
  const products = await getAllProducts();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Catalogue</p>
          <h1 className="mt-3 text-4xl font-bold">Découvre nos meilleures viandes</h1>
          <p className="mt-4 max-w-2xl text-slate-600">
            Filtre, compare et ajoute au panier les produits premium de la boucherie. Chaque produit est sélectionné pour sa qualité et sa traçabilité.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
