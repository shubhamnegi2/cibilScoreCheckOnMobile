$(document).ready(function () {
    $(document).on('click', '.feedbackModalWrapper .starsWraper i', function () {

        // Reset all stars to regular state
        // $(".starsWrapper i").removeClass("fas").addClass("far");
        // Get the index of the clicked star
        var clickedIndex = $(this).index();
        $('.starsWraper').html(' ');
        for (let i = 0; i <= clickedIndex; i++) {
            $('.starsWraper').append('<i class="fa-solid fa-star"></i>');
        }
        for (let i = 1; i < (5 - clickedIndex); i++) {
            $('.starsWraper').append('<i class="fa-regular fa-star"></i>');
        }
        // star count value is Stored in the clickedIndex variable
        // You can make an AJAX call here to store the count of stars or ratings
        // After a successful AJAX call, you can then invoke the feedBackPopup() function

        feedBackPopup()

    });
    $(document).on('click', '.feedbackModalWrapper .minimize', function () {
        $('.ratingCommentsWrapper').slideUp(function () {
            $('.feedbackModalWrapper .RatingStarsWrapper').show();
            $('.feedbackModalWrapper .maximize').css({ display: 'flex' });
        });
    });

    $(document).on('click', '.feedbackModalWrapper .close', function () {
        $('.feedbackModalWrapper').slideUp();
    });
    $(document).on('click', '.feedbackModalWrapper .maximize', function () {
        feedBackPopup();
    });
    $(document).on('click', '#feedbackForm textarea', function () {
       $('.feedbackError').hide()
    });

    $(document).on('click', '.feedbackModalWrapper .feedbackSubmitBtn', function (e) {
        e.preventDefault();
        // Get the textarea value
        var textareaValue = $('#feedbackForm textarea').val();

        // Validation 1: Check if it's not empty
        if (textareaValue.trim() == '') {
            $('#feedbackForm textarea').css({ borderColor: 'red' });
            $('#feedbackForm .feedbackError').text('Please Enter Something...').show();
            return; // Exit the function if validation fails
        } else if (textareaValue.length < 10) {
            $('#feedbackForm textarea').css({ borderColor: 'red' });
            $('#feedbackForm .feedbackError').text('Enter Minimum 10 characters.').show();
            return; // Exit the function if validation fails
        } else {
            $('#feedbackForm .feedbackError').text('').hide();
            $('.feedbackSubmitBtn').hide();
            $('.feedbackSpinnerBtn').show();
            // Perform an AJAX call to store feedback
            // After the AJAX call, you can choose to close the popup modal
            // Alternatively, you may opt to display the user rating or disable further user rating based on your requirements

        }


    });



}); // jquery function end



function feedBackPopup() {
    setTimeout(() => {
        $('.feedbackModalWrapper .RatingStarsWrapper').hide();
        $('.feedbackModalWrapper .ratingCommentsWrapper').slideDown();
    }, 500);

}