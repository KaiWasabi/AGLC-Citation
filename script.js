document.addEventListener('DOMContentLoaded', function () {
    // Initialize Flatpickr for date selection with Australian format
    flatpickr("#website-access-date, #newspaper-date, #conference-date", {
        dateFormat: "d/m/Y"
    });

    // Hide all citation fields initially
    function hideAllFields() {
        document.querySelectorAll('.citation-fields').forEach(function (field) {
            field.style.display = 'none';
        });
    }

    // Show only relevant fields based on the selected source type
    function showRelevantFields(sourceType) {
        hideAllFields();
        const selectedFields = document.getElementById(sourceType + '-fields');
        if (selectedFields) {
            selectedFields.style.display = 'block';
        }
    }

    // On source type change, show the relevant fields
    document.getElementById('source-type').addEventListener('change', function () {
        const selectedSourceType = this.value;
        showRelevantFields(selectedSourceType);
    });

    // Hide all fields on page load
    hideAllFields();

    // Function to toggle Pinpoint Fields
    function togglePinpoint(checkboxId, pinpointFieldsId) {
        const checkbox = document.getElementById(checkboxId);
        const pinpointFields = document.getElementById(pinpointFieldsId);
        checkbox.addEventListener('change', function () {
            pinpointFields.style.display = checkbox.checked ? 'block' : 'none';
        });
    }

    // Initialize Pinpoint Fields toggle
    togglePinpoint('case-domestic-pinpoint-toggle', 'case-domestic-pinpoint-fields');
    togglePinpoint('case-international-pinpoint-toggle', 'case-international-pinpoint-fields');
    togglePinpoint('book-pinpoint-toggle', 'book-pinpoint-fields');
    togglePinpoint('journal-pinpoint-toggle', 'journal-pinpoint-fields');
    togglePinpoint('legislation-pinpoint-toggle', 'legislation-pinpoint-fields');

    // Function to generate citations based on the selected source type and inputs
    window.generateCitation = function () {
        const sourceType = document.getElementById('source-type').value;
        let citation = '';

        if (sourceType === 'case-domestic') {
            // AGLC4 Rule 2: Case Name (Year) Volume Report Series Starting Page (Court)
            const caseName = document.getElementById('case-domestic-name').value.trim();
            const reportSeries = document.getElementById('case-domestic-report').value.trim();
            const year = document.getElementById('case-domestic-year').value.trim();
            const volume = document.getElementById('case-domestic-volume').value.trim();
            const startingPage = document.getElementById('case-domestic-page').value.trim();
            const court = document.getElementById('case-domestic-court').value.trim();
            const pinpointPage = document.getElementById('case-domestic-pinpoint-page').value.trim();
            const pinpointParagraph = document.getElementById('case-domestic-pinpoint-paragraph').value.trim();

            if (caseName && reportSeries && year && volume && startingPage) {
                citation = `<i>${caseName}</i> (${year}) ${volume} ${reportSeries} ${startingPage}`;
                if (document.getElementById('case-domestic-pinpoint-toggle').checked) {
                    if (pinpointPage) citation += `, ${pinpointPage}`;
                    if (pinpointParagraph) citation += ` [${pinpointParagraph}]`;
                }
                if (court) citation += ` (${court})`;
                citation += '.';
            }
        } else if (sourceType === 'case-international') {
            // AGLC4 Rule 2: Case Name (Year) Volume Report Series Starting Page (Court)
            const caseName = document.getElementById('case-international-name').value.trim();
            const reportSeries = document.getElementById('case-international-report').value.trim();
            const year = document.getElementById('case-international-year').value.trim();
            const volume = document.getElementById('case-international-volume').value.trim();
            const startingPage = document.getElementById('case-international-page').value.trim();
            const court = document.getElementById('case-international-court').value.trim();
            const pinpointPage = document.getElementById('case-international-pinpoint-page').value.trim();
            const pinpointParagraph = document.getElementById('case-international-pinpoint-paragraph').value.trim();

            if (caseName && reportSeries && year && court) {
                citation = `<i>${caseName}</i> (${year})`;
                if (volume) citation += ` ${volume}`;
                citation += ` ${reportSeries}`;
                if (startingPage) citation += ` ${startingPage}`;
                citation += ` (${court})`;
                if (document.getElementById('case-international-pinpoint-toggle').checked) {
                    if (pinpointPage) citation += `, ${pinpointPage}`;
                    if (pinpointParagraph) citation += ` [${pinpointParagraph}]`;
                }
                citation += '.';
            }
        } else if (sourceType === 'book') {
            // AGLC4 Rule 6: Author, Title (Publisher, Edition ed, Year) Pinpoint
            const author = document.getElementById('book-author').value.trim();
            const title = document.getElementById('book-title').value.trim();
            const edition = document.getElementById('book-edition').value.trim();
            const year = document.getElementById('book-year').value.trim();
            const publisher = document.getElementById('book-publisher').value.trim();
            const pinpointPage = document.getElementById('book-pinpoint-page').value.trim();

            if (author && title && year && publisher) {
                citation = `${author}, <i>${title}</i> (${publisher}, ${edition ? edition + ' ed, ' : ''}${year})`;
                if (document.getElementById('book-pinpoint-toggle').checked && pinpointPage) {
                    citation += ` ${pinpointPage}`;
                }
                citation += '.';
            }
        } else if (sourceType === 'journal') {
            // AGLC4 Rule 5: Author, 'Title' (Year) Volume Journal Starting Page
            const author = document.getElementById('journal-author').value.trim();
            const title = document.getElementById('journal-title').value.trim();
            const journalName = document.getElementById('journal-name').value.trim();
            const volume = document.getElementById('journal-volume').value.trim();
            const year = document.getElementById('journal-year').value.trim();
            const startingPage = document.getElementById('journal-page').value.trim();
            const pinpointPage = document.getElementById('journal-pinpoint-page').value.trim();

            if (author && title && journalName && volume && year && startingPage) {
                citation = `${author}, '${title}' (${year}) ${volume} <i>${journalName}</i> ${startingPage}`;
                if (document.getElementById('journal-pinpoint-toggle').checked && pinpointPage) {
                    citation += `, ${pinpointPage}`;
                }
                citation += '.';
            }
        } else if (sourceType === 'legislation') {
            // AGLC4 Rule 3.1: Title Year (Jurisdiction) — title in italics
            const title = document.getElementById('legislation-title').value.trim();
            const year = document.getElementById('legislation-year').value.trim();
            const jurisdiction = document.getElementById('legislation-jurisdiction').value.trim();
            const pinpointSection = document.getElementById('legislation-pinpoint-section').value.trim();
            const pinpointSubsection = document.getElementById('legislation-pinpoint-subsection').value.trim();

            if (title && year && jurisdiction) {
                citation = `<i>${title} ${year}</i> (${jurisdiction})`;
                if (document.getElementById('legislation-pinpoint-toggle').checked) {
                    if (pinpointSection) citation += ` s ${pinpointSection}`;
                    if (pinpointSubsection) citation += `(${pinpointSubsection})`;
                }
                citation += '.';
            }
        } else if (sourceType === 'website') {
            // AGLC4 Rule 7.15: Author, 'Document Title', Web Page Title (Document Type, Date) <URL>
            const author = document.getElementById('website-author').value.trim();
            const title = document.getElementById('website-title').value.trim();
            const websiteName = document.getElementById('website-name').value.trim();
            const docType = document.getElementById('website-doctype').value.trim();
            const accessDate = document.getElementById('website-access-date').value.trim();
            const url = document.getElementById('website-url').value.trim();

            if (title && websiteName && url && accessDate) {
                citation = `${author ? author + ', ' : ''}'${title}', <i>${websiteName}</i>`;
                citation += ` (${docType ? docType + ', ' : ''}${accessDate})`;
                citation += ` &lt;${url}&gt;.`;
            }
        } else if (sourceType === 'newspaper') {
            // AGLC4 Rule 7.11.1: Author, 'Title', Newspaper (Place, Date) Page
            const author = document.getElementById('newspaper-author').value.trim();
            const title = document.getElementById('newspaper-title').value.trim();
            const newspaperName = document.getElementById('newspaper-name').value.trim();
            const place = document.getElementById('newspaper-place').value.trim();
            const date = document.getElementById('newspaper-date').value.trim();
            const page = document.getElementById('newspaper-page').value.trim();

            if (title && newspaperName && place && date) {
                citation = `${author ? author + ', ' : ''}'${title}', <i>${newspaperName}</i> (${place}, ${date})`;
                if (page) citation += ` ${page}`;
                citation += '.';
            }
        } else if (sourceType === 'conference-paper') {
            // AGLC4 Rule 7.2.4: Author, 'Title' (Conference Paper, Forum, Date)
            const author = document.getElementById('conference-author').value.trim();
            const title = document.getElementById('conference-title').value.trim();
            const conferenceName = document.getElementById('conference-name').value.trim();
            const date = document.getElementById('conference-date').value.trim();

            if (author && title && conferenceName && date) {
                citation = `${author}, '${title}' (Conference Paper, ${conferenceName}, ${date}).`;
            }
        } else if (sourceType === 'thesis') {
            // AGLC4 Rule 7.2.5: Author, 'Title' (Thesis Type, University, Year)
            const author = document.getElementById('thesis-author').value.trim();
            const title = document.getElementById('thesis-title').value.trim();
            const type = document.getElementById('thesis-type').value.trim();
            const university = document.getElementById('thesis-university').value.trim();
            const year = document.getElementById('thesis-year').value.trim();

            if (author && title && type && university && year) {
                citation = `${author}, '${title}' (${type}, ${university}, ${year}).`;
            }
        } else if (sourceType === 'report') {
            // AGLC4 Rule 7.1: Author, Title (Document Type No Number, Date) Pinpoint
            const author = document.getElementById('report-author').value.trim();
            const title = document.getElementById('report-title').value.trim();
            const docType = document.getElementById('report-doctype').value.trim();
            const docNum = document.getElementById('report-docnum').value.trim();
            const date = document.getElementById('report-date').value.trim();
            const pinpoint = document.getElementById('report-pinpoint').value.trim();
            const url = document.getElementById('report-url').value.trim();

            if (title && docType && date) {
                citation = `${author ? author + ', ' : ''}<i>${title}</i> (${docType}${docNum ? ' ' + docNum : ''}, ${date})`;
                if (pinpoint) citation += ` ${pinpoint}`;
                if (url) citation += ` &lt;${url}&gt;`;
                citation += '.';
            }
        } else if (sourceType === 'encyclopedia') {
            // AGLC4 Rule 7.6: Dictionary Title (Edition ed, Year) 'Entry Title' (def Number)
            const name = document.getElementById('encyclopedia-name').value.trim();
            const edition = document.getElementById('encyclopedia-edition').value.trim();
            const year = document.getElementById('encyclopedia-year').value.trim();
            const title = document.getElementById('encyclopedia-title').value.trim();
            const def = document.getElementById('encyclopedia-def').value.trim();

            if (title && name && year) {
                citation = `<i>${name}</i> (${edition ? edition + ' ed, ' : ''}${year}) '${title}'`;
                if (def) citation += ` (def ${def})`;
                citation += '.';
            }
        }

        document.getElementById('generated-citation').innerHTML = citation;
    };

    // Save the generated citation
    window.saveCitation = function () {
        const citation = document.getElementById('generated-citation').innerHTML;
        if (citation && citation.trim() !== "") {
            let citations = JSON.parse(localStorage.getItem('citations')) || [];
            citations.push(citation); // Add a new citation

            localStorage.setItem('citations', JSON.stringify(citations));
            displaySavedCitations();
            clearForm(); // Clear form after saving
        } else {
            alert('Cannot save an empty citation.');
        }
    };

    function displaySavedCitations() {
        const citations = JSON.parse(localStorage.getItem('citations')) || [];
        const citationList = document.getElementById('citation-list');
        citationList.innerHTML = '';
    
        citations.forEach((citation, index) => {
            const li = document.createElement('li');
    
            const citationText = document.createElement('span');
            citationText.innerHTML = citation; // Use innerHTML to render HTML tags properly
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.className = 'delete-button';
            deleteButton.onclick = function () {
                deleteCitation(index);
            };
    
            li.appendChild(citationText);
            li.appendChild(deleteButton);
            citationList.appendChild(li);
        });
    }

    // Clear form fields after saving
    function clearForm() {
        document.getElementById('citation-form').reset();
        document.getElementById('generated-citation').innerHTML = '';
        hideAllFields();
    }

    // Delete a specific citation
    function deleteCitation(index) {
        let citations = JSON.parse(localStorage.getItem('citations')) || [];
        citations.splice(index, 1);
        localStorage.setItem('citations', JSON.stringify(citations));
        displaySavedCitations();
    }

    // Export saved citations as a .txt file
    window.exportCitations = function () {
        const citations = JSON.parse(localStorage.getItem('citations')) || [];
        if (citations.length > 0) {
            // Create plain text citations by removing HTML tags
            const plainTextCitations = citations.map(citation => {
                return citation
                    .replace(/<\/?i>/g, '')   // Remove <i> and </i>
                    .replace(/<\/?b>/g, '')   // Remove <b> and </b>
                    .replace(/<\/?u>/g, '')   // Remove <u> and </u>
                    .replace(/&lt;/g, '<')    // Decode < entities
                    .replace(/&gt;/g, '>')    // Decode > entities
                    .replace(/&amp;/g, '&');  // Decode & entities
            }).join('\n\n'); // Separate citations by double newlines
    
            const blob = new Blob([plainTextCitations], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'citations.txt';
            a.click();
        } else {
            alert('No citations to export.');
        }
    };
    

    // Clear saved citations
    window.clearCitations = function () {
        if (confirm('Are you sure you want to clear all saved citations?')) {
            localStorage.removeItem('citations');
            displaySavedCitations();
        }
    };

    // Generic modal close
    window.closeModal = function (modalId) {
        document.getElementById(modalId).style.display = 'none';
    };

    // Show disclaimer on first load (block usage until accepted)
    if (!localStorage.getItem('disclaimerAccepted')) {
        document.getElementById('disclaimer-modal').style.display = 'flex';
    } else {
        document.getElementById('disclaimer-modal').style.display = 'none';
    }

    document.getElementById('accept-disclaimer').addEventListener('click', function () {
        localStorage.setItem('disclaimerAccepted', 'true');
        document.getElementById('disclaimer-modal').style.display = 'none';
    });

    // Footer links to open modals
    document.getElementById('privacy-policy-link').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('privacy-policy-modal').style.display = 'flex';
    });

    document.getElementById('equity-statement-link').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('equity-statement-modal').style.display = 'flex';
    });

    document.getElementById('disclaimer-link').addEventListener('click', function (event) {
        event.preventDefault();
        document.getElementById('disclaimer-modal').style.display = 'flex';
    });

    // Display saved citations on page load
    displaySavedCitations();
});
