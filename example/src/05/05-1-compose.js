function compose_old(funcArr) {
    return funcArr.reduce(
        function(prevFunc, nextFunc) {
            return function(value) {
                return nextFunc(prevFunc(value));
            }
        },
        function(k) { return k;}
    );
}

function compose(...funcArr) {    
    return funcArr.reduce(
        function (prevFunc, nextFunc) {
            return function(...args) {
                return nextFunc(prevFunc(...args));
            }
        },
        function(k) { return k; }
    );
}

const formulaWithCompose = compose(multiplyTwo, multiplyThree, addFour);
// 혹은
const formulaWithCompose = compose(
    multiplyTwo,
    multiplyThree,
    addFour);
const x = 10;
formulaWithCompose(10); // 64

// => ((x * 2) * 3) + 4
// 동일한 함수 표현식
const formulaWithCompose = compose(
    multiplyX(2),
    multiplyX(3),
    addX(4)
);

// 조합 함수 없이 표현한 경우
const formulaWithoutCompose = addX(4)(multiplyX(3)(multiplyX(2)));

// ((x * 2) + 5 ) * 3) + 4 연산이 추가된 공식
const formulaWithCompose2 = compose(
    multiplyX(2),
    addX(5),
    multiplyX(3),
    addX(4)
);

// 조합 함수 없이 표현한 경우
const formulaWithoutCompose2 = addX(4)(multiplyX(3)(addX(5)(multiplyX(2))));