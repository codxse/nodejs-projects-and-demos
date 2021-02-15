import { expect, assert } from 'chai'
import { LambdaParser } from "../src/app";
import { VALUES } from "../src/mock";

describe("Very simple correct formula test", () => {
  it("Adding two number, without variable", () => {
    const parser = new LambdaParser("1 + 1", {})
    const should = parser.evaluate()
    const expected = 2
    expect(should).to.equal(expected)
  })

  it("Adding two number, without variable without space", () => {
    const parser = new LambdaParser("1+1", {})
    const should = parser.evaluate()
    const expected = 2
    expect(should).to.equal(expected)
  })

  it("Multiple numbers, without variable", () => {
    const parser = new LambdaParser("1 * 2 * 3.141592653589793", {})
    const should = parser.evaluate()
    const expected = 6.28
    expect(should).to.equal(expected)
  })

  it("Multiple numbers, without variable without space", () => {
    const parser = new LambdaParser("1*2*3.141592653589793", {})
    const should = parser.evaluate()
    const expected = 6.28
    expect(should).to.equal(expected)
  })

  it("Simple division", () => {
    const parser = new LambdaParser("6 / 2", {})
    const should = parser.evaluate()
    const expected = 3
    expect(should).to.equal(expected)
  })

  it("Simple division without space", () => {
    const parser = new LambdaParser("6/2", {})
    const should = parser.evaluate()
    const expected = 3
    expect(should).to.equal(expected)
  })

  it("Division with zero should error", () => {
    const parser = new LambdaParser("1 / 0", VALUES)
    expect(parser.evaluate.bind(parser)).to.throw("#DIV/0!")
  })

  it("Division with zero should error without space", () => {
    const parser = new LambdaParser("1/0", VALUES)
    expect(parser.evaluate.bind(parser)).to.throw("#DIV/0!")
  })
})

describe("Very simple correct formula with variable", () => {
  it("Adding two number, with variable", () => {
    const parser = new LambdaParser("constant_qz2ac8b5e99415 + 1", VALUES)
    const should = parser.evaluate()
    const expected = 13
    expect(should).to.equal(expected)
  })

  it("Multiple numbers, with variable", () => {
    const parser = new LambdaParser("constant_qz2ac8b5e99415 * 1", VALUES)
    const should = parser.evaluate()
    const expected = 12
    expect(should).to.equal(expected)
  })

  it("Simple division", () => {
    const parser = new LambdaParser("constant_qz2ac8b5e99415 / 2", VALUES)
    const should = parser.evaluate()
    const expected = 6
    expect(should).to.equal(expected)
  })

  it("Division with zero should error", () => {
    const parser = new LambdaParser("constant_qz2ac8b5e99415 / 0", VALUES)
    expect(parser.evaluate.bind(parser)).to.throw("#DIV/0!")
  })

  it("String one plus String one", () => {
    const parser = new LambdaParser("string_one + string_one", VALUES)
    const should = parser.evaluate()
    const expected = 2
    expect(should).to.equal(expected)
  })

  it ("String one plus Integer one", () => {
    const parser = new LambdaParser("string_one + integer_one", VALUES)
    const should = parser.evaluate()
    const expected = 2
    expect(should).to.equal(expected)
  })

  it ("Integer one plus string one", () => {
    const parser = new LambdaParser("integer_one + string_one", VALUES)
    const should = parser.evaluate()
    const expected = 2
    expect(should).to.equal(expected)
  })
})

describe("Invalid variable throwing error", () => {
  it("Invalid variable", () => {
    const parser = new LambdaParser("unknown_variable / 1", VALUES)
    expect(parser.evaluate.bind(parser)).to.throw("#NAME?")
  })
})

describe("Array variables", () => {
  it("SUM", () => {
    const parser = new LambdaParser("SUM(1,2,3)", VALUES)
    const should = parser.evaluate()
    const expected = 6
    expect(should).to.equal(expected)
  })

  it("SUM VARS ARR", () => {
    const parser = new LambdaParser("SUM(Keluarga_qz9fe7fdbb683d.Jumlah_anak_qzb42b12e0cd2f)", VALUES)
    const should = parser.evaluate()
    const expected = 4
    expect(should).to.equal(expected)
  })

  it("AVERAGE", () => {
    const parser = new LambdaParser("AVERAGE(2, 5)", VALUES)
    const should = parser.evaluate()
    const expected = 3.5
    expect(should).to.equal(expected)
  })

  it("AVERAGE VARS ARR", () => {
    const parser = new LambdaParser("AVERAGE(Keluarga_qz9fe7fdbb683d.Jumlah_anak_qzb42b12e0cd2f)", VALUES)
    const should = parser.evaluate()
    const expected = 2
    expect(should).to.equal(expected)
  })

  it("SUM lambda with space", () => {
    const scope = {"document.name":"Untitled","document.title":"Test Formula 1","unlisted.satu_qz77fc8182562e":"1","unlisted.dua_qz31f3a11aa307":"2","unlisted.uang_saya_qz20ff90468401":[{"uang_jajan_qz40737881d382":"1"},{"uang_jajan_qz40737881d382":"2"}]}
    const parser = new LambdaParser("SUM( uang_saya_qz20ff90468401.uang_jajan_qz40737881d382 )", scope)
    const should = parser.evaluate()
    const expected = 3
    expect(should).to.equal(expected)
  })
})