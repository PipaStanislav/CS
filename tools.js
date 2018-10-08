class Tools {

	prepareData (){
		const newBasicData = _.cloneDeep(basicData);

		const getTableRows = document.getElementsByTagName('tr');

		const newData = {
			data: newBasicData,
			index: getTableRows.length -1,
		}; 

		return newData;
	}

	resetTextarea (){
		const textarea = document.getElementById('textarea');
		textarea.value = "";
	}	

	removingRow(object) {
		let trIndex;
		const tbody = document.getElementById('tbody');

		if(object.path){
			object.path.forEach((object, index) => {
				if(object.localName === 'tr'){
					trIndex = index;
				}
			});

			const indexObjectInArray = object.target.parentElement.parentElement.parentElement.parentElement.rowIndex -1;
			

			_.pullAt(db, indexObjectInArray);
			tbody.removeChild(object.path[trIndex]);

		} else if (object.toElement){
			_.pullAt(db, object.toElement.parentElement.parentElement.parentElement.innerText -1);
			tbody.removeChild(object.target.parentElement.parentElement.parentElement.parentElement);
		}

	}

	createRow (tr, number, index, row){
		const tools = new Tools;

		if (index === 0){
			const td = document.createElement('td');
			td.appendChild(number);
			td.style.textAlign = 'center';
			tr.appendChild(td);

		} else if (index === 3){
			const td = document.createElement('td');
			td.style.border = 'none';
			const div = document.createElement('div');
			div.id = 'removeRow';
			div.addEventListener('click', tools.removingRow, false);
			const index = document.createElement('index');
			index.classList.add('fas', 'fa-minus-circle', 'fa-lg');
			div.appendChild(index);
			td.appendChild(div);
			tr.appendChild(td);

		} else {
			const td = document.createElement('td');
			const input = document.createElement('input');
			input.addEventListener('change', tools.listenChangeInput, false);
			input.classList.add('input');

			if (index === 1){
				input.value = row.name
			} else if (index === 2){
				input.value = row.value;
			}

			td.appendChild(input);
			tr.appendChild(td);
			
		}
	}

	addingRow(row, index) {
		const tools = new Tools;
		const tr = document.createElement('tr');
		const number = document.createTextNode(index + 1);

		for (let i = 0; i < 4; i++ ){
			const tools = new Tools;
			tools.createRow(tr, number, i, row)
		}

		tbody.appendChild(tr);
	}

	listenChangeInput (object){
		const data = db[object.target.parentElement.parentElement.rowIndex -1];


		if(object.target.parentElement.cellIndex === 1){
			data.name = object.target.value;
		} else if (object.target.parentElement.cellIndex === 2){
			data.value = object.target.value;
		};
		
	}

	updatTableFileCSV (){
		const tools = new Tools;
		db = datFromCSVFile || [];
		const tableRows = document.getElementsByTagName('tr');

		for (let i = 1; i < tableRows.length;){

			tbody.removeChild(tableRows[i]);
		}
		
		db.forEach((row, index)=>{
			tools.addingRow(row, index);
		});	
	}

	updatTableFilesJSON (){
		const tools = new Tools;
		db = datFromJsonFile || [];
		const tableRows = document.getElementsByTagName('tr');

		for (let i = 1; i < tableRows.length;){

			tbody.removeChild(tableRows[i]);
		}

		db.forEach((row, index)=>{
			tools.addingRow(row, index);
		});	
	}

	addDnD(){
		$(document).ready(function() {
			$("#tbody").tableDnD();
		});
	}
}