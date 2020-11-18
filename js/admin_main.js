$(function() {
    /** add active class and stay opened when selected */
    var url = window.location;

    // for sidebar menu entirely but not cover treeview
    $('ul.sidebar-menu a').filter(function() {
        return this.href == url;
    }).parent().addClass('active');

    // for treeview
    $('ul.treeview-menu a').filter(function() {
        return this.href == url;
    }).parentsUntil(".sidebar-menu > .treeview-menu").addClass('active');

});

$(function() {
    $('#example1').DataTable({
        "lengthMenu": [
            [10, 25, 50, 100, 200, -1],
            [10, 25, 50, 100, 200, "All"]
        ],
        //"scrollX": true,
        responsive: true
    })
    $('#example2').DataTable({
        "lengthMenu": [
            [10, 25, 50, 100, 200, -1],
            [10, 25, 50, 100, 200, "All"]
        ],
        //"scrollX": true,
        'paging': true,
        'lengthChange': false,
        'searching': false,
        'ordering': true,
        'info': true,
        'autoWidth': false
    })

    $('#dashboard_td, #dashboard_td').DataTable({
        "lengthMenu": [
            [10, 25, 50, 100, 200, -1],
            [10, 25, 50, 100, 200, "All"]
        ],
        //"scrollX": true,
        'paging': true,
        'lengthChange': true,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': false
    })
})

$(function() {
    //Initialize Select2 Elements
    $('.select2').select2()

    //CK Editor
    CKEDITOR.replace('editor1', {
        skin: "bootstrapck"
    });

    CKEDITOR.replace('editor2', {
        skin: "bootstrapck"
    });

    CKEDITOR.replace('editor3', {
        skin: "bootstrapck"
    });
    CKEDITOR.replace('editor4', {
        skin: "bootstrapck"
    });

});



