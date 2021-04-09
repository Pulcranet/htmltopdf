import pdf from "html-pdf"
import fetch from "node-fetch"
import { writeFile, readdirSync } from "fs"
import { join, parse } from "path"
import { promisify } from "util"

const writeFileP = promisify(writeFile)

process.env.PATH = `${process.env.PATH}:/opt`
process.env.FONTCONFIG_PATH = "/opt"
process.env.LD_LIBRARY_PATH = "/opt"

export const htmlToPdf = async event => {
  const { options, assets } = event
  let { html } = event

  const savedAssets = readdirSync("/tmp/")
  await Promise.all(assets.map(async e => {
    const { base } = parse(e)
    html = html.replace(new RegExp(e, "g"), join("file:///tmp/", base))
    if (!savedAssets.includes(base)) {
      const res = await fetch(e)
      if (res.ok) {
        await writeFileP(join("/tmp", base), await res.buffer())
      }
    }
  }))
  return await exportHtmlToPdf(html, options)
}

const exportHtmlToPdf = (html, options) => {
  return new Promise((resolve, reject) => {
    options = {
      ...options,
      format: "A4",
      orientation: "portrait"
    }

    if (process.env.NODE_ENV !== "local") {
      options.phantomPath = "/opt/phantomjs_linux-x86_64"
    }

    pdf.create(html, options).toBuffer((err, buffer) => {
      if (err) {
        reject(err)
      } else {
        resolve(buffer)
      }
    })
  })
}
