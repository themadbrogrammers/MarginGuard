// // src/utils/merchantNormalizer.js

// /*
//  * MarginGuard - Merchant Data Normalization Engine
//  *
//  * Converts different merchant CSV schemas into our
//  * internal canonical schema.
//  *
//  * This version is deterministic.
//  * AI-assisted mapping will be added later.
//  */

// // --------------------------------------------------
// // 1. CANONICAL SCHEMA
// // --------------------------------------------------

// export const CANONICAL_FIELDS = {

//   // ====================================================
//   // ORDER
//   // ====================================================

//   order_id: {
//     label: "Order ID",
//     required: true,
//     type: "string"
//   },

//   order_date: {
//     label: "Order Date",
//     required: true,
//     type: "date"
//   },

//   order_status: {
//     label: "Order Status",
//     required: true,
//     type: "string"
//   },

//   currency: {
//     label: "Currency",
//     required: false,
//     type: "string"
//   },


//   // ====================================================
//   // CUSTOMER
//   // ====================================================

//   customer_id: {
//     label: "Customer ID",
//     required: false,
//     type: "string"
//   },

//   customer_created_at: {
//     label: "Customer Created Date",
//     required: false,
//     type: "date"
//   },


//   // ====================================================
//   // PRODUCT / ITEM
//   // ====================================================

//   order_item_id: {
//     label: "Order Item ID",
//     required: false,
//     type: "string"
//   },

//   product_id: {
//     label: "Product ID",
//     required: false,
//     type: "string"
//   },

//   product_name: {
//     label: "Product Name",
//     required: false,
//     type: "string"
//   },

//   sku: {
//     label: "SKU",
//     required: false,
//     type: "string"
//   },

//   category: {
//     label: "Product Category",
//     required: false,
//     type: "string"
//   },

//   quantity: {
//     label: "Quantity",
//     required: true,
//     type: "number"
//   },


//   // ====================================================
//   // PRICING
//   // ====================================================

//   mrp: {
//     label: "MRP",
//     required: false,
//     type: "number"
//   },

//   unit_price: {
//     label: "Unit Price",
//     required: false,
//     type: "number"
//   },

//   selling_price: {
//     label: "Selling Price",
//     required: false,
//     type: "number"
//   },

//   subtotal: {
//     label: "Subtotal",
//     required: false,
//     type: "number"
//   },

//   discount: {
//     label: "Discount",
//     required: false,
//     type: "number"
//   },

//   tax_amount: {
//     label: "Tax Amount",
//     required: false,
//     type: "number"
//   },

//   shipping_charge: {
//     label: "Shipping Charge",
//     required: false,
//     type: "number"
//   },

//   total_amount: {
//     label: "Order Total",
//     required: false,
//     type: "number"
//   },

//   paid_amount: {
//     label: "Paid Amount",
//     required: false,
//     type: "number"
//   },


//   // ====================================================
//   // COST
//   // ====================================================

//   cost_price: {
//     label: "Product Cost",
//     required: false,
//     type: "number"
//   },

//   packaging_cost: {
//     label: "Packaging Cost",
//     required: false,
//     type: "number"
//   },


//   // ====================================================
//   // PAYMENT
//   // ====================================================

//   payment_id: {
//     label: "Payment ID",
//     required: false,
//     type: "string"
//   },

//   payment_method: {
//     label: "Payment Method",
//     required: false,
//     type: "string"
//   },

//   payment_status: {
//     label: "Payment Status",
//     required: false,
//     type: "string"
//   },

//   payment_amount: {
//     label: "Payment Amount",
//     required: false,
//     type: "number"
//   },

//   gateway_fee: {
//     label: "Gateway Fee",
//     required: false,
//     type: "number"
//   },

//   gateway_tax: {
//     label: "Gateway Tax",
//     required: false,
//     type: "number"
//   },


//   // ====================================================
//   // SHIPPING
//   // ====================================================

//   shipment_id: {
//     label: "Shipment ID",
//     required: false,
//     type: "string"
//   },

//   courier: {
//     label: "Courier",
//     required: false,
//     type: "string"
//   },

//   shipping_cost: {
//     label: "Forward Shipping Cost",
//     required: false,
//     type: "number"
//   },

//   return_shipping_cost: {
//     label: "Return Shipping Cost",
//     required: false,
//     type: "number"
//   },

//   delivery_attempts: {
//     label: "Delivery Attempts",
//     required: false,
//     type: "number"
//   },

//   delivery_status: {
//     label: "Delivery Status",
//     required: false,
//     type: "string"
//   },

//   dispatch_date: {
//     label: "Dispatch Date",
//     required: false,
//     type: "date"
//   },

//   delivery_date: {
//     label: "Delivery Date",
//     required: false,
//     type: "date"
//   },


//   // ====================================================
//   // RTO
//   // ====================================================

//   rto_status: {
//     label: "RTO Status",
//     required: false,
//     type: "string"
//   },

//   rto_cost: {
//     label: "RTO Cost",
//     required: false,
//     type: "number"
//   },


//   // ====================================================
//   // RETURNS
//   // ====================================================

//   return_id: {
//     label: "Return ID",
//     required: false,
//     type: "string"
//   },

//   return_status: {
//     label: "Return Status",
//     required: false,
//     type: "string"
//   },

//   return_reason: {
//     label: "Return Reason",
//     required: false,
//     type: "string"
//   },

//   return_date: {
//     label: "Return Date",
//     required: false,
//     type: "date"
//   },


//   // ====================================================
//   // REFUNDS
//   // ====================================================

//   refund_id: {
//     label: "Refund ID",
//     required: false,
//     type: "string"
//   },

//   refund_amount: {
//     label: "Refund Amount",
//     required: false,
//     type: "number"
//   },

//   refund_date: {
//     label: "Refund Date",
//     required: false,
//     type: "date"
//   },

//   inventory_loss: {
//     label: "Inventory Loss",
//     required: false,
//     type: "number"
//   },

//   restocking_cost: {
//     label: "Restocking Cost",
//     required: false,
//     type: "number"
//   },


//   // ====================================================
//   // COUPONS / PROMOTIONS
//   // ====================================================

//   coupon_code: {
//     label: "Coupon Code",
//     required: false,
//     type: "string"
//   },

//   discount_type: {
//     label: "Discount Type",
//     required: false,
//     type: "string"
//   },


//   // ====================================================
//   // LOCATION
//   // ====================================================

//   pincode: {
//     label: "Pincode",
//     required: false,
//     type: "string"
//   },

//   city: {
//     label: "City",
//     required: false,
//     type: "string"
//   },

//   state: {
//     label: "State",
//     required: false,
//     type: "string"
//   }
// };


// // --------------------------------------------------
// // 2. COLUMN ALIASES
// // --------------------------------------------------

// const FIELD_ALIASES = {

//   // ==================================================
//   // ORDER
//   // ==================================================

//   order_id: [
//     "order_id",
//     "orderid",
//     "order id",
//     "order_no",
//     "order no",
//     "order number",
//     "order_number",
//     "order reference",
//     "order reference id",
//     "transaction_id",
//     "transaction id",
//     "txn_id",
//     "txn id"
//   ],

//   order_date: [
//     "order_date",
//     "order date",
//     "orderdate",
//     "purchase_date",
//     "purchase date",
//     "created_at",
//     "created at",
//     "created_date",
//     "created date"
//   ],

//   order_status: [
//     "order_status",
//     "order status",
//     "orderstate",
//     "order state",
//     "fulfillment_status",
//     "fulfillment status",
//     "status"
//   ],

//   currency: [
//     "currency",
//     "currency code",
//     "currency_code"
//   ],


//   // ==================================================
//   // CUSTOMER
//   // ==================================================

//   customer_id: [
//     "customer_id",
//     "customerid",
//     "customer id",
//     "customer_no",
//     "customer number",
//     "user_id",
//     "user id",
//     "buyer_id",
//     "buyer id"
//   ],

//   customer_created_at: [
//     "customer_created_at",
//     "customer created at",
//     "customer_created_date",
//     "customer created date"
//   ],


//   // ==================================================
//   // PRODUCT
//   // ==================================================

//   order_item_id: [
//     "order_item_id",
//     "order item id",
//     "orderitemid",
//     "line_item_id",
//     "line item id"
//   ],

//   product_id: [
//     "product_id",
//     "productid",
//     "product id",
//     "item_id",
//     "item id",
//     "item_code",
//     "item code",
//     "sku_id",
//     "sku id"
//   ],

//   product_name: [
//     "product_name",
//     "product name",
//     "product title",
//     "item_name",
//     "item name",
//     "item title"
//   ],

//   sku: [
//     "sku",
//     "sku code",
//     "stock keeping unit",
//     "stock_keeping_unit"
//   ],

//   category: [
//     "category",
//     "product category",
//     "product_category",
//     "item category",
//     "item_category"
//   ],

//   quantity: [
//     "quantity",
//     "qty",
//     "units",
//     "unit count",
//     "item quantity",
//     "item_quantity",
//     "number of units",
//     "number_of_items",
//     "number of items"
//   ],


//   // ==================================================
//   // PRICING
//   // ==================================================

//   mrp: [
//     "mrp",
//     "maximum retail price",
//     "list price",
//     "list_price"
//   ],

//   unit_price: [
//     "unit price",
//     "unit_price",
//     "price per unit",
//     "item price",
//     "item_price"
//   ],

//   selling_price: [
//     "selling_price",
//     "selling price",
//     "sale_price",
//     "sale price",
//     "selling_amount",
//     "selling amount",
//     "net selling price"
//   ],

//   subtotal: [
//     "subtotal",
//     "sub total",
//     "order subtotal",
//     "order_subtotal"
//   ],

//   discount: [
//     "discount",
//     "discount_amount",
//     "discount amount",
//     "discount_amt",
//     "discount amt",
//     "disc",
//     "disc_amt",
//     "disc amount",
//     "offer",
//     "offer_amount"
//   ],

//   tax_amount: [
//     "tax",
//     "tax amount",
//     "tax_amount",
//     "gst",
//     "gst amount",
//     "gst_amount"
//   ],

//   shipping_charge: [
//     "shipping charge",
//     "shipping_charge",
//     "delivery charge",
//     "delivery_charge",
//     "shipping fee charged"
//   ],

//   total_amount: [
//     "order total",
//     "order_total",
//     "total order value",
//     "total_order_value",
//     "invoice total",
//     "invoice_total"
//   ],

//   paid_amount: [
//     "paid amount",
//     "paid_amount",
//     "amount paid",
//     "amount_paid",
//     "customer paid",
//     "customer_paid"
//   ],


//   // ==================================================
//   // COST
//   // ==================================================

//   cost_price: [
//     "cost price",
//     "cost_price",
//     "product cost",
//     "product_cost",
//     "cogs",
//     "cog",
//     "cost of goods sold",
//     "cost_of_goods_sold",
//     "purchase cost",
//     "purchase_cost"
//   ],

//   packaging_cost: [
//     "packaging cost",
//     "packaging_cost",
//     "packing cost",
//     "packing_cost"
//   ],


//   // ==================================================
//   // PAYMENT
//   // ==================================================

//   payment_id: [
//     "payment id",
//     "payment_id",
//     "payment reference",
//     "payment_reference"
//   ],

