import { useState } from "react";

import { createProduct } from "@/api/products/createProduct";
import { deleteProduct } from "@/api/products/deleteProduct";
import { updateProduct } from "@/api/products/updateProduct";

import { useToast } from "@/hooks/useToast";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

import type { IProduct } from "@/types/products";

export interface ProductFormValues {
  title: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  brand: string;
  imageUrl: string;
}

let localProductId = 100000;

const createLocalProductId = () => {
  localProductId += 1;

  return localProductId;
};

export const useProductActions = (product: IProduct | null) => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { showToast } = useToast();

  const productChanges = useProductChangesStore(
    (state) => state.productChanges,
  );

  const createdProducts = useProductChangesStore(
    (state) => state.createdProducts,
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

  const isLocalProduct = product
    ? createdProducts.some((createdProduct) => createdProduct.id === product.id)
    : false;

  const handleCreate = async (values: ProductFormValues) => {
    try {
      setSaving(true);

      const response = await createProduct({
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        price: Number(values.price),
        stock: Number(values.stock),
        brand: values.brand.trim() || undefined,
      });

      const imageUrl =
        values.imageUrl.trim() || "https://placehold.co/600x400?text=Product";

      const createdProduct: IProduct = {
        ...response.data,
        id: createLocalProductId(),
        title: values.title.trim(),
        description: values.description.trim(),
        category: values.category,
        price: Number(values.price),
        stock: Number(values.stock),
        brand: values.brand.trim() || undefined,
        discountPercentage: response.data.discountPercentage ?? 0,
        rating: response.data.rating ?? 0,
        thumbnail: imageUrl,
        images: [imageUrl],
      };

      addCreatedProduct(createdProduct);

      showToast("Product created successfully.", "success");
    } catch (error) {
      console.error("Error creating product", error);

      showToast("Failed to create product.", "error");

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (values: ProductFormValues) => {
    if (!product) {
      return;
    }

    const previousChanges = productChanges[product.id] ?? {};

    const changes: Partial<IProduct> = {
      title: values.title.trim(),
      description: values.description.trim(),
      category: values.category,
      price: Number(values.price),
      stock: Number(values.stock),
      brand: values.brand.trim() || undefined,
    };

    if (values.imageUrl.trim()) {
      changes.thumbnail = values.imageUrl.trim();

      changes.images = [values.imageUrl.trim()];
    }

    try {
      setSaving(true);

      setProductChanges(product.id, changes);

      /*
       * Locally-created products don't exist
       * on the API, regardless of their ID.
       */
      if (isLocalProduct) {
        showToast("Product updated successfully.", "success");

        return;
      }

      await updateProduct({
        id: product.id,
        data: changes,
      });

      showToast("Product updated successfully.", "success");
    } catch (error) {
      discardProductChanges(product.id);

      if (Object.keys(previousChanges).length > 0) {
        setProductChanges(product.id, previousChanges);
      }

      console.error("Error updating product", error);

      showToast("Failed to update product.", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (): Promise<boolean> => {
    if (!product) {
      return false;
    }

    try {
      setDeleting(true);

      /*
       * Locally-created products should NEVER
       * make an API DELETE request.
       *
       * This works for both:
       * - old negative IDs
       * - new positive local IDs
       */
      if (isLocalProduct) {
        deleteProductLocally(product.id);

        showToast("Product deleted successfully.", "success");

        return true;
      }

      /*
       * Real API product.
       */
      await deleteProduct({
        id: product.id,
      });

      deleteProductLocally(product.id);

      showToast("Product deleted successfully.", "success");

      return true;
    } catch (error) {
      console.error("Error deleting product", error);

      showToast("Failed to delete product.", "error");

      return false;
    } finally {
      setDeleting(false);
    }
  };

  return {
    saving,
    deleting,
    handleCreate,
    handleEdit,
    handleDelete,
  };
};
