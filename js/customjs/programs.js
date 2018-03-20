/**
 * 
 */

function getPrograms(param){
	
	alert(param);
	$.ajax({
			 
			 type:'GET',
			 url:"programlist",
			 data:{programName:param},
	         success:function(res){
	        	 $(".add").html(res);
	        	 alert(res);
	        	
	        	 },
		  error: function(jqXHR, textStatus, errorThrown) {
       	    alert("error:" + textStatus + " exception:" + errorThrown);
       	    }
	 });
	
}