//   payment_method: [
//     "payment method",
//     "payment_method",
//     "payment mode",
//     "payment_mode",
//     "pay mode",
//     "pay_mode",
//     "pay type",
//     "pay_type"
//   ],

//   payment_status: [
//     "payment status",
//     "payment_status",
//     "payment state",
//     "payment_state",
//     "transaction status",
//     "transaction_status",
//     "txn status",
//     "txn_status"
//   ],

//   payment_amount: [
//     "payment amount",
//     "payment_amount",
//     "transaction amount",
//     "transaction_amount"
//   ],

//   gateway_fee: [
//     "gateway fee",
//     "gateway_fee",
//     "payment fee",
//     "payment_fee",
//     "processing fee",
//     "processing_fee",
//     "pg fee",
//     "pg_fee"
//   ],

//   gateway_tax: [
//     "gateway tax",
//     "gateway_tax",
//     "payment fee tax",
//     "processing fee tax"
//   ],


//   // ==================================================
//   // SHIPPING / LOGISTICS
//   // ==================================================

//   shipment_id: [
//     "shipment id",
//     "shipment_id",
//     "awb",
//     "awb number",
//     "awb_number",
//     "tracking number",
//     "tracking_number"
//   ],

//   courier: [
//     "courier",
//     "courier partner",
//     "courier_partner",
//     "logistics partner",
//     "logistics_partner",
//     "carrier"
//   ],

//   shipping_cost: [
//     "shipping cost",
//     "shipping_cost",
//     "forward shipping",
//     "forward_shipping",
//     "delivery cost",
//     "delivery_cost",
//     "freight cost",
//     "freight_cost"
//   ],

//   return_shipping_cost: [
//     "return shipping",
//     "return_shipping",
//     "return shipping cost",
//     "return_shipping_cost",
//     "reverse shipping",
//     "reverse_shipping",
//     "reverse freight",
//     "reverse_freight"
//   ],

//   delivery_attempts: [
//     "delivery attempts",
//     "delivery_attempts",
//     "attempts",
//     "delivery tries"
//   ],

//   delivery_status: [
//     "delivery status",
//     "delivery_status",
//     "shipment status",
//     "shipment_status",
//     "shipping status",
//     "shipping_status"
//   ],

//   dispatch_date: [
//     "dispatch date",
//     "dispatch_date",
//     "shipped date",
//     "shipped_date",
//     "shipping date",
//     "shipping_date"
//   ],

//   delivery_date: [
//     "delivery date",
//     "delivery_date",
//     "delivered date",
//     "delivered_date"
//   ],


//   // ==================================================
//   // RTO
//   // ==================================================

//   rto_status: [
//     "rto",
//     "rto flag",
//     "rto_flag",
//     "rto status",
//     "rto_status",
//     "return to origin",
//     "return_to_origin",
//     "returned to origin",
//     "returned_to_origin"
//   ],

//   rto_cost: [
//     "rto cost",
//     "rto_cost",
//     "rto charge",
//     "rto_charge"
//   ],


//   // ==================================================
//   // RETURNS
//   // ==================================================

//   return_id: [
//     "return id",
//     "return_id",
//     "return reference",
//     "return_reference"
//   ],

//   return_status: [
//     "return status",
//     "return_status"
//   ],

//   return_reason: [
//     "return reason",
//     "return_reason",
//     "reason for return",
//     "reason_for_return"
//   ],

//   return_date: [
//     "return date",
//     "return_date",
//     "returned date",
//     "returned_date"
//   ],


//   // ==================================================
//   // REFUNDS
//   // ==================================================

//   refund_id: [
//     "refund id",
//     "refund_id",
//     "refund reference",
//     "refund_reference"
//   ],

//   refund_amount: [
//     "refund amount",
//     "refund_amount",
//     "refunded amount",
//     "refunded_amount"
//   ],

//   refund_date: [
//     "refund date",
//     "refund_date",
//     "refunded date",
//     "refunded_date"
//   ],

//   inventory_loss: [
//     "inventory loss",
//     "inventory_loss",
//     "stock loss",
//     "stock_loss",
//     "damaged inventory value",
//     "damaged_inventory_value"
//   ],

//   restocking_cost: [
//     "restocking cost",
//     "restocking_cost",
//     "restock cost",
//     "restock_cost"
//   ],


//   // ==================================================
//   // COUPONS
//   // ==================================================

//   coupon_code: [
//     "coupon",
//     "coupon code",
//     "coupon_code",
//     "promo code",
//     "promo_code",
//     "promotion code",
//     "promotion_code",
//     "voucher code",
//     "voucher_code"
//   ],

//   discount_type: [
//     "discount type",
//     "discount_type",
//     "promotion type",
//     "promotion_type"
//   ],


//   // ==================================================
//   // LOCATION
//   // ==================================================

//   pincode: [
//     "pincode",
//     "pin",
//     "pin code",
//     "pin_code",
//     "postal code",
//     "postal_code",
//     "zipcode",
//     "zip code",
//     "zip"
//   ],

//   city: [
//     "city",
//     "delivery city",
//     "delivery_city",
//     "shipping city",
//     "shipping_city"
//   ],

//   state: [
//     "state",
//     "delivery state",
//     "delivery_state",
//     "shipping state",
//     "shipping_state"
//   ]
// };


// // --------------------------------------------------
// // 3. HELPERS
// // --------------------------------------------------

// function cleanName(value) {
//   return String(value ?? "")
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9]/g, "");
// }


// function cleanValue(value) {
//   return String(value ?? "").trim();
// }


// function isEmpty(value) {
//   return value === null ||
//     value === undefined ||
//     String(value).trim() === "";
// }


// // --------------------------------------------------
// // 4. FIND EXACT ALIAS MATCH
// // --------------------------------------------------

// function findAliasMatch(columnName) {
//   const cleanedColumn = cleanName(columnName);

//   for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
//     for (const alias of aliases) {
//       if (cleanName(alias) === cleanedColumn) {
//         return {
//           field,
//           confidence: 0.99,
//           method: "alias",
//         };
//       }
//     }
//   }

//   return null;
// }


// // --------------------------------------------------
// // 5. SIMPLE FUZZY MATCH
// // --------------------------------------------------

// function similarity(a, b) {
//   const first = cleanName(a);
//   const second = cleanName(b);

//   if (!first || !second) return 0;

//   if (first === second) return 1;

//   if (first.includes(second) || second.includes(first)) {
//     return 0.85;
//   }

//   // Small Levenshtein implementation
//   const matrix = Array.from(
//     { length: first.length + 1 },
//     () => Array(second.length + 1).fill(0)
//   );

//   for (let i = 0; i <= first.length; i++) {
//     matrix[i][0] = i;
//   }

//   for (let j = 0; j <= second.length; j++) {
//     matrix[0][j] = j;
//   }

//   for (let i = 1; i <= first.length; i++) {
//     for (let j = 1; j <= second.length; j++) {
//       const cost = first[i - 1] === second[j - 1] ? 0 : 1;

//       matrix[i][j] = Math.min(
//         matrix[i - 1][j] + 1,
//         matrix[i][j - 1] + 1,
//         matrix[i - 1][j - 1] + cost
//       );
//     }
//   }

//   const distance = matrix[first.length][second.length];
//   const maxLength = Math.max(first.length, second.length);

//   return Math.max(0, 1 - distance / maxLength);
// }


// // --------------------------------------------------
// // 6. PROFILE A COLUMN
// // --------------------------------------------------

// export function profileColumn(rows, column) {
//   const values = rows
//     .map(row => row[column])
//     .filter(value => !isEmpty(value));

//   const numericValues = values.filter(value => {
//     const cleaned = String(value)
//       .replace(/[₹,$\s]/g, "");

//     return cleaned !== "" && !Number.isNaN(Number(cleaned));
//   });

//   const dateValues = values.filter(value => {
//     const parsed = Date.parse(value);
//     return !Number.isNaN(parsed);
//   });

//   const uniqueValues = new Set(values.map(value => String(value))).size;

//   return {
//     column,
//     totalValues: rows.length,
//     nonEmptyValues: values.length,
//     emptyValues: rows.length - values.length,
//     nullPercentage:
//       rows.length === 0
//         ? 0
//         : Number(
//             (((rows.length - values.length) / rows.length) * 100).toFixed(2)
//           ),

//     numericPercentage:
//       values.length === 0
//         ? 0
//         : Number(((numericValues.length / values.length) * 100).toFixed(2)),

//     datePercentage:
//       values.length === 0
//         ? 0
//         : Number(((dateValues.length / values.length) * 100).toFixed(2)),

//     uniqueValues,

//     sampleValues: values.slice(0, 5),
//   };
// }


// // --------------------------------------------------
// // 7. CHECK VALUE COMPATIBILITY
// // --------------------------------------------------

// function getTypeCompatibility(values, expectedType) {

//   if (!Array.isArray(values) || values.length === 0) {
//     return 0.5;
//   }

//   const validValues = values.filter(
//     value =>
//       value !== null &&
//       value !== undefined &&
//       String(value).trim() !== ""
//   );

//   if (validValues.length === 0) {
//     return 0.5;
//   }


//   // ================================================
//   // NUMBER
//   // ================================================

//   if (expectedType === "number") {

//     const validNumbers =
//       validValues.filter(value => {

//         const cleaned =
//           String(value)
//             .replace(/[₹$€£,\s]/g, "")
//             .trim();

//         const number =
//           Number(cleaned);

//         return Number.isFinite(number);
//       });

//     return (
//       validNumbers.length /
//       validValues.length
//     );
//   }


//   // ================================================
//   // DATE
//   // ================================================

//   if (expectedType === "date") {

//     const validDates =
//       validValues.filter(value => {

//         const date =
//           new Date(value);

//         return !Number.isNaN(
//           date.getTime()
//         );
//       });

//     return (
//       validDates.length /
//       validValues.length
//     );
//   }


//   // ================================================
//   // STRING
//   // ================================================

//   if (expectedType === "string") {
//     return 1;
//   }


//   return 0.5;
// }


// // --------------------------------------------------
// // 8. MAP MERCHANT COLUMNS
// // --------------------------------------------------

// function detectMappings(rows) {

//   if (!Array.isArray(rows) || rows.length === 0) {
//     return [];
//   }

//   const columns = Object.keys(rows[0]);

//   return columns.map(sourceColumn => {

//     const cleanedSource =
//       cleanName(sourceColumn);

//     const values =
//       rows
//         .map(row => row[sourceColumn])
//         .filter(value => !isEmpty(value))
//         .slice(0, 50);


//     // ==================================================
//     // 1. EXACT ALIAS MATCH
//     // ==================================================

//     for (
//       const [canonicalField, aliases]
//       of Object.entries(FIELD_ALIASES)
//     ) {

//       const exactAlias =
//         aliases.some(
//           alias =>
//             cleanName(alias) ===
//             cleanedSource
//         );

//       if (exactAlias) {

//         const config =
//           CANONICAL_FIELDS[canonicalField];

//         const typeScore =
//           getTypeCompatibility(
//             values,
//             config.type
//           );

//         const confidence =
//           0.85 +
//           typeScore * 0.15;

//         return {

//           source: sourceColumn,

//           target: canonicalField,

//           confidence: Number(
//             confidence.toFixed(2)
//           ),

//           method: "exact_alias",

//           needsReview: false,

//           candidates: [
//             {
//               field: canonicalField,

//               label: config.label,

