
const number = document.getElementById('number');
const upgradePriceDisplay1 = document.getElementById('upgradePrice1');
const upgradePriceDisplay2 = document.getElementById('upgradePrice2');
const upgradePriceDisplay3 = document.getElementById('upgradePrice3');

let intervalId = null;  
let clickBonus1 = 0; 
let clickBonus2 = 0; 
let autoIncrement = 0; // Bonus d'incrémentation automatique
let upgradePrice1 = 100; 
let upgradePrice2 = 200; 
let upgradePrice3 = 300; // Prix de la troisième amélioration

function loadProgress() {
    const savedNumber = localStorage.getItem('number');
    const savedClickBonus1 = localStorage.getItem('clickBonus1');
    const savedClickBonus2 = localStorage.getItem('clickBonus2');
    const savedAutoIncrement = localStorage.getItem('autoIncrement');
    const savedUpgradePrice1 = localStorage.getItem('upgradePrice1');
    const savedUpgradePrice2 = localStorage.getItem('upgradePrice2');
    const savedUpgradePrice3 = localStorage.getItem('upgradePrice3');

    if (savedNumber !== null) number.textContent = savedNumber;
    if (savedClickBonus1 !== null) clickBonus1 = parseInt(savedClickBonus1);
    if (savedClickBonus2 !== null) clickBonus2 = parseInt(savedClickBonus2);
    if (savedAutoIncrement !== null) autoIncrement = parseInt(savedAutoIncrement);
    if (savedUpgradePrice1 !== null) upgradePrice1 = parseInt(savedUpgradePrice1);
    if (savedUpgradePrice2 !== null) upgradePrice2 = parseInt(savedUpgradePrice2);
    if (savedUpgradePrice3 !== null) upgradePrice3 = parseInt(savedUpgradePrice3);

    upgradePriceDisplay1.textContent = upgradePrice1;
    upgradePriceDisplay2.textContent = upgradePrice2;
    upgradePriceDisplay3.textContent = upgradePrice3;
    updateUpgradeButtons(); 
}

function updateUpgradeButtons() {
    const currentValue = parseInt(number.textContent);
    document.getElementById('upgradeButton1').classList.toggle('disabled', currentValue < upgradePrice1);
    document.getElementById('upgradeButton2').classList.toggle('disabled', currentValue < upgradePrice2);
    document.getElementById('autoUpgrade').classList.toggle('disabled', currentValue < upgradePrice3);
}

function Increment() {
    const currentValue = parseInt(number.textContent);
    number.textContent = currentValue + 1 + clickBonus1 + clickBonus2; 
    saveProgress(); 
    updateUpgradeButtons(); 
}

function Upgrade(type) {
    const currentValue = parseInt(number.textContent);
    
    if (type === 1) {
        if (currentValue >= upgradePrice1) {
            number.textContent = currentValue - upgradePrice1;
            clickBonus1 += 1; 
            upgradePrice1 += 50; 
            upgradePriceDisplay1.textContent = upgradePrice1; 
            saveProgress(); 
        } else {
            alert("Vous devez avoir au moins " + upgradePrice1 + " pour acheter l'amélioration 1 !");
        }
    } else if (type === 2) {
        if (currentValue >= upgradePrice2) {
            number.textContent = currentValue - upgradePrice2;
            clickBonus2 += 2; 
            upgradePrice2 += 100; 
            upgradePriceDisplay2.textContent = upgradePrice2; 
            saveProgress(); 
        } else {
            alert("Vous devez avoir au moins " + upgradePrice2 + " pour acheter l'amélioration 2 !");
        }
    } else if (type === 3) {
        if (currentValue >= upgradePrice3) {
            number.textContent = currentValue - upgradePrice3;
            autoIncrement += 1; // Incrémente le bonus d'auto-incrémentation
            upgradePrice3 += 150; // Augmente le prix pour la prochaine amélioration
            upgradePriceDisplay3.textContent = upgradePrice3; 
            saveProgress(); 
        } else {
            alert("Vous devez avoir au moins " + upgradePrice3 + " pour acheter l'amélioration 3 !");
        }
    }
    updateUpgradeButtons(); 
}

function autoIncrementValue() {
    if (autoIncrement > 0) {
        const currentValue = parseInt(number.textContent);
        number.textContent = currentValue + autoIncrement;
        saveProgress();
    }
}

function saveProgress() {
    localStorage.setItem('number', number.textContent);
    localStorage.setItem('clickBonus1', clickBonus1);
    localStorage.setItem('clickBonus2', clickBonus2);
    localStorage.setItem('autoIncrement', autoIncrement);
    localStorage.setItem('upgradePrice1', upgradePrice1);
    localStorage.setItem('upgradePrice2', upgradePrice2);
    localStorage.setItem('upgradePrice3', upgradePrice3);
}

function resetProgress() {
    localStorage.clear(); // Efface toutes les données sauvegardées
    number.textContent = '0'; // Réinitialise le nombre
    clickBonus1 = 0; 
    clickBonus2 = 0; 
    autoIncrement = 0;
    upgradePrice1 = 100; 
    upgradePrice2 = 200; 
    upgradePrice3 = 300; 

    upgradePriceDisplay1.textContent = upgradePrice1;
    upgradePriceDisplay2.textContent = upgradePrice2;
    upgradePriceDisplay3.textContent = upgradePrice3;
    updateUpgradeButtons();
}

loadProgress();
setInterval(autoIncrementValue, 1000); // Incrémente automatiquement toutes les secondes