# Gutenberg and ACF Pro Build Map

This document translates the approved wireframes into a Gutenberg block-theme implementation. The layouts and user journeys remain unchanged. The change is architectural: each page is now expressed as a template, template part, block pattern, Query Loop or dynamic ACF Block.

## Shared system

| Wireframe element | Gutenberg implementation | Editor control |
| --- | --- | --- |
| Hitachi global header and mega menu | Locked header template part containing a custom interactive ACF Block | Editors manage menu groups, descriptions and links through repeaters. Markup, active states and responsive behaviour stay locked. |
| Newsletter and footer | Locked footer template part containing the global form block | One edit updates every template. |
| Brand tokens | `theme.json` settings and styles | Editors receive approved colours, type scales, widths and spacing only. |
| Final CTA | Synced pattern | Copy and links can be updated globally. |
| Forms | Block-native form plugin or retained Ninja Forms block | Product context and campaign fields are populated automatically. |

ACF Blocks are registered using `block.json` and rendered through PHP templates. ACF Pro supports Group, Repeater and Clone fields inside these blocks, and the same templates provide live editor previews. See the [ACF Blocks documentation](https://www.advancedcustomfields.com/resources/blocks/).

## Template map

| Wireframe | WordPress template | Dynamic regions |
| --- | --- | --- |
| Homepage | `front-page.html` | Hero ACF Block, taxonomy-driven product and brand blocks, Insights Query Loop |
| All Products | `archive-product.html` | Custom ACF Product Filter block, server-rendered card partial, pagination |
| Single Product | `single-product.html` | Gallery, summary, specifications and variants ACF Blocks; related product Query Loop |
| Brand | `taxonomy-product_brand.html` | ACF term fields, series query and Insights Query Loop |
| Category | `taxonomy-product_air_type.html` or the relevant product taxonomy template | ACF term fields, technology and series blocks, links into the product filter |
| Industry Archive | `page-industries.html` | Dynamic Industry term grid and featured Insight Query Loop |
| Industry | `taxonomy-industry.html` | ACF term fields, curated product series relationship and related Insight Query Loop |

## ACF Product Filter block

ACF Pro is the source of truth for the product attributes. It does not provide a complete front-end faceting interface by itself, so the archive uses one custom dynamic Gutenberg block to connect the controls to WordPress queries.

### Field model

| Filter | Storage | Query behaviour |
| --- | --- | --- |
| Configuration | Native `product_configuration` taxonomy, optionally assigned through an ACF Taxonomy field | `tax_query` with Stationary, Portable or OEM terms |
| Air Type | Native `product_air_type` taxonomy | `tax_query` with Oil Flooded or Oil Free terms |
| Brand | Native `product_brand` taxonomy | `tax_query` with Hitachi, Sullair, Champion, Bebicon or Air-One |
| Industry | Native `industry` taxonomy | `tax_query`, supporting the homepage and Industry templates as well as filtering |
| Drive | ACF Select field `drive_class` | `meta_query` equality or `IN` comparison |
| AirLinx | ACF True / False field `airlinx_enabled` | `meta_query` equality comparison against `1` |
| Maximum pressure | ACF Number field `max_pressure_bar` | Numeric range clauses in `meta_query` |
| Motor power | ACF Number field `motor_power_kw` | Numeric range clauses in `meta_query` |
| Free air delivery | ACF Number field `fad_cfm` | Numeric range clauses in `meta_query` |

Public browsing dimensions use native taxonomies because they also need landing pages, breadcrumbs and internal links. ACF Pro can provide the editor field used to assign those terms. Technical values remain typed ACF fields. Avoid storing filterable values inside Repeaters or serialised Checkbox fields because those are harder to query reliably.

### Request lifecycle

1. The block renders a standard GET form, result count, product cards and pagination in PHP.
2. Every active filter is represented in the URL, for example `/products/?brand=sullair&air_type=oil-free&power_min=30`.
3. The render callback sanitises each parameter and converts taxonomy values into `tax_query` clauses and technical values into `meta_query` clauses.
4. Number fields use `type => NUMERIC` and explicit range comparisons.
5. The WordPress Interactivity API submits the same state in the background, replaces the result region, updates browser history and announces the new result total.
6. Without JavaScript, the GET form performs a normal page request and returns the same result set.

ACF documents querying custom fields through `WP_Query`, `meta_query` and URL parameters in [How to Query Posts by Custom Fields](https://www.advancedcustomfields.com/resources/query-posts-custom-fields/). WordPress provides the front-end state and actions through the [Interactivity API](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/).

### Block ownership

The Product Filter block owns the filter controls, active-filter chips, result count, sorting, grid/list preference, result cards and pagination. Keeping these parts inside one server-rendered block prevents the initial PHP view and interactive updates from producing different markup.

The guided finder maps its answers to the same query parameters. It must not maintain a second filtering system. The Quick Quote modal receives the Product post ID, model, part number, page URL and campaign values from the selected result card.

## Product specification blocks

Shared model specifications remain in four ACF Group fields: `spec_performance`, `spec_drive`, `spec_physical` and `spec_controls`. The `variants` Repeater stores one SKU per row. The optional `additional_specs` Repeater handles attributes that do not apply to every model. This structure remains unchanged under Gutenberg and avoids the variable-column matrix that was difficult to maintain in ACF.

## Editor governance

Template structure, global template parts and dynamic query blocks should be locked. Editors can update fields, replace media, manage repeaters and use approved patterns. The product archive filter vocabulary must be treated as a shared data contract because the Homepage, Brand, Category and Industry templates all link into the same URL parameters.

## References

1. [ACF Blocks](https://www.advancedcustomfields.com/resources/blocks/)
2. [ACF: How to Query Posts by Custom Fields](https://www.advancedcustomfields.com/resources/query-posts-custom-fields/)
3. [WordPress Interactivity API Reference](https://developer.wordpress.org/block-editor/reference-guides/interactivity-api/)
