document.addEventListener('DOMContentLoaded', function() {
  const catalogContainer = document.querySelector('.catalog-grid');

  if (!catalogContainer) {
    console.error('Catalog container not found');
    return;
  }

  fetch('/json/catalog.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data)) {
        throw new Error('Invalid data format');
      }
      renderCatalog(data);
    })
    .catch(error => {
      console.error('Error loading catalog:', error);
      catalogContainer.innerHTML = '<p class="error">Ошибка загрузки каталога. Пожалуйста, попробуйте позже.</p>';
    });

  function renderCatalog(items) {
    catalogContainer.innerHTML = '';

    items.forEach(item => {
      const catalogItem = document.createElement('div');
      catalogItem.className = 'catalog-item';

      const imageDiv = document.createElement('div');
      imageDiv.className = 'image-placeholder';
      if (item.image) {
        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.title;
        img.loading = 'lazy';
        imageDiv.appendChild(img);
      }

      const title = document.createElement('h3');
      title.textContent = item.title;

      const description = document.createElement('p');
      description.textContent = item.description;

      const price = document.createElement('p');
      price.className = 'price';
      price.textContent = item.price;

      catalogItem.appendChild(imageDiv);
      catalogItem.appendChild(title);
      catalogItem.appendChild(description);
      catalogItem.appendChild(price);

      catalogContainer.appendChild(catalogItem);
    });
  }
});
