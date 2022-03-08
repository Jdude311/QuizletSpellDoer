var terms = window.Quizlet.assistantModeData.studiableData.studiableMediaConnections;
var cards = window.Quizlet.assistantModeData.studiableData.studiableCardSides.map(x => terms.find(y => x.id == y.connectionModelId).text.plainText);

function getDef(term) {
    return cards[cards.findIndex(y => y == term) + 1];
}

function getTerm(def) {
    return cards[cards.findIndex(y => y == def) - 1];
}

function solveSpell() {
    let prompt = document.getElementsByClassName("UIDiv SpellQuestionView-inputPrompt--plain")[0].innerHTML;
    let answer = getTerm(prompt);
    let answerElem = (document.getElementsByClassName("AutoExpandTextarea-textarea")[0] || document.querySelector("textarea") || document.getElementById("js-spellInput"));

    // Put answer into input
    answerElem.value = answer;

    // Wait for space press, then submit
    answerElem.addEventListener("input", () => {
        let submit = new KeyboardEvent("keydown", {
            bubbles: true,
            cancelable: true,
            char: "Enter",
            key: "Enter",
            code: 13,
            which: 13
        });
        new Promise(resolve => setTimeout(resolve, 10)).then(() => answerElem.dispatchEvent(submit));
    });

var observer = new MutationObserver((mutations, obs) => {
    var answerElem = ((document.getElementsByClassName("UIDiv SpellQuestionView-inputWrapper") && document.getElementsByClassName("UIDiv SpellQuestionView-inputPrompt")));
    if (answerElem) {
        solveSpell();
        obs.disconnect();
        return;
    }
});
observer.observe(document, {
    childList: true,
    subtree: true
});

    return;
}


