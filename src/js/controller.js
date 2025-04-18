import * as model from "./model";
import recipeView from "./view/recipeView";
import searchView from "./view/searchView";
import resultView from "./view/resultView";
import paginationView from "./view/paginationView";
import bookmarksView from "./view/bookmarksView";
import addRecipeView from "./view/addRecipeView";
import { MODAL_CLOSE_SEC } from "./config";
// import "core-js/stable";
import "regenerator-runtime/runtime";

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

// if (model.hot) {
//   model.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //0)Update results view to mark selected search results
    resultView.update(model.getSearchResultsPage());

    //1)Updating bookmark view
    bookmarksView.update(model.state.bookmarks);

    // console.log(id);

    //2)Loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    // 3) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    // alert(err);
    recipeView.renderError(); //اگر اروری داشتخ باشیم
  }
  //Test
  // controlServings();
};

const controlSearchResult = async function () {
  try {
    resultView.renderSpinner();
    //1)get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2)load search result
    await model.loadSearchResults(query);
    //3)render result
    resultView.render(model.getSearchResultsPage());
    //4)render initial pagination buttons
    paginationView.render(model.state.search);
    // console.log(model.state.search.result, model.state.search.query);
  } catch (error) {
    console.log(error);
  }
};
const controlPagination = function (goToPage) {
  //1)render New result
  resultView.render(model.getSearchResultsPage(goToPage));
  //2)render NEW  pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update recipe serving(in state)
  model.updateServing(newServings);
  //Update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // 1)Add/Remove bookmark
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // 2)Update recipe view
  recipeView.update(model.state.recipe);

  //3)Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    //Show loading spinner
    addRecipeView.renderSpinner();

    //Uploading new recipe data
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    //Render recipe
    recipeView.render(model.state.recipe);

    //Sucsses message
    addRecipeView.renderMessage();

    //Render bookmark view
    bookmarksView.render(model.state.bookmarks);
    //Change ID in url
    window.history.pushState(null, "", `#${model.state.recipe.id}`);
    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error("########", err);
    addRecipeView.renderError(err.message);
  }
};

// controlSearchResult();
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  console.log("mahdi");
};
init();
