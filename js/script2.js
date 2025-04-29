//JAVASCRIPT FOR THE LOADING ANIMATION
document.getElementById('kidsButton').addEventListener('click', function() {
  const button = this;
  const spinner = document.getElementById('loadingSpinner');

  // Hide the original button after it is clicked
  button.style.visibility = 'hidden';

  // Show the loader
  spinner.style.display = 'block'; // Make the loader visible

  // Wait for a while (1 second) to simulate the loading process
  setTimeout(() => {
    // Redirect to the kids section page
    window.location.href = 'kids-section.html'; // Replace with your actual kids section URL
  }, 1000); // Adjust this timeout duration as needed
});


//JAVASCRIPT FOR THE SEARCH BAR
// Get elements
const searchBtn = document.getElementById("search-btn");
const searchBarContainer = document.getElementById("search-bar-container");

// Add event listener for the search button click
searchBtn.addEventListener("click", function() {
    // Toggle visibility of the search bar when the button or text is clicked
    if (searchBarContainer.style.display === "none" || searchBarContainer.style.display === "") {
        searchBarContainer.style.display = "inline-block";  // Show the search bar
    } else {
        searchBarContainer.style.display = "none";  // Hide the search bar
    }
});



