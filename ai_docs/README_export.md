# Export — Cahier des charges

Ce fichier explique comment convertir le cahier des charges Markdown en PDF ou HTML.

## Options recommandées

1) Avec `pandoc` (Linux / macOS / Windows si `pandoc` + `xelatex` installés) :

```bash
pandoc cahier_des_charges_boucherie_woocommerce.md \
  -o cahier_des_charges_boucherie_woocommerce.pdf \
  --from markdown \
  -V geometry:margin=1in \
  --pdf-engine=xelatex
```

2) Avec l'extension VS Code "Markdown PDF" :
- Ouvrir `cahier_des_charges_boucherie_woocommerce.md`.
- Command Palette → "Markdown PDF: Export (pdf)".

3) Export HTML (si besoin de mise en page web) :

```bash
pandoc cahier_des_charges_boucherie_woocommerce.md -o cahier_des_charges_boucherie_woocommerce.html
```

## Conseils
- Pour de meilleurs résultats PDF, utiliser un template LaTeX ou ajouter un en-tête YAML dans le Markdown.
- Vérifier les images : utiliser des images de résolution suffisante et préférer `.webp`/`.jpg` optimisées.
- Si besoin, je peux produire un template LaTeX personnalisé ou générer directement un PDF (si tu veux, dis "génère le PDF").
