import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { PageTypeIcon } from "./ui/tab-icon";
import { PAGE_TYPES } from "../constants/pageTypes.constants";

export interface PageType {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  isPremium?: boolean;
}

interface PageTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPageType: (pageType: PageType) => void;
  trigger: React.ReactNode;
}

export default function PageTypeModal({
  isOpen,
  onClose,
  onSelectPageType,
  trigger,
}: PageTypeModalProps) {
  const handleSelect = (pageType: PageType) => {
    onSelectPageType(pageType);
    onClose();
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DropdownMenuTrigger asChild>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-screen max-w-sm max-h-96 rounded-xl"
        align="start"
        sideOffset={8}
      >
        <DropdownMenuLabel className="h-10 bg-gray-50 border-b-0.5 border-gray-200 flex items-center justify-between px-3 text-gray-900 text-base font-medium leading-6">
          Choose a page type
        </DropdownMenuLabel>
        <div className="p-3 pb-[14px] space-y-[14px] max-h-80 overflow-y-auto">
          {PAGE_TYPES.map((pageType) => (
            <DropdownMenuItem
              key={pageType.id}
              onClick={() => handleSelect(pageType)}
              className="w-full flex items-center gap-[6px] p-1 -m-1 rounded text-left transition-all duration-200 ease-in-out hover:bg-gray-25 hover:shadow-sm focus:outline-none focus:bg-gray-100 focus:ring-1 focus:ring-gray-300 cursor-pointer"
            >
              <PageTypeIcon pageTypeId={pageType.id} size="lg" />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-gray-900 text-sm font-medium leading-4 whitespace-nowrap">
                    {pageType.name}
                  </span>
                  {pageType.isPremium && (
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      Premium
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-0.5 whitespace-nowrap">
                  {pageType.description}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
