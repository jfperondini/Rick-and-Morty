
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
	var urlApi = 'https://rickandmortyapi.com/api/character/';
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
				container.innerHTML = ""

				json.results.map(result => {

					container.innerHTML += `
					<div class="card"> 
						<a href="characters.html?id=${result.id}" style=" 
						color: inherit; /* blue colors for links too */
						text-decoration: inherit; /* no underline */">
							<strong>${result.name}<strong>
							<p><img src=${result.image} width="150" height="150"></p>
							<span>Species: ${result.species}</span><br>
							<i>Status: ${result.status}</i><br>
							<i>Gender: ${result.gender}</i><br>

							<hr/>
						</a>
					</div>
				`;





				})
			} else {
				resumo.innerHTML = "No results found!!"
			}

		})
}
loadCharacters(currentPage);