window.addEventListener("load", function() {

    // Variables
    let signupButton = $('.signup-button');
    let error = $('.error').val();

    function setError(errorMessage) {
        $('.error').css('display', 'block');
        $('.error').html(errorMessage);
    }

    function success(a) {
        console.log(a);
        if (a[0] === 1) { // success
            setError("User account created. Redirecting to login page");
            setTimeout(function(){window.location.replace("../index.php");}, 2000); // redirect to login screen loginUser.php
        } else if (a[0] === -2) { // username taken
            setError("User with that name already exists");
        } else if (a[0] === -1) { // invalid input
            setError("Username is taken");
        } else { // connection to db failed
            setError("Database connection failed");
        }
    }

    signupButton.on('click', function() {
        // input fields
        let signupUserEmail = $('#signup-user-email').val();
        let signupUserName = $('#signup-user-name').val();
        let signupUserPass = $('#signup-user-password').val();
        let signupUserConfirm = $('#signup-user-confirm').val();
        // check that inputs are not empty
        if (signupUserEmail !== "" && signupUserName !== "" && signupUserPass !== "" && signupUserConfirm !== "") {

            // check if passwords match
            if (signupUserPass === signupUserConfirm) {
                // ajax call to loginUser.php
                console.log(signupUserEmail, signupUserName, signupUserPass, signupUserConfirm);
                let url = "../server/signupUser.php?userEmail=" + signupUserEmail + "&userName=" + signupUserName + "&userPassword=" + signupUserPass;
                console.log(url);

                // do the AJAX call
                fetch(url, { credentials: 'include' })
                .then(response => response.json())
                .then(success)
            } else {
                // set error message on screen showing passwords do not match
                setError("Passwords do not match")
            }
        } else {
            setError("Fill in all fields")
        }
    });

    // enter key event (Clicks Signup Button)
    document.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          signupButton.click();
        }
      });

})