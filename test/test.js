/* eslint-disable no-console */
const AWS = require("aws-sdk")
const { writeFileSync, readFileSync } = require("fs")
const { join } = require("path")


const lambda = new AWS.Lambda({
  region: "eu-west-1"
})
console.log(__dirname)
void (async() => {
  const { Payload } = await lambda.invoke({
    FunctionName: "htmlToPdf-staging-htmlToPdf",
    Payload: JSON.stringify({
      html: readFileSync(join(__dirname, "./test.html"), "utf-8"),
      options: {
        format: "A4",
        zoomFactor: .55,
        border: "0.5cm",
        footer: {
          height: "28mm",
          contents: {
            default: "<span style=\"color: #444;\">{{page}}</span>/<span>{{pages}}</span>"
          }
        }
      },
      assets: [
        "https://statics.holyart.it/images/logo-holyart_5ff584c928.svg"
      ]
    })
  }).promise()

  writeFileSync(join(__dirname, "./test.pdf"), Buffer.from(JSON.parse(Payload)))
})()
  .catch(console.error)


