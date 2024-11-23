(function() {
    window.addEventListener('load', function() {
        const footer = document.querySelector('#loadTimeInfo');
        
        if (footer) {
            const loadTime = performance.timing.domContentLoadedEventEnd - performance.timing.navigationStart;
            footer.textContent = `Время загрузки страницы: ${loadTime} мс`;
        } else {
            console.warn("Элемент #loadTimeInfo не найден на странице.");
        }
    });

    
})();
