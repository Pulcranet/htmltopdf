# HTML To PDF using AWS Lambda Functions and Layers with Serverless

[html-pdf](https://www.npmjs.com/package/html-pdf) is used to convert html to pdf

## Prerequisite

1. [Nodejs](https://nodejs.org/en/download/)
2. Install Serverless globally

```bash
npm i -g serverless
```

## Getting Started

Install all dependencies

```bash
npm install
```

## Deployment

Step 1. First deploy the layer.

```bash
cd layers/
sls deploy
```

Step 2. Deploy the main service that will be converting html to pdf

```bash
cd htmlToPdf/
sls deploy
```

## Reference

1. https://github.com/naeemshaikh27/phantom-lambda-fontconfig-pack
