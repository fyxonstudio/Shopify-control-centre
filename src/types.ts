export type NavigationTab =
  | 'dashboard'
  | 'monitoring-overview'
  | 'workflows'
  | 'conversations'
  | 'orders'
  | 'cart-recovery'
  | 'product-inventory'
  | 'address-confirmation'
  | 'system-health'
  | 'errors-alerts'
  | 'execution-logs'
  | 'team-activity'
  | 'audit-log'
  | 'business-analytics'
  | 'automation-analytics'
  | 'team'
  | 'integrations'
  | 'notifications'
  | 'settings';

export type SystemHealthStatus = 'operational' | 'degraded' | 'down' | 'maintenance';

export interface SystemService {
  id: string;
  name: string;
  category: 'API' | 'Engine' | 'Database' | 'Intelligence' | 'Service';
  status: SystemHealthStatus;
  uptime: string;
  latencyMs: number;
  lastChecked: string;
  details: string;
  failures24h: number;
}

export type ConversationStatus =
  | 'AI Handling'
  | 'Human Handoff'
  | 'Order Pending'
  | 'Order Confirmed'
  | 'Cancelled'
  | 'Resolved';

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'ai' | 'system' | 'shopify' | 'team';
  senderName?: string;
  text: string;
  timestamp: string;
  meta?: {
    type?: 'product_detected' | 'variant_check' | 'inventory' | 'address_prompt' | 'address_confirmed' | 'shopify_order_created' | 'handoff';
    productName?: string;
    variant?: string;
    inventory?: number;
    orderId?: string;
    amount?: string;
    sku?: string;
  };
}

export interface WhatsAppConversation {
  id: string;
  customerName: string;
  customerPhone: string;
  status: ConversationStatus;
  handler: 'AI' | 'Human' | 'AI + Team';
  lastMessage: string;
  lastMessageTime: string;
  intent: 'Purchase' | 'Catalog Inquiry' | 'Address Confirmation' | 'Support' | 'Order Status';
  productInterest: string;
  orderId?: string;
  orderStatus?: string;
  assignedAgent?: string;
  messages: ChatMessage[];
  unreadCount?: number;
}

export type OrderStatus =
  | 'Pending'
  | 'Address Confirmation'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Delivered'
  | 'Cancelled'
  | 'Failed';

export type AddressStatus = 'Waiting for Confirmation' | 'Confirmed' | 'Correction Requested' | 'Updated' | 'Failed';

export interface OrderRecord {
  id: string;
  customerName: string;
  customerPhone: string;
  productTitle: string;
  variantTitle: string;
  sku: string;
  quantity: number;
  amountPKR: number;
  source: 'WhatsApp' | 'Website' | 'Manual';
  addressStatus: AddressStatus;
  paymentMethod: 'COD' | 'Bank Transfer' | 'Card';
  orderStatus: OrderStatus;
  createdAt: string;
  assignedTo: 'AI' | 'Team Member' | 'Ahmed' | 'Sara' | 'Ali';
  deliveryAddress: {
    formatted: string;
    houseStreet: string;
    area: string;
    city: string;
    postalCode?: string;
    correctedFrom?: string;
  };
  validationHistory: {
    productIdentified: boolean;
    variantValidated: boolean;
    inventoryChecked: boolean;
    addressConfirmed: boolean;
    shopifyOrderPushed: boolean;
    shopifyOrderNumber?: string;
  };
  timeline: Array<{
    title: string;
    time: string;
    actor: 'Customer' | 'AI Agent' | 'Shopify' | 'System' | 'Team';
    description: string;
    completed: boolean;
  }>;
}

export interface WorkflowItem {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Degraded';
  lastRun: string;
  successRate: number;
  averageRuntime: string;
  executionsToday: number;
  failuresToday: number;
  lastError?: string;
  nodes: WorkflowNode[];
}

export interface WorkflowNode {
  id: string;
  title: string;
  type: 'trigger' | 'ai' | 'validation' | 'database' | 'integration' | 'condition';
  system: 'WhatsApp' | 'AI Agent' | 'Shopify' | 'n8n' | 'Internal';
  status: 'success' | 'running' | 'failed' | 'idle';
  avgTime: string;
  lastRun: string;
  description: string;
}

export interface CartRecoveryItem {
  id: string;
  customerName: string;
  customerPhone: string;
  cartItems: string;
  cartValuePKR: number;
  checkoutCreatedAt: string;
  reminderSentAt: string;
  reminderCount: number;
  status: 'Reminder Pending' | 'Reminder Sent' | 'Recovered' | 'Still Abandoned' | 'Excluded';
  recoveredRevenuePKR?: number;
  discountCodeOffered?: string;
  notes?: string;
}

export interface ProductCatalogItem {
  id: string;
  title: string;
  sku: string;
  category: string;
  color: string;
  size: string;
  pricePKR: number;
  inventoryCount: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
  lastChecked: string;
  imageUrl?: string;
  whatsappCatalogSynced: boolean;
}

export type AlertSeverity = 'critical' | 'warning' | 'info' | 'resolved';

export interface SystemAlert {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  timestamp: string;
  workflow: string;
  node: string;
  status: 'Open' | 'Retrying' | 'Resolved';
  retryAttempted?: boolean;
  assignedTo?: string;
  errorMessage?: string;
}

export interface ExecutionLog {
  id: string;
  time: string;
  workflow: string;
  workflowId: string;
  executionId: string;
  trigger: 'Webhook' | 'WhatsApp' | 'AI Agent' | 'Cron' | 'Shopify Webhook';
  duration: string;
  status: 'Success' | 'Failed' | 'Running';
  error?: string;
  payloadSize: string;
  nodesRunCount: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Agent' | 'Viewer';
  status: 'Active' | 'In Conversation' | 'Offline';
  conversationsHandledToday: number;
  ordersAssistedToday: number;
  avgResponseTime: string;
  lastActive: string;
  avatarBg: string;
}

export interface TeamActivityLog {
  id: string;
  teamMember: string;
  action: 'Human Handoff' | 'Address Updated' | 'Conversation Resolved' | 'Manual Order Created' | 'Discount Applied' | 'Inventory Adjusted';
  customer: string;
  orderId?: string;
  time: string;
  status: 'Completed' | 'Success' | 'In Progress';
  notes: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  eventType:
    | 'customer_message'
    | 'ai_response'
    | 'product_identified'
    | 'variant_checked'
    | 'inventory_checked'
    | 'address_requested'
    | 'address_received'
    | 'address_updated'
    | 'address_confirmed'
    | 'order_requested'
    | 'order_created'
    | 'order_cancelled'
    | 'human_handoff'
    | 'team_action'
    | 'workflow_started'
    | 'workflow_completed'
    | 'workflow_failed'
    | 'cart_created'
    | 'cart_reminder_sent'
    | 'cart_recovered'
    | 'catalog_synced'
    | 'integration_error';
  actor: 'AI' | 'System' | 'Customer' | 'Team Member' | 'Admin';
  actorName?: string;
  workflow: string;
  customer?: string;
  orderId?: string;
  status: 'Success' | 'Warning' | 'Error' | 'Info';
  details: string;
}
