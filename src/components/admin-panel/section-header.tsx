"use client";

import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  hideSidebar?: boolean;
}

export function SectionHeader({ title, hideSidebar }: SectionHeaderProps) {
  const pathname = usePathname();

  // Break down the pathname into segments
  const pathSegments = pathname.split("/").filter(Boolean); // remove empty strings

  // Reconstruct URLs for each segment
  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return {
      name: decodeURIComponent(segment.replace(/-/g, " ")), // Optionally format (e.g., replace hyphens)
      href,
    };
  });

  return (
    <header className="sticky z-10 w-full mt-4">
      <div className="mx-4 sm:mx-8 flex items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.length > 0 && <BreadcrumbSeparator />}
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={crumb.href}>
                {index < breadcrumbs.length - 1 ? (
                  <>
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href}>
                        {crumb.name.charAt(0).toUpperCase() +
                          crumb.name.slice(1)}
                      </Link>
                    </BreadcrumbLink>
                    <BreadcrumbSeparator />
                  </>
                ) : (
                  <BreadcrumbPage>
                    {crumb.name.charAt(0).toUpperCase() + crumb.name.slice(1)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="mx-4 sm:mx-8 flex items-center">
        <div className="flex items-center space-x-4 lg:space-x-0">
          {hideSidebar !== true && <SheetMenu />}
          {/* <h1 className="font-bold">
            {title}
          </h1> */}
        </div>
      </div>
    </header>
  );
}
