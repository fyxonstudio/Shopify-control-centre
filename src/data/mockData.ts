import {
  SystemService,
  WhatsAppConversation,
  OrderRecord,
  WorkflowItem,
  CartRecoveryItem,
  ProductCatalogItem,
  SystemAlert,
  ExecutionLog,
  TeamMember,
  TeamActivityLog,
  AuditEvent
} from '../types';

export const MOCK_KPIS = {
  ordersToday: { value: 42, change: '+18.4%', period: 'vs previous period', trend: 'up' },
  whatsappConversations: { value: 186, change: '+24.7%', period: 'vs yesterday', trend: 'up' },
  aiHandled: { value: 153, rate: '82.3% automation rate', period: '153 of 186 chats', trend: 'up' },
  humanHandoffs: { value: 21, change: '-8.2%', period: 'Escalations resolved', trend: 'down' },
  cartRecovery: { value: 8, recoveredAmount: 'PKR 94,500', period: '25.8% recovery rate', trend: 'up' },
  automationErrors: { value: 3, label: 'Needs attention', period: '1 critical, 2 warnings', trend: 'down' }
};

export const MOCK_FUNNEL = [
  { step: 'WhatsApp Customer Request', count: 186, percentage: 100, dropoff: 'Initial incoming inquiry', icon: 'MessageSquare' },
  { step: 'Product Identified', count: 178, percentage: 95.7, dropoff: '-8 uncataloged queries', icon: 'Sparkles' },
  { step: 'Variant Validated', count: 171, percentage: 91.9, dropoff: '-7 invalid size/color combos', icon: 'Sliders' },
  { step: 'Inventory Available', count: 159, percentage: 85.5, dropoff: '-12 out-of-stock items', icon: 'Boxes' },
  { step: 'Address Collected', count: 151, percentage: 81.2, dropoff: '-8 customer dropped before address', icon: 'MapPin' },
  { step: 'Address Confirmed', count: 143, percentage: 76.8, dropoff: '-8 unconfirmed or invalid delivery zones', icon: 'CheckCircle2' },
  { step: 'Shopify Orders Created', count: 139, percentage: 74.7, dropoff: '-4 payment or cart lockouts', icon: 'ShoppingBag' }
];

export const MOCK_SERVICES: SystemService[] = [
  {
    id: 'srv-whatsapp',
    name: 'WhatsApp Cloud API',
    category: 'API',
    status: 'operational',
    uptime: '99.97%',
    latencyMs: 94,
    lastChecked: '4 sec ago',
    details: 'Webhook responding · Meta Graph v19.0 · Token Active',
    failures24h: 0
  },
  {
    id: 'srv-shopify',
    name: 'Shopify Storefront & Admin API',
    category: 'API',
    status: 'operational',
    uptime: '99.99%',
    latencyMs: 184,
    lastChecked: '12 sec ago',
    details: 'API latency 184 ms · Webhook subscription healthy',
    failures24h: 1
  },
  {
    id: 'srv-n8n',
    name: 'n8n Automation Engine',
    category: 'Engine',
    status: 'operational',
    uptime: '99.98%',
    latencyMs: 38,
    lastChecked: '10 sec ago',
    details: 'Last execution 38 sec ago · 8 active workflows',
    failures24h: 2
  },
  {
    id: 'srv-ai',
    name: 'AI Agent (Millilegacy Intelligent Core)',
    category: 'Intelligence',
    status: 'operational',
    uptime: '99.95%',
    latencyMs: 420,
    lastChecked: '8 sec ago',
    details: 'Model latency ~420ms · Intent confidence 98.4%',
    failures24h: 0
  },
  {
    id: 'srv-webhooks',
    name: 'Webhooks Ingestion Bus',
    category: 'Service',
    status: 'operational',
    uptime: '99.99%',
    latencyMs: 18,
    lastChecked: '3 sec ago',
    details: 'Ingress throughput 42 req/min · Buffer 0%',
    failures24h: 0
  },
  {
    id: 'srv-db',
    name: 'Supabase / PostgreSQL Database',
    category: 'Database',
    status: 'operational',
    uptime: '99.99%',
    latencyMs: 24,
    lastChecked: '15 sec ago',
    details: 'Connection pool 14/100 · Read replica in sync',
    failures24h: 0
  },
  {
    id: 'srv-monitoring',
    name: 'Millilegacy Health Monitoring Daemon',
    category: 'Service',
    status: 'operational',
    uptime: '100.00%',
    latencyMs: 12,
    lastChecked: '2 sec ago',
    details: 'Real-time telemetry heartbeat OK',
    failures24h: 0
  }
];

