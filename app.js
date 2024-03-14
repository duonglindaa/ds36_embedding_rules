console.log("Hello World!");

//Create some constantys and variables that we will use later to find out about the workbook structure.
const viz = document.getElementById("ourviz");
let workbook;
let vizActiveSheet;
let listSheets;

//The sheets we want to filter
let salesmap;
let totalsales;
let salesbyproduct;
let salesbysegment;

//Log all the information about the workbook with a function.
function logWorkbookInformation() {
  //Get the workbook
  workbook = viz.workbook;
  console.log(`The workbook name is:"${workbook.name}" `);

  //Get the array of dashboards and stand-alone sheets
  let sheets = workbook.publishedSheetsInfo;
  sheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}]
    is: "${element.name}"`);
  });

  // We are only interested in the active sheet
  vizActiveSheet = workbook.activeSheet;
  console.log(`The active sheet name is: "${vizActiveSheet.name}"`);

  //List all the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach((element) => {
    index = element.index;
    console.log(`The sheet with index [${index}]
    is: "${element.name}"`);
  });

  salesmap = listSheets.find((ws) => ws.name == "SaleMap");
  totalsales = listSheets.find((ws) => ws.name == "Total Sales");
  salesbyproduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesbysegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}

// Log the workbook information once the viz is interactive.
viz.addEventListener("firstinteractive", logWorkbookInformation);

//Tell Javascript which button to look for
const OregonWashingtonButton = document.getElementById("oregon_and_washington");
const ClearFilterButton = document.getElementById("clear_filter");
const UndoButton = document.getElementById("undo");

//Functions to do when buttons are clicked
function OregonWashingtonFunction() {
  //Log what is pressed first
  console.log(OregonWashingtonButton.value);

  //Apply the filter to all of the sheets
  salesmap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalsales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesbyproduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesbysegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}

function ClearFilterFunction() {
  //Apply the filter to all of the sheets
  salesmap.clearFilterAsync("State");
  totalsales.clearFilterAsync("State");
  salesbyproduct.clearFilterAsync("State");
  salesbysegment.clearFilterAsync("State");
}

function UndoFunction() {
  viz.undoAsync();
}

OregonWashingtonButton.addEventListener("click", OregonWashingtonFunction);
ClearFilterButton.addEventListener("click", ClearFilterFunction);
UndoButton.addEventListener("click", UndoFunction);
