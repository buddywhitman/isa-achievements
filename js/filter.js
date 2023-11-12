let posts=[];let filteredPosts=[];let postToShow=6;let maxDisplayPosts=postToShow;const postContainer=document.querySelector('.post-container');const search=document.querySelector('[type="search"]');async function fetchPosts(){await fetch('../posts.json').then((response)=>{if(response.ok){return response.json();}else{throw new Error('Something went wrong');}}).then((data)=>{posts=data.sort((a,b)=>new Date(b.meta.date)-new Date(a.meta.date));filterPosts();}).catch((error)=>{console.log(error)});}
fetchPosts();function generatePost(post){const returnPostDate=(date)=>`${['Jan','Feb','March','Apr','May','Jun','July','Aug','Sep','Oct','Nov','Dec'][date.getMonth()]}${date.getDate()},${date.getFullYear()}`;const article=document.createElement('article');article.classList.add('post');var randomNumber=Math.floor(Math.random()*6)+1;article.innerHTML=`<div style=margin-top:2rem class="box"data-aos="fade-up"><div class="image"><img src="../images/p-${randomNumber}.jpg"alt=""></div><div class="content"><div class="price">${post.user.name[0].firstName}${post.user.name[1].lastName}</div><p>${post.summary}</p><a href="#"class="btn">Read More</a></div></div>`;return article;}
const loadPosts=()=>{const frag=document.createDocumentFragment();filteredPosts.slice(0,maxDisplayPosts).map((post)=>frag.appendChild(generatePost(post)));postContainer.innerHTML='';postContainer.appendChild(frag);}
function filterPosts(){const searchFilter=(post)=>[post.summary,post.user.jobTitle,post.title,post.user.name[0].firstName,post.user.name[1].lastName,post.meta.tags.map((t)=>t).join('')].map((test)=>test).join('').toLowerCase().indexOf(search.value.toLowerCase())!==-1;filteredPosts=posts.filter(searchFilter);loadPosts();}
function viewMorePosts(){maxDisplayPosts+=postToShow;loadPosts();}
document.querySelector('.btn--view').addEventListener('click',viewMorePosts)
search.addEventListener('keyup',filterPosts);