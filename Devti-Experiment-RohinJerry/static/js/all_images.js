var all_images = []
var combinedImageList = aList.concat(bList,cList,PRACaList,PRACbList)
combinedImageList.push('introEX.png','introEX2.png','introEX3.png','introEX4.png','isi.png')

for (i=0;i<combinedImageList.length; i++) {
    all_images.push(`../static/images/${combinedImageList[i]}`)
}
