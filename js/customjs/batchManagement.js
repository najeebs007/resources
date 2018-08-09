/*function batchListing(){debugger;
	
	var l_map = {};
	l_map.login = true;
	l_map.top = true;
	ajaxWithJSON("/tutor/batch-listing", l_map, 'POST', function(response) {
		var l_data = response.object;
		//alert(JSON.stringify(l_data));
		var status = response.status;
		if (response.status == 'SUCCESS') {
			setBatchData(l_data);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);

		}

	});
}*/




function batchDays(p_flag) {
	if (p_flag == 'weekend') {
		if ($('#i_weekend').is(':checked')) {
			$('input:checkbox[name=SUNDAY]').attr('checked', true);
			$('input:checkbox[name=SATURDAY]').attr('checked', true);
		} else {
			$('input:checkbox[name=SUNDAY]').attr('checked', false);
			$('input:checkbox[name=SATURDAY]').attr('checked', false);
		}
		//$('input:checkbox[name=checkme]').is(':checked');

	}
	if (p_flag == 'weekdays') {

		if ($('#i_weekdays').is(':checked')) {
			$('input:checkbox[name=MONDAY]').attr('checked', true);
			$('input:checkbox[name=TUESDAY]').attr('checked', true);
			$('input:checkbox[name=WEDNESDAY]').attr('checked', true);
			$('input:checkbox[name=THURSDAY]').attr('checked', true);
			$('input:checkbox[name=FRIDAY]').attr('checked', true);
		} else {
			$('input:checkbox[name=MONDAY]').attr('checked', false);
			$('input:checkbox[name=TUESDAY]').attr('checked', false);
			$('input:checkbox[name=WEDNESDAY]').attr('checked', false);
			$('input:checkbox[name=THURSDAY]').attr('checked', false);
			$('input:checkbox[name=FRIDAY]').attr('checked', false);
		}
	}
	if (p_flag == 'MWF') {
		if ($('#i_mwf').is(':checked')) {
			$('input:checkbox[name=MONDAY]').attr('checked', true);
			$('input:checkbox[name=WEDNESDAY]').attr('checked', true);
			$('input:checkbox[name=FRIDAY]').attr('checked', true);
		} else {
			$('input:checkbox[name=MONDAY]').attr('checked', false);
			$('input:checkbox[name=WEDNESDAY]').attr('checked', false);
			$('input:checkbox[name=FRIDAY]').attr('checked', false);
		}
		//$('input:checkbox[name=checkme]').is(':checked');

	}
	if (p_flag == 'TTS') {
		if ($('#i_tts').is(':checked')) {
			$('input:checkbox[name=TUESDAY]').attr('checked', true);
			$('input:checkbox[name=THURSDAY]').attr('checked', true);
			$('input:checkbox[name=SATURDAY]').attr('checked', true);
		} else {
			$('input:checkbox[name=TUESDAY]').attr('checked', false);
			$('input:checkbox[name=THURSDAY]').attr('checked', false);
			$('input:checkbox[name=SATURDAY]').attr('checked', false);
		}
		//$('input:checkbox[name=checkme]').is(':checked');

	}
	
	
}