export const MOCK_WORKFLOWS: WorkflowItem[] = [
  {
    id: 'wf-1',
    name: 'WhatsApp Order Confirmation',
    description: 'Validates customer affirmative response and triggers automated Shopify order payload.',
    status: 'Active',
    lastRun: '38 sec ago',
    successRate: 99.2,
    averageRuntime: '2.4s',
    executionsToday: 248,
    failuresToday: 2,
    nodes: [
      { id: 'n-1', title: 'WhatsApp Webhook (Confirmation)', type: 'trigger', system: 'WhatsApp', status: 'success', avgTime: '120ms', lastRun: '38s ago', description: 'Receives affirmative customer reply to address confirmation prompt' },
      { id: 'n-2', title: 'Address & Inventory Re-lock', type: 'validation', system: 'n8n', status: 'success', avgTime: '340ms', lastRun: '38s ago', description: 'Verifies stock allocation hold in temporary cache' },
      { id: 'n-3', title: 'Create Shopify Draft & Push Order', type: 'integration', system: 'Shopify', status: 'success', avgTime: '820ms', lastRun: '37s ago', description: 'POST /admin/api/2024-01/orders.json with tags ["whatsapp-ai", "address-verified"]' },
      { id: 'n-4', title: 'Send WhatsApp Order Receipt', type: 'integration', system: 'WhatsApp', status: 'success', avgTime: '380ms', lastRun: '36s ago', description: 'Sends confirmed order ID with tracking & ETA to customer' }
    ]
  },
  {
    id: 'wf-2',
    name: 'WhatsApp AI Sales Agent',
    description: 'Autonomous conversational assistant parsing Urdu & English product requests, variants, and stock checks.',
    status: 'Active',
    lastRun: '12 sec ago',
    successRate: 97.8,
    averageRuntime: '2.8s',
    executionsToday: 642,
    failuresToday: 14,
    lastError: 'Shopify API rate spike (retried successfully)',
    nodes: [
      { id: 'n-21', title: 'Incoming WhatsApp Message', type: 'trigger', system: 'WhatsApp', status: 'success', avgTime: '90ms', lastRun: '12s ago', description: 'Ingests raw text or catalog attachment' },
      { id: 'n-22', title: 'AI Intent & Entity Parsing', type: 'ai', system: 'AI Agent', status: 'success', avgTime: '520ms', lastRun: '12s ago', description: 'Extracts product request, color, size, urgency from Urdu/Roman Urdu' },
      { id: 'n-23', title: 'Product Identification', type: 'validation', system: 'Shopify', status: 'success', avgTime: '280ms', lastRun: '11s ago', description: 'Matches fuzzy product title against Shopify catalog' },
      { id: 'n-24', title: 'Variant & Inventory Check', type: 'validation', system: 'Shopify', status: 'success', avgTime: '310ms', lastRun: '11s ago', description: 'Validates exact SKU availability and stock thresholds' },
      { id: 'n-25', title: 'Address Collection Prompt', type: 'ai', system: 'AI Agent', status: 'success', avgTime: '450ms', lastRun: '10s ago', description: 'Requests formatted customer shipping address' },
      { id: 'n-26', title: 'Address Confirmation ("Kya ye theek hai?")', type: 'condition', system: 'WhatsApp', status: 'success', avgTime: '150ms', lastRun: '10s ago', description: 'Sends standardized confirmation card' },
      { id: 'n-27', title: 'Shopify Order Creation', type: 'integration', system: 'Shopify', status: 'success', avgTime: '790ms', lastRun: '9s ago', description: 'Finalizes order creation in Shopify admin' },
      { id: 'n-28', title: 'WhatsApp Receipt Dispatch', type: 'integration', system: 'WhatsApp', status: 'success', avgTime: '210ms', lastRun: '9s ago', description: 'Dispatches confirmation card with order tracking' }
    ]
  },
  {
    id: 'wf-3',
    name: 'Product & Inventory Validation',
    description: 'Instant SKU, variant and real-time inventory query engine before confirming order feasibility.',
    status: 'Active',
    lastRun: '1 min ago',
    successRate: 99.6,
    averageRuntime: '1.2s',
    executionsToday: 512,
    failuresToday: 2,
    nodes: [
      { id: 'n-31', title: 'SKU / Variant Lookup', type: 'trigger', system: 'n8n', status: 'success', avgTime: '140ms', lastRun: '1m ago', description: 'Queries product graph by SKU or option matrix' },
      { id: 'n-32', title: 'Shopify Inventory Level Query', type: 'integration', system: 'Shopify', status: 'success', avgTime: '290ms', lastRun: '1m ago', description: 'Checks location-specific physical available quantity' },
      { id: 'n-33', title: 'Alternative Variant Suggestion Engine', type: 'ai', system: 'AI Agent', status: 'success', avgTime: '480ms', lastRun: '1m ago', description: 'If stock == 0, finds closest matching color/size with positive stock' }
    ]
  },
  {
    id: 'wf-4',
    name: 'Address Confirmation',
    description: 'Parses Pakistani postal patterns, sends verification card, and updates records before order submission.',
    status: 'Active',
    lastRun: '45 sec ago',
    successRate: 98.9,
    averageRuntime: '1.9s',
    executionsToday: 184,
    failuresToday: 2,
    nodes: [
      { id: 'n-41', title: 'Address Extraction', type: 'trigger', system: 'AI Agent', status: 'success', avgTime: '310ms', lastRun: '45s ago', description: 'Parses House, Street, Sector/Phase, City' },
      { id: 'n-42', title: 'Standardize & Format', type: 'validation', system: 'n8n', status: 'success', avgTime: '80ms', lastRun: '45s ago', description: 'Formats address for TCS/Leopards Courier compliance' },
      { id: 'n-43', title: 'Send Confirmation Prompt', type: 'integration', system: 'WhatsApp', status: 'success', avgTime: '220ms', lastRun: '44s ago', description: 'Sends "Kya ye address theek hai?" interactive quick reply' }
    ]
  },
  {
    id: 'wf-5',
    name: 'Cart Abandonment Recovery',
    description: 'Monitors Shopify checkouts abandoned >30 mins, calculates dynamic discounts, and sends WhatsApp recovery prompts.',
    status: 'Active',
    lastRun: '3 min ago',
    successRate: 96.4,
    averageRuntime: '3.1s',
    executionsToday: 92,
    failuresToday: 3,
    nodes: [
      { id: 'n-51', title: 'Shopify Abandoned Checkout Webhook', type: 'trigger', system: 'Shopify', status: 'success', avgTime: '110ms', lastRun: '3m ago', description: 'Ingests abandoned checkouts with phone number' },
      { id: 'n-52', title: 'Eligibility & Cool-off Guard', type: 'validation', system: 'n8n', status: 'success', avgTime: '180ms', lastRun: '3m ago', description: 'Ensures no reminder sent in past 7 days' },
      { id: 'n-53', title: 'Generate Dynamic Recovery Code', type: 'integration', system: 'Shopify', status: 'success', avgTime: '420ms', lastRun: '3m ago', description: 'Generates 5% or free shipping discount token' },
      { id: 'n-54', title: 'WhatsApp Personalized Recovery Message', type: 'integration', system: 'WhatsApp', status: 'success', avgTime: '310ms', lastRun: '3m ago', description: 'Sends visual product reminder with 1-tap checkout link' }
    ]
  },
  {
    id: 'wf-6',
    name: 'Catalog Sync',
    description: 'Synchronizes Shopify collection updates, price modifications, and stock states to WhatsApp Catalog.',
    status: 'Active',
    lastRun: '2 hours ago',
    successRate: 100.0,
    averageRuntime: '14.8s',
    executionsToday: 12,
    failuresToday: 0,
    nodes: [
      { id: 'n-61', title: 'Scheduled Sync Trigger', type: 'trigger', system: 'n8n', status: 'success', avgTime: '40ms', lastRun: '2h ago', description: 'Hourly cron trigger' },
      { id: 'n-62', title: 'Shopify Products Diff Pull', type: 'integration', system: 'Shopify', status: 'success', avgTime: '3.2s', lastRun: '2h ago', description: 'Pulls updated inventory & prices' },
      { id: 'n-63', title: 'Meta Commerce Catalog Batch Update', type: 'integration', system: 'WhatsApp', status: 'success', avgTime: '4.8s', lastRun: '2h ago', description: 'Pushes inventory and pricing to Meta Catalog' }
    ]
  },
  {
    id: 'wf-7',
    name: 'Human Handoff',
    description: 'Detects customer frustration, complex sizing requirements, or manual escalation requests and routes to human rep.',
    status: 'Active',
    lastRun: '14 min ago',
    successRate: 98.4,
    averageRuntime: '1.1s',
    executionsToday: 21,
    failuresToday: 0,
    nodes: [
      { id: 'n-71', title: 'Sentiment or Keyword Escalation', type: 'trigger', system: 'AI Agent', status: 'success', avgTime: '210ms', lastRun: '14m ago', description: 'Detects "talk to human", "agent please", or repeated negation' },
      { id: 'n-72', title: 'Pause AI Auto-Response', type: 'validation', system: 'n8n', status: 'success', avgTime: '90ms', lastRun: '14m ago', description: 'Locks conversation for human takeover' },
      { id: 'n-73', title: 'Slack / Dashboard Team Alert', type: 'integration', system: 'Internal', status: 'success', avgTime: '180ms', lastRun: '14m ago', description: 'Notifies on-duty agent with customer context' }
    ]
  },
  {
    id: 'wf-8',
    name: 'Monitoring & Health Check',
    description: 'Periodic ping against Shopify Admin, Meta Graph API, Supabase connection pool, and webhook ingest queue.',
    status: 'Active',
    lastRun: '10 sec ago',
    successRate: 99.9,
    averageRuntime: '0.8s',
    executionsToday: 1440,
    failuresToday: 1,
    nodes: [
      { id: 'n-81', title: 'Heartbeat Cron (60s)', type: 'trigger', system: 'Internal', status: 'success', avgTime: '10ms', lastRun: '10s ago', description: 'Continuous ping cycle' },
      { id: 'n-82', title: 'Ping External Services', type: 'integration', system: 'Internal', status: 'success', avgTime: '420ms', lastRun: '10s ago', description: 'Measures roundtrip latency across 6 endpoints' }
    ]
  }
];

