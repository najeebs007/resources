function batchListing(){debugger;
	
	var l_map = {};
	l_map.login = true;
	l_map.top = true;
	ajaxWithJSON("/tutor/batch-listing", l_map, 'POST', function(response) {
		var l_data = response.object;
		var status = response.status;
		if (response.status == 'SUCCESS') {
			setBatchData(l_data);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);

		}

	});
}

function  setBatchData(l_data){debugger;
	
	
	var b_html = "";
	$('.c_batches').html("");
	for (var i = 0; i < l_data.length; i++) {
		var b_map = l_data[i];
		
		//var b_map = r_map.batch;
		
		var batchStartTime= b_map.batchStartTime;
		var batchEndTime = b_map.batchEndTime;
		var totalNumberOfClasses = b_map.totalNumberOfClasses;
		var feeAmount = b_map.feeAmount;
		var batchMode = b_map.batchMode;
		var location = b_map.location;
		var enrollments= b_map.enrollment;
		var className= b_map.className;
		var subjectName= b_map.subjectName;
		var active= b_map.activeStudent;
		
	
		
		b_html += ' <div class="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-xs-6 parent"><div class="card border-img-top card-shadow">';
		   b_html += '   <div class="card-body batch-img-padding">';
	       b_html += '   <img src="resources/img/batch-img.png" class="b-img">';
		   b_html += ' </div>';
		   b_html += '	 <div class="card-body card-body-padding-batch">';
		   b_html += '  <span class="list-icon i-l" style="float: right; margin-top: -24px;"><i class="fa fa-check" aria-hidden="true"style="font-size:16px;color:white;"></i></span>';
		   b_html += '  <div class="row">';
		   b_html += '  <div class="col-lg-12">'; 
		   b_html += '	  <img src="resources/img/batch-list/users.png"> <span class="list-heading">' + batchStartTime+' </span>';
	   	   b_html += '    </div>';
		   b_html += '<div class="col-lg-12 m-t-10">';
		   b_html += '	  <img src="resources/img/batch-list/classes.png"> <span class="list-text">Class | Subject :  <strong class="bold">'+ className +'  / '+ subjectName +'</strong></span>';
		   b_html += '   </div>';
		    b_html += '	<div class="col-lg-12 m-t-10">';
			b_html += '	  <img src="resources/img/batch-list/list.png"> <span class="list-text">Enrollment :  <strong class="bold">'+ enrollments +'</strong></span>';
			  b_html += '   </div>';
		    b_html += '<div class="col-lg-12 m-t-10">';
			b_html += '	  <span class="list-icon"><i class="fa fa-check" aria-hidden="true"style="font-size:10px;color:white;"></i></span> <span class="list-text" style="color:#3cb878;">Active Student : '+ active +'</span>';
			  b_html += '   </div>';
		    b_html += '	<div class="col-lg-12 m-t-10">';
			b_html += '	  <span   ><i class="fas fa-clock" aria-hidden="true"style="font-size:15px;color:#928484;"></i></span> <span class="list-text">' + batchStartTime+' To '+ batchEndTime+'</span>';
			  b_html += '    </div>';
		    b_html += '  </div>';
		  b_html += '	 </div>  ';
		 b_html += '   </div> ';
		
		
		b_html += ' <div class="card card-on-hover">';
		b_html += ' <div class="card-body batch-img-padding-hover">';
		b_html += ' <img src="resources/img/batch-img.png" class="b-img">';
		b_html += '	</div>';
		b_html += ' <div class="card-body card-body-padding-batch">';
		b_html += '	<span class="list-icon i-l" style="float: right; margin-top: -34px;"><i class="fa fa-check" aria-hidden="true"style="font-size:16px;color:white;"></i></span>';
		b_html += '	<div class="row">';
		b_html += '	<div class="col-lg-12">';
		b_html += '	<img src="resources/img/batch-list/users.png"> <span class="list-heading">' + batchStartTime+' </span>';
		b_html += '	</div>';
		b_html += '	<div class="col-lg-12 m-t-10">';
		b_html += '	<img src="resources/img/batch-list/classes.png"> <span class="list-text">Class | Subject :  <strong class="bold">'+ className +'  / '+ subjectName +'</strong></strong></span>';
	    b_html += '	</div>';
	    b_html += '	<div class="col-lg-12 m-t-10">';
		b_html += '	<img src="resources/img/batch-list/list.png"> <span class="list-text">Enrollment :  <strong class="bold">'+ enrollments +'</strong></span>';
		b_html += ' </div>';
		b_html += '	<div class="col-lg-12 m-t-10">';
		b_html += '	<span class="list-icon"><i class="fa fa-check" aria-hidden="true"style="font-size:10px;color:white;"></i></span> <span class="list-text" style="color:#3cb878;">Active Student : '+ active +'</span>';
		b_html += ' </div>';
		b_html += '	<div class="col-lg-12 m-t-10">';
		b_html += ' <span   ><i class="fas fa-clock" aria-hidden="true" style="font-size:15px;color:#928484;"></i></span> <span class="list-text">' + batchStartTime+' To '+ batchStartTime +'</span>';
		b_html += '	</div>';
		b_html += '	<div class="col-lg-12 m-t-10">';
		b_html += '	<img src="resources/img/batch-list/classes.png"> <span class="list-text"> ' + totalNumberOfClasses + ' out of '+ totalNumberOfClasses + ' class complete'+' </span>';
		b_html += ' </div>';
		b_html += '	<div class="col-lg-12 m-t-10">';
		b_html += ' <img src="resources/img/batch-list/fee.png"> <span class="list-text"> Fee Per Student : &#8377; ' + feeAmount + ' </span>';
		b_html += ' </div>';
		b_html += ' <div class="col-lg-12 m-t-10">';
		b_html += '	<i class="fas fa-dot-circle" style="font-size:15px;color:#928484;"></i><span class="list-text">  Mode : '+ batchMode + '</span>';
		b_html += ' </div>';
		b_html += '	<div class="col-lg-12 m-t-10">';
		b_html += '	<i class="fas fa-map-marker" style="font-size:15px;color:#928484;"></i> <span class="list-text">Location : '+ location +'</span>';
		b_html += ' </div>';
		b_html += '	<div class="col-lg-12 m-t-10">';
		b_html += '	<button type="button" class="btn btn-primary">View complete Details</button> <button type="button" class="btn btn-danger">View Students</button>';
		b_html += ' </div>';
		b_html += ' </div>';
		b_html += ' </div>';
		b_html += ' </div></div>'; 
		
	}
	$('.c_batches').html(b_html);
	
	
	
}


function batchDays(p_flag){
	   if(p_flag=='weekend'){
	    if($('#i_weekend').is(':checked')){
	     $('input:checkbox[name=SUNDAY]').attr('checked',true);
	     $('input:checkbox[name=SATURDAY]').attr('checked',true);
	    }else{
	     $('input:checkbox[name=SUNDAY]').attr('checked',false);
	     $('input:checkbox[name=SATURDAY]').attr('checked',false);
	    }
	    //$('input:checkbox[name=checkme]').is(':checked');
	    
	   }
	            if(p_flag=='weekdays'){
	    
	             if($('#i_weekdays').is(':checked')){
	     $('input:checkbox[name=MONDAY]').attr('checked',true);
	     $('input:checkbox[name=TUESDAY]').attr('checked',true);
	     $('input:checkbox[name=WEDNESDAY]').attr('checked',true);
	     $('input:checkbox[name=THURSDAY]').attr('checked',true);
	     $('input:checkbox[name=FRIDAY]').attr('checked',true);
	    }else{
	     $('input:checkbox[name=MONDAY]').attr('checked',false);
	     $('input:checkbox[name=TUESDAY]').attr('checked',false);
	     $('input:checkbox[name=WEDNESDAY]').attr('checked',false);
	     $('input:checkbox[name=THURSDAY]').attr('checked',false);
	     $('input:checkbox[name=FRIDAY]').attr('checked',false);
	    }
	   }
	            if(p_flag=='MWF'){
	    if($('#i_mwf').is(':checked')){
	     $('input:checkbox[name=MONDAY]').attr('checked',true);
	     $('input:checkbox[name=WEDNESDAY]').attr('checked',true);
	     $('input:checkbox[name=FRIDAY]').attr('checked',true);
	    }else{
	     $('input:checkbox[name=MONDAY]').attr('checked',false);
	     $('input:checkbox[name=WEDNESDAY]').attr('checked',false);
	     $('input:checkbox[name=FRIDAY]').attr('checked',false);
	    }
	    //$('input:checkbox[name=checkme]').is(':checked');
	    
	   }
	            if(p_flag=='TTS'){
	    if($('#i_tts').is(':checked')){
	     $('input:checkbox[name=TUESDAY]').attr('checked',true);
	     $('input:checkbox[name=THURSDAY]').attr('checked',true);
	     $('input:checkbox[name=SATURDAY]').attr('checked',true);
	    }else{
	     $('input:checkbox[name=TUESDAY]').attr('checked',false);
	     $('input:checkbox[name=THURSDAY]').attr('checked',false);
	     $('input:checkbox[name=SATURDAY]').attr('checked',false);
	    }
	    //$('input:checkbox[name=checkme]').is(':checked');
	    
	   }
	  }
