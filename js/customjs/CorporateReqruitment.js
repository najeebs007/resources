/**
 * 
 */
var g_map = {};
function addNumberOfStudent(count){
	$('.c_examName').val($('.c_name'+count).val());
	$('.c_examId').val($('.c_examId'+count).val());
	$('.c_count').val(count);
	$("#myModalabout").modal('show');
}

function addToPackage(){
	$('#i_errorMessage').html("");
	if($('.c_numberOfStudent').val() == ""){
		$('#i_errorMessage').html("Enter Number Of Student For This Exam!");
		return false;
	}
	if(parseInt($('.c_numberOfStudent').val()) == 0){
		$('#i_errorMessage').html("Not allow 0 Student!");
		return false;
	}
	
	var count = $('.c_count').val();
	g_map["examId"+count] = $('.c_examId').val();
	g_map["examName"+"examId"+count] = $('.c_examName').val();
	var numberOfStudent = parseInt(($('.c_numberOfStudent').val()).trim());
	g_map["totalStudent"+"examId"+count] = ($('.c_numberOfStudent').val()).trim();
	var price = numberOfStudent*10;
	$('.c_titles').append('<div class="c_remove'+count+'"><h5 class="card-title">'+$('.c_examName').val()+'</h5><h6><span>Total Student:<input type="text" class="c_totalStudent'+count+'" style="border:none" readonly value="'+numberOfStudent+'"></span></h6><h6><span style="color:red">Price:<i class="fa fa-rupee"></i>'+price+'</span></h6><a href="#" onclick="removeExam('+count+')"><span class="glyphicon glyphicon-remove" style="float:right;margin-top:-50px;color: #ff000096;"></span></a></div>');

    var l_totalExam = $('.c_totalExam').val();
    var l_totalPrice = $('.c_totalPrice').val();
    var l_finalTotalExam = parseFloat(l_totalExam) + 1;
    $('.c_totalExam').val(l_finalTotalExam);
    var l_finalTotalPrice = parseFloat(price) + parseFloat(l_totalPrice);
    $('.c_totalPrice').val(l_finalTotalPrice);
    
    $('.c_quantityForm').trigger("reset");
    $("#myModalabout").modal('hide');
 
}

function removeExam(count){
	
	
	delete g_map["examId"+count];
	delete g_map["totalStudent"+"examId"+count];
	delete g_map["examName"+"examId"+count];
    var l_totalExam = $('.c_totalExam').val();
    var l_totalPrice = $('.c_totalPrice').val();
    var l_totalStudentForExam = $(".c_totalStudent"+count).val();
    var l_finalTotalExam = parseFloat(l_totalExam) - 1;
    var l_minusPrice = parseFloat(l_totalStudentForExam)*10;
    $('.c_totalExam').val(l_finalTotalExam);
    var remainingPrice = parseFloat(l_totalPrice) - l_minusPrice;
    $('.c_totalPrice').val(remainingPrice);
    $('.c_remove'+count).remove();
	
}

$(".c_savePackage").click(function(){
	$('.c_successPackage').html(""); 
	$('.c_errorPackage').html("");
	if($('.c_packageName').val() == ""){
		toastr.error("Enter a valid package name.");
		return false;
	}
	if($('.c_totalExam').val() == '0'){
		toastr.error("Package cannot be empty. Add at least one exam in a package.");
		return false;
	}
	g_map.price = $('.c_totalPrice').val();
	g_map.packageName = $('.c_packageName').val(); 
	g_map ["status"] = "PENDING";
	g_map.validity = $('.c_validity').val();
	g_map ["source"] = "SAVE";
	$(".loading").show();
	$.ajax({

		type : 'POST',
		url : "/corporate/save-customize-package",
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
        	  toastr.error('Package name is already taken. Try using another name.');
        	  
          }
          if(response.status == 'FAIL'){
        	 // $('.c_errorPackage').html("There is some error Package cann't be save!");
        	  toastr.error('Package cannot be saved. Try again later!');
          }
          $(".loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			//alert("error:" + textStatus + " exception:" + errorThrown);
	        	  //$('#i_errorMessage').html("There is some error Package cann't be save!");
	        	  $(".loading").hide();
	        	  toastr.error('Package cannot be saved. Try again later!');
	          
		}
	});
   
});

