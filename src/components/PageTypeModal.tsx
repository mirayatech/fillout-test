import {
  FormInput,
  BookOpen,
  Eye,
  CreditCard,
  Lock,
  Calendar,
  X,
  CheckCircle2,
} from "lucide-react";
import { cn } from "../utils/cn";

export interface PageType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isPremium?: boolean;
}

const PAGE_TYPES: PageType[] = [
  {
    id: "form",
    name: "Form",
    description: "Page to collect user input",
    icon: FormInput,
  },
  {
    id: "cover",
    name: "Cover",
    description: "Welcome users to your form",
    icon: BookOpen,
  },
  {
    id: "ending",
    name: "Ending",
    description: "Show a thank you page or redirect users",
    icon: CheckCircle2,
  },
  {
    id: "review",
    name: "Review",
    description: "Let users review their submission",
    icon: Eye,
  },
  {
    id: "payment",
    name: "Payment",
    description: "Collect payments with Stripe",
    icon: CreditCard,
  },
  {
    id: "login",
    name: "Login",
    description: "Let users login with email, password or SSO",
    icon: Lock,
    isPremium: true,
  },
  {
    id: "scheduling",
    name: "Scheduling",
    description: "Book meetings on your calendar",
    icon: Calendar,
  },
];

interface PageTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPageType: (pageType: PageType) => void;
  position?: { x: number; y: number };
}

export default function PageTypeModal({
  isOpen,
  onClose,
  onSelectPageType,
  position = { x: 0, y: 0 },
}: PageTypeModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />

      <div
        className="fixed z-50 bg-white rounded-lg shadow-xl w-80 max-h-96 overflow-hidden border border-gray-200"
        style={{
          left: position.x,
          top: position.y + 8,
        }}
      >
        <div className="flex items-center justify-between p-3 border-b bg-gray-50">
          <h2 className="text-lg font-semibold text-gray-900">
            Choose a page type
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded-md transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Page Types List */}
        <div className="p-3 space-y-1 max-h-80 overflow-y-auto">
          {PAGE_TYPES.map((pageType) => {
            const IconComponent = pageType.icon;
            return (
              <button
                key={pageType.id}
                onClick={() => onSelectPageType(pageType)}
                className={cn(
                  "w-full flex items-start gap-3 p-2 rounded-md text-left transition-colors hover:bg-gray-50",
                  "focus:outline-none focus:ring-2 focus:ring-blue-500"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0",
                    pageType.id === "form" && "bg-orange-100 text-orange-600",
                    pageType.id === "cover" && "bg-blue-100 text-blue-600",
                    pageType.id === "ending" && "bg-red-100 text-red-600",
                    pageType.id === "review" && "bg-purple-100 text-purple-600",
                    pageType.id === "payment" && "bg-pink-100 text-pink-600",
                    pageType.id === "login" && "bg-green-100 text-green-600",
                    pageType.id === "scheduling" && "bg-gray-100 text-gray-600"
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-sm text-gray-900">
                      {pageType.name}
                    </h3>
                    {pageType.isPremium && (
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                        Premium
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {pageType.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}
