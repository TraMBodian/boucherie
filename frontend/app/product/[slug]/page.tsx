import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getProductBySlug } from '@/lib/saleor';

interface ProductProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductProps) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="mx-auto max-w-7xl px-6 py-20 text-center">
          <p className="text-xl font-semibold">Produit introuvable.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <img src={product.image} alt={product.name} className="h-[420px] w-full rounded-3xl object-cover" />
            <div className="mt-8 space-y-5">
              <h1 className="text-4xl font-bold text-slate-900">{product.name}</h1>
              <p className="text-lg leading-8 text-slate-600">{product.description}</p>
            </div>
          </div>
          <aside className="rounded-3xl bg-white p-8 shadow-lg">
            <div className="space-y-6">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Prix</p>
                <p className="mt-3 text-4xl font-bold text-brand-700">{product.price} €</p>
              </div>
              <div className="grid gap-3 rounded-3xl bg-slate-50 p-5">
                <p className="text-sm uppercase tracking-[0.28em] text-slate-500">Infos produit</p>
                <p className="text-sm text-slate-600">Catégorie : {product.category}</p>
                <p className="text-sm text-slate-600">Stock : {product.stock > 0 ? 'Disponible' : 'Rupture'}</p>
                <p className="text-sm text-slate-600">Origine : {product.origin}</p>
              </div>
              <button className="w-full rounded-full bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-700">
                Ajouter au panier
              </button>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
