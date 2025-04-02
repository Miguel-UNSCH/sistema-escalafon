import { DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger } from "@/components/ui/dropdown-menu";
import { JSX } from "react";

type ModuleItem = {
  name: string;
  component?: JSX.Element;
  children?: ModuleItem[];
};

export const RenderMenuItems = ({ items, onSelect }: { items: ModuleItem[]; onSelect: (name: string, component: JSX.Element) => void }) => {
  return (
    <>
      {items.map((item) =>
        item.children ? (
          <DropdownMenuSub key={item.name}>
            <DropdownMenuSubTrigger>{item.name}</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <RenderMenuItems items={item.children} onSelect={onSelect} />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        ) : (
          <DropdownMenuItem key={item.name} onClick={() => item.component && onSelect(item.name, item.component)}>
            {item.name}
          </DropdownMenuItem>
        )
      )}
    </>
  );
};
