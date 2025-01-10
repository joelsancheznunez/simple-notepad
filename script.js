const formInputs = ['notes1', 'notes2'];
let currentTextareaId = '';

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

function copyNotes(textareaId) {
    var notes = document.getElementById(textareaId).value;

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

function showConfirmDialog(textareaId) {
    currentTextareaId = textareaId;
    var confirmDialog = document.getElementById('confirmDialog');
    confirmDialog.style.display = 'block';
}

function hideConfirmDialog() {
    document.getElementById('confirmDialog').style.display = 'none';
}

function clearForm() {
    document.getElementById(currentTextareaId).value = '';
    localStorage.removeItem(currentTextareaId);
    hideConfirmDialog();
}

window.onload = function() {
    loadFormData();
    
    formInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', saveFormData);
    });

    document.getElementById('copyButton1').addEventListener('click', function() {
        copyNotes('notes1');
    });

    document.getElementById('clearButton1').addEventListener('click', function() {
        showConfirmDialog('notes1');
    });

    document.getElementById('copyButton2').addEventListener('click', function() {
        copyNotes('notes2');
    });

    document.getElementById('clearButton2').addEventListener('click', function() {
        showConfirmDialog('notes2');
    });

    document.getElementById('confirmYes').addEventListener('click', clearForm);
};