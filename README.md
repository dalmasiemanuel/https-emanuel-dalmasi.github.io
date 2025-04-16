<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Busca de Raças de Cães</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <header>
            <h1>Busca de Raças de Cães</h1>
            <p>Encontre imagens e informações sobre diversas raças caninas</p>
        </header>

        <div class="search-container">
            <input type="text" id="breed-search" placeholder="Digite o nome da raça...">
            <button id="search-btn">Buscar</button>
            <button id="random-btn">Aleatório</button>
        </div>

        <div class="filters">
            <label for="breed-list">Ou selecione uma raça:</label>
            <select id="breed-list">
                <option value="">Carregando raças...</option>
            </select>
        </div>

        <div id="results" class="results-container">
            <div class="loading" id="loading" style="display: none;">
                <div class="spinner"></div>
                <p>Carregando...</p>
            </div>
            <div id="breed-info"></div>
            <div id="image-gallery" class="image-gallery"></div>
        </div>

        <footer>
            <p>Dados fornecidos pela <a href="https://dog.ceo/dog-api/" target="_blank">Dog API</a></p>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>


/* (Mantive o mesmo CSS do exemplo anterior) */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background-color: #f5f5f5;
    color: #333;
    line-height: 1.6;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

header {
    text-align: center;
    margin-bottom: 30px;
    padding: 20px 0;
}

header h1 {
    font-size: 2.5rem;
    color: #2c3e50;
    margin-bottom: 10px;
}

header p {
    color: #7f8c8d;
    font-size: 1.1rem;
}

.search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    gap: 10px;
    flex-wrap: wrap;
}

.search-container input {
    padding: 12px 15px;
    border: 2px solid #ddd;
    border-radius: 30px;
    font-size: 1rem;
    width: 300px;
    outline: none;
    transition: border 0.3s;
}

.search-container input:focus {
    border-color: #3498db;
}

.search-container button {
    padding: 12px 25px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
}

.search-container button:hover {
    background-color: #2980b9;
}

#random-btn {
    background-color: #2ecc71;
}

#random-btn:hover {
    background-color: #27ae60;
}

.filters {
    text-align: center;
    margin-bottom: 30px;
}

.filters select {
    padding: 10px 15px;
    border: 2px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    min-width: 250px;
    margin-left: 10px;
}

.results-container {
    background-color: white;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin-bottom: 30px;
}

.breed-info {
    margin-bottom: 20px;
    padding: 15px;
    background-color: #f8f9fa;
    border-radius: 5px;
}

.breed-info h2 {
    color: #2c3e50;
    margin-bottom: 10px;
}

.breed-info p {
    margin-bottom: 8px;
}

.image-gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.dog-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 8px;
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s;
}

.dog-image:hover {
    transform: scale(1.03);
}

.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
}

