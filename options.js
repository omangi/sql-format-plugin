// Saves options to chrome.storage
function save_options() {
    console.log('clicked ... ' + save_options)
    //light or dark
    var selectedTheme = document.querySelector('.input-theme:checked').value;

    chrome.storage.sync.set({
        theme: selectedTheme,
    }, function() {
        // Update status to let user know options were saved.
        const spanClass = 'save-' + selectedTheme;
        var status = document.getElementById(spanClass);
        status.textContent = '(SAVED!)';

        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// stored in chrome.storage.
function restore_options() {
    // Use default theme = 'light'
    chrome.storage.sync.get({
        theme: 'light',
    }, function(items) {
        const inputId = 'radio-' + items.theme;
        document.getElementById(inputId).value = items.theme;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save-light').addEventListener('click', save_options);
document.getElementById('save-dark').addEventListener('click', save_options);
