function hashCode(s){
	return s
		.split('')
		.reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
}
function hashColor(text){
	return "#"+Math.abs(hashCode(text)).toString(16).slice(0,6)
}
function pastel(text){return text
	.replace(/0/g,"C").replace(/1/g,"D").replace(/2/g,"E").replace(/3/g,"F")
	.replace(/4/g,"C").replace(/5/g,"D").replace(/6/g,"E").replace(/7/g,"F")
	.replace(/8/g,"C").replace(/9/g,"D").replace(/A/g,"E").replace(/B/g,"F")
}
function light(text){return text
	.replace(/0/g,"8").replace(/1/g,"9").replace(/2/g,"A").replace(/3/g,"B")
	.replace(/4/g,"C").replace(/5/g,"D").replace(/6/g,"E").replace(/7/g,"F")
}
function medium(text){return text
	.replace(/C/g,"4").replace(/D/g,"5").replace(/E/g,"6").replace(/F/g,"7")
	.replace(/0/g,"8").replace(/1/g,"9").replace(/2/g,"A").replace(/3/g,"B")
}
function dark(text){return text
	.replace(/0/gi,"8").replace(/1/gi,"9").replace(/2/gi,"A")
	.replace(/B/gi,"3").replace(/C/gi,"4").replace(/D/gi,"5").replace(/E/gi,"6").replace(/F/gi,"7")
}
function breadcrumb(){
	let card = document.querySelector("#qa");
	let breadcrumb = document.querySelector(".breadcrumb");
	breadcrumb.innerHTML = breadcrumb.innerHTML
		.split("::")
		.join(" :: ")
	card.style=`--deckcolor:${pastel(hashColor(breadcrumb.innerHTML))};`
	background()
}
function background(){
	try{
		let page = document.querySelector(".card");
		let breadcrumb = document.querySelector(".breadcrumb");
		var pattern = GeoPattern.generate(breadcrumb.innerHTML);
		page.style=`--image: ${pattern.toDataUrl()}`;
	} catch(e) {
		if(e instanceof ReferenceError) window.requestAnimationFrame(background)
	}
}
function tags(){
	let tags = document.querySelector(".tags");
	if(tags.classList.contains("tagged")) return
	tags.innerHTML = tags.innerHTML
		.split(" ")
		.filter(e => e!=="")
		.map(text => `<li style="--tagcolor:${medium(hashColor(text))}">${text}</li>`)
		.join("")
	tags.classList.add("tagged")
}

function markdownize(node) {
	let content = node.innerHTML
		.replace(/<[\/]?div\s*>/gi, "\n")
		.replace(/<br\s*[\/]?>/gi, "\n")
		.replace(/</gi,"&lt;")
	node.innerHTML = window.FAC.md.render(content);
}
function loadscript(url){
	let script = document.createElement('script');
	script.src = url;
	let pr = new Promise((resolve)=>{script.onload=resolve})
	document.head.appendChild(script);
	return pr
}
async function load(){
	await Promise.all([
		loadscript("https://cdnjs.cloudflare.com/ajax/libs/geopattern/1.2.3/js/geopattern.min.js"),
		loadscript("https://cdn.jsdelivr.net/gh/google/code-prettify@master/loader/run_prettify.js"),
		loadscript("https://cdnjs.cloudflare.com/ajax/libs/markdown-it/12.3.2/markdown-it.min.js")
	])
	
	window.FAC.md = window.markdownit({
		html: true,
		xhtmlOut: true,
		breaks: false,
		langPrefix: 'lang-',
		linkify: true,
		highlight: (str, lang) => `<pre class="prettyprint lang-${lang}">${str}</pre>`,
	})
}
function redraw(){
	markdownize(document.querySelector("header"));
	markdownize(document.querySelector("footer"));
	breadcrumb();
	tags();
}
async function main(){
	if(!window.FAC) {
		window.FAC = {}
		await load()
	}
	window.requestAnimationFrame(redraw)
}
main()
