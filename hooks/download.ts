import { saveAs } from 'file-saver'
import JSZip from 'jszip'

export function useDownload(fileList: any[], filename: string) {
  if (fileList.length === 1) {
    saveAs(fileList[0].file, filename)
  }

  if (fileList.length > 1) {
    const zip = new JSZip()
    fileList.forEach((item) => {
      zip.file(item.filename, item.file)
    })
    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, filename)
    })
  }
}