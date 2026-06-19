import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-2xl font-black text-brand-700">
          Boucherie Moderne
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-semibold text-slate-700 hover:text-brand-700">
            Accueil
          </Link>
          <Link href="/products" className="text-sm font-semibold text-slate-700 hover:text-brand-700">
            Catalogue
          </Link>
          <Link href="/cart" className="text-sm font-semibold text-slate-700 hover:text-brand-700">
            Panier
          </Link>
          <Link href="/checkout" className="rounded-full border border-brand-500 bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Commander
          </Link>
        </nav>
      </div>
    </header>
  );
}
