export default function(coordinate, piece, list) {
  let {x, y} = coordinate;
  // 统计数目
  let count = 0;
  // 0度角
  count = justiceXL(x, y, piece, list, count);
  count = justiceXR(x, y, piece, list, count);
  if (count >= 4) {
    return true;
  }

  count = 0;
  // 45度角
  count = justiceXYLL(x, y, piece, list, count);
  count = justiceXYLR(x, y, piece, list, count);
  if (count >= 4) {
    return true;
  }

  count = 0;
  // 90度角
  count = justiceYT(x, y, piece, list, count);
  count = justiceYB(x, y, piece, list, count);
  if (count >= 4) {
    return true;
  }

  count = 0;
  // 135度角
  count = justiceXYRR(x, y, piece, list, count);
  count = justiceXYRL(x, y, piece, list, count);
  if (count >= 4) {
    return true;
  }

  return false;
}

// 0度角左判断
function justiceXL(x, y, piece, list, count) {
  if (list[x - 1] && list[x - 1][y] && list[x - 1][y]['piece'] !== 'none') {
    if (list[x - 1][y]['piece'] === piece) {
      count++;
      return justiceXL(x - 1, y, piece, list, count);
    }
  }

  return count;
}

// 0度角右判断
function justiceXR(x, y, piece, list, count) {
  if (list[x + 1] && list[x + 1][y] && list[x + 1][y]['piece'] !== 'none') {
    if (list[x + 1][y]['piece'] === piece) {
      count++;
      return justiceXR(x + 1, y, piece, list, count);
    }
  }

  return count;
}

// 45度角左判断
function justiceXYLL(x, y, piece, list, count) {
  if (list[x - 1] && list[x - 1][y - 1] && list[x - 1][y - 1] !== 'none') {
    if (list[x - 1][y - 1]['piece'] === piece) {
      count++;
      return justiceXYLL(x - 1, y - 1, piece, list, count);
    }
  }

  return count;
}

// 45度角右判断
function justiceXYLR(x, y, piece, list, count) {
  if (list[x + 1] && list[x + 1][y + 1] && list[x + 1][y + 1] !== 'none') {
    if (list[x + 1][y + 1]['piece'] === piece) {
      count++;
      return justiceXYLR(x + 1, y + 1, piece, list, count);
    }
  }

  return count;
}

// 90度角上判断
function justiceYT(x, y, piece, list, count) {
  if (list[x] && list[x][y - 1] && list[x][y - 1] !== 'none') {
    if (list[x][y - 1]['piece'] === piece) {
      count++;
      return justiceYT(x, y - 1, piece, list, count);
    }
  }

  return count;
}

// 90度角下判断
function justiceYB(x, y, piece, list, count) {
  if (list[x] && list[x][y + 1] && list[x][y + 1] !== 'none') {
    if (list[x][y + 1]['piece'] === piece) {
      count++;
      return justiceYB(x, y + 1, piece, list, count);
    }
  }

  return count;
}

// 135度角右判断
function justiceXYRR(x, y, piece, list, count) {
  if (list[x + 1] && list[x + 1][y - 1] && list[x + 1][y - 1] !== 'none') {
    if (list[x + 1][y - 1]['piece'] === piece) {
      count++;
      return justiceXYRR(x + 1, y - 1, piece, list, count);
    }
  }

  return count;
}

// 135度角右判断
function justiceXYRL(x, y, piece, list, count) {
  if (list[x - 1] && list[x - 1][y + 1] && list[x - 1][y + 1] !== 'none') {
    if (list[x - 1][y + 1]['piece'] === piece) {
      count++;
      return justiceXYRL(x - 1, y + 1, piece, list, count);
    }
  }

  return count;
}