//               confidence: Number(
//                 confidence.toFixed(2)
//               )
//             }
//           ]
//         };
//       }
//     }


//     // ==================================================
//     // 2. FUZZY / SEMANTIC CANDIDATES
//     // ==================================================

//     const candidates = [];

//     for (
//       const [
//         canonicalField,
//         aliases
//       ]
//       of Object.entries(
//         FIELD_ALIASES
//       )
//     ) {

//       const config =
//         CANONICAL_FIELDS[
//           canonicalField
//         ];

//       let bestNameScore = 0;

//       for (
//         const alias of aliases
//       ) {

//         const score =
//           similarity(
//             cleanedSource,
//             cleanName(alias)
//           );

//         bestNameScore =
//           Math.max(
//             bestNameScore,
//             score
//           );
//       }


//       const typeScore =
//         getTypeCompatibility(
//           values,
//           config.type
//         );


//       const finalScore =
//         bestNameScore * 0.70 +
//         typeScore * 0.30;


//       candidates.push({

//         field:
//           canonicalField,

//         label:
//           config.label,

//         confidence:
//           finalScore,

//         nameScore:
//           bestNameScore,

//         typeScore
//       });
//     }


//     candidates.sort(
//       (a, b) =>
//         b.confidence -
//         a.confidence
//     );


//     const best =
//       candidates[0];

//     const second =
//       candidates[1];


//     // ==================================================
//     // 3. NO RELIABLE MATCH
//     // ==================================================

//     if (
//       !best ||
//       best.confidence < 0.55
//     ) {

//       return {

//         source:
//           sourceColumn,

//         target:
//           null,

//         confidence:
//           0,

//         method:
//           "unmapped",

//         needsReview:
//           true,

//         candidates:
//           candidates
//             .slice(0, 3)
//             .map(candidate => ({
//               field:
//                 candidate.field,

//               label:
//                 candidate.label,

//               confidence:
//                 Number(
//                   candidate.confidence
//                     .toFixed(2)
//                 )
//             }))
//       };
//     }


//     // ==================================================
//     // 4. AMBIGUOUS COLUMN
//     // ==================================================

//     /*
//      * These names are dangerous because their meaning
//      * depends on the merchant's data model.
//      *
//      * Example:
//      *
//      * TxnValue
//      * Amount
//      * Total
//      * Value
//      * Price
//      *
//      * We should NOT silently convert them into
//      * selling_price.
//      */

//     const ambiguousWords = [
//       "amount",
//       "value",
//       "total",
//       "price",
//       "cost",
//       "net",
//       "gross",
//       "charge"
//     ];


//     const isAmbiguous =
//       ambiguousWords.some(
//         word =>
//           cleanedSource ===
//             cleanName(word) ||
//           cleanedSource.includes(
//             cleanName(word)
//           )
//       );


//     if (isAmbiguous) {

//       return {

//         source:
//           sourceColumn,

//         target:
//           null,

//         confidence:
//           Number(
//             best.confidence.toFixed(2)
//           ),

//         method:
//           "ambiguous",

//         needsReview:
//           true,

//         candidates:
//           candidates
//             .slice(0, 3)
//             .map(candidate => ({
//               field:
//                 candidate.field,

//               label:
//                 candidate.label,

//               confidence:
//                 Number(
//                   candidate.confidence
//                     .toFixed(2)
//                 )
//             }))
//       };
//     }


//     // ==================================================
//     // 5. STRONG FUZZY MATCH
//     // ==================================================

//     const scoreGap =
//       best.confidence -
//       (second?.confidence || 0);


//     if (
//       best.confidence >= 0.78 &&
//       scoreGap >= 0.08
//     ) {

//       return {

//         source:
//           sourceColumn,

//         target:
//           best.field,

//         confidence:
//           Number(
//             best.confidence.toFixed(2)
//           ),

//         method:
//           "fuzzy",

//         needsReview:
//           false,

//         candidates:
//           candidates
//             .slice(0, 3)
//             .map(candidate => ({
//               field:
//                 candidate.field,

//               label:
//                 candidate.label,

//               confidence:
//                 Number(
//                   candidate.confidence
//                     .toFixed(2)
//                 )
//             }))
//       };
//     }


//     // ==================================================
//     // 6. POSSIBLE MATCH — NEEDS REVIEW
//     // ==================================================

//     return {

//       source:
//         sourceColumn,

//       target:
//         null,

//       confidence:
//         Number(
//           best.confidence.toFixed(2)
//         ),

//       method:
//         "needs_review",

//       needsReview:
//         true,

//       candidates:
//         candidates
//           .slice(0, 3)
//           .map(candidate => ({
//             field:
//               candidate.field,

//             label:
//               candidate.label,

//             confidence:
//               Number(
//                 candidate.confidence
//                   .toFixed(2)
//               )
//           }))
//     };
//   });
// }


// // --------------------------------------------------
// // 9. DETECT MISSING REQUIRED FIELDS
// // --------------------------------------------------

// export function detectMissingFields(mappings) {
//   const mappedFields = new Set(
//     mappings
//       .filter(mapping => mapping.target)
//       .map(mapping => mapping.target)
//   );

//   return Object.entries(CANONICAL_FIELDS)
//     .filter(([field, config]) => {
//       return config.required && !mappedFields.has(field);
//     })
//     .map(([field, config]) => ({
//       field,
//       label: config.label,
//       required: config.required,
//     }));
// }


// // --------------------------------------------------
// // 10. NORMALIZE PAYMENT METHOD
// // --------------------------------------------------

// function normalizePaymentMethod(value) {
//   if (isEmpty(value)) return null;

//   const normalized = cleanValue(value)
//     .toLowerCase()
//     .replace(/[_-]/g, " ");

//   if (
//     ["cod", "cash on delivery", "cash delivery"].includes(normalized)
//   ) {
//     return "COD";
//   }

//   if (
//     ["upi", "upi payment"].includes(normalized)
//   ) {
//     return "UPI";
//   }

//   if (
//     [
//       "card",
//       "credit card",
//       "debit card",
//       "credit",
//       "debit",
//     ].includes(normalized)
//   ) {
//     return "CARD";
//   }

//   if (
//     ["net banking", "netbanking", "internet banking"].includes(normalized)
//   ) {
//     return "NETBANKING";
//   }

//   if (
//     ["wallet", "digital wallet"].includes(normalized)
//   ) {
//     return "WALLET";
//   }

//   return cleanValue(value).toUpperCase();
// }


// // --------------------------------------------------
// // 11. NORMALIZE RTO STATUS
// // --------------------------------------------------

// function normalizeRTO(value) {
//   if (isEmpty(value)) return null;

//   const normalized = cleanValue(value).toLowerCase();

//   if (
//     [
//       "1",
//       "true",
//       "yes",
//       "y",
//       "rto",
//       "returned",
//       "return to origin",
//       "return_to_origin",
//     ].includes(normalized)
//   ) {
//     return "RTO";
//   }

//   if (
//     [
//       "0",
//       "false",
//       "no",
//       "n",
//       "delivered",
//       "not rto",
//     ].includes(normalized)
//   ) {
//     return "NOT_RTO";
//   }

//   return "UNKNOWN";
// }


// // --------------------------------------------------
// // 12. NORMALIZE NUMBER
// // --------------------------------------------------

// function normalizeNumber(value) {
//   if (isEmpty(value)) return null;

//   const cleaned = String(value)
//     .replace(/[₹,$\s]/g, "")
//     .replace(/,/g, "");

//   const number = Number(cleaned);

//   return Number.isFinite(number) ? number : null;
// }


// // --------------------------------------------------
// // 13. NORMALIZE DATE
// // --------------------------------------------------

// function normalizeDate(value) {
//   if (isEmpty(value)) return null;

//   const date = new Date(value);

//   if (Number.isNaN(date.getTime())) {
//     return null;
//   }

//   return date.toISOString().split("T")[0];
// }


// // --------------------------------------------------
// // 14. NORMALIZE A SINGLE ROW
// // --------------------------------------------------

// export function normalizeRow(row, mappings) {
//   const normalized = {};

//   mappings.forEach(mapping => {
//     if (!mapping.target) return;

//     const value = row[mapping.source];

//     switch (mapping.target) {
//       case "quantity":
//       case "selling_price":
//       case "discount":
//         normalized[mapping.target] = normalizeNumber(value);
//         break;

//       case "order_date":
//         normalized[mapping.target] = normalizeDate(value);
//         break;

//       case "payment_method":
//         normalized[mapping.target] =
//           normalizePaymentMethod(value);
//         break;

//       case "rto_status":
//         normalized[mapping.target] =
//           normalizeRTO(value);
//         break;

//       default:
//         normalized[mapping.target] =
//           isEmpty(value) ? null : cleanValue(value);
//     }
//   });

//   return normalized;
// }


// // --------------------------------------------------
// // 15. NORMALIZE COMPLETE DATASET
// // --------------------------------------------------

// function normalizeDataset(rows, mappings) {

//   return rows.map(row => {

//     const normalized = {};

//     mappings.forEach(mapping => {

//       // Don't normalize fields that need review
//       if (
//         !mapping.target ||
//         mapping.needsReview
//       ) {
//         return;
//       }

//       const field =
//         mapping.target;

//       const config =
//         CANONICAL_FIELDS[field];

//       const rawValue =
//         row[mapping.source];


//       // ----------------------------------------------
//       // Missing value
//       // ----------------------------------------------

//       if (
//         rawValue === null ||
//         rawValue === undefined ||
//         String(rawValue).trim() === ""
//       ) {

//         normalized[field] = null;

//         return;
//       }


//       // ----------------------------------------------
//       // NUMBER
//       // ----------------------------------------------

//       if (
//         config.type === "number"
//       ) {

//         /*
//          * Handles:
//          *
//          * 1
//          * "1"
//          * "1,299"
//          * "₹1,299"
//          * "$1299"
//          */

//         const cleaned =
//           String(rawValue)
//             .replace(/₹/g, "")
//             .replace(/\$/g, "")
//             .replace(/€/g, "")
//             .replace(/£/g, "")
//             .replace(/,/g, "")
//             .trim();


//         const number =
//           Number(cleaned);


//         normalized[field] =
//           Number.isFinite(number)
//             ? number
//             : null;

//         return;
//       }


//       // ----------------------------------------------
//       // DATE
//       // ----------------------------------------------

//       if (
//         config.type === "date"
//       ) {

//         const parsed =
//           new Date(rawValue);


//         if (
//           Number.isNaN(
//             parsed.getTime()
//           )
//         ) {

//           normalized[field] = null;

//         } else {

//           normalized[field] =
//             parsed
//               .toISOString()
//               .split("T")[0];
//         }

//         return;
//       }


//       // ----------------------------------------------
//       // STRING
//       // ----------------------------------------------

//       normalized[field] =
//         String(rawValue).trim();
//     });


//     /*
//      * Compatibility with existing
//      * MarginGuard calculation code.
//      *
//      * Canonical field:
//      * discount
//      *
//      * Existing calculation code:
//      * row.discount
//      */

//     if (
//       normalized.discount !==
//       undefined
//     ) {

//       normalized.discount =
//         Number(normalized.discount) || 0;
//     }


//     return normalized;
//   });
// }


// // --------------------------------------------------
// // 16. VALIDATE NORMALIZED DATA
// // --------------------------------------------------

