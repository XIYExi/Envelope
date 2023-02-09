# Envelope V2

## 开发说明 [*十分建议使用yarn*]

此版本是在 V1 的基础上进行修改的。原先master版本添加 lowcode-engine 后直接崩溃，这里单独开一个v2版本进行开发

此版本并不一定是最终版，因为不排除再一次发生依赖污染问题。


```bash
$ yarn install
```

Start the dev server,

```bash
$ umi start
```

## 依赖问题

https://www.bookstack.cn/read/alibaba-lowcode-engine-1.0-zh/9515333ef37f0c9b.md

究其原因是lowcode-engine的依赖发生冲突，添加resolution后重新安装依赖库，方法二的webpack貌似有问题，
可以在env文件中禁用babel缓存之后添加resolution锁定版本号
