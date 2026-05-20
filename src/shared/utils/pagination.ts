import { PaginationQuery } from "@/shared/types";

export function parsePagination(query: Record<string, unknown>): PaginationQuery {
  const page = Math.max(1, parseInt(query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string) || 10));
  const sort = (query.sort as string) || "-createdAt";
  return { page, limit, sort };
}

export function getMeta(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  return { page, limit, total, totalPages };
}

export function getSortObject(sortString: string): Record<string, 1 | -1> {
  const [field, order] = sortString.startsWith("-")
    ? [sortString.slice(1), -1]
    : [sortString, 1];
  return { [field]: order as 1 | -1 };
}