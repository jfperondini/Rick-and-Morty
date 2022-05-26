
var params = ''
if (document.location.href.indexOf('?') >= 0) {
	params = document.location.href.substring(document.location.href.indexOf('?'))
}


var nextButton = document.getElementById("next");
var prevButton = document.getElementById("prev");

var currentPage = 1

nextButton.addEventListener("click", () => {
	currentPage++
	loadCharacters(currentPage)
})

prevButton.addEventListener("click", () => {
	currentPage--
	loadCharacters(currentPage)
})
function loadCharacters(page) {
	var urlApi = 'https://rickandmortyapi.com/api/episode/';

	if (!page) {
		page = 1
	}



	if (params !== null && params !== '') {
		urlApi += params + `&page=${page}`
	} else {
		urlApi += `?page=${page}`
	}

	fetch(urlApi, {
		method: 'GET'
	})
		.then(response => response.json())
		.then(json => {
			var resumo = document.querySelector("#resumo_resultados");

			prevButton.hidden = true;
			nextButton.hidden = true;
			if (json.results != null) {
				prevButton.hidden = page === 1;
				nextButton.hidden = page >= json.info.pages

				resumo.innerHTML = `
			Showing ${json.results.length} of ${json.info.count} results

			`



				var container = document.querySelector('.container');
				console.log(json)
				json.results.map(result => {


					container.innerHTML += `
					<div> 
						
						<strong>Name: ${result.name}<strong><br>
					
						<strong>Episode: ${result.episode}<i><br>

						<a>Data: ${result.air_date}<a><br>
						
								
						

						<hr/>
					</div>
				`;





				})
			} 

		})

}
loadCharacters(currentPage);