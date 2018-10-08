const tools = new Tools;


let db = [
	{		
		name: 'name1',
		value: 'value1'
	},
	{
		name: 'name2',
		value: 'value2'
	},
];

const basicData = {
	name: '',
	value: '',
};

let dataFromTextarea;

let datFromJsonFile;

let datFromCSVFile;


document.getElementById('addRow').addEventListener('click', addRow, false);

document.getElementById('textarea').addEventListener('change', listenChangeTextaree, false);

document.getElementById('updateTable').addEventListener('click', updateTableTextarea, false);

document.getElementById('getDataFromTable').addEventListener('click', getDataFromTable, false);

document.getElementById('addCSVFile').addEventListener('click', addCSVFile, false);

document.getElementById('downloadCSVFile').addEventListener('click', downloadCSVFile, false);

document.getElementById('downloadJSONFile').addEventListener('click', downloadJSONFile, false);

document.querySelector('#file').addEventListener('change', uploadFile, false);



if (db.length > 0){
	db.forEach((row, index)=>{
		tools.addingRow(row, index);
	});
};


function addRow (){
	const prepareData = tools.prepareData();

	db.push(prepareData.data);

	tools.addingRow(prepareData.data, prepareData.index);

	tools.addDnD();
};

function listenChangeTextaree (object){
	dataFromTextarea = JSON.parse(object.target.value);
};

function updateTableTextarea (){
	db = dataFromTextarea || [];

	const tableRows = document.getElementsByTagName('tr');

	for (let i = 1; i < tableRows.length;){
		tbody.removeChild(tableRows[i]);
	}

	db.forEach((row, index)=>{
		tools.addingRow(row, index);
	});

	tools.resetTextarea();
	dataFromTextarea = [];

	tools.addDnD();	
};

function getDataFromTable() {
	const textarea = document.getElementById('textarea');
	textarea.value = JSON.stringify(db);
	dataFromTextarea = JSON.parse(textarea.value);
};

function addCSVFile(){
	document.getElementById('file').click();
};

function downloadCSVFile (){
	const file = JSON.stringify(db);

	const fileCSV = Papa.unparse(file);
	
	const a = window.document.createElement('a');
	a.href = window.URL.createObjectURL(new Blob([fileCSV], {type: 'text/csv'}));
	a.download = 'file.csv';

	document.body.appendChild(a);
	a.click();
};

function downloadJSONFile (){

	const fileJSON = JSON.stringify(db);

	const a = window.document.createElement('a');
	a.href = window.URL.createObjectURL(new Blob([fileJSON], {type: 'text/json'}));
	a.download = 'file.json';

	document.body.appendChild(a);
	a.click();
};

function uploadFile() {

	const file = document.querySelector('#file').files[0];
	const correctExtensionJSON = /\.json$/.test(file.name || '');
	const correctExtensionCSV = /\.csv$/.test(file.name || '');


	if(correctExtensionJSON){
		const reader = new FileReader();

		reader.onload = function() {
			const datFromFile = JSON.parse(reader.result);
			datFromJsonFile = datFromFile;
			tools.updatTableFilesJSON();
		}

		reader.readAsText(file);
		document.getElementById('file').value = '';

		tools.addDnD();
		
	} else if (correctExtensionCSV){
		Papa.parse(file, {
			header: true,
			complete: function(results) {
				datFromCSVFile = results.data;
				tools.updatTableFileCSV();
			}
		});

		document.getElementById('file').value = '';

		tools.addDnD();

	} else {
		alert('You choose wrong file format. You need choose file with format CSV or JSON!');
	}
};





function insertTab(o, e){
	const kC = e.keyCode ? e.keyCode : e.charCode ? e.charCode : e.which;
	if (kC == 9 && !e.shiftKey && !e.ctrlKey && !e.altKey)
	{
		const oS = o.scrollTop;
		if (o.setSelectionRange)
		{
			const sS = o.selectionStart;
			const sE = o.selectionEnd;
			o.value = o.value.substring(0, sS) + "\t" + o.value.substr(sE);
			o.setSelectionRange(sS + 1, sS + 1);
			o.focus();
		}
		else if (o.createTextRange)
		{
			document.selection.createRange().text = "\t";
			e.returnValue = false;
		}
		o.scrollTop = oS;
		if (e.preventDefault)
		{
			e.preventDefault();
		}
		return false;
	}
	return true;
};


tools.addDnD();


