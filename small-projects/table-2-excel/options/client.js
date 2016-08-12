document.querySelector('#btnExcel').onclick = function() {
  ExcellentExport.excel(this, 'datatable', '报名表格1');
}

document.querySelector('.subjects').onchange = function(e) {

  if (e.target.nodeName === 'SELECT') {

    var input = e.target.parentNode.querySelector('input');
    input.value = input.dataset.type + e.target.value;
  }
}

!(function(){
  var data = JSON.parse(localStorage.getItem('data') || '[]');
  var form =document.querySelector('form');
  var tmpl = document.querySelector('#tmpl-table');

  var refresh = function() {
    localStorage.setItem('data', JSON.stringify(data));

    var tr1 = '<td>班级</td>', tr2 = '<td>人数</td>', tr3 = '<td>学费</td>';
    try {
      var sum = {};
      for (var i = 0, len = data.length; i < len; i++) {
        for (var j = 0, jlen = data[i].sub && data[i].sub.length; j < jlen; j++) {
          var t = data[i].sub[j];
          sum[t.name] = sum[t.name] || {number: 0, fee: 0};
          sum[t.name].number++;
          sum[t.name].fee += (+t.total);
        }
      }

      for (var item in sum) {
        tr1 += '<td>' + item + '</td>';
        tr2 += '<td>' + sum[item].number + '</td>' ;
        tr3 += '<td>' + sum[item].fee + '</td>' ;
      }


    } catch (e) {
      console.log(e)
    }


    tmpl._updateBy({data: data, tr1: tr1, tr2: tr2, tr3: tr3});
  }

  form._data = function(d) {
    if (!d.name) {
      alert('姓名未填写')
      return null;
    }
    d.id = Date.now() + (Math.random() + '').substring(2, 5);

    var t = [];
    for (var i = 1; i <= 10; i++) {
      if (d.sub['s' + i].name) {
        t.push(d.sub['s' + i]);
      }
    }
    d.sub = t;
    if (d.sub.length <= 0) {
      alert('学科未填写')
      return null;
    }
    data.push(d);
    refresh();
    $('#myModal').modal('hide');
    setTimeout(function(){
      form.reset();
    }, 1000)
    return null;
  }

  document.querySelector('#btn-ok').onclick = function() {
    form.submit();

  }

  window.onload = function() {
    setTimeout(function(){
      refresh();
    }, 100)
  }

  // 打印和删除按钮
  document.querySelector('#container').onclick = function(e) {

    if (e.target.classList.contains('btn-danger')) {
      if (!confirm('确认删除?')) {
        return;
      }
      var ele = e.target
        , id = ele.dataset.id;

      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].id === id) {

          console.log(ele.dataset.id + ' ' + i)
          data.splice(i, 1)
          refresh();
          return;
        }
      }

    } else if (e.target.classList.contains('btn-success')) {
      var ele = e.target
        , id = ele.dataset.id
        , tmplPrint = document.querySelector('#tmpl-print');

      console.log(ele.dataset.id)

      for (var i = 0, len = data.length; i < len; i++) {
        if (data[i].id === id) {
          console.log(ele.dataset.id + ' ' + i)
          console.log(data[i])
          tmplPrint._updateBy(data[i]);
          window.print();
          return;
        }
      }

    }
  }

  // 报名时计算学费
  var inputs = document.querySelectorAll('.other .num, .other .price');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].oninput = function(e) {
      var num = +(this.parentNode.querySelector('input.num').value || 0);
      var price = +(this.parentNode.querySelector('input.price').value || 0);

      this.parentNode.querySelector('input.total').value = num * price;

      var prices = document.querySelectorAll('input.total');
      var totalFee = 0;
      for (var i = 0; i < prices.length; i++) {
        totalFee += +(prices[i].value || 0);
      }
      document.querySelector('form .all-subjects-fee').innerHTML = '总学费' + totalFee + '元';
    }
  }


  // 导出所有班级表格
  document.querySelector('#btnExcelAllClasses').onclick = function(e) {

    var tables = {};
    for (var i = 0, len = data.length; i < len; i++) {
      for (var j = 0, jlen = data[i].sub.length; j < jlen; j++) {
        var name = data[i].place + '-' + data[i].level + '-' + data[i].sub[j].name;
        var table = tables[name] || [];
        table.push({
          name: data[i].name,
          tel: data[i].tel,
          school: data[i].school,
          num: data[i].sub[j].num,
          total: data[i].sub[j].total
        });
        tables[name] = table;
      }
    }

    var names = []
      , self = this;
    for (var i in tables) {
      names.push(i);
    }

    var exportExcel = function(table, name, index) {

      var html = document.createElement('table');
      var link = document.createElement('a');
      link.href = '#' + Date.now();

      html.innerHTML = '<tr><td>姓名</td><td>联系方式</td><td>学校</td><td>报名课时（节）</td><td>学费（元）</td></tr>';
      for (var i = 0; i < table.length; i++) {
        html.innerHTML += '<tr><td>' + table[i].name + '</td><td>' + table[i].tel + '</td><td>' + table[i].school + '</td><td>' + table[i].num + '</td><td>' + table[i].total + '</td></tr>'
      }
      link.download = name + '.xls';
      ExcellentExport.excel(link, html, name);
      document.body.appendChild(link);
      link.click();

      index++;
      if (index < names.length) {
        setTimeout(function(){
          link.remove();
          exportExcel(tables[names[index]], names[index], index)
        }, 1000);
      }
    }

    exportExcel(tables[names[0]], names[0], 0)
    // this.download = '.xls'
  }

})();
