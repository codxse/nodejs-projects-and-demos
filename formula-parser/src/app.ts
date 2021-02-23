// @ts-ignore
import {VALUES} from "./mock";

const FormulaParser = require('hot-formula-parser').Parser;

export type ValidationStatus = "ok" | "error"
export interface ValidationResponse {
  valid: boolean
  status: ValidationStatus
  message: string
}

export interface IFormulaParser {}

export class LambdaParser implements IFormulaParser {
  private parser = new FormulaParser()
  precision: number = 2
  lambda: string
  scope: Record<string, any>

  constructor(lambda: string, scope: Record<string, any>) {
    this.lambda = lambda
    this.scope = scope
    this.initVars()
  }

  evaluate(): number {
    const cleanLambda = this.cleanse()
    this.populateArrayVars(cleanLambda)
    this.withinArrayCalculation(cleanLambda)
    // this.parser.on("callFunction", (name: string, params: any[], done: any) => {
    //   if (name === 'ARRAY') {
    //     done(10);
    //   }
    // })
    const res = this.parser.parse(cleanLambda)
    // console.log("RES2", res)
    if (res.error) {
      throw new Error(res.error)
    }
    if (isNaN(res.result)) {
      return res.result
    }
    return LambdaParser.parseNumber(res.result, this.precision)
  }

  private initVars() {
    for (const [key, value] of Object.entries(this.scope)) {
      const variables = key.split(/\./)
      const variable = variables[variables.length - 1]
      this.parser.setVariable(variable, value)
    }
  }

  private cleanse(): string {
    const exp1 = this.aggregateExpression(this.lambda, "AVERAGE")
    const exp2 = this.aggregateExpression(exp1, "SUM")
    return exp2
  }

  private populateArrayVars(nextLambda: string) {
    // console.log(21, nextLambda)
    this.parser.on('callVariable', (name: string, done: any) => {
      // console.log(12, name)
      const re = /ARRAY\((.*)\)/gm
      let exp = null
      const lambda = nextLambda
      while ((exp = re.exec(lambda)) != null) {
        const fullMatch = exp[0]
        const expression = exp[1] || ""
        if (fullMatch && expression) {
          const arrayVar = expression
            .split(/[\s+\(\)\*\\\+-]/gm)
            .find((x) => x.match(/\w+\.\w+/gm))
          if ((arrayVar || "").includes(name)) {
            done(-1_000_000_000)
          }
        }
      }
    })
  }

  private withinArrayCalculation(nextLambda: string) {
    // console.log(1, nextLambda)
    this.parser.on("callFunction", (name: string, params: any[], done: any) => {
      // console.log(2)
      if (name === "ARRAY") {
        const re = /ARRAY\((.*)\)/gm
        let exp = null
        const lambda = nextLambda
        // console.log("exp", exp, lambda)
        while ((exp = re.exec(lambda)) != null) {
          const fullMatch = exp[0]
          const expression = exp[1] || ""
          if (fullMatch && expression) {
            const arrayVar = expression
              .split(/[\s+\(\)\*\\\+-]/gm)
              .find((x) => x.match(/\w+\.\w+/gm))
            if (arrayVar) {
              const [arrayName, variableName] = (arrayVar || "").split(".")
              const arrayOfValue: any[] = this.parser.getVariable(arrayName) || []
              const result = arrayOfValue.map((value = {}) => {
                const localParser = new FormulaParser()
                for (const [key, val] of Object.entries(value)) {
                  const variables = key.split(/\./)
                  const variable = variables[variables.length - 1]
                  localParser.setVariable(variable, val)
                }
                const localExpression = expression.replace(/\w+\./gm, "")
                return localParser.parse(localExpression)
              })
              // console.log("result", result)
              done(result.map((r) => r.result))
              return
            }
          }
        }
        done([])
      }
    })
    // console.log("X")
  }

  private aggregateExpression(rawLambda: string, aggregateFunction: string): string {
    const _re = `${aggregateFunction}\\(\\s?(\\w+)\\.(\\w+)\\s?\\)`
    const re = new RegExp(_re, "gm")
    let exp = null
    const lambda = rawLambda
    let nextLambda = rawLambda
    while ((exp = re.exec(lambda)) != null) {
      const fullMatch = exp[0]
      const arrayName = exp[1]
      const variableName = exp[2]
      if (fullMatch && arrayName && variableName) {
        const array: any[] = this.parser.getVariable(arrayName) || []
        const values = array.map((v) => v[variableName])
        nextLambda = nextLambda.replace(fullMatch, `${aggregateFunction}(${values.join()})`)
      }
    }
    return nextLambda
  }

  /**
   * validate string formula
   * @param {string} lambda
   * @param {Record<string, any>} scope
   * @return {ValidationResponse}
   */
  static validateFormula(lambda: string, scope: Record<string, any> = {}): ValidationResponse {
    // 1. check if formula valid, if valid continue
    const parser = new LambdaParser(lambda, scope)
    try {
      parser.evaluate()
      return {
        valid: true,
        status: "ok",
        message: `OK`
      }
    } catch (e) {
      // 2. Check if every variable is exist, if exist pass
      const variables = lambda.split(/[\+\s\-\*\\()]+|AVERAGE|SUM/g).filter(v => (v[0] || "").match(/^[a-zA-Z_]+/g))
      if (variables.length > 0) {
        const validationStatus = variables.map((v) => {
          // if array var
          if (v.split("/\./g").length > 1) {
            const [arrayName, variableName] = v.split("/\./g")
          }
          const valid = Boolean(scope[v])
          return {
            valid,
            status: valid ? "ok" : "error",
            message: valid ? "" : `Variable ${v} doesn't exist`
          }
        })

        // 2. Check if every variable is exist, if exist pass
        const response = validationStatus.reduce((acc, current) => {
          const nextValid = acc.valid && current.valid
          return {
            valid: nextValid,
            status: nextValid ? "ok" : "error",
            message: acc.message + (current.message !== "" ? `, ${current.message}` : "")
          }
        })

        return response as ValidationResponse
      }

      return {
        valid: false,
        status: "error",
        message: `Invalid formula! ${e.message}`
      }
    }
  }

  /**
   * parse any string number to float, if it giving NaN it will return 0.0
   * @param {string} number
   * @param {number} precision
   * @return {number}
   */
  static parseNumber(number: string | number, precision: number = 2): number {
    const nextNumber: string = `${number}`
    const prec = parseFloat(nextNumber).toFixed(precision)
    return parseFloat(prec)
  }
}