import { prisma } from "@/lib/db/db";
import { dbQuery, dbMutate } from "@/lib/services/ServiceHelper";
import type { TeamMemberData } from "@/lib/services/types/team.types";

export function getAll(): Promise<TeamMemberData[]> {
  return dbQuery(() => prisma.teamMember.findMany({ orderBy: { order: "asc" } })) as Promise<TeamMemberData[]>;
}

export function getById(id: string): Promise<TeamMemberData | null> {
  return dbQuery(() => prisma.teamMember.findUnique({ where: { id } })) as Promise<TeamMemberData | null>;
}

export function createTeamMember(data: Record<string, unknown>) {
  return dbMutate(() => prisma.teamMember.create({ data }));
}

export function updateTeamMember(id: string, data: Record<string, unknown>) {
  return dbMutate(() => prisma.teamMember.update({ where: { id }, data }));
}

export function deleteTeamMember(id: string) {
  return dbMutate(() => prisma.teamMember.delete({ where: { id } }));
}
