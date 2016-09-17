(function(){
	var $$={};
	
	// init
	$$.__construct = function(){
		window.onload = function(){
			$$.setInputTag();
			$$.setSaveButton();
			$$.setClearButton();
			$$.setLoadData();
			$$.setEvent();
		};
		
	};
	
	// set-event
	$$.setEvent = function(){
		var mandara = document.getElementsByClassName("mandara");
		var cells = mandara[0].getElementsByTagName("td");
		
		// theme
		var theme = document.getElementById("theme");
		if(theme !== null){
			theme.onblur = function(){
				var mandara = document.getElementsByClassName("mandara");
				var cells = mandara[0].getElementsByTagName("td");
				// theme
				var input = cells[40].getElementsByTagName("input");
				input[0].value = this.value;
			};
		}
		
		// target-cells
		var kadais_1 = [30 , 31 , 32 , 39 , 41 , 48 , 49 , 50];
		var kadais_2 = [10 , 13 , 16 , 37 , 43 , 64 , 67 , 70];
		// kadai
		for(var i=0; i<kadais_1.length; i++){
			var input_1 = cells[kadais_1[i]].getElementsByTagName("input");
			if(!input_1.length){continue}
			input_1[0].setAttribute("data-kadai-2" , kadais_2[i]);
			input_1[0].onblur = function(){
				var mandara = document.getElementsByClassName("mandara");
				var cells = mandara[0].getElementsByTagName("td");
				// theme
				var kadai_num = this.getAttribute("data-kadai-2");
				var input = cells[kadai_num].getElementsByTagName("input");
				input[0].value = this.value;
			};
		}
		
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
			if(tds[i].className.indexOf("ro") != -1){
				input.readOnly = true;
			}
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
	
	
	// save
	$$.setDataSave = function(){
		var mandara = document.getElementsByClassName("mandara");
		if(!mandara.length){return}
		var cells = mandara[0].getElementsByTagName("td");
		if(!cells.length){return}
		var arr = {};
		for(var i=0; i<cells.length; i++){
			var input = cells[i].getElementsByTagName("input");
			if(!input.length){continue}
			//var name = "m_"+i;
			var name = $$.getCellName(i);
			arr[name] = input[0].value;
		}
		var title = $$.getTitleValue();
		var data = JSON.stringify(arr);
		if(title !== ""){
			localStorage.setItem(title , data);
		}
	};
	
	// clear
	$$.setDataClear = function(){
		if(!confirm("All data clear?")){return}
		$$.setCellClear();
		var title = $$.getTitleValue();
		if(title !== ""){
			localStorage.removeItem(title);
		}
	};
	// cells-clear
	$$.setCellClear = function(){
		var mandara = document.getElementsByClassName("mandara");
		if(!mandara.length){return}
		var cells = mandara[0].getElementsByTagName("td");
		if(!cells.length){return}
		for(var i=0; i<cells.length; i++){
			var input = cells[i].getElementsByTagName("input");
			if(!input.length){continue}
			input[0].value = "";
		}
	};
	
	// load
	$$.setLoadData = function(){
		var mandara = document.getElementsByClassName("mandara");
		if(!mandara.length){return}
		var cells = mandara[0].getElementsByTagName("td");
		if(!cells.length){return}
		$$.setCellClear();
		var title = $$.getTitleValue();
		var data = localStorage.getItem(title);
		var arr = {};
		if(data !== null){
			arr = JSON.parse(data);
		}
		for(var i=0; i<cells.length; i++){
			var input = cells[i].getElementsByTagName("input");
			if(!input.length){continue}
			var name = $$.getCellName(i);
			var str =(typeof arr[name] == "undefined")?"":arr[name];
			input[0].value = str;
			if(i === 40){
				document.getElementById("theme").value = str;
			}
		}
	};
	
	
	// get-title
	$$.getTitleValue = function(){
		var title = document.getElementById("title");
		if(title==null){return ""}
		return "mandaraList_" + title.value;
	};
	
	// get-cell-name
	$$.getCellName = function(num){
		return "m_" + num.toString();
	};
	
	// 
	
	$$.__construct();
	return $$;
})();