
// targetting the all required elements
const task = document.querySelector(".task")
const load = document.querySelector("#load")
const body = document.querySelector("body")
const form = document.querySelector(".form")
const post = document.querySelector(".post")
const titles = document.querySelector("input")
const description = document.querySelector("textarea")
const allTask = document.querySelector(".allTask")
const p = document.querySelector(".form>.head>p")
const container = document.querySelector(".container")


// display the form for filling

load.addEventListener("click", () => {
  form.classList.toggle("display")
})
p.addEventListener("click", () => {
  form.classList.toggle("display")
})


let data = []

let isEdit = false

// its is a get request for api using DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  // console.log(e.target);
  fetch("http://localhost:3000/notes")
    .then(res => res.json())
    .then(json => {
      console.log(json);
      let obj = json
      for (let i = 0; i < obj.length; i++) {
        data.push(obj[i])
      }
      dataAssing(data)
    })
})

// its is a POST method for using API

post.addEventListener("click", (e) => {
  if (titles.value == "" || description.value == "") {
    alert("Please Enter The Value")
  }
  if (titles.value != "" && description.value != "") {
    form.classList.toggle("display")

    let data = {
      title: titles.value,
      descriptions: description.value
    };

    let endPoint = isEdit? 'http://localhost:3000/notes/'+ e.target.id:"http://localhost:3000/notes"
    fetch(endPoint,{
      method:isEdit?'PUT':"POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Request complete! response:", res);
      window.location.reload()
    }).catch((err)=> console.log(err))
  }

})
// const date = new Date()
// let todayDate = new clickDate().toISOString().slice(0, 10);

// add the date format for the task
let todayDate = new Date().toLocaleDateString()

// this function using for html structure using javascript map method

function dataAssing(input) {
  let allData = input.map((datas) =>
    `<div class="task">
    <h3><span class="style">Title:</span> ${datas.title}</h3>
    <div class="scroll">
    <p><span class="style">Description:</span> ${datas.descriptions}</p>
    </div>
    <div class="border">
    <span>${todayDate}</span>
    <i class="fa-solid fa-circle-info"></i>
    <div class="Updation">
    <button class ="edit" id=${datas.id}>Edit</button>
    <button class ="delete" id=${datas.id}>Delete</button>
    </div>
    </div>
  </div>`
  ).join("")

  allTask.innerHTML = allData

  const allIcons = document.querySelectorAll(".fa-circle-info")
  const Updation = document.querySelectorAll(".Updation")
  const deletes = document.querySelectorAll(".delete")
  const edit = document.querySelectorAll(".edit")


  for (let i = 0; i < allIcons.length; i++) {
    allIcons[i].addEventListener("mouseover", () => {
      Updation[i].style.display = "flex"
    })

    allIcons[i].addEventListener("mouseout", () => {
      window.setTimeout(() => {
        Updation[i].style.display = "none"
      }, 2000)
    })

    // this is a delete method add the particular id for each btn and passing through backend

    deletes[i].addEventListener("click", (e) => {
      e.target.parentElement.parentElement.parentElement.remove();
      fetch('http://localhost:3000/notes/' + e.target.id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      })
      // .then(res => res.json()) // or res.json()
      // .then(res => console.log(res))
    })

    // this is a edit btn its is using for (get method)autofill the form and and passing through which id is clicked is passed backend.

    edit[i].addEventListener("click", (e) => {
      fetch("http://localhost:3000/notes/" + e.target.id)
        .then(res => res.json())
        .then(json => {
          form.classList.toggle("display")
          isEdit = true;
          titles.value = json.title
          description.value = json.descriptions
          post.id = json.id
          post.innerText = "Update"
          document.querySelector("h3").innerText = "Edit Your Task"
        })
    })

  }
}



// import { Pagination } from 'antd';
// const onChange = (pageNumber) => {
//   console.log('Page: ', pageNumber);
// };
// const App = () => (
//   <>
//     <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} />
//     <br />
//     <Pagination showQuickJumper defaultCurrent={2} total={500} onChange={onChange} disabled />
//   </>
// );
// export default App;





















































































// this function auto fill and and assign the particular id for update button 
// function updations(arr) {
//   arr.map((datas) => { console.log(datas); editInput.value = datas.title, editText.value = datas.descriptions, update.id = datas.id })

// }

// this is update function its is using a update the details PUT Method

// update.addEventListener("click", (e) => {
//   console.log(e.target.id);
//   if (editInput.value == "" || editText.value == "") {
//     alert("Please Enter The Edited Value")
//   }
//   if (editInput.value != "" && editText.value != "") {
//     let data = {
//       title: editInput.value,
//       descriptions: editText.value
//     }
//     fetch('http://localhost:3000/notes/' + e.target.id, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(data)
//     })
//     formEdit.style.display = "none"
//   }
// })
// editP.addEventListener("click", () => {
//   formEdit.style.display = "none"
// })