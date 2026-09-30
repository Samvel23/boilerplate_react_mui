import type { ITranslationResource } from "../types";

export const fr: ITranslationResource = {
  common: {
    appName: "Inventaire",

    auth: {
      welcome: "Bienvenue",
      toContinue: "Connectez-vous pour continuer",
      login: "Se connecter",
      username: "Nom d'utilisateur",
      password: "Mot de passe",
      loggingIn: "Connexion...",
      loginFailed:
        "Échec de la connexion. Vérifiez votre nom d'utilisateur et votre mot de passe.",
      validationSummary: "Veuillez corriger les erreurs suivantes :",
    },

    navigation: {
      home: "Accueil",
      products: "Produits",
      createProduct: "Créer un produit",
      logout: "Déconnexion",
    },

    actions: {
      cancel: "Annuler",
      save: "Enregistrer les modifications",
      delete: "Supprimer le produit",
      retry: "Réessayer",
      back: "Retour aux produits",
      tryAgain: "Réessayer",
    },

    language: {
      label: "Langue",
      english: "Anglais",
      french: "Français",
      german: "Allemand",
    },

    theme: {
      label: "Thème",
      light: "Clair",
      dark: "Sombre",
      system: "Système",
    },

    products: {
      item_one: "{{count}} article",
      item_other: "{{count}} articles",
    },

    pagination: {
      rowsPerPage: "Lignes par page :",
      displayedRows: "{{from}}-{{to}} sur {{count}} articles",
    },

    productInfo: {
      inStock: "En stock : {{count}}",
      outOfStock: "Rupture de stock",
      rating: "Note : {{rating}}",
      currentPrice: "Prix actuel du produit",
    },

    productReviews: {
      title: "Avis",
      subtitle: "Commentaires des clients",
      empty: "Les avis apparaîtront ici.",
    },

    dashboard: {
      title: "Tableau de bord",
      subtitle: "Vue d'ensemble de votre inventaire",

      inventoryValue: {
        title: "Valeur totale de l'inventaire",
        description: "Valeur actuelle de tout l'inventaire",
      },

      lowStock: {
        title: "Articles en faible stock",
        description: "Produits avec un stock inférieur à 10",
      },

      averageRating: {
        title: "Note moyenne",
        description: "Note moyenne de tous les produits",
      },

      chart: {
        title: "Valeur du stock par catégorie",
        subtitle: "Valeur de l'inventaire basée sur le prix × le stock",
        empty: "Aucune donnée d'inventaire disponible.",
        ariaLabel: "Valeur du stock par catégorie",
      },

      loading: "Chargement du tableau de bord...",

      error: {
        title: "Impossible de charger le tableau de bord",
        message:
          "Nous n'avons pas pu charger les données d'inventaire. Veuillez réessayer.",
      },
    },

    productsPage: {
      title: "Produits",
      subtitle: "Parcourir et gérer les produits",
      createProduct: "Créer un produit",
      loading: "Chargement des produits...",
      error: "Impossible de charger les produits.",
      noProducts: "Aucun produit trouvé.",
    },

    productSearch: {
      label: "Rechercher des produits",
      placeholder: "Rechercher par nom de produit...",
    },

    productCategoryFilter: {
      label: "Catégorie",
      all: "Toutes les catégories",
    },

    productTable: {
      label: "Tableau des produits",
      id: "ID",
      product: "Produit",
      category: "Catégorie",
      price: "Prix",
      rating: "Note",
      stock: "Stock",
      modifiedLocally: "Modifié localement",
      currency: "USD",
    },

    productDetails: {
      loading: "Chargement du produit...",

      notFound: {
        title: "Produit introuvable",
        message: "Impossible de charger ce produit.",
      },

      back: "Retour aux produits",
      title: "Détails du produit",
      subtitle: "Consultez et gérez les informations du produit",

      delete: "Supprimer le produit",
      deleting: "Suppression...",

      modifiedLocally: "Modifié localement",
      discardChanges: "Annuler les modifications locales",

      reviews: "Avis sur le produit",
    },

    productForm: {
      createTitle: "Créer un produit",
      editTitle: "Modifier un produit",

      createDescription: "Saisissez les informations du produit ci-dessous.",
      editDescription: "Modifiez les informations du produit ci-dessous.",

      validationSummary: "Veuillez corriger les erreurs suivantes :",

      title: "Titre",
      description: "Description",
      category: "Catégorie",
      brand: "Marque",
      imageUrl: "URL de l'image",
      price: "Prix",
      stock: "Stock",

      chooseCategory: "Choisissez une catégorie de produit",
      imageUrlHelp: "Utilisez une URL directe vers une image",
      imageUrlPlaceholder: "https://example.com/product.jpg",

      titleRequired: "Le titre est obligatoire",
      descriptionRequired: "La description est obligatoire",
      categoryRequired: "La catégorie est obligatoire",
      priceRequired: "Le prix est obligatoire",
      priceGreaterThanZero: "Le prix doit être supérieur à 0",
      stockRequired: "Le stock est obligatoire",
      stockWholeNumber: "Le stock doit être un nombre entier >= 0",

      saving: "Enregistrement...",
      creating: "Création...",
      saveChanges: "Enregistrer les modifications",
      createProduct: "Créer le produit",
      noChanges: "Aucune modification à enregistrer",
    },

    productActions: {
      created: "Produit créé avec succès.",
      createFailed: "Échec de la création du produit.",
      updated: "Produit mis à jour avec succès.",
      updateFailed: "Échec de la mise à jour du produit.",
      deleted: "Produit supprimé avec succès.",
      deleteFailed: "Échec de la suppression du produit.",
    },

    productError: {
      title: "Impossible de charger les produits",
      description:
        "Une erreur s'est produite lors du chargement des produits. Veuillez réessayer.",
      retry: "Réessayer le chargement",
    },

    date: {
      created: "Créé le",
      updated: "Mis à jour",
    },

    currency: {
      label: "Devise",
    },
  },
};