$(document).ready(function() {
    $("#view_icons_text").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#icons div").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});

function getMainCat() {
    $.ajax({
        type: 'POST',
        url: '../categories/get_main_category.php',
        dataType: 'json',
        success: function(response) {
            $('#cat_1').html(response);
        }
    });
}
getMainCat();
$(document).ready(function() {
    $('#cat_2').on('change', function() {
        var cat_2 = $(this).val();
        var new_cat_2 = 'add_new_cat_2';

        if (cat_2 == new_cat_2) {
            $('#add_new_input').show();
            $('#cat_2').removeAttr('name', '');
            $('#cat_2').removeAttr('required', 'required');
            $('#add_new_cat_2').attr('name', 'cat_2_name');
            $('#add_new_cat_2').attr('required', 'required');

        } else if (cat_2 !== new_cat_2) {
            $('#add_new_input').hide();
            $('#cat_2').attr('name', 'cat_2');
            $('#cat_2').attr('required', 'required');
            $('#add_new_cat_2').removeAttr('name', '');
            $('#add_new_cat_2').removeAttr('required', 'required');
        }
        //alert(add_new);
        $.ajax({
            type: 'POST',
            url: '../categories/get_sub_category_3.php',
            data: 'cat_2=' + cat_2,
            dataType: 'json',
            success: function(response) {
                $('#cat_3').html(response);
            }
        });
    });

    $('#cat_1').on('change', function() {
        var cat_1 = $(this).val();
        var new_cat_1 = 'add_new_cat_1';

        if (cat_1 == new_cat_1) {
            $('#add_new_input').show();
            $('#cat_1').removeAttr('name', '');
            $('#cat_1').removeAttr('required', 'required');
            $('#add_new_cat_1').attr('name', 'cat_1_name');
            $('#add_new_cat_1').attr('required', 'required');

        } else if (cat_1 !== new_cat_1) {
            $('#add_new_input').hide();
            $('#cat_1').attr('name', 'cat_1');
            $('#cat_1').attr('required', 'required');
            $('#add_new_cat_1').removeAttr('name', '');
            $('#add_new_cat_1').removeAttr('required', 'required');
        }
        //alert(add_new);
        $.ajax({
            type: 'POST',
            url: '../categories/get_sub_category_2.php',
            data: 'cat_1=' + cat_1,
            dataType: 'json',
            success: function(response) {
                $('#cat_2').html(response);
            }
        });
    });

    $('#cat_2').on('change', function() {
        var cat_2 = $(this).val();
        var new_cat_2 = 'add_new_cat_2';

        if (cat_2 == new_cat_2) {
            $('#add_new_input_cat_2').show();
            $('#cat_2').removeAttr('name', '');
            $('#cat_2').removeAttr('required', 'required');
            $('#add_new_cat_2').attr('name', 'cat_2_name');
            $('#add_new_cat_2').attr('required', 'required');

        } else if (cat_2 !== new_cat_2) {
            $('#add_new_input_cat_2').hide();
            $('#cat_2').attr('name', 'cat_2');
            $('#cat_2').attr('required', 'required');
            $('#add_new_cat_2').removeAttr('name', '');
            $('#add_new_cat_2').removeAttr('required', 'required');
        }
        //alert(add_new);
    });


    // For Product category chnages
    $('#cat_3').on('change', function() {
        var cat_2 = $(this).val();
        var new_cat_3 = 'add_new_cat_3';

        if (cat_2 == new_cat_3) {
            $('#add_new_input_cat_3').show();
            $('#cat_3').removeAttr('name', '');
            $('#cat_3').removeAttr('required', 'required');
            $('#add_new_cat_3').attr('name', 'cat_3_name');
            $('#add_new_cat_3').attr('required', 'required');

        } else if (cat_2 !== new_cat_3) {
            $('#add_new_input_cat_3').hide();
            $('#cat_3').attr('name', 'cat_3');
            $('#cat_3').attr('required', 'required');
            $('#add_new_cat_3').removeAttr('name', 'cat_3_name');
            $('#add_new_cat_3').removeAttr('required', 'required');
        }

    });


});


$('#warranty').on('change', function() {
    var warranty = $(this).val();
    var add_warranty = 1;

    if (warranty == add_warranty) {
        $('#warranty_yes').show();
        $('#warranty_no').removeClass('col-sm-3').addClass('col-sm-1');
        $('#warranty').removeAttr('name', '');
        $('#warranty').removeAttr('required', 'required');
        $('#add_warranty').attr('name', 'warranty');
        $('#add_warranty').attr('required', 'required');

    } else if (warranty !== add_warranty) {
        $('#warranty_yes').hide();
        $('#warranty_no').removeClass('col-sm-1').addClass('col-sm-3');
        $('#warranty').attr('name', 'warranty');
        $('#warranty').attr('required', 'required');
        $('#add_warranty').removeAttr('name', '');
        $('#add_warranty').removeAttr('required', 'required');
    }
    //alert(add_new);
});

$('#return').on('change', function() {
    var return_value = $(this).val();
    var add_return = 1;

    if (return_value == add_return) {
        $('#return_yes').show();
        $('#return_no').removeClass('col-sm-3').addClass('col-sm-1');
        $('#return').removeAttr('name', '');
        $('#return').removeAttr('required', 'required');
        $('#add_return').attr('name', 'return');
        $('#add_return').attr('required', 'required');

    } else if (return_value !== add_return) {
        $('#return_yes').hide();
        $('#return_no').removeClass('col-sm-1').addClass('col-sm-3');
        $('#return').attr('name', 'return');
        $('#return').attr('required', 'required');
        $('#add_return').removeAttr('name', '');
        $('#add_return').removeAttr('required', 'required');
    }
    //alert(add_new);
});


$(document).on('click', '.refund_price', function(e) {
    e.preventDefault();
    $('#refund_price').modal('show');
    var amount = $(this).data('amount');
    var bankid = $(this).data('bankid');
    var order = $(this).data('order');
    var customer = $(this).data('customer');
    $('#amount_refund').html(amount);
    $('#amount_refund2').html(amount);
    $('.amount_refund').val(amount);
    $('.bank_id').val(bankid);
    $('.order_id').val(order);
    $('#order_id').html(order);
    $('.customer_id').val(customer);
    $(document).on('click', '#refund_execute', function(e) {
        e.preventDefault();
        $('#refund_execute').attr('disabled', 'disabled');
        var order_id = $('.order_id').val();
        var customer_id = $('.customer_id').val();
        var amount_refund = $('.amount_refund').val();
        var bank_id = $('.bank_id').val();
        var refund_remarks = $('#refund_remarks').val();
        if (refund_remarks !== '' && amount_refund !== '' && bank_id !== '') {
            $.ajax({
                type: 'GET',
                url: '../sales/refund.php',
                data: {
                    order_id: order_id,
                    customer_id: customer_id,
                    refund_remarks: refund_remarks,
                    amount_refund: amount_refund,
                    bank_id: bank_id
                },
                dataType: 'json',
                success: function(response) {
                    $('#refund_execute').removeAttr('disabled', 'disabled');
                    $('#refund_status').show();
                    $('#refund_status').html(response.message);
                    if (response.error) {
                        $('#refund_status').removeClass('alert-success').addClass('alert-danger');
                    } else {
                        $('#refund_status').removeClass('alert-danger').addClass('alert-success');
                    }
                }
            });
        } else {
            $('#refund_execute').removeAttr('disabled', 'disabled');
            $('#refund_status').show();
            $('#refund_status').html('Sorry! Required fields appear blank.');
            $('#refund_status').removeClass('alert-success').addClass('alert-danger');
        }
    });
});

$(function() {
    $(document).on('click', '.tran_query_session', function(e) {
        e.preventDefault();
        $('#tran_query_session').modal('show');
        $('.lds-ring').show();
        var id = $(this).data('id');
        getTranQuery(id);
    });

    $(document).on('click', '.tran_query_transaction', function(e) {
        e.preventDefault();
        $('#tran_query_session').modal('show');
        $('.lds-ring').show();
        var id = $(this).data('id');
        getTranQueryTran(id);
    });
});


function getTranQueryTran(id) {
    $.ajax({
        type: 'GET',
        url: '../sales/query_transaction_by_tran_id.php',
        data: { id: id },
        dataType: 'json',
        success: function(response) {
            $('#query_status').show();
            $('#query_status').html(response.message);
            $('.lds-ring').hide();
            $('.view_order_id').html(response.order_id);
            $('#tran_query_view').html(response.tran_query);
            if (response.error) {
                $('#query_status').removeClass('alert-success').addClass('alert-danger');
            } else {
                $('#query_status').removeClass('alert-danger').addClass('alert-success');
            }
        }
    });
}

function getTranQuery(id) {
    $.ajax({
        type: 'GET',
        url: '../sales/query_transaction_by_session_id.php',
        data: { id: id },
        dataType: 'json',
        success: function(response) {
            $('#query_status').show();
            $('#query_status').html(response.message);
            $('.lds-ring').hide();
            $('.view_order_id').html(response.order_id);
            if (response.error) {
                $('#query_status').removeClass('alert-success').addClass('alert-danger');
            } else {
                $('#tran_query_view').html(response.tran_query);
                $('#query_status').removeClass('alert-danger').addClass('alert-success');
            }
        }
    });
}

$(document).ready(function() {
    $('#refund_mannually').click(function() {
        if ($(this).prop("checked") == false) {
            $('#refund_auto_set').attr('name', 'amount');
            $('#refund_auto_set').attr('class', 'amount_refund');
            $('#set_refund_mannually').removeAttr('name', 'amount');
            $('#set_refund_mannually').removeClass('amount_refund');
            $('#set_refund_mannually').removeAttr('required', 'required');
            $('#mannually_set_refund_body').hide();
        } else if ($(this).prop("checked") == true) {
            $('#refund_auto_set').removeAttr('name', '');
            $('#refund_auto_set').removeAttr('class', '');
            $('#set_refund_mannually').addClass('amount_refund');
            $('#set_refund_mannually').attr('name', 'amount');
            $('#set_refund_mannually').attr('required', 'required');
            $('#mannually_set_refund_body').show();
        }

    });
});


function getStoreInfoRow(id) {
    $.ajax({
        type: 'POST',
        url: 'store_row.php',
        data: { id: id },
        dataType: 'json',
        success: function(response) {
            $('#desc').html(response.details);
            $('.store_name').html(response.store_name);
            $('#store_name').html(response.store_name);
            $('#store_mobile').html(response.store_phone);
            $('#edit_store_name').val(response.store_name);
            $('#store_logo').html('<img id="img_view_showing" class="admin_store_logo" src="../../images/stores/' + response.str_photo + '"/>');
            $('#store_banner').html('<img class="admin_store_banner" src="../../images/stores/' + response.banner + '"/>');
            $('#store_id_card').html('<img class="admin_store_id_card" src="../../images/stores/' + response.id_card + '"/>');
            $('#show_store_category').html(response.pro_category_name);
            $('#store_mobile').html(response.store_phone);
            $('#store_type').html(response.store_type);
            $('#store_email').html(response.store_email);
            $('#store_pass').html(response.store_password);
            $('#store_address').html(response.store_address);
            $('#store_slogan').html(response.store_slogan);
            $('#edit_store_category').val(response.pro_category);
            $('#edit_store_type').val(response.store_type);
            $('#edit_customer_name').val(response.customer_id);
            $('#edit_store_mobile').val(response.store_phone);
            $('#edit_facebook').val(response.facebook);
            $('#edit_linkedin').val(response.linkedin);
            $('#edit_youtube').val(response.youtube);
            $('#edit_twitter').val(response.twitter);
            $('#edit_instagram').val(response.instagram);
            $('#facebook').html('<a target="_blank" href="' + response.facebook + '">' + response.facebook + '</a>');
            $('#linkedin').html('<a target="_blank" href="' + response.linkedin + '">' + response.linkedin + '</a>');
            $('#youtube').html('<a target="_blank" href="' + response.youtube + '">' + response.youtube + '</a>');
            $('#twitter').html('<a target="_blank" href="' + response.twitter + '">' + response.twitter + '</a>');
            $('#instagram').html('<a target="_blank" href="' + response.instagram + '">' + response.instagram + '</a>');
            $('#edit_store_email').val(response.store_email);
            $('#edit_store_pass').val(response.store_password);
            $('#edit_store_address').val(response.store_address);
            $('#edit_store_slogan').val(response.store_slogan);
            $('.store_id').val(response.store_id);
            $('#store_id').val(response.store_id);
            $('.edit_store_id').val(response.store_id);
            $('#edit_store_details').val(response.details);

            $('#bank_name').html(response.payment_bank_name);
            $('#acc_name').html(response.payment_account_name);
            $('#acc_no').html(response.payment_account_no);
            $('#bank_addr').html(response.payment_bank_address);
            $('#pay_type').html(response.payment_method);

            $('#edit_pay_bank').val(response.payment_bank_name);
            $('#edit_bank_ac_name').val(response.payment_account_name);
            $('#edit_bank_ac').val(response.payment_account_no);
            $('#edit_bank_addr').val(response.payment_bank_address);
            $('#edit_pay_type').val(response.payment_method);

            $('#featured').html(response.featured);
            $('#publishing').html(response.publishing);
            $('#selling').html(response.selling);
            $('#commission_type').html(response.commission_type);
            $('#pay_type').html(response.payment_method);

            $('#edit_featured').val(response.featured);
            $('#edit_publishing').val(response.publishing);
            $('#edit_selling').val(response.selling);
            $('#edit_commission_type').val(response.commission_type);
            $('#edit_commission').val(response.commission);
        }
    });
}

function getUserIP(ip) {
    $.ajax({
        type: 'GET',
        url: '../customers/get_login_info.php?orders_ip',
        data: { ip: ip },
        dataType: 'json',
        success: function(response) {
            $('#login_info_view').html(response.login_info);
            $('#login_info_view_count').html(response.count);
        }
    });
}


function getUserInfo(id) {
    $.ajax({
        type: 'POST',
        url: '../customers/users_row.php',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(response) {
            $('.userid').val(response.id);
            $('.cus_email').val(response.email);
            $('#edit_email').val(response.email);
            $('#cus_email').html(response.email);
            $('#cus_email_unverify').html(response.email);
            $('#cus_email_verify').html(response.email);
            $('#edit_password').val(response.password);
            $('#edit_firstname').val(response.firstname);
            $('.cus_first_name').val(response.firstname);
            $('#edit_lastname').val(response.lastname);
            $('#edit_contact').val(response.user_mobile);
            $('#cus_mobile').html(response.user_mobile);
            $('#cus_mobile_unverify').html(response.user_mobile);
            $('#cus_mobile_verify').html(response.user_mobile);
            $('.cus_mobile').val(response.user_mobile);
            $('.cus_avatar').html("<img src='../../images/users/" + response.photo + "'>");
            $('.fullname').html(response.firstname + ' ' + response.lastname);
            $('.cus_name').val(response.firstname + ' ' + response.lastname);
        }
    });

    $.ajax({
        type: 'GET',
        url: '../customers/get_old_msg.php',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(response) {
            $('.full_msg').html(response.list);
        }
    })
}

function send_sms_mail(userdata) {
    console.log(userdata);
    $('#msg_execute').attr('disabled', 'disabled');
    $('.send_email_sms').hide();
    $('.sending_email_sms').show();
    $.ajax({
        type: 'GET',
        url: '../customers/send_sms_mail.php',
        data: userdata,
        dataType: 'json',
        success: function(response) {
            $('#msg_execute').removeAttr('disabled', 'disabled');
            $('#msg_status').show();
            $('.send_email_sms').show();
            $('.sending_email_sms').hide();
            console.log(response.message);
            if (response.error) {
                $('#msg_status').removeClass('alert-success').addClass('alert-danger');
                $('#msg_status').html(response.message);
            } else {
                $('#msg_status').removeClass('alert-danger').addClass('alert-success');
                $('#msg_status').html(response.message);
            }
        }
    });
}

function getCustomerInfo(id) {
    $.ajax({
        type: 'GET',
        url: '../customers/get_login_info.php?user_info_by_id',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(response) {
            $('#login_info_view').html(response.login_info);
            $('#login_info_view_count').html(response.count);
        }
    });
}

$(document).ready(function() {
    $('#send_sms_select').click(function() {
        if ($(this).prop("checked") == true) {
            $('#send_sms_select').attr('name', 'send_sms');
            $('#msg_status').hide();
        } else {
            $('#send_sms_select').removeAttr('name', 'send_sms');
        }
    })

    $('#send_mail_select').click(function() {
        if ($(this).prop("checked") == true) {
            $('#send_mail_select').attr('name', 'send_mail');
            $('#msg_status').hide();
        } else {
            $('#send_mail_select').removeAttr('name', 'send_mail');
        }
    })
});

function get_msg_contact(id) {
    console.log(id);
    $.ajax({
        type: 'POST',
        url: '../general_info/contact_msg_row.php',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(response) {
            $('#message_view_info').html(response.message);
            $('#con_name').html(response.name);
            $('#msg_name').val(response.name);
            $('#con_mobile').html(response.mobile);
            $('#con_email').html(response.email);
            $('#msg_email').val(response.email);
            $('#msg_id').val(response.id);
        }
    });
}
$('#usersend_reply_msg').submit(function(e) {
    e.preventDefault();
    CKEDITOR.instances.message_reply_form_con.updateElement();
    var replydata = $(this).serialize();
    send_reply_mail(replydata);
    //console.log(replydata);
});

function send_reply_mail(replydata) {
    console.log(replydata);
    $('#reply_msg_execute').attr('disabled', 'disabled');
    $('.send_email_reply').hide();
    $('.sending_email_reply').show();
    $.ajax({
        type: 'GET',
        url: '../customers/send_sms_mail.php',
        data: replydata,
        dataType: 'json',
        success: function(response) {
            $('#reply_msg_execute').removeAttr('disabled', 'disabled');
            $('#msg_status').show();
            $('.send_email_reply').show();
            $('.sending_email_reply').hide();
            console.log(response.message);
            if (response.error) {
                $('#msg_status').removeClass('alert-success').addClass('alert-danger');
                $('#msg_status').html(response.message);
            } else {
                $('#msg_status').removeClass('alert-danger').addClass('alert-success');
                $('#msg_status').html(response.message);
            }
        }
    });
}

function get_msg_contact_reply(id) {
    $.ajax({
        type: 'GET',
        url: '../general_info/contact_msg_row_reply.php',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(response) {
            $('#reply_message_view_info').html(response.reply);
            $('#reply_date').html(response.reply_date);
        }
    });
}


function getControllerInfo(id) {
    $.ajax({
        type: 'POST',
        url: '../controller/controller_row.php',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(response) {
            $('.userid').val(response.id);
            $('.cus_email').val(response.email);
            $('#edit_email').val(response.email);
            $('#cus_email').html(response.email);
            $('#cus_email_unverify').html(response.email);
            $('#cus_email_verify').html(response.email);
            $('#edit_password').val(response.password);
            $('#edit_firstname').val(response.firstname);
            $('.cus_first_name').val(response.firstname);
            $('#edit_lastname').val(response.lastname);
            $('#edit_mobile').val(response.mobile);
            $('#cus_mobile').html(response.mobile);
            $('#cus_mobile_unverify').html(response.mobile);
            $('#cus_mobile_verify').html(response.mobile);
            $('.cus_mobile').val(response.mobile);
            $('#edit_type').val(response.type);
            $('.cus_avatar').html("<img src='../../images/users/" + response.photo + "'>");
            $('.fullname').html(response.firstname + ' ' + response.lastname);
            $('.cus_name').val(response.firstname + ' ' + response.lastname);
        }
    });

    $.ajax({
        type: 'GET',
        url: '../customers/get_old_msg.php',
        data: {
            id: id
        },
        dataType: 'json',
        success: function(response) {
            $('.full_msg').html(response.list);
        }
    })
}

function getLoginInfo(id, type) {
    $.ajax({
        type: 'GET',
        url: '../customers/get_login_info.php?' + type,
        data: { id: id },
        dataType: 'json',
        success: function(response) {
            $('#login_info_view').html(response.login_info);
            $('#login_info_view_count').html(response.count);
        }
    });
}