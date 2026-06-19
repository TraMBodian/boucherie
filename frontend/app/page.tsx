import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/saleor';

export const revalidate = 120;

export default async function HomePage() {
  const products = await getFeaturedProducts();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <section className="mb-12 rounded-3xl bg-white p-10 shadow-lg">
          <div className="flex flex-col gap-8 xl:flex-row xl:items-center xl:justify-between">
            <div className="max-w-2xl">
              <span className="mb-4 inline-block rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700">
                Boucherie en ligne</span>
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
                Viandes fraîches, livraison express et expérience premium
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
                Commandez en quelques clics des produits de qualité, retrait en boutique ou livraison à domicile avec suivi en temps réel.
              </p>
            </div>
            <div className="rounded-3xl bg-brand-500 p-8 text-white shadow-xl sm:p-10">
              <p className="text-sm uppercase tracking-[0.24em] text-brand-100">Starter</p>
              <p className="mt-4 text-3xl font-bold">Boutique headless prête à lancer</p>
              <ul className="mt-6 space-y-3 text-sm leading-6">
                <li>Front-end React/Next</li>
                <li>API Saleor / GraphQL</li>
                <li>Performances optimales</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Produits phares</p>
              <h2 className="mt-3 text-3xl font-bold">Sélection de la semaine</h2>
            </div>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
