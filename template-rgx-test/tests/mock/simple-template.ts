export const numberAndTextAndNumberTextMock = "Hallo saya punya nama alias sebanyak <mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"count\" data-varType=\"number\" data-question=\"any string\" data-section=\"aliasname\" data-prevtext=\"any string\"><<aliasname.count>></mark> atau terbilang <mark id=\"any-id\" class=\"any-class template-variable2\" data-id=\"15f44a53-f246-45e7-b422-41af68203197\" data-variable=\"count\" data-varType=\"number\" data-question=\"any string\" data-section=\"aliasname\" data-numberType=\"text\" data-prevtext=\"any string\"><<aliasname.count.TERBILANG>></mark>"

export const numberAndTextAndNumberTextExpected = "Hallo saya punya nama alias sebanyak {{aliasname.count}} atau terbilang {{#funct.numberToText}}{{aliasname.count}}{{/funct.numberToText}}"

export const textAndTextareaMock = `Your name is <mark class="template-variable2 any-class" id="any-id" data-id="15f44a53-f246-45e7-b422-41af68203199" data-variable="name" data-varType="text" data-question="any string" data-section="employee" data-prevtext="any string"><<contractinfo.date>></mark> and your adress is <mark class="template-variable2 any-class" id="any-id" data-id="15f44a53-f246-45e7-b422-41af68203200" data-variable="address" data-varType="textarea" data-question="any string" data-section="employee" data-prevtext="any string"><<contractinfo.date>></mark>`

export const textAndTextareaExpected = `Your name is {{employee.name}} and your adress is {{employee.address}}`