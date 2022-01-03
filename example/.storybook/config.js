import { configure, setAddon } from "@storybook/react";
import interopRequireDefault from 'babel-runtime/helpers/interopRequireDefault';
import JSXAddon from 'storybook-addon-jsx';

//import '../src/sass/materialize.scss';
import '../src/doit-ui/app.css';
function loadStories() {
    const context = require.context('../src/stories',true,/Story\.jsx$/); // require.context() 함수로 src/stories 폴더의 스토리 목록을 가져옵니다.
    context.keys().forEach((srcFile)=>{
        interopRequireDefault(context(srcFile)); 
    });
}

setAddon(JSXAddon);
configure(loadStories,module);