import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="mx-auto max-w-4xl px-6 py-12">
        <div className="rounded-3xl bg-white p-10 shadow-lg">
          <h1 className="text-3xl font-bold">Paiement et livraison</h1>
          <p className="mt-4 text-slate-600">Le checkout sera connecté au back-end e-commerce pour gérer les commandes.</p>
          <div className="mt-10 space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">Étape 1</p>
              <p className="mt-2 text-slate-600">Informations client et adresse de livraison.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">Étape 2</p>
              <p className="mt-2 text-slate-600">Choix du mode de livraison et paiement sécurisé.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <p className="font-semibold text-slate-900">Étape 3</p>
              <p className="mt-2 text-slate-600">Confirmation de la commande et suivi en temps réel.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