// export function validateDataset(rows) {
//   const issues = [];

//   rows.forEach((row, index) => {
//     const rowNumber = index + 2;

//     // Required fields
//     for (const [field, config] of Object.entries(CANONICAL_FIELDS)) {
//       if (
//         config.required &&
//         isEmpty(row[field])
//       ) {
//         issues.push({
//           row: rowNumber,
//           field,
//           severity: "error",
//           message: `${config.label} is missing`,
//         });
//       }
//     }

//     // Quantity validation
//     if (
//       row.quantity !== null &&
//       row.quantity !== undefined &&
//       (!Number.isFinite(row.quantity) || row.quantity <= 0)
//     ) {
//       issues.push({
//         row: rowNumber,
//         field: "quantity",
//         severity: "error",
//         message: "Quantity must be greater than 0",
//       });
//     }

//     // Price validation
//     if (
//       row.selling_price !== null &&
//       row.selling_price !== undefined &&
//       row.selling_price < 0
//     ) {
//       issues.push({
//         row: rowNumber,
//         field: "selling_price",
//         severity: "error",
//         message: "Selling price cannot be negative",
//       });
//     }

//     // Discount validation
//     if (
//       row.discount !== null &&
//       row.discount !== undefined &&
//       row.discount < 0
//     ) {
//       issues.push({
//         row: rowNumber,
//         field: "discount",
//         severity: "error",
//         message: "Discount cannot be negative",
//       });
//     }

//     // Discount > selling price
//     if (
//       row.discount !== null &&
//       row.selling_price !== null &&
//       row.discount > row.selling_price
//     ) {
//       issues.push({
//         row: rowNumber,
//         field: "discount",
//         severity: "warning",
//         message: "Discount is greater than selling price",
//       });
//     }

//     // Pincode validation
//     if (
//       row.pincode &&
//       !/^\d{6}$/.test(String(row.pincode))
//     ) {
//       issues.push({
//         row: rowNumber,
//         field: "pincode",
//         severity: "warning",
//         message: "Pincode should contain 6 digits",
//       });
//     }
//   });

//   return issues;
// }


// function safeNumber(value, fallback = 0) {

//   const number =
//     Number(value);

//   return Number.isFinite(number)
//     ? number
//     : fallback;
// }

// // --------------------------------------------------
// // 17. DATA QUALITY SCORE
// // --------------------------------------------------

// export function calculateDataQuality(
//   rows,
//   mappings,
//   validationIssues
// ) {
//   if (!Array.isArray(rows) || rows.length === 0) {
//     return {
//       score: 0,
//       completeness: 0,
//       validity: 0,
//       mappingConfidence: 0,
//     };
//   }

//   // ==================================================
//   // 1. MAPPING CONFIDENCE
//   // ==================================================

//   const mapped = mappings.filter(
//     mapping =>
//       mapping &&
//       mapping.target &&
//       Number.isFinite(
//         Number(mapping.confidence)
//       )
//   );

//   const mappingConfidence =
//     mapped.length === 0
//       ? 0
//       : mapped.reduce(
//           (sum, mapping) =>
//             sum +
//             Number(mapping.confidence),
//           0
//         ) / mapped.length;


//   // ==================================================
//   // 2. COMPLETENESS
//   // ==================================================

//   let totalRequiredValues = 0;
//   let presentRequiredValues = 0;

//   for (const row of rows) {

//     for (
//       const [
//         field,
//         config
//       ] of Object.entries(
//         CANONICAL_FIELDS
//       )
//     ) {

//       if (!config.required) {
//         continue;
//       }

//       totalRequiredValues++;

//       if (
//         row &&
//         !isEmpty(row[field])
//       ) {
//         presentRequiredValues++;
//       }
//     }
//   }

//   const completeness =
//     totalRequiredValues === 0
//       ? 1
//       : presentRequiredValues /
//         totalRequiredValues;


//   // ==================================================
//   // 3. VALIDITY
//   // ==================================================

//   const safeIssues =
//     Array.isArray(validationIssues)
//       ? validationIssues
//       : [];

//   const errorCount =
//     safeIssues.filter(
//       issue =>
//         issue &&
//         issue.severity === "error"
//     ).length;


//   const requiredFieldCount =
//     Object.values(
//       CANONICAL_FIELDS
//     ).filter(
//       config =>
//         config.required
//     ).length;


//   const totalPossibleChecks =
//     rows.length *
//     requiredFieldCount;


//   const validity =
//     totalPossibleChecks === 0
//       ? 1
//       : Math.max(
//           0,
//           1 -
//             errorCount /
//               totalPossibleChecks
//         );


//   // ==================================================
//   // 4. PROTECT AGAINST NaN
//   // ==================================================

//   const safeMappingConfidence =
//     Number.isFinite(
//       mappingConfidence
//     )
//       ? mappingConfidence
//       : 0;


//   const safeCompleteness =
//     Number.isFinite(
//       completeness
//     )
//       ? completeness
//       : 0;


//   const safeValidity =
//     Number.isFinite(
//       validity
//     )
//       ? validity
//       : 0;


//   // ==================================================
//   // 5. OVERALL SCORE
//   // ==================================================

//   const score =
//     safeMappingConfidence * 0.3 +
//     safeCompleteness * 0.4 +
//     safeValidity * 0.3;


//   return {
//     score: Number(
//       (score * 100).toFixed(1)
//     ),

//     completeness: Number(
//       (safeCompleteness * 100).toFixed(1)
//     ),

//     validity: Number(
//       (safeValidity * 100).toFixed(1)
//     ),

//     mappingConfidence: Number(
//       (safeMappingConfidence * 100).toFixed(1)
//     ),
//   };
// }


// // ======================================================
// // FINANCIAL DATA READINESS
// // ======================================================

// export function getFinancialDataReadiness(normalizedRows) {

//   const rows =
//     Array.isArray(normalizedRows)
//       ? normalizedRows
//       : [];

//   const hasField = (field) => {

//     return rows.some(row =>
//       row &&
//       !isEmpty(row[field])
//     );
//   };


//   const hasAnyField = (fields) => {

//     return fields.some(field =>
//       hasField(field)
//     );
//   };


//   const analyses = {

//     // ----------------------------------------------
//     // RTO RATE
//     // ----------------------------------------------

//     rtoRate: {

//       label: "RTO Rate",

//       available:
//         hasField("rto_status") ||
//         hasField("order_status"),

//       requiredFields: [
//         "rto_status"
//       ],

//       missingFields:
//         hasField("rto_status")
//           ? []
//           : ["rto_status"],

//       reason:
//         hasField("rto_status")
//           ? "RTO status is available."
//           : "No dedicated RTO field was provided."
//     },


//     // ----------------------------------------------
//     // DISCOUNT IMPACT
//     // ----------------------------------------------

//     discountImpact: {

//       label: "Discount Impact",

//       available:
//         hasField("discount"),

//       requiredFields: [
//         "discount"
//       ],

//       missingFields:
//         hasField("discount")
//           ? []
//           : ["discount"],

//       reason:
//         hasField("discount")
//           ? "Discount data is available."
//           : "Discount data is not available."
//     },


//     // ----------------------------------------------
//     // PRODUCT MARGIN
//     // ----------------------------------------------

//     productMargin: {

//       label: "Product Margin",

//       available:
//         hasField("selling_price") &&
//         hasField("cost_price"),

//       requiredFields: [
//         "selling_price",
//         "cost_price"
//       ],

//       missingFields: [
//         ...(
//           hasField("selling_price")
//             ? []
//             : ["selling_price"]
//         ),

//         ...(
//           hasField("cost_price")
//             ? []
//             : ["cost_price"]
//         )
//       ],

//       reason:
//         hasField("selling_price") &&
//         hasField("cost_price")
//           ? "Selling price and product cost are available."
//           : "Product margin cannot be calculated safely without selling price and product cost."
//     },


//     // ----------------------------------------------
//     // RTO FINANCIAL IMPACT
//     // ----------------------------------------------

//     rtoFinancialImpact: {

//       label: "RTO Financial Impact",

//       available:
//         (
//           hasField("rto_status") ||
//           hasField("order_status")
//         ) &&
//         hasAnyField([
//           "rto_cost",
//           "return_shipping_cost",
//           "shipping_cost"
//         ]),

//       requiredFields: [
//         "rto_status",
//         "rto_cost / return_shipping_cost / shipping_cost"
//       ],

//       missingFields: [

//         ...(
//           hasField("rto_status") ||
//           hasField("order_status")
//             ? []
//             : ["rto_status"]
//         ),

//         ...(
//           hasAnyField([
//             "rto_cost",
//             "return_shipping_cost",
//             "shipping_cost"
//           ])
//             ? []
//             : [
//                 "rto_cost",
//                 "return_shipping_cost",
//                 "shipping_cost"
//               ]
//         )
//       ],

//       reason:
//         (
//           hasField("rto_status") ||
//           hasField("order_status")
//         ) &&
//         hasAnyField([
//           "rto_cost",
//           "return_shipping_cost",
//           "shipping_cost"
//         ])
//           ? "RTO status and at least one logistics cost are available."
//           : "RTO financial impact requires RTO information and logistics cost data."
//     },


//     // ----------------------------------------------
//     // REFUND IMPACT
//     // ----------------------------------------------

//     refundImpact: {

//       label: "Refund Impact",

//       available:
//         hasField("refund_amount"),

//       requiredFields: [
//         "refund_amount"
//       ],

//       missingFields:
//         hasField("refund_amount")
//           ? []
//           : ["refund_amount"],

//       reason:
//         hasField("refund_amount")
//           ? "Refund amount data is available."
//           : "No refund amount data was provided."
//     },


//     // ----------------------------------------------
//     // PAYMENT FAILURE IMPACT
//     // ----------------------------------------------

//     paymentFailureImpact: {

//       label: "Payment Failure Impact",

//       available:
//         hasField("payment_status"),

//       requiredFields: [
//         "payment_status"
//       ],

//       missingFields:
//         hasField("payment_status")
//           ? []
//           : ["payment_status"],

//       reason:
//         hasField("payment_status")
//           ? "Payment status is available."
//           : "Payment status data is not available."
//     },


//     // ----------------------------------------------
//     // GATEWAY COST
//     // ----------------------------------------------

//     gatewayCost: {

//       label: "Gateway Cost",

//       available:
//         hasField("gateway_fee"),

//       requiredFields: [
//         "gateway_fee"
//       ],

//       missingFields:
//         hasField("gateway_fee")
//           ? []
//           : ["gateway_fee"],

//       reason:
//         hasField("gateway_fee")
//           ? "Gateway fee data is available."
//           : "Gateway fee data is not available."
//     },


//     // ----------------------------------------------
//     // COUPON ANALYSIS
//     // ----------------------------------------------

//     couponAnalysis: {

//       label: "Coupon Analysis",

//       available:
//         hasField("coupon_code") &&
//         hasField("discount"),

//       requiredFields: [
//         "coupon_code",
//         "discount"
//       ],

//       missingFields: [

//         ...(
//           hasField("coupon_code")
//             ? []
//             : ["coupon_code"]
//         ),

//         ...(
//           hasField("discount")
//             ? []
//             : ["discount"]
//         )
//       ],

//       reason:
//         hasField("coupon_code") &&
//         hasField("discount")
//           ? "Coupon and discount data are available."
//           : "Coupon analysis requires coupon and discount information."
//     }
//   };