export const MOCK_CONVERSATIONS: WhatsAppConversation[] = [
  {
    id: 'conv-101',
    customerName: 'Ahmed Khan',
    customerPhone: '0300-XXX-1234',
    status: 'Order Confirmed',
    handler: 'AI',
    lastMessage: 'Thank you. Your order #FY-10482 has been confirmed!',
    lastMessageTime: '10:36 PM',
    intent: 'Purchase',
    productInterest: 'Premium Cotton Shirt (Black / XL)',
    orderId: '#FY-10482',
    orderStatus: 'Confirmed',
    assignedAgent: 'Millilegacy AI Core',
    messages: [
      { id: 'm-1', sender: 'customer', text: 'Salam, mujhe ye black shirt XL size mein chahiye.', timestamp: '10:32 PM' },
      { id: 'm-2', sender: 'ai', text: 'Walaikum Assalam Ahmed! Let me check the real-time availability in our Shopify store right away.', timestamp: '10:32 PM' },
      { id: 'm-3', sender: 'system', text: 'Product identified: Premium Cotton Shirt (SKU: PCS-BLK)', timestamp: '10:32 PM', meta: { type: 'product_detected', productName: 'Premium Cotton Shirt', sku: 'PCS-BLK' } },
      { id: 'm-4', sender: 'system', text: 'Variant validated: Black / XL | Shopify Inventory Available: 7 in stock', timestamp: '10:33 PM', meta: { type: 'inventory', variant: 'Black / XL', inventory: 7 } },
      { id: 'm-5', sender: 'ai', text: 'Ji Ahmed, Black / XL available hai (7 pieces in stock). Price PKR 5,999 with Free Cash on Delivery. Would you like me to book this for you?', timestamp: '10:34 PM' },
      { id: 'm-6', sender: 'customer', text: 'Haan book kardo please, COD par.', timestamp: '10:34 PM' },
      { id: 'm-7', sender: 'ai', text: 'Great! Order confirm karne se pehle apna delivery address check kar lein:\n\n📍 House 42, Street 12, Phase 5, DHA, Lahore\n\nKya ye address theek hai?', timestamp: '10:35 PM', meta: { type: 'address_prompt' } },
      { id: 'm-8', sender: 'customer', text: 'Yes, ye address theek hai bilkul.', timestamp: '10:36 PM' },
      { id: 'm-9', sender: 'system', text: 'Address Confirmed by customer via affirmative keyword', timestamp: '10:36 PM', meta: { type: 'address_confirmed' } },
      { id: 'm-10', sender: 'shopify', text: 'Shopify order created: #FY-10482 | Total: PKR 5,999 | Payment: COD', timestamp: '10:36 PM', meta: { type: 'shopify_order_created', orderId: '#FY-10482', amount: 'PKR 5,999' } },
      { id: 'm-11', sender: 'ai', text: 'Zabardast! Your order #FY-10482 has been confirmed. Expected delivery within 2-3 business days via TCS Courier. Shukriya for shopping with Millilegacy!', timestamp: '10:36 PM' }
    ]
  },
  {
    id: 'conv-102',
    customerName: 'Fatima Noor',
    customerPhone: '0321-XXX-8890',
    status: 'Human Handoff',
    handler: 'Human',
    lastMessage: 'Ahmed (Support) joined the chat to assist with custom alterations.',
    lastMessageTime: '10:28 PM',
    intent: 'Support',
    productInterest: 'Embroidered Silk Kurti (Navy / M)',
    assignedAgent: 'Ahmed (Senior Agent)',
    messages: [
      { id: 'm-201', sender: 'customer', text: 'Kya is kurti mein sleeves 22 inches tak alter ho sakti hain?', timestamp: '10:25 PM' },
      { id: 'm-202', sender: 'ai', text: 'Standard sizes mein sleeves 20 inches hain. Let me immediately connect you with our customization team specialist who can confirm custom tailoring.', timestamp: '10:26 PM' },
      { id: 'm-203', sender: 'system', text: 'Sentiment / Query Complexity triggered Human Handoff workflow (wf-7)', timestamp: '10:26 PM', meta: { type: 'handoff' } },
      { id: 'm-204', sender: 'team', senderName: 'Ahmed Khan (Support)', text: 'Salam Fatima ji! Main tailoring department se check kar raha hoon, 5 minutes mein batata hoon.', timestamp: '10:28 PM' }
    ]
  },
  {
    id: 'conv-103',
    customerName: 'Bilal Tariq',
    customerPhone: '0333-XXX-4512',
    status: 'Order Pending',
    handler: 'AI',
    lastMessage: 'Waiting for address confirmation from customer.',
    lastMessageTime: '10:15 PM',
    intent: 'Purchase',
    productInterest: 'Oxford Button Down (White / L)',
    assignedAgent: 'Millilegacy AI Core',
    messages: [
      { id: 'm-301', sender: 'customer', text: 'White shirt L size ka price kya hai?', timestamp: '10:12 PM' },
      { id: 'm-302', sender: 'ai', text: 'White / L Oxford Button Down PKR 4,499 ka hai. Available in stock!', timestamp: '10:13 PM' },
      { id: 'm-303', sender: 'customer', text: 'Bhej dein F-7/2 Islamabad flat 4', timestamp: '10:14 PM' },
      { id: 'm-304', sender: 'ai', text: 'Order submit karne se pehle please confirm karein:\n\n📍 Flat 4, Street 18, Sector F-7/2, Islamabad\n\nKya ye delivery address bilkul theek hai?', timestamp: '10:15 PM', meta: { type: 'address_prompt' } }
    ]
  },
  {
    id: 'conv-104',
    customerName: 'Zainab Malik',
    customerPhone: '0345-XXX-9901',
    status: 'AI Handling',
    handler: 'AI',
    lastMessage: 'Suggested alternative size Medium as Small is out of stock.',
    lastMessageTime: '10:04 PM',
    intent: 'Catalog Inquiry',
    productInterest: 'Linen Summer Co-ord (Beige / S)',
    assignedAgent: 'Millilegacy AI Core',
    messages: [
      { id: 'm-401', sender: 'customer', text: 'Beige Co-ord set small size available hai?', timestamp: '10:02 PM' },
      { id: 'm-402', sender: 'system', text: 'Variant Checked: Beige / S → Shopify Inventory: 0 (OUT OF STOCK)', timestamp: '10:03 PM', meta: { type: 'inventory', variant: 'Beige / S', inventory: 0 } },
      { id: 'm-403', sender: 'ai', text: 'Beige / Small filhaal out of stock hai. Lekin Beige / Medium hamare paas 4 pieces available hain jo relaxed fit mein perfect aayega. Would you like to check the measurements?', timestamp: '10:04 PM' }
    ]
  },
  {
    id: 'conv-105',
    customerName: 'Usman Ali',
    customerPhone: '0312-XXX-7765',
    status: 'Order Confirmed',
    handler: 'AI + Team',
    lastMessage: 'Address updated by Ali (Agent) and confirmed for #FY-10479.',
    lastMessageTime: '09:48 PM',
    intent: 'Address Confirmation',
    productInterest: 'Classic Chino Pant (Khaki / 34)',
    orderId: '#FY-10479',
    orderStatus: 'Confirmed',
    assignedAgent: 'Ali (Agent)',
    messages: [
      { id: 'm-501', sender: 'customer', text: 'Mera address update karke phase 6 karna hai.', timestamp: '09:42 PM' },
      { id: 'm-502', sender: 'team', senderName: 'Ali Raza (Agent)', text: 'No problem Usman bhai! Apna new address share karein.', timestamp: '09:44 PM' },
      { id: 'm-503', sender: 'customer', text: 'House 88-B, Street 9, Phase 6, DHA Lahore', timestamp: '09:45 PM' },
      { id: 'm-504', sender: 'system', text: 'Address updated by Ali (Agent) → Status Confirmed', timestamp: '09:46 PM', meta: { type: 'address_confirmed' } },
      { id: 'm-505', sender: 'shopify', text: 'Order #FY-10479 shipping address updated in Shopify', timestamp: '09:48 PM', meta: { type: 'shopify_order_created', orderId: '#FY-10479', amount: 'PKR 4,850' } }
    ]
  },
  {
    id: 'conv-106',
    customerName: 'Hira Siddiqui',
    customerPhone: '0302-XXX-3321',
    status: 'Resolved',
    handler: 'AI',
    lastMessage: 'Tracking link dispatched for courier delivery.',
    lastMessageTime: '09:30 PM',
    intent: 'Order Status',
    productInterest: 'Floral Print Maxi Dress (Rose / L)',
    orderId: '#FY-10468',
    orderStatus: 'Shipped',
    assignedAgent: 'Millilegacy AI Core',
    messages: [
      { id: 'm-601', sender: 'customer', text: 'Mera order #FY-10468 kab deliver hoga?', timestamp: '09:28 PM' },
      { id: 'm-602', sender: 'ai', text: 'Apka order #FY-10468 kal dispatch ho chuka hai via Leopards Courier. Tracking number: LPC-994821. Expected delivery: Kal dopeher tak.', timestamp: '09:30 PM' }
    ]
  }
];

