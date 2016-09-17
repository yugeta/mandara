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
		
// 		// theme
// 		var theme = document.getElementById("theme");
// 		if(theme !== null){
// 			theme.onblur = function(){
// 				var mandara = document.getElementsByClassName("mandara");
// 				var cells = mandara[0].getElementsByTagName("td");
// 				// theme
// 				var input = cells[40].getElementsByTagName("input");
// 				input[0].value = this.value;
// 			};
// 		}
		
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
		
		// title-select
		var title = document.getElementById("title");
		title.onchange = function(){
			$$.setLoadData(this.value);
		};
		for(var i=0; i<localStorage.length; i++){
			var key = localStorage.key(i);
			if(!key.match(/^mandaraList_/)){continue}
			title.options[title.options.length] = new Option($$.getData2Theme(localStorage.getItem(key)) , key);
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
			saves[i].onclick = $$.setDataSave;
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
			var name = $$.getCellName(i);
			if(input[0].value !== ""){
				arr[name] = input[0].value;
			}
		}
		var title = $$.setTitleValue();
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
		// select
		var title = document.getElementById("title");
		for(var i=0; i<title.options.length; i++){
			if(title.options[i].value == title.value){
				title.options[i] = null;
				break;
			}
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
	$$.setLoadData = function(key){
		var mandara = document.getElementsByClassName("mandara");
		if(!mandara.length){return}
		var cells = mandara[0].getElementsByTagName("td");
		if(!cells.length){return}
		$$.setCellClear();
		var title = $$.getTitleValue();
		if(key != ""){
			title = key;
		}
		var data = localStorage.getItem(title);
		var arr = {};
		if(data !== null){
			arr = JSON.parse(data);
		}
		for(var i=0; i<cells.length; i++){
			var input = cells[i].getElementsByTagName("input");
			if(!input.length){continue}
			input[0].onblur = $$.setDataSave;
			var name = $$.getCellName(i);
			var str =(typeof arr[name] == "undefined")?"":arr[name];
			input[0].value = str;
			if(i === 40 && document.getElementById("theme")!=null){
				document.getElementById("theme").value = str;
			}
		}
	};
	
	
	// get-title
	$$.getTitleValue = function(){
		var titleElm = document.getElementById("title");
		return titleElm.value;
	};
	
	$$.setTitleValue = function(){
		var titleElm = document.getElementById("title");
		var title = "";
		var theme = $$.getThemeValue();
		if(titleElm==null || titleElm.value === ""){
			title = "mandaraList_" + (+new Date());
			// select add
			var num = titleElm.length;
			titleElm.options[num] = new Option(theme , title);
			titleElm.value = title;
		}
		else{
			var text = "";
			for(var i=0; i<titleElm.options.length; i++){
				if(titleElm.options[i].value == titleElm.value){
					text = titleElm.options[i].text;
					break;
				}
			}
			
			if(theme !== text){//console.log(i +"/"+ theme +"/"+ text);
				titleElm.options[i].text = theme;
			}
			title = titleElm.value;
		}
		return title;
	};
	
	$$.getThemeValue = function(){
		var mandara = document.getElementsByClassName("mandara");
		var cells = mandara[0].getElementsByTagName("td");
		var theme = cells[40].getElementsByTagName("input");
		return theme[0].value;
	};
	$$.getData2Theme = function(data){
		if(!data){return}
		var json = JSON.parse(data);
		return json["m_40"];
	};
	
	// get-cell-name
	$$.getCellName = function(num){
		return "m_" + num.toString();
	};
	
	// 
	
	$$.__construct();
	return $$;
})();