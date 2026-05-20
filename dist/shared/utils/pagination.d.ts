import { PaginationQuery } from "@/shared/types";
export declare function parsePagination(query: Record<string, unknown>): PaginationQuery;
export declare function getMeta(page: number, limit: number, total: number): {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};
export declare function getSortObject(sortString: string): Record<string, 1 | -1>;
