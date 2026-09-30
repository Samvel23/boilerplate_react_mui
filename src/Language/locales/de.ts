import type { ITranslationResource } from "../types";

export const de: ITranslationResource = {
  common: {
    appName: "Inventar",

    auth: {
      welcome: "Willkommen",
      toContinue: "Melden Sie sich an, um fortzufahren",
      login: "Anmelden",
      username: "Benutzername",
      password: "Passwort",
      loggingIn: "Anmeldung...",
      loginFailed:
        "Anmeldung fehlgeschlagen. Bitte überprüfen Sie Ihren Benutzernamen und Ihr Passwort.",
      validationSummary: "Bitte korrigieren Sie die folgenden Fehler:",
    },

    navigation: {
      home: "Startseite",
      products: "Produkte",
      createProduct: "Produkt erstellen",
      logout: "Abmelden",
    },

    actions: {
      cancel: "Abbrechen",
      save: "Änderungen speichern",
      delete: "Produkt löschen",
      retry: "Erneut versuchen",
      back: "Zurück zu den Produkten",
      tryAgain: "Erneut versuchen",
    },

    language: {
      label: "Sprache",
      english: "Englisch",
      french: "Französisch",
      german: "Deutsch",
    },

    theme: {
      label: "Design",
      light: "Hell",
      dark: "Dunkel",
      system: "System",
    },

    products: {
      item_one: "{{count}} Artikel",
      item_other: "{{count}} Artikel",
    },

    pagination: {
      rowsPerPage: "Zeilen pro Seite:",
      displayedRows: "{{from}}–{{to}} von {{count}} Artikeln",
    },

    productInfo: {
      inStock: "Auf Lager: {{count}}",
      outOfStock: "Nicht auf Lager",
      rating: "Bewertung: {{rating}}",
      currentPrice: "Aktueller Produktpreis",
    },

    productReviews: {
      title: "Bewertungen",
      subtitle: "Kundenfeedback",
      empty: "Bewertungen werden hier angezeigt.",
    },

    dashboard: {
      title: "Dashboard",
      subtitle: "Übersicht über Ihr Produktinventar",

      inventoryValue: {
        title: "Gesamtwert des Inventars",
        description: "Aktueller Wert des gesamten Inventars",
      },

      lowStock: {
        title: "Produkte mit niedrigem Bestand",
        description: "Produkte mit einem Bestand unter 10",
      },

      averageRating: {
        title: "Durchschnittliche Bewertung",
        description: "Durchschnittliche Bewertung aller Produkte",
      },

      chart: {
        title: "Bestandswert nach Kategorie",
        subtitle: "Inventarwert basierend auf Preis × Bestand",
        empty: "Keine Inventardaten verfügbar.",
        ariaLabel: "Bestandswert nach Kategorie",
      },

      loading: "Dashboard wird geladen...",

      error: {
        title: "Dashboard konnte nicht geladen werden",
        message:
          "Die Inventardaten konnten nicht geladen werden. Bitte versuchen Sie es erneut.",
      },
    },

    productsPage: {
      title: "Produkte",
      subtitle: "Produkte durchsuchen und verwalten",
      createProduct: "Produkt erstellen",
      loading: "Produkte werden geladen...",
      error: "Produkte konnten nicht geladen werden.",
      noProducts: "Keine Produkte gefunden.",
    },

    productSearch: {
      label: "Produkte suchen",
      placeholder: "Nach Produktnamen suchen...",
    },

    productCategoryFilter: {
      label: "Kategorie",
      all: "Alle Kategorien",
    },

    productTable: {
      label: "Produkttabelle",
      id: "ID",
      product: "Produkt",
      category: "Kategorie",
      price: "Preis",
      rating: "Bewertung",
      stock: "Bestand",
      modifiedLocally: "Lokal geändert",
      currency: "USD",
    },

    productDetails: {
      loading: "Produkt wird geladen...",

      notFound: {
        title: "Produkt nicht gefunden",
        message: "Dieses Produkt konnte nicht geladen werden.",
      },

      back: "Zurück zu den Produkten",
      title: "Produktdetails",
      subtitle: "Produktinformationen anzeigen und verwalten",

      delete: "Produkt löschen",
      deleting: "Wird gelöscht...",

      modifiedLocally: "Lokal geändert",
      discardChanges: "Lokale Änderungen verwerfen",

      reviews: "Produktbewertungen",
    },

    productForm: {
      createTitle: "Produkt erstellen",
      editTitle: "Produkt bearbeiten",

      createDescription: "Geben Sie unten die Produktinformationen ein.",
      editDescription: "Aktualisieren Sie unten die Produktinformationen.",

      validationSummary: "Bitte korrigieren Sie die folgenden Fehler:",

      title: "Titel",
      description: "Beschreibung",
      category: "Kategorie",
      brand: "Marke",
      imageUrl: "Bild-URL",
      price: "Preis",
      stock: "Bestand",

      chooseCategory: "Wählen Sie eine Produktkategorie",
      imageUrlHelp: "Verwenden Sie eine direkte URL zu einem Bild",
      imageUrlPlaceholder: "https://example.com/product.jpg",

      titleRequired: "Titel ist erforderlich",
      descriptionRequired: "Beschreibung ist erforderlich",
      categoryRequired: "Kategorie ist erforderlich",
      priceRequired: "Der Preis ist erforderlich",
      priceGreaterThanZero: "Der Preis muss größer als 0 sein",
      stockRequired: "Bestand ist erforderlich",
      stockWholeNumber: "Der Bestand muss eine ganze Zahl >= 0 sein",

      saving: "Wird gespeichert...",
      creating: "Wird erstellt...",
      saveChanges: "Änderungen speichern",
      createProduct: "Produkt erstellen",
      noChanges: "Keine Änderungen zu speichern",
    },

    productActions: {
      created: "Produkt erfolgreich erstellt.",
      createFailed: "Produkt konnte nicht erstellt werden.",
      updated: "Produkt erfolgreich aktualisiert.",
      updateFailed: "Produkt konnte nicht aktualisiert werden.",
      deleted: "Produkt erfolgreich gelöscht.",
      deleteFailed: "Produkt konnte nicht gelöscht werden.",
    },

    productError: {
      title: "Produkte konnten nicht geladen werden",
      description:
        "Beim Laden der Produkte ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.",
      retry: "Erneut laden",
    },

    date: {
      created: "Erstellt",
      updated: "Aktualisiert",
    },

    currency: {
      label: "Währung",
    },
  },
};
