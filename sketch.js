// ***  vars  ***

let canvas; // canvas
let canvasImageData; // data to use to redraw the displayed image
let canvasW; // canvas width
let canvasH; // canvas height
let selectAreaToggle = false; // button select area status
let x1, x2, y1, y2; // mouse coord
let nClick = 0; // number of mouse clicks on canvas

// ***  setup  ***

function setup() {

	// canvas autosize with the window
	canvasW = windowWidth - 200;
	canvasH = canvasW / 4 * 3;

	canvas = createCanvas(canvasW, canvasH);
	background(125);


	cursor(CROSS); // cursor ittle cross

	// ***  canvas methods  ***

	canvas.mousePressed(canvasMousePressed);

	// *** drag and drop method to drop the files
	// *** on the canvas
	canvas.drop(gotFile);

	// **** setup the buttons ****

	// select area button
	var buttonSelect = createButton('Select Area', false);
	buttonSelect.position(windowWidth - 170, 120);
	buttonSelect.mouseClicked(selectArea);

	// reset view button
	var buttonReset = createButton('Reset Selection');
	buttonReset.position(windowWidth - 170, 150);
	buttonReset.mouseClicked(resetArea);

	// save file button
	var buttonSaveFile = createButton('Save File');
	buttonSaveFile.position(windowWidth - 170, 180);
	buttonSaveFile.mouseClicked(saveFile);

	// *** END OF SETUP
}

// *** function to setup imported files
function gotFile(file) {

	// write the filename and size
	createP(file.name + " " + file.size + "Kb");

	// create the image and hides it
	var img = createImg(file.data);
	img.hide();

	// creates the button to display the image
	createButtonDisplayImage(file.data);
}

function createButtonDisplayImage(fileData) {

	// create the var for the input data
	var imageData = fileData;

	// create the small pic close to the button
	var imageButton = createImg(imageData);
	imageButton.size(50, 50);
	createP(""); // to position the button below

	// creates the button to display the image
	// in the canvas
	var button = createButton('display image');

	// function to display the image in the canvas
	button.mousePressed(function () {
		var img = createImg(imageData);
		img.hide();

		// assign the canvasImageData to reuse in 
		// other functions
		canvasImageData = imageData;

		// display the image on the canvas
		image(img, 0, 0, width, height);
		//todo: resize image to original shape
		//image.resize(width, 0);
	})
}
//***    extra functons
function windowResized() {

	// canvas autosize with the window
	canvasW = windowWidth - 200;
	canvasH = canvasW / 4 * 3;
	resizeCanvas(canvasW, canvasH);
	background(125);

	// **** setup the buttons ****
	//! the buttons don't folllow
	// redraw select area button
	// buttonSelect.position(windowWidth - 170, 120);

	// redraw reset view button
	// buttonReset.position(windowWidth - 170, 150);

	// redraw save file button
	// buttonSaveFile.position(windowWidth - 170, 180);
	//! ---------------------------
}

//* --------  end setup canvas -------


//*      MOUSE FUNCTIONS
function mouseReleased() {
	nClick = 0; // reset nClick
	//todo: remove log
	console.log(x1, y1, x2, y2, nClick);

}

function mouseDragged() {

	// if button is active
	if (selectAreaToggle) {

		// if we have already the first point
		if (nClick == 1) {

			// take the coord for the
			// second point
			x2 = mouseX;
			y2 = mouseY;
			//todo: remove log
			console.log(x1, y1, x2, y2, nClick);

			// draw the rectangle
			drawSelectRect();
		}
	}

}

function canvasMousePressed() {
	// when you click the mouse

	// if select area is active
	if (selectAreaToggle) {

		// take the coord first point
		x1 = mouseX;
		y1 = mouseY;

		// increase nClick to take the second point
		nClick += 1;
		// todo: remove console log
		console.log(x1, y1, x2, y2, nClick);
	}
}

//* draw the selected rectangle
function drawSelectRect() {

	if (selectAreaToggle) {
		// if select area is active

		// if we have valid points
		if (((x1 != 0) || (x2 != 0)) && ((y1 != 0) || (y2 != 0))) {

			// redraw image on canvas
			var img = createImg(canvasImageData);
			img.hide();
			image(img, 0, 0, width, height);

			// draw rect
			fill(0, 0, 0, 0);
			stroke(255, 255, 0);
			strokeWeight(4);
			let x0 = Math.min(x1, x2);
			let y0 = Math.min(y1, y2);

			let w0 = Math.abs(x1 - x2);
			let h0 = Math.abs(y1 - y2);

			rect(x0, y0, w0, h0);


			// crosshair

			stroke(0); // color
			strokeWeight(1); // thickness
			// crosshair starting point
			line(0, y1, width, y1);
			line(x1, 0, x1, height);

			// crosshair ending point
			let x = mouseX; // draw
			let y = mouseY;
			line(0, y, width, y);
			line(x, 0, x, height);
			//todo: remove log
			console.log(x1, y1, x2, y2, nClick);
		}
	}
}


// ***  SELECT AREA  ***
function selectArea() {
	// button toggle
	if (selectAreaToggle) {
		selectAreaToggle = false;
	} else {
		selectAreaToggle = true;
	}
	// todo: remove log
	console.log(selectAreaToggle);
}

// *** reset area ***
function resetArea() {
	// if we have an image
	if (canvasImageData != null) {
		// display the image
		var img = createImg(canvasImageData);
		img.hide();
		image(img, 0, 0, width, height);
	} else {
		// else create gray background
		background(125);
	}

}

// *** save file ***
function saveFile() {

	// crop the image selected
	let x0 = Math.min(x1, x2);
	let y0 = Math.min(y1, y2);

	let w0 = Math.abs(x1 - x2);
	let h0 = Math.abs(y1 - y2);
	// get the data inside the coordinates
	let to_save = get(x0, y0, w0, h0);
	// save
	to_save.save("saved_name.png");
}



// function draw() {
// function draw() {

// }

//!----------- END