$(".c_savePackageWithCart").click(function(){
	$('.c_successPackage').html("");   
	$('.c_errorPackage').html("");
	if($('.c_packageName').val() == ""){
		//$('.c_errorPackage').html("Enter a valid package name.");
		toastr.error('Enter a valid package name.');
		return false;
	}
	if($('.c_totalExam').val() == '0'){
		//$('.c_errorPackage').html("Package cannot be empty. Add at least one exam in a package.");
		toastr.error('Package cannot be empty. Add at least one exam in a package.');
		return false;
	}
	
	g_map.packageName = $('.c_packageName').val(); 
	g_map.price = $('.c_totalPrice').val();

	g_map ["status"] = "PENDING";
	g_map.validity = $('.c_validity').val();
	g_map ["source"] = "CART";
	$(".loading").show();
	$.ajax({

		type : 'POST',
		url : "/corporate/save-customize-package",
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
	              toastr.success('Package added successfully.');  
	              window.location.reload(true);
	      }
          if(response.status == 'EXIST'){
        	  //$('.c_errorPackage').html("Package Name already in use by you!");
        	  toastr.error('Package name is already taken by you. Try using another name.');
          }
          if(response.status == 'FAIL'){
        	  //$('.c_errorPackage').html("There is some error Package cann't be save!");
        	  toastr.error('Package cannot be saved. Try again later! ');
          }
          $(".loading").hide();
		},
		error : function(jqXHR, textStatus, errorThrown) {
			//alert("error:" + textStatus + " exception:" + errorThrown);
	        	 //$('.c_errorPackage').html("There is some error Package cann't be save!");
	        	  $(".loading").hide();
	        	  toastr.error('Package cannot be saved. Try again later!');
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
		url : "/corporate/exam-list-by-filter",
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
                  exams+='<input value="'+l_map.examName+'" type="hidden" class="c_name'+i+'">';
	        	  exams+='<h2 class="text-light" style="font-size:11px;margin-top: 10px;margin-bottom: 10px;">'+l_map.examName+'</h2>';
	        	  exams+='<input type="hidden" value="'+l_map.examId+'" class="c_examId'+i+'">';
	        	  exams+='</div>';
	        	  exams+='<div class="card-body no-padding"><ul class="list-unstyled text-left">';  
	        	  exams+='<li>Duration : '+l_map.examDuration+'</li>';
	        	  exams+='<li>No. Of Section : '+l_map.nbrSection+'</li>';
	        	  exams+='<li>Section Type : '+l_map.sectionType+'</li>';
	        	  exams+='<li>No. Of Questions : '+l_map.numberOfQuestions+'</li>';
	        	  exams+='<li>'+l_map.description+'</li>';
	        	  exams+='</ul></div>';    
	        	  exams+='<div class="card-body butalign"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="" onclick="addNumberOfStudent('+i+')">Add To Package</button> </div>';    
	        	  exams+='</div></div>';
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
		url : "/corporate/exam-list-by-filter",
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
              exams+='<input value="'+l_map.examName+'" type="hidden" class="c_name'+i+'">';
        	  exams+='<h2 class="text-light" style="font-size:11px;margin-top: 10px;margin-bottom: 10px;">'+l_map.examName+'</h2>';
        	  exams+='<input type="hidden" value="'+l_map.examId+'" class="c_examId'+i+'">';
        	  exams+='</div>';
        	  exams+='<div class="card-body no-padding"><ul class="list-unstyled text-left">';  
        	  exams+='<li>Duration : '+l_map.examDuration+'</li>';
        	  exams+='<li>No. Of Section : '+l_map.nbrSection+'</li>';
        	  exams+='<li>Section Type : '+l_map.sectionType+'</li>';
        	  exams+='<li>No. Of Questions : '+l_map.numberOfQuestions+'</li>';
        	  exams+='<li>'+l_map.description+'</li>';
        	  exams+='</ul></div>';    
        	  exams+='<div class="card-body butalign"><button type="button" class="btn btn-primary" data-toggle="modal" data-target="" onclick="addNumberOfStudent('+i+')">Add To Package</button> </div>';    
        	  exams+='</div></div>';
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

function showModal(packageId){
	//data-target='' data-toggle='modal'
	$('#addStudent').modal('show');
	$('.c_packageId').val(packageId);
}
function addOneByOne() {debugger;
    $('.c_errorInfo').html("");
	
	try{
		checkValidate("i_addJobSeekar","c_errorInfo",false,false)
	}catch(result){
	if(result){
	var l_map = {};
	l_map.packageId = $('.c_packageId').val();
	l_map.name = $('.c_Name').val();
	l_map.phone = $('.c_phone').val();
	l_map.email = $('.c_email').val();
	$(".loading").show();
    $.ajax({
        url : '/corporate/add-student',
        data : JSON.stringify(l_map),
        cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
        type : 'POST',
        success : function(response) {debugger;
        	$(".loading").hide();
        	if(response.status == 'SUCCESS'){
        	    var data = response.object;
        	    $('#addStudent').modal('hide');
            if(!(data.infoId == 'ERROR')){
            var lastRowNumber =	$(".c_studentRecords").find("tr").length;
            var row = "<tr><td>"+lastRowNumber+"</td><td>"+data.name+"</td><td>"+data.email+"</td><td>"+data.phone+"</td><td>"+data.password+"</td><td><button type='button' class='btn btn-danger'><span class='glyphicon glyphicon-trash' onclick=deleteStudent(\""+data.infoId+"\",\""+l_map.email+"\",\""+lastRowNumber+"\")></span></button></td></tr>";
           	$('.c_studentsInfo').append(row);
           	toastr.success('Student Added Successfully.');
            }
        	}
            if(response.status == 'EXIST'){
            	$('.c_errorInfo').html(response.message);
            	//toastr.error('Already exist this student.');
            }
        	if(response.status == 'ERROR'){
            	//toastr.error('There is some error. try again.');
            	$('.c_errorInfo').html(response.message);
        	}
            
        },
        error : function(err) {
        	$(".loading").hide();
           // $('.c_errorInfo').val("there is some error. try again after some time!")
        	toastr.error('Student cannot be add. Try again later!');
        }
    });
}else{
	
	return false;
}
}
}

/*function saveStudentFromExcel() {

    var formData = new FormData();
    formData.append('file', $('input[type=file]')[0].files[0]);
    $(".loading").show();
    $.ajax({
        url : '/corporate/excel-upload',
        data : formData,
        processData : false,
        contentType : false,
        enctype: 'multipart/form-data',
        type : 'POST',
        success : function(data) {
        	$(".loading").hide();
            var lastRowNumber =	$(".c_studentRecords").find("tr").length;
            for(var i=0;i<data.length;i++){
            	var l_map = data[i];
            	var row = "<tr><td>"+lastRowNumber+"</td><td>"+l_map.name+"</td><td>"+l_map.email+"</td><td>"+l_map.phone+"</td><td>"+l_map.password+"</td><td><button type='button' class='btn btn-danger'><span class='glyphicon glyphicon-trash' onclick=deleteStudent(\""+l_map.infoId+"\",\""+l_map.email+"\",\""+lastRowNumber+"\")></span></button></td></tr>";
            	lastRowNumber++;
            	$('.c_studentsInfo').append(row);
            	//alert(JSON.stringify(l_map));
            }
        },
        error : function(jqXHR, textStatus, errorThrown) {
        	$(".loading").hide();
        	alert("error:" + textStatus + " exception:" + errorThrown);
        }
    });
    return false;
}*/
function selectNumberOfIds(){
	$('#i_errorGenerate').html("");
	$("#myModalabout").modal('show');
}
function generateRandomIds(examId,packageId){debugger;
	
	$('#i_errorGenerate').html("");
	if($('.c_howmany').val() == ''){
		$('#i_errorGenerate').html("enter how many id and passworword you want to!");
		return false;
	}
	l_map = {};
	l_map.numberOfIds = $('.c_howmany').val();
	l_map.examId = examId;
	l_map.packageId = packageId;
	$(".loading").show();
	$.ajax({
        url : '/corporate/generate-random-password',
        data : JSON.stringify(l_map),
        cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
        type : 'POST',
        success : function(data) {debugger;
        	$("#myModalabout").modal('hide');
        	$(".loading").hide();
            var lastRowNumber =	$(".c_studentRecords").find("tr").length;
            for(var i=0;i<data.length;i++){
            	var l_map = data[i];
            	var row = "<tr><td>"+lastRowNumber+"</td><td>"+l_map.name+"</td><td>"+l_map.email+"</td><td>"+l_map.phone+"</td><td>"+l_map.password+"</td><td><button type='button' class='btn btn-danger'><span class='glyphicon glyphicon-trash' onclick=deleteStudent(\""+l_map.infoId+"\",\""+l_map.email+"\",\""+lastRowNumber+"\")></span></button></td></tr>";
            	lastRowNumber++;
            	$('.c_studentsInfo').append(row);
            	
            }
            toastr.success('Random ids generated Successfully.');
        },
        error : function(jqXHR, textStatus, errorThrown) {
        	$("#myModalabout").modal('hide');
        	$(".loading").hide();
        	//alert("error:" + textStatus + " exception:" + errorThrown);
        	toastr.error('Ids cannot be generated. Try again later!');
        }
    });
	
	
}

var currentActive = null;

function managExam(examId,packageId,status,cartId,pin,activeClass) {debugger;
    var type= 'CUSTOMIZEPACKAGE';
    var examDetail = "";
    var exam = null;
	if(currentActive == null)
		currentActive = activeClass;
	else{
		$("."+currentActive).removeClass("card-active2");
		currentActive = activeClass;
	}
		
    $("."+activeClass).addClass("card-active2");
    $(".loading").show();
    $.ajax({
        url : '/corporate/exam-detail',type : 'POST',data:{examId:examId},

        success : function(data) {debugger;
        if(data.status = 'SUCCESS'){
        var object = data.object[0];
        exam = object[0];
        
        // for single exam url
        //http://43.224.136.105:8080/koescore_demo/mobile/examDetail.koe?examId=EXAM_0000001 
        // examDetail +="<div class='col-md-12' id='manage' style='padding-bottom:50px;'>";
        // examDetail +="<div class='row'>";
        // examDetail +="<div class='col-md-12'>";
        // examDetail +="<div class='table-responsive'>";
        // examDetail +="<table class='table table-bordered no-margin'><thead><tr>";
        // examDetail +="<th>Sections</th><th>Questions</th><th>Duration</th><th>Actions</th><th>Operations</th></tr> </thead>";                
        // examDetail +="<tbody><tr>";                   
        // examDetail +="<td>"+exam.nbrSection+"</td>";                        
        // examDetail +="<td>"+exam.numberOfQuestions+"</td>"; 
        // examDetail +="<td>"+exam.examDuration+"</td>";
        // examDetail +="<td><input class='c_pin"+examId+packageId+"' type='text' value='"+pin+"' placeholder='Enter exam pin'>";
        // examDetail +="<a class='btn btn-primary' onclick='changePin(\""+examId+"\",\""+packageId+"\")'>Change Pin</a><span class='c_changePin'></span></td>";
        // examDetail +="<td style='text-align:center;'>";
        

        
        // if(status == 'ACTIVE'){
        // examDetail =examDetail+"<form class='c_reload' action='/corporate/load-students' method='get'>";
        // examDetail +="<input type='hidden' name='examId' value=\""+examId+"\"/>";
        // examDetail +="<input type='hidden' name='packageId' value=\""+packageId+"\"/>";
        // examDetail +="<button type='submit' class='btn btn-primary'>Add Student</a></form></td></tr></tbody></table>";                        
        // }else{
        	// examDetail =examDetail+"<a onclick='buyNowCart(\""+cartId+"\",\""+packageId+"\",\""+type+"\")' class='btn btn-warning' title='Please make payment to activate this one!'> Buy Now </a></td></tr></tbody></table>";
        // }
        // examDetail =examDetail+"</div></div></div></div>";
			examDetail +="<div class='card-body' style='padding:0px 24px;margin-bottom:20px;'>";
			examDetail +="<div class='row'><div class='col-md-12'><div class='row row-style-extended'>";
			examDetail +="<div class='col-md-5'>";
			examDetail +="<h5><i class='fa fa-list-alt span-title-small' aria-hidden='true'>";
			examDetail +="</i><strong>Section :</strong> "+exam.nbrSection+"</h5>";
			examDetail +="<h5><i class='fa fa-list-alt span-title-small' aria-hidden='true'>";
			examDetail +="</i><strong>Questions :</strong> "+exam.numberOfQuestions+" </h5>";
			examDetail +="<h5><i class='fa fa-clock-o span-title-small' aria-hidden='true'>";
			examDetail +="</i><strong>Duration :</strong> "+exam.examDuration+" Minutes</h5></div>";
			examDetail +="<div class='col-md-4'><div style='display: flex;margin-top: 35px;'>";
			examDetail +="<div><input type='text' class='custom-input c_pin"+examId+packageId+"' value='"+pin+"' placeholder='Please Enter Exam Pin'></div>";
			examDetail +="<button type='button' class='btn btn-primary' onclick='changePin(\""+examId+"\",\""+packageId+"\")'>Change Pin</button></div><span class='c_changePin'></span></div>";
			examDetail +="<div class='col-md-3' style='padding: 35px 10px;text-align:right;'>";
				if(status == 'ACTIVE'){
			examDetail =examDetail+"<form class='c_reload' action='/corporate/load-students' method='get'>";
			examDetail +="<input type='hidden' name='examId' value=\""+examId+"\"/>";
			examDetail +="<input type='hidden' name='packageId' value=\""+packageId+"\"/>";
			examDetail +="<button type='submit' class='btn btn-primary'>Add Students</button></form>";
		} else{
			examDetail =examDetail+"<a onclick='buyNowCart(\""+cartId+"\",\""+packageId+"\",\""+type+"\")' class='btn btn-warning' title='Please make payment to activate this one!'> Buy Now </a> ";
						 }
			 examDetail +="</div>";
			 examDetail =examDetail+"</div></div></div></div>";		
        
        $(".loading").hide();
        
        $('.c_examDetail'+packageId).html(examDetail); 
       
        }else{
        	toastr.error('there is some error please try again!.');
        }
       	
       },
       error : function(err) {
    	   $(".loading").hide();
    	   toastr.error('There is some error please try again!');
          // alert(err);
       }
   });
    
    
                            
    
}

/*function addStudentView(examId,packageId){
	
	var addStudentView = "";
	
	addStudentView +="<div class='modal fade' id='myModalabout' tabindex='-1' role='dialog' aria-labelledby='myModalLabel' aria-hidden='true'>";
	addStudentView +="<div class='modal-dialog'>";
	addStudentView +="<div class='modal-content'>";
	addStudentView +="<div class='modal-header'>";
	addStudentView +="<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span>";
	addStudentView +="</button>";
	addStudentView +="<h4 class='modal-title' id='myModalLabel'>Generate Random Id And Password </h4> </div>";
	addStudentView +="<div class='modal-body'>";
	addStudentView +="<h6 style='color:red' id='i_errorGenerate'></h6>";
	addStudentView +="<form class='form floating-label'>";
	addStudentView +="<div class='form-group'>"; 
	addStudentView +="<input type='text' class='form-control c_howmany' maxlength='10' onkeypress='return isMobile(event)'>";
	addStudentView +="<label for='exampleInputEmail1' class='control-label'>How many ids ?</label>";
	addStudentView +="</div></form></div>";
	addStudentView +="<div class='modal-footer'>";            
	addStudentView +="<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";        
	addStudentView +="<button type='button' class='btn btn-primary' onclick='return generateRandomIds(\""+examId+"\",\""+packageId+"\")'>Generate</button>";        
	addStudentView +="</div></div></div></div>";            
	addStudentView +="<div class='row'><div class='col-md-12'>";            
	addStudentView +="<div class='card'><div class='card-body'>";        
	addStudentView +="<div class='row'>";   
	addStudentView +="<div class='col-md-12'>";
	addStudentView +="<div class='row'>";
	addStudentView +="<div class='col-md-7'>";



	addStudentView +="<h4 id='text-note' class='labelHeading'>";
	addStudentView +="<span style='margin-left: 10px;'>Add Students </span>";
	addStudentView +="</h4></div><div class='col-md-5'>";
	//call for generate passwordexportExcel('i_nominationList','NominateStudentList')
	addStudentView +="<button style='margin-bottom: 10px; float: right;' class='btn btn-primary' onclick='generatePassword(\""+examId+"\",\""+packageId+"\")'>Generate Password</button>";
	addStudentView +="</div></div></div>";
	addStudentView +="<div class='col-md-12'><h4 id='text-note' class='labelHeading'><span style='margin-left: 10px;'>Add Credential/Student to my package</span></h4></div>";
	addStudentView +="<div class='col-md-1' style='margin-top:15px;margin-bottom:15px;'>";
	addStudentView +="<button type='button' class='btn btn-primary' style='float:right;' data-placement='left' title='download students !'>";   
	addStudentView +="<span class='glyphicon glyphicon-download' onclick='exportExcel(\"i_students\"\,\"StudentList\")'></span></button></div>"
	addStudentView +="<div class='col-md-11' style='margin-top:15px;margin-bottom:15px;'><button type='button' class='btn btn-primary' style='float:right;' onclick='showModal(\""+packageId+"\")' data-placement='left' title='Add Student !'>";   
	addStudentView +="<span class='glyphicon glyphicon-plus'></span></button></div>";                            
	addStudentView +="<div class='col-md-12'><div class='table-responsive'><table id='i_students' class='c_studentRecords table table-bordered no-margin'>";						 
	addStudentView +=" <thead><tr><th>Sr No.</th><th>Name</th><th>Email/LoginId</th><th>Phone</th><th>Password</th><th><button type='button' class='btn btn-danger'><span class='glyphicon glyphicon-trash' onclick='deleteAllStudent()' title='Delete all students!'></span></button></th></tr></thead>";	
	// add students for in tables
	addStudentView +="<tbody class='c_studentsInfo'></tbody></table>";                        
	addStudentView +="</div></div><div class='col-md-12' style='text-align:center;margin:15px 0px;'>";                        
	addStudentView +="<img src='resources/img/or-icon.PNG' alt='or icon'></div>";                            
	addStudentView +="<div class='col-md-12'><div class='row'><div class='col-md-12'>";           
	addStudentView +="<div style='margin-left: 10px;'><label class='radio-inline radio-styled'> <inputtype='radio' name='radiob' onclick='upload()'><span>Upload excelfile</span> </label></div>";                            
	addStudentView +="</div>"; 
	addStudentView +="<div class='col-md-12'>";
	addStudentView +="<div style='margin-left: 40px;'>";
	addStudentView +="<span style='font-size: 12px;font-style: italic;'>(Download excel file format<a href='http://smopl.com/sm_assets/myexcl.xlsx' style='color: skyblue;'> Here</a>)</span>";
	addStudentView +="</div></div><div class='col-md-12' style='margin-bottom: 15px; margin-top:15px;margin-left:15px;' id='uploadFiles'>";                                
	//upload excel sheet form
	addStudentView +="<form id='fileForm'><div class='row'><div class='col-md-5'>";                                
	addStudentView +="<div class='file-upload up1'><div class='file-select'>";                                    
	addStudentView +="<div class='file-select-button upload1' id='fileName'>ChooseFile</div>";                                
	addStudentView +="<div class='file-select-name upload1' id='noFile'>UploadFile</div><input type='file' class='upload1' name='excelfile' id='chooseFile'></div>";                                            
	addStudentView +="</div></div><div class='col-md-7'> <button onclick='saveStudentFromExcel()' class='btn btn-info' style='margin-top:2px;'><span class='glyphicon glyphicon-upload'> Upload</span></button> </div>";                                                
	addStudentView +="</div></form>" ;
	
	addStudentView +="</div><div class='col-md-12' style='text-align:center;margin:15px 0px;'> <img src='resources/img/or-icon.PNG' alt='or icon'> </div>";                                                    
	addStudentView +="<div class='col-md-12'><div style='margin-left: 10px;'> <label class='radio-inline radio-styled'> <input type='radio' name='radiob' onclick='manual()'><span>I don't have student data.I would like to generate random/temporary id's. I understand that the ID generated from all is temporary and for one-time use only.</span></label></div>";                                                    
	addStudentView +="</div><div class='col-md-12' id='addManual'> <button type='button' data-target='#myModalabout' data-toggle='' class='btn btn-primary' style='float:right;' onclick='selectNumberOfIds()'>Generate</button> </div>";                                            
	addStudentView +="</div></div></div></div></div></div></div>";                                        
                                            

   $('.c_addStudentView').html(addStudentView);
   
   $(".loading").show();
   $.ajax({
        url : '/corporate/load-students',type : 'GET',
        cache : false,
		async : true,
		contentType : "application/json; charset=UTF-8",
		dataType : 'json',
        success : function(data) {debugger;
        $(".loading").hide();
        var lastRowNumber =	1;
        for(var i=0;i<data.length;i++){
        	var l_map = data[i];
        	var row = "<tr><td>"+lastRowNumber+"</td><td>"+l_map.name+"</td><td>"+l_map.email+"</td><td>"+l_map.phone+"</td><td>"+l_map.password+"</td><td><button type='button' class='btn btn-danger'><span class='glyphicon glyphicon-trash' onclick=deleteStudent(\""+l_map.infoId+"\",\""+l_map.email+"\",\""+lastRowNumber+"\")></span></button></td></tr>";
        	lastRowNumber++;
        	$('.c_studentsInfo').append(row);
        }
       	
       },
       error : function(err) {
    	   $(".loading").hide();
          // alert(err);
       }
   });
   
	
}*/

function generatePassword(examId,packageId){debugger;
	
	   var l_map = {};
	   l_map.examId = examId;
	   l_map.packageId = packageId;
	   $(".loading").show();
	   $.ajax({
	        url : '/corporate/generate-password',type : 'POST',
	        data:JSON.stringify(l_map),
	        cache : false,
			async : true,
			contentType : "application/json; charset=UTF-8",
			dataType : 'json',
	        success : function(data) {debugger;
	        $(".loading").hide();
	        if(data.status = 'SUCCESS'){
	        	
	        	var b_response = data.object;
	        	$('.c_studentsInfo').html("");
	        var lastRowNumber =	1;
	        for(var i=0;i<b_response.length;i++){
	        	var l_map = b_response[i];
	        	var row = "<tr><td>"+lastRowNumber+"</td><td>"+l_map.name+"</td><td>"+l_map.email+"</td><td>"+l_map.phone+"</td><td>"+l_map.password+"</td><td><button type='button' class='btn btn-danger'><span class='glyphicon glyphicon-trash'  onclick='deleteStudent(\""+l_map.infoId+"\",\""+l_map.email+"\",\""+lastRowNumber+"\")'></span></button></td></tr>";
	        	lastRowNumber++;
	        	$('.c_studentsInfo').append(row);
	        }
	        toastr.success('Generated Ids and passwords Successfully.');
	        }else
	        	toastr.error('There is some error please try again!');
	       	
	       },
	       error : function(err) {
	    	   $(".loading").hide();
	    	   toastr.error('There is some error please try again!');
	    	   //alert(err);
	       }
	   });
}

function changePin(examId,packageId){debugger;
	  $('.c_changePin').html('');
	   var l_map = {};
	   l_map.examId = examId;
	   l_map.packageId = packageId;
	   l_map.pin = $('.c_pin'+examId+packageId).val();
	   if($('.c_pin'+examId+packageId).val() == ""){
		   $('.c_changePin').html("<span style='color:red'>Please enter pin !</span>");
		   return false;
	   }
	   $(".loading").show();
	   $.ajax({
	        url : '/corporate/change-pin',
	        type : 'POST',
	        data:JSON.stringify(l_map),
	        cache : false,
			async : true,
			contentType : "application/json; charset=UTF-8",
			dataType : 'json',
	        success : function(data) {debugger;
	     
	        $(".loading").hide();
           if(data.status = 'SUCCESS'){
          /* $('.c_changePin').html("<span style='color:green'>Successfully Updated !</span>");*/
        	   toastr.success('Successfully Updated');
           }
	       	
	       },
	       error : function(jqXHR, textStatus, errorThrown) {
 				//$(".loading").hide();
 				// toastr.success('Successfully Updated');
				//alert("error:" + textStatus + " exception:" + errorThrown);
	    	   $(".loading").hide();
	    	  // $('.c_changePin').html("<span style='color:red'>There is some error. try again !</span>");
	    	   toastr.error('There is some error. try again !');
			}
	   });
}

function deleteAllStudent(){debugger;
	//if(($(".c_studentRecords").find("tr").length) == 0){
	if(confirm("You want to delete all students !")){
		$(".loading").show();
	$.ajax({
        url : '/corporate/delete-all',
        type : 'POST',
        success : function(data) {debugger;
        $(".loading").hide();
        if(data.status == 'SUCCESS'){
	      
        	$('.c_studentsInfo').html("");
        	toastr.success('Successfully removed !');
        }else
        	toastr.error('there is some error please try again!.');
       	
       },
       error : function(jqXHR, textStatus, errorThrown) {
			//alert("error:" + textStatus + " exception:" + errorThrown);
    	   $(".loading").hide();
    	   toastr.error('there is some error please try again!.');
		}
   });
	}else
		return false;
	
}

function deleteStudent(infoId,email,row){ 
	
	
	if(confirm("You want to delete student !")){
		$(".loading").show();
		$.ajax({
	        url : '/corporate/delete',
	        data:{email:email,infoId:infoId},
	        type : 'POST',
	        success : function(data) {debugger;
	        $(".loading").hide();
	        if(data.status == 'SUCCESS'){
	         
	        	toastr.success('Successfully removed !');
	        	window.location.reload(true);
	        	//document.getElementById("i_students").deleteRow(parseInt(row)-1);
	        	
	        }else
	        	toastr.error('there is some error please try again!.');
	       },
	       error : function(jqXHR, textStatus, errorThrown) {
				//alert("error:" + textStatus + " exception:" + errorThrown);
	    	   $(".loading").hide();
	    	   toastr.error('there is some error please try again!.');
			}
	   });
		}else
			return false;
	
	
}