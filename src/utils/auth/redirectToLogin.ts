export const redirectToLogin = () => {
  const currentUrl =
    window.location.pathname + window.location.search + window.location.hash;

  const redirectUrl = encodeURIComponent(currentUrl);

  window.location.href = `/login?redirect=${redirectUrl}`;
};
