export type TLanguage = "en" | "fr" | "de";

export interface ITranslationResource {
  common: {
    appName: string;

    auth: {
      welcome: string;
      toContinue: string;
      login: string;
      username: string;
      password: string;
      loggingIn: string;
      loginFailed: string;
      validationSummary: string;
    };

    navigation: {
      home: string;
      products: string;
      createProduct: string;
      logout: string;
    };

    actions: {
      cancel: string;
      save: string;
      delete: string;
      retry: string;
      back: string;
      tryAgain: string;
    };

    language: {
      label: string;
      english: string;
      french: string;
      german: string;
    };

    theme: {
      label: string;
      light: string;
      dark: string;
      system: string;
    };

    products: {
      item_one: string;
      item_other: string;
    };

    pagination: {
      rowsPerPage: string;
      displayedRows: string;
    };

    dashboard: {
      title: string;
      subtitle: string;

      inventoryValue: {
        title: string;
        description: string;
      };

      lowStock: {
        title: string;
        description: string;
      };

      averageRating: {
        title: string;
        description: string;
      };

      chart: {
        title: string;
        subtitle: string;
        empty: string;
        ariaLabel: string;
      };

      loading: string;

      error: {
        title: string;
        message: string;
      };
    };

    productsPage: {
      title: string;
      subtitle: string;
      createProduct: string;
      loading: string;
      error: string;
      noProducts: string;
    };

    productInfo: {
      inStock: string;
      outOfStock: string;
      rating: string;
      currentPrice: string;
    };

    productReviews: {
      title: string;
      subtitle: string;
      empty: string;
    };

    productSearch: {
      label: string;
      placeholder: string;
    };

    productCategoryFilter: {
      label: string;
      all: string;
    };

    productTable: {
      label: string;
      id: string;
      product: string;
      category: string;
      price: string;
      rating: string;
      stock: string;
      modifiedLocally: string;
      currency: string;
    };

    productDetails: {
      loading: string;

      notFound: {
        title: string;
        message: string;
      };

      back: string;
      title: string;
      subtitle: string;

      delete: string;
      deleting: string;

      modifiedLocally: string;
      discardChanges: string;

      reviews: string;
    };

    productForm: {
      createTitle: string;
      editTitle: string;

      createDescription: string;
      editDescription: string;

      validationSummary: string;

      title: string;
      description: string;
      category: string;
      brand: string;
      imageUrl: string;
      price: string;
      stock: string;

      chooseCategory: string;
      imageUrlHelp: string;
      imageUrlPlaceholder: string;

      titleRequired: string;
      descriptionRequired: string;
      categoryRequired: string;
      priceRequired: string;
      priceGreaterThanZero: string;
      stockRequired: string;
      stockWholeNumber: string;

      saving: string;
      creating: string;
      saveChanges: string;
      createProduct: string;
      noChanges: string;
    };

    productActions: {
      created: string;
      createFailed: string;
      updated: string;
      updateFailed: string;
      deleted: string;
      deleteFailed: string;
    };

    productError: {
      title: string;
      description: string;
      retry: string;
    };

    date: {
      created: string;
      updated: string;
    };

    currency: {
      label: string;
    };
  };
}
