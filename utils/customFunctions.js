export const onlyInLeft = (left, right, compareFunction) => // compare 2 objects and get only values from left one, compareFunction is function where object are "same" - comparing
  left.filter(leftValue =>
    !right.some(rightValue => 
      compareFunction(leftValue, rightValue)))