"use strict";function addList(){var t=document.getElementById("bmiHeight").value,e=document.getElementById("bmiWeight").value,a=t/100,s=(e/(a*a)).toFixed(2),n="",l="",i=new Date,r=i.getMonth()+1,d=i.getDate();d<10&&(d="0"+d),r<10&&(r="0"+r);var o=r+"-"+d+"-"+i.getFullYear();if("NaN"!=s){s<18.5?(l="過輕",n="blue",Btn.setAttribute("class",n)):18.5<=s&&s<24?(l="理想",n="green",Btn.setAttribute("class",n)):24<=s&&s<=27?(l="過重",n="orange",Btn.setAttribute("class",n)):27<=s&&s<30?(l="輕度肥胖",n="orange2",Btn.setAttribute("class",n)):30<=s&&s<35?(l="中度肥胖",n="orange2",Btn.setAttribute("class",n)):35<=s&&(l="重度肥胖",n="red",Btn.setAttribute("class",n)),document.querySelector(".lookResult").textContent="",document.querySelector(".value").textContent=s,document.querySelector(".bmi").textContent="BMI";var u={status:l,statusBar:n,BMI:s,height:t,weight:e,time:o};data.push(u),updateList(data),localStorage.setItem("bmiList",JSON.stringify(data)),t=e=""}else alert("客棺，你還沒有填數值呢！")}function updateList(t){for(var e="",a=t.length,s=0;s<a;s++)e+='<li class="'+t[s].statusBar+'">\n      <p class="ml-2 mr-4">'+t[s].status+"</p>\n      <small>BMI</small><p>"+t[s].BMI+"</p>\n      <small>weight</small><p>"+t[s].weight+"kg</p>\n      <small>height</small><p>"+t[s].height+"cm</p>\n      <small>"+t[s].time+'</small>\n      <span class="cross" data-index="'+s+'"></span>\n    </li>';list.innerHTML=e}function toggleDone(t){if(t.preventDefault(),"SPAN"===t.target.nodeName){var e=t.target.dataset.index;data.splice(e,1),updateList(data),localStorage.setItem("bmiList",JSON.stringify(data))}}var Btn=document.getElementById("sendData"),list=document.querySelector(".list"),data=JSON.parse(localStorage.getItem("bmiList"))||[];Btn.addEventListener("click",addList,!1),list.addEventListener("click",toggleDone,!1),window.addEventListener("keypress",function(t){13===t.keyCode&&Btn.click()}),updateList(data);