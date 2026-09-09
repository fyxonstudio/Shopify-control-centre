import React, { useState, useEffect } from 'react';
import {
  NavigationTab,
  OrderRecord,
  WhatsAppConversation,
  WorkflowItem,
  SystemAlert
} from './types';
import {
  MOCK_ORDERS,
  MOCK_CONVERSATIONS,
  MOCK_WORKFLOWS,
  MOCK_ALERTS
} from './data/mockData';

// Layout Components
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { DemoBanner } from './components/common/DemoBanner';
import { PresentationTourModal } from './components/common/PresentationTourModal';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Modals & Drawers
import { OrderDetailDrawer } from './components/modals/OrderDetailDrawer';
import { ConversationDetailDrawer } from './components/modals/ConversationDetailDrawer';
import { WorkflowDetailModal } from './components/modals/WorkflowDetailModal';
import { ErrorDetailModal } from './components/modals/ErrorDetailModal';

// Views
import { DashboardOverview } from './views/DashboardOverview';
import { MonitoringOverview } from './views/MonitoringOverview';
import { AddressConfirmationView } from './views/AddressConfirmationView';
import { ProductInventoryView } from './views/ProductInventoryView';
import { ConversationsView } from './views/ConversationsView';
import { OrdersView } from './views/OrdersView';
import { CartRecoveryView } from './views/CartRecoveryView';
import { WorkflowsView } from './views/WorkflowsView';
import { SystemHealthView } from './views/SystemHealthView';
import { ErrorsAlertsView } from './views/ErrorsAlertsView';
import { ExecutionLogsView } from './views/ExecutionLogsView';
import { TeamActivityView } from './views/TeamActivityView';
import { AuditLogView } from './views/AuditLogView';
import { BusinessAnalyticsView } from './views/BusinessAnalyticsView';
import { AutomationAnalyticsView } from './views/AutomationAnalyticsView';
import { TeamManagementView } from './views/TeamManagementView';
import { IntegrationsView } from './views/IntegrationsView';
import { NotificationSettingsView } from './views/NotificationSettingsView';
import { SettingsView } from './views/SettingsView';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dateRange, setDateRange] = useState('Today');

  // Modal & Drawer States
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<WhatsAppConversation | null>(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowItem | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<SystemAlert | null>(null);

  // Toast Notification State
  const [toast, setToast] = useState<{ title: string; message: string; visible: boolean } | null>(null);

  const showToast = (title: string, message: string) => {
    setToast({ title, message, visible: true });
    setTimeout(() => {
      setToast(prev => (prev ? { ...prev, visible: false } : null));
    }, 4000);
  };

  // Keyboard Shortcuts (Cmd+K for search, ? for tour)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
      if (e.key === '?' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        setIsTourOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handler to open order by ID from other views
  const handleSelectOrderById = (orderId: string) => {
    const found = MOCK_ORDERS.find(o => o.id === orderId);
    if (found) {
      setSelectedOrder(found);
    } else {
      showToast('Order Located', `Opening order details for ${orderId}`);
    }
  };

  // Handler to open conversation by ID from search
  const handleSelectConversationById = (convId: string) => {
    const found = MOCK_CONVERSATIONS.find(c => c.id === convId);
    if (found) {
      setSelectedConversation(found);
    }
  };

  // Handler to resolve alert
  const handleResolveAlert = (alertId: string) => {
    showToast('Alert Marked Resolved', `Incident ${alertId} was updated in the system audit log.`);
  };

  // Render view router based on activeTab
  const renderView = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <DashboardOverview
            onNavigate={setActiveTab}
            onSelectOrder={setSelectedOrder}
            onSelectConversation={setSelectedConversation}
            onOpenTour={() => setIsTourOpen(true)}
          />
        );
      case 'monitoring-overview':
        return (
          <MonitoringOverview
            onNavigate={setActiveTab}
            onSelectAlert={setSelectedAlert}
            onSelectWorkflow={setSelectedWorkflow}
          />
        );
      case 'address-confirmation':
        return (
          <AddressConfirmationView
            onSelectOrder={handleSelectOrderById}
            onToast={showToast}
          />
        );
      case 'product-inventory':
        return <ProductInventoryView onToast={showToast} />;
      case 'conversations':
        return <ConversationsView onSelectConversation={setSelectedConversation} />;
      case 'orders':
        return <OrdersView onSelectOrder={setSelectedOrder} onToast={showToast} />;
      case 'cart-recovery':
        return <CartRecoveryView onToast={showToast} onOpenTour={() => setIsTourOpen(true)} />;
      case 'workflows':
        return <WorkflowsView onSelectWorkflow={setSelectedWorkflow} onToast={showToast} />;
      case 'system-health':
        return <SystemHealthView onToast={showToast} />;
      case 'errors-alerts':
        return <ErrorsAlertsView onSelectAlert={setSelectedAlert} onToast={showToast} />;
      case 'execution-logs':
        return <ExecutionLogsView onToast={showToast} />;
      case 'team-activity':
        return <TeamActivityView onToast={showToast} />;
      case 'audit-log':
        return <AuditLogView onToast={showToast} />;
      case 'business-analytics':
        return <BusinessAnalyticsView onNavigate={setActiveTab} />;
      case 'automation-analytics':
        return <AutomationAnalyticsView />;
      case 'team':
        return <TeamManagementView onToast={showToast} />;
      case 'integrations':
        return <IntegrationsView onToast={showToast} />;
      case 'notifications':
        return <NotificationSettingsView onToast={showToast} />;
      case 'settings':
        return <SettingsView onToast={showToast} />;
      default:
        return (
          <DashboardOverview
            onNavigate={setActiveTab}
            onSelectOrder={setSelectedOrder}
            onSelectConversation={setSelectedConversation}
            onOpenTour={() => setIsTourOpen(true)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#0D0D10] flex flex-col font-sans selection:bg-[#f7be32]/30 selection:text-black">
      {/* Demo Prototype Header Banner */}
      <DemoBanner onOpenTour={() => setIsTourOpen(true)} />

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onNavigate={(tab) => {
            setActiveTab(tab);
            setIsMobileMenuOpen(false);
          }}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
          isMobileOpen={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
          onOpenTour={() => setIsTourOpen(true)}
        />

        {/* Main Body Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Navbar */}
          <TopNavbar
            activeTab={activeTab}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenNotifications={() => setIsNotificationsOpen(true)}
            onOpenTour={() => setIsTourOpen(true)}
            onToggleMobileSidebar={() => setIsMobileMenuOpen(prev => !prev)}
            onNavigate={setActiveTab}
            dateRange={dateRange}
            onChangeDateRange={setDateRange}
          />

          {/* Scrollable View Content Canvas */}
          <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              {renderView()}
            </div>
          </main>
        </div>
      </div>

      {/* Floating Action Toast */}
      {toast && toast.visible && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-200">
          <div className="bg-[#0D0D10] text-white px-4 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-start gap-3 max-w-md">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f7be32] mt-1.5 shrink-0" />
            <div className="space-y-0.5">
              <h5 className="text-xs font-bold text-white tracking-wide">{toast.title}</h5>
              <p className="text-[11px] text-slate-300 leading-normal">{toast.message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Presentation Guided Tour Modal */}
      <PresentationTourModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        onNavigate={setActiveTab}
      />

      {/* Global Search Modal (Cmd+K) */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectOrder={handleSelectOrderById}
        onSelectConversation={handleSelectConversationById}
        onNavigate={setActiveTab}
      />

      {/* Notifications Drawer */}
      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          setIsNotificationsOpen(false);
        }}
      />

      {/* Order Detail Drawer */}
      <OrderDetailDrawer
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onUpdateStatus={(orderId, status) => {
          showToast('Order Status Updated', `Order ${orderId} marked as ${status}.`);
          if (selectedOrder) {
            setSelectedOrder({ ...selectedOrder, orderStatus: status as any });
          }
        }}
      />

      {/* WhatsApp Conversation Detail Drawer */}
      <ConversationDetailDrawer
        conversation={selectedConversation}
        onClose={() => setSelectedConversation(null)}
        onTakeover={(convId) => {
          showToast('Human Takeover Initiated', `Conversation ${convId} assigned to support agent.`);
          if (selectedConversation) {
            setSelectedConversation({
              ...selectedConversation,
              handler: 'Human',
              status: 'Human Handoff'
            });
          }
        }}
      />

      {/* n8n Workflow Detail & Pipeline Graph Modal */}
      <WorkflowDetailModal
        workflow={selectedWorkflow}
        onClose={() => setSelectedWorkflow(null)}
        onRunWorkflow={(wfId) => {
          showToast('Pipeline Test Initiated', `Triggered test execution on workflow ${wfId}.`);
        }}
      />

      {/* Error & Incident Resolution Modal */}
      <ErrorDetailModal
        alert={selectedAlert}
        onClose={() => setSelectedAlert(null)}
        onRetry={(alertId) => {
          showToast('Retry Dispatched', `Payload resent for alert ${alertId}.`);
        }}
        onResolve={(alertId) => {
          handleResolveAlert(alertId);
        }}
      />
    </div>
  );
}
