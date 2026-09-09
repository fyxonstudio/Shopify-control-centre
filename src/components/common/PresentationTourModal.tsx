import React, { useState } from 'react';
import { X, ChevronRight, ChevronLeft, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { NavigationTab } from '../../types';

interface PresentationTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: NavigationTab) => void;
}

interface TourStep {
  stepNumber: number;
  title: string;
  tab: NavigationTab;
  urduPitch: string;
  englishExplanation: string;
  keyFeaturePoints: string[];
}

const TOUR_STEPS: TourStep[] = [
  {
    stepNumber: 1,
    title: 'Dashboard Overview',
    tab: 'dashboard',
    urduPitch: '"Sir, ye overall control center hai jahan se WhatsApp orders, conversations, recovery aur automation rate ek screen par dikhti hai."',
    englishExplanation: 'Executive command view showing high-level KPIs, 6-stage automation funnel, real-time system health, and execution analytics.',
    keyFeaturePoints: [
      '42 Orders Today (+18.4%) & 186 WhatsApp inquiries',
      '82.3% AI automation rate (153 autonomous chats)',
      'PKR 94,500 cart recovery revenue',
      'Clear 7-step customer journey funnel'
    ]
  },
  {
    stepNumber: 2,
    title: 'System Health & Infrastructure',
    tab: 'system-health',
    urduPitch: '"Yahan se aap dekh sakte hain ke WhatsApp, Shopify, n8n, AI aur database properly operational hain aur latency normal hai."',
    englishExplanation: 'Live infrastructure telemetry monitoring 7 core services with 99.98% uptime, sub-200ms latency, and heartbeat health checks.',
    keyFeaturePoints: [
      'WhatsApp Cloud API: 94ms latency',
      'Shopify Storefront & Admin API: 184ms latency',
      'n8n Automation Engine: 38ms latency',
      'Continuous 60s health daemon pinging all nodes'
    ]
  },
  {
    stepNumber: 3,
    title: 'WhatsApp Conversation Monitoring',
    tab: 'conversations',
    urduPitch: '"Yahan AI aur customer ki conversation real-time monitor hoti hai with distinct badges for AI, customer and system actions."',
    englishExplanation: 'Omnichannel WhatsApp chat feed showing Roman Urdu/English conversations, intent extraction, and seamless human handoff tags.',
    keyFeaturePoints: [
      'Customer Ahmed Khan: "Mujhe black shirt XL chahiye"',
      'AI verifies SKU PCS-BLK-XL and 7 units available',
      'Urdu address verification card delivered',
      'Distinct visual badges: AI, Customer, System, Shopify'
    ]
  },
  {
    stepNumber: 4,
    title: 'WhatsApp Catalog & Product Validation',
    tab: 'product-inventory',
    urduPitch: '"Customer jab WhatsApp catalog se product bheje to system andha dhund order nahi banata, exact variant, color, size aur stock check karta hai."',
    englishExplanation: 'Guards against overselling. Parses incoming product requests, checks exact size/color against Shopify stock, and suggests alternatives if stock is zero.',
    keyFeaturePoints: [
      'Interactive Product Tester with In-Stock (Black XL) vs Out-of-Stock (White M)',
      'Automated alternative suggestion: "Black / L available hai"',
      'Real-time SKU lookup and location warehouse count'
    ]
  },
  {
    stepNumber: 5,
    title: 'Mandatory Address Confirmation',
    tab: 'address-confirmation',
    urduPitch: '"Order create hone se pehle system formatted address customer ko bhej kar poochta hai: Kya ye address theek hai? Confirmation ke baghair order nahi banta."',
    englishExplanation: 'Core client requirement preventing return/RTO courier losses. Parses Pakistani addresses and mandates explicit customer confirmation.',
    keyFeaturePoints: [
      'Interactive YES / NO simulator directly inside the prototype',
      'If YES: Validates & unlocks Shopify order push',
      'If NO: Prompts customer for revision, updates address, and re-confirms',
      '94.7% Address confirmation success rate'
    ]
  },
  {
    stepNumber: 6,
    title: 'Automated Shopify Order Creation',
    tab: 'orders',
    urduPitch: '"Confirmation ke baad automatically Shopify mein complete order create ho jata hai with COD tag and verified address."',
    englishExplanation: 'Orders table with full audit trail, source breakdown (WhatsApp vs Web), courier address verification state, and 1-click detail drawers.',
    keyFeaturePoints: [
      'Order #ML-10482 generated in seconds with COD payment',
      'Traceable timeline from incoming WhatsApp chat to Shopify order ID',
      'Filters by order status, source, and courier confirmation'
    ]
  },
  {
    stepNumber: 7,
    title: 'Team Activity Monitoring',
    tab: 'team-activity',
    urduPitch: '"Aap monitor kar sakte hain ke aapki customer support team kya kar rahi hai, kitne human handoffs attend kiye aur kitna response time hai."',
    englishExplanation: 'Real-time visibility into team member actions, human escalations, address corrections, and agent performance metrics.',
    keyFeaturePoints: [
      '6 Active team members tracked',
      'Real-time action feed (e.g. Ali updated address, Ahmed handled custom alterations)',
      'Average human response time: 3m 42s'
    ]
  },
  {
    stepNumber: 8,
    title: 'Enterprise Audit Trail',
    tab: 'audit-log',
    urduPitch: '"Har single event chahe AI ka ho, customer ka ho, ya Shopify ka ho, tamper-proof audit log mein record hota hai."',
    englishExplanation: 'Comprehensive compliance log categorizing 22+ event types across AI, System, Customer, Team Member, and Admin actors.',
    keyFeaturePoints: [
      'Timestamped down to the exact second',
      'Searchable by customer, order ID, or workflow node',
      'Traceability for dispute resolution and operational auditing'
    ]
  },
  {
    stepNumber: 9,
    title: 'Cart Abandonment Recovery',
    tab: 'cart-recovery',
    urduPitch: '"Shopify par chore hue checkouts par WhatsApp reminder jaata hai. PKR 94,500 ka revenue recover ho chuka hai."',
    englishExplanation: 'Autonomous recovery engine sending personalized WhatsApp reminders with dynamic discount codes 30 minutes after checkout drop-off.',
    keyFeaturePoints: [
      '31 Abandoned checkouts → 27 Reminders sent → 8 Recovered',
      'PKR 94,500 direct recovered revenue',
      '25.8% conversion recovery rate'
    ]
  },
  {
    stepNumber: 10,
    title: 'Error Monitoring & Auto-Retry',
    tab: 'errors-alerts',
    urduPitch: '"Agar koi Shopify API rate limit ya WhatsApp delivery issue ho, to alert yahan aati hai aur automatic retry chalta hai."',
    englishExplanation: 'Self-healing error monitor tracking API throttles, timeout retries, and network warnings with manual retry and resolution controls.',
    keyFeaturePoints: [
      'Interactive "Retry Execution" simulation with feedback toast',
      'Categorized into Critical, Warning, Info, and Resolved',
      'Direct link to n8n execution IDs for rapid debugging'
    ]
  }
];

