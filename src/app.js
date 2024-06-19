let positions = [];
let players = [];

// Mostrar mensaje en la interfaz
const showMessage = (message, isError = false) => {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = isError ? 'red' : 'white';
};

// Cargar posiciones desde un objeto embebido y agregar opciones a los selectores de posición
const loadPositions = () => {
    const positionsData = {
        "positions": [
            {"code": "ARQ", "name": "Arquero"},
            {"code": "LI", "name": "Lateral Izquierdo"},
            {"code": "LD", "name": "Lateral Derecho"},
            {"code": "DFC", "name": "Defensor Central"},
            {"code": "VDI", "name": "Volante Defensivo Izquierdo"},
            {"code": "VDD", "name": "Volante Defensivo Derecho"},
            {"code": "VDC", "name": "Volante Defensivo Central"},
            {"code": "VI", "name": "Volante Izquierdo"},
            {"code": "VD", "name": "Volante Derecho"},
            {"code": "VC", "name": "Volante Central"},
            {"code": "VOI", "name": "Volante Ofensivo Izquierdo"},
            {"code": "VOD", "name": "Volante Ofensivo Derecho"},
            {"code": "VOC", "name": "Volante Ofensivo Central"},
            {"code": "DI", "name": "Delantero Izquierdo"},
            {"code": "DD", "name": "Delantero Derecho"},
            {"code": "DC", "name": "Delantero Centro"}
        ]
    };

    positions = positionsData.positions.map(pos => pos.code);

    const positionSelect = document.getElementById('position');
    const newPositionSelect = document.getElementById('newPosition');

    positionsData.positions.forEach(position => {
        const option = document.createElement('option');
        option.value = position.code;
        option.textContent = position.name;
        positionSelect.appendChild(option);
        newPositionSelect.appendChild(option.cloneNode(true)); // Clonar para evitar errores de referencia
    });
};

// Guardar jugadores en localStorage
const savePlayersToLocalStorage = () => {
    localStorage.setItem('players', JSON.stringify(players));
};

// Cargar jugadores desde localStorage
const loadPlayersFromLocalStorage = () => {
    const storedPlayers = localStorage.getItem('players');
    if (storedPlayers) {
        players = JSON.parse(storedPlayers);
    }
};

// Agregar un nuevo jugador a la lista y guardarlo en localStorage
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
    savePlayersToLocalStorage(); // Guardar en localStorage después de agregar
    return newPlayer;
};

// Listar todos los jugadores
const listPlayers = async () => {
    return players;
};

// Cambiar la posición de un jugador y guardarlo en localStorage
const changePlayerPosition = async (id, newPosition) => {
    if (!positions.includes(newPosition)) {
        throw new Error('Posición inválida');
    }

    const playerIndex = players.findIndex(p => p.id === id);

    if (playerIndex === -1) {
        throw new Error('Jugador no encontrado');
    }

    players[playerIndex].position = newPosition;
    savePlayersToLocalStorage(); 
};

// Sustituir un jugador y guardar los cambios en localStorage
const substitutePlayer = async (idOut, idIn) => {
    const playerOutIndex = players.findIndex(p => p.id === idOut);
    const playerInIndex = players.findIndex(p => p.id === idIn);

    if (playerOutIndex === -1 || playerInIndex === -1) {
        throw new Error('Jugador no encontrado');
    }

    if (players[playerOutIndex].status !== 'titular' || players[playerInIndex].status !== 'suplente') {
        throw new Error('Cambio inválido');
    }

    // Intercambiar los estados de los jugadores
    [players[playerOutIndex].status, players[playerInIndex].status] = [players[playerInIndex].status, players[playerOutIndex].status];
    savePlayersToLocalStorage(); 
};

// Manejar el envío del formulario para agregar un nuevo jugador
document.getElementById('addPlayerForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const position = document.getElementById('position').value;

    try {
        const player = await addPlayer(name, age, position);
        showMessage('Jugador agregado: ' + player.name); // Mostrar mensaje de éxito
        loadPlayers();
    } catch (error) {
        showMessage('Error: ' + error.message, true); // Mostrar mensaje de error
    }
});

// Manejar el envío del formulario para cambiar la posición de un jugador
document.getElementById('changePositionForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const id = parseInt(document.getElementById('playerId').value);
    const newPosition = document.getElementById('newPosition').value;

    try {
        await changePlayerPosition(id, newPosition);
        showMessage('Posición cambiada'); // Mostrar mensaje de éxito
        loadPlayers();
    } catch (error) {
        showMessage('Error: ' + error.message, true); // Mostrar mensaje de error
    }
});

// Manejar el envío del formulario para sustituir un jugador
document.getElementById('substituteForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const idOut = parseInt(document.getElementById('playerOutId').value);
    const idIn = parseInt(document.getElementById('playerInId').value);

    try {
        await substitutePlayer(idOut, idIn);
        showMessage('Cambio realizado'); // Mostrar mensaje de éxito
        loadPlayers();
    } catch (error) {
        showMessage('Error: ' + error.message, true); // Mostrar mensaje de error
    }
});

// Cargar los jugadores y mostrarlos en las listas
const loadPlayers = async () => {
    try {
        const players = await listPlayers();
        const starterList = document.getElementById('starterList');
        const substituteList = document.getElementById('substituteList');
        starterList.innerHTML = '';
        substituteList.innerHTML = '';

        players.forEach(player => {
            const listItem = document.createElement('li');
            listItem.textContent = `ID: ${player.id}, ${player.name}, ${player.age} años, ${player.position}`;
            if (player.status === 'titular') {
                starterList.appendChild(listItem);
            } else {
                substituteList.appendChild(listItem);
            }
        });
    } catch (error) {
        showMessage('Error: ' + error.message, true); // Mostrar mensaje de error
    }
};

// Cargar posiciones y jugadores desde localStorage cuando la página se carga
window.onload = () => {
    loadPositions();
    loadPlayersFromLocalStorage();
    loadPlayers();
};
