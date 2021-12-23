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

// const formulaWithCompose = compose_old([multiplyTwo, multiplyThree, addFour]);

function compose() {
    // Arrray의 prototype 객체 안에 정의된 slice() 함수를 사용하여 나열형 자료를 배열로 변환합니다. 
    // 자바스크립트의 트릭으로 실무에서는 arguments를 배열로 변환할 때 자주 사용되는 패턴입니다. 
    const funcArr = Array.prototype.slice.call(arguments);
    return funcArr.reduce(
        function (prevFunc, nextFunc) {
            return function(value) {
                return nextFunc(prevFunc(value));
            }
        },
        function(k) { return k; }
    );
}

const formulaWithCompose = compose(multiplyTwo, multiplyThree, addFour);