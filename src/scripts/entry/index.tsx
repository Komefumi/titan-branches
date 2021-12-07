import "@config/polyfill";

import React from "react";
import { render as DOMRender } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import getHomeHTML from "@templates/home.hbs";
import { makeFile } from "@api/file";
import { isDev } from "@config/index";

if (isDev) {
  console.log("It is dev");
  console.log({ homeHTML: getHomeHTML() });
  makeFile("home.html", getHomeHTML())
    .then((indexFileCreationResponseData) => {
      console.log({ indexFileCreationResponseData });
    })
    .catch((errIndexFileCreationResponseData) => {
      console.error({ errIndexFileCreationResponseData });
    });
}

import IndexApp from "@apps/IndexApp";

import "@styling/index.scss";

DOMRender(
  <BrowserRouter>
    <IndexApp />
  </BrowserRouter>,
  document.getElementById("entry")
);