export const MOCK_ORDERS: OrderRecord[] = [
  {
    id: '#FY-10482',
    customerName: 'Ahmed Khan',
    customerPhone: '0300-XXX-1234',
    productTitle: 'Premium Cotton Shirt',
    variantTitle: 'Black / XL',
    sku: 'PCS-BLK-XL',
    quantity: 1,
    amountPKR: 5999,
    source: 'WhatsApp',
    addressStatus: 'Confirmed',
    paymentMethod: 'COD',
    orderStatus: 'Confirmed',
    createdAt: '10:36 PM',
    assignedTo: 'AI',
    deliveryAddress: {
      formatted: 'House 42, Street 12, Phase 5, DHA, Lahore',
      houseStreet: 'House 42, Street 12',
      area: 'Phase 5, DHA',
      city: 'Lahore',
      postalCode: '54000'
    },
    validationHistory: {
      productIdentified: true,
      variantValidated: true,
      inventoryChecked: true,
      addressConfirmed: true,
      shopifyOrderPushed: true,
      shopifyOrderNumber: 'SH-99281'
    },
    timeline: [
      { title: 'WhatsApp request received', time: '10:32 PM', actor: 'Customer', description: 'Customer inquired for Black Shirt XL', completed: true },
      { title: 'Product identified & mapped', time: '10:32 PM', actor: 'AI Agent', description: 'Matched to Premium Cotton Shirt (PCS-BLK)', completed: true },
      { title: 'Shopify inventory verified', time: '10:33 PM', actor: 'System', description: '7 units available in central warehouse', completed: true },
      { title: 'Address requested & verified', time: '10:35 PM', actor: 'AI Agent', description: 'Formatted address presented for confirmation', completed: true },
      { title: 'Customer confirmed address', time: '10:36 PM', actor: 'Customer', description: 'Replied: "Yes, ye address theek hai bilkul"', completed: true },
      { title: 'Shopify order created', time: '10:36 PM', actor: 'Shopify', description: 'Draft finalized into Order #FY-10482 (SH-99281)', completed: true },
      { title: 'WhatsApp receipt dispatched', time: '10:36 PM', actor: 'AI Agent', description: 'Receipt card sent with tracking details', completed: true }
    ]
  },
  {
    id: '#FY-10481',
    customerName: 'Kamran Ashraf',
    customerPhone: '0322-XXX-9988',
    productTitle: 'Denim Trucker Jacket',
    variantTitle: 'Indigo / M',
    sku: 'DTJ-IND-M',
    quantity: 1,
    amountPKR: 8499,
    source: 'WhatsApp',
    addressStatus: 'Confirmed',
    paymentMethod: 'COD',
    orderStatus: 'Processing',
    createdAt: '10:18 PM',
    assignedTo: 'AI',
    deliveryAddress: {
      formatted: 'Apartment 402, Al-Razi Heights, Gulberg III, Lahore',
      houseStreet: 'Apt 402, Al-Razi Heights',
      area: 'Gulberg III',
      city: 'Lahore',
      postalCode: '54660'
    },
    validationHistory: {
      productIdentified: true,
      variantValidated: true,
      inventoryChecked: true,
      addressConfirmed: true,
      shopifyOrderPushed: true,
      shopifyOrderNumber: 'SH-99280'
    },
    timeline: [
      { title: 'WhatsApp request received', time: '10:14 PM', actor: 'Customer', description: 'Customer sent catalog product link', completed: true },
      { title: 'Product & SKU verified', time: '10:15 PM', actor: 'AI Agent', description: 'Matched to Denim Trucker Jacket - Indigo M', completed: true },
      { title: 'Inventory validated', time: '10:15 PM', actor: 'System', description: '4 units available', completed: true },
      { title: 'Address confirmed by customer', time: '10:17 PM', actor: 'Customer', description: 'Confirmed via 1-tap quick button', completed: true },
      { title: 'Shopify order pushed', time: '10:18 PM', actor: 'Shopify', description: 'Order created with auto-tagging', completed: true }
    ]
  },
  {
    id: '#FY-10480',
    customerName: 'Maryam Safdar',
    customerPhone: '0311-XXX-2234',
    productTitle: 'Chiffon Evening Dupatta',
    variantTitle: 'Emerald / Free Size',
    sku: 'CED-EMR-FS',
    quantity: 2,
    amountPKR: 4500,
    source: 'Website',
    addressStatus: 'Confirmed',
    paymentMethod: 'Card',
    orderStatus: 'Shipped',
    createdAt: '09:55 PM',
    assignedTo: 'Sara',
    deliveryAddress: {
      formatted: 'Bungalow 14/B, Block 4, Clifton, Karachi',
      houseStreet: 'Bungalow 14/B',
      area: 'Block 4, Clifton',
      city: 'Karachi',
      postalCode: '75600'
    },
    validationHistory: {
      productIdentified: true,
      variantValidated: true,
      inventoryChecked: true,
      addressConfirmed: true,
      shopifyOrderPushed: true,
      shopifyOrderNumber: 'SH-99279'
    },
    timeline: [
      { title: 'Shopify storefront checkout', time: '09:50 PM', actor: 'Customer', description: 'Direct web order via Stripe card', completed: true },
      { title: 'WhatsApp receipt mirrored', time: '09:55 PM', actor: 'AI Agent', description: 'Sent status confirmation via WhatsApp', completed: true }
    ]
  },
  {
    id: '#FY-10479',
    customerName: 'Usman Ali',
    customerPhone: '0312-XXX-7765',
    productTitle: 'Classic Chino Pant',
    variantTitle: 'Khaki / 34',
    sku: 'CCP-KHK-34',
    quantity: 1,
    amountPKR: 4850,
    source: 'WhatsApp',
    addressStatus: 'Updated',
    paymentMethod: 'COD',
    orderStatus: 'Confirmed',
    createdAt: '09:48 PM',
    assignedTo: 'Ali',
    deliveryAddress: {
      formatted: 'House 88-B, Street 9, Phase 6, DHA, Lahore',
      houseStreet: 'House 88-B, Street 9',
      area: 'Phase 6, DHA',
      city: 'Lahore',
      postalCode: '54000',
      correctedFrom: 'House 12, Old Anarkali, Lahore'
    },
    validationHistory: {
      productIdentified: true,
      variantValidated: true,
      inventoryChecked: true,
      addressConfirmed: true,
      shopifyOrderPushed: true,
      shopifyOrderNumber: 'SH-99278'
    },
    timeline: [
      { title: 'Initial address rejected by customer', time: '09:42 PM', actor: 'Customer', description: 'Customer said "Mera address update karna hai"', completed: true },
      { title: 'Agent Ali took over address update', time: '09:44 PM', actor: 'Team', description: 'Updated address to Phase 6 DHA', completed: true },
      { title: 'Address verified & locked', time: '09:46 PM', actor: 'System', description: 'Address standard validated', completed: true },
      { title: 'Order pushed to Shopify', time: '09:48 PM', actor: 'Shopify', description: 'Order #FY-10479 created', completed: true }
    ]
  },
  {
    id: '#FY-10478',
    customerName: 'Saad Farooq',
    customerPhone: '0334-XXX-5521',
    productTitle: 'Oversized Streetwear Hoodie',
    variantTitle: 'Charcoal / L',
    sku: 'OSH-CHR-L',
    quantity: 1,
    amountPKR: 6200,
    source: 'WhatsApp',
    addressStatus: 'Waiting for Confirmation',
    paymentMethod: 'COD',
    orderStatus: 'Address Confirmation',
    createdAt: '09:35 PM',
    assignedTo: 'AI',
    deliveryAddress: {
      formatted: 'House 19, Sector G-11/3, Islamabad',
      houseStreet: 'House 19, Sector G-11/3',
      area: 'G-11/3',
      city: 'Islamabad'
    },
    validationHistory: {
      productIdentified: true,
      variantValidated: true,
      inventoryChecked: true,
      addressConfirmed: false,
      shopifyOrderPushed: false
    },
    timeline: [
      { title: 'Product & Variant Validated', time: '09:32 PM', actor: 'AI Agent', description: 'Stock 11 units available', completed: true },
      { title: 'Address Prompt Dispatched', time: '09:35 PM', actor: 'AI Agent', description: 'Prompt sent: "Kya ye address theek hai?"', completed: false }
    ]
  }
];

