import {
  CarFront,
  LayoutGrid,
  LucideIcon,
  Settings,
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
  let target = "";
  if (pathname.startsWith("/dashboard/staff")) {
    target = "staff";
  } else if (pathname.startsWith("/dashboard/provider")) {
    target = "provider";
  } else if (pathname.startsWith("/dashboard/customer")) {
    target = "customer";
  }

  const base = {
    groupLabel: "",
    menus: [
      {
        href: `/dashboard/${target}`,
        label: "Dashboard",
        icon: LayoutGrid,
        submenus: [],
        active:
          pathname.startsWith("/dashboard") &&
          // Any sub pages are appended to the end of the pathname after the target, so if the target itself is is the last word in the pathname, we are on the root dashboard page.
          (pathname.endsWith("staff") ||
            pathname.endsWith("provider") ||
            pathname.endsWith("customer")),
      },
    ],
  };

  const staff_DatabasesSection = {
    groupLabel: "Databases",
    menus: [
      {
        href: "/dashboard/staff/databases/services",
        label: "Services",
        icon: CarFront,
      },
    ],
  };

  const manageProfile = {
    groupLabel: "Account",
    menus: [
      {
        href: `/dashboard/${target}/manage-profile`,
        label: "Manage Profile",
        icon: Settings,
      },
    ],
  };

  if (pathname.startsWith("/dashboard/staff")) {
    return [base, staff_DatabasesSection, manageProfile];
  } else if (pathname.startsWith("/dashboard/provider")) {
    return [base, manageProfile];
  } else {
    return [base, manageProfile];
  }
}
