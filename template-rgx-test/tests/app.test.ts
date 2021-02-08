import { expect } from 'chai'
import { Template } from "../src/app"
import { numberAndTextAndNumberTextExpected, numberAndTextAndNumberTextMock, textAndTextareaMock, textAndTextareaExpected } from "./mock/simple-template"
import * as fs from "fs"

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

        it("dd-MM-yyyy", () => {
            const raw = "<mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"date\" data-varType=\"date\" data-dateFormat=\"dd-MM-yyyy\" data-question=\"any string\" data-section=\"contractinfo\" data-prevtext=\"any string\"><<contractinfo.date>></mark>"
            const template = new Template(raw)
            const expected = "{{#funct.formatTime}}{{contractinfo.date}}| dd-MM-yyyy{{/funct.formatTime}}"
            expect(template.toDateMustache().mustache)
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

})

describe("Array var test", () => {

    describe("Array text", () => {
        const vars = ["text", "textarea", "dropdown", "radio"]

        it("array text not wrapped mustache to mustache array text", () => {
            const index = Math.floor(Math.random() * 4)
            const varType = vars[index]
            const raw = `<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-arrayName="brangNadiar" data-variable="namaBarang" data-vartype="${varType}" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga <mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="number"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>`
            const expected = `{{#identitas.brangNadiar}}<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa {{namaBarang}}&nbsp;dengan harga <mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="number"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>{{/identitas.brangNadiar}}`

            const template = new Template(raw)
            expect(template
              .toArrayTextOrTextareaOrRadioOrDropdownMustache()
              .mustache
            ).to.equals(expected, `varType=${varType}`)
        })

        it("array text wrapped mustache to mustache array text", () => {
            const index = Math.floor(Math.random() * 4)
            const varType = vars[index]
            const raw = `{{#heirinfo.legacy}}
    <li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-arrayName="brangNadiar" data-variable="namaBarang" data-vartype="${varType}" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="number"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>
{{/heirinfo.legacy}}`
            const expected = `{{#identitas.brangNadiar}}<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa {{namaBarang}}&nbsp;dengan harga<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="number"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>{{/identitas.brangNadiar}}`

            const template = new Template(raw)
            expect(template
              .toArrayTextOrTextareaOrRadioOrDropdownMustache()
              .mustache
            ).to.equals(expected, `varType=${varType}`)
        })
    })

    describe("Array currency", () => {
        it("array currency not wrapped to mustache array currency explicit varType='number'", () => {
            const raw = `<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga <mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="number" data-arrayName="brangNadiar"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>`
            const expected = `{{#identitas.brangNadiar}}<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga {{#funct.formatCurrencyNumber}}{{hargaBarang}}{{/funct.formatCurrencyNumber}}&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>{{/identitas.brangNadiar}}`

            const template = new Template(raw)
            expect(template
              .toArrayCurrencyMustache()
              .mustache
            ).to.equals(expected)
        })

        it("array currency wrapped mustache to mustache array currency not explicit varType='number'", () => {
            const raw = `{{#heirinfo.legacy}}
    <li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga <mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang" data-arrayName="brangNadiar"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>
{{/heirinfo.legacy}}`
            const expected = `{{#identitas.brangNadiar}}<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga {{#funct.formatCurrencyNumber}}{{hargaBarang}}{{/funct.formatCurrencyNumber}}&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>{{/identitas.brangNadiar}}`
            const template = new Template(raw)
            expect(template
              .toArrayCurrencyMustache()
              .mustache
            ).to.equals(expected)
        })
    })

    describe("Array currency text", () => {
        it("array currency not wrapped mustache text to mustache array currency text", () => {
            const raw = `<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="number"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text" data-arrayName="brangNadiar"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>`
            const expected = `{{#identitas.brangNadiar}}<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="number"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;({{#funct.currencyNumberToText}}{{hargaBarang}}{{/funct.currencyNumberToText}})</li>{{/identitas.brangNadiar}}`
            const template = new Template(raw)
            expect(template
              .toArrayCurrencyTextMustache()
              .mustache
            ).to.equals(expected)
        })

        it("array currency wrapped mustache text to mustache array currency text", () => {
            const raw = `{{#heirinfo.legacy}}
    <li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-arrayName="brangNadiar" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>
{{/heirinfo.legacy}}`
            const expected = `{{#identitas.brangNadiar}}<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;({{#funct.currencyNumberToText}}{{hargaBarang}}{{/funct.currencyNumberToText}})</li>{{/identitas.brangNadiar}}`
            const template = new Template(raw)
            expect(template
              .toArrayCurrencyTextMustache()
              .mustache
            ).to.equals(expected)
        })
    })

    describe("Array number", () => {
        it("array number to mustache array number", () => {
            const raw = `<ul><li data-varname="person" class="array" data-vartype="array" data-section="person">Nama: <mark class="template-variable2 identitas fullname" id="6647b16c-e9c8-4b71-87fa-937cf4179d57" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f2" data-variable="fullname" data-vartype="text" data-question="Nama" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.fullname>></mark>, Tgl lahir: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d58" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-variable="tglLahir" data-vartype="date" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.tglLahir>></mark>, Jumlah anak: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d68" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-variable="jmlAnak" data-vartype="number" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar" data-arrayName="identitas"><<identitas.person.jmlAnak>></mark> (<mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d66" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd066" data-variable="jmlAnak" data-vartype="number" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar" data-numbertype="text"><<identitas.person.jmlAnak.TERBILANG>></mark>)</li></ul>`
            const expected = `<ul>{{#person.person}}<li data-varname="person" class="array" data-vartype="array" data-section="person">Nama: <mark class="template-variable2 identitas fullname" id="6647b16c-e9c8-4b71-87fa-937cf4179d57" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f2" data-variable="fullname" data-vartype="text" data-question="Nama" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.fullname>></mark>, Tgl lahir: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d58" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-variable="tglLahir" data-vartype="date" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.tglLahir>></mark>, Jumlah anak: {{jmlAnak}} (<mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d66" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd066" data-variable="jmlAnak" data-vartype="number" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar" data-numbertype="text"><<identitas.person.jmlAnak.TERBILANG>></mark>)</li>{{/person.person}}</ul>`
            const template = new Template(raw)
            expect(template
              .toArrayNumberMustache()
              .mustache
            ).to.equals(expected)
        })

        it("array number to mustache array number explicit varType='number'", () => {
            const raw = `<ul><li data-varname="person" class="array" data-vartype="array" data-section="identitas">Nama: <mark class="template-variable2 identitas fullname" id="6647b16c-e9c8-4b71-87fa-937cf4179d57" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f2" data-variable="fullname" data-vartype="text" data-question="Nama" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.fullname>></mark>, Tgl lahir: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d58" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-variable="tglLahir" data-vartype="date" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.tglLahir>></mark>, Jumlah anak: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d68" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-variable="jmlAnak" data-vartype="number" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.jmlAnak>></mark> (<mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d66" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd066" data-variable="jmlAnak" data-vartype="number" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar" data-numbertype="text" data-arrayName="person"><<identitas.person.jmlAnak.TERBILANG>></mark>)</li></ul>`
            const expected = `<ul>{{#identitas.person}}<li data-varname="person" class="array" data-vartype="array" data-section="identitas">Nama: <mark class="template-variable2 identitas fullname" id="6647b16c-e9c8-4b71-87fa-937cf4179d57" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f2" data-variable="fullname" data-vartype="text" data-question="Nama" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.fullname>></mark>, Tgl lahir: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d58" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-variable="tglLahir" data-vartype="date" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.tglLahir>></mark>, Jumlah anak: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d68" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-variable="jmlAnak" data-vartype="number" data-question="Tgl lahir:" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.jmlAnak>></mark> ({{#funct.numberToText}}{{jmlAnak}}{{/funct.numberToText}})</li>{{/identitas.person}}</ul>`
            const template = new Template(raw)
            expect(template
              .toArrayNumberTextMustache()
              .mustache
            ).to.equals(expected)
        })
    })

    describe("Array number text", () => {
        it("array number text to mustache array number text", () => {
            //throw new Error("Method not implemented.")
        })
    })

    describe("Array date", () => {

        it("dd-MM-yyyy", () => {
            const raw = `<li data-varname="person" class="array" data-vartype="array" data-section="identitas">Nama: <mark class="template-variable2 identitas fullname" id="6647b16c-e9c8-4b71-87fa-937cf4179d57" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f2" data-variable="fullname" data-vartype="text" data-question="Nama" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.fullname>></mark>, Tgl lahir: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d58" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-dateformat="dd-MM-yyyy" data-variable="tglLahir" data-vartype="date" data-question="Tgl lahir:" data-section="identitas" data-arrayName="person" data-prevtext="Nadiar"><<identitas.person.tglLahir>></mark></li>`
            const expected = `{{#identitas.person}}<li data-varname="person" class="array" data-vartype="array" data-section="identitas">Nama: <mark class="template-variable2 identitas fullname" id="6647b16c-e9c8-4b71-87fa-937cf4179d57" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f2" data-variable="fullname" data-vartype="text" data-question="Nama" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.fullname>></mark>, Tgl lahir: {{#funct.formatTime}}{{tglLahir}}| dd-MM-yyyy{{/funct.formatTime}}</li>{{/identitas.person}}`
            const template = new Template(raw)
            expect(template
              .toArrayDateMustache()
              .mustache
            ).to.equals(expected)
        })

        it("dd/MM/yyyy", () => {
            //throw new Error("Method not implemented.")
        })

        it("yyyy-MM-dd", () => {
            //throw new Error("Method not implemented.")
        })

        it("yyyy/MM/dd", () => {
            //throw new Error("Method not implemented.")
        })

        it("MMMM dd, yyyy", () => {
            //throw new Error("Method not implemented.")
        })

        it("dd MMMM, yyyy", () => {
            //throw new Error("Method not implemented.")
        })

        it("dd mmmm yyyy", () => {
            //throw new Error("Method not implemented.")
        })

        it("default array date format as dd mmmm yyyy", () => {
            const raw = `<li data-varname="person" class="array" data-vartype="array" data-section="identitas">Nama: <mark class="template-variable2 identitas fullname" id="6647b16c-e9c8-4b71-87fa-937cf4179d57" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f2" data-variable="fullname" data-vartype="text" data-question="Nama" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.fullname>></mark>, Tgl lahir: <mark class="template-variable2 identitas" id="6647b16c-e9c8-4b71-87fa-937cf4179d58" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f8" data-dateformat="sssr" data-variable="tglLahir" data-vartype="date" data-question="Tgl lahir:" data-section="identitas" data-arrayName="person" data-prevtext="Nadiar"><<identitas.person.tglLahir>></mark></li>`
            const expected = `{{#identitas.person}}<li data-varname="person" class="array" data-vartype="array" data-section="identitas">Nama: <mark class="template-variable2 identitas fullname" id="6647b16c-e9c8-4b71-87fa-937cf4179d57" data-id="7b3d7e12-7d2c-414e-80c5-60d5298cd0f2" data-variable="fullname" data-vartype="text" data-question="Nama" data-section="identitas" data-prevtext="Nadiar"><<identitas.person.fullname>></mark>, Tgl lahir: {{#funct.formatTime}}{{tglLahir}}| dd mmmm yyyy{{/funct.formatTime}}</li>{{/identitas.person}}`
            const template = new Template(raw)
            expect(template
              .toArrayDateMustache()
              .mustache
            ).to.equals(expected)
        })
    })

    it("Array radio", () => {
        const raw = `<li data-varName="items" class="array" data-vartype="array" data-section="lainLain">text start <mark class="template-variable2 lainLain barang" data-variable="barang" data-arrayname="items" data-vartype="radio" data-question="barang?" data-section="lainLain" data-id="1" id="1ae6f203-e526-4cab-91af-640e21f0fe71" data-prevtext="lainLain.items.barang"><<lainLain.items.barang>></mark> text end</li>`
        const expected = `{{#lainLain.items}}<li data-varName="items" class="array" data-vartype="array" data-section="lainLain">text start {{barang}} text end</li>{{/lainLain.items}}`
        const template = new Template(raw)
        expect(template
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .mustache
        ).equals(expected)
    })

    it("Test text array with radio array", () => {
        const raw = `<ul><li data-varname="identity" class="array" data-vartype="array">Halo nama saya: <mark class="template-variable2 firstparty identityName" data-variable="identityName" data-arrayname="identity" data-vartype="text" data-question="name" data-section="firstparty" data-id="6006b177e361b61401f28683" id="7aefaff8-b00a-450c-8b29-d68567aa8484" data-prevtext="firstparty.identity.identityName"><<firstparty.identity.identityName>></mark>&nbsp;saya seorang <mark class="template-variable2 firstparty gender" data-variable="gender" data-vartype="radio" data-arrayname="identity" data-question="Jenis kelamin" data-section="firstparty" data-id="6006b177e361b61401f28684" id="bf017374-8438-4ba7-a50e-d54eeebec40c" data-prevtext="firstparty.identity.gender"><<firstparty.identity.gender>></mark>&nbsp;&nbsp;</li></ul>`
        const expected = `<ul><li data-varname="identity" class="array" data-vartype="array">Halo nama saya: {{identityName}}&nbsp;saya seorang {{gender}}&nbsp;&nbsp;</li></ul>`
        const template = new Template(raw)
        expect(template
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .mustache
        ).to.equals(expected)
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

    it("combine str var with arr var pretty", async () => {
        const raw = await readFile("/mock/01-pretty/raw.html")
        const expected = await readFile("/mock/01-pretty/mustache.html")
        const template = new Template(raw)
        expect(template
          .toTextOrTextareaOrRadioOrDropdownMustache()
          .toDateMustache()
          .toCurrencyTextMustache()
          .toCurrencyNumberMustache()
          .toNumberTextMustache()
          .toNumberMustache()
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayNumberTextMustache()
          .toArrayNumberMustache()
          .toArrayCurrencyTextMustache()
          .toArrayCurrencyMustache()
          .toArrayDateMustache()
          .mustache
        ).to.equals(expected)
    })

    it("combine std var text, date with arr var text currency, currency text minify", async () => {
        const raw = await readFile("/mock/01-min/raw.html")
        const expected = await readFile("/mock/01-min/mustache.html")
        const template = new Template(raw)
        expect(template
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayCurrencyTextMustache()
          .toArrayCurrencyMustache()
          .toTextOrTextareaOrRadioOrDropdownMustache()
          .toDateMustache()
          .toCurrencyTextMustache()
          .toCurrencyNumberMustache()
          .toNumberTextMustache()
          .toNumberMustache()
          .mustache
        ).to.equals(expected)
    })

    it("combine std var text, textarea, date, number, number text, currency, currency text with arr text, arr currency, arr currency text", async () => {
        const raw = await readFile("/mock/02-min/raw.html")
        const expected = await readFile("/mock/02-min/mustache.html")
        const template = new Template(raw)
        expect(template
          .toTextOrTextareaOrRadioOrDropdownMustache()
          .toDateMustache()
          .toCurrencyTextMustache()
          .toCurrencyNumberMustache()
          .toNumberTextMustache()
          .toNumberMustache()
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayCurrencyTextMustache()
          .toArrayCurrencyMustache()
          .mustache
        ).to.equals(expected)
    })

    it("Test array mustache wrapped, currency and currency text to array mustache currancy and currency text", () => {
        const raw = `{{#heirinfo.legacy}}
    <li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa <mark class="template-variable2 identitas namaBarang" data-variable="namaBarang" data-vartype="text" data-question="nama barang" data-section="identitas" data-id="1" id="f4814e87-a08b-487d-850e-8dc45df4bfc8" data-arrayName="brangNadiar" data-prevtext="identitas.brangNadiar.namaBarang"><<identitas.brangNadiar.namaBarang>></mark>&nbsp;dengan harga<mark data-arrayName="brangNadiar" class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="bb951a48-f45c-4dd1-a234-621f7cf4cfbb" data-prevtext="identitas.brangNadiar.hargaBarang"><<identitas.brangNadiar.hargaBarang>></mark>&nbsp;(<mark class="template-variable2 identitas hargaBarang" data-variable="hargaBarang" data-vartype="currency" data-question="harga barang" data-section="identitas" data-id="2" id="63ca8382-0fe8-4f70-98cb-ede73fd46de8" data-arrayName="brangNadiar" data-prevtext="identitas.brangNadiar.hargaBarang" data-numbertype="text"><<identitas.brangNadiar.hargaBarang.TERBILANG>></mark>)</li>
{{/heirinfo.legacy}}`
        const expected = `{{#identitas.brangNadiar}}<li data-varname="brangNadiar" class="array" data-vartype="array" data-section="identitas">barang {{identitas.fullname}}&nbsp;berupa {{namaBarang}}&nbsp;dengan harga{{#funct.formatCurrencyNumber}}{{hargaBarang}}{{/funct.formatCurrencyNumber}}&nbsp;({{#funct.currencyNumberToText}}{{hargaBarang}}{{/funct.currencyNumberToText}})</li>{{/identitas.brangNadiar}}`
        const template = new Template(raw)

        expect(template
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayCurrencyTextMustache()
          .toArrayCurrencyMustache()
          .mustache
        ).to.equals(expected)
    })

    it("Test array not wrapped, text, number, number text, and date", async () => {
        const raw = await readFile("/mock/03-min/raw.html")
        const expected = await readFile("/mock/03-min/mustache.html")
        const template = new Template(raw)
        expect(template
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayNumberTextMustache()
          .toArrayNumberMustache()
          .toArrayDateMustache()
          .mustache
        ).to.equals(expected)
    })

    it("Test complex array with std variable", async () => {
        const raw = await readFile("/mock/04-min/raw.html")
        const expected = await readFile("/mock/04-min/mustache.html")
        const template = new Template(raw)
        expect(template
          .toTextOrTextareaOrRadioOrDropdownMustache()
          .toDateMustache()
          .toCurrencyTextMustache()
          .toCurrencyNumberMustache()
          .toNumberTextMustache()
          .toNumberMustache()
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayCurrencyTextMustache()
          .toArrayCurrencyMustache()
          .toArrayNumberMustache()
          .toArrayNumberTextMustache()
          .toArrayDateMustache()
          .mustache
        ).to.equals(expected)
    })

    it("Name, radio, and dropdown array", () => {
        const raw = `<br><ul><li data-varname="Identitas" class="array" data-vartype="array" data-section="firstparty">Nama <mark class="template-variable2 firstparty name" data-variable="name" data-vartype="text" data-question="Siapakah nama pihak Kesatu?" data-section="firstparty" data-id="600e368836274d0fa36af59a" id="0811b20e-28d2-48a1-8a9f-9d6ae72ec550" data-prevtext="firstparty.name"><<firstparty.name>></mark> , suku <mark class="template-variable2 firstparty suku" data-variable="suku" data-vartype="dropdown" data-question="Suku" data-section="firstparty" data-id="2" id="3e9b8454-7f24-4217-b579-94776aa80682" data-prevtext="firstparty.Identitas.suku" data-arrayname="Identitas"><<firstparty.Identitas.suku>></mark> , jenis kemalin <mark class="template-variable2 firstparty jenisKelamin" data-variable="jenisKelamin" data-vartype="radio" data-question="Ras" data-section="firstparty" data-id="1" id="1a1c5745-ce20-4558-92da-0184ca46065b" data-prevtext="firstparty.Identitas.jenisKelamin" data-arrayname="Identitas"><<firstparty.Identitas.jenisKelamin>></mark>&nbsp;</li></ul>`
        const expected = `<br><ul>{{#firstparty.Identitas}}<li data-varname="Identitas" class="array" data-vartype="array" data-section="firstparty">Nama {{firstparty.name}} , suku {{suku}} , jenis kemalin {{jenisKelamin}}&nbsp;</li>{{/firstparty.Identitas}}</ul>`
        const template = new Template(raw)
        const mustache = template
          .toTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .mustache
        expect(mustache).to.equals(expected)
    })

    // it("Rich HTML test", async () => {
    //     const raw = await readFile("/mock/05-rich-html/raw.html")
    //     const expected = await readFile("/mock/05-rich-html/mustache.html")
    //     const template = new Template(raw)
    //     const mustache = template
    //       .toTextOrTextareaOrRadioOrDropdownMustache()
    //       .mustache
    //     // fs.writeFile(__dirname + "/FILE.html", mustache, (err) => {
    //     //     console.log(err)
    //     // })
    //     expect(mustache
    //     ).to.equals(expected)
    // })

    it("Escaped html test", () => {
        const raw = `<p> SURAT PENGUNDURAN DIRI</p><p>dad, hari Rabu tanggal 01 bulan Januari tahun 2020 Kepada Yth,</p><p>Direktur PT. dad</p><p>Yang beralamat di, adasd</p><p>Dengan Hormat,</p><ol><li>Nama barang: PS5 Harga 8.7</li><li data-section="lainLain" data-varname="harga_75c34495af23" data-vartype="array" class="array">Nama barang&nbsp;<mark data-variable="nama_a688dcc438b7" data-vartype="text" data-section="lainLain" data-arrayname="barang_ce307f0a78f5" class="template-variable2 lainLain nama_a688dcc438b7" contenteditable="false">&lt;&lt;lainLain.barang_ce307f0a78f5.nama_a688dcc438b7&gt;&gt;</mark> harga&nbsp;<mark data-variable="harga_75c34495af23" data-vartype="currency" data-section="lainLain" data-numbertype="" class="template-variable2 lainLain harga_75c34495af23" data-arrayname="barang_ce307f0a78f5" contenteditable="false">&lt;&lt;lainLain.barang_ce307f0a78f5.harga_75c34495af23&gt;&gt;</mark></li></ol><p>No.</p><p>Karyawan</p><p>: adasdsad</p><p>Melalui surat ini, saya sebagai salah satu seorang karyawan PT. dad, berdasarkan perjanjian kerja antara karyawan dengan perusahaan serta berdasarkan Undang-Undang No.13 Tahun 2003 tentang Ketenagakerjaan, maka dengan segala hormat saya yang bertanda tangan dibawah ini menyatakan sebagai berikut:</p><p>Bermaksud hendak mengajukan permohonan pengunduran diri dari PT. dad dengan alasan adasd. Berdasarkan perjanjian kerja tanggal 02 bulanJanuari tahun 2020 yang mengatur mengenai pemberitahuan tertulis pengunduran diri, maka saya akan efektif berhenti bekerja pada tanggal 29 bulanJanuari tahun 2021. Mohon maaf apabila saya pernah melakukan kesalahan selama saya bekerja baik yang disengaja maupun yang tidak disengaja.</p><p>Demikianlah surat ini saya buat dalam keadaan sadar dan tanpa adanya paksaan dari pihak manapun. Terima kasih atas pengertian bapak/ibu.</p><p>Hormat saya,</p><p>adasdsad</p>`
        const expected = `<p> SURAT PENGUNDURAN DIRI</p><p>dad, hari Rabu tanggal 01 bulan Januari tahun 2020 Kepada Yth,</p><p>Direktur PT. dad</p><p>Yang beralamat di, adasd</p><p>Dengan Hormat,</p><ol><li>Nama barang: PS5 Harga 8.7</li>{{/lainLain.harga_75c34495af23}}{{/lainLain.harga_75c34495af23}}{{/lainLain.harga_75c34495af23}}{{/lainLain.harga_75c34495af23}}{{/lainLain.harga_75c34495af23}}{{/lainLain.harga_75c34495af23}}{{#lainLain.harga_75c34495af23}}<li data-section="lainLain" data-varname="harga_75c34495af23" data-vartype="array" class="array">Nama barang&nbsp;{{nama_a688dcc438b7}} harga&nbsp;{{#funct.formatCurrencyNumber}}{{harga_75c34495af23}}{{/funct.formatCurrencyNumber}}</li></ol><p>No.</p><p>Karyawan</p><p>: adasdsad</p><p>Melalui surat ini, saya sebagai salah satu seorang karyawan PT. dad, berdasarkan perjanjian kerja antara karyawan dengan perusahaan serta berdasarkan Undang-Undang No.13 Tahun 2003 tentang Ketenagakerjaan, maka dengan segala hormat saya yang bertanda tangan dibawah ini menyatakan sebagai berikut:</p><p>Bermaksud hendak mengajukan permohonan pengunduran diri dari PT. dad dengan alasan adasd. Berdasarkan perjanjian kerja tanggal 02 bulanJanuari tahun 2020 yang mengatur mengenai pemberitahuan tertulis pengunduran diri, maka saya akan efektif berhenti bekerja pada tanggal 29 bulanJanuari tahun 2021. Mohon maaf apabila saya pernah melakukan kesalahan selama saya bekerja baik yang disengaja maupun yang tidak disengaja.</p><p>Demikianlah surat ini saya buat dalam keadaan sadar dan tanpa adanya paksaan dari pihak manapun. Terima kasih atas pengertian bapak/ibu.</p><p>Hormat saya,</p><p>adasdsad</p>`
        const template = new Template(raw)
        expect(template
          .toTextOrTextareaOrRadioOrDropdownMustache()
          .toDateMustache()
          .toCurrencyTextMustache()
          .toCurrencyNumberMustache()
          .toNumberTextMustache()
          .toNumberMustache()
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayCurrencyTextMustache()
          .toArrayCurrencyMustache()
          .toArrayNumberMustache()
          .toArrayNumberTextMustache()
          .toArrayDateMustache()
          .mustache
        ).to.equals(expected)
    })

    it("Array test multi", () => {
        const raw = `<p>This will be array vars</p>
<ul>
<li class="array" data-section="nadiar_qze8836501eb9a" data-varname="identity_qz4e298a2e6e26" data-vartype="array">nama&nbsp;<mark class="template-variable2 nadiar_qze8836501eb9a nama_qz973e6e4bd4df" contenteditable="false" data-variable="nama_qz973e6e4bd4df" data-vartype="text" data-section="nadiar_qze8836501eb9a" data-arrayname="identity_qz4e298a2e6e26">&lt;&lt;nadiar.identity.nama&gt;&gt;</mark>, umur&nbsp;<mark class="template-variable2 nadiar_qze8836501eb9a umur_qza71b3bbbff01" contenteditable="false" data-variable="umur_qza71b3bbbff01" data-vartype="number" data-section="nadiar_qze8836501eb9a" data-numbertype="number" data-arrayname="identity_qz4e298a2e6e26">&lt;&lt;nadiar.identity.umur&gt;&gt;</mark> (<mark class="template-variable2 nadiar_qze8836501eb9a umur_qza71b3bbbff01" contenteditable="false" data-variable="umur_qza71b3bbbff01" data-vartype="number" data-section="nadiar_qze8836501eb9a" data-numbertype="text" data-arrayname="identity_qz4e298a2e6e26">&lt;&lt;nadiar.identity.umur.TERBILANG&gt;&gt;</mark>). Harga&nbsp;<mark class="template-variable2 nadiar_qze8836501eb9a harga_qz17bd87c635f6" contenteditable="false" data-variable="harga_qz17bd87c635f6" data-vartype="currency" data-section="nadiar_qze8836501eb9a" data-numbertype="number" data-arrayname="identity_qz4e298a2e6e26">&lt;&lt;nadiar.identity.harga&gt;&gt;</mark> (<mark class="template-variable2 nadiar_qze8836501eb9a harga_qz17bd87c635f6" contenteditable="false" data-variable="harga_qz17bd87c635f6" data-vartype="currency" data-section="nadiar_qze8836501eb9a" data-numbertype="text" data-arrayname="identity_qz4e298a2e6e26">&lt;&lt;nadiar.identity.harga.TERBILANG&gt;&gt;</mark>). Alamat:&nbsp;<mark class="template-variable2 nadiar_qze8836501eb9a alamat_qz1281911e2ded" contenteditable="false" data-variable="alamat_qz1281911e2ded" data-vartype="textarea" data-section="nadiar_qze8836501eb9a" data-arrayname="identity_qz4e298a2e6e26">&lt;&lt;nadiar.identity.alamat&gt;&gt;</mark></li>
<li class="array" data-section="nadiar_qze8836501eb9a" data-varname="identity_qz4e298a2e6e26" data-vartype="array">Aku adalah arjuna<code></code></li>
</ul>`
        const expected = `<p>This will be array vars</p>
<ul>
{{#nadiar_qze8836501eb9a.identity_qz4e298a2e6e26}}<li class="array" data-section="nadiar_qze8836501eb9a" data-varname="identity_qz4e298a2e6e26" data-vartype="array">nama&nbsp;{{nama_qz973e6e4bd4df}}, umur&nbsp;{{umur_qza71b3bbbff01}} ({{#funct.numberToText}}{{umur_qza71b3bbbff01}}{{/funct.numberToText}}). Harga&nbsp;{{#funct.formatCurrencyNumber}}{{harga_qz17bd87c635f6}}{{/funct.formatCurrencyNumber}} ({{#funct.currencyNumberToText}}{{harga_qz17bd87c635f6}}{{/funct.currencyNumberToText}}). Alamat:&nbsp;{{alamat_qz1281911e2ded}}</li>{{/nadiar_qze8836501eb9a.identity_qz4e298a2e6e26}}
<li class="array" data-section="nadiar_qze8836501eb9a" data-varname="identity_qz4e298a2e6e26" data-vartype="array">Aku adalah arjuna<code></code></li>
</ul>`
        const template = new Template(raw)
        expect(template
          .toTextOrTextareaOrRadioOrDropdownMustache()
          .toDateMustache()
          .toCurrencyTextMustache()
          .toCurrencyNumberMustache()
          .toNumberTextMustache()
          .toNumberMustache()
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayCurrencyTextMustache()
          .toArrayCurrencyMustache()
          .toArrayNumberMustache()
          .toArrayNumberTextMustache()
          .toArrayDateMustache()
          .mustache
        ).to.equals(expected)
    })

    it("Array test multi2", () => {
        const raw = `<p>EDIT ME!!.. Halo nama saya nadiar</p>
<ul>
<li>Nama nadiar</li>
<li class="array" data-section="unlisted" data-varname="identitas_qz946df61286d8" data-vartype="array">list nama:&nbsp;<mark class="template-variable2 unlisted name_qz1bb8edeaff06" contenteditable="false" data-variable="name_qz1bb8edeaff06" data-vartype="text" data-section="unlisted" data-arrayname="identitas_qz946df61286d8">&lt;&lt;unlisted.identitas.name&gt;&gt;</mark>, alamat:&nbsp;<mark class="template-variable2 unlisted address_qz0ff4a0a57be6" contenteditable="false" data-variable="address_qz0ff4a0a57be6" data-vartype="textarea" data-section="unlisted" data-arrayname="identitas_qz946df61286d8">&lt;&lt;unlisted.identitas.address&gt;&gt;</mark>, umur:&nbsp;<mark class="template-variable2 unlisted age_qzb4575d667b5b" contenteditable="false" data-variable="age_qzb4575d667b5b" data-vartype="number" data-section="unlisted" data-numbertype="number" data-arrayname="identitas_qz946df61286d8">&lt;&lt;unlisted.identitas.age&gt;&gt;</mark> (<mark class="template-variable2 unlisted age_qzb4575d667b5b" contenteditable="false" data-variable="age_qzb4575d667b5b" data-vartype="number" data-section="unlisted" data-numbertype="text" data-arrayname="identitas_qz946df61286d8">&lt;&lt;unlisted.identitas.age.TERBILANG&gt;&gt;</mark>), harta:&nbsp;<mark class="template-variable2 unlisted welth_qzae3d3954b269" contenteditable="false" data-variable="welth_qzae3d3954b269" data-vartype="currency" data-section="unlisted" data-numbertype="number" data-arrayname="identitas_qz946df61286d8">&lt;&lt;unlisted.identitas.welth&gt;&gt;</mark> (<mark class="template-variable2 unlisted welth_qzae3d3954b269" contenteditable="false" data-variable="welth_qzae3d3954b269" data-vartype="currency" data-section="unlisted" data-numbertype="text" data-arrayname="identitas_qz946df61286d8">&lt;&lt;unlisted.identitas.welth.TERBILANG&gt;&gt;</mark>) oke terima kasih.</li>
<li>end</li>
</ul>`
        const expected = `1`
        const template = new Template(raw)
        expect(template
          .toTextOrTextareaOrRadioOrDropdownMustache()
          .toDateMustache()
          .toCurrencyTextMustache()
          .toCurrencyNumberMustache()
          .toNumberTextMustache()
          .toNumberMustache()
          .toArrayTextOrTextareaOrRadioOrDropdownMustache()
          .toArrayCurrencyTextMustache()
          .toArrayCurrencyMustache()
          .toArrayNumberMustache()
          .toArrayNumberTextMustache()
          .toArrayDateMustache()
          .mustache
        ).to.equals(expected)
    })
})

/**
 * Accept filepath relative from project, return read string from filepath
 * @function readFile
 * @param {string} path
 * @return {Promise<string>}
 */
function readFile(path: string): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile(__dirname + path, "utf8", (err, data) => {
            if (err) reject(err)
            if (data) resolve(data)
        })
    })
}