document.addEventListener('DOMContentLoaded', function() {
    // Add/Remove Question Functionality
    window.addQuestion = function() {
        const questionSection = document.getElementById('question-section');
        const newQuestion = document.createElement('div');
        newQuestion.classList.add('question-container');
        newQuestion.innerHTML = `
            <input type="text" class="question-title" placeholder="Untitled Question">
            <div class="options">
                <div class="option">
                    <input type="radio" name="option">
                    <input type="text" class="option-text" placeholder="Option 1">
                    <button onclick="removeOption(this)">Remove</button>
                </div>
                <div class="add-option">
                    <button onclick="addOption(this)">Add option</button> or
                    <button onclick="addOther(this)">Add "Other"</button>
                </div>
            </div>
            <!-- Question Type Dropdown -->
            <div class="question-type-dropdown">
                <select onchange="changeQuestionType(this)">
                    <option value="multiple-choice">Multiple Choice</option>
                    <option value="paragraph">Paragraph</option>
                    <option value="short-answer">Short Answer</option>
                    <option value="checkboxes">Checkboxes</option>
                    <option value="dropdown">Dropdown</option>
                    <option value="date">Date</option>
                    <option value="time">Time</option>
                </select>
            </div>
            <!-- Text Formatting Options -->
            <div class="text-formatting">
                <button onclick="formatText('bold')">B</button>
                <button onclick="formatText('underline')">U</button>
                <!-- Add more formatting options as needed -->
            </div>
        `;
        questionSection.appendChild(newQuestion);
        saveState(); // Save state after adding a question
        updateToolbarPosition(); // Update toolbar position
    };

    window.removeQuestion = function(button) {
        button.closest('.question-container').remove();
        saveState(); // Save state after removing a question
        updateToolbarPosition(); // Update toolbar position
    };

    // Add option function
    window.addOption = function(button) {
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('option');
        optionContainer.innerHTML = `
            <input type="radio" name="option">
            <input type="text" class="option-text" placeholder="Option">
            <button onclick="removeOption(this)">Remove</button>
        `;
        button.closest('.options').insertBefore(optionContainer, button.closest('.add-option'));
        saveState(); // Save state after adding an option
    };
    

    // Add "Other" option function
    window.addOther = function(button) {
        const optionContainer = document.createElement('div');
        optionContainer.classList.add('option');
        optionContainer.innerHTML = `
            <input type="radio" name="option">
            <input type="text" class="option-text" placeholder="Other">
            <button onclick="removeOption(this)">Remove</button>
        `;
        button.closest('.options').insertBefore(optionContainer, button.closest('.add-option'));
        saveState(); // Save state after adding "Other" option
    };

    // Remove option function
    window.removeOption = function(button) {
        button.closest('.option').remove();
        saveState(); // Save state after removing an option
    };

    // Initial setup: Ensure the add option functionality works for the first question
    const addOptionButtons = document.querySelectorAll('.add-option button');
    addOptionButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            if (button.textContent === 'Add option') {
                addOption(button);
            } else if (button.textContent === 'Add "Other"') {
                addOther(button);
            }
        });
    });

    // Function to toggle dark mode
    window.toggleDarkMode = function() {
        document.body.classList.toggle('dark-mode');
        saveState(); // Save state after toggling dark mode
    };

    // Function to print the form
    window.printForm = function() {
        const formContent = document.querySelector('.form-container').innerHTML;
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`<html><head><title>Print Form</title></head><body>${formContent}</body></html>`);
        printWindow.document.close();
        printWindow.print();
    };

    // Function to download the form as a PDF
    window.downloadPDF = function() {
        const element = document.querySelector('.form-container');
        html2pdf().from(element).save('form.pdf');
    };

    // Dropdown functionality
    document.querySelector('.dropdown-icon').addEventListener('click', function() {
        const dropdownContent = this.nextElementSibling;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    window.addEventListener('click', function(event) {
        if (!event.target.matches('.dropdown-icon')) {
            const dropdowns = document.querySelectorAll('.dropdown-content');
            dropdowns.forEach(function(dropdown) {
                dropdown.style.display = 'none';
            });
        }
    });

    // Undo/Redo functionality
    let actionHistory = [];
    let redoHistory = [];

    function saveState() {
        const state = document.querySelector('.form-container').innerHTML;
        actionHistory.push(state);
        redoHistory = []; // Clear redo history after a new action
    }

    window.undoAction = function() {
        if (actionHistory.length > 1) {
            redoHistory.push(actionHistory.pop());
            document.querySelector('.form-container').innerHTML = actionHistory[actionHistory.length - 1];
        }
    };

    window.redoAction = function() {
        if (redoHistory.length > 0) {
            const nextState = redoHistory.pop();
            actionHistory.push(nextState);
            document.querySelector('.form-container').innerHTML = nextState;
        }
    };

    // Save initial state
    saveState();

    // Submit Button with Alert and Page Refresh
    window.submitForm = function() {
        alert('Form is submitted');
        location.reload();
    };

    // Function to change question type
    window.changeQuestionType = function(select) {
        const questionContainer = select.closest('.question-container');
        const optionsContainer = questionContainer.querySelector('.options');
        optionsContainer.innerHTML = '';

        switch (select.value) {
            case 'multiple-choice':
                optionsContainer.innerHTML = `
                    <div class="option">
                        <input type="radio" name="option">
                        <input type="text" class="option-text" placeholder="Option 1">
                        <button onclick="removeOption(this)">Remove</button>
                    </div>
                    <div class="add-option">
                        <button onclick="addOption(this)">Add option</button> or
                        <button onclick="addOther(this)">Add "Other"</button>
                    </div>
                `;
                break;
            case 'paragraph':
                optionsContainer.innerHTML = `
                    <textarea class="option-text" placeholder="Paragraph"></textarea>
                `;
                break;
            case 'short-answer':
                optionsContainer.innerHTML = `
                    <input type="text" class="option-text" placeholder="Short answer">
                `;
                break;
            case 'checkboxes':
                optionsContainer.innerHTML = `
                    <div class="option">
                        <input type="checkbox" name="option">
                        <input type="text" class="option-text" placeholder="Option 1">
                        <button onclick="removeOption(this)">Remove</button>
                    </div>
                    <div class="add-option">
                        <button onclick="addOption(this)">Add option</button> or
                        <button onclick="addOther(this)">Add "Other"</button>
                    </div>
                `;
                break;
            case 'dropdown':
                optionsContainer.innerHTML = `
                    <select class="option-text">
                        <option>Option 1</option>
                    </select>
                    <div class="add-option">
                        <button onclick="addDropdownOption(this)">Add option</button>
                    </div>
                `;
                break;
            case 'date':
                optionsContainer.innerHTML = `
                    <input type="date" class="option-text">
                `;
                break;
            case 'time':
                optionsContainer.innerHTML = `
                    <input type="time" class="option-text">
                `;
                break;
            default:
                break;
        }
        saveState(); // Save state after changing question type
    };

    window.addDropdownOption = function(button) {
        const select = button.closest('.options').querySelector('select');
        const option = document.createElement('option');
        option.textContent = `Option ${select.options.length + 1}`;
        select.appendChild(option);
        saveState(); // Save state after adding a dropdown option
    };

   // Function to format text
window.formatText = function(command) {
    document.execCommand(command, false, null);
    saveState(); // Save state after formatting text
};

    // Function to preview the form
    window.previewForm = function() {
        const formContent = document.querySelector('.form-container').innerHTML;
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`<html><head><title>Preview Form</title></head><body>${formContent}</body></html>`);
        previewWindow.document.close();
    };

        // Update toolbar position
    function updateToolbarPosition() {
        const toolbar = document.querySelector('.toolbar');
        toolbar.style.top = document.body.scrollHeight + 'px';
    }

    // Function to create a new section
    window.addSection = function() {
        const questionSection = document.getElementById('question-section');
        const newSection = document.createElement('div');
        newSection.classList.add('section-container');
        newSection.innerHTML = `
            <div class="section-header">
                <input type="text" class="section-title" placeholder="Section Title">
                <textarea class="section-description" placeholder="Section Description"></textarea>
            </div>
            <div class="spacer"></div>
        `;
        questionSection.appendChild(newSection);
        saveState(); // Save state after adding a section
        updateToolbarPosition(); // Update toolbar position
    };

    // CSS for dark mode
    document.head.insertAdjacentHTML('beforeend', `
    <style>
        .dark-mode {
            background-color: #333;
            color: #fff;
        }
        .dark-mode .form-container {
            background-color: #444;
        }
        .dark-mode input, .dark-mode textarea {
            background-color: #555;
            color: #fff;
        }
    </style>
    `);

    // Save initial state
    saveState();
});
