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
    const res = this.parser.parse(cleanLambda)
    if (res.error) {
      throw new Error(res.error)
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

  private aggregateExpression(rawLambda: string, aggregateFunction: string): string {
    const _re = `${aggregateFunction}\\((\\w+)\\.(\\w+)\\)`
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