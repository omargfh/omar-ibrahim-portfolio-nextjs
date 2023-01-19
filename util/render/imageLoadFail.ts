const onImageLoadFail = (e: any) => {
    const { target } = e
    target.src = 'https://via.placeholder.com/400x400'
    target.onerror = null
}


export default onImageLoadFail