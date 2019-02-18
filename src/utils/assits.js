
 const findComponentUpward = function (context,componentName){
    let parent = context.$parent;
    // console.log(parent);
    let name = parent.$options.name;
    
    while(parent && (!name || [componentName].indexOf(name) < 0)){
        parent = parent.$parent;
        if(parent) name = parent.$option.name;
    }
    return parent;
}

 const findComponentDownward = function (context,componentName){
    const childrens = context.$children;
    let children = null;
    // console.log(childrens);
    if (childrens.length) {
      for (const child of childrens) {
        const name = child.$options.name;
        // console.log(name);
        if (name === componentName) {
          children = child;
          break;
        } else {
          children = findComponentDownward(child, componentName);
          if (children) break;
        }
      }
    }
    return children;
  
}



export { findComponentDownward,findComponentUpward }
// name-> false,
