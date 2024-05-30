export const runBasedOnSize = (width,func)=>{
    // const width = window.innerWidth
    if (width > 1536) {
        return func() 
    } else if (width <= 768) {
        return func() 
    } else if (width <= 1024) {
        return func() 
    } else if (width <= 1280) {
        return func() 
    } else if (width <= 1536) {
        return func() 
    } else {
        return func() 
    }
}