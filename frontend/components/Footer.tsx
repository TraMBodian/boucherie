export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">© 2026 Boucherie Moderne. Tous droits réservés.</p>
        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <span>Politique de confidentialité</span>
          <span>Mentions légales</span>
          <span>Service client</span>
        </div>
      </div>
    </footer>
  );
}
