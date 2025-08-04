const characters = [
    {
        NOME: "Mario",
        VELOCIDADE: 4,
        MANOBRABILIDADE: 3,
        PODER: 3,
        PONTOS: 0
    },
    {
        NOME: "Luigi",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 3,
        PODER: 4,
        PONTOS: 0
    },
    {
        NOME: "Peach",
        VELOCIDADE: 3,
        MANOBRABILIDADE: 4,
        PODER: 2,
        PONTOS: 0
    },
    {
        NOME: "Bowser",
        VELOCIDADE: 5,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0
    },
    {
        NOME: "Yoshi",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 4,
        PODER: 3,
        PONTOS: 0
    },
    {
        NOME: "Donkey Kong",
        VELOCIDADE: 2,
        MANOBRABILIDADE: 2,
        PODER: 5,
        PONTOS: 0
    }
]

const selectPlayers = (characters) => {
    const charsCopy = [...characters];
    const idx1 = Math.floor(Math.random() * charsCopy.length);
    const player1 = charsCopy.splice(idx1, 1)[0];
    const idx2 = Math.floor(Math.random() * charsCopy.length);
    const player2 = charsCopy[idx2];
    return {player1, player2};
}

const {player1, player2} = selectPlayers(characters);

const weapon1 = {
    NOME: 'Casco',
    PODER: 1,
    ICONE: "🐢"
}
const weapon2 = {
    NOME: "Bomba",
    PODER: 2,
    ICONE: "💣"
}

const rollDice = async () => {
    return Math.floor(Math.random() * 6) + 1;
}

async function showPartialScore(player1, player2) {
    console.log(`Placar parcial: ${player1.NOME} ${player1.PONTOS} x ${player2.PONTOS} ${player2.NOME}`);
}

const getRandomBlock = async () => {
    let random = Math.random();
    let result;
    switch (true) {
        case (random < 0.33):
            result = "RETA";
            break;
        case (random < 0.66):
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }
    return result;
}

const logRollResult = async (characterName, block, diceResult, attribute) => {
    console.log(
        `${characterName} 🎲 rolou um dado de ${block} ${diceResult} + ${attribute} = ${
            diceResult + attribute
        }`
    );
}

const playRaceEngine = async (player1, player2) => {
    for (let round = 1; round <= 5; round++) {
        console.log(`🏁 Rodada ${round}`);

        // sortear bloco
        let block = await getRandomBlock();
        console.log(`Bloco: ${block}`);

        // rolar os dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "RETA") {
            totalTestSkill1 = diceResult1 + player1.VELOCIDADE;
            totalTestSkill2 = diceResult2 + player2.VELOCIDADE;

            await logRollResult(
                player1.NOME,
                "velocidade",
                diceResult1,
                player1.VELOCIDADE
            );

            await logRollResult(
                player2.NOME,
                "velocidade",
                diceResult2,
                player2.VELOCIDADE
            );
            await showPartialScore(player1, player2);

        }

        if (block === "CURVA") {
            totalTestSkill1 = diceResult1 + player1.MANOBRABILIDADE;
            totalTestSkill2 = diceResult2 + player2.MANOBRABILIDADE;

            await logRollResult(
                player1.NOME,
                "manobrabilidade",
                diceResult1,
                player1.MANOBRABILIDADE
            );

            await logRollResult(
                player2.NOME,
                "manobrabilidade",
                diceResult2,
                player2.MANOBRABILIDADE
            );
            await showPartialScore(player1, player2);
        }

        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + player1.PODER;
            let powerResult2 = diceResult2 + player2.PODER;

            const randomWeapon = Math.random();
            const selectedWeapon = randomWeapon < 0.5 ? weapon1 : weapon2;

            console.log(`Armas escolhidas: ${selectedWeapon.ICONE}`);

            console.log(`${player1.NOME} confrontou com ${player2.NOME}! 🥊`);

            await logRollResult(
                player1.NOME,
                "poder",
                diceResult1,
                player1.PODER
            );

            await logRollResult(
                player2.NOME,
                "poder",
                diceResult2,
                player2.PODER
            );

            let bonus = Math.random() > 0.5 ? 1 : 0;

            if (powerResult1 > powerResult2 && player2.PONTOS > 0) {
                console.log(
                    `${player1.NOME} lançou ${selectedWeapon.ICONE} em  ${player2.NOME}!!!`
                );
                console.log(
                    `${player1.NOME} venceu o confronto! ${player2.NOME} perdeu ${selectedWeapon.PODER} ponto(s)! 🐢`
                );
                console.log(`Bônus de ${bonus} ponto(s) para ${player1.NOME}!`);
                player1.PONTOS += bonus;
                player2.PONTOS -= selectedWeapon.PODER;
                player2.PONTOS = Math.max(player2.PONTOS, 0);
            }

            if (powerResult2 > powerResult1 && player1.PONTOS > 0) {
                console.log(
                    `${player2.NOME} lançou ${selectedWeapon.ICONE} em  ${player1.NOME}!!!`
                );
                console.log(
                    `${player2.NOME} venceu o confronto! ${player1.NOME} perdeu ${selectedWeapon.PODER} ponto(s)! 🐢`
                );
                console.log(`Bônus de ${bonus} ponto(s) para ${player2.NOME}!`);
                player2.PONTOS += bonus;
                player1.PONTOS -= selectedWeapon.PODER;
                player1.PONTOS = Math.max(player1.PONTOS, 0);
            }

            console.log(
                powerResult2 === powerResult1
                    ? "Confronto empatado! Nenhum ponto foi perdido"
                    : ""
            );
            await showPartialScore(player1, player2);
        }

        // verificando o vencedor
        if (totalTestSkill1 > totalTestSkill2) {
            console.log(`${player1.NOME} marcou um ponto!`);
            player1.PONTOS++;
        } else if (totalTestSkill2 > totalTestSkill1) {
            console.log(`${player2.NOME} marcou um ponto!`);
            player2.PONTOS++;
        }

        console.log("-----------------------------");
    }
}

const declareWinner = async (player1, player2) => {
    console.log("Resultado final:");
    console.log(`${player1.NOME}: ${player1.PONTOS} ponto(s)`);
    console.log(`${player2.NOME}: ${player2.PONTOS} ponto(s)`);

    if (player1.PONTOS > player2.PONTOS)
        console.log(`\n${player1.NOME} venceu a corrida! Parabéns! 🏆`);
    else if (player2.PONTOS > player1.PONTOS)
        console.log(`\n${player2.NOME} venceu a corrida! Parabéns! 🏆`);
    else console.log("A corrida terminou em empate");
}

(async function main() {
    console.log(
        `🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`
    );

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();