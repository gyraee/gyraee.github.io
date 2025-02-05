const frame = document.querySelector("iframe");
const div = document.querySelector(".center-container");
const input = document.querySelector("input");

// Hide the iframe initially
frame.style.display = "none";

// Handle Enter key press in input field
input.addEventListener("keyup", function (event) {
    if (event.key === "Enter" && input.value.trim()) {
        performSearch(input.value);
    }
});

// Handle query parameters on page load
const params = new URLSearchParams(window.location.search);
const query = params.get("q");
if (query) {
    performSearch(query);
}

// Function to determine if input is a URL or a search query
function search(input) {
    try {
        return new URL(input).toString(); // Valid full URL
    } catch (err) {
        try {
            const url = new URL(`http://${input}`);
            if (url.hostname.includes(".")) return url.toString(); // Valid domain with TLD
        } catch (err) {}
    }
    // Fallback to a Google search query
    return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
}

// Function to update UI and perform the search
function performSearch(query) {
    div.style.display = "none";
    frame.style.display = "block";
    frame.src = __uv$config.prefix + __uv$config.encodeUrl(search(query));
}
