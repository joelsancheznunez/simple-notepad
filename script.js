const formInputs = ['notes'];

function saveFormData() {
    formInputs.forEach(id => {
        localStorage.setItem(id, document.getElementById(id).value);
    });
}

function loadFormData() {
    formInputs.forEach(id => {
        const value = localStorage.getItem(id);
        if (value) document.getElementById(id).value = value;
    });
}

function copyNotes() {
    var notes = document.getElementById('notes').value;

    var textToCopy = `${notes}`;

    navigator.clipboard.writeText(textToCopy).then(function() {
        showCopyDialog();
    }, function(err) {
        console.error('Failed to copy information: ', err);
        alert('Failed to copy information. Please try again.');
    });
}

function showCopyDialog() {
    var copyDialog = document.getElementById('copyDialog');
    copyDialog.style.display = 'block';

    setTimeout(() => {
        copyDialog.style.display = 'none';
    }, 1000);
}

function hideCopyDialog() {
    document.getElementById('copyDialog').style.display = 'none';
}

function showConfirmDialog() {
    document.getElementById('confirmDialog').style.display = 'block';
}

function hideConfirmDialog() {
    document.getElementById('confirmDialog').style.display = 'none';
}

function clearForm() {
    document.getElementById("noteForm").reset();
    formInputs.forEach(id => localStorage.removeItem(id));
    hideConfirmDialog();
}

window.onload = function() {
    loadFormData();
    
    document.getElementById('noteForm').addEventListener('submit', function(event) {
        event.preventDefault();
    });

    formInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', saveFormData);
    });

    document.getElementById('copyButton').addEventListener('click', copyNotes);
};
