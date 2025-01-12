// Function to show the selected section
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none'; // Hide all sections
    });

    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block'; // Show the selected section
    }
}

// Default to displaying the "Home" section on page load
document.addEventListener('DOMContentLoaded', function () {
    showSection('home'); // Show Home section by default
});