export const MOCK_CART_RECOVERIES: CartRecoveryItem[] = [
  {
    id: 'cr-1',
    customerName: 'Zubair Qureshi',
    customerPhone: '0301-XXX-8721',
    cartItems: 'Premium Cotton Shirt (Navy / L) x 1',
    cartValuePKR: 5999,
    checkoutCreatedAt: '3 hours ago',
    reminderSentAt: '2 hours ago',
    reminderCount: 1,
    status: 'Recovered',
    recoveredRevenuePKR: 5999,
    discountCodeOffered: 'SAVE5-WA',
    notes: 'Converted 18 mins after WhatsApp reminder'
  },
  {
    id: 'cr-2',
    customerName: 'Ayesha Mehmood',
    customerPhone: '0321-XXX-1199',
    cartItems: 'Embroidered Silk Kurti + Chiffon Dupatta',
    cartValuePKR: 12400,
    checkoutCreatedAt: '4 hours ago',
    reminderSentAt: '3 hours ago',
    reminderCount: 1,
    status: 'Recovered',
    recoveredRevenuePKR: 12400,
    discountCodeOffered: 'FREESHIP-WA',
    notes: 'Completed checkout with Free Shipping code'
  },
  {
    id: 'cr-3',
    customerName: 'Hamza Sheikh',
    customerPhone: '0331-XXX-4402',
    cartItems: 'Denim Trucker Jacket (Indigo / XL)',
    cartValuePKR: 8499,
    checkoutCreatedAt: '5 hours ago',
    reminderSentAt: '4 hours ago',
    reminderCount: 2,
    status: 'Recovered',
    recoveredRevenuePKR: 8499,
    discountCodeOffered: 'RECOVER10',
    notes: 'Customer asked sizing question on WhatsApp, then purchased'
  },
  {
    id: 'cr-4',
    customerName: 'Rabia Basit',
    customerPhone: '0342-XXX-6631',
    cartItems: 'Oversized Streetwear Hoodie (Charcoal / M)',
    cartValuePKR: 6200,
    checkoutCreatedAt: '6 hours ago',
    reminderSentAt: '5 hours ago',
    reminderCount: 1,
    status: 'Recovered',
    recoveredRevenuePKR: 6200,
    discountCodeOffered: 'SAVE5-WA'
  },
  {
    id: 'cr-5',
    customerName: 'Noman Siddiqui',
    customerPhone: '0308-XXX-5520',
    cartItems: 'Leather Oxford Shoes (Brown / 42)',
    cartValuePKR: 14500,
    checkoutCreatedAt: '7 hours ago',
    reminderSentAt: '6 hours ago',
    reminderCount: 1,
    status: 'Recovered',
    recoveredRevenuePKR: 14500,
    discountCodeOffered: 'VIP-SHIP'
  },
  {
    id: 'cr-6',
    customerName: 'Taimoor Shah',
    customerPhone: '0315-XXX-7788',
    cartItems: 'Classic Chino Pant (Khaki / 32) x 2',
    cartValuePKR: 9700,
    checkoutCreatedAt: '8 hours ago',
    reminderSentAt: '7 hours ago',
    reminderCount: 1,
    status: 'Recovered',
    recoveredRevenuePKR: 9700,
    discountCodeOffered: 'SAVE5-WA'
  },
  {
    id: 'cr-7',
    customerName: 'Farah Naz',
    customerPhone: '0323-XXX-4411',
    cartItems: 'Formal Blazer (Navy / 38)',
    cartValuePKR: 18500,
    checkoutCreatedAt: '9 hours ago',
    reminderSentAt: '8 hours ago',
    reminderCount: 1,
    status: 'Recovered',
    recoveredRevenuePKR: 18500,
    discountCodeOffered: 'VIP-SHIP'
  },
  {
    id: 'cr-8',
    customerName: 'Danish Riaz',
    customerPhone: '0305-XXX-9922',
    cartItems: 'Polo T-Shirt (Maroon / L) x 3',
    cartValuePKR: 8702,
    checkoutCreatedAt: '10 hours ago',
    reminderSentAt: '9 hours ago',
    reminderCount: 1,
    status: 'Recovered',
    recoveredRevenuePKR: 8702,
    discountCodeOffered: 'SAVE5-WA'
  },
  {
    id: 'cr-9',
    customerName: 'Waleed Jameel',
    customerPhone: '0344-XXX-2210',
    cartItems: 'Casual Slip-on Loafers',
    cartValuePKR: 7200,
    checkoutCreatedAt: '45 mins ago',
    reminderSentAt: '15 mins ago',
    reminderCount: 1,
    status: 'Reminder Sent',
    discountCodeOffered: 'SAVE5-WA'
  },
  {
    id: 'cr-10',
    customerName: 'Mubeen Akhtar',
    customerPhone: '0313-XXX-8833',
    cartItems: 'Printed Silk Scarf (Burgundy)',
    cartValuePKR: 2800,
    checkoutCreatedAt: '25 mins ago',
    reminderSentAt: '-',
    reminderCount: 0,
    status: 'Reminder Pending'
  }
];