//   // ====================================================
//   // SUMMARY
//   // ====================================================

//   const analysisList =
//     Object.values(analyses);

//   const availableCount =
//     analysisList.filter(
//       analysis =>
//         analysis.available
//     ).length;

//   const readinessScore =
//     analysisList.length === 0
//       ? 0
//       : (
//           availableCount /
//           analysisList.length
//         ) * 100;


//   return {

//     analyses,

//     availableCount,

//     totalAnalyses:
//       analysisList.length,

//     readinessScore:
//       Number(
//         readinessScore.toFixed(1)
//       )
//   };
// }

// // --------------------------------------------------
// // 18. COMPLETE NORMALIZATION PIPELINE
// // --------------------------------------------------

// export function normalizeMerchantData(rows) {
//   if (!Array.isArray(rows) || rows.length === 0) {
//     return {
//       success: false,
//       normalizedData: [],
//       mappings: [],
//       missingFields: [],
//       validationIssues: [],
//       quality: {
//         score: 0,
//         completeness: 0,
//         validity: 0,
//         mappingConfidence: 0,
//       },
//       message: "No merchant data was provided.",
//     };
//   }

//   const mappings = detectMappings(rows);

//   const missingFields =
//     detectMissingFields(mappings);

//   const normalizedData =
//     normalizeDataset(rows, mappings);

//   const validationIssues =
//     validateDataset(normalizedData);

//   const quality =
//     calculateDataQuality(
//       normalizedData,
//       mappings,
//       validationIssues
//     );

//   const financialReadiness =
//   getFinancialDataReadiness(
//     normalizedData
//   );  

//   return {
//     success: true,
//     normalizedData,
//     mappings,
//     missingFields,
//     validationIssues,
//     financialReadiness,
//     quality,
//   };
// }

// src/utils/merchantNormalizer.js

/*
 * MarginGuard - Merchant Data Normalization Engine
 *
 * Converts different merchant CSV schemas into our
 * internal canonical schema.
 *
 * This version is deterministic.
 * AI-assisted mapping will be added later.
 */

// --------------------------------------------------
// 1. CANONICAL SCHEMA
// --------------------------------------------------

export const CANONICAL_FIELDS = {

  // ====================================================
  // ORDER
  // ====================================================

  order_id: {
    label: "Order ID",
    required: true,
    type: "string"
  },

  order_date: {
    label: "Order Date",
    required: true,
    type: "date"
  },

  order_status: {
    label: "Order Status",
    required: true,
    type: "string"
  },

  currency: {
    label: "Currency",
    required: false,
    type: "string"
  },


  // ====================================================
  // CUSTOMER
  // ====================================================

  customer_id: {
    label: "Customer ID",
    required: false,
    type: "string"
  },

  customer_created_at: {
    label: "Customer Created Date",
    required: false,
    type: "date"
  },


  // ====================================================
  // PRODUCT / ITEM
  // ====================================================

  order_item_id: {
    label: "Order Item ID",
    required: false,
    type: "string"
  },

  product_id: {
    label: "Product ID",
    required: false,
    type: "string"
  },

  product_name: {
    label: "Product Name",
    required: false,
    type: "string"
  },

  sku: {
    label: "SKU",
    required: false,
    type: "string"
  },

  category: {
    label: "Product Category",
    required: false,
    type: "string"
  },

  quantity: {
    label: "Quantity",
    required: true,
    type: "number"
  },


  // ====================================================
  // PRICING
  // ====================================================

  mrp: {
    label: "MRP",
    required: false,
    type: "number"
  },

  unit_price: {
    label: "Unit Price",
    required: false,
    type: "number"
  },

  selling_price: {
    label: "Selling Price",
    required: false,
    type: "number"
  },

  subtotal: {
    label: "Subtotal",
    required: false,
    type: "number"
  },

  discount: {
    label: "Discount",
    required: false,
    type: "number"
  },

  tax_amount: {
    label: "Tax Amount",
    required: false,
    type: "number"
  },

  shipping_charge: {
    label: "Shipping Charge",
    required: false,
    type: "number"
  },

  total_amount: {
    label: "Order Total",
    required: false,
    type: "number"
  },

  paid_amount: {
    label: "Paid Amount",
    required: false,
    type: "number"
  },


  // ====================================================
  // COST
  // ====================================================

  cost_price: {
    label: "Product Cost",
    required: false,
    type: "number"
  },

  packaging_cost: {
    label: "Packaging Cost",
    required: false,
    type: "number"
  },


  // ====================================================
  // PAYMENT
  // ====================================================

  payment_id: {
    label: "Payment ID",
    required: false,
    type: "string"
  },

  payment_method: {
    label: "Payment Method",
    required: false,
    type: "string"
  },

  payment_status: {
    label: "Payment Status",
    required: false,
    type: "string"
  },

  payment_amount: {
    label: "Payment Amount",
    required: false,
    type: "number"
  },

  gateway_fee: {
    label: "Gateway Fee",
    required: false,
    type: "number"
  },

  gateway_tax: {
    label: "Gateway Tax",
    required: false,
    type: "number"
  },


  // ====================================================
  // SHIPPING
  // ====================================================

  shipment_id: {
    label: "Shipment ID",
    required: false,
    type: "string"
  },

  courier: {
    label: "Courier",
    required: false,
    type: "string"
  },

  shipping_cost: {
    label: "Forward Shipping Cost",
    required: false,
    type: "number"
  },

  return_shipping_cost: {
    label: "Return Shipping Cost",
    required: false,
    type: "number"
  },

  delivery_attempts: {
    label: "Delivery Attempts",
    required: false,
    type: "number"
  },

  delivery_status: {
    label: "Delivery Status",
    required: false,
    type: "string"
  },

  dispatch_date: {
    label: "Dispatch Date",
    required: false,
    type: "date"
  },

  delivery_date: {
    label: "Delivery Date",
    required: false,
    type: "date"
  },


  // ====================================================
  // RTO
  // ====================================================

  rto_status: {
    label: "RTO Status",
    required: false,
    type: "string"
  },

  rto_cost: {
    label: "RTO Cost",
    required: false,
    type: "number"
  },


  // ====================================================
  // RETURNS
  // ====================================================

  return_id: {
    label: "Return ID",
    required: false,
    type: "string"
  },

  return_status: {
    label: "Return Status",
    required: false,
    type: "string"
  },

  return_reason: {
    label: "Return Reason",
    required: false,
    type: "string"
  },

  return_date: {
    label: "Return Date",
    required: false,
    type: "date"
  },


  // ====================================================
  // REFUNDS
  // ====================================================

  refund_id: {
    label: "Refund ID",
    required: false,
    type: "string"
  },

  refund_amount: {
    label: "Refund Amount",
    required: false,
    type: "number"
  },

  refund_date: {
    label: "Refund Date",
    required: false,
    type: "date"
  },

  inventory_loss: {
    label: "Inventory Loss",
    required: false,
    type: "number"
  },

  restocking_cost: {
    label: "Restocking Cost",
    required: false,
    type: "number"
  },


  // ====================================================
  // COUPONS / PROMOTIONS
  // ====================================================

  coupon_code: {
    label: "Coupon Code",
    required: false,
    type: "string"
  },

  discount_type: {
    label: "Discount Type",
    required: false,
    type: "string"
  },


  // ====================================================
  // LOCATION
  // ====================================================

  pincode: {
    label: "Pincode",
    required: false,
    type: "string"
  },

  city: {
    label: "City",
    required: false,
    type: "string"
  },

  state: {
    label: "State",
    required: false,
    type: "string"
  }
};


// --------------------------------------------------
// 2. COLUMN ALIASES
// --------------------------------------------------

