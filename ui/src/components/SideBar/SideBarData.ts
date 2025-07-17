import { Paths } from "@/lib/Paths";
import { LucideIcon, Monitor  ,Wrench  ,House, Users } from "lucide-react";


export type ItemType = "Parent" | "Child";

export interface SidebarItemData {
  type: "Child";
  openLink: string;
  addLink?: string;
  title: string;
  icon: LucideIcon;
}

export interface SidebarParentItemData {
  type: "Parent";
  title: string;
  icon: LucideIcon;
  children: SidebarItemData[];
}




type SidebarEntry = SidebarItemData | SidebarParentItemData;

export const useSidebarData = (): SidebarEntry[] => {
 

  const commonItems: SidebarEntry[] = [
    {
      type: "Child",
      title: "Tableau de bord",
      openLink: Paths.dashboard,
      icon: House,
    },
    {
      type: "Child",
      title: "Reparations",
      openLink: Paths.reparations,
      icon: Wrench ,
      addLink: Paths.addReparation,
    },
     {
      type: "Child",
      title: "Machines",
      openLink: Paths.machines,
      icon: Monitor ,
      addLink: Paths.addMachine,
    },
    {
      type: "Child",
      title: "Clients",
      openLink: Paths.clients,
      icon: Users,
      addLink: Paths.addClient,
    },
  ];

  return commonItems;
};