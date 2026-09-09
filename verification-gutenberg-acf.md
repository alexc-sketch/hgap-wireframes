# Verification: Gutenberg and ACF Pro wireframe update

Desktop verification covered the Cover, Product List, Product Page and Homepage at 1440 by 1000. The global Build Map toggle renders in the kit toolbar, the Cover explains the Gutenberg system above the template cards, and each page ends with its own implementation map. The Product List visibly identifies the custom dynamic ACF Product Filter block, lists the taxonomy and typed ACF fields, and labels the server-rendered result region.

Mobile verification covered the Product List and Homepage at 375 by 812. The product filters remain behind the existing mobile drawer control, the Hitachi global header retains its mobile navigation pattern, and the Gutenberg implementation table uses horizontal overflow rather than compressing the columns. No layout regression was observed in the page content.

Automated checks completed: TypeScript clean, diff check clean, and zero em or en dashes in every edited file.

Interactive verification applied the Sullair brand facet. The result count changed from 150 to 74 models, the active filter chip appeared, the result cards remained Sullair products, and Clear All became available. This confirms the existing prototype interaction was preserved while the build architecture and labels changed.

GitHub Pages verification repeated the same Sullair filter test on the published revision. The live result count changed from 150 to 74, confirming that the deployed bundle includes both the new implementation mapping and the existing filter behaviour.

The published Cover displays the new Gutenberg and ACF Pro system summary before the template cards. The published Oil Free Category page identifies the shared ACF Product Filter block, the URL parameter contract and the Interactivity API update model, with no remaining reference to a separate faceting plugin.
