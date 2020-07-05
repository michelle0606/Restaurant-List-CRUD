//search-box
const iconBox = document.querySelector(".search_icon_box");
const searchBox = document.querySelector(".search_box");
const searchIcon = document.getElementById("search_icon");

let closeButton;

searchIcon.addEventListener("click", () => {
  searchBox.classList.add("index_order");

  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", () => {
    searchBox.classList.remove("index_order");
  });
});

// if content was empty
const cardContent = document.querySelector(".card-columns");

if (cardContent.innerText === "") {
  cardContent.classList.remove("card-columns");
  cardContent.innerHTML = `
    <div class="suggest">
      <span>按下右上方的 &nbsp <i class="fas fa-folder-plus"></i> &nbsp 來新增一家餐廳吧！</span>
    </div>
    `;
}
