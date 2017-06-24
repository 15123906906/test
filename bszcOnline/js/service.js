$(".ser").mouseenter(function(e){
	var height = $(this).height();
	height = height+'px';
	$(this).children().eq(1).animate({height:'100%',lineHeight:height},200);
});
$(".ser").mouseleave(function(e){
	$(this).children().eq(1).stop(true,false);
	$(this).children().eq(1).animate({height:'60px',lineHeight:'60px'},200);
	//$(".ser_1").animate({});
});