const FIELD_ALIASES = {

  // ==================================================
  // ORDER
  // ==================================================

  order_id: [
    "order_id",
    "orderid",
    "order id",
    "order_no",
    "order no",
    "order number",
    "order_number",
    "order reference",
    "order reference id",
    "transaction_id",
    "transaction id",
    "txn_id",
    "txn id"
  ],

  order_date: [
    "order_date",
    "order date",
    "orderdate",
    "purchase_date",
    "purchase date",
    "created_at",
    "created at",
    "created_date",
    "created date"
  ],

  order_status: [
    "order_status",
    "order status",
    "orderstate",
    "order state",
    "fulfillment_status",
    "fulfillment status",
    "status"
  ],

  currency: [
    "currency",
    "currency code",
    "currency_code"
  ],


  // ==================================================
  // CUSTOMER
  // ==================================================

  customer_id: [
    "customer_id",
    "customerid",
    "customer id",
    "customer_no",
    "customer number",
    "user_id",
    "user id",
    "buyer_id",
    "buyer id"
  ],

  customer_created_at: [
    "customer_created_at",
    "customer created at",
    "customer_created_date",
    "customer created date"
  ],


  // ==================================================
  // PRODUCT
  // ==================================================

  order_item_id: [
    "order_item_id",
    "order item id",
    "orderitemid",
    "line_item_id",
    "line item id"
  ],

  product_id: [
    "product_id",
    "productid",
    "product id",
    "item_id",
    "item id",
    "item_code",
    "item code",
    "sku_id",
    "sku id"
  ],

  product_name: [
    "product_name",
    "product name",
    "product title",
    "item_name",
    "item name",
    "item title"
  ],

  sku: [
    "sku",
    "sku code",
    "stock keeping unit",
    "stock_keeping_unit"
  ],

  category: [
    "category",
    "product category",
    "product_category",
    "item category",
    "item_category"
  ],

  quantity: [
    "quantity",
    "qty",
    "units",
    "unit count",
    "item quantity",
    "item_quantity",
    "number of units",
    "number_of_items",
    "number of items"
  ],


  // ==================================================
  // PRICING
  // ==================================================

  mrp: [
    "mrp",
    "maximum retail price",
    "list price",
    "list_price"
  ],

  unit_price: [
    "unit price",
    "unit_price",
    "price per unit",
    "item price",
    "item_price"
  ],

  selling_price: [
    "selling_price",
    "selling price",
    "sale_price",
    "sale price",
    "selling_amount",
    "selling amount",
    "net selling price"
  ],

  subtotal: [
    "subtotal",
    "sub total",
    "order subtotal",
    "order_subtotal"
  ],

  discount: [
    "discount",
    "discount_amount",
    "discount amount",
    "discount_amt",
    "discount amt",
    "disc",
    "disc_amt",
    "disc amount",
    "offer",
    "offer_amount"
  ],

  tax_amount: [
    "tax",
    "tax amount",
    "tax_amount",
    "gst",
    "gst amount",
    "gst_amount"
  ],

  shipping_charge: [
    "shipping charge",
    "shipping_charge",
    "delivery charge",
    "delivery_charge",
    "shipping fee charged"
  ],

  total_amount: [
    "order total",
    "order_total",
    "total order value",
    "total_order_value",
    "invoice total",
    "invoice_total"
  ],

  paid_amount: [
    "paid amount",
    "paid_amount",
    "amount paid",
    "amount_paid",
    "customer paid",
    "customer_paid"
  ],


  // ==================================================
  // COST
  // ==================================================

  cost_price: [
    "cost price",
    "cost_price",
    "product cost",
    "product_cost",
    "cogs",
    "cog",
    "cost of goods sold",
    "cost_of_goods_sold",
    "purchase cost",
    "purchase_cost"
  ],

  packaging_cost: [
    "packaging cost",
    "packaging_cost",
    "packing cost",
    "packing_cost"
  ],


  // ==================================================
  // PAYMENT
  // ==================================================

  payment_id: [
    "payment id",
    "payment_id",
    "payment reference",
    "payment_reference"
  ],

  payment_method: [
    "payment method",
    "payment_method",
    "payment mode",
    "payment_mode",
    "pay mode",
    "pay_mode",
    "pay type",
    "pay_type"
  ],

  payment_status: [
    "payment status",
    "payment_status",
    "payment state",
    "payment_state",
    "transaction status",
    "transaction_status",
    "txn status",
    "txn_status"
  ],

  payment_amount: [
    "payment amount",
    "payment_amount",
    "transaction amount",
    "transaction_amount"
  ],

  gateway_fee: [
    "gateway fee",
    "gateway_fee",
    "payment fee",
    "payment_fee",
    "processing fee",
    "processing_fee",
    "pg fee",
    "pg_fee"
  ],

  gateway_tax: [
    "gateway tax",
    "gateway_tax",
    "payment fee tax",
    "processing fee tax"
  ],


  // ==================================================
  // SHIPPING / LOGISTICS
  // ==================================================

  shipment_id: [
    "shipment id",
    "shipment_id",
    "awb",
    "awb number",
    "awb_number",
    "tracking number",
    "tracking_number"
  ],

  courier: [
    "courier",
    "courier partner",
    "courier_partner",
    "logistics partner",
    "logistics_partner",
    "carrier"
  ],

  shipping_cost: [
    "shipping cost",
    "shipping_cost",
    "forward shipping",
    "forward_shipping",
    "delivery cost",
    "delivery_cost",
    "freight cost",
    "freight_cost"
  ],

  return_shipping_cost: [
    "return shipping",
    "return_shipping",
    "return shipping cost",
    "return_shipping_cost",
    "reverse shipping",
    "reverse_shipping",
    "reverse freight",
    "reverse_freight"
  ],

  delivery_attempts: [
    "delivery attempts",
    "delivery_attempts",
    "attempts",
    "delivery tries"
  ],

  delivery_status: [
    "delivery status",
    "delivery_status",
    "shipment status",
    "shipment_status",
    "shipping status",
    "shipping_status"
  ],

  dispatch_date: [
    "dispatch date",
    "dispatch_date",
    "shipped date",
    "shipped_date",
    "shipping date",
    "shipping_date"
  ],

  delivery_date: [
    "delivery date",
    "delivery_date",
    "delivered date",
    "delivered_date"
  ],


  // ==================================================
  // RTO
  // ==================================================

  rto_status: [
    "rto",
    "rto flag",
    "rto_flag",
    "rto status",
    "rto_status",
    "return to origin",
    "return_to_origin",
    "returned to origin",
    "returned_to_origin"
  ],

  rto_cost: [
    "rto cost",
    "rto_cost",
    "rto charge",
    "rto_charge"
  ],


  // ==================================================
  // RETURNS
  // ==================================================

  return_id: [
    "return id",
    "return_id",
    "return reference",
    "return_reference"
  ],

  return_status: [
    "return status",
    "return_status"
  ],

  return_reason: [
    "return reason",
    "return_reason",
    "reason for return",
    "reason_for_return"
  ],

  return_date: [
    "return date",
    "return_date",
    "returned date",
    "returned_date"
  ],


  // ==================================================
  // REFUNDS
  // ==================================================

  refund_id: [
    "refund id",
    "refund_id",
    "refund reference",
    "refund_reference"
  ],

  refund_amount: [
    "refund amount",
    "refund_amount",
    "refunded amount",
    "refunded_amount"
  ],

  refund_date: [
    "refund date",
    "refund_date",
    "refunded date",
    "refunded_date"
  ],

  inventory_loss: [
    "inventory loss",
    "inventory_loss",
    "stock loss",
    "stock_loss",
    "damaged inventory value",
    "damaged_inventory_value"
  ],

  restocking_cost: [
    "restocking cost",
    "restocking_cost",
    "restock cost",
    "restock_cost"
  ],


  // ==================================================
  // COUPONS
  // ==================================================

  coupon_code: [
    "coupon",
    "coupon code",
    "coupon_code",
    "promo code",
    "promo_code",
    "promotion code",
    "promotion_code",
    "voucher code",
    "voucher_code"
  ],

  discount_type: [
    "discount type",
    "discount_type",
    "promotion type",
    "promotion_type"
  ],


  // ==================================================
  // LOCATION
  // ==================================================

  pincode: [
    "pincode",
    "pin",
    "pin code",
    "pin_code",
    "postal code",
    "postal_code",
    "zipcode",
    "zip code",
    "zip"
  ],

  city: [
    "city",
    "delivery city",
    "delivery_city",
    "shipping city",
    "shipping_city"
  ],

  state: [
    "state",
    "delivery state",
    "delivery_state",
    "shipping state",
    "shipping_state"
  ]
};


// --------------------------------------------------
// 3. HELPERS
// --------------------------------------------------

