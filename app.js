const SUPABASE_URL = https://yvzxkxvfduzmkgqfxjvq.supabase.co
const SUPABASE_KEY = sb_publishable_uSMjG9VPgd2jzyBe97QBFA_17nGyQyS

const supabase = supabase.createClient(SUPABASE_URL,SUPABASE_KEY)

let foreman = ""

function login(name){
foreman = name
document.getElementById("loginScreen").style.display="none"
document.getElementById("app").style.display="block"
document.getElementById("foremanName").innerText = name
loadEmployees()
loadJobs()
}

async function loadEmployees(){
const {data} = await supabase.from("employees").select("*")

const list = document.getElementById("employeeList")
list.innerHTML = ""

data.forEach(emp=>{
list.innerHTML += `
<div class="employeeRow">
${emp.name}
<br>
Hours <input id="h_${emp.id}" type="number">
OT <input id="ot_${emp.id}" type="number">
</div>
`
})
}

async function loadJobs(){
const {data} = await supabase.from("jobs").select("*")

const select = document.getElementById("jobSelect")
select.innerHTML = ""

data.forEach(job=>{
select.innerHTML += `<option>${job.job_name}</option>`
})
}

async function saveTimecard(){

const date = document.getElementById("date").value
const job = document.getElementById("jobSelect").value

const {data:emps} = await supabase.from("employees").select("*")

for (const emp of emps){

const hours = document.getElementById(`h_${emp.id}`).value
const ot = document.getElementById(`ot_${emp.id}`).value

if(hours){

await supabase.from("timecards").insert({
employee: emp.name,
job: job,
date: date,
hours: hours,
ot: ot,
foreman: foreman
})

}

}

alert("Saved")

}

async function addEmployee(){

const name = document.getElementById("newEmployee").value

await supabase.from("employees").insert({name})

loadEmployees()

}

async function addJob(){

const job_name = document.getElementById("newJobName").value
const job_number = document.getElementById("newJobNumber").value

await supabase.from("jobs").insert({job_name,job_number})

loadJobs()

}
