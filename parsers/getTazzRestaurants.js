const HTMLParser = require('fast-html-parser');

const getTazzRestaurants = (htmlPage) => {
    const root = HTMLParser.parse(htmlPage);
    const restaurantCards = root.querySelectorAll('.store-card');
    if (!restaurantCards) {
        return null;
    }

    return restaurantCards.map((card) => {
        const closed = card.querySelector('.partner-schedule-info');
        if (closed) {
            return null;
        }
        return {
            name: card.querySelector('.store-name').rawText,
            url: card.querySelector('a').attributes.href,
            imageURL: `/randomRestaurant/tazzImage?url=${card.querySelector('img.logo-cover').attributes.src}`
        }
    }).filter(restaurant => !!restaurant);
}

module.exports = getTazzRestaurants;