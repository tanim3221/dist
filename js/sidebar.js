var sidebar = (function() {
    "use strict";

    var $contnet         = $('#content'),
        $sidebar         = $('#sidebar'),
        $sidebarBtn      = $('#sidebar-btn'),
        $toggleCol       = $('body').add($contnet).add($sidebarBtn),
        sidebarIsVisible = false;

    $sidebarBtn.on('click', function() {

        if (!sidebarIsVisible) {
            bindContent();
        } else {
            unbindContent();
        }

        toggleMenu();
    });


    function bindContent() {

        $contnet.on('click', function() {
            toggleMenu();
            unbindContent();
        });
    }

    function unbindContent() {
        $contnet.off();
    }

    function toggleMenu() {

        $toggleCol.toggleClass('sidebar-show');
        $sidebar.toggleClass('show');

        if (!sidebarIsVisible) {
            sidebarIsVisible = true;
        } else {
            sidebarIsVisible = false;
        }
    }


    var $menuToggle = $sidebar.find('.menu-toggle');

    $menuToggle.each(function() {

        var $this       = $(this),
            $submenuBtn = $this.children('.menu-toggle-btns').find('.menu-btn'),
            $submenu    = $this.children('.submenu');

        $submenuBtn.on('click', function(e) {
            e.preventDefault();
            $submenu.slideToggle();
            $(this).toggleClass('active');
        });
    });

})();