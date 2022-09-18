function defaultNews(){
  const durl = `https://openapi.programming-hero.com/api/news/category/01`;
  fetch(durl)
  .then(res => res.json())
  .then(data => displayNews(data.data))
  .catch(error => console.log(error))
}
defaultNews();
// function openNews(){
//   const url = `https://openapi.programming-hero.com/api/news/categories`;
//   fetch(url)
//   .then(res => res.json())
//   .then(data => displayCategory(data.data.news_category))
// }
// openNews()

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
        categoryDiv.innerHTML = `
        <div onclick="fetchNews('${category.category_id}')" id="${category.category_id}" class="d-flex" onMouseOver="this.style.color='#2bd3cf'" onMouseOut="this.style.color='#FFFFFF'">${category.category_name}</div>
        `;

        categoryField.appendChild(categoryDiv);
    }
   
}
function fetchNews(categoryId){
 const blogsContainer = document.getElementById('blogs-container');
 blogsContainer.classList.add('d-none');
 const newsContainer = document.getElementById('newsCard');
 newsContainer.classList.remove('d-none');
 const newsInfoContainer = document.getElementById('news-info');
 newsInfoContainer.classList.remove('d-none'); 


   // spinner starts 
   toggleSpinner(true);
    // console.log(categoryId);
    const url = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))
    .catch(error => console.log(error))
}
function displayNews(allNews){
    const newsField = document.getElementById('newsCard');
    newsField.innerText= '';
    let count = 0;
    
    allNews.forEach(news =>{
        console.log(news);
        count++;
        
        const newsDiv = document.createElement('div');
        newsDiv.innerHTML = `
        <div onclick="loadNewsDetail('${news._id}')" class="card mb-3 w-100" data-bs-toggle="modal" data-bs-target="#newsModal">

                <div class="row g-0">
                  <div class="col-md-4 w-lg-25">
                    <img src="${news.thumbnail_url}" class="img-fluid w-100 p-3 rounded-start" alt="...">
                  </div>
                  <div class="col-md-8 p-4">
                    <div class="card-body">
                      <h5 class="card-title">${news.title}</h5>
                      <p class="card-text">${news.details.slice(0,200)}</p>
                <div class="d-lg-flex py-sm-2 justify-content-between">
                      <div><span class="text-muted py-2">${news.author.name}<br>
                ${news.author.published_date.slice(0,10)}</span></div>
                <div class="py-2">
                <i class="fa-solid fa-eye text-muted"></i><span class="text-muted"> ${news.total_view}</span>
                </div>
                <div class="py-2">
                
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-solid fa-star text-warning"></i>
                <i class="fa-regular fa-star-half-stroke text-warning"></i>
                
                </div>
                <div class="py-2">
                <i class="fa-solid fa-arrow-right text-primary"></i>
                </div>
                </div>
                  </div>
                  </div>
                </div>
              </div>
        `;
          // spinner ends 
   toggleSpinner(false);
        newsField.appendChild(newsDiv);
    })
  
  const numberOfNews = document.getElementById('number-of-items');
  numberOfNews.innerText = count;
  if(count === 0){
    toggleSpinner(false);
    newsField.innerText = 'Sorry! No news found form this category';
  }
   
}

function loadNewsDetail(newsId){
  const url = `https://openapi.programming-hero.com/api/news/${newsId}`;
fetch(url)
.then(res => res.json())
.then(data => displayNewsDetail(data.data[0]))
}
function displayNewsDetail(newsDetail){
  const modalTitle = document.getElementById('newsModalLabel');
  modalTitle.innerText = newsDetail.title;
   
  const modalBody = document.getElementById('newsBody');
  modalBody.textContent ='';
  const modalBodyContent = document.createElement('div');
  modalBodyContent.innerHTML = `
        <div class="card mb-3 w-100">

                <div class="row g-0">
                  <div class="col-md-2">
                    <img src="${newsDetail.author.img}" class="img-fluid w-100 p-1 rounded card-img-top" alt="...">
                  </div>
                  <div class="col-md-10">
                    <div class="card-body">
                      <h6 class="card-title ">Author: ${newsDetail.author.name? newsDetail.author.name : 'No data found'}</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-between"><div class="card-text">Publish Date: ${newsDetail.author? newsDetail.author.published_date.slice(0,10) : 'No data found' }</div>
              <div><i class="fa-solid fa-eye text-muted"></i> ${newsDetail.total_view}</div></div><br>
              <p">${newsDetail.details}</p>
        `;
  modalBody.appendChild(modalBodyContent);
}

showBlogs = () =>{
 const blogsContainer = document.getElementById('blogs-container');
 blogsContainer.classList.remove('d-none');
 const newsContainer = document.getElementById('newsCard');
 newsContainer.classList.add('d-none');
 const newsInfoContainer = document.getElementById('news-info');
 newsInfoContainer.classList.add('d-none'); 
}
const toggleSpinner = isLoading => {
  const loaderSection = document.getElementById('loader');
  if(isLoading){
      loaderSection.classList.remove('d-none');
  }
  else{
      loaderSection.classList.add('d-none');
  }
}
