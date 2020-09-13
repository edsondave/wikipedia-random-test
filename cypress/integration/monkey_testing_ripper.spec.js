describe('Wikipedia under monkeys', function() {
    it('visits wikipedia and survives monkeys', function() {
        cy.visit('https://es.wikipedia.org/wiki/Wikipedia:Portada');
        cy.wait(1000);
        randomEvent(10);
    })
})

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomStr(length) {
	if (length > 0) {
		return getRandomStr(length - 1) + String.fromCharCode(getRandomInt(48, 122));
	} else {
		return '';
	}
}
	
function randomClick(monkeysLeft) {

    var monkeysLeft = monkeysLeft;
    if(monkeysLeft > 0) {
        cy.get('a').then($links => {
            var randomLink = $links.get(getRandomInt(0, $links.length));
            if(!Cypress.dom.isHidden(randomLink)) {
                cy.wrap(randomLink).click({force: true});
                monkeysLeft = monkeysLeft - 1;
            }
            cy.wait(500);
            randomClick(monkeysLeft);
        });
    }   
}

function randomEvent(monkeysLeft) {

    if(monkeysLeft > 0) {
		
		var event = getRandomInt(0, 4);
		switch(event) {
			case 0:
				cy.get('a').then($links => {
					var randomLink = $links.get(getRandomInt(0, $links.length));
					if(!Cypress.dom.isHidden(randomLink)) {
						cy.wrap(randomLink).click({force: true});
					}
				});
				break;
			case 1:
				cy.get('input').then($inputs => {
					var input = $inputs.get(getRandomInt(0, $inputs.length));
					if(!Cypress.dom.isHidden(input)) {
						cy.wrap(input).type(getRandomStr(getRandomInt(1, 16)), {force: true});
					}
				});
				break;
			case 2:
				cy.get('select').then($selects => {
					var select = $selects.get(getRandomInt(0, $selects.length));
					if(!Cypress.dom.isHidden(select)) {
						cy.wrap(select).children('option').then($options => {
							var option = $options.get(getRandomInt(0, $options.length));
							cy.wrap(option).parent('select').select(option.innerText);
						})
					}
				});
				break;
			case 3:
				cy.get('button').then($buttons => {
					var button = $buttons.get(getRandomInt(0, $buttons.length));
					if(!Cypress.dom.isHidden(button)) {
						cy.wrap(button).click({force: true});
					}
				});
				break;
		}
            
		cy.wait(500);
		randomEvent(monkeysLeft-1);
		
    }   
}