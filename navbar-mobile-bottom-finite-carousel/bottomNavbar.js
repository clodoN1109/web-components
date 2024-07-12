const carousel = document.querySelector('#bottom-navbar-carousel');
const items = document.querySelectorAll('.carousel-item');

// ------------------------------------------------------------------------------------------------------------

function adjustMarginBottom() {
    const center = window.innerWidth / 2;
    items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(center - itemCenter);
        const maxDistance = center; // The maximum distance can be the center of the viewport

        // Calculate the height based on the distance (smaller distance -> larger height)
        const minMarginTop = 0; // Minimum MarginTop
        const maxMarginTop = 20; // Maximum MarginTop
        const margin = maxMarginTop - (distance / maxDistance) * (maxMarginTop - minMarginTop);

        // Apply the calculated height
        item.style.marginBottom = `${margin}px`;
    });
}

// ------------------------------------------------------------------------------------------------------------

function checkItemsPosition() {

	const carouselRect = carousel.getBoundingClientRect();

	items.forEach(item => {

		const itemRect = item.getBoundingClientRect();
		const itemWidth = (itemRect.right - itemRect.left);
		const itemCenter = itemWidth/2 + itemRect.left;

		console.log();

		const carouselCenter = (carouselRect.right - carouselRect.left)/2;
		const rightLimit = carouselCenter + itemWidth/1.45 ;
		const leftLimit = carouselCenter - itemWidth/1.45;
				
		const itemIsCentered = leftLimit < itemCenter && itemCenter < rightLimit;

		if (itemIsCentered) {
		
			item.dataset.selected = 'true';

			document.querySelector('#bottom-navbar-selected').textContent = item.dataset.name;
				
		} else {item.dataset.selected = 'false';}

	})

}

// Initialize
carousel.addEventListener('scroll', () => {adjustMarginBottom(); checkItemsPosition();});
window.addEventListener('resize', adjustMarginBottom);
adjustMarginBottom(); 
document.getElementById('carousel-item-1').scrollIntoView();

// ------------------------------------------------------------------------------------------------------------
