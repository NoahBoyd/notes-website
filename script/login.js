window.addEventListener("load", function() {

    // Buttons
    let loginButton = $('.login-button');
    
    function setError(errorMessage) {
        $('.error').css('display', 'block');
        $('.error').html(errorMessage);
    }
    
    loginButton.on('click', function() {
        // input fields
        let loginUserInput = $('#login-user-name').val();
        let loginUserPass = $('#login-user-password').val();
        // check that inputs are not empty
        if (loginUserInput !== "" && loginUserPass !== "") {
            // ajax call to loginUser.php
            let url = "./server/loginUser.php?username=" + loginUserInput + "&password=" + loginUserPass;
                        // let url = "./server/loginUser2.php";
            console.log(url);

            // do the AJAX call
            fetch(url, { credentials: 'include' })
            .then(response => response.json())
            .then(function(a) {
                console.log(a);
                if (a[0] === 1) { // success
                    setError("User Logged. Redirecting...");
                    setTimeout(function(){window.location.replace("pages/app.php");}, 0); // redirect to app.php
                } else if (a[0] === -2) { // password wrong
                    setError("Wrong Password");
                } else if (a[0] === -1) { // name not found
                    setError("User with that name does not exist");
                } else { // database connection failed
                    setError("Database failed to connect");
                }
            })
        }
    });

    // enter key event (Clicks Login Button)
    document.addEventListener("keyup", function(event) {
        // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          loginButton.click();
        }
      });

})