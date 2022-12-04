const compareImages = require("resemblejs/compareImages");
const fs = require("fs");
const newFolder = "./cypress/screenshots/images/cypress/profile_new/";
const oldFolder = "./cypress/screenshots/images/cypress/profile_old/";
const config = require("./config.json");
const resultsFolder = "results_resemble";

const { options } = config;

fs.readdir(oldFolder, async (err, files) => {
  if (!fs.existsSync(`./${resultsFolder}/compare_images`)) {
    fs.mkdirSync(`./${resultsFolder}/compare_images`, { recursive: true });
  }
  let datetime = new Date().toISOString().replace(/:/g, ".");
  let resultInfo = [];

  for (let file of files) {
    await executeTest(file, resultInfo);
  }

  // Generar reporte de resultados
  fs.writeFileSync(
    `./${resultsFolder}/report.html`,
    createReport(datetime, resultInfo)
  );
  fs.copyFileSync("./resemble/index.css", `./${resultsFolder}/index.css`);

  console.log(
    `Execution finished. Check the ${resultsFolder} folder to load de results or run de comand 'npm run resemble_results'`
  );
});

async function executeTest(file, resultInfo) {
  const data = await compareImages(
    fs.readFileSync(`${newFolder}${file}`),
    fs.readFileSync(`${oldFolder}${file}`),
    options
  );
  const info = {
    file: file,
    isSameDimensions: data.isSameDimensions,
    dimensionDifference: data.dimensionDifference,
    rawMisMatchPercentage: data.rawMisMatchPercentage,
    misMatchPercentage: data.misMatchPercentage,
    diffBounds: data.diffBounds,
    analysisTime: data.analysisTime,
  };
  resultInfo.push(info);

  console.log(file);
  fs.writeFileSync(
    `./${resultsFolder}/compare_images/compare-${file}`,
    data.getBuffer()
  );
}

function createReport(datetime, resInfo) {
  return `
      <html>
      <head>
        <title>VRT Report Ghost</title>
        <link href="index.css" type="text/css" rel="stylesheet" />
      </head>
      <body class="container">
        <h1 class="title">
          Report for Visual Regresion Testing comparing:<br />
          <a href="${config.newUrl}" class="py-3"> Ghost v5.19.0 </a> &&
          <a href="${config.oldUrl}"> Ghost v3.49.9</a>
        </h1>
        <br/>
        <h2>Executed: <span class="result">${datetime} on</span>  Browser: <span class="result">"chrome"</span></h2>
        <div id="visualizer">
        ${resInfo.map((image) => ImageView(image))}
        </div>
      </body>
    </html>`;
}

function ImageView(image) {
  return `
    <div class="browser" id="test0">
      <h3>Image: <span class="result">${image.file}</span></h3>
      <h4>
        Mismatch Percentage :
        <span class="mismatch">${image.misMatchPercentage}</span>
      </h4>
      <div class="btitle">
        <p>Data: <span class="result">${JSON.stringify(image)}</span></p>
      </div>

      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Reference</span>
          <img class="img2" src="../cypress/screenshots/images/cypress/profile_new/${
            image.file
          }" id="refImage" label="Reference" />
        </div>
        <div class="imgcontainer">
          <span class="imgname">Test</span>
          <img class="img2" src="../cypress/screenshots/images/cypress/profile_old/${
            image.file
          }" id="testImage" label="Test" />
        </div>
      </div>
      <div class="imgline">
        <div class="imgcontainer">
          <span class="imgname">Diff</span>
          <img class="imgfull" src="./compare_images/compare-${
            image.file
          }" id="diffImage" label="Diff" />
        </div>
      </div>
    </div>`;
}
