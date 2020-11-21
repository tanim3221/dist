    $(function() {
        // Datatable
        $('#example1').DataTable()
            // CKeditor Configaration
    });

    let specificationEditor;
    let descriptionEditor;
    ClassicEditor
        .create(document.querySelector('#specification'), {
            toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable'],
            removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed'],
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                ]
            },
            table: {
                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
            },
            language: 'en'
        })
        .then(editor => {
            specificationEditor = editor;
        })
        .catch(error => {
            console.error(error);
        });

    ClassicEditor
        .create(document.querySelector('#description'), {
            toolbar: ['undo', 'redo', 'heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote', 'insertTable'],
            removePlugins: ['Image', 'ImageCaption', 'ImageStyle', 'ImageToolbar', 'ImageUpload', 'MediaEmbed'],
            heading: {
                options: [
                    { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                    { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                    { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                    { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                ]
            },
            table: {
                contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
            },
            language: 'en'
        })
        .then(editor => {
            descriptionEditor = editor;
        })
        .catch(error => {
            console.error(error);
        });

    $(document).ready(function() {
        bsCustomFileInput.init()
    })

    var total = 0;

    function toastrOption() {
        toastr.options = {
            "closeButton": false,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-bottom-center",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
    }

    $(function() {

        $(document).on('click', '.minus', function(e) {
            e.preventDefault();
            var id = $(this).data('id');
            var qty = $('#qty_' + id).val();
            if (qty > 1) {
                qty--;
            }
            $('#qty_' + id).val(qty);
            $.ajax({
                type: 'POST',
                url: 'cart_update.php',
                data: {
                    id: id,
                    qty: qty,
                },
                dataType: 'json',
                success: function(response) {
                    if (!response.error) {
                        getDetails();
                        getCart();
                        getTotal();
                        getDetailsCheckout();
                    }
                }
            });
        });

        $(document).on('click', '.add', function(e) {
            e.preventDefault();
            var id = $(this).data('id');
            var quantity = $('#product_quantity_' + id).data('quantity');
            var qty = $('#qty_' + id).val();
            if (qty < quantity) {
                qty++;
            }

            $('#qty_' + id).val(qty);
            $.ajax({
                type: 'POST',
                url: 'cart_update.php',
                data: {
                    id: id,
                    qty: qty,
                },
                dataType: 'json',
                success: function(response) {
                    if (!response.error) {
                        getDetails();
                        getCart();
                        getTotal();
                        getDetailsCheckout();
                    }
                }
            });
        });

        getDetails();
        getTotal();
        getDetailsCheckout();

    });


    $(window).scroll(function() {
        if ($(window).scrollTop() >= 10) {
            $('.search_bar_body').addClass('fixed-header');
            $('.full_navbar_body').addClass('fixed_nav');
            $('.search_result_body').addClass('scroll_search');
        } else {
            $('.search_bar_body').removeClass('fixed-header');
            $('.full_navbar_body').removeClass('fixed_nav');
            $('.search_result_body').removeClass('scroll_search');
        }
    });

    function getDetails() {
        $.ajax({
            type: 'POST',
            url: 'cart_details.php',
            dataType: 'json',
            success: function(response) {
                $('#tbody').html(response);
                $('.spinner_load').hide();
                getCart();
                getDetailsEmpty();
            }
        });
    }

    function getDetailsEmpty() {
        $.ajax({
            type: 'POST',
            url: 'cart_empty.php',
            dataType: 'json',
            success: function(response) {
                $('#tbody_empty').html(response);
                getCart();
            }
        });
    }

    function getDetailsCheckout() {
        $.ajax({
            type: 'POST',
            url: 'cart_checkout.php',
            dataType: 'json',
            success: function(response) {
                $('#subtotal').html(response.subtotal_cart_value);
                $('#subtotal_index').html(response.subtotal_cart_value);
                $('#total').html(response.total_cart_value);
                $('#total_pay').html(response.total_payable_value);
                $('#shipping_total').html(response.shipping_cart_value);
                $('#promo_discount').html(response.promo_discount);
            }
        });
    }

    function getTotal() {
        $.ajax({
            type: 'POST',
            url: 'cart_total.php',
            dataType: 'json',
            success: function(response) {
                total = response;
            }
        });
    }

    $(function() {
        $('#navbar-search-input').focus(function() {
            $('#searchBtn').show();
        });

        $('#navbar-search-input').focusout(function() {
            $('#searchBtn').hide();
        });

        getCart();
        getDetailsEmptyFetch();

        $('#productForm').submit(function(e) {
            e.preventDefault();
            var product = $(this).serialize();
            $('.spinner_add_cart_btn').show();
            $('.add_cart_text_btn').hide();
            $.ajax({
                type: 'POST',
                url: '../cart/cart_add.php',
                data: product,
                dataType: 'json',
                success: function(response) {
                    $('.spinner_add_cart_btn').hide();
                    $('.add_cart_text_btn').show();
                    toastrOption();
                    if (response.error) {
                        toastr.error(response.message);
                    } else {
                        toastr.success(response.message);
                        getCart();
                        getDetailsEmptyFetch();
                        getAddedProductCart();
                    }
                }
            });
        });

        $(document).on('click', '.close', function() {
            $('#callout').hide();
        });

        setTimeout(function() {
            $('#callout').fadeOut('fast');
        }, 3000); // <-- time in milliseconds

    });

    $(document).on('click', '.cart_delete', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            type: 'POST',
            url: '../cart/cart_delete.php',
            data: { id: id },
            dataType: 'json',
            success: function(response) {
                toastrOption();
                if (!response.error) {
                    toastr.success(response.message);
                    getDetails();
                    getCart();
                    getTotal();
                    getDetailsCheckout();
                    getDetailsEmptyFetch();
                    getAddedProductCart();
                }
            }
        });
    });

    function getCart() {
        $.ajax({
            type: 'POST',
            url: '../cart/cart_fetch.php',
            dataType: 'json',
            success: function(response) {
                $('#cart_menu').html(response.list);
                $('#cart_menu_m').html(response.list);
                $('.cart_count').html(response.count);
                getDetailsEmptyFetch();
            }
        });
    }

    function getDetailsEmptyFetch() {
        $.ajax({
            type: 'POST',
            url: '../cart/cart_empty_fetch.php',
            dataType: 'json',
            success: function(response) {
                $('#tbody_empty_fetch').html(response);
                $('#tbody_empty_fetch_m').html(response);
            }
        });
    }

    function getDetailsEmptyFetchNotify() {
        $.ajax({
            type: 'POST',
            url: '../customer/notify_empty.php',
            dataType: 'json',
            success: function(response) {
                $('#notification_fetch_m').html(response);
                $('#notification_fetch_nav').html(response);
            }
        });
    }
    $(function() {
        getWishList();
        $(document).on('click', '#add_wish_list', function(e) {
            e.preventDefault();
            var id = $(this).data('id');
            $.ajax({
                type: 'POST',
                url: '../customer/wish_add.php',
                data: { id: id },
                dataType: 'json',
                success: function(response) {
                    toastrOption();
                    if (response.error) {
                        toastr.error(response.message);
                    } else {
                        toastr.success(response.message);
                        getWishList();
                        getWishProductPage();
                    }
                }
            });
        });

        $(document).on('click', '.close', function() {
            $('#callout').hide();
        });

        setTimeout(function() {
            $('#callout').fadeOut('fast');
        }, 3000); // <-- time in milliseconds

    });

    function getWishList() {
        $.ajax({
            type: 'POST',
            url: '../customer/wish_fetch.php',
            dataType: 'json',
            success: function(response) {
                $('.wish_count').html(response.count);
            }
        });
    }


    function getViewsList() {
        $.ajax({
            type: 'POST',
            url: '../customer/views_fetch.php',
            dataType: 'json',
            success: function(response) {
                $('.views_count').html(response.count);
            }
        });
    }


    $(document).ready(function() {
        $('#country').on('change', function() {
            var countryID = $(this).val();
            $('.shipping_address_city').show();
            if (countryID) {
                $.ajax({
                    type: 'POST',
                    url: '../cart/get_country_city.php',
                    data: 'country_id=' + countryID,
                    success: function(html) {
                        $('.shipping_address_city').hide();
                        $('#city').html(html);
                        $('#area').html('<option value="">Select city first</option>');
                    }
                });
            } else {
                $('#city').html('<option value="">Select country first</option>');
                $('#area').html('<option value="">Select city first</option>');
            }
        });

        $('#city').on('change', function() {
            var cityID = $(this).val();
            $('.shipping_address_area').show();
            if (cityID) {
                $.ajax({
                    type: 'POST',
                    url: '../cart/get_country_city.php',
                    data: 'city_id=' + cityID,
                    success: function(html) {
                        $('#area').html(html);
                        $('.shipping_address_area').hide();
                    }
                });
            } else {
                $('#area').html('<option value="">Select city first</option>');
            }
        });
    });

    $(function() {
        //$(document).on('click', '.get_sub_cat', function(e){
        $('.get_sub_cat').mouseover(function(e) {
            e.preventDefault();
            var id = $(this).data('id');
            $('.spinner_load').show();
            $('#get_sub_cat').show();
            $('.loading_get_cat_view').show();
            $('.right_icon_list_cat_' + id).show();
            $('.sub_category_hover_list').show();
            $('.close_mega_menu').show();
            $.ajax({
                type: 'POST',
                url: '../product/get_sub_cat.php',
                data: { id: id },
                dataType: 'json',
                success: function(response) {
                    $('.spinner_load').hide();
                    $('#get_sub_cat').html(response);
                    $('.loading_get_cat_view').hide();
                }
            });
        });

        $(document).on('click', '.close_mega_menu', function(e) {
            $('.sub_category_hover_list').hide();
        });

        $(".get_sub_cat").mouseleave(function() {
            var id = $(this).data('id');
            // $('#get_sub_cat').hide();
            //$('.sub_category_hover_list').hide();
            //$('.right_icon_list_cat_' + id).hide();
        });

        $(".sub_category_hover_list").mouseleave(function() {
            // $('#get_sub_cat').hide();
            //$('.sub_category_hover_list').hide();
            // $('.right_icon_list_cat_'+id).hide();
        });
    });

    $(document).on('click', '#return_warranty_info_btn', function(e) {
        $('.return_warranty_info').show();
    });


    /*
    	$(document).on('click', '#pro_share_card_btn', function(e){
    		e.preventDefault();
    		$.ajax({
    			url: '../product/product_info_board.php',
    			dataType: 'html',
    			success: function(html) {
    				$('.pro_share_card').show();
    				var share_options = $('#pro_share_card', $(html)).addClass('show');
    				$('.share_btn_click_show_options').html(share_options);
    				
    				console.log('view');
    			}
    		})
    	});  	
    */
    $(document).on('click', '.return_warranty_info, .write_good_review, .delivery_option_info, .others_order_details_card', function(e) {
        $('.delivery_option_info').hide();
        $('.return_warranty_info').hide();
        $('.write_good_review').hide();
        $('.others_order_details_card').hide();
    });

    $(document).on('click', '#change_address_price_btn', function(e) {
        $('.delivery_option_info').show();
    });
    $(document).on('click', '.track_details_click_btn', function(e) {
        $('.others_order_details_card').toggle();
    });

    $(document).on('click', '#pro_details_view_click', function(e) {
        $('.pro_details_card_pro_bottom').show();
    });


    $(document).on('click', '#write_good_review', function(e) {
        $('.write_good_review').show();
    });

    $(document).on('click', '#check_shipping_cost', function(e) {
        $('.place_ship_search_check_details_page').show();
        $.ajax({
            type: 'GET',
            url: '../cart/get_country.php?get_country_list',
            dataType: 'json',
            success: function(response) {
                $('#check_cost_ship').html(response.country);
                $('.check_cost_ship').show();
                $('.place_ship_search_check_details_page').hide();
            }
        });
    });

    $(document).on('click', '#country_name', function(e) {
        var country = $(this).data('id');
        $('.place_ship_search_check_details_page_modal').show();
        $.ajax({
            type: 'GET',
            url: '../cart/get_country.php?get_city_list',
            data: { country: country },
            dataType: 'json',
            success: function(response) {
                $('#check_cost_ship').html(response.city);
                $('.place_ship_search_check_details_page_modal').hide();
            }
        });
    });

    $(document).on('click', '#city_name', function(e) {
        var city = $(this).data('id');
        $('.place_ship_search_check_details_page_modal').show();
        $.ajax({
            type: 'GET',
            url: '../cart/get_country.php?get_area_list',
            data: { city: city },
            dataType: 'json',
            success: function(response) {
                $('#check_cost_ship').html(response.area);
                $('.place_ship_search_check_details_page_modal').hide();
            }
        });
    });

    $(document).on('click', '#area_name', function(e) {
        var area = $(this).data('id');
        $('.place_ship_search_check_details_page_modal').show();
        $.ajax({
            type: 'GET',
            url: '../cart/get_country.php?get_shipping_cost',
            data: { area: area },
            dataType: 'json',
            success: function(response) {
                $('.check_cost_ship').slideToggle('fast');
                $('.place_ship_search_check_details_page_modal').hide();
                location.reload();
            }
        });
    });

    $(document).ready(function() {
        $("#search_place").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".place_name_list").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    //$('#main_search_bar').keyup(function(){
    $("#main_search_bar").on("keyup", function() {
        //$(document).on('click', '#main_search_btn', function(e){
        var keyword = $('#main_search_bar').val();

        //alert (keyword);
        if (keyword != '') {
            $('.spinner_search_main_bar_data').show();
            $('#search_clear').show();
            $.ajax({
                type: 'POST',
                url: '../search/search_results.php',
                data: { keyword: keyword },
                dataType: 'json',
                success: function(response) {
                    if (response.error) {
                        $('.search_result_body').hide();
                    } else {
                        $('.spinner_search_main_bar_data').hide();
                        $('.search_result_body').show();
                        $('#show_search_result_product').html(response);
                    }
                }
            });
        } else {
            $('.search_result_body').hide();
            $('#search_clear').hide();
        }
    });

    $("#main_search_btn, #main_search_bar").on("click keyup", function() {
        var keyword = $('#main_search_bar').val();
        if (keyword != '') {
            $.ajax({
                type: 'POST',
                url: '../search/search_results_brand.php',
                data: { keyword: keyword },
                dataType: 'json',
                success: function(response) {
                    if (response.error) {
                        $('.search_result_body').hide();
                    } else {
                        $('.search_result_body').show();
                        $('#show_search_result_brand').html(response);
                    }
                }
            });
        } else {
            $('.search_result_body').hide();
        }
    });

    $("#main_search_btn, #main_search_bar").on("click keyup", function() {
        var keyword = $('#main_search_bar').val();
        if (keyword != '') {
            $.ajax({
                type: 'POST',
                url: '../search/search_results_cat.php',
                data: { keyword: keyword },
                dataType: 'json',
                success: function(response) {
                    if (response.error) {
                        $('.search_result_body').hide();
                    } else {
                        $('.search_result_body').show();
                        $('#show_search_result_cat').html(response);
                    }
                }
            });
        } else {
            $('.search_result_body').hide();
        }
    });

    $("#main_search_btn, #main_search_bar").on("click keyup", function() {
        var keyword = $('#main_search_bar').val();
        if (keyword != '') {
            $.ajax({
                type: 'POST',
                url: '../search/search_results_store.php',
                data: { keyword: keyword },
                dataType: 'json',
                success: function(response) {
                    if (response.error) {
                        $('.search_result_body').hide();
                    } else {
                        $('.search_result_body').show();
                        $('#show_search_result_store').html(response);
                    }
                }
            });
        } else {
            $('.search_result_body').hide();
        }
    });

    function getNotification() {
        $.ajax({
            type: 'POST',
            url: '../customer/notification_fetch.php',
            dataType: 'json',
            success: function(response) {

                $('#notification').html(response.list);
                $('#notification_m').html(response.list);
                $('.notification_count').html(response.count);
                getDetailsEmptyFetchNotify();
            }
        });
    }
    getNotification();

    $(function() {
        $(document).on('click', '#notify_data_btn_link', function(e) {
            e.preventDefault();
            var order_id = $(this).data('id');
            var cus_order = $(this).data('cus');
            var status_order = $(this).data('status');
            //alert(order_id);
            $.ajax({
                type: 'GET',
                url: '../customer/notified.php',
                data: { order_id: order_id },
                dataType: 'json',
                success: function(response) {
                    toastrOption();
                    if (response.error) {
                        toastr.error(response.message);
                    } else {
                        toastr.success(response.message);
                        window.location.href = '../customer/?manage_order&order_id=' + order_id + '&customer_id=' + cus_order + '&status=' + status_order + '';
                        getDetailsEmptyFetchNotify();

                    }
                }
            });
        });
    });

    (function() {
        'use strict';
        window.addEventListener('load', function() {
            // Fetch all the forms we want to apply custom Bootstrap validation styles to
            var forms = document.getElementsByClassName('needs-validation');
            // Loop over them and prevent submission
            var validation = Array.prototype.filter.call(forms, function(form) {
                form.addEventListener('submit', function(event) {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });
        }, false);
    })();

    $(function() {
        //$('#info_update').submit(function(e){
        $(document).on('click', '#mobile_update', function(e) {
            e.preventDefault();
            var user_mobile = $("#user_mobile").val();
            $('#mobile_update').hide();
            $('#loading_button_mobile').show();
            $.ajax({
                type: 'POST',
                url: '../customer/mobile_update.php',
                data: { user_mobile: user_mobile },
                dataType: 'json',
                success: function(response) {
                    toastrOption();
                    if (response.error) {
                        $('#loading_button_mobile').hide();
                        $('#mobile_update').show();
                        toastr.error(response.message);
                    } else {
                        $('.mobile_varify').hide();
                        $('#loading_button_mobile').hide();
                        $('.mobile_varify_otp').show();
                        toastr.success(response.message);
                    }
                }
            });
        });
    });

    $(function() {
        //$('#info_update').submit(function(e){
        $(document).on('click', '#otp_confirm_mobile', function(e) {
            e.preventDefault();
            var mobile_otp = $("#mobile_otp").val();
            $.ajax({
                type: 'POST',
                url: '../customer/mobile_update_otp.php',
                data: { mobile_otp: mobile_otp },
                dataType: 'json',
                success: function(response) {
                    toastrOption();
                    if (response.error) {
                        toastr.error(response.message);
                    } else {
                        setTimeout(function() {
                            location.reload();
                        }, 3000);
                        toastr.success(response.message);
                    }
                }
            });
        });
    });

    $(document).ready(function() {
        $("#cat_search_all").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $(".search_value_keyup").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });
    /*
        $(window).on('load', function() {
            $('.indeterminate').hide();
            $(".progress_bar").css({
                'z-index': "0",
                'opacity': "0",
            });
        });
    */
    var navItems = document.querySelectorAll(".mobile-bottom-nav__item");
    navItems.forEach(function(e, i) {
        e.addEventListener("click", function(e) {
            navItems.forEach(function(e2, i2) {
                e2.classList.remove("mobile-bottom-nav__item--active");
            })
            this.classList.add("mobile-bottom-nav__item--active");
        });
    });

    $(document).on('click', '.cart_mobile_btn', function(e) {
        $('.cart_mobile_menu').show();
        $('.notification_mobile_menu').hide();
        $('.user_mobile_menu').hide();
        $('.cat_mobile_menu').hide();
        $('.sub_cat_mobile_menu').hide();
        $('.search_result_body').hide();
    });

    $(document).on('click', '.notification_mobile_menu_btn', function(e) {
        $('.notification_mobile_menu').show();
        $('.user_mobile_menu').hide();
        $('.cat_mobile_menu').hide();
        $('.cart_mobile_menu').hide();
        $('.sub_cat_mobile_menu').hide();
        $('.search_result_body').hide();
    });

    $(document).on('click', '.cart_btn_on_view ', function(e) {
        $('.cart_mobile_menu').hide();
    });

    $(document).on('click', '.notification_btn_on_view', function(e) {
        $('.notification_mobile_menu').hide();

    });

    $(document).on('click', '.home_mobile_button', function(e) {
        location.href = '../home/';
        $('.navbar_mobile_class').hide();
    });

    $(document).on('click', '.category_view_mobile', function(e) {
        e.preventDefault();
        $('.cat_mobile_menu').show();
        $('.spinner_load').show();
        $('.cart_mobile_menu').hide();
        $('.user_mobile_menu').hide();
        $('.notification_mobile_menu').hide();
        $.ajax({
            url: '../product/m_category.php',
            dataType: 'json',
            success: function(response) {
                $('#cat_options').html(response.list);
                $('.spinner_load').hide();
                $('.search_result_body').hide();
                $('.menu_notify_mobile_view').addClass('main_category_new_class');
            }
        });
    });



    $(document).on('click', '#category_mobile', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        $.ajax({
            url: '../product/get_mobile_category.php',
            type: 'POST',
            dataType: 'json',
            data: { id: id },
            success: function(response) {
                $('.sub_cat_mobile_menu').show();
                $('#sub_cat_options').html(response.list);
                $('#sub_get_nav_value_title').html(response.title);
                $('.search_result_body').hide();
            }
        });
    });

    $(document).on('click', '.navbar_on_view_back', function(e) {
        e.preventDefault();
        location.href = server_referer_url;
    });

    $(document).on('click', '#more_nav', function(e) {
        e.preventDefault();
        $('.more_nav_mobile_view').toggle();
    });

    $(document).on('click', '.sub_cat_close_btn_on_view', function(e) {
        e.preventDefault();
        $('.sub_cat_mobile_menu').hide();
    });

    $(document).on('click', '.cat_close_btn_on_view', function(e) {
        e.preventDefault();
        $('.cat_mobile_menu').hide();
    });


    $(document).on('click', '.filter_icon ', function(e) {
        e.stopPropagation();
        $('.category_filter_product_item').toggle();
        $('.category_filter_product_item').addClass('show_filter');
        $('.hide_filter').show();
    });
    $(document).on('click', '.hide_filter ', function(e) {
        e.stopPropagation();
        $('.category_filter_product_item').hide();
        $('.hide_filter').hide();
    });

    $(document).on('click', '#search_clear ', function(e) {
        e.preventDefault();
        $('#main_search_bar').val('');
    });

    $(document).on('click', '.account_close_btn_on_view ', function(e) {
        e.preventDefault();
        $('.user_mobile_menu').hide();
    });


    function userLoggedOut() {
        var url = '../auth/login.php';
        window.location.href = (url);
    }

    function userLoggedIn() {
        $('.user_mobile_menu').show();
        $('.spinner_load').show();
        $('.cart_mobile_menu').hide();
        $('.notification_mobile_menu').hide();
        $.ajax({
            type: 'GET',
            url: '../customer/sidebar.php?moblie_view',
            dataType: 'html',
            success: function(response) {
                $('#user_options').html(response);
                $('.spinner_load').hide();
                $('.search_result_body').hide();
            }
        });
    }

    function isLoggedin() {
        $.ajax({
            'url': '../customer/isLogged.php',
            'dataType': 'json',
            'success': function(response) {
                if (response.error) {
                    userLoggedOut();
                } else {
                    userLoggedIn();
                    $('.img_user_mob_wrapper').css({
                        'position': 'inherit',
                    });
                    $('.head_window_title').html('Welcome');
                }
            }
        });
    }

    $(document).on('click', '.user_account_options', function(e) {
        e.preventDefault();
        isLoggedin();
    });


    $('.btn').mouseover(function(e) {

    });

    $(".btn").mouseleave(function() {

    });

    /*
    $(document).on('scroll', function() {
      if ($(this).scrollTop() <= $('.product_page_cart_btn').position().top) {
    		$('#buy_now_btn').removeClass('fixed_btn');
    		$('#cart_btn_add').removeClass('fixed_btn');
    		$('.mobile-bottom-nav').show();
      } else {
    	   $('#buy_now_btn').addClass('fixed_btn');
    	   $('#cart_btn_add').addClass('fixed_btn');
    	   $('.mobile-bottom-nav').hide();
      }
    })
    */

    $(document).on('scroll', function() {
        if ($(window).scrollTop() <= 100) {
            $('.cart_btn_pro_main').removeClass('fixed_btn');
        } else {
            $('.cart_btn_pro_main').addClass('fixed_btn');
        }
    })

    $(document).on('click', '#details_info_edit', function(e) {
        e.preventDefault();
        var name = $(this).data('name');
        var value = $(this).data('value');
        $('#title_name').html(name);
        $('#edit_value_name').val(name);
        $('#edit_value').val(value);
        $('.edit_shop_info').show();
        $('.edit_shop_info_main__').hide();
        $('.edit_shop_info_main__social').hide();

    });

    $(document).on('click', '.logo_change', function(e) {
        e.preventDefault();
        $('#title_name_1').html('Shop Logo');
        $('.edit_shop_info_photo').show();

    });


    $(document).on('click', '.banner_change', function(e) {
        e.preventDefault();
        $('#title_name_2').html('Shop Banner');
        $('.edit_shop_info_photo_banner').show();

    });



    $(document).on('click', '.edit_name_slogan', function(e) {
        e.preventDefault();
        $('.edit_shop_info_main__').show();

    });


    $(document).on('click', '#edit_social_url', function(e) {
        e.preventDefault();
        $('.edit_shop_info_main__social').show();

    });


    $(document).on('click', '#submit_edit_info_img', function(e) {
        e.preventDefault();
        var photo = new FormData();
        var files = $('.pro_photo_up')[0].files[0];
        photo.append('file', files);
        $.ajax({
            url: '../store/store_photo.php',
            type: 'POST',
            data: photo,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                    setTimeout(function() {
                        location.reload();
                    }, 2000);

                }
            }
        })
    });


    $(document).on('click', '#submit_edit_info_img_banner', function(e) {
        e.preventDefault();
        var photo = new FormData();
        var files = $('.pro_photo_up.banner')[0].files[0];
        photo.append('file', files);
        $.ajax({
            url: '../store/store_photo_banner.php',
            type: 'POST',
            data: photo,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                toastrOption();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                    setTimeout(function() {
                        location.reload();
                    }, 2000);

                }
            }
        })
    });


    $(document).on('click', '#submit_edit_info', function(e) {
        var name = $('#edit_value_name').val();
        var value = $('#edit_value').val();

        $.ajax({
            url: '../store/store_info_edit.php',
            type: 'POST',
            dataType: 'json',
            data: { name: name, value: value },
            success: function(response) {
                $('.spinner_load').hide();
                toastrOption();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                    toastr.success(response.message);
                }
            }
        });
    });
    $(document).on('click', '.close_btn', function(e) {
        e.preventDefault();
        closeBtn();
    });
    $(document).on('click', '.close_btn_wrapper', function(e) {
        e.preventDefault();
        closeBtn();
    });

    function closeBtn() {
        $('.edit_shop_info').hide();
        $('.edit_shop_info_photo').hide();
        $('.edit_shop_info_photo_banner').hide();
        $('.edit_shop_photo_product').hide();
        $('.edit_shop_info_main__').hide();
        $('.edit_shop_info_main__social').hide();
        $('.check_cost_ship').hide();
        $('.write_good_review').hide();
        $('.return_warranty_info').hide();
        $('.delivery_option_info').hide();
        $('.wrong_info_report_card').hide();
        $('.others_order_details_card').hide();
        $('.pro_details_card_pro_bottom').hide();
        $('.home_alert_class_one').hide();
        $('.sub_category_hover_list').hide();
        $('.add_shop_info').hide();
    }



    $('#add_shop_form').submit(function(e) {
        e.preventDefault();
        $('#loading_button_mobile').show();
        $('#sbmit_btn_shop_info').hide();
        //var info = $(this).serialize();
        var info = new FormData(this);
        //console.log(info);

        $.ajax({
            type: 'POST',
            url: '../store/store_add_program.php',
            data: info,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(response) {
                $('#loading_button_mobile').hide();
                $('#sbmit_btn_shop_info').show();
                toastrOption();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                    toastr.success(response.message);
                }
            }
        });
    });


    $('#payment_info_edit_store').submit(function(e) {
        e.preventDefault();
        $('#loading_button_mobile').show();
        $('#sbmit_btn_shop_info').hide();
        var info = $(this).serialize();
        //var info = new FormData(this);
        console.log(info);

        $.ajax({
            type: 'POST',
            url: '../store/store_payment_info_edit.php',
            data: info,
            //processData: false,
            // contentType: false,
            dataType: 'json',
            success: function(response) {
                $('#loading_button_mobile').hide();
                $('#sbmit_btn_shop_info').show();
                toastrOption();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    setTimeout(function() {
                        location.reload();
                    }, 2000);
                    toastr.success(response.message);
                }
            }
        });
    });


    $(document).ready(function() {

        filter_data();

        function filter_data() {

            var action = 'fetch_data';
            var category_id = get_category_id;
            var sub_category_id = get_sub_category_id;
            var sub_category_2_id = get_sub_category_2_id;
            var brand_id = get_brand_id;
            var manufacturer_id = get_manufacturer_id;
            var store_id = get_store_id;
            var sorting = get_filter('sorting');
            var stock = get_filter('stock');
            var brand = get_filter('brand');
            var star = get_filter('star');
            var category = get_filter('category');
            var sub_category = get_filter('sub_category');
            var sub_category_2 = get_filter('sub_category_2');
            var minimum_price = $('#hidden_minimum_price').val();
            var maximum_price = $('#hidden_maximum_price').val();
            var minimum_price = $('.min_price').val();
            var maximum_price = $('.max_price').val();

            $.ajax({
                url: "../product/filter_products.php",
                method: "POST",
                data: { action: action, store_id: store_id, stock: stock, sub_category_2_id: sub_category_2_id, star: star, sub_category_id: sub_category_id, sub_category_2: sub_category_2, sorting: sorting, brand_id: brand_id, manufacturer_id: manufacturer_id, category_id: category_id, sub_category: sub_category, category: category, minimum_price: minimum_price, maximum_price: maximum_price, brand: brand },
                success: function(data) {
                    $('.load_data_table.cat').html(data);
                    $('.spinner_load').hide();
                }
            });
        }

        function get_filter(class_name) {
            var filter = [];
            $('.' + class_name + ':checked').each(function() {
                filter.push($(this).val());
            });
            return filter;
        }

        $('.common_selector').click(function() {
            filter_data();
        });

        $('#price_range').slider({
            range: true,
            min: 100,
            max: 5000,
            values: [100, 5000],
            step: 50,
            stop: function(event, ui) {
                $('#price_show').html('<b>Price</b> ' + ui.values[0] + ' - ' + ui.values[1]);
                $('#hidden_minimum_price').val(ui.values[0]);
                $('#hidden_maximum_price').val(ui.values[1]);
                filter_data();
            }
        });

        $(document).on('click', '#btn_price', function(e) {
            e.preventDefault();
            filter_data();
        });

    });


    $('.deliver_info_form').submit(function(e) {
        e.preventDefault();
        $('#loading_button_mobile').show();
        $('#submit_btn_del_modify').hide();
        //var info = $(this).serialize();
        var info = new FormData(this);

        $.ajax({
            type: 'POST',
            url: '../store/deliver_info_modify.php',
            data: info,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                $('#loading_button_mobile').hide();
                $('#submit_btn_del_modify').show();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                    get_modified_info();
                }
            }
        });
        get_modified_info();
    });



    function get_modified_info() {
        $('.spinner_load').show();
        $.ajax({
            type: 'POST',
            url: '../store/get_delivery_info.php',
            dataType: 'json',
            success: function(response) {
                $('.spinner_load').hide();
                $('#get_modified_info').html(response);
            }
        });
    }
    get_modified_info();


    /*Product Add Start */

    function getMainCat() {
        $.ajax({
            type: 'POST',
            url: '../store/get_main_category.php',
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
                url: '../store/get_sub_category_3.php',
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
                url: '../store/get_sub_category_2.php',
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


    $('.new_product_store_form').submit(function(e) {
        e.preventDefault();
        $('#loading_button_mobile').show();
        $('#upload_pro_store').hide();
        //var info = $(this).serialize();
        var info = new FormData(this);
        $.ajax({
            type: 'POST',
            url: '../store/products_add.php',
            data: info,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                $('#loading_button_mobile').hide();
                $('#upload_pro_store').show();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                }
            }
        });
    });


    $('#select_product_option_edit, .select_product_option_edit').on('change', function() {
        var id = $(this).val();
        $('#warranty_no , #return_no, .more_photo_pro_, .photo_pro_, .other_title__').hide();
        $('#upload_pro_store').html('Update');
        $('#product_id_photo_edit').val(id);
        $('#pro_id_up_img').val(id);
        $('#photo').removeAttr('required', '');
        $('#product_info_edit').removeAttr('class');
        $('#sbmit_btn_shop_photo').show();
        $('#submit_edit_product_img').show();
        $('#double_activity_form').attr('name', 'edit_product');
        //$('#product_info_edit').toggleClass('new_product_store_form').addClass('new_product_store_form_edit');
        $('#product_info_edit').css({
            'width': '85%',
            'margin': '0 auto',
            'background': '#fff',
            'padding': '20px',
            'border-radius': '7px'
        });
        $('#warranty_yes, #return_yes').show().addClass('col-sm-3').removeClass('col-sm-2');

        getRowProducts(id);
    });

    function getRowProducts(id) {
        $.ajax({
            type: 'POST',
            url: '../store/products_row.php',
            data: { id: id },
            dataType: 'json',
            success: function(response) {
                $('#product_id').val(response.prodid);
                $('#product_name').val(response.prodname);
                $('#product_name_photo_edit').val(response.prodname);
                $('#model').val(response.model);
                $('#brand').val(response.manufacturer_id);
                $('#color').val(response.color);
                $('#lenth').val(response.length);
                $('#weight').val(response.weight);
                $('#width').val(response.width);
                $('#cash_on_delivery').val(response.cash_on_delivery);
                $('#home_delivery').val(response.home_delivery);
                $('#width').val(response.width);
                $('#width').val(response.width);
                $('#height').val(response.height);
                $('#sku').val(response.sku);
                $('#pro_status').val(response.pro_status);
                $('#pinned').val(response.pinned_product);
                $('#old_price').val(response.old_price);
                $('#quantity').val(response.product_quantity);
                $('#quantity2').val(response.product_quantity);
                $('#tag').val(response.tag);
                $('#free_shopping').val(response.product_free_shopping);
                $('#free_shipping').val(response.shipping_cost);
                $('#lenth_type').val(response.length_type);
                $('#weight_type').val(response.weight_type);
                $('#add_warranty').val(response.warranty);
                $('#add_return').val(response.product_return);
                $('.cat1').val(response.category_id);
                var cat_id = response.category_id;
                var sub_cat_id = response.sub_category_id;
                var sub_cat_2_id = response.sub_category_2_id;

                $.ajax({
                    type: 'POST',
                    url: '../store/get_sub_category_2.php',
                    data: 'cat_1=' + cat_id,
                    dataType: 'json',
                    success: function(response_cat) {
                        $('#cat_2').html(response_cat);
                        $('.cat2').val(sub_cat_id);
                    }
                });

                $.ajax({
                    type: 'POST',
                    url: '../store/get_sub_category_3.php',
                    data: 'cat_2=' + sub_cat_id,
                    dataType: 'json',
                    success: function(response_sub_cat) {
                        $('#cat_3').html(response_sub_cat);
                        $('.cat3').val(sub_cat_2_id);
                    }
                });

                $('#edit_store').val(response.store_id);
                $('#price').val(response.price);

                specificationEditor.setData(response.specification);
                descriptionEditor.setData(response.description);
                // $('#specification').val($(response.specification).text());
                // $('#description').val($(response.description).text());
                //CKEDITOR.instances["description"].setData(response.description);
                //CKEDITOR.instances["specification"].setData(response.specification);

            }
        });
    }


    $('#product_info_edit').submit(function(e) {
        e.preventDefault();
        $('#loading_button_mobile').show();
        $('#upload_pro_store').hide();
        //var info = $(this).serialize();
        var info = new FormData(this);
        $.ajax({
            type: 'POST',
            url: '../store/products_edit.php',
            data: info,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                $('#loading_button_mobile').hide();
                $('#upload_pro_store').show();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                }
            }
        });
    });


    /*Product Add End */

    $(document).on('click', '.edit_delivery_info', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        $('#country_body, #city_body, #area_body').hide();
        $('.deliver_info__edit').html('Modify Info');
        $('#country, #city, #area').removeAttr('name');
        $('#ship_cost_body').removeClass('col-6').addClass('col-12');
        $('#place_modify').removeClass();
        window.location = ('#delivery_place_info___');
        getRowDelivery(id);
    });


    function getRowDelivery(id) {
        $.ajax({
            type: 'POST',
            url: 'deliver_info_each_row.php',
            data: { id: id },
            dataType: 'json',
            success: function(response) {
                $('#ship_cost').val(response.ship_cost);
                $('#value_id').val(response.id);
                $('#ship_time').val(response.ship_time);
                $('#pod').val(response.pod);
                $('#cod').val(response.cod);
            }
        });
    }

    $('#place_modify').submit(function(e) {
        e.preventDefault();
        $('#loading_button_mobile').show();
        $('#submit_btn_del_modify').hide();
        var info = $(this).serialize();
        //var info = new FormData(this);
        $.ajax({
            type: 'POST',
            url: '../store/deliver_info_modify_edit.php',
            data: info,
            //processData: false,
            //contentType: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                $('#loading_button_mobile').hide();
                $('#submit_btn_del_modify').show();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                    get_modified_info();
                }
            }
        });
        get_modified_info();
    });

    $(document).ready(function() {
        $("#place_search_all").on("keyup", function() {
            var value = $(this).val().toLowerCase();
            $("#get_modified_info #search_palce_card").filter(function() {
                $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });


    $('#product_info_edit_photo').submit(function(e) {
        e.preventDefault();
        $('#loading_button_mobile').show();
        $('#sbmit_btn_shop_photo').hide();
        //var info = $(this).serialize();
        var info = new FormData(this);
        $.ajax({
            type: 'POST',
            url: '../store/products_photo_add.php',
            data: info,
            processData: false,
            contentType: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                $('#loading_button_mobile').hide();
                $('#sbmit_btn_shop_photo').show();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                    getPrevPhoto();
                }
            }
        });
    });

    function getPrevPhoto() {
        $('.spinner_load_del').show();
        $.ajax({
            type: 'POST',
            url: '../store/get_all_pro_photo.php',
            dataType: 'json',
            success: function(response) {
                $('.spinner_load_del').hide();
                $('#show_previous_photo').html(response);
            }
        });
    }
    getPrevPhoto();

    $(document).on('click', '.delete_photo', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        deletePhoto(id);
    });

    function deletePhoto(id) {
        $.ajax({
            type: 'POST',
            url: '../store/delete_pro_photo.php',
            data: { id: id },
            dataType: 'json',
            success: function(response) {
                toastrOption();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                    getPrevPhoto();
                }
            }
        });
    }
    $(document).on('click', '.order_payment_click.bKash', function(e) {
        $("input[value='Bkash-Payment']").prop("checked", true);
        $("input[value='Online-Payment']").prop("checked", false);
        $("input[value='Cash-On-Delivery']").prop("checked", false);
        $("input[value='DBBL-Payment']").prop("checked", false);

    });

    $(document).on('click', '.order_payment_click.dbbl', function(e) {
        $("input[value='DBBL-Payment']").prop("checked", true);
        $("input[value='Bkash-Payment']").prop("checked", false);
        $("input[value='Online-Payment']").prop("checked", false);
        $("input[value='Cash-On-Delivery']").prop("checked", false);

    });
    $(document).on('click', '.order_payment_click.online', function(e) {
        $("input[value='Online-Payment']").prop("checked", true);
        $("input[value='Bkash-Payment']").prop("checked", false);
        $("input[value='DBBL-Payment']").prop("checked", false);
        $("input[value='Cash-On-Delivery']").prop("checked", false);
    });
    $(document).on('click', '.order_payment_click.cash', function(e) {
        $("input[value='Cash-On-Delivery']").prop("checked", true);
        $("input[value='Bkash-Payment']").prop("checked", false);
        $("input[value='DBBL-Payment']").prop("checked", false);
        $("input[value='Online-Payment']").prop("checked", false);
    });


    $(document).on('click', '#add_photo_option', function(e) {
        $(".edit_shop_photo_product").show();
    });

    $(document).on('click', '.more_order_history', function(e) {
        var id = $(this).data('id');
        //alert(id);
        $(".dropdown-menu.order_history_" + id).toggle();
    });


    //$(document).on('click', '#submit_edit_product_img', function(e){
    $('.edit_select_product_photo').submit(function(e) {
        e.preventDefault();
        var info = new FormData(this);
        $.ajax({
            url: '../store/photo_product_main.php',
            type: 'POST',
            data: info,
            contentType: false,
            processData: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                    setTimeout(function() {
                        location.reload();
                    }, 2000);

                }
            }
        })
    });


    function getProduct() {
        $.ajax({
            type: 'POST',
            url: '../product/get_products_select.php',
            dataType: 'json',
            success: function(response) {
                $('#select_product_option_edit').html(response);
                $('.select_product_option_edit').html(response);
            }
        });
    }
    getProduct();


    function getTopDept() {
        $.ajax({
            type: 'POST',
            url: '../footer/top_dept.php',
            dataType: 'json',
            success: function(response) {
                $('#get_top_dept').html(response);
            }
        });
    }
    getTopDept();

    function getSocialURL() {
        $.ajax({
            type: 'POST',
            url: '../footer/social_url.php',
            dataType: 'json',
            success: function(response) {
                $('.social_url').html(response.social);
                $('.about_shop').html(response.about);
                $('.footer_img_head').html(response.logo);
                $('.main_logo_title').html(response.main_title);
                $('.email_shop').html(response.email);
                $('.mobile_shop').html(response.mobile);
                $('.address_shop').html(response.address);
                $('.slogan_shop').html(response.slogan);
                $('.mobile_note').html(response.mobile_note);
                $('.email_note').html(response.email_note);
                $('.name_shop').html(response.name);
            }
        });
    }
    getSocialURL();

    function getBestSell() {
        $.ajax({
            type: 'POST',
            url: '../footer/best_selling.php',
            dataType: 'json',
            success: function(response) {
                $('#get_best_selling').html(response);
            }
        });
    }
    getBestSell();

    function getCatBrand() {
        $.ajax({
            type: 'POST',
            url: '../footer/cat_brand.php',
            dataType: 'json',
            success: function(response) {
                $('#get_cat_brand').html(response);
            }
        });
    }
    getCatBrand();

    function getBigCategory() {
        $.ajax({
            type: 'POST',
            url: '../product/get_big_categories.php',
            dataType: 'json',
            success: function(response) {
                $('.spinner_load').hide();
                $('.big_category_view').html(response);
            }
        });
    }
    getBigCategory();

    function getGreatDeal() {
        $.ajax({
            type: 'POST',
            url: '../product/get_great_deals.php',
            dataType: 'json',
            success: function(response) {
                $('.spinner_load').hide();
                $('.great_deals_view').html(response);
            }
        });
    }
    getGreatDeal();

    function getTodayDeal() {
        $.ajax({
            type: 'POST',
            url: '../product/get_todays_deals.php',
            dataType: 'json',
            success: function(response) {
                $('.spinner_load').hide();
                $('.todays_deals_view').html(response);
            }
        });
    }
    getTodayDeal();

    function getPremiumDeal() {
        $.ajax({
            type: 'POST',
            url: '../product/get_premium_deals.php',
            dataType: 'json',
            success: function(response) {
                $('.spinner_load').hide();
                $('.premium_deals_view').html(response);
            }
        });
    }
    getPremiumDeal();

    /*
    $(document).ready(function(){
        var maxField = 10;
        var addButton = $('#add_new_social');
        var wrapper = $('#input_field_wrapper');
    	var new_input = '<div class="input-group mb-3" id="field_remove"><div class="input-group-prepend"><select class="custom-select" id="selected_social" name="selected_social[]"><option selected>Choose Social Media</option><option value="facebook">Facebook</option><option value="youtube">Youtube</option><option value="twitter">Twitter</option><option value="instragam">Instragam</option><option value="linkedin">Linkedin</option></select></div><input type="text" class="form-control" name="social[]" id="social"><a href="javascript:void(0);" class="btn btn-success" type="button" id="remove_button"><i class="fas fa-times"></i></a></div>';
    	
        var x = 1;
        $(addButton).click(function(){
            if(x < maxField){ 
                x++;
                $(wrapper).append(new_input);
            }
        });

        $(wrapper).on('click', '#remove_button', function(e){
            e.preventDefault();
            $(this).parent('#field_remove').remove();
            x--;
        });
    });
    */

    function getStoreOrder() {
        $.ajax({
            type: 'POST',
            url: '../store/get_store_orders.php',
            dataType: 'json',
            success: function(response) {
                $('.spinner_load').hide();
                $('#get_store_orders_info').html(response);
            }
        });
    }
    getStoreOrder();



    $(document).on('click', '.edit_status_request', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        var product = $(this).data('product');
        $('#order_id').val(id);
        $('#product_id').val(product);
        $('.get_order_id').html(' #' + id);
        $('#submit_btn_status_request').removeAttr('disabled');
        $('#submit_btn_status_request').show();
        $('.info_click').html('<i class="fas fa-check mr-2 text-success"></i>Now you can change order status.');
        $('.info_click').removeClass('text-danger').addClass('text-success');
        location.href = '#modified_form_order_status';
    });


    $('.order_status_info_form').submit(function(e) {
        e.preventDefault();
        $('#loading_button_mobile').show();
        $('#submit_btn_status_request').hide();
        var info = $(this).serialize();
        //var info = new FormData(this);
        $.ajax({
            type: 'POST',
            url: '../store/update_store_order_status.php',
            data: info,
            //processData: false,
            //contentType: false,
            dataType: 'json',
            success: function(response) {
                toastrOption();
                $('#loading_button_mobile').hide();
                if (response.error) {
                    toastr.error(response.message);
                    $('#submit_btn_status_request').show();
                } else {
                    setTimeout(function() {
                        location.reload();
                    }, 3000);
                    $('.info_click').hide();
                    toastr.success(response.message);
                }
            }
        });
    });

    $(document).ready(function() {
        $('#orders_status').on('change', function() {
            var status = $(this).val();
            var comment = 'Your order is ' + status + '.';
            $('.comment_value_view').val(comment);
        });
    });


    $(document).ready(function() {
        $("#main_search_bar").on("keyup", function() {
            var value = $(this).val();
            $.ajax({
                type: 'POST',
                url: '../search/save_keywords.php',
                data: { value: value },
                dataType: 'json',
                success: function(response) {
                    if (response.error) {

                    } else {

                    }
                }
            });
        });
    });

    //Availability
    $(document).on('click', '.common_selector.stock', function() {
        $('.reset_check_available').show();
    });

    $(document).on('click', '.reset_check_available', function() {
        $('.reset_check_available').hide();
        $("input[name='stock']").prop("checked", false);
        location.reload();
    });

    //sorting
    $(document).on('click', '.common_selector.sorting', function() {
        $('.reset_check_sorting').show();
    });

    $(document).on('click', '.reset_check_sorting', function() {
        $('.reset_check_sorting').hide();
        $("input[name='sorting']").prop("checked", false);
        location.reload();
    });

    //Brands
    $(document).on('click', '.common_selector.brand', function() {
        $('.reset_check_brand').show();
    });

    $(document).on('click', '.reset_check_brand', function() {
        $('.reset_check_brand').hide();
        $(".common_selector.brand").prop("checked", false);
        location.reload();
    });


    //store
    $(document).on('click', '.common_selector.store', function() {
        $('.reset_check_store').show();
    });

    $(document).on('click', '.reset_check_store', function() {
        $('.reset_check_store').hide();
        $(".common_selector.store").prop("checked", false);
        location.reload();
    });



    //Star
    $(document).on('click', '.common_selector.star', function() {
        $('.reset_check_star').show();
    });

    $(document).on('click', '.reset_check_star', function() {
        $('.reset_check_star').hide();
        $(".common_selector.star").prop("checked", false);
        location.reload();
    });



    //category
    $(document).on('click', '.common_selector.sub_category, .common_selector.category, .common_selector.sub_category_2', function() {
        $('.reset_check_category').show();
    });

    $(document).on('click', '.reset_check_category', function() {
        $('.reset_check_category').hide();
        $(".common_selector.sub_category").prop("checked", false);
        $(".common_selector.sub_category_2").prop("checked", false);
        $(".common_selector.category").prop("checked", false);
        location.reload();
    });


    /*
    if(screen.width < 960 ||
     navigator.userAgent.match(/Android/i) ||
     navigator.userAgent.match(/webOS/i) ||
     navigator.userAgent.match(/iPhone/i) ||
     navigator.userAgent.match(/iPod/i)) {
    	$('#body_two').removeClass('col-6').addClass('col-12');
    	$('#body_one').removeClass('col-9').addClass('col-12');
    	
    } else {
    	$('#body_two').removeClass('col-12').addClass('col-6');
    	$('#body_one').removeClass('col-12').addClass('col-9');
    }*/



    $(document).ready(function() {
        var setCookie = function(cname, cvalue, exdays) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = cname + "=" + cvalue + "; " + expires;
        }

        var getCookie = function(cname) {
            var name = cname + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1);
                if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
            }
            return "";
        }

        $(document).ready(function() {
            jQuery(".home_alert_class_two .close_btn, .home_alert_class_two .close_btn_wrapper").click(function() {
                jQuery(".home_alert_class_one").remove();
                setCookie("homeAlert", "closed", 1)
            });
        });
    });

    $(document).ready(function() {
        $('.home_alert_class_two .close_btn,.home_alert_class_two .close_btn_wrapper').on('click', function() {
            $(".home_alert_class_one").hide();
            //window.location.reload();
        });

        setTimeout(function() {
            $('.home_alert_class_one').removeClass('display_none');
        }, 15000);

        $('.home_alert_class_three').on('click', function() {
            $(".home_alert_class_one").show();
        });
    });

    $('.contact_form_class').submit(function(e) {
        e.preventDefault();
        var contactmsg = $(this).serialize();
        console.log(contactmsg);
        $('#loading_button_con').show();
        $('#con_submit_btn').attr('disabled', 'disabled');
        $.ajax({
            type: 'POST',
            url: '../about-us/contact_system.php',
            data: contactmsg,
            dataType: 'json',
            success: function(response) {
                console.log(response.message);
                toastrOption();
                $('#loading_button_con').hide();
                $('#con_submit_btn').removeAttr('disabled', 'disabled');
                if (response.error) {
                    toastr.error(response.message);
                } else {
                    toastr.success(response.message);
                }
            }
        })
    });

    var $temp = $("<input>");
    var $url = $(location).attr('href');

    $('.clipboard_url').on('click', function() {
        $(".pro_share_card_body").append($temp);
        $temp.val($url).select();
        document.execCommand("copy");
        $temp.remove();
        $(".url_copy_msg").show().text("Product URL copied!");
        setTimeout(function() {
            $('.url_copy_msg').hide();
        }, 3000);
    })

    $(document).on('click', '.remove_notice', function(e) {
        e.preventDefault();
        var id = $(this).data('id');
        var remove_notice = 'remove_notice';
        console.log(id);
        notifyDeleteUnread(remove_notice, id);
    });

    function notifyDeleteUnread(remove_notice, id) {
        $.ajax({
            type: 'GET',
            url: '../customer/notified.php',
            data: { remove_notice: remove_notice, id: id },
            dataType: 'json',
            success: function(response) {
                if (response.error) {
                    console.log('Error');
                } else {
                    console.log('Success');
                    getDetailsEmptyFetchNotify();
                    getNotification();
                }
            }
        })
    }

    // Add social media on store addition

    $(function() {
        $(document).ready(function() {
            $(document).on('click', "[name='face']", function(e) {
                console.log('click');
                $('#link_fac').toggle();
            });
            $(document).on('click', "[name='link']", function(e) {
                $('#link_lin').toggle();
            });
            $(document).on('click', "[name='yout']", function(e) {
                $('#link_you').toggle();
            });
            $(document).on('click', "[name='twit']", function(e) {
                $('#link_twi').toggle();
            });
            $(document).on('click', "[name='inst']", function(e) {
                $('#link_ins').toggle();
            });
        });
    });