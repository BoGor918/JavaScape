// import package
import express from "express";
import puppeteer from "puppeteer";
import * as dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

// basic setup
dotenv.config();
const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// make cors origin to all
app.use(
  cors({
    origin: "*",
  })
);

// Default page
app.get("/", function (req, res) {
  res.json({
    message: "Welcome to JavaScape Back-End",
  });
});

// get result method
app.get("/querySearch", async (req, res) => {
  try {
    // get query from request
    const { q } = req.query;

    // launch puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${q}`);

    // handle all results
    const result = await page.evaluate(() => {
      // results interface
      const results: {
        title: string;
        description: string;
        link: string;
      }[] = [];

      // outter div block class
      const items = document.querySelectorAll(".MjjYud");

      // for each div block get corresponding data 
      items.forEach((item) => {
        // url link
        const link = item.querySelector("a");
        // title
        const title = link?.querySelector("h3")?.innerText;
        //@ts-ignore // description
        const description = item.querySelector(".lEBKkf")?.innerText;

        // only push if title is not null
        if (title) {
          results.push({
            title,
            description,
            link: link.href,
          });
        }
      });

      return results;
    });

    // close browser
    await browser.close();

    // send result
    res.status(200).json(result);
  } catch (e) {
    // handle error
    console.log(e);
    res.status(500).json({
      message: "Something went wrong when getting result",
      error: e,
    });
  }
});

// start server
app.listen(port, () => {
  console.log(`JavaScape Back-End listening on port http://localhost:${port}`);
});