window.addEventListener("load", function() {

    // global variables ~~~~~~~~~~~~~~~~~~~~~~~~~
    let saveNoteButton = $('.save-button');
    let createNoteButton = $('.create-button');
    let userID = $('.hiddenUserID').text();
    let notesArray = [];
    let currentNoteSelected = 0;
    let lrgTrashSvg = $('.lg-trash-svg');
    let firstLoadComplete = false;
    let justDeleted = false; // added this to fix the bug where deleting a note and typing in the empty fields would write over the most recent note
    let popupActive = false; // will determine if popup is active or not

    // on page load code ~~~~~~~~~~~~~~~~~~~~~~~~~

    retrieveNotes(userID);

    // functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // THIS IS TO BE USED WHEN RETRIEVING FROM DATABASE
    function stringfromcode(str) { 
        let newStr = "";
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            if (char.toLowerCase() !== char.toUpperCase() || char === " ") { // if char is alphabet add to newStr
                newStr += char;
            } else {
                if (char === '!') { // if char is & - it is an ascii code
                    let charp3 = str[i+3]; // double digit number check
                    let charp4 = str[i+4]; // triple digit number check
                    if (charp3 === ';') { // convert double digit to char and add to newStr
                        let sub = str.substring(i+1, i+3);
                        newStr += String.fromCharCode(sub);
                    } else if (charp4 === ';') { // convert triple digit to char and add to newStr
                        let sub = str.substring(i+1, i+4);
                        newStr += String.fromCharCode(sub);
                    }
                }
            } if (isNumber(char)) { // if char is a number
                // check if char is surrounded by &; (this is to differentiate a regular number from an ascii code)
                if (str[i+1] === ';' || str[i+2] === ';' || str[i+3] === ';') {
                    // do nothing
                } else {
                    newStr += char;
                }
            }
        }
        return newStr; // return the string with ascii codes converted to char
    }

    // FUNCTION TO CONVERT SPECIAL TO ASCII
    const specialToASCII = str => {
        let res = '';
        for(let i = 0; i < str.length; i++){
            if(+str[i] || str[i].toLowerCase() !== str[i].toUpperCase() || str[i] === ' '){
                res += str[i];
                continue;
            };
            res += "!" + str[i].charCodeAt(0) + ";";
        };
        return res;
        };

    // FUNCTION TO CHECK IF CHAR IS A NUMBER
    function isNumber(char) {
        if (typeof char !== 'string') {
            return false;
        }
        
        if (char.trim() === '') {
            return false;
        }
        
        return !isNaN(char);
    }

    function itemToHtml(item) {
        let noteID = item[0];
        let noteTitle = item[1];
        let noteBody = item[2];
        if (noteTitle.includes('\n')) {
            noteTitle = noteTitle.split('\n');
            noteTitle = noteTitle[0];
        }
        let html = "";
        html += "<div class='sm-note-wrapper'>";
        html += "<div class='sm-note-top'>";
        html += "<div class='sm-note-title'>";
        html += "<span class='titlegoeshere'>" + noteTitle +"<span>";
        html += "</div>";
        html += "<div class='sm-note-delete'>";
        html += "<img class='sm-trash-svg' src='../images/trash-white.svg' alt=''>";
        html += "</div>";
        html += "</div>";
        html += "<div class='sm-note-bottom'>";
        html += "<span class='bodygoeshere'>" + noteBody + "<span>";
        html += "</div>";
        html += "<span class='hiddenNoteID'>" + noteID +"</span>";
        html += "</div>";
        return html;
    }

    function saveNote(userID, noteTitle, noteBody) {
        // console.log(userID, noteTitle, noteBody);
        // call saveNote.php
        let url = "../server/saveNote.php?userid=" + userID + "&noteTitle=" + noteTitle + "&noteBody=" + noteBody + "&noteDate=" + getDate();
         console.log(url);

        // do the AJAX call
        fetch(url, { credentials: 'include' })
        .then(response => response.json())
        .then(function(a) {
            // console.log(a);
            retrieveNotes(userID);
        })
        return null;
    }

    function updateNote(userID, noteID, noteTitle, noteBody) {
        // call saveNote.php
        let url = "../server/updateNote.php?userid=" + userID + "&noteTitle=" + noteTitle + "&noteBody=" + noteBody + "&noteDate=" + getDate() + "&noteid=" + noteID;
        // console.log(url);

        // do the AJAX call
        fetch(url, { credentials: 'include' })
        .then(response => response.json())
        .then(function(a) {
             console.log(a);
            retrieveNotes(userID);
        })
        return null;
    }

    function retrieveNotes(userID) {
        // call getNotes.php
        let url = "../server/getNotes.php?userid=" + userID;
        // console.log(url);

        // do the AJAX call
        fetch(url, { credentials: 'include' })
        .then(response => response.json())
        .then(function(a) {
            // console.log(a);

            // save each returned note to the notesArray
            for (let i = 1; i < a.length; i++) {
                notesArray[i-1] = a[i];
            }

            // replace all special characters with their actual character
            notesArray[0].forEach(element => {
                // replace ascii codes with special chars
                element[2] = stringfromcode(element[2]);
                element[1] = stringfromcode(element[1]);
            })
            // create small notes
            let smNoteList = [];
            notesArray[0].forEach(element => {
                smNoteList += itemToHtml(element);
            });

            $('.sidebar-bottom').html(smNoteList); // append notes list to sidebar

            // change trash svg to red/white 
            $('.sm-trash-svg').on("mouseover", function() {
                $(this).attr('src', "../images/trash-red.svg");
            })
            $('.sm-trash-svg').on("mouseout", function() {
                $(this).attr('src', "../images/trash-white.svg");
            })

            // trash button click event goes here
            $('.sm-trash-svg').on('click', function(e) {
                let superParentChild = $($($($(this).parent()).parent()).parent()).children()[2].innerHTML; // long confusing code to get child nodes value from parent 3 levels above
                createPopup(userID, superParentChild);
                // reset note values
                $('.title-input').val("");
                $('.note-textarea').val("");
                e.stopPropagation();
            });

            // card click event may need to go here?

            $('.sm-note-wrapper').on('click', function() {
                justDeleted = false;
                // check if user is within mobile media query range
                if (window.matchMedia('(max-width:480px)').matches) {
                    // it matches
                    console.log('mobile query');
                    // hide notes and show main
                    $('.sidebar-wrapper').css('display', 'none');
                    $('.main-wrapper').css('display', 'flex');
                }

                let noteID = $(this).children()[2].innerHTML; // note ID
                // console.log(noteID);
                // set large note to correct values
                for (let i = 0; i < notesArray[0].length; i++) {
                    // console.log(notesArray[0][i][0]);
                    if (notesArray[0][i][0] == noteID) {
                        // console.log(notesArray[0][i]);
                        // 0 = note id 1 = note title 2 = note body 3 = note date
                        currentNoteSelected = notesArray[0][i];
                        // set note title and body
                        $('.title-input').val(currentNoteSelected[1]);
                        $('.note-textarea').val(currentNoteSelected[2]);
                    }
                }
            });
            // added this down here to fix bug : saving new note without clicking updates the wrong note in the list
            if (firstLoadComplete === true) {
                let sortedDates = sortByDate(notesArray[0]);
                currentNoteSelected = sortedDates[0];
            }
            
            if (justDeleted) {
                currentNoteSelected = 0;
                justDeleted = false;
            }
            firstLoadComplete = true;
        })
        return null;
    }



    function deleteNote(userID, noteID) {
        // call deleteNote.php to delete the note
        let url = "../server/deleteNote.php?userid=" + userID + "&noteid=" + noteID;
        // console.log(url);

        // do the AJAX call
        fetch(url, { credentials: 'include' })
        .then(response => response.json())
        .then(function(a) {
            // console.log(a);
            justDeleted = true;
            // retrieveNotes(userID);
            findNoteRemove(noteID);
            destroyPopup();
            currentNoteSelected = 0;
        })
    return null;
    }

    // returns sorted notes array (Most recent is index 0 in the array)
    function sortByDate(noteArray) {
        let sortedNotes = noteArray.slice().sort((a, b) => (new Date(b[3])) - (new Date(a[3])));
        // console.log(sortedNotes);
        return sortedNotes;
    }


    function getDate() {
        // let today = new Date();
        // let dd = String(today.getDate()).padStart(2, '0');
        // let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        // let yyyy = today.getFullYear();

        // today = yyyy + '-' + mm + '-' + dd;
        // return today;
        return (new Date().toLocaleString())
    }
    
    // handlers ~~~~~~~~~~~~~~~~~~~~~~~~~~
    $(saveNoteButton).on('click', function() {
        // note fields
        let noteTitle = $('.title-input').val();
        let noteBody = $('.note-textarea').val();
        
        // replace special chars with ascii for title and body
        let notetitleReplaced = specialToASCII(noteTitle);
        let notebodyReplaced = specialToASCII(noteBody);
        
        // verify valid entries
        if (noteTitle.length > 0 && noteBody.length > 0) {
            if (currentNoteSelected === 0) { // if note is new
            // save the note
            saveNote(userID, notetitleReplaced, notebodyReplaced);

            } else { // if note is being updated
                updateNote(userID, currentNoteSelected[0], notetitleReplaced, notebodyReplaced);
                console.log(currentNoteSelected);
            }

        } else {
            // console.log('not valid, note not saved');
        }
    });

    function createPopup(userID, noteID) {
        let container = document.createElement('div'); // container
        container.classList.add('popupContainer');
        let card = document.createElement('div'); // card
        card.classList.add('popup-card');
        let paragraph = document.createElement('p'); // p
        paragraph.innerHTML = "Are you sure you want to delete this note?";
        let popupOptions = document.createElement('div'); // popup options
        popupOptions.classList.add('popup-options');
        let popupNo = document.createElement('div'); // popup no
        popupNo.classList.add('popupButtonNo');
        let innerPopupNo = document.createElement('div');
        innerPopupNo.classList.add('innerPopupButtonNo');
        innerPopupNo.classList.add('popup-option');
        innerPopupNo.innerHTML = 'No';
        let popupYes = document.createElement('div'); // popup yes
        popupYes.classList.add('popupButtonYes');
        popupYes.classList.add('popup-option');
        popupYes.innerHTML = 'Yes';

        // buttons
        popupNo.appendChild(innerPopupNo);
        popupOptions.appendChild(popupNo);
        popupOptions.appendChild(popupYes);
        
        // card
        card.appendChild(paragraph);
        card.appendChild(popupOptions);

        // container
        container.appendChild(card);

        // append to document
        document.body.appendChild(container);

        $('.popupContainer').css('display', 'flex');

        // click events for buttons

        $('.popupButtonNo').click(function () {
                // console.log('no');
                currentNoteSelected = 0;
                destroyPopup();
        });

        $('.popupButtonYes').click(function() {
                // console.log('yes');
                deleteNote(userID, noteID);
        });
        
    }

    function destroyPopup() {
        $('.popupContainer').remove();
        // console.log('destroyed');
    }
    
    
   function removeFadeOut( el, speed ) {
        var seconds = speed/1000;
        // el.style.transition = "opacity "+seconds+"s ease";
        $(el).css('transition', `opacity ${seconds}s ease`);
        // el.style.opacity = 0;
        $(el).css('opacity', '0');
        setTimeout(function() {
            $(el).remove();
        }, speed);
    } 
    
    function findNoteRemove(noteID) {
        let notesList = $('.hiddenNoteID');
        for (let i = 0; i < notesList.length; i++) {
            if (notesList[i].innerHTML == noteID) {
                // console.log(notes1[i].parentNode);
                let toRemove = notesList[i].parentNode;
                removeFadeOut(toRemove, 300);
                // $(toRemove).remove();
            }
        }
    }
    
    
    $(createNoteButton).on('click', function() {
        // console.log('create new note!');
        // set currentNoteSelected to 0;
        currentNoteSelected = 0;
        // check if user is within mobile media query range
        if (window.matchMedia('(max-width:480px)').matches) {
            // it matches
            console.log('mobile query');
            // hide notes and show main
            $('.sidebar-wrapper').css('display', 'none');
            $('.main-wrapper').css('display', 'flex');
        }

        // clear text fields
        $('.title-input').val("");
        $('.note-textarea').val("");
        //sortByDate(notesArray[0]);  this was commented out 11/04/2022 incase this causes bugs
        // need to also add in something to shift screen to note page for mobile here. 
    });

    // change trash svg to red/white 
    $('.lg-trash-svg').on("mouseover", function() {
        $(this).attr('src', "../images/trash-red.svg");
    })
    $('.lg-trash-svg').on("mouseout", function() {
        $(this).attr('src', "../images/trash-white.svg");
    })

    $('.lg-trash-svg').on('click', function() {
        
        if (currentNoteSelected != 0) {
            // console.log(userID, currentNoteSelected[0]);
            createPopup(userID, currentNoteSelected[0]);
            // reset note values
            $('.title-input').val("");
            $('.note-textarea').val("");
        }
    });

    $('.backButton').on('click', function() {
        $('.sidebar-wrapper').css('display', 'flex');
        $('.main-wrapper').css('display', 'none');
    });

    // objects ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`

    // other code
})