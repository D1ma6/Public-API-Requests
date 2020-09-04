/**
 * global variables
 */
const searchContainer = document.querySelector(".search-container");
const gallery = document.querySelector("#gallery");

/**
 * fetch data from `RANDOM USER GENERATOR`
 */
fetch("https://randomuser.me/api/?results=12")
  .then((res) => res.json())
  .then((data) => galleryHtml(data))
  .catch((err) => console.log(err));

/**
 * create the gallery markup card
 */
function galleryHtml(data) {
  data.results.map((item) => {
    const html = `
    <div class="card">
        <div class="card-img-container">
            <img class="card-img" src="${item.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="${item.name.first}" class="card-name cap">${item.name.first} ${item.name.last}</h3>
            <p class="card-text">${item.email}</p>
            <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
        </div>
    </div>
  `;
    gallery.insertAdjacentHTML("beforeend", html);
  });
  gallery.addEventListener("click", (e) => {
    galleryContainer(data.results, [...gallery.children].indexOf(e.target));
  });
}

/**
 * create galleryContainer pop up function when the user clicks on the card
 */
function galleryContainer(results, index) {
  const data = results[index];
  const html = `            
  <div class="modal-container">
    <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${
              data.picture.large
            }" alt="profile picture">
            <h3 id="name" class="modal-name cap">${data.name.first} ${
    data.name.last
  }</h3>
            <p class="modal-text">${data.email}</p>
            <p class="modal-text cap">${data.location.city}</p>
            <hr>
            <p class="modal-text">${data.phone}</p>
            <p class="modal-text">${data.location.street.number} ${
    data.location.street.name
  }, ${data.location.city}, ${data.location.postcode}</p>
            <p class="modal-text">Birthday: ${new Date(
              data.dob.date
            ).toLocaleDateString("en-US", {
              month: "numeric",
              year: "numeric",
              day: "numeric",
            })}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
  </div>`;

  document.querySelector("body").insertAdjacentHTML("beforeend", html);
  document.querySelector(".modal-container").addEventListener("click", (e) => {
    const elem = e.target;
    if (
      elem.className == "modal-container" ||
      elem.className == "modal-close-btn"
    ) {
      document.querySelector(".modal-container").remove();
    } else if (elem.className == "modal-prev btn") {
      document.querySelector(".modal-container").remove();
      if (index == 0) {
        galleryContainer(results, 12 - 1);
      } else {
        galleryContainer(results, index - 1);
      }
    } else if (elem.className == "modal-next btn") {
      document.querySelector(".modal-container").remove();
      if (index == 11) {
        galleryContainer(results, -1 + 1);
      } else {
        galleryContainer(results, index + 1);
      }
    }
  });
}

/**
 * add event listener to the gallery div
 * on click invoke the galleryContainer function
 */
