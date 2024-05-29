import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
const loadYamlFile = (filePath: any) => {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return yaml.load(fileContents);
  } catch (e) {
    console.log(e);
    throw e;
  }
};

const yamlFilePath = path.join(__dirname, "./swagger.yaml");
const swaggerDocument: any = loadYamlFile(yamlFilePath);

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5500",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

// Menggabungkan definisi YAML dengan opsi Swagger
options.definition = {
  ...options.definition,
  ...swaggerDocument,
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
