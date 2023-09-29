export const defaultFeedFilter = {
    cost: [],
    category: [],
    distance: []
};

export const costChoiceList = [
    { key: "low", displayName: "1000円以内" },
    { key: "middle", displayName: "1000円〜3000円" },
    { key: "high", displayName: "3000円以上" }
];

export const categoryChoiceList = [
    { key: "food", displayName: "飲食" },
    { key: "play", displayName: "遊び" },
    { key: "rest", displayName: "休憩" }
];

export const distanceChoiceList = [
    { key: "low", displayName: "近所" },
    { key: "middle", displayName: "そんなに遠くない" },
    { key: "high", displayName: "旅行" }
];

export const allVideoList = [
    {
        "src": 'ehime-matsuyama-exp-hotspring.mp4',
        "cost": "high",
        "distance": "high",
        "category": "play"
    },
    {
        "src": 'tokyo--exp-cristmas.mp4',
        "cost": "middle",
        "distance": "middle",
        "category": "food"
    },
    {
        "src": 'tokyo-shibuya-exp-perfume.mp4',
        "cost": "middle",
        "distance": "low",
        "category": "play"
    },
    {
        "src": 'tokyo-shibuya-food-marshumallow.mp4',
        "cost": "low",
        "distance": "low",
        "category": "rest"
    },

    {
        "src": 'ehime-matsuyama-exp-hotspring.mp4',
        "cost": "high",
        "distance": "high",
        "category": "play"
    },
    {
        "src": 'tokyo--exp-cristmas.mp4',
        "cost": "middle",
        "distance": "middle",
        "category": "food"
    },
    {
        "src": 'tokyo-shibuya-exp-perfume.mp4',
        "cost": "middle",
        "distance": "low",
        "category": "play"
    },
    {
        "src": 'tokyo-shibuya-food-marshumallow.mp4',
        "cost": "low",
        "distance": "low",
        "category": "rest"
    },
];

export function filterItems(feedFilter) {
    let items = allVideoList;
    items = filterByCost(items, feedFilter.cost);
    items = filterByCategory(items, feedFilter.category);
    items = filterByDistance(items, feedFilter.distance);
    return items;
}

function filterByCost(items, choices) {
    if (choices.length == 0) {
        return items;
    }

    let res = [];
    for (let item of items) {
        if (choices.includes(item.cost)) {
            res.push(item);
        }
    }
    return res;
}

function filterByCategory(items, choices) {
    if (choices.length == 0) {
        return items;
    }

    let res = [];
    for (let item of items) {
        if (choices.includes(item.category)) {
            res.push(item);
        }
    }
    return res;
}

function filterByDistance(items, choices) {
    if (choices.length == 0) {
        return items;
    }

    let res = [];
    for (let item of items) {
        if (choices.includes(item.distance)) {
            res.push(item);
        }
    }
    return res;
}