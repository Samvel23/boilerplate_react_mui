import { useEffect, useState } from "react";
import { Paper, TableContainer, Typography } from "@mui/material";

import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/api/products";

import type { ICategory, IProduct } from "@/types/products";
import { useDebounce } from "@/hooks/useDebounce";

import {
  ProductCategoryFilter,
  ProductPagination,
  ProductSearch,
  ProductTable,
} from "./elements";

import { useProductParams } from "./hooks";

export const ProductsPage = () => {
  const {
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
  } = useProductParams();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const [categories, setCategories] = useState<ICategory[]>([]);
  const [searchInput, setSearchInput] = useState(search);

  const debouncedSearch = useDebounce(searchInput, 500);

  // Keep search input synchronized with URL
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Update URL after debounce
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "0");
    params.set("limit", String(limit));

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  }, [debouncedSearch]);

  // Fetch products
  useEffect(() => {
    const controller = new AbortController();
    let isCurrent = true;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(false);

        const skip = page * limit;

        let response;

        if (search) {
          response = await searchProducts({
            query: search,
            limit,
            skip,
            sortBy,
            order,
            signal: controller.signal,
          });
        } else if (category) {
          response = await getProductsByCategory({
            category,
            limit,
            skip,
            sortBy,
            order,
            signal: controller.signal,
          });
        } else {
          response = await getProducts({
            limit,
            skip,
            sortBy,
            order,
            signal: controller.signal,
          });
        }

        if (!isCurrent) {
          return;
        }

        setProducts(response.data.products);
        setTotal(response.data.total);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        if (!isCurrent) {
          return;
        }

        setError(true);
        console.error("Fetching products failed", error);
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isCurrent = false;
      controller.abort();
    };
  }, [page, limit, sortBy, order, category, search, retryCount]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();

      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Products
      </Typography>

      <ProductSearch value={searchInput} onChange={setSearchInput} />

      <TableContainer component={Paper}>
        <ProductCategoryFilter
          value={category ?? ""}
          categories={categories}
          onChange={handleCategoryChange}
        />

        <ProductTable
          products={products}
          loading={loading}
          error={error}
          sortBy={sortBy}
          order={order}
          onSort={handleSort}
          onRetry={handleRetry}
        />

        <ProductPagination
          page={page}
          limit={limit}
          total={total}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </TableContainer>
    </div>
  );
};
