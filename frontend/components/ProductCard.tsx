import Link from 'next/link';
import type { Product } from '@/lib/types';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="aspect-[4/3] bg-slate-100">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="space-y-4 p-6">
        <div>
          <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
          <p className="mt-2 text-sm text-slate-500">{product.category}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-brand-700">{product.price} €</span>
          <Link href={`/product/${product.slug}`} className="inline-flex rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700">
            Détails
          </Link>
        </div>
      </div>
    </article>
  );
}