export const MOCK_PRODUCTS: ProductCatalogItem[] = [
  {
    id: 'prod-1',
    title: 'Premium Cotton Shirt',
    sku: 'PCS-BLK-XL',
    category: 'Apparel / Tops',
    color: 'Black',
    size: 'XL',
    pricePKR: 5999,
    inventoryCount: 7,
    status: 'In Stock',
    lastChecked: '12 sec ago',
    whatsappCatalogSynced: true
  },
  {
    id: 'prod-2',
    title: 'Premium Cotton Shirt',
    sku: 'PCS-BLK-L',
    category: 'Apparel / Tops',
    color: 'Black',
    size: 'L',
    pricePKR: 5999,
    inventoryCount: 14,
    status: 'In Stock',
    lastChecked: '12 sec ago',
    whatsappCatalogSynced: true
  },
  {
    id: 'prod-3',
    title: 'Premium Cotton Shirt',
    sku: 'PCS-WHT-M',
    category: 'Apparel / Tops',
    color: 'White',
    size: 'M',
    pricePKR: 5999,
    inventoryCount: 0,
    status: 'Out of Stock',
    lastChecked: '12 sec ago',
    whatsappCatalogSynced: true
  },
  {
    id: 'prod-4',
    title: 'Denim Trucker Jacket',
    sku: 'DTJ-IND-M',
    category: 'Outerwear',
    color: 'Indigo',
    size: 'M',
    pricePKR: 8499,
    inventoryCount: 4,
    status: 'Low Stock',
    lastChecked: '1 min ago',
    whatsappCatalogSynced: true
  },
  {
    id: 'prod-5',
    title: 'Classic Chino Pant',
    sku: 'CCP-KHK-34',
    category: 'Bottoms',
    color: 'Khaki',
    size: '34',
    pricePKR: 4850,
    inventoryCount: 9,
    status: 'In Stock',
    lastChecked: '4 min ago',
    whatsappCatalogSynced: true
  },
  {
    id: 'prod-6',
    title: 'Oversized Streetwear Hoodie',
    sku: 'OSH-CHR-L',
    category: 'Apparel / Streetwear',
    color: 'Charcoal',
    size: 'L',
    pricePKR: 6200,
    inventoryCount: 11,
    status: 'In Stock',
    lastChecked: '6 min ago',
    whatsappCatalogSynced: true
  },
  {
    id: 'prod-7',
    title: 'Embroidered Silk Kurti',
    sku: 'ESK-NVY-M',
    category: 'Women / Ethnic',
    color: 'Navy',
    size: 'M',
    pricePKR: 7900,
    inventoryCount: 2,
    status: 'Low Stock',
    lastChecked: '10 min ago',
    whatsappCatalogSynced: true
  }
];

