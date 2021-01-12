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

    constructor(raw: string) {
        this.raw = raw
        this._mustache = raw
    }

    toCurrencyNumberMustache = (): Template => {
        const re = /<mark.*?(?=.*?(?:class=(?:"|').*?template-variable2.*?(?:"|')){1})(?=.*?(?:data-varType=(?:"|')currency(?:"|')){1})(?=.*?(?:data-section=(?:"|')(\w+)(?:"|')){1})(?=.*?(?:data-variable=(?:"|')(\w+)(?:"|')){1}).*?>(.*?<<\w+\.\w+>>\s*?)<\/mark>/gm
        const [fulltext, section, variable, innerText] = re.exec(this.mustache) || []
        if (section && variable && innerText) {
            this._mustache = this._mustache.replace(fulltext, `{{#funct.formatCurrencyNumber}}{{${section}.${variable}}}{{/funct.formatCurrencyNumber}}`)
        }
        return this
    }

    toCurrencyTextMustache(): Template {
        const re = /<mark.*?(?=.*?(?:class=(?:"|').*?template-variable2.*?(?:"|')){1})(?=.*?(?:data-varType=(?:"|')currency(?:"|')){1})(?=.*?(?:data-section=(?:"|')(\w+)(?:"|')){1})(?=.*?(?:data-variable=(?:"|')(\w+)(?:"|')){1})(?=.*?(?:data-numberType=(?:"|')text(?:"|')){1}).*?>(.*?<<\w+\.\w+\.TERBILANG>>.*?)<\/mark>/gm
        const [fulltext, section, variable, innerText] = re.exec(this.mustache) || []
        if (section && variable && innerText) {
            this._mustache = this.mustache.replace(fulltext, `{{#funct.currencyNumberToText}}{{${section}.${variable}}}{{/funct.currencyNumberToText}}`)
        }
        return this
    }

    toDateMustache(format?: DateFormat): Template {
        const re = /<mark.*?(?=.*?(?:data-dateFormat="(?<dateFormat>.*?)"){0,1})(?=.*?(?:data-varType=(?:"|')date(?:"|')){1})(?=.*?(?:class=(?:'|").*?template-variable2.*?(?:"|')){1})(?=.*?(?:data-section=(?:'|")(?<sectionName>\w+)?(?:'|")){1})(?=.*?(?:data-variable=(?:"|')(?<variableName>\w+)(?:"|')){1}).*?>.*?(?<innerText>.*?<<\w+\.\w+>>\s*?).*?<\/mark>/gm
        const validDateFormat = new Set(["dd-MM-yyyy", "dd/MM/yyyy", "yyyy-MM-dd", "yyyy/MM/dd", "MMMM dd, yyyy", "dd MMMM, yyyy", "dd mmmm yyyy"])
        const _result = re.exec(this.mustache) as unknown
        const result = _result as { 0: string, groups: { dateFormat?: string, sectionName?: string, variableName?: string, innerText?: string } }
        const g = result?.groups
        if (g?.sectionName && g?.variableName && g?.innerText) {
            const _f = validDateFormat.has(g?.dateFormat || "") ? g?.dateFormat : "dd mmmm yyyy"
            const f = format || _f
            this._mustache = this.mustache.replace(result[0], `{{#funct.formatTime}}{{${g?.sectionName}.${g?.variableName}}}| ${f}{{/funct.formatTime}}`)
        }
        return this
    }

    toNumberMustache(): Template {
        const re = /<mark.*?(?=.*?(?:class=(?:"|').*?template-variable2.*?(?:"|')){1})(?=.*?(?:data-varType=(?:"|')number(?:"|')){1})(?=.*?(?:numberType=(?:"|')number(?:"|')){0,1})(?=.*?(?:data-section="(\w+)"){1})(?=.*?(?:data-variable="(\w+)"){1}).*?>(.*?<<\w+\.\w+>>.*?)<\/mark>/gm
        const [fulltext, section, variable, innerText] = re.exec(this.raw) || []
        if (section && variable && innerText) {
            this._mustache = this.mustache.replace(fulltext, `{{${section}.${variable}}}`)
        }
        return this
    }

    toNumberTextMustache(): Template {
        const re = /<mark.*?(?=.*?(?:class=(?:"|').*?template-variable2.*?(?:"|')){1})(?=.*?(?:data-varType=(?:"|')number(?:"|')){1})(?=.*?(?:numberType=(?:"|')text(?:"|')){1})(?=.*?(?:data-section="(\w+)"){1})(?=.*?(?:data-variable="(\w+)"){1}).*?>(.*?<<\w+\.\w+\.TERBILANG>>.*?)<\/mark>/gm
        const [fulltext, section, variable, innerText] = re.exec(this.raw) || []
        if (section && variable && innerText) {
            this._mustache = this.mustache.replace(fulltext, `{{#funct.numberToText}}{{${section}.${variable}}}{{/funct.numberToText}}`)
        }
        return this
    }

    toTextOrTextareaOrRadioOrDropdownMustache(): Template {
        const re = /<mark.*?(?=.*?(?:class=(?:"|').*?template-variable2.*?(?:"|')){1})(?=.*?(?:data-varType=(?:"|')(?:text|textarea|radio|dropdown)(?:"|')){1})(?=.*?(?:data-section="(\w+)"){1})(?=.*?(?:data-variable="(\w+)"){1}).*?>(.*?<<\w+\.\w+>>.*?)<\/mark>/gm
        const [fulltext, section, variable, innerText] = re.exec(this.raw) || []
        if (section && variable && innerText) {
            this._mustache = this.mustache.replace(fulltext, `{{${section}.${variable}}}`)
        }
        return this
    }
}

