export const numberAndTextAndNumberTextMock = `

Hallo saya punya nama alias sebanyak <mark id="any-id" class="any-class template-variable2" data-id="15f44a53-f246-45e7-b422-41af68203197" data-variable="count" data-varType="number" data-question="any string" data-section="aliasname" data-prevtext="any string"><<aliasname.count>></mark> atau terbilang <mark id="any-id" class="any-class template-variable2" data-id="15f44a53-f246-45e7-b422-41af68203197" data-variable="count" data-varType="number" data-question="any string" data-section="aliasname" data-numberType="text" data-prevtext="any string"><<aliasname.count.TERBILANG>></mark>

`

export const numberAndTextAndNumberTextExpected = `

Hallo saya punya nama alias sebanyak {{}} atau terbilang {{}}

`

// test test and then number, should error