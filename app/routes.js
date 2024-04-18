const govukPrototypeKit = require("govuk-prototype-kit");
const router = govukPrototypeKit.requests.setupRouter();
const request = require("request");
const _ = require("lodash");
const camden = require("../app/data/camden.json");
const camden2 = require("../app/data/camden2.json");

router.all("*", (req, res, next) => {
  res.locals.query = req.query;
  next();
});

router.get("/dataset", (req, res) => {
  let options = [
    { text: "Article 4 direction dataset" },
    { text: "Conservation area dataset" },
  ];

  options = options.map((option) => {
    option.value = option.text;
    return option;
  });

  res.render("dataset", {
    options,
  });
});

router.post("/dataset", (req, res) => {
  res.redirect("/upload-method");
});

router.post("/upload-method", (req, res) => {
  if (req.body.check.uploadMethod == "file") {
    res.redirect("/upload");
  } else {
    res.redirect("/url");
  }
});

router.post("/upload", (req, res) => {
  if (req.body.check.file == "no-errors.csv") {
    res.redirect("/no-errors");
  } else {
    res.redirect("/upload-progress");
  }
});

router.post("/url", (req, res) => {
  if (req.body.check.url == "https://good.com") {
    res.redirect("/no-errors");
  } else {
    res.redirect("/errors");
  }
});

router.get("/errors", (req, res) => {
  // let rows = camden.slice(0, 10);
  let rows = camden;

  rows = rows.map((row) => {
    const newRow = {};
    for (const key in row) {
      newRow[key] = { value: row[key] };
    }
    return newRow;
  });

  rows.map((row) => {
    let newRow = row;
    newRow.Reference.value = "";
    return newRow;
  });

  rows.map((row) => {
    let newRow = row;
    let errorType = _.sample([
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "Start date must be today or in the past",
      "Geometry must be in England",
    ]);

    newRow.Reference.value = "";
    newRow.Reference.error = errorType;

    switch (errorType) {
      case "Reference missing":
        // newRow.Reference.value = ''
        // newRow.Reference.error = errorType
        break;
      case "Start date must be today or in the past":
        newRow["Start date"].value = "01/12/2025";
        newRow["Start date"].error = errorType;
        break;
      case "Geometry must be in England":
        newRow["Geometry"].error = errorType;
        break;
    }
    return newRow;
  });

  const locationErrorCount = rows.reduce((acc, row) => {
    if (row.Geometry.error) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const referenceErrorCount = rows.reduce((acc, row) => {
    if (row.Reference.error) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const startDateErrorCount = rows.reduce((acc, row) => {
    if (row["Start date"].error) {
      return acc + 1;
    }
    return acc;
  }, 0);
  res.render("errors", {
    rows,
    referenceErrorCount,
    locationErrorCount,
    startDateErrorCount,
  });
});

router.get("/no-errors", (req, res) => {
  let rows = camden;

  rows = rows.map((row) => {
    const newRow = {};
    for (const key in row) {
      newRow[key] = { value: row[key] };
    }
    return newRow;
  });
  res.render("no-errors", {
    rows,
    camden: JSON.stringify(camden2),
  });
});

router.post("/no-errors", (req, res) => {
  if (req.body.check.isCorrect == "Yes") {
    res.redirect("/confirmation");
  } else {
    res.redirect("/upload-method");
  }
});

router.use("/submit-endpoint/*", (req, res, next) => {
  res.locals.serviceName = "Submit your planning and housing data for England";
  next();
});

router.get("/submit-endpoint/lpa-details", (req, res) => {
  const lpaDataUrl =
    "https://www.planning.data.gov.uk/entity.json?dataset=local-authority&limit=400";

  let lpaData = {};

  request(lpaDataUrl, (error, response, body) => {
    if (error) {
      return console.log(error);
    } else if (response.statusCode == 200) {
      lpaData = JSON.parse(body);
      lpaArray = [];

      lpaData.entities.forEach((lpa) => {
        lpaArray.push({
          text: lpa.name,
          value: lpa.name,
        });
      });

      res.render("submit-endpoint/lpa-details.html", {
        lpaData: lpaArray,
      });
    }
  });
});

router.get("/submit-endpoint/choose-dataset", (req, res) => {
  let options = [
    { text: "Article 4 direction dataset" },
    { text: "Conservation area dataset" },
  ];

  options = options.map((option) => {
    option.value = option.text;
    return option;
  });

  res.render("submit-endpoint/choose-dataset.html", {
    options,
  });
});
