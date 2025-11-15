document.addEventListener('DOMContentLoaded', () => {
    // Logic for index.html
    if (document.body.id === 'index-page') {
        const giftBox = document.getElementById('giftBox');
        const nameModal = document.getElementById('nameModal');
        const closeButton = nameModal.querySelector('.close-button');
        const userNameInput = document.getElementById('userNameInput');
        const continueButton = document.getElementById('continueButton');
        const container = document.querySelector('.container');
        const floatingGifsContainer = document.getElementById('floatingGifsContainer');

        let isGiftOpened = false;
        let userName = '';

        const floatingGifs = [
            'https://media.giphy.com/media/26tPplGWjN0xLybiU/giphy.gif',
            'https://media.giphy.com/media/3oEjI5b9gkSuWZgEMS/giphy.gif'
        ];

        // Initial setup for gift box click
        giftBox.addEventListener('click', (e) => {
            if (isGiftOpened) return;

            isGiftOpened = true;
            giftBox.classList.add('zoom-in');
            createBurst(e.clientX, e.clientY, ['💖', '✨', '🎉']); // Confetti/emoji burst

            setTimeout(() => {
                giftBox.classList.add('open');
                container.classList.add('blurred');
                displayFloatingGifs(10, floatingGifs); // Display floating GIFs

                setTimeout(() => {
                    nameModal.style.display = 'flex';
                    setTimeout(() => nameModal.classList.add('show'), 10);
                }, 500);
            }, 500);
        });

        // Close modal button
        closeButton.addEventListener('click', () => {
            nameModal.classList.remove('show');
            setTimeout(() => {
                nameModal.style.display = 'none';
                container.classList.remove('blurred');
                giftBox.classList.remove('open', 'zoom-in');
                isGiftOpened = false;
                hideFloatingGifs(); // Hide floating GIFs
            }, 300);
        });

        // Continue button in name modal
        continueButton.addEventListener('click', (e) => {
            let rawUserName = userNameInput.value.trim();
            if (rawUserName) {
                userName = rawUserName.charAt(0).toUpperCase() + rawUserName.slice(1); // Capitalize first letter
                localStorage.setItem('userName', userName);
                window.location.href = 'surprise.html'; // Redirect to the new page
            } else {
                alert('Please enter your name!');
            }
        });

        // Floating GIFs after gift box opens
        function displayFloatingGifs(count, gifUrls) {
            floatingGifsContainer.innerHTML = ''; // Clear previous GIFs
            floatingGifsContainer.classList.add('show');
            for (let i = 0; i < count; i++) {
                const gifElement = document.createElement('img');
                gifElement.classList.add('floating-gif');
                gifElement.src = gifUrls[Math.floor(Math.random() * gifUrls.length)];
                gifElement.style.left = `${Math.random() * 100}%`;
                gifElement.style.animationDuration = `${Math.random() * 5 + 3}s`; // 3-8 seconds
                gifElement.style.animationDelay = `${Math.random() * 2}s`;
                floatingGifsContainer.appendChild(gifElement);

                gifElement.addEventListener('animationend', () => {
                    gifElement.remove();
                });
            }
        }

        function hideFloatingGifs() {
            floatingGifsContainer.classList.remove('show');
            floatingGifsContainer.innerHTML = ''; // Clear GIFs
        }

        // Confetti/Emoji Burst
        function createBurst(x, y, emojis) {
            const burstContainer = document.createElement('div');
            burstContainer.style.position = 'fixed';
            burstContainer.style.top = `${y}px`;
            burstContainer.style.left = `${x}px`;
            burstContainer.style.pointerEvents = 'none';
            burstContainer.style.zIndex = '9999';
            document.body.appendChild(burstContainer);

            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('span');
                particle.classList.add('burst-particle');
                particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
                
                const angle = Math.random() * Math.PI * 2;
                const distance = Math.random() * 100 + 50; // 50 to 150px
                const burstX = Math.cos(angle) * distance;
                const burstY = Math.sin(angle) * distance;

                particle.style.setProperty('--burst-x', `${burstX}px`);
                particle.style.setProperty('--burst-y', `${burstY}px`);
                
                burstContainer.appendChild(particle);
            }

            setTimeout(() => {
                burstContainer.remove();
            }, 1000); // Remove burst container after animation
        }
    }

});