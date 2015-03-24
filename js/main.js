(function(){
    var words = { "0": "NEGLECTED", "1": "LIGHTWEIGHT", "2": "OBESITY", "3": "HANGMAN", "4": "ANNOUNCEMENT", "5": "INTEGRITY", "6": "SKYSCRAPER", "7": "COURAGE", "8": "MIGRATION", "9": "HYPERVISOR", "10": "EFFICIENCY" };
    var currWord = null;
    var guessedLetter = false;
    var guessedWordPart = 0;
    var wrongLetter = 0;
    var score = 0;

    $(document).ready(function () {

        resizeCanvas();
        loadWord();

        $(document).on("click", ".letterBtn", function (e) {
            var clearDrawing = false;
            for (i = 0; i < currWord.length; i++) {
                if (currWord[i] == $(this)[0].value) {
                    showLetter(i)
                }
            }
            if (!guessedLetter) {
                createAlert("Wrong letter!");
                wrongLetter++;
                clearDrawing = drawHangman();
            }
            if (!clearDrawing) {
                $(this)[0].disabled = true;
                if (!guessedLetter) {
                    $($(this)[0]).addClass("wrongLetterClass");
                }
                else {
                    $($(this)[0]).addClass("guessedLetterClass");
                }
            }
            else {
                $(".word")[0].innerHTML = currWord;
                $($(".word")[0]).addClass("letterSpacing");
                for (i = 0; i < $(".letterBtn").length; i++) {
                    if ($(".letterBtn")[i].disabled == false) {
                        $(".letterBtn")[i].disabled = true;
                    }
                }
            }
            guessedLetter = false;

        });

        $(document).on("click", ".newGame", function (e) {
            loadWord();
        });

        $(document).on("click", ".clearScore", function (e) {
            score = 0;
            $(".score")[0].innerHTML = score;
        });

        function resizeCanvas() {
            $(".drawing")[0].width = 200;
            $(".drawing")[0].height = 200;
        }

        function showLetter(match) {
            $(".word")[0].children[match].innerHTML = "  " + currWord[match] + "  ";
            guessedLetter = true;
            guessedWordPart++;
            if (guessedWordPart == currWord.length) {
                createAlert("Congratulations! You have guessed!");
                $($('.alert')).css("background-color", "#61d9ea");
                $(".score")[0].innerHTML = ++score;
                for (i = 0; i < $(".letterBtn").length; i++) {
                    if ($(".letterBtn")[i].disabled == false) {
                        $(".letterBtn")[i].disabled = true;
                    }
                }
                guessedWordPart = 0;
            }
        }

        function loadWord() {
            $('.alert').remove();
            wrongLetter = 0;
            guessedWordPart = 0;
            $($(".word")[0]).css('color', '#3ec5d8');
            $(".word").removeClass("letterSpacing");
            $(".letterBtn").removeClass("guessedLetterClass");
            $(".letterBtn").removeClass("wrongLetterClass");
            $(".word")[0].innerHTML = "";
            currWord = words[Math.floor(Math.random() * 11)];
            for (i = 0; i < currWord.length; i++) {
                $(".word").append("<span>  ___   </span>");
            }
            for (i = 0; i < $(".letterBtn").length; i++) {
                $(".letterBtn")[i].disabled = false;
            }
            var ctx = $(".drawing")[0].getContext("2d");
            ctx.clearRect(0, 0, 400, 400);
        }

        function drawHangman() {
            var ctx = $(".drawing")[0].getContext("2d");
            ctx.beginPath();
            switch (wrongLetter) {
                case 1:
                    ctx.moveTo(30, 30);
                    ctx.lineTo(30, 170);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    return false;
                    break;
                case 2:
                    ctx.moveTo(30, 30);
                    ctx.lineTo(120, 30);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    return false;
                    break;
                case 3:
                    ctx.moveTo(120, 30);
                    ctx.lineTo(120, 45);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    return false;
                    break;
                case 4:
                    ctx.beginPath();
                    ctx.arc(120, 58, 12, 0, 2 * Math.PI);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    return false;
                    break;
                case 5:
                    ctx.moveTo(120, 69);
                    ctx.lineTo(120, 120);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    return false;
                    break;
                case 6:
                    ctx.moveTo(120, 85);
                    ctx.lineTo(100, 75);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    return false;
                    break;
                case 7:
                    ctx.moveTo(120, 85);
                    ctx.lineTo(140, 75);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    return false;
                    break;
                case 8:
                    ctx.moveTo(120, 120);
                    ctx.lineTo(95, 140);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    return false;
                    break;
                case 9:
                    ctx.moveTo(120, 120);
                    ctx.lineTo(140, 140);
                    ctx.strokeStyle = '#FF891D';
                    ctx.stroke();
                    ctx.fillStyle = "rgba(255, 137, 29, 0.3)";
                    ctx.fillRect(0, 0, 300, 200);
                    createAlert("Game over!");
                    $($(".word")[0]).css('color', '#FFC691');
                    return true;
                    break;
            }
        }

        function createAlert(msg) {
            $('.alert').remove();
            var alertHtml = $('.alertContainer').append('<div class="alert" role="alert">\
                  <button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only"></span></button>\
                  ' + msg + '</div>');
            $('.alert').alert();
            if (msg == "Wrong letter!") {
                setTimeout(function () { $(".alert").alert('close'); }, 2000);
            }
            else {
                setTimeout(function () { $(".alert").alert('close'); }, 30000);
            }
        }
    });
})()
