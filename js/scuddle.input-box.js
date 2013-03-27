// var LIMIT = 40;
// var TIMEOUT = 50;
var settings = {
	limit : 10,
	timeout : 50,
	open_tag : "<em>",
	close_tag : "</em>",
	node_name : "EM"
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

	    $("#text_box").html(curent_text);
	    $("#counter").text(curent_text.length);

	    var old_selection = rangy.getSelection();

	    var old_node_name = old_selection.anchorNode.parentNode.nodeName;
	    var old_offset = old_selection.anchorOffset;


    	$('#input_box').html(parse_text(curent_text));
    	var selector = document.getElementById('input_box');

    	var active_node = null;
    	if(old_node_name == "EM"){
    		active_node = findEmNode(selector.childNodes);
    		active_node = active_node.childNodes[0];
    	}else{
    		active_node = selector.childNodes[0];
    		// first character in em node.
    		if(old_offset == settings.limit + 1){
    			active_node = findEmNode(selector.childNodes);
    			active_node = active_node.childNodes[0];
    			old_offset = old_offset - settings.limit;
    		}

    	}

 		if(active_node != null && active_node != undefined){
			var range = rangy.createRange();
			var sel = rangy.getSelection();

			range.setStart(active_node, old_offset);
		///	range.setEnd(em_node,1);
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
     	}
     	else{
     		console.log(active_node, "node does not exist");
     	}

	})

});


var parse_text = function(text){
   return text.substring(0, settings.limit) + settings.open_tag + text.substring(settings.limit,text.length) + settings.close_tag;
};


function findEmNode(nodes){
	var em_node = null;
	$.each(nodes, function(index, node){
		if(node.nodeName.toUpperCase() === settings.node_name){
			em_node = node;
		}
	});

	return em_node;
}
