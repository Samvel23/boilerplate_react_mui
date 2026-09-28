import { useState } from "react";

import { createProduct } from "@/api/products/createProduct";
import { updateProduct } from "@/api/products/updateProduct";
import { deleteProduct } from "@/api/products/deleteProduct";

import { useProductChangesStore } from "@/stores/productChangesStore";

import type { IProduct } from "@/types/products";

export interface ProductFormValues {
  title: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  brand: string;
}

export const useProductActions = (product: IProduct | null) => {
  const [saving, setSaving] = useState(false);

  const productChanges = useProductChangesStore(
    (state) => state.productChanges,
  );

  const setProductChanges = useProductChangesStore(
    (state) => state.setProductChanges,
  );

  const discardProductChanges = useProductChangesStore(
    (state) => state.discardProductChanges,
  );

  const addCreatedProduct = useProductChangesStore(
    (state) => state.addCreatedProduct,
  );

  const deleteProductLocally = useProductChangesStore(
    (state) => state.deleteProductLocally,
  );

  const handleCreate = async (values: ProductFormValues) => {
    try {
      setSaving(true);

      const response = await createProduct({
        title: values.title,
        description: values.description,
        category: values.category,
        price: Number(values.price),
        stock: Number(values.stock),
        brand: values.brand || undefined,
      });

      addCreatedProduct(response.data);
    } catch (error) {
      console.error("Error creating product", error);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (values: ProductFormValues) => {
    if (!product) {
      return;
    }

    const previousChanges = productChanges[product.id] ?? {};

    const changes = {
      title: values.title,
      description: values.description,
      category: values.category,
      price: Number(values.price),
      stock: Number(values.stock),
      brand: values.brand || undefined,
    };

    try {
      setSaving(true);

      // Optimistic update
      setProductChanges(product.id, changes);

      await updateProduct({
        id: product.id,
        data: changes,
      });
    } catch (error) {
      // Rollback
      discardProductChanges(product.id);

      if (Object.keys(previousChanges).length > 0) {
        setProductChanges(product.id, previousChanges);
      }

      console.error("Error updating product", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!product) {
      return;
    }

    try {
      setSaving(true);

      await deleteProduct({
        id: product.id,
      });

      deleteProductLocally(product.id);
    } catch (error) {
      console.error("Error deleting product", error);
    } finally {
      setSaving(false);
    }
  };

  return {
    saving,
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
