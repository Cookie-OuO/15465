
let current=[];
function startExam(n){
 current=[...questions].sort(()=>Math.random()-0.5).slice(0,Math.min(n,questions.length));
 render(current);
}
function render(arr){
 let html='';
 arr.forEach(q=>{
 html+=`<div class="card"><h3>${q.id}. ${q.q}</h3>`;
 q.options.forEach((o,i)=>{
 html+=`<label><input type="radio" name="q${q.id}" value="${i}">${o}</label><br>`;
 });
 html+=`<button onclick="check(${q.id})">送出答案</button></div>`;
 });
 document.getElementById('app').innerHTML=html;
}
function check(id){
 const q=questions.find(x=>x.id===id);
 const ans=document.querySelector('input[name=q'+id+']:checked');
 if(!ans){alert('請選答案');return;}
 if(+ans.value===q.answer){alert('答對');}
 else{
   alert('答錯');
   let w=JSON.parse(localStorage.getItem('wrong')||'[]');
   if(!w.includes(id)) w.push(id);
   localStorage.setItem('wrong',JSON.stringify(w));
 }
}
function showWrong(){
 let w=JSON.parse(localStorage.getItem('wrong')||'[]');
 render(questions.filter(x=>w.includes(x.id)));
}
function showAll(){render(questions);}
