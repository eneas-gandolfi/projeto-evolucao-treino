document.addEventListener('DOMContentLoaded', () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('service-worker.js').catch(error => {
            console.warn('Service worker registration failed:', error);
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once visible
                // obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const workoutDays = document.querySelectorAll('.workout-day');
    workoutDays.forEach(day => observer.observe(day));

    const filterBtns = document.querySelectorAll('.day-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');

            workoutDays.forEach(day => {
                day.classList.remove('visible');
                
                if (targetId === 'all') {
                    day.style.display = 'grid';
                    setTimeout(() => day.classList.add('visible'), 50);
                } else {
                    if (day.id === targetId) {
                        day.style.display = 'grid';
                        setTimeout(() => day.classList.add('visible'), 50);
                    } else {
                        day.style.display = 'none';
                    }
                }
            });
        });
    });

    setTimeout(() => {
        workoutDays.forEach((day, index) => {
            if (index < 2) day.classList.add('visible');
        });
    }, 300);

    const modal = document.createElement('div');
    modal.className = 'exercise-modal';
    modal.setAttribute('aria-hidden', 'true');
    modal.innerHTML = `
        <div class="exercise-modal__backdrop" data-close-modal></div>
        <section class="exercise-modal__panel" role="dialog" aria-modal="true" aria-labelledby="exercise-modal-title">
            <button class="exercise-modal__close" type="button" aria-label="Fechar" data-close-modal>X</button>
            <div class="exercise-modal__header">
                <h2 id="exercise-modal-title"></h2>
                <span class="exercise-modal__sets"></span>
            </div>
            <div class="exercise-modal__images"></div>
        </section>
    `;
    document.body.appendChild(modal);

    const modalTitle = modal.querySelector('#exercise-modal-title');
    const modalSets = modal.querySelector('.exercise-modal__sets');
    const modalImages = modal.querySelector('.exercise-modal__images');
    const closeModalButton = modal.querySelector('.exercise-modal__close');

    const closeExerciseModal = () => {
        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
    };

    const openExerciseModal = (item) => {
        const name = item.querySelector('.exercise-name')?.textContent.trim() || 'Exercício';
        const sets = item.querySelector('.exercise-sets')?.textContent.trim() || '';
        const frames = Array.from(item.querySelectorAll('.exercise-illustration img'))
            .map(img => img.getAttribute('src'))
            .filter(Boolean);

        if (!frames.length) return;

        modalTitle.textContent = name;
        modalSets.textContent = sets;
        modalImages.innerHTML = '';

        frames.forEach((src, index) => {
            const figure = document.createElement('figure');
            figure.className = 'exercise-modal__figure';

            const img = document.createElement('img');
            img.src = src;
            img.alt = `${name} - imagem ${index + 1}`;

            figure.appendChild(img);
            modalImages.appendChild(figure);
        });

        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');

        if (!window.matchMedia('(pointer: coarse)').matches) {
            closeModalButton.focus();
        }
    };

    document.querySelectorAll('.exercise-item.has-illustration').forEach(item => {
        item.tabIndex = 0;
        item.setAttribute('role', 'button');
        item.setAttribute('aria-label', `Ver ilustração maior de ${item.querySelector('.exercise-name')?.textContent.trim() || 'exercício'}`);

        item.addEventListener('click', () => openExerciseModal(item));
        item.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                openExerciseModal(item);
            }
        });
    });

    modal.addEventListener('click', (event) => {
        if (event.target.matches('[data-close-modal]')) {
            closeExerciseModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.classList.contains('is-open')) {
            closeExerciseModal();
        }
    });
});
