'use strict';
let plans = [];

function Addplan(plan, date) {

    this.plan = plan;
    this.date = date;
    plans.push(this);
    savtlocl();

}
let ulEl = document.getElementById('plann');
redfrmlocl();


function render() {
    ulEl.textContent = '';
    for (let i = 0; i < plans.length; i++) {
        let liEl = document.createElement('li');
        liEl.textContent = `plan:${plans[i].plan} on ${plans[i].date}`;
        let btn = document.createElement('button');
        btn.textContent = 'Delete';
        btn.setAttribute('id',`${i}`)

        liEl.appendChild(btn);

        ulEl.appendChild(liEl);




    }

}

function savtlocl() {
    let strigfy = JSON.stringify(plans);
    localStorage.setItem('plans', strigfy)





}

function redfrmlocl() {


    let string = localStorage.getItem('plans');
    let objct = JSON.parse(string);
    console.log(objct);

    plans = objct;
    render();





}

for (let i=0;i<plans.length;i++){
let dele=document.getElementById(`${i}`);

dele.addEventListener('click',delete1);



}

function delete1(event){
let delete2=event.target.id;
plans.splice(delete2,1);
savtlocl();
render();


}



let form = document.getElementById('form');
form.addEventListener('submit', add);

function add(event) {
    event.preventDefault();
    let plan = event.target.todo.value;
    let date = event.target.date.value;
    let newplan = new Addplan(plan, date);
    render();


}
