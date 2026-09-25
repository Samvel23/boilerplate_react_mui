import { useSearchParams } from "react-router-dom";
import type { SelectChangeEvent } from "@mui/material";

export const useProductParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 10);

  const sortBy = searchParams.get("sortBy") ?? "";

  const orderParam = searchParams.get("order") as "asc" | "desc";
  const order: "asc" | "desc" = orderParam === "desc" ? "desc" : "asc";

  const category = searchParams.get("category");
  const search = searchParams.get("search") ?? "";

  const updateParams = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(changes).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });

    setSearchParams(params);
  };

  const handleSort = (field: string) => {
    const newOrder = field === sortBy && order === "asc" ? "desc" : "asc";

    updateParams({
      page: "0",
      limit: String(limit),
      sortBy: field,
      order: newOrder,
    });
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    updateParams({
      page: String(newPage),
      limit: String(limit),
    });
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const newCategory = event.target.value;

    updateParams({
      page: "0",
      limit: String(limit),
      category: newCategory || null,
    });
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    updateParams({
      page: "0",
      limit: event.target.value,
    });
  };

  return {
    page,
    limit,
    sortBy,
    order,
    category,
    search,
    searchParams,
    setSearchParams,
    handleSort,
    handlePageChange,
    handleCategoryChange,
    handleRowsPerPageChange,
  };
};
