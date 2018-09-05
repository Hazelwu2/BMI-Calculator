var Btn = document.getElementById('sendData');
var list = document.querySelector('.list');
var data = JSON.parse(localStorage.getItem('bmiList')) || [];

Btn.addEventListener('click', addList, false);
list.addEventListener('click', toggleDone, false);
window.addEventListener('keypress', function (e) {
  if (e.keyCode === 13) { Btn.click() }
})
updateList(data);

function addList() {
  let height = document.getElementById('bmiHeight').value;
  let weight = document.getElementById('bmiWeight').value;
  let m = height / 100;
  let BMI = (weight / (m * m)).toFixed(2);
  let statusBar = '';
  let status = '';

  let date = new Date();
  let MM = date.getMonth() + 1;
  let DD = date.getDate();
  let YY = date.getFullYear();
  if (DD < 10) { DD = '0' + DD }
  if (MM < 10) { MM = '0' + MM }
  let time = `${MM}-${DD}-${YY}`;

  if (BMI == 'NaN') {
    alert('客棺，你還沒有填數值呢！');
    return;
  }
  if (BMI < 18.5) {
    status = '過輕';
    statusBar = 'blue';
    Btn.setAttribute('class', statusBar);
  } else if (18.5 <= BMI && BMI < 24) {
    status = '理想';
    statusBar = 'green';
    Btn.setAttribute('class', statusBar);
  } else if (24 <= BMI && BMI <= 27) {
    status = '過重';
    statusBar = 'orange';
    Btn.setAttribute('class', statusBar);
  } else if (27 <= BMI && BMI < 30) {
    status = '輕度肥胖';
    statusBar = 'orange2';
    Btn.setAttribute('class', statusBar);
  } else if (30 <= BMI && BMI < 35) {
    status = '中度肥胖';
    statusBar = 'orange2';
    Btn.setAttribute('class', statusBar);
  } else if (BMI >= 35) {
    status = '重度肥胖';
    statusBar = 'red';
    Btn.setAttribute('class', statusBar);
  }
  var BMIdata = {
    status: status,
    statusBar: statusBar,
    BMI: BMI,
    height: height,
    weight: weight,
    time: time
  };
  data.push(BMIdata);
  updateList(data);
  localStorage.setItem('bmiList', JSON.stringify(data));
  weight = '';
  height = '';
}
function updateList(items) {
  var str = '';
  var itemLen = items.length;

  for (let i = 0; i < itemLen; i++) {
    str += `<li class="${items[i].statusBar}">
      <p class="ml-2 mr-4">${items[i].status}</p>
      <small>BMI</small><p>${items[i].BMI}</p>
      <small>weight</small><p>${items[i].weight}kg</p>
      <small>height</small><p>${items[i].height}cm</p>
      <small>${items[i].time}</small>
      <span class="cross" data-index="${i}"></span>
    </li>`;
  }
  list.innerHTML = str;
}

function toggleDone(e) {
  e.preventDefault();
  if (e.target.nodeName !== 'SPAN') { return }
  let index = e.target.dataset.index;
  data.splice(index, 1);
  updateList(data);
  localStorage.setItem('bmiList', JSON.stringify(data))
}

