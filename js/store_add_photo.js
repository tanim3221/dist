/* Shop Img Upload*/
$(document).on('click', '.add_shop', function(e) {
    e.preventDefault();
    $('.spinner_load').show();
    $('.add_shop_info').show();
    $.ajax({
        url: '../store/add_store.php',
        dataType: 'html',
        success: function(response) {
            $('#view_main_form').html(response);
            $('.spinner_load').hide();

        }
    });

});

function readURLbanner(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            $('.image-upload-wrap-banner').hide();

            $('.file-upload-image-banner').attr('src', e.target.result);
            $('.file-upload-content-banner').show();

            $('.image-title-banner').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUploadbanner();
    }
}

function removeUploadbanner() {
    $('.file-upload-input-banner').replaceWith($('.file-upload-input-banner').clone());
    $('.file-upload-content-banner').hide();
    $('.image-upload-wrap-banner').show();
}

$('.image-upload-wrap-banner').bind('dragleave', function() {
    $('.image-upload-wrap-banner').removeClass('image-dropping');
});

$('.image-upload-wrap-banner').bind('dragover', function() {
    $('.image-upload-wrap-banner').addClass('image-dropping');
});


function readURLlogo(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            $('.image-upload-wrap-logo').hide();

            $('.file-upload-image-logo').attr('src', e.target.result);
            $('.file-upload-content-logo').show();

            $('.image-title-logo').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUploadlogo();
    }
}

function removeUploadlogo() {
    $('.file-upload-input-logo').replaceWith($('.file-upload-input-logo').clone());
    $('.file-upload-content-logo').hide();
    $('.image-upload-wrap-logo').show();
}

$('.image-upload-wrap-logo').bind('dragover', function() {
    $('.image-upload-wrap-logo').addClass('image-dropping');
});

$('.image-upload-wrap-logo').bind('dragleave', function() {
    $('.image-upload-wrap-logo').removeClass('image-dropping');
});

function readURLnid(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();

        reader.onload = function(e) {
            $('.image-upload-wrap-nid').hide();

            $('.file-upload-image-nid').attr('src', e.target.result);
            $('.file-upload-content-nid').show();

            $('.image-title-nid').html(input.files[0].name);
        };

        reader.readAsDataURL(input.files[0]);

    } else {
        removeUploadnid();
    }
}

function removeUploadnid() {
    $('.file-upload-input-nid').replaceWith($('.file-upload-input-nid').clone());
    $('.file-upload-content-nid').hide();
    $('.image-upload-wrap-nid').show();
}

$('.image-upload-wrap-nid').bind('dragover', function() {
    $('.image-upload-wrap-nid').addClass('image-dropping');
});

$('.image-upload-wrap-nid').bind('dragleave', function() {
    $('.image-upload-wrap-nid').removeClass('image-dropping');
});

$(document).on('click', '.close_btn', function(e) {
    e.preventDefault();
    $('.add_shop_info').hide();
});

/* Shop Img Upload*/