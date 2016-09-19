(function(){
	var $$={};
	
	$$.data = {
		table:{
			theme:"4-4",
			kadai_1:["4-0","4-1","4-2","4-3","4-5","4-6","4-7","4-8"],
			kadai_2:["0-4","1-4","2-4","3-4","5-4","6-4","7-4","8-4"]
		},
		typeName:[
			"mandara","kadai-group","cell",
			"title","data-key",
			"mandaraList_","m_"
		]
	};
	
	// Start
	$$.__construct = function(){
		window.onload = function(){
// 			$$.setInputTag();
// 			$$.setSaveButton();
			$$.setTitleSelect();
 			$$.setClearButton();
			$$.setDataConvert();
			$$.setTitleLists();
 			$$.setLoadData();
			$$.setMandaraTable();
			$$.setEvent();
		};
		
	};
	
	// make-table
	$$.setMandaraTable = function(){
		var mandara = document.getElementById($$.data.typeName[0]);
		if(mandara==null){return}
		
		for(var t=0; t<9; t++){
			var table = document.createElement("table");
			table.className = $$.data.typeName[1];
			mandara.appendChild(table);
			var num = 0;
			for(var i=0; i<3; i++){
				var tr = document.createElement("tr");
				table.appendChild(tr);
				for(var j=0; j<3; j++){
					var key = t+"-"+num;
					num++;
					var td = document.createElement("td");
					table.appendChild(td);
					var input = document.createElement("input");
					input.setAttribute($$.data.typeName[4] , key);
					input.className = $$.data.typeName[2];
					td.appendChild(input);
				}
			}
		}
	};
	
	// set-event
	$$.setEvent = function(){
		var mandara = document.getElementById($$.data.typeName[0]);
		if(mandara==null){return}
		var tables = mandara.getElementsByClassName($$.data.typeName[1]);
		
		for(var i=0; i<tables.length; i++){
			var cells = tables[i].getElementsByClassName($$.data.typeName[2]);
			for(var j=0; j<cells.length; j++){
				$$.setEventReadonly(cells[j]);
				cells[j].onblur = $$.setEventBlur;
			}
		}
	};
	
	// set-title
	$$.setTitleSelect = function(){
		var title = document.getElementById($$.data.typeName[3]);
		if(title !== null){
			title.onchange = function(e){$$.setLoadData(e.target.value)};
		}
	};
	
	// set-read-only(kadai2)
	$$.setEventReadonly = function(elm){
		var key = elm.getAttribute($$.data.typeName[4]);
		//kadai
		if($$.data.table.kadai_2.indexOf(key) != -1){
			elm.readOnly = true;
		}
	};
	
	// set-event(blur)
	$$.setEventBlur = function(e){
		var elm = e.target;
		var key = elm.getAttribute($$.data.typeName[4]);
		
		// copy (kadai_1 -> kadai_2)
		if($$.data.table.kadai_1.indexOf(key) != -1){
			var num = $$.data.table.kadai_1.indexOf(key);
			var key2 = $$.data.table.kadai_2[num];
			var elm2 = $$.getKey2Cell(key2);
			$$.setCellValueCopy(elm , elm2);
		}
		
		// save
		$$.setSave();
	};
	
	// key -> cell
	$$.getKey2Cell = function(key){
		if(!key){return}
		var mandara = document.getElementById($$.data.typeName[0]);
		if(mandara==null){return}
		var cells = mandara.getElementsByClassName($$.data.typeName[2]);
		var elm;
		for(var i=0; i<cells.length; i++){
			var cellKey = cells[i].getAttribute($$.data.typeName[4]);
			if(cellKey == key){
				elm = cells[i];
				break;
			}
		}
		return elm;
	};
	
	// elm1-value -> elm2-value
	$$.setCellValueCopy = function(elm1 , elm2){
		elm2.value = elm1.value;
	};
	
	// Save
	$$.setSave = function(){
		var mandara = document.getElementById($$.data.typeName[0]);
		if(mandara == null){return}
		var tables = mandara.getElementsByClassName($$.data.typeName[1]);
		if(!tables.length){return}
		
		var arr = {};
		for(var i=0; i<tables.length; i++){
			var cells = tables[i].getElementsByClassName($$.data.typeName[2]);
			for(var j=0; j<cells.length; j++){
				var key = cells[j].getAttribute($$.data.typeName[4]);
				if(cells[j].value !== ""){
					arr[key] = cells[j].value;
				}
			}
		}
		var ls_key = $$.setTitleValue();
		var data = JSON.stringify(arr);
		//console.log(data);
		if(data != "{}" && ls_key != ""){
			localStorage.setItem(ls_key , data);
		}
	};
	
	// get-title
	$$.getTitleValue = function(){
		var titleElm = document.getElementById($$.data.typeName[3]);
		return titleElm.value;
	};
	
	// set-title
	$$.setTitleValue = function(){
		var titleElm = document.getElementById($$.data.typeName[3]);
		var title = "";
		var theme = $$.getThemeValue();
		if(titleElm==null || titleElm.value === ""){
			title = $$.data.typeName[6] + (+new Date());
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
			
			if(theme !== text){
				titleElm.options[i].text = theme;
			}
			title = titleElm.value;
		}
		return title;
	};
	
	/**
	* Local-Storage
	*/
	// set-clear
	$$.setClearButton = function(){
		var btns = document.getElementsByClassName("cls");
		if(!btns.length){return}
		for(var i=0; i<btns.length;i++){
			btns[i].onclick = $$.setDataClear;
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
		var title = document.getElementById($$.data.typeName[3]);
		for(var i=0; i<title.options.length; i++){
			if(title.options[i].value == title.value){
				title.options[i] = null;
				break;
			}
		}
	};
	// cells-clear
	$$.setCellClear = function(){
		var mandara = document.getElementById($$.data.typeName[0]);
		if(mandara == null){return}
		var tables = mandara.getElementsByClassName($$.data.typeName[1]);
		if(!tables.length){return}
		for(var i=0; i<tables.length; i++){
			var cells = tables[i].getElementsByClassName($$.data.typeName[2]);
			for(var j=0; j<cells.length; j++){
				cells[j].value = "";
			}
		}
	};
	
	// load
	$$.setLoadData = function(key){
		
		var mandara = document.getElementById($$.data.typeName[0]);
		if(mandara == null){return}
		var tables = mandara.getElementsByClassName($$.data.typeName[1]);
		if(!tables.length){return}
		
		$$.setCellClear();
		
		var title = $$.getTitleValue();
		if(title === ""){return}
		
		var data = localStorage.getItem(title);
		if(data === null){return}
		
		var arr = JSON.parse(data);
		for(var i=0; i<tables.length; i++){
			
			var cells = tables[i].getElementsByClassName($$.data.typeName[2]);
			
			for(var j=0; j<cells.length; j++){
				var key = cells[j].getAttribute($$.data.typeName[4]);
				var str =(typeof arr[key] == "undefined")?"":arr[key];
				cells[j].value = str;
			}
		}
	};
	
	// Theme-value
	$$.getThemeValue = function(){
		var mandara = document.getElementById($$.data.typeName[0]);
		var tables = mandara.getElementsByClassName($$.data.typeName[1]);
		var cells = tables[4].getElementsByClassName($$.data.typeName[2]);
		return cells[4].value;
	};
	
	// select-title-lists
	$$.setTitleLists = function(){
		var titleElm = document.getElementById($$.data.typeName[3]);
		for(var i=0; i<localStorage.length; i++){
			var ls_key = localStorage.key(i);
			if(!ls_key.match(/^m_/)){continue}
			titleElm.options[titleElm.options.length] = new Option($$.getData2Theme(ls_key) , ls_key);
		}
	};
	
	$$.getData2Theme = function(key){
		if(!key){return}
		var data = localStorage.getItem(key);
		if(data === null){return ""}
		var json = JSON.parse(data);
		var res = "";
		if(typeof json[$$.data.table.theme] !== "undefined"){
			res = json[$$.data.table.theme];
		}
		return res;
	};
	
	// get-cell-name
	$$.getCellName = function(num){
		return $$.data.typeName[6] + num.toString();
	};
	
	// local-storage-data-backword-compatibility
	$$.setDataConvert = function(){
		// mandaraList_** -> m_**
		for(var i=0; i<localStorage.length; i++){
			var ls_key = localStorage.key(i);
			var new_data = {};
			if(ls_key.match(/^mandaraList_/)){
				var ls_val = localStorage.getItem(ls_key);
				var ls_json = JSON.parse(ls_val);
				var key = $$.data.typeName[6] + ls_key.replace($$.data.typeName[5],"");
				for(var a in ls_json){
					var num = a.replace($$.data.typeName[6] , "");
					if(num == 0 || num == 1 || num == 2)				{new_data["0-"+(num - 0)] = ls_json[a]}
					else if(num == 9 || num == 10 || num == 11)		{new_data["0-"+(num - 6)] = ls_json[a]}
					else if(num == 18 || num == 19 || num == 20)	{new_data["0-"+(num - 12)] = ls_json[a]}
					else if(num == 3 || num == 4 || num == 5)			{new_data["1-"+(num - 3)] = ls_json[a]}
					else if(num == 12 || num == 13 || num == 14)	{new_data["1-"+(num - 9)] = ls_json[a]}
					else if(num == 21 || num == 22 || num == 23)	{new_data["1-"+(num - 15)] = ls_json[a]}
					else if(num == 6 || num == 7 || num == 8)			{new_data["2-"+(num - 6)] = ls_json[a]}
					else if(num == 15 || num == 16 || num == 17)	{new_data["2-"+(num - 12)] = ls_json[a]}
					else if(num == 24 || num == 25 || num == 26)	{new_data["2-"+(num - 18)] = ls_json[a]}
					
					else if(num == 27 || num == 28 || num == 29)	{new_data["3-"+(num - 27)] = ls_json[a]}
					else if(num == 36 || num == 37 || num == 38)	{new_data["3-"+(num - 32)] = ls_json[a]}
					else if(num == 45 || num == 46 || num == 47)	{new_data["3-"+(num - 39)] = ls_json[a]}
					else if(num == 30 || num == 31 || num == 32)	{new_data["4-"+(num - 30)] = ls_json[a]}
					else if(num == 39 || num == 40 || num == 41)	{new_data["4-"+(num - 35)] = ls_json[a]}
					else if(num == 48 || num == 49 || num == 50)	{new_data["4-"+(num - 42)] = ls_json[a]}
					else if(num == 33 || num == 34 || num == 35)	{new_data["5-"+(num - 33)] = ls_json[a]}
					else if(num == 42 || num == 43 || num == 44)	{new_data["5-"+(num - 38)] = ls_json[a]}
					else if(num == 51 || num == 52 || num == 53)	{new_data["5-"+(num - 45)] = ls_json[a]}
					
					else if(num == 54 || num == 55 || num == 56)	{new_data["6-"+(num - 54)] = ls_json[a]}
					else if(num == 63 || num == 64 || num == 65)	{new_data["6-"+(num - 60)] = ls_json[a]}
					else if(num == 72 || num == 73 || num == 74)	{new_data["6-"+(num - 66)] = ls_json[a]}
					else if(num == 57 || num == 58 || num == 59)	{new_data["7-"+(num - 57)] = ls_json[a]}
					else if(num == 66 || num == 67 || num == 68)	{new_data["7-"+(num - 63)] = ls_json[a]}
					else if(num == 75 || num == 76 || num == 77)	{new_data["7-"+(num - 69)] = ls_json[a]}
					else if(num == 60 || num == 61 || num == 62)	{new_data["8-"+(num - 60)] = ls_json[a]}
					else if(num == 69 || num == 70 || num == 71)	{new_data["8-"+(num - 66)] = ls_json[a]}
					else if(num == 78 || num == 79 || num == 80)	{new_data["8-"+(num - 72)] = ls_json[a]}
				}
				var data = JSON.stringify(new_data);
				localStorage.setItem(key , data);
			}
		}
		for(var i=localStorage.length-1; i>=0; i--){
			var ls_key = localStorage.key(i);
			if(ls_key.match(/^mandaraList_/)){
				localStorage.removeItem(ls_key);
			}
		}
		
	};
	
	$$.__construct();
	return $$;
})();