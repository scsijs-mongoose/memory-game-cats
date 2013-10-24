var pairsNumber = 6;

$(function(){
    matchingGame.deck.sort(shuffle);

    for (var i= 0; i<11; i++) {
        $(".card:first-child").clone().appendTo("#cards");
    }

    $("#cards").children().each(function(index){
        $(this).css({
            "left" : ($(this).width() + 20) * (index % 4),
            "top" : ($(this).height() + 20) * Math.floor(index / 4)
        });

        var pattern = matchingGame.deck.pop();
        $(this).find(".back").addClass(pattern);
        $(this).attr("data-pattern", pattern);
        $(this).click(selectCard);
    });
});

var matchingGame = {};
matchingGame.deck = [
    'card01', 'card01',
    'card02', 'card02',
    'card03', 'card03',
    'card04', 'card04',
    'card05', 'card05',
    'card06', 'card06'
];

function shuffle() {
    return 0.5 - Math.random();
}

function selectCard(){
    if($(".card-flipped").size() > 1) {
        return;
    }
    $(this).toggleClass("card-flipped");
    if($(".card-flipped").size() == 2) {
        setTimeout(checkPattern, 700);
    }
}

function checkPattern() {
    if (isMatchPattern()) {
        $(".card-flipped").removeClass("card-flipped").addClass("card-removed");
        $(".card-flipped").bind("webkitTransitionEnd", removeTookCards);
        pairsNumber--;
        if (pairsNumber == 0) {
            //$("#cards").remove();
        }
    } else {
        $(".card-flipped").removeClass("card-flipped");
    }
}

function isMatchPattern() {
    var cards = $(".card-flipped");
    var pattern = $(cards[0]).data("pattern");
    var anotherPattern = $(cards[1]).data("pattern");
    return (pattern == anotherPattern);
}

function removeTookCards() {
    $(".card-removed").remove();
}