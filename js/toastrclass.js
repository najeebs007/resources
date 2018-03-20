
var p;  
p._initCustomToastr = function () {
  var o = this;
  var state='success';
  var msg='bhag bhag d k boss';
  $('#toasterSelf').on('click', function (e) {
   toastr.options.hideDuration = 0;
   toastr.clear();
   toastr.options.closeButton =  true;
   toastr.options.progressBar = true;
   toastr.options.debug = true;
   toastr.options.positionClass = 'toast-top-right';
   toastr.options.showDuration = 330;
   toastr.options.hideDuration =330;
   toastr.options.timeOut = 5000;
   toastr.options.extendedTimeOut = 1000;
   toastr.options.showEasing = 'swing';
   toastr.options.hideEasing = 'swing';
   toastr.options.showMethod = 'fadeIn';
   toastr.options.hideMethod = 'slideUp';
   toastr[state](msg, '');
  });
 };
  