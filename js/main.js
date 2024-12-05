let btn = document.querySelector("#searchBtn");
let inp = document.querySelector("#searchInp");
let modal = document.getElementById("modal");
let load = document.querySelector("#load");

btn.addEventListener("click", function (e) {
  getApi(inp.value);
});

async function getApi(term) {
  load.classList.replace("d-none", "d-flex");

  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${term}`
  );

  let alr = document.querySelector("#alert");

  try {
    let data = await response.json();
    let recipes = data.recipes;
    displayData(recipes);
    load.classList.replace("d-flex", "d-none");
    alr.classList.add("d-none");
  } catch (error) {
    load.classList.replace("d-flex", "d-none");
    alr.classList.remove("d-none");
  }
}

function displayData(data) {
  let cartona = "";
  for (let i = 0; i < data.length; i++) {
    cartona += `
     <div class="col-sm-6 col-md-4">
        <div class="card">
          <img src="${
            data[i].image_url
          }" class="card-img-top my-img" alt="meal" style="height:200px">
          <div class="card-body">
            <h5 class="card-title"> ${data[i].title
              .split(" ", 2)
              .join(" ")}</h5>
           <button onclick="getDetailes(${
             data[i].recipe_id
           })" class="btn btn-info w-100" data-bs-toggle="modal" data-bs-target="#detailes">Show Details</button>
          </div>
        </div>
     </div>
        `;
  }
  document.getElementById("dataRow").innerHTML = cartona;
}

async function getDetailes(id) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${id}`
  );
  if (response.ok) {
    let data = await response.json();
    let recipe = data.recipe;

    let cartona = `
      <img src="${recipe.image_url}" alt="details" class="w-100 my-img">
      <h4>${recipe.title}</h4>
    `;
    modal.innerHTML = cartona;
  }
}
