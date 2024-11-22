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

    function highlightMenuOnScroll() {
        const sections = document.querySelectorAll('main section');
        const links = document.querySelectorAll('nav a.link');
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (window.pageYOffset >= sectionTop - 50 && window.pageYOffset < sectionTop + sectionHeight - 50) {
                currentSection = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('DOMContentLoaded', highlightMenuOnScroll);
    window.addEventListener('scroll', highlightMenuOnScroll);
})();
