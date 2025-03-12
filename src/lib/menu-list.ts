import {
  CarFront,
  LayoutGrid,
  LucideIcon,
  // Tag,
  // Users,
  // Settings,
  // Bookmark,
  // SquarePen,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  const base = {
    groupLabel: "",
    menus: [
      {
        href: "/dashboard",
        label: "Dashboard",
        icon: LayoutGrid,
        submenus: [],
      },
    ],
  };

  const services = {
    groupLabel: "Databases",
    menus: [
      {
        href: "/dashboard/staff/databases/services",
        label: "Services",
        icon: CarFront,
      },
    ],
  };

  if (pathname.startsWith("/dashboard/staff")) {
    return [base, services];
  } else {
    return [base];
  }
}
