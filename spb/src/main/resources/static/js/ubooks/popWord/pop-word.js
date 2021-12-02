$( document ).ready(function() {
	$("#pop-day").on('click',()=>{
		$("#pop-day").css('background-color','grey');
		$("#pop-day").css('color','white');
		
		$("#pop-week").css('background-color','');
		$("#pop-week").css('color','');
		$("#pop-month").css('background-color','');
		$("#pop-month").css('color','');
		
		$("#popd").css('display','block');
		$("#popw").css('display','none');
		$("#popm").css('display','none');
	});
	
	$("#pop-week").on('click',()=>{
		$("#pop-week").css('background-color','grey');
		$("#pop-week").css('color','white');
		
		$("#pop-day").css('background-color','');
		$("#pop-day").css('color','');
		$("#pop-month").css('background-color','');
		$("#pop-month").css('color','');
		
		$("#popd").css('display','none');
		$("#popw").css('display','block');
		$("#popm").css('display','none');
	});
	
	$("#pop-month").on('click',()=>{
		$("#pop-month").css('background-color','grey');
		$("#pop-month").css('color','white');
		
		$("#pop-day").css('background-color','');
		$("#pop-day").css('color','');
		$("#pop-week").css('background-color','');
		$("#pop-week").css('color','');
		
		$("#popd").css('display','none');
		$("#popm").css('display','none');
		$("#popw").css('display','block');
	});
});

function searchPopword(query) {
	let newForm = $('<form></form>'); //set attribute (form) 
		newForm.attr("name","searchForm"); 
		newForm.attr("method","post"); 
		newForm.attr("action","/complete-works");
		// create element & set attribute (input) 
		newForm.append($('<input/>', {type: 'hidden',id:'query', name: 'query', value:query })); 
		// append form (to body) 
		newForm.appendTo('body'); 
		// submit form 
		newForm.submit();
}