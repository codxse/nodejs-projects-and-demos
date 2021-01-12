import { expect } from 'chai'
import { Template } from "../src/app"
import { numberAndTextAndNumberTextExpected, numberAndTextAndNumberTextMock, textAndTextareaMock, textAndTextareaExpected } from "./mock/simple-template";

describe("Regex std vars to mustache test", () => {

    describe("Currency testing", () => {
        it("Currency number var to mustache", () => {
            const raw = "<mark id=\"any-id\" data-varType=\"currency\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\" class=\"any-class template-variable2\"><<employeeright.salary>></mark>"
            const expected = "{{#funct.formatCurrencyNumber}}{{employeeright.salary}}{{/funct.formatCurrencyNumber}}"
            const template = new Template(raw)
            expect(template.toCurrencyNumberMustache().mustache).to.equal(expected)
        })

        it("Currency number, with class as first order attribute", () => {
            const raw = "<mark class=\"any-class template-variable2\" id=\"any-id\" data-varType=\"currency\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<employeeright.salary>></mark>"
            const expected = "{{#funct.formatCurrencyNumber}}{{employeeright.salary}}{{/funct.formatCurrencyNumber}}"
            const template = new Template(raw)
            expect(template.toCurrencyNumberMustache().mustache).to.equal(expected)
        })

        it("Currency number, invalid data-variable with space, return as it is", () => {
            const raw = "<mark class=\"any-class template-variable2\" id=\"any-id\" data-varType=\"currency\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary \" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<employeeright.salary>></mark>"
            const template = new Template(raw)
            expect(template.toCurrencyNumberMustache().mustache).to.equal(raw)
        })

        it("Currency number, invalid data-section with space, return as it is", () => {
            const raw = "<mark class=\"any-class template-variable2\" id=\"any-id\" data-varType=\"currency\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-question=\"any string\" data-section=\"employee right\" data-prevtext=\"any string\"><<employeeright.salary>></mark>"
            const template = new Template(raw)
            expect(template.toCurrencyNumberMustache().mustache).to.equal(raw)
        })

        it("Currency number, invalid doesn't has template-variable2 class, return as it is", () => {
            const raw = "<mark id=\"any-id\" data-varType=\"currency\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<employeeright.salary>></mark>"
            const template = new Template(raw)
            expect(template.toCurrencyNumberMustache().mustache).to.equal(raw)
        })

        it("Currency number, invalid doesn't has data-varType attribute, return as it is", () => {
            const raw = "<mark class=\"any-class template-variable2\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<employeeright.salary>></mark>"
            const template = new Template(raw)
            expect(template.toCurrencyNumberMustache().mustache).to.equal(raw)
        })
    
        it("Currency text var to mustache", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-varType=\"currency\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\" data-numberType=\"text\"><<employeeright.salary.TERBILANG>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.currencyNumberToText}}{{employeeright.salary}}{{/funct.currencyNumberToText}}"
            expect(template.toCurrencyTextMustache().mustache).to.equal(expected)
        })

        it("Currency text var, class as first attr, var and section with different order", () => {
            const raw = "<mark class=\"template-variable2\" id=\"any-id\" data-variable=\"salary\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-section=\"employeeright\" data-varType=\"currency\" data-question=\"any string\" data-prevtext=\"any string\" data-numberType=\"text\"><<employeeright.salary.TERBILANG>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.currencyNumberToText}}{{employeeright.salary}}{{/funct.currencyNumberToText}}"
            expect(template.toCurrencyTextMustache().mustache).to.equal(expected)
        })

        it("Currency text var, without data-numberTyoe attr, return as it is", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-varType=\"currency\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<employeeright.salary.TERBILANG>></mark>"
            const template = new Template(raw)
            expect(template.toCurrencyTextMustache().mustache).to.equal(raw)
        })

        it("Currency text var, invalid data-variable with space, return as it is", () => {
            const raw = "<mark class=\"any-class template-variable2\" id=\"any-id\" data-varType=\"currency\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary \" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<employeeright.salary>></mark>"
            const template = new Template(raw)
            expect(template.toCurrencyTextMustache().mustache).to.equal(raw)
        })

        it("invalid doesn't has template-variable2 class, return as it is", () => {
            const raw = "<mark id=\"any-id\" data-varType=\"currency\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<employeeright.salary>></mark>"
            const template = new Template(raw)
            expect(template.toCurrencyTextMustache().mustache).to.equal(raw)
        })

        it("invalid doesn't has data-varType attribute, return as it is", () => {
            const raw = "<mark class=\"any-class template-variable2\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<employeeright.salary>></mark>"
            const template = new Template(raw)
            expect(template.toCurrencyTextMustache().mustache).to.equal(raw)
        })
    })

    describe("Format date testing", () => {
        it("dd-MM-yyyy", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| dd-MM-yyyy{{/funct.formatTime}}"
            expect(template.toDateMustache("dd-MM-yyyy").mustache)
              .to.equal(expected)
        })

        it("dd/MM/yyyy", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| dd/MM/yyyy{{/funct.formatTime}}"
            expect(template.toDateMustache("dd/MM/yyyy").mustache)
              .to.equal(expected)
        })

        it("yyyy-MM-dd", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| yyyy-MM-dd{{/funct.formatTime}}"
            expect(template.toDateMustache("yyyy-MM-dd").mustache)
              .to.equal(expected)
        })

        it("yyyy/MM/dd", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| yyyy/MM/dd{{/funct.formatTime}}"
            expect(template.toDateMustache("yyyy/MM/dd").mustache)
              .to.equal(expected)
        })

        it("MMMM dd, yyyy", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| MMMM dd, yyyy{{/funct.formatTime}}"
            expect(template.toDateMustache("MMMM dd, yyyy").mustache)
              .to.equal(expected)
        })

        it("dd MMMM, yyyy", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| dd MMMM, yyyy{{/funct.formatTime}}"
            expect(template.toDateMustache("dd MMMM, yyyy").mustache)
              .to.equal(expected)
        })

        it("dd mmmm yyyy", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| dd mmmm yyyy{{/funct.formatTime}}"
            expect(template.toDateMustache("dd mmmm yyyy").mustache)
              .to.equal(expected)
        })

        it("default date format as dd mmmm yyyy", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| dd mmmm yyyy{{/funct.formatTime}}"
            expect(template.toDateMustache().mustache)
              .to.equal(expected)
        })

        it("invalid date format convey to dd mmmm yyyy", () => {
            const raw = "<mark class=\"template-variable2\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"xxxx\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| dd mmmm yyyy{{/funct.formatTime}}"
            expect(template.toDateMustache().mustache)
              .to.equal(expected)
        })

        it("date var to mustache, invalid data-varType is empty, return as it is", () => {
            const raw = "<mark class=\"template-variable2\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toDateMustache().mustache).to.equal(raw)
        })
    })

    describe("Number testing", () => {
        it("Number to mustache", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-varType=\"number\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{employeeright.salary}}"
            expect(template.toNumberMustache().mustache).to.equal(expected)
        })

        it("Number to mustache, with class as first attr", () => {
            const raw = "<mark class=\"template-variable2\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-numberType=\"number\" data-varType=\"number\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{employeeright.salary}}"
            expect(template.toNumberMustache().mustache).to.equal(expected)
        })

        it("Number to mustache, without number type still valid", () => {
            const raw = "<mark class=\"template-variable2\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-varType=\"number\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{employeeright.salary}}"
            expect(template.toNumberMustache().mustache).to.equal(expected)
        })

        it("Number to mustache, invalid for numberType text, return as it is", () => {
            const raw = "<mark data-varType=\"number\" id=\"any-id\" class=\"template-variable2 any-class\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"durationmonth2\" data-question=\"any string\" data-section=\"anySection\" data-prevtext=\"any string\" data-numberType=\"text\"><<contractinfo.durationmonth.TERBILANG>></mark>"
            const template = new Template(raw)
            expect(template.toNumberMustache().mustache).to.equal(raw)
        })

        it("Number to mustache, invalid wihout template-variable2 class, return as it is", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class emplate-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-varType=\"number\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toNumberMustache().mustache).to.equal(raw)
        })

        it("Number to mustache, invalid wihout valid varType (numberr), return as it is", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-varType=\"numberr\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toNumberMustache().mustache).to.equal(raw)
        })

        it("Number to mustache, invalid with section invalid (space), return as it is", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"salary\" data-varType=\"number\" data-question=\"any string\" data-section=\"employee right\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toNumberMustache().mustache).to.equal(raw)
        })

        it("Number to mustache, invalid with variable invalid (space), return as it is", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"sa   lary\" data-varType=\"number\" data-question=\"any string\" data-section=\"employeeright\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toNumberMustache().mustache).to.equal(raw)
        })

        it("Number text to mustache", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"durationmonth1\" data-varType=\"number\" data-question=\"any string\" data-section=\"anySection\" data-prevtext=\"any string\" data-numberType=\"text\"><<contractinfo.durationmonth.TERBILANG>></mark>"
            const expected = "{{#funct.numberToText}}{{anySection.durationmonth1}}{{/funct.numberToText}}"

            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(expected)
        })

        it("Number text to mustache with data-varType as first order attribute", () => {
            const raw = "<mark data-varType=\"number\" id=\"any-id\" class=\"template-variable2 any-class\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"durationmonth2\" data-question=\"any string\" data-section=\"anySection\" data-prevtext=\"any string\" data-numberType=\"text\"><<contractinfo.durationmonth.TERBILANG>></mark>"
            const expected = "{{#funct.numberToText}}{{anySection.durationmonth2}}{{/funct.numberToText}}"

            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(expected)
        })

        it("invalid data-variable with space, return as it is", () => {
            const raw = "<mark data-varType=\"number\" id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"durationmonth 2\" data-question=\"any string\" data-section=\"anySection\" data-prevtext=\"any string\" data-numberType=\"text\"><<contractinfo.durationmonth.TERBILANG>></mark>"
            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(raw)
        })

        it("invalid data-section with space, return as it is", () => {
            const raw = "<mark data-varType=\"number\" id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"durationmonth2\" data-question=\"any string\" data-section=\"any Section\" data-prevtext=\"any string\" data-numberType=\"text\"><<contractinfo.durationmonth.TERBILANG>></mark>"
            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(raw)
        })

        it("invalid doesn't has template-variable2 class, return as it is", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"durationmonth3\" data-question=\"any string\" data-section=\"anySection\" data-prevtext=\"any string\" data-numberType=\"text\" data-varType=\"number\"><<contractinfo.durationmonth.TERBILANG>></mark>"
            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(raw)
        })

        it("invalid doesn't has data-varType attribute, return as it is", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"durationmonth3\" data-question=\"any string\" data-section=\"anySection\" data-prevtext=\"any string\" data-numberType=\"text\"><<contractinfo.durationmonth.TERBILANG>></mark>"
            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(raw)
        })

        it("date var to mustache, invalid data-variable with space, return as it is", () => {
            const raw = "<mark class=\"template-variable2\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\" \" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(raw)
        })

        it("date var to mustache, invalid data-section with space, return as it is", () => {
            const raw = "<mark class=\"template-variable2\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contract info\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(raw)
        })

        it("date var to mustache, invalid doesn't has template-variable2 class, return as it is", () => {
            const raw = "<mark class=\"any class\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd mmmm yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toNumberTextMustache().mustache).to.equal(raw)
        })
    })

    describe("text|textarea|dropdown|radio to mustache", () => {
        const vars = ["text", "textarea", "dropdown", "radio"]
        it("varType text|textarea|dropdown|radio to mustache", () => {
            const index = Math.floor(Math.random() * 4)
            const raw = `<mark id="any-id" class="any-class template-variable2" data-id="15f44a53-f246-45e7-b422-41af68203197" data-variable="name" data-varType="${vars[index]}" data-question="any string" data-section="employee" data-prevtext="any string"><<contractinfo.date>></mark>`
            const template = new Template(raw)
            const expected = "{{employee.name}}"
            expect(template.toTextOrTextareaOrRadioOrDropdownMustache().mustache + ` (${vars[index]})`).to.equal(expected + ` (${vars[index]})`)
        })

        it("varType text|textarea|dropdown|radio to mustache, with class as first attr", () => {
            const index = Math.floor(Math.random() * 4)
            const raw = `<mark class="template-variable2 any-class" id="any-id" data-id="15f44a53-f246-45e7-b422-41af68203197" data-variable="name" data-varType="${vars[index]}" data-question="any string" data-section="employee" data-prevtext="any string"><<employee.name>></mark>`
            const template = new Template(raw)
            const expected = "{{employee.name}}"
            expect(template.toTextOrTextareaOrRadioOrDropdownMustache().mustache + ` (${vars[index]})`).to.equal(expected + ` (${vars[index]})`)
        })

        it("data varType text|textarea|dropdown|radio, invalid without template-variable2 class, return as it is", () => {
            const index = Math.floor(Math.random() * 4)
            const raw = `<mark class=" any-class" id="any-id" data-id="15f44a53-f246-45e7-b422-41af68203197" data-variable="name" data-varType="${vars[index]}" data-quesion="any string" data-section="employee" data-prevtext="any string"><<contractinfo.date>></mark>`
            const template = new Template(raw)
            expect(template.toTextOrTextareaOrRadioOrDropdownMustache().mustache + ` (${vars[index]})`).to.equal(raw + ` (${vars[index]})`)
        })

        it("data varType text|textarea|dropdown|radio, invalid without varType invalid, return as it is", () => {
            const raw = "<mark class=\"template-variable2 any-class\" id=\"any-id\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"name\" data-question=\"any string\" data-section=\"employee\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            expect(template.toTextOrTextareaOrRadioOrDropdownMustache().mustache).to.equal(raw)
        })

        it("data varType text|textarea|dropdown|radio, invalid with variable invalid (space), return as it is", () => {
            const index = Math.floor(Math.random() * 4)
            const raw = `<mark class="template-variable2 any-class" id="any-id" data-id="15f44a53-f246-45e7-b422-41af68203197" data-variable="name " data-varType="${vars[index]}" data-question="any string" data-section="employee" data-prevtext="any string"><<contractinfo.date>></mark>`
            const template = new Template(raw)
            expect(template.toTextOrTextareaOrRadioOrDropdownMustache().mustache + ` (${vars[index]})`).to.equal(raw + ` (${vars[index]})`)
        })
    })

    describe("Integration test, two or more vars on template", () => {
        it("number and number text on same template same line", () => {
            const template = new Template(numberAndTextAndNumberTextMock)
            expect(template
              .toNumberMustache()
              .toNumberTextMustache()
              .mustache
            ).to.equal(numberAndTextAndNumberTextExpected)
        })

        it("text and textarea on same template same line", () => {
            const template = new Template(textAndTextareaMock)
            expect(template
              .toTextOrTextareaOrRadioOrDropdownMustache()
              .mustache
            ).to.equals(textAndTextareaExpected)
        })
    })
})