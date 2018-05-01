/**
 * 
 */

function requiredAllField(formId){
	
	$("#"+formId).validate({
	    ignore: ":hidden"
	});
}

function requiredField(FieldClasses,messageClass){

	for (i = 0; i < FieldClasses.length; i++) {
         
		 if($('.'+FieldClasses[i]).val() == null || $('.'+FieldClasses[i]).val() == undefined || $('.'+FieldClasses[i]).val() == "") {
			 $('.'+messageClass).val() 
			 return;
		 }
          
	}
}



function validateForms(formId,errorClass,isToaster){
	
    $("form#"+formId+":input").each(function(){
    	 var input = $(this); // This is the jquery object of the input, do what you will
    	 
   	     if((input.attr('for') == 'tel'))
         {
          alert((input.val()== ''));
         }
	    if((input.attr('for') == 'text'))
        {
          alert((input.val()== ''));
        }
    	  if((input.attr('for') == 'button'))
    	        {
    	            alert((input.val()== ''));
    	        }
    	  if((input.attr('for') == 'checkbox'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'color'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'date'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'datetime-local'))
	        {
	            alert((input.val()== ''));
	        }
    	  
    	  if((input.attr('for') == 'email'))
	        {
	            alert((input.val()== ''));
	        }
    	  
    	  
    	  if((input.attr('for') == 'file'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'hidden'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'image'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'month'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'number'))
	        {
	            alert((input.val()== ''));
	        }
    	  
    	  if((input.attr('for') == 'password'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'radio'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'range'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'reset'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'search'))
	        {
	            alert((input.val()== ''));
	        }
    	  
    	  
    	  if((input.attr('for') == 'submit'))
	        {
	            alert((input.val()== ''));
	        }

    	  if((input.attr('for') == 'time'))
	        {
	            alert((input.val()== ''));
	        }
    	  if((input.attr('for') == 'url'))
	        {
	            
	                if(/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(input.val())){
	                	return true
	                }
	                $('#'+errorId).html("not a valid url!");
	                return false;
	           
	        }
    	  
    	  if((input.attr('for') == 'week'))
	        {
	            alert((input.val()== ''));
	        }
    	});
}