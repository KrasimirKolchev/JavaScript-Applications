function solve() {

    function hero(name) {
        return {
            name,
            health: 100
        };
    }

    function canCast(state) {
        return {
            cast: function (spell) {
                console.log(`${state.name} cast ${spell}`);
                state.mana--;
            }
        }
    }

    function canFight(state) {
        return {
            fight: function () {
                console.log(`${state.name} slashes at the foe!`);
                state.stamina--;
            }
        }
    }

    function mage(name) {
        let state = Object.assign(hero(name), {mana: 100});
        return Object.assign(state, canCast(state));
    }

    function fighter(name) {
        let state = Object.assign(hero(name), {stamina: 100});
        return Object.assign(state, canFight(state));
    }

    return {mage, fighter};
}

let create = solve();
const scorcher = create.mage("Scorcher");
scorcher.cast("fireball");
scorcher.cast("thunder");
scorcher.cast("light");

const scorcher2 = create.fighter("Scorcher 2");
scorcher2.fight();

console.log(scorcher2.stamina);
console.log(scorcher.mana);
