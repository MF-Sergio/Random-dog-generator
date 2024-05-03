function extrairRaca(imgUrl) {
    let startIndex = imgUrl.indexOf('breeds/') + 7;
    let endIndex = imgUrl.indexOf('/', startIndex);
    let breedNameExtract = imgUrl.slice(startIndex, endIndex);

    return breedNameExtract;
}

function carregarImagens(){
		
    let url = "https://dog.ceo/api/breeds/image/random"
    
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                console.log(`Resultado da Requisição: ${data.message}`);

                let secaoImagem = document.querySelector('.exibicao-de-cachorro');
                let imgDog = document.querySelector("#img_dog");
                imgDog.src = data.message;

                let breedName = extrairRaca(data.message);

                let breedElement = document.querySelector('.img_dog-raca');

                breedElement.textContent = '';
                
                breedElement.textContent = breedName;

                secaoImagem.insertBefore(breedElement, imgDog.nextSibling)

            });
        })
        .catch(function(err) {
            console.error(`O seguinte erro ocorreu durante a requisição: ${err}`);
    });

}

function mostrarLista(){

    let url = "https://dog.ceo/api/breeds/list/all";
    
    fetch(url)
        .then((response) => {
            response.json().then((data) => {
                console.log(`Resultado da Requisição ${data.message}`);

                let breedList = document.querySelector('#breed_list');
                breedList.innerHTML = "";

                for (let breed in data.message) {
                    let listItem = document.createElement('li');
                    listItem.textContent = breed;

                    if (data.message[breed].length > 0) {
                        let subList = document.createElement('ul');
                        data.message[breed].forEach((subtype) => {
                            let subListItem = document.createElement('li');
                            subListItem.textContent = subtype;
                            subList.appendChild(subListItem)
                        });
                        listItem.appendChild(subList);
                    }

                    breedList.appendChild(listItem);
                }
            });
        })
        .catch((err) => {
            console.error(`O seguinte erro ocorreu durante a requisição: ${err}`);
    });

}