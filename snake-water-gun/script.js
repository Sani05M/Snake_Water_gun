 let gameState = {
            mode: 'computer',
            rounds: 3,
            currentRound: 0,
            playerScore: 0,
            opponentScore: 0,
            gameOver: false
        };

        const moves = ['snake', 'water', 'gun'];
        const moveEmojis = { snake: '🐍', water: '💧', gun: '🔫' };

        // Initialize game
        document.addEventListener('DOMContentLoaded', function() {
            setupEventListeners();
            updateUI();
        });

        function setupEventListeners() {
            // Mode selector
            document.querySelectorAll('[data-mode]').forEach(btn => {
                btn.addEventListener('click', function() {
                    gameState.mode = this.dataset.mode;
                    updateModeButtons();
                    updateUI();
                });
            });

            // Round selector
            document.querySelectorAll('[data-rounds]').forEach(btn => {
                btn.addEventListener('click', function() {
                    gameState.rounds = parseInt(this.dataset.rounds);
                    updateRoundButtons();
                    updateUI();
                });
            });
        }

        function updateModeButtons() {
            document.querySelectorAll('[data-mode]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.mode === gameState.mode);
            });
        }

        function updateRoundButtons() {
            document.querySelectorAll('[data-rounds]').forEach(btn => {
                btn.classList.toggle('active', parseInt(btn.dataset.rounds) === gameState.rounds);
            });
        }

        function updateUI() {
            document.getElementById('opponent-label').textContent = gameState.mode === 'computer' ? 'Computer' : 'Friend';
            document.getElementById('current-round').textContent = gameState.currentRound;
            document.getElementById('total-rounds').textContent = gameState.rounds;
            document.getElementById('player-score').textContent = gameState.playerScore;
            document.getElementById('opponent-score').textContent = gameState.opponentScore;
        }

        function playerMove(move) {
            if (gameState.gameOver) return;

            let opponentMove;
            if (gameState.mode === 'computer') {
                opponentMove = moves[Math.floor(Math.random() * 3)];
            } else {
                // In friend mode, we'd need a way to get the second player's move
                // For now, let's use random for demonstration
                opponentMove = moves[Math.floor(Math.random() * 3)];
            }

            gameState.currentRound++;
            const result = determineWinner(move, opponentMove);
            
            if (result === 'player') {
                gameState.playerScore++;
            } else if (result === 'opponent') {
                gameState.opponentScore++;
            }

            showResult(move, opponentMove, result);
            updateScoreboard();
            updateUI();

            if (gameState.currentRound >= gameState.rounds) {
                gameState.gameOver = true;
            }
        }

        function determineWinner(playerMove, opponentMove) {
            if (playerMove === opponentMove) return 'draw';
            
            const winConditions = {
                snake: 'water',
                water: 'gun',
                gun: 'snake'
            };

            return winConditions[playerMove] === opponentMove ? 'player' : 'opponent';
        }

        function showResult(playerMove, opponentMove, result) {
            const banner = document.getElementById('result-banner');
            const resultText = document.getElementById('result-text');
            const resultMoves = document.getElementById('result-moves');
            const nextButton = document.getElementById('next-button');

            banner.classList.remove('hidden', 'winner', 'draw');

            if (result === 'player') {
                resultText.textContent = 'You win this round!';
                banner.classList.add('winner');
            } else if (result === 'opponent') {
                const opponentName = gameState.mode === 'computer' ? 'Computer' : 'Friend';
                resultText.textContent = `${opponentName} wins this round!`;
                banner.classList.add('winner');
            } else {
                resultText.textContent = "It's a draw!";
                banner.classList.add('draw');
            }

            resultMoves.innerHTML = `
                ${moveEmojis[playerMove]} You &nbsp;&nbsp;&nbsp; ${moveEmojis[opponentMove]} ${gameState.mode === 'computer' ? 'Computer' : 'Friend'}
            `;

            // Update button text for final round
            if (gameState.currentRound >= gameState.rounds) {
                nextButton.textContent = 'Result';
                nextButton.onclick = showFinalResult;
            } else {
                nextButton.textContent = 'Next round';
                nextButton.onclick = nextRound;
            }
        }

        function updateScoreboard() {
            const playerScoreEl = document.getElementById('player-score');
            const opponentScoreEl = document.getElementById('opponent-score');
            
            // Animate score updates
            playerScoreEl.classList.add('updated');
            opponentScoreEl.classList.add('updated');
            
            setTimeout(() => {
                playerScoreEl.classList.remove('updated');
                opponentScoreEl.classList.remove('updated');
            }, 500);
        }

        function nextRound() {
            document.getElementById('result-banner').classList.add('hidden');
        }

        function showFinalResult() {
            document.getElementById('result-banner').classList.add('hidden');
            const finalBanner = document.getElementById('final-banner');
            const finalText = document.getElementById('final-text');

            if (gameState.playerScore > gameState.opponentScore) {
                finalText.textContent = '🎉 You are the champion! 🎉';
            } else if (gameState.opponentScore > gameState.playerScore) {
                const opponentName = gameState.mode === 'computer' ? 'Computer' : 'Friend';
                finalText.textContent = `🏆 ${opponentName} wins the game! 🏆`;
            } else {
                finalText.textContent = '🤝 It\'s a tie game! 🤝';
            }

            finalBanner.classList.remove('hidden');
        }

        function resetGame() {
            gameState = {
                mode: gameState.mode,
                rounds: gameState.rounds,
                currentRound: 0,
                playerScore: 0,
                opponentScore: 0,
                gameOver: false
            };

            document.getElementById('result-banner').classList.add('hidden');
            document.getElementById('final-banner').classList.add('hidden');
            
            updateUI();
        }