
const button = document.getElementById('buttonBuscar');
const buttonBuscarEspecificas = document.getElementById('buttonBuscarEspecifico');
const inputBuscarPeli = document.getElementById('inputBuscarPeli');
const buttonInsertarPeli = document.getElementById('buttonInsertarPelicula');

button.addEventListener('click', function(e) {
    // realizar la busqueda y generar la lista 
    fetch('/peliculas?title='+inputBuscarPeli.value, {method: 'GET'})
    .then(function(response) {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Request failed.');
    })
    .then((data) => {
        let lista = " <h4>PELICULAS ENCONTRADAS </h4>";
        data.forEach((peli)=>
        {
            console.log(peli);
            lista = lista + "<p>" + peli.title + "-"
                            + peli.year +
                "- RATING : IMDB = "+ peli.imdb.rating+
                " TOMATOES = "+peli.tomatoes?.viewer?.rating+
                " METRACRITIC = "+peli.tomatoes?.critic?.rating +"</p>";
            lista = lista + "<img src=\""+peli.poster +"\" width=\"200\" height=\"200\">";
        })
        const divRes = document.getElementById("resultados");
        divRes.innerHTML = lista;
        return;
    } )
    .catch(function(error) {
      console.log(error);
    });

   

});

buttonBuscarEspecificas.addEventListener('click', function(e) {
    // realizar la busqueda y generar la lista
    fetch('/peliculasEspecificas', {method: 'GET'})
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Request failed.');
        })
        .then((data) => {
            let lista = " <h4>PELICULAS ENCONTRADAS</h4>";
            data.forEach((peli)=>
            {
                console.log(peli);
                lista = lista + "<p>" + peli.title + "-"
                    + peli.year +
                    "- RATING : IMDB = "+ peli.imdb.rating+
                    " TOMATOES = "+peli.tomatoes?.viewer?.rating+
                    " METRACRITIC = "+peli.tomatoes?.critic?.rating +"</p>";
                lista = lista + "<img src=\""+peli.poster +"\" width=\"200\" height=\"200\">";
            })
            const divRes = document.getElementById("resultados");
            divRes.innerHTML = lista;
            return;
        } )
        .catch(function(error) {
            console.log(error);
        });



});

buttonInsertarPeli.addEventListener('click', function(e) {
    // busca cinco pelis al azar
    fetch('/peliculasRamdonFive', {method: 'GET'})
        .then(function(response) {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Request failed.');
        })
        .then((data) => {

            const nuevaPeli = {
                'title':'TADW Presenta:'+ data[0].title,
                'fullplot':data[1].fullplot,
                'cast':data[2].cast,
                'poster':data[3].poster,
                'year':data[4].year,
            };

            fetch('/peliculas', {method: 'POST',
                                           headers: { 'Content-Type': 'application/json'},
                                           body:JSON.stringify(nuevaPeli)});

                    let lista = "<h4>PELICULA POSTEADA CORRECTAMENTE</h4>";
                    lista = lista + "<p> title = " + nuevaPeli.title + "</p>";
                    lista = lista + "<p> fullplot = " + nuevaPeli.fullplot + "</p>";
                    lista = lista + "<p> cast = " + nuevaPeli.cast + "</p>";
                    lista = lista + "<p> year = " + nuevaPeli.year + "</p>";
                    lista = lista + "<img src=\""+nuevaPeli.poster +"\">";
                    const divRes = document.getElementById("resultados");
                    divRes.innerHTML = lista;


            return;
        } )
        .catch(function(error) {
            console.log(error);
        });



});