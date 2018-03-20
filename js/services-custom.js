



jQuery(document).ready(function($) {

    "use strict";

    // Home Slider

    $('#slider').flexslider({
        animation: "slide"
    });

    // Select Box Replacements

    $('select').selectBox({
        mobile: true,
        menuSpeed: 'fast'
    });

    // Accordions

    $( ".accordion" ).accordion({
        heightStyle: "content",
        collapsible: true
    });

    // Area Range

    $( "#area-range" ).slider({
        range: true,
        min: 0,
        max: 1000,
        values: [ 500, 800 ],
        slide: function( event, ui ) {
            $( "#area" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
        }
    });
    $( "#area" ).val( $( "#area-range" ).slider( "values", 0 ) + " - " + $( "#area-range" ).slider( "values", 1 ) );

    // Price Range

//    $( "#price-range" ).slider({
//        range: true,
//        min: 10000,
//        max: 100000,
//        values: [ 30000, 50000 ],
//        slide: function( event, ui ) {
//            $( "#price" ).val( ui.values[ 0 ] + " - " + ui.values[ 1 ] );
//        }
//    });
//    $( "#price" ).val( $( "#price-range" ).slider( "values", 0 ) + " - " + $( "#price-range" ).slider( "values", 1 ) );

    // Checkbox Replacements

    $('input.checkbox').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
        increaseArea: '20%'
    });

    // Gallery Grid

    $('.grid').masonry({
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
        gutter: 0
    });

    // Counter

    $(function() {
        var value;
        $('.counter span').appear();
        $(document.body).on('appear', '.counter span', function(e, $affected) {
            $affected.each(function() {
                value = $(this).data('fact');
                $(this).animateNumbers( value, false, 1000, "easeOutBounce" );
            });
        });
    });

    $('.animated').appear();
	var footerMargin=$('footer#colophon').height(); $('#main').css( 'margin-bottom',footerMargin+'px');
	$(window).resize(function(e) {
	var footerMargin=$('footer#colophon').height(); $('#main').css( 'margin-bottom',footerMargin+'px');	
	});

});



    /* ======= Toggle between Signup & Login & ResetPass Modals ======= */ 
    $('#signup-link').on('click', function(e) {
        //$('#login-modal').modal('toggle');
        $('#signup-modal').show();
		$('#login-modal').hide();
		$('#Recet-modal').hide();
        
       
    });
    
    $('.login-link').on('click', function(e) {
        //$('#signup-modal').modal('toggle');
        $('#login-modal').show();
		$('#signup-modal').hide();
		 $('#Recet-modal').hide();
        
       
    });
    
	
	 $('#Recet-link').on('click', function(e) {
        //$('#signup-modal').modal('toggle');
        $('#Recet-modal').show();
		$('#signup-modal').hide();
		 $('#login-modal').hide();
        
       
    });
	




jQuery(document).ready(function($) {
	
$('body').scrollspy({target: ".navbar"})

  });
	
	
 //   $('#back-to-login-link').on('click', function(e) {
//        $('#resetpass-modal').modal('toggle');
//        $('#login-modal').modal();
//        
//        e.preventDefault();
//    });
//    
//    $('#resetpass-link').on('click', function(e) {
//        $('#login-modal').modal('hide');
//        e.preventDefault();
//    });
//    


/* ======= Style Switcher (REMOVE ON YOUR PRODUCTION SITE) ======= */
    
    $('#config-trigger').on('click', function(e) {
        var $panel = $('#config-panel');
        var panelVisible = $('#config-panel').is(':visible');
        if (panelVisible) {
            $panel.hide();          
        } else {
            $panel.show();
        }
        e.preventDefault();
    });
    
    $('#config-close').on('click', function(e) {
        e.preventDefault();
        $('#config-panel').hide();
    });
    
    
    $('#color-options a').on('click', function(e) { 
        var $styleSheet = $(this).attr('data-style');
		$('#theme-style').attr('href', $styleSheet);	
				
		var $listItem = $(this).closest('li');
		$listItem.addClass('active');
		$listItem.siblings().removeClass('active');
		
		e.preventDefault();
		
	});
	

 /* ======= Toggle between Signup & Login & ResetPass Modals ======= */ 
	

  $('#edu-button').on('click', function() {
	
        $('#edu').css('display', 'block');
        $('#genaral').css("display", 'none');
		 $('#pro').css("display", 'none');
		  $('#contact').css("display", 'none');
        
       
    });


    $('#pro-button').on('click', function() {
        $('#pro').css('display', 'block');
       $('#edu').css("display", 'none');
        $('#genaral').css("display", 'none');
		  $('#contact').css("display", 'none');
        
       
    });
    
    $('#contact-button').on('click', function() {
        $('#contact').css('display', 'block');
        $('#pro').css("display", 'none');
       $('#edu').css("display", 'none');
        $('#genaral').css("display", 'none');
        
     
    });
    


    $('#add_more').on('click', function() {
	
        $('#add_more_fld').toggle('');
               
       
    });
  
	
    $('#cer_add_more').on('click', function() {
	
        $('#cer_add_more_fld').toggle('');
               
       
    });
  
   $('#pro_add_more').on('click', function() {
	
        $('#pro_add_more_fld').toggle('');
               
       
    });
	
	   $('#con_add_more').on('click', function() {
	
        $('#con_add_more_fld').toggle('');
               
       
    });
	
	

	