export const MOCK_ALERTS: SystemAlert[] = [
  {
    id: 'alt-1',
    severity: 'critical',
    title: 'Shopify API request temporary throttle',
    description: '429 Too Many Requests response during batch inventory polling. Exponential backoff triggered.',
    timestamp: '10:52 PM',
    workflow: 'Product & Inventory Validation (wf-3)',
    node: 'Shopify Inventory Level Query',
    status: 'Open',
    retryAttempted: true,
    assignedTo: 'n8n Auto-Retry Engine',
    errorMessage: 'HTTP 429: Exceeded 40 calls per second bucket. Re-queued in priority lane.'
  },
  {
    id: 'alt-2',
    severity: 'warning',
    title: 'WhatsApp message delivery delayed',
    description: 'Meta Graph API reported delivery latency > 4,200ms for outbound confirmation message.',
    timestamp: '10:41 PM',
    workflow: 'WhatsApp AI Sales Agent (wf-2)',
    node: 'Address Confirmation ("Kya ye theek hai?")',
    status: 'Open',
    assignedTo: 'Webhook Relay',
    errorMessage: 'Carrier latency spike in Lahore region telecom routing.'
  },
  {
    id: 'alt-3',
    severity: 'info',
    title: 'Scheduled Catalog Sync Completed',
    description: 'Synced 184 product variants to Meta Commerce Catalog without discrepancies.',
    timestamp: '10:20 PM',
    workflow: 'Catalog Sync (wf-6)',
    node: 'Meta Commerce Catalog Batch Update',
    status: 'Resolved'
  },
  {
    id: 'alt-4',
    severity: 'resolved',
    title: 'AI Agent temporary timeout',
    description: 'Latency exceeded 2,500ms threshold during complex Roman Urdu entity parsing. Handled by fallback rule.',
    timestamp: '09:52 PM',
    workflow: 'WhatsApp AI Sales Agent (wf-2)',
    node: 'AI Intent & Entity Parsing',
    status: 'Resolved',
    retryAttempted: true
  }
];

export const MOCK_EXECUTION_LOGS: ExecutionLog[] = [
  {
    id: 'el-1',
    time: '10:36:21',
    workflow: 'WhatsApp AI Sales Agent',
    workflowId: 'wf-2',
    executionId: 'EX-93822',
    trigger: 'Webhook',
    duration: '2.8s',
    status: 'Success',
    payloadSize: '4.2 KB',
    nodesRunCount: 8
  },
  {
    id: 'el-2',
    time: '10:35:14',
    workflow: 'Address Confirmation',
    workflowId: 'wf-4',
    executionId: 'EX-93821',
    trigger: 'WhatsApp',
    duration: '1.9s',
    status: 'Success',
    payloadSize: '2.1 KB',
    nodesRunCount: 3
  },
  {
    id: 'el-3',
    time: '10:32:11',
    workflow: 'Shopify Order Creation',
    workflowId: 'wf-1',
    executionId: 'EX-93820',
    trigger: 'AI Agent',
    duration: '4.2s',
    status: 'Failed',
    error: 'Shopify API rate spike timeout (auto-retried)',
    payloadSize: '6.8 KB',
    nodesRunCount: 2
  },
  {
    id: 'el-4',
    time: '10:30:05',
    workflow: 'Product & Inventory Validation',
    workflowId: 'wf-3',
    executionId: 'EX-93819',
    trigger: 'WhatsApp',
    duration: '1.2s',
    status: 'Success',
    payloadSize: '1.8 KB',
    nodesRunCount: 3
  },
  {
    id: 'el-5',
    time: '10:28:40',
    workflow: 'Human Handoff',
    workflowId: 'wf-7',
    executionId: 'EX-93818',
    trigger: 'AI Agent',
    duration: '1.1s',
    status: 'Success',
    payloadSize: '3.4 KB',
    nodesRunCount: 3
  },
  {
    id: 'el-6',
    time: '10:25:00',
    workflow: 'Cart Abandonment Recovery',
    workflowId: 'wf-5',
    executionId: 'EX-93817',
    trigger: 'Shopify Webhook',
    duration: '3.1s',
    status: 'Success',
    payloadSize: '5.1 KB',
    nodesRunCount: 4
  }
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Ahmed Khan',
    email: 'ahmed@millilegacy.com',
    role: 'Admin',
    status: 'In Conversation',
    conversationsHandledToday: 14,
    ordersAssistedToday: 6,
    avgResponseTime: '2m 15s',
    lastActive: 'Just now',
    avatarBg: 'from-amber-600 to-amber-700'
  },
  {
    id: 'tm-2',
    name: 'Sara Siddiqui',
    email: 'sara@millilegacy.com',
    role: 'Manager',
    status: 'Active',
    conversationsHandledToday: 18,
    ordersAssistedToday: 7,
    avgResponseTime: '3m 10s',
    lastActive: '2m ago',
    avatarBg: 'from-yellow-500 to-amber-600'
  },
  {
    id: 'tm-3',
    name: 'Ali Raza',
    email: 'ali@millilegacy.com',
    role: 'Agent',
    status: 'In Conversation',
    conversationsHandledToday: 15,
    ordersAssistedToday: 5,
    avgResponseTime: '4m 05s',
    lastActive: 'Just now',
    avatarBg: 'from-amber-500 to-yellow-600'
  },
  {
    id: 'tm-4',
    name: 'Bilal Hassan',
    email: 'bilal@millilegacy.com',
    role: 'Agent',
    status: 'Active',
    conversationsHandledToday: 9,
    ordersAssistedToday: 3,
    avgResponseTime: '3m 45s',
    lastActive: '5m ago',
    avatarBg: 'from-amber-700 to-yellow-700'
  },
  {
    id: 'tm-5',
    name: 'Zoya Qasim',
    email: 'zoya@millilegacy.com',
    role: 'Agent',
    status: 'Active',
    conversationsHandledToday: 11,
    ordersAssistedToday: 4,
    avgResponseTime: '3m 20s',
    lastActive: '1m ago',
    avatarBg: 'from-yellow-600 to-amber-600'
  },
  {
    id: 'tm-6',
    name: 'Hamza Farooqi',
    email: 'hamza@millilegacy.com',
    role: 'Viewer',
    status: 'Offline',
    conversationsHandledToday: 0,
    ordersAssistedToday: 0,
    avgResponseTime: '-',
    lastActive: '3 hours ago',
    avatarBg: 'from-slate-600 to-slate-800'
  }
];

export const MOCK_TEAM_ACTIVITIES: TeamActivityLog[] = [
  {
    id: 'ta-1',
    teamMember: 'Ahmed Khan',
    action: 'Human Handoff',
    customer: 'Fatima Noor',
    orderId: '#ML-10482',
    time: '10:28 PM',
    status: 'In Progress',
    notes: 'Took over chat regarding custom sleeve measurements'
  },
  {
    id: 'ta-2',
    teamMember: 'Ali Raza',
    action: 'Address Updated',
    customer: 'Usman Ali',
    orderId: '#ML-10479',
    time: '10:25 PM',
    status: 'Success',
    notes: 'Updated delivery destination to Phase 6 DHA after customer correction'
  },
  {
    id: 'ta-3',
    teamMember: 'Sara Siddiqui',
    action: 'Conversation Resolved',
    customer: 'Hira Siddiqui',
    orderId: '#ML-10468',
    time: '10:18 PM',
    status: 'Completed',
    notes: 'Provided Leopards Courier tracking details and resolved inquiry'
  },
  {
    id: 'ta-4',
    teamMember: 'Bilal Hassan',
    action: 'Discount Applied',
    customer: 'Zubair Qureshi',
    orderId: '#ML-10475',
    time: '09:50 PM',
    status: 'Completed',
    notes: 'Manually verified abandoned checkout coupon SAVE5-WA'
  },
  {
    id: 'ta-5',
    teamMember: 'Zoya Qasim',
    action: 'Inventory Adjusted',
    customer: 'Catalog Audit',
    time: '09:30 PM',
    status: 'Completed',
    notes: 'Restocked 10 units of Oversized Streetwear Hoodie via Shopify Admin'
  }
];

