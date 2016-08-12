document.querySelector('#btnExcel').onclick = function() {
  ExcellentExport.excel(this, 'datatable', '报名表格1');
}

!(function(){
  var data = JSON.parse(localStorage.getItem('data') || '[]');
  var form =document.querySelector('form');
  var tmpl = document.querySelector('#tmpl-table');

  var refresh = function() {
    localStorage.setItem('data', JSON.stringify(data));

    var tr1 = '', tr2 = '';
    try {
      var sum = {};
      for (var i = 0, len = data.length; i < len; i++) {
        for (var j = 0, jlen = data[i].sub && data[i].sub.length; j < jlen; j++) {
          var t = data[i].sub[j];
          sum[t] = sum[t] || 0;
          sum[t]++;
        }
      }

      for (var item in sum) {
        tr1 += '<td>' + item + '</td>';
        tr2 += '<td>' + sum[item] + '</td>' ;
      }


    } catch (e) {
      console.log(e)
    }


    tmpl._updateBy({data: data, tr1: tr1, tr2: tr2});
  }

  form._data = function(d) {
    data.push(d);
    refresh();
    return null;
  }

  document.querySelector('#btn-ok').onclick = function() {
    form.submit();
    $('#myModal').modal('hide');
  }

  window.onload = function() {
    setTimeout(function(){
      refresh();
    }, 100)
  }
})();
