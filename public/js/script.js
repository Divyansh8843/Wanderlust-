(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-icon");
  const dropdownMenu = document.querySelector(".dropdown");
  dropdownMenu.style.display = "none";
  menuButton.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
  });
  document.addEventListener("click", (event) => {
    if (
      !menuButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.style.display = "none";
    }
  });
});

let taxswitch = document.getElementById("flexSwitchCheckDefault");
taxswitch.addEventListener("click", () => {
  let taxinfo = document.getElementsByClassName("tax-info");
  for (info of taxinfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

// for close flash_div
// Get all elements with the class "flash_div" and "close_icon"
// Get all elements with the class "close_icon"
const closeBtns = document.getElementsByClassName("close_icon");

// Loop through each close button
for (let i = 0; i < closeBtns.length; i++) {
  closeBtns[i].addEventListener("click", function () {
    console.log("close_btn clicked");

    // Find the closest parent div with class 'flash_div' and hide it
    const flashDiv = closeBtns[i].closest(".flash_div");
    if (flashDiv) {
      flashDiv.style.display = "none";
    }
  });
}