export const MOCK_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: 'aud-1',
    timestamp: '10:36:21 PM',
    eventType: 'order_created',
    actor: 'System',
    actorName: 'Shopify Automation Engine',
    workflow: 'WhatsApp Order Confirmation (wf-1)',
    customer: 'Ahmed Khan',
    orderId: '#ML-10482',
    status: 'Success',
    details: 'Order #ML-10482 generated in Shopify. Total: PKR 5,999. Tags: ["whatsapp-ai", "address-verified"]'
  },
  {
    id: 'aud-2',
    timestamp: '10:36:02 PM',
    eventType: 'address_confirmed',
    actor: 'Customer',
    actorName: 'Ahmed Khan',
    workflow: 'Address Confirmation (wf-4)',
    customer: 'Ahmed Khan',
    status: 'Success',
    details: 'Customer verified formatted address: "House 42, Street 12, Phase 5, DHA, Lahore"'
  },
  {
    id: 'aud-3',
    timestamp: '10:35:14 PM',
    eventType: 'address_requested',
    actor: 'AI',
    actorName: 'Millilegacy AI Sales Agent',
    workflow: 'WhatsApp AI Sales Agent (wf-2)',
    customer: 'Ahmed Khan',
    status: 'Info',
    details: 'Dispatched standardized confirmation card: "Kya ye address theek hai?"'
  },
  {
    id: 'aud-4',
    timestamp: '10:33:45 PM',
    eventType: 'inventory_checked',
    actor: 'System',
    actorName: 'Product & Inventory Validator',
    workflow: 'Product & Inventory Validation (wf-3)',
    customer: 'Ahmed Khan',
    status: 'Success',
    details: 'SKU PCS-BLK-XL confirmed available. Stock: 7 units in central fulfillment hub.'
  },
  {
    id: 'aud-5',
    timestamp: '10:32:19 PM',
    eventType: 'variant_checked',
    actor: 'AI',
    actorName: 'Millilegacy AI Core',
    workflow: 'WhatsApp AI Sales Agent (wf-2)',
    customer: 'Ahmed Khan',
    status: 'Success',
    details: 'Extracted Color: Black, Size: XL from customer Urdu message "black shirt XL size mein"'
  },
  {
    id: 'aud-6',
    timestamp: '10:32:01 PM',
    eventType: 'customer_message',
    actor: 'Customer',
    actorName: 'Ahmed Khan',
    workflow: 'WhatsApp Ingestion',
    customer: 'Ahmed Khan',
    status: 'Info',
    details: 'Inbound message received on WhatsApp Cloud API endpoint'
  },
  {
    id: 'aud-7',
    timestamp: '10:28:10 PM',
    eventType: 'human_handoff',
    actor: 'AI',
    actorName: 'Millilegacy AI Core',
    workflow: 'Human Handoff (wf-7)',
    customer: 'Fatima Noor',
    status: 'Warning',
    details: 'Escalated conversation to Ahmed Khan (Support) due to custom tailoring inquiry'
  },
  {
    id: 'aud-8',
    timestamp: '10:25:33 PM',
    eventType: 'address_updated',
    actor: 'Team Member',
    actorName: 'Ali Raza',
    workflow: 'Team Activity',
    customer: 'Usman Ali',
    orderId: '#ML-10479',
    status: 'Success',
    details: 'Customer requested destination change. Destination updated to Phase 6 DHA'
  },
  {
    id: 'aud-9',
    timestamp: '10:20:00 PM',
    eventType: 'catalog_synced',
    actor: 'System',
    actorName: 'Catalog Sync Engine',
    workflow: 'Catalog Sync (wf-6)',
    status: 'Success',
    details: 'Synchronized 184 SKUs to Meta Commerce Catalog via WhatsApp Graph API'
  },
  {
    id: 'aud-10',
    timestamp: '09:50:12 PM',
    eventType: 'cart_recovered',
    actor: 'AI',
    actorName: 'Cart Recovery Automation',
    workflow: 'Cart Abandonment Recovery (wf-5)',
    customer: 'Zubair Qureshi',
    status: 'Success',
    details: 'Checkout recovered via discount code SAVE5-WA. Recovered revenue: PKR 5,999'
  }
];

export const MOCK_ANALYTICS = {
  dailyExecutionTrend: [
    { time: '00:00', success: 38, failed: 1 },
    { time: '03:00', success: 19, failed: 0 },
    { time: '06:00', success: 42, failed: 1 },
    { time: '09:00', success: 145, failed: 4 },
    { time: '12:00', success: 220, failed: 8 },
    { time: '15:00', success: 284, failed: 9 },
    { time: '18:00', success: 310, failed: 10 },
    { time: '21:00', success: 189, failed: 4 }
  ],
  weeklyOrdersTrend: [
    { day: 'Mon', whatsapp: 34, website: 18, total: 52 },
    { day: 'Tue', whatsapp: 38, website: 16, total: 54 },
    { day: 'Wed', whatsapp: 42, website: 21, total: 63 },
    { day: 'Thu', whatsapp: 39, website: 19, total: 58 },
    { day: 'Fri', whatsapp: 51, website: 24, total: 75 },
    { day: 'Sat', whatsapp: 58, website: 28, total: 86 },
    { day: 'Sun', whatsapp: 42, website: 20, total: 62 }
  ],
  ordersBySource: [
    { name: 'WhatsApp AI Assisted', count: 108, percentage: 68.4, color: '#f7be32' },
    { name: 'WhatsApp Team Assisted', count: 31, percentage: 19.6, color: '#e5ab1b' },
    { name: 'Website Direct', count: 19, percentage: 12.0, color: '#1a1813' }
  ],
  cartRecoveryRevenueTrend: [
    { date: 'Sep 3', recoveredPKR: 48000, checkouts: 22 },
    { date: 'Sep 4', recoveredPKR: 62500, checkouts: 25 },
    { date: 'Sep 5', recoveredPKR: 54000, checkouts: 20 },
    { date: 'Sep 6', recoveredPKR: 81000, checkouts: 29 },
    { date: 'Sep 7', recoveredPKR: 92000, checkouts: 32 },
    { date: 'Sep 8', recoveredPKR: 78500, checkouts: 28 },
    { date: 'Sep 9', recoveredPKR: 94500, checkouts: 31 }
  ]
};
