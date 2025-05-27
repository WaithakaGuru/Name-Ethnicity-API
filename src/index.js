const nameInput = document.getElementById("nameInput");
const submitBtn = document.getElementById("submitBtn");
const resultsHolder = document.getElementById("results-holder");

const apiLink = "https://api.nationalize.io/?name=";

const getCountryNames = new Intl.DisplayNames(["en"], { type: "region" });

const getNationality = async () => {
  const request = await fetch(`${apiLink}+${nameInfo}`);
  const results = await request.json();
  return results;
};

function display() {
  let data = getNationality();
  data = data.country;
  resultsHolder.innerHTML = `<b class="name-holder">${nameInfo}</b> is found in:  <br>`;
  for (let i = 0; i < 5; i++) {
    const { id, prob } = data[i];
    resultsHolder.innerHTML += `<li class="item">${getCountryNames.of(id)}  ${prob * 100} % Sure</li>`;
  }
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Clicked");
  const nameInfo = nameInput.textContent;
  try {
    if (nameInfo.length === 0) {
      console.log("Please enter a name!!");
      resultsHolder.textContent = "Please enter a name!!";
      return;
    } else {
      submitBtn.innerHTML = "Searching";
      submitBtn.setAttribute("disable", true);
      display();
    }
  } catch (e) {
    resultsHolder.textContent =
      "ERROR: Something went Wrong. Try Again Later!!";
  }
});
