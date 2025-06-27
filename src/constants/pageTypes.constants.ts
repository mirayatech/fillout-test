import {
  FormInput,
  BookOpen,
  Eye,
  CreditCard,
  Lock,
  Calendar,
  CheckCircle2,
  InfoIcon,
  FileTextIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PageTypeConfig {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconColor: {
    active: string;
    inactive: string;
  };
  backgroundColor: string;
  isPremium?: boolean;
}

export const PAGE_TYPE_CONFIGS: Record<string, PageTypeConfig> = {
  form: {
    id: "form",
    name: "Form",
    description: "Page to collect user input",
    icon: FormInput,
    iconColor: {
      active: "text-orange-600",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-orange-100 text-orange-600",
  },
  cover: {
    id: "cover",
    name: "Cover",
    description: "Welcome users to your form",
    icon: BookOpen,
    iconColor: {
      active: "text-blue-600",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-blue-100 text-blue-600",
  },
  ending: {
    id: "ending",
    name: "Ending",
    description: "Show a thank you page or redirect users",
    icon: CheckCircle2,
    iconColor: {
      active: "text-red-600",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-red-100 text-red-600",
  },
  review: {
    id: "review",
    name: "Review",
    description: "Let users review their submission",
    icon: Eye,
    iconColor: {
      active: "text-purple-600",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-purple-100 text-purple-600",
  },
  payment: {
    id: "payment",
    name: "Payment",
    description: "Collect payments with Stripe",
    icon: CreditCard,
    iconColor: {
      active: "text-pink-600",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-pink-100 text-pink-600",
  },
  login: {
    id: "login",
    name: "Login",
    description: "Let users login with email, password or SSO",
    icon: Lock,
    iconColor: {
      active: "text-green-600",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-green-100 text-green-600",
    isPremium: true,
  },
  scheduling: {
    id: "scheduling",
    name: "Scheduling",
    description: "Book meetings on your calendar",
    icon: Calendar,
    iconColor: {
      active: "text-gray-600",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-gray-100 text-gray-600",
  },
  info: {
    id: "info",
    name: "Info",
    description: "Information page",
    icon: InfoIcon,
    iconColor: {
      active: "text-amber-500",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-amber-100 text-amber-500",
  },
  completed: {
    id: "completed",
    name: "Completed",
    description: "Completion page",
    icon: CheckCircle2,
    iconColor: {
      active: "text-red-600",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-green-100 text-green-600",
  },
  document: {
    id: "document",
    name: "Document",
    description: "Document page",
    icon: FileTextIcon,
    iconColor: {
      active: "text-amber-500",
      inactive: "text-gray-600",
    },
    backgroundColor: "bg-amber-100 text-amber-500",
  },
} as const;

export const PAGE_TYPES = Object.values(PAGE_TYPE_CONFIGS).filter(
  (config) =>
    config.id !== "info" &&
    config.id !== "completed" &&
    config.id !== "document"
);

export const DEFAULT_PAGE_TYPE_CONFIG: PageTypeConfig =
  PAGE_TYPE_CONFIGS.document;

// utility function to get page type configuration
export const getPageTypeConfig = (type?: string): PageTypeConfig => {
  if (!type) return DEFAULT_PAGE_TYPE_CONFIG;
  return PAGE_TYPE_CONFIGS[type] || DEFAULT_PAGE_TYPE_CONFIG;
};
