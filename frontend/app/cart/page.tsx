import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <h1 className="text-3xl font-bold">Mon panier</h1>
          <p className="mt-4 text-slate-600">Seuls les produits ajoutés au panier seront affichés ici.</p>
          <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-8 text-center text-slate-500">
            <p className="text-lg font-medium">Panier vide pour l’instant.</p>
            <p className="mt-2">Ajoute des produits depuis le catalogue ou la fiche produit.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
