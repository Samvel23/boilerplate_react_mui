import { useEffect, useState } from "react";

import { getCategories } from "@/api/products";

import type { ICategory } from "@/types/products";

let categoriesCache: ICategory[] | null = null;
let categoriesPromise: Promise<ICategory[]> | null = null;

export const useCategories = () => {
  const [categories, setCategories] = useState<ICategory[]>(
    () => categoriesCache ?? [],
  );

  const [loading, setLoading] = useState(() => categoriesCache === null);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (categoriesCache) {
      return;
    }

    let active = true;

    if (!categoriesPromise) {
      categoriesPromise = getCategories()
        .then((response) => {
          categoriesCache = response.data;

          return response.data;
        })
        .finally(() => {
          categoriesPromise = null;
        });
    }

    categoriesPromise
      .then((data) => {
        if (!active) {
          return;
        }

        setCategories(data);
        setError(false);
        setLoading(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }

        setError(true);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    categories,
    loading,
    error,
  };
};
