

getPopword('d');

function getPopword(range) {
	$.ajax({
		type: "GET",
		url: "/popword",
		dataType: 'json',
		data:{"range":range},
		success: function(data) {
			console.dir(data);
			let str = "";
			for(let i=0; i<data.length; i++) {
				str += "<li>";
				str += "	<span class='"
				if(i==0) {
					str += "sr_numbox'>"+(i+1);
				} else if (i == 1 || i == 2) {
					str += "sr_numbox2'>"+(i+1);
				} else {
					str += "sr_numbox3'>"+(i+1);
				}
				str +="</span>";
				
				str +="<a href='#!' >" + data[i].key + "</a>";
				str +="<span class='sr_rank'>";
				
				if(data[i].status == 'up') {
					str += "<i class='sr_rankup'></i>";
					str += "<span>" + data[i].value + "</span>";
				} else if (data[i].status == 'down') {
					str += "<i class='sr_rankdown'></i>";
					str += "<span>" + (data[i].value * -1) + "</span>";
				} else if (data[i].status == 'new') {
					str += "<span>new</span>";
				} else if (data[i].status == '-') {
					str += "<span>-</span>";
				} 
				str += "</span>";
				str += "</li>";
			}
			$("#popword").html(str);
		}, 
		error: function(request,status,error){
			console.dir(request);
			console.dir(status);
			console.error(error);
		}
	});
}