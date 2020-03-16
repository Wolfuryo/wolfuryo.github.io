let d=document, q=e=>{
return d.querySelector(e);
}, _q=e=>{
return d.querySelectorAll(e);
}, l=(e, ev, c)=>{
e.addEventListener(ev, (f)=>c(f));
}


if(localStorage.getItem("data")==null) localStorage.setItem("data", JSON.stringify([]));


let u, v, message=q(".message"), button=q(".button"), url=q("[name='url']"), mess=q("[name='message']"), text=q("[name='btext']"), link=q("[name='blink']");
let ifr=q("iframe");
let update=()=>{
v=url.value;
if(!url.value.startsWith("http")) v="https://www."+url.value;
if(ifr.getAttribute("src")!=v) ifr.setAttribute("src", v);
message.innerHTML=mess.value;
u=link.value;
if(!link.value.startsWith("http")) u="https://www."+link.value;
button.setAttribute("href", u);
button.innerHTML=text.value;
}
update();

let inps=_q("[type='text']");
Array.from(inps).forEach(e=>{
l(e, "input", ()=>{
update();
})
})

l(q("form"), "submit", (e)=>{
e.preventDefault();



let item={
url:url.value,
mess:mess.value,
text:text.value,
link:link.value,
};

let o=1;

Object.keys(item).forEach(e=>{
if(item[e]=="" && o){
alert("Fill in all fields");
o=0;
}
})

if(!o) return false;

let data=JSON.parse(localStorage.getItem("data"));
data.push(item);

let ll=document.createElement("input");
ll.setAttribute("type", "text");
ll.classList.add("final-link");
ll.value=document.URL.split("?")[0]+"?page="+(data.length);
q("form").parentElement.appendChild(ll);
q("form").classList.add("form-hidden");

localStorage.setItem("data", JSON.stringify(data));
})

let options=_q(".option");
let cons=_q(".opt-con");
Array.from(options).forEach((e, i)=>{
l(e, "click", ()=>{
q(".option-active").classList.remove("option-active");
e.classList.add("option-active");

q(".opt-active").classList.remove("opt-active");
cons[i].classList.add("opt-active");

})
})

let scon=q(".saved");
let render=(item, page, i)=>{
let c=document.createElement("div");
c.classList.add("saved-item");
c.innerHTML="<span class='url'><a href='"+item.url+"'>"+item.url+"</a></span><span class='message'>"+item.mess+"</span>";
if(!q(".page-"+page)){
let pcon=document.createElement("div");
pcon.classList.add("page-"+page);
pcon.classList.add("page");
pcon.appendChild(c);
scon.appendChild(pcon);
} else {
q(".page-"+page).appendChild(c);
}

l(c, "click", (e)=>{
e.preventDefault();
location="?page="+i;
})

}

let pages=(n)=>{
let ps=document.createElement("div");
ps.classList.add("pagination");
for(let i=1;i<=n;i++){
let p=document.createElement("div");
p.classList.add("_page");
p.innerHTML=i;
if(i==1) p.classList.add("_page_current");
ps.appendChild(p);
scon.appendChild(ps);
}
}

let load=()=>{
let data=JSON.parse(localStorage.getItem("data"));
data.forEach((e, i)=>{
render(e, parseInt(i/20)+1, i);
})
if(q(".page-1")) q(".page-1").classList.add("page-active");
pages(parseInt(data.length/20)+1);
}

load();

let p=_q("._page"), s=_q(".page");
Array.from(p).forEach((e, i)=>{
l(e, "click", ()=>{
q("._page_current").classList.remove("_page_current");
e.classList.add("_page_current");
q(".page-active").classList.remove("page-active");
s[i].classList.add("page-active");
})
})

if(/\d+/.test(location.search)){
let item=parseInt(location.search.match(/\d+/)[0]), data;
data=JSON.parse(localStorage.getItem("data"));
item--;
if(data[item]){
url.value=data[item].url;
mess.value=data[item].mess;
text.value=data[item].text;
link.value=data[item].link;
update();
q(".creator").remove();
q(".creation").classList.add("creation-full");
}
}