.spinner {
    border: 5px solid #f3f3f3;
    border-top: 5px solid #3498db;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    margin-bottom: 15px;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

footer {
    text-align: center;
    padding: 20px;
    color: #7f8c8d;
    font-size: 0.9rem;
}

footer a {
    color: #3498db;
    text-decoration: none;
}

footer a:hover {
    text-decoration: underline;
}

@media (max-width: 768px) {
    .search-container {
        flex-direction: column;
        align-items: center;
    }
    
    .search-container input, 
    .search-container button {
        width: 100%;
    }
    
    .filters select {
        margin-top: 10px;
        margin-left: 0;
        width: 100%;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    const breedSearch = document.getElementById('breed-search');
    const searchBtn = document.getElementById('search-btn');
    const randomBtn = document.getElementById('random-btn');
    const breedList = document.getElementById('breed-list');
    const breedInfo = document.getElementById('breed-info');
    const imageGallery = document.getElementById('image-gallery');
    const loading = document.getElementById('loading');

    // Dicionário de tradução de raças
    const breedTranslations = {
        'affenpinscher': 'Affenpinscher',
        'african': 'Cão Africano',
        'airedale': 'Airedale Terrier',
        'akita': 'Akita',
        'appenzeller': 'Appenzeller',
        'australian': 'Pastor Australiano',
        'basenji': 'Basenji',
        'beagle': 'Beagle',
        'bluetick': 'Bluetick Coonhound',
        'borzoi': 'Borzoi',
        'bouvier': 'Bouvier',
        'boxer': 'Boxer',
        'brabancon': 'Brabançon',
        'briard': 'Briard',
        'buhund': 'Buhund Norueguês',
        'bulldog': 'Bulldog',
        'bullterrier': 'Bull Terrier',
        'cattledog': 'Cão Boiadeiro',
        'chihuahua': 'Chihuahua',
        'chow': 'Chow Chow',
        'clumber': 'Clumber Spaniel',
        'cockapoo': 'Cockapoo',
        'collie': 'Collie',
        'coonhound': 'Coonhound',
        'corgi': 'Corgi',
        'cotondetulear': 'Coton de Tulear',
        'dachshund': 'Dachshund',
        'dalmatian': 'Dálmata',
        'dane': 'Dogue Alemão',
        'deerhound': 'Deerhound',
        'dhole': 'Cão Selvagem Asiático',
        'dingo': 'Dingo',
        'doberman': 'Doberman',
        'elkhound': 'Elkhound Norueguês',
        'entlebucher': 'Entlebucher',
        'eskimo': 'Cão Esquimó',
        'finnish': 'Spitz Finlandês',
        'frise': 'Bichon Frisé',
        'germanshepherd': 'Pastor Alemão',
        'greyhound': 'Greyhound',
        'groenendael': 'Groenendael',
        'havanese': 'Havanês',
        'hound': 'Hound',
        'husky': 'Husky',
        'keeshond': 'Keeshond',
        'kelpie': 'Kelpie',
        'komondor': 'Komondor',
        'kuvasz': 'Kuvasz',
        'labradoodle': 'Labradoodle',
        'labrador': 'Labrador',
        'leonberg': 'Leonberger',
        'lhasa': 'Lhasa Apso',
        'malamute': 'Malamute do Alasca',
        'malinois': 'Malinois',
        'maltese': 'Maltês',
        'mastiff': 'Mastiff',
        'mexicanhairless': 'Pelado Mexicano',
        'mix': 'Mestiço',
        'mountain': 'Cão de Montanha',
        'newfoundland': 'Terra Nova',
        'otterhound': 'Otterhound',
        'ovcharka': 'Ovcharka',
        'papillon': 'Papillon',
        'pekinese': 'Pequinês',
        'pembroke': 'Pembroke Welsh Corgi',
        'pinscher': 'Pinscher',
        'pitbull': 'Pitbull',
        'pointer': 'Pointer',
        'pomeranian': 'Pomerânia',
        'poodle': 'Poodle',
        'pug': 'Pug',
        'puggle': 'Puggle',
        'pyrenees': 'Cão dos Pirenéus',
        'redbone': 'Redbone Coonhound',
        'retriever': 'Retriever',
        'ridgeback': 'Ridgeback',
        'rottweiler': 'Rottweiler',
        'saluki': 'Saluki',
        'samoyed': 'Samoyed',
        'schipperke': 'Schipperke',
        'schnauzer': 'Schnauzer',
        'setter': 'Setter',
        'sheepdog': 'Cão Pastor',
        'shiba': 'Shiba Inu',
        'shihtzu': 'Shih Tzu',
        'spaniel': 'Spaniel',
        'springer': 'Springer Spaniel',
        'stbernard': 'São Bernardo',
        'terrier': 'Terrier',
        'vizsla': 'Vizsla',
        'waterdog': 'Cão D\'Água',
        'weimaraner': 'Weimaraner',
        'whippet': 'Whippet',
        'wolfhound': 'Wolfhound'
    };

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

    // Preenche o dropdown com as raças traduzidas
    function populateBreedList(breeds) {
        breedList.innerHTML = '<option value="">Selecione uma raça</option>';
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breedTranslations[breed] || breed;
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
                    const translatedBreed = breedTranslations[breed] || breed;
                    breedInfo.innerHTML = `<p>Nenhuma imagem encontrada para a raça ${translatedBreed}.</p>`;
                }
            })
            .catch(error => {
                console.error('Erro ao buscar imagens:', error);
                const translatedBreed = breedTranslations[breed] || breed;
                breedInfo.innerHTML = `<p class="error">Erro ao buscar imagens para ${translatedBreed}. Tente novamente.</p>`;
            })
            .finally(() => {
                loading.style.display = 'none';
            });
    }

    // Exibe informações sobre a raça
    function displayBreedInfo(breed, imageCount) {
        const translatedBreed = breedTranslations[breed] || breed;
        breedInfo.innerHTML = `
            <div class="breed-info">
                <h2>${translatedBreed}</h2>
                <p><strong>Imagens disponíveis:</strong> ${imageCount}</p>
                <p><strong>Link para mais informações:</strong> <a href="https://www.google.com/search?q=${translatedBreed}+raça+de+cachorro" target="_blank">Pesquisar no Google</a></p>
            </div>
        `;
    }

    // Exibe as imagens da raça
    function displayImages(images) {
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
        breedSearch.value = breedTranslations[randomBreed] || randomBreed;
        searchBreed(randomBreed);
    }

    // Event Listeners
    searchBtn.addEventListener('click', () => {
        const searchTerm = breedSearch.value.trim().toLowerCase();
        // Encontra a chave em inglês correspondente ao termo em português
        const breed = Object.keys(breedTranslations).find(
            key => breedTranslations[key].toLowerCase() === searchTerm
        ) || searchTerm;
        
        if (breed) {
            searchBreed(breed);
        }
    });

    randomBtn.addEventListener('click', getRandomBreed);

    breedList.addEventListener('change', () => {
        const breed = breedList.value;
        if (breed) {
            breedSearch.value = breedTranslations[breed] || breed;
            searchBreed(breed);
        }
    });

    breedSearch.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = breedSearch.value.trim().toLowerCase();
            const breed = Object.keys(breedTranslations).find(
                key => breedTranslations[key].toLowerCase() === searchTerm
            ) || searchTerm;
            
            if (breed) {
                searchBreed(breed);
            }
        }
    });

    // Inicializa a aplicação
    loadAllBreeds();
});
