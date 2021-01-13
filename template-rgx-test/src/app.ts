export type DateFormat =
    | "dd-MM-yyyy"
    | "dd/MM/yyyy"
    | "yyyy-MM-dd"
    | "yyyy/MM/dd"
    | "MMMM dd, yyyy"
    | "dd MMMM, yyyy"
    | "dd mmmm yyyy"

export interface ITemplate {
    raw: string
    mustache: string
    toCurrencyNumberMustache(): Template
    toCurrencyTextMustache(): Template
    toDateMustache(format?: DateFormat): Template
    toNumberMustache(): Template
    toNumberTextMustache(): Template
    toTextOrTextareaOrRadioOrDropdownMustache(): Template
}

export class Template implements ITemplate {
    readonly raw: string
    private _mustache: string
    get mustache(): string {
        return this._mustache
    }

    constructor(raw: string, mustache?: string) {
        this.raw = raw
        this._mustache = mustache ? mustache : raw
    }

    toCurrencyNumberMustache(): Template {
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")currency(?:'|"))(?=[^<>]*?(?:data-number(?:t|T)ype=(?:'|")number(?:'|")){0,1})(?=[^<>]*?data-section=(?:'|")(\w+)(?:'|"))(?=[^<>]*?data-variable=(?:"|')(\w+)(?:"|'))[^>]*?>([^<]*?<<\w+\.\w+>>[^>]*?)<\/mark>/gm

        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            if (exp) {
                const fulltext = exp[0]
                const section = exp[1]
                const variable = exp[2]
                const innerText = exp[3]
                if (section && variable && innerText) {
                    this._mustache = this._mustache.replace(fulltext, `{{#funct.formatCurrencyNumber}}{{${section}.${variable}}}{{/funct.formatCurrencyNumber}}`)
                }
            }
        }

        return this
    }

    toCurrencyTextMustache(): Template {
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")currency(?:'|"))(?=[^<>]*?data-number(?:t|T)ype=(?:'|")text(?:'|"))(?=[^<>]*?data-section=(?:'|")(\w+)(?:'|"))(?=[^<>]*?data-variable=(?:"|')(\w+)(?:"|'))[^>]*?>([^<]*?<<\w+\.\w+\.TERBILANG>>[^>]*?)<\/mark>/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            if (exp) {
                const fulltext = exp[0]
                const section = exp[1]
                const variable = exp[2]
                const innerText = exp[3]
                if (section && variable && innerText) {
                    this._mustache = this.mustache.replace(fulltext, `{{#funct.currencyNumberToText}}{{${section}.${variable}}}{{/funct.currencyNumberToText}}`)
                }
            }
        }
        return this
    }

    toDateMustache(format?: DateFormat): Template {
        const re = /<mark\s+(?=[^<>]*?(?:data-date(?:f|F)ormat=(?:'|")(?<dateFormat>.*?)(?:'|")){0,1})(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")date(?:'|"))(?=[^<>]*?data-section=(?:"|')(?<sectionName>\w+)(?:'|"))(?=[^<>]*?data-variable=(?:"|')(?<variableName>\w+)(?:"|'))[^<>]*?>(?<innerText>[^<]*?<<\w+\.\w+>>[^>]*?)<\/mark>/gm
        const validDateFormat = new Set(["dd-MM-yyyy", "dd/MM/yyyy", "yyyy-MM-dd", "yyyy/MM/dd", "MMMM dd, yyyy", "dd MMMM, yyyy", "dd mmmm yyyy"])

        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            const _result = exp as unknown
            const result = _result as { 0: string, groups: { dateFormat?: string, sectionName?: string, variableName?: string, innerText?: string } }
            const g = result?.groups
            if (g?.sectionName && g?.variableName && g?.innerText) {
                const _f = validDateFormat.has(g?.dateFormat || "") ? g?.dateFormat : "dd mmmm yyyy"
                const f = format || _f
                this._mustache = this.mustache.replace(result[0], `{{#funct.formatTime}}{{${g?.sectionName}.${g?.variableName}}}| ${f}{{/funct.formatTime}}`)
            }
        }

        return this
    }

    toNumberMustache(): Template {
        const re = /<mark\s+(?=[^<>]*?class=(?:"|').*?template-variable2.*?(?:"|'))(?=[^<>]*?data-var(?:t|T)ype=(?:"|')number(?:"|'))(?=[^<>]*?(?:number(?:t|T)ype=(?:"|')number(?:"|')){0,1})(?=[^<>]*?data-section="(\w+)")(?=[^<>]*?data-variable="(\w+)")[^>]*?>([^<]*?<<\w+\.\w+>>[^<]*?)<\/mark>/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            if (exp) {
                const fulltext = exp[0]
                const section = exp[1]
                const variable = exp[2]
                const innerText = exp[3]
                if (section && variable && innerText) {
                    this._mustache = this.mustache.replace(fulltext, `{{${section}.${variable}}}`)
                }
            }
        }
        return this
    }

    toNumberTextMustache(): Template {
        const re = /<mark\s+(?=[^<>]*?class=(?:"|').*?template-variable2.*?(?:"|'))(?=[^<>]*?data-var(?:T|t)ype=(?:"|')number(?:"|'))(?=[^<>]*?number(?:t|T)ype=(?:"|')text(?:"|'))(?=[^<>]*?data-section=(?:'|")(\w+)(?:'|"))(?=[^<>]*?data-variable=(?:'|")(\w+)(?:'|"))[^>]*?>([^<]*?<<\w+\.\w+\.TERBILANG>>[^<]*?)<\/mark>/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            if (exp) {
                const fulltext = exp[0]
                const section = exp[1]
                const variable = exp[2]
                const innerText = exp[3]
                if (section && variable && innerText) {
                    this._mustache = this.mustache.replace(fulltext, `{{#funct.numberToText}}{{${section}.${variable}}}{{/funct.numberToText}}`)
                }
            }
        }
        return this
    }

    toTextOrTextareaOrRadioOrDropdownMustache(): Template {
        const re = /<mark\s+(?=[^<>]*?class=(?:"|').*?template-variable.*?(?:'|"))(?=[^<>]*?data-var(?:T|t)ype=(?:"|')(text|textarea|radio|dropdown)(?:"|'))(?=[^<>]*?data-section=(?:"|')(\w+)(?:"|'))(?=[^<>]*?data-variable=(?:"|')(\w+)(?:"|'))[^>]*?>([^<]*?<<\w+\.\w+>>[^<]*?)<\/mark>/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            if (exp) {
                const fulltext = exp[0]
                const varType = exp[1]
                const section = exp[2]
                const variable = exp[3]
                const innerText = exp[4]
                if (section && variable && innerText) {
                    this._mustache = this.mustache.replace(fulltext, `{{${section}.${variable}}}`)
                }
            }
        }
        return this
    }
}
