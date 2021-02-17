// variables
const slider = document.querySelectorAll(".slider-itm");
const selectEl = document.querySelector(".select");
const brokenPage = document.querySelector(".broken-page");
const head = document.querySelector("header");
const selectContainer = document.querySelector(".select-container");
const section = document.querySelector(".section-content");
const elementsArr = [head, selectContainer, section];

// set sliding coomponents
slider.forEach((itm, ind) => {
  itm.style.transform = `translateX(${100 * ind}%)`;
});
// slider

let count = 0;
const sliderStart = function () {
  setInterval(function () {
    if (count < -slider.length + 2) {
      count = 0;
    } else {
      count--;
    }
    slider.forEach((itm, ind) => {
      itm.style.transform = `translateX(${100 * (ind + count)}%)`;
    });
  }, 4000);
};

sliderStart();

//fecth dogs list

const fetchDogs = function () {
  try {
    fetch("https://dog.ceo/api/breeds/list/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((resData) => {
        const msg = resData.message;
        const ar = [];
        let options;
        for (names in msg) {
          ar.push(names);
          options = document.createElement("option");
          options.setAttribute("value", names);
          options.textContent = names;
          selectEl.insertAdjacentElement("beforeend", options);
        }
      });
  } catch (e) {
    console.log(e);
  }
};

fetchDogs();

// check if online

setInterval(() => {
  if (navigator.onLine) {
    brokenPage.style.display = "none";
    head.style.display = "block";
    elementsArr.slice(1).forEach((el) => {
      el.style.display = "flex";
    });
  } else {
    brokenPage.style.display = "flex";
    elementsArr.forEach((el) => {
      el.style.display = "none";
    });
  }
}, 1000);

// check existing child nodes
const clearExisting = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};
let container = document.querySelector(".images-grid");
let img;
// display on select
selectEl.addEventListener("change", (e) => {
  let choice = e.target.value;
  clearExisting(container);
  document.querySelector(".chosen").textContent = `${(function () {
    const firstLetter = choice.slice(0, 1);
    const rest = choice.slice(1, choice.length);
    return `${firstLetter.toUpperCase() + rest}`;
  })()}`;
  fetch(`https://dog.ceo/api/breed/${choice}/images`)
    .then((res) => {
      if (res.status > 399) {
        throw new Error(res.statusText);
      }

      return res.json();
    })
    .then((body) => {
      let dataBody = body.message;
      dataBody.forEach((dogImg) => {
        let imgBox = document.createElement("div");
        imgBox.setAttribute("class", "img-box");
        img = document.createElement("img");
        img.setAttribute("class", "imgs");
        img.src = dogImg;
        imgBox.insertAdjacentElement("afterbegin", img);
        container.insertAdjacentElement("afterbegin", imgBox);
      });
      document.querySelector(
        ".results"
      ).textContent = `${dataBody.length} dogs`;
    })
    .catch((err) => {
      console.log(err);
    });
});
