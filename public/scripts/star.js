const rateYoObj = {
	starWidth: "40px",
    normalFill: '#1B100D',
    multiColor: {
      "startColor": "#CB5909",
      "endColor"  : "#FFFBB1"
    },
	fullStar: true,
	spacing: "20px"	
}

$(()=> {
	rateYoObj.rating = parseInt($('.rating').val());
	$("#rateYo").rateYo(rateYoObj).on("rateyo.set", (e, data)=> {
                  $('.rating').val(data.rating);
    	});
});