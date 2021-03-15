import { expect } from 'chai'
import { mockHTMLwithTable } from "./mock-utils/html-with-table";
import { cleanHTMLString } from "../src/utils/cleanHTML";

describe("Clean HTML test", () => {
  it("test with html table included", () => {
    const cleanHTML = cleanHTMLString(mockHTMLwithTable)
    expect(cleanHTML).to.has.length.above(0)
  })
})