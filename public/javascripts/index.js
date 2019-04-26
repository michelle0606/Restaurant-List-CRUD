// const sortIcon = document.getElementById("sort_icon");
// const searchIcon = document.getElementById("search_icon");
// const newIcon = document.getElementById("new_icon");
// const logoutIcon = document.getElementById("logout_icon");

// sortIcon.addEventListener("mouseenter", () => {
//   sortIcon.innerHTML = `
//     <span>排序</span>
//   `;
// });

const searchIcon = document.getElementById("search_icon");
const iconBox = document.querySelector(".search_icon_box");

let closeButton;

searchIcon.addEventListener("click", () => {
  iconBox.innerHTML = `
  <div class="search_box">
    <form action="/search">
      <input type="text" name="keyword" class="form-control" placeholder="輸入餐廳、分類" aria-label="Restaurant Name..." value="" aria-describedby="search-button">
      <button class="search-button" type="submit" id="search-button"><i class="fas fa-search"></i></button>
      <button class="close-button" type="button" id="close-button"><i class="fas fa-times"></i></button>
    </form>
  </div>
  `;
  const closeButton = document.getElementById("close-button");
  closeButton.addEventListener("click", () => {
    iconBox.innerHTML = ``;
  });
});

const cardContent = document.querySelector(".card-columns");

if (cardContent.innerText === "") {
  cardContent.classList.remove("card-columns");
  cardContent.innerHTML = `
    <div class="suggest">
      <span>按下右上方的 &nbsp <i class="fas fa-folder-plus"></i> &nbsp 來新增一家餐廳吧！</span>
    </div>
    `;
}
