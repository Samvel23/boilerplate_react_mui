import { useEffect, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  TableSortLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  type SelectChangeEvent,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";

import {
  getCategories,
  getProducts,
  getProductsByCategory,
  searchProducts,
} from "@/api/products";
import type { ICategory, IProduct } from "@/types/products";
import { useDebounce } from "@/hooks/useDebounce";
import { TextField } from "@/components";

export const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page") ?? 0);
  const limit = Number(searchParams.get("limit") ?? 10);

  const sortBy = searchParams.get("sortBy") ?? "";

  const orderParam = searchParams.get("order") as "asc" | "desc";
  const order: "asc" | "desc" =
    orderParam === "asc" ? "asc" : orderParam === "desc" ? "desc" : "asc";

  const category = searchParams.get("category");
  const search = searchParams.get("search") ?? "";

  const [products, setProducts] = useState<IProduct[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
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
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const skip = page * limit;

        let response;

        if (search) {
          response = await searchProducts({
            query: search,
            limit,
            skip,
            sortBy,
            order,
          });
        } else if (category) {
          response = await getProductsByCategory({
            category,
            limit,
            skip,
            sortBy,
            order,
          });
        } else {
          response = await getProducts({
            limit,
            skip,
            sortBy,
            order,
          });
        }

        setProducts(response.data.products);
        setTotal(response.data.total);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, sortBy, order, category, search]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();

      setCategories(response.data);
    };

    fetchCategories();
  }, []);

  const handleSort = (field: string) => {
    let newOrder: "asc" | "desc";

    if (field === sortBy) {
      newOrder = order === "asc" ? "desc" : "asc";
    } else {
      newOrder = "asc";
    }

    const params = new URLSearchParams(searchParams);

    params.set("page", "0");
    params.set("limit", String(limit));
    params.set("sortBy", field);
    params.set("order", newOrder);

    setSearchParams(params);
  };

  const handlePageChange = (_event: unknown, newPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(newPage));
    params.set("limit", String(limit));

    setSearchParams(params);
  };

  const handleCategoryChange = (event: SelectChangeEvent) => {
    const newCategory = event.target.value;

    const params = new URLSearchParams(searchParams);

    params.set("page", "0");
    params.set("limit", String(limit));

    if (newCategory) {
      params.set("category", newCategory);
    } else {
      params.delete("category");
    }

    setSearchParams(params);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", "0");
    params.set("limit", event.target.value);

    setSearchParams(params);
  };

  return (
    <div>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Products
      </Typography>

      <TextField
        label="Search products"
        value={searchInput}
        onChange={(event) => {
          setSearchInput(event.target.value);
        }}
      />

      <TableContainer component={Paper}>
        <FormControl>
          <InputLabel>Category</InputLabel>

          <Select
            value={category ?? ""}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">All</MenuItem>

            {categories.map((item) => (
              <MenuItem key={item.slug} value={item.slug}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Category</TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortBy === "price"}
                  direction={sortBy === "price" ? order : "asc"}
                  onClick={() => handleSort("price")}
                >
                  Price
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortBy === "rating"}
                  direction={sortBy === "rating" ? order : "asc"}
                  onClick={() => handleSort("rating")}
                >
                  Rating
                </TableSortLabel>
              </TableCell>

              <TableCell>
                <TableSortLabel
                  active={sortBy === "stock"}
                  direction={sortBy === "stock" ? order : "asc"}
                  onClick={() => handleSort("stock")}
                >
                  Stock
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6}>Loading...</TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.title}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>{product.rating}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page}
          rowsPerPage={limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
          rowsPerPageOptions={[5, 10, 20, 30]}
        />
      </TableContainer>
    </div>
  );
};
