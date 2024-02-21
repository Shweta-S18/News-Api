import { Key } from './apikey.js';

let url = "https://newsapi.org/v2/top-headlines?country=";
let navToggle = document.querySelector(".nav-toggle");
let links = document.querySelector(".links");

navToggle.addEventListener("click", function () {
    links.classList.toggle("show-links");
});

let country = "in";
let category = "general";
let apiKey = Key;
let newsContainer = document.querySelector(".news-container");

let liList = document.querySelectorAll("li");
for (let li of liList) {
    li.addEventListener("click", function () {
        category = this.textContent;
        console.log(category)
        callNewsApi();
    });
}
async function callNewsApi() {
    try {
        let res = await fetch(`${url}${country}&category=${category}&apiKey=${apiKey}`);
        let data = await res.json();
        newsContainer.innerHTML = "";      
        let newsData = data.articles;
        generateUI(data.articles);
    } catch (e) {
        console.log(e);
    }
}

function generateUI(newsData) {
    console.log(newsData)
    if (!Array.isArray(newsData)) {
        console.error("Invalid data passed to generateUI function");
        return;
    }
    for (let el of newsData) {
        let img = el.urlToImage;
        let title = el.title;
        let desciption = el.description;
        let linkofNews = el.url;   
        let source = el.source["name"]
        console.log(source)
        let publishDate = new Date(el.publishedAt).toLocaleString("en-us", {
            timeZone: "Asia/Kolkata"
        })
       
        
        if (img && title && desciption) {
            newsContainer.innerHTML += `
          
            <div class="card-container">
                <div class="img-container">
                    <img src="${img}" alt="incident-news-img" class="img">
                </div>
                <div class="info-container">
                    <div class="title">
                        <h3><li class="title_li"><a href="${linkofNews}" class="title_a" target="_blank">${title}</a></li></h3>
                        <h6><span class="source">${source}</span>&nbsp; ${publishDate}</h6>
                    </div>
                    <div class="description">
                        ${desciption}
                    </div>
                </div>
            </div>
            `;
            
        }                
    }
}
callNewsApi();
