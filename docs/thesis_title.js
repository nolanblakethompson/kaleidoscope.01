let symmetry = 6;
let angle;
let saveButton, clearButton, fullscreenButton, blurSlider, colorSlider;
let blurValue = 0;

function setup() {
  createCanvas(1500, 500);
  angle = 360 / symmetry;
  angleMode(DEGREES);
  background(10,10);
  colorMode(HSB, 360, 100, 100); // Set color mode to HSB
  

  // Creating div for buttons
  let buttonDiv = createDiv('');
  buttonDiv.position(10, 550);

  // Creating the save button for the file
  saveButton = createButton('save');
  saveButton.parent(buttonDiv);
  saveButton.mousePressed(saveFile);
  saveButton.class('button-style');

  // Creating the clear screen button
  clearButton = createButton('clear');
  clearButton.parent(buttonDiv);
  clearButton.mousePressed(clearScreen);
  clearButton.class('button-style');

  // Creating the button for Full Screen
  fullscreenButton = createButton('full screen');
  fullscreenButton.parent(buttonDiv);
  fullscreenButton.mousePressed(screenFull);
  fullscreenButton.class('button-style');

  // Creating the blur slider
  let blurLabel = createSpan('Blur Amount:');
  blurLabel.parent(buttonDiv);
  blurLabel.class('label-style');

  blurSlider = createSlider(0, 20, 0);
  blurSlider.parent(buttonDiv);
  blurSlider.style('width', '100px');
  blurSlider.input(updateBlurValue);
  blurSlider.class('slider-style');
  

  // Creating the color slider
  let colorLabel = createSpan('Color:');
  colorLabel.parent(buttonDiv);
  colorLabel.class('label-style');

  colorSlider = createSlider(0, 360, 0); // Hue ranges from 0 to 360
  colorSlider.parent(buttonDiv);
  colorSlider.style('width', '100px');
  colorSlider.input(updateColor);
  colorSlider.class('slider-style');

  let sliderDiv = createDiv('');
  sliderDiv.position(10, 550);

  // Creating the background color slider
  let bgColorLabel = createSpan('Background Color:');
  bgColorLabel.parent(buttonDiv);
  bgColorLabel.class('label-style');

  bgColorSlider = createSlider(0, 360, 0); // Hue ranges from 0 to 360
  bgColorSlider.parent(buttonDiv);
  bgColorSlider.style('width', '100px');
  bgColorSlider.input(updateBackgroundColor);
  bgColorSlider.class('slider-style');

}



// Save File Function
function saveFile() {
  save('design.png');
}

// Clear Screen function
function clearScreen() {
  background(10,10);
}

// Full Screen Function
function screenFull() {
  let fs = fullscreen();
  fullscreen(!fs);
}

// Function to update blur value from slider
function updateBlurValue() {
  blurValue = blurSlider.value();
}

// Function to update stroke color based on color slider value
function updateColor() {
  let hue = colorSlider.value();
  stroke(hue, 100, 100); // Set stroke color based on hue
}

function updateBackgroundColor() {
    let hue = bgColorSlider.value();
    let newColor = color(hue, 100, 100);
    background(newColor);
  }

function draw() {
  translate(width / 2, height / 2);

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    let d = dist(mx, my, pmx, pmy); // Calculate distance between current and previous points
    let interp = map(d, 0, 100, 0, 1); // Map distance to a value between 0 and 1 for interpolation

    strokeWeight(3); // Set stroke weight

    if (mouseIsPressed) {
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }

    // Apply blur effect if activated
    if (blurValue > 0 && mouseIsPressed) {
      drawingContext.filter = 'blur(' + blurValue + 'px)';
    } else {
      drawingContext.filter = 'none'; // Remove any filter if blur is not activated
    }
  }
}


