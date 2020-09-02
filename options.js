// Saves options to chrome.storage
function save_options() {
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
    //out of chrome this not work .... ¬¬
    let theme;

    try {
        // Use default theme = 'light'
        chrome.storage.sync.get({
            theme: 'light',
        }, function (items) {
            console.log('Saved theme is ....', items)
            theme = items.theme;
            const selector = '#radio-' + theme;
            e = document.querySelector(selector);
            e.checked = 1;
        });
    } catch (e) {
        theme = 'light';
    }
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);