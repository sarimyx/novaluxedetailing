import { ContentLayout } from "@/components/admin-panel/content-layout";
import { supabaseServerClient } from "@/utils/supabase-client-server";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function StaffDashboardSubpage() {
  const db = await supabaseServerClient();
  const { data } = await db.from("Services").select("*");
  if (!data) return <p>Failed to load staff.</p>;
  return (
    <ContentLayout title="Databases">
      <div className="flex flex-col space-y-3 py-4">
        <div className="flex text-slate-700 dark:text-slate-300 font-light items-center justify-between">
          <span className="font-bold">Services</span>
          <a
            href={`https://supabase.com/dashboard/project/bpbpnlruyebxmjxasecx/editor/33752?schema=public`}
            target="_blank"
            rel="noreferrer"
            className="link"
          >
            Source
          </a>
        </div>
        <DataTable columns={columns} data={data.sort((a, b) => a.id - b.id)} />
      </div>
    </ContentLayout>
  );
}
