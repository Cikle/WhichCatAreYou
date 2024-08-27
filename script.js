async function calculateCat() {
    const response = await fetch('cats.json');
    const cats = await response.json();
    
    const social = parseInt(document.getElementById('social').value);
    const energetic = parseInt(document.getElementById('energetic').value);
    const independent = parseInt(document.getElementById('independent').value);

    const userScores = {
        social: social,
        energetic: energetic,
        independent: independent
    };

    let bestMatch = null;
    let bestMatchScore = Infinity;

    cats.forEach(cat => {
        const catScores = {
            social: cat.social_needs,
            energetic: cat.energy_level,
            independent: 5 - cat.affection_level
        };

        const totalDifference = 
            Math.abs(userScores.social - catScores.social) +
            Math.abs(userScores.energetic - catScores.energetic) +
            Math.abs(userScores.independent - catScores.independent);

        if (totalDifference < bestMatchScore) {
            bestMatchScore = totalDifference;
            bestMatch = cat;
        }
    });

    displayResult(bestMatch);
}

function displayResult(cat) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2>You are a ${cat.name}!</h2>
        <img src="${cat.image}" alt="${cat.name}">
        <p>${cat.temperament}</p>
    `;
}
