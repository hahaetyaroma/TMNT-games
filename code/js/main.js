let Don = {
    name: 'Don',
    armor: 45,
    damage: 25,
    agility: 65,
    health: 125,
    type: '',
    imageUrl: 'code/images/don.png'
}
let Foot = {
    name: 'Hun',
    armor: 10,
    damage: 55,
    agility: 1,
    health: 350,
    type: '',
    imageUrl: '../images/Hun.png'
}

let hero;
let intervalHeroAtack;
let intervalEnemyAtackAnim;
let intervalHit;

function init() {
    const heroArray = [Don];
    const enemyArray = [Foot];

    enemy = enemyArray[0]
    hero = heroArray[0];
    console.log(hero);
    document.getElementById('hero').style.backgroundImage = `url(${hero.imageUrl})`;
    updateStats()
    get('btn1').onclick = animateHeroAtack;
}
window.onload = function () {
    init();
}

function updateStats() {
    get('hero-name').innerHTML = 'Имя: ' + hero.name;
    get('hero-damage').innerHTML = 'Урон: ' + hero.damage;
    get('hero-armor').innerHTML = 'Защита: ' + hero.armor;
    get('hero-health').innerHTML = 'Здоровье: ' + hero.health;

    get('enemy-name').innerHTML = 'Имя: ' + enemy.name;
    get('enemy-damage').innerHTML = 'Урон: ' + enemy.damage;
    get('enemy-armor').innerHTML = 'Защита: ' + enemy.armor;
    get('enemy-health').innerHTML = 'Здоровье: ' + enemy.health;
}

function get(item) {
    return document.getElementById(item)
}

function randomInteger(min, max) {
    let randomInt = min + Math.random() * (max + 1 - min);
    return randomInt.toFixed();
}



function animateHeroAtack() {
    let heroDamageAttack = Math.floor((Foot.health - Don.damage) - (Don.agility / 2) + Foot.armor);
    let heroDamage = Math.floor((Don.damage) + (Don.agility / 2) - Foot.armor);

    let position = 0;
    const interval = 100;
    const diff = 240;
    Foot.health = heroDamageAttack;
    updateStats()

    get('hero').style.transform = 'translate(300px, 0px)';
    intervalHeroAtack = setInterval(() => {
        get('hero').style.backgroundPosition = `-${position}px, -2900px`
        if (position < 2100) {
            position = position + diff;
        } else {
            position = 0;
            get('hero').style.backgroundPosition = `-${position}px, 2900px`
            get('hero').style.transform = 'translate(0px, 0px)';
            animationHit('enemy', 'damage-enemy-container', heroDamage);
            setTimeout(() => {
                animateEnemyAtack()
            }, 2000);
            stopAnimations(intervalHeroAtack);
        }
    }, interval);
}

function animateEnemyAtack() {
    let position = 0;
    const interval = 100;
    const diff = 260;

    intervalEnemyAtackAnim = setInterval(() => {
        get('enemy').style.transform = 'translate(-300px, 0px)';
        get('enemy').style.backgroundPosition = `-${position}px, 2900px`
        if (position < 1000) {
            position = position + diff;
        } else {
            position = 0;
            get('enemy').style.transform = 'translate(0px, 0px)';
            get('enemy').style.backgroundPosition = `-${position}px, 2900px`
            animationHit('hero', 'damage-hero-container', Foot.damage);
            stopAnimations(intervalEnemyAtackAnim);
        }
    }, interval);

}

function animationHit(character, damageContainer, damage) {
    let position = 0;
    const interval = 140;
    const diff = 5;

    intervalHit = setInterval(() => {
        get(character).style.transform = `translate(0px, -${position}px)`;
        get(damageContainer).innerHTML = damage;
        get(damageContainer).style.display = 'block';
        get(damageContainer).style.transform = `translate(0px, -${position}px)`

        if (position < 30) {
            position = position + diff;
        } else {
            position = 0;
            get(character).style.transform = `translate(0px, 0px)`;
            get(damageContainer).style.transform = `translate(0px, 0px)`
            get(damageContainer).style.display = 'none';
            stopAnimations(intervalHit);
        }
    }, interval);

}

function stopAnimations(item) {
    clearInterval(item);
}