import React, {PureComponent} from 'react';

export default class ScrollSpy extends PureComponent {
    constructor(props){
        super(props);
        this.setRef = this.setState.bind(this);
        this.checkPosition = this.checkPosition.bind(this);

        // 윈도우의 스크롤 이동 이벤트를 감지하여 checkPosition 함수 실행
        window.addEventListener('scroll',this.checkPosition);
    }
    setRef(ref) {
        // ref 프로퍼티에서 반환된 객체를 컴포넌트 변수에 할당
        this.ref = ref; 
    }
    checkPosition() {
        // 현재 DOM 객체의 위치가 스크롤 화면 안팎인지 측정
        if(this.ref.getBoundingClientRect().top < window.innerHeight) {
            console.log('enter');
        } else {
            console.log('exit');
        }
    }

    componentDidMount() {
        this.checkPosition();
    }

    componentWillUnmount() {
        window.removeEventListener('scroll',this.checkPosition); // 컴포넌트가 소멸할 때 화면 스크롤 감시 함수를 메모리에서 제거
    }
    render() {
        return <div ref={this.setRef}/>
    }
}

export default ScrollSpy;