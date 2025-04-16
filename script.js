document.addEventListener('DOMContentLoaded', function() {
    const breedSearch = document.getElementById('breed-search');
    const searchBtn = document.getElementById('search-btn');
    const randomBtn = document.getElementById('random-btn');
    const breedList = document.getElementById('breed-list');
    const breedInfo = document.getElementById('breed-info');
    const imageGallery = document.getElementById('image-gallery');
    const loading = document.getElementById('loading');

    let allBreeds = [];

    // Carrega todas as raças disponíveis
    function loadAllBreeds() {
        loading.style.display = 'flex';
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success') {
                    allBreeds = Object.keys(data.message);
                    populateBreedList(allBreeds);
                }
            })
            .catch(error => {
                console.error('Erro ao carregar raças:', error);
                breedList.innerHTML = '<option value="">Erro ao carregar raças</option>';
            })
            .finally(() => {
                loading.style.display = 'none';
            });
    }

    // Preenche o dropdown com as raças
    function populateBreedList(breeds) {
        breedList.innerHTML = '<option value="">Selecione uma raça</option>';
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed.charAt(0).toUpperCase() + breed.slice(1);
            breedList.appendChild(option);
        });
    }

    // Busca imagens de uma raça específica
    function searchBreed(breed) {
        if (!breed) return;
        
        loading.style.display = 'flex';
        imageGallery.innerHTML = '';
        breedInfo.innerHTML = '';
        
        fetch(`https://dog.ceo/api/breed/${breed}/images`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 'success' && data.message.length > 0) {
                    displayBreedInfo(breed, data.message.length);
                    displayImages(data.message);
                } else {
                    breedInfo.innerHTML = `<p>Nenhuma imagem encontrada para a raça ${breed}.</p>`;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar imagens:', error);
                breedInfo.innerHTML = `<p class="error">Erro ao buscar imagens para ${breed}. Tente novamente.</p>`;
            })
            .finally(() => {
                loading.style.display = 'none';
            });
    }

    // Exibe informações sobre a raça
    function displayBreedInfo(breed, imageCount) {
        breedInfo.innerHTML = `
            <div class="breed-info">
                <h2>${breed.charAt(0).toUpperCase() + breed.slice(1)}</h2>
                <p><strong>Imagens disponíveis:</strong> ${imageCount}</p>
                <p><strong>Link para mais informações:</strong> <a href="https://www.google.com/search?q=${breed}+dog+breed" target="_blank">Pesquisar no Google</a></p>
            </div>
        `;
    }

    // Exibe as imagens da raça
    function displayImages(images) {
        // Limita a 20 imagens para não sobrecarregar
        const limitedImages = images.slice(0, 20);
        
        limitedImages.forEach(imageUrl => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'image-container';
            
            const img = document.createElement('img');
            img.src = imageUrl;
            img.alt = 'Imagem de cachorro da raça buscada';
            img.className = 'dog-image';
            
            imgContainer.appendChild(img);
            imageGallery.appendChild(imgContainer);
        });
    }

    // Busca uma raça aleatória
    function getRandomBreed() {
        if (allBreeds.length === 0) return;
        
        const randomIndex = Math.floor(Math.random() * allBreeds.length);
        const randomBreed = allBreeds[randomIndex];
        breedSearch.value = randomBreed;
        searchBreed(randomBreed);
    }

    // Event Listeners
    searchBtn.addEventListener('click', () => {
        const breed = breedSearch.value.trim().toLowerCase();
        if (breed) {
            searchBreed(breed);
        }
    });

    randomBtn.addEventListener('click', getRandomBreed);

    breedList.addEventListener('change', () => {
        const breed = breedList.value;
        if (breed) {
            breedSearch.value = breed;
            searchBreed(breed);
        }
    });

    breedSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const breed = breedSearch.value.trim().toLowerCase();
            if (breed) {
                searchBreed(breed);
            }
        }
    });

    // Inicializa a aplicação
    loadAllBreeds();
});