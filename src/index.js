const nameInput = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");
const resultsHolder = document.getElementById("results-holder");

const apiLink = "https://api.nationalize.io/?name=";

const getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });

const getNationality = async (nameInfo) => {
  const request = await fetch(`${apiLink}+${nameInfo}`);
  const results = await request.json();
  return results;
};

function display(name) {
  let data = getNationality(name);
  data = data.country;
  resultsHolder.innerHTML = `<b class="name-holder">${name}</b> is found in:  <br>`;
  for (let i = 0; i < 5; i++) {
    const { id, prob } = data[i];
    resultsHolder.innerHTML += `<li class="item">${getCountryNames.of(id)}  ${prob * 100} % Sure</li>`;
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInfo = nameInput.value;
  try {
    console.log(nameInfo);
    if (nameInfo === '') {
      resultsHolder.textContent = "Please enter a name!!";
      return;
    } else {
      submitBtn.innerHTML = "Searching";
      submitBtn.setAttribute("disabled", true);
      display(nameInfo);    
    }
  } catch (e) {
        resultsHolder.textContent =
        "ERROR: Something went Wrong. Try Again Later!!";
  }finally{
        submitBtn.removeAttribute("disabled");
        submitBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  }
});
