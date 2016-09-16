(function(){
	var $$={};
	
	// init
	$$.__construct = function(){
		window.onload = function(){
			$$.setInputTag();
			$$.setSaveButton();
			$$.setClearButton();
			$$.setLoadData();
		};
		
	};
	
	// set-input
	$$.setInputTag = function(){
		var mandara = document.getElementsByClassName("mandara");
		if(!mandara.length){return}
		var tds = mandara[0].getElementsByTagName("td");
		for(var i=0; i<tds.length; i++){
			var input = document.createElement("input");
			input.className = "inp";
			input.placeholder = (i+1);
			tds[i].appendChild(input);
		}
	};
	// set-save
	$$.setSaveButton = function(){
		var saves = document.getElementsByClassName("save");
		if(!saves.length){return}
		for(var i=0; i<saves.length;i++){
			saves[i].onclick = function(){
				$$.setDataSave();
			};
		}
	};
	// set-clear
	$$.setClearButton = function(){
		var btns = document.getElementsByClassName("cls");
		if(!btns.length){return}
		for(var i=0; i<btns.length;i++){
			btns[i].onclick = function(){
				$$.setDataClear();
			};
		}
	};
	
	
	// data-save
	$$.setDataSave = function(){
		var mandara = document.getElementsByClassName("mandara");
		if(!mandara.length){return}
		var cells = mandara[0].getElementsByTagName("td");
		if(!cells.length){return}
		var arr = {};
		for(var i=0; i<cells.length; i++){
			var input = cells[i].getElementsByTagName("input");
			if(!input.length){continue}
			var name = "m_"+i;
			//localStorage.setItem(name , input[0].value);
			arr[name] = input[0].value;
		}
		var title = document.getElementById("title");
		if(title==null){return}
		var title_val = "mandaraList_"+title.value;
		var data = JSON.stringify(arr)
		localStorage.setItem(title_val , data);
	};
	
	$$.setDataClear = function(){
		if(!confirm("All data clear?")){return}
		
		var mandara = document.getElementsByClassName("mandara");
		if(!mandara.length){return}
		var cells = mandara[0].getElementsByTagName("td");
		if(!cells.length){return}
		for(var i=0; i<cells.length; i++){
			var input = cells[i].getElementsByTagName("input");
			if(!input.length){continue}
			var name = "mandara_"+i;
			localStorage.removeItem(name);
			input[0].value = "";
		}
	};
	
	// load
	$$.setLoadData = function(){
		var mandara = document.getElementsByClassName("mandara");
		if(!mandara.length){return}
		var cells = mandara[0].getElementsByTagName("td");
		if(!cells.length){return}
		for(var i=0; i<cells.length; i++){
			var input = cells[i].getElementsByTagName("input");
			if(!input.length){continue}
			var name = "mandara_"+i;
			var str = localStorage.getItem(name);
			input[0].value = str;
		}
	};
	
	
	$$.__construct();
	return $$;
})();