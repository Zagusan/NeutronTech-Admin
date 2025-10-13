(function () {
    const KEY = 'themeInverted';
    const html = document.documentElement;
    const themeCheckbox = document.getElementById('theme-checkbox');
    const label = document.querySelector('label[for="theme-checkbox"]');

    const saved = localStorage.getItem(KEY) === 'true';
    if (saved) {
        html.classList.add('theme-inverted');
        if (themeCheckbox) themeCheckbox.checked = true;
    }

    const updateLabel = () => {
        const inverted = html.classList.contains('theme-inverted');
        if (label) label.setAttribute('aria-label', inverted ? 'Dark Mode' : 'Light Mode');
        if (themeCheckbox) themeCheckbox.setAttribute('aria-pressed', String(inverted));
    };

    if (themeCheckbox) {
        updateLabel();
        themeCheckbox.addEventListener('change', () => {
            html.classList.toggle('theme-inverted', themeCheckbox.checked);
            localStorage.setItem(KEY, String(themeCheckbox.checked));
            updateLabel();
        });
    }
})();