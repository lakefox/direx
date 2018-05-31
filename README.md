# direx
Export Directory Via a JSON File

# Install
```
npm i direx
```

# How to Use

``` javascript
var direx = require('direx');

direx("path/to/directory").then((res) => {
// {
//    pics: {
//      spring: {
//          img1: "imgData",
//          img2: "imgData",
//        },
//        summer: {
//          img1: "imgData",
//          img2: "imgData",
//        }
//    }
//  }
  Do whatever...
});
```