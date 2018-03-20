/**
 * 
 */
//var g_map ={};
var g_map = new Map();
function addToPackage(count){
	$('.c_errorPackage').html("");
	if ("examId"+count in g_map)
	{
		toastr.error('Already added this Exam!.');
		//$('.c_errorPackage').html("Already added this Exam!");
	   return false;
	}
	g_map["examId"+count] = $('.c_examId'+count).val();
	g_map["eName"+"examId"+count] = $('.c_examName'+count).val();
	var removeClass = 'c_remove'+count;
	var removeFromMap = "examId"+count;
    $('.c_titles').append('<div class="c_remove'+count+'"><h5 class="card-title">'+$('.c_examName'+count).val()+'</h5><h6><span style="color:red">Price:<i class="fa fa-rupee"></i>'+$('.c_price'+count).val()+'</span></h6><a href="#" onclick="removeExam(\''+removeClass+'\',\''+removeFromMap+'\',\''+count+'\')"><span class="glyphicon glyphicon-remove" style="float:right;margin-top:-50px;color: #ff000096;"></span></a></div>');
   
    var l_add = $('.c_price'+count).val();
    var l_totalExam = $('.c_totalExam').val();
    var l_total = $('.c_totalPrice').val();
    var l_finalTotalExam = parseInt(l_totalExam)+1;
    $('.c_totalExam').val(l_finalTotalExam);
    var l_finalTotalPrice = parseFloat(l_add) + parseFloat(l_total);
    $('.c_totalPrice').val(l_finalTotalPrice);
    
}
function removeExam(examRemoveClass,removeFromMap,count){
	$('.c_errorPackage').html("");
	$('.'+examRemoveClass.trim()).remove();
	delete g_map[removeFromMap];
	delete g_map["eName"+removeFromMap];
	var l_totalExam = parseInt($('.c_totalExam').val());
	var l_totalPrice = parseFloat($('.c_totalPrice').val()) - parseFloat($('.c_price'+count).val());
	$('.c_totalExam').val(parseInt( $('.c_totalExam').val()) - 1);
	$('.c_totalPrice').val(l_totalPrice);
}

