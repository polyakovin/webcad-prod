try {
  if (localStorage.getItem("webcad.theme") === "dark") {
    document.documentElement.dataset.theme = "dark";
  }
} catch {
  // Storage may be unavailable. The page still opens in light mode.
}
