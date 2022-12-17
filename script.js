var pbtn = document.getElementById("pbtn")
var inpbox = document.getElementById("inpbox");
var sbtn = document.getElementById("sbtn");
var data = document.getElementById("data");
var num = document.getElementById("num");
var HistoryContainer = document.getElementById("HistoryContainer");
var credit = document.getElementById("credit");
var debit = document.getElementById("debit");
var pbar = document.getElementById("pbar")
var store = true;
var counter = 1;
var prevkey = Object.keys(localStorage);
function Atfirst(){
    store = false;
    prevkey.forEach((items)=>{
        var nums = localStorage.getItem(items);
        createBox(items,nums);
    })
    store = true;
}
Atfirst();


function takeInputs(){
    pbtn.style.display = "none";
    inpbox.style.display = "block";
}
function disAppear(){
    pbtn.style.display = "none";
    inpbox.style.display = "block";
}
function Appear(){
    pbtn.style.display = "block";
    inpbox.style.display = "none";
}
sbtn.addEventListener("click", function() {
    var insert = true;
    var tdata = data.value;
    var tnum = num.value;
    if(tdata.trim().length === 0 || tnum.trim().length === 0){
        alert("Data And Value Should Not Be Empty");
        insert = false;
    }
    if(insert){
    console.log(tdata + " " + tnum);
    createBox(tdata,tnum);
    }
  });

  function createBox(tdata,tnum){
    var tempnum = tnum.substring(1,tnum.length);
    var d = document.createElement("div");
    if(tnum[0] == '-'){
        d.setAttribute("class","hdatasr shadow-sm");
        changeDebit(tempnum);
    }else{
        d.setAttribute("class","hdatag shadow-sm");
        changeCredit(tnum);
    }
    var p1 = document.createElement("p");
    p1.setAttribute("style","font-weight: bolder;");
    p1.textContent = tdata;
    p1.setAttribute('id',"name"+counter);
    var i = document.createElement("i")
    i.setAttribute("class","fa fa-trash-o");
    i.setAttribute("style","float:right");
    i.setAttribute("onclick","deleteId(name"+counter+")");
    var p2 = document.createElement("p");
    if(tnum[0] == '-'){
        p2.setAttribute("class","tr");
    }else{
        p2.setAttribute("class","tg");
    }
    p2.textContent = tnum;
    d.appendChild(p1);
    d.appendChild(i);
    d.appendChild(p2);
    HistoryContainer.appendChild(d);
    Appear();
    data.value = "";
    num.value = "";
    if(store){
        localStorage.setItem(tdata,tnum);
    }
    counter++;
  }
  function changeCredit(tnum){
    var add = tnum;
    add = parseInt(tnum);
    var x = credit.innerText;
    x = parseInt(x);
    console.log(x+add);
    credit.innerText = x + add;
    HandleExpense();
  }
  function changeDebit(tnum){
    var add = tnum;
    add = parseInt(tnum);
    var x = debit.innerText;
    x = parseInt(x);
    console.log(x+add);
    debit.innerText = x + add;
    HandleExpense();
  }
  function HandleExpense(){
      var c = parseInt(document.getElementById("credit").innerText);
      var d = parseInt(document.getElementById("debit").innerText);
      var r = c - d;
      document.getElementById("expense").innerText = r;
      Setbar(c,d,r);
  }
  function deleteId(name){
    HistoryContainer.innerHTML = "";
    localStorage.removeItem(name.innerText);
    prevkey = Object.keys(localStorage);
    credit.innerText = 0;
    debit.innerText = 0;
    if(prevkey.length == 0){
        document.getElementById("expense").innerText = 0;
        pbar.setAttribute("style","width:0%;");
    }
    Atfirst();
  }
  function Setbar(c,d,r){
    if(r === 0){
        pbar.setAttribute("style","width:0%;");
    }
    else if(c  > d){
        console.log("Credit " + (r/c)*100);
        pbar.setAttribute("style","width:"+(r/c)*100+"%;");
        pbar.setAttribute("class","progress-bar bg-success");
    }else{
        console.log("Debit " + (r/d)*100);
        pbar.setAttribute("style","width:"+(Math.abs(r)/d)*100+"%;");
        pbar.setAttribute("class","progress-bar bg-danger");
    }
  }
  function Validate(x){
     if(x[0] === '-'||true){
        if(isNaN(x.substring(1))){
            num.value = "";
        }
     }
  }
