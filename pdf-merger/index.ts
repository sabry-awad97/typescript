import { PDFDocument } from "pdf-lib";
import { readFile, writeFile, readdir } from "fs/promises";

async function getPdfFiles() {
  const pdfFiles: string[] = [];
  const filenames = await readdir(process.cwd());
  for (const filename of filenames) {
    if (filename.endsWith(".pdf")) pdfFiles.push(filename);
  }
  return pdfFiles;
}

async function mergeDocuments() {
  const pdfFiles = await getPdfFiles();
  pdfFiles.sort();

  const mergedPdf = await PDFDocument.create();

  for (const filename of pdfFiles) {
    const srcDoc = await PDFDocument.load(await readFile(filename), {
      ignoreEncryption: true,
    });
    const indices = srcDoc.getPageIndices();
    const copiedPages = await mergedPdf.copyPages(srcDoc, indices);
    for (const pdfPage of copiedPages) {
      mergedPdf.addPage(pdfPage);
    }
  }

  const pdfBytes = await mergedPdf.save();
  await writeFile("allPdfs.pdf", pdfBytes);
}

mergeDocuments();