function cleanName(value) {
  return String(value ?? "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
}


function cleanValue(value) {
  return String(value ?? "").trim();
}


function isEmpty(value) {
  return value === null ||
    value === undefined ||
    String(value).trim() === "";
}


// --------------------------------------------------
// 4. FIND EXACT ALIAS MATCH
// --------------------------------------------------

function findAliasMatch(columnName) {
  const cleanedColumn = cleanName(columnName);

  for (const [field, aliases] of Object.entries(FIELD_ALIASES)) {
    for (const alias of aliases) {
      if (cleanName(alias) === cleanedColumn) {
        return {
          field,
          confidence: 0.99,
          method: "alias",
        };
      }
    }
  }

  return null;
}


// --------------------------------------------------
// 5. SIMPLE FUZZY MATCH
// --------------------------------------------------

function similarity(a, b) {
  const first = cleanName(a);
  const second = cleanName(b);

  if (!first || !second) return 0;

  if (first === second) return 1;

  if (first.includes(second) || second.includes(first)) {
    return 0.85;
  }

  // Small Levenshtein implementation
  const matrix = Array.from(
    { length: first.length + 1 },
    () => Array(second.length + 1).fill(0)
  );

  for (let i = 0; i <= first.length; i++) {
    matrix[i][0] = i;
  }

  for (let j = 0; j <= second.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= first.length; i++) {
    for (let j = 1; j <= second.length; j++) {
      const cost = first[i - 1] === second[j - 1] ? 0 : 1;

      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const distance = matrix[first.length][second.length];
  const maxLength = Math.max(first.length, second.length);

  return Math.max(0, 1 - distance / maxLength);
}


// --------------------------------------------------
// 6. PROFILE A COLUMN
// --------------------------------------------------

export function profileColumn(rows, column) {
  const values = rows
    .map(row => row[column])
    .filter(value => !isEmpty(value));

  const numericValues = values.filter(value => {
    const cleaned = String(value)
      .replace(/[₹,$\s]/g, "");

    return cleaned !== "" && !Number.isNaN(Number(cleaned));
  });

  const dateValues = values.filter(value => {
    const parsed = Date.parse(value);
    return !Number.isNaN(parsed);
  });

  const uniqueValues = new Set(values.map(value => String(value))).size;

  return {
    column,
    totalValues: rows.length,
    nonEmptyValues: values.length,
    emptyValues: rows.length - values.length,
    nullPercentage:
      rows.length === 0
        ? 0
        : Number(
            (((rows.length - values.length) / rows.length) * 100).toFixed(2)
          ),

    numericPercentage:
      values.length === 0
        ? 0
        : Number(((numericValues.length / values.length) * 100).toFixed(2)),

    datePercentage:
      values.length === 0
        ? 0
        : Number(((dateValues.length / values.length) * 100).toFixed(2)),

    uniqueValues,

    sampleValues: values.slice(0, 5),
  };
}


// --------------------------------------------------
// 7. CHECK VALUE COMPATIBILITY
// --------------------------------------------------

function getTypeCompatibility(values, expectedType) {

  if (!Array.isArray(values) || values.length === 0) {
    return 0.5;
  }

  const validValues = values.filter(
    value =>
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
  );

  if (validValues.length === 0) {
    return 0.5;
  }


  // ================================================
  // NUMBER
  // ================================================

  if (expectedType === "number") {

    const validNumbers =
      validValues.filter(value => {

        const cleaned =
          String(value)
            .replace(/[₹$€£,\s]/g, "")
            .trim();

        const number =
          Number(cleaned);

        return Number.isFinite(number);
      });

    return (
      validNumbers.length /
      validValues.length
    );
  }


  // ================================================
  // DATE
  // ================================================

  if (expectedType === "date") {

    const validDates =
      validValues.filter(value => {

        const date =
          new Date(value);

        return !Number.isNaN(
          date.getTime()
        );
      });

    return (
      validDates.length /
      validValues.length
    );
  }


  // ================================================
  // STRING
  // ================================================

  if (expectedType === "string") {
    return 1;
  }


  return 0.5;
}


// --------------------------------------------------
// 8. MAP MERCHANT COLUMNS
// --------------------------------------------------


function detectColumnType(values) {

  if (!Array.isArray(values) || values.length === 0) {
    return "unknown";
  }

  const cleanedValues =
    values.filter(
      value =>
        value !== null &&
        value !== undefined &&
        String(value).trim() !== ""
    );

  if (cleanedValues.length === 0) {
    return "unknown";
  }


  // ----------------------------------------------
  // NUMBER
  // ----------------------------------------------

  const numericCount =
    cleanedValues.filter(value => {

      const cleaned =
        String(value)
          .replace(/[₹$€£,\s]/g, "")
          .trim();

      return Number.isFinite(
        Number(cleaned)
      );

    }).length;


  if (
    numericCount /
      cleanedValues.length >=
    0.8
  ) {
    return "number";
  }


  // ----------------------------------------------
  // DATE
  // ----------------------------------------------

  const dateCount =
    cleanedValues.filter(value => {

      const date =
        new Date(value);

      return !Number.isNaN(
        date.getTime()
      );

    }).length;


  if (
    dateCount /
      cleanedValues.length >=
    0.8
  ) {
    return "date";
  }


  // ----------------------------------------------
  // STRING
  // ----------------------------------------------

  return "string";
}
export function detectMappings(rows) {

  if (!Array.isArray(rows) || rows.length === 0) {
    return [];
  }

  const columns = Object.keys(rows[0]);
  const usedTargets = new Set();

  return columns.map(sourceColumn => {

    const values = rows
      .map(row => row[sourceColumn])
      .filter(value => !isEmpty(value))
      .slice(0, 50);

    const sourceClean = cleanName(sourceColumn);

    // ==================================================
    // 1. EXACT ALIAS MATCH
    // ==================================================

    for (
      const [canonicalField, aliases]
      of Object.entries(FIELD_ALIASES)
    ) {

      const exactMatch = aliases.some(
        alias =>
          cleanName(alias) === sourceClean
      );

      if (exactMatch) {

        // Don't allow two merchant columns
        // to automatically map to the same field.
        if (usedTargets.has(canonicalField)) {

          return {
            source: sourceColumn,
            target: null,
            confidence: 0,
            method: "duplicate_target",
            requiresReview: true,
            candidates: [
              {
                field: canonicalField,
                label: CANONICAL_FIELDS[canonicalField].label,
                confidence: 1
              }
            ]
          };
        }

        const config =
          CANONICAL_FIELDS[canonicalField];

        const typeScore =
          getTypeCompatibility(
            values,
            config.type
          );

        const confidence =
          0.85 + typeScore * 0.15;

        // Exact alias but wrong data type
        if (typeScore < 0.70) {

          return {
            source: sourceColumn,
            target: null,
            confidence: Number(
              confidence.toFixed(2)
            ),
            method: "type_conflict",
            requiresReview: true,
            candidates: [
              {
                field: canonicalField,
                label: config.label,
                confidence: Number(
                  confidence.toFixed(2)
                )
              }
            ]
          };
        }

        usedTargets.add(canonicalField);

        return {
          source: sourceColumn,
          target: canonicalField,
          confidence: Number(
            confidence.toFixed(2)
          ),
          method: "exact_alias",
          requiresReview: false,
          candidates: [
            {
              field: canonicalField,
              label: config.label,
              confidence: Number(
                confidence.toFixed(2)
              )
            }
          ]
        };
      }
    }


    // ==================================================
    // 2. DETECT SOURCE DATA TYPE
    // ==================================================

    const detectedType =
      detectColumnType(values);


    // ==================================================
    // 3. GENERATE CANDIDATES
    // ==================================================

    const candidates = [];

    for (
      const [canonicalField, aliases]
      of Object.entries(FIELD_ALIASES)
    ) {

      if (usedTargets.has(canonicalField)) {
        continue;
      }

      const config =
        CANONICAL_FIELDS[canonicalField];


      // Don't compare incompatible types
      if (
        detectedType !== "unknown" &&
        config.type !== detectedType
      ) {
        continue;
      }


      let bestNameScore = 0;

      for (const alias of aliases) {

        const score =
          similarity(
            sourceClean,
            cleanName(alias)
          );

        bestNameScore =
          Math.max(
            bestNameScore,
            score
          );
      }


      const typeScore =
        getTypeCompatibility(
          values,
          config.type
        );


      const finalScore =
        bestNameScore * 0.70 +
        typeScore * 0.30;


      candidates.push({
        field: canonicalField,
        label: config.label,
        confidence: finalScore,
        nameScore: bestNameScore,
        typeScore
      });
    }


    // ==================================================
    // 4. SORT
    // ==================================================

    candidates.sort(
      (a, b) =>
        b.confidence -
        a.confidence
    );


    const best =
      candidates[0];

    const second =
      candidates[1];


    // ==================================================
    // 5. NO MATCH
    // ==================================================

    if (
      !best ||
      best.confidence < 0.60
    ) {

      return {
        source: sourceColumn,
        target: null,
        confidence: 0,
        method: "unmapped",
        requiresReview: true,
        candidates:
          candidates
            .slice(0, 3)
            .map(candidate => ({
              field: candidate.field,
              label: candidate.label,
              confidence: Number(
                candidate.confidence.toFixed(2)
              )
            }))
      };
    }


    // ==================================================
    // 6. GENERIC / AMBIGUOUS FINANCIAL FIELD
    // ==================================================

    const genericFinancialWords = [
      "amount",
      "value",
      "total",
      "price",
      "cost",
      "net",
      "gross"
    ];

    const isGenericFinancialField =
      genericFinancialWords.some(
        word =>
          sourceClean === word
      );


    if (isGenericFinancialField) {

      return {
        source: sourceColumn,
        target: null,
        confidence: Number(
          best.confidence.toFixed(2)
        ),
        method: "ambiguous",
        requiresReview: true,
        candidates:
          candidates
            .slice(0, 3)
            .map(candidate => ({
              field: candidate.field,
              label: candidate.label,
              confidence: Number(
                candidate.confidence.toFixed(2)
              )
            }))
      };
    }


    // ==================================================
    // 7. CHECK HOW MUCH BETTER THE BEST MATCH IS
    // ==================================================

    const scoreGap =
      best.confidence -
      (second?.confidence || 0);


    // ==================================================
    // 8. AUTO-MAP ONLY WHEN VERY CONFIDENT
    // ==================================================

    if (
      best.confidence >= 0.82 &&
      scoreGap >= 0.12
    ) {

      usedTargets.add(best.field);

      return {
        source: sourceColumn,
        target: best.field,
        confidence: Number(
          best.confidence.toFixed(2)
        ),
        method: "fuzzy",
        requiresReview: false,
        candidates:
          candidates
            .slice(0, 3)
            .map(candidate => ({
              field: candidate.field,
              label: candidate.label,
              confidence: Number(
                candidate.confidence.toFixed(2)
              )
            }))
      };
    }


    // ==================================================
    // 9. EVERYTHING UNCERTAIN → REVIEW
    // ==================================================

    return {
      source: sourceColumn,
      target: null,
      confidence: Number(
        best.confidence.toFixed(2)
      ),
      method: "needs_review",
      requiresReview: true,
      candidates:
        candidates
          .slice(0, 3)
          .map(candidate => ({
            field: candidate.field,
            label: candidate.label,
            confidence: Number(
              candidate.confidence.toFixed(2)
            )
          }))
    };
  });
}


// --------------------------------------------------
// 9. DETECT MISSING REQUIRED FIELDS
// --------------------------------------------------

export function detectMissingFields(mappings) {
  const mappedFields = new Set(
    mappings
      .filter(mapping => mapping.target)
      .map(mapping => mapping.target)
  );

  return Object.entries(CANONICAL_FIELDS)
    .filter(([field, config]) => {
      return config.required && !mappedFields.has(field);
    })
    .map(([field, config]) => ({
      field,
      label: config.label,
      required: config.required,
    }));
}


// --------------------------------------------------
// 10. NORMALIZE PAYMENT METHOD
// --------------------------------------------------

function normalizePaymentMethod(value) {
  if (isEmpty(value)) return null;

  const normalized = cleanValue(value)
    .toLowerCase()
    .replace(/[_-]/g, " ");

  if (
    ["cod", "cash on delivery", "cash delivery"].includes(normalized)
  ) {
    return "COD";
  }

  if (
    ["upi", "upi payment"].includes(normalized)
  ) {
    return "UPI";
  }

  if (
    [
      "card",
      "credit card",
      "debit card",
      "credit",
      "debit",
    ].includes(normalized)
  ) {
    return "CARD";
  }

  if (
    ["net banking", "netbanking", "internet banking"].includes(normalized)
  ) {
    return "NETBANKING";
  }

  if (
    ["wallet", "digital wallet"].includes(normalized)
  ) {
    return "WALLET";
  }

  return cleanValue(value).toUpperCase();
}


// --------------------------------------------------
// 11. NORMALIZE RTO STATUS
// --------------------------------------------------

function normalizeRTO(value) {
  if (isEmpty(value)) return null;

  const normalized = cleanValue(value).toLowerCase();

  if (
    [
      "1",
      "true",
      "yes",
      "y",
      "rto",
      "returned",
      "return to origin",
      "return_to_origin",
    ].includes(normalized)
  ) {
    return "RTO";
  }

  if (
    [
      "0",
      "false",
      "no",
      "n",
      "delivered",
      "not rto",
    ].includes(normalized)
  ) {
    return "NOT_RTO";
  }

  return "UNKNOWN";
}


// --------------------------------------------------
// 12. NORMALIZE NUMBER
// --------------------------------------------------

function normalizeNumber(value) {
  if (isEmpty(value)) return null;

  const cleaned = String(value)
    .replace(/[₹,$\s]/g, "")
    .replace(/,/g, "");

  const number = Number(cleaned);

  return Number.isFinite(number) ? number : null;
}


// --------------------------------------------------
// 13. NORMALIZE DATE
// --------------------------------------------------

function normalizeDate(value) {
  if (isEmpty(value)) return null;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().split("T")[0];
}


// --------------------------------------------------
// 14. NORMALIZE A SINGLE ROW
// --------------------------------------------------

export function normalizeRow(row, mappings) {
  const normalized = {};

  mappings.forEach(mapping => {
    if (!mapping.target) return;

    const value = row[mapping.source];

    switch (mapping.target) {
      case "quantity":
      case "selling_price":
      case "discount":
        normalized[mapping.target] = normalizeNumber(value);
        break;

      case "order_date":
        normalized[mapping.target] = normalizeDate(value);
        break;

      case "payment_method":
        normalized[mapping.target] =
          normalizePaymentMethod(value);
        break;

      case "rto_status":
        normalized[mapping.target] =
          normalizeRTO(value);
        break;

      default:
        normalized[mapping.target] =
          isEmpty(value) ? null : cleanValue(value);
    }
  });

  return normalized;
}


// --------------------------------------------------
// 15. NORMALIZE COMPLETE DATASET
// --------------------------------------------------

function normalizeDataset(rows, mappings) {

  return rows.map(row => {

    const normalized = {};

    mappings.forEach(mapping => {

      // Don't normalize fields that need review
      if (
        !mapping.target ||
        mapping.needsReview
      ) {
        return;
      }

      const field =
        mapping.target;

      const config =
        CANONICAL_FIELDS[field];

      const rawValue =
        row[mapping.source];


      // ----------------------------------------------
      // Missing value
      // ----------------------------------------------

      if (
        rawValue === null ||
        rawValue === undefined ||
        String(rawValue).trim() === ""
      ) {

        normalized[field] = null;

        return;
      }


      // ----------------------------------------------
      // NUMBER
      // ----------------------------------------------

      if (
        config.type === "number"
      ) {

        /*
         * Handles:
         *
         * 1
         * "1"
         * "1,299"
         * "₹1,299"
         * "$1299"
         */

        const cleaned =
          String(rawValue)
            .replace(/₹/g, "")
            .replace(/\$/g, "")
            .replace(/€/g, "")
            .replace(/£/g, "")
            .replace(/,/g, "")
            .trim();


        const number =
          Number(cleaned);


        normalized[field] =
          Number.isFinite(number)
            ? number
            : null;

        return;
      }


      // ----------------------------------------------
      // DATE
      // ----------------------------------------------

      if (
        config.type === "date"
      ) {

        const parsed =
          new Date(rawValue);


        if (
          Number.isNaN(
            parsed.getTime()
          )
        ) {

          normalized[field] = null;

        } else {

          normalized[field] =
            parsed
              .toISOString()
              .split("T")[0];
        }

        return;
      }


      // ----------------------------------------------
      // STRING
      // ----------------------------------------------

      normalized[field] =
        String(rawValue).trim();
    });


    /*
     * Compatibility with existing
     * MarginGuard calculation code.
     *
     * Canonical field:
     * discount
     *
     * Existing calculation code:
     * row.discount
     */

    if (
      normalized.discount !==
      undefined
    ) {

      normalized.discount =
        Number(normalized.discount) || 0;
    }


    return normalized;
  });
}


// --------------------------------------------------
// 16. VALIDATE NORMALIZED DATA
// --------------------------------------------------

export function validateDataset(rows) {
  const issues = [];

  rows.forEach((row, index) => {
    const rowNumber = index + 2;

    // Required fields
    for (const [field, config] of Object.entries(CANONICAL_FIELDS)) {
      if (
        config.required &&
        isEmpty(row[field])
      ) {
        issues.push({
          row: rowNumber,
          field,
          severity: "error",
          message: `${config.label} is missing`,
        });
      }
    }

    // Quantity validation
    if (
      row.quantity !== null &&
      row.quantity !== undefined &&
      (!Number.isFinite(row.quantity) || row.quantity <= 0)
    ) {
      issues.push({
        row: rowNumber,
        field: "quantity",
        severity: "error",
        message: "Quantity must be greater than 0",
      });
    }

    // Price validation
    if (
      row.selling_price !== null &&
      row.selling_price !== undefined &&
      row.selling_price < 0
    ) {
      issues.push({
        row: rowNumber,
        field: "selling_price",
        severity: "error",
        message: "Selling price cannot be negative",
      });
    }

    // Discount validation
    if (
      row.discount !== null &&
      row.discount !== undefined &&
      row.discount < 0
    ) {
      issues.push({
        row: rowNumber,
        field: "discount",
        severity: "error",
        message: "Discount cannot be negative",
      });
    }

    // Discount > selling price
    if (
      row.discount !== null &&
      row.selling_price !== null &&
      row.discount > row.selling_price
    ) {
      issues.push({
        row: rowNumber,
        field: "discount",
        severity: "warning",
        message: "Discount is greater than selling price",
      });
    }

    // Pincode validation
    if (
      row.pincode &&
      !/^\d{6}$/.test(String(row.pincode))
    ) {
      issues.push({
        row: rowNumber,
        field: "pincode",
        severity: "warning",
        message: "Pincode should contain 6 digits",
      });
    }
  });

  return issues;
}


function safeNumber(value, fallback = 0) {

  const number =
    Number(value);

  return Number.isFinite(number)
    ? number
    : fallback;
}

// --------------------------------------------------
// 17. DATA QUALITY SCORE
// --------------------------------------------------

export function calculateDataQuality(
  rows,
  mappings,
  validationIssues
) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      score: 0,
      completeness: 0,
      validity: 0,
      mappingConfidence: 0,
    };
  }

  // ==================================================
  // 1. MAPPING CONFIDENCE
  // ==================================================

  const mapped = mappings.filter(
    mapping =>
      mapping &&
      mapping.target &&
      Number.isFinite(
        Number(mapping.confidence)
      )
  );

  const mappingConfidence =
    mapped.length === 0
      ? 0
      : mapped.reduce(
          (sum, mapping) =>
            sum +
            Number(mapping.confidence),
          0
        ) / mapped.length;


  // ==================================================
  // 2. COMPLETENESS
  // ==================================================

  let totalRequiredValues = 0;
  let presentRequiredValues = 0;

  for (const row of rows) {

    for (
      const [
        field,
        config
      ] of Object.entries(
        CANONICAL_FIELDS
      )
    ) {

      if (!config.required) {
        continue;
      }

      totalRequiredValues++;

      if (
        row &&
        !isEmpty(row[field])
      ) {
        presentRequiredValues++;
      }
    }
  }

  const completeness =
    totalRequiredValues === 0
      ? 1
      : presentRequiredValues /
        totalRequiredValues;


  // ==================================================
  // 3. VALIDITY
  // ==================================================

  const safeIssues =
    Array.isArray(validationIssues)
      ? validationIssues
      : [];

  const errorCount =
    safeIssues.filter(
      issue =>
        issue &&
        issue.severity === "error"
    ).length;


  const requiredFieldCount =
    Object.values(
      CANONICAL_FIELDS
    ).filter(
      config =>
        config.required
    ).length;


  const totalPossibleChecks =
    rows.length *
    requiredFieldCount;


  const validity =
    totalPossibleChecks === 0
      ? 1
      : Math.max(
          0,
          1 -
            errorCount /
              totalPossibleChecks
        );


  // ==================================================
  // 4. PROTECT AGAINST NaN
  // ==================================================

  const safeMappingConfidence =
    Number.isFinite(
      mappingConfidence
    )
      ? mappingConfidence
      : 0;


  const safeCompleteness =
    Number.isFinite(
      completeness
    )
      ? completeness
      : 0;


  const safeValidity =
    Number.isFinite(
      validity
    )
      ? validity
      : 0;


  // ==================================================
  // 5. OVERALL SCORE
  // ==================================================

  const score =
    safeMappingConfidence * 0.3 +
    safeCompleteness * 0.4 +
    safeValidity * 0.3;


  return {
    score: Number(
      (score * 100).toFixed(1)
    ),

    completeness: Number(
      (safeCompleteness * 100).toFixed(1)
    ),

    validity: Number(
      (safeValidity * 100).toFixed(1)
    ),

    mappingConfidence: Number(
      (safeMappingConfidence * 100).toFixed(1)
    ),
  };
}


