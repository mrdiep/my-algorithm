const Jug3 = 0;
const Jug4 = 1;
const Path = 2;
const isFound2Litre = jugs => jugs[Jug3] === 2 || jugs[Jug4] === 2;

function search() {
  console.log('ĐỀ BÀI: Có 2 bình 3 lít và 4 lit, Đong lấy 2 lít.\r\n')
  var queue = [[0, 0, []]];

  while (queue.length > 0) {
    const jugs = queue.shift();

    if (isFound2Litre(jugs)) {
      console.log(jugs[Path].join('\r\n'))
      return;
    }

    var newJugStates = getNewJugStates(jugs);
    for (var newJugState of newJugStates) {
      queue.push(newJugState);
    }
  }
}

search();

//"FILL 4 LITRE JUG TO 3 LITRE JUG");
//"FILL 3 LITRE JUG TO 4 LITRE JUG");
//"FILL IN 3 LITRE JUG");
//"FILL IN 4 LITRE JUG");
//"FILL OUT 3 LITRE JUG");
//"FILL OUT 4 LITRE JUG");
function getNewJugStates(jugs) {
  var newStates = [];

  if (canFillJug3(jugs)) {
    newStates.push(fillJug3(jugs));
  }

  if (canFillJug4(jugs))
    newStates.push(fillJug4(jugs));

  if (canJug3to4(jugs))
    newStates.push(jug3to4(jugs));

  if (canJug4to3(jugs))
    newStates.push(jug4to3(jugs));

  if (canFillOutJug3(jugs))
    newStates.push(fillOutJug3(jugs));

  if (canFillOutJug4(jugs))
    newStates.push(fillOutJug4(jugs));

  return newStates;
}

function trimJug3(value) {
  return value > 3 ? 3 : (value < 0 ? 0 : value);
};

function trimJug4(value) {
  return value > 4 ? 4 : (value < 0 ? 0 : value);
};


function getDescState(jugs) {
  return ` -> Bình 3 lít có ${jugs[Jug3]} lít - Bình 4 lít có ${jugs[Jug4]} lít`
}

function jug4to3(state) {
  var newJugState = [...state];

  newJugState[Jug3] = trimJug3(state[Jug3] + state[Jug4]);
  newJugState[Jug4] = trimJug4(state[Jug4] - (3 - state[Jug3]));

  newJugState[Path] = [...newJugState[Path], `Đổ bình 4 lít sang bình 3 lít ta có: ${getDescState(newJugState)}`];
  return newJugState;
}

function canJug4to3(state) {
  return state[Jug4] > 0 && state[Jug3] < 3;
}

function jug3to4(state) {
  var newJugState = [...state];

  newJugState[Jug4] = trimJug4(state[Jug4] + state[Jug3]);
  newJugState[Jug3] = trimJug3(state[Jug3] - (4 - state[Jug4]));

  newJugState[Path] = [...newJugState[Path], `Đổ bình 3 lít sang bình 4 lít ta có: ${getDescState(newJugState)}`]
  return newJugState;
}

function canJug3to4(state) {
  return state[Jug3] > 0 && state[Jug4] < 4;
}

function fillJug3(state) {
  var newJugState = [...state];
  newJugState[Jug3] = 3;
  newJugState[Path] = [...newJugState[Path], `Đổ đầy bình 3 lít: ${getDescState(newJugState)}`];
  return newJugState;
}

function canFillJug3(state) {
  return state[Jug3] !== 3;
}

function fillJug4(state) {
  var newJugState = [...state];
  newJugState[Jug4] = 4;
  newJugState[Path] = [...newJugState[Path], `Đổ đầy bình 4 lít: ${getDescState(newJugState)}`];
  return newJugState;
}

function canFillJug4(state) {
  return state[Jug4] !== 4;
}


function fillOutJug3(state) {
  var newJugState = [...state];
  newJugState[Jug3] = 0;
  newJugState[Path] = [...newJugState[Path], `Đổ hết nước trong bình 3 lít: ${getDescState(newJugState)}`];
  return newJugState;
}

function canFillOutJug3(state) {
  return state[Jug3] > 0;
}

function fillOutJug4(state) {
  var newJugState = [...state];
  newJugState[Jug4] = 0;
  newJugState[Path] = [...newJugState[Path], `Đổ hết nước trong bình 4 lít: ${getDescState(newJugState)}`];
  return newJugState;
}

function canFillOutJug4(state) {
  return state[Jug4] > 0;
}