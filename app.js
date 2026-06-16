
function loadRandom(){
 let q=questions.sort(()=>Math.random()-0.5).slice(0,100);
 render(q);
}
function render(list){
 const d=document.getElementById('quiz');
 d.innerHTML='';
 list.forEach(x=>{
   const div=document.createElement('div');
   div.innerHTML=`<h3>${x.id}. ${x.q}</h3>`+x.options.map((o,i)=>`<label><input type="radio" name="q${x.id}" value="${i}">${o}</label><br>`).join('')+`<button onclick="check(${x.id})">送出</button><hr>`;
   d.appendChild(div);
 });
}
function check(id){
 const q=questions.find(x=>x.id===id);
 const s=document.querySelector(`input[name=q${id}]:checked`);
 if(!s)return alert('請選答案');
 if(Number(s.value)===q.answer) alert('答對');
 else{
   alert('答錯');
   let wrong=JSON.parse(localStorage.getItem('wrong')||'[]');
   if(!wrong.includes(id)) wrong.push(id);
   localStorage.setItem('wrong',JSON.stringify(wrong));
 }
}
function showWrong(){
 let wrong=JSON.parse(localStorage.getItem('wrong')||'[]');
 render(questions.filter(x=>wrong.includes(x.id)));
}
loadRandom();
