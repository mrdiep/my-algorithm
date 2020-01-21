search([5, 7, 3], 1);

function search(jugLabelList, waterAmount) {
  jugLabelList.sort();
  console.log('ĐỀ BÀI: Đong ' + waterAmount + ' lít nước từ các bình có dung tích: ' + jugLabelList);

  const initState = {
    jugs: new Array(jugLabelList.length).fill(0), //first all jug is empty
    actions: []
  };

  const queue = [initState];
  const pairJugs = getPair(jugLabelList);

  var visitedStates = new Set();
  while (queue.length > 0) {

    const jugWaterListState = queue.shift();

    const result = checkResult(jugWaterListState.jugs, jugLabelList, waterAmount)
    if (result) {
      console.log(jugWaterListState.actions.map((action, i) => `${(i + 1)}. ${action}`).join('\r\n'))
      console.log(result);
      return;
    }

    visitedStates.add(jugWaterListState.jugs.join('-'));

    var newJugWaterListStates = expandJugState(jugWaterListState.jugs, pairJugs, jugLabelList);
    for (var newJugWaterListState of newJugWaterListStates) {
      if (visitedStates.has(newJugWaterListState.jugs.join('-'))) continue;
      queue.push({
        jugs: newJugWaterListState.jugs,
        actions: [...jugWaterListState.actions,
          newJugWaterListState.actionDesc]
      });
    }
  }

  console.log('KHÔNG GIẢI ĐƯỢC.')
}

function checkResult(jugWaterListState, jugLabelList, waterAmount) {
  for (var i = 0; i < jugLabelList.length; i++) {
    if (jugWaterListState[i] === waterAmount) return 'KẾT QUẢ: Bình dung tích ' + jugLabelList[i] + ' lít chứa ' + waterAmount + ' lít cần tìm';
  }

  return false;
}

function getDesc(jugWaterListState, jugLabelList) {
  return '\r\n..Trạng thái:\n......' + jugLabelList.map((jug, i) => 'Bình dung tích ' + jug + ' lít có ' + jugWaterListState[i] + ' lít trong bình').join('\n......')
}

function getDescEnglish(jugWaterListState, jugLabelList) {
  return '\r\n..Jug List State:\n......' + jugLabelList.map((jug, i) => 'Jug ' + jug + ' litre has ' + jugWaterListState[i] + ' litre').join('\n......')
}

function expandJugState(state, pairJugs, jugs) {
  var newJugWaterListStates = [];

  //find action jugA can pour to jugB
  for (var pairJug of pairJugs) {
    var jugAVolume = pairJug[0];
    var jugBVolume = pairJug[1];

    var jugAIndex = jugs.indexOf(jugAVolume);
    var jugBIndex = jugs.indexOf(jugBVolume);

    if (canPour(jugAIndex, jugBIndex, jugBVolume, state)) {
      var newState = pour(jugAIndex, jugAVolume, jugBIndex, jugBVolume, state);
      newJugWaterListStates.push({
        jugs: newState,
        actionDesc: 'Đổ từ bình ' + jugAVolume + ' lít sang bình ' + jugBVolume + ' lít ' + getDesc(newState, jugs),
        actionDescEnglish: 'Pour from jug ' + jugAVolume + ' litre to jug ' + jugBVolume + ' litre ' + getDescEnglish(newState, jugs)
      });
    }
  }

  for (var jugVolumn of jugs) {
    const jugIndex = jugs.indexOf(jugVolumn);

    if (canFill(jugIndex, jugVolumn, state)) {
      const newState = fill(jugIndex, jugVolumn, state);
      newJugWaterListStates.push({
        jugs: newState,
        actionDesc: 'Đổ đầy bình ' + jugVolumn + ' lít ' + getDesc(newState, jugs),
        actionDescEnglish: 'Fill jug ' + jugVolumn + ' litre ' + getDescEnglish(newState, jugs),
      });
    }

    if (canFillout(jugIndex, state)) {
      var newState = fillout(jugIndex, state);
      newJugWaterListStates.push({
        jugs: newState,
        actionDesc: 'Đổ hết nước bình' + jugVolumn + ' lít ' + getDesc(newState, jugs),
        actionDescEnglish: 'Fillout jug ' + jugVolumn + ' litre ' + getDescEnglish(newState, jugs)
      });
    }
  }

  return newJugWaterListStates;
}

function canFill(jugIndex, jugVolumn, states) {
  return states[jugIndex] !== jugVolumn;
}

function fill(jugIndex, jugVolumn, states) {
  var newState = [...states];
  newState[jugIndex] = jugVolumn;
  return newState;
}

function canFillout(jugIndex, states) {
  return states[jugIndex] !== 0;
}

function fillout(jugIndex, states) {
  var newState = [...states];
  newState[jugIndex] = 0;
  return newState;
}

function canPour(jugAIndex, jugBIndex, jugBVolumne, states) {
  return states[jugAIndex] > 0 && states[jugBIndex] < jugBVolumne;
}

function pour(jugAIndex, jugAVolumne, jugBIndex, jugBVolumne, states) {
  var newState = [...states];

  const trimJug = (volume, value) => value > volume ? volume : (value < 0 ? 0 : value);

  newState[jugBIndex] = trimJug(jugBVolumne, states[jugBIndex] + states[jugAIndex]);
  newState[jugAIndex] = trimJug(jugAVolumne, states[jugAIndex] - (jugBVolumne - states[jugBIndex]));

  return newState;
}

function getPair(arr) {
  //get pair: arr = [1,2,3,4] => 1,2  1,3   1,4  2,3  2,4  3,4

  var result = [];
  const findPairs = (arr) => {
    for (var i = 1; i < arr.length; i++) {
      result.push([arr[0], arr[i]]);
      result.push([arr[i], arr[0]]);
    }

    if (arr.length > 2) {
      findPairs(arr.slice(1));
    }
  }

  findPairs(arr);

  return result.filter(x=> x[0] !== x[1]);
}

