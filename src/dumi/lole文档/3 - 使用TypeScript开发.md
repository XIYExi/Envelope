---

order: 3

---

# 使用TS开发项目
使用 create-react-app 一步步地创建一个 TypeScript 项目，并引入 lole UI;
>```lole UI``` 基于最新稳定版本的 TypeScript（>=4.0.0），请确保项目中使用匹配的版本。

## 安装和初始化
请确保电脑上已经安装了最新版的 npm。

使用npm构建项目，这里演示依旧使用WebStorm快速构建TS模板的React项目。

构建成功后执行以下命令
```text
react-scripts start
```

当运行localhost:3000端口出现React图标的时候表示项目创建成功。

## 安装lole UI
执行以下命令来安装lole UI
```text
npm install @types/lole-ui --save
```

修改```scr/App.tsx```，引入lole UI组件，还以Grid组件为例

```
import React from 'react';
import {Col, Row} from "lole-ui";
import 'lole-ui/dist/index.css';

const App = () => {
    return(
        <div>
            <Row>
                {
                    new Array(24).fill(null).map((item,index)=>{
                        return <Col key={index} span={1} style={{
                            height:'100vh',
                            width:'10px',
                            background: index%2===0?'rgb(249, 204, 226)':'#fff'
                        }}>{'Col-'+(index+1)}</Col>
                    })
                }
            </Row>
        </div>
    )
}

export default App;
```
刷新页面，现在你应该能看到页面上已经有了粉白相间的Grid划分条。其他开发流程你可以参考 create-react-app 的官方文档。

lole UI 使用 TypeScript 书写并提供了完整的定义，你可以享受组件属性输入建议和定义检查的功能。

[![qIWbMq.png](https://s1.ax1x.com/2022/04/02/qIWbMq.png)](https://imgtu.com/i/qIWbMq)

## 其他方案
如果你已经按照使用create-react-app初始化了标准React环境，可以参考官方文档里的 <a href='https://create-react-app.dev/docs/adding-typescript/'>Adding TypeScript</a> 配置 TypeScript 开发环境。

- <a href='https://github.com/SZzzzz/react-scripts-ts-antd'>Create React apps (with Typescript and antd) with no build configuration</a>

- <a href='https://github.com/lwd-technology/react-app-rewire-typescript'>react-app-rewire-typescript</a>

- <a href='https://github.com/Brooooooklyn/ts-import-plugin'>ts-import-plugin</a>

- <a href='https://vincenttunru.com/migrate-create-react-app-typescript-to-create-react-app/'>Migrating from create-react-app-typescript to Create React App</a>
