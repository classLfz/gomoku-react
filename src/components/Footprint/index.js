export default function(list, activeUser) {
  let pieceCount = 0;
  for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].length; j++) {
      if (list[i][j]['piece'] === 'none') {
        pieceCount++;
        // 进攻分数计算
        // 水平
        let count = 0;
        count = justiceXL(i, j, activeUser, list, count);
        count = justiceXR(i, j, activeUser, list, count);

        let score = countScore(count);
        // 45度角
        count = 0;
        count = justiceXYLL(i, j, activeUser, list, count);
        count = justiceXYLR(i, j, activeUser, list, count);
        score = score > countScore(count) ? score : countScore(count);

        // 90度角
        count = 0;
        count = justiceYT(i, j, activeUser, list, count);
        count = justiceYB(i, j, activeUser, list, count);
        score = score > countScore(count) ? score : countScore(count);

        //135度角
        count = 0;
        count = justiceXYRR(i, j, activeUser, list, count);
        count = justiceXYRL(i, j, activeUser, list, count);
        score = score > countScore(count) ? score : countScore(count);

        list[i][j]['attackScore'] = score;

        // 防守分数计算
        let enemy = activeUser === 'black' ? 'white': 'black';
        // console.log(enemy);
        // 水平
        score = 0;
        count = 0;
        count = justiceXL(i, j, enemy, list, count);
        count = justiceXR(i, j, enemy, list, count);
        score = score > countScore(count) ? score : countScore(count + 1);

        // 45度角
        count = 0;
        count = justiceXYLL(i, j, enemy, list, count);
        count = justiceXYLR(i, j, enemy, list, count);
        score = score > countScore(count) ? score : countScore(count + 1);

        // 90度角
        count = 0;
        count = justiceYT(i, j, enemy, list, count);
        count = justiceYB(i, j, enemy, list, count);
        score = score > countScore(count) ? score : countScore(count + 1);

        // 135度角
        count = 0;
        count = justiceXYRR(i, j, enemy, list, count);
        count = justiceXYRL(i, j, enemy, list, count);
        score = score > countScore(count) ? score : countScore(count + 1);

        list[i][j]['defendScore'] = score;
      }
    }
  }

  // 先手第一步棋
  if (pieceCount === 361) {
    return {
      x: 9,
      y: 9
    };
  }

  let scoreTop = 0;
  let x = 0,
      y = 0;
  for (let k = 0; k < list.length; k++) {
    for (let l = 0; l < list[k].length; l++) {
      if (list[k][l]['piece'] === 'none') {
        if (list[k][l]['attackScore'] >= scoreTop) {
          scoreTop = list[k][l]['attackScore'];
          x = k;
          y = l;
        }

        if (list[k][l]['defendScore'] >= scoreTop) {
          scoreTop = list[k][l]['defendScore'];
          x = k;
          y = l;
        }
      }
    }
  }

  return {
    x: x,
    y: y
  };
}

// 计算分数
function countScore(count) {
  let scores = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  return scores[count];
}

// 水平左
function justiceXL(x, y, piece, list, count) {
  if (list[x - 1] && list[x - 1][y] && list[x - 1][y]['piece'] !== 'none') {
    if (list[x - 1][y]['piece'] === piece) {
      count++;
      count++;
      return justiceXL(x - 1, y, piece, list, count);
    }

    if (list[x - 1][y]['piece'] === 'none') {
      count++;
    }
  }

  return count;
}

// 水平右
function justiceXR(x, y, piece, list, count) {
  if (list[x + 1] && list[x + 1][y] && list[x + 1][y]['piece'] !== 'none') {
    if (list[x + 1][y]['piece'] === piece) {
      count++;
      count++;
      return justiceXR(x + 1, y, piece, list, count);
    }

    if (list[x + 1][y]['piece'] === 'none') {
      count++;
    }
  }

  return count;
}

// 45度角左判断
function justiceXYLL(x, y, piece, list, count) {
  if (list[x - 1] && list[x - 1][y - 1] && list[x - 1][y - 1] !== 'none') {
    if (list[x - 1][y - 1]['piece'] === piece) {
      count++;
      count++;
      return justiceXYLL(x - 1, y - 1, piece, list, count);
    }

    if (list[x - 1][y - 1]['piece'] === 'none') {
      count++;
    }
  }

  return count;
}

// 45度角右判断
function justiceXYLR(x, y, piece, list, count) {
  if (list[x + 1] && list[x + 1][y + 1] && list[x + 1][y + 1] !== 'none') {
    if (list[x + 1][y + 1]['piece'] === piece) {
      count++;
      count++;
      return justiceXYLR(x + 1, y + 1, piece, list, count);
    }

    if (list[x + 1][y + 1]['piece'] === 'none') {
      count++;
    }
  }

  return count;
}

// 90度角上判断
function justiceYT(x, y, piece, list, count) {
  if (list[x] && list[x][y - 1] && list[x][y - 1] !== 'none') {
    if (list[x][y - 1]['piece'] === piece) {
      count++;
      count++;
      return justiceYT(x, y - 1, piece, list, count);
    }

    if (list[x][y - 1]['piece'] === 'none') {
      count++;
    }
  }

  return count;
}

// 90度角下判断
function justiceYB(x, y, piece, list, count) {
  if (list[x] && list[x][y + 1] && list[x][y + 1] !== 'none') {
    if (list[x][y + 1]['piece'] === piece) {
      count++;
      count++;
      return justiceYB(x, y + 1, piece, list, count);
    }

    if (list[x][y + 1]['piece'] === 'none') {
      count++;
    }
  }

  return count;
}

// 135度角右判断
function justiceXYRR(x, y, piece, list, count) {
  if (list[x + 1] && list[x + 1][y - 1] && list[x + 1][y - 1] !== 'none') {
    if (list[x + 1][y - 1]['piece'] === piece) {
      count++;
      count++;
      return justiceXYRR(x + 1, y - 1, piece, list, count);
    }

    if (list[x + 1][y - 1]['piece'] === 'none') {
      count++;
    }
  }

  return count;
}

// 135度角右判断
function justiceXYRL(x, y, piece, list, count) {
  if (list[x - 1] && list[x - 1][y + 1] && list[x - 1][y + 1] !== 'none') {
    if (list[x - 1][y + 1]['piece'] === piece) {
      count++;
      count++;
      return justiceXYRL(x - 1, y + 1, piece, list, count);
    }

    if (list[x - 1][y + 1]['piece'] === 'none') {
      count++;
    }
  }

  return count;
}