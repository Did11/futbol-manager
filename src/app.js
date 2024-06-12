const positions = ['delantero', 'centrocampista', 'defensa', 'arquero'];
let players = [];

const addPlayer = async (name, age, position) => {
    if (!positions.includes(position)) {
        throw new Error('Posición inválida');
    }

    const newPlayer = {
        id: players.length + 1,
        name,
        age,
        position,
        status: players.filter(p => p.status === 'titular').length < 11 ? 'titular' : 'suplente'
    };

    players.push(newPlayer);
    return newPlayer;
};

const listPlayers = async () => {
    return players;
};

const changePlayerPosition = async (id, newPosition) => {
    if (!positions.includes(newPosition)) {
        throw new Error('Posición inválida');
    }

    const playerIndex = players.findIndex(p => p.id === id);

    if (playerIndex === -1) {
        throw new Error('Jugador no encontrado');
    }

    players[playerIndex].position = newPosition;
};

const substitutePlayer = async (idOut, idIn) => {
    const playerOutIndex = players.findIndex(p => p.id === idOut);
    const playerInIndex = players.findIndex(p => p.id === idIn);

    if (playerOutIndex === -1 || playerInIndex === -1) {
        throw new Error('Jugador no encontrado');
    }

    if (players[playerOutIndex].status !== 'titular' || players[playerInIndex].status !== 'suplente') {
        throw new Error('Cambio inválido');
    }

    [players[playerOutIndex].status, players[playerInIndex].status] = [players[playerInIndex].status, players[playerOutIndex].status];
};

document.getElementById('addPlayerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;

    try {
        const player = await addPlayer(name, age, position);
        console.log('Jugador agregado:', player);
        loadPlayers();
    } catch (error) {
        console.error('Error:', error.message);
    }
});

document.getElementById('changePositionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = parseInt(document.getElementById('playerId').value);
    const newPosition = document.getElementById('newPosition').value;

    try {
        await changePlayerPosition(id, newPosition);
        console.log('Posición cambiada');
        loadPlayers();
    } catch (error) {
        console.error('Error:', error.message);
    }
});

document.getElementById('substituteForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const idOut = parseInt(document.getElementById('playerOutId').value);
    const idIn = parseInt(document.getElementById('playerInId').value);

    try {
        await substitutePlayer(idOut, idIn);
        console.log('Cambio realizado');
        loadPlayers();
    } catch (error) {
        console.error('Error:', error.message);
    }
});

const loadPlayers = async () => {
    try {
        const players = await listPlayers();
        const starterList = document.getElementById('starterList');
        const substituteList = document.getElementById('substituteList');
        starterList.innerHTML = '';
        substituteList.innerHTML = '';

        players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${player.id}, ${player.name}, ${player.age} años, ${player.position}, ${player.status}`;
            if (player.status === 'titular') {
                starterList.appendChild(listItem);
            } else {
                substituteList.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Error:', error.message);
    }
};

window.onload = loadPlayers;
