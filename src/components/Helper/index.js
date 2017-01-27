export default {
  justicer: justicer
};

function justicer(coordinate, activeUser, listArray) {
  let {x, y} = coordinate;
  // 统计数目
  let count = 0;
  // 0度角
  count = justiceXL(x, y, activeUser, listArray, count);
  count = justiceXR(x, y, activeUser, listArray, count);
  if (count >= 4) {
    return true;
  }

  count = 0;
  // 45度角
  count = justiceXYLL(x, y, activeUser, listArray, count);
  count = justiceXYLR(x, y, activeUser, listArray, count);
  if (count >= 4) {
    return true;
  }

  count = 0;
  // 90度角
  count = justiceYT(x, y, activeUser, listArray, count);
  count = justiceYB(x, y, activeUser, listArray, count);
  if (count >= 4) {
    return true;
  }

  count = 0;
  // 135度角
  count = justiceXYRR(x, y, activeUser, listArray, count);
  count = justiceXYRL(x, y, activeUser, listArray, count);
  if (count >= 4) {
    return true;
  }

  return false;
}

// 0度角左判断
function justiceXL(x, y, activeUser, listArray, count) {
  if (listArray[x - 1] && listArray[x - 1][y] && listArray[x - 1][y]['piece'] !== 'none') {
    if (listArray[x - 1][y]['piece'] === activeUser) {
      count++;
      return justiceXL(x - 1, y, activeUser, listArray, count);
    }
  }

  return count;
}

// 0度角右判断
function justiceXR(x, y, activeUser, listArray, count) {
  if (listArray[x + 1] && listArray[x + 1][y] && listArray[x + 1][y]['piece'] !== 'none') {
    if (listArray[x + 1][y]['piece'] === activeUser) {
      count++;
      return justiceXR(x + 1, y, activeUser, listArray, count);
    }
  }

  return count;
}

// 45度角左判断
function justiceXYLL(x, y, activeUser, listArray, count) {
  if (listArray[x - 1] && listArray[x - 1][y - 1] && listArray[x - 1][y - 1] !== 'none') {
    if (listArray[x - 1][y - 1]['piece'] === activeUser) {
      count++;
      return justiceXYLL(x - 1, y - 1, activeUser, listArray, count);
    }
  }

  return count;
}

// 45度角右判断
function justiceXYLR(x, y, activeUser, listArray, count) {
  if (listArray[x + 1] && listArray[x + 1][y + 1] && listArray[x + 1][y + 1] !== 'none') {
    if (listArray[x + 1][y + 1]['piece'] === activeUser) {
      count++;
      return justiceXYLR(x + 1, y + 1, activeUser, listArray, count);
    }
  }

  return count;
}

// 90度角上判断
function justiceYT(x, y, activeUser, listArray, count) {
  if (listArray[x] && listArray[x][y - 1] && listArray[x][y - 1] !== 'none') {
    if (listArray[x][y - 1]['piece'] === activeUser) {
      count++;
      return justiceYT(x, y - 1, activeUser, listArray, count);
    }
  }

  return count;
}

// 90度角下判断
function justiceYB(x, y, activeUser, listArray, count) {
  if (listArray[x] && listArray[x][y + 1] && listArray[x][y + 1] !== 'none') {
    if (listArray[x][y + 1]['piece'] === activeUser) {
      count++;
      return justiceYB(x, y + 1, activeUser, listArray, count);
    }
  }

  return count;
}

// 135度角右判断
function justiceXYRR(x, y, activeUser, listArray, count) {
  if (listArray[x + 1] && listArray[x + 1][y - 1] && listArray[x + 1][y - 1] !== 'none') {
    if (listArray[x + 1][y - 1]['piece'] === activeUser) {
      count++;
      return justiceXYRR(x + 1, y - 1, activeUser, listArray, count);
    }
  }

  return count;
}

// 135度角右判断
function justiceXYRL(x, y, activeUser, listArray, count) {
  if (listArray[x - 1] && listArray[x - 1][y + 1] && listArray[x - 1][y + 1] !== 'none') {
    if (listArray[x - 1][y + 1]['piece'] === activeUser) {
      count++;
      return justiceXYRL(x - 1, y + 1, activeUser, listArray, count);
    }
  }

  return count;
}