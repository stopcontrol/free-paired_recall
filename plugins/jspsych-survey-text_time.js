/**
 * jspsych-survey-text
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['survey-text_time'] = (function() {

  var plugin = {};
timeLeft = 54;
  plugin.trial = function(display_element, trial) {
  timeLeft = 54;
  var startTime = (new Date()).getTime();
    trial.preamble = typeof trial.preamble == 'undefined' ? "" : trial.preamble;
    if (typeof trial.rows == 'undefined') {
      trial.rows = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.rows.push(1);
      }
    }
    if (typeof trial.columns == 'undefined') {
      trial.columns = [];
      for (var i = 0; i < trial.questions.length; i++) {
        trial.columns.push(40);
      }
    }

    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);
    trial.timing_stim = trial.timing_stim || -1;

    var setTimeoutHandlers = [];


    function startTime() {
        var today = new Date();

        var s = today.getSeconds();

        s = checkTime(s);
        document.getElementById('txt').innerHTML =
        s;
        var t = setTimeout(startTime, 500);
    }
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }



    //var AssoTimes = [];
/*$('textarea').keypress(function (e) {
 if (e.which === 188) {
  IndiTime = (new Date()).getTime()
  console.log(IndiTime);
  AssoTimes.push(IndiTime-startTime)
  }
});*/
/*$('textarea').keydown(function (event) {
  if (event.keydown === 188 || event.which === 188) {
    alert("oo");
    IndiTime = (new Date()).getTime();
    console.log(IndiTime);
    AssoTimes.push(IndiTime-startTime);
  }(e.target).is("input, textarea")"s
});
console.log(AssoTimes);
*/

var AssoTimes = [];

$(document).on("keydown", function (e) {
    if (e.which === 13  && $(e.target).is("input, textarea")) {

		var	IndiTime = (new Date()).getTime();
      console.log('Start: ' + startTime);
			console.log('Indicator: ' + IndiTime);
			AssoTimes.push(IndiTime-startTime);    }
			console.log('Dauer. ' + AssoTimes + ' ms');

}

);

    // show preamble text
    display_element.append($('<div>', {
      "id": 'jspsych-survey-text-preamble',
      "class": 'jspsych-survey-text-preamble'
    }));

    $('#jspsych-survey-text-preamble').html(trial.preamble);

    // add questions
    for (var i = 0; i < trial.questions.length; i++) {
      // create div
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-' + i,
        "class": 'jspsych-survey-text-question'
      }));

      // add question text
      $("#jspsych-survey-text-" + i).append('<p class="jspsych-survey-text">' + trial.questions[i] + '</p>');

      // add text box
      $("#jspsych-survey-text-" + i).append('<textarea name="#jspsych-survey-text-response-' + i + '" cols="' + trial.columns[i] + '" rows="' + trial.rows[i] + '"></textarea>');

       // add countr box
  			$("#jspsych-survey-text-" + i).append('<p> <i></i></p>');
				$("#jspsych-survey-text-" + i).append(' <font size="3" color="black">Verbleibende Sekunden:</font>');
                $("#jspsych-survey-text-" + i).append(' <input  id="time" size="3"></input>');
    }


    // Set cursor
    //  var cursorPosition = $('input,textarea').prop("selectionStart");
    var cursorPosition =  $("textarea").focus();


    // add submit button
      var end_trial = function() {

      for (var i = 0; i < setTimeoutHandlers.length; i++) {
          clearTimeout(setTimeoutHandlers[i]);
      }
      // measure response time
      var endTime = (new Date()).getTime();
      var response_time = endTime - startTime;

      // create object to hold responses
      var question_data = {};
      $("div.jspsych-survey-text-question").each(function(index) {
        var id = "Q" + index;
        var val = $(this).children('textarea').val();
        var obje = {};
        obje[id] = val;
        $.extend(question_data, obje);
      });

      // save data
      var trialdata = {
        "rt": response_time,
        "responses": JSON.stringify(question_data),
        "assoTime": AssoTimes
      };

      display_element.html('');

      // next trial
      jsPsych.finishTrial(trialdata);
    };

    if (trial.timing_stim > 0) {
      var t1 = setTimeout(function() {
        end_trial();
      }, trial.timing_stim);
      setTimeoutHandlers.push(t1);
    }


    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
