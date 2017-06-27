/**
 * jspsych-survey-text
 * a jspsych plugin for free response survey questions
 *
 * Josh de Leeuw
 *
 * documentation: docs.jspsych.org
 *
 */


jsPsych.plugins['paired_recall'] = (function() {

  var plugin = {};

  plugin.trial = function(display_element, trial) {

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

    trial.prompt = (typeof trial.prompt === 'undefined') ? "" : trial.prompt;
    if (typeof trial.prompt == 'undefined') {
      trial.prompt = "";
    };

    trial.image = (typeof trial.prompt === 'undefined') ? "" : trial.prompt;
    if (typeof trial.prompt == 'undefined') {
      trial.prompt = "";
    };

    trial.direction = (typeof trial.direction === 'undefined') ? "" : trial.direction;
    if (typeof trial.direction == 'undefined') {
      trial.direction = "";
    };



    // if any trial variables are functions
    // this evaluates the function and replaces
    // it with the output of the function
    trial = jsPsych.pluginAPI.evaluateFunctionParameters(trial);


    for (i in trial.questions){
    display_element.append($('<div>', {
      "id": 'jspsych-survey-text-image',
      "class": 'jspsych-survey-text-image'
    }));
    $('#jspsych-survey-text-image').html(trial.image);



    // add questions
  //7  for (var i = 0; i < 4; i++) {
      // create div
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-' + i,
        "class": 'jspsych-survey-text-question'
      }));

      // show preamble text
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-preamble',
        "class": 'jspsych-survey-text-preamble'
      }));

      $("#jspsych-survey-text-" + i).append('<textarea style="position:relative;float:left;margin-left:5px;" "name="#jspsych-survey-text-response-' + i + '" cols=14"' + '" rows=1"' + '"></textarea><br>');

      $("#jspsych-survey-text-" + i).append('<p style="float:left;margin-top:0px;margin-bottom:0px;" class="jspsych-survey-text "name="#aaa-' + i + '">' + trial.questions[i] + '</p>');
    //  console.log("trial.questions: " + trial.questions[i]);

/*
      // add question text
      $("#jspsych-survey-text-" + i).append('<p style="position:relative;float:left;margin-top:-5px;margin-bottom:20px;" class="jspsych-survey-text">' + trial.questions[i] + '</p>');

      // add text box
      $("#jspsych-survey-text-" + i).append('<textarea style="position:relative;float:left;margin-left:5px;" "name="#jspsych-survey-text-response-' + i + '" cols=14"' + '" rows=1"' + '"></textarea><br>');
  //  }

  //  for (var i = 4; i < 8; i++) {
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-' + i,
        "class": 'jspsych-survey-text-question'
    }));

      // show preamble text
      display_element.append($('<div>', {
        "id": 'jspsych-survey-text-preamble',
        "class": 'jspsych-survey-text-preamble'
      }));

      // add text box
    //  $("#jspsych-survey-text-" + i).append('<br><br><br><textarea style="position:relative;float:left;margin-right:5px;" "name="#jspsych-survey-text-response-' + i + '" cols=14"' + '" rows=1"' + '"></textarea>'/*+ "<p style='position:relative;foat:left;'> – </p>");

      // add question text
      $("#jspsych-survey-text-" + i).append('<p style="float:left;margin-top:0px;margin-bottom:0px;" class="jspsych-survey-text "name="#aaa-' + i + '">' + trial.questions[i] + '</p>');

    //}

*/

    //show prompt if there is one
    if (trial.prompt !== "") {
      display_element.append(trial.prompt);
    }

    $('#jspsych-survey-text-preamble').html(trial.preamble);


    // add submit button
    display_element.append($('<button>', {
      'id': 'jspsych-survey-text-next',
      'class': 'jspsych-btn jspsych-survey-text'
    }));

    $("#jspsych-survey-text-next").html('Weiter');
    $("#jspsych-survey-text-next").click(function() {
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
        "responses": JSON.stringify(question_data)
      };


      display_element.html('');
    };

      // next trial
      jsPsych.finishTrial(trialdata);
    });


    var startTime = (new Date()).getTime();
  };

  return plugin;
})();