// ======================================================
// FINANCIAL DATA READINESS
// ======================================================

export function getFinancialDataReadiness(normalizedRows) {

  const rows =
    Array.isArray(normalizedRows)
      ? normalizedRows
      : [];

  const hasField = (field) => {

    return rows.some(row =>
      row &&
      !isEmpty(row[field])
    );
  };


  const hasAnyField = (fields) => {

    return fields.some(field =>
      hasField(field)
    );
  };


  const analyses = {

    // ----------------------------------------------
    // RTO RATE
    // ----------------------------------------------

    rtoRate: {

      label: "RTO Rate",

      available:
        hasField("rto_status") ||
        hasField("order_status"),

      requiredFields: [
        "rto_status"
      ],

      missingFields:
        hasField("rto_status")
          ? []
          : ["rto_status"],

      reason:
        hasField("rto_status")
          ? "RTO status is available."
          : "No dedicated RTO field was provided."
    },


    // ----------------------------------------------
    // DISCOUNT IMPACT
    // ----------------------------------------------

    discountImpact: {

      label: "Discount Impact",

      available:
        hasField("discount"),

      requiredFields: [
        "discount"
      ],

      missingFields:
        hasField("discount")
          ? []
          : ["discount"],

      reason:
        hasField("discount")
          ? "Discount data is available."
          : "Discount data is not available."
    },


    // ----------------------------------------------
    // PRODUCT MARGIN
    // ----------------------------------------------

    productMargin: {

      label: "Product Margin",

      available:
        hasField("selling_price") &&
        hasField("cost_price"),

      requiredFields: [
        "selling_price",
        "cost_price"
      ],

      missingFields: [
        ...(
          hasField("selling_price")
            ? []
            : ["selling_price"]
        ),

        ...(
          hasField("cost_price")
            ? []
            : ["cost_price"]
        )
      ],

      reason:
        hasField("selling_price") &&
        hasField("cost_price")
          ? "Selling price and product cost are available."
          : "Product margin cannot be calculated safely without selling price and product cost."
    },


    // ----------------------------------------------
    // RTO FINANCIAL IMPACT
    // ----------------------------------------------

    rtoFinancialImpact: {

      label: "RTO Financial Impact",

      available:
        (
          hasField("rto_status") ||
          hasField("order_status")
        ) &&
        hasAnyField([
          "rto_cost",
          "return_shipping_cost",
          "shipping_cost"
        ]),

      requiredFields: [
        "rto_status",
        "rto_cost / return_shipping_cost / shipping_cost"
      ],

      missingFields: [

        ...(
          hasField("rto_status") ||
          hasField("order_status")
            ? []
            : ["rto_status"]
        ),

        ...(
          hasAnyField([
            "rto_cost",
            "return_shipping_cost",
            "shipping_cost"
          ])
            ? []
            : [
                "rto_cost",
                "return_shipping_cost",
                "shipping_cost"
              ]
        )
      ],

      reason:
        (
          hasField("rto_status") ||
          hasField("order_status")
        ) &&
        hasAnyField([
          "rto_cost",
          "return_shipping_cost",
          "shipping_cost"
        ])
          ? "RTO status and at least one logistics cost are available."
          : "RTO financial impact requires RTO information and logistics cost data."
    },


    // ----------------------------------------------
    // REFUND IMPACT
    // ----------------------------------------------

    refundImpact: {

      label: "Refund Impact",

      available:
        hasField("refund_amount"),

      requiredFields: [
        "refund_amount"
      ],

      missingFields:
        hasField("refund_amount")
          ? []
          : ["refund_amount"],

      reason:
        hasField("refund_amount")
          ? "Refund amount data is available."
          : "No refund amount data was provided."
    },


    // ----------------------------------------------
    // PAYMENT FAILURE IMPACT
    // ----------------------------------------------

    paymentFailureImpact: {

      label: "Payment Failure Impact",

      available:
        hasField("payment_status"),

      requiredFields: [
        "payment_status"
      ],

      missingFields:
        hasField("payment_status")
          ? []
          : ["payment_status"],

      reason:
        hasField("payment_status")
          ? "Payment status is available."
          : "Payment status data is not available."
    },


    // ----------------------------------------------
    // GATEWAY COST
    // ----------------------------------------------

    gatewayCost: {

      label: "Gateway Cost",

      available:
        hasField("gateway_fee"),

      requiredFields: [
        "gateway_fee"
      ],

      missingFields:
        hasField("gateway_fee")
          ? []
          : ["gateway_fee"],

      reason:
        hasField("gateway_fee")
          ? "Gateway fee data is available."
          : "Gateway fee data is not available."
    },


    // ----------------------------------------------
    // COUPON ANALYSIS
    // ----------------------------------------------

    couponAnalysis: {

      label: "Coupon Analysis",

      available:
        hasField("coupon_code") &&
        hasField("discount"),

      requiredFields: [
        "coupon_code",
        "discount"
      ],

      missingFields: [

        ...(
          hasField("coupon_code")
            ? []
            : ["coupon_code"]
        ),

        ...(
          hasField("discount")
            ? []
            : ["discount"]
        )
      ],

      reason:
        hasField("coupon_code") &&
        hasField("discount")
          ? "Coupon and discount data are available."
          : "Coupon analysis requires coupon and discount information."
    }
  };


  // ====================================================
  // SUMMARY
  // ====================================================

  const analysisList =
    Object.values(analyses);

  const availableCount =
    analysisList.filter(
      analysis =>
        analysis.available
    ).length;

  const readinessScore =
    analysisList.length === 0
      ? 0
      : (
          availableCount /
          analysisList.length
        ) * 100;


  return {

    analyses,

    availableCount,

    totalAnalyses:
      analysisList.length,

    readinessScore:
      Number(
        readinessScore.toFixed(1)
      )
  };
}

// --------------------------------------------------
// 18. COMPLETE NORMALIZATION PIPELINE
// --------------------------------------------------

export function normalizeMerchantData(rows) {
  if (!Array.isArray(rows) || rows.length === 0) {
    return {
      success: false,
      normalizedData: [],
      mappings: [],
      missingFields: [],
      validationIssues: [],
      quality: {
        score: 0,
        completeness: 0,
        validity: 0,
        mappingConfidence: 0,
      },
      message: "No merchant data was provided.",
    };
  }

  const mappings = detectMappings(rows);

  const missingFields =
    detectMissingFields(mappings);

  const normalizedData =
    normalizeDataset(rows, mappings);

  const validationIssues =
    validateDataset(normalizedData);

  const quality =
    calculateDataQuality(
      normalizedData,
      mappings,
      validationIssues
    );

  const financialReadiness =
  getFinancialDataReadiness(
    normalizedData
  );  

  return {
    success: true,
    normalizedData,
    mappings,
    missingFields,
    validationIssues,
    financialReadiness,
    quality,
  };
}
