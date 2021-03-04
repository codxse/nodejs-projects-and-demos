import { expect } from 'chai'
import { Template } from "../src/app"

describe("Regex array table test", () => {
  it("index array", () => {
    const raw = `<mark class="template-variable2 unlisted index_qz1bb8edeaff06" contenteditable="false" data-variable="index_qz1bb8edeaff06" data-vartype="arrayIndex" data-section="unlisted" data-arrayname="identitas_qz946df61286d8">&lt;&lt;unlisted.identitas.index&gt;&gt;</mark>`
    const expected = `{{@index + 1}}`
    const template = new Template(raw)
    expect(template.toArrayIndex(["li", "tr"]).mustache).to.equal(expected)
  })

  it("table1", () => {
    const raw = `<table><tr class="array" data-section="unlisted" data-varname="identitas_qz946df61286d8" data-vartype="array"><td><p><strong><mark class="template-variable2 unlisted name_qz1bb8edeaff06" contenteditable="false" data-variable="name_qz1bb8edeaff06" data-vartype="text" data-section="unlisted" data-arrayname="identitas_qz946df61286d8">&lt;&lt;unlisted.identitas.name&gt;&gt;</mark></strong></p></td><td><p><strong>Description Of Work </strong></p></td><td><p><strong>Technical</strong></p></td></tr><tr><td><p>&lt;&lt;variables&gt;&gt;</p></td><td></td><td></td></tr><tr><td></td><td><p>&lt;&lt;variables&gt;&gt;</p></td><td></td></tr><tr><td></td><td></td><td><p>&lt;&lt;variables&gt;&gt;</p></td></tr></table>`
    const expected = "<table>{{#unlisted.identitas_qz946df61286d8}}<tr class=\"array\" data-section=\"unlisted\" data-varname=\"identitas_qz946df61286d8\" data-vartype=\"array\"><td><p><strong>{{name_qz1bb8edeaff06}}</strong></p></td><td><p><strong>Description Of Work </strong></p></td><td><p><strong>Technical</strong></p></td></tr>{{/unlisted.identitas_qz946df61286d8}}<tr><td><p>&lt;&lt;variables&gt;&gt;</p></td><td></td><td></td></tr><tr><td></td><td><p>&lt;&lt;variables&gt;&gt;</p></td><td></td></tr><tr><td></td><td></td><td><p>&lt;&lt;variables&gt;&gt;</p></td></tr></table>"
    const template = new Template(raw)
    expect(template
      .toTextOrTextareaOrRadioOrDropdownMustache()
      .toDateMustache()
      .toCurrencyTextMustache()
      .toCurrencyNumberMustache()
      .toNumberTextMustache()
      .toNumberMustache()
      .toArrayIndex(["li", "tr"])
      .toArrayTextOrTextareaOrRadioOrDropdownMustache(["li", "tr"])
      .toArrayCurrencyTextMustache(["li", "tr"])
      .toArrayCurrencyMustache(["li", "tr"])
      .toArrayNumberMustache(["li", "tr"])
      .toArrayNumberTextMustache(["li", "tr"])
      .toArrayDateMustache(undefined, ["li", "tr"])
      .mustache).to.equal(expected)
  })
})