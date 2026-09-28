import { useEffect, useRef, useState } from "react";
import { Box, Paper, TableContainer, Typography } from "@mui/material";

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

import styles from "./ProductsPage.module.scss";

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

  const previousSearch = useRef(search);

  // Keep search input synchronized with URL
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Update URL after search debounce
  useEffect(() => {
    if (debouncedSearch === previousSearch.current) {
      return;
    }

    previousSearch.current = debouncedSearch;

    const params = new URLSearchParams(searchParams);

    // Searching always starts from page 0
    params.set("page", "0");

    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    } else {
      params.delete("search");
    }

    setSearchParams(params);
  }, [debouncedSearch, searchParams, setSearchParams]);

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
      try {
        const response = await getCategories();

        setCategories(response.data);
      } catch (error) {
        console.error("Fetching categories failed", error);
      }
    };

    fetchCategories();
  }, []);

  const handleRetry = () => {
    setRetryCount((count) => count + 1);
  };

  return (
    <Box className={styles.page}>
      <Box className={styles.container}>
        <Box className={styles.header}>
          <Typography variant="h4" className={styles.title}>
            Products
          </Typography>

          <Typography variant="body2" className={styles.subtitle}>
            Browse and manage products
          </Typography>
        </Box>

        <Box className={styles.searchSection}>
          <ProductSearch value={searchInput} onChange={setSearchInput} />
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          className={styles.tableCard}
        >
          <Box className={styles.categorySection}>
            <ProductCategoryFilter
              value={category ?? ""}
              categories={categories}
              onChange={handleCategoryChange}
            />
          </Box>

          <ProductTable
            products={products}
            loading={loading}
            error={error}
            sortBy={sortBy}
            order={order}
            onSort={handleSort}
            onRetry={handleRetry}
          />

          <Box className={styles.paginationSection}>
            <ProductPagination
              page={page}
              limit={limit}
              total={total}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
};
