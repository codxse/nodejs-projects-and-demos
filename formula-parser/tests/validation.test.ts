import { expect, assert } from 'chai'
import { LambdaParser } from "../src/app";
import { VALUES } from "../src/mock";

describe("Formula doesn't valid", () => {
  it("Only operator", () => {
    const lambda = "+"
    const scope = {}
    const res = LambdaParser.validateFormula(lambda, scope)
    expect(res.message).to.equal("Invalid formula! #ERROR!")
  })

  it("Operator not complete", () => {
    const lambda = "1 + 2 +"
    const res = LambdaParser.validateFormula(lambda, {})
    expect(res.message).to.equal("Invalid formula! #ERROR!")
  })

  it("Invalid parent 1", () => {
    const lambda = ")1 + 2("
    const res = LambdaParser.validateFormula(lambda, {})
    expect(res.message).to.equal("Invalid formula! #ERROR!")
  })

  it("Invalid parent 2", () => {
    const lambda = "() 1 + 2)"
    const res = LambdaParser.validateFormula(lambda, {})
    expect(res.message).to.equal("Invalid formula! #ERROR!")
  })

  it("Invalid parent 3", () => {
    const lambda = "(1 + 2"
    const res = LambdaParser.validateFormula(lambda, {})
    expect(res.message).to.equal("Invalid formula! #ERROR!")
  })
})

describe("Variable doesn't valid", () => {
  it("Variable not found", () => {
    const lambda = "a + b + c"
    const res = LambdaParser.validateFormula(lambda, {b: 3})
    expect(res.message).to.equal("Variable a doesn't exist, Variable c doesn't exist")
  })
})
