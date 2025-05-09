document.addEventListener("DOMContentLoaded", function() {
    const carousels = document.querySelectorAll(".content-carousel");

    carousels.forEach(carousel => {
        const itemsContainer = carousel.querySelector(".carousel-items");
        const prevButton = carousel.querySelector(".prev-arrow");
        const nextButton = carousel.querySelector(".next-arrow");

        if (!itemsContainer || !prevButton || !nextButton) {
            console.warn("Carrossel não configurado corretamente:", carousel);
            return;
        }

        const firstItem = itemsContainer.querySelector(".carousel-item");
        // Estime itemWidth incluindo margem. Assume que todos os itens têm largura semelhante.
        // The CSS has .carousel-item { margin-right: 10px; }
        const itemWidthWithMargin = firstItem ? firstItem.offsetWidth + 10 : 230; 
        
        // Adjust scrollStep to be a multiple of itemWidthWithMargin, e.g., scroll 3-5 items
        // Or, scroll by a percentage of the container's width
        const scrollStep = itemWidthWithMargin * 3; // Scroll by approx 3 items

        nextButton.addEventListener("click", () => {
            const currentScroll = itemsContainer.scrollLeft;
            const maxScroll = itemsContainer.scrollWidth - itemsContainer.clientWidth;

            // Check if we are at or very near the end
            if (currentScroll >= maxScroll - 1) { // -1 para possíveis imprecisões de ponto flutuante
                // Loop to the beginning
                itemsContainer.scrollTo({
                    left: 0,
                    behavior: "smooth"
                });
            } else {
                let targetScroll = currentScroll + scrollStep;
                // Se a próxima etapa de rolagem for além de maxScroll, basta ir para maxScroll
                if (targetScroll > maxScroll) {
                    targetScroll = maxScroll;
                }
                itemsContainer.scrollTo({
                    left: targetScroll,
                    behavior: "smooth"
                });
            }
        });

        prevButton.addEventListener("click", () => {
            const currentScroll = itemsContainer.scrollLeft;
            const maxScroll = itemsContainer.scrollWidth - itemsContainer.clientWidth; // Recalculate in case of resize

            // Verifique se estamos no início ou muito perto do início
            if (currentScroll <= 0) {
                // Loop to the end
                itemsContainer.scrollTo({
                    left: maxScroll,
                    behavior: "smooth"
                });
            } else {
                let targetScroll = currentScroll - scrollStep;
                // Se a próxima etapa de rolagem for antes de 0, basta ir para 0
                if (targetScroll < 0) {
                    targetScroll = 0;
                }
                itemsContainer.scrollTo({
                    left: targetScroll,
                    behavior: "smooth"
                });
            }
        });
    });

    let search = document.getElementById('search-form')

    search.addEventListener('click', function(){
        this.classList.toogle('search-input');
    })
});

console.log("Página da deep web da Netflix carregada e script do carrossel com loop ativo.");
