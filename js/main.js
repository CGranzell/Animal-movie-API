//Snappar upp knapparna
const buttons = document.querySelectorAll(".content-wrapper button");
//Snappar upp bild container
const showContent = document.querySelector(".img-container");
//Snappar upp input fält
const input = document.querySelector("#input");
// För varje knapp av knapparna lägger till en eventlistener med data från fetchData funktionen
for (let button of buttons) {
  button.addEventListener("click", fetchData);
}

async function fetchData(e) {
  //skapar en variabel jag kan använda för den knappen som användaren klickar på
  const theClickedButton = e.target;
  //skapar en variabel för knapparnas respektive id
  const btnID = theClickedButton.id;

  // Går in i try blocket
  try {
    // ----------- Random Dogs -----------------

    //Om knappen som trycks är "dog"
    if (btnID === "dog") {
      // anropp till api, slumpmässig hund
      const responseDogs = await fetch(
        "https://dog.ceo/api/breeds/image/random"
      );
      const dataDogs = await responseDogs.json();
      //Extraherar namnet på rasen på hunden från api adressen
      let dogName = dataDogs.message.split("/");
      // visar bild och text
      showContent.innerHTML = `
      <h2>${dogName[4]}</h2>
            <img class="img" src="${dataDogs.message}"></img>`;

      // ------- Random animals------------

      //Om knappen som trycks är "animal"
    } else if (btnID === "randomAnimal") {
      // anropp till api, slumpmässig djur
      const responseAnimals = await fetch(
        "https://zoo-animal-api.herokuapp.com/animals/rand"
      );
      const dataAnimals = await responseAnimals.json();
      // visar bild och text
      showContent.innerHTML = `
           <h2>${dataAnimals.name}</h2>
          <img class="img" src="${dataAnimals.image_link}"></img>`;

      //------------- Movies ----------------

      //Om knappen som trycks är "movie"
    } else if (btnID === "movie") {
      // anropp till api + användarens input
      const responseButton = await fetch(
        "http://www.omdbapi.com/?apikey=f1fed068&s=" + input.value
      );
      //rensar textfätet
      input.value = "";
      //rensar showContent
      showContent.textContent = "";
      const dataButton = await responseButton.json();
      //För varje sök visa respektive innehåll
      for (let post of dataButton.Search) {
        showContent.innerHTML += `
        <h2 class="img-movie">${post.Title}</h2>
        <i class="img-movie">${post.Year}</i>
        <img class="img-movie" src="${post.Poster}"></img>
        `;
      }
    }
    //Felmeddelande
  } catch (error) {
    showContent.innerHTML = `
         <h1 class="error-message">Ooops, something went wrong. Please try again</h1>`;
    console.log(error);
  }
}

// ------------ Sidebar ---------------
//Snappar upp hamburger
const hamburger = document.querySelector(".hamburger");
//Snappar upp meny
const sidebar = document.querySelector(".nav-menu");
// snappar upp stäng knapp
const closeBtn = document.querySelector(".close-btn");
//togglar meny
hamburger.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

closeBtn.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});
