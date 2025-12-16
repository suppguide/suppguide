document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.querySelector('.search-input');
  const suggestionBox = document.querySelector('.search-suggestions');

  if (!searchInput || !suggestionBox) return;

  const pages = [
    { label: 'Home', keywords: ['home'], url: 'index.html' },
    { label: 'Beginner', keywords: ['beginner'], url: 'beginner.html' },
    { label: 'Protein', keywords: ['protein', 'whey'], url: 'protein.html' },
    { label: 'Creatine', keywords: ['creatine'], url: 'creatine.html' },
    { label: 'Health basics', keywords: ['health', 'basics'], url: 'health-basics.html' }
  ];

  function showSuggestions(value) {
    suggestionBox.innerHTML = '';

    if (!value) {
      suggestionBox.style.display = 'none';
      return;
    }

    const matches = pages.filter(page =>
      page.keywords.some(k => k.includes(value))
    );

    if (matches.length === 0) {
      suggestionBox.style.display = 'none';
      return;
    }

    matches.forEach(match => {
      const div = document.createElement('div');
      div.className = 'search-suggestion';
      div.textContent = match.label;
      div.onclick = () => {
        window.location.href = match.url;
      };
      suggestionBox.appendChild(div);
    });

    suggestionBox.style.display = 'block';
  }

  searchInput.addEventListener('input', () => {
    showSuggestions(searchInput.value.toLowerCase().trim());
  });

  searchInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const value = searchInput.value.toLowerCase().trim();

      for (let page of pages) {
        if (page.keywords.some(k => k.includes(value))) {
          window.location.href = page.url;
          return;
        }
      }
    }
  });

  document.addEventListener('click', e => {
    if (!e.target.closest('.header-search')) {
      suggestionBox.style.display = 'none';
    }
  });
});
