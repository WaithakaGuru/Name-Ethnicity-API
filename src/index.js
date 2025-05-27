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

async function display(name) {
  try {
      let response = await getNationality(name);
      if (!response || !response.country || response.country.length === 0) {
        resultsHolder.innerHTML = `Sorry, no nationality data found for "<b>${name}</b>".`;
        return;
      }

      const countries = response.country;
      resultsHolder.innerHTML = `<b class="name-holder">${name}</b> is likely from: <ul>`;

      for (let i = 0; i < Math.min(5, countries.length); i++) {
        const { country_id, probability } = countries[i];
        resultsHolder.innerHTML += `<li class="item">${getCountryNames.of(country_id)} — ${Math.round(probability * 100)}% sure</li>`;
      }
      resultsHolder.innerHTML += `</ul>`;
    } catch (error) {
      console.error("Error in display():", error);
      resultsHolder.innerHTML = `An error occurred while fetching nationality data. Please try again later.`;
    }
}


submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const nameInfo = nameInput.value;
  try {
    if (nameInfo === '') {
      resultsHolder.textContent = "Please enter a name!!";
      return;
    } else {
      submitBtn.innerHTML = "Searching";
      submitBtn.setAttribute("disabled", true);
      display(nameInfo);    
    }
  } catch (e) {
        // console.log(e.message);
        resultsHolder.textContent = `${e}` +
        "ERROR: Something went Wrong. Try Again Later!!";
  }finally{
        submitBtn.removeAttribute("disabled");
        submitBtn.innerHTML = `<i class="fa-solid fa-magnifying-glass"></i>`;
  }
});
