let qNum = 0;
let score = 0;
let qIndex = 0; // tracks currently selected QUESTION object
let overlay = $('.overlay');

function quizResults() {
  renderScorekeeper(10, score);
  $('#question-page').html(`
  <h3>Thanks for playing!</h3>
  <h4>You scored ${score} out of a possible 10 points.</h4>
  <button type="button" class="reset-btn">Play again</button>
  `);
};

function incrementQuestion() {
  qNum++;
  qIndex++;
};

function renderFeedback(answer, selection) {
  if (selection == answer) {
    score++;
    $('#question-page').html(`
      <h3>CORRECT</h3>
      <h4>${QUESTION[qIndex].flavorText}</h4>
      <button type="button" class="advance-btn">Proceed</button>`
    );
  } else {
    $('#question-page').html(`
      <h3>Nope, sorry</h3>
      <h4>${QUESTION[qIndex].flavorText}</h4>
      <button type="button" class="advance-btn">Proceed</button>`
    );
  };
};

function populateQuestion(index) {
  let currentObj = QUESTION[index];

  return `
    <legend>${currentObj.question}</legend>
    
    <div>
      <label class='option option1'>
      <input required class="radio" type="radio" value='${currentObj.options[0]}' name='option'>${currentObj.options[0]}
      </label>
    </div>

    <div>
      <label class='option option2'>    
      <input required class="radio" type="radio" value='${currentObj.options[1]}' name='option'>${currentObj.options[1]}
      </label>
    </div>

    <div>
      <label class='option option3'>    
      <input required class="radio" type="radio" value='${currentObj.options[2]}' name='option'>${currentObj.options[2]}
      </label>
    </div>
    
    <div>
      <label class='option option4'>    
      <input required class="radio" type="radio" value='${currentObj.options[3]}' name='option'>${currentObj.options[3]}
      </label>
    </div>

    <button type="button" class="submit-btn">Submit</button>`;
};

function renderQuestion(content) {
  $('#question-page').html(content);
};

function renderScorekeeper(question = qNum) {
  $('#question-counter').html(`Question ${question} of 10`);
  $('#score-counter').html(`Score: ${score}`);
};

function getUserSelection() {
  let radios = $('input[type="radio"]');
  for (let i = 0; i < radios.length; i++) {
    if (radios[i].checked) {
      return radios[i].value;
      break;
    };
  };
};

function getCorrectAnswer() {
  return QUESTION[qIndex].answer;
};

function initEventHandlers() {
  $('main').on('click', '.start-btn', function (event) {
    $('#start-page').toggleClass('hidden');
    $('#question-page').toggleClass('hidden');
    quizLoop();
  });

  $('main').on('click', '.submit-btn', function (event) {
    if (getUserSelection() === undefined) {
      overlay.show(1000);
      setTimeout(function(){
        overlay.hide(1000);
      }, 4000);
    } else {
      renderFeedback(getCorrectAnswer(), getUserSelection());
    };
  });

  $('main').on('click', '.advance-btn', function (event) {
    incrementQuestion();
    quizLoop();
  });

  $('main').on('click', '.reset-btn', function (event) {
    $('#start-page').toggleClass('hidden');
    $('#question-page').toggleClass('hidden');
    qNum = 1;
    score = 0;
    qIndex = 0;
    quizLoop();
  });
};

function quizLoop() {
  if (qNum === 0) {
    qNum++;
    initEventHandlers();
  } else if (qNum > 0 && qNum <= 10) {
    renderScorekeeper();
    renderQuestion(populateQuestion(qIndex));
  } else if (qIndex == 10) {
    quizResults();
  };
};

$(quizLoop());
