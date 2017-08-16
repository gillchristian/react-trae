# trae as React component

> when you have a hammer, everything is a nail
>
> _Someone_

<h1 align="center">
  <img src="https://github.com/gillchristian/react-trae/blob/master/assets/all-the-things.jpg" alt="componentize-all-the-things" title="componentize-all-the-things" width="500">
</h1>

## Install

```bash
yarn add react-trae
# or
npm install --save react-trae
```

## Examples

- Base example. _`pending`_
- [Infinite posts lists](https://codesandbox.io/s/91k8612r6y?hidenavigation=1&module=%2FPostList.js)

## Use

```js
import Trae from 'react-trae'

const Artile = () => 
  <Trae url="https://jsonplaceholder.typicode.com/posts/1">
    {
      ({loading, data}) => loading
        ? <span>loading...</span> 
        : <div>
            <h1>{data.title}</h1>
            <p>{data.body}</p>
          </div>
    }
  </Trae>

export default Article
```
