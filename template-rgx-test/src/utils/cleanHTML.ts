export const cleanHTMLString = (htmlString: string): string => {
  const styleRgx = /<style\s?[^>]*?>(.|\s)*?<\/style>/gm
  let styleString = ""
  let tempRes = null
  while ((tempRes = styleRgx.exec(htmlString)) !== null) {
    if (tempRes) {
      styleString = tempRes[0]
    }
  }

  const htmlBodyRgx = /<body\s?[^>]*?>((.|\s)*?)<\/body>/gm
  let bodyString = ""
  let tempRes2 = null
  while ((tempRes2 = htmlBodyRgx.exec(htmlString)) !== null) {
    if (tempRes2) {
      bodyString = tempRes2[1]
    }
  }

  return `<div>${styleString} ${bodyString}</div>`
}