$(".c_savePackage").click(function(){debugger;
	
	$('.c_errorPackage').html("");
	if($('.c_packageName').val() == ""){
		toastr.error('Enter your package name.');
		//$('.c_errorPackage').html("Enter your package name!");
		return false;
	}
	if($('.c_totalExam').val() == '0'){
		//$('.c_errorPackage').html("Add at least one exam in package!");
		toastr.error('Add at least one exam in package.');
		return false;
	}
	g_map.price = $('.c_totalPrice').val();
	g_map.packageName = $('.c_packageName').val(); 
	g_map ["status"] = "PENDING";
	g_map.validity = $('.c_validity').val();
	g_map ["source"] = "SAVE";
	alert(JSON.stringify(g_map));
	$(".loading").show();
	$.ajax({

		type : 'POST',
		url : "/common/save-customize-package",
		data : JSON.stringify(g_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		success : function(response) {
        if(response.status == 'SUCCESS'){
         
        	$('.c_packageName').val('')
            $('.c_titles').html('');
            $('.c_totalExam').val('0');
            $('.c_totalPrice').val('0');
           // $('.c_successPackage').html("Package added successfully!");
            toastr.success('Package added successfully.');
        }
          if(response.status == 'EXIST'){
        	 // $('.c_errorPackage').html("Package Name already in use by you!");
        	  toastr.error('Package Name already in use by you.');
          }
          if(response.status == 'FAIL'){
        	 // $('.c_errorPackage').html("There is some error Package cann't be save!");
        	  toastr.error('There is some error Package can not be save.');
          }
          $(".loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			//alert("error:" + textStatus + " exception:" + errorThrown);
			//alert("error is not saved due to some technical issues!");
	        	  $('.c_errorPackage').html("There is some error Package cann't be save!");
	        	  $(".loading").hide();
	        	  toastr.error('There is some error Package can not be save.');
	          
		}
	});
   
});

$(".c_savePackageWithCart").click(function(){
	   
	$('.c_errorPackage').html("");
	if($('.c_packageName').val() == ""){
		toastr.error('Enter your package name.');
		//$('.c_errorPackage').html("Enter your package name!");
		return false;
	}
	if($('.c_totalExam').val() == '0'){
		//$('.c_errorPackage').html("Add at least one exam in package!");
		toastr.error('Add at least one exam in package.');
		return false;
	}
	
	g_map.packageName = $('.c_packageName').val(); 
	g_map.price = $('.c_totalPrice').val();

	g_map ["status"] = "PENDING";
	g_map.validity = $('.c_validity').val();
	g_map ["source"] = "CART";
	g_map ["productType"] = "CUSTOM";
	$(".loading").show();
	$.ajax({

		type : 'POST',
		url : "/common/save-customize-package",
		data : JSON.stringify(g_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		success : function(response) {
	      if(response.status == 'SUCCESS'){
	    	  
	    	  $(".loading").hide();
	          window.location.reload(true);
	    	      $('.c_packageName').val('')
	    	      $('.c_titles').html('');
	              $('.c_totalExam').val('0');
	              $('.c_totalPrice').val('0');
	              //$('.c_successPackage').html("Package added successfully!");
	              toastr.success('Package added successfully.');
	      }
          if(response.status == 'EXIST'){
        	  //$('.c_errorPackage').html("Package Name already in use by you!");
        	  toastr.error('Package Name already in use by you .');
          }
          if(response.status == 'FAIL'){
        	  //$('.c_errorPackage').html("There is some error Package cann't be save!");
        	  toastr.error('There is some error Package can not be save.');
          }
          $(".loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			//alert("error:" + textStatus + " exception:" + errorThrown);
	        	  //$('.c_errorPackage').html("There is some error Package cann't be save!");
	        	  
	        	  $(".loading").hide();
	        	  toastr.error('There is some error Package can not be save.');
		}
	});
   
});



$(".c_searchExams").click(function(){
	   
	var l_map ={};
	if(!($(".c_examLevel").val() == '')){
		l_map.level = $(".c_examLevel").val();
	}
	if(!($(".c_maxExam").val() == '')){
		l_map.maxRange = $(".c_maxExam").val();
	}
	
	if(!($(".c_minExam").val() == '')){
		l_map.minRange = $(".c_minExam").val();
	}
	
	if(!($(".c_duration").val() == '')){
		l_map.duration = $(".c_duration").val();
	}
	
	if(!($(".c_subjects").val() == '')){
		l_map.subject = $(".c_subjects").val();
	}
	
	l_map.offSet = '0';
	l_map.numberOfRecord = '10';
	l_map.source = "SM";
	$(".loading").show();
	$.ajax({

		type : 'POST',
		url : "/common/exam-list-by-filter",
		data : JSON.stringify(l_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		success : function(response) {

	          var l_map = {};
	  
	          $('.c_examsListTab').html('');
	          for(var i = 0;i<response.length;i++){
	        	  l_map = response[i];
	        	  var exams = "";
		          exams+='<div class="col-md-4">';
		          
		          exams+='<div class="card card-type-pricing">';
		         
		          exams+='<div class="card-body text-center style-skyblue"  style="padding:10px;">'
		        	        
		        	  exams+='<h2 class="text-light" style="font-size:11px;margin-top: 10px;margin-bottom: 10px;">'+l_map.examName+'</h2>';
		        	    
		          exams+='</div>';
		        
		          exams+='<div class="card-body no-padding" style="height:140px;">'; 
		          exams+='<ul class="list-unstyled text-left">';   
		          exams+='<input value="'+l_map.examId+'" type="hidden" class="c_examId'+i+'">';            
		          exams+='<input value="'+l_map.examName+'" type="hidden" class="c_examName'+i+'">';
		          exams+='<input value="100" type="hidden" class="c_price'+i+'">';              
		          exams+='<li style="padding: 8px 4px;"><strong>Duration:  </strong>'+l_map.examDuration+'</li>';               
		          exams+='<li style="padding: 8px 4px;"><strong>Number of Question: </strong>'+l_map.numberOfQuestions+'</li>';                 
										var res = l_map.description; 
										if (res != null) {
										   
										     res = res.substring(0, 15);
										     exams+='<li style="padding: 8px 4px;" title="'+l_map.description+'"><strong>Decription: </strong><span style="font-size:10px;">'+res+'</span></li>';
										     exams+='<li style="padding: 8px 4px;"><strong>Price: </strong><span style="font-size:10px;"><i class="fa fa-rupee">100</i></span></li>';
										}
										
										exams+='</ul>';
										exams+='</div>';
										exams+='<div class="card-body butalign"><a class="btn btn-primary" style="font-size:10px;padding: 4.5px 23px;" onclick="addToPackage('+i+')">Add To Package</a> </div>';
										exams+='</div>';
										exams+='</div>';
									  $('.c_examsListTab').append(exams);
	          
	          }
	          
	          
	          var totalPages = 5;
	          var pages = "";
	          pages+='<div class="row"><div class="col-md-12" style="text-align:center;">';
	          pages+='<ul class="pagination">'
                  for(var i=1;i<=totalPages;i++){
                	  if(i==1){
                	     pages+='<li class="active"><a href="#" onclick="searchByPagination('+i+')">'+i+'</a></li>';
                	  }else{
                		  pages+='<li><a href="#" onclick="searchByPagination('+i+')">'+i+'</a></li>';
                	  }
                  
                  }
	              pages+='<li id="i_nid" class="c_nclass"><a href="#" onclick="searchByPagination(2)">Next</a></li></ul>';
	              pages+='</div></div>';
	              $('.c_pages').html(pages);
	              $(".loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
			$(".loading").hide();
		}
	});
   
});


function searchByPagination(selectedPage){
	
	var l_map ={};
	if(!($(".c_examLevel").val() == '')){
		l_map.level = $(".c_examLevel").val();
	}
	if(!($(".c_maxExam").val() == '')){
		l_map.maxRange = $(".c_maxExam").val();
	}
	
	if(!($(".c_minExam").val() == '')){
		l_map.minRange = $(".c_minExam").val();
	}
	
	if(!($(".c_duration").val() == '')){
		l_map.duration = $(".c_duration").val();
	}
	
	if(!($(".c_subjects").val() == '')){
		l_map.subject = $(".c_subjects").val();
	}
	var resultsPerPage = 10;
	var start =  parseInt((selectedPage - 1)) * resultsPerPage;
	l_map.offSet = start;
	l_map.numberOfRecord = resultsPerPage;
	l_map.source = "SM";
	$(".loading").show();
	$.ajax({

		type : 'POST',
		url : "/common/exam-list-by-filter",
		data : JSON.stringify(l_map),
		cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
		success : function(response) {
          var l_map = {};
  
          $('.c_examsListTab').html('');
          for(var i = 0;i<response.length;i++){
        	  l_map = response[i];
        	  var exams = "";
	          exams+='<div class="col-md-4">';
              exams+='<div class="card card-type-pricing">';
	          exams+='<div class="card-body text-center style-skyblue"  style="padding:10px;">'
	          exams+='<h2 class="text-light" style="font-size:11px;margin-top: 10px;margin-bottom: 10px;">'+l_map.examName+'</h2>';
	          exams+='</div>';
	          exams+='<div class="card-body no-padding" style="height:140px;">'; 
	          exams+='<ul class="list-unstyled text-left">';   
	          exams+='<input value="'+l_map.examId+'" type="hidden" class="c_examId'+i+'">';            
	          exams+='<input value="'+l_map.examName+'" type="hidden" class="c_examName'+i+'">';
	          exams+='<input value="100" type="hidden" class="c_price'+i+'">';              
	          exams+='<li style="padding: 8px 4px;"><strong>Duration:  </strong>'+l_map.examDuration+'</li>';               
	          exams+='<li style="padding: 8px 4px;"><strong>Number of Question: </strong>'+l_map.numberOfQuestions+'</li>';                 
									var res = l_map.description; 
									if (res != null) {
									   
									     res = res.substring(0, 15);
									     exams+='<li style="padding: 8px 4px;" title="'+l_map.description+'"><strong>Decription: </strong><span style="font-size:10px;">'+res+'</span></li>';
									}
									exams+='<li style="padding: 8px 4px;"><strong>Price: </strong><span style="font-size:10px;"><i class="fa fa-rupee">100</i></span></li>';
									exams+='</ul>';
									exams+='</div>';
									exams+='<div class="card-body butalign"><a class="btn btn-primary" style="font-size:10px;padding: 4.5px 23px;" onclick="addToPackage('+i+')">Add To Package</a> </div>';
									exams+='</div>';
									exams+='</div>';
								  $('.c_examsListTab').append(exams);
          
          }
          
          

          var totalPages = $('.c_pages ul li').length;
          if($( "#i_pid" ).hasClass( "c_pclass" )){
            totalPages = totalPages-1;
          }
          if($( "#i_nid" ).hasClass( "c_nclass" )){
              totalPages = totalPages-1;
            }
          var pages = "";
          $('.c_pages').html('');
          pages+='<div class="row"><div class="col-md-12" style="text-align:center;">';
          pages+='<ul class="pagination">'
        	  if(parseInt(selectedPage) > 1){
        		  var previous = parseInt(selectedPage)-1;
        		  pages+='<li id="i_pid" class="c_pclass"><a href="#" onclick="searchByPagination('+previous+')">Previous</a> </li>';
        	  }
              
              for(var i=1;i<=totalPages;i++){
            	  if(parseInt(selectedPage) == i){
            	  pages+='<li class="active"><a href="#" onclick="searchByPagination('+i+')">'+i+'</a></li>';
            	  }else{
            		  pages+='<li><a href="#" onclick="searchByPagination('+i+')">'+i+'</a></li>';
            	  }
              
              }
              
          var next = parseInt(selectedPage)+1;
          if(!(totalPages == parseInt(selectedPage))){
          pages+='<li id="i_nid" class="c_nclass"><a href="#" onclick="searchByPagination('+next+')">Next</a></li></ul>';
          pages+='</div></div>';
          }
          $('.c_pages').html(pages);
          
          $(".loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			alert("error:" + textStatus + " exception:" + errorThrown);
			$(".loading").hide();
		}
	});
		
	
	
}

var currentActive = null;
function managExam(examId,packageId,status) {
    var type= 'CUSTOMIZEPACKAGE';
    var examDetail = "";
    var exam = null;
   /* if (currentActive == null)
		currentActive = activeClass;
	else {
		$("." + currentActive).removeClass("card-active2");
		currentActive = activeClass;
	}

	$("." + activeClass).addClass("card-active2");*/
    $(".loading").show();
    $.ajax({
        url : '/corporate/exam-detail',type : 'POST',data:{examId:examId},

        success : function(data) {debugger;
        if(data.status = 'SUCCESS'){
        var object = data.object[0];
          exam = object[0];
        // examDetail +="<div class='col-md-12' id='manage' style='padding-bottom:50px;'>";
        // examDetail +="<div class='row'>";
        // examDetail +="<div class='col-md-12'>";
        // examDetail +="<div class='table-responsive'>";
        // examDetail +="<table class='table table-bordered no-margin'><thead><tr>";
        // examDetail +="<th>Sections</th><th>Questions</th><th>Duration</th><th>Description</th><th>ExamDuration</th></tr> </thead>";                
        // examDetail +="<tbody><tr>";                   
        // examDetail +="<td>"+exam.nbrSection+"</td>";                        
        // examDetail +="<td>"+exam.numberOfQuestions+"</td>"; 
        // examDetail +="<td>"+exam.examDuration+"</td>";
        
        // examDetail +="<td>"+exam.description+"</td>";
        // examDetail +="<td>"+exam.examDuration+"</td>";
        // examDetail =examDetail+"</tr></tbody></table></div></div></div></div>";
          examDetail +="<div class='card-body' id='addStudent'><div class='row'>";
          examDetail +="<div class='col-md-12'><div style='display:flex;margin-bottom:20px;'> ";
          examDetail +="<h3 style='margin-left:0px;margin-top:9px;'>Choose Your Option</span></h3></div> </div>";
          examDetail +="<div class='col-md-12'><div class='row'> <a href='/corporate/add-candidates'>";
          examDetail +="<div class='col-md-4'><div class='card ck1' style='border-radius: 25px;'>";
          examDetail +="<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
          examDetail +="<img src='../../resources/img/check-icon.png' alt='Check Icon'></div>";
          examDetail +="<div class='col-md-12'><h5><strong>I have Candidate details (Email,Phone) and want to create one by one.</strong></h5>";
          examDetail +="</div></div></div></div></div></a>";
          examDetail +="<a href='#'><div class='col-md-4'><div class='card' style='border-radius: 25px;'>";
          examDetail +="<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
          examDetail +="<img src='../../resources/img/check-icon.png' alt='Check Icon'> </div><div class='col-md-12'>";
          examDetail +="<h5><strong>I want to upload excel file [ Please note that your excel should have email & phone ].</strong></h5>";
          examDetail +="</div></div></div></div></div></a>";
          examDetail +="<a href='#'><div class='col-md-4'><div class='card' style='border-radius: 25px;'>";
          examDetail +="<div class='card-body'><div class='row'><div class='col-md-12' style='text-align:center;'>";
          examDetail +="<img src='../../resources/img/check-icon.png' alt='Check Icon'></div><div class='col-md-12'>";
          examDetail +="<h5><strong>I don't have any information about Candidate. I want to generate Random Id.</strong></h5>";
          examDetail +=" </div></div></div></div></div></a></div></div></div></div>";
        $(".loading").hide();
        $('.c_examDetail'+packageId).html(examDetail);
        }
        
       },
       error : function(err) {
    	   $(".loading").hide();
          // alert(err);
       }
   });
    
    
                            
    
}