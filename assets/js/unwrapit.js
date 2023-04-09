class Unwrapit {
  constructor(
    details,
    summary,
    singleOpen = false,
    options = { duration: 300, easing: "ease-in-out" }
  ) {
    this.detailsElements = document.querySelectorAll(details);
    this.summaryElements = document.querySelectorAll(summary);
    this.singleOpen = singleOpen;
    this.options = options;

    this.init();
  }

  init() {
    this.addSummaryEventListeners();
  }

  addSummaryEventListeners() {
    for (let [i, len] = [0, this.summaryElements.length]; i < len; i++) {
      this.summaryElements[i].addEventListener("click", (e) => {
        e.preventDefault();
        const content = this.summaryElements[i].nextElementSibling;
        if (this.singleOpen) {
          if (this.detailsElements[i].open) {
            this.closeDetails(content, this.detailsElements[i]);
          } else {
            this.toggleDetails();
            this.openDetails(content, this.detailsElements[i]);
          }
        } else {
          if (this.detailsElements[i].dataset.processing) {
            return;
          }
          if (this.detailsElements[i].open) {
            this.closeDetails(content, this.detailsElements[i]);
          } else {
            this.openDetails(content, this.detailsElements[i]);
          }
        }
      });
    }
  }

  openingAnimationKeyframes(content) {
    return [
      { height: 0, opacity: 0 },
      { height: `${content.offsetHeight}px`, opacity: 1 },
    ];
  }

  closingAnimationKeyframes(content) {
    return [
      { height: `${content.offsetHeight}px`, opacity: 1 },
      { height: 0, opacity: 0 },
    ];
  }

  openDetails(content, details) {
    details.dataset.processing = true;
    details.setAttribute("open", true);
    const openingAnimation = content.animate(
      this.openingAnimationKeyframes(content),
      this.options
    );
    openingAnimation.onfinish = () => {
      details.dataset.processing = "";
    };
  }

  closeDetails(content, details) {
    details.dataset.processing = true;
    const closingAnimation = content.animate(
      this.closingAnimationKeyframes(content),
      this.options
    );
    closingAnimation.onfinish = () => {
      details.removeAttribute("open");
      details.dataset.processing = "";
    };
  }

  toggleDetails() {
    for (let [i, len] = [0, this.detailsElements.length]; i < len; i++) {
      if (this.detailsElements[i].open) {
        const content = this.summaryElements[i].nextElementSibling;
        this.closeDetails(content, this.detailsElements[i]);
        break;
      }
    }
  }
}
