import { TableSkeleton } from "@/components/admin/AdminSkeleton";

export default async function BannersLoading() {
  'use cache';
  return <TableSkeleton />;
}
