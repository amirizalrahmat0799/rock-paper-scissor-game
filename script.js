// select custom data element
const selectionButtons = document.querySelectorAll('[data-selection]')
const finalColumn = document.querySelector('[data-final-column]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const yourScoreSpan = document.querySelector('[data-your-score]')

// select modal property
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.show-modal');
const whoWin = document.querySelector('.theWinner');


// array nested object for game property
const SELECTIONS = [
    {
        name: 'rock',
        emoji: '✊',
        beats: 'scissors'
    },
    {
        name: 'paper',
        emoji: '✋',
        beats: 'rock'
    },
    {
        name: 'scissors',
        emoji: '✌️',
        beats: 'paper'
    }
]

// game logic click event on button
selectionButtons.forEach(selectionButton =>{
    selectionButton.addEventListener('click', e => {
        const selectionName = selectionButton.dataset.selection
        const selection = SELECTIONS.find(selection => selection.name === selectionName)
        makeSelection(selection)
    })
})

// display selection and increment score to win game
function makeSelection(selection) {
    const computerSelection = randomSelection();
    const yourWinner = isWinner(selection, computerSelection)
    const computerWinner = isWinner(computerSelection, selection)

    addSelectionResult(computerSelection, computerWinner)
    addSelectionResult(selection, yourWinner)

    if (yourWinner) incrementScore(yourScoreSpan);
    if (computerWinner) incrementScore(computerScoreSpan);

    if(yourScoreSpan.innerText == 5 || computerScoreSpan.innerText == 5) {
        modal.classList.remove('hidden');
        overlay.classList.remove('hidden');
        if(yourWinner) whoWin.textContent = "You win ! 👨"
        if (computerWinner) whoWin.textContent = "Computer win! 🤖"
        btnCloseModal.addEventListener('click', e => {
            location.reload()
        });
        overlay.addEventListener('click', e => {
            location.reload()
        });
    }
}

// increment score on html element using int data type
function incrementScore(scoreSpan) {
    scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
}

// display selection and winner by div dynamically
function addSelectionResult(selection, winner){
    const div = document.createElement('div')
    div.innerText = selection.emoji
    div.classList.add('result-selection')
    if (winner) {
        div.classList.add('winner')
    }
    finalColumn.after(div)
}

// check to compare property selection
function isWinner(selection, opponentSelection) {
    return selection.beats === opponentSelection.name
}

// random selection for computer
function randomSelection() {
    const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
    return SELECTIONS[randomIndex]
}

function theWinner() {
    
}
