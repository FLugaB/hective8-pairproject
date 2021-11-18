
// Loader


let loader;

function loader_page() {
  loader = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("animation-zoom-out").style.display = "block";
}

