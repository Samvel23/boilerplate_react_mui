import { useState } from "react";

import { useTranslation } from "react-i18next";

import { createProduct } from "@/api/products/createProduct";
import { deleteProduct } from "@/api/products/deleteProduct";
import { updateProduct } from "@/api/products/updateProduct";

import { useToast } from "@/hooks/useToast";

import { useProductChangesStore } from "@/stores/useProductChangesStore";

import type { IProduct } from "@/types/products";

export interface IProductFormValues {
  title: string;
  description: string;
  category: string;
  price: string;
  stock: string;
  brand: string;
  imageUrl: string;
}

export const useProductActions = (product: IProduct | null) => {
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { t } = useTranslation();
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

  const handleCreate = async (values: IProductFormValues) => {
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

      showToast(t("productActions.created"), "success");
    } catch (error) {
      console.error("Error creating product", error);

      showToast(t("productActions.createFailed"), "error");

      throw error;
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = async (values: IProductFormValues) => {
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

      if (isLocalProduct) {
        showToast(t("productActions.updated"), "success");

        return;
      }

      await updateProduct({
        id: product.id,
        data: changes,
      });

      showToast(t("productActions.updated"), "success");
    } catch (error) {
      discardProductChanges(product.id);

      if (Object.keys(previousChanges).length > 0) {
        setProductChanges(product.id, previousChanges);
      }

      console.error("Error updating product", error);

      showToast(t("productActions.updateFailed"), "error");
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

      if (isLocalProduct) {
        deleteProductLocally(product);

        showToast(t("productActions.deleted"), "success");

        return true;
      }

      await deleteProduct({
        id: product.id,
      });

      deleteProductLocally(product);

      showToast(t("productActions.deleted"), "success");

      return true;
    } catch (error) {
      console.error("Error deleting product", error);

      showToast(t("productActions.deleteFailed"), "error");

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
