(function () {
  const newsPosts = document.querySelector(".news-posts"),
    searchForm = document.querySelector(".search"),
    input = document.querySelector(".input"),
    pagination = document.querySelectorAll(".pagination"),
    language = document.getElementById("languagesId"),
    paginationMain = document.querySelectorAll(".pagination-main"),
    options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "1911488653msh8848ea9bb069c91p1f22bfjsn1a3cde7406d3",
        "X-RapidAPI-Host": "free-news.p.rapidapi.com"
      }
    };
  var q = input.value,
    lang = "",
    page = "",
    page_size = "6";

  pagination.forEach((currentPage) => {
    currentPage.addEventListener("click", function handleClick() {
      page = this.innerHTML;
      paginateData();
    });
  });

  getData();

  searchForm.addEventListener("submit", searchData);

  function searchData(e) {
    newsPosts.innerHTML = "";
    q = input.value;
    var strUser = language.value;
    lang = strUser;
    console.log(lang);
    e.preventDefault();
    getData();
  }
  function paginateData() {
    newsPosts.innerHTML = "";
    getData();
  }
  function getData() {
    paginationMain[0].style.display = "flex";
    fetch(
      "https://free-news.p.rapidapi.com/v1/search?q=" +
        q +
        "&lang=" +
        lang +
        "&page_size=" +
        page_size +
        "&page=" +
        page,
      options
    )
      .then((response) => response.json())
      .then((response) => {
        response.articles.forEach((article) => {
          console.log(response);
          let getTitle = article.title,
            getSummary = article.summary,
            getDate = article.published_date,
            getTopic = article.topic,
            getImage = article.media,
            getRank = article.rank,
            getLink = article.link;

          if (window.innerWidth < 767) {
            getTitle = getTitle.substring(0, 20) + "...";
          } else {
            getTitle = getTitle.substring(0, 15) + "...";
          }
          getSummary = getSummary.substring(0, 120) + "...";

          //Parse Date to the right format M/DD/YYYY
          getDate = Date.parse(getDate);
          getDate = new Date(getDate);
          let dateYear = getDate.getFullYear().toString(),
            dateMonth = getDate.getMonth().toString(),
            dateDay = getDate.getDate().toString();
          getDate = dateMonth + "/" + dateDay + "/" + dateYear;

          //Create new HTML Elements for each data
          let articleTag = document.createElement("article"),
            articleLink = document.createElement("a"),
            articleImage = document.createElement("div"),
            articleContent = document.createElement("div"),
            articleContentHeader = document.createElement("div"),
            articleTitle = document.createElement("h2"),
            articleSummary = document.createElement("p"),
            articleContentFooter = document.createElement("div"),
            articleMeta = document.createElement("div"),
            articleMetaDate = document.createElement("div"),
            articleDate = document.createElement("time"),
            articleMetaTopic = document.createElement("div"),
            articleTopic = document.createElement("p"),
            articleRank = document.createElement("p");

          articleImage.style.cssText =
            "background-image: url(" +
            getImage +
            ") ;width: 100%; height: 150px; background-size: cover; background-repeat: no-repeat; background-position: center; border-radius: 5px 5px 0 0;";
          articleTitle.textContent = getTitle;
          articleSummary.textContent = getSummary;
          articleDate.textContent = getDate;
          articleTopic.textContent = getTopic;
          articleRank.textContent = getRank;
          articleLink.setAttribute("href", getLink);
          articleLink.setAttribute("target", "_blank");
          articleContentHeader.setAttribute("class", "articleContentHeader");
          articleContentFooter.setAttribute("class", "articleContentFooter");
          articleContent.setAttribute("class", "post-content");
          articleMeta.setAttribute("class", "post-metas");
          articleMetaDate.setAttribute("class", "post-metas-date");
          articleMetaTopic.setAttribute("class", "post-metas-topic");

          articleTag.appendChild(articleLink);
          articleLink.append(articleImage, articleContent);
          articleContent.append(articleContentHeader, articleContentFooter);
          articleContentHeader.append(articleTitle, articleSummary);
          articleContentFooter.appendChild(articleMeta);
          articleMeta.append(articleMetaDate, articleMetaTopic);
          articleMetaDate.appendChild(articleDate);
          articleMetaTopic.append(articleRank, articleTopic);

          newsPosts.appendChild(articleTag);
        });
      })
      .catch((err) => {
        newsPosts.innerHTML = "Result not Founds";
        console.log(err);
      });
  }
})();
