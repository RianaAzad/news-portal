document.getElementById('news').addEventListener('click', function(){
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategory(data.data.news_category))
})
function displayCategory (data){
    const categoryField = document.getElementById('categories');
    categoryField.innerText = '';
    for(const category of data){
        const categoryDiv = document.createElement('div');
        // console.log(category);
        categoryDiv.innerHTML = `
        <div onclick="fetchNews('${category.category_id}')" id="${category.category_id}" class="d-flex">${category.category_name}</div>
        `;
        categoryField.appendChild(categoryDiv);
    }
}
function fetchNews(categoryId){
    // console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    // console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
}
function displayNews(allNews){
    const newsField = document.getElementById('newsCard');
    newsField.innerText= '';
    allNews.forEach(news =>{
        console.log(news);
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">${news.title}</h5>
                      <p class="card-text">${news.details.slice(0,200)}</p>
                      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
        `;
        newsField.appendChild(newsDiv);

    })
        
    

}