function getAutoComplete(el){
	let query = el.value;
}

const ul = document.querySelector(".pop_rel_keywords");
const searchInput = document.querySelector(".search_input");
const relContainer = document.querySelector(".rel_search");
let cache = '';


const checkInput = () => {
    const beforeInput = searchInput.value;
    timer(beforeInput);
}


const timer = (beforeInput) => {
  setTimeout(() => {

    if(searchInput.value === beforeInput) {
      console.log("입력멈춤");
      loadData(searchInput.value);
      checkInput();
      
    } else {
      console.log("입력변함");
      checkInput();
    }
   
    if(searchInput.value === "") {
      relContainer.classList.add("hide");
    } else {
      relContainer.classList.remove("hide");
    }
  }, 500);
}
  


const loadData = (input) => {
  const url = `/autoComplete?query=${input}`;
  
  if(cache === url) return;
  else {
 cache = url;
fetch(url)
.then((res) => res.json())
.then(res => fillSearch(res,input))
  }
}

const fillSearch = (suggestArr,input) => {
	console.dir(suggestArr);
  ul.innerHTML = "";
  suggestArr.forEach((el, idx) => {
    const li = document.createElement("li");
	let str = '<a href="#!" onclick="javascript:searchAuto(this.innerText)">' + highlight(el.auto_complete,input);
	
	str += '</a>';
    li.innerHTML = str;
    ul.appendChild(li);
  }) 
     
   const liList = document.querySelectorAll(".pop_rel_keywords li");

  
}


checkInput();

function searchAuto(query) {
	let newForm = $('<form></form>'); //set attribute (form) 
		newForm.attr("name","searchForm"); 
		newForm.attr("method","post"); 
		newForm.attr("action","/complete-works");
		// create element & set attribute (input) 
		newForm.append($('<input/>', {type: 'hidden',id:'query', name: 'query', value:query })); 
		// append form (to body) 
		newForm.appendTo('body'); 
		// submit form 
		newForm.submit();
}

function replaceAll(str, searchStr, replaceStr) {

   return str.split(searchStr).join(replaceStr);
}

function highlight(text,input){
	let res = ''
	for(let i=0;i<input.length;i++) {
		text = replaceAll(text,input.charAt(i),'#'+input.charAt(i)+'$');
	}
	text = replaceAll(text,'#','<span style="color:red;">');
	text = replaceAll(text,'$','</span>');
	return text;
}
