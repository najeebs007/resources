	
function viewCart(){
			
			window.location.href ="../../cart/view-cart";
			
		}
		
function checkOutCart(){ 
			
			$("#checkOutSubmit").submit();
			//window.location.href ="../../cart/checkOutCart/"+cartId;
		}

function addToCart(l_cartId,l_productId,l_productType){ debugger;
	
	//alert(l_cartId+" : "+l_productId+" : "+l_productType);
	if (confirm("Do you Want to buy this product?"+"\n"+"click Place Order") ) {
		var l_input_map = {};
		l_input_map.cartId = l_cartId;
		l_input_map.productId=l_productId;
		l_input_map.productType=l_productType;
	    $(".loading").show();
		$.ajax({

			  type : 'POST',
			  url : "/cart/add",
			  data : JSON.stringify(l_input_map),
			  cache : false,
			  async : true,
			  contentType : "application/json; charset=UTF-8",
			  dataType : 'json',
			  success : function(response) {
			           //alert(response);
			           $(".loading").hide();
			          toastr.success('Item added to cart successfully.');
			          setTimeout(function() {
			        	  window.location.reload(true);
			      	}, 1000);
			          
			          
			  },
			  error : function(jqXHR, textStatus, errorThrown) {
				  $(".loading").hide();
				  toastr.error(response);
				 // alert("error:" + textStatus + " exception:" + errorThrown);
			  }
			 });
}
	
}

function buyNowCart(l_cartId,l_productId,l_productType){ 

//alert(l_cartId+":"+l_productId+" : "+l_productType);
if (confirm("Do you Want to buy this subscription?"+"\n"+"click ok")) {
	var l_input_map = {};
	l_input_map.cartId = l_cartId;
	l_input_map.productId=l_productId;
	l_input_map.productType=l_productType;

$(".loading").show();
	$.ajax({

		  type : 'POST',
		  url : "/cart/buy-now",
		  data : JSON.stringify(l_input_map),
		  cache : false,
		  async : true,
		  contentType : "application/json; charset=UTF-8",
		  dataType : 'json',
		  success : function(response) { 
		         // alert(response);
		          
		           $(".loading").hide();
		          toastr.success('Item added to cart going to checkout page');
		           window.location.reload(true);
		           //checkOutCart();
		           viewCart();
},
		  error : function(jqXHR, textStatus, errorThrown) {
			  $(".loading").hide();
			 toastr.error(response);
			  //alert("error:" + textStatus + " exception:" + errorThrown);
		  }
		 });
}

}

function viewCart(){
			
			window.location.href ="../../cart/view-cart";
			
		}
		
function checkOutCart(){ 
			
			$("#checkOutSubmit").submit();
			//window.location.href ="../../cart/checkOutCart/"+cartId;
		}

function addToCart(l_cartId,l_productId,l_productType){ debugger;
	
	//alert(l_cartId+" : "+l_productId+" : "+l_productType);
	if (confirm("Do you Want to buy this product?"+"\n"+"click Place Order") ) {
		var l_input_map = {};
		l_input_map.cartId = l_cartId;
		l_input_map.productId=l_productId;
		l_input_map.productType=l_productType;
		
		

     $(".loading").show();
		$.ajax({

			  type : 'POST',
			  url : "/cart/add",
			  data : JSON.stringify(l_input_map),
			  cache : false,
			  async : true,
			  contentType : "application/json; charset=UTF-8",
			  dataType : 'json',
			  success : function(response) {
			           //alert(response);
			           $(".loading").hide();
			          toastr.success('Item added to cart successfully.');
			          setTimeout(function() {
			        	  window.location.reload(true);
			      	}, 1000);
			          
			          
			  },
			  error : function(jqXHR, textStatus, errorThrown) {
				  $(".loading").hide();
				  toastr.error(response);
				 // alert("error:" + textStatus + " exception:" + errorThrown);
			  }
			 });
		
		
	}
	
}

function buyNowCart(l_cartId,l_productId,l_productType){ 

//alert(l_cartId+":"+l_productId+" : "+l_productType);
if (confirm("Do you Want to buy this subscription?"+"\n"+"click ok")) {
	var l_input_map = {};
	l_input_map.cartId = l_cartId;
	l_input_map.productId=l_productId;
	l_input_map.productType=l_productType;

$(".loading").show();
	$.ajax({

		  type : 'POST',
		  url : "/cart/buy-now",
		  data : JSON.stringify(l_input_map),
		  cache : false,
		  async : true,
		  contentType : "application/json; charset=UTF-8",
		  dataType : 'json',
		  success : function(response) { 
		         // alert(response);
		          
		           $(".loading").hide();
		          toastr.success('Item added to cart going to checkout page');
		           window.location.reload(true);
		           //checkOutCart();
		           viewCart();
		           
		          
		          
		  },
		  error : function(jqXHR, textStatus, errorThrown) {
			  $(".loading").hide();
			 toastr.error(response);
			  //alert("error:" + textStatus + " exception:" + errorThrown);
		  }
		 });
	
	
}

}
<<<<<<< HEAD


function removeCartItem(cartId,cartItemId){
	 	alert(cartId+": "+cartItemId);
		var l_input_map = {};
		l_input_map.cartId=cartId;
		l_input_map.cartItemId = cartItemId;
		  
			$(".loading").show();
		$.ajax({

			  type : 'POST',
			  url : "/cart/removeCartItem",
			  data : JSON.stringify(l_input_map),
			  cache : false,
			  async : true,
			  contentType : "application/json; charset=UTF-8",
			  dataType : 'json',
			  success : function(response) {
			        //  alert(response);
			    $(".loading").hide();
			        
			          toastr.success('Item removed successfully');
			          setTimeout(function() {
			        	  window.location.reload(true);
			      	}, 1000);
			         
			  },
			  error : function(jqXHR, textStatus, errorThrown) {
			   $(".loading").hide();
			     toastr.error(response);  
			  // alert("error:" + textStatus + " exception:" + errorThrown);
			   
			  }
			 });
		 
		
	}


=======

>>>>>>> f1f4d0e53c3fac3960296139ef16e977a1a980d3
