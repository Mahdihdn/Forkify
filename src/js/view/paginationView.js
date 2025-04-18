import View from "./View";
import icons from "url:../../img/icons.svg"; //Paecel2
class PagenationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    //number of pages
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    console.log(numPages);
    //page 1 , and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
           <button data-goto="${
             curPage + 1
           }" class="btn--inline pagination__btn--next">
              <span>Page ${curPage + 1}</span>
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-right"></use>
              </svg>
          </button>
      `;
    }
    //last page
    if (curPage === numPages && numPages > 1) {
      return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>
      `;
    }
    //other page
    if (curPage < numPages) {
      return `
            <button data-goto="${
              curPage - 1
            }" class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
                <use href="${icons}#icon-arrow-left"></use>
              </svg>
              <span>Page ${curPage - 1}</span>
            </button>
            <button data-goto="${
              curPage + 1
            }" class="btn--inline pagination__btn--next">
                <span>Page ${curPage + 1}</span>
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-right"></use>
                </svg>
            </button> 
      `;
    }
    //page 1 , and there are No other pages
    return "";
  }
}

export default new PagenationView();
