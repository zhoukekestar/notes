(function () {
  var link = document.createElement("a");
  link.target = "_blank";

  var searchBox = document.getElementById("search-box");
  searchBox.addEventListener("keypress", function (e) {
    // searchByKeyword(this.value);

    if (e.keyCode === 13 || e.which === 13 || e.key === "Enter") {
      console.log("That's all.");
      link.href =
        "https://www.google.com/search?q=" +
        encodeURIComponent("site:zhoukekestar.github.io " + searchBox.value);
      link.click();
    }
  });

  document.querySelector("button[github]").onclick = function () {
    link.href =
      "https://github.com/search?type=code&q=" +
      encodeURIComponent("repo:zhoukekestar/notes " + searchBox.value);
    link.click();
  };
  
  document.querySelector("button[google]").onclick = function () {
    link.href =
      "https://www.google.com/search?q=" +
      encodeURIComponent("site:zhoukekestar.github.io " + searchBox.value);
    link.click();
  };
  document.querySelector("button[bing]").onclick = function () {
    link.href =
      "https://www.bing.com/search?q=" +
      encodeURIComponent("site:zhoukekestar.github.io " + searchBox.value);
    link.click();
  };
})();
