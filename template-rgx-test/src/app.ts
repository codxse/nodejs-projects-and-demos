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
    toArrayNumberMustache(): Template
    toArrayNumberTextMustache(): Template
    toArrayCurrencyMustache(): Template
    toArrayCurrencyTextMustache(): Template
    toArrayDateMustache(): Template
    toArrayTextOrTextareaOrRadioOrDropdownMustache(): Template
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
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")currency(?:'|"))(?=[^<>]*?(?:data-number(?:t|T)ype=(?:'|")number(?:'|")){0,1})(?=[^<>]*?data-section=(?:'|")(\w+)(?:'|"))(?=[^<>]*?data-variable=(?:"|')(\w+)(?:"|'))[^>]*?>([^<]*?(?:&lt;&lt;|<<)\w+\.\w+(?:&gt;&gt;|>>)[^>]*?)<\/mark>/gm

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
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")currency(?:'|"))(?=[^<>]*?data-number(?:t|T)ype=(?:'|")text(?:'|"))(?=[^<>]*?data-section=(?:'|")(\w+)(?:'|"))(?=[^<>]*?data-variable=(?:"|')(\w+)(?:"|'))[^>]*?>([^<]*?(?:&lt;&lt;|<<)\w+\.\w+\.TERBILANG(?:&gt;&gt;|>>)[^>]*?)<\/mark>/gm
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
        const re = /<mark\s+(?=(?:[^<>]*?data-date(?:f|F)ormat=(?:'|")(?<dateFormat>.*?)(?:'|"))?)(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")date(?:'|"))(?=[^<>]*?data-section=(?:"|')(?<sectionName>\w+)(?:'|"))(?=[^<>]*?data-variable=(?:"|')(?<variableName>\w+)(?:"|'))[^<>]*?>(?<innerText>[^<]*?(?:&lt;&lt;|<<)\w+\.\w+(?:&gt;&gt;|>>)[^>]*?)<\/mark>/gm
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
        const re = /<mark\s+(?=[^<>]*?class=(?:"|').*?template-variable2.*?(?:"|'))(?=[^<>]*?data-var(?:t|T)ype=(?:"|')number(?:"|'))(?=[^<>]*?(?:number(?:t|T)ype=(?:"|')number(?:"|')){0,1})(?=[^<>]*?data-section="(\w+)")(?=[^<>]*?data-variable="(\w+)")[^>]*?>([^<]*?(?:&lt;&lt;|<<)\w+\.\w+(?:&gt;&gt;|>>)[^<]*?)<\/mark>/gm
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
        const re = /<mark\s+(?=[^<>]*?class=(?:"|').*?template-variable2.*?(?:"|'))(?=[^<>]*?data-var(?:T|t)ype=(?:"|')number(?:"|'))(?=[^<>]*?number(?:t|T)ype=(?:"|')text(?:"|'))(?=[^<>]*?data-section=(?:'|")(\w+)(?:'|"))(?=[^<>]*?data-variable=(?:'|")(\w+)(?:'|"))[^>]*?>([^<]*?(?:&lt;&lt;|<<)\w+\.\w+\.TERBILANG(?:&gt;&gt;|>>)[^<]*?)<\/mark>/gm
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
        const re = /<mark\s+(?=[^<>]*?class=(?:"|').*?template-variable.*?(?:'|"))(?=[^<>]*?data-var(?:T|t)ype=(?:"|')(text|textarea|radio|dropdown)(?:"|'))(?=[^<>]*?data-section=(?:"|')(\w+)(?:"|'))(?=[^<>]*?data-variable=(?:"|')(\w+)(?:"|'))[^>]*?>([^<]*?(?:&lt;&lt;|<<)\w+\.\w+(?:&gt;&gt;|>>)[^<]*?)<\/mark>/gm
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

    toArrayNumberMustache(): Template {
        this._wrapArrayList()
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-section=(?:'|")(?<section>\w+)(?:'|"))(?=[^<>]*?data-array(?:n|N)ame=(?:'|")(?<arrayName>\w+)(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")number(?:'|"))(?=[^<>]*?data-variable=(?:'|")(?<variable>\w+)(?:'|"))(?=[^<>]*(?:data-number(?:t|T)ype=(?:'|")number('|"))?)[^>]*?>(?<innerMark>[^<]*?(?:&lt;&lt;|<<)\w+\.\w+\.\w+(?:&gt;&gt;|>>)[^<]*?)<\/mark>/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            const fullMatch = exp[0]
            const groups = exp["groups"] || {}
            const section = groups["section"]
            const arrayName = groups["arrayName"]
            const variable = groups["variable"]
            const innerMark = groups["innerMark"]
            if (fullMatch && section && arrayName && variable && innerMark) {
                this._mustache = this._mustache.replace(fullMatch, `{{${variable}}}`)
            }
        }
        return this
    }

    toArrayNumberTextMustache(): Template {
        this._wrapArrayList()
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-section=(?:'|")(?<section>\w+)(?:'|"))(?=[^<>]*?data-array(?:n|N)ame=(?:'|")(?<arrayName>\w+)(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")number(?:'|"))(?=[^<>]*?data-variable=(?:'|")(?<variable>\w+)(?:'|"))(?=[^<>]*data-number(?:t|T)ype=(?:'|")text('|"))[^>]*?>(?<innerMark>[^<]*?(?:&lt;&lt;|<<)\w+\.\w+\.\w+\.TERBILANG(?:&gt;&gt;|>>)[^<]*?)<\/mark>/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            const fullMatch = exp[0]
            const groups = exp["groups"] || {}
            const section = groups["section"]
            const arrayName = groups["arrayName"]
            const variable = groups["variable"]
            const innerMark = groups["innerMark"]
            if (fullMatch && section && arrayName && variable && innerMark) {
                this._mustache = this._mustache.replace(fullMatch, `{{#funct.numberToText}}{{${variable}}}{{/funct.numberToText}}`)
            }
        }
        return this
    }

    toArrayCurrencyMustache(): Template {
        this._wrapArrayList()
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-section=(?:'|")(?<section>\w+)(?:'|"))(?=[^<>]*?data-array(?:n|N)ame=(?:'|")(?<arrayName>\w+)(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")currency(?:'|"))(?=[^<>]*?data-variable=(?:'|")(?<variable>\w+)(?:'|"))(?=[^<>]*(?:data-number(?:t|T)ype=(?:'|")number('|"))?)[^>]*?>(?<innerMark>[^<]*?(?:&lt;&lt;|<<)\w+\.\w+\.\w+(?:&gt;&gt;|>>)[^<]*?<\/mark>)/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            const fullMatch = exp[0]
            const groups = exp["groups"] || {}
            const section = groups["section"]
            const arrayName = groups["arrayName"]
            const variable = groups["variable"]
            const innerMark = groups["innerMark"]
            if (fullMatch && section && arrayName && variable && innerMark) {
                this._mustache = this._mustache.replace(fullMatch, `{{#funct.formatCurrencyNumber}}{{${variable}}}{{/funct.formatCurrencyNumber}}`)
            }
        }
        return this
    }

    toArrayCurrencyTextMustache(): Template {
        this._wrapArrayList()
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-section=(?:'|")(?<section>\w+)(?:'|"))(?=[^<>]*?data-array(?:n|N)ame=(?:'|")(?<arrayName>\w+)(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")currency(?:'|"))(?=[^<>]*?data-variable=(?:'|")(?<variable>\w+)(?:'|"))(?=[^<>]*data-number(?:t|T)ype=(?:'|")text(?:'|"))[^>]*?>(?<innerMark>[^<]*?(?:&lt;&lt;|<<)\w+\.\w+\.\w+\.TERBILANG(?:&gt;&gt;|>>)[^<]*?)<\/mark>/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            const fullMatch = exp[0]
            const groups = exp["groups"] || {}
            const section = groups["section"]
            const arrayName = groups["arrayName"]
            const variable = groups["variable"]
            const innerMark = groups["innerMark"]
            if (fullMatch && section && arrayName && variable && innerMark) {
                this._mustache = this._mustache.replace(fullMatch, `{{#funct.currencyNumberToText}}{{${variable}}}{{/funct.currencyNumberToText}}`)
            }
        }
        return this
    }

    toArrayDateMustache(format?: DateFormat): Template {
        this._wrapArrayList()
        const re = /<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-section=(?:'|")(?<section>\w+)(?:'|"))(?=[^<>]*?data-array(?:n|N)ame=(?:'|")(?<arrayName>\w+)(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")date(?:'|"))(?=[^<>]*?data-variable=(?:'|")(?<variable>\w+)(?:'|"))(?=(?:[^<>]*?data-date(?:f|F)ormat=(?:'|")(?<dateFormat>.+?)(?:'|"))?)[^>]*?>(?<innerMark>[^<]*?(?:&lt;&lt;|<<)\w+\.\w+\.\w+(?:&gt;&gt;|>>)[^<]*?<\/mark>)/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            const fullMatch = exp[0]
            const groups = exp["groups"] || {}
            const section = groups["section"]
            const arrayName = groups["arrayName"]
            const variable = groups["variable"]
            const dateFormat = groups["dateFormat"]
            const innerMark = groups["innerMark"]

            const validDateFormat = new Set(["dd-MM-yyyy", "dd/MM/yyyy", "yyyy-MM-dd", "yyyy/MM/dd", "MMMM dd, yyyy", "dd MMMM, yyyy", "dd mmmm yyyy"])
            const _f = validDateFormat.has(dateFormat || "") ? dateFormat : "dd mmmm yyyy"
            const f = format || _f
            if (fullMatch && section && arrayName && variable && innerMark) {
                this._mustache = this.mustache.replace(fullMatch, `{{#funct.formatTime}}{{${variable}}}| ${f}{{/funct.formatTime}}`)
            }
        }
        return this
    }

    toArrayTextOrTextareaOrRadioOrDropdownMustache(): Template {
        this._wrapArrayList()
        this._toInnerArrayTextOrTextareaOrRadioOrDropdownMustache()
        return this
    }

    private _toInnerArrayTextOrTextareaOrRadioOrDropdownMustache(): void {
        const re =/<mark\s+(?=[^<>]*?class=(?:'|").*?template-variable2.*?(?:'|"))(?=[^<>]*?data-section=(?:'|")(?<section>\w+)(?:'|"))(?=[^<>]*?data-array(?:n|N)ame=(?:'|")(?<arrayName>\w+)(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")(?<varType>text|textarea|radio|dropdown)(?:'|"))(?=[^<>]*?data-variable=(?:'|")(?<variable>\w+)(?:'|"))[^>]*?>(?<innerMark>[^<]*?(?:&lt;&lt;|<<)\w+\.\w+\.\w+(?:&gt;&gt;|>>)[^<]*?<\/mark>)/gm
        let exp1 = null
        const mustache = this.mustache
        while ((exp1 = re.exec(mustache)) != null) {
            const fullMatch = exp1[0]
            const groups = exp1["groups"] || {}
            const section = groups["section"]
            const arrayName = groups["arrayName"]
            const varType = groups["varType"]
            const variable = groups["variable"]
            if (fullMatch && section && arrayName && varType && variable) {
                this._mustache = this.mustache.replace(fullMatch, `{{${variable}}}`)
            }
        }
    }

    private _wrapArrayList(): void {
        const re = /((?:(?:{{#\w+\.\w+}})(?:\s+|))?<li\s+)?(?=[^<>]*?data-section=(?:'|")(\w+)(?:'|"))(?=[^<>]*?data-var(?:n|N)ame=(?:'|")(\w+)(?:'|"))(?=[^<>]*?class=(?:"|').*?array.*?(?:'|"))(?=[^<>]*?data-var(?:t|T)ype=(?:'|")array(?:'|"))[^>]*?>.*?(<\/li>(?:(?:\s+|){{\/\w+\.\w+}})?)/gm
        let exp = null
        const mustache = this.mustache
        while ((exp = re.exec(mustache)) != null) {
            const fullMatch = exp[0]
            const openingTag = exp[1]
            const section = exp[2]
            const variable = exp[3]
            const closeTag = exp[4]
            if (fullMatch && openingTag && section && variable) {
                this._mustache = this.mustache.replace(openingTag, `{{#${section}.${variable}}}<li `)
                this._mustache = this.mustache.replace(closeTag, `</li>{{/${section}.${variable}}}`)
            }
        }
    }
}
