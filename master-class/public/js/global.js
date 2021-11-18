
// Loader


let loader;

function loader_page() {
  loader = setTimeout(showPage, 3000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
//   document.getElementById("main").style.display = "block";
// let low_all = document.getElementsByClassName('low-btn');
// for (var i = 0; i < low_all.length; i++) {
//     low_all[i].style.color = '#6366f1 ';
//     low_all[i].style.background = '#e0e7ff';
// }
  document.getElementById("animation-zoom-out").style.display = "block";
}

