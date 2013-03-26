var LIMIT = 40;
var TIMEOUT = 50;
var settings = {
	limit : 40,
	timeout : 50,
	open_tag : "<em>",
	close_tag : "</em>"
};

$(document).ready(function(){

	var timeoutID;

	$('#input_box').bind('DOMCharacterDataModified', function() {
	    clearTimeout(timeoutID);
	    $that = $(this);
	    timeoutID = setTimeout(function() {
	        $that.trigger('change')
	    }, settings.timeout);
	});


	$('#input_box').bind('change', function() {

	    var curent_text = $(this).text();

	    if(curent_text.length > settings.limit){
	    	$('#input_box').html(parse_text(curent_text));
	 		 var em_node = findEmNode(document.getElementById('input_box').childNodes);
	 		 if(em_node != null){
				var range = rangy.createRange();
				var sel = rangy.getSelection();
				range.setStart(em_node, 1);
				range.collapse(true);
				sel.removeAllRanges();
				sel.addRange(range);
	     	}
	     	else{
	     		console.log(em_node, "node does not exist");
	     	}
	    }
	    else{
	    	$('#input_box').html(curent_text);
	 //   	rangy.restoreSelection(savedSel,true);
	    }

	})

});


var parse_text = function(text){
   return text.substring(0, LIMIT) + settings.open_tag + text.substring(LIMIT,text.length) + settings.close_tag;
};


function findEmNode(nodes){
	var em_node = null;
	$.each(nodes, function(index, node){
		if(node.nodeName == "EM" || node.nodeName == "em"){
			em_node = node;
		}
	});

	return em_node;
}