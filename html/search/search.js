(function() {
  var link = document.createElement('a');
  link.target = '_blank';

  function displaySearchResults(results, store, keyword) {
    var searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<li><a target="_blank" href="/notes' + item.url + '"><h3>' + item.title + '</h3></a>';
        appendString += '<p>' + item.content.substring(0, 150) + '...</p></li>';
      }

      searchResults.innerHTML = appendString;
    } else {
      searchResults.innerHTML =
        '<li>What? No results found? <a class="google-it" target="_blank" href="https://www.google.com.hk/#newwindow=1&q='
        + encodeURIComponent('site:zhoukekestar.github.io ' + keyword)
        + '">Google it!</a></li>';
    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  // Initalize lunr with the fields it will be searching on. I've given title
  // a boost of 10 to indicate matches on this field are more important.
  var idx = lunr(function () {
    this.field('id');
    this.field('title', { boost: 10 });
    this.field('author');
    this.field('category');
    this.field('content');

    for (var key in window.store) { // Add the data to lunr
      this.add({
        'id': key,
        'title': window.store[key].title,
        'author': window.store[key].author,
        'category': window.store[key].category,
        'content': window.store[key].content
      });
    }
  });
  var searchBox = document.getElementById('search-box');

  function searchByKeyword (keyword) {
    var results = idx.search(keyword); // Get lunr to perform a search
    displaySearchResults(results, window.store, keyword); // We'll write this in the next section
  }

  // get result by query
  var searchTerm = getQueryVariable('query');
  if (searchTerm) {
    searchBox.setAttribute("value", searchTerm);
    searchByKeyword(searchTerm);
  }
  // search by input value
  searchBox.addEventListener('keypress', function (e) {
    searchByKeyword(this.value);

    if (e.keyCode === 13 || e.which === 13 || e.key === 'Enter') {
      console.log('That\'s all.');
    }
  })

  document.querySelector('button[google]').onclick = function () {
    link.href = 'https://www.google.com/search?q=' + encodeURIComponent('site:zhoukekestar.github.io ' + searchBox.value);
    link.click();
  }
  document.querySelector('button[bing]').onclick = function () {
    link.href = 'https://www.bing.com/search?q=' + encodeURIComponent('site:zhoukekestar.github.io ' + searchBox.value);
    link.click();
  }

  searchBox.focus();
  if (searchBox.value) {
    searchByKeyword(searchBox.value);
  }
})();
