document.addEventListener('DOMContentLoaded', () => {
    const bulletinBoard = document.getElementById('bulletin-board');
    if (bulletinBoard) {
        // Scroll to the rightmost position
        bulletinBoard.scrollLeft = bulletinBoard.scrollWidth;
    }
});
