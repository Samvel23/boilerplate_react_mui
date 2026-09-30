import type { ITranslationResource } from "../types";

export const en: ITranslationResource = {
  common: {
    appName: "Inventory",

    auth: {
      welcome: "Welcome",
      toContinue: "Sign in to continue",
      login: "Login",
      username: "Username",
      password: "Password",
      loggingIn: "Logging in...",
      loginFailed: "Login failed. Please check your username and password.",
      validationSummary: "Please correct the following errors:",
    },

    navigation: {
      home: "Home",
      products: "Products",
      createProduct: "Create product",
      logout: "Logout",
    },

    actions: {
      cancel: "Cancel",
      save: "Save changes",
      delete: "Delete product",
      retry: "Try again",
      back: "Back to products",
      tryAgain: "Try again",
    },

    language: {
      label: "Language",
      english: "English",
      french: "French",
      german: "German",
    },

    theme: {
      label: "Theme",
      light: "Light",
      dark: "Dark",
      system: "System",
    },

    products: {
      item_one: "{{count}} item",
      item_other: "{{count}} items",
    },

    pagination: {
      rowsPerPage: "Rows per page:",
      displayedRows: "{{from}}-{{to}} of {{count}} items",
    },

    productInfo: {
      inStock: "In stock: {{count}}",
      outOfStock: "Out of stock",
      rating: "Rating: {{rating}}",
      currentPrice: "Current product price",
    },

    productReviews: {
      title: "Reviews",
      subtitle: "Customer feedback",
      empty: "Reviews will appear here.",
    },

    dashboard: {
      title: "Dashboard",
      subtitle: "Overview of your product inventory",

      inventoryValue: {
        title: "Total inventory value",
        description: "Current value of all inventory",
      },

      lowStock: {
        title: "Low-stock items",
        description: "Products with stock under 10",
      },

      averageRating: {
        title: "Average rating",
        description: "Average rating across products",
      },

      chart: {
        title: "Stock Value by Category",
        subtitle: "Inventory value based on price × stock",
        empty: "No inventory data available.",
        ariaLabel: "Stock value by category",
      },

      loading: "Loading dashboard...",

      error: {
        title: "Unable to load dashboard",
        message: "We couldn't load the inventory data. Please try again.",
      },
    },

    productsPage: {
      title: "Products",
      subtitle: "Browse and manage products",
      createProduct: "Create product",
      loading: "Loading products...",
      error: "Failed to load products.",
      noProducts: "No products found.",
    },

    productSearch: {
      label: "Search products",
      placeholder: "Search by product name...",
    },

    productCategoryFilter: {
      label: "Category",
      all: "All categories",
    },

    productTable: {
      label: "Products table",
      id: "ID",
      product: "Product",
      category: "Category",
      price: "Price",
      rating: "Rating",
      stock: "Stock",
      modifiedLocally: "Modified locally",
      currency: "USD",
    },

    productDetails: {
      loading: "Loading product...",

      notFound: {
        title: "Product not found",
        message: "We couldn't load this product.",
      },

      back: "Back to products",
      title: "Product details",
      subtitle: "View and manage product information",

      delete: "Delete product",
      deleting: "Deleting...",

      modifiedLocally: "Modified locally",
      discardChanges: "Discard local changes",

      reviews: "Product reviews",
    },

    productForm: {
      createTitle: "Create product",
      editTitle: "Edit product",

      createDescription: "Enter the product information below.",
      editDescription: "Update the product information below.",

      validationSummary: "Please correct the following errors:",

      title: "Title",
      description: "Description",
      category: "Category",
      brand: "Brand",
      imageUrl: "Image URL",
      price: "Price",
      stock: "Stock",

      chooseCategory: "Choose a product category",
      imageUrlHelp: "Use a direct URL to an image",
      imageUrlPlaceholder: "https://example.com/product.jpg",

      titleRequired: "Title is required",
      descriptionRequired: "Description is required",
      categoryRequired: "Category is required",
      priceRequired: "Price is required",
      priceGreaterThanZero: "Price must be greater than 0",
      stockRequired: "Stock is required",
      stockWholeNumber: "Stock must be a whole number >= 0",

      saving: "Saving...",
      creating: "Creating...",
      saveChanges: "Save changes",
      createProduct: "Create product",
      noChanges: "No changes to save",
    },

    productActions: {
      created: "Product created successfully.",
      createFailed: "Failed to create product.",
      updated: "Product updated successfully.",
      updateFailed: "Failed to update product.",
      deleted: "Product deleted successfully.",
      deleteFailed: "Failed to delete product.",
    },

    productError: {
      title: "Failed to load products",
      description:
        "Something went wrong while loading the products. Please try again.",
      retry: "Retry loading",
    },

    date: {
      created: "Created",
      updated: "Updated",
    },

    currency: {
      label: "Currency",
    },
  },
};
