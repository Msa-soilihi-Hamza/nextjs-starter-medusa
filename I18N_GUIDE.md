# Guide d'Internationalisation (i18n)

Ce projet utilise **next-international** pour gérer les traductions en plusieurs langues.

## Langues supportées

- **Français (fr)** - Langue par défaut
- **English (en)**

## Structure des fichiers

```
src/
├── locales/
│   ├── fr.ts          # Traductions françaises
│   ├── en.ts          # Traductions anglaises
│   ├── client.ts      # Configuration client (hooks React)
│   └── server.ts      # Configuration serveur (Server Components)
└── lib/util/
    └── get-locale-from-country.ts  # Mapping pays → locale
```

## Comment utiliser les traductions

### Dans un Client Component

```typescript
"use client"

import { useI18n } from "@/locales/client"

export function MyComponent() {
  const t = useI18n()

  return <h1>{t("nav.home")}</h1>
}
```

### Dans un Server Component

```typescript
import { getI18n } from "@/locales/server"

export default async function MyPage() {
  const t = await getI18n()

  return <h1>{t("nav.home")}</h1>
}
```

### Ajouter de nouvelles traductions

1. Ouvrez `src/locales/fr.ts` et `src/locales/en.ts`
2. Ajoutez votre nouvelle clé de traduction dans les deux fichiers :

```typescript
// fr.ts
export default {
  "product.newKey": "Nouveau texte en français",
  // ... autres traductions
} as const

// en.ts
export default {
  "product.newKey": "New text in English",
  // ... autres traductions
} as const
```

3. Utilisez-la dans votre composant : `{t("product.newKey")}`

## Sélecteur de langue

Un sélecteur de langue (FR | EN) est disponible dans la barre de navigation en haut à droite.

Lorsque l'utilisateur change de langue :
- L'interface utilisateur se met à jour instantanément
- La préférence est sauvegardée dans un cookie
- Aucune erreur d'hydration ne se produit

## Mapping Pays → Locale

Le système détermine automatiquement la locale basée sur le code pays de la région Medusa :

- Pays francophones (fr, be, ch, ca) → Locale **fr**
- Pays anglophones (us, gb, au, etc.) → Locale **en**

Vous pouvez modifier ce mapping dans `src/lib/util/get-locale-from-country.ts`.

## Avantages de cette solution

✅ **Pas d'erreurs d'hydration** - Solution native React
✅ **Type-safe** - Autocomplétion et vérification des clés
✅ **Performance** - Lazy-loading des traductions
✅ **SEO-friendly** - Support des URL localisées
✅ **Professionnel** - Utilisé par de nombreux sites e-commerce

## Traduire les données du backend (produits, catégories)

Pour les données provenant de Medusa (titres de produits, descriptions, etc.), vous avez deux options :

### Option 1 : Utiliser les métadonnées Medusa
Stockez les traductions dans le champ `metadata` de vos produits dans Medusa Admin :

```json
{
  "title_fr": "T-shirt",
  "title_en": "T-shirt",
  "description_fr": "Un magnifique t-shirt",
  "description_en": "A beautiful t-shirt"
}
```

Puis créez une fonction utilitaire pour extraire la bonne traduction :

```typescript
function getTranslatedProduct(product, locale) {
  return {
    ...product,
    title: product.metadata[`title_${locale}`] || product.title,
    description: product.metadata[`description_${locale}`] || product.description
  }
}
```

### Option 2 : Table de traduction frontend
Créez un fichier de mapping dans votre code :

```typescript
// src/lib/i18n/product-translations.ts
export const productTranslations = {
  "product-id-123": {
    fr: { title: "T-shirt", description: "..." },
    en: { title: "T-shirt", description: "..." }
  }
}
```

## Support

Pour toute question sur l'i18n, consultez la documentation de next-international :
https://next-international.vercel.app/docs