export const PresentationTourModal: React.FC<PresentationTourModalProps> = ({
  isOpen,
  onClose,
  onNavigate
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex];

  const handleNext = () => {
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const handleJumpAndClose = () => {
    onNavigate(currentStep.tab);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-[#EAE6DF] w-full max-w-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#0D0D10] text-white p-5 flex items-center justify-between border-b border-[#242426]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#f7be32] flex items-center justify-center text-[#0D0D10] shadow-md border border-[#e5ab1b]">
              <Sparkles className="w-5 h-5 text-[#0D0D10]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">Client Presentation Guide</h3>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-[#f7be32]/20 text-[#f7be32] border border-[#f7be32]/40">
                  Google Meet Flow
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Step {currentStep.stepNumber} of {TOUR_STEPS.length}: {currentStep.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Progress bar */}
          <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-[#f7be32] transition-all duration-300"
              style={{ width: `${((currentStepIndex + 1) / TOUR_STEPS.length) * 100}%` }}
            />
          </div>

          {/* Urdu Presenter Pitch Box */}
          <div className="bg-[#FAF9F5] border border-[#f7be32]/40 rounded-xl p-4">
            <div className="text-[11px] font-bold tracking-wider uppercase text-amber-900 mb-1 flex items-center gap-1.5">
              <span>🎤 Suggested Presenter Pitch (Urdu / Hindi)</span>
            </div>
            <p className="text-sm font-medium text-[#1E1435] italic leading-relaxed">
              {currentStep.urduPitch}
            </p>
          </div>

          {/* English Architectural Explanation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Technical & Functional Summary
            </h4>
            <p className="text-sm text-slate-700 leading-relaxed">
              {currentStep.englishExplanation}
            </p>
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Key Demo Highlights to Point Out
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentStep.keyFeaturePoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-lg border border-slate-200/70">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 mt-0.5 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF9F5] p-4 border-t border-[#EAE6DF] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-white text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex === TOUR_STEPS.length - 1}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-300 text-slate-600 hover:bg-white text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleJumpAndClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#f7be32] hover:bg-[#e5ab1b] text-[#0D0D10] text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <span>Jump to this Screen</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
