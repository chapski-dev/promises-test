 let phreseInner1 = document.getElementById("phrese-inner");
let phreseInner2 = document.getElementById("phrese-inner-2");

const phrese1 = [];
const phrese2 = [];

let responseJson;
let responseText;

const b = document.querySelector("button");
// Вариант 1
const getPhrase1 = async (fileName) => {
  b.disabled = true;
  setTimeout(() => {
    b.disabled = false;
  }, 3000);

  try {
    const response = await fetch(
      `https://fe.it-academy.by/Examples/words_tree/${fileName}`
    );
    for (const item of (responseJson = await response.json())) {
      await getPhrase1(item);
    }
  } catch (e) {
    if (e.message !== "Failed to fetch") {
      const response = await fetch(
        `https://fe.it-academy.by/Examples/words_tree/${fileName}`
      );
      responseText = await response.text();
      phrese1.push(responseText);
      phreseInner1.innerText = phrese1.join(" ");
    }
  }
};

const clearText1 = function () {
  phrese1.length = 0;
  phreseInner1.innerText = "Полученная фраза";
};

// Вариант 2 (через promiseAllSettled)
const getPhrase2 = (fileName) => {
  fetch(`https://fe.it-academy.by/Examples/words_tree/${fileName}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (result) {
      Promise.allSettled(result.map(item => fe))
      for (const item of result) {
        getPhrase2(item);
      }
    })
    .catch((e) => {
      if (e.message !== "Failed to fetch") {
        fetch(`https://fe.it-academy.by/Examples/words_tree/${fileName}`)
          .then(function (response) {
            return response.text();
          })
          .then(function (result) {
            phrese2.push(result);
          })
          .then(function () {
            phreseInner2.innerText = phrese2.join(" ");
          });
      }
    });
};

// Вариант 2 (начальный вариант (работает))
// const getPhrase2 = async (fileName) => {
//   await fetch(`https://fe.it-academy.by/Examples/words_tree/${fileName}`)
//     .then(function (response) {
//       return response.json();
//     })
//     .then(async function (result) {
//       for (const item of result) {
//         await getPhrase2(item);
//       }
//     })
//     .catch((e) => {
//       if (e.message !== "Failed to fetch") {
//         fetch(`https://fe.it-academy.by/Examples/words_tree/${fileName}`)
//           .then(function (response) {
//             return response.text();
//           })
//           .then(function (result) {
//             phrese2.push(result);
//           })
//           .then(function () {
//             phreseInner2.innerText = phrese2.join(" ");
//           });
//       }
//     });
// };
const clearText2 = function () {
  phrese2.length = 0;
  phreseInner2.innerText = "Полученная фраза";
};
