# trae as React component

> when you have a hammer, everything is a nail
>
> _Someone_

## Install

```bash
yarn add react-trae
# or
npm install --save react-trae
